---
description: Accumulated vault conventions may channel thinking into patterns that favor certain styles over others, despite the flat structure's stated flexibility
kind: research
topics: ["[[note-design]]"]
source: TFT research corpus (00_inbox/heinrich/)
---

# vault conventions may impose hidden rigidity on thinking

The system claims flexibility through flat structure and wiki links. But conventions accumulate into constraints. The claim-as-title pattern requires thinking to resolve into sentence form. The YAML schema requires metadata decisions. The MOC structure imposes hierarchical organization. Each convention individually seems lightweight, but collectively they may channel thinking into patterns that favor certain styles over others.

There is a counterargument worth considering: since [[complex systems evolve from simple working systems]], the system conventions emerged from actual friction rather than upfront design. Conventions that calcified from working patterns might be genuine solutions, not arbitrary constraints. The test becomes: are current conventions still solving real problems, or have they become obstacles to new kinds of thinking? For schema conventions specifically, since [[schema evolution follows observe-then-formalize not design-then-enforce]], the observe-then-formalize protocol provides a concrete mechanism for keeping schema conventions adaptive — fields are added only when usage evidence justifies them and demoted when placeholder stuffing reveals false compliance, so at least the schema layer resists the calcification this note warns about.

Since [[schema enforcement via validation agents enables soft consistency]], there may be a middle path between rigid conventions and no conventions: soft enforcement that encourages patterns without blocking deviations. Validation agents that warn about non-standard titles or missing metadata create pressure toward convention compliance without making compliance mandatory. This shifts conventions from hard constraints that might impose hidden rigidity to soft expectations that shape behavior through visibility rather than blocking.

The research on Cornell note-taking finds that rigid formats "struggle to accommodate visual learners" and "non-linear topics." The fixed layout constrains what can be expressed. Does the system inherit this problem through different means?

Beyond temporal escape valves (mutability, backward maintenance), there is a structural one. Since [[federated wiki pattern enables multi-agent divergence as feature not bug]], when conventions channel an insight into a form that loses nuance, a parallel note can preserve the alternative formulation. The two notes linked together capture more than either alone, and neither has to violate the conventions — each can follow the claim-as-title pattern while expressing a different facet of the same complex idea. This doesn't dissolve the rigidity concern, but it provides a concrete mechanism for working within conventions while acknowledging their limits.

The high-leverage question: when an insight resists the claim-as-title pattern, is it because the insight is genuinely non-linear, or because the articulation isn't complete yet?

The high-leverage question: if forced reformulation always indicates incomplete thinking, then conventions are helpful constraints that push toward understanding before building. If forced reformulation sometimes destroys valid non-linear insight, then conventions impose genuine rigidity.

The Cornell critique applied to visual learners and non-linear topics. The system is text-based by design. The real question may be: is text itself the constraint, or is it specifically how we structure text?

Since [[dual-coding with visual elements could enhance agent traversal]], the text-based constraint might be partially addressable. Mermaid diagrams and relationship graphs could provide visual encoding for concepts that resist text-only expression. Whether this would reduce rigidity depends on whether the visual/verbal separation that aids human cognition translates to multimodal LLM processing — if visual input just gets converted to the same latent space as text, dual-coding may not provide the flexibility benefit it offers humans.
---

Relevant Notes:
- [[claims must be specific enough to be wrong]] — the claim-as-title pattern demands specificity, which may be the source of both value and constraint
- [[complex systems evolve from simple working systems]] — counterargument: conventions emerged from working patterns, so they may be solutions rather than arbitrary constraints
- [[backward maintenance asks what would be different if written today]] — potential dissolution: rigid creation conventions might be offset by flexible maintenance allowing evolution
- [[schema templates reduce cognitive overhead at capture time]] — the tradeoff made concrete: schema templates reduce cognitive overhead when they fit the content, but impose hidden rigidity when they don't
- [[dual-coding with visual elements could enhance agent traversal]] — proposes visual encoding as partial remedy for text-based constraints, though benefit depends on whether multimodal processing is genuinely distinct
- [[schema enforcement via validation agents enables soft consistency]] — offers middle path: soft enforcement via warnings preserves flexibility while encouraging convention compliance through visibility rather than blocking
- [[sense-making vs storage does compression lose essential nuance]] — sibling concern at the description layer: this note asks whether titles resist compression, that note asks whether descriptions resist compression; both test whether complex ideas survive the filtering architecture
- [[digital mutability enables note evolution that physical permanence forbids]] — theoretical escape valve: even if creation conventions impose rigidity, the medium permits notes to evolve past their initial form through backward maintenance
- [[federated wiki pattern enables multi-agent divergence as feature not bug]] — structural escape valve: when conventions compress an insight into one canonical form that loses nuance, a parallel federated note can preserve the alternative formulation; provides an explicit mechanism for escaping convention rigidity without abandoning conventions entirely
- [[schema evolution follows observe-then-formalize not design-then-enforce]] — partial dissolution for schema conventions: rather than imposing rigid schema requirements upfront, the observe-then-formalize protocol lets conventions emerge from use, reducing the hidden rigidity risk by ensuring schema fields are justified by observed demand rather than speculative design
- [[description quality for humans diverges from description quality for keyword search]] — concrete evidence: the prose description convention implicitly optimizes for human scanning while imposing a hidden constraint on keyword retrieval that only surfaces during infrastructure failures
- [[organic emergence versus active curation creates a fundamental vault governance tension]] — sibling governance tension: this note asks whether conventions constrain thinking, that note asks whether the governance model that creates and enforces conventions strikes the right balance; the curation pole actively creates conventions, so the rigidity concern is a specific failure mode of over-curation

Topics:
- [[note-design]]
