# Feature: Graph Analysis

## Context File Block

```markdown
## Graph Analysis — Your Vault as a Queryable Database

Your wiki-linked vault is not just a folder of markdown files. It is a graph database:

- **Nodes** are markdown files (your {DOMAIN:notes})
- **Edges** are wiki links (`[[connections]]` between {DOMAIN:notes})
- **Properties** are YAML frontmatter fields (structured metadata on every node)
- **Query engine** is ripgrep (`rg`) operating over structured text

This means every question you can ask about a graph database — "what connects to what?", "where are the clusters?", "what is isolated?" — you can answer with standard command-line tools. No external database required. The filesystem IS the database.

### Three Query Levels

Graph queries operate at three levels of increasing sophistication:

#### Level 1: Field-Level Queries (Property Inspection)

Query individual YAML fields across {DOMAIN:notes}:

```bash
# Find all {DOMAIN:notes} of a specific type
rg '^type: pattern' {DOMAIN:notes}/

# Scan descriptions for a concept
rg '^description:.*friction' {DOMAIN:notes}/

# Find {DOMAIN:notes} missing required fields
rg -L '^description:' {DOMAIN:notes}/*.md

# Find {DOMAIN:notes} by {DOMAIN:topic map}
rg '^topics:.*\[\[methodology\]\]' {DOMAIN:notes}/

# Cross-field queries (combine with xargs)
rg -l '^type: tension' {DOMAIN:notes}/ | xargs rg '^status: pending'
```

Field-level queries answer: "What properties do my {DOMAIN:notes} have?" They are fast, precise, and require no external tools.

#### Level 2: Node-Level Queries (Neighborhood Inspection)

Query a specific {DOMAIN:note}'s relationships — what it links to, what links to it:

```bash
# Find all outgoing links from a {DOMAIN:note}
./ops/scripts/graph/extract-links.sh "{DOMAIN:note} title"

# Find all incoming links (backlinks) to a {DOMAIN:note}
./ops/scripts/backlinks.sh "{DOMAIN:note} title"

# Count connections
./ops/scripts/backlinks.sh "{DOMAIN:note} title" --count
```

Node-level queries answer: "What is this {DOMAIN:note}'s neighborhood?" They reveal a single node's context within the larger graph.

#### Level 3: Graph-Level Queries (Structural Analysis)

Query the graph's topology — clusters, bridges, synthesis opportunities, influence patterns:

```bash
# Find synthesis opportunities (open triangles)
./ops/scripts/graph/find-triangles.sh

# Detect isolated clusters
./ops/scripts/graph/find-clusters.sh

# Find structurally critical {DOMAIN:notes}
./ops/scripts/graph/find-bridges.sh

# Measure overall graph health
./ops/scripts/link-density.sh
```

Graph-level queries answer: "What does the structure of my knowledge look like?" They reveal patterns invisible from any single {DOMAIN:note}.

### Available Graph Operations

#### Traversal Operations

Navigate the graph from any starting point:

| Operation | Script | What It Does |
|-----------|--------|-------------|
| Forward N-hop | `graph/n-hop-forward.sh "{DOMAIN:note}" [depth]` | Find everything reachable within N links from a starting {DOMAIN:note}. Depth 1 shows direct connections; depth 2 shows connections-of-connections. Useful for understanding a concept's reach. |
| Backward N-hop | `graph/recursive-backlinks.sh "{DOMAIN:note}" [depth]` | Find everything that leads TO a {DOMAIN:note} within N hops. Reveals what lines of thought converge on a concept. |
| Link extraction | `graph/extract-links.sh "{DOMAIN:note}"` | List all wiki links in a specific {DOMAIN:note}. The raw edge list from a single node. |

#### Synthesis Operations

Detect opportunities for new connections and insights:

| Operation | Script | What It Does |
|-----------|--------|-------------|
| Triangle detection | `graph/find-triangles.sh` | Find open triadic closures: {DOMAIN:note} A links to B, A links to C, but B and C do not link to each other. These are synthesis opportunities — two concepts connected through a shared parent but not yet directly related. |
| Topic siblings | `graph/topic-siblings.sh "{DOMAIN:topic map}"` | Find {DOMAIN:notes} in the same {DOMAIN:topic map} that do not link to each other. Notes that share a topic but lack direct connections often reveal unexplored relationships. |

Triangle detection is particularly powerful because it finds structural gaps that browsing cannot detect. When A links to B and A links to C, there is often a genuine relationship between B and C that was simply not captured. The script surfaces these candidates for human judgment — not every open triangle should close, but many reveal real connections.

#### Structural Operations

Understand the architecture of your knowledge graph:

| Operation | Script | What It Does |
|-----------|--------|-------------|
| Cluster detection | `graph/find-clusters.sh` | Find connected components — groups of {DOMAIN:notes} that link to each other but not to other groups. Reveals topic boundaries and isolated knowledge islands. |
| Bridge detection | `graph/find-bridges.sh` | Find bridge {DOMAIN:notes} — nodes whose removal would disconnect parts of the graph. These are structurally critical and may need splitting to reduce fragility. |
| Connected components | `graph/find-clusters.sh --components` | Count the number of separate connected subgraphs. A healthy vault is one large connected component. Multiple components suggest domain silos. |

#### Density Operations

Measure the health of your graph's connectivity:

| Operation | Script | What It Does |
|-----------|--------|-------------|
| Link density | `link-density.sh` | Average outgoing links per {DOMAIN:note}. Target: 3+ links per {DOMAIN:note}. Below this, the graph is sparse and traversal is unreliable. |
| Orphan detection | `orphan-notes.sh` | {DOMAIN:Notes} with zero incoming links. Invisible to traversal — they exist but no path leads to them. |
| Dangling links | `dangling-links.sh` | Wiki links pointing to {DOMAIN:notes} that do not exist. Demand signals for what should be created. |

#### Centrality Operations

Identify the most important and influential {DOMAIN:notes}:

| Operation | Script | What It Does |
|-----------|--------|-------------|
| Hub/authority ranking | `graph/influence-flow.sh` | Ranks {DOMAIN:notes} by link patterns. Hubs are {DOMAIN:notes} with many outgoing links (they point to lots of things). Authorities are {DOMAIN:notes} with many incoming links (lots of things point to them). Synthesizers have both high incoming and high outgoing — they integrate knowledge. |

#### Schema Queries

Use YAML frontmatter as a queryable property layer:

```bash
# All {DOMAIN:notes} by methodology tradition
rg '^methodology:.*Zettelkasten' {DOMAIN:notes}/

# Unresolved tensions
rg -l '^type: tension' {DOMAIN:notes}/ | xargs rg '^status: pending'

# {DOMAIN:Notes} adapted from human patterns
rg '^adapted_from: ' {DOMAIN:notes}/ | grep -v 'null'

# Combined methodology synthesis {DOMAIN:notes}
rg '^methodology: \[' {DOMAIN:notes}/ | grep -E '\[.*,.*\]'

# {DOMAIN:Notes} without source attribution
rg -L '^source:' {DOMAIN:notes}/*.md
```

Schema queries are domain-adapted: the specific fields and enum values come from your templates. Every schema field becomes a query dimension. Combining dimensions surfaces cross-cutting insights that browsing alone cannot find.

### The /graph Command

Use /{DOMAIN:analyze} for interactive graph analysis. Ask questions in natural language or use explicit operation names:

```
/{DOMAIN:analyze} "What connects to [[{DOMAIN:note} title]]?"
/{DOMAIN:analyze} triangles
/{DOMAIN:analyze} "Where are synthesis opportunities?"
/{DOMAIN:analyze} orphans
/{DOMAIN:analyze} "What are the most influential {DOMAIN:notes}?"
/{DOMAIN:analyze} density
```

The command routes to the appropriate script(s), interprets results in domain vocabulary, and suggests concrete actions. Results always include context (descriptions, relationship types), not bare file lists. Large result sets are summarized with top findings rather than dumped in full.

### When to Use Each Operation Type

| Situation | Operation | Why |
|-----------|-----------|-----|
| Just created new {DOMAIN:notes} | Triangle detection + topic siblings | Find connections you missed during creation |
| Graph feels disconnected | Cluster detection + bridge analysis | Understand the structure and find linking opportunities |
| Preparing for a synthesis session | Forward N-hop from key {DOMAIN:notes} | Map the neighborhood before writing |
| Health check | Orphan detection + dangling links + density | Standard diagnostic pass |
| Prioritizing maintenance | Influence flow + bridge detection | Focus on structurally important {DOMAIN:notes} first |
| Exploring a new topic | Backward N-hop to the {DOMAIN:topic map} | See what converges on this topic |
| Schema audit | Field-level queries across all {DOMAIN:notes} | Verify consistency and completeness |

### Limitations

Graph analysis scripts find structural patterns — they cannot assess whether a connection is intellectually warranted. Triangle detection reveals that B and C share a parent but are not linked; it cannot tell you whether B and C SHOULD be linked. That judgment is yours. Use structural analysis to find candidates, then apply intellectual judgment to evaluate them.
```

## Dependencies
Requires: wiki-links (graph edges depend on wiki link infrastructure), schema (property queries depend on structured YAML)
