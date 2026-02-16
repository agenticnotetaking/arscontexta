# Dimension-Claim Map

Which research claims inform which configuration dimensions. The derivation engine uses this to trace every dimension choice back to specific evidence.

---

## Dimension 1: Granularity (atomic ↔ coarse)

| Claim | What It Says | Informs |
|-------|-------------|---------|
| enforcing atomicity can create paralysis when ideas resist decomposition | Atomic pole has real cost — some ideas need compound expression | When to soften atomicity |
| three capture schools converge through agent-mediated synthesis | Agent processing dissolves capture granularity tradeoffs | Default recommendation |
| summary coherence tests composability before filing | If can't summarize in 1-3 sentences, it bundles claims | Split signal |

**Default position:** Atomic (composability maximizes reuse). Soften for reference-heavy domains.

---

## Dimension 2: Organization (flat ↔ hierarchical)

| Claim | What It Says | Informs |
|-------|-------------|---------|
| associative ontologies beat hierarchical taxonomies | Heterarchy adapts while hierarchy brittles | Default recommendation |
| topological organization beats temporal for knowledge work | Concept-based beats date-based | Organization axis |
| navigational vertigo emerges in pure association systems | Without MOCs, unlinked neighbors become unreachable | When hierarchy is needed |
| faceted classification treats notes as multi-dimensional objects | Ranganathan's PMEST: facets compose multiplicatively | Alternative to folder hierarchy |

**Default position:** Flat with MOC overlay. Add folders only when file counts exceed tool limits.

---

## Dimension 3: Linking Philosophy (explicit-only ↔ explicit+implicit)

| Claim | What It Says | Informs |
|-------|-------------|---------|
| propositional link semantics transform wiki links from associative to reasoned | Moving from "related" to "this causes/enables/contradicts that" | Link quality standard |
| inline links carry richer relationship data than metadata fields | Prose context encodes WHY notes connect | Link format |
| concept-orientation beats source-orientation | Organizing by concept enables cross-domain edges | Link target design |
| controlled disorder engineers serendipity through semantic linking | Luhmann: perfect order yields zero surprise | When to add implicit |
| spreading activation models how agents should traverse | Graph traversal as primary discovery mechanism | Traversal pattern |

**Default position:** Explicit+implicit (wiki links primary, semantic search supplemental).

---

## Dimension 4: Processing Intensity (heavy ↔ light)

| Claim | What It Says | Informs |
|-------|-------------|---------|
| fresh context per task preserves quality better than chaining phases | Session isolation keeps phases in smart zone | Phase architecture |
| throughput matters more than accumulation | Processing velocity, not note count | Health metric |
| processing effort should follow retrieval demand | JIT processing over front-loading | When to invest |
| every knowledge domain shares a four-phase processing skeleton | Capture, process, connect, verify — only process step varies | Pipeline structure |
| structure without processing provides no value | Structural motions without generation produce nothing | Minimum processing |
| the generation effect requires active transformation not just storage | Moving files is not processing | Quality gate |

**Default position:** Medium (4-phase skeleton). Heavy for research/synthesis. Light for capture-heavy domains.

---

## Dimension 5: Navigation Depth (2-tier ↔ 4-tier)

| Claim | What It Says | Informs |
|-------|-------------|---------|
| MOCs are attention management devices not just organizational tools | Reduce context-switching cost by 23 minutes | Why depth matters |
| progressive disclosure means reading right not reading less | Each layer reveals more but costs more tokens | Layer design |
| basic level categorization determines optimal MOC granularity | Cognitive sweet spot for categorization depth | Tier count |
| community detection algorithms can inform when MOCs should split or merge | Algorithmic signals for structural maintenance | Maintenance trigger |

**Default position:** 3-tier (hub → domain → topic). Add 4th tier at >100 notes per topic.

---

## Dimension 6: Maintenance Sensitivity (tight thresholds ↔ lax thresholds)

| Claim | What It Says | Informs |
|-------|-------------|---------|
| backward maintenance asks what would be different if written today | Living documents, not finished artifacts | Maintenance philosophy |
| incremental formalization happens through repeated touching | Many small touches over time | Threshold pattern |
| gardening cycle implements tend prune fertilize operations | Separated maintenance phases | Phase structure |
| random note resurfacing prevents write-only memory | Counteracts structural attention bias | Anti-stagnation |
| spaced repetition scheduling could optimize vault maintenance | Front-loaded review intervals | Scheduling pattern |
| derived systems follow a seed-evolve-reseed lifecycle | Minimum viable → friction-driven → principled restructuring | Evolution pattern |

**Default position:** Condition-based for all domains. High-volume active domains use tight thresholds (low orphan/inbox tolerance). Stable reference domains use lax thresholds. Threshold sensitivity scales with the domain's rate of change.

---

## Dimension 7: Schema Density (minimal ↔ dense)

| Claim | What It Says | Informs |
|-------|-------------|---------|
| metadata reduces entropy enabling precision over recall | Pre-computed representations shrink search space | Why density helps |
| schema evolution follows observe-then-formalize not design-then-enforce | Start minimal, grow based on evidence | Evolution pattern |
| schema fields should use domain-native vocabulary not abstract terminology | Every abstractly-named field forces translation at capture | Naming constraint |
| type field enables structured queries without folder hierarchies | Content-kind metadata provides filtering axis | Minimum useful field |
| descriptions are retrieval filters not summaries | Lossy compression optimized for decision-making | Description design |

**Default position:** Minimal (description + topics). Add fields when querying patterns emerge.

---

## Dimension 8: Automation Level (full ↔ manual)

| Claim | What It Says | Informs |
|-------|-------------|---------|
| hook enforcement guarantees quality while instruction enforcement merely suggests it | Convention-to-automation is the sharpest capability gap | When to automate |
| skills encode methodology so manual execution bypasses quality gates | Skills contain selectivity gates that instructions don't | Automation value |
| four abstraction layers separate platform-agnostic from platform-dependent | Foundation, convention, automation, orchestration | Layer mapping |
| the determinism boundary separates hook methodology from skill methodology | Deterministic ops → hooks. Judgment ops → skills. | Automation design |
| methodology development should follow documentation to skill to hook | Hardening trajectory: understand → encode → enforce | Maturity path |
| complex systems evolve from simple working systems | Gall's Law: start simple, automate at friction points | Evolution constraint |

**Default position:** Convention (context file instructions). Add automation at friction points.

---

## Cross-Dimension Interactions

| Interaction | Claim | Effect |
|-------------|-------|--------|
| Granularity → Linking | configuration dimensions interact | Atomic granularity forces explicit linking |
| Granularity → Navigation | configuration dimensions interact | Atomic + flat requires deep MOC hierarchy |
| Granularity → Processing | configuration dimensions interact | Atomic notes need heavy processing to recreate lost context |
| Automation → Schema | configuration dimensions interact | Full automation enables dense schemas (validation catches errors) |
| Automation → Processing | configuration dimensions interact | Manual operation pressures toward light processing |
| Volume → Navigation | small-world topology requires hubs | Large vaults need deeper navigation |
| Volume → Maintenance | random note resurfacing prevents write-only memory | Large vaults need more frequent maintenance |

---

## Methodology Tradition Presets

See `tradition-presets.md` for the full tradition configurations, use-case presets, and mixing rules. That file is the single source of truth for preset definitions.
