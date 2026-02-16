# Dimension Interaction Constraints

How choices in one dimension create pressure on others. The derivation engine uses this to detect incoherent configurations and warn the user before generating.

The valid configuration space is much smaller than the combinatorial product. Eight dimensions with three positions each produces 6,561 theoretical combinations. Most are incoherent.

---

## Primary Cascades

### Granularity Cascade (strongest coupling)

Atomic granularity creates the widest cascade:

```
atomic granularity
  → forces explicit linking (notes lack internal context)
  → forces deep navigation (thousands of small nodes need MOC hierarchy)
  → forces heavy processing (extraction, reflection, reweaving to maintain links)
  → pressures toward semantic search (keyword search fails across vocabularies)
```

Coarse granularity creates the inverse:

```
coarse granularity
  → permits lightweight linking (internal proximity provides context)
  → permits shallow navigation (fewer nodes to organize)
  → permits light processing (each note is more self-contained)
```

**Incoherent combinations to flag:**
- Atomic granularity + shallow navigation (2-tier) → navigational vertigo
- Atomic granularity + light processing → notes created but never connected
- Coarse granularity + heavy processing → processing cost exceeds synthesis value

### Automation Cascade

```
full automation (hooks + skills + pipelines)
  → enables dense schemas (validation catches errors)
  → enables heavy processing (pipelines handle volume)
  → enables condition-based maintenance (automated trigger evaluation)
```

```
manual operation (convention only)
  → pressures toward minimal schemas (less to remember/validate by hand)
  → pressures toward light processing (each step costs attention)
  → pressures toward lax maintenance conditions (manual burden)
```

**Incoherent combinations to flag:**
- Manual operation + dense schema → maintenance burden collapses system
- Full automation + minimal schema → wastes enforcement capacity
- Manual operation + heavy processing → unsustainable without pipelines

### Volume Cascade

```
high volume (>200 notes)
  → requires deep navigation (shallow structures become unnavigable)
  → requires semantic search (grep alone misses vocabulary divergence)
  → requires automated maintenance (manual review at scale is impractical)
```

```
low volume (<50 notes)
  → permits shallow navigation (agent can hold full structure in context)
  → permits keyword search (grep works when vocabulary is consistent)
  → permits manual maintenance (small enough to review fully)
```

**Incoherent combinations to flag:**
- High volume + no semantic search + shallow navigation → retrieval failure
- Low volume + full automation + deep navigation → over-engineering

---

## Cross-Dimension Interaction Matrix

Each cell describes the pressure that the row dimension's pole creates on the column dimension.

| Row → Col | Granularity | Organization | Linking | Processing | Nav Depth | Maintenance | Schema | Automation |
|-----------|-------------|-------------|---------|------------|-----------|-------------|--------|------------|
| **Atomic granularity** | — | pressures flat | forces explicit | forces heavy | forces deep | pressures active conditions | neutral | pressures automation |
| **Coarse granularity** | — | permits hierarchical | permits light | permits light | permits shallow | permits lax conditions | neutral | permits manual |
| **Flat organization** | neutral | — | requires explicit links | neutral | requires MOC overlay | neutral | neutral | neutral |
| **Hierarchical org** | neutral | — | folder membership as linking | neutral | folder browsing sufficient | neutral | neutral | neutral |
| **Explicit+implicit linking** | neutral | neutral | — | neutral | neutral | neutral | neutral | requires semantic search tool |
| **Heavy processing** | neutral | neutral | enables dense links | — | produces material for deep nav | generates maintenance targets | enables field discovery | benefits from automation |
| **Light processing** | neutral | neutral | produces few links | — | needs little nav | generates few targets | minimal fields emerge | works without automation |
| **Full automation** | neutral | neutral | neutral | enables heavy | neutral | enables active conditions | enables dense | — |
| **Manual operation** | neutral | neutral | neutral | pressures light | neutral | pressures infrequent | pressures minimal | — |

---

## Coherence Rules for Init

When the user selects dimension values, check these rules. WARN on soft violations, BLOCK on hard violations.

### Hard Constraints (BLOCK)

These produce systems that will fail:

1. `atomic + navigation_depth == "2-tier" + volume > 100`
   → "Atomic notes at this volume need at least 3-tier navigation. 2-tier creates navigational vertigo."

2. `automation == "full" + platform_lacks_hooks`
   → "Full automation requires hooks and skills. Your platform supports convention only."

3. `processing == "heavy" + automation == "manual" + no_pipeline_skills`
   → "Heavy processing without pipeline skills is unsustainable. Either add automation or reduce processing intensity."

### Soft Constraints (WARN)

These produce friction but can work with compensating mechanisms:

1. `atomic + processing == "light"`
   → "Atomic notes need processing to recreate decomposed context. Light processing may leave notes disconnected. Consider medium processing."

2. `schema == "dense" + automation == "convention"`
   → "Dense schemas without automated validation create maintenance burden. Consider adding validation hooks or reducing schema density."

3. `linking == "explicit+implicit" + no_semantic_search`
   → "Implicit linking (semantic search) is enabled but no search tool is configured. The system will work with explicit links only."

4. `volume > 200 + maintenance_conditions_disabled`
   → "Large vaults need condition-based maintenance to prevent link rot and orphan accumulation. Disabling maintenance conditions at this volume risks drift."

5. `processing == "heavy" + maintenance_conditions_too_lax`
   → "Heavy processing generates maintenance targets faster than lax thresholds can catch. Consider lowering condition thresholds (e.g., orphan count, stale node percentage)."

6. `coarse + processing == "heavy"`
   → "Coarse notes are self-contained enough that heavy processing provides diminishing returns. Consider medium processing."

7. `flat + navigation_depth == "2-tier" + volume > 50`
   → "Flat organization with only 2 tiers gets crowded as notes accumulate. Consider adding topic-level MOCs (3-tier)."

### Kernel Primitive Constraints

These constraints apply to the 15 kernel primitives and their INVARIANT/CONFIGURABLE status:

**INVARIANT primitives (always present, cannot be disabled):**

1. `session_capture == false` (Primitive 15)
   → BLOCK: "Session capture is INVARIANT. Every vault saves session transcripts. The operational learning loop depends on this evidence."

2. `methodology_folder == false` (Primitive 14)
   → BLOCK: "The methodology folder is INVARIANT. Meta-skills (/ask, /architect, /rethink) require ops/methodology/ to reason about system state."

3. `schema_enforcement == false` (Primitive 7)
   → BLOCK: "Schema enforcement is INVARIANT. Without validation, metadata drift corrupts retrieval within weeks."

4. `wiki_links == false` (Primitive 3)
   → BLOCK: "Wiki links are INVARIANT. They are the universal reference form and the foundation of the graph database."

**CONFIGURABLE primitives (can be toggled):**

5. `self_space == true + preset == "research"`
   → WARN: "Self space is OFF by default for Research presets. The knowledge graph is the focus, not agent identity. Enable only if persistent agent memory across sessions is needed."

6. `self_space == false + preset == "personal_assistant"`
   → WARN: "Self space is ON by default for Personal Assistant presets. Agent identity and persistent memory are central to the experience. Disable only if the agent's sense of self is not needed."

7. `semantic_search == false + linking == "explicit+implicit"`
   → WARN: "Semantic search is configured as opt-in. Without qmd, implicit linking falls back to keyword overlap and MOC traversal."

**Condition-based maintenance constraints:**

8. `condition_thresholds_all_zero`
   → WARN: "All condition-based maintenance thresholds are set to zero (disabled). The vault will not surface maintenance tasks. Consider enabling at least orphan detection and dangling link checks."

9. `task_stack == false` (Primitive 13)
   → BLOCK: "The task stack is INVARIANT. Without task tracking, the agent has no lifecycle visibility and cannot answer 'what should I work on?'"

---

## Compensating Mechanisms

Some dimension mismatches can be compensated rather than blocked:

| Mismatch | Compensating Mechanism | Effectiveness |
|----------|----------------------|---------------|
| Atomic + medium processing | Semantic search compensates for missing explicit links | Moderate — finds connections but doesn't create them |
| Dense schema + convention | Good templates reduce manual validation burden | Moderate — helps at capture, not at maintenance |
| High volume + shallow nav | Strong semantic search enables discovery without deep hierarchy | Moderate — works for retrieval, not for orientation |
| Manual + moderate processing | Batch processing sessions compensate for missing automation | Low — depends on user discipline |

The key question: are interaction constraints hard (violating them produces failure) or soft (violating them produces friction that compensating mechanisms can overcome)? The answer appears to be: granularity cascades are hard, automation cascades are soft. You cannot atomic-granularity your way out of missing navigation depth. But you can manually maintain a dense schema if you're disciplined enough — it's just friction, not failure.

---

## Derivation Application

When generating a system:

1. **Start from use-case preset** (or tradition preset) — these are pre-validated coherence points
2. **Allow user customization** — but check each change against interaction constraints
3. **Cascade recommendations** — if user changes granularity from moderate to atomic, recommend increasing processing and navigation depth
4. **Document justification** — include interaction constraint reasoning in the derivation rationale section of the generated context file
5. **Flag unresolved tensions** — if user overrides a warning, note it in the generated system for future reseeding

The derivation rationale should include which constraints were active and how they were resolved. This enables principled reseeding when friction patterns emerge later.
