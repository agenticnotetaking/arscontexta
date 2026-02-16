---
description: The efficiency framing misses the point — tokens are free, quality requires depth, so the goal is a dense relevant context window not a sparse one
kind: research
topics: ["[[discovery-retrieval]]"]
---

# progressive disclosure means reading right not reading less

The common interpretation of progressive disclosure is efficiency: read less, save tokens, minimize context. This is the wrong framing. The system philosophy inverts it: fill the context window, but fill it with what matters.

## Why the Efficiency Framing Fails

Tokens are free. Context window capacity is not the scarce resource it once was. What remains scarce is relevance. A context window stuffed with whatever loaded first performs worse than a smaller context loaded with exactly what the task needs.

The failure mode isn't "too much reading." It's "undiscerning reading." Loading all descriptions with `rg "^description:" thinking/*.md` dumps everything regardless of relevance. At scale this fills context with noise. The problem isn't the token count — it's that most of those tokens don't help.

## Curation Over Reduction

Progressive disclosure provides the mechanism for curation, not reduction. Since [[spreading activation models how agents should traverse]], the discovery layers implement decay-based context loading — high decay stops at descriptions, low decay reads full files. The layers — file tree, descriptions, MOCs, outlines, semantic search — let you find what's relevant before you load it fully. Since [[dual-coding with visual elements could enhance agent traversal]], visual representations (Mermaid diagrams, relationship graphs) might constitute an additional layer type — one that encodes structural relationships in a format where patterns are visible rather than described. This remains a research direction: the current layers are all text-based, and visual layers would require verifying that multimodal processing provides genuine filtering benefit. The MOC path provides curated navigation that demonstrably works; semantic search remains useful for candidate generation but not as the primary discovery mechanism. The pattern is:

```
find relevant content (MOC or vsearch) → load it fully → follow links that matter
```

This isn't about reading less. It's about reading right. Once you've identified relevant notes, read them completely. Don't skim when depth matters. Quality comes from understanding, and understanding requires enough context to grasp the full picture.

The MOC-first pattern works because of network structure: since [[small-world topology requires hubs and dense local links]], MOCs serve as hub nodes that create shortcuts across the knowledge graph. Starting from a hub node means most relevant content is 1-2 hops away, not buried in a linear search. This is why curated navigation (following MOC links) outperforms semantic search for initial orientation — you're traversing a graph optimized for short paths. And since [[complete navigation requires four complementary types that no single mechanism provides]], the disclosure layers succeed precisely because they exercise all four navigation types in sequence: file tree scanning provides global orientation (where am I?), MOC reading provides local orientation (what's nearby?), following wiki links provides contextual depth (what's related to this?), and searching provides supplemental discovery (how else can I find things?). The progressive disclosure stack is not an arbitrary ordering but a traversal of complementary navigation types, which is why skipping a layer creates a predictable blind spot.

## Progressive Summarization as Implementation

Tiago Forte's Progressive Summarization provides a concrete methodology for this philosophy. The technique creates compression layers: Notes → Bold → Highlights → Summary. Each layer is progressively more compressed, letting readers choose their depth based on need.

For agent-operated vaults, this translates to a layered content strategy. Source materials live in archive at full fidelity. Reference notes compress key insights. Wiki-linkable claims distill the core argument. Agents navigate at the appropriate abstraction level — summaries for broad scanning when building context across many notes, full content for deep analysis when a single note is central to the task.

The key insight: these aren't mutually exclusive depths but simultaneous layers. The archive doesn't disappear when you create the summary. Both exist, and the agent chooses which to load based on what the task requires. This is why the system keeps raw sources in archive alongside the extracted claims — the compression layers coexist rather than replacing each other.

## The Dense Context Window

The goal is a context window dense with relevant material. Not sparse. Not efficient. Dense with what matters for this task. Since [[descriptions are retrieval filters not summaries]], each discovery layer serves the curation function: helping you decide what deserves the full-depth treatment.

The question at each step isn't "can I stop here?" but "does this warrant going deeper?" Sometimes the answer is yes — follow the link, read the full note, load the related content. Sometimes no — the description told you enough to know this isn't relevant. Progressive disclosure gives you the information to make that call, not permission to skip depth.

But the filtering layer only works when compression preserves enough distinctiveness for correct decisions. Since [[sense-making vs storage does compression lose essential nuance]], some ideas may be systematically invisible at the filter layer — not because the description is poorly written, but because the idea's distinctive features ARE the nuance that compression discards. For these ideas, the disclosure layer fails not through quality defects but through format incompatibility. The agent never reaches the full content because the filter never identified relevance in the first place.

Since [[testing effect could enable agent knowledge verification]], this assumption becomes testable. If descriptions truly enable accurate filtering decisions, an agent should be able to predict note content from title and description alone. The recite skill applies the testing effect: read only metadata, predict content, score against actual content. Notes where prediction fails are exactly notes where the disclosure layer has broken — the filtering information doesn't match what's being filtered. Since [[retrieval verification loop tests description quality at scale]], this verification extends to the entire vault: systematic scoring across all notes reveals patterns (which types of notes fail, common failure modes, whether quality correlates with age) and turns disclosure layer quality from assumption to measured property. This is the verification mechanism for progressive disclosure's core assumption.

But the deeper risk is that structural completeness creates false confidence: since [[metacognitive confidence can diverge from retrieval capability]], the system may feel navigable through surface metrics (descriptions exist, MOCs are organized) while actual retrieval systematically fails. The disclosure layers exist to enable curation — but only if they actually predict what they're filtering. The verification loop closes this gap by testing empirically, not assuming structurally.

## The Design Decision

This is a CLOSED claim — a foundational choice about how the system works. We could have designed for efficiency: minimal context, just-enough reading, token conservation. We chose the opposite: fill the context window with quality content, use disclosure layers to curate what "quality" means for each task.

The phrase "reading right not reading less" captures the philosophy. There is no virtue in reading less. The virtue is in reading what matters.
---

Relevant Notes:
- [[descriptions are retrieval filters not summaries]] — describes the progressive disclosure layers and how descriptions enable filtering without full loading
- [[spreading activation models how agents should traverse]] — provides the cognitive science foundation: progressive disclosure IS decay-based context loading
- [[small-world topology requires hubs and dense local links]] — explains WHY MOC-first navigation works: hub nodes create shortcuts that keep relevant content 1-2 hops away
- [[intermediate packets enable assembly over creation]] — Progressive Summarization creates intermediate packets at multiple compression levels
- [[testing effect could enable agent knowledge verification]] — tests whether the disclosure layer actually works: if descriptions don't predict content, filtering fails
- [[retrieval verification loop tests description quality at scale]] — operationalizes the test at vault-wide scale: systematic scoring reveals patterns and turns disclosure layer quality from assumption to measured property
- [[metacognitive confidence can diverge from retrieval capability]] — tests the failure mode where disclosure assumptions break: structural completeness produces false navigability confidence while actual retrieval fails
- [[dual-coding with visual elements could enhance agent traversal]] — proposes visual representations as an additional layer type alongside the current text-based disclosure layers
- [[sense-making vs storage does compression lose essential nuance]] — the tension: some ideas may be invisible at the filter layer because their distinctive features are the nuance that compression discards
- [[complete navigation requires four complementary types that no single mechanism provides]] — explains WHY the disclosure layers are ordered as they are: each layer exercises a different navigation type (global, local, contextual, supplemental), so the progressive sequence is a traversal of complementary types, not an arbitrary ordering

Topics:
- [[discovery-retrieval]]
