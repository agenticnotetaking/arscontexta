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

function collectJson(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 5 * 1024 * 1024) {
        reject(new Error("payload_too_large"));
      }
    });
    req.on("end", () => {
      try {
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
    artifactText.slice(0, 120000)
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

  if (req.method === "POST" && pathname === "/api/ai/suggest") {
    const payload = await collectJson(req);
    const result = await suggestFromArtifact(payload);
    return sendJson(res, result.status, result.body);
  }

  if (req.method === "POST" && pathname === "/api/revisions/save") {
    const payload = await collectJson(req);
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
    const payload = await collectJson(req);
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
    const payload = await collectJson(req);
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
