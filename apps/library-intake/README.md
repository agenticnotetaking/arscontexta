# Library Intake UI

Standalone intake app for building federated business-function library manifests.

## Features

1. Sectioned HTML wizard with plain-language prompts
2. Guided interview mode (fills the same model as the form)
3. Artifact-assisted suggestions via OpenAI API
4. Visual mapping mode with draggable library nodes and typed links
5. JSON export/import (`answers.json`, `manifest.json`)
6. Local revisioning via server endpoints

## Run

```bash
cd apps/library-intake
npm install
npm start
```

Open: `http://localhost:5077`

## OpenAI Setup

Use environment variables only:

```bash
set OPENAI_API_KEY=your_key_here
set OPENAI_MODEL=gpt-4.1-mini
```

If no key is set, artifact-assisted mode remains available but AI suggestion requests return a clear error and manual mode still works.

## Revision Storage

Saved revisions are written to:

- `apps/library-intake/data/manifests/<program-id>/rev-0001.json`

## Manifest Scaffolding

You can convert a manifest JSON into baseline library files with:

```bash
node scripts/generate-baseline.js path/to/manifest.json
```
