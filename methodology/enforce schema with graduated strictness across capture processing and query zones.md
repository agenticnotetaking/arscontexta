---
description: Why schema enforcement is non-negotiable for agent-operated knowledge systems and how to implement it across domains — soft enforcement at capture, hard enforcement at pipeline boundaries, and the
kind: guidance
status: active
topics: ["[[schema-enforcement]]"]
---

# enforce schema with graduated strictness across capture processing and query zones

Schema enforcement is the data integrity layer that makes a knowledge vault queryable rather than browsable. Without it, the vault degrades from a structured graph database into an unstructured pile of files that happens to have YAML at the top. Since [[markdown plus YAML plus ripgrep implements a queryable graph database without infrastructure]], schema enforcement is what keeps that database functional — the YAML fields are the columns, and enforcement is what ensures the columns are populated.

This doc tells the plugin WHEN to enforce, HOW strictly, and WHAT to enforce for each domain. It is consulted by /ask when users ask about schema compliance, by /architect when designing new note types, and by /recommend when diagnosing retrieval failures.

## Why Non-Negotiable

Every domain composition the plugin generates depends on queryable metadata. Therapy systems query `mood` and `trigger` fields to detect emotional patterns across entries. Project management queries `status` and `stakeholders` to prepare meeting briefings. Research queries `methodology` and `classification` to find methodologically comparable claims. Trading queries `ticker` and `thesis` to check conviction against outcome. Without schema enforcement, these queries return incomplete or incorrect results — the system works for a week, then silently degrades as notes accumulate without proper metadata.

The degradation is invisible. A therapy vault with 50 reflections looks healthy. But if 12 of them lack `mood` fields, the pattern detection algorithm sees only 38 data points and the mood-trigger correlations it surfaces are skewed toward entries that happened to be well-formatted. The user never knows the analysis is incomplete because missing data does not announce itself — it simply disappears from query results. This is "silent data loss," and it is the primary failure mode that schema enforcement prevents.

Since [[schema enforcement via validation agents enables soft consistency]], the enforcement approach matters as much as the enforcement itself. The research is clear: hard enforcement at capture time creates friction that causes system abandonment, while no enforcement at all produces metadata drift that corrupts retrieval. The solution is graduated enforcement — strict where it matters, gentle where friction would cost more than compliance.

## The Cognitive Science of Externalized Enforcement

Why can't we simply instruct agents to fill in all the fields? Because since [[schema validation hooks externalize inhibitory control that degrades under cognitive load]], instruction-based enforcement degrades precisely when it matters most. Inhibitory control — the capacity to suppress automatic behavior and follow rules — is the first executive function to degrade under cognitive load. An agent deep in a complex synthesis task, with its context window filling past the smart zone, stops attending to procedural instructions like "validate frontmatter against the template schema." The agent does not decide to skip validation. It simply stops attending to the instruction, the same way a tired surgeon proceeds without the checklist.

Externalized enforcement through hooks solves this. A validation hook fires after every file write regardless of the agent's cognitive state — whether it is in the first 10% of context or the last 5%. The check happens outside the context window, immune to the attention degradation that compromises everything inside it. Since [[hooks enable context window efficiency by delegating deterministic checks to external processes]], externalized enforcement provides a double benefit: it both guarantees compliance and frees context tokens for substantive work.

This is the theoretical foundation for the entire enforcement architecture. Enforcement that lives in instructions degrades. Enforcement that lives in infrastructure persists.

## The Enforcement Gradient

The plugin implements a graduated enforcement model across three zones:

| Zone | Strictness | When | Why |
|------|-----------|------|-----|
| **Capture** | Soft (warn, don't block) | Creating new notes | Since [[temporal separation of capture and processing preserves context freshness]], blocking capture for schema issues trades context preservation for format purity — a bad trade |
| **Processing** | Medium (require core fields) | Pipeline reduce/reflect/verify phases | Processing phases can ensure quality because they are not time-sensitive and run with dedicated context |
| **Query** | Hard (missing fields = invisible) | Graph queries, pattern detection | If a therapy note lacks `mood`, it does not appear in mood analysis — enforcement by consequence |

The gradient maps to Thaler and Sunstein's insight from nudge theory: intervention strength should match violation severity. Since [[nudge theory explains graduated hook enforcement as choice architecture for agents]], blocking a write (exit code 2) is a mandate appropriate for structural failures. Warning via context injection is a nudge appropriate for qualitative issues. The choice between them is architectural, not arbitrary.

### What to Enforce at Each Level

**Always enforce (hard, at all levels):**
- `description` field exists and is non-empty — since [[descriptions are retrieval filters not summaries]], every note needs one for discovery
- `topics` field exists with at least one MOC reference — orphan notes are lost notes
- Valid wiki links (targets exist) — since [[stale navigation actively misleads because agents trust curated maps completely]], dangling links do not just clutter; they actively misdirect

**Enforce at processing (medium):**
- Domain-specific required fields populated (e.g., `mood` for therapy entries, `ticker` for trade journals, `jurisdiction` for legal notes)
- Enum values within valid ranges (e.g., `status: preliminary | open | dissolved`, `conviction_level: low | moderate | high | extreme`)
- Description adds information beyond title — since [[good descriptions layer heuristic then mechanism then implication]], descriptions that merely restate the title waste the retrieval layer
- `relevant_notes` entries include context phrases explaining the relationship

**Warn at capture (soft):**
- Missing optional fields
- Description quality issues (too short, restates title)
- Missing relevant_notes context phrases
- Non-standard enum values that might be typos

## Domain-Specific Enforcement

Each domain has different critical fields. The plugin derives enforcement rules from domain schemas, following the principle that fields the domain QUERIES against are critical:

| Domain | Critical Fields (Hard) | Important Fields (Medium) | Nice-to-Have (Soft) |
|--------|----------------------|--------------------------|---------------------|
| Research | description, methodology, topics | classification, source, confidence | adapted_from, evidence_type |
| Therapy | description, mood, date | triggers, coping_used, mood_context | physical_sensations, sleep_quality |
| PM | description, project, status | stakeholders, rationale | follow_ups, blocked_by |
| Creative | description, canon_status | characters_involved, timeline_position | draft_number, revision_notes |
| Learning | description, domain, prerequisites | mastery_level, knowledge_type | last_reviewed, practice_count |
| Trading | description, ticker, thesis | conviction_level, position_size | emotions_during, market_regime |
| Health | description, date, type | severity, triggers | correlation_notes, duration |
| Legal | description, jurisdiction, matter | precedent_status, holding | opposing_arguments, appeal_risk |

The principle: fields the domain QUERIES against are critical (hard enforcement). Fields that enrich context but are not machine-processed are important (medium). Fields that provide optional color are nice-to-have (soft). A research vault that never queries `adapted_from` does not need to enforce it — but a research vault that queries `methodology` to compare evidence across traditions must enforce it, because missing values corrupt the comparison.

Since [[schema fields should use domain-native vocabulary not abstract terminology]], enforcement must respect the language of each domain. A therapy system validates that `trigger` uses the person's own words, not clinical codes. A trading system validates that `thesis` contains an actual investment rationale, not a ticker repeat. Field names are the only domain-specific element in the universal note pattern, and they carry the entire burden of making the system feel native rather than imposed.

## The Observe-Then-Formalize Lifecycle

Since [[schema evolution follows observe-then-formalize not design-then-enforce]], the plugin never designs a 15-field schema on day one. Every field starts its life as an observation, graduates to a convention, and is formalized as schema.

### The Lifecycle Stages

**Stage 1: Minimal seed.** The plugin generates a starting schema with 2-3 required fields (always `description` and `topics`, plus one domain-critical field). Everything else is optional or absent. The schema is deliberately incomplete — it captures just enough to make the vault queryable, not enough to be burdensome.

**Stage 2: Observation.** As the user works, the agent notices patterns: fields being added manually, fields being stuffed with "N/A," free-text fields developing internal structure. These observations accumulate as evidence for schema change. Since [[hook-driven learning loops create self-improving methodology through observation accumulation]], the observation mechanism already exists — schema evolution piggybacks on the general learning loop.

**Stage 3: Convention.** When an observation recurs 5+ times, it becomes a convention — documented in the context file as guidance but not yet enforced. "We tend to track triggers on therapy reflections" is a convention. It guides behavior without blocking it.

**Stage 4: Formalization.** When a convention has been followed consistently and the field is being queried, formalize it: add to the template, set required/optional status, define valid values if applicable, add validation. The field has earned its place through demonstrated use.

This lifecycle mirrors since [[methodology development should follow the trajectory from documentation to skill to hook as understanding hardens]] — schema hardens as evidence accumulates, not as speculation compounds.

## The Five Evolution Signals

Since [[evolution observations provide actionable signals for system adaptation]], the quarterly review protocol uses five diagnostic signals to identify schema that needs to change. These signals are the concrete mechanism for the observe-then-formalize lifecycle:

### 1. Manual Additions

The agent or user consistently adds a field manually that is not in the template. When the same ad-hoc field appears across five or more notes, it has demonstrated its value through use. **Action:** Formalize it — add to the template, decide required vs optional, define valid values. **Example:** A therapy system's agent starts adding `trigger` to reflections even though it was not in the initial template. After five reflections with manually added triggers, the field earns formalization.

### 2. Placeholder Stuffing

A required field is consistently filled with "N/A," "none," or empty placeholder text. This means the field does not fit every note in the type. **Action:** Demote from required to optional. **Example:** A research system requires `adapted_from` on every claim, but original claims are stuffed with "null." The field should be optional with guidance to fill it only when genuinely adapting a human pattern.

### 3. Dead Enums

An enum value defined in the template is never selected across 50+ notes. **Action:** Remove it — it is noise in the selection space. **Example:** A therapy system defines "ecstatic" as a mood enum but no reflection ever uses it. Drop it. Dead enums are a sign of upfront speculation that did not match reality.

### 4. Patterned Free Text

A free-text field develops consistent internal structure across multiple notes. **Action:** If the structure is consistent enough, decompose into separate fields. If it is a convention, document it in the template guidance but keep the field free-text. **Example:** A free-text "context" field in a therapy system consistently contains "trigger: X, reaction: Y, insight: Z." That is structure waiting to be formalized into three separate fields. But a description field that consistently starts with a verb phrase is a stylistic convention — document it, do not decompose it.

### 5. Oversized MOCs

A MOC consistently exceeds the healthy threshold (40+ notes for agent-operated systems, 30+ for human-operated). **Action:** Create sub-MOCs along the natural fault lines. **Signal:** If the split follows a pattern across multiple MOCs (e.g., every topic MOC splits into "theory" and "practice"), that pattern itself is a schema dimension worth formalizing. This signal is architectural rather than field-level, but it belongs in the quarterly review because it indicates the current taxonomy has outgrown its design.

The five signals compose into a quarterly review protocol: scan for manual additions, check for placeholder stuffing, audit enum usage, inspect free-text structure, review MOC sizes. Each check produces either "no action" or a specific schema proposal with evidence.

## Progressive Validation

Since [[progressive schema validates only what active modules require not the full system schema]], the plugin never enforces fields from inactive modules. A user with just basic wiki-links and yaml-schema enabled sees no warnings about `methodology` or `relevant_notes` until they activate the modules that use those fields.

This is critical for onboarding. New users encounter minimal schema requirements. As they activate more features, enforcement grows with them. The progression:

1. **Day 1:** Only `description` and `topics` required. The vault is immediately queryable for basic navigation.
2. **Week 2:** User activates processing pipeline. Domain-specific fields become required at the processing boundary (not at capture).
3. **Month 2:** User activates pattern detection. The fields that pattern detection queries become critical — now the system depends on them.
4. **Ongoing:** The quarterly review protocol adds fields that have earned formalization and removes fields that have proven unnecessary.

Since [[premature complexity is the most common derivation failure mode]], progressive validation prevents the single most common cause of system abandonment: overwhelming new users with a schema they do not yet understand the purpose of.

## Hook-Based Enforcement for Agents

For platforms that support hooks (tier 1), the plugin generates enforcement as automated checks:

**PostToolUse on Write:** Fires after every file creation or modification. Checks required fields for the note's type. Returns exit code 2 (blocking) for hard enforcement violations, exit code 0 with warning in additionalContext for soft violations. The agent sees warnings and can choose to address them; it cannot bypass blocks.

**Session-start health check:** Fires at session orientation. Counts notes per type missing critical fields. Reports as "schema compliance: 94% (3 therapy reflections missing mood field)." The number makes the gap visible without blocking work.

**Pipeline boundary gate:** Since [[generation effect gate blocks processing without transformation]], the pipeline boundary enforces a similar principle for schema: content cannot advance from one pipeline phase to the next if critical fields are missing. This is where processing-level enforcement lives — the gate is structural, not attentional.

For platforms that do not support hooks (tier 2-3), the plugin generates equivalent guidance in the context file: explicit checklists for note creation, processing phase instructions that include field validation, and periodic manual review prompts. Since [[platform capability tiers determine which knowledge system features can be implemented]], the enforcement mechanism adapts to platform capability while the enforcement principle remains constant.

## Cross-Domain Enforcement

When users have multiple domains (e.g., research + personal life + therapy), each domain maintains its own schema scope. Since [[multi-domain systems compose through separate templates and shared graph]], hard enforcement that blocks on a therapy field violation must never stall research processing.

**Shared fields** (`description`, `topics`) have universal enforcement — every note in every domain must have them. **Domain-specific fields** (`mood`, `ticker`, `precedent`) have domain-scoped enforcement — they only apply to notes of the relevant type. The graph is shared; the schemas are separate.

The practical implication: a validation hook must know which template applies to which note. The plugin generates this routing from the template registry — each template declares which folder or note type it governs, and the hook dispatches accordingly.

## Implementation Pattern

### For /setup (Onboarding)

When generating a new vault, the plugin:
1. Identifies domain-specific note types from the domain composition
2. Generates template files with `_schema` blocks defining required/optional/enum fields
3. Creates validation hooks appropriate to the user's platform tier
4. Explains the enforcement gradient: "Your notes will be checked for [critical fields]. Missing fields get flagged during processing, not blocked at capture."

### For /architect (Extension)

When a user adds a new note type:
1. The plugin proposes a schema based on similar domains (since [[novel domains derive by mapping knowledge type to closest reference domain then adapting]])
2. Critical fields are identified by asking: "What will you query this note type for?"
3. The schema starts minimal and grows — since [[schema evolution follows observe-then-formalize not design-then-enforce]]

### For /recommend (Maintenance)

When checking vault health:
1. Count notes per type missing critical fields — report as "schema compliance"
2. Detect fields being manually added that are not in the schema — suggest schema evolution
3. Identify queries that return incomplete results due to missing metadata — flag as "silent data loss"

## Anti-Patterns

| Anti-Pattern | Why It Fails | Better Approach |
|-------------|-------------|-----------------|
| Block all writes on any schema violation | Capture friction causes system abandonment | Soft enforcement at capture, hard at query |
| No enforcement at all | Metadata drift corrupts query results within weeks | At minimum, enforce description + topics universally |
| Enforce full schema from day one | Overwhelms users before they understand what fields are for | Progressive schema: minimal start, grow with observed use |
| Same enforcement across domains | Cross-domain blocking (therapy validation stalls research) | Domain-scoped validation via template routing |
| Enforce fields nobody queries | Wasted effort and unnecessary friction | Tie enforcement to actual query patterns |
| Design schema upfront without observation | Speculation produces dead fields and missing useful ones | Observe-then-formalize: fields earn their place through use |

## Domain Examples

These domain compositions demonstrate schema enforcement in practice:

- [[academic research uses structured extraction with cross-source synthesis]] — Hard enforcement on `methodology` and `classification` enables evidence-quality queries and cross-methodology synthesis. The dense schema serves a purpose: every field powers a specific academic query.
- [[therapy journal uses warm personality with pattern detection for emotional processing]] — `mood` and `trigger` fields are critical for pattern detection, but soft enforcement at journaling time prevents friction during vulnerable moments. The ethical constraint governs: never let schema demands interfere with emotional capture.
- [[trading uses conviction tracking with thesis-outcome correlation]] — `ticker`, `thesis`, and `conviction_level` fields power strategy compliance checking. Enforcement by consequence when missing fields exclude trades from performance analysis.
- [[legal case management uses precedent chains with regulatory change propagation]] — `jurisdiction` and `precedent_status` require hard enforcement because regulatory compliance depends on complete metadata. This is the domain where enforcement is most naturally strict.
- [[health wellness uses symptom-trigger correlation with multi-dimensional tracking]] — Accumulation-based domain where schema enforcement gates pattern detection. Missing `date` or `type` fields make correlation analysis impossible, but capture must stay as frictionless as a health log requires.

## Grounding

This guidance is grounded in:
- [[schema enforcement via validation agents enables soft consistency]] — the foundational research on soft vs hard enforcement
- [[schema validation hooks externalize inhibitory control that degrades under cognitive load]] — why enforcement must be externalized, not instructed
- [[schema fields should use domain-native vocabulary not abstract terminology]] — why enforcement must respect domain language
- [[progressive schema validates only what active modules require not the full system schema]] — module-aware enforcement
- [[schema evolution follows observe-then-formalize not design-then-enforce]] — enforcement generates the observation data for evolution
- [[nudge theory explains graduated hook enforcement as choice architecture for agents]] — theoretical basis for graduated enforcement
- [[schema templates reduce cognitive overhead at capture time]] — templates as the capture-side of enforcement
- [[evolution observations provide actionable signals for system adaptation]] — the five signals that drive schema evolution
- [[generation effect gate blocks processing without transformation]] — pipeline boundary enforcement as a quality gate

---

Topics:
- [[index]]
- [[index]]
---

Topics:
- [[schema-enforcement]]
