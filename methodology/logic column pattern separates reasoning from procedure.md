---
description: Dual-column structure where right side shows steps and left side shows the principle or rule applied at each step — agents parse reasoning layer first to understand approach before details
kind: research
topics: ["[[note-design]]"]
methodology: ["Cornell"]
source: [[3-3-cornell-note-taking-system]]
---

# logic column pattern separates reasoning from procedure

Technical content often bundles two distinct information types: the steps to follow and the reasoning behind each step. The logic column pattern unbundles them spatially, creating parallel tracks that can be read independently or together.

The pattern originates from Cornell Note-Taking's adaptation for mathematics and science. In the standard Cornell format, the cue column holds questions and keywords. For technical content, this transforms: the right column holds procedural steps (problem-solving sequences, code operations, proof steps), while the left column holds the reasoning at each step — which theorem applies, what principle justifies the operation, why this transformation is valid.

This separation enables a powerful reading strategy: scan the reasoning column first to understand the approach, then dive into procedural details only where needed. Since [[progressive disclosure means reading right not reading less]], the logic column provides another disclosure layer — a compressed view of the thinking that doesn't require parsing implementation details. The summary at the bottom then captures the problem type and strategy pattern, making the note findable by approach rather than specific content.

For agent-operated vaults, this pattern translates to interspersed annotation blocks. In markdown, a `> [!logic]` callout pattern works: procedural content flows normally, with logic callouts interjected at each significant step explaining the principle being applied. This callout format exemplifies how [[schema templates reduce cognitive overhead at capture time]] — the structure is given (insert logic callout at each step), so attention focuses on articulating the reasoning rather than designing the documentation format. An agent parsing technical documentation can extract just the logic callouts to understand the reasoning structure, then read full context only for steps where the reasoning is unclear or unfamiliar. This is the technical-content version of how [[descriptions are retrieval filters not summaries]] — the logic column provides a compressed view that enables filtering decisions without loading full procedural detail.

This connects to how [[good descriptions layer heuristic then mechanism then implication]] — the logic column is essentially mechanism-level annotation embedded within procedural content. Where descriptions layer information temporally (read heuristic first, mechanism second), the logic column layers information spatially (reasoning track alongside procedure track). Both serve the same purpose: enabling an agent to choose its reading depth based on need.

The pattern is most valuable for technical documentation, code explanations, mathematical proofs, and algorithmic walkthroughs — any content where "what to do" and "why this works" are both essential but serve different purposes. An agent verifying correctness needs the reasoning. An agent executing needs the steps. The logic column lets them access what they need without wading through what they don't.

This parallels how [[trails transform ephemeral navigation into persistent artifacts]] captures not just destinations but the reasoning connecting them. Trails persist the "why this, then that" logic of navigation; logic columns persist the "why this step" reasoning of procedures. Both transform ephemeral understanding — a debugging session, a navigation path — into reusable artifacts where future agents can follow not just the steps but the thinking that made them productive.
---

Relevant Notes:
- [[progressive disclosure means reading right not reading less]] — logic columns implement spatial progressive disclosure for technical content
- [[good descriptions layer heuristic then mechanism then implication]] — parallel pattern: descriptions layer temporally, logic columns layer spatially
- [[schema templates reduce cognitive overhead at capture time]] — the `> [!logic]` callout format IS a schema template that externalizes structure so attention focuses on articulating reasoning
- [[descriptions are retrieval filters not summaries]] — logic columns serve the same filter function for technical content: agents extract reasoning layer without full procedural detail
- [[trails transform ephemeral navigation into persistent artifacts]] — sibling pattern: trails persist navigation reasoning, logic columns persist procedural reasoning; both capture the why alongside the what
- [[dual-coding with visual elements could enhance agent traversal]] — logic columns might combine with visual elements for annotated diagrams

Topics:
- [[note-design]]
