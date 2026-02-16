---
description: Wiki link edges, YAML metadata, faceted query dimensions, and soft validation compose into graph database capabilities where the infrastructure is just files and ripgrep
kind: research
topics: ["[[graph-structure]]", "[[discovery-retrieval]]"]
confidence: speculative
methodology: ["Original"]
---

# markdown plus YAML plus ripgrep implements a queryable graph database without infrastructure

Graph databases offer three capabilities that flat document stores lack: typed edges between entities, structured property queries across nodes, and multi-hop traversal along relationship paths. Traditional implementations require infrastructure -- a graph database server, entity extraction pipelines, schema enforcement layers, query languages. But this vault achieves all three capabilities with nothing beyond markdown files, YAML frontmatter, and ripgrep.

The argument rests on four layers, each covered by an existing note, that compose into something none of them claims individually.

The first layer is graph edges. Since [[wiki links implement GraphRAG without the infrastructure]], explicit wiki links create a human-curated knowledge graph where every edge passed judgment. These are not statistical co-occurrences inferred by entity extraction but intentional connections with prose context explaining why the relationship exists. Multi-hop traversal works because the edges are semantic, not noisy -- following three curated links compounds signal rather than diluting it.

The second layer is node properties. Since [[metadata reduces entropy enabling precision over recall]], YAML frontmatter pre-computes structured attributes for every node. Type, methodology, topics, status -- each field is a queryable dimension. `rg "^type: tension" 01_thinking/` is a structured property query, functionally equivalent to a Cypher `WHERE n.type = 'tension'` clause, but running against plain text files with no database server.

The third layer is multi-dimensional access. Since [[faceted classification treats notes as multi-dimensional objects rather than folder contents]], Ranganathan's framework explains why these YAML fields compose multiplicatively. Two facets with five values each narrow the search space by roughly 25x, not 10x. This is the formal justification for why combining `type` and `methodology` filters produces precision that neither achieves alone -- the same compositional power that graph databases provide through multi-attribute queries, achieved through independent YAML fields and piped grep commands.

The fourth layer is data integrity. Since [[schema enforcement via validation agents enables soft consistency]], asynchronous validation hooks maintain schema compliance without blocking creation. This is the consistency guarantee that keeps the "database" queryable over time -- without it, metadata fields drift, query patterns break, and the structured access degrades into the unstructured search it replaced.

What makes this a genuine synthesis rather than just listing four features is that the layers are architecturally dependent. Faceted queries (layer three) require structured metadata (layer two). Multi-hop traversal (layer one) requires consistent link targets, which validation (layer four) maintains. Remove any layer and the others degrade: wiki links without metadata give you traversal but not filtering; metadata without validation gives you queries that rot; faceted access without curated edges gives you filtered isolation without connection. This compositional pattern -- independent single-concern components producing emergent capability -- is the same mechanism that [[hook composition creates emergent methodology from independent single-concern components]]. There, nine hooks compose into quality pipelines and session bookends no single hook was designed to create. Here, four structural conventions compose into graph database capabilities no single convention provides. The shared principle is that composition creates architecture that lives between the components rather than inside any one of them.

The infrastructure cost is zero beyond what any filesystem provides. Since [[local-first file formats are inherently agent-native]], the entire graph database -- edges, properties, query engine, consistency checks -- lives in files that any text editor can read and any LLM can parse. No credentials, no server processes, no query language beyond ripgrep patterns. This means the graph database lives entirely within what [[four abstraction layers separate platform-agnostic from platform-dependent knowledge system features]] calls the foundation layer -- the bottom of the portability gradient, where exit velocity is maximum. Since [[data exit velocity measures how quickly content escapes vendor lock-in]], the infrastructure-free property is not just a philosophical claim but an auditable one: every graph operation (edge traversal, property query, faceted filtering) works with any text tool on any platform, and export means copying a folder.

There is a genuine question about whether this framing illuminates or merely repackages. Calling markdown files a "graph database" risks the kind of metaphorical inflation where everything becomes everything else. The honest test is whether the framing reveals something the component notes miss individually. What it reveals is the compositional architecture: these four layers are not independent features that happen to coexist but a system whose layers depend on each other in specific ways. That dependency structure -- edges need consistency, queries need metadata, access needs facets -- is the database architecture hiding in plain text. And because [[the system is the argument]], the vault itself is the proof: every ripgrep query in CLAUDE.md, every backlink search in the scripts, every wiki link in every note is this graph database in operation. The claim is not theoretical -- it is the mechanism the vault uses to function.

The claim remains open because the scaling question is unresolved. Graph databases handle millions of nodes and edges with indexed lookups. Ripgrep on YAML handles hundreds of notes with millisecond queries. At what scale does the infrastructure-free approach fail? Since [[navigation infrastructure passes through distinct scaling regimes that require qualitative strategy shifts]], the answer likely follows the same regime boundaries: at Regime 1 (1-50 notes) ripgrep is effortless, at Regime 2 (50-500) it remains fast but the navigation layer matters more, and at Regime 3 (500-5000+) the query engine likely needs augmentation. The bet is that for vaults up to roughly 10,000 notes, the filesystem-based approach matches or exceeds purpose-built infrastructure because the curation quality of edges and the precision of metadata compensate for the lack of indexed queries. When that crossover arrives, since [[intermediate representation pattern enables reliable vault operations beyond regex]], the evolutionary path is not abandoning the filesystem model but adding a parsed layer above it -- an intermediate representation that provides structured query reliability while the files remain the source of truth. This follows [[complex systems evolve from simple working systems]]: the graph database starts as files with conventions and adds infrastructure only where friction emerges, rather than deploying a database server on day one. Beyond that threshold, the answer is genuinely uncertain.

---

Source: /envision synthesis session (no source file -- synthesis of four existing notes)
---

Relevant Notes:
- [[wiki links implement GraphRAG without the infrastructure]] -- foundation: provides the graph traversal layer where curated wiki links replace entity extraction pipelines and graph databases
- [[metadata reduces entropy enabling precision over recall]] -- foundation: provides the query filter layer where YAML frontmatter pre-computes low-entropy representations that enable precision-first retrieval
- [[faceted classification treats notes as multi-dimensional objects rather than folder contents]] -- foundation: provides the multi-dimensional access layer where independent YAML fields compose multiplicatively for retrieval
- [[schema enforcement via validation agents enables soft consistency]] -- foundation: provides the consistency layer that keeps the database queryable over time without rigid constraints
- [[local-first file formats are inherently agent-native]] -- substrate: explains why this infrastructure-free property holds; plain text with embedded metadata requires no external dependencies
- [[structure enables navigation without reading everything]] -- the retrieval payoff: four structural mechanisms compose into discovery layers that make this graph database practically navigable
- [[type field enables structured queries without folder hierarchies]] -- concrete example: type metadata demonstrates one facet dimension in action, enabling category-based queries via ripgrep
- [[hook composition creates emergent methodology from independent single-concern components]] -- structural parallel: the same compositional pattern where independent single-concern components produce emergent capability that no component achieves alone
- [[four abstraction layers separate platform-agnostic from platform-dependent knowledge system features]] -- portability grounding: the graph database lives entirely in the foundation layer, the bottom of the portability gradient with maximum exit velocity
- [[data exit velocity measures how quickly content escapes vendor lock-in]] -- makes the infrastructure-free claim auditable: every graph operation works with any text tool, and export means copying a folder
- [[the system is the argument]] -- self-referential proof: the vault IS this graph database in operation; every ripgrep query and wiki link traversal demonstrates the claim
- [[navigation infrastructure passes through distinct scaling regimes that require qualitative strategy shifts]] -- scaling framework: regime boundaries predict where ripgrep-on-YAML reaches its limits and what augmentation the query layer needs
- [[intermediate representation pattern enables reliable vault operations beyond regex]] -- evolutionary path: when ripgrep fragility emerges at scale, the next step is a parsed layer above the filesystem rather than abandoning the model
- [[complex systems evolve from simple working systems]] -- design principle: the graph database evolved from conventions at friction points rather than being designed as infrastructure upfront
- [[ten universal primitives form the kernel of every viable agent knowledge system]] -- kernel relationship: this note's four layers map to kernel primitives 1, 2, 6, and 7, showing the graph database is built from the non-negotiable base layer

Topics:
- [[graph-structure]]
- [[discovery-retrieval]]
