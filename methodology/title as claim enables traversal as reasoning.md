---
description: when note titles are complete claims rather than topics, traversing wiki links reads like prose and following paths becomes reasoning — the file tree becomes a scan of arguments
kind: research
topics: ["[[note-design]]", "[[graph-structure]]"]
source: [[2026-01-25-build-claude-a-tool-for-thought]]
---

# title as claim enables traversal as reasoning

don't name notes like topics ("thoughts on memory"). name them like claims ("structure enables navigation without reading everything").

when you link to a claim-titled note, the link becomes part of your argument:

> "because [[structure enables navigation without reading everything]], we invest in wiki links even though they have maintenance overhead"

the title IS the reasoning. traversal IS thinking. since [[note titles should function as APIs enabling sentence transclusion]], the title functions as a typed signature — you know what you're getting before you load the full note. a topic label like "memory notes" is an undocumented function; a claim like "structure enables navigation" tells you the return value.

this works because [[inline links carry richer relationship data than metadata fields]]. the prose surrounding a link encodes WHY the linked note matters here — "because `[[X]]`" is a causal claim, "since `[[Y]]`" is a foundation claim, "but `[[Z]]`" is a tension. claim-as-title makes these constructions possible, because topic labels don't compose grammatically. you can write "since [[claims must be specific enough to be wrong]]" but not "since `[[specificity notes]]`." and because [[propositional link semantics transform wiki links from associative to reasoned]], these informal relationship signals (since, because, but) could be standardized into a constrained vocabulary (causes, enables, contradicts, extends) — making the reasoning chains not just readable prose but machine-parseable argument structure.

**practical benefits:**
- scanning file tree = scanning arguments
- following links = following reasoning chains
- the vault becomes readable without opening files

since [[progressive disclosure means reading right not reading less]], this matters for context window management. the first disclosure layer is titles. if titles are claims, agents can curate what to load based on what each note argues. if titles are topics, agents must load notes to discover what they argue — the disclosure layer fails.

**contrast with topic titles:**
- "memory notes" tells you nothing
- "structure enables navigation" tells you the claim
- one is a folder, the other is a thought

over time, since [[implicit knowledge emerges from traversal]], the traversal paths themselves build argumentative intuition. an agent that repeatedly follows the chain from "title as claim" through "specificity" to "composability" internalizes the reasoning pattern, not just the individual facts. since [[IBIS framework maps claim-based architecture to structured argumentation]], this has a formal name: the vault is a discourse graph where claim-titled notes are Positions, wiki links are Arguments connecting them, and traversal follows argumentation chains. the informal insight that "following links reads as reasoning" turns out to map precisely onto Rittel's Issue-Position-Argument structure — claim-as-title is what makes the notes function as genuine Positions rather than vague topic gestures.

but there is a shadow side. since [[vault conventions may impose hidden rigidity on thinking]], the claim-as-title pattern demands that insights resolve into sentence form. when reformulation feels forced, the question is whether the insight isn't ready or the format can't accommodate it. not every idea decomposes into a single declarative sentence — some are relational, procedural, or emergent. the pattern works best for ideas that ARE claims; it may distort ideas that aren't.
---

Relevant Notes:
- [[note titles should function as APIs enabling sentence transclusion]] — formalizes this insight: titles as function signatures, bodies as implementation, links as function calls
- [[claims must be specific enough to be wrong]] — the specificity requirement that makes claim-as-title work; vague titles degenerate into topic labels that carry no information when linked
- [[inline links carry richer relationship data than metadata fields]] — explains why traversal-as-reasoning works: prose context around links encodes relationship type, making each link a typed reasoning step
- [[structure enables navigation without reading everything]] — the navigability claim this pattern serves; claim titles are what make navigation-without-reading possible
- [[implicit knowledge emerges from traversal]] — repeated path traversal builds intuition, and claim-titled paths make the intuition argumentative rather than merely associative
- [[progressive disclosure means reading right not reading less]] — claim titles enable the first disclosure layer: know what a note argues before deciding to load it
- [[vault conventions may impose hidden rigidity on thinking]] — the shadow side: forcing insights into claim-as-title form may distort genuinely non-linear or relational ideas
- [[propositional link semantics transform wiki links from associative to reasoned]] — extends: the informal encoding this note describes (since/because/but as relationship signals) could be standardized into machine-parseable relationship types, making traversal-as-reasoning not just readable but queryable
- [[IBIS framework maps claim-based architecture to structured argumentation]] — formalizes: claim-titled notes are Positions in Rittel's discourse framework, and traversing wiki links between them constitutes following argumentation chains — giving this note's informal insight a formal theoretical grounding

Topics:
- [[note-design]]
- [[graph-structure]]
