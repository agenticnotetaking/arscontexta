---
description: Distinguishes original thinking from consumed ideas, creating a verification graph where any claim can follow its evidence chain backward
kind: research
topics: ["[[note-design]]"]
---

# source attribution enables tracing claims to foundations

Knowledge work builds on sources. Without attribution, the boundary between what you discovered and what you consumed becomes invisible. Attribution creates a parallel graph alongside the wiki link network: since [[wiki links implement GraphRAG without the infrastructure]], wiki links handle conceptual relationships between ideas, while attribution handles provenance — where those ideas came from. The two graphs serve different traversal needs and both matter.

The question "where did this idea come from?" has a different answer than "what ideas connect to this?" A claim might connect to five other claims conceptually while originating from a single source. Both relationships matter, but they serve different purposes. Wiki links enable traversal for synthesis. Attribution enables verification and intellectual honesty.

In this vault, source attribution operates at multiple levels. Notably, since [[inline links carry richer relationship data than metadata fields]], attribution is one of the few cases where metadata fields (the Source footer, YAML provenance) work better than inline links — because provenance is a structural property of the note itself, not a relationship to be argued in prose.

**Thinking notes** carry a Source footer pointing to the reduce task archive where the original material lives. A claim about "atomic notes forcing clear thinking" traces back to the specific research document that sparked it.

**Task files** track the `source_task` field, linking each extracted claim to its reduce batch. The batch links to the source document. This creates a chain: claim note → task file → batch → source.

**YAML provenance fields** (`methodology`, `adapted_from`) distinguish between applying an existing pattern, adapting a human pattern for agents, and inventing something new. These answer "what tradition does this come from?" rather than "what document does this come from?"

The practical value emerges when claims conflict or need verification. If two notes contradict, tracing both to their sources reveals whether the contradiction exists in the source material or emerged during extraction. If a claim feels questionable, the source path shows what evidence supports it.

Attribution also enables meta-analysis: what percentage of vault claims come from Zettelkasten research versus original invention? Which sources produced the most extractable insights? These questions become answerable because the provenance graph exists. At a deeper level, since [[dense interlinked research claims enable derivation while sparse references only enable templating]], methodology provenance is one of four structural prerequisites that make derivation possible. Without attribution infrastructure, a derivation agent cannot distinguish which claims apply to which traditions — it treats all claims as equally applicable everywhere, collapsing the very specificity that makes derivation more powerful than templating.

The provenance principle extends beyond individual claims to system architecture itself. Since [[justification chains enable forward backward and evolution reasoning about configuration decisions]], every configuration choice in a derived knowledge system traces back to the research claims and user constraints that produced it. This is source attribution applied at the system level: where note-level provenance answers "where did this claim come from?", justification chains answer "why is the system configured this way?" The tracing direction is the same (from output to rationale), the value proposition is the same (verification and intelligent evolution), and the failure mode when absent is the same (opaque systems that resist modification because nobody remembers why they were built that way).

The cost is small — a footer line and some YAML fields at the note level, structured chain output at the derivation level. The benefit compounds as the system grows, because every new claim that links to sources strengthens the verification graph, and every justified configuration decision strengthens the evolution graph.
---

Relevant Notes:
- [[wiki links implement GraphRAG without the infrastructure]] — wiki links handle conceptual relationships, attribution handles provenance
- [[inline links carry richer relationship data than metadata fields]] — attribution is one of the few cases where metadata fields (Source footer) work better than inline links
- [[justification chains enable forward backward and evolution reasoning about configuration decisions]] — extends the provenance principle to system architecture: justification chains are source attribution applied at the configuration level, enabling the same backward tracing and evolution capability for derivation decisions that provenance creates for individual claims
- [[dense interlinked research claims enable derivation while sparse references only enable templating]] — identifies methodology provenance as one of four structural prerequisites for derivation: without attribution infrastructure, the derivation agent treats all claims as equally applicable everywhere
- [[provenance tracks where beliefs come from]] — complements documentary provenance with epistemic provenance: this note tracks which source said it, that note tracks how the agent came to believe it (observed, prompted, inherited)

Topics:
- [[note-design]]
