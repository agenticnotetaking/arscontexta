---
description: wiki links are curated graph edges that implement GraphRAG-style retrieval without infrastructure — each link is a retrieval decision embedded in content
kind: research
topics: ["[[graph-structure]]", "[[discovery-retrieval]]"]
---

# wiki links create navigation paths that shape retrieval

A wiki link is not just a reference — it's a curated edge in a knowledge graph that determines what gets surfaced. Since [[wiki links implement GraphRAG without the infrastructure]], these explicit edges provide the same multi-hop reasoning capability that GraphRAG achieves through entity extraction pipelines, but without the infrastructure dependency.

## The Mechanism

When I write [[scaffolding enables divergence that fine-tuning cannot]], I'm doing two things:
1. pointing to related content
2. creating a traversal path

Retrieval systems follow these paths. Search surfaces linked content. The structure of links shapes what appears in context. Because [[spreading activation models how agents should traverse]], following wiki links replicates the brain's spreading activation pattern — activation spreads from the starting node through connected nodes, decaying with distance. The curated edges ensure activation flows through high-signal paths rather than statistical noise.

A note with ten relevant links surfaces different context than an isolated note. The links ARE the retrieval architecture. And because [[each new note compounds value by creating traversal paths]], every new curated edge multiplies traversal paths across the entire graph — the value is not linear but compounding.

## Why "Curated" Matters

Not all connections are equal. A wiki link says "I thought about this and decided these ideas relate."

This is different from:
- keyword overlap (accidental)
- embedding similarity (fuzzy)
- folder proximity (hierarchical)

Wiki links are intentional edges. They encode judgment. Since [[elaborative encoding is the quality gate for new notes]], the cognitive depth of that judgment matters — genuine relationship articulation ("extends by adding the temporal dimension") creates encoding depth that bare association ("related to") cannot. The articulation requirement is what keeps curated edges high-signal.

## Implications

Because [[title as claim enables traversal as reasoning]], when titles are claims rather than topic labels, following these curated paths reads as prose reasoning — "since `[[X]]`, therefore Y" — rather than reference lookup. The navigation paths become reasoning chains.

Three properties determine whether wiki links function as effective retrieval architecture:

- **link discipline** — bad links pollute retrieval. Since [[inline links carry richer relationship data than metadata fields]], the prose context around each link captures relationship type that guides traversal decisions. Links without context are structurally present but semantically empty.
- **link context** — "why this link" helps future traversal. The relationship articulation serves both the author (elaborative encoding at creation time) and the traverser (decision aid at retrieval time).
- **link density** — dense linking outperforms sparse linking for retrieval quality, but only when links pass the articulation test. Dense bare references compound noise; dense articulated references compound signal.

Without wiki link structure, since [[flat files break at retrieval scale]], storage degrades to linear scanning as the vault grows. Wiki links are the mechanism that prevents this — they create the retrieval paths that make navigation targeted rather than exhaustive. And since [[backlinks implicitly define notes by revealing usage context]], the navigation paths work in both directions: forward links show where a note points, backlinks reveal where it has been useful, together building the full picture of a concept's role in the graph.

---
---

Relevant Notes:
- [[wiki links implement GraphRAG without the infrastructure]] — develops the full argument: explicit curated edges enable multi-hop reasoning without entity extraction pipelines
- [[spreading activation models how agents should traverse]] — the cognitive model: traversal through wiki links replicates spreading activation, making link structure determine what gets primed
- [[each new note compounds value by creating traversal paths]] — the economic consequence: each curated edge multiplies retrieval paths, so link density drives compounding returns
- [[title as claim enables traversal as reasoning]] — when titles are claims, navigation paths become reasoning chains rather than reference lookups
- [[elaborative encoding is the quality gate for new notes]] — the cognitive mechanism behind link quality: genuine relationship articulation creates encoding depth that bare references cannot
- [[inline links carry richer relationship data than metadata fields]] — develops why link context matters: prose surrounding a link captures relationship type that metadata fields cannot encode
- [[descriptions are retrieval filters not summaries]] — descriptions enable high-decay traversal through the paths wiki links create
- [[structure enables navigation without reading everything]] — synthesis: wiki links are one of four structural mechanisms that compose into discovery layers
- [[flat files break at retrieval scale]] — the problem wiki links solve: unstructured storage fails when retrieval matters
- [[backlinks implicitly define notes by revealing usage context]] — the reverse direction: incoming links reveal where a note has been useful, extending its meaning beyond authored content
- [[external memory shapes cognition more than base model]] — foundation: why retrieval architecture matters more than processing capability
- [[scaffolding enables divergence that fine-tuning cannot]] — the macro claim: scaffolding (including wiki link structure) enables capabilities that model changes cannot

Topics:
- [[graph-structure]]
- [[discovery-retrieval]]
