---
description: Rittel's Issue-Position-Argument structure (1970) maps directly onto vault architecture — claim-titled notes are Positions, questions are Issues, evidential links are Arguments — reframing the vault
kind: research
topics: ["[[graph-structure]]"]
methodology: ["Concept Mapping"]
source: [[tft-research-part3]]
---

# IBIS framework maps claim-based architecture to structured argumentation

Horst Rittel and Werner Kunz developed Issue-Based Information Systems in 1970 to handle "wicked problems" — problems where the formulation of the problem is itself the problem. Their framework structures discourse into three elements: Issues (questions worth answering), Positions (proposed answers), and Arguments (evidence for or against Positions). What matters here is that this structure already exists in the vault, unnamed.

Claim-titled notes are Positions. Each title stakes a specific claim: "IBIS framework maps claim-based architecture to structured argumentation" is a Position in a larger discourse about how knowledge graphs should be structured. Because [[title as claim enables traversal as reasoning]], following wiki links between these Positions reads as following argumentation chains — the IBIS vocabulary names what that traversal experience actually is. The CLAUDE.md requirement that [[claims must be specific enough to be wrong]] is, in IBIS terms, the requirement that Positions must be falsifiable enough to attract Arguments. A vague Position ("knowledge management is useful") cannot generate productive argumentation because there is nothing to argue against.

Questions surfaced in MOC "Explorations Needed" sections and in note uncertainty passages are Issues. When a MOC says "how graph structure changes as vault scales — longitudinal study needed," that is an Issue in the IBIS sense: a question that organizes the space of possible Positions. Issues are the generative layer — they call Positions into existence by creating demand for answers. This maps precisely onto how [[dangling links reveal which notes want to exist]]: dangling links are Issues that have already been referenced from Positions but not yet given their own treatment, and their frequency reveals which questions the discourse most urgently needs answered.

The wiki links between notes, especially those carrying context phrases, function as Arguments. When a note says "since [[spreading activation models how agents should traverse]], the traversal pattern becomes clear," the surrounding prose is an Argument linking a Position (about traversal) to another Position (about spreading activation) through a supporting relationship. Since [[propositional link semantics transform wiki links from associative to reasoned]], standardizing relationship types (supports, contradicts, extends) would make these Arguments machine-parseable — but even without standardization, the prose context already encodes argumentative force.

## What the IBIS lens reveals

The reframing is not merely taxonomic. It changes what "vault quality" means. In a document collection, quality means accurate, well-written notes. In an argumentation graph, quality means the discourse is well-structured: Issues have multiple competing Positions, Positions have both supporting and challenging Arguments, and the argumentation covers the relevant territory without gaps. Because [[the system is the argument]], this discourse completeness is directly testable — an argumentation graph that claims to embody its own methodology can be audited against its own IBIS structure: are there Positions without counter-Arguments? Issues with only one Position? The vault's self-referential nature means discourse gaps are methodology failures, not just organizational oversights.

This shifts maintenance priorities. Since [[note titles should function as APIs enabling sentence transclusion]], we already think of notes as callable units. IBIS adds that these callable units participate in a discourse. A Position without Arguments is an unsupported claim. A Position without counter-Arguments is an untested one. An Issue with only one Position is an unexplored question. Each of these patterns is a specific, actionable maintenance signal.

For agent swarms operating on the vault, IBIS provides role differentiation grounded in discourse function rather than arbitrary task assignment. One agent identifies open Issues (questions in MOC gaps and note uncertainty sections). Another gathers relevant Positions (claim notes that address those Issues). A third maps the Argument structure (which Positions support or challenge each other). This maps naturally to pipeline phases: reduce identifies Issues and extracts Positions, reflect maps Arguments between Positions, review checks whether the argumentation structure is complete.

The IBIS lens also reveals what derivation actually does. Since [[derivation generates knowledge systems from composable research claims not template customization]], the derivation process traverses the discourse graph — reading Positions (claim notes) and their supporting Arguments (evidential links) — to compose a configuration justified by the argumentation structure. A derivation agent does not just select claims; it follows Argument chains to ensure the selected Positions cohere, which means derivation quality depends on the discourse graph being well-structured in exactly the sense IBIS defines: Positions with supporting and challenging Arguments, interconnected through typed relationships. Incomplete argumentation produces incomplete derivation. The derivation output preserves this discourse structure as a material artifact: since [[justification chains enable forward backward and evolution reasoning about configuration decisions]], each chain is a serialized path through the IBIS graph that records which Positions were traversed, which Arguments linked them, and which user constraints made each Position applicable. The chain makes the derivation's argument structure inspectable after deployment — backward reasoning traces from a configuration decision through its Argument chain to the Positions that justified it, which is exactly IBIS discourse traversal applied to system design rather than knowledge claims.

## The IBIS-propositional link connection

Since [[propositional link semantics transform wiki links from associative to reasoned]], there is a natural hierarchy: propositional link semantics type individual edges (causes, enables, contradicts), while IBIS types the discourse roles those edges participate in. An "extends" relationship is an Argument connecting two Positions. A "contradicts" relationship is a counter-Argument. The vocabulary of relationship types becomes the grammar of argumentation.

This composability with [[role field makes graph structure explicit]] is worth noting. Role assigns structural function (hub, leaf, synthesis). IBIS assigns discourse function (Issue, Position, Argument). A note can be a hub (structurally central) AND a Position (argumentatively staking a claim). The two classifications are orthogonal — knowing one tells you nothing about the other — which, following the faceted classification principle, means both earn their place as independent retrieval dimensions.

## Limitations and honest uncertainty

IBIS was designed for collaborative design processes among humans. Whether the framework applies cleanly to a single-operator knowledge graph (even one operated by multiple agents) is uncertain. The original IBIS assumed stakeholders with genuinely different perspectives generating real disagreement. In a vault operated by one methodology, the "Arguments" may lack genuine adversarial pressure — the same mind (or methodology) generates both Positions and counter-Arguments, which could produce a discourse graph that appears balanced but lacks the epistemic stress-testing that real disagreement provides.

There is also the formalization cost. Tagging every note with an IBIS role (Issue, Position, Argument) adds metadata overhead similar to the concerns raised about the role field. The value may lie not in formal tagging but in the conceptual lens: using IBIS as a diagnostic framework for vault health without adding YAML fields.

---
---

Relevant Notes:
- [[propositional link semantics transform wiki links from associative to reasoned]] — foundation: propositional links type individual edges while IBIS provides the higher-level discourse structure those typed edges participate in
- [[claims must be specific enough to be wrong]] — enables: specificity is what makes claim notes function as genuine Positions rather than vague topic gestures; an IBIS Position must stake ground
- [[note titles should function as APIs enabling sentence transclusion]] — extends: titles-as-APIs means titles-as-Positions; the IBIS framing adds that these API signatures are argumentative claims in a discourse graph, not just callable abstractions
- [[title as claim enables traversal as reasoning]] — foundation: claim-titled notes are what makes wiki link traversal read as following argumentation chains; IBIS gives this traversal-as-reasoning insight its formal vocabulary — Positions connected by Arguments
- [[role field makes graph structure explicit]] — parallel proposal: IBIS assigns discourse roles (Issue, Position, Argument) to nodes while role assigns graph-structural roles (hub, leaf, synthesis); the two typing systems are orthogonal and composable
- [[wiki links implement GraphRAG without the infrastructure]] — foundation: wiki links already implement the edge layer IBIS needs; IBIS adds a formal interpretation of what those edges mean in argumentation terms
- [[elaborative encoding is the quality gate for new notes]] — converges: elaborated context phrases on wiki links are what IBIS would call Arguments, and the elaborative encoding requirement is the quality gate ensuring links carry argumentative force rather than mere reference
- [[the system is the argument]] — extends: IBIS formalizes what 'the system is the argument' means in argumentation terms; the vault is not just proof-of-work but specifically a discourse graph whose completeness (Issues with competing Positions, Positions with supporting and challenging Arguments) is testable
- [[dangling links reveal which notes want to exist]] — exemplifies: in IBIS terms dangling links are Issues that Positions have already referenced but that lack their own treatment; demand signals are the discourse graph expressing that questions need answers
- [[derivation generates knowledge systems from composable research claims not template customization]] — operationalizes: derivation traverses the discourse graph (Positions and their Argument chains) to compose justified configurations; derivation quality depends on discourse completeness in the IBIS sense
- [[justification chains enable forward backward and evolution reasoning about configuration decisions]] — materializes: justification chains are the derivation-time artifact that preserves the IBIS argument structure; each chain is a serialized path through Positions and Arguments that the derivation agent traversed, making the discourse graph's reasoning inspectable and revisable after configuration is deployed

Topics:
- [[graph-structure]]
