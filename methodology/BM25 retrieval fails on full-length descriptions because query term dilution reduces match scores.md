---
description: When a BM25 query contains many terms, each term's IDF contribution gets diluted by common words competing for scoring budget — condensing to key terms restores retrieval that full descriptions miss
kind: research
topics: ["[[discovery-retrieval]]"]
methodology: ["Original"]
---

# BM25 retrieval fails on full-length descriptions because query term dilution reduces match scores

BM25 scoring works by summing inverse document frequency (IDF) weights for each query term that matches a document. When a query is short and precise — three or four distinctive terms — each matching term contributes meaningfully to the score. But when the query is a full-length description (~150 characters, perhaps 20+ words), the scoring dynamics shift. Common words like "the," "that," "when," and connective phrases consume scoring budget without contributing retrieval signal. The distinctive terms that would identify the right note get diluted by noise.

This was observed directly during recite testing. Searching the full description text of [[MOCs are attention management devices not just organizational tools]] returned zero BM25 results. But condensing to key terms — "MOC attention management" — returned the note at rank one with a perfect score. The description was well-written for human scanning; it failed for keyword search because human-readable prose includes exactly the kind of connective tissue that dilutes BM25 queries.

The mechanism is straightforward. BM25 computes a relevance score as a sum over query terms: each term contributes based on its IDF (how rare it is across documents) and its term frequency in the target document. In a short query, every term carries weight. In a long query, high-IDF terms (distinctive words like "attention" or "MOC") compete with low-IDF terms (common words like "not" or "just") that match many documents and contribute little discriminating power. The sum gets noisy. A document that matches well on the distinctive terms but shares common words with many other documents may score lower than expected.

This creates a practical tension for the vault. Since [[descriptions are retrieval filters not summaries]], descriptions are optimized for agent scanning — they should help an agent decide whether to load a note. Since [[good descriptions layer heuristic then mechanism then implication]], the formula encourages prose-like descriptions with connective tissue between layers. But this same prose quality that makes descriptions scannable makes them poor BM25 queries. The heuristic-mechanism-implication structure uses connecting words ("because," "which means," "so that") that are exactly the low-IDF terms that dilute keyword search.

The resolution is not to write worse descriptions. Descriptions serve their primary function — helping agents filter before loading — and that function requires readable prose. Instead, the retrieval testing pipeline should account for this artifact. When full-description BM25 search fails, condensing to 3-5 key terms before declaring a retrieval failure is the correct diagnostic step. The failure may indicate BM25 query behavior rather than poor description quality.

This also explains why semantic search (vsearch) handles full descriptions better than BM25 does. Vector embeddings compress the entire description into a fixed-dimensional representation where common words contribute less to the embedding than distinctive ones — the embedding process implicitly handles the weighting that BM25 requires explicit term selection for. The vault's fallback chain (query → vsearch → search → grep) already accounts for this by providing multiple retrieval modes, but the recite skill's retrieval test should use condensed key terms for BM25 rather than raw description text.

The deeper implication touches the dual optimization problem. Since [[retrieval verification loop tests description quality at scale]], the verification loop combines prediction testing (can an agent predict content from title + description?) with retrieval testing (can the note be found by searching its description?). BM25 dilution means these two tests can diverge: a description that scores 5/5 on prediction may score 0 on BM25 retrieval. This is the mechanism behind what [[description quality for humans diverges from description quality for keyword search]] develops as a full argument — human scanning and keyword matching are two distinct retrieval channels with opposing requirements, and the BM25 IDF mechanism is the specific technical reason they pull apart. The divergence is not a description quality problem — it is a search engine behavior problem. The recite skill's dual-test architecture correctly surfaces this, but interpretation must distinguish between "description is bad" and "query format is wrong for this search mode."

This divergence also instantiates the broader pattern that [[metacognitive confidence can diverge from retrieval capability]] — a vault where every description passes prediction testing can feel fully navigable while BM25 retrieval silently fails for a significant fraction of notes. The confidence comes from prediction scores; the capability gap hides in the search mode that agents fall back to when semantic search is unavailable.

---
---

Relevant Notes:
- [[descriptions are retrieval filters not summaries]] — foundation: descriptions must serve retrieval, but the format optimized for human scanning may actively sabotage keyword search
- [[good descriptions layer heuristic then mechanism then implication]] — the layering formula creates good human-readable descriptions that may nonetheless fail BM25 because connective prose adds diluting terms
- [[retrieval verification loop tests description quality at scale]] — the operational context where this was discovered: dual-test (prediction + retrieval) correctly surfaces divergent quality
- [[distinctiveness scoring treats description quality as measurable]] — complementary: distinctiveness scoring uses embedding similarity, which tolerates term count better than BM25 does
- [[metadata reduces entropy enabling precision over recall]] — the information-theoretic frame: BM25 dilution is a specific failure mode of the entropy reduction mechanism when applied to prose-format descriptions
- [[description quality for humans diverges from description quality for keyword search]] — develops the consequence: this note identifies the mechanism (IDF dilution), that note develops the implication (two optimization targets that pull in opposite directions)
- [[metacognitive confidence can diverge from retrieval capability]] — specific instance: BM25 dilution creates exactly the confidence-capability gap where a description scores 5/5 on prediction yet returns zero BM25 results, making the vault feel navigable while keyword retrieval silently fails

Topics:
- [[discovery-retrieval]]
