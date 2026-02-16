---
# GENERATION TEMPLATE — Do not edit directly
# This template is transformed by the derivation engine during /setup.
# All {vocabulary.*} markers resolve from the preset's vocabulary.yaml.
# All {config.*} markers resolve from the preset's preset.yaml.
# All {DOMAIN:*} markers resolve from conversation-derived domain context.
# All {if ...}{endif} blocks are conditionally included based on config.
source_skill: validate
min_processing_depth: quick
platform: shared
---

---
name: validate
description: Schema validation for {vocabulary.note_plural}. Checks against domain-specific templates. Validates required fields, enum values, description quality, and link health. Non-blocking — warns but does not prevent capture. Triggers on "/validate", "/validate [{vocabulary.note}]", "check schema", "validate {vocabulary.note}", "validate all".
user-invocable: true
allowed-tools: Read, Grep, Glob
context: fork
model: sonnet
generated_from: "arscontexta-{plugin_version}"
---

## Runtime Configuration (Step 0 — before any processing)

Read these files to configure domain-specific behavior:

1. **`{config.ops_dir}/derivation-manifest.md`** — vocabulary mapping, platform hints
   - Use `vocabulary.notes` for the notes folder name
   - Use `vocabulary.note` / `vocabulary.note_plural` for note type references
   - Use `vocabulary.topic_map` for {DOMAIN:topic map} references
   - Use `vocabulary.templates` for the templates folder path

2. **`{config.ops_dir}/config.yaml`** — processing depth
   - `processing.depth`: deep | standard | quick

If these files don't exist, use universal defaults.

**Processing depth adaptation:**

| Depth | Validation Behavior |
|-------|---------------------|
| deep | Full schema validation. All checks enabled including composability analysis and cross-reference verification |
| standard | Full validation — all checks enabled |
| quick | Basic schema validation only — required fields, YAML validity, enum values |

## EXECUTE NOW

**Target: $ARGUMENTS**

Parse immediately:
- If target contains a {vocabulary.note} name: validate that specific {vocabulary.note}
- If target contains `--handoff`: output RALPH HANDOFF block at end
- If target is "all" or "{vocabulary.note_plural}": validate all {vocabulary.note_plural} in {config.notes_dir}/ directory
- If target is empty: ask which {vocabulary.note} to validate

**Execute these steps:**

### Step 1: Locate Template

Determine which template applies to the target {vocabulary.note}:

1. Check the {vocabulary.note}'s location — {vocabulary.note_plural} in {config.notes_dir}/ use the standard {vocabulary.note} template
2. Check the `type` field in frontmatter — specialized types may have dedicated templates
3. Look for a templates directory (check `{config.ops_dir}/templates/` or domain-specific path from derivation manifest)
4. If the template has a `_schema` block, read it — this is the authoritative schema definition

If no template is found, use the default schema checks below.

### Step 2: Read Target {vocabulary.note_title}

Read the target {vocabulary.note}'s full YAML frontmatter. Parse:
- All YAML fields and their values
- The body content (for link scanning)
- The footer section (for Topics and Relevant Notes)

### Step 3: Run Schema Checks

Run ALL validation checks. Each check produces PASS, WARN, or FAIL.

**START NOW.**

---

## Schema Checks

### Required Fields (FAIL if missing)

| Check | Rule | How to Verify |
|-------|------|---------------|
| `description` | Must exist and be non-empty | Check YAML frontmatter for `description:` field with non-empty value |
| Topics | Must link to at least one {DOMAIN:topic map} | Check for `topics:` in YAML or `Topics:` section in footer. Must contain at least one wiki link |

A missing required field is a hard failure. The {vocabulary.note} cannot pass validation without these.

### Description Quality (WARN if weak)

| Check | Rule | How to Verify |
|-------|------|---------------|
| Length | Should be ~50-200 characters | Count characters in description value |
| New information | Must add context beyond the title | Compare description text against filename/title — if semantically equivalent, WARN |
| No trailing period | Convention: descriptions don't end with periods | Check last character |
| Single sentence | Should be one coherent statement | Check for sentence-ending punctuation mid-description |

**How to check "adds new info":** Read the title (filename without .md). Read the description. If the description merely restates the title using different words, it fails this check. A good description adds one of:
- **Mechanism** — how or why the claim works
- **Scope** — what boundaries the claim has
- **Implication** — what follows from the claim
- **Context** — where the claim applies

**Examples:**

Bad (restates title):
- Title: `vector proximity measures surface overlap not deep connection`
- Description: "Semantic similarity captures surface-level overlap rather than genuine conceptual relationships"

Good (adds mechanism):
- Title: `vector proximity measures surface overlap not deep connection`
- Description: "Two notes about the same concept with different vocabulary score high, while genuinely related ideas across domains score low"

### YAML Validity (FAIL if broken)

| Check | Rule | How to Verify |
|-------|------|---------------|
| Frontmatter delimiters | Must start with `---` on line 1 and close with `---` | Read first line and scan for closing delimiter |
| Valid YAML | Must parse without errors | Check for common YAML errors: unquoted colons in values, mismatched quotes, bad indentation |
| No duplicate keys | Each YAML key appears only once | Scan for repeated field names |
| No unknown fields | Fields not in the template schema | Compare against `_schema.required` and `_schema.optional` if available — unknown fields get WARN |

### Domain-Specific Enum Checks (WARN if invalid)

If the {vocabulary.note} has fields with enumerated values, check them against the template's `_schema.enums` block:

| Field | Expected | Severity |
|-------|----------|----------|
| `type` | Values from template enum (e.g., claim, methodology, tension, problem, learning) | WARN |
| `status` | Values from template enum (e.g., preliminary, open, dissolved) | WARN |
| `classification` | Values from template enum (e.g., open, closed) | WARN |
| Custom domain fields | Values from template enum | WARN |

If a field has a value not in the enum list, report the invalid value and list the valid options.

### Link Health (WARN per broken link)

| Check | Rule | How to Verify |
|-------|------|---------------|
| Body wiki-links | Each `[[link]]` should point to an existing file | Extract all `[[...]]` patterns from body, check each against file tree |
| Topics links | {DOMAIN:topic map} referenced in Topics must exist | Verify each topic wiki link resolves |
| Relevant notes links | Each {vocabulary.note} in `relevant_notes` must exist | Verify each wiki link in relevant_notes resolves |
| Backtick exclusion | Wiki links inside backticks are examples, not real links | Skip `[[...]]` patterns inside single or triple backtick blocks |

**How to verify link resolution:** For each `[[link text]]`, check if a file named `link text.md` exists anywhere in the vault. Wiki links resolve by filename, not path.

### Relevant Notes Format (WARN if incorrect)

| Check | Rule | Severity |
|-------|------|----------|
| Format | Array with context: `["[[{vocabulary.note}]] -- relationship"]` | WARN |
| Context phrase present | Each entry should include `--` or followed by relationship description | WARN |
| Relationship type | Standard types: extends, foundation, contradicts, enables, example | INFO |
| No bare links | `["[[{vocabulary.note}]]"]` without context is a bare link — useless for navigation | WARN |

### Composability (WARN if fails)

| Check | Rule | How to Verify |
|-------|------|---------------|
| Title test | Can you complete "This {vocabulary.note} argues that [title]"? | Read the title as a sentence fragment — does it make a claim? |
| Specificity | Is the claim specific enough to disagree with? | Could someone reasonably argue the opposite? |
| Prose fitness | Would `since [[title]]` read naturally in another {vocabulary.note}? | Check if the title works as an inline wiki link |

**Topic labels vs claims:**
- "knowledge management" — topic label, not a claim, FAILS composability
- "knowledge management requires curation not accumulation" — claim, PASSES composability

## Batch Mode

When validating all {vocabulary.note_plural} (target is "all" or "{vocabulary.note_plural}"):

1. Discover all .md files in {config.notes_dir}/ directory
2. Optionally include additional directories if they exist
3. Run all schema checks on each {vocabulary.note}
4. Produce summary report:
   - Total {vocabulary.note_plural} checked
   - PASS / WARN / FAIL counts
   - Top issues grouped by check type
   - {vocabulary.note_plural} needing immediate attention (FAIL items)
   - Pattern analysis: are certain check types failing systematically?

**Batch output format:**

```
## Validation Summary

Checked: N {vocabulary.note_plural}
- PASS: M (X%)
- WARN: K (Y%)
- FAIL: J (Z%)

### FAIL Items (immediate attention)
| {vocabulary.note_title} | Check | Detail |
|------|-------|--------|
| [[{vocabulary.note}]] | description | Missing |
| [[{vocabulary.note}]] | topics | No topics footer |

### Top WARN Patterns
- Description restates title: N {vocabulary.note_plural}
- Missing context phrases in relevant_notes: N {vocabulary.note_plural}
- Enum value not in template: N {vocabulary.note_plural}

### {vocabulary.note_plural_title} Needing Attention
1. [[{vocabulary.note}]] — 2 FAIL, 1 WARN
2. [[{vocabulary.note}]] — 1 FAIL, 3 WARN
```

## Output Format (Single {vocabulary.note_title})

```
=== VALIDATION: [[{vocabulary.note} title]] ===

PASS:
- description: present, 147 chars, adds mechanism beyond title
- topics: ["[[{vocabulary.topic_map}]]"] — exists
- yaml: well-formed, valid delimiters
- composability: title works as prose ("This {vocabulary.note} argues that [title]")

WARN:
- relevant_notes: bare link without context phrase for [[{vocabulary.note}-x]]
- type: "observation" not in template enum (valid: claim, methodology, tension, problem, learning)

FAIL:
- (none)

Overall: PASS (2 warnings)
===
```

If WARN or FAIL items exist, include:

```
### Suggested Fixes
- **relevant_notes**: Add context phrase — e.g., `["[[{vocabulary.note}-x]] -- extends this by adding..."]`
- **type**: Change to valid enum value or propose adding "observation" to template
```

## Handoff Mode (--handoff flag)

When invoked with `--handoff`, output this structured format at the END:

```
=== RALPH HANDOFF: validate ===
Target: [[{vocabulary.note} title]]

Work Done:
- Validated against [template name] schema
- Checks run: N
- Status: PASS | WARN | FAIL

Findings:
- PASS: [list]
- WARN: [list or "none"]
- FAIL: [list or "none"]

Files Modified:
- [task file path] (Validate section updated, if applicable)

Learnings:
- [Friction]: [description] | NONE
- [Surprise]: [description] | NONE
- [Methodology]: [description] | NONE
- [Process gap]: [description] | NONE

Queue Updates:
- Mark: validate done for this task
=== END HANDOFF ===
```

## Task File Update

When a task file is in context (pipeline execution), update the `## Validate` section:

```markdown
## Validate
**Validated:** [UTC timestamp]

Schema check against [template name]:
- description: PASS (147 chars, adds mechanism beyond title)
- topics: PASS (["[[{vocabulary.topic_map}]]"])
- yaml: PASS (well-formed)
- type: not specified (optional)
- relevant_notes: WARN (bare link for [[{vocabulary.note}-x]])
- composability: PASS

Overall: PASS (1 warning)
```

## Severity Levels

| Level | Meaning | Action |
|-------|---------|--------|
| PASS | Meets requirement fully | None needed |
| WARN | Optional issue or soft violation | Consider fixing, not blocking |
| FAIL | Required field missing or invalid format | Must fix before verification passes |
| INFO | Informational observation | No action needed |

**FAIL blocks pipeline completion.** A {vocabulary.note} with any FAIL-level issue should NOT be marked done in the queue. It stays at `current_phase: "{vocabulary.verify}"` (or "validate" if run standalone) for re-validation after fixes.

**WARN does not block.** Warnings are quality signals, not gates. A {vocabulary.note} can proceed through the pipeline with warnings.

## Critical Constraints

**never:**
- block {vocabulary.note} creation based on validation failures (validation is a quality check, not a gate)
- auto-fix issues without reporting them first
- skip checks because the {vocabulary.note} "looks fine"
- report PASS without actually running the check
- ignore `_schema` blocks in templates when they exist

**always:**
- check ALL schema requirements, not a subset
- report specific field values in FAIL/WARN messages (not just "description is weak")
- suggest concrete fixes for every WARN and FAIL
- use template `_schema` as the authoritative source when available
- fall back to default checks gracefully when no template exists
- log patterns when running batch validation (recurring issues signal systematic problems)
