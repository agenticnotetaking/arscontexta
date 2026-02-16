# Feature: Templates

## Context File Block

```markdown
## Templates — Schema as Scaffolding

Templates define the structure of each {DOMAIN:note} type. They're not rigid forms to fill — they're scaffolding that ensures consistency while leaving room for the content that matters.

### How Templates Work

Each template lives in `ops/templates/` and defines:
- Required YAML fields (what every {DOMAIN:note} of this type must have)
- Optional YAML fields (available when relevant)
- A {DOMAIN:_schema} block that documents field constraints and valid values
- The body structure (headings, sections, footer pattern)

When creating a new {DOMAIN:note}, start from the appropriate template. The template tells you what metadata to include and how to structure the content.

### Schema References

Templates include {DOMAIN:_schema} blocks that define validation rules:

```yaml
_schema:
  required: [description, type]
  optional: [status, created]
  enums:
    type: [insight, pattern, preference, fact, decision, question]
    status: [preliminary, open, active, archived]
  constraints:
    description: "max 200 chars, no trailing period"
```

The schema is documentation AND validation. Skills and hooks can read {DOMAIN:_schema} blocks to check that {DOMAIN:notes} comply. When you see a field with enumerated values, use one of the listed values — don't invent new ones without updating the template first.

### The Template-Note Relationship

Templates define structure. Notes fill that structure with content. The relationship is:

| Template says | Note does |
|---------------|-----------|
| `description` is required | Every note has a description |
| `type` enum: insight, pattern, ... | Note uses one of those values |
| Body has ## sections | Note follows section order |
| Footer has Topics | Note links to its {DOMAIN:topic maps} |

Templates are NOT content. They never contain actual claims or arguments — that's the note's job. Templates define the shape; notes provide the substance.

### When to Create New Templates

Create a new template when:
- A new {DOMAIN:note} type emerges that doesn't fit existing templates
- You find yourself repeatedly adding the same fields to notes manually
- A domain grows complex enough to warrant its own schema

Don't create templates speculatively. Wait until you have 3+ {DOMAIN:notes} that share a pattern, then extract the template from what works.

### Schema Evolution Rules

Schemas evolve through observation, not decree:

1. **Observe** — Notice that {DOMAIN:notes} are consistently using a field or pattern not in the template
2. **Validate** — Check that the pattern is genuinely useful (not just one-off)
3. **Formalize** — Add the field to the template with proper {DOMAIN:_schema} documentation
4. **Backfill** — Optionally update existing {DOMAIN:notes} to include the new field

The opposite flow also works: if a field is never used, remove it from the template. Dead fields add noise without value.

**Adding new enum values:**
When a field's valid values need expanding (e.g., a new `type` category), update the template's {DOMAIN:_schema} block first. The template is the single source of truth for what values are valid. Then use the new value in your {DOMAIN:notes}.

### How to Add New Templates as Domains Grow

As your knowledge system expands into new domains, new {DOMAIN:note} types may emerge:

1. Write 3-5 {DOMAIN:notes} of the new type without a template (let the pattern emerge naturally)
2. Review what fields and structures they share
3. Extract a template to `ops/templates/` capturing the common pattern
4. Document the {DOMAIN:_schema} with required fields, optional fields, and enums
5. Reference the new template in ops/context.md so future sessions know it exists
```

## Dependencies
None — templates are foundational infrastructure for all note types.
