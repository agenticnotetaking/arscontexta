---
name: graph
description: Interactive knowledge graph analysis. Routes natural language questions to graph scripts, interprets results in domain vocabulary, and suggests concrete actions. Triggers on "/graph", "/graph health", "/graph triangles", "find synthesis opportunities", "graph analysis".
version: "1.0"
generated_from: "arscontexta-v1.6"
user-invocable: true
context: fork
model: sonnet
allowed-tools: Read, Grep, Glob, Bash
argument-hint: "[operation] [target] — operations: health, triangles, bridges, clusters, hubs, siblings, forward, backward, query"
---

## Runtime Configuration (Step 0 — before any processing)

Read these files to configure domain-specific behavior:

1. **`ops/derivation-manifest.md`** — vocabulary mapping, platform hints
   - Use `vocabulary.notes` for the notes folder name
   - Use `vocabulary.note` / `vocabulary.note_plural` for note type references
   - Use `vocabulary.topic_map` / `vocabulary.topic_map_plural` for MOC references
   - Use `vocabulary.cmd_reflect` for connection-finding command name
   - Use `vocabulary.cmd_reweave` for backward-pass command name

2. **`ops/config.yaml`** — for graph thresholds (MOC size limits, orphan thresholds)

If no derivation file exists, use universal terms (notes, MOCs, etc.).

---

## EXECUTE NOW

**Target: $ARGUMENTS**

Parse the operation from arguments:
- If arguments match a known operation: route to that operation
- If arguments are a natural language question: map to the closest operation (see Interactive Mode)
- If no arguments: enter interactive mode

**START NOW.** Route to the appropriate operation.

---

## Philosophy

**The graph IS the knowledge. This skill makes it visible.**

Individual {vocabulary.note_plural} are valuable, but their connections create compound value. /graph reveals the structural properties of those connections — where the graph is dense, where it is sparse, where it is fragile, and where synthesis opportunities hide.

Every operation produces two things: **findings** (what the analysis reveals) and **actions** (what to do about it). Never dump raw data. Always interpret results with {vocabulary.note} descriptions and domain context. Always suggest specific next steps.

---

## Operations

### /graph health

Full graph health report: density, orphans, dangling links, coverage.

**Step 1: Collect raw metrics**

```bash
# Count total notes (excluding MOCs)
NOTES_DIR="{vocabulary.notes}"
TOTAL=$(ls -1 "$NOTES_DIR"/*.md 2>/dev/null | wc -l | tr -d ' ')
MOC_COUNT=$(grep -rl '^type: moc' "$NOTES_DIR"/*.md 2>/dev/null | wc -l | tr -d ' ')
NOTE_COUNT=$((TOTAL - MOC_COUNT))

# Count all wiki links
LINK_COUNT=$(grep -ohP '\[\[[^\]]+\]\]' "$NOTES_DIR"/*.md 2>/dev/null | wc -l | tr -d ' ')

# Calculate link density
# Density = actual_links / possible_links
# possible_links = N * (N - 1) for directed graph
echo "Density: $LINK_COUNT / ($NOTE_COUNT * ($NOTE_COUNT - 1))"

# Find orphan notes (zero incoming links)
for f in "$NOTES_DIR"/*.md; do
  NAME=$(basename "$f" .md)
  INCOMING=$(grep -rl "\[\[$NAME\]\]" "$NOTES_DIR"/ 2>/dev/null | grep -v "$f" | wc -l | tr -d ' ')
  [[ "$INCOMING" -eq 0 ]] && echo "ORPHAN: $NAME"
done

# Find dangling links (links to non-existent files)
grep -ohP '\[\[([^\]]+)\]\]' "$NOTES_DIR"/*.md 2>/dev/null | sort -u | while read -r link; do
  NAME=$(echo "$link" | sed 's/\[\[//;s/\]\]//')
  [[ ! -f "$NOTES_DIR/$NAME.md" ]] && echo "DANGLING: $NAME"
done

# MOC coverage: % of notes appearing in at least one MOC's Core Ideas
COVERED=0
for f in "$NOTES_DIR"/*.md; do
  NAME=$(basename "$f" .md)
  # Skip MOCs themselves
  grep -q '^type: moc' "$f" 2>/dev/null && continue
  # Check if any MOC links to this note
  if grep -rl '^type: moc' "$NOTES_DIR"/*.md 2>/dev/null | xargs grep -l "\[\[$NAME\]\]" >/dev/null 2>&1; then
    COVERED=$((COVERED + 1))
  fi
done
echo "Coverage: $COVERED / $NOTE_COUNT"
```

If graph helper scripts exist in `ops/scripts/graph/`, use them instead of inline analysis:
- `ops/scripts/graph/link-density.sh` for density metrics
- `ops/scripts/graph/orphan-notes.sh` for orphan detection
- `ops/scripts/graph/dangling-links.sh` for dangling link detection

**Step 2: Interpret and present**

```
--=={ graph health }==--

  {vocabulary.note_plural}: [N] (plus [M] {vocabulary.topic_map_plural})
  Connections: [N] (avg [X] per {vocabulary.note})
  Graph density: [0.XX]
  {vocabulary.topic_map} coverage: [N]% of {vocabulary.note_plural} appear in at least one {vocabulary.topic_map}

  Orphans ([N]):
    - [[orphan name]] — [description from YAML]
    → Suggestion: Run /{vocabulary.cmd_reflect} to find connections

  Dangling Links ([N]):
    - [[missing name]] — referenced from [[source note]]
    → Suggestion: Create the {vocabulary.note} or remove the link

  {vocabulary.topic_map} Sizes:
    - [[moc name]]: [N] {vocabulary.note_plural} [OK | WARN: approaching split threshold | WARN: consider merging]

  Overall: [HEALTHY | NEEDS ATTENTION | FRAGMENTED]
```

**Density benchmarks:**

| Density | Interpretation |
|---------|---------------|
| < 0.02 | Sparse — {vocabulary.note_plural} exist but connections are thin |
| 0.02-0.06 | Healthy — growing network with meaningful connections |
| 0.06-0.15 | Dense — well-connected, watch for over-linking |
| > 0.15 | Very dense — verify connections are genuine, not noise |

### /graph triangles

Find synthesis opportunities — open triadic closures where A links to B and A links to C, but B does not link to C.

**Step 1: Build adjacency data**

```bash
# For each note, extract outgoing wiki links
for f in "$NOTES_DIR"/*.md; do
  NAME=$(basename "$f" .md)
  LINKS=$(grep -oP '\[\[([^\]]+)\]\]' "$f" 2>/dev/null | sed 's/\[\[//;s/\]\]//' | sort -u)
  echo "FROM:$NAME"
  echo "$LINKS" | while read -r target; do
    [[ -n "$target" ]] && echo "  TO:$target"
  done
done
```

If `ops/scripts/graph/find-triangles.sh` exists, use it directly.

**Step 2: Find open triangles**

For each note A with outgoing links to B and C:
1. Check if B links to C (in either direction)
2. Check if C links to B (in either direction)
3. If neither link exists: this is an open triangle (synthesis opportunity)

**Step 3: Evaluate and rank**

For each open triangle:
1. Read descriptions of BOTH unlinked {vocabulary.note_plural}
2. Assess: is there a genuine conceptual relationship that the common parent suggests?
3. Rank by potential value: how surprising and useful would the connection be?

**Step 4: Present top findings**

```
--=={ graph triangles }==--

  Found [N] synthesis opportunities — pairs of {vocabulary.note_plural} that share
  a common reference but do not reference each other:

  1. [[note B]] and [[note C]]
     Common parent: [[note A]]
     B: "[description]"
     C: "[description]"
     → These may benefit from a connection because [specific reasoning
        about WHY B and C might relate through A's lens]
     → Action: Run /{vocabulary.cmd_reflect} on [[note B]] to evaluate

  2. [[note D]] and [[note E]]
     Common parent: [[note F]]
     ...

  [Show top 10. If more exist: "[N] more triangles found. Show all? (yes/no)"]
```

**Filter out trivial triangles:** Skip pairs where:
- Both are in the same {vocabulary.topic_map} (they may already be related through the MOC without direct links)
- One is a {vocabulary.topic_map} itself (MOCs link to everything, triangles with MOCs are noise)
- The descriptions suggest no conceptual overlap

### /graph bridges

Identify structurally critical {vocabulary.note_plural} whose removal would disconnect graph regions.

**Step 1: Build adjacency list**

Build a bidirectional adjacency list from all wiki links in {vocabulary.notes}/.

If `ops/scripts/graph/find-bridges.sh` exists, use it directly.

**Step 2: Find bridge nodes**

A bridge note is one where:
- Removing it (and its links) would split a connected component into two or more components
- It is the SOLE connection between clusters of {vocabulary.note_plural}

Implementation: For each note, temporarily remove it and check if the remaining graph has more connected components.

**Step 3: Present findings**

```
--=={ graph bridges }==--

  Found [N] bridge {vocabulary.note_plural} — structurally critical nodes whose
  removal would disconnect graph regions:

  1. [[bridge note]] — connects [N] {vocabulary.note_plural} on one side to [M] on the other
     Description: "[description]"
     Cluster A: [[note1]], [[note2]], ...
     Cluster B: [[note3]], [[note4]], ...
     → Risk: If this {vocabulary.note} becomes stale, [N+M] {vocabulary.note_plural}
       lose their connection path
     → Action: Consider adding parallel connections between the clusters

  [If no bridges: "No bridge notes found. The graph has redundant paths between
   all connected regions. This is healthy."]
```

### /graph clusters

Discover connected components and topic boundaries.

**Step 1: Build adjacency list**

Build a bidirectional adjacency list from all wiki links.

If `ops/scripts/graph/find-clusters.sh` exists, use it directly.

**Step 2: Find connected components**

Use BFS/DFS to find all connected components:
1. Start with any unvisited note
2. Traverse all reachable notes via wiki links (bidirectional)
3. Mark as one component
4. Repeat until all notes visited

**Step 3: Analyze clusters**

For each cluster:
- Size (number of {vocabulary.note_plural})
- Key {vocabulary.note_plural} (highest link count within cluster)
- Topic coverage (which {vocabulary.topic_map_plural} are represented)
- Isolation level (how many links cross cluster boundaries)

**Step 4: Present findings**

```
--=={ graph clusters }==--

  Found [N] connected components:

  Cluster 1: [size] {vocabulary.note_plural}
    Key nodes: [[note1]] (8 links), [[note2]] (6 links)
    Topics: [[topic A]], [[topic B]]
    Cross-cluster links: [N]
    → This cluster is [well-connected | isolated | a hub]

  Cluster 2: [size] {vocabulary.note_plural}
    ...

  Isolated {vocabulary.note_plural} ([N]):
    - [[isolated note]] — [description]
    → Action: Run /{vocabulary.cmd_reflect} to find connections

  [If 1 cluster: "All {vocabulary.note_plural} are in one connected component.
   The graph is fully connected. This is healthy."]
```

### /graph hubs

Rank {vocabulary.note_plural} by influence — most-linked-to (authorities) and most-linking-from (hubs).

**Step 1: Count links**

```bash
# Authority score: incoming links per note
for f in "$NOTES_DIR"/*.md; do
  NAME=$(basename "$f" .md)
  INCOMING=$(grep -rl "\[\[$NAME\]\]" "$NOTES_DIR"/ 2>/dev/null | grep -v "$f" | wc -l | tr -d ' ')
  echo "AUTH:$INCOMING:$NAME"
done | sort -t: -k2 -rn | head -10

# Hub score: outgoing links per note
for f in "$NOTES_DIR"/*.md; do
  NAME=$(basename "$f" .md)
  OUTGOING=$(grep -oP '\[\[[^\]]+\]\]' "$f" 2>/dev/null | wc -l | tr -d ' ')
  echo "HUB:$OUTGOING:$NAME"
done | sort -t: -k2 -rn | head -10
```

If `ops/scripts/graph/influence-flow.sh` exists, use it directly.

**Step 2: Identify synthesizers**

Synthesizer {vocabulary.note_plural} score high on BOTH metrics — they absorb many inputs (high authority) and produce many outputs (high hub). These are the most structurally important {vocabulary.note_plural} in the graph.

**Step 3: Present findings**

```
--=={ graph hubs }==--

  Top Authorities (most-linked-to):
    1. [[note]] — [N] incoming links — "[description]"
    2. [[note]] — [N] incoming links — "[description]"
    ...

  Top Hubs (most-linking-from):
    1. [[note]] — [N] outgoing links — "[description]"
    2. [[note]] — [N] outgoing links — "[description]"
    ...

  Synthesizers (high on both — structurally important):
    1. [[note]] — [N] in / [M] out — "[description]"
    ...

  [If no clear synthesizers: "No notes score high on both metrics.
   This suggests the graph has separate input and output layers."]
```

### /graph siblings [[topic]]

Find unconnected {vocabulary.note_plural} within a topic — {vocabulary.note_plural} sharing the same {vocabulary.topic_map} but not linking to each other.

**Step 1: Read the specified {vocabulary.topic_map}**

Find and read the {vocabulary.topic_map} matching the argument. Extract all {vocabulary.note_plural} linked in Core Ideas.

**Step 2: Check pairwise connections**

For each pair of {vocabulary.note_plural} in the {vocabulary.topic_map}:
1. Does A link to B? (grep for `[[B]]` in A's file)
2. Does B link to A? (grep for `[[A]]` in B's file)
3. If neither: this is an unconnected sibling pair

If `ops/scripts/graph/topic-siblings.sh` exists, use it with the topic argument.

**Step 3: Evaluate pairs**

For each unconnected pair:
- Read both descriptions
- Assess whether a connection SHOULD exist
- Rate as: likely connection, possible connection, appropriately separate

**Step 4: Present findings**

```
--=={ graph siblings: [[topic]] }==--

  {vocabulary.topic_map} [[topic]] has [N] {vocabulary.note_plural}.
  Found [M] unconnected sibling pairs:

  Likely connections:
    1. [[note A]] and [[note B]]
       A: "[description]"
       B: "[description]"
       → [Why these likely relate]

  Possible connections:
    2. [[note C]] and [[note D]]
       ...

  Appropriately separate: [N] pairs — no connection needed

  → Action: Run /{vocabulary.cmd_reflect} on the "likely" pairs
```

### /graph forward [[note]] [depth]

N-hop forward traversal from a {vocabulary.note}. Default depth: 2.

**Step 1: Start from the specified {vocabulary.note}**

Read the {vocabulary.note} and extract all outgoing wiki links (hop 1).

If `ops/scripts/graph/n-hop-forward.sh` exists, use it with the note and depth arguments.

**Step 2: Traverse**

For each linked {vocabulary.note}:
1. Read it and extract its outgoing wiki links (hop 2)
2. Continue to specified depth
3. Track visited notes to avoid cycles

**Step 3: Present as annotated tree**

```
--=={ forward traversal: [[note]] (depth [N]) }==--

  [[root note]] — "[description]"
    ├── [[link 1]] — "[description]"
    │   ├── [[link 1a]] — "[description]"
    │   └── [[link 1b]] — "[description]"
    ├── [[link 2]] — "[description]"
    │   └── [[link 2a]] — "[description]"
    └── [[link 3]] — "[description]"

  Reached [N] {vocabulary.note_plural} in [depth] hops.
  Dead ends (no outgoing links): [[note X]], [[note Y]]
  Cycles detected: [[note]] → ... → [[note]] (skipped)
```

### /graph backward [[note]] [depth]

N-hop backward traversal to a {vocabulary.note}. Default depth: 2.

**Step 1: Start from the specified {vocabulary.note}**

Find all notes that link TO this {vocabulary.note} (hop 1).

```bash
NAME="[note name]"
grep -rl "\[\[$NAME\]\]" "$NOTES_DIR"/*.md 2>/dev/null
```

If `ops/scripts/graph/recursive-backlinks.sh` exists, use it with the note and depth arguments.

**Step 2: Traverse backward**

For each linking {vocabulary.note}:
1. Find what links to IT (hop 2)
2. Continue to specified depth
3. Track visited notes to avoid cycles

**Step 3: Present as annotated tree**

```
--=={ backward traversal: [[note]] (depth [N]) }==--

  [[root note]] — "[description]"
    ├── [[referrer 1]] — "[description]"
    │   ├── [[referrer 1a]] — "[description]"
    │   └── [[referrer 1b]] — "[description]"
    ├── [[referrer 2]] — "[description]"
    │   └── [[referrer 2a]] — "[description]"
    └── [[referrer 3]] — "[description]"

  [N] {vocabulary.note_plural} lead to [[root note]] within [depth] hops.
  Entry points (no incoming links): [[note X]], [[note Y]]
```

### /graph query [field] [value]

Schema-level YAML query across {vocabulary.note_plural}.

**Step 1: Parse field and value**

Supported query patterns:

| Query | Ripgrep Pattern | Purpose |
|-------|----------------|---------|
| `topics [[X]]` | `rg '^topics:.*\[\[X\]\]'` | Find notes in a topic |
| `type tension` | `rg '^type: tension'` | Find notes by type |
| `methodology X` | `rg '^methodology:.*X'` | Find notes by tradition |
| `status open` | `rg '^status: open'` | Find notes by status |
| `created 2026-02` | `rg '^created: 2026-02'` | Find notes by date range |
| `source [[X]]` | `rg '^source:.*\[\[X\]\]'` | Find notes from a source |

**Step 2: Execute query**

```bash
rg "^{field}:.*{value}" "$NOTES_DIR"/*.md -l 2>/dev/null
```

For each matching file, extract the description for context.

**Step 3: Present results**

```
--=={ graph query: {field} = {value} }==--

  Found [N] {vocabulary.note_plural}:

  1. [[note name]] — "[description]"
  2. [[note name]] — "[description]"
  ...

  Distribution:
    [If querying topics: how many per sub-topic]
    [If querying type: breakdown by status]
    [If querying methodology: breakdown by tradition]
```

---

## Interactive Mode

If no arguments provided:

1. Ask: "What would you like to know about your knowledge graph?"
2. Map natural language to operation:

| User Says | Maps To | Why |
|-----------|---------|-----|
| "Where should I look for connections?" | triangles | Finding synthesis opportunities |
| "What are my most important notes?" | hubs | Authority/hub ranking |
| "Are there isolated areas?" | clusters | Connected component detection |
| "How healthy is my graph?" | health | Full health report |
| "What bridges my topics?" | bridges | Bridge note identification |
| "What connects to [[X]]?" | backward [[X]] | Backward traversal |
| "Where does [[X]] lead?" | forward [[X]] | Forward traversal |
| "Show me notes about [topic]" | query topics [[topic]] | Schema query |
| "What needs connecting in [topic]?" | siblings [[topic]] | Unconnected sibling pairs |

3. Run the mapped operation
4. After presenting results, offer follow-up: "Want to explore any of these further?"

---

## Output Rules

- **Never dump raw data.** Always interpret results with {vocabulary.note} descriptions and context.
- **Always suggest actions.** "Run /{vocabulary.cmd_reflect} on these pairs" or "Consider adding a bridge {vocabulary.note} about X."
- **Use domain vocabulary** for all labels and descriptions — {vocabulary.note}, {vocabulary.topic_map}, etc.
- **For large result sets,** summarize top findings (max 10) and offer to show more: "[N] more results. Show all? (yes/no)"
- **Include density benchmarks** for context — "your density of 0.04 is in the healthy range."
- **Distinguish structural from semantic.** Graph analysis reveals structural properties. Semantic judgment about WHETHER connections should exist requires /{vocabulary.cmd_reflect}.

---

## Edge Cases

### Small Vault (<10 notes)

Report metrics but contextualize: "With [N] {vocabulary.note_plural}, graph analysis provides limited insight. Graph operations become more valuable as the knowledge graph grows. Current metrics are baseline measurements."

All operations still run — they just produce less data.

### No Graph Scripts Available

If `ops/scripts/graph/` does not exist or individual scripts are missing, implement the analysis inline using grep, file reads, and bash loops as shown in each operation's steps. The inline implementations are complete — scripts are optimization, not requirements.

### No ops/derivation-manifest.md

Use universal vocabulary (notes, MOCs, etc.). All operations work identically.

### Empty Notes Directory

Report: "No {vocabulary.note_plural} found in {vocabulary.notes}/. Start by capturing content to build your knowledge graph."

### Note Not Found (for forward/backward/siblings)

If the specified {vocabulary.note} or {vocabulary.topic_map} does not exist:
1. Search for partial matches: `ls "$NOTES_DIR"/*{query}*.md 2>/dev/null`
2. If matches found: "Did you mean: [[match1]], [[match2]]?"
3. If no matches: "{vocabulary.note} '[[name]]' not found. Check the name and try again."
