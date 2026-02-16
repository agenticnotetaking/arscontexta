# Use-Case Presets Reference

Named points in the configuration space derived from methodology traditions and adapted for specific use cases. Each preset is a pre-validated coherent starting point — the derivation engine uses them as anchors, adjusting individual dimensions based on conversation signals.

---

## Three Use-Case Presets

### Research

**Display name:** Knowledge Research

**Optimizes for:** Deep synthesis, cross-domain connection density, long-term knowledge accumulation

**Closest tradition:** Zettelkasten + Cornell processing phases

**Philosophy:** Full automation from day one. All pipeline skills at full depth, all blocks active. The reference implementation.

| Dimension | Value | Rationale |
|-----------|-------|-----------|
| Atomicity | 0.8 | One claim per note maximizes composability and cross-source comparison |
| Organization | 0.3 | Flat-associative with semantic search |
| Linking | 0.7 | Explicit typed connections + semantic discovery |
| Processing | 0.8 | Full pipeline: extract, connect, verify, reweave |
| Session | 0.7 | Fresh per task |
| Maintenance | 0.6 | Event-driven |
| Search | 0.8 | Semantic primary |
| Automation | 0.8 | Full automation from day one |

**Block configuration:**

| Category | Blocks |
|----------|--------|
| Always | atomic-notes, wiki-links, mocs, processing-pipeline, schema, maintenance, self-evolution, session-rhythm, templates, ethical-guardrails, helper-functions, graph-analysis |
| Conditional | semantic-search (if qmd opted in), multi-domain (if needed) |
| Optional | personality |
| Disabled | self-space (goals route to ops/) |

**Key settings:**
- `self_space: false`
- `qmd: true` (opted in during onboarding)
- `personality: "neutral-analytical"`
- `processing_depth: "full quality gates from day one"`

**Extraction categories:** claims, evidence, methodology-comparisons, contradictions, open-questions, design-patterns, design-dimensions

**Key vocabulary:**

| Level | Universal | Research |
|-------|-----------|----------|
| Note type | note | claim |
| Processing verb | reduce/extract | reduce |
| Connection verb | reflect/connect | reflect |
| Navigation unit | MOC | topic map |
| Collection name | notes/ | notes/ |
| Capture zone | inbox/ | inbox/ |

**Starter MOCs:** `{DOMAIN:domain}-overview`, `methods`, `open-questions`

**Domain-specific failure mode risks:**
- Collector's Fallacy (HIGH) — source material is abundant
- Orphan Drift (HIGH) — high creation volume without mandatory connection
- Verbatim Risk (HIGH) — source material tempts reproduction over transformation
- MOC Sprawl (HIGH) — topics proliferate in research domains
- Productivity Porn (HIGH) — meta-system building displaces actual research

**Example user statements:**
- "I read 5-10 papers a week on [topic] and need to track claims across disciplines"
- "I'm building a literature review and need to see connections between sources"
- "I want an academic knowledge base for my dissertation research"

---

### Personal Assistant

**Display name:** Personal Assistant

**Optimizes for:** Life reflection, pattern detection, personal growth tracking, relationship awareness

**Closest tradition:** Custom — moderate processing for pattern detection, warm voice for personal content

**Philosophy:** All skills available and active from day one, adapted for personal use. Full pipeline with personal extraction categories.

| Dimension | Value | Rationale |
|-----------|-------|-----------|
| Atomicity | 0.5 | Mixed — per-session reflections, not atomic decomposition |
| Organization | 0.5 | Light hierarchy for life areas |
| Linking | 0.3 | Associative connections between reflections |
| Processing | 0.7 | Full pipeline with personal extraction categories |
| Session | 0.3 | Continuous context across sessions |
| Maintenance | 0.4 | Condition-based check-ins |
| Search | 0.3 | Keyword primary, semantic optional |
| Automation | 0.6 | Semi-automated with personal touch |

**Block configuration:**

| Category | Blocks |
|----------|--------|
| Always | atomic-notes, wiki-links, mocs, processing-pipeline, schema, maintenance, self-evolution, session-rhythm, templates, ethical-guardrails, helper-functions, graph-analysis, personality, self-space |
| Conditional | semantic-search (if qmd opted in), multi-domain (if needed) |
| Optional | (none) |
| Disabled | (none) |

**Key settings:**
- `self_space: true`
- `qmd: "user_choice"` (choice during onboarding)
- `personality: "warm-supportive"`
- `processing_depth: "full quality gates"`

**Extraction categories:** reflections, relationship-dynamics, goals, habits, gratitude, lessons

**Key vocabulary:**

| Level | Universal | Personal Assistant |
|-------|-----------|-------------------|
| Note type | note | reflection |
| Processing verb | reduce/extract | surface |
| Connection verb | reflect/connect | find patterns |
| Navigation unit | MOC | life area |
| Collection name | notes/ | reflections/ |
| Capture zone | inbox/ | journal/ |

**Starter MOCs:** `life-areas`, `people`, `goals`

**Domain-specific failure mode risks:**
- Journal without reflection (HIGH) — capture without pattern detection
- Cognitive Outsourcing (medium) — pattern detection without human validation
- Emotional avoidance (medium) — system enables intellectual distancing from feelings
- Capture without connection (medium) — reflections stay isolated

**Example user statements:**
- "I want to track my growth and notice patterns in my life"
- "I need something that remembers what I care about across sessions"
- "Help me be more thoughtful about my relationships and goals"

---

### Experimental / Build Your Own

**Display name:** Experimental / Build Your Own

**Optimizes for:** User co-design, deep understanding of trade-offs, custom configuration

**Closest tradition:** None — derived from conversation

**Philosophy:** In-depth onboarding with thinking notes surfaced for every design decision. The user co-designs the system.

| Dimension | Value | Rationale |
|-----------|-------|-----------|
| Atomicity | null | User-chosen during onboarding |
| Organization | null | User-chosen during onboarding |
| Linking | null | User-chosen during onboarding |
| Processing | null | User-chosen during onboarding |
| Session | null | User-chosen during onboarding |
| Maintenance | null | User-chosen during onboarding |
| Search | null | User-chosen during onboarding |
| Automation | null | User-chosen during onboarding |

**Block configuration:**

| Category | Blocks |
|----------|--------|
| Always | wiki-links, processing-pipeline, schema, maintenance, self-evolution, session-rhythm, templates, ethical-guardrails, helper-functions, graph-analysis |
| Conditional | atomic-notes, mocs, semantic-search, personality, self-space, multi-domain |
| Optional | (none) |
| Disabled | (none) |

**Key settings:**
- `self_space: "user_choice"`
- `qmd: "user_choice"`
- `personality: "derived_from_conversation"`
- `processing_depth: "full quality gates by default, user can opt down"`

**Extraction categories:** User-defined during init, guided by examples from research and personal-assistant presets

**Starter MOCs:** User-chosen during onboarding

**Domain-specific failure mode risks:**
- Configuration paralysis (HIGH) — too many choices without guidance
- Incoherent configuration (medium) — user choices may violate interaction constraints
- Under-specified system (medium) — skipping decisions leads to gaps

**Example user statements:**
- "I want to understand the trade-offs before choosing"
- "My use case doesn't fit the other presets"
- "I want to build something custom for [unusual domain]"

---

## Five Methodology Tradition Points

Traditions are named coherence points in the 8-dimensional space. They are reference anchors, not templates.

| Dimension | Zettelkasten | PARA | Cornell | Evergreen | GTD |
|-----------|-------------|------|---------|-----------|-----|
| Granularity | Atomic | Coarse | Medium (per-session) | Atomic | Task-sized |
| Organization | Flat | Hierarchical (4 folders) | Temporal | Flat | Hierarchical (contexts) |
| Linking | Explicit, bidirectional | Minimal (folder membership) | Implicit (cue columns) | Explicit, contextual | Minimal |
| Processing | Heavy (formulation + linking) | Light (progressive summarization) | Heavy (5 Rs structured) | Heavy (continuous rewriting) | Light (capture + route) |
| Navigation | 3-4 tier (emergent hubs) | 2 tier (folder browsing) | 2-3 tier (index-based) | 3 tier (link browsing) | 2 tier (context lists) |
| Maintenance | Continuous | Condition-based review | Spaced review | Continuous | Condition-based review |
| Schema | Moderate | Minimal | Moderate (cue/notes/summary) | Moderate | Dense (action metadata) |
| Automation | Convention | Manual | Convention | Convention | Automation-friendly |

**How traditions relate to presets:** Use-case presets are derived from traditions, adapted for specific domains. Research draws primarily from Zettelkasten + Cornell. Personal Assistant is a custom configuration combining moderate processing with warm personality. Experimental derives everything from conversation, using traditions as reference points during design decisions.

---

## Preset Selection Algorithm

The derivation engine maps conversation signals to the closest preset, then adjusts individual dimensions.

### Step 1: Signal Collection

Listen for signals in the user's description and follow-up answers. Each signal maps to one or more dimensions with a confidence level:

| Signal Type | Examples | Maps To |
|-------------|---------|---------|
| Volume indicators | "5-10 papers/week", "2-3 books/month" | Volume projection, navigation, maintenance |
| Processing verbs | "track claims", "remember reactions", "document decisions" | Granularity, processing intensity |
| Connection words | "across disciplines", "between projects", "patterns" | Linking philosophy, semantic search need |
| Frequency indicators | "a few times a week", "whenever I have a session", "after each project" | Maintenance trigger signals |
| Domain markers | "research papers", "personal growth", "relationships" | Closest preset match |
| Emotional register | "feel seen", "like a friend", "professional" | Personality dimensions |
| Design curiosity | "understand trade-offs", "custom", "unusual domain" | Experimental preset signal |

### Step 2: Preset Affinity Scoring

Score the user's signals against each preset. Each matching signal adds affinity:

```
For each preset:
  affinity = sum of (signal_weight x match_strength)
  where match_strength is:
    1.0 = signal directly matches preset characteristic
    0.5 = signal partially matches
    0.0 = no match
```

**Example:** "I read papers and want to track claims across disciplines"
- Research: "papers" (1.0) + "claims" (1.0) + "across disciplines" (1.0) = 3.0
- Personal Assistant: low scores
- Experimental: low scores (no design-curiosity signals)

Select the preset with highest affinity as the starting point. If no preset scores above 2.0 and the user shows design curiosity, route to Experimental.

### Step 3: Dimension Adjustment

Starting from the selected preset, adjust individual dimensions based on specific signals that diverge from the preset:

```
For each dimension:
  if user_signal contradicts preset_position:
    adjust dimension to signal-indicated position
    check interaction constraints
    cascade adjustments to dependent dimensions
```

**Example:** Research preset selected, but user says "I don't need deep analysis, just capture my reactions"
- Processing: heavy -> light (user signal overrides preset)
- Cascade check: light processing + atomic granularity -> WARN (atomic needs processing to recreate context)
- Resolution: suggest moderate granularity to match light processing, or confirm user wants atomic + light with the trade-off acknowledged

### Step 4: Coherence Validation

After all adjustments, check the final configuration against interaction constraints (see `interaction-constraints.md`). Flag hard violations (BLOCK), warn on soft violations (WARN with compensating mechanisms).

### Step 5: Vocabulary Derivation

Using the adjusted preset as the base vocabulary, override with any domain-native terms the user provided during conversation:

```
For each universal term:
  if user provided a domain-native equivalent:
    use user's term
  else:
    use preset's default term

  Verify: would this term feel natural to the user?
```

---

## Novel Domain Handling

When no preset cleanly matches the user's description, the Experimental preset provides the framework for co-design. Unlike the Research and Personal Assistant presets which start with pre-configured dimensions, Experimental walks the user through each design decision with relevant thinking notes surfaced as context.

### When to Route to Experimental

- No preset scores above 2.0 in affinity scoring
- User explicitly asks to customize or "build my own"
- Domain is unusual (competitive gaming, wine tasting, legal case tracking)
- User shows curiosity about trade-offs and design decisions

### Conversation-Driven Derivation

For each dimension:

1. Surface the relevant thinking note(s) that explain the trade-off
2. Present the dimension as a spectrum with examples from Research and Personal Assistant
3. Let the user choose their position
4. Check interaction constraints after each choice
5. Cascade adjustments to dependent dimensions

### Novel Schema Fields

Novel domains often need schema fields that no preset provides. Derive them from the domain's characteristics:

| Domain Characteristic | Suggests Schema Field |
|----------------------|----------------------|
| Temporal dynamics (things become outdated) | `meta_state: current | outdated | speculative` |
| Confidence tracking | `confidence: proven | likely | experimental` |
| Sequential progression | `prerequisites: ["[[concept]]"]` |
| Entity tracking | `person: Name`, `entity: Name` |
| Decision history | `superseded_by: "[[newer-decision]]"` |

### Worked Example: Wine Tasting Notes

**User:** "I'm getting into wine and want to track what I taste — flavors, regions, pairings, and which wines remind me of others."

**Affinity scores:**
- Personal Assistant: 1.5 ("remember things", personal interest)
- Research: 1.0 ("track", systematic)
- Experimental: route here (no preset above 2.0)

**Conversation-driven configuration:**

| Dimension | Position | Rationale |
|-----------|----------|-----------|
| Atomicity | Moderate | Per-wine notes, not atomic flavor claims |
| Organization | Flat | Wines cross regions and varietals |
| Linking | Explicit | Direct connections: "this Barolo reminded me of that Nebbiolo" |
| Processing | Light | Capture tasting notes, connect to similar wines |
| Session | Continuous | Low volume, ongoing |
| Maintenance | Condition-based | Low volume — review when 5+ unconnected tasting notes accumulate |
| Search | Moderate | Structured fields for filtering + semantic for "wines like this" |
| Automation | Convention | Light overhead |

**Novel vocabulary:** "tasting note" (not "reflection" or "claim"), "wine library" (not "life area"), "cellar" (not "archive")

**Novel schema field:** `pairing: ["food pairing notes"]` — domain-specific field not in any preset.
