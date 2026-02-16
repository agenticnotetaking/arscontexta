---
description: The foundational triangle — wiki links create structure, spreading activation models traversal, small-world topology provides requirements, together answering what, how, and why for knowledge graphs
kind: research
topics: ["[[note-design]]", "[[graph-structure]]", "[[agent-cognition]]"]
---

# coherent architecture emerges from wiki links spreading activation and small-world topology

A coherent architecture for agent-operated knowledge systems emerges from three interlocking pieces:

**Wiki links create the graph structure.** Every `[[link]]` is an explicit, curated edge. Unlike vector similarity which measures surface overlap, wiki links represent human judgment about genuine conceptual connection. This implements GraphRAG-style multi-hop reasoning without the infrastructure — no entity extraction, no community detection algorithms, just explicit links that passed the "is this actually related?" test. And since [[wiki links create navigation paths that shape retrieval]], the quality of those edges determines retrieval effectiveness: link discipline filters noise, link context guides traversal decisions, and link density compounds signal across the graph.

**Spreading activation models how agents should traverse.** When an agent loads a note, activation spreads through its links with configurable decay. High decay means focused, depth-first retrieval. Low decay means exploratory, breadth-first discovery. The decay parameter lets agents tune their traversal mode to the task. This cognitive science model provides the HOW of navigation.

**Small-world topology provides the structural requirements.** For spreading activation to work efficiently, the graph needs both local clustering (related concepts densely connected) and global shortcuts (hubs that bridge distant clusters). Power-law link distribution achieves this: most notes have 3-6 links, but some (MOCs, synthesis notes) have many more. This creates the 2-3 hop reachability that makes the graph navigable.

Together: wiki links answer WHAT the structure is, spreading activation answers HOW to traverse it, and small-world topology answers WHY that structure enables efficient navigation. Since [[complete navigation requires four complementary types that no single mechanism provides]], the triangle's three vertices map onto distinct navigation roles: wiki links implement contextual navigation (what's related to THIS?), MOC hubs implement local navigation (what's nearby?), and the hub-of-hubs structure implements global navigation (where am I in the whole?). The fourth type — supplemental navigation (how else can I find things?) — lives outside the triangle in search mechanisms, which explains why the triangle is necessary but not sufficient for complete wayfinding.

**Checkpointing adds the temporal dimension.** Since [[queries evolve during search so agents should checkpoint]], the architecture needs explicit reassessment points. An agent following spreading activation doesn't just traverse — it periodically asks "is my original question still the right question?"

**The graph grows organically.** Since [[dangling links reveal which notes want to exist]], structure emerges from use patterns. High-frequency dangling links predict future hubs. The architecture self-organizes through demand signals rather than imposed categories.

**Hubs serve attention management, not just navigation.** Since [[MOCs are attention management devices not just organizational tools]], the hub nodes in this architecture provide a second benefit beyond structural shortcuts. MOCs compress topic state — the current synthesis, tensions, and gaps — into a form that frontloads orientation. An agent reading a MOC doesn't just discover what exists; it loads the mental model of the topic without re-traversing the graph. This means the architecture's hub-and-spoke topology serves both navigation efficiency and cognitive efficiency, reducing the re-orientation cost that Leroy's research measures at up to 23 minutes.

**Cross-MOC membership reveals synthesis quality.** Since [[cross-links between MOC territories indicate creative leaps and integration depth]], notes appearing in multiple distant MOCs are integration hubs where ideas from separate domains combine. The architecture's health can be measured not just by traversal efficiency but by how many notes bridge topic boundaries — a vault where every note lives in exactly one MOC is a collection of silos, while cross-links create the creative leaps that advance understanding.

**The triangle transfers across domains.** Each vertex of this architecture maps to a cognitive science principle rather than a domain assumption, and since [[the vault methodology transfers because it encodes cognitive science not domain specifics]], the entire triangle is portable. Wiki links externalize associations (Clark and Chalmers Extended Mind), spreading activation replicates how memory retrieval works in brains, and small-world topology mirrors the structure that makes neural networks efficient. A therapy vault, a project tracker, and a creative writing system all benefit from the same architectural triangle because the cognitive constraints it addresses — working memory limits, associative retrieval, navigational efficiency — are domain-invariant.
---

Relevant Notes:
- [[wiki links implement GraphRAG without the infrastructure]] — the structural layer
- [[wiki links create navigation paths that shape retrieval]] — develops what makes the structural layer effective: link discipline, context, and density determine whether curated edges function as retrieval architecture
- [[spreading activation models how agents should traverse]] — the traversal mechanism
- [[small-world topology requires hubs and dense local links]] — the structural requirements
- [[queries evolve during search so agents should checkpoint]] — the temporal dimension
- [[dangling links reveal which notes want to exist]] — the growth pattern
- [[associative ontologies beat hierarchical taxonomies because heterarchy adapts while hierarchy brittles]] — the theoretical foundation for organic growth: structure emerges from use because heterarchy adapts where hierarchy would brittle
- [[navigational vertigo emerges in pure association systems without local hierarchy]] — the failure mode: spreading activation cannot reach semantic neighbors without link paths; MOCs provide the local hierarchy remedy
- [[complex systems evolve from simple working systems]] — theoretical grounding: Gall's Law explains WHY organic graph growth works — these architectural properties emerge through accumulated connection decisions at friction points rather than upfront design
- [[MOCs are attention management devices not just organizational tools]] — the attention dimension: hubs serve not just as navigational shortcuts but as context-loading devices that reduce re-orientation cost
- [[the vault methodology transfers because it encodes cognitive science not domain specifics]] — explains WHY the triangle transfers: each vertex maps to a cognitive science principle (Extended Mind, spreading activation, small-world topology), making the architecture domain-invariant rather than research-specific
- [[knowledge systems share universal operations and structural components across all methodology traditions]] — the broader inventory from which the triangle selects: wiki links, spreading activation, and small-world topology correspond to three of the nine universal structural components (links, search, navigation/health), grounding the triangle as a critical subset of the full architectural inventory rather than the entire foundation
- [[complete navigation requires four complementary types that no single mechanism provides]] — maps the triangle's vertices onto navigation type roles: wiki links implement contextual navigation, MOC hubs implement local navigation, and the hub-of-hubs provides global navigation; the fourth type (supplemental, via search) sits outside the triangle, explaining why the triangle is necessary but not sufficient for complete wayfinding

Topics:
- [[note-design]]
- [[graph-structure]]
- [[agent-cognition]]
