# Claim Map — TFT Research Navigation

Navigate from topic → relevant research claims. Use this to find research-backed answers to methodology questions.

---

## Hub: index

Entry point to all research. Six topic areas within the knowledge-work domain.

| Topic | Focus |
|-------|-------|
| graph-structure | Wiki links, topology, how the knowledge graph works |
| agent-cognition | Why agents need external thinking, cognitive science |
| discovery-retrieval | Descriptions, progressive disclosure, search |
| processing-workflow | Throughput, sessions, handoffs, pipeline |
| note-design | Claims, descriptions, composability, quality |
| maintenance-evolution | Reweaving, gardening, health over time |

---

## graph-structure

How wiki links, topology, and linking patterns create navigable knowledge graphs.

### Core Claims
- [[wiki links implement GraphRAG without the infrastructure]] — curated edges enable multi-hop reasoning without entity extraction
- [[small-world topology requires hubs and dense local links]] — power-law distribution enables short paths between concepts
- [[each new note compounds value by creating traversal paths]] — link density matters more than note count
- [[dangling links reveal which notes want to exist]] — demand signals predict future hubs
- [[inline links carry richer relationship data than metadata fields]] — prose context encodes WHY notes connect
- [[backlinks implicitly define notes by revealing usage context]] — meaning extends beyond content to usage patterns
- [[topological organization beats temporal for knowledge work]] — concept-based beats date-based
- [[concept-orientation beats source-orientation for cross-domain connections]] — concept nodes enable cross-domain edges
- [[associative ontologies beat hierarchical taxonomies because heterarchy adapts while hierarchy brittles]] — flat + links beats imposed folders
- [[MOCs are attention management devices not just organizational tools]] — reduce attention residue by presenting topic state
- [[faceted classification treats notes as multi-dimensional objects rather than folder contents]] — Ranganathan's PMEST formalizes multi-axis metadata

### Tensions
- Curation quality vs scale — does human curation work past ~10,000 notes?
- Hub concentration vs peripheral neglect — power-law distribution may create attention inequality
- Explicit structure vs emergent meaning — do wiki links capture all meaningful relationships?

---

## agent-cognition

How agents traverse knowledge, manage context, maintain continuity across sessions.

### Core Claims
- [[spreading activation models how agents should traverse]] — cognitive science model for context loading via wiki links
- [[LLM attention degrades as context fills]] — first 40% is the smart zone
- [[fresh context per task preserves quality better than chaining phases]] — session isolation keeps phases in smart zone
- [[session handoff creates continuity without persistent memory]] — externalized briefings bridge sessions
- [[cognitive offloading is the architectural foundation for vault design]] — Clark/Chalmers Extended Mind + Cowan's 4-item limit
- [[knowledge systems become communication partners through complexity and memory humans cannot sustain]] — agent-vault exceeds either alone
- [[local-first file formats are inherently agent-native]] — plain text enables any LLM to read
- [[notes function as cognitive anchors that stabilize attention during complex tasks]] — externalized reference points prevent model collapse
- [[closure rituals create clean breaks that prevent attention residue bleed]] — explicit completion signals prevent residue
- [[AI shifts knowledge systems from externalizing memory to externalizing attention]] — paradigm shift from storage to surfacing
- [[three capture schools converge through agent-mediated synthesis]] — agent processing dissolves capture tradeoffs

### Risks
- [[cognitive outsourcing risk in agent-operated systems]] — delegation may atrophy human meta-cognitive skills
- [[verbatim risk applies to agents too]] — well-structured outputs without genuine synthesis

---

## discovery-retrieval

How to find and retrieve content through descriptions, progressive disclosure, metadata.

### Core Claims
- [[descriptions are retrieval filters not summaries]] — lossy compression optimized for decision-making
- [[progressive disclosure means reading right not reading less]] — layers enable curation for quality
- [[metadata reduces entropy enabling precision over recall]] — pre-computed representations shrink search space
- [[type field enables structured queries without folder hierarchies]] — content-kind metadata provides filtering axis
- [[retrieval utility should drive design over capture completeness]] — "how will I find this" over "where should I put this"
- [[good descriptions layer heuristic then mechanism then implication]] — formula for effective descriptions
- [[faceted classification treats notes as multi-dimensional objects rather than folder contents]] — multi-axis YAML enables multiplicative precision

### Tensions
- Filtering efficiency vs false negatives — aggressive filtering may exclude relevant notes
- Description standardization vs content diversity — ~150 chars may not accommodate all styles
- Metadata ceremony vs capture speed — required frontmatter adds friction

---

## processing-workflow

How work flows from capture to synthesis: throughput, session discipline, forcing functions.

### Core Claims — Throughput
- [[throughput matters more than accumulation]] — processing velocity, not archive size
- [[processing effort should follow retrieval demand]] — invest on retrieval, not capture
- [[intermediate packets enable assembly over creation]] — composable building blocks
- [[structure without processing provides no value]] — structural motions without generation produce nothing

### Core Claims — Session Discipline
- [[fresh context per task preserves quality better than chaining phases]] — session isolation
- [[session handoff creates continuity without persistent memory]] — externalized briefings
- [[temporal separation of capture and processing preserves context freshness]] — Ebbinghaus decay window
- [[closure rituals create clean breaks that prevent attention residue bleed]] — boundary mechanism
- [[batching by context similarity reduces switching costs in agent processing]] — topic-similar queue ordering

### Core Claims — Forcing Functions
- [[temporal processing priority creates age-based inbox urgency]] — <24h standard, >72h critical
- [[continuous small-batch processing eliminates review dread]] — prevents accumulation abandonment
- [[WIP limits force processing over accumulation]] — kanban hard caps
- [[generation effect gate blocks processing without transformation]] — requires generated artifact
- [[skills encode methodology so manual execution bypasses quality gates]] — skills contain selectivity gates

### Risks
- [[PKM failure follows a predictable cycle]] — 7-stage cascade from Collector's Fallacy to abandonment
- [[behavioral anti-patterns matter more than tool selection]] — habits kill vaults regardless of software

---

## note-design

How to write claims, descriptions, and composable notes.

### Core Claims
- [[claims must be specific enough to be wrong]] — vague claims can't be built on
- [[note titles should function as APIs enabling sentence transclusion]] — titles as function signatures
- [[summary coherence tests composability before filing]] — if can't summarize in 1-3 sentences, it bundles claims
- [[the generation effect requires active transformation not just storage]] — generating descriptions and connections is processing
- [[good descriptions layer heuristic then mechanism then implication]] — description formula
- [[inline links carry richer relationship data than metadata fields]] — prose context for links
- [[source attribution enables tracing claims to foundations]] — provenance tracking

### Risks
- [[verbatim risk applies to agents too]] — structured without genuine synthesis
- [[vault conventions may impose hidden rigidity on thinking]] — format may not fit all styles
- [[enforcing atomicity can create paralysis when ideas resist decomposition]] — atomicity enforcement overhead

---

## maintenance-evolution

Keeping the vault healthy: backward maintenance, gardening, resurfacing.

### Core Claims
- [[digital mutability enables note evolution that physical permanence forbids]] — living documents
- [[backward maintenance asks what would be different if written today]] — genuine reconsideration
- [[incremental formalization happens through repeated touching of old notes]] — many small touches over time
- [[orphan notes are seeds not failures]] — creation is valid, abandonment is failure
- [[gardening cycle implements tend prune fertilize operations]] — separated maintenance phases
- [[random note resurfacing prevents write-only memory]] — counteracts structural attention bias
- [[spaced repetition scheduling could optimize vault maintenance]] — front-loaded review intervals
- [[community detection algorithms can inform when MOCs should split or merge]] — algorithmic monitoring

### Risks
- [[PKM failure follows a predictable cycle]] — 7-stage cascade
- [[productivity porn risk in meta-system building]] — building infrastructure as procrastination
- [[metacognitive confidence can diverge from retrieval capability]] — feels navigable but retrieval fails

---

## Cross-Topic Bridge Claims

Claims appearing in multiple topics — these are synthesis opportunities:

| Claim | Topics |
|-------|--------|
| [[LLM attention degrades as context fills]] | agent-cognition, processing-workflow |
| [[fresh context per task preserves quality]] | agent-cognition, processing-workflow |
| [[inline links carry richer relationship data]] | graph-structure, note-design |
| [[faceted classification treats notes as multi-dimensional objects]] | graph-structure, discovery-retrieval |
| [[local-first file formats are inherently agent-native]] | agent-cognition, maintenance-evolution |
| [[PKM failure follows a predictable cycle]] | processing-workflow, maintenance-evolution |
| [[skills encode methodology]] | processing-workflow, note-design |
