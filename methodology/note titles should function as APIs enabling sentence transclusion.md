---
description: Declarative titles transclude directly into prose, letting agents compose arguments from title-claims without loading full bodies — the title IS the semantic payload
kind: research
topics: ["[[note-design]]"]
methodology: ["Evergreen"]
---

# note titles should function as APIs enabling sentence transclusion

When a note title is a complete declarative sentence, it becomes a callable abstraction. You can invoke it in prose — `since [[claims must be specific enough to be wrong]], the question becomes...` — and the argument works without reading the note body. The title carries the semantic payload. The body provides implementation details for those who need them.

This is Andy Matuschak's central insight about evergreen note design: titles should function like APIs in programming. A function signature tells you what the function does; you invoke it without reading the source code. A sentence-form title tells you what the note argues; you invoke it without loading the content. The body is still there, but the title alone is sufficient for many uses.

The token efficiency implications are significant. An agent traversing a knowledge graph can:

1. Read titles to understand the conceptual landscape (cheap)
2. Compose arguments by linking titles together (still cheap)
3. Load note bodies only when the title's claim needs validation or elaboration (expensive, but targeted)

Without sentence-form titles, the agent must load each note to understand what it argues. With sentence-form titles, understanding emerges from title traversal, and body loading becomes optimization rather than necessity. Since [[progressive disclosure means reading right not reading less]], the goal is a context window dense with relevant material, and sentence-form titles enable the first filtering layer: you know what a note argues before deciding whether to read it.

This explains why the vault enforces the "claim test": can you complete the sentence "This note argues that [title]"? If the title passes this test, it can be transcluded into prose and will carry meaning on its own. If it fails — if the title is a topic label like "knowledge management" — transclusion produces nonsense: "since knowledge management" makes no grammatical sense.

The claim test can be extended into a full validation battery that agents run before committing notes: (1) does the title complete "this note argues that [title]"? (2) can the title function as a clause in a larger sentence? (3) is the title a positive claim rather than a question or topic label? Notes that fail any test get flagged for title improvement. This implements Matuschak's titling discipline programmatically, ensuring the compositional property of titles is maintained as the vault grows. Without systematic validation, title quality degrades over time as notes accumulate — each weak title is a function with an undocumented signature.

The composability requirement follows directly. Since [[claims must be specific enough to be wrong]], vague titles can't be reliably invoked. A title like "quality matters" carries almost no information when transcluded. But "quality matters more at scale because small differences compound through selection" carries a complete argument that can be engaged with, built on, or challenged.

This framing reveals why wiki link aliases are discouraged. If the title is `[[knowledge management friction|friction creates learning]]`, you're hiding the actual claim behind a display alias. Other notes linking to the same target would use different aliases, fragmenting the concept. The title itself should be the composable unit — no aliasing needed because the title works in prose.

But the API design has a maintenance cost. Because [[tag rot applies to wiki links because titles serve as both identifier and display text]], title-as-API means the function signature is also the display text in every call site. When understanding deepens and a title needs sharpening — the equivalent of refactoring a function signature — every invocation must be updated. The most callable notes (the ones with many incoming links, the most used APIs) are the most expensive to rename. This is the price of composability: the same property that makes titles work as prose makes them load-bearing in every sentence that invokes them.

The deeper pattern: notes are not documents to be read but functions to be called. The title is the signature, the body is the implementation, the wiki links are calls to other functions. Since [[inline links carry richer relationship data than metadata fields]], these function calls are typed: the surrounding prose provides the type annotation that explains how the called note contributes to the current argument. A well-written vault is a library of callable arguments that can be composed into larger reasoning structures without loading all the source code.

Since [[spreading activation models how agents should traverse]], following a wiki link is function invocation — activation spreads from the current note to the referenced note proportional to connection strength. The sentence-form title makes this invocation meaningful: when you call a function, you want to know what it returns. A vague title is an undocumented API; a sentence-form title is a typed signature that tells you exactly what you're getting.
---

Relevant Notes:
- [[claims must be specific enough to be wrong]] — the specificity requirement that makes titles work as reliable API signatures
- [[title as claim enables traversal as reasoning]] — the emergent property: when titles are callable claims, traversing wiki links between them reads as following reasoning chains; this note describes the design pattern, that note describes the emergent experience
- [[wiki links implement GraphRAG without the infrastructure]] — develops the full notes-as-APIs pattern: titles as signatures, bodies as implementation, links as function calls
- [[inline links carry richer relationship data than metadata fields]] — extends the API pattern: links are TYPED function calls where prose context provides type annotation
- [[spreading activation models how agents should traverse]] — link traversal IS function invocation; sentence-form titles make invocation meaningful by declaring what the function returns
- [[progressive disclosure means reading right not reading less]] — title-as-API enables the first disclosure layer: know what a note argues before deciding to load it
- [[summary coherence tests composability before filing]] — the gate that ensures notes are atomic enough to invoke cleanly; multi-claim bundles break transclusion
- [[intermediate packets enable assembly over creation]] — extends the API pattern to session outputs: packets are callable functions that future work assembles from, just as notes are callable units that arguments invoke
- [[propositional link semantics transform wiki links from associative to reasoned]] — proposes formalizing the type annotations this note describes: if wiki links are function calls, then relationship types (causes, enables, extends) are explicit type signatures for those calls
- [[tag rot applies to wiki links because titles serve as both identifier and display text]] — the maintenance cost of title-as-API: function signature changes propagate through all call sites, making the most-used APIs the most expensive to rename
- [[narrow folksonomy optimizes for single-operator retrieval unlike broad consensus tagging]] — theoretical justification: single-operator systems face no consensus constraint on vocabulary, which is what permits the maximally specific sentence-form titles this note requires; consensus vocabulary would force the generality that breaks API composability

Topics:
- [[note-design]]
