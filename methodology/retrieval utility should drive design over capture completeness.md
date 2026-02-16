---
description: System architecture choices should optimize for "how will I find this later" not "where should I put this" — a design orientation proven effective since the 1940s
kind: research
topics: ["[[discovery-retrieval]]"]
methodology: ["Cornell"]
source: TFT research corpus (00_inbox/heinrich/)
---

# retrieval utility should drive design over capture completeness

Cornell Note-Taking explicitly prioritizes retrieval utility over capture comprehensiveness. The system is designed for getting information back out, not for complete recording. This isn't a technique detail but a design orientation that explains multiple vault architecture choices.

The question shift is fundamental: not "where should I put this?" but "how will I find this later?" The first question optimizes for filing — creating neat categories, proper locations, complete capture. The second question optimizes for retrieval — creating finding aids, distinctive markers, efficient filters. These are different objectives that lead to different architectures. Since [[storage versus thinking distinction determines which tool patterns apply]], this question reveals system type: storage systems (PARA, Johnny.Decimal) naturally ask the filing question because their purpose is organization and retrieval of assets, while thinking systems (Zettelkasten, this vault) must ask the retrieval question because their purpose is synthesis through connection-finding.

## Why this matters for agent-operated systems

The retrieval-first orientation has specific implications for how agents should structure knowledge:

**Descriptions over summaries.** Since [[descriptions are retrieval filters not summaries]], the YAML description field exists to enable retrieval decisions, not to summarize content. A description that helps an agent decide whether to load a note serves retrieval utility. A description that tries to compress the note's content serves capture completeness. The distinction is subtle but consequential: filter descriptions can be shorter and more distinctive, while summary descriptions try to cover everything and end up generic.

**Flat structure over hierarchical filing.** Deep folder hierarchies optimize for filing ("where does this belong?") not retrieval ("how do I find this?"). Retrieval-optimized architecture favors flat structures where everything is equally reachable via wiki links and semantic search. The agent doesn't need to navigate a path to find content — it can retrieve directly by concept. Since [[local-first file formats are inherently agent-native]], this retrieval-first orientation extends to format choice itself: plain text requires no authentication or infrastructure, making any LLM a valid retriever. And since [[data exit velocity measures how quickly content escapes vendor lock-in]], the retrieval-first question generalizes beyond the current tool: not just "how will I find this later" but "how will any future agent read this in any tool." Exit velocity makes the format-level retrieval concern auditable — every feature that lowers velocity is a retrieval risk that spans tool lifetimes, not just search sessions. This is why [[topological organization beats temporal for knowledge work]] — date-based folders force chronological scanning while concept-based organization enables direct semantic retrieval.

**Processing for retrieval, not completeness.** Since [[processing effort should follow retrieval demand]], heavy processing at capture time optimizes for completeness (doing everything properly upfront). Retrieval-first systems invest processing effort at retrieval time, when you know what you actually need. This is why JIT processing beats front-loading: you can't know at capture time which retrieval patterns matter.

## Information-theoretic foundation

The retrieval-first orientation has a deeper justification: since [[metadata reduces entropy enabling precision over recall]], retrieval-optimized architecture pre-computes low-entropy representations that shrink the search space. Filing-first architecture optimizes for putting things in the right place; retrieval-first architecture optimizes for finding things efficiently. The difference is not just aesthetic preference but information-theoretic efficiency — precision over recall as a design choice.

## The 80-year validation

Cornell Note-Taking dates to the 1940s. The cue column — margin notes designed to trigger recall, not to summarize — is a retrieval-first design from before computers. The system has been tested across generations and contexts. Its longevity validates that retrieval-first is not just a theoretical optimization but a practically effective orientation.

The lineage is even deeper: since [[wiki links are the digital evolution of analog indexing]], the cue column functioned as an index pointing to content blocks. Wiki links are the digital fulfillment of this 80-year-old cognitive pattern. What Cornell achieved with margin annotations, we achieve with bidirectional links.

This gives confidence to vault architecture decisions that might otherwise feel like arbitrary choices. When we favor descriptions that filter over descriptions that summarize, we're implementing a pattern with eight decades of human validation.

## The design test

Any architectural decision can be evaluated against this principle: does this optimize for retrieval or for capture? Since [[faceted classification treats notes as multi-dimensional objects rather than folder contents]], Ranganathan formalized this same question ninety years ago in library science: the right question is not "where does this go?" but "what are its properties?" Each YAML field is a retrieval-first design choice -- a classification dimension that enables finding notes by what they ARE rather than where they were FILED.

- Wiki links over tags: retrieval-first (links traverse, tags just categorize)
- MOCs over nested folders: retrieval-first (MOCs are entry points, folders are filing)
- Type metadata over content folders: retrieval-first — since [[type field enables structured queries without folder hierarchies]], category queries happen via YAML fields rather than file location, enabling a note to participate in multiple category queries simultaneously
- Sentence titles over topic labels: retrieval-first (claims can be found by meaning, labels only by words)

Since [[throughput matters more than accumulation]], retrieval-first thinking supports the success metric: velocity from capture to synthesis. Architectures optimized for filing create beautiful graveyards. Architectures optimized for retrieval create systems that actually get used. The failure case is concrete: since [[flat files break at retrieval scale]], systems designed for capture completeness hit a predictable wall where finding content requires remembering what you have, and for agents this retrieval failure degrades cognition itself.

This explains why [[structure without processing provides no value]] — the "Lazy Cornell" anti-pattern, where students draw the structural lines but skip the processing, produces no benefit. Structure is a capture-time investment; processing creates retrieval value. Without the retrieval-focused operations (writing cues, summarizing, self-testing), the structure is just filing with extra steps. And since [[verbatim risk applies to agents too]], even the processing operations can fail to create retrieval value if they merely reorganize rather than generate — a summary that paraphrases adds no distinctive information for retrieval filtering.
---

Relevant Notes:
- [[descriptions are retrieval filters not summaries]] — the specific implementation of retrieval-first thinking for note descriptions
- [[processing effort should follow retrieval demand]] — JIT processing as the operational form of retrieval-first architecture
- [[throughput matters more than accumulation]] — the success metric that retrieval-first design serves
- [[topological organization beats temporal for knowledge work]] — why concept-based organization (retrieval-first) beats date-based organization (capture-first)
- [[metadata reduces entropy enabling precision over recall]] — the information-theoretic foundation for retrieval-first design choices
- [[wiki links are the digital evolution of analog indexing]] — the 80-year lineage of retrieval-first indexing from Cornell cue columns to wiki links
- [[structure without processing provides no value]] — the Lazy Cornell anti-pattern: structure (capture-time) without processing (retrieval-time) produces no benefit
- [[local-first file formats are inherently agent-native]] — retrieval-first applied to format choice: plain text with embedded metadata makes any LLM a valid retriever without infrastructure
- [[verbatim risk applies to agents too]] — tests whether retrieval-focused processing can degenerate into reorganization without genuine insight; paraphrase summaries fail the retrieval-first criterion because they add no distinctive filter value
- [[type field enables structured queries without folder hierarchies]] — implements retrieval-first for categorization: metadata queries replace folder hierarchies, enabling multi-category membership and direct category retrieval
- [[data exit velocity measures how quickly content escapes vendor lock-in]] — extends retrieval-first thinking to the format layer: 'how will any future agent read this' generalizes 'how will I find this later' from within-tool to across-tool portability
- [[faceted classification treats notes as multi-dimensional objects rather than folder contents]] — formal articulation: Ranganathan's PMEST framework is the library science formalization of retrieval-first design; 'notes have properties' is the Ranganathan version of 'how will I find this later'
- [[narrow folksonomy optimizes for single-operator retrieval unlike broad consensus tagging]] — theoretical framework: Vander Wal's narrow folksonomy names the design orientation this note describes; 'how will I find this later' is a personal question because the vault is a single-operator system where vocabulary can optimize entirely for one agent's retrieval patterns
- [[storage versus thinking distinction determines which tool patterns apply]] — upstream classification: retrieval-first is specifically a thinking-system orientation; storage systems optimize for filing-first, making this distinction the upstream choice that determines whether retrieval-first even applies
- [[flat files break at retrieval scale]] — the negative case: systems that optimize for capture completeness over retrieval hit a scale wall where finding content requires remembering what you have; the scale curve from ~50 to 500+ notes concretely demonstrates what filing-first architecture costs

Topics:
- [[discovery-retrieval]]
