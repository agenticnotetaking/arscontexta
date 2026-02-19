const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT || 5077);
const openAiModel = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const openAiKey = process.env.OPENAI_API_KEY || "";
const publicRoot = path.join(__dirname, "public");
const repoRoot = path.resolve(__dirname, "..", "..");
const approvedDir = path.join(repoRoot, "ops", "federation", "approved");
const approvedIndexPath = path.join(approvedDir, "approved-index.json");
const templateRoot = path.join(__dirname, "templates", "bank");
const defaultJsonBodyLimit = Number(process.env.INTAKE_JSON_BODY_LIMIT_BYTES || 20 * 1024 * 1024);
const artifactPromptCharLimit = Number(process.env.INTAKE_AI_ARTIFACT_CHAR_LIMIT || 120000);
const transcriptPromptCharLimit = Number(process.env.INTAKE_AI_TRANSCRIPT_CHAR_LIMIT || 140000);
const policyMatrixDefaultDir = path.resolve(repoRoot, "..", "..", "out", "policy_matrix_09");
const policyMatrixDir = process.env.POLICY_MATRIX_DIR || policyMatrixDefaultDir;
const policyMatrixRelationshipScanRows = Number(process.env.POLICY_MATRIX_REL_SCAN_ROWS || 75000);

const smeQuestionBank = [
  { id: "scope", section: "Scope", prompt: "What is in scope and out of scope for this business function?" },
  { id: "outcome", section: "Outcomes", prompt: "What measurable outcome should improve in 6-12 months?" },
  { id: "owners", section: "Ownership", prompt: "Which team and accountable role own this process?" },
  { id: "libraries", section: "Libraries", prompt: "Which major function areas should be separate libraries?" },
  { id: "decisions", section: "Libraries", prompt: "What key decisions does each library make?" },
  { id: "inputs", section: "Data", prompt: "What critical inputs does each library need?" },
  { id: "outputs", section: "Data", prompt: "What outputs are produced and consumed by others?" },
  { id: "handoffs", section: "Handoffs", prompt: "Where does work, control, or escalation pass between teams?" },
  { id: "sla", section: "Handoffs", prompt: "What triggers each handoff, what SLA is expected, and how do failures appear?" },
  { id: "entities", section: "Ontology", prompt: "What shared nouns should all teams use consistently?" },
  { id: "relationships", section: "Ontology", prompt: "What relationship verbs should be standardized?" },
  { id: "governance", section: "Governance", prompt: "What are baseline classification, retention, review cadence, and approval controls?" }
];

const policyMatrixCache = { cacheKey: "", summary: null };

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function safeProgramId(value) {
  const normalized = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return normalized || "program";
}

function nextRevisionName(existingFiles) {
  const revs = existingFiles
    .map((f) => /^rev-(\d{4})\.json$/.exec(f))
    .filter(Boolean)
    .map((m) => Number(m[1]));
  const next = (revs.length ? Math.max(...revs) : 0) + 1;
  return `rev-${String(next).padStart(4, "0")}.json`;
}

function loadJsonIfExists(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (_) {
    return fallback;
  }
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

function writeText(filePath, data) {
  fs.writeFileSync(filePath, data, "utf8");
}

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
    "Access-Control-Allow-Origin": "*"
  });
  res.end(body);
}

function sendText(res, statusCode, content, type) {
  res.writeHead(statusCode, {
    "Content-Type": type || "text/plain; charset=utf-8",
    "Content-Length": Buffer.byteLength(content)
  });
  res.end(content);
}

function collectJson(req, maxBytes) {
  const limit = Number(maxBytes || defaultJsonBodyLimit);
  return new Promise((resolve, reject) => {
    const chunks = [];
    let totalBytes = 0;
    let tooLarge = false;

    req.on("data", (chunk) => {
      if (tooLarge) return;
      totalBytes += chunk.length;
      if (totalBytes > limit) {
        tooLarge = true;
        const err = new Error("payload_too_large");
        err.code = "payload_too_large";
        req.destroy(err);
        return;
      }
      chunks.push(chunk);
    });

    req.on("end", () => {
      if (tooLarge) return;
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        resolve(raw ? JSON.parse(raw) : {});
      } catch (err) {
        reject(err);
      }
    });

    req.on("error", reject);
  });
}

function staticFilePath(urlPath) {
  const normalized = urlPath === "/" ? "/index.html" : urlPath;
  const safePath = path.normalize(normalized).replace(/^([\\/])+/, "");
  return path.join(publicRoot, safePath);
}

function contentType(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8";
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  if (filePath.endsWith(".js")) return "application/javascript; charset=utf-8";
  if (filePath.endsWith(".json")) return "application/json; charset=utf-8";
  return "application/octet-stream";
}
function uniqueStrings(values) {
  return Array.from(new Set((values || []).map((x) => String(x || "").trim()).filter(Boolean)));
}

function splitSemiList(value) {
  return String(value || "")
    .split(";")
    .map((v) => v.trim())
    .filter(Boolean);
}

function parseCsvLine(line) {
  const out = [];
  let token = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        token += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === "," && !inQuotes) {
      out.push(token);
      token = "";
      continue;
    }
    token += ch;
  }
  out.push(token);
  return out;
}

function readCsvObjects(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw.split(/\r?\n/).filter((line) => line.trim().length);
  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]).map((h) => String(h || "").trim());
  const rows = [];

  for (let i = 1; i < lines.length; i += 1) {
    const cols = parseCsvLine(lines[i]);
    const row = {};
    headers.forEach((header, idx) => {
      row[header] = String(cols[idx] == null ? "" : cols[idx]).trim();
    });
    rows.push(row);
  }
  return rows;
}

function incrementMap(map, key, amount) {
  if (!key) return;
  map.set(key, (map.get(key) || 0) + Number(amount || 1));
}

function topCounts(countMap, limit, mapFn) {
  const items = Array.from(countMap.entries())
    .sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])))
    .slice(0, limit || 10);
  if (!mapFn) {
    return items.map(([key, count]) => ({ key, count }));
  }
  return items.map(([key, count]) => mapFn(key, count));
}

function countCsvColumn(filePath, columnName, maxRows) {
  if (!fs.existsSync(filePath)) {
    return { rows_scanned: 0, truncated: false, counts: new Map() };
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw.split(/\r?\n/).filter((line) => line.trim().length);
  if (lines.length < 2) {
    return { rows_scanned: 0, truncated: false, counts: new Map() };
  }

  const headers = parseCsvLine(lines[0]).map((h) => String(h || "").trim());
  const idx = headers.indexOf(columnName);
  if (idx < 0) {
    return { rows_scanned: 0, truncated: false, counts: new Map() };
  }

  const cap = Number(maxRows || 0);
  const counts = new Map();
  let rows_scanned = 0;

  for (let i = 1; i < lines.length; i += 1) {
    if (cap > 0 && rows_scanned >= cap) {
      return { rows_scanned, truncated: true, counts };
    }
    const cols = parseCsvLine(lines[i]);
    const key = String(cols[idx] == null ? "" : cols[idx]).trim();
    if (key) incrementMap(counts, key, 1);
    rows_scanned += 1;
  }

  return { rows_scanned, truncated: false, counts };
}

function policyMatrixRelationshipFile(baseDir) {
  const fullAscii = path.join(baseDir, "all_relationships_full_ascii.csv");
  if (fs.existsSync(fullAscii)) return fullAscii;
  const full = path.join(baseDir, "all_relationships_full.csv");
  if (fs.existsSync(full)) return full;
  const basic = path.join(baseDir, "all_relationships.csv");
  if (fs.existsSync(basic)) return basic;
  return "";
}

function buildPolicyMatrixSummary() {
  const root = path.resolve(policyMatrixDir);
  if (!fs.existsSync(root)) {
    return {
      available: false,
      source_dir: root,
      refreshed_at: new Date().toISOString(),
      error: "policy matrix directory not found"
    };
  }

  const relFile = policyMatrixRelationshipFile(root);
  const cacheKey = [
    root,
    fs.existsSync(path.join(root, "policies.csv")) ? fs.statSync(path.join(root, "policies.csv")).mtimeMs : 0,
    fs.existsSync(path.join(root, "themes.csv")) ? fs.statSync(path.join(root, "themes.csv")).mtimeMs : 0,
    fs.existsSync(path.join(root, "dependencies.csv")) ? fs.statSync(path.join(root, "dependencies.csv")).mtimeMs : 0,
    relFile ? fs.statSync(relFile).mtimeMs : 0
  ].join("|");

  if (policyMatrixCache.cacheKey === cacheKey && policyMatrixCache.summary) {
    return policyMatrixCache.summary;
  }

  const policies = readCsvObjects(path.join(root, "policies.csv"));
  const themes = readCsvObjects(path.join(root, "themes.csv"));
  const dependencies = readCsvObjects(path.join(root, "dependencies.csv"));
  const relCounts = relFile
    ? countCsvColumn(relFile, "relationship_type", policyMatrixRelationshipScanRows)
    : { rows_scanned: 0, truncated: false, counts: new Map() };

  const policyById = new Map();
  const groupCounts = new Map();
  const themeCounts = new Map();
  policies.forEach((row) => {
    if (row.id) policyById.set(row.id, row);
    incrementMap(groupCounts, row.group || "Uncategorized", 1);
    splitSemiList(row.themes).forEach((themeId) => incrementMap(themeCounts, themeId, 1));
  });

  const themeNameById = new Map();
  themes.forEach((row) => {
    if (row.id) themeNameById.set(row.id, row.name || row.id);
  });

  const crossGroupDeps = new Map();
  dependencies.forEach((dep) => {
    const source = policyById.get(dep.source_id || "");
    const target = policyById.get(dep.target_id || "");
    if (!source || !target) return;
    const sourceGroup = source.group || "Uncategorized";
    const targetGroup = target.group || "Uncategorized";
    incrementMap(crossGroupDeps, `${sourceGroup}=>${targetGroup}`, 1);
  });

  const topGroups = topCounts(groupCounts, 8, (group, policies_count) => ({ group, policies_count }));
  const topThemes = topCounts(themeCounts, 10, (theme_id, hits) => ({
    theme_id,
    theme_name: themeNameById.get(theme_id) || theme_id,
    hits
  }));
  const topRelationshipTypes = topCounts(relCounts.counts, 10, (relationship_type, count) => ({
    relationship_type,
    count
  }));
  const cross_group_dependencies = topCounts(crossGroupDeps, 10, (pair, references) => {
    const parts = pair.split("=>");
    return { source_group: parts[0], target_group: parts[1], references };
  });

  const starterLibraries = topGroups.slice(0, 6).map((item) => ({
    id: `${safeProgramId(item.group)}-policy`,
    display_name: `${item.group} Policy Library`,
    purpose: `Curate and operationalize policies for ${item.group}.`,
    decisions_supported: [
      `Assess policy impact for ${item.group}`,
      `Prioritize control changes for ${item.group}`
    ],
    inputs: ["policy-text", "regulatory-update", "audit-findings"],
    outputs: ["control-requirements", "implementation-guidance", "exceptions-log"],
    owner_role: "policy-owner",
    weekly_change_volume: item.policies_count >= 20 ? "high" : "medium"
  }));

  const libByGroup = Object.fromEntries(starterLibraries.map((lib) => [lib.display_name.replace(/ Policy Library$/, ""), lib.id]));
  const starterLinks = cross_group_dependencies
    .map((dep) => {
      const source_library = libByGroup[dep.source_group];
      const target_library = libByGroup[dep.target_group];
      if (!source_library || !target_library) return null;
      return {
        source_library,
        target_library,
        contract_type: "dependency",
        object: "policy-reference",
        trigger_event: "policy_update_published",
        sla_target: "10d",
        failure_signal: "dependency_review_missing",
        required_fields: ["source_ref", "captured_at", "owner_role", "effective_from"]
      };
    })
    .filter(Boolean)
    .slice(0, 10);

  const defaults = {
    from: "policy_matrix_09",
    shared_terms: {
      entities: uniqueStrings([
        "process",
        "control",
        "risk",
        "policy",
        "exception",
        "metric",
        ...topThemes.map((x) => String(x.theme_id || "").replace(/-/g, "_"))
      ]).slice(0, 16),
      relationships: uniqueStrings([
        "depends_on",
        "owned_by",
        "mitigates",
        "references",
        "escalates_to",
        ...topRelationshipTypes.map((x) => safeProgramId(x.relationship_type || "related").replace(/-/g, "_"))
      ]).slice(0, 16)
    },
    libraries: starterLibraries,
    links: starterLinks,
    governance: {
      classification_baseline: topThemes.some((x) => x.theme_id === "privacy") ? "restricted" : "confidential",
      review_cadence: "monthly",
      retention_months: 36,
      change_approval: "dual-approver",
      required_provenance_fields: ["source_ref", "captured_at", "owner_role", "confidence", "effective_from"]
    }
  };

  const summary = {
    available: true,
    source_dir: root,
    refreshed_at: new Date().toISOString(),
    files: {
      policies: "policies.csv",
      themes: "themes.csv",
      dependencies: "dependencies.csv",
      relationships: relFile ? path.basename(relFile) : ""
    },
    counts: {
      policies: policies.length,
      themes: themes.length,
      dependencies: dependencies.length,
      relationships_scanned: relCounts.rows_scanned,
      relationships_truncated: relCounts.truncated
    },
    top_groups: topGroups,
    top_themes: topThemes,
    top_relationship_types: topRelationshipTypes,
    cross_group_dependencies,
    defaults
  };

  policyMatrixCache.cacheKey = cacheKey;
  policyMatrixCache.summary = summary;
  return summary;
}

async function suggestFromArtifact(payload) {
  const artifactText = String(payload.artifactText || "").trim();
  const currentLibraries = Array.isArray(payload.currentLibraries)
    ? payload.currentLibraries
    : [];

  if (!artifactText) {
    return { status: 400, body: { error: "artifactText is required" } };
  }
  if (!openAiKey) {
    return {
      status: 400,
      body: {
        error:
          "OpenAI is not configured. Set OPENAI_API_KEY to use artifact-assisted suggestions."
      }
    };
  }

  const prompt = [
    "You are helping design a business-function library federation.",
    "Read the artifact text and return ONLY JSON with this shape:",
    "{",
    '  "libraries": [{"id":"","display_name":"","purpose":"","decisions_supported":[],"inputs":[],"outputs":[],"owner_role":"","weekly_change_volume":"low|medium|high"}],',
    '  "shared_entities": [],',
    '  "shared_relationships": [],',
    '  "links": [{"source_library":"","target_library":"","contract_type":"handoff|control|data|escalation|dependency","object":"","trigger_event":"","sla_target":"","failure_signal":"","required_fields":[]}],',
    '  "notes": []',
    "}",
    "Rules:",
    "- Keep ids kebab-case and stable.",
    "- Suggest 2-6 libraries max.",
    "- Reuse current library IDs when clearly matching:",
    JSON.stringify(currentLibraries, null, 2),
    "Artifact text:",
    artifactText.slice(0, artifactPromptCharLimit)
  ].join("\n");

  try {
    const resp = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openAiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: openAiModel,
        input: prompt
      })
    });

    const data = await resp.json();
    if (!resp.ok) {
      return {
        status: 500,
        body: {
          error: "Failed to generate suggestions.",
          detail: data && data.error && data.error.message ? data.error.message : "openai_error"
        }
      };
    }

    const content = data.output_text || "";
    const match = content.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(match ? match[0] : content);
    return { status: 200, body: { data: parsed } };
  } catch (err) {
    return {
      status: 500,
      body: {
        error: "Failed to generate suggestions.",
        detail: err && err.message ? err.message : "unknown_error"
      }
    };
  }
}

function extractJsonFromText(text) {
  const input = String(text || "").trim();
  if (!input) {
    throw new Error("empty_model_output");
  }

  try {
    return JSON.parse(input);
  } catch (_) {
    // continue
  }

  const fenced = input.match(/```json\s*([\s\S]*?)```/i);
  if (fenced && fenced[1]) {
    return JSON.parse(fenced[1]);
  }

  const start = input.indexOf("{");
  const end = input.lastIndexOf("}");
  if (start >= 0 && end > start) {
    return JSON.parse(input.slice(start, end + 1));
  }

  throw new Error("json_not_found_in_model_output");
}

async function callOpenAiJson(prompt) {
  const resp = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openAiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: openAiModel,
      input: prompt
    })
  });

  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(data && data.error && data.error.message ? data.error.message : "openai_error");
  }

  return extractJsonFromText(data.output_text || "");
}

function normalizePrefill(payload) {
  const src = payload && typeof payload === "object" ? payload : {};
  const gov = src.governance && typeof src.governance === "object" ? src.governance : {};

  return {
    program: {
      name: String(src.program && src.program.name ? src.program.name : "").trim(),
      id: safeProgramId(src.program && src.program.id ? src.program.id : src.program && src.program.name ? src.program.name : ""),
      owner_unit: String(src.program && src.program.owner_unit ? src.program.owner_unit : "").trim(),
      target_outcome: String(src.program && src.program.target_outcome ? src.program.target_outcome : "").trim()
    },
    libraries: Array.isArray(src.libraries)
      ? src.libraries.slice(0, 20).map((lib, idx) => ({
        id: safeProgramId(lib && lib.id ? lib.id : `library-${idx + 1}`),
        display_name: String(lib && lib.display_name ? lib.display_name : lib && lib.id ? lib.id : `Library ${idx + 1}`).trim(),
        purpose: String(lib && lib.purpose ? lib.purpose : "").trim(),
        decisions_supported: uniqueStrings(Array.isArray(lib && lib.decisions_supported) ? lib.decisions_supported : []),
        inputs: uniqueStrings(Array.isArray(lib && lib.inputs) ? lib.inputs : []),
        outputs: uniqueStrings(Array.isArray(lib && lib.outputs) ? lib.outputs : []),
        owner_role: String(lib && lib.owner_role ? lib.owner_role : "").trim(),
        weekly_change_volume: ["low", "medium", "high"].includes(String(lib && lib.weekly_change_volume ? lib.weekly_change_volume : "").toLowerCase())
          ? String(lib.weekly_change_volume).toLowerCase()
          : "medium"
      }))
      : [],
    shared_terms: {
      entities: uniqueStrings(Array.isArray(src.shared_terms && src.shared_terms.entities) ? src.shared_terms.entities : []),
      relationships: uniqueStrings(Array.isArray(src.shared_terms && src.shared_terms.relationships) ? src.shared_terms.relationships : [])
    },
    links: Array.isArray(src.links)
      ? src.links.slice(0, 30).map((link) => ({
        source_library: safeProgramId(link && link.source_library ? link.source_library : ""),
        target_library: safeProgramId(link && link.target_library ? link.target_library : ""),
        contract_type: String(link && link.contract_type ? link.contract_type : "handoff").trim() || "handoff",
        object: String(link && link.object ? link.object : "").trim(),
        trigger_event: String(link && link.trigger_event ? link.trigger_event : "").trim(),
        sla_target: String(link && link.sla_target ? link.sla_target : "").trim(),
        failure_signal: String(link && link.failure_signal ? link.failure_signal : "").trim(),
        required_fields: uniqueStrings(Array.isArray(link && link.required_fields) ? link.required_fields : [])
      })).filter((x) => x.source_library && x.target_library)
      : [],
    governance: {
      classification_baseline: ["public", "internal", "confidential", "restricted"].includes(String(gov.classification_baseline || "").toLowerCase())
        ? String(gov.classification_baseline).toLowerCase()
        : "confidential",
      review_cadence: ["weekly", "monthly", "quarterly"].includes(String(gov.review_cadence || "").toLowerCase())
        ? String(gov.review_cadence).toLowerCase()
        : "monthly",
      retention_months: Number.isFinite(Number(gov.retention_months)) ? Number(gov.retention_months) : 36,
      change_approval: String(gov.change_approval || "dual-approver").trim() || "dual-approver",
      required_provenance_fields: uniqueStrings(
        Array.isArray(gov.required_provenance_fields)
          ? gov.required_provenance_fields
          : ["source_ref", "captured_at", "owner_role", "confidence", "effective_from"]
      )
    },
    confidence_notes: uniqueStrings(Array.isArray(src.confidence_notes) ? src.confidence_notes : [])
  };
}

async function prefillFromTranscript(payload) {
  const transcriptText = String(payload && payload.transcriptText ? payload.transcriptText : "").trim();
  const currentDraft = payload && payload.currentDraft && typeof payload.currentDraft === "object" ? payload.currentDraft : {};

  if (!transcriptText) {
    return { status: 400, body: { error: "transcriptText is required" } };
  }
  if (!openAiKey) {
    return {
      status: 400,
      body: {
        error: "OpenAI is not configured. Set OPENAI_API_KEY to generate transcript prefill."
      }
    };
  }

  const prompt = [
    "You convert SME interview transcripts into a pre-populated library-intake draft.",
    "Return ONLY JSON with this exact shape:",
    "{",
    "  \"program\": {\"name\":\"\",\"id\":\"\",\"owner_unit\":\"\",\"target_outcome\":\"\"},",
    "  \"libraries\": [{\"id\":\"\",\"display_name\":\"\",\"purpose\":\"\",\"decisions_supported\":[],\"inputs\":[],\"outputs\":[],\"owner_role\":\"\",\"weekly_change_volume\":\"low|medium|high\"}],",
    "  \"shared_terms\": {\"entities\":[],\"relationships\":[]},",
    "  \"links\": [{\"source_library\":\"\",\"target_library\":\"\",\"contract_type\":\"handoff|control|data|escalation|dependency\",\"object\":\"\",\"trigger_event\":\"\",\"sla_target\":\"\",\"failure_signal\":\"\",\"required_fields\":[]}],",
    "  \"governance\": {\"classification_baseline\":\"public|internal|confidential|restricted\",\"review_cadence\":\"weekly|monthly|quarterly\",\"retention_months\":36,\"change_approval\":\"\",\"required_provenance_fields\":[]},",
    "  \"confidence_notes\": []",
    "}",
    "Rules:",
    "- Use concise, business-readable wording.",
    "- Infer missing details conservatively and note assumptions in confidence_notes.",
    "- Keep IDs kebab-case.",
    "- Prefer 3-8 libraries.",
    "SME questions for context:",
    JSON.stringify(smeQuestionBank, null, 2),
    "Current draft context:",
    JSON.stringify(currentDraft, null, 2),
    "Transcript:",
    transcriptText.slice(0, transcriptPromptCharLimit)
  ].join("\n");

  try {
    const parsed = await callOpenAiJson(prompt);
    return { status: 200, body: { prefill: normalizePrefill(parsed) } };
  } catch (err) {
    return {
      status: 500,
      body: {
        error: "Failed to generate transcript prefill.",
        detail: err && err.message ? err.message : "unknown_error"
      }
    };
  }
}
function buildApprovedLatest(programId) {
  const index = loadJsonIfExists(approvedIndexPath, {
    schema_version: "1.0",
    updated_at: "",
    programs: {}
  });
  const entry = index.programs && index.programs[programId] ? index.programs[programId] : null;
  if (!entry || !entry.latest || !entry.latest.approved_file) {
    return null;
  }
  const approvedFile = path.join(approvedDir, entry.latest.approved_file);
  const data = loadJsonIfExists(approvedFile, null);
  if (!data) return null;
  return {
    ...entry.latest,
    data
  };
}


function listBankTemplates() {
  if (!fs.existsSync(templateRoot)) return [];
  return fs
    .readdirSync(templateRoot)
    .filter((f) => f.endsWith(".json"))
    .map((fileName) => {
      const fullPath = path.join(templateRoot, fileName);
      const parsed = loadJsonIfExists(fullPath, null);
      if (!parsed) return null;
      const id = String(parsed.id || fileName.replace(/\.json$/i, "")).trim();
      if (!id) return null;
      return {
        id,
        title: parsed.title || id,
        description: parsed.description || "",
        type: parsed.type === "pack" ? "pack" : "library",
        tags: Array.isArray(parsed.tags) ? parsed.tags : [],
        file_name: fileName
      };
    })
    .filter(Boolean)
    .sort((a, b) => String(a.title).localeCompare(String(b.title)));
}

function loadBankTemplateById(templateId) {
  const normalized = String(templateId || "").trim();
  if (!normalized) return null;
  const templates = listBankTemplates();
  const entry = templates.find((t) => t.id === normalized);
  if (!entry) return null;
  const payload = loadJsonIfExists(path.join(templateRoot, entry.file_name), null);
  if (!payload) return null;
  return payload;
}

function buildApprovedCatalog(includeManifest) {
  const index = loadJsonIfExists(approvedIndexPath, {
    schema_version: "1.0",
    updated_at: "",
    programs: {}
  });

  const programs = index && index.programs ? index.programs : {};
  return Object.keys(programs)
    .map((programId) => {
      const latest = programs[programId] && programs[programId].latest ? programs[programId].latest : null;
      if (!latest || !latest.approved_file) return null;

      const approvedPath = path.join(approvedDir, latest.approved_file);
      const approvedData = loadJsonIfExists(approvedPath, null);
      if (!approvedData) return null;

      const base = {
        key: `${latest.program_id}::${latest.revision}`,
        program_id: latest.program_id,
        revision: latest.revision,
        approved_at: latest.approved_at,
        approved_by: latest.approved_by,
        libraries_count: Array.isArray(approvedData.manifest && approvedData.manifest.libraries)
          ? approvedData.manifest.libraries.length
          : 0
      };

      if (!includeManifest) return base;

      return {
        ...base,
        data: {
          manifest: approvedData.manifest,
          answers: approvedData.answers
        }
      };
    })
    .filter(Boolean)
    .sort((a, b) => String(b.approved_at || "").localeCompare(String(a.approved_at || "")));
}

function resolveOutputRoot(outputDir) {
  const requested = String(outputDir || "generated-libraries").trim() || "generated-libraries";
  const absolute = path.resolve(repoRoot, requested);
  const normalizedRepo = path.normalize(repoRoot + path.sep);
  const normalizedAbsolute = path.normalize(absolute);
  if (!normalizedAbsolute.startsWith(normalizedRepo) && normalizedAbsolute !== path.normalize(repoRoot)) {
    return null;
  }
  ensureDir(absolute);
  return {
    requested,
    absolute,
    relative: path.relative(repoRoot, absolute).replace(/\\/g, "/") || "."
  };
}

function generateBaselineScaffold(manifest, outRoot) {
  const programId = safeProgramId(manifest && manifest.program_id ? manifest.program_id : "program");
  const baseDir = path.join(outRoot, programId);
  ensureDir(baseDir);
  ensureDir(path.join(baseDir, "libraries"));
  ensureDir(path.join(baseDir, "graph"));
  ensureDir(path.join(baseDir, "ops", "federation"));

  writeJson(path.join(baseDir, "ops", "federation", "config.json"), {
    schema_version: manifest && manifest.schema_version ? manifest.schema_version : "1.0",
    mode: "library-federation",
    program_id: programId,
    defaults: manifest && manifest.defaults ? manifest.defaults : {},
    governance: manifest && manifest.governance ? manifest.governance : {}
  });

  writeJson(path.join(baseDir, "graph", "ontology.json"), (manifest && manifest.ontology) || {});
  writeJson(path.join(baseDir, "graph", "contracts.json"), (manifest && manifest.contracts) || []);

  const libraries = Array.isArray(manifest && manifest.libraries) ? manifest.libraries : [];
  libraries.forEach((lib) => {
    const libId = safeProgramId(lib && lib.id ? lib.id : "library");
    const libDir = path.join(baseDir, "libraries", libId);
    ensureDir(libDir);
    ensureDir(path.join(libDir, "processes"));
    ensureDir(path.join(libDir, "intake"));
    ensureDir(path.join(libDir, "retired"));
    ensureDir(path.join(libDir, "ops"));
    writeJson(path.join(libDir, "library.json"), lib || {});
    writeText(
      path.join(libDir, "index.md"),
      [
        "---",
        `description: ${(lib && lib.purpose) || ""}`,
        "type: moc",
        "---",
        `# ${(lib && (lib.display_name || lib.id)) || "Library"}`,
        "",
        "## Decisions Supported",
        ...((lib && lib.decisions_supported) || []).map((d) => `- ${d}`)
      ].join("\n")
    );
  });

  return {
    program_id: programId,
    base_dir_relative: path.relative(repoRoot, baseDir).replace(/\\/g, "/"),
    libraries_count: libraries.length,
    output_root_relative: path.relative(repoRoot, outRoot).replace(/\\/g, "/")
  };
}

function resolveApprovedForGeneration(payload) {
  const key = String(payload && payload.key ? payload.key : "").trim();
  if (key) {
    const catalog = buildApprovedCatalog(true);
    const match = catalog.find((item) => item.key === key);
    if (match && match.data && match.data.manifest) {
      return match;
    }
  }

  const programId = safeProgramId(payload && payload.programId ? payload.programId : "");
  if (programId && programId !== "program") {
    const latest = buildApprovedLatest(programId);
    if (latest && latest.data && latest.data.manifest) {
      return {
        key: `${latest.program_id}::${latest.revision}`,
        program_id: latest.program_id,
        revision: latest.revision,
        approved_at: latest.approved_at,
        approved_by: latest.approved_by,
        data: latest.data
      };
    }
  }

  const fallback = buildApprovedCatalog(true)[0];
  return fallback && fallback.data && fallback.data.manifest ? fallback : null;
}
function approveRevision(payload) {
  const programId = safeProgramId(payload.programId);
  const revision = String(payload.revision || "").trim();
  if (!revision) {
    return { status: 400, body: { error: "revision is required" } };
  }

  const revisionPath = path.join(__dirname, "data", "manifests", programId, revision);
  if (!fs.existsSync(revisionPath)) {
    return { status: 404, body: { error: "revision not found" } };
  }

  const revisionData = loadJsonIfExists(revisionPath, null);
  if (!revisionData) {
    return { status: 500, body: { error: "could not read revision" } };
  }

  ensureDir(approvedDir);
  const now = new Date().toISOString();
  const approvedBy = String(payload.approvedBy || "local-review").trim();
  const approvedFile = `${programId}--${revision.replace(/[^a-zA-Z0-9.-]/g, "-")}`;

  const approvedPayload = {
    approved_at: now,
    approved_by: approvedBy,
    source_revision: revision,
    program_id: programId,
    manifest: revisionData.manifest,
    answers: revisionData.answers
  };

  writeJson(path.join(approvedDir, approvedFile), approvedPayload);

  const index = loadJsonIfExists(approvedIndexPath, {
    schema_version: "1.0",
    updated_at: "",
    programs: {}
  });

  if (!index.programs[programId]) {
    index.programs[programId] = { latest: null, history: [] };
  }

  const latest = {
    program_id: programId,
    revision,
    approved_at: now,
    approved_by: approvedBy,
    approved_file: approvedFile,
    libraries_count: Array.isArray(revisionData.manifest && revisionData.manifest.libraries)
      ? revisionData.manifest.libraries.length
      : 0
  };

  index.programs[programId].latest = latest;
  index.programs[programId].history = [latest, ...(index.programs[programId].history || [])].slice(0, 100);
  index.updated_at = now;
  writeJson(approvedIndexPath, index);

  return { status: 200, body: { ok: true, latest } };
}

async function handleApi(req, res, urlObj) {
  const pathname = urlObj.pathname;

  if (req.method === "GET" && pathname === "/api/sme/questions") {
    return sendJson(res, 200, {
      generated_at: new Date().toISOString(),
      questions: smeQuestionBank
    });
  }

  if (req.method === "GET" && pathname === "/api/policy-matrix/summary") {
    return sendJson(res, 200, buildPolicyMatrixSummary());
  }

  if (req.method === "POST" && pathname === "/api/ai/transcript-prefill") {
    const payload = await collectJson(req, defaultJsonBodyLimit);
    const result = await prefillFromTranscript(payload || {});
    return sendJson(res, result.status, result.body);
  }
  if (req.method === "POST" && pathname === "/api/ai/suggest") {
    const payload = await collectJson(req, defaultJsonBodyLimit);
    const result = await suggestFromArtifact(payload);
    return sendJson(res, result.status, result.body);
  }

  if (req.method === "POST" && pathname === "/api/revisions/save") {
    const payload = await collectJson(req, defaultJsonBodyLimit);
    const { programId, answers, manifest } = payload || {};
    if (!answers || !manifest) {
      return sendJson(res, 400, { error: "answers and manifest are required" });
    }

    const normalizedProgramId = safeProgramId(programId || manifest.program_id);
    const baseDir = path.join(__dirname, "data", "manifests", normalizedProgramId);
    ensureDir(baseDir);

    const existing = fs.readdirSync(baseDir).filter((f) => f.endsWith(".json"));
    const revision = nextRevisionName(existing);
    const outPath = path.join(baseDir, revision);
    const now = new Date().toISOString();

    writeJson(outPath, {
      revision,
      program_id: normalizedProgramId,
      created_at: now,
      answers,
      manifest
    });

    return sendJson(res, 200, {
      ok: true,
      revision,
      path: path.relative(__dirname, outPath).replace(/\\/g, "/")
    });
  }

  if (req.method === "POST" && pathname === "/api/revisions/approve") {
    const payload = await collectJson(req, defaultJsonBodyLimit);
    const result = approveRevision(payload || {});
    return sendJson(res, result.status, result.body);
  }

  if (req.method === "GET" && pathname === "/api/templates/bank") {
    return sendJson(res, 200, { templates: listBankTemplates() });
  }

  const templateMatch = pathname.match(/^\/api\/templates\/bank\/([^\/]+)$/);
  if (req.method === "GET" && templateMatch) {
    const templateId = decodeURIComponent(templateMatch[1]);
    const template = loadBankTemplateById(templateId);
    if (!template) {
      return sendJson(res, 404, { error: "template not found" });
    }
    return sendJson(res, 200, { template });
  }

  if (req.method === "GET" && pathname === "/api/approved/catalog") {
    const includeManifest = urlObj.searchParams.get("includeManifest") === "1";
    return sendJson(res, 200, { items: buildApprovedCatalog(includeManifest) });
  }

  if (req.method === "POST" && pathname === "/api/approved/generate-baseline") {
    const payload = await collectJson(req, defaultJsonBodyLimit);
    const approved = resolveApprovedForGeneration(payload || {});
    if (!approved || !approved.data || !approved.data.manifest) {
      return sendJson(res, 404, { error: "approved manifest not found" });
    }

    const output = resolveOutputRoot(payload && payload.outputDir);
    if (!output) {
      return sendJson(res, 400, { error: "outputDir must remain inside the repository" });
    }

    const result = generateBaselineScaffold(approved.data.manifest, output.absolute);
    return sendJson(res, 200, {
      ok: true,
      source: {
        key: approved.key,
        program_id: approved.program_id,
        revision: approved.revision,
        approved_at: approved.approved_at
      },
      output: {
        requested: output.requested,
        relative: output.relative
      },
      result,
      codex_next_steps: [
        `git add ${result.base_dir_relative}`,
        `git commit -m "Generate baseline from approved ${approved.program_id} ${approved.revision}"`,
        "git push"
      ]
    });
  }

  if (req.method === "GET" && pathname === "/api/approved/latest") {
    const programId = safeProgramId(urlObj.searchParams.get("programId") || "program");
    const latest = buildApprovedLatest(programId);
    return sendJson(res, 200, { latest });
  }

  const revListMatch = pathname.match(/^\/api\/revisions\/([^\/]+)$/);
  if (req.method === "GET" && revListMatch) {
    const programId = safeProgramId(decodeURIComponent(revListMatch[1]));
    const baseDir = path.join(__dirname, "data", "manifests", programId);
    if (!fs.existsSync(baseDir)) {
      return sendJson(res, 200, { revisions: [] });
    }
    const revisions = fs
      .readdirSync(baseDir)
      .filter((f) => /^rev-\d{4}\.json$/.test(f))
      .sort();
    return sendJson(res, 200, { revisions });
  }

  const revLoadMatch = pathname.match(/^\/api\/revisions\/([^\/]+)\/([^\/]+)$/);
  if (req.method === "GET" && revLoadMatch) {
    const programId = safeProgramId(decodeURIComponent(revLoadMatch[1]));
    const revision = decodeURIComponent(revLoadMatch[2]);
    const filePath = path.join(__dirname, "data", "manifests", programId, revision);
    if (!fs.existsSync(filePath)) {
      return sendJson(res, 404, { error: "revision not found" });
    }
    const data = loadJsonIfExists(filePath, null);
    return sendJson(res, 200, data || {});
  }

  return sendJson(res, 404, { error: "not found" });
}

const server = http.createServer(async (req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host || `localhost:${port}`}`);
  const pathname = urlObj.pathname;

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    });
    return res.end();
  }

  if (pathname.startsWith("/api/")) {
    try {
      return await handleApi(req, res, urlObj);
        } catch (err) {
      if (err && (err.code === "payload_too_large" || err.message === "payload_too_large")) {
        return sendJson(res, 413, {
          error: "payload_too_large",
          detail: `Request payload exceeded limit (${defaultJsonBodyLimit} bytes).`
        });
      }
      return sendJson(res, 500, {
        error: "server_error",
        detail: err && err.message ? err.message : "unknown"
      });
    }
  }

  const filePath = staticFilePath(pathname);
  const relative = path.relative(publicRoot, filePath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return sendText(res, 403, "Forbidden");
  }
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    return sendText(res, 404, "Not found");
  }

  const content = fs.readFileSync(filePath);
  res.writeHead(200, { "Content-Type": contentType(filePath) });
  res.end(content);
});

server.listen(port, () => {
  console.log(`Library intake app listening on http://localhost:${port}`);
});
