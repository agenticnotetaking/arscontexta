---
description: Markdown files, YAML frontmatter, wiki links, MOC hierarchy, tree injection, description fields, topics footers, schema enforcement, semantic search, self space, and session rhythm — the
kind: research
topics: ["[[design-dimensions]]"]
methodology: ["Original"]
---

# ten universal primitives form the kernel of every viable agent knowledge system

The design space of knowledge systems is vast — since [[eight configuration dimensions parameterize the space of possible knowledge systems]], millions of theoretical configurations exist. But beneath all that variation, every viable system shares the same foundation. These ten primitives are the kernel: the non-negotiable base layer that every agent knowledge system needs to function, regardless of domain, platform, or methodology tradition. They are what [[derivation generates knowledge systems from composable research claims not template customization]] never varies, while everything above them gets derived per use case.

The kernel works because it requires only what every agent platform has: filesystem access and text files. Since [[four abstraction layers separate platform-agnostic from platform-dependent knowledge system features]], these primitives map entirely to the foundation and convention layers. No hooks, no skills, no orchestration, no MCP servers. An LLM that can read and write files can implement every primitive here. This is deliberate — since [[local-first file formats are inherently agent-native]], building on universals rather than platform-specific features means the kernel survives platform changes, migrations, and the death of any particular tool.

## The Ten Primitives

### 1. Markdown files with YAML frontmatter

Notes are plain text files with structured metadata in the header. The file IS the complete artifact — no database, no API, no external service. YAML frontmatter makes each file queryable via regex while remaining human-readable. This is the most fundamental choice: by selecting plain text over a database, the system gains universal portability at the cost of query sophistication.

**Why universal:** Since [[cognitive offloading is the architectural foundation for vault design]], the vault exists because both humans and agents need external structures to think beyond their native capacity. Plain text files are the lowest-friction external structure — any tool can read them, any agent can parse them, and they survive every platform transition because they depend on nothing.

**Minimum viable version:** A markdown file with a `---` delimited YAML block containing at least a `description` field.

**Validation:** Every `.md` file in the working directory has valid YAML frontmatter that parses without error.

### 2. Wiki links as graph edges

`[[note title]]` creates a navigable relationship between notes. Filenames are unique; links resolve by name, not path. Each link is an explicit, curated edge in the knowledge graph. Since [[spreading activation models how agents should traverse]], reading one note activates related notes through these explicit edges, enabling multi-hop reasoning without entity extraction pipelines or embedding infrastructure.

**Why universal:** Since [[each new note compounds value by creating traversal paths]], link density matters more than note count. A folder of unlinked files is a filing cabinet. A graph of linked files is a thinking structure. The difference is wiki links. And since [[inline links carry richer relationship data than metadata fields]], prose-embedded links encode WHY notes connect, not just THAT they connect.

**Minimum viable version:** At least one `[[wiki link]]` per note, either inline or in a footer section.

**Validation:** All wiki links resolve to existing files. No dangling links to non-existent notes.

### 3. MOC hierarchy for attention management

Maps of Content organize notes into navigable topic areas. Hub links to domains, domains link to topics, topics link to notes. Since [[MOCs are attention management devices not just organizational tools]], MOCs reduce context-switching cost by presenting topic state immediately — the agent reads one file and knows what a topic contains, what tensions exist, and what gaps remain. Without MOCs, since [[navigational vertigo emerges in pure association systems without local hierarchy]], a flat sea of linked notes becomes disorienting at scale.

**Why universal:** Every knowledge system, regardless of domain, needs navigation structures that manage attention. A therapy journal needs mood-pattern MOCs. A research vault needs topic MOCs. A relationship tracker needs person MOCs. The domain vocabulary changes; the structural need for curated navigation hubs does not.

**Minimum viable version:** At least one hub MOC that links to all topic areas. Topic MOCs with Core Ideas sections containing context phrases explaining each linked note.

**Validation:** Every note appears in at least one MOC. No orphan notes outside the navigation structure (after initial creation window).

### 4. Tree injection at session start

The agent sees the full file structure immediately upon session start. This provides orientation before action — the agent knows what exists before deciding what to read. For CLI agents, this means a hook or startup script that injects the directory tree. For messaging agents, this means loading a workspace map file.

**Why universal:** Since [[fresh context per task preserves quality better than chaining phases]], each session starts with a limited context budget. Tree injection spends a small fraction of that budget to provide complete structural awareness, which then guides efficient context loading for the rest of the session. Without it, the agent wastes context on discovery that could go toward productive reasoning.

**Minimum viable version:** A file listing (`tree` or equivalent) showing all directories and markdown files, loaded at session start. Maximum three levels deep to stay within reasonable token budgets.

**Validation:** The agent can identify any file's path without searching. Tree is current (no stale entries, no missing files).

### 5. Description field for progressive disclosure

Every note has a `description` in its YAML frontmatter — one sentence (~150 characters) that adds information beyond the title. The title gives the claim; the description gives scope, mechanism, or implication. Since [[descriptions are retrieval filters not summaries]], descriptions enable the agent to decide whether to read a note without loading it. This is progressive disclosure at the note level: title is layer one, description is layer two, content is layer three.

**Why universal:** Since [[flat files break at retrieval scale]], at 50 notes an agent can read everything, but at 500 retrieval becomes the bottleneck. Descriptions become the filter that determines what enters context. Since [[good descriptions layer heuristic then mechanism then implication]], effective descriptions compress a note's value proposition into a single sentence. Without descriptions, every navigation decision requires loading the full note — an O(n) cost that becomes prohibitive as the vault grows.

**Minimum viable version:** Every note has a `description` field in YAML. The description does not merely restate the title.

**Validation:** `description` field present on every note. Description text differs substantively from the title.

### 6. Topics footer linking notes to MOCs

Every note declares which MOC(s) it belongs to via a `topics` field (YAML array of wiki links). This is the bidirectional link that completes the MOC hierarchy: MOCs link down to notes via Core Ideas, notes link up to MOCs via Topics. The two-way connection ensures that neither direction goes stale independently.

**Why universal:** Without Topics, notes can drift away from their MOCs — the MOC links to the note, but there's no record in the note of where it belongs. Adding topics to a second MOC becomes guesswork. More fundamentally, topics enable the query `rg '^topics:.*\[\[topic-name\]\]'` which instantly finds all notes in a topic area without reading any MOC file. This turns a navigation structure into a queryable relationship.

**Minimum viable version:** Every note has a `topics` field containing at least one wiki link to a MOC.

**Validation:** `topics` field present on every non-MOC note. Every wiki link in `topics` resolves to a file with `type: moc`.

### 7. Schema enforcement via validation

Templates define required fields, valid enum values, and constraints. A validation mechanism (script, hook, or manual check) verifies notes against their template. Since [[schema enforcement via validation agents enables soft consistency]], validation catches drift that instruction-following alone cannot prevent — as context fills, compliance with schema instructions degrades, but a validation check is deterministic.

**Why universal:** Schema drift is inevitable without enforcement. An agent that creates 50 notes will forget a required field on the 47th. A validation pass catches it. The enforcement level varies by platform (hooks for Claude Code, manual runs for minimal platforms), but the principle — templates as single source of truth, validation against templates — is universal.

**Minimum viable version:** One template per note type defining required fields. A validation script or procedure that checks all notes against their template.

**Validation:** Running the validation procedure reports zero errors on a healthy vault.

### 8. Semantic search capability

Beyond keyword search, the system needs meaning-based discovery that finds conceptually related content across different vocabularies. A note about "friction in learning systems" should connect to a note about "errors as productive feedback" even though they share no keywords. Since [[spreading activation models how agents should traverse]], structural traversal through wiki links is the primary discovery mechanism, but semantic search catches what the graph misses — notes that should be connected but aren't yet.

**Why universal:** At scale, keyword search misses connections between notes that use different vocabulary for the same concept. Semantic search (via embedding tools like qmd, or even LLM-assisted search) complements structural navigation. The specific implementation varies — some platforms have embedding infrastructure, others use LLM-based similarity — but the capability of finding meaning across vocabularies is necessary for connection density to grow.

**Minimum viable version:** Any mechanism that finds conceptually related notes beyond exact keyword matches. This could be a dedicated embedding tool, an LLM-assisted search pass, or even a periodic manual review informed by topic adjacency.

**Validation:** Given a note, the search mechanism returns at least one related note that shares no significant keywords with the query.

### 9. Self space for agent persistent memory

A dedicated directory where the agent stores identity, methodology, goals, and accumulated memory. Read at session start, updated at session end. Since [[session handoff creates continuity without persistent memory]], the self space is what gives each fresh session a briefing from the previous one. Without it, every session starts blank — the agent doesn't know who it is, what it's working on, or what it learned yesterday.

**Why universal:** Agent continuity across sessions is not optional for knowledge work. Since [[the vault constitutes identity for agents]], losing the self space is not merely inconvenient but identity-erasing — without it, the agent reverts to base weights with no distinguishing characteristics. The self space solves this through structure rather than capability: the agent reads files to remember, rather than requiring persistent memory infrastructure. The pattern mirrors the main knowledge space (atomic notes, MOCs) applied to the agent's own cognition.

**Minimum viable version:** A `self/` directory with at least `identity.md` (who the agent is), `methodology.md` (how it works), and `goals.md` (current threads). Agent reads these at every session start.

**Validation:** Self space exists with core MOCs populated. Session start procedure includes reading self/.

### 10. Session rhythm: orient, work, persist

Every session follows a three-phase rhythm. Orient: read self space and relevant MOCs to understand current state. Work: execute the task, surfacing connections as you go. Persist: update MOCs, capture observations, externalize anything learned. This rhythm is encoded in the context file as a non-negotiable procedure.

**Why universal:** Since [[closure rituals create clean breaks that prevent attention residue bleed]], explicit session boundaries prevent both cold starts (no orientation) and lost work (no persistence). The orient phase ensures the agent doesn't duplicate effort. The persist phase ensures discoveries survive the session. Without this rhythm, knowledge work degrades into disconnected episodes that don't build on each other.

**Minimum viable version:** Context file instructions specifying: (1) read self/ at session start, (2) capture insights during work, (3) update MOCs and push changes at session end.

**Validation:** Session start loads self/ orientation. Session end produces observable state changes (updated files, committed changes).

## What the Kernel Enables

These ten primitives together create a system where:
- Notes are portable, queryable, and agent-readable (primitives 1, 5)
- The knowledge graph grows through explicit, reasoned connections (primitive 2)
- Navigation scales with content through curated attention hubs (primitives 3, 6)
- Agents orient immediately without wasting context on discovery (primitive 4)
- Quality is enforced structurally, not just through instructions (primitive 7)
- Conceptual connections are discoverable across vocabularies (primitive 8)
- Agent identity and continuity persist across sessions (primitive 9)
- Every session builds on prior work and preserves new understanding (primitive 10)

The navigation primitives in particular (2, 3, 4, 5) do not merely operate independently — since [[structure enables navigation without reading everything]], wiki links, MOCs, claim titles, and descriptions compose into a discovery layer stack where each mechanism serves a distinct filtering function and the composition turns retrieval from linear scan into targeted traversal. The kernel enables this composition by guaranteeing all four primitives are always present.

Everything above the kernel — the eight configuration dimensions, the processing pipeline phases, the specific methodology tradition, the domain-specific schema extensions, the automation level — varies per use case. The kernel does not. When [[methodology traditions are named points in a shared configuration space not competing paradigms]], Zettelkasten, PARA, Cornell, Evergreen, and GTD all include these ten primitives in their different ways. The kernel is the shared substrate beneath all named configurations.

## The Derivation Constant

For the derivation engine, the kernel is the constant term. Since [[derivation generates knowledge systems from composable research claims not template customization]], derivation decides configuration values for the eight dimensions — but the kernel is always included, never derived. This simplifies derivation considerably: instead of deciding everything from scratch, the engine inherits these ten primitives and focuses design effort on dimension selection and domain adaptation. Since [[every knowledge domain shares a four-phase processing skeleton that diverges only in the process step]], the processing skeleton sits atop the kernel, using its primitives (notes for capture, links for connection, MOCs for navigation, validation for verification) while adding domain-specific processing logic.

The kernel is also the portability guarantee. Since [[configuration dimensions interact so choices in one create pressure on others]], a system might need heavy processing, deep navigation, and dense schemas — all of which require platform-specific infrastructure. But if the platform changes, the kernel survives intact. The system loses its automation and orchestration layers but retains its intellectual content and navigation structure. This is exit velocity by design: the kernel is what you take with you when you leave.

---
---

Relevant Notes:
- [[structure enables navigation without reading everything]] — synthesis showing how primitives 2, 3, 4, 5 compose into a discovery layer stack; the kernel guarantees these four mechanisms are always co-present, and their composition is what turns retrieval from linear scan into targeted traversal
- [[four abstraction layers separate platform-agnostic from platform-dependent knowledge system features]] — the kernel maps to the foundation and convention layers; everything here works without hooks, skills, or orchestration
- [[cognitive offloading is the architectural foundation for vault design]] — the cognitive science grounding: each primitive exists because agents need external structures to think beyond context window limits
- [[eight configuration dimensions parameterize the space of possible knowledge systems]] — dimensions parameterize variation ABOVE the kernel; these ten primitives are what never varies
- [[derivation generates knowledge systems from composable research claims not template customization]] — derivation navigates dimensions while inheriting the kernel unchanged; the kernel is the derivation constant
- [[every knowledge domain shares a four-phase processing skeleton that diverges only in the process step]] — the processing skeleton sits atop the kernel; capture-process-connect-verify needs these primitives to operate
- [[local-first file formats are inherently agent-native]] — explains why the kernel requires only filesystem access: plain text with embedded metadata needs no infrastructure
- [[MOCs are attention management devices not just organizational tools]] — grounds primitive 3 in cognitive science: MOCs reduce context-switching cost by presenting topic state immediately
- [[session handoff creates continuity without persistent memory]] — grounds primitive 10: externalized state in files gives each fresh session a briefing from the previous one
- [[configuration dimensions interact so choices in one create pressure on others]] — dimension interactions operate above the kernel; the kernel is the invariant substrate that all coherent configurations share
- [[methodology traditions are named points in a shared configuration space not competing paradigms]] — every methodology tradition includes these ten primitives; they are the shared substrate beneath all named configurations
- [[descriptions are retrieval filters not summaries]] — grounds primitive 5: the description field enables progressive disclosure, letting agents decide what to read before loading
- [[spreading activation models how agents should traverse]] — grounds primitive 2: wiki links implement spreading activation for agents, priming related concepts through explicit edges
- [[schema enforcement via validation agents enables soft consistency]] — grounds primitive 7: validation against templates catches drift that instruction-following alone cannot prevent
- [[premature complexity is the most common derivation failure mode]] — the kernel defines the floor of the complexity budget: minimum viable configuration cannot go below these ten primitives, and the budget constrains initial derivation between this floor and the locally-justified-but-globally-unsustainable maximum
- [[composable knowledge architecture builds systems from independent toggleable modules not monolithic templates]] — the composable architecture builds its module dependency graph on top of the kernel: foundation modules correspond to these primitives, and every higher-layer module assumes the kernel is present
- [[the vault constitutes identity for agents]] — why primitives 9 and 10 are existential not just operational: if the vault constitutes identity, then the self space (primitive 9) and session rhythm (primitive 10) are identity-maintenance infrastructure, not convenience features; without them the agent loses not just continuity but selfhood
- [[flat files break at retrieval scale]] — the failure the kernel prevents: without these ten primitives, any agent knowledge system degrades to flat files at scale, hitting the retrieval wall where content becomes unfindable and agent cognition narrows to what can be located by accident

Topics:
- [[design-dimensions]]
