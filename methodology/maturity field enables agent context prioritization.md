---
description: A seedling/developing/evergreen maturity field could help agents prefer mature notes when context is tight and surface seedlings for development
kind: research
topics: ["[[discovery-retrieval]]"]
source: TFT research corpus (00_inbox/heinrich/)
---

# maturity field enables agent context prioritization

The digital gardening tradition suggests that notes exist on a development spectrum. A seedling is a captured idea that hasn't been fully developed — maybe just a title and rough description. A developing note has some content but needs connections or deeper treatment. An evergreen is mature — well-connected, thoroughly reasoned, ready to be built upon.

Currently, the system treats all notes equally during context loading. An agent building context for a task will load notes based on relevance (via semantic search or curated navigation), but two equally relevant notes get equal treatment even if one is a well-developed evergreen and the other is a half-formed seedling. Since [[LLM attention degrades as context fills]], this is a missed opportunity — the smart zone should be filled with the highest-value content, and note maturity signals value.

Adding a `maturity:` field to thinking notes with values like seedling, developing, evergreen would enable smarter context loading decisions. Agents could prefer mature content when token budget is tight and surface seedlings when looking for development opportunities.

Since [[progressive disclosure means reading right not reading less]], maturity signals would add another dimension to disclosure. Currently we have: file tree → description → outline → section → full note. Maturity could filter at the description level: "this is relevant but only a seedling, prioritize the evergreen alternative."

The question remains whether note development stage actually predicts note usefulness in context. If a seedling on exactly the right topic is as useful as an evergreen on a related topic, maturity filtering adds overhead without benefit. If evergreens consistently enable better agent outputs than seedlings, maturity becomes a valuable signal.

Since [[live index via periodic regeneration keeps discovery current]], maturity-based filtering becomes computationally free when pre-computed. A maintenance agent regenerating maturity indices at change boundaries would let agents filter seedlings from evergreens without query cost — the filtering decision happens before context loading, not during it.
---

Relevant Notes:
- [[progressive disclosure means reading right not reading less]] — maturity adds a fourth dimension to progressive disclosure: alongside relevance, recency, and depth, note development stage becomes another curation signal
- [[processing effort should follow retrieval demand]] — maturity signals which notes deserve development investment; seedlings need work, evergreens can be used as-is
- [[LLM attention degrades as context fills]] — maturity filtering maximizes value in the scarce smart zone by preferring well-developed content when attention budget is tight
- [[descriptions are retrieval filters not summaries]] — maturity is another retrieval filter dimension; descriptions filter by relevance, maturity filters by development completeness
- [[trails transform ephemeral navigation into persistent artifacts]] — sibling claim from the same batch, exploring TFT patterns for agent optimization
- [[spaced repetition scheduling could optimize vault maintenance]] — if maturity tracks development stage, scheduling uses that signal to allocate review intervals; seedlings get frequent checks, evergreens get sparse confirmation
- [[live index via periodic regeneration keeps discovery current]] — maturity-based indices become computationally free when pre-computed at change boundaries

Topics:
- [[discovery-retrieval]]
