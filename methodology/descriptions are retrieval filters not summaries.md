---
description: Note descriptions function as lossy compression enabling agents to filter before loading full content, which is information-theoretically sound
kind: research
topics: ["[[discovery-retrieval]]"]
methodology: ["Cornell"]
---

# descriptions are retrieval filters not summaries

The primary purpose of a note description is not to summarize what the note contains, but to help agents decide whether to load the full content. This is the retrieval filter function, and it maps directly to Cornell Note-Taking's cue column pattern.

## The Information-Theoretic Basis

Description as filter is information-theoretically sound: it's lossy compression that preserves decision-relevant features while discarding detail. The description answers "should I read this?" not "what does this say?" This is exactly what Shannon's rate-distortion theory predicts: optimal compression for a given task throws away information that doesn't help with that task.

Aggregating descriptions creates a pre-computed low-entropy representation of the system. Scanning 50 descriptions costs fewer tokens than reading 5 full notes to find the relevant one. The description layer enables efficient filtering.

## The Cornell Cue Column Pattern

Cornell Note-Taking has three sections:
- **Notes**: detailed content
- **Cue column**: questions or keywords that trigger recall
- **Summary**: synthesis across notes

The cue column is explicitly designed as a retrieval aid. You write cues that help you find and recall content later. This is the same function descriptions serve: helping future retrieval by capturing what makes this note distinctive. Since [[wiki links are the digital evolution of analog indexing]], the cue column was an early form of the same indexing pattern that wiki links now implement digitally — both create navigable pointers that serve as entry points into content. Cornell actually has two compression mechanisms operating at different points: because [[summary coherence tests composability before filing]], the summary section tests structural coherence at filing time (is this unit singular?), while descriptions enable retrieval filtering at query time (should I load this?). Both compress, but for different purposes.

The pattern validates that descriptions work as filters: humans need them too, not just agents. The difference is that agents can read YAML frontmatter programmatically, while humans read cue columns visually.

## Progressive Disclosure Pattern

The discovery layers implement this:

1. **File tree**: titles only (highest compression)
2. **Descriptions**: titles + descriptions (medium compression)
3. **Outline**: headings structure (low compression)
4. **Full content**: everything (no compression)

Each layer adds fidelity but costs more tokens. Since [[progressive disclosure means reading right not reading less]], this isn't about minimizing tokens — it's about curating what deserves the full-depth treatment. [[spreading activation models how agents should traverse]] implements this as decay-based context loading, and descriptions occupy a specific position: high-decay traversal stops at the description layer. An agent scanning descriptions activates many concepts at low depth. Loading full files activates fewer concepts at high depth. The description layer is the sweet spot for filtering: enough context to decide, low enough cost to scan many at once. And since [[AI shifts knowledge systems from externalizing memory to externalizing attention]], the description layer is not merely a retrieval optimization — it is an attention externalization mechanism. The system pre-computes which notes deserve deeper attention by encoding decision-relevant features into descriptions, directing the agent's finite focus rather than merely helping it recall what it stored.

## The Anti-Pattern: Description as Summary

When descriptions just restate the title in different words, they waste the agent's context. This is the same failure mode as vague claims: since [[claims must be specific enough to be wrong]], descriptions that merely paraphrase add nothing to disagree with or build on. This maps directly to [[the generation effect requires active transformation not just storage]]: paraphrase is not generation. Writing a description that restates the title produces nothing new — no cognitive hooks, no new information, no retrieval value. A good description generates something: mechanism, implication, or scope that the title doesn't contain. That generation is what creates the filter value. The experiment [[verbatim risk applies to agents too]] tests whether agents commit this anti-pattern at scale — producing well-structured outputs that reorganize content without genuine synthesis. If that experiment validates, description writing becomes a specific detection point: descriptions that merely paraphrase are evidence of the verbatim failure mode. This happens when you treat description as "mini-summary" rather than "retrieval cue."

Since [[testing effect could enable agent knowledge verification]], the paraphrase anti-pattern becomes testable. When an agent reads only title and description, then predicts note content, paraphrase descriptions should fail — they don't contain enough distinct information to enable accurate prediction. The testing effect experiment's first pre-registered prediction directly tests this: notes flagged by recite as poorly-retrievable should have descriptions that merely paraphrase titles. If validated, this provides an objective diagnostic for the anti-pattern rather than relying on subjective judgment about whether a description "adds enough."

Bad:
- Title: "vector proximity measures surface overlap not deep connection"
- Description: "Semantic similarity captures surface-level overlap rather than genuine conceptual relationships"

This description adds no new information. It just paraphrases the title. An agent scanning descriptions can't use this to filter.

Good:
- Title: "vector proximity measures surface overlap not deep connection"
- Description: "Two notes about the same concept with different vocabulary score high, while genuinely related ideas across domains score low — embeddings miss what matters"

This description adds mechanism (vocabulary vs concepts) and implication (cross-domain connections fail). Now an agent knows: this note is about limitations of embedding-based search, specifically the cross-domain problem.

## Implications

Since descriptions function as retrieval filters, the quality standard is: does this help an agent decide whether to load the full note? Not: does this summarize the note accurately? An active experiment, [[question-answer metadata enables inverted search patterns]], tests whether an explicit `answers:` YAML field would extend this further — storing not just retrieval cues but the specific questions the note answers. If validated, question-matching would become an even faster filter than description scanning.

But the compression that enables filtering may lose exactly what makes complex ideas valuable. Since [[sense-making vs storage does compression lose essential nuance]], some knowledge types may resist the ~150-character filter format: contextual knowledge whose meaning depends on situation, procedural nuance where tacit judgment matters, or ideas whose distinctive features ARE the subtle details that don't compress well. The description layer works when it preserves enough distinctiveness for correct filtering — but for ideas where distinctiveness IS the nuance, compression may create systematic retrieval failures that go undetected because we never find what we're missing.

### Distinctiveness Over Comprehensiveness

The information-theoretic framing implies a specific design criterion: descriptions should maximize distinctiveness within the corpus rather than maximize comprehensiveness. Since [[metadata reduces entropy enabling precision over recall]], the goal is pre-computing low-entropy representations that shrink the search space. A description that tries to cover everything a note contains dilutes its filter value. A description that captures what makes this note different from similar notes creates high information content relative to the corpus.

This is the difference between:
- **Comprehensive**: "Discusses how descriptions work and why they matter for retrieval" (could apply to many notes)
- **Distinctive**: "Two notes about the same concept with different vocabulary score high, while genuinely related ideas across domains score low" (immediately identifies this specific note)

The discriminating question when writing descriptions: "Would this description help an agent choose THIS note over similar notes on related topics?" If the description could plausibly apply to multiple notes in the system, it lacks distinctiveness and fails as a filter.

This changes what makes a good description:
- Add NEW information beyond the title
- Capture scope, mechanism, or implication
- Include distinctive keywords for semantic search
- Enable filtering decisions without reading full content
- Maximize what distinguishes this note from related notes

Since [[good descriptions layer heuristic then mechanism then implication]], an effective structure emerges: lead with the actionable heuristic (what to do), back with mechanism (why it works), end with operational implication (what this means for practice). This layered formula operationalizes the distinctiveness criterion — each layer adds information that the previous layers don't contain.

But the description schema itself is a convention that may constrain. Since [[vault conventions may impose hidden rigidity on thinking]], the ~150-character limit forces a particular condensation style. Visual insights, procedural knowledge, or context-dependent ideas might resist this format — they can't be reduced to a sentence without losing something. The experiment tracks whether YAML metadata requirements accumulate into hidden rigidity.

The description layer becomes more valuable as descriptions improve, because better filters mean fewer wasted full-note loads. Since [[throughput matters more than accumulation]], this directly serves the success metric: filtering speed determines processing velocity from capture to synthesis. Every millisecond saved on filtering compounds across every retrieval operation. But the existence of descriptions doesn't guarantee they function as filters: since [[metacognitive confidence can diverge from retrieval capability]], a vault with complete description coverage may produce false confidence that the filtering layer works while actual retrieval systematically fails. This is the organized graveyard at the filtering layer — descriptions exist but don't enable filtering decisions.

Since [[retrieval verification loop tests description quality at scale]], this gap between "descriptions exist" and "descriptions work" becomes empirically testable. Systematic prediction-then-verify cycles across all notes with scoring reveal which descriptions fail as filters, common failure modes, and whether description quality correlates with note type or age. The loop turns the filter assumption into measurable infrastructure health.

The filter function itself splits across retrieval channels. Descriptions optimized for agent scanning — prose with connective tissue, layered information, natural flow — work well when agents read descriptions sequentially. But since [[BM25 retrieval fails on full-length descriptions because query term dilution reduces match scores]], those same prose descriptions fail keyword search because common words dilute the distinctive terms that would identify the right note. The filter works for one retrieval channel while failing another, and since [[description quality for humans diverges from description quality for keyword search]], this split reveals that "description quality" is not one dimension but two separate optimization targets. Human scanning and keyword matching make opposing demands on the same ~150 characters, so the single filter function this note assumes is actually a dual filter serving channels with different requirements.
---

Relevant Notes:
- [[progressive disclosure means reading right not reading less]] — articulates the philosophy: disclosure layers enable curation for quality, not token savings
- [[good descriptions layer heuristic then mechanism then implication]] — provides the structural formula: lead with actionable heuristic, back with mechanism, end with operational implication
- [[spreading activation models how agents should traverse]] — positions descriptions as the high-decay layer: agents can activate many concepts at description depth without loading full files
- [[processing effort should follow retrieval demand]] — descriptions enable JIT processing by providing efficient filtering before full retrieval
- [[queries evolve during search so agents should checkpoint]] — at each checkpoint, descriptions enable fast reassessment without loading full notes
- [[throughput matters more than accumulation]] — filtering speed directly serves the success metric: faster filtering means faster processing velocity
- [[the generation effect requires active transformation not just storage]] — explains why paraphrase fails as a description: generation creates value, restatement doesn't
- [[vault conventions may impose hidden rigidity on thinking]] — tests whether the description schema and other conventions accumulate into constraints that certain thinking styles can't fit
- [[testing effect could enable agent knowledge verification]] — tests whether the paraphrase anti-pattern causes measurable retrieval failures, providing objective diagnostic for description quality
- [[retrieval verification loop tests description quality at scale]] — operationalizes the testing effect as systematic vault-wide assessment: scoring across all notes turns description quality from assumption to measured property
- [[verbatim risk applies to agents too]] — the broader experiment testing whether agents produce well-structured outputs without genuine insight; description-as-paraphrase is a specific manifestation of this failure mode
- [[metacognitive confidence can diverge from retrieval capability]] — tests whether description coverage produces false confidence: descriptions may exist without functioning as filters, creating the organized graveyard at the filtering layer
- [[sense-making vs storage does compression lose essential nuance]] — the open tension: lossy compression is theoretically sound, but some knowledge types may resist the format in ways that create silent retrieval failures
- [[AI shifts knowledge systems from externalizing memory to externalizing attention]] — paradigm frame: description-based filtering is a form of attention externalization; the system pre-computes what deserves deeper focus rather than merely helping agents recall what was stored
- [[narrow folksonomy optimizes for single-operator retrieval unlike broad consensus tagging]] — explains why description optimization works: single-operator systems can tune ~150-char descriptions entirely to one agent's retrieval patterns without accommodating diverse users, making the filter layer maximally effective for the operator who will actually use it
- [[BM25 retrieval fails on full-length descriptions because query term dilution reduces match scores]] — reveals that the filter function splits across channels: prose descriptions that work for agent scanning fail keyword search because connective words dilute IDF scoring
- [[description quality for humans diverges from description quality for keyword search]] — develops the full consequence: the filter function is not one dimension but two, with human scanning and keyword matching as separate optimization targets that can pull in opposite directions

Topics:
- [[discovery-retrieval]]
