---
description: Once you have fresh context per task, the next question is how to sequence work within a session — organizing by topic similarity minimizes the overhead of loading new context between tasks
kind: research
topics: ["[[processing-workflows]]"]
methodology: ["Cognitive Science", "GTD"]
source: [[tft-research-part3]]
---

# batching by context similarity reduces switching costs in agent processing

Context switching has a cost. For humans, Leroy's attention residue research puts the recovery time at up to 23 minutes. For agents, the cost is different but real: loading context for a new topic consumes tokens, and the semantic distance between consecutive tasks determines how much re-orientation is required. Batching similar tasks together minimizes the frequency and severity of these switches. However, since [[attention residue may have a minimum granularity that cannot be subdivided]], even context-similar consecutive tasks still pay an irreducible floor cost at each boundary — batching reduces the variable component of switching cost (how much new context to load) but cannot eliminate the fixed component (the minimum cognitive redirection penalty). This means batching is necessary but not sufficient: it minimizes the severity of each switch without eliminating the fact that a switch occurred.

The principle is straightforward. If you have ten inbox items — three about graph structure, four about processing workflow, and three about note design — processing all graph structure items consecutively means you load the graph structure context once and apply it three times. Processing them in random order means loading and unloading different topic contexts ten times. The total work done is the same, but the total switching cost is drastically lower in the batched case.

For agent workflows, this translates to organizing task queues by context similarity rather than by priority or arrival order. A synthesis agent should complete all passes for one topic before moving to a different topic. A processing agent should handle all inbox items of one type before switching types. The ralph orchestration pattern already processes tasks sequentially from the queue, but the queue ordering determines how much context overlap exists between consecutive tasks.

Since [[fresh context per task preserves quality better than chaining phases]], each task already gets its own session — this is the macro-level isolation that prevents attention degradation. Context-similar batching operates at the micro level: given that you will process tasks sequentially in fresh sessions, which ORDER minimizes total switching cost? The fresh session loads CLAUDE.md and vault context regardless, but the topic-specific context (relevant MOC, related notes, domain understanding) changes between batches. Processing three graph structure claims back-to-back means the knowledge-worker agent builds graph structure understanding once and carries the pattern across claims. This is [[spreading activation models how agents should traverse]] applied to queue design: topic context loaded for one task primes activation for the next, so the agent enters each subsequent task with relevant concepts already activated rather than starting cold.

Since [[continuous small-batch processing eliminates review dread]], batching by similarity complements the small-batch philosophy. Small batches prevent accumulation (how much), while context-similar batching optimizes sequence (what order). The two heuristics are orthogonal and compound: process small batches of context-similar items for maximum efficiency with minimum dread.

There is a tension with [[temporal processing priority creates age-based inbox urgency]]. Age-based priority says process the oldest items first because context decays with time. Context-similar batching says process related items together regardless of age. The resolution depends on the magnitude of each cost: if an item is about to cross the 72-hour critical threshold, temporal urgency overrides similarity batching. For items within the same urgency tier, similarity batching should determine order. Age sets the priority; similarity optimizes the sequence within each priority band.

Since [[closure rituals create clean breaks that prevent attention residue bleed]], context-similar batching also reduces the residue gap between tasks. When consecutive tasks share context, the closure of one and the opening of the next involve less cognitive distance. The residue from a graph structure task is less harmful when the next task is also about graph structure — the "residue" is actually useful context.

There is a second, deeper tension with [[incremental reading enables cross-source connection finding]]. Context-similar batching optimizes for efficiency by grouping related tasks together, but incremental reading deliberately disrupts that grouping to create forced context collision between different sources. The collision surfaces cross-source connections that sequential, topic-grouped processing would miss. The trade-off is switching cost (minimized by batching) versus serendipitous discovery (maximized by interleaving). Within a single source's claims, batching is unambiguously better because the claims already share context. Across sources, the question becomes whether the efficiency gains from topic-similar batching outweigh the discovery losses from not interleaving.

The practical implication for queue design: when seeding a batch of claims from a single source, the claims are already context-similar (they came from the same material). Processing them in sequence leverages this natural similarity. When processing claims from multiple sources, the choice between topic-based batching and source-based interleaving depends on whether reflect adequately recovers cross-source connections after extraction, or whether some connections only surface through the juxtaposition of processing itself.

---
---

Relevant Notes:
- [[fresh context per task preserves quality better than chaining phases]] — addresses macro-level isolation (separate sessions per phase); this note addresses micro-level sequencing (within a session, how to order tasks)
- [[continuous small-batch processing eliminates review dread]] — complementary forcing function: small batches prevent accumulation, context-similar batching optimizes the sequence within those batches
- [[closure rituals create clean breaks that prevent attention residue bleed]] — closure between batches is more effective when the next batch shares context with the previous one, reducing the residue gap
- [[temporal processing priority creates age-based inbox urgency]] — potential tension: age-based priority says process oldest first, context similarity says process related items together; both heuristics serve different goals
- [[MOCs are attention management devices not just organizational tools]] — applies the same Leroy attention residue mechanism at the session level: MOCs reduce per-session orientation cost, while batching reduces cross-task switching cost
- [[incremental reading enables cross-source connection finding]] — opposing sequencing strategy: batching minimizes switching cost by grouping similar topics, while incremental reading deliberately maximizes switching for serendipitous cross-source collision; the tension is efficiency vs discovery
- [[spreading activation models how agents should traverse]] — mechanism: context-similar batching leverages spreading activation efficiency; topic context loaded for one task primes activation for the next similar task, reducing re-orientation cost
- [[attention residue may have a minimum granularity that cannot be subdivided]] — limits: batching reduces the variable component of switching cost (semantic distance between tasks) but cannot eliminate the fixed component (irreducible redirection penalty); even context-similar tasks pay the floor cost at each boundary

Topics:
- [[processing-workflows]]
