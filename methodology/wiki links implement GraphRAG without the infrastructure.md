---
description: Explicit wiki links create a human-curated knowledge graph that enables multi-hop reasoning without entity extraction pipelines or graph databases
kind: research
topics: ["[[graph-structure]]"]
---

# wiki links implement GraphRAG without the infrastructure

GraphRAG (Graph Retrieval Augmented Generation) works by extracting entities, building knowledge graphs, running community detection algorithms (Leiden), and generating summaries at different abstraction levels. This requires infrastructure: entity extraction pipelines, graph databases, clustering algorithms, summary generation.

But wiki links already do this.

## MOCs are community summaries

GraphRAG uses the Leiden algorithm to detect communities in knowledge graphs, then generates summaries for each community. These summaries help LLMs understand large-scale structure without loading the entire graph.

MOCs (Maps of Content) are human-written community summaries. The human identifies clusters of related notes, groups them under headings, writes synthesis that explains how the notes connect. This is the same function as algorithmic community detection, but with higher curation quality because the human understands conceptual relationships that word co-occurrence misses.

Example: a MOC about [[note-design]] identifies that spreading activation, graph topology, and retrieval verification form a coherent cluster about agent cognition. The Leiden algorithm would see these as separate communities because they don't share keywords. The human sees the semantic connection.

## Wiki links are intentional edges

Entity extraction pipelines infer relationships by finding co-occurrences: "Paris" and "France" appear together, so they're probably related. This creates noisy graphs where many edges are spurious.

Wiki links are explicit. And because [[local-first file formats are inherently agent-native]], any LLM can read these explicit edges without authentication or infrastructure — the graph structure IS the file contents, not something extracted from a database. When I write `since [[spreading activation models how agents should traverse]], we can design retrieval with decay parameters`, that edge is intentional. It means I judged the relationship to be meaningful enough to encode. The graph has higher signal-to-noise because every edge passed human judgment.

There's a deeper pattern here: since [[note titles should function as APIs enabling sentence transclusion]], the title is the function signature, the body is the implementation, and wiki links are function calls. When you link to a note, you're invoking its argument. This framing makes the curation quality obvious: you wouldn't call a function you haven't verified. Every wiki link is a deliberate API invocation, not a statistical correlation. And since [[intermediate packets enable assembly over creation]], this API pattern extends to session outputs: packets are callable units that future work can assemble from, just as notes are callable units that arguments can invoke. The composability requirement applies at both levels — notes must be invocable, packets must be assemblable.

This matters for multi-hop reasoning. If you're traversing a graph where 40% of edges are noise, multi-hop quickly degrades. If every edge is curated, multi-hop compounds signal. Since [[each new note compounds value by creating traversal paths]], the curation quality of wiki links determines the compounding rate — noisy edges dilute the multiplicative effect, while curated edges maximize it.

## Folgezettel becomes unnecessary

The Zettelkasten community has debated whether Luhmann's physical note sequences — the Folgezettel numbering system where 1/1a follows 1/1 — matter in digital systems. Luhmann's paper slips lived in boxes, so physical adjacency carried information: if you placed 1/1a after 1/1, you were encoding that the second note continued or qualified the first.

But when hyperlinks exist, physical position becomes unnecessary. The wiki link graph provides all the sequencing information that Luhmann's numbering system provided, but with greater flexibility. Any note can link to any other note without being constrained by physical adjacency. A note about agent traversal can link to a note about network topology without either needing to be "near" the other in some filing system.

This validates the system's flat folder architecture. Notes live in a flat thinking folder without subfolders not because organization doesn't matter, but because the organization IS the link graph. Since [[associative ontologies beat hierarchical taxonomies because heterarchy adapts while hierarchy brittles]], folders would impose exactly the wrong kind of structure — a rigid tree on what is inherently a network that adapts as understanding grows. The wiki links carry the structural information; folders would just add noise and brittleness. Since [[retrieval utility should drive design over capture completeness]], flat structure is retrieval-first thinking applied to file organization: the question isn't "where should I put this?" but "how will I find it later?" — and wiki links answer that better than folder hierarchies.

The insight: wiki links don't just replace GraphRAG's entity extraction — they also replace Zettelkasten's physical sequencing. Both were attempts to encode relationships in a pre-hyperlink world. One used statistical co-occurrence, the other used physical adjacency. Wiki links make both approaches obsolete because they encode relationships directly.

## The implementation pattern

Treat wiki links as primary retrieval mechanism:
1. Start from a concept (note or MOC)
2. Follow explicit links to related concepts
3. Load context by traversing the graph
4. Use embeddings as gap-detection: "what else might be relevant that isn't linked?"

This inverts the typical RAG pattern. Usually: embeddings find candidates, then rerank. Here: wiki links find candidates (because they're curated), embeddings catch what links missed.

## What this enables

Multi-hop reasoning without infrastructure. An agent can:
- Start at [[note-design]] MOC
- Follow links to [[spreading activation models how agents should traverse]]
- Follow links from there to related concepts
- Build context progressively through traversal

Because [[small-world topology requires hubs and dense local links]], the power-law distribution where MOCs have many links and atomic notes have few creates short paths between any concepts — typically 2-4 hops separate any ideas. Typically 2-4 hops separate any ideas, which keeps context window usage manageable.

But multi-hop traversal introduces a complication: what you're looking for can change mid-search. Since [[queries evolve during search so agents should checkpoint]], the curated graph needs to support direction changes. This is where small-world topology pays off twice: not only does it minimize hops to any concept, it minimizes hops to change course when understanding shifts.

No entity extraction. No graph database. No clustering algorithm. Just markdown files with wiki links and an agent that knows how to traverse. But wiki links are only the traversal layer. Since [[markdown plus YAML plus ripgrep implements a queryable graph database without infrastructure]], the full graph database architecture requires four layers that compose: wiki link edges provide traversal, YAML metadata provides structured property queries, faceted classification provides multi-dimensional access, and soft validation provides data integrity. This note covers layer one; the synthesis note argues that the layers' dependency structure reveals database architecture hiding in plain text.

This infrastructure-free property has a specific architectural consequence for multi-domain systems: since [[multi-domain systems compose through separate templates and shared graph]], the shared wiki link namespace is what makes domain isolation at the template layer compatible with graph unity at the connection layer. Each domain can define its own templates, schemas, and processing rules, but all notes inhabit the same link namespace — a therapy reflection and a research claim and a project decision all participate in the same graph traversal. Without this shared namespace, multi-domain composition would require inter-graph bridges that wiki links make unnecessary. Though at scale, the regex-based link operations that currently implement backlink resolution and orphan detection become fragile — since [[intermediate representation pattern enables reliable vault operations beyond regex]], parsing links into structured objects would make these operations property lookups immune to edge cases in code blocks and backtick-wrapped examples, preserving the "without infrastructure" philosophy for the storage layer while adding reliability to the operation layer. And since [[data exit velocity measures how quickly content escapes vendor lock-in]], this "without infrastructure" property is quantifiable: wiki links score high exit velocity because the link syntax `[[note title]]` is human-readable even without resolution software. The graph structure lives entirely in the portable layer — no database export, no API translation, no format conversion needed. The most valuable structural feature of the vault has the highest exit velocity.

The constraint is: link curation quality matters. Since [[claims must be specific enough to be wrong]], vague links can't be reliably invoked — the graph fragments when links don't carry specific meaning. But if links are curated (which connection-finding and backward maintenance enforce), the graph becomes a first-class retrieval structure. Since [[backward maintenance asks what would be different if written today]], the backward pass ensures that older notes stay current rather than becoming stale nodes in a fragmented graph.

## Uncertainty

What we don't know yet: how much worse is human curation than automated extraction at scale? A human can curate 1000 notes carefully. Can they curate 100,000? At what vault size does automated extraction outperform human judgment because the human can't maintain coherence?

The bet is that for vaults up to ~10,000 notes, human curation produces better graphs because conceptual relationships matter more than exhaustive coverage. Beyond that, we might need hybrid: human-curated core, algorithm-extended periphery.

The differentiation this note describes is now playing out at industry scale. Since [[vibe notetaking is the emerging industry consensus for AI-native self-organization]], most AI-native tools chose the embedding path — vectorize content, cluster by similarity, surface connections through cosine proximity. This recreates GraphRAG through statistical inference rather than explicit curation. The result is searchable archives with opaque connections that produce connection fatigue when users cannot tell why items are "related." The wiki link alternative implements the same graph benefits with transparency, inspectability, and traversability that statistical approaches cannot provide.

Semantic similarity (what automated extraction measures) is not the same as conceptual relationship. Two notes might be distant in embedding space but profoundly related through mechanism or implication. Two notes might be close in embedding space but share only superficial vocabulary. Human curation catches relationships that statistical measures miss precisely because humans understand WHY concepts connect, not just THAT they co-occur. The architecture bets that curated wiki links outperform semantic search for connection finding at this vault's scale.

---

- [[retrieval utility should drive design over capture completeness]] — flat folder architecture is retrieval-first design applied to file organization: wiki links answer "how will I find it" better than folder hierarchies answer "where should I put it"
- [[local-first file formats are inherently agent-native]] — the foundational layer: plain text with embedded metadata is why "without the infrastructure" is possible; the substrate has no external dependencies
- [[intermediate packets enable assembly over creation]] — extends the notes-as-APIs pattern to session outputs: packets are composable units that future work can assemble from, just as notes are callable units that arguments can invoke
- [[intermediate representation pattern enables reliable vault operations beyond regex]] — addresses the reliability layer: as vault scale grows, link operations (backlink resolution, orphan detection, multi-hop traversal) on raw markdown via regex become fragile; an IR makes these property lookups on pre-parsed link objects
- [[vibe notetaking is the emerging industry consensus for AI-native self-organization]] — industry validation: most AI-native tools chose the embedding path this note contrasts with wiki links, producing opaque connections that recreate GraphRAG through statistical inference rather than explicit curation
---

Relevant Notes:
- [[markdown plus YAML plus ripgrep implements a queryable graph database without infrastructure]] — synthesis: places wiki link traversal as layer one of a four-layer graph database architecture where edges, metadata, faceted access, and validation compose into database capabilities
- [[note titles should function as APIs enabling sentence transclusion]] — foundational: the notes-as-APIs pattern this note develops; titles as signatures, bodies as implementation, links as function calls
- [[spreading activation models how agents should traverse]] — provides the traversal model that wiki links enable
- [[small-world topology requires hubs and dense local links]] — provides structural criteria for what makes these graphs navigable
- [[queries evolve during search so agents should checkpoint]] — addresses what happens when understanding shifts during multi-hop traversal
- [[dangling links reveal which notes want to exist]] — extends wiki links by adding the demand signal: frequency of dangling links predicts which concepts deserve notes
- [[each new note compounds value by creating traversal paths]] — curation quality determines compounding rate: curated edges maximize the multiplicative value effect, noisy edges dilute it
- [[data exit velocity measures how quickly content escapes vendor lock-in]] — quantifies the 'without infrastructure' property: wiki links score high exit velocity because the link syntax is human-readable even without resolution software, encoding graph structure in the portable layer
- [[wiki links as social contract transforms agents into stewards of incomplete references]] — adds the obligation layer: every wiki link edge carries a stewardship commitment, and unfulfilled links are broken edges in the curated graph; the social contract is the mechanism that keeps this infrastructure-free graph navigable over time
- [[multi-domain systems compose through separate templates and shared graph]] — multi-domain enabler: the shared wiki link namespace is what makes domain isolation at the template layer compatible with graph unity, enabling cross-domain traversal without inter-graph bridges

Topics:
- [[graph-structure]]
