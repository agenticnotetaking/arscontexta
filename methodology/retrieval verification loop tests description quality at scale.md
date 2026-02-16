---
description: Systematic scoring across all vault notes turns description quality from subjective judgment into measurable property, enabling continuous improvement through prediction-then-verify cycles
kind: research
topics: ["[[discovery-retrieval]]"]
methodology: ["Cornell"]
source: [[tft-research-part1]]
---

# retrieval verification loop tests description quality at scale

The testing effect demonstrates that attempting to retrieve information reveals what you actually know versus what you think you know. Applied to vault descriptions, this becomes a systematic quality assurance mechanism: for each note, read only title and description, predict content, then verify against actual content. The discrepancy score becomes a measurable quality metric.

This extends [[testing effect could enable agent knowledge verification]] from principle to operational implementation. The principle says prediction-then-verify reveals description quality. The loop says: run this across every note, systematically, with scoring and tracking.

## The Scoring Mechanism

The verification loop implements a 5-point scoring system:

| Score | Meaning |
|-------|---------|
| 5 | Prediction matched precisely — description excellent |
| 4 | Core captured, details missed — description good |
| 3 | General area right, key aspects missed — adequate |
| 2 | Significant mismatch — description weak |
| 1 | Prediction wrong — description fails |

Notes scoring below 3 get flagged for description improvement. This transforms "is this description good enough?" from subjective assessment to quantified decision boundary.

## Why Scale Matters

Individual description checking is valuable but doesn't catch systemic problems. Running the loop across the entire vault reveals patterns:

- Which types of notes have worse descriptions (methodology notes vs claims?)
- Common failure modes (restating titles? missing mechanisms?)
- Whether description quality correlates with note age
- Which MOC areas have retrieval risk

Since [[distinctiveness scoring treats description quality as measurable]], the verification loop provides a complementary validation approach. Distinctiveness scoring catches descriptions that are confusably similar to other descriptions. The verification loop catches descriptions that are misleading about their own note's content. Together they form a more complete quality surface.

## Integration with Retrieval Testing

The loop adds an actual retrieval test after prediction scoring: search for the description text and check where the note ranks in results. A note might pass prediction (description makes sense to humans) but fail retrieval (description lacks searchable keywords), or vice versa. The combined signal identifies notes needing attention from either angle.

The prediction-retrieval divergence has a specific technical cause: since [[BM25 retrieval fails on full-length descriptions because query term dilution reduces match scores]], searching a full prose description as a BM25 query dilutes the distinctive terms among common connective words. A description that scores 5/5 on prediction can return zero BM25 results — not because the description is bad, but because the query format is wrong for keyword search. The retrieval test should condense to key terms before declaring a retrieval failure, distinguishing "description is poorly written" from "BM25 query needs reformatting." More fundamentally, since [[description quality for humans diverges from description quality for keyword search]], the prediction test and retrieval test are measuring different quality dimensions entirely. Rather than treating prediction-pass retrieval-fail as a single anomaly to explain away, the loop should interpret these as independent signals: prediction quality measures the scanning channel, retrieval quality measures the keyword channel, and a description can be excellent on one while failing the other.

This implements the principle that [[descriptions are retrieval filters not summaries]] — the test validates whether descriptions actually function as filters, not just whether they seem adequate when read directly.

## The Compound Effect

Every verification pass makes the vault more retrievable. Weak descriptions get flagged. Improvements get made. Over time, the description layer becomes a reliable API for deciding what to read. This is maintenance work that directly determines whether the vault is useful or just files.

The verification loop exemplifies the soft enforcement model that [[schema enforcement via validation agents enables soft consistency]] articulates: run quality checks asynchronously, flag rather than block, address during maintenance passes. The loop doesn't prevent note creation when descriptions are weak — it surfaces weakness for later improvement. This preserves capture flow while ensuring quality trends upward over time.

Since [[throughput matters more than accumulation]], filtering speed impacts processing velocity. Every description improvement compounds across every future retrieval operation. The verification loop is investment in retrieval infrastructure, not just content quality.

## Closing the Confidence-Capability Gap

Since [[metacognitive confidence can diverge from retrieval capability]], structural completeness (descriptions exist, coverage is 100%) can produce false confidence while actual retrieval systematically fails. The verification loop is the mechanism that closes this gap: it tests whether descriptions actually enable filtering decisions, not just whether they exist. Without systematic verification, the vault can feel navigable through surface metrics while the description layer silently fails its function.

This operationalizes the insight that [[progressive disclosure means reading right not reading less]]. Progressive disclosure assumes descriptions provide enough information to curate what deserves full reading. The verification loop tests this assumption empirically: if agents can't predict content from title and description, the disclosure layer has broken regardless of how complete it looks.

But there is a deeper limitation: since [[sense-making vs storage does compression lose essential nuance]], the verification loop tests whether descriptions enable prediction of note content, not whether the most valuable parts survive compression. An agent might score 5 on prediction — correctly anticipating the note's structure and arguments — while the subtle insight that made the note worth writing is exactly what the description couldn't capture. The loop catches quality defects in descriptions but cannot detect format incompatibility: ideas whose distinctive features ARE the nuance that compression discards will fail retrieval in ways the verification loop cannot measure, because we don't know what we're not finding.
---

Relevant Notes:
- [[testing effect could enable agent knowledge verification]] — provides the foundational principle; this note operationalizes it at scale
- [[distinctiveness scoring treats description quality as measurable]] — complementary validation approach; catches inter-note confusion while verification loop catches intra-note mismatch
- [[descriptions are retrieval filters not summaries]] — the theory being validated; retrieval testing confirms whether descriptions actually filter
- [[good descriptions layer heuristic then mechanism then implication]] — provides diagnostic structure; verification failures should map to missing layers
- [[metacognitive confidence can diverge from retrieval capability]] — the problem this loop solves; structural completeness creates false confidence that systematic verification exposes
- [[progressive disclosure means reading right not reading less]] — the assumption being validated; if descriptions don't predict content, the disclosure layer has failed
- [[throughput matters more than accumulation]] — every description improvement compounds across future retrievals; the loop is infrastructure investment
- [[skills encode methodology so manual execution bypasses quality gates]] — the verification loop should be a skill to ensure consistent scoring thresholds and systematic coverage
- [[schema enforcement via validation agents enables soft consistency]] — provides the theoretical frame: verification loop is soft enforcement for descriptions, flagging rather than blocking to preserve creation flow while surfacing drift
- [[sense-making vs storage does compression lose essential nuance]] — the loop's blind spot: it tests whether descriptions predict content, not whether the most valuable parts survive compression; ideas whose distinctiveness IS the nuance may fail retrieval in unmeasurable ways
- [[mnemonic medium embeds verification into navigation]] — alternative verification architecture: this note implements scheduled batch verification, mnemonic medium proposes ambient verification during traversal where link context phrases become the prompts
- [[BM25 retrieval fails on full-length descriptions because query term dilution reduces match scores]] — explains the mechanism behind prediction-retrieval divergence: IDF dilution from connective prose is why the retrieval test fails even when prediction passes
- [[description quality for humans diverges from description quality for keyword search]] — provides the interpretive framework: prediction-pass retrieval-fail is not a single failure but evidence of two distinct quality dimensions; the loop should interpret results channel-by-channel rather than conflating both into one score

Topics:
- [[discovery-retrieval]]
