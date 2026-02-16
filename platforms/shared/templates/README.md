# shared/templates/ -- Note Type Templates

Note type templates live at `reference/templates/`. They define the YAML frontmatter schema and structural patterns for each note type a generated vault can contain.

This directory does not duplicate those files. It exists to document the shared template layer from a distribution perspective.

## Canonical Source

All template files: `reference/templates/`

## The 10 Note Type Templates

| # | Template | Purpose |
|---|----------|---------|
| 1 | `base-note.md` | Foundation template -- minimal fields shared by all note types |
| 2 | `research-note.md` | Research claims, methodology citations, adapted_from tracking |
| 3 | `therapy-note.md` | Therapeutic journaling with mood, themes, and safety-aware structure |
| 4 | `learning-note.md` | Learning captures with confidence tracking and spaced review signals |
| 5 | `creative-note.md` | Creative work fragments with stage tracking and revision history |
| 6 | `relationship-note.md` | Relationship observations with interaction logging and patterns |
| 7 | `life-note.md` | Life management notes for goals, decisions, and personal systems |
| 8 | `companion-note.md` | Companion/conversational captures with emotional context |
| 9 | `moc.md` | Map of Content structure with synthesis, core ideas, tensions, gaps |
| 10 | `session-log.md` | Session boundary logging with orientation, work done, and handoff |

## How Templates Are Used

During generation (/setup), the derivation engine selects which templates to include based on the derived configuration:

- **Domain determines primary template.** A therapy system gets `therapy-note.md` as its primary note template. A research system gets `research-note.md`.
- **Base template is always inherited.** Every note type builds on `base-note.md` fields.
- **MOC and session-log are always included.** These are structural templates needed by every system.
- **Multi-domain systems get multiple note templates.** A system with both research and creative domains gets both `research-note.md` and `creative-note.md`.

Templates are platform-agnostic. The same `therapy-note.md` template works regardless of the agent platform.
