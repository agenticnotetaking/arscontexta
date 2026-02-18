# Library Intake UI

Standalone intake app for building federated business-function library manifests.

## Features

1. Step-by-step wizard with stakeholder-friendly wording
2. Guided interview mode (fills the same model as the form)
3. Artifact-assisted suggestions via OpenAI API
4. Visual mapping mode with draggable library nodes and typed links
5. In-app help cards with expected input, defaults, and examples per step
6. Bank Starter preset for fast onboarding
7. Bank function templates (load or merge) for baseline generation
8. JSON export/import (`answers.json`, `manifest.json`)
9. Revision save/load and approval workflow
10. Retrieve latest approved libraries and insert handoffs via approved-picker modal

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
```

If no key is set, artifact-assisted mode remains available but AI suggestion requests return a clear error and manual mode still works.

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

## Manifest Scaffolding

You can convert a manifest JSON into baseline library files with:

```bash
node scripts/generate-baseline.js path/to/manifest.json
```
