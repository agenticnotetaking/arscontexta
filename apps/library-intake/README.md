# Library Intake UI

Standalone intake app for building federated business-function library manifests.

## Features

1. Step-by-step wizard with stakeholder-friendly wording
2. Guided interview mode (fills the same model as the form)
3. Artifact-assisted suggestions via OpenAI API
4. Visual mapping mode with draggable library nodes and typed links
5. In-app help cards with expected input, defaults, and examples per step
6. Bank Starter preset for fast onboarding
7. Bank function templates (load or merge) with preview JSON
8. JSON export/import (`answers.json`, `manifest.json`)
9. Revision save/load and approval workflow
10. Retrieve latest approved libraries and insert handoffs via approved-picker modal
11. One-click baseline generation from selected approved set
12. Policy matrix integration (`policy_matrix_09`) with preview + apply-defaults flow
13. SME interview question set endpoint and in-app rendering
14. Transcript-to-prefill generation via OpenAI and one-click apply

## Run

```bash
cd apps/library-intake
node server.js
```

Open: `http://localhost:5077`

## OpenAI Setup

Use environment variables only:

```bash
set OPENAI_API_KEY=your_key_here
set OPENAI_MODEL=gpt-4.1-mini
set POLICY_MATRIX_DIR=C:\Temp\NodeJS\out\policy_matrix_09
set INTAKE_JSON_BODY_LIMIT_BYTES=20971520
set POLICY_MATRIX_REL_SCAN_ROWS=75000
```

If no key is set, artifact-assisted mode remains available but AI suggestion requests return a clear error and manual mode still works.

Large uploads are truncated client-side before AI submission to avoid payload errors, and the server now returns explicit `413 payload_too_large` when request bodies exceed configured limits.

## Policy Matrix Source

By default the server reads policy matrix artifacts from:

- `C:\Temp\NodeJS\out\policy_matrix_09`

You can override with `POLICY_MATRIX_DIR`. The summary endpoint computes top groups/themes/relationships and exposes generated starter defaults for libraries, shared terms, links, and governance.

## Revision and Approval Storage

Saved revisions:

- `apps/library-intake/data/manifests/<program-id>/rev-0001.json`

Approved snapshots (repo-level):

- `ops/federation/approved/approved-index.json`
- `ops/federation/approved/<program-id>--rev-XXXX.json`

## Template Storage

Bank templates are file-backed JSON payloads in:

- `apps/library-intake/templates/bank/*.json`

API endpoints:

- `GET /api/templates/bank`
- `GET /api/templates/bank/:id`
- `GET /api/approved/catalog`
- `GET /api/approved/catalog?includeManifest=1`
- `POST /api/approved/generate-baseline`
- `GET /api/sme/questions`
- `GET /api/policy-matrix/summary`
- `POST /api/ai/transcript-prefill`

## Codex Automation

Generate directly from an approved set:

```bash
curl -X POST http://localhost:5077/api/approved/generate-baseline \
  -H "Content-Type: application/json" \
  -d '{"key":"<program-id>::<revision>","outputDir":"generated-libraries"}'
```

The response includes `codex_next_steps` to stage/commit/push.

## Manifest Scaffolding

You can convert a manifest JSON into baseline library files with:

```bash
node scripts/generate-baseline.js path/to/manifest.json
```
