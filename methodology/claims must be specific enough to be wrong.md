---
description: Vague claims can't be disagreed with or built on — for agents, vague titles are undocumented functions where you can invoke but don't know what you'll get
kind: research
topics: ["[[note-design]]"]
methodology: ["Evergreen"]
---

# claims must be specific enough to be wrong

A claim that can't be wrong also can't be useful. When you write "quality matters" or "knowledge is important," you've said something true but empty. Nobody can disagree, which means nobody can engage. There's nothing to build on because there's no specific stake in the ground.

The test for specificity is simple: could someone disagree with this specific claim? Not disagree that the topic matters, but disagree with the particular assertion you're making. "Quality matters more at scale because small differences compound through selection" — someone could argue that small differences don't compound, or that selection isn't the mechanism. That disagreement is productive. It forces you to defend your reasoning or update it.

Vague claims fail the composability test in multiple ways. When you try to link to them, you're not invoking a specific idea — you're gesturing at a topic. The link `since [[quality is important]]` adds nothing to a sentence because it asserts nothing in particular. Compare that to `since [[claims must be specific enough to be wrong]]`, which carries a definite assertion into the prose. Since [[wiki links implement GraphRAG without the infrastructure]], the notes-as-APIs pattern depends on titles that function as typed signatures — and vague titles are undocumented functions where invocation gives unpredictable results.

This specificity requirement connects directly to how [[note titles should function as APIs enabling sentence transclusion]]. The title is the function signature — it should tell you exactly what you're calling. A vague title is like an undocumented function with unclear behavior. You can invoke it, but you don't know what you'll get back.

The constraint isn't about being provocative or contrarian. It's about having a point. Every note should argue something, and you can't argue without taking a position specific enough that someone could push back on it. Specificity also compounds through the vault's other quality gates: since [[summary coherence tests composability before filing]], coherence testing catches bundled claims, while the specificity test catches vague ones — together they ensure notes are both singular and staked. And since [[descriptions are retrieval filters not summaries]], vague claims produce descriptions that merely restate the title without adding mechanism, scope, or implication — the same anti-pattern at the description layer. When [[progressive disclosure means reading right not reading less]], precision in titles and descriptions is what enables agents to curate what enters context rather than loading everything indiscriminately.

This has an objective dimension too. Since [[testing effect could enable agent knowledge verification]], the specificity of a claim can be measured: descriptions that merely paraphrase titles should fail recite's prediction test, revealing vagueness through measurable retrieval failure rather than subjective judgment. And since [[narrow folksonomy optimizes for single-operator retrieval unlike broad consensus tagging]], single-operator systems like this vault permit the maximally specific claim-titles that the specificity standard demands — consensus vocabulary would force the generality this constraint rejects.

But specificity has a shadow side. Since [[vault conventions may impose hidden rigidity on thinking]], forcing insights into claim-as-title form may distort genuinely non-linear or relational ideas. The test becomes: when reformulation feels forced, is it because the insight isn't ready to be a claim, or because the claim-as-title pattern can't accommodate certain thinking styles? Since [[enforcing atomicity can create paralysis when ideas resist decomposition]], the specificity constraint shares this operationalization problem with atomicity: distinguishing "struggle that reveals incomplete thinking" from "struggle against a format that can't accommodate valid insight" requires felt sense that agents lack.
---

Relevant Notes:
- [[note titles should function as APIs enabling sentence transclusion]] — extends: specificity is what makes titles reliable API signatures; vague titles are undocumented functions that can't be invoked reliably
- [[wiki links implement GraphRAG without the infrastructure]] — develops the notes as APIs pattern: specificity makes titles work as function signatures that can be reliably invoked
- [[summary coherence tests composability before filing]] — complementary quality gate: specificity tests whether a single claim has enough stake, coherence tests whether the unit is actually singular
- [[descriptions are retrieval filters not summaries]] — applies the same anti-pattern: descriptions that restate titles add nothing, just as vague claims add nothing
- [[progressive disclosure means reading right not reading less]] — precision enables curation, vagueness defeats it
- [[vault conventions may impose hidden rigidity on thinking]] — tests whether the specificity requirement sometimes constrains non-linear thinking that resists sentence form
- [[testing effect could enable agent knowledge verification]] — the specificity test made objective: descriptions that merely paraphrase titles (lacking mechanism/scope/implication) should fail recite's prediction test, revealing the anti-pattern through measurable retrieval failure rather than subjective judgment
- [[narrow folksonomy optimizes for single-operator retrieval unlike broad consensus tagging]] — enablement: narrow folksonomy removes the consensus constraint that would force generality, making maximally specific claim-titles architecturally possible

Topics:
- [[note-design]]
