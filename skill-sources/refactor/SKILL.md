---
name: refactor
description: Plan vault restructuring from config changes. Compares config.yaml against derivation.md, identifies dimension shifts, shows restructuring plan, executes on approval. Triggers on "/refactor", "restructure vault".
version: "1.0"
generated_from: "arscontexta-v1.6"
user-invocable: true
context: fork
allowed-tools: Read, Write, Edit, Grep, Glob, Bash
argument-hint: "[dimension|--dry-run] — focus on specific dimension or preview without approval prompt"
---

## Runtime Configuration (Step 0 — before any processing)

Read these files to configure domain-specific behavior:

1. **`ops/derivation-manifest.md`** — vocabulary mapping, dimension positions, platform hints
   - Use `vocabulary.notes` for the notes folder name
   - Use `vocabulary.note` / `vocabulary.note_plural` for note type references
   - Use `vocabulary.topic_map` / `vocabulary.topic_map_plural` for MOC references
   - Use `vocabulary.inbox` for the inbox folder name

2. **`ops/config.yaml`** — current live configuration (the "after" state)

3. **`ops/derivation.md`** — original derivation record (the "before" state)

If these files don't exist, report error: "Cannot refactor without both ops/config.yaml and ops/derivation.md. These files establish the baseline and current configuration."

---

## EXECUTE NOW

**INVARIANT: /refactor never executes without approval.** The plan is always shown first.

**Target: $ARGUMENTS**

Parse immediately:
- If target is empty: detect ALL config changes and plan restructuring
- If target names a specific dimension (e.g., "granularity", "organization"): focus on that dimension only
- If target is `--dry-run`: show plan without asking for approval

**Execute these phases:**

1. Detect changes between config.yaml and derivation.md
2. Plan restructuring for each changed dimension
3. Show the plan with affected artifacts and risk assessment
4. Execute on approval (unless --dry-run)
5. Validate post-restructuring

**START NOW.** Reference below defines the workflow.

---

## Philosophy

**Configuration changes cascade.**

Changing a dimension is not just editing a value in config.yaml. Each dimension affects multiple artifacts — skills, templates, context file sections, hooks, MOC structure. Changing organization from "flat" to "hierarchical" means restructuring the notes directory, updating MOC templates, adjusting navigation references in the context file, and regenerating skills that reference folder structure.

/refactor makes these cascades visible and manages them. Without it, dimension changes create drift: config says one thing, artifacts say another. With it, every change is planned, approved, and validated.

**The relationship to /architect:** /architect RECOMMENDS changes. /refactor IMPLEMENTS them. /architect analyzes health and friction to propose dimension shifts. When those proposals are approved, /refactor ensures every affected artifact is updated consistently.

---

## Phase 1: Detect Changes

Compare each dimension in `ops/config.yaml` against the same dimension in `ops/derivation.md`:

**Step 1: Read both files**

Read `ops/config.yaml` and `ops/derivation.md` fully. Extract the position for each of the 8 dimensions from both.

**Step 2: Build comparison table**

| Dimension | Derivation Value | Config Value | Changed? | Drift Type |
|-----------|-----------------|--------------|----------|------------|
| granularity | [val] | [val] | [yes/no] | [aligned/misaligned] |
| organization | [val] | [val] | [yes/no] | [aligned/misaligned] |
| linking | [val] | [val] | [yes/no] | [aligned/misaligned] |
| processing | [val] | [val] | [yes/no] | [aligned/misaligned] |
| navigation | [val] | [val] | [yes/no] | [aligned/misaligned] |
| maintenance | [val] | [val] | [yes/no] | [aligned/misaligned] |
| schema | [val] | [val] | [yes/no] | [aligned/misaligned] |
| automation | [val] | [val] | [yes/no] | [aligned/misaligned] |

**Step 3: Check feature flags**

Also compare feature flags between derivation and config:

| Feature | Derivation | Config | Changed? |
|---------|-----------|--------|----------|
| semantic_search | [on/off] | [on/off] | [yes/no] |
| processing_pipeline | [on/off] | [on/off] | [yes/no] |
| self_space | [on/off] | [on/off] | [yes/no] |
| session_capture | [on/off] | [on/off] | [yes/no] |
| parallel_workers | [on/off] | [on/off] | [yes/no] |

**Step 4: Early exit if no changes**

If no changes detected:
```
--=={ refactor }==--

  No configuration drift detected between config.yaml and derivation.md.
  All dimensions and features match the original derivation.

  If you want to explore changes, run /architect for recommendations
  or edit ops/config.yaml directly, then run /refactor again.
```

---

## Phase 2: Plan Restructuring

For each changed dimension, determine ALL affected artifacts. This is the cascade analysis.

### Dimension-to-Artifact Mapping

| Change | Affected Artifacts | What Changes |
|--------|-------------------|-------------|
| **Granularity shift** | Note templates, extraction depth in /reduce, processing skills, context file "Note Design" section | Template body length guidance, extraction granularity settings, composability test thresholds |
| **Organization shift** | Folder structure, MOC hierarchy, context file "Folder Architecture" section, hub MOC | Directory layout, MOC tier count, navigation references |
| **Linking shift** | Semantic search config, /reflect connection density expectations, context file "Connection Finding" section | Search tool availability, link threshold values, discovery layer instructions |
| **Processing shift** | /reduce depth settings, /reflect pass count, pipeline skills, context file "Processing Pipeline" section, config.yaml processing.depth | Extraction thoroughness, connection evaluation depth, chaining mode |
| **Navigation shift** | MOC tier structure, hub MOC, context file "MOC" section, note Topics footers | Number of MOC tiers, hub content, navigation instructions |
| **Maintenance shift** | /health threshold values, condition-based trigger settings, context file maintenance instructions | Check frequency conditions, stale note thresholds, reweave trigger conditions |
| **Schema shift** | Templates (_schema blocks), validation rules, /validate skill, query scripts, context file "YAML" section | Required fields, enum values, validation patterns |
| **Automation shift** | Hooks (session orient, write validation, inbox processing), skill activation, config.yaml automation section | Which hooks are active, automation level references |

### Artifact Analysis Format

For each affected artifact, specify:

```
Artifact: [file path]
  Section: [specific section within the file, if applicable]
  Current: [what it says now — quote relevant content]
  Proposed: [what it should say after refactoring]
  Risk: [low | medium | high]
  Reversible: [yes | no — with explanation]
  Content impact: [does this affect existing notes? how many?]
```

### Content Impact Assessment

Some changes affect only infrastructure (skills, templates, context file). Others affect existing content (notes, MOCs):

| Change Type | Content Impact | Action Required |
|-------------|---------------|----------------|
| Template field addition | New notes get field, old notes don't | Add field to old notes (schema migration) |
| Template field removal | Old notes have unused field | Remove field from old notes (optional) |
| Folder restructure | Notes must move | Move files, update all wiki links |
| MOC tier change | MOC hierarchy restructured | Merge/split MOCs, update Topics footers |
| Enum value change | Old notes have invalid values | Update values in affected notes |

For content-impacting changes:
- Count affected notes: `grep -rl '[old value]' {vocabulary.notes}/*.md | wc -l`
- List specific files that need updating
- Estimate time for content migration

### Interaction Constraint Check

Read `${CLAUDE_PLUGIN_ROOT}/reference/interaction-constraints.md` and check:

1. **Hard blocks:** Would the new configuration create a combination that WILL fail?
   - Example: atomic granularity + 2-tier navigation at high volume
   - If a hard block is detected: WARN the user and recommend against the change

2. **Soft warns:** What friction points does the new configuration create?
   - Example: dense schema + convention-level automation (manual schema enforcement is tedious)
   - If soft warns exist: note them in the plan with compensating mechanisms

3. **Cascade effects:** Does changing dimension X create pressure on dimension Y?
   - If cascade detected: include Y in the restructuring plan even if Y did not change in config

---

## Phase 3: Show Plan

Present the complete restructuring plan:

```
--=={ refactor }==--

Detected [N] dimension changes:

  [dimension]: [old] -> [new]
    Affects:
    - [artifact 1]: [specific change]
    - [artifact 2]: [specific change]
    Content impact: [N] existing {vocabulary.note_plural} need [what]
    Risk: [low/medium/high]

  [dimension]: [old] -> [new]
    Affects:
    - [artifact 1]: [specific change]
    - [artifact 2]: [specific change]
    Content impact: none
    Risk: [low/medium/high]

Interaction constraints:
  - [Hard block | Soft warn | Clean]: [description]

Unchanged (preserved as-is):
  - [list artifacts not affected by changes]

Estimated implementation time: ~[N] minutes
Validation: Will run kernel validation after restructuring.
```

**If `--dry-run`:** Stop here. Do not ask for approval.

**Otherwise:** Ask: "Proceed with restructuring? (yes / no / adjust)"

**Handle responses:**

| Response | Action |
|----------|--------|
| "yes" | Execute Phase 4 |
| "no" | Exit without changes |
| "adjust" | Ask what to change, revise plan, re-present |

---

## Phase 4: Execute on Approval

Execute changes in strict order to prevent intermediate inconsistency:

### 4a. Archive Current State

Before making changes, record the current state for rollback reference:

```bash
# Log what is about to change
DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
echo "## $DATE: /refactor — [dimensions changed]" >> ops/changelog.md
echo "" >> ops/changelog.md
echo "Changes planned:" >> ops/changelog.md
echo "[list of changes]" >> ops/changelog.md
```

### 4b. Regenerate Affected Skills

For each skill affected by the dimension changes:

1. Read the current skill from the generated skills directory
2. Consult `${CLAUDE_PLUGIN_ROOT}/reference/` for the latest skill generation approach
3. Apply vocabulary transformation from derivation-manifest
4. Apply processing depth settings from the new config
5. Write the regenerated skill

**Skills most commonly affected by dimension changes:**

| Dimension Change | Skills to Regenerate |
|-----------------|---------------------|
| Granularity | /reduce, /verify, /validate |
| Processing | /reduce, /reflect, /reweave, /verify, /ralph, /pipeline |
| Linking | /reflect, /reweave |
| Navigation | /reflect (MOC update logic) |
| Schema | /validate, /verify |
| Automation | /ralph, /pipeline (chaining mode) |
| Maintenance | /health |

### 4c. Update Context File

Edit only the sections affected by changed dimensions. Do NOT rewrite the entire context file.

For each affected section:
1. Locate the section by heading
2. Read current content
3. Generate updated content reflecting new dimension positions
4. Replace the section using Edit tool
5. Verify surrounding sections are unchanged

### 4d. Update Templates

For schema changes:
1. Read affected templates from ops/templates/ (or templates/)
2. Update `_schema` blocks with new required fields, enum values, constraints
3. Write updated templates

### 4e. Update Hooks

If automation level changed:
1. Read current hooks from the hooks directory
2. Update trigger conditions, threshold values, or active/inactive state
3. Write updated hooks

### 4f. Update Derivation Records

After all changes are applied:

1. Update `ops/derivation.md` with:
   - New dimension positions
   - Rationale for each change
   - Date of change
   - Reference to /architect recommendation (if applicable)

2. Update `ops/derivation-manifest.md` to sync machine-readable config

3. Update `ops/config.yaml` to confirm it matches derivation (should already match since config triggered the refactor)

### 4g. Content Migration (if needed)

If Phase 2 identified content-impacting changes:

1. **Schema migration:** Add/remove/rename fields across notes
   ```bash
   # Example: add a new required field to all notes
   for f in {vocabulary.notes}/*.md; do
     grep -q '^new_field:' "$f" || sed -i '' '/^description:/a\
   new_field: [default value]' "$f"
   done
   ```

2. **Folder migration:** Move files to new locations
   ```bash
   # Use git mv to preserve history
   git mv "old/path/file.md" "new/path/file.md"
   ```

3. **Link updates:** Update all wiki links affected by renames
   ```bash
   # Use rename script if available
   ops/scripts/rename-note.sh "old name" "new name"
   ```

4. **MOC restructuring:** Merge/split MOCs as needed
   - For splits: create sub-MOCs, move Core Ideas, update parent
   - For merges: combine Core Ideas, remove redundant MOC, update notes' Topics footers

---

## Phase 5: Validate

Run kernel validation to confirm nothing broke:

### Validation Checks

| Check | How | Pass Criterion |
|-------|-----|----------------|
| Wiki link resolution | Scan for all `[[X]]` and verify X.md exists | Zero dangling links |
| Schema compliance | Check all notes against template _schema blocks | All required fields present, enum values valid |
| MOC hierarchy | Verify hub links to domain MOCs, domains link to topics | All tiers connected |
| Session orient | Simulate session start — can the context file be loaded? | No file-not-found errors |
| Three-space boundaries | Check notes vs ops vs self boundaries | No content in wrong space |
| Vocabulary consistency | Check that skills and context file use updated vocabulary | No stale universal terms |
| Skill integrity | Verify regenerated skills have valid frontmatter and structure | All skills parseable |

### Validation Report

```
--=={ refactor complete }==--

  Restructuring applied:
    [dimension]: [old] -> [new] — [N] artifacts updated
    [dimension]: [old] -> [new] — [N] artifacts updated

  Content migration:
    [N] {vocabulary.note_plural} updated with new schema fields
    [N] wiki links updated
    [N] {vocabulary.topic_map_plural} restructured

  Kernel validation: [N]/[N] checks PASS
  [Any warnings or issues]

  Derivation updated: ops/derivation.md
  Changelog updated: ops/changelog.md
```

If any validation checks fail:
```
  WARNING: [N] validation checks failed:
    - [check name]: [specific failure]

  Recommended action: [specific fix]
  Rollback guidance: [how to revert if needed]
```

---

## Edge Cases

### No ops/config.yaml or No ops/derivation.md

Cannot refactor without both files. Report error and suggest creating them:
```
Cannot run /refactor: [missing file] not found.
  - ops/config.yaml is the live configuration
  - ops/derivation.md is the original design baseline
  Both are required to detect dimension shifts.

  Run /setup to create a new system, or manually create the missing file.
```

### Single Dimension Focus

If $ARGUMENTS names a specific dimension:
1. Only check that dimension for changes
2. Still check interaction constraints (other dimensions may be affected by cascade)
3. Only restructure artifacts affected by that dimension

### No Changes Detected

Report clean state and exit (see Phase 1 early exit).

### Hard Block Detected

If an interaction constraint hard block is detected:
```
  HARD BLOCK: The proposed configuration [dimension X = val, dimension Y = val]
  creates a combination that will fail because [reason from interaction-constraints.md].

  Recommended: Either change [dimension X] back to [safe value] or also change
  [dimension Y] to [compensating value].

  Cannot proceed with current configuration. Adjust and re-run /refactor.
```

Do NOT proceed with restructuring when a hard block is active.

### Large Content Migration (100+ notes)

For large migrations:
1. Show the count and estimated time
2. Offer batch processing: "This affects 150 notes. Process all at once or in batches of 50?"
3. For batch processing, validate after each batch before continuing

### Feature Flag Changes

Feature flag changes (semantic_search, self_space, etc.) may require:
- Creating new directories (self/ for self_space on)
- Installing tools (qmd for semantic_search on)
- Removing hooks (for automation off)

Handle each feature flag change specifically:

| Flag | On -> Off | Off -> On |
|------|-----------|-----------|
| semantic_search | Remove search references from skills, update context file | Add search config, update skills with search integration |
| self_space | Archive self/ contents, remove self/ references | Create self/ structure, generate identity files |
| session_capture | INVARIANT — cannot disable | Already on (invariant) |
| parallel_workers | Update /ralph to serial-only mode | Verify tmux available, update /ralph for parallel mode |

### No ops/derivation-manifest.md

Use universal vocabulary. Refactoring still works but vocabulary transformation is skipped.
