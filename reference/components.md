# Component Blueprints

How to build each component of a knowledge system. Each blueprint explains WHAT the component does, WHY it matters (linked to cognitive science), and HOW to implement it. Blueprints teach understanding so agents can self-extend.

---

## Notes — Atomic Knowledge Units

**What:** One insight per file, titled as a prose proposition.

**Why:** Atomic notes are composable — you can link to exactly the idea you need without dragging unrelated content along. Since wiki links resolve by filename, the title IS the API signature: `[[Mom prefers phone calls on Sunday mornings]]` works as prose in any context.

**How to implement:**
- Title: lowercase prose proposition (no punctuation that breaks filesystems)
- Body: reasoning that supports the title claim
- YAML frontmatter: `description` (required), domain-specific fields (optional)
- Footer: `Topics:` linking to parent MOC(s)

**Quality gate:** The composability test — can you complete "This note argues that [title]"? If yes, it's a proper note. If not, it's a topic label.

**Template:** See `templates/base-note.md`

---

## Schema — Structured Metadata via YAML

**What:** YAML frontmatter that makes notes queryable like a database.

**Why:** Metadata reduces entropy. Pre-computed low-entropy representations (type, domain, mastery level) shrink the search space. An agent scanning 500 notes can filter by `type: pattern` before reading anything — this is retrieval utility driving design.

**How to implement:**
- Universal base: `description`, `type`, `created`
- Domain extensions: add fields relevant to the use case
- Query via ripgrep: `rg '^type: pattern' notes/`
- Templates define valid schemas per domain

**Evolution:** Schemas are living structures. Add fields when a genuine querying need emerges. Remove fields nobody queries. The template is the single source of truth.

---

## Links — Graph Edges via Wiki-Links

**What:** `[[note title]]` creates an explicit edge between notes.

**Why:** Wiki links implement spreading activation for agents. Reading one note activates related notes through explicit edges, enabling multi-hop reasoning. Each new link increases the value of both connected notes by creating new traversal paths. The network compounds — at 1000 connected nodes, millions of potential paths exist.

**How to implement:**
- Inline links with context: "Since [[note]], the question becomes..."
- Never link to non-existent notes (creates confusion, not demand signals in a new vault)
- Bidirectional: when A links to B, consider whether B should link back to A
- Context phrases explain WHY: "extends this by adding X" not just "related"

**Quality gate:** Can you articulate WHY two notes connect? If you can only say "related," the connection isn't meaningful enough.

---

## Navigation — MOCs as Attention Management

**What:** Maps of Content that organize notes by topic and provide entry points.

**Why:** MOCs reduce context-switching cost. For humans: the 23-minute reorientation penalty after interruption. For agents: context window attention degradation when irrelevant material fills the smart zone. MOCs present topic state immediately — what's known, what's in tension, what's unexplored.

**How to implement:**
- Hub MOC: `identity.md` or `index.md` — entry point linking to domain MOCs
- Domain MOCs: `methodology.md`, `goals.md`, `relationships.md` — topic areas
- Topic MOCs: specific areas within domains
- Every note links back to its MOC(s) via Topics footer
- MOC sections: Core Ideas, Tensions, Open Questions

**When to split:** When a MOC exceeds ~35-40 links and distinct sub-communities form.

**Template:** See `templates/moc.md`

---

## Folders — Physical Organization

**What:** Directory structure that separates capture, working, and archive.

**Why:** The mental model is: inbox → working → archive. Capture needs zero friction (don't think about where to put it). Working space needs clean navigation. Archive preserves history without cluttering active views.

**How to implement:**
```
notes/          — structured knowledge (atomic notes + MOCs)
inbox/          — zero-friction capture zone
archive/        — processed sources, completed work
self/           — agent's persistent mind space
  ├── identity.md
  ├── methodology.md
  ├── goals.md
  ├── memory/   — atomic insights
  ├── sessions/ — session logs
  └── journal/  — raw session capture
templates/      — note templates per domain
```

**Principle:** If it's in inbox, it's unprocessed. If it's in notes, it's structured. If it's in archive, it's done.

---

## Templates — Reusable Structures

**What:** Pre-defined note structures per domain with required fields and valid values.

**Why:** Schema templates reduce cognitive overhead at capture time. They shift decisions from "what fields should I use?" to "what values should I fill in?" — execution over design.

**How to implement:**
- One template per domain (research, learning, relationships, etc.)
- Universal base template for domain-agnostic notes
- MOC template for navigation hubs
- Session log template for session capture
- Templates define valid enum values for constrained fields

**Templates are the single source of truth for schema.** Validation checks notes against templates.

---

## Hooks — Event-Driven Automation

**What:** Scripts that run at event boundaries (session start, before/after tool use).

**Why:** Hooks make methodology invisible. Instead of remembering to orient at session start, a hook does it automatically. Instead of remembering to validate after note creation, a hook catches drift. Hooks encode habits that don't require willpower.

**Blueprint — Session Orientation Hook:**
```
Event: SessionStart
Action: Read self/ orientation files, inject workspace tree
Purpose: Agent starts every session knowing who it is and what exists
```

**Blueprint — Note Validation Hook:**
```
Event: PostToolUse (Write)
Condition: File is in notes/ directory
Action: Check YAML schema, verify description exists, check for wiki-links
Purpose: Catch quality drift immediately, not during maintenance
```

**Implementation:**
- Claude Code: `.claude/hooks/` with bash scripts

---

## Search — Retrieval Infrastructure

**What:** Multiple search modes for finding content by keywords or meaning.

**Why:** At 50 notes, you can read everything. At 500, you can't. Search becomes essential, but keyword search misses connections between notes that use different vocabulary. Semantic search (vector embeddings) finds meaning across vocabularies.

**How to implement:**
- **Keyword search** (ripgrep): Fast, exact matches, works everywhere
- **Semantic search** (qmd or similar): Vector embeddings, finds same-concept-different-words
- **Hybrid search**: BM25 + vectors + LLM reranking for highest quality

**Fallback chain:** Always maintain a non-semantic discovery path (MOC traversal + keyword search) so search failures never block work.

**When to use which:**
- Know exact words → keyword search
- Exploring a concept → semantic search
- Checking for duplicates → vector search
- Finding connections → hybrid search with reranking

---

## Health — Maintenance Operations

**What:** Automated checks that keep the knowledge system from decaying.

**Why:** Knowledge systems decay without maintenance. Notes written yesterday don't know about notes written today. Without health checks, the network fragments into temporal layers that don't reference each other. Maintenance is as important as creation.

**Blueprint — Schema Validation:**
```
Check each note against its template:
- Required fields present?
- Enum values valid?
- Description exists and adds info beyond title?
Output: PASS/WARN/FAIL per note
```

**Blueprint — Orphan Detection:**
```
Find notes with no incoming wiki-links:
- Orphans are seeds, not failures — creation is valid
- But persistent orphans need connections or archiving
- Prioritize connecting over deleting
```

**Blueprint — Stale Note Detection:**
```
Find notes untouched for N days:
- Age alone doesn't mean staleness
- Combine with: low link density, no recent connections
- Surface for reweaving (backward maintenance pass)
```

**Blueprint — Link Health:**
```
Verify all wiki-links point to existing notes:
- Dangling links create confusion
- Missing targets might indicate notes that should be created
- Report as actionable list
```

**Blueprint — MOC Coherence:**
```
Check MOC coverage:
- Notes not appearing in any MOC → potential orphans
- MOCs with too many links → split candidates
- MOCs with too few links → merge candidates
```

---

## Sleep Skill — Nightly Processing Pipeline

**Conditional component:** Enabled when processing >= moderate AND platform supports scheduling. Light-processing systems don't generate enough raw material to justify a sleep pipeline.

**What:** Automated processing that runs during quiet hours, transforming raw capture into structured knowledge.

**Why:** The fundamental tension: capture needs to be fast (zero friction) but processing needs to be slow (careful extraction, quality connections). The sleep skill resolves this by temporal separation.

**Pipeline Phases:**

| Phase | Purpose | Always On? |
|-------|---------|-----------|
| Extract | Mine today's logs for atomic insights | Yes |
| Inbox Process | Summarize captured URLs/PDFs | Optional |
| Connect | Compare new insights against existing notes | Yes |
| Navigate | Link new notes into MOCs | Yes |
| Maintain | Resurface old notes, detect orphans, schema checks | Yes |

**Output:** Morning briefing showing what was learned, what was connected, what needs attention.

**Trigger:** Cron schedule (3-4am) or manual invocation.

---

## Graph — Filesystem Graph Database

**What:** The vault is a graph database on the filesystem. Markdown files are nodes, wiki links are edges, YAML frontmatter is the property store, ripgrep is the query engine.

**Why:** Structured data enables queries that unstructured files cannot answer. The graph structure emerges from kernel invariants (markdown-yaml + wiki-links) without additional infrastructure. Three query levels provide progressive analytical power: field-level queries on YAML frontmatter, node-level queries like backlinks and link extraction, and graph-level analysis combining traversal with computation.

**How to implement:**
- `ops/scripts/graph/` directory with core analysis scripts
- At minimum: orphan detection, dangling link detection, backlink counting, link density measurement, forward/backward traversal, synthesis opportunity detection
- `/graph` skill generated for agent-accessible graph operations
- Scripts compose with each other — backlinks feeds into orphan detection, link extraction feeds into traversal

**Quality gate:** Can the system answer "what notes link to X?", "what notes have no incoming links?", and "what notes share a topic but aren't connected?" If yes, the graph database is functional.

---

## Task Stack — Lifecycle Backbone

**What:** Every note flows through a task state — from inbox capture through processing phases to completion. ops/tasks.md is the human-readable view; ops/queue/ holds the machine-readable queue file.

**Why:** Without task tracking, the agent has no lifecycle visibility. It cannot answer "what should I work on?" or "what processing is pending?" The task stack makes the processing pipeline observable and steerable.

**How to implement:**
- `ops/tasks.md` — human-readable task overview (what's pending, in progress, done)
- `ops/queue/queue.json` (or `queue.yaml`) — machine-readable queue for pipeline orchestration
- Context file references both in the session-orient phase
- `/next` command reads the task stack and surfaces the highest-priority work
- Tasks track phase progression: each note moves through create, reflect, reweave, verify (or domain-appropriate equivalents)

**Quality gate:** Can the agent answer "what should I work on next?" by reading the task stack? If yes, lifecycle visibility is achieved.

---

## Methodology Folder — Vault Self-Knowledge

**What:** ops/methodology/ contains linked notes explaining why the vault is configured the way it is, what processing pipeline it uses, and how it has evolved.

**Why:** Without self-knowledge, meta-skills operate blind. /ask cannot explain config choices. /architect cannot reason about changes. /remember has nowhere to capture corrections. The methodology folder is the vault's memory of its own design decisions.

**How to implement:**
- `ops/methodology/` directory with `methodology.md` MOC
- Content types: derivation-rationale, kernel-state, pipeline-config, maintenance-conditions, vocabulary-map, configuration-state
- At least one derivation-rationale note exists at generation time (capturing why the vault was configured this way)
- Context file references ops/methodology/ for meta-skill context
- `/remember` writes to ops/methodology/ when the agent captures operational corrections
- Meta-skills (/ask, /architect, /rethink) read from it

**Quality gate:** Can the agent explain WHY the vault is configured the way it is? If it can answer "why do we use flat folders?" or "why is self/ disabled?" by reading ops/methodology/, the self-knowledge layer is functional.

---

## Session Capture — Automatic Transcript Preservation

**What:** Every session transcript is saved automatically. Stop hooks save transcripts to ops/sessions/. Auto-creates mining tasks. Friction detection runs on transcripts.

**Why:** The operational learning loop depends on evidence. Session transcripts contain every redirection, correction, and implicit friction signal — mining them catches what explicit /remember misses. Without session capture, the system can only learn from what the agent explicitly notices and records during the session.

**How to implement:**
- `ops/sessions/` directory for transcript storage
- Session-end hook (Stop event) saves the transcript automatically
- Condition-based mining trigger: when unprocessed sessions accumulate, surface a mining task
- Mining extracts friction signals, corrections, and methodology adjustments from transcripts
- Extracted insights flow into ops/observations/ or ops/methodology/ via the operational learning loop

**Quality gate:** Are session transcripts being saved? When a session ends, does a transcript appear in ops/sessions/? If yes, the capture mechanism works. Mining quality is a separate concern — capture must be reliable first.

---

## Self/ Space — The Agent's Persistent Mind

**What:** A dedicated directory where the agent stores its identity, methodology, goals, and accumulated memory.

**Why:** Without self/, every session starts blank. The agent doesn't know who it is, what it's working on, or what it learned yesterday. self/ is the agent's extended mind — read at session start, updated at session end.

**Structure:**
```
self/
├── identity.md      — who the agent is, personality, approach
├── methodology.md   — how it works, principles, quality standards
├── goals.md         — current threads, active projects
├── relationships.md — key people, preferences, context
├── memory/          — atomic insights (prose-as-title)
├── sessions/        — session logs (what happened this session)
└── journal/         — raw capture (processing input)
```

**The pattern:** self/ mirrors the main notes structure — atomic notes with prose titles, linked from MOCs. Journal serves as capture zone for processing into atomic notes.

**Critical rule:** Read self/ at EVERY session start. This is non-negotiable. The agent must remember who it is before doing anything else.
