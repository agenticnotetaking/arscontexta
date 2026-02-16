# Feature: Methodology Knowledge

## Context File Block

```markdown
## Your System's Self-Knowledge (ops/methodology/)

Your vault knows why it was built the way it was. The `ops/methodology/` folder contains linked notes explaining configuration rationale, learned behavioral patterns, and operational evolution. This is not documentation *about* your system — it IS your system's self-model.

### What Lives Here

| Content | Created By | Purpose |
|---------|-----------|---------|
| Derivation rationale | /setup | Why each dimension was configured this way |
| Behavioral patterns | /{DOMAIN:remember} | Learned corrections and operational guidance |
| Configuration state | /{DOMAIN:rethink}, /architect | Active features, threshold adjustments |
| Evolution history | /{DOMAIN:rethink}, /architect, /reseed | What changed and why |

### How to Query Your Methodology

Your methodology notes are plain markdown with YAML frontmatter. Query them directly — no special tools needed.

```bash
# List all methodology notes
ls ops/methodology/*.md

# Search by category
rg '^category:' ops/methodology/

# Find active directives (not archived)
rg '^status: active' ops/methodology/

# Keyword search across methodology
rg -i 'duplicate' ops/methodology/

# Read a specific note
cat ops/methodology/derivation-rationale.md
```

### When to Consult Methodology

| Task | Grep Pattern | What You'll Find |
|------|-------------|-----------------|
| Processing a source | `rg -i 'pipeline\|processing\|extract' ops/methodology/` | Pipeline preferences, extraction categories |
| Finding connections | `rg -i 'connect\|link\|reflect' ops/methodology/` | Linking philosophy, connection standards |
| Maintaining the graph | `rg -i 'maintenance\|health\|reweave' ops/methodology/` | Maintenance thresholds, condition triggers |
| Writing for the domain | `rg -i 'voice\|tone\|vocabulary' ops/methodology/` | Domain vocabulary, personality guidance |
| Quality checking | `rg -i 'quality\|schema\|validate' ops/methodology/` | Schema expectations, validation rules |

**Key rule:** When methodology notes contradict the context file on behavioral specifics, methodology notes are the more current authority. The context file defines the architecture; methodology notes capture operational learnings that refine it.

### The Research Foundation

Your system's design choices are backed by a knowledge base of 249 interconnected methodology notes — research claims, guidance documents, and domain examples — covering knowledge systems, cognitive science, and agent cognition. Access it through:

```
/ask "why does my system use atomic notes?"
/ask "what are the trade-offs of condition-based maintenance?"
/ask "how should I handle sources that span multiple domains?"
```

The /ask command consults two knowledge layers:
- **Local methodology** (ops/methodology/) — "How does MY system work?" questions
- **Research graph** (249 bundled methodology notes) — "Why is this a good idea in general?" questions

When you need to understand a design choice: check ops/methodology/ for the specific rationale, then /ask for the theoretical backing.
```

## Dependencies
Requires: self-evolution (methodology-knowledge teaches querying; self-evolution teaches capturing and Rule Zero)
