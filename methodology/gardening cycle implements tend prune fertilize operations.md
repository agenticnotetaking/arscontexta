---
description: Separating vault maintenance into tend (update), prune (remove/split), and fertilize (connect) operations may produce better outcomes than combined holistic reweave
kind: research
topics: ["[[maintenance-patterns]]"]
source: TFT research corpus (00_inbox/heinrich/)
---

# gardening cycle implements tend prune fertilize operations

The digital gardening tradition defines three conceptually distinct maintenance activities with different goals and cognitive modes: tend (update/correct based on new information), prune (remove low-value content or split overgrown notes), and fertilize (actively create connections). Agent-operated knowledge systems often merge these operations — backward maintenance handles updating, splitting, and connecting in one pass. Separating them might enable more focused attention and better quality gates per operation.

The separation hypothesis has theoretical grounding. Since [[LLM attention degrades as context fills]], three focused operations each starting fresh might outperform one combined operation that runs longer. This parallels [[fresh context per task preserves quality better than chaining phases]] — if isolation preserves quality for processing phases, it might also preserve quality for maintenance operations.

The three operations map naturally to different cognitive modes. Tending involves reassessing content against current knowledge — understanding what needs updating. Fertilizing sits on the building side, creating new connections. Pruning requires both: understanding what's overgrown before building the split. This cognitive mode distinction suggests the operations genuinely differ rather than being arbitrary divisions. And because [[maintenance operations are more universal than creative pipelines because structural health is domain-invariant]], all three operations transfer across knowledge domains without adaptation — a therapy journal's tend/prune/fertilize cycle checks the same structural properties (schema compliance, note scope, link density) as a research vault's, even though the creative processing that produced those notes differs entirely.

The practical question is whether separation adds value or just terminology. Since [[backward maintenance asks what would be different if written today]], the holistic reconsideration frame might itself be the quality gate — asking all three questions simultaneously ("what needs updating? what's overgrown? what connections are missing?") could surface insights that isolated passes miss. The counterargument is that asking one question deeply beats asking three questions shallowly within the same degrading context window.

There is also a question of scale. Since [[navigation infrastructure passes through distinct scaling regimes that require qualitative strategy shifts]], the gardening operations themselves require different implementation at different regimes. At Regime 1 (under 50 notes), all three operations are trivially manual — the gardener can see the entire garden. At Regime 2 (50-500), the operations are feasible manually but require scheduling discipline. At Regime 3 (500+), tending and pruning detection must be automated because no manual scan can cover the full garden, while the fertilizing decision still requires judgment about which connections are genuine.

There is also a question of scope. The three gardening operations — tend, prune, fertilize — all operate within an existing garden layout: which beds exist, how paths connect them, what the irrigation system looks like. Since [[derived systems follow a seed-evolve-reseed lifecycle]], there is a qualitatively different act beyond tending, pruning, and fertilizing: redesigning the garden's layout itself. Reseeding restructures the framework (templates, MOC hierarchy, processing pipeline) while preserving the plants (content, links, accumulated understanding). The gardening operations are evolution-phase maintenance; reseeding is a phase transition that the gardening metaphor does not cover.

The gardening operations gain scheduling discipline when paired with reconciliation. Since [[reconciliation loops that compare desired state to actual state enable drift correction without continuous monitoring]], reconciliation determines WHEN tend, prune, and fertilize should fire by detecting divergence from desired state. The reconciliation table's rows map directly to gardening operations: dangling links and schema violations trigger tending, orphan notes and oversized MOCs trigger pruning, and sparse connection density triggers fertilizing. Without reconciliation, gardening depends on the agent noticing symptoms; with reconciliation, the detection is automated and the gardening operations become the remediation actions that execute when checks find divergence.

If separation improves quality, the implementation path is clear: tend, prune, and fertilize become distinct operations with separate workflows. Since [[skills encode methodology so manual execution bypasses quality gates]], these workflows would encode the focused operations with operation-specific quality gates. Random note maintenance ([[random note resurfacing prevents write-only memory]]) could cycle through the three operations. [[spaced repetition scheduling could optimize vault maintenance]] tests WHEN maintenance happens as a complementary optimization to HOW (operation separation).
---

Relevant Notes:
- [[backward maintenance asks what would be different if written today]] — the holistic approach this potentially improves upon
- [[fresh context per task preserves quality better than chaining phases]] — provides theoretical grounding for why focused operations might outperform combined passes
- [[LLM attention degrades as context fills]] — the cognitive science foundation for operation separation
- [[skills encode methodology so manual execution bypasses quality gates]] — implementation pattern if validated
- [[random note resurfacing prevents write-only memory]] — related experiment about note selection for maintenance
- [[spaced repetition scheduling could optimize vault maintenance]] — complementary experiment about timing
- [[cognitive outsourcing risk in agent-operated systems]] — potential mitigation: focused operations with smaller scope may enable deeper human evaluation per decision, making rubber-stamping harder than blanket approval of holistic reconsideration
- [[derived systems follow a seed-evolve-reseed lifecycle]] — scope boundary: gardening operations maintain plants within an existing layout, while reseeding redesigns the layout itself; the three operations are evolution-phase maintenance that cannot address systemic incoherence requiring framework restructuring
- [[maintenance operations are more universal than creative pipelines because structural health is domain-invariant]] — explains why these three operations transfer across domains: tend, prune, and fertilize all operate on structural properties (schema compliance, note scope, link density) rather than domain semantics, making the gardening cycle portable in ways that creative processing is not
- [[reconciliation loops that compare desired state to actual state enable drift correction without continuous monitoring]] — scheduling layer: reconciliation determines WHEN each gardening operation should fire by detecting divergence from desired state, making gardening the remediation actions that reconciliation detection triggers
- [[navigation infrastructure passes through distinct scaling regimes that require qualitative strategy shifts]] — scale dependency: the three gardening operations require qualitatively different implementation at each regime — trivially manual at Regime 1, scheduled manual at Regime 2, automated detection with judgment-gated remediation at Regime 3

Topics:
- [[maintenance-patterns]]
