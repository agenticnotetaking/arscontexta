# Library Federation Onboarding and Codex Adaptation

This document proposes an onboarding extension for Ars Contexta to support federated "libraries" of business context (for example, bank business functions), plus the platform changes needed to run this model in Codex-centered workflows.

## 1) Onboarding Question Set (Exact)

Use this path when user selects `library-federation` mode during setup.

### Stage A: Program Scope

1. `What is the name of this context program?`
2. `What organization unit owns it?`
3. `What outcome should this program improve in the next 6-12 months?`
4. `Who are the primary users of this graph (roles, not names)?`

### Stage B: Library Inventory

Ask once, then repeat per library.

1. `List the business functions to include as libraries (one per line).`
2. `Which 1-2 libraries should be prioritized for day-one generation?`

For each library:

1. `Library ID (kebab-case, stable):`
2. `Display name:`
3. `One-sentence purpose:`
4. `What decisions should this library help people make? (max 5)`
5. `What artifacts are inputs? (SOPs, tickets, logs, policies, reports, etc.)`
6. `What artifacts are outputs?`
7. `What is the expected weekly change volume? (low/medium/high)`
8. `Who is accountable for correctness in this library? (role)`

### Stage C: Shared Ontology

1. `Choose required shared entities (select all that apply): process, control, risk, policy, metric, system, role, exception, issue, decision, evidence, customer-impact.`
2. `Add any custom shared entities (kebab-case).`
3. `Choose required relationship types: depends_on, owned_by, mitigates, governed_by, measured_by, escalates_to, blocks, feeds, duplicates, supersedes.`
4. `Add any custom relationship types (kebab-case).`

### Stage D: Cross-Library Contracts

For each pair of libraries with known interaction:

1. `Source library ID:`
2. `Target library ID:`
3. `Contract type: handoff | control | data | escalation | dependency`
4. `What object crosses the boundary?`
5. `What event triggers the handoff/interaction?`
6. `What is the expected SLA/latency target?`
7. `What is the failure signal if this contract breaks?`

### Stage E: Governance and Risk Controls

1. `Data classification baseline: public | internal | confidential | restricted`
2. `Do any libraries require stricter classification than baseline?`
3. `Retention default (months):`
4. `Mandatory provenance fields on every generated note (choose): source_ref, captured_at, owner_role, confidence, effective_from, effective_to, reviewer_role.`
5. `Review cadence default: weekly | monthly | quarterly`
6. `Approval requirement for schema/ontology changes: none | single-approver | dual-approver | CAB`

### Stage F: Operating Preferences

1. `Preferred processing depth: light | moderate | heavy`
2. `Preferred automation level: convention | full`
3. `Search mode: keyword | semantic | hybrid`
4. `Should each library include starter MOCs automatically? yes | no`
5. `Create cross-library meta-MOCs at init? yes | no`

### Stage G: Validation Confirmation

1. `Confirm generated library IDs are stable and safe for long-term references: yes | no`
2. `Confirm ontology contract can be enforced across all libraries: yes | no`
3. `Proceed with generation? yes | no`

## 2) Output File Schema (Exact)

### 2.1 `ops/federation/config.yaml`

```yaml
schema_version: "1.0"
mode: library-federation
program:
  id: "bank-context-graph"
  name: "Bank Business Function Meta-Graph"
  owner_unit: "Operations Excellence"
  target_outcome: "Reduce cross-functional process failures and decision latency"
users:
  primary_roles:
    - "operations-analyst"
    - "process-owner"
    - "risk-manager"
defaults:
  processing_depth: "heavy"      # light | moderate | heavy
  automation: "full"             # convention | full
  search: "hybrid"               # keyword | semantic | hybrid
  review_cadence: "monthly"      # weekly | monthly | quarterly
  retention_months: 36
governance:
  classification_baseline: "confidential"  # public | internal | confidential | restricted
  change_approval: "dual-approver"         # none | single-approver | dual-approver | CAB
  required_provenance_fields:
    - source_ref
    - captured_at
    - owner_role
    - confidence
    - effective_from
libraries:
  registry_file: "libraries/index.yaml"
  contracts_file: "graph/contracts.yaml"
  ontology_file: "graph/ontology.yaml"
```

### 2.2 `libraries/index.yaml`

```yaml
schema_version: "1.0"
generated_at: "2026-02-18T00:00:00Z"
program_id: "bank-context-graph"
libraries:
  - id: "payments-ops"
    display_name: "Payments Operations"
    purpose: "Maintain reliable payment execution and exception handling."
    maturity: "active"                 # planned | active | deprecated
    owner_role: "payments-ops-manager"
    weekly_change_volume: "high"       # low | medium | high
    preset_base: "business-process"
    paths:
      root: "libraries/payments-ops"
      notes: "libraries/payments-ops/processes"
      inbox: "libraries/payments-ops/intake"
      archive: "libraries/payments-ops/retired"
      ops: "libraries/payments-ops/ops"
      starter: "libraries/payments-ops/starter"
    decisions_supported:
      - "When to escalate payment exceptions"
      - "Which controls are required for same-day wires"
    inputs:
      - "sops"
      - "runbooks"
      - "incident-tickets"
      - "control-test-results"
    outputs:
      - "process-insights"
      - "control-gap-findings"
      - "improvement-backlog-items"
    required_entities:
      - process
      - control
      - risk
      - metric
      - exception
    required_relationships:
      - depends_on
      - owned_by
      - mitigates
      - measured_by
    starter_mocs:
      - "process-catalog"
      - "roles-and-ownership"
      - "risks-and-bottlenecks"
```

### 2.3 `graph/ontology.yaml`

```yaml
schema_version: "1.0"
entities:
  - name: process
    key_fields: [process_id, name]
    required_fields: [description, owner_role, status]
  - name: control
    key_fields: [control_id, name]
    required_fields: [description, control_type, frequency]
  - name: risk
    key_fields: [risk_id, name]
    required_fields: [description, impact, likelihood]
  - name: metric
    key_fields: [metric_id, name]
    required_fields: [description, target, unit]
  - name: exception
    key_fields: [exception_id]
    required_fields: [description, severity, state]
relations:
  - type: depends_on
    from: [process, control]
    to: [process, system]
    cardinality: "many-to-many"
  - type: owned_by
    from: [process, control, risk, metric]
    to: [role]
    cardinality: "many-to-one"
  - type: mitigates
    from: [control]
    to: [risk]
    cardinality: "many-to-many"
  - type: measured_by
    from: [process, control]
    to: [metric]
    cardinality: "many-to-many"
```

### 2.4 `graph/contracts.yaml`

```yaml
schema_version: "1.0"
contracts:
  - id: "payments-ops_to_fraud-ops_exception-escalation"
    source_library: "payments-ops"
    target_library: "fraud-ops"
    contract_type: "escalation"      # handoff | control | data | escalation | dependency
    object: "high-risk-payment-exception"
    trigger_event: "exception.severity == critical"
    sla:
      target: "15m"
      measure: "time-to-first-response"
    failure_signal: "no_ack_within_sla"
    required_fields:
      - exception_id
      - severity
      - detected_at
      - source_system
      - owner_role
    status: "active"                 # active | paused | deprecated
```

### 2.5 `ops/federation/questions-and-answers.yaml`

```yaml
schema_version: "1.0"
captured_at: "2026-02-18T00:00:00Z"
answers:
  stage_a:
    program_name: "Bank Business Function Meta-Graph"
    owner_unit: "Operations Excellence"
    target_outcome: "Reduce process failures"
  stage_b:
    selected_libraries:
      - "payments-ops"
      - "fraud-ops"
    day_one_priority:
      - "payments-ops"
  stage_c:
    shared_entities: [process, control, risk, metric, exception]
    shared_relationships: [depends_on, owned_by, mitigates, measured_by]
  stage_d:
    contract_count: 3
  stage_e:
    classification_baseline: "confidential"
    retention_months: 36
  stage_f:
    processing_depth: "heavy"
    automation: "full"
```

## 3) Generation Rules for Federation Mode

1. Generate one complete library scaffold per `libraries/index.yaml` entry.
2. Enforce ontology and contract vocabulary in every generated template.
3. Add cross-library MOCs in `graph/`:
   - `graph/library-map.md`
   - `graph/contracts-register.md`
   - `graph/shared-entities.md`
4. Emit query scripts in `ops/queries/` for cross-library diagnostics:
   - `broken-contracts.sh`
   - `unowned-entities.sh`
   - `orphaned-controls.sh`
   - `sla-breaches.sh`
5. Validate that all contract endpoints exist and relation types are declared.

## 4) Codex Adaptation Plan

Current project is Claude-first. To make this work with Codex, add a platform adapter rather than rewriting methodology.

### 4.1 Gaps in current codebase

1. Onboarding text and logic assume Claude-specific command surface and 3 presets (`skills/setup/SKILL.md`).
2. Automation depends on `.claude/settings.json` hooks and Claude hook events.
3. Generated command guidance assumes `/arscontexta:*` command format.
4. Platform docs currently include `platforms/claude-code` and shared blocks, but no Codex adapter.

### 4.2 Add a Codex platform adapter

Create:

- `platforms/codex/generator.md`
- `platforms/codex/hooks/README.md`
- `platforms/codex/templates/` (if needed)

Define platform output mapping:

- Context file: `AGENTS.md` (or repo-local equivalent)
- Skills location: `skills/` (repo-local, SKILL.md compatible)
- Automation: shell scripts in `ops/automation/` invoked by explicit commands
- Session persistence: `ops/sessions/*.json` (same as Claude mode)
- Optional: git hooks (`.git/hooks/`) as deterministic enforcement fallback

### 4.3 Setup skill modifications

In `skills/setup/SKILL.md`:

1. Replace "three presets" onboarding copy with dynamic preset registry output.
2. Add a new mode selector: `single-domain | multi-domain | library-federation`.
3. Add platform detection branch:
   - `claude-code`
   - `codex`
   - `minimal`
4. For `codex`, output command usage without `/arscontexta:*` dependency and route users to local skill invocation conventions.
5. Generate federation config files and library scaffolds when mode is `library-federation`.

### 4.4 Hook/automation strategy in Codex

Because Claude event hooks are unavailable by default:

1. Convert hook behaviors into explicit automation commands:
   - `ops/automation/orient.sh`
   - `ops/automation/validate-write.sh`
   - `ops/automation/session-capture.sh`
2. Provide one orchestrator command:
   - `ops/automation/session-start.sh` (tree + reminders + state restore)
3. Add optional git hook installer script:
   - `scripts/install-git-hooks.sh` installs pre-commit and post-commit checks.
4. Update docs so validation and capture can run conventionally when hooks are absent.

### 4.5 Federation-specific validations for Codex

Add checks to `reference/validate-kernel.sh` or a sibling validator:

1. `libraries/index.yaml` exists and parses.
2. `graph/ontology.yaml` exists and has at least one entity and one relation.
3. `graph/contracts.yaml` endpoints refer to valid library IDs.
4. Every library has required folders and at least one starter MOC.
5. Cross-library query scripts exist and are executable.

## 5) Minimum Viable Implementation Sequence

1. Add federation schemas/files (`ops/federation`, `libraries`, `graph` specs).
2. Add onboarding branch and question flow in setup skill.
3. Implement Codex platform adapter docs and generation mapping.
4. Add validation scripts for federation invariants.
5. Add one worked banking fixture in `reference/test-fixtures/`.
