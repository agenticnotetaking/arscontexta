---
description: Louvain and similar algorithms detect dense note clusters and track how cluster boundaries shift over time, providing actionable signals for MOC reorganization that human intuition misses at scale
kind: research
topics: ["[[graph-structure]]", "[[maintenance-patterns]]"]
methodology: ["Network Science"]
source: [[tft-research-part3]]
---

# community detection algorithms can inform when MOCs should split or merge

The vault's MOC structure is a human hypothesis about where topic boundaries fall. At 50 notes this hypothesis is easy to maintain through intuition — you can see the shape of the graph. But since [[small-world topology requires hubs and dense local links]], the topology that makes navigation work also makes it harder to perceive structural shifts as the vault grows. A MOC that served 15 notes well might struggle at 40, not because any single note is wrong but because the cluster underneath has silently bifurcated into two communities that happen to share a label.

Community detection algorithms — Louvain, Leiden, label propagation — solve exactly this problem. They analyze the link structure of a graph and identify groups of nodes that are more densely connected to each other than to the rest of the network. Applied to a vault's wiki link graph, they reveal the natural communities that actually exist in the data, which may or may not align with the MOC boundaries that were drawn when the vault was smaller.

The actionable intelligence comes from comparing algorithmic communities against existing MOC territories. Three signals matter:

**Split signal.** A single MOC covers notes that the algorithm places in two or more distinct communities. The notes within each community link densely to each other but sparsely across the divide. This means the MOC is papering over a genuine boundary — the topic has organically differentiated into sub-topics that deserve their own navigation. CLAUDE.md already prescribes splitting when a MOC exceeds ~35-40 links, but community detection catches splits that should happen earlier because the structural divide is real even if the count threshold hasn't been reached. And once the split is identified, since [[basic level categorization determines optimal MOC granularity]], Rosch's prototype theory predicts what resolution the new sub-MOC titles should target — specific enough to orient but general enough to cover the cluster, at a level that shifts as understanding deepens.

**Merge signal.** Two separate MOCs cover notes that the algorithm places in a single community. The cross-links between them are so dense that the topological distinction has dissolved. Maintaining two MOCs for what is functionally one cluster creates navigational overhead — the agent must check two places for what is one conversation. This is harder to catch by intuition because humans tend to preserve categories once created.

**Drift signal.** Notes that the algorithm reassigns from one community to another over time. "Your epistemology cluster is merging with your AI-methods cluster" is actionable intelligence about how thinking is evolving. Individual note movements might be noise, but consistent migration patterns reveal genuine conceptual convergence or divergence that should reshape MOC structure.

This matters for agent operation because since [[navigational vertigo emerges in pure association systems without local hierarchy]], MOCs provide the local hierarchy that makes association navigable. But stale MOC boundaries are almost as bad as no MOCs at all — since [[metacognitive confidence can diverge from retrieval capability]], stale boundaries create exactly the kind of organizational false confidence where the system appears well-structured while actual community structure has moved on. An agent following a MOC that no longer reflects the real topology wastes context loading notes that cluster elsewhere while missing notes that genuinely belong together.

The implementation maps to the vault's existing maintenance patterns. Since [[schema enforcement via validation agents enables soft consistency]], the vault already uses asynchronous quality checks that surface issues without blocking. Community detection fits the same model: run periodically as a maintenance pass, compare algorithmic output against current MOC membership, flag discrepancies for human review. The agent becomes a topology monitor — not making structural decisions autonomously, but alerting when the graph has shifted enough that reorganization deserves attention.

Since [[cross-links between MOC territories indicate creative leaps and integration depth]], there is a productive tension between community detection and cross-linking. Notes that bridge multiple algorithmic communities are exactly the integration points that cross-link analysis values. Community detection should flag them as boundary objects worth preserving, not as misclassified nodes to reassign. The insight is that community detection identifies where boundaries should be, while cross-link analysis identifies where boundaries should be deliberately crossed. Both are necessary: clean communities for navigation, deliberate bridges for synthesis. And since [[betweenness centrality identifies bridge notes connecting disparate knowledge domains]], the algorithmic toolkit becomes more complete: community detection reveals where group boundaries fall, betweenness centrality reveals which individual notes are structurally critical for bridging those groups. A note with high betweenness that sits at a community boundary is the most important kind of boundary object — the node whose quality disproportionately affects inter-cluster navigation.

Community detection also extends to evaluating multi-agent divergence. Since [[federated wiki pattern enables multi-agent divergence as feature not bug]], the question of whether parallel interpretations are productive depends on whether they serve distinct audiences. Community detection operationalizes this: if two federated versions attract links from different algorithmic communities, the divergence is structurally productive. If both versions draw from the same community, the divergence may be fragmenting a single concept rather than illuminating distinct facets.

There is genuine uncertainty about when this becomes valuable. At the vault's current scale (~100 notes), intuition and manual review suffice. The algorithmic approach becomes necessary somewhere between 200 and 1000 notes, where the graph is too large to perceive community structure through reading but too structured for simple heuristics like note count per MOC. The investment is forward-looking — building the monitoring capability before the problem becomes acute, so the infrastructure exists when scale demands it.

The deeper implication connects to how since [[MOCs are attention management devices not just organizational tools]], MOC reorganization isn't just a structural tidying exercise. Every MOC split or merge reshapes how agents load context for an entire topic area. A bad split fragments attention across two MOCs that should be one conversation. A missed split forces agents to wade through an overloaded MOC where half the content is irrelevant to their query. Community detection makes these decisions empirical rather than intuitive — grounded in the actual topology of connections rather than the labels we assigned when the vault was smaller.

---
---

Relevant Notes:
- [[small-world topology requires hubs and dense local links]] — foundation: community detection operates on the topology this note describes, identifying when power-law structure drifts from healthy distribution
- [[cross-links between MOC territories indicate creative leaps and integration depth]] — qualitative complement: cross-MOC membership reveals integration quality; community detection reveals when those territories should be redrawn
- [[navigational vertigo emerges in pure association systems without local hierarchy]] — the failure mode this prevents: algorithmic monitoring catches emerging clusters that lack MOC coverage before they become unreachable neighborhoods
- [[MOCs are attention management devices not just organizational tools]] — extends the stakes of MOC reorganization: splitting or merging MOCs isn't just structural cleanup, it reshapes how attention loads for every session that touches those topics
- [[schema enforcement via validation agents enables soft consistency]] — sibling automation pattern: validation agents check note-level quality, community detection checks graph-level topology; both are asynchronous maintenance that surfaces issues without blocking
- [[betweenness centrality identifies bridge notes connecting disparate knowledge domains]] — complementary algorithmic tool: betweenness identifies structurally critical individual nodes, community detection identifies structurally meaningful group boundaries; together they provide a complete graph health monitoring toolkit
- [[metacognitive confidence can diverge from retrieval capability]] — structural instance: stale MOC boundaries are organizational metacognitive divergence where the system appears well-organized while actual community structure has drifted, producing false confidence in navigation
- [[basic level categorization determines optimal MOC granularity]] — complementary theory: community detection reveals WHEN boundaries should move, basic level theory explains WHERE they should land; Rosch's prototype theory predicts the optimal resolution for sub-MOC titles, and the expertise-shift mechanism explains why the right granularity evolves with understanding, not just with volume
- [[federated wiki pattern enables multi-agent divergence as feature not bug]] — application beyond MOCs: community detection can operationalize federation's quality test by measuring whether parallel interpretations attract distinct link communities or fragment a single cluster
- [[evolution observations provide actionable signals for system adaptation]] — broader diagnostic frame: MOC threshold is one of six diagnostic patterns in the evolution protocol; community detection deepens that specific row with algorithmic signals beyond simple note count, suggesting each diagnostic can be elaborated with more sophisticated methods

Topics:
- [[graph-structure]]
- [[maintenance-patterns]]
