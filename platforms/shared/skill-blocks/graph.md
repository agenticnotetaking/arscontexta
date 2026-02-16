# Skill Generation Block: graph

## Generation Metadata

```yaml
skill_name: graph
purpose: "Interactive knowledge graph analysis with natural language routing"
domain_verb: "{DOMAIN:graph}"
output_type: "graph analysis findings with suggested actions"
triggers:
  - "/{DOMAIN:graph}"
  - "/{DOMAIN:graph} [operation]"
  - "find synthesis opportunities"
  - "graph analysis"
  - "show connections"
  - "find bridges"
search_mode: none  # runs graph analysis scripts, does not search content
quality_gates:
  - every analysis produces findings AND actions
  - results interpreted with domain vocabulary (not raw data)
  - {vocabulary.note} descriptions included in output (not just titles)
  - specific next-step commands suggested
handoff_protocol: false  # interactive analysis, not orchestrated
pipeline_position: meta_cognitive  # operates outside the main pipeline
```

## Vocabulary Transformation Map

| Marker | Resolves To | Example (Research) | Example (Personal) |
|--------|-------------|-------------------|-------------------|
| `{vocabulary.notes}` | Notes folder name | `claims/` | `reflections/` |
| `{vocabulary.note}` / `{vocabulary.note_plural}` | Note type | `claim` / `claims` | `reflection` / `reflections` |
| `{vocabulary.topic_map}` / `{vocabulary.topic_map_plural}` | MOC reference | `MOC` / `MOCs` | `theme map` / `theme maps` |
| `{vocabulary.cmd_reflect}` | Connection command | `/reflect` | `/find-patterns` |
| `{vocabulary.cmd_reweave}` | Backward-pass command | `/reweave` | `/revisit` |

## Processing Depth Calibration

Graph analysis does not vary by processing depth. All operations run the same way regardless of the user's depth setting. The operations themselves range from quick (single-note traversal) to comprehensive (full-graph cluster analysis), but this is controlled by which operation the user selects, not by a depth setting.

## Skill Template

**Source:** `skill-sources/graph/SKILL.md` (reference implementation, 567 lines)

The derivation engine reads the full `skill-sources/graph/SKILL.md` and applies vocabulary transformation:

1. Replace skill frontmatter with domain vocabulary
2. Replace all `{vocabulary.X}` markers with resolved values
3. Replace `{DOMAIN:...}` markers with domain-specific terms
4. Preserve all 9 operations with their analysis scripts
5. Preserve interactive mode (natural language question routing)
6. Preserve findings + actions output pattern for every operation
7. Preserve graph script generation during /setup

### Operations (Invariant — all 9 must be present)

| Operation | Script | What It Reveals |
|-----------|--------|----------------|
| `health` | Multiple scripts | Comprehensive graph health report (orphans, dangles, density, coverage) |
| `triangles` | `find-triangles.sh` | Synthesis opportunities: A links to B, A links to C, but B does not link to C |
| `bridges` | `find-bridges.sh` | Fragile {vocabulary.note_plural}: removal would disconnect graph regions |
| `clusters` | `find-clusters.sh` | Connected components — isolated subgraphs that may need cross-linking |
| `hubs` | `influence-flow.sh` | Hub/authority analysis — which {vocabulary.note_plural} are most influential |
| `siblings` | `topic-siblings.sh` | Unconnected {vocabulary.note_plural} sharing a {vocabulary.topic_map} — missed connections |
| `forward` | `n-hop-forward.sh` | N-hop forward traversal from a specific {vocabulary.note} |
| `backward` | `recursive-backlinks.sh` | N-hop backward traversal to a specific {vocabulary.note} |
| `query` | Combined | Natural language graph question (routed to appropriate operation) |

### Operation Output Pattern (Invariant)

Every operation produces exactly two sections:

```
--=={ name : graph > {operation} }==--

  Findings:
    [interpreted results using {vocabulary.note} descriptions]
    [domain-specific context, not raw data]

  Actions:
    [specific commands to run]
    [e.g., "/{vocabulary.cmd_reflect} [[note A]] [[note B]]"]
    [e.g., "/{vocabulary.cmd_reweave} [[bridge note]]"]
```

Never dump raw script output. Always interpret results with {vocabulary.note} descriptions loaded from the notes' YAML frontmatter.

### Interactive Mode

When invoked without arguments or with a natural language question, route to the closest operation:

| Question Pattern | Routes To |
|-----------------|-----------|
| "what needs connecting?" | triangles |
| "is the graph healthy?" | health |
| "what would break if removed?" | bridges |
| "are there isolated clusters?" | clusters |
| "what's most important?" | hubs |
| "what's related to [[X]]?" | forward (from X) |
| "what links to [[X]]?" | backward (to X) |
| "what should I link in [[topic]]?" | siblings |

If the question cannot be mapped, show the operations list and ask the user to choose.

### Graph Script Generation

During /setup, the derivation engine generates graph analysis scripts in `ops/scripts/graph/`:

- Scripts use `{vocabulary.notes}` for the notes directory path
- Scripts use wiki link syntax `[[title]]` for output
- Scripts are bash, platform-independent
- Each script is self-contained (no dependencies beyond grep, awk, sort)

### Health Report Structure

The `health` operation combines multiple scripts into a single report:

```
--=={ name : graph > health }==--

  | Metric                    | Value | Status |
  |---------------------------|-------|--------|
  | Total {vocabulary.note_plural}      | {N}   | —      |
  | Orphans                   | {N}   | {PASS/WARN} |
  | Dangling links            | {N}   | {PASS/WARN} |
  | Avg links per {vocabulary.note}     | {N}   | {PASS/WARN} |
  | {vocabulary.topic_map} coverage    | {N}%  | {PASS/WARN} |
  | Bridge {vocabulary.note_plural}    | {N}   | {INFO} |
  | Synthesis opportunities   | {N}   | {INFO} |

  Priority actions:
    1. [most urgent graph issue with command]
    2. [next priority]
```

## Validation Criteria

- [ ] All 9 operations documented with scripts
- [ ] Findings + Actions output pattern for every operation
- [ ] Interactive mode routing table present
- [ ] Health report structure documented
- [ ] Graph script generation during /setup described
- [ ] Never dump raw data — always interpret with descriptions
- [ ] `{vocabulary.X}` markers used throughout
- [ ] Specific command suggestions in Actions sections
