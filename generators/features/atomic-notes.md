# Feature: Atomic Notes

## Context File Block

```markdown
## Atomic Notes — One Insight Per File

Each {DOMAIN:note} captures exactly one insight, titled as a prose proposition. This is the foundational design constraint that makes everything else work: wiki links compose because each node is a single idea. {DOMAIN:Topic maps} navigate because each entry is one claim. Search retrieves because each result is self-contained. Without atomicity, every other feature degrades.

### The Prose-as-Title Pattern

Title your {DOMAIN:notes} as complete thoughts that work in sentences. The title IS the concept — express the idea clearly in exactly the words that capture it, even if that takes a full sentence.

Good titles (specific claims that work as prose when linked):
- "Mom prefers phone calls on Sunday mornings"
- "The anxiety usually starts when I skip morning routine"
- "Spaced repetition works better when I study after exercise"
- "The venue fits 30 people theater-style but only 15 for dinner"

Bad titles (topic labels, not claims):
- "Morning routine" (what about it?)
- "Anxiety" (too vague to link meaningfully)
- "Venue details" (a filing label, not an idea)

**The claim test:** Can you complete this sentence?

> This {DOMAIN:note} argues that [title]

If the title works in that frame, it is a claim. If it does not, it is probably a topic label. "This {DOMAIN:note} argues that Mom prefers phone calls on Sunday mornings" works. "This {DOMAIN:note} argues that morning routine" does not.

Good titles work in multiple grammatical positions:
- "Since [[title]], the question becomes..."
- "The insight is that [[title]]"
- "Because [[title]], we should..."

Never start a sentence with a {DOMAIN:note} title — use "since," "because," "the insight that," or similar constructions that make the title flow naturally as prose.

### The Composability Test

Three checks before saving any {DOMAIN:note}:

1. **Standalone sense** — Does the {DOMAIN:note} make sense without reading three other {DOMAIN:notes} first? If you link to this {DOMAIN:note} from another context, will it be understandable? The {DOMAIN:note} needs enough internal context to be self-contained.

2. **Specificity** — Could someone disagree with this? If not, it is too vague. "Quality is important" is impossible to argue with. "Quality matters more at scale because small differences compound through selection" is specific enough to challenge. Specificity makes {DOMAIN:notes} useful: you can build on them, argue with them, and reference them precisely.

3. **Clean linking** — Would linking to this {DOMAIN:note} drag unrelated content along? If the {DOMAIN:note} covers multiple topics, linking to one brings the others whether you want them or not. Each {DOMAIN:note} should be linkable without importing irrelevant context.

If any check fails, the {DOMAIN:note} needs work before it earns its place in {DOMAIN:notes}/.

### When to Split

Split a {DOMAIN:note} when:
- It makes multiple distinct claims. Each claim becomes its own file with its own prose title. The originals link to each other.
- Linking to one part would drag unrelated content from another part.
- One section could be referenced independently but the rest would confuse.
- The title is too vague because the {DOMAIN:note} tries to cover too much ground.

The split test: if you find yourself wanting to link to "the second paragraph of [[note]]" rather than to the whole {DOMAIN:note}, the {DOMAIN:note} needs splitting.

### Title Rules

- Lowercase with spaces
- No punctuation that breaks filesystems: . * ? + [ ] ( ) { } | \ ^
- Use proper grammar
- Express the concept fully — there is no character limit
- Each title must be unique across the entire workspace (wiki links resolve by name, not path)
- Composability over brevity — a full sentence is fine if it captures the idea precisely

### YAML Schema

Every {DOMAIN:note} has structured metadata in YAML frontmatter:

```yaml
---
description: One sentence adding context beyond the title (~150 chars)
---
```

The `description` field is required. It must add NEW information beyond the title. Title gives the claim; description gives scope, mechanism, or implication that the title does not cover.

Bad (restates the title):
- Title: `anxiety usually starts when I skip morning routine`
- Description: Skipping morning routine tends to trigger anxiety

Good (adds scope and mechanism):
- Title: `anxiety usually starts when I skip morning routine`
- Description: The pattern holds most on workdays — weekends are fine without the routine, suggesting it is about transition stress, not the routine itself

The good description tells you: the scope (workdays vs weekends), the mechanism (transition stress), and the implication (the routine is a coping mechanism for work stress, not intrinsically necessary). Someone scanning descriptions now knows what this {DOMAIN:note} is actually about at a deeper level than the title alone conveys.

Optional fields may be added when relevant:
```yaml
type: insight | pattern | preference | fact | decision | question
status: preliminary | active | archived
created: YYYY-MM-DD
```

Standard {DOMAIN:notes} do not need `type` — it is the default. Add `type` when the {DOMAIN:note} type matters for querying (e.g., finding all patterns, all decisions, all tensions).

### Inline Link Patterns

{DOMAIN:Note} titles work as prose when linked. Use them AS arguments, not references to arguments:

Good patterns:
- "Since [[Mom prefers phone calls on Sunday mornings]], I should call her this weekend"
- "The insight is that [[spaced repetition works better when I study after exercise]]"
- "Because [[the venue fits 30 people theater-style but only 15 for dinner]], we need to decide the format"

Bad patterns:
- "See [[Mom prefers phone calls on Sunday mornings]] for more"
- "As discussed in [[spaced repetition works better when I study after exercise]]"
- "This relates to [[the venue fits 30 people theater-style but only 15 for dinner]]"

If you catch yourself writing "this relates to" or "see also," stop and restructure the sentence so the claim itself does the work. The link text IS the argument.

### Section Headings

Not every {DOMAIN:note} needs headings. Short {DOMAIN:notes} with a single coherent argument flowing linearly are best as prose. Headings serve navigation — use them when the {DOMAIN:note} exceeds roughly 800 words with distinct sub-topics, contains decision tables or implementation patterns, or explores uncertainty separately from established claims.

The navigation test: would scanning headings help you find a specific section? If yes, use headings. If the {DOMAIN:note} is one continuous thought, flowing prose serves better.
```

## Dependencies
None — this is a foundational feature.
