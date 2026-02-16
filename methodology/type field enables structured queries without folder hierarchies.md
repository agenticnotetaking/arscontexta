---
description: Content-kind metadata (claim, synthesis, tension) provides a query axis orthogonal to wiki link topology, enabling "find all synthesis notes about X" without folder trees
kind: research
topics: ["[[discovery-retrieval]]"]
source: TFT research corpus (00_inbox/heinrich/)
---

# type field enables structured queries without folder hierarchies

Traditional knowledge systems use folders to categorize content by kind: a folder for sources, a folder for synthesis, a folder for drafts. This works but creates a problem: each note can only live in one folder, so you choose between organizing by topic or organizing by type. The folder hierarchy forces a single taxonomic axis. Since [[topological organization beats temporal for knowledge work]], flat structure with wiki links is already preferable — but flat structure alone doesn't provide category-based retrieval. Type metadata fills that gap.

Type metadata dissolves this trade-off. Since [[faceted classification treats notes as multi-dimensional objects rather than folder contents]], each YAML field is an independent classification dimension -- a facet in Ranganathan's terminology. Type is one such facet: when each note carries a `type:` field (claim, synthesis, tension, methodology, problem, learning), you can query by content kind without folder structure. Want all tension notes? `rg "^type: tension"`. Want synthesis notes about retrieval? Search the thinking folder for synthesis type and retrieval keywords. The flat folder stays flat while structured queries become possible.

This matters for agent navigation because since [[role field makes graph structure explicit]], agents already have a dimension describing WHERE a note sits in the graph. Type provides an orthogonal dimension describing WHAT KIND of content it is. A note can be:

- A claim (type) that functions as a hub (role)
- A synthesis (type) that functions as a leaf (role)
- A methodology note (type) that functions as a moc (role)

Neither dimension collapses into the other. Role tells you how to traverse. Type tells you what you're reading.

The query patterns this enables:

| Query | Command | What It Finds |
|-------|---------|---------------|
| All methodology notes | `rg "^type: methodology"` | Implementation patterns, features to build |
| All problems | `rg "^type: problem"` | Anti-patterns, failure modes |
| Unresolved tensions | `rg "^type: tension" -l \| xargs rg "^status: open"` | Conflicts needing resolution |
| Synthesis about X | `qmd query "X" + type: synthesis` | High-level arguments on topic |

Without type metadata, you'd need either folder hierarchies (limiting notes to one category) or manual list maintenance (tracking "all synthesis notes" in a separate file). Type metadata makes the category intrinsic to the note, queryable anywhere, without forcing hierarchical organization.

Since [[live index via periodic regeneration keeps discovery current]], type-based queries become even more powerful when pre-computed. A maintenance agent can regenerate type indices at change boundaries, giving agents instant access to "all methodology notes" or "all unresolved tensions" without the query cost at decision time. The query patterns above work with JIT ripgrep, but pre-computed type indices would make them free to load.

Type metadata is a concrete instance of what since [[markdown plus YAML plus ripgrep implements a queryable graph database without infrastructure]] identifies as the broader pattern: each YAML field is a queryable property in a graph database where ripgrep replaces SQL. The `rg "^type: tension"` query pattern this note demonstrates is functionally equivalent to a graph database property query, and when combined with other YAML field filters (methodology, topics, status), the piped commands achieve the multi-attribute precision that graph database query languages provide through WHERE clause conjunction.

The design decision in this vault treats type as optional for standard claims because claims are the default. You only add `type:` when the note is something other than a straightforward assertion. This keeps YAML minimal while enabling structured queries when needed. Since [[descriptions are retrieval filters not summaries]], the type field adds an orthogonal retrieval dimension: descriptions filter by relevance to a query, while type filters by content kind. An agent asking "find methodology notes about X" can filter first by type, then by semantic relevance — two independent axes that multiply filtering power.
---

Relevant Notes:
- [[markdown plus YAML plus ripgrep implements a queryable graph database without infrastructure]] — synthesis: type is one queryable property in the four-layer graph database; the ripgrep query patterns this note demonstrates are property queries on graph nodes
- [[role field makes graph structure explicit]] — the orthogonal dimension: role describes graph position while type describes content kind
- [[metadata reduces entropy enabling precision over recall]] — type metadata increases precision when searching for specific content kinds
- [[topological organization beats temporal for knowledge work]] — the foundational choice that makes type metadata necessary: flat folders need queryable dimensions
- [[associative ontologies beat hierarchical taxonomies because heterarchy adapts while hierarchy brittles]] — explains WHY flat structure plus type metadata works: associative relationships adapt while folder hierarchies brittle
- [[descriptions are retrieval filters not summaries]] — descriptions and type are complementary filter dimensions: relevance vs content kind
- [[maturity field enables agent context prioritization]] — sibling metadata proposal: maturity tracks development stage while type tracks content kind
- [[question-answer metadata enables inverted search patterns]] — sibling metadata proposal: questions enable inverted search while type enables category filtering
- [[live index via periodic regeneration keeps discovery current]] — pre-computed type indices make category queries free at decision time
- [[faceted classification treats notes as multi-dimensional objects rather than folder contents]] — theoretical framework: type is one facet in Ranganathan's multi-dimensional classification; the PMEST framework explains why each metadata field is an independent query dimension and provides the independence test for new fields

Topics:
- [[discovery-retrieval]]
