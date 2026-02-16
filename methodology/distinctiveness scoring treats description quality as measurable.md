---
description: NLP-based validation tool that computes pairwise description similarity to flag retrieval confusion risk, operationalizing the distinctiveness criterion as automated quality assurance
kind: research
topics: ["[[discovery-retrieval]]"]
---

# distinctiveness scoring treats description quality as measurable

The insight that [[descriptions are retrieval filters not summaries]] implies a validation criterion: a description is good if it uniquely identifies its note among all notes in the system. This is testable. Compute pairwise similarity between all descriptions, flag pairs above a threshold. High-similarity pairs represent retrieval confusion risk — an agent searching might return the wrong note because the descriptions don't distinguish them. The threshold itself follows the pattern that [[confidence thresholds gate automated action between the mechanical and judgment zones]] -- rather than a single binary cutoff, a three-tier response (auto-flag above 0.8, suggest review between 0.6 and 0.8, ignore below 0.6) would graduate the system's response based on its confidence in the confusion risk.

This transforms description quality from subjective judgment ("does this feel distinct enough?") to measurable property ("what's the similarity score with the most similar other description?"). The scoring mechanism makes the quality gate enforceable.

## Implementation Pattern

The algorithm:

1. Extract all description strings from YAML frontmatter
2. Embed each description (or use simpler TF-IDF/BM25 similarity)
3. Compute pairwise similarity matrix
4. Flag pairs exceeding threshold (perhaps 0.8 cosine similarity)
5. Output: pairs of notes whose descriptions are confusingly similar

```bash
# Sketch: extract descriptions, compute similarity
rg "^description:" thinking/*.md | # get all descriptions
  # [pipe to similarity computation]
  # [flag high-similarity pairs]
```

The output enables targeted revision: for each flagged pair, at least one description needs sharpening to distinguish the notes.

## The Quality Assurance Pattern

This is NLP-based linting applied to knowledge system metadata. The scoring should integrate into health check operations or run as a separate validation pass. Automated checks catch problems that human scanning misses — particularly at scale where manually comparing 50+ descriptions becomes impractical.

The pattern generalizes: any metadata field with a "distinctiveness matters" semantic can be validated this way. Titles could be scored similarly. The underlying principle is that knowledge graph elements that serve retrieval should be measurable against retrieval criteria.

## Connection to Testing Effect Experiment

The [[testing effect could enable agent knowledge verification]] experiment tests description quality through prediction: can an agent predict note content from title + description? Distinctiveness scoring offers a complementary approach: instead of testing retrieval success, test retrieval ambiguity. A note might pass the testing effect check (description enables prediction) while still being confusable with another note if both descriptions are similar.

The two validations catch different failure modes:
- Testing effect catches: descriptions too vague to enable prediction
- Distinctiveness scoring catches: descriptions that distinguish from title but not from other notes

Together they form a more complete quality assurance layer. Since [[schema enforcement via validation agents enables soft consistency]], these validation mechanisms share a common operational pattern: async checking that accumulates results for batch maintenance rather than blocking creation. Distinctiveness scoring runs as a periodic validation pass, flagging high-similarity pairs for attention during maintenance cycles — exactly the soft enforcement model that preserves creation flow while surfacing quality drift. Since [[retrieval verification loop tests description quality at scale]], both approaches can now be systematized: the loop runs prediction scoring across all notes and adds actual retrieval testing to verify search ranking. A note might pass prediction (description makes sense to humans) but fail retrieval (description lacks searchable keywords), or vice versa. The combined signal from distinctiveness scoring, prediction verification, and retrieval testing provides a comprehensive quality surface for the description layer.

## Why This Matters

At scale, description quality determines filtering efficiency. Since [[throughput matters more than accumulation]], filtering speed directly impacts processing velocity. Every confusing description that causes wrong-note retrieval or multiple-note scanning adds friction. Automated detection of confusion risk enables proactive improvement before retrieval failures occur.

The pattern also inverts the typical quality control direction: instead of checking each description against abstract criteria, check descriptions against each other. The corpus itself defines what "distinct enough" means — your description must distinguish from every other description in the system. But since [[description quality for humans diverges from description quality for keyword search]], distinctiveness itself splits across channels. Two descriptions might be easily distinguished by an agent reading them sequentially (different logical structure, different implications) while being confusingly similar to BM25 (shared common vocabulary, same connective words). The pairwise similarity measurement needs to account for which retrieval channel it targets — embedding similarity measures scanning-channel distinctiveness, while keyword overlap measures search-channel distinctiveness.
---

Relevant Notes:
- [[descriptions are retrieval filters not summaries]] — provides the theoretical foundation: descriptions should maximize distinctiveness within corpus, not comprehensiveness
- [[good descriptions layer heuristic then mechanism then implication]] — complements distinctiveness with structure: layered descriptions are more likely to be distinctive because each layer adds differentiating information
- [[testing effect could enable agent knowledge verification]] — complementary validation approach: testing effect catches vagueness, distinctiveness scoring catches ambiguity
- [[retrieval verification loop tests description quality at scale]] — the scaled implementation: systematic prediction-then-verify cycles with scoring, combined with actual retrieval testing, forming a complete quality surface alongside distinctiveness scoring
- [[skills encode methodology so manual execution bypasses quality gates]] — grounds why this should be automated in health checks rather than manual checking
- [[throughput matters more than accumulation]] — connects to success metric: filtering efficiency determines processing velocity, confusion risk slows filtering
- [[metadata reduces entropy enabling precision over recall]] — provides the information-theoretic grounding: distinctiveness is entropy reduction applied to descriptions; high similarity means redundant information
- [[metacognitive confidence can diverge from retrieval capability]] — tests the gap this methodology addresses: structural metrics (descriptions exist) may not correlate with retrieval success; distinctiveness scoring helps close that gap by measuring description effectiveness, not just existence
- [[schema enforcement via validation agents enables soft consistency]] — shared operational pattern: both are async validation mechanisms that flag rather than block, accumulating results for maintenance rather than preventing creation
- [[description quality for humans diverges from description quality for keyword search]] — complicates the measurement target: distinctiveness scoring measures inter-note confusion but the score may apply differently across retrieval channels; descriptions can be distinctive for human scanning while being indistinct for keyword matching if the distinguishing features are connective prose rather than keyword vocabulary
- [[confidence thresholds gate automated action between the mechanical and judgment zones]] -- the 0.8 similarity threshold is itself a confidence-gated pattern: pairs above 0.8 are auto-flagged (high confidence of confusion risk), pairs between 0.6 and 0.8 could be suggested for review (medium confidence), and pairs below 0.6 are ignored (low confidence); the three-tier response pattern generalizes the binary threshold into graduated action

Topics:
- [[discovery-retrieval]]
