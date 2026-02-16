---
description: Just-in-time processing on retrieval beats just-in-case front-loading because most captured notes are never revisited
kind: research
topics: ["[[processing-workflows]]"]
---

# processing effort should follow retrieval demand

Tiago Forte's research reveals a striking fact: most captured notes are never revisited. This means heavy upfront processing at capture time wastes effort on content that will never be used.

The alternative is JIT (just-in-time) processing: minimal work at capture, investment only on retrieval. When something actually gets retrieved, that's when you process it deeply. This creates a demand-driven queue where attention follows demonstrated value. The cognitive grounding: since [[LLM attention degrades as context fills]], front-loading fills context with low-probability content, degrading attention for the content that actually matters.

The temporal caveat: since [[temporal separation of capture and processing preserves context freshness]], JIT processing has limits for inbox content. Ebbinghaus decay means the human context that made something worth capturing fades within 24 hours. Pure demand-driven processing risks waiting so long that even when retrieval finally signals value, the original understanding is unrecoverable. The reconciliation: JIT still applies, but inbox items have a time-sensitive urgency that other content doesn't. Old inbox items need processing regardless of retrieval signal.

The implication for vault operations is clear: capture quickly and move on. Let retrieval patterns identify what deserves deeper processing. Track retrieval counts to identify high-value content that earns additional synthesis work. And since [[intermediate packets enable assembly over creation]], the deep processing triggered by retrieval naturally produces composable packets — the session's output becomes a building block that future retrieval can assemble from. JIT processing and packet production reinforce each other: retrieval triggers processing, processing produces packets, packets enable future assembly.

But JIT processing requires efficient filtering. Since [[progressive disclosure means reading right not reading less]], the goal isn't minimal loading but curated loading — finding what deserves deep attention before committing full context. The discovery layers provide this filtering mechanism: [[descriptions are retrieval filters not summaries]] enables agents to identify which notes are relevant without loading everything. Scanning 50 descriptions costs fewer tokens than reading 5 full notes to find the relevant one. Aggregated descriptions become a pre-computed low-entropy representation that enables demand-driven retrieval to be efficient.

This inverts the traditional knowledge management instinct to "process properly" at capture time. That instinct optimizes for the wrong thing. Since [[throughput matters more than accumulation]], the constraint isn't capture quality but capture volume — and volume demands selective investment based on actual use, not predicted importance.

## Demand signals in practice

How do you actually measure retrieval demand? Since [[dangling links reveal which notes want to exist]], one concrete signal emerges from wiki link patterns. When multiple notes independently reference the same concept, that accumulated demand justifies creation of the note. The frequency of dangling links IS demand measurement — the graph is voting with its references.

This connects to traversal patterns too. Since [[spreading activation models how agents should traverse]], frequently traversed nodes accumulate more activation and show up in more search results. The spreading activation mechanism creates its own demand signal: nodes that get visited often during retrieval are demonstrably high-value.

Together, these provide objective demand metrics:
- **Dangling link frequency** — how often does the graph reference this concept?
- **Traversal frequency** — how often do agents visit this node during retrieval?
- **Backlink count** — how many notes invoke this one?

Processing investment should flow to nodes that score high on these metrics. Let demand emerge from use, not from predictions about importance.

## The blind spot

Demand-driven processing has a structural limitation: notes that SHOULD receive attention but don't generate retrieval signals fall outside the demand loop. If maintenance attention follows the same power-law distribution as link density, the bottom 80% of notes may receive minimal attention regardless of need. [[random note resurfacing prevents write-only memory]] tests whether random selection — explicitly anti-JIT — addresses this blind spot by giving every note equal probability of maintenance attention independent of demand signals. A complementary approach emerges from [[spaced repetition scheduling could optimize vault maintenance]], which tests whether interval-based scheduling (frequent early review, sparse later) adds a proactive dimension to the demand-following principle — some maintenance effort anticipates need based on note age rather than responding to retrieval signals or random selection.

For experiments specifically, since [[maintenance targeting should prioritize mechanism and theory notes]], demand signals should be semantic rather than observed. The question "what mechanism does this test?" predicts higher-value reweave targets than retrieval frequency or topic proximity. Experiments need their theory notes, not their MOC neighbors.
---

Relevant Notes:
- [[topological organization beats temporal for knowledge work]] — JIT retrieval is only efficient when the system is organized for semantic access; date-based organization would force chronological scanning regardless of retrieval demand
- [[progressive disclosure means reading right not reading less]] — the philosophy underlying efficient filtering: curated loading over minimal loading
- [[queries evolve during search so agents should checkpoint]] — both patterns recognize that processing should respond to runtime information, not front-loaded predictions
- [[dangling links reveal which notes want to exist]] — provides the demand measurement mechanism: dangling link frequency signals where processing investment pays off
- [[spreading activation models how agents should traverse]] — traversal patterns create demand signals: frequently visited nodes demonstrate high retrieval value
- [[descriptions are retrieval filters not summaries]] — provides the filtering mechanism that makes JIT retrieval efficient: scan descriptions to identify what deserves full loading
- [[throughput matters more than accumulation]] — provides the success metric that demand-driven processing serves: velocity from capture to synthesis, not archive size
- [[LLM attention degrades as context fills]] — cognitive grounding for JIT: front-loading degrades attention for the content that actually matters
- [[temporal separation of capture and processing preserves context freshness]] — temporal constraint on JIT: inbox content has time-sensitive urgency because human context decays
- [[random note resurfacing prevents write-only memory]] — tests whether anti-JIT random selection addresses the blind spot where notes lacking demand signals accumulate neglect
- [[spaced repetition scheduling could optimize vault maintenance]] — tests interval-based scheduling as a third allocation strategy alongside demand-driven (JIT) and random selection; proactive rather than reactive
- [[maintenance targeting should prioritize mechanism and theory notes]] — refines demand-following for experiments: semantic demand (what mechanism is being tested) predicts value better than observed demand (retrieval frequency)
- [[intermediate packets enable assembly over creation]] — connects processing outputs to composability: JIT processing triggered by retrieval naturally produces packets that future work can assemble from

Topics:
- [[processing-workflows]]
