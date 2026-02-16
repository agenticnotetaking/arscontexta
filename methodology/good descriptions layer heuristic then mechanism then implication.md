---
description: Structure descriptions as three layers — lead with actionable heuristic, back with mechanism, end with operational implication — so agents can assess relevance at multiple levels
kind: research
topics: ["[[discovery-retrieval]]"]
---

The pattern for effective descriptions has three layers:

1. **Actionable heuristic** — what to do, stated directly
2. **Mechanism** — why it works, the underlying principle
3. **Operational implication** — what this means for practice

This layering formula is itself a schema template: since [[schema templates reduce cognitive overhead at capture time]], having a formula shifts description-writing from "what should I say about this note" to "fill in these three layers." The structure is given, so attention focuses on content within the structure.

This structure helps agents assess relevance at multiple levels. Someone scanning descriptions can stop at the heuristic if that's enough. Someone deciding whether to read fully can check the mechanism. Someone applying the insight needs the implication.

Example from [[temporal separation of capture and processing preserves context freshness]]:
> "Capture when context is fresh, process when attention is available — the cognitive modes conflict so separating them in time preserves quality of both"

- Heuristic: capture when fresh, process when available
- Mechanism: cognitive modes conflict
- Implication: separation preserves quality

The pattern extends [[descriptions are retrieval filters not summaries]] with a specific formula. That note says descriptions must add new information beyond the title. This note says how to structure that information for maximum utility.

This layered structure addresses the specificity problem. Since [[claims must be specific enough to be wrong]], vague descriptions fail the same way vague claims do — they can't be disagreed with, built on, or used to filter. Each layer of the formula forces specificity: a heuristic must be actionable (not abstract), a mechanism must explain why (not just what), an implication must be operational (not just theoretical). Descriptions that merely paraphrase the title collapse all three layers into zero. This is the description-level manifestation of [[verbatim risk applies to agents too]] — the agent can produce the structural form (a description in YAML) without the generative content (distinct information at each layer).

The layers also enable efficient high-decay traversal. Since [[spreading activation models how agents should traverse]], agents can stop at description depth when scanning broadly. The heuristic layer alone often suffices for filtering decisions — "what to do" tells you whether to read deeper. When more context is needed, mechanism and implication layers are already there. This matches the decay pattern: high-decay traversal stops at heuristic, medium-decay reaches mechanism, low-decay gets implication before loading full content.

The formula also enables [[distinctiveness scoring treats description quality as measurable]]. Layered descriptions are more likely to be distinctive because each layer adds differentiating information — two notes might share a heuristic but have different mechanisms, or share mechanisms but lead to different implications. The combination creates specificity that pure content summaries lack.

The layering formula has a hidden cost for keyword retrieval. Connecting heuristic to mechanism to implication requires prose transitions — "because," "which means," "so that" — and since [[BM25 retrieval fails on full-length descriptions because query term dilution reduces match scores]], these connective words consume IDF scoring budget without contributing to retrieval signal. A well-layered description excels at human scanning precisely because the transitions create logical flow, but that same flow dilutes keyword search. Because [[description quality for humans diverges from description quality for keyword search]], this is not a fixable defect in the formula but an inherent tension: the two retrieval channels make opposing demands on the same character budget, and the layering formula picks a side by optimizing for comprehension over keyword density.

Yet even well-layered descriptions operate within the ~150-character constraint, and since [[sense-making vs storage does compression lose essential nuance]], some knowledge types may resist even optimal compression. Procedural nuance where tacit judgment matters, contextual knowledge whose meaning depends on situation, or phenomenological content that resists propositional reduction — these may not fit the heuristic/mechanism/implication structure at all. The layering formula helps maximize filter value within the compression constraint, but since [[vault conventions may impose hidden rigidity on thinking]], the constraint itself may exclude certain kinds of thinking. The layering formula and the sense-making tension are sibling concerns: the formula asks how to maximize value within convention limits, the tension asks whether convention limits systematically exclude valuable content.
---

Relevant Notes:
- [[descriptions are retrieval filters not summaries]] — foundational insight; this note adds structural pattern
- [[metadata reduces entropy enabling precision over recall]] — information-theoretic grounding: the layered structure pre-computes low-entropy representations at multiple depths
- [[progressive disclosure means reading right not reading less]] — descriptions are the first disclosure layer
- [[claims must be specific enough to be wrong]] — same anti-pattern: vagueness defeats utility; the layering formula forces specificity
- [[distinctiveness scoring treats description quality as measurable]] — layered descriptions enable automated quality validation because each layer adds differentiating information
- [[testing effect could enable agent knowledge verification]] — the layering formula makes description failures diagnosable: which layer is missing determines the fix
- [[retrieval verification loop tests description quality at scale]] — operationalizes the diagnostic: verification failures should map to missing layers, enabling targeted improvement based on which layer (heuristic, mechanism, or implication) the description lacks
- [[temporal separation of capture and processing preserves context freshness]] — provides the example description used to illustrate the layering pattern
- [[spreading activation models how agents should traverse]] — layers map to decay levels: high-decay stops at heuristic, medium at mechanism, low at implication
- [[throughput matters more than accumulation]] — layered descriptions improve filtering speed, directly serving the processing velocity metric
- [[skills encode methodology so manual execution bypasses quality gates]] — the layering formula is a quality gate that extraction operations and retrieval testing can enforce consistently
- [[verbatim risk applies to agents too]] — collapsed descriptions (paraphrasing without layers) are a specific detection point for the verbatim failure mode; the layering formula provides structure that verbatim output lacks
- [[schema templates reduce cognitive overhead at capture time]] — this layering formula IS a schema template: it shifts description-writing from what should I say to fill in these three layers
- [[logic column pattern separates reasoning from procedure]] — sibling layering pattern: descriptions layer temporally (heuristic → mechanism → implication), logic columns layer spatially (procedure track alongside reasoning track); both enable agents to choose reading depth based on need
- [[sense-making vs storage does compression lose essential nuance]] — the formula optimizes within the compression constraint, but some knowledge types may resist even optimal layering
- [[BM25 retrieval fails on full-length descriptions because query term dilution reduces match scores]] — hidden cost: the prose transitions (because, which means, so that) that connect layers are exactly the low-IDF terms that dilute keyword search scoring
- [[description quality for humans diverges from description quality for keyword search]] — develops the paradox: the layering formula excels at human scanning precisely because its prose transitions create logical flow, but that same flow dilutes keyword retrieval; the formula optimizes one channel while degrading the other

Topics:
- [[discovery-retrieval]]
