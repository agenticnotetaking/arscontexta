---
description: Work products structured as composable packets let agents assemble outputs from existing material rather than creating from scratch
kind: research
topics: ["[[processing-workflows]]"]
---

# intermediate packets enable assembly over creation

Tiago Forte's Intermediate Packets framework suggests that projects should be assembled from pre-existing packets rather than created from scratch. Each work session becomes a retrievable packet. An agent-operated knowledge system functions as a packet repository. This shifts the model from archive search to assembly.

Forte's "Slow Burns" methodology extends this insight: projects that would require intense deadline pressure to create from scratch become manageable when assembled from packets that accumulated over time. The vault becomes a parts warehouse rather than an archive. When projects arise, agents assemble from inventory rather than fabricating from scratch under time constraints. The retrieval strategy shifts from "just-in-case archive search" (hoping something relevant exists) to "just-in-time assembly" (knowing the building blocks are ready).

Since [[throughput matters more than accumulation]], the key metric is processing velocity from capture to synthesis. Packets are what high-throughput systems produce: incrementally processed outputs ready for assembly. The accumulation mistake is measuring by inbox size; the throughput insight is measuring by packet production rate. The granularity of packets matters for cross-source discovery: since [[incremental reading enables cross-source connection finding]], extracting smaller, more atomic packets from multiple sources and processing them in interleaved order creates forced context collision that source-by-source processing misses. The extract becomes the atomic unit divorced from its original document structure, enabling juxtaposition across sources.

The implication for agent work: structure outputs for reuse. Since [[session outputs are packets for future selves]], each session should produce composable building blocks that future sessions can assemble from rather than starting from zero. Creation becomes assembly. The system accumulates building blocks. Packets also enable session isolation: since [[LLM attention degrades as context fills]], handoffs through packets preserve attention quality by giving each processing phase fresh context. The handoff documents ARE packets — since [[session handoff creates continuity without persistent memory]], each session's structured summary functions as a briefing packet that the next session assembles from. The session handoff format is a packet specification: completed work, incomplete tasks, discoveries, recommendations — all the building blocks for session N+1 to assemble its context. Because [[the generation effect requires active transformation not just storage]], packets must contain generated artifacts — synthesis, articulated connections, processed insights — not merely collected inputs. A packet of bookmarks has no assembly value. A packet of claims with descriptions and connections enables genuine assembly. The generation is what makes the packet composable. But since [[verbatim risk applies to agents too]], the packet can look generated while actually being reorganized content — a well-formatted summary that adds no insight. The risk for packet-based workflows: agents producing packets at high velocity that appear composable but contain no genuine building blocks inside.

## Packets are what JIT processing naturally produces

This connects to [[processing effort should follow retrieval demand]] at an interesting scale. JIT processing says invest on retrieval, not capture — minimal work upfront, deep processing when something proves valuable. Packets operate one level up: the session itself performs retrieval-driven work, and the packet is the processed output. The packet IS what JIT produces when retrieval triggers deep engagement. Packets don't contradict JIT; they're what JIT workflows naturally create.

Forte uses a supply chain metaphor that clarifies this: instead of warehousing finished goods that might never sell, maintain raw materials and process only when orders come in. Inbox items are raw materials with minimal processing. When a project creates demand, that triggers processing. The vault becomes demand-driven rather than supply-driven. Raw captures sit with low investment until retrieval demonstrates value, then processing produces packets that accumulate as inventory for future assembly.

This changes how we think about content production. Instead of "write an article," the task becomes "assemble an article from existing packets." The work happened incrementally across sessions. The final assembly is lightweight because the heavy lifting already occurred.

## The composability constraint

Packets must be genuinely composable. If they require extensive editing or restructuring to fit together, assembly offers no advantage over creation. Composability requires intentional design at the packet level.

Just as [[wiki links implement GraphRAG without the infrastructure]] creates a curated graph where every edge passed human judgment, packets must be structured so every output is retrievable and invocable. A packet that can't be found or linked isn't a building block — it's inventory. Since [[note titles should function as APIs enabling sentence transclusion]], the pattern extends to packets: the packet is a callable function that future work can invoke.

## Derivation as system-level assembly

The assembly-over-creation principle operates at its largest scale in knowledge system derivation. Since [[derivation generates knowledge systems from composable research claims not template customization]], the research claims in the graph ARE intermediate packets — composable units that a derivation agent assembles into novel configurations rather than designing from scratch. A template approach is creation: you build a system, then offer it as a starting point. Derivation is assembly: you compose a system from pre-existing claim-packets, each carrying its own justification. The claim graph is a parts warehouse for knowledge system architectures, and derivation is Forte's "Slow Burns" applied to methodology generation — the claims accumulated over months of research become the building blocks assembled when a new use case creates demand.
---

Relevant Notes:
- [[note titles should function as APIs enabling sentence transclusion]] — foundational: packets extend the notes-as-APIs pattern; packets are callable functions that future work can invoke, just as notes are
- [[throughput matters more than accumulation]] — packets are the mechanism that makes throughput sustainable: incrementally processed outputs ready for assembly
- [[processing effort should follow retrieval demand]] — packets are what JIT processing produces when retrieval triggers deep work; they operate one level up from note-level JIT
- [[wiki links implement GraphRAG without the infrastructure]] — packets need curated links to be discoverable; the curation quality requirement extends from notes to session outputs
- [[LLM attention degrades as context fills]] — packets enable session isolation: fresh context preserves attention quality between phases
- [[fresh context per task preserves quality better than chaining phases]] — the design decision packets make possible; without packets as handoff mechanism, session isolation would lose context
- [[session handoff creates continuity without persistent memory]] — handoff documents ARE packets: each session's briefing is a packet that the next session assembles from
- [[session outputs are packets for future selves]] — applies the packet principle specifically to session boundaries: each session's output is a composable building block, and the Memento metaphor grounds the claim that outputs are callable functions, not just data
- [[the generation effect requires active transformation not just storage]] — explains why packets must contain generated artifacts: collection has no assembly value, synthesis does
- [[trails transform ephemeral navigation into persistent artifacts]] — proposes extending the packet pattern to navigation: trails as packets that hand off discovered paths, not just work products
- [[verbatim risk applies to agents too]] — tests whether packets can look composable while containing only reorganized content; if validated, packet quality requires generation verification, not just structural checks
- [[incremental reading enables cross-source connection finding]] — smaller, more atomic packets enable interleaved processing across sources; extract granularity affects whether cross-source connections get discovered
- [[derivation generates knowledge systems from composable research claims not template customization]] — system-level assembly: research claims ARE intermediate packets composable into novel knowledge system configurations; derivation is the assembly pattern applied to methodology generation

Topics:
- [[processing-workflows]]
