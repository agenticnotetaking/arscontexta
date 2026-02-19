const fs = require("fs");
const path = require("path");

function usage() {
  console.log("Usage: node scripts/generate-baseline.js <manifest.json> [output-dir]");
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

function writeText(filePath, data) {
  fs.writeFileSync(filePath, data, "utf8");
}

const inFile = process.argv[2];
const outRoot = process.argv[3] || path.resolve(process.cwd(), "generated-libraries");

if (!inFile) {
  usage();
  process.exit(1);
}

const manifestPath = path.resolve(process.cwd(), inFile);
if (!fs.existsSync(manifestPath)) {
  console.error(`Manifest not found: ${manifestPath}`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const programId = manifest.program_id || "program";
const baseDir = path.join(outRoot, programId);
ensureDir(baseDir);
ensureDir(path.join(baseDir, "libraries"));
ensureDir(path.join(baseDir, "graph"));
ensureDir(path.join(baseDir, "ops", "federation"));

writeJson(path.join(baseDir, "ops", "federation", "config.json"), {
  schema_version: manifest.schema_version || "1.0",
  mode: "library-federation",
  program_id: programId,
  defaults: manifest.defaults || {},
  governance: manifest.governance || {}
});

writeJson(path.join(baseDir, "graph", "ontology.json"), manifest.ontology || {});
writeJson(path.join(baseDir, "graph", "contracts.json"), manifest.contracts || []);

const libraries = Array.isArray(manifest.libraries) ? manifest.libraries : [];
libraries.forEach((lib) => {
  const libDir = path.join(baseDir, "libraries", lib.id || "library");
  ensureDir(libDir);
  ensureDir(path.join(libDir, "processes"));
  ensureDir(path.join(libDir, "intake"));
  ensureDir(path.join(libDir, "retired"));
  ensureDir(path.join(libDir, "ops"));
  writeJson(path.join(libDir, "library.json"), lib);
  writeText(
    path.join(libDir, "index.md"),
    [
      "---",
      `description: ${lib.purpose || ""}`,
      "type: moc",
      "---",
      `# ${lib.display_name || lib.id || "Library"}`,
      "",
      "## Decisions Supported",
      ...(lib.decisions_supported || []).map((d) => `- ${d}`)
    ].join("\n")
  );
});

console.log(`Generated baseline library scaffold at: ${baseDir}`);
