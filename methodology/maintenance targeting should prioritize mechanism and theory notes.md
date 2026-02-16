---
description: When reweaving experiments, find notes that discuss the MECHANISM being tested rather than just topic-related notes — for theory-testing experiments, target the theory notes themselves
kind: research
topics: ["[[maintenance-patterns]]"]
---

Reweave targeting benefits from semantic judgment about WHAT an experiment tests, not just topic proximity. Since [[spreading activation models how agents should traverse]] describes traversal as decay-based context loading through wiki links, the question "where should activation spread?" during reweave has two answers: topic proximity (same MOC) or mechanism connection (same underlying concept). This note argues mechanism connection produces higher-value reweave targets for experiments.

For experiments, the productive reweave targets are notes that discuss the **mechanism** the experiment tests. The cognitive outsourcing experiment tests skill atrophy via delegation — so notes about [[skills encode methodology so manual execution bypasses quality gates]] and [[the generation effect requires active transformation not just storage]] are productive targets because they discuss the mechanisms being tested.

For experiments that test theories, the most valuable reweave targets are the **theory notes themselves**. The testing effect experiment tests description quality theory — so [[descriptions are retrieval filters not summaries]] and [[progressive disclosure means reading right not reading less]] theorize about description quality. Reweaving connects the test to what's being tested, making the relationship bidirectional.

The distinction matters because topic proximity misleads. Notes about "unrelated experiments" share the experiments MOC but have low reweave value despite being in the same MOC. Notes about the tested mechanism may be in different MOCs entirely but have high reweave value because they provide theoretical grounding. Topic vocabulary similarity (what semantic search optimizes for) is not the same as mechanism connection. Reweave targeting should compensate by prioritizing mechanism connection over topic proximity.

The heuristic: before reweaving an experiment, ask "what mechanism does this test?" and "what notes theorize about that mechanism?" — then target those notes rather than running semantic search on topic keywords. This is a domain-specific refinement of [[processing effort should follow retrieval demand]]: for experiments, mechanism connection predicts higher value than retrieval frequency or topic proximity. The demand signal is semantic (what the experiment tests) rather than observed (what's frequently traversed).
---

Relevant Notes:
- [[backward maintenance asks what would be different if written today]] — the foundational reweaving concept; this note adds targeting heuristics
- [[spreading activation models how agents should traverse]] — provides the traversal framework; this note argues mechanism connection should guide where activation spreads during reweave
- [[processing effort should follow retrieval demand]] — this note refines demand-following for experiments: mechanism connection predicts value better than retrieval frequency
- [[testing effect could enable agent knowledge verification]] — an experiment whose reweave benefits from targeting theory notes (description quality)
- [[cognitive outsourcing risk in agent-operated systems]] — an experiment whose reweave benefits from targeting mechanism notes (skill atrophy)

Topics:
- [[maintenance-patterns]]
