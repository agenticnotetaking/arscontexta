# Search Modality Selection Reference

## Purpose

Guide the derivation engine in selecting which search modalities a generated system should support, how they interact, and when each is appropriate. Search is a kernel primitive (semantic-search in kernel.yaml) but implementation varies dramatically by platform, volume, and processing intensity. The wrong search configuration produces either retrieval failures (missing semantic when needed) or wasted complexity (deploying hybrid search for a 30-note vault).

This document answers: given a derived system's configuration (volume, granularity, linking style, platform tier), which search modalities should be enabled, how should they be prioritized, and what fallback chains should be generated?

---

## Derivation Questions

Questions the engine must answer when generating search configuration:

1. **What is the expected note volume trajectory?** Low (<50), moderate (50-200), high (>200). Search modality requirements shift at each threshold.
2. **Does the linking dimension include implicit connections?** If linking = explicit+implicit, semantic search is structurally required — it IS the implicit linking mechanism.
3. **What platform tier is available?** Tier-1 (Claude Code with MCP) enables persistent semantic search servers. Tier-2 (CLI tools) enables batch semantic search. Tier-3 (convention only) limits to keyword search plus manual review.
4. **What is the processing intensity?** Heavy processing generates vocabulary divergence faster (many notes reformulating the same concepts in different words), increasing semantic search value.
5. **How domain-specific is the vocabulary?** Narrow domains with consistent terminology get less value from semantic search. Broad or cross-domain systems where the same concept appears under different names get maximum value.
6. **Is duplicate detection a requirement?** If the pipeline includes a reduce phase that extracts claims, semantic duplicate detection prevents the same insight from being captured under different phrasings.

---

## Curated Claims

### Modality Foundations

#### BM25 provides the baseline for all text retrieval

**Summary:** BM25 (Best Matching 25) is a probabilistic ranking function that scores documents by term frequency, inverse document frequency, and document length normalization. It is the standard algorithm behind keyword search. BM25 excels when the searcher knows the exact vocabulary used in the target document — it is fast (sub-second on large corpora), deterministic, requires no model loading or embedding computation, and works on any system with a text index.

**Derivation Implication:** Every generated system gets keyword search as the floor. Even tier-3 convention-only systems can instruct the agent to use ripgrep or grep. Keyword search is the universal fallback that never fails — it requires only filesystem access.

**Source:** Robertson & Zaragoza, "The Probabilistic Relevance Framework: BM25 and Beyond" (2009). Validated operationally in the vault's qmd `search` mode.

---

#### Embedding similarity captures meaning across vocabulary boundaries

**Summary:** Vector embeddings project text into a high-dimensional space where semantic similarity corresponds to geometric proximity. Two notes about "friction in learning systems" and "errors as pedagogical feedback" share no significant keywords but occupy nearby regions in embedding space. This is the core value proposition of semantic search: it finds connections that keyword search structurally cannot, because keyword search requires vocabulary overlap that semantic relatedness does not guarantee.

**Derivation Implication:** Semantic search (`vector_search`) becomes valuable when vocabulary divergence is expected — which correlates with note volume, processing intensity, and domain breadth. Systems with heavy processing generate more reformulations of the same concepts, increasing the chance that two notes about the same idea use different words.

**Source:** Mikolov et al., "Efficient Estimation of Word Representations in Vector Space" (2013). Operationally confirmed: the vault's qmd vector-search catches duplicates that BM25 misses entirely.

---

#### Query expansion amplifies semantic search by generating alternative phrasings

**Summary:** Query expansion takes the user's original query and generates alternative formulations before searching. "Knowledge management friction" might expand to "obstacles in personal knowledge systems," "note-taking workflow bottlenecks," and "PKM failure patterns." Each expanded query runs against the embedding index, and results are merged. This compensates for the single-query blind spot where the searcher's phrasing might not match the embedding space's optimal representation of the concept.

**Derivation Implication:** Query expansion is a feature of hybrid search mode (the qmd `deep_search` tool). It adds latency (~5-15 seconds) but significantly improves recall for exploratory searches. Generated systems should use expansion for connection-finding and deep exploration, not for quick lookups.

**Source:** Operational experience with qmd's expansion pipeline. Grounded in Rocchio relevance feedback (1971) adapted for neural retrieval.

---

#### LLM reranking evaluates genuine conceptual connection beyond surface similarity

**Summary:** After BM25 and vector search produce candidate results, an LLM evaluates each candidate against the original query for genuine conceptual relevance. This is the most expensive step but also the most valuable for connection-finding. Vector similarity can be fooled by topical overlap — two notes about "context windows" might score high even if one is about UI design and the other about LLM architecture. The LLM reranker distinguishes surface overlap from deep connection by reasoning about the semantic relationship.

**Derivation Implication:** LLM reranking is the highest-quality search mode and should be reserved for tasks where connection quality matters most: reflect (finding connections for new notes), reweave (updating old notes), and exploratory research. It should NOT be the default for routine lookups.

**Source:** Nogueira & Cho, "Passage Re-ranking with BERT" (2019). Operationally validated in the vault's qmd `deep_search` mode, which uses LLM reranking as the final stage.

---

### Task-to-Modality Mapping

#### Finding known notes requires keyword search, not semantic search

**Summary:** When the agent knows what it is looking for — a specific filename, a known term, a particular YAML field value — keyword search is strictly superior. It is faster (0.2s vs 5-20s), deterministic (same query always returns same results), and more precise (no false positives from embedding noise). Semantic search adds latency and potential noise when the target is lexically identifiable.

**Derivation Implication:** Generated context files should instruct agents to use keyword search (grep/ripgrep) for: checking if a filename exists, querying YAML fields (`rg '^type: tension'`), finding exact phrases, and looking up known note titles. The search modality instruction should be task-specific, not "always use the best search."

**Source:** Operational pattern in the vault: `/seed` uses keyword search to check if a source was already processed. No semantic search needed — filenames are exact-match targets.

---

#### Exploring concepts requires semantic search to cross vocabulary boundaries

**Summary:** When the agent is exploring a concept without knowing which notes are relevant, semantic search finds candidates that keyword search misses. Searching for "how agents maintain identity across sessions" might surface notes titled "session handoff creates continuity without persistent memory" and "closure rituals create clean breaks" — neither of which contains the words "identity" or "maintain" but both are deeply relevant. This is the canonical use case for embedding-based retrieval.

**Derivation Implication:** Generated systems should route conceptual exploration to semantic search (`vector_search`). This applies to: the reflect phase (finding connections for a new note), pre-creation duplicate detection (does this claim already exist under different words?), and ad-hoc research queries. The context file should teach the agent when to switch from keyword to semantic.

**Source:** Vault operational experience. The claim "vector proximity measures surface overlap not deep connection" documents both the value and limitations of this modality.

---

#### Connection finding requires hybrid search with LLM reranking

**Summary:** Finding genuine connections between notes is the highest-value search task in a knowledge system. It requires the full pipeline: BM25 for exact-term matches, vector search for vocabulary-divergent matches, query expansion for coverage, and LLM reranking to evaluate which candidates represent genuine conceptual connections rather than surface similarity. Each layer catches what the previous one misses. Skipping the reranking step produces connection suggestions that are topically related but not genuinely connected — the difference between "both mention context windows" and "this note's argument depends on that note's claim."

**Derivation Implication:** Generated systems with processing = heavy or moderate should include a hybrid search mode for the reflect and reweave phases. Systems with processing = light can skip hybrid search because they generate fewer notes and the agent can use MOC traversal + keyword search for the limited connection-finding needed.

**Source:** Vault operational experience. The reflect skill uses `mcp__qmd__deep_search` (hybrid) because connection quality justifies the ~20s latency.

---

#### Duplicate detection requires semantic search because duplicates use different words

**Summary:** The most dangerous duplicates are semantic duplicates: notes that make the same claim in different vocabulary. "Curation becomes the work when creation is easy" and "AI makes creation cheap so filtering becomes expensive" are semantic duplicates — same insight, different framing. BM25 will not catch this because the notes share almost no significant terms. Only vector embedding similarity reliably detects semantic duplicates, because the notes occupy nearby regions in embedding space despite lexical divergence.

**Derivation Implication:** Any generated system with a processing pipeline (reduce phase) should include semantic duplicate detection. The reduce skill should check each extracted claim against the existing note corpus via semantic search before creating a new note. This is a quality gate, not an optional convenience.

**Source:** Vault operational experience. The reduce skill uses `mcp__qmd__vector_search` for duplicate detection, and regularly catches duplicates that would be invisible to keyword search.

---

#### Description quality testing requires semantic search without reranking

**Summary:** Testing whether a note's description enables retrieval means searching for the note using only its description, without the title. If semantic search (without LLM reranking) finds the note from its description alone, the description is doing its job as a retrieval filter. If it fails, the description needs improvement. Using reranking would hide bad descriptions behind the LLM's ability to infer relevance — the test must use raw vector similarity to expose weak descriptions.

**Derivation Implication:** Generated systems with a verify or recite phase should use semantic search (`vector_search`, not `deep_search`) for description quality testing. The absence of reranking is intentional — it tests what agents will actually encounter during routine search.

**Source:** Vault operational experience. The recite and verify skills use `mcp__qmd__vector_search` to test description findability, specifically avoiding the deep_search tool's reranking.

---

### Implementation Guidance

#### Minimum viable search is keyword-only with MOC traversal

**Summary:** A knowledge system with only keyword search (grep/ripgrep) and MOC navigation is fully functional. MOCs provide structural navigation — following curated links from topic hubs to relevant notes. Keyword search provides precision retrieval for known terms. Together they cover the majority of retrieval needs. Semantic search adds value at scale and for cross-vocabulary discovery, but its absence does not make a system non-functional.

**Derivation Implication:** Tier-3 (convention-only) systems generate with keyword search instructions and MOC-based navigation only. No semantic search infrastructure. The context file should still describe the concept of semantic search as a future upgrade path, so the agent understands what it is missing and can recommend adding it when friction emerges.

**Source:** Gall's Law: "A complex system that works is invariably found to have evolved from a simple system that worked." The vault itself operated on keyword + MOC navigation before qmd was added.

---

#### Semantic search requires embedding infrastructure with maintenance

**Summary:** Deploying semantic search means running an embedding model, maintaining a vector index, and keeping that index synchronized with the filesystem. Embeddings go stale when notes are created, modified, or deleted without re-indexing. A stale index is worse than no index — it gives the agent false confidence that search is comprehensive when recent content is invisible. Any generated system with semantic search must include index maintenance procedures.

**Derivation Implication:** When generating semantic search configuration, always include: (1) the embedding tool or service, (2) index update commands, (3) a freshness check protocol (compare indexed document count against actual file count), and (4) instructions for what to do when the index is stale. The vault's Phase 0 freshness check pattern should be adapted for the generated system.

**Source:** Vault operational experience. The Phase 0 freshness check was added after search results missed recently created notes, causing reflect to miss connections.

---

#### Fallback chains prevent search failures from blocking work

**Summary:** Search infrastructure can fail: MCP servers crash, embedding models fail to load, vector indices become corrupt. A system that depends entirely on semantic search for connection-finding will be blocked when semantic search fails. Dual discovery paths — semantic search plus structural navigation (MOC traversal + keyword search) — ensure that work continues regardless of search infrastructure state. The fallback is not a degraded mode; it is a parallel path that is always available.

**Derivation Implication:** Every generated system must include a fallback chain in its context file. The pattern: try semantic search first, fall back to keyword search + MOC traversal if semantic fails. Never let search failure block work. For tier-1 systems: MCP tool -> CLI tool with locking -> keyword + MOC. For tier-2: CLI tool -> keyword + MOC. For tier-3: keyword + MOC is the only path (no fallback needed because it is the primary).

**Source:** Vault operational experience. The three-tier fallback pattern (MCP -> bash with lock -> grep) was developed after MCP server crashes blocked pipeline processing.

---

### Platform Adaptation

#### Claude Code enables persistent semantic search via MCP servers

**Summary:** Claude Code's MCP (Model Context Protocol) integration allows semantic search to run as a persistent server process. The qmd MCP server keeps embedding models loaded in memory between requests, eliminating the 5-10 second cold-start penalty of spawning a new process per query. This makes semantic search practical for interactive use and for pipeline phases that issue multiple queries. The MCP server also solves the parallel worker problem: a singleton LlamaCpp instance with reference-counted sessions prevents multiple workers from loading duplicate models into RAM.

**Derivation Implication:** For Claude Code (tier-1) systems, generate MCP configuration (`.mcp.json`) that points to the semantic search server. Include collection definitions matching the system's folder structure. Document the MCP tool names in the context file so the agent knows which tools to call. Note the MCP-in-subagents limitation: custom agents spawned via Task tool do not inherit MCP access, requiring the CLI fallback.

**Source:** Vault operational experience with qmd MCP server. The `.mcp.json` configuration and collection definitions are proven patterns.

---

#### Convention-only systems compensate with structured manual review

**Summary:** Systems without any search tooling (tier-3) rely entirely on the agent's ability to navigate the graph through MOCs and keyword search. This works at low-to-moderate volume because the agent can hold the full structure in context. At higher volumes, the context file should instruct the agent to periodically review topic adjacencies manually — reading MOCs in related topics and scanning for connections that keyword search would miss. This is the human-era equivalent of "browse your notes" but systematized as a periodic maintenance task.

**Derivation Implication:** For convention-only systems, generate a "Discovery Patterns" section in the context file that teaches manual cross-topic review. Include the topic adjacency pattern: after creating a note in topic A, scan the MOCs of adjacent topics (B, C) for potential connections. This compensates partially for the absence of semantic search.

**Source:** Pre-computational knowledge management practice (Luhmann's physical Zettelkasten relied on sequential browsing and register-based lookup, not search).

---

### Search Quality and Failure Modes

#### Vector proximity measures surface overlap, not deep connection

**Summary:** Embedding similarity has a fundamental limitation: it measures vocabulary and topic similarity, not genuine conceptual connection. Two notes about "context windows" — one about LLM architecture, one about UI design — may score high vector similarity because they share vocabulary, but they are not meaningfully connected. Conversely, a note about "friction in learning" and a note about "errors as pedagogical feedback" are deeply connected but may score low because they share few terms. This is why LLM reranking exists: to evaluate what vector similarity cannot — whether the conceptual relationship is genuine.

**Derivation Implication:** Generated context files should include a search quality warning: "High similarity scores do not guarantee genuine connections. When using semantic search results, evaluate each candidate: does this note's argument actually relate to what you are searching for, or does it just use similar vocabulary?" This is especially important for the reflect phase where false connections degrade graph quality.

**Source:** Research claim: "vector proximity measures surface overlap not deep connection." Vault operational experience: reflect phases using vector_search without reranking occasionally propose surface-similar but conceptually unrelated connections.

---

#### Stale indices produce false confidence that is worse than no index

**Summary:** When the semantic search index falls out of sync with the filesystem — notes created after the last index update, notes modified without re-embedding, notes deleted but still in the index — the agent receives search results that omit recent content. The danger is not the missing results themselves but the agent's trust in search comprehensiveness. An agent that believes "I searched and found nothing similar" when the search actually missed 10 recently created notes will create a duplicate without realizing it. No index is honest; a stale index lies.

**Derivation Implication:** Every generated system with semantic search must include an index staleness detection mechanism. The minimum viable implementation: compare the count of indexed documents against the count of actual files. If they differ, run index update before trusting search results. The context file should frame this as a mandatory pre-search step, not an optional maintenance task. The vault's Phase 0 freshness check is the reference pattern.

**Source:** Vault operational failure. Notes created during a processing batch were invisible to reflect phases that ran before index sync, producing duplicate notes and missing connections.

---

#### BM25 query dilution occurs when full descriptions are used as search queries

**Summary:** BM25 scores documents by term frequency and inverse document frequency. When the search query itself is long (e.g., a full 150-character description), the query contains many terms, each with low individual weight. This dilution effect means that long queries return fewer and lower-quality BM25 results compared to short, focused keyword queries. The solution is to use condensed keywords or phrases for BM25 search, reserving full-text descriptions for semantic search where the embedding model handles longer inputs gracefully.

**Derivation Implication:** Generated context files that instruct agents on search usage should distinguish between query formulation for keyword search (short, focused terms) and query formulation for semantic search (natural language descriptions). A single instruction like "search for your concept" is insufficient — the agent needs to know how to phrase queries differently for each modality.

**Source:** Vault operational experience. Full-length descriptions used as BM25 queries via `mcp__qmd__search` frequently returned zero results, while the same descriptions used via `mcp__qmd__vector_search` returned accurate matches.

---

### Search Mode Selection Matrix

#### Volume determines the minimum viable search configuration

**Summary:** The relationship between note volume and search modality requirements follows clear thresholds. Below 50 notes, the agent can read all descriptions and navigate the full MOC structure — keyword search suffices. Between 50-200 notes, vocabulary divergence begins to create blind spots that semantic search addresses. Above 200 notes, keyword search alone produces retrieval failures for cross-vocabulary concepts. These thresholds are approximate but directionally reliable across domains.

**Derivation Implication:** The derivation engine should use expected volume trajectory (not current volume) to configure search. A system starting at 10 notes but expected to reach 200+ should be configured for semantic search from the start, with the understanding that it provides little value initially but prevents a painful mid-life reconfiguration.

**Source:** Vault experience and information retrieval theory. Vocabulary divergence grows logarithmically with corpus size (Heaps' Law), creating an increasing gap between what keyword search finds and what exists.

---

#### Domain breadth determines how quickly vocabulary diverges

**Summary:** A narrow-domain system (e.g., tracking one sport's strategy) uses consistent terminology. "Opening move," "midgame position," and "endgame technique" are standard vocabulary that all notes share. Keyword search works well because the vocabulary is constrained. A broad or cross-domain system (e.g., tools for thought research that draws from cognitive science, information retrieval, software engineering, and philosophy) accumulates vocabulary divergence rapidly because each source domain brings its own terminology for overlapping concepts. "Context window" (LLM architecture), "working memory" (cognitive science), and "attention budget" (productivity) all describe related limitations but use completely different terms.

**Derivation Implication:** Cross-domain systems should receive semantic search earlier in their lifecycle than single-domain systems. The derivation engine should ask about domain breadth during init and adjust search modality recommendations accordingly. A system spanning 3+ source domains should probably start with semantic search enabled regardless of initial volume.

**Source:** Information retrieval research on vocabulary mismatch in cross-domain corpora. Vault operational experience: the vault draws from 6+ source domains and experienced vocabulary divergence from the first 30 notes.

---

#### Processing intensity amplifies vocabulary divergence

**Summary:** Heavy processing (extraction, reformulation, synthesis) generates more varied phrasings of the same concepts than light processing. Each reduce pass produces notes that reformulate source material in the agent's own words. Each reweave pass may further rephrase claims as understanding deepens. This compounding reformulation means heavy-processing systems accumulate vocabulary divergence faster than light-processing systems at the same note count, increasing the value of semantic search earlier in the system's lifecycle.

**Derivation Implication:** Adjust the volume thresholds for search modality based on processing intensity. Heavy processing: semantic search becomes valuable at ~30 notes. Moderate processing: ~75 notes. Light processing: ~150 notes. These adjusted thresholds reflect how quickly vocabulary divergence accumulates.

**Source:** Vault operational observation. After heavy /reduce processing of 5 sources, the vault had significant vocabulary divergence across ~80 notes — concepts expressed in source-author vocabulary, vault-native vocabulary, and synthesized vocabulary.

---

### Modality Cost-Benefit Analysis

#### The cost structure of search modalities follows an exponential curve

**Summary:** Keyword search costs O(n) where n is corpus size — essentially free on modern hardware. Semantic search (vector similarity) costs O(1) per query against a pre-built index, but building and maintaining the index costs O(n) per update and requires ~2GB of model memory. Hybrid search with LLM reranking adds O(k) where k is the number of candidates reranked — each candidate requires an LLM inference pass. The practical costs: keyword ~0.2s, semantic ~5s, hybrid ~20s. The quality improvement at each step is diminishing: keyword to semantic is a large jump, semantic to hybrid is a smaller jump, but hybrid catches connections that semantic alone misses in ~15% of cases.

**Derivation Implication:** The cost-quality tradeoff informs which search mode to default to. For routine operations (file lookup, YAML queries), keyword is the only rational choice. For standard discovery (exploring related notes), semantic provides the best cost-quality ratio. For high-stakes connection finding (reflect, reweave), hybrid is justified by the quality premium. Generated context files should encode this cost awareness so agents do not default to the most expensive mode for routine tasks.

**Source:** Vault operational measurements. The 0.2s / 5s / 20s benchmarks are from qmd running on Apple Silicon with models kept warm.

---

#### Search configuration should be generated as a decision table, not a default

**Summary:** Rather than setting a single default search mode, the generated context file should include a decision table mapping tasks to modalities. The agent should know: "For this task, use this search mode, because X." This is more effective than a global default because different tasks within the same session require different modalities. A single session might use keyword search for YAML queries, semantic search for duplicate checking, and hybrid search for connection finding — three modalities in one session, each justified by the task at hand.

**Derivation Implication:** Generate a task-to-modality mapping table in every context file that includes search instructions. The table should list the system's operational tasks (the ones defined by its processing pipeline and maintenance routine) and the appropriate search modality for each. This is the search equivalent of the pre-task context router — it routes tasks to appropriate search modes.

**Source:** Vault CLAUDE.md "Which mode for which skill" table. This task-specific routing replaced an earlier pattern where agents defaulted to hybrid search for everything, wasting 20 seconds on lookups that keyword search handles in 0.2 seconds.

---

## Exclusion Notes

**Excluded from this reference:**

- Full-text search engine comparisons (Elasticsearch, Solr, Meilisearch) — these are infrastructure choices, not derivation decisions. The derivation engine selects modalities, not implementations.
- Embedding model selection (which model to use for vectors) — implementation detail that belongs in platform-specific documentation, not derivation reference.
- RAG (Retrieval Augmented Generation) pipeline architecture — the vault's wiki-link graph is explicitly NOT a RAG system. Wiki links provide curated edges; RAG provides automated chunk retrieval. Different paradigms.
- Image or multimodal search — the vault is text-only. Multimodal search is a future consideration, not a current derivation concern.
- Real-time indexing vs batch indexing trade-offs — operational concern for the search tool maintainer, not a derivation decision.

---

## Version

- Last curated: 2026-02-12
- Sources reviewed: 22
- Claims included: 23
- Claims excluded: 5
- Cross-references: `kernel.yaml` (semantic-search primitive), `interaction-constraints.md` (volume cascade, linking dimension), `components.md` (Search component blueprint), `methodology.md` (key research claims on retrieval), `claim-map.md` (discovery-retrieval topic)
