# Feature: Semantic Search

## Context File Block

```markdown
## Semantic Search — Finding by Meaning

Beyond keyword matching — find {DOMAIN:notes} by meaning, not just words. A {DOMAIN:note} about "friction in systems" connects to one about "learning from errors" semantically even when they share no keywords. This matters because the vault's value comes from connections, and connections often exist between {DOMAIN:notes} that use different vocabulary for the same idea.

### Search Mode Selection

Three modes serve different needs. Choose based on what you are looking for:

| Mode | Use When | Speed | How It Works |
|------|----------|-------|-------------|
| Keyword (`rg`) | Know exact words, field queries | Instant | Text matching — finds exactly what you type |
| Semantic (vector) | Exploring a concept, checking for duplicates | ~5s | Embedding similarity — finds same meaning with different words |
| Hybrid (combined) | Finding deep connections, important searches | ~20s | Keyword + vector + LLM reranking — highest quality results |

**Default choice:** Use keyword search when you know the exact terms. Use semantic search when vocabulary might diverge from meaning. Use hybrid for important searches where quality matters more than speed.

### Query Patterns by Task Type

| Task | Search Mode | Why |
|------|-------------|-----|
| Checking if a source was already processed | Keyword | Filename matching — keywords are perfect |
| Duplicate detection before creating a {DOMAIN:note} | Semantic | Catches same-idea-different-words that keywords miss |
| Finding connections for a new {DOMAIN:note} | Hybrid | Maximum quality — runs once per {DOMAIN:note}, time justified |
| Testing description findability | Semantic | Tests what agents actually search with |
| Quick field lookup | Keyword | `rg '^type: pattern' {DOMAIN:notes}/` is instant and precise |
| Exploring what exists on a topic | Hybrid | Finds meaning across vocabularies |

### Keyword Search Patterns

Keyword search (ripgrep) is your workhorse for structured queries:

```bash
# Find {DOMAIN:notes} by type
rg '^type: pattern' {DOMAIN:notes}/

# Scan all descriptions
rg '^description:' {DOMAIN:notes}/

# Find {DOMAIN:notes} missing required fields
rg -L '^description:' {DOMAIN:notes}/*.md

# Find all mentions of a {DOMAIN:note}
rg '\[\[{DOMAIN:note} title\]\]' --glob '*.md'

# Find {DOMAIN:notes} by {DOMAIN:topic map}
rg '^topics:.*\[\[methodology\]\]' {DOMAIN:notes}/
```

Keyword search is fast, works everywhere, requires no external tools, and is precise for known vocabulary.

### Semantic Search Patterns

Semantic search finds meaning across vocabularies:

```bash
# Before creating — check for duplicates
# "Am I about to create a note that already exists in different words?"

# Finding connections — what relates to this concept?
# "What exists that connects to this idea, even with different terminology?"

# Exploring — what does the vault know about this?
# "Show me everything related to this theme, broadly"
```

Semantic search is especially valuable for duplicate detection. Two {DOMAIN:notes} might express the same idea using completely different words — keyword search would miss the overlap, but semantic search catches it.

### Index Maintenance

Semantic search indexes can go stale as {DOMAIN:notes} change. New {DOMAIN:notes} are not searchable until the index is updated. When search results seem incomplete or miss recent content:

1. Check index health — does the indexed document count match actual file count?
2. If mismatch, update the index to incorporate new and modified files
3. Regenerate embeddings for new content

Run index updates after batch processing or whenever search results feel stale.

### Fallback When Search Is Unavailable

Semantic search is valuable but not required. The system works without it. When semantic search is unavailable:

1. **Keyword search (rg)** — Always available. Precise for known vocabulary.
2. **{DOMAIN:Topic map} traversal** — Browse the relevant {DOMAIN:topic map} to see what exists in a topic area.
3. **Description scanning** — `rg '^description:' {DOMAIN:notes}/` loads all descriptions for manual review.
4. **Heading outlines** — `grep -n "^#" "{DOMAIN:note}.md"` shows a {DOMAIN:note}'s structure before reading fully.

Never let a search failure block work. The multi-layer discovery approach means you always have a way to find what you need.
```

## Dependencies
None — works standalone, but benefits from notes having good descriptions.

## Conditional
Only include when semantic search (qmd or equivalent) is opted in during onboarding. When excluded, the system relies on keyword search, MOC traversal, and progressive disclosure.
