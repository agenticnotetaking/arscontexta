const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT || 5077);
const openAiModel = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const openAiKey = process.env.OPENAI_API_KEY || "";
const publicRoot = path.join(__dirname, "public");

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

async function handleApi(req, res, pathname) {
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

    const filePayload = {
      revision,
      program_id: normalizedProgramId,
      created_at: now,
      answers,
      manifest
    };

    fs.writeFileSync(outPath, JSON.stringify(filePayload, null, 2), "utf8");
    return sendJson(res, 200, {
      ok: true,
      revision,
      path: path.relative(__dirname, outPath).replace(/\\/g, "/")
    });
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
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return sendJson(res, 200, data);
  }

  return sendJson(res, 404, { error: "not found" });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || `localhost:${port}`}`);
  const pathname = url.pathname;

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
      return await handleApi(req, res, pathname);
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
