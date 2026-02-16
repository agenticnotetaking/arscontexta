# shared/features/ -- Canonical Feature Blocks

The 16 canonical feature blocks live at `generators/features/`. They are composable context file fragments that the derivation engine selects, transforms with domain vocabulary, and composes into a coherent system document.

This directory does not duplicate those files. It exists to document the shared feature layer from a distribution perspective.

## Canonical Source

All feature block files: `generators/features/`

## The 16 Feature Blocks

| # | Block | Included When | What It Adds |
|---|-------|---------------|--------------|
| 1 | `atomic-notes.md` | Granularity = atomic or moderate | Atomicity principles, composability test, split signals |
| 2 | `wiki-links.md` | Always | Link philosophy, inline vs footer patterns, propositional semantics |
| 3 | `mocs.md` | Navigation depth >= 2-tier | MOC types, lifecycle, maintenance protocol, health thresholds |
| 4 | `processing-pipeline.md` | Always | Phase skeleton, skill invocation rules, quality gates, processing depth config |
| 5 | `semantic-search.md` | qmd opted in during onboarding | Search strategy, semantic vs keyword, query patterns, fallback |
| 6 | `schema.md` | Always | Field definitions, query patterns, evolution rules, validation |
| 7 | `maintenance.md` | Always | Health checks, reweaving triggers, condition-based maintenance |
| 8 | `self-evolution.md` | Always | Architect advice, /remember-driven adoption, reseed lifecycle |
| 9 | `personality.md` | When personality is derived | Voice instructions, identity generation, anti-patterns |
| 10 | `session-rhythm.md` | Always | Orient, work, persist phases, handoff protocol, session capture |
| 11 | `templates.md` | When templates are generated | Template usage instructions, schema references |
| 12 | `multi-domain.md` | Multiple domains detected | Cross-domain linking, shared graph, domain-specific templates |
| 13 | `ethical-guardrails.md` | Always | Privacy, transparency, emotional safety, autonomy encouragement |
| 14 | `self-space.md` | Optional (off for research, on for personal assistant) | Agent identity, memory, reflections, goals |
| 15 | `helper-functions.md` | Always | Safe rename, graph maintenance, utility scripts |
| 16 | `graph-analysis.md` | Always | Graph traversal, topology analysis, synthesis detection, domain-adapted queries |

## Always-Included Blocks

Ten blocks are non-negotiable and present in every generated system regardless of configuration:

- `wiki-links.md` (2)
- `processing-pipeline.md` (4)
- `schema.md` (6)
- `maintenance.md` (7)
- `self-evolution.md` (8)
- `session-rhythm.md` (10)
- `templates.md` (11)
- `ethical-guardrails.md` (13)
- `helper-functions.md` (15)
- `graph-analysis.md` (16)

## Architecture

Each block has a defined layer, dependencies, and platform requirements:

| # | Block | Layer | Dependencies |
|---|-------|-------|-------------|
| 1 | `atomic-notes.md` | Convention | wiki-links |
| 2 | `wiki-links.md` | Foundation+Convention | None |
| 3 | `mocs.md` | Convention | wiki-links |
| 4 | `processing-pipeline.md` | Convention+Automation | atomic-notes, wiki-links, mocs |
| 5 | `semantic-search.md` | Automation | None |
| 6 | `schema.md` | Convention+Automation | templates |
| 7 | `maintenance.md` | Convention | mocs, wiki-links |
| 8 | `self-evolution.md` | Convention | maintenance |
| 9 | `personality.md` | Convention | None |
| 10 | `session-rhythm.md` | Convention | None |
| 11 | `templates.md` | Convention | None |
| 12 | `multi-domain.md` | Convention | mocs, templates |
| 13 | `ethical-guardrails.md` | Convention | None |
| 14 | `self-space.md` | Convention | None |
| 15 | `helper-functions.md` | Automation | None |
| 16 | `graph-analysis.md` | Automation | wiki-links, schema |

Feature blocks are platform-agnostic. They are composed into the Claude Code context file format (CLAUDE.md).
