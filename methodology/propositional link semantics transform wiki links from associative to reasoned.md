---
description: Standardizing a vocabulary of relationship types (causes, enables, contradicts, extends) makes wiki link connections machine-parseable for graph reasoning
kind: research
topics: ["[[graph-structure]]"]
methodology: ["Concept Mapping"]
source: [[tft-research-part2]]
---

# propositional link semantics transform wiki links from associative to reasoned

Mind mapping connects ideas with lines. Concept mapping connects ideas with propositions. The line between "A" and "B" in a mind map says "these relate somehow." The link "A *causes* B" in a concept map says exactly how.

This distinction, fundamental to concept mapping methodology, offers something powerful for agent-operated knowledge graphs: machine-parseable relationship semantics.

## From implicit to explicit relationships

Since [[inline links carry richer relationship data than metadata fields]], we already encode relationship semantics in prose context. When you write "since [[spreading activation models how agents should traverse]], the traversal pattern becomes clear," the word "since" signals a foundational relationship. The prose around the link is already doing semantic work. This is precisely why [[title as claim enables traversal as reasoning]] — the claim-form title composes into the surrounding prose, and the surrounding prose carries relationship type information, so traversal reads as typed reasoning rather than mere reference-hopping.

But this encoding is informal. An agent parsing "since [[X]]" versus "but [[X]] complicates this" versus "this extends [[X]]" must perform natural language understanding to extract the relationship type. The semantics are there for humans, but require inference for machines.

Propositional link semantics would standardize this. A constrained vocabulary:

| Relationship | Meaning | Example |
|--------------|---------|---------|
| causes | X produces Y | [[context window limits]] *causes* [[attention degradation]] |
| enables | X makes Y possible | [[wiki links]] *enables* [[multi-hop traversal]] |
| contradicts | X conflicts with Y | [[perfect recall]] *contradicts* [[lossy memory constraints]] |
| extends | X builds on Y | [[typed links]] *extends* [[inline relationship encoding]] |
| specifies | X is a case of Y | [[MOC maintenance]] *specifies* [[gardening cycle]] |
| supports | X provides evidence for Y | [[research findings]] *supports* [[methodology claim]] |

## Why this matters for agents

With explicit relationship types, agents can reason about graph structure rather than just traverse it.

"Find all notes that contradict X" becomes a query, not an inference task. "What does X enable?" reveals downstream implications. "What causes X?" traces upstream dependencies. The graph becomes not just a navigation structure but an inference substrate. Since [[wiki links create navigation paths that shape retrieval]], the quality of link context already shapes what gets surfaced during traversal — typed relationships would make that shaping precise and machine-parseable rather than implicit in prose.

This connects to how [[role field makes graph structure explicit]] proposes making node types queryable. That note addresses what kind of node something is (hub, leaf, synthesis). This proposal addresses what kind of edge connects them. Together they would make both nodes and edges semantically typed.

## The parsing opportunity

If link contexts follow predictable patterns, parsing becomes tractable:

```
"since [[X]]" → supports
"because [[X]]" → causes
"this extends [[X]]" → extends
"but [[X]] complicates" → contradicts
"[[X]] enables" → enables
```

Vault health checks could identify link contexts, extract relationship types, and build a typed edge graph. This graph could answer structural questions: What are the foundational notes (many things depend on them)? What are the controversial notes (many contradictions)? What are the integrative notes (many extensions)? Since [[IBIS framework maps claim-based architecture to structured argumentation]], the typed edge graph has a natural discourse interpretation: "supports" edges are Arguments backing Positions, "contradicts" edges are counter-Arguments, and the structural questions above become discourse completeness checks — Positions without supporting Arguments, Issues without competing Positions.

## The formalization trade-off

Concept mapping research found that propositional links "clearly reveal learner's misconceptions" because they force explicit claims about relationships. The same mechanism applies here: if you must choose from {causes, enables, contradicts, extends, specifies, supports}, you cannot hide behind vague association. This forcing function is elaborative encoding made structural. Since [[elaborative encoding is the quality gate for new notes]], each relationship type demands a different form of cognitive processing — "extends" requires understanding the original argument and how the new note builds on it, "contradicts" requires articulating the tension and why both positions have force. The constrained vocabulary scaffolds the elaboration that creates encoding depth, which is why standardization adds cognitive value beyond mere parseability.

But formalization has costs. Natural prose sometimes captures nuances that a six-word vocabulary cannot. "This builds on X while questioning its scope" is richer than either "extends" or "contradicts." Forcing relationships into categories might lose exactly the subtlety that makes inline links valuable.

The resolution may be: use the vocabulary where it fits, retain prose freedom where it doesn't. Parsing extracts what it can; the rest remains semantically rich but not machine-queryable.

## Implementation path

The vault already uses patterns like "since [[X]]" and "because [[X]]" inconsistently but recognizably. A first pass could:

1. Scan existing link contexts for relationship patterns
2. Build a frequency distribution of context phrases
3. Map common phrases to relationship types
4. Test whether the extracted types enable useful queries
5. If valuable, codify as convention; if not, remain informal

This is incremental formalization applied to link semantics. We already have rich but informal encoding. The question is whether standardization adds query power worth the constraint cost. Since [[intermediate representation pattern enables reliable vault operations beyond regex]], an IR layer that parses links into structured objects with typed relationship fields would make this extraction a property lookup rather than regex-based NLP — suggesting the implementation path may depend more on infrastructure investment than convention enforcement.
---

Relevant Notes:
- [[inline links carry richer relationship data than metadata fields]] — establishes that prose context carries relationship semantics; this note proposes standardizing that encoding
- [[title as claim enables traversal as reasoning]] — prerequisite: claim-as-title is what makes the informal relationship encoding (since/because/but) work as prose reasoning; propositional link semantics would standardize that encoding into machine-parseable types without losing the prose composability
- [[role field makes graph structure explicit]] — parallel proposal for node typing; together with edge typing would create fully semantically typed graphs
- [[wiki links implement GraphRAG without the infrastructure]] — explains the traversal value of wiki links; typed edges would add reasoning value
- [[wiki links create navigation paths that shape retrieval]] — the retrieval architecture that typed edges would sharpen: link context already shapes what gets surfaced, typed relationships would make that shaping precise and machine-parseable
- [[intermediate representation pattern enables reliable vault operations beyond regex]] — provides the infrastructure that makes relationship extraction tractable: when links are structured objects rather than regex-matched strings, typed relationship fields become property lookups instead of NLP inference
- [[elaborative encoding is the quality gate for new notes]] — cognitive science grounding: typed relationships are elaborative encoding made structural — each relationship type forces a specific form of cognitive processing that creates encoding depth beyond what untyped association achieves
- [[IBIS framework maps claim-based architecture to structured argumentation]] — discourse-level complement: propositional link semantics type individual edges while IBIS assigns discourse roles to the nodes those edges connect; an 'extends' edge becomes an Argument linking two Positions, giving the typed edge graph a formal argumentation interpretation
- [[dense interlinked research claims enable derivation while sparse references only enable templating]] — identifies propositional link context as what makes dense interlinking derivation-ready: context phrases like 'extends' and 'constrains' encode the interaction knowledge derivation depends on but cannot reconstruct from scratch

Topics:
- [[graph-structure]]
