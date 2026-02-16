---
description: If a note cannot be summarized in 1-3 coherent sentences, it bundles multiple claims that should be split before leaving inbox
kind: research
topics: ["[[note-design]]"]
methodology: ["Cornell"]
source: TFT research corpus (00_inbox/heinrich/)
---

# summary coherence tests composability before filing

The Cornell system requires a summary section: 1-3 sentences capturing the core claim of a page. This isn't just documentation practice — it's a structural test. If you cannot write a coherent summary, the content isn't coherent enough to be a single composable unit.

The failure mode this catches is multi-claim bundling. A note that covers "how links work, why topology matters, and when to checkpoint" cannot be summarized coherently because it makes three separate arguments. Forcing a summary exposes this incoherence before the note enters the knowledge graph, where bundled notes become linking hazards — you want to reference one claim but drag two others along with it.

This differs from the general quality question of whether [[claims must be specific enough to be wrong]]. Specificity asks whether a single claim has enough stake to be useful. Summary coherence asks whether the unit is actually singular. A note can pass the specificity test while failing the coherence test: "Quality matters more at scale because small differences compound" is specific, but if the note also argues about traversal patterns and session handoffs, no summary can hold it together.

The mechanism is simple: before any note moves from inbox to thinking, attempt to generate a 1-3 sentence summary. If the summary fails to cohere — if it reads as a list of topics rather than a unified argument — the note needs splitting. This implements Cornell's insight that the summary section is not post-processing documentation but a quality gate that catches structural problems early. Because [[structure without processing provides no value]], the summary requirement ensures processing actually happens before content leaves inbox — it's an anti-Lazy-Cornell pattern that forces the generative work.

For agent-operated vaults, this becomes an automated check. An agent attempting to summarize should flag notes where the summary requires "and" as a list connector rather than logical flow. The summary generation pass is cheap; discovering bundled notes through link maintenance is expensive. Since [[backward maintenance asks what would be different if written today]] includes splitting as one of the reconsideration actions, catching bundling at creation time prevents paying the higher cost of detecting and fixing it during maintenance.

But the summary requirement itself is a convention that may constrain. Since [[vault conventions may impose hidden rigidity on thinking]], forcing content into 1-3 coherent sentences assumes that valuable insights can always be expressed in that form. Relational insights, visual thinking, or procedural knowledge may resist sentence-form summary not because they bundle multiple claims but because they operate in a different register. The test becomes: when summary fails, is it bundling (multiple claims) or register mismatch (one insight that resists propositional form)? Since [[enforcing atomicity can create paralysis when ideas resist decomposition]], this diagnostic problem is shared across multiple vault conventions: both atomicity (decomposing into single-concept notes) and summary coherence (compressing into 1-3 sentences) require distinguishing "struggle that reveals incomplete understanding" from "struggle against a format that can't accommodate valid insight." The parallel suggests a deeper pattern: vault conventions that use friction as a diagnostic may systematically misclassify certain kinds of thinking.

This is an instance of [[testing effect could enable agent knowledge verification]] applied to structural quality rather than description quality. Attempting to generate a summary tests whether the content is coherent, just as attempting to predict content from description tests whether the description enables retrieval. Both patterns use attempted generation as a diagnostic — failures reveal structural problems that static inspection misses.
---

Relevant Notes:
- [[claims must be specific enough to be wrong]] — complementary quality gate: this note catches bundling, that note catches vagueness
- [[the generation effect requires active transformation not just storage]] — summary generation is a concrete example of the transformation that separates processing from filing
- [[structure without processing provides no value]] — the Lazy Cornell anti-pattern: summary requirement is a counter-measure that forces processing before filing
- [[backward maintenance asks what would be different if written today]] — catching bundling at creation time is cheaper than detecting it during maintenance passes
- [[testing effect could enable agent knowledge verification]] — sibling pattern: both use attempted generation as diagnostic for structural problems
- [[descriptions are retrieval filters not summaries]] — Cornell's two compression mechanisms: summary tests coherence at filing, descriptions enable filtering at retrieval
- [[generation effect gate blocks processing without transformation]] — sibling inbox exit gate: summary coherence catches bundled claims, the generation gate catches lack of transformation; both validate quality at the inbox-to-thinking boundary
- [[enforcing atomicity can create paralysis when ideas resist decomposition]] — parallel diagnostic problem: both summary coherence and atomicity enforcement face the question of whether friction signals bundling/incomplete thinking or format resistance/valid relational insight

Topics:
- [[note-design]]
