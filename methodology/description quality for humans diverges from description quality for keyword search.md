---
description: Descriptions that pass prediction tests (5/5) can fail BM25 retrieval because human-scannable prose uses connective vocabulary that dilutes keyword match scores — two optimization targets, not one
kind: research
topics: ["[[discovery-retrieval]]"]
methodology: ["Original"]
---

# description quality for humans diverges from description quality for keyword search

The recite skill's dual-test architecture — prediction scoring followed by retrieval testing — exposed a gap that the vault's description philosophy hadn't anticipated. Notes can score 5/5 on prediction (an agent reading title and description accurately predicts the note's content) while completely failing BM25 retrieval (searching the description text returns zero results). This isn't a bug in either test. It reveals that "description quality" is actually two different optimization targets that can pull in opposite directions.

## The Mechanism

Human-scannable descriptions use connective prose: "lossy compression optimized for decision-making, not content summary" reads naturally and enables prediction because the connective words ("optimized for," "not") create logical structure. But since [[BM25 retrieval fails on full-length descriptions because query term dilution reduces match scores]], every word in a BM25 query competes for scoring budget. Those connective words dilute the matching — common words like "optimized," "not," "for" consume IDF weight without contributing to retrieval. The distinctive terms that would actually match ("lossy," "compression," "retrieval," "filter") get proportionally less influence.

This is why since [[good descriptions layer heuristic then mechanism then implication]], the layering formula can paradoxically harm retrieval. A well-layered description spends character budget on three distinct information types connected by prose transitions. A retrieval-optimized description would strip those transitions and pack in more distinctive keywords. The formula that makes descriptions excellent for human scanning makes them worse for keyword search.

## Why This Matters for the Vault

The foundation claim that [[descriptions are retrieval filters not summaries]] assumes a single filter function. But this divergence reveals two distinct filter channels:

1. **Human scanning channel** — an agent reads descriptions sequentially, using natural language comprehension to assess relevance. Here, prose quality, logical structure, and layered information all help. Descriptions optimized for this channel are well-written sentences.

2. **Keyword search channel** — BM25 or similar search engines match query terms against description text. Here, keyword density, distinctive vocabulary, and minimal filler words help. Descriptions optimized for this channel are keyword-dense phrases.

These channels make different demands. A description like "cognitive modes conflict so separating them in time preserves quality of both" works beautifully for channel 1 — you understand the claim, the mechanism, the implication. For channel 2, the same text is a poor query: "cognitive," "modes," "conflict," "separating," "time," "preserves," "quality" are all common words that match widely.

Since [[narrow folksonomy optimizes for single-operator retrieval unlike broad consensus tagging]], the personal vocabulary problem compounds this. Idiosyncratic terms like "slip-box" or "agent-vault" or "systems-theoretic" are highly distinctive for human scanning — they immediately signal domain and perspective. But their very idiosyncrasy makes them sparse in the corpus, meaning BM25 has fewer documents to score against, and competing documents with more common vocabulary can outrank.

## The Dual Optimization Problem

Since [[metadata reduces entropy enabling precision over recall]], the entropy reduction argument assumes a unified retrieval mechanism. But the two channels reduce entropy differently:

- **Scanning** reduces entropy through comprehension — the agent understands what makes this note different from alternatives by processing the description's meaning
- **Keyword search** reduces entropy through term matching — the search engine narrows candidates by statistical co-occurrence of query terms and document terms

The same description text cannot simultaneously maximize both. Connective prose helps comprehension but hurts term matching. Keyword density helps term matching but reduces readability. The current vault philosophy implicitly optimizes for channel 1 (human scanning) because descriptions are designed to "add new information beyond the title" in natural prose. Channel 2 (keyword retrieval) is an afterthought. This is a specific instance of the broader tension that [[sense-making vs storage does compression lose essential nuance]] — but here the compression loss is channel-dependent rather than absolute. The nuance "lost" for BM25 (connective prose structure) is the nuance "preserved" for human scanning, and vice versa.

## Practical Resolution

The resolution is not to choose one channel over the other but to recognize which channel matters when. Since [[retrieval verification loop tests description quality at scale]] runs both prediction and retrieval tests, the dual-test architecture already captures this divergence. The improvement is in how we interpret results:

- **Prediction pass, retrieval fail** — description is well-written but keyword-sparse. This is the exact pathway where [[metacognitive confidence can diverge from retrieval capability]] — the description looks correct through the prediction test while failing the retrieval test. Consider: is keyword retrieval actually needed for this note, or will scanning and semantic search always find it? If BM25 matters, add distinctive keywords without destroying prose quality.

- **Prediction fail, retrieval pass** — description has good keywords but poor information structure. Apply the layering formula.

- **Both fail** — description needs rewriting on both dimensions.

- **Both pass** — description is genuinely high-quality across channels.

The deeper question is whether BM25 retrieval of descriptions even matters given that the vault has semantic search via qmd. Vector search (vsearch) finds meaning across vocabulary differences — exactly the divergence that BM25 misses. If the primary retrieval path is `qmd query` or `qmd vsearch`, then optimizing descriptions for BM25 is solving a secondary problem. The prediction test (channel 1) may be the only quality dimension that genuinely matters, with keyword retrieval as a degraded fallback that should not drive description design.

But fallbacks matter precisely when primary systems fail. Since qmd has documented reliability issues (stale indices, segfaults, MCP disposal errors), BM25 via `qmd search` is often the only working retrieval. Descriptions that fail BM25 are invisible during qmd outages — creating a reliability gap at the description layer that compounds the infrastructure reliability gap at the search layer. This is also evidence that [[vault conventions may impose hidden rigidity on thinking]] — the prose description convention, while justified for scanning, creates an invisible constraint on fallback retrieval that only surfaces during infrastructure failures.

---

Source: /rethink session (2026-02-08), promoted from [[description quality for humans diverges from description quality for keyword search]]
---

Relevant Notes:
- [[descriptions are retrieval filters not summaries]] — foundation that assumes one filter function, but this note reveals filtering splits into two distinct channels with different requirements
- [[good descriptions layer heuristic then mechanism then implication]] — the layering formula optimizes for human scanning but may inadvertently harm keyword retrieval by consuming character budget with connective prose
- [[retrieval verification loop tests description quality at scale]] — the dual-test architecture (prediction + retrieval) that first exposed this divergence; the loop correctly identifies it but the scoring conflates two separate quality dimensions
- [[distinctiveness scoring treats description quality as measurable]] — measures inter-note confusion via similarity but doesn't distinguish whether distinctiveness serves human scanning or machine retrieval
- [[metadata reduces entropy enabling precision over recall]] — the entropy reduction argument assumes a single retrieval channel, but BM25 and human scanning reduce entropy through different mechanisms
- [[narrow folksonomy optimizes for single-operator retrieval unlike broad consensus tagging]] — personal vocabulary amplifies this divergence because idiosyncratic terms may be highly distinctive for human scanning while being sparse in the BM25 index
- [[BM25 retrieval fails on full-length descriptions because query term dilution reduces match scores]] — provides the mechanism: IDF scoring explains WHY connective prose dilutes keyword retrieval, grounding this note's observation in specific search engine behavior
- [[sense-making vs storage does compression lose essential nuance]] — the dual-channel divergence is a specific instance of this tension: what counts as essential nuance depends on which retrieval channel the compression serves
- [[metacognitive confidence can diverge from retrieval capability]] — extends: prediction-pass retrieval-fail is a concrete pathway for the confidence-capability divergence where the system looks correct through one test while failing another
- [[vault conventions may impose hidden rigidity on thinking]] — the ~150 char prose description convention implicitly optimizes for human scanning, imposing a hidden constraint on keyword retrieval that this note makes visible

Topics:
- [[discovery-retrieval]]
