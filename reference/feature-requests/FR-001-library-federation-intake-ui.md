# FR-001: Library Federation Intake UI (HTML Wizard + JSON Manifest)

## Status

- Proposed
- Owner: TBD
- Target branch: `feat/library-federation-ui-intake`
- Date: 2026-02-18

## Problem

The current onboarding specification for library federation is powerful but too technical for most users. Terms like "ontology" and "contract schema" create friction, especially for business stakeholders who can define workflows but do not think in graph-modeling terms.

## Objective

Create a guided intake experience that lets users define multi-library business context without needing technical graph knowledge, while still producing deterministic machine-readable artifacts for generation and versioning.

## Scope

1. Build a browser-based HTML wizard with sectioned form UX.
2. Support three collection modes in one UI:
   - Guided interview mode (conversational prompts that fill schema fields)
   - Artifact-assisted mode (paste/upload text, AI drafts libraries/links)
   - Visual mapping mode (card-sort and drag-link for cross-library connections)
3. Export versioned JSON payloads that can be fed directly into Ars Contexta generation.
4. Add import + compare support so users can revise and regenerate.

## Non-Goals (Phase 1)

1. No direct write-back to external enterprise systems.
2. No mandatory authentication/SSO (local-first workflow first).
3. No production-grade collaboration presence features (single-user local authoring first).

## Proposed UX

## A) Wizard Information Architecture

1. Program Basics
2. Libraries
3. Shared Business Terms (plain-language replacement for ontology)
4. Cross-Library Handoffs (plain-language replacement for contracts)
5. Governance & Controls
6. Review + Export

Each section includes:

1. "Why this matters"
2. Example answer
3. Optional advanced fields (collapsed by default)

## B) Mode Support

### 1) Guided Interview Mode

- User answers natural-language prompts.
- UI maps responses into structured fields in real time.
- Unresolved required fields are surfaced as checklist items.

### 2) Artifact-Assisted Mode

- User uploads/pastes SOPs, runbooks, policy text, incident summaries.
- AI proposes:
  - suggested libraries
  - suggested shared entities
  - suggested cross-library handoffs
- User can accept/edit/reject each suggestion before export.

### 4) Visual Mapping Mode

- Library cards on canvas.
- Drag connectors to create typed links (handoff/control/data/escalation/dependency).
- Right panel edits relationship metadata (trigger, SLA, failure signal, required fields).

## C) Output and Versioning UX

- Export two files:
  1. `answers.json` (verbatim intake data)
  2. `manifest.json` (normalized generator-ready payload)
- Every export includes:
  - `schema_version`
  - `program_id`
  - `revision`
  - `created_at`
  - `updated_at`
  - `content_sha256`
- Support local revision history:
  - `manifests/<program_id>/rev-0001.json`
  - `manifests/<program_id>/rev-0002.json`
- Include side-by-side diff for changed libraries and links.

## Data Contract (Phase 1)

Phase 1 manifest structure maps to:

1. `ops/federation/config.yaml`
2. `libraries/index.yaml`
3. `graph/ontology.yaml`
4. `graph/contracts.yaml`
5. `ops/federation/questions-and-answers.yaml`

Canonical schema source:

- `reference/library-federation-onboarding-codex.md`

## OpenAI Integration (Pattern + Guardrails)

Reference implementation pattern:

- `C:\\Temp\\NodeJS\\FCM_DocExtract\\build_report.py`
- Uses environment key lookup (`OPENAI_API_KEY`) and initializes client at runtime.

Phase 1 integration requirements:

1. Use environment variables only:
   - `OPENAI_API_KEY` (required for AI features)
   - `OPENAI_MODEL` (optional override; default set in app config)
2. Never store API keys in repo, exported manifests, or browser local storage.
3. Provide AI fallback behavior:
   - If key missing or API call fails, keep manual form path fully functional.
4. AI use cases (bounded):
   - extract candidate libraries from artifacts
   - suggest shared terms and cross-library links
   - generate plain-language field hints

## Technical Approach (Implementation Starter)

1. Create `apps/library-intake/` as a standalone static app.
2. Use JSON Schema for form validation and export normalization.
3. Add a small local API bridge for OpenAI calls (avoid exposing key in client JS).
4. Generate artifacts into an output folder (`exports/`) with revisioned filenames.
5. Add a CLI entrypoint to convert JSON manifest into Ars Contexta library scaffold.

## Acceptance Criteria

1. Non-technical user can create a 3-library manifest without seeing ontology jargon.
2. Exported manifest validates against schema and maps to generation files.
3. Guided interview mode can complete all required fields.
4. Artifact-assisted mode suggests at least one library and one link from sample text.
5. Visual mapping mode can create/edit/delete cross-library links.
6. Importing prior manifest and re-exporting increments revision cleanly.

## Risks

1. AI over-suggestion or hallucinated links.
2. Ambiguous domain language causing inconsistent entity naming.
3. Users skipping governance fields until too late.

## Mitigations

1. Require human confirmation for all AI suggestions.
2. Enforce naming lint rules and canonical ID normalization.
3. Block export when mandatory governance fields are missing.

## Delivery Plan

1. Phase 1: Form UX + JSON export/import + revisioning + manual-only generation mapping.
2. Phase 2: AI-assisted artifact parsing + suggestion approval workflow.
3. Phase 3: Visual mapping canvas + diff-aware regeneration planning.

## PR Starter Checklist

1. Add schema files for `answers.json` and `manifest.json`.
2. Scaffold `apps/library-intake/` UI.
3. Add local API integration boundary for OpenAI-assisted parsing.
4. Add manifest-to-library scaffold converter script.
5. Add fixture data and tests for export validation.
