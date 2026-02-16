---
description: Progressive disclosure, description quality, findability -- how notes get discovered by agents and humans
type: moc
---

# discovery-retrieval

How notes get found. Description quality, title composability, semantic search, topic map navigation. The discovery-first design principle applied across the system.

## Core Ideas

### Research
- [[BM25 retrieval fails on full-length descriptions because query term dilution reduces match scores]] -- When a BM25 query contains many terms, each term's IDF contribution gets diluted by common words competing for scoring b
- [[complete navigation requires four complementary types that no single mechanism provides]] -- Rosenfeld and Morville's global, local, contextual, and supplemental navigation types map onto hub, MOC, wiki link, and 
- [[description quality for humans diverges from description quality for keyword search]] -- Descriptions that pass prediction tests (5/5) can fail BM25 retrieval because human-scannable prose uses connective voca
- [[descriptions are retrieval filters not summaries]] -- Note descriptions function as lossy compression enabling agents to filter before loading full content, which is informat
- [[distinctiveness scoring treats description quality as measurable]] -- NLP-based validation tool that computes pairwise description similarity to flag retrieval confusion risk, operationalizi
- [[faceted classification treats notes as multi-dimensional objects rather than folder contents]] -- Ranganathan's 1933 PMEST framework formalizes why each YAML field should be an independent classification dimension — fa
- [[flat files break at retrieval scale]] -- unstructured storage works until you need to find things — then search becomes the bottleneck, and for agents, retrieval
- [[good descriptions layer heuristic then mechanism then implication]] -- Structure descriptions as three layers — lead with actionable heuristic, back with mechanism, end with operational impli
- [[live index via periodic regeneration keeps discovery current]] -- A maintenance agent regenerating index files on note changes bridges static indices that go stale with dynamic queries t
- [[markdown plus YAML plus ripgrep implements a queryable graph database without infrastructure]] -- Wiki link edges, YAML metadata, faceted query dimensions, and soft validation compose into graph database capabilities w
- [[maturity field enables agent context prioritization]] -- A seedling/developing/evergreen maturity field could help agents prefer mature notes when context is tight and surface s
- [[metadata reduces entropy enabling precision over recall]] -- Without metadata agents rely on full-text search which returns many irrelevant matches; YAML frontmatter pre-computes lo
- [[narrow folksonomy optimizes for single-operator retrieval unlike broad consensus tagging]] -- Thomas Vander Wal's broad/narrow distinction explains why vault tagging uses idiosyncratic sentence-titles instead of co
- [[progressive disclosure means reading right not reading less]] -- The efficiency framing misses the point — tokens are free, quality requires depth, so the goal is a dense relevant conte
- [[question-answer metadata enables inverted search patterns]] -- An 'answers' YAML field listing questions a note answers could enable question-driven search rather than keyword-driven 
- [[retrieval utility should drive design over capture completeness]] -- System architecture choices should optimize for "how will I find this later" not "where should I put this" — a design or
- [[retrieval verification loop tests description quality at scale]] -- Systematic scoring across all vault notes turns description quality from subjective judgment into measurable property, e
- [[sense-making vs storage does compression lose essential nuance]] -- The vault bets that titles plus descriptions plus full content available preserves enough, but very subtle or contextual
- [[structure enables navigation without reading everything]] -- Four structural mechanisms — wiki links, MOCs, claim titles, and YAML descriptions — compose into discovery layers that 
- [[the AgentSkills standard embodies progressive disclosure at the skill level]] -- The same metadata-then-depth loading pattern that governs note retrieval in the vault also governs skill loading in the 
- [[type field enables structured queries without folder hierarchies]] -- Content-kind metadata (claim, synthesis, tension) provides a query axis orthogonal to wiki link topology, enabling "find
- [[wiki links create navigation paths that shape retrieval]] -- wiki links are curated graph edges that implement GraphRAG-style retrieval without infrastructure — each link is a retri

## Tensions

(Capture conflicts as they emerge)

## Open Questions

- What description quality threshold maximizes retrieval accuracy?
- How does semantic search interact with explicit wiki-link navigation?

---

Topics:
- [[index]]
