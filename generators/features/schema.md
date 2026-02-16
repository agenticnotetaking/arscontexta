# Feature: Schema

## Context File Block

```markdown
## {DOMAIN:Note} Schema — Structured Metadata for Queryable Knowledge

Every {DOMAIN:note} has YAML frontmatter — structured metadata that makes {DOMAIN:notes} queryable. Without schema, {DOMAIN:notes} are just files. With schema, your vault is a queryable graph database where ripgrep operates as the query engine over structured fields.

Schema enforcement is an INVARIANT. Every vault validates structured metadata because without it, YAML frontmatter drifts and queries break. The validation catches errors at creation time, not discovery time.

### Field Definitions

**Base fields (universal across all {DOMAIN:note} types):**

```yaml
---
description: One sentence adding context beyond the title (~150 chars, no period)
type: insight | pattern | preference | fact | decision | question
created: YYYY-MM-DD
---
```

| Field | Required | Type | Constraints |
|-------|----------|------|------------|
| `description` | Yes | string | Max 200 chars, no trailing period, must add info beyond title |
| `type` | No | enum | Default omitted for standard {DOMAIN:notes}; add when querying by type matters |
| `created` | No | date | ISO format YYYY-MM-DD |
| `modified` | No | date | Updated when content meaningfully changes (not minor formatting) |
| `status` | No | enum | `preliminary`, `open`, `active`, `archived` |

**`description` is the most important field.** It enables progressive disclosure: an agent reads the title and description to decide whether to load the full {DOMAIN:note}. If the description just restates the title, it wastes that decision point. The description must add scope, mechanism, or implication that the title does not cover.

**`type` is optional for standard {DOMAIN:notes}.** Most {DOMAIN:notes} are insights or claims — that is the default. Add `type` explicitly when:
- You want to query {DOMAIN:notes} by category (all patterns, all decisions)
- The {DOMAIN:note} is a special type (tension, methodology, problem)
- Domain-specific types exist that matter for retrieval

### Enum Values

Type values define categories of {DOMAIN:notes}. The default set:

| Value | When to Use |
|-------|------------|
| `insight` | A realization or understanding (default, can omit) |
| `pattern` | A recurring structure worth naming |
| `preference` | A stated preference or value |
| `fact` | An objective observation or datum |
| `decision` | A choice made with reasoning |
| `question` | An unresolved question worth tracking |
| `tension` | A conflict between two ideas |
| `methodology` | A way of working or processing |

**Domain-specific enums** are added during derivation. A therapy vault might add `reflection`, `trigger`, `coping-strategy`. A PM vault might add `requirement`, `risk`, `dependency`. The template `_schema` block is the single source of truth for what values are valid.

### Query Patterns

YAML + ripgrep = a queryable database. These patterns work across any domain:

```bash
# Find all {DOMAIN:notes} of a specific type
rg '^type: pattern' {DOMAIN:notes}/

# Scan all descriptions for a concept
rg '^description:.*friction' {DOMAIN:notes}/

# Find {DOMAIN:notes} missing required fields
rg -L '^description:' {DOMAIN:notes}/*.md

# Find {DOMAIN:notes} by {DOMAIN:topic map}
rg '^topics:.*\[\[methodology\]\]' {DOMAIN:notes}/

# Cross-field queries — find pending tensions
rg -l '^type: tension' {DOMAIN:notes}/ | xargs rg '^status: pending'

# Count {DOMAIN:notes} by type
rg '^type:' {DOMAIN:notes}/ --no-filename | sort | uniq -c | sort -rn

# Find {DOMAIN:notes} with specific relationship types
rg 'extends' {DOMAIN:notes}/ --glob '*' | grep 'Relevant Notes'

# Find backlinks to a specific {DOMAIN:note}
rg '\[\[{DOMAIN:note} title\]\]' --glob '*.md'

# Count backlinks
rg -l '\[\[{DOMAIN:note} title\]\]' --glob '*.md' | wc -l
```

**The pattern:** structured metadata in files IS the database. Dynamic queries via ripgrep mean you do not need separate indices. This scales: at 50 {DOMAIN:notes}, querying all descriptions takes milliseconds. At 500, it is still faster than maintaining a static index that goes stale.

### Schema Evolution Rules

Schemas evolve through observation, not decree:

1. **Observe** — Notice that {DOMAIN:notes} are consistently using a field or pattern not in the template
2. **Validate** — Check that the pattern is genuinely useful (not just one-off usage)
3. **Formalize** — Add the field to the template with proper `_schema` documentation
4. **Backfill** — Optionally update existing {DOMAIN:notes} to include the new field

The opposite flow also works: if a field is never queried, remove it from the template. Dead fields add noise without value. The test is always retrieval: does this field help you FIND things?

**Adding new enum values:** When a field's valid values need expanding (e.g., a new `type` category), update the template's `_schema` block first. The template is the single source of truth for what values are valid. Then use the new value in your {DOMAIN:notes}. Never invent new enum values inline — formalize them first.

### Validation Mechanism

{DOMAIN:Notes} are validated against templates. Validation catches drift without blocking capture.

**What gets checked:**
- **Required fields** — `description` must exist on every {DOMAIN:note}
- **Enum values** — type, status, category must be valid values from the template `_schema`
- **Description quality** — must add information beyond the title (not a restatement)
- **Link health** — wiki links must point to real {DOMAIN:notes}
- **{DOMAIN:Topic map} membership** — every {DOMAIN:note} should link to at least one {DOMAIN:topic map}

**Severity levels:**
- **PASS** — meets all criteria
- **WARN** — minor issues (missing optional fields, short description)
- **FAIL** — structural issues (missing description, broken links, invalid enum values)

**When validation runs:**
- After creating new {DOMAIN:notes} (automated via the /{DOMAIN:verify} phase)
- During health checks (/{DOMAIN:health} command)
- As part of the verify phase in pipeline processing

**Non-blocking principle:** Validation warns but does not prevent capture. Speed at capture time matters more than perfection. Fix issues during processing, not during capture. The pipeline catches and resolves validation failures systematically.

### Template Schema Blocks

Templates include `_schema` blocks that serve as both documentation and validation rules:

```yaml
_schema:
  required: [description]
  optional: [type, status, created, modified]
  enums:
    type: [insight, pattern, preference, fact, decision, question]
    status: [preliminary, open, active, archived]
  constraints:
    description: "max 200 chars, no trailing period, must add info beyond title"
```

The `_schema` block is the single source of truth for field validation. Skills and hooks read it to check compliance. When you see a field with enumerated values, use one of the listed values — or update the template first if a new value is genuinely needed.
```

## Dependencies
None — this is a foundational feature.

## Domain Extensions
Append domain-specific fields based on use case selection. See `reference/templates/` for domain schemas.
