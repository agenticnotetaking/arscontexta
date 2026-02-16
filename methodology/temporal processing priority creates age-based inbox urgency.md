---
description: Age thresholds convert the Ebbinghaus decay principle into actionable queue logic — notes under 24 hours are standard, 24-72 hours elevated, beyond 72 hours critical
kind: research
topics: ["[[processing-workflows]]"]
methodology: ["Cornell"]
source: [[3-3-cornell-note-taking-system]]
---

# temporal processing priority creates age-based inbox urgency

This note operationalizes what [[temporal separation of capture and processing preserves context freshness]] describes as principle. The principle says context fades exponentially in the first 24 hours, which makes timing matter. This note provides the queue algorithm that makes the principle actionable.

The algorithm is straightforward. Every inbox item has an age. Age maps to priority tiers:

| Age | Priority | Rationale |
|-----|----------|-----------|
| < 24 hours | Standard | Context still fresh, full processing possible |
| 24-72 hours | Elevated | Decay accelerating, process before critical threshold |
| > 72 hours | Critical | Original context likely unrecoverable, salvage what remains |

This creates proactive behavior rather than reactive. Instead of processing inbox items when the operator happens to invoke the skill, the system surfaces what needs attention based on temporal urgency. The agent becomes aware that notes are approaching decay thresholds before they cross them.

The underlying mechanism is Ebbinghaus decay applied to capture context rather than memorized content. When you dump a note during zero-friction capture, you have implicit understanding of why it matters, how it connects to what you were thinking, what prompted the insight. None of that gets written down. It lives in your head. And like any unrehearced memory, it fades according to exponential decay curves. The queue algorithm converts this cognitive science into scheduling logic.

This is distinct from demand-driven processing. Since [[processing effort should follow retrieval demand]] suggests that content which gets retrieved more deserves more processing effort, there's a potential tension: demand-driven processing implies waiting to see what proves useful, while temporal priority implies processing immediately regardless of demonstrated demand. Both are valid. Demand-driven processing makes sense for content whose value is uncertain. Temporal priority makes sense for content whose value depends on context that will decay. The resolution: apply temporal priority to recent captures (where context loss is the risk), then shift to demand-driven prioritization for older content (where utilization signal matters more than faded context).

The implementation gap in current agent systems is that most inbox processing happens on manual trigger. The human decides when to process, and the agent processes whatever is there. This misses the temporal dimension entirely. Adding age-based urgency to the orchestration layer would mean: when the user invokes inbox processing, surface the oldest items first, or proactively notify when items approach critical thresholds.

Since [[continuous small-batch processing eliminates review dread]] argues for frequent small processing passes rather than infrequent large ones, temporal priority provides the selection logic for those passes. If you process 3-5 items per session, which 3-5? The ones closest to crossing decay thresholds. This combines the frequency pattern (continuous small batches) with the selection pattern (oldest first) into a coherent processing discipline.

There is a tension with [[batching by context similarity reduces switching costs in agent processing]]. Age-based priority says process the oldest items first because context decays. Similarity-based batching says process related items together to minimize switching costs. The resolution is layered: age determines which priority TIER items fall into (standard, elevated, critical), and within each tier, context similarity determines the ORDER. An item at 71 hours should not wait because a context-similar item at 2 hours exists. But among five items all in the elevated tier, processing the three graph-structure items before the two note-design items reduces switching overhead without violating temporal urgency.
---

Relevant Notes:
- [[temporal separation of capture and processing preserves context freshness]] — the principle this note operationalizes; that note explains WHY timing matters, this note provides the queue algorithm
- [[processing effort should follow retrieval demand]] — potential tension: demand-driven suggests waiting, temporal priority suggests urgency; resolved by applying temporal logic to recent captures, demand logic to established content
- [[continuous small-batch processing eliminates review dread]] — complementary: provides the frequency pattern, while this note provides the selection logic for which items to process in each batch
- [[spaced repetition scheduling could optimize vault maintenance]] — sibling application of Ebbinghaus decay: that note applies age-based scheduling to maintenance intervals, this note applies it to inbox processing priority; same cognitive science foundation targeting different domains
- [[WIP limits force processing over accumulation]] — complementary mechanisms: WIP limits answer when must I process? (forcing function), this note answers what should I process first? (selection algorithm)
- [[PKM failure follows a predictable cycle]] — temporal priority prevents the cascade: surfacing old items urgently prevents Stage 1 (Collector's Fallacy) and Stage 2 (Under-processing) from establishing
- [[generation effect gate blocks processing without transformation]] — orthogonal inbox mechanism: this note answers what to process first (oldest items), the generation gate answers what counts as processed (must have artifact); together they form complete inbox discipline
- [[batching by context similarity reduces switching costs in agent processing]] — tension: age says process oldest first, similarity says process related items together; resolved by letting age set the priority tier and similarity optimize sequence within each tier

Topics:
- [[processing-workflows]]
