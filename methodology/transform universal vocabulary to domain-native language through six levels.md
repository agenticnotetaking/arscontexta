---
description: How to adapt universal knowledge system concepts to domain-native language during vault generation — the translation layer that makes derived systems feel natural to practitioners
kind: guidance
status: active
topics: ["[[vocabulary-transformation]]"]
---

# transform universal vocabulary to domain-native language through six levels

The same structural operation goes by different names in different domains. A research vault calls it "claim extraction." A therapy journal calls it "pattern recognition." A project management system calls it "decision documentation." The underlying operation (transforming raw content into structured domain knowledge) is identical — but using the wrong vocabulary makes the system feel foreign to its user.

Since [[schema fields should use domain-native vocabulary not abstract terminology]], vocabulary transformation is the translation layer that makes derived systems feel native to practitioners.

This doc tells the plugin HOW to translate universal concepts into domain language during /setup and vault generation.

## Why Vocabulary Transformation Matters

### Trust

A therapist confronted with `antecedent_conditions:` must first recall what that means in their vocabulary, then translate their thinking, then fill the field. Each translation step erodes trust. The practitioner feels the system doesn't understand their work — and that feeling is correct. The abstract vocabulary literally fails to encode the domain's conceptual distinctions.

When the field says "triggers," the therapist can fill it from their natural professional thinking without detour. The system speaks their language.

### Cognitive Load

Since [[schema fields should use domain-native vocabulary not abstract terminology]], every interaction with abstract terminology forces a translation step that consumes working memory that should be directed at content. Domain-native vocabulary eliminates this translation entirely. The cognitive savings compound across every note created, every query run, every maintenance check reported.

### Adoption

The vocabulary gap is not cosmetic — it is the primary adoption barrier for derived systems. Abstract terminology causes users to misunderstand fields, fill them inconsistently, or abandon the system entirely. Inconsistent filling is particularly insidious because it destroys the entropy reduction that makes metadata queryable in the first place.

## The Ontology-Vocabulary Coupling

Vocabulary carries ontology. When a system uses "antecedent_conditions," it implicitly asserts that therapy operates through abstract causal chains. When it uses "triggers," it acknowledges the embodied, experiential reality of therapeutic work. The vocabulary choice is not neutral — it shapes how the practitioner conceptualizes their domain within the system.

Since [[false universalism applies same processing logic regardless of domain]], vocabulary mismatch is often the visible symptom of a deeper operational mismatch. A therapy system that renames "claim extraction" to "insight extraction" but keeps the same decomposition logic has fixed the vocabulary problem while preserving the operational problem. The insight extraction in therapy is qualitatively different from claim extraction in research — it involves pattern recognition across temporal entries, emotional resonance detection, identification of recurring triggers and coping strategies. These are different operations that happen to occupy the same structural position in the skeleton.

The practical implication: vocabulary transformation without operational adaptation is cosmetic derivation. The plugin must translate both the names AND the operations.

## The Universal-to-Domain Translation

The plugin maintains a translation table from universal kernel concepts to domain-specific vocabulary. Since [[every knowledge domain shares a four-phase processing skeleton that diverges only in the process step]], the skeleton is invariant — capture, process, connect, verify. The names are adaptive.

### Core Operation Translations

| Universal Operation | Research | Therapy | PM | Creative | Learning | Trading |
|-------------------|----------|---------|------|----------|----------|---------|
| Capture | Record source | Journal entry | Meeting notes | Inspiration spark | Lecture notes | Trade journal |
| Process (extract) | Claim extraction | Pattern detection | Decision documentation | Consistency check | Concept mapping | Thesis tracking |
| Connect (reflect) | Citation linking | Trigger-pattern correlation | Stakeholder impact mapping | Character relationship mapping | Prerequisite linking | Correlation analysis |
| Verify | Schema validation | Growth tracking | Risk assessment review | Continuity verification | Mastery assessment | Strategy compliance check |
| Maintain (reweave) | Literature review update | Coping strategy reassessment | Risk register refresh | Worldbuilding bible update | Prerequisite graph revision | Thesis invalidation check |

### Note Type Translations

| Universal Type | Research | Therapy | PM | Creative | Learning | Trading |
|---------------|----------|---------|------|----------|----------|---------|
| Claim note | Finding / Hypothesis | Pattern record | Decision log entry | Canon fact | Concept note | Trade thesis |
| Source note | Literature reference | Session notes | Meeting minutes | Reference material | Lecture notes | Market analysis |
| Tension note | Research contradiction | Ambivalence record | Risk assessment | Continuity error | Prerequisite conflict | Thesis contradiction |
| MOC | Literature review | Pattern overview | Project dashboard | Story bible | Course map | Strategy overview |
| Synthesis note | Meta-analysis | Growth insight | Lessons learned | Thematic analysis | Transfer insight | Strategy review |

### Schema Field Translations

Since [[schema field names are the only domain specific element in the universal note pattern]], field names carry the entire burden of domain adaptation. The five-component note architecture (prose title, YAML frontmatter, body, wiki links, topics footer) is domain-invariant — only the YAML field names change.

| Universal Field | Research | Therapy | PM | Health | Legal |
|----------------|----------|---------|------|--------|-------|
| description | description | description | description | description | description |
| classification | methodology | mood | status | symptom_type | matter_type |
| source | source | session_date | project | date | jurisdiction |
| confidence | evidence_quality | intensity | priority | severity | precedent_strength |
| status | preliminary/open | active/resolved | pending/done | acute/chronic | open/closed |
| related | relevant_notes | related_patterns | stakeholders | correlated_symptoms | related_matters |

## YAML Field Naming Conventions

### When to Keep Universal Terms

Some fields work universally and should NOT be translated:

- `description` — every domain uses this word naturally
- `topics` — structural field, not domain-facing
- `type` — structural classification
- `created` / `updated` — temporal metadata
- `relevant_notes` — structural linking (though the context phrases within should use domain language)

**The principle:** Structural fields that describe the note's role in the system keep universal names. Domain fields that describe the note's content use domain-native names.

### When to Transform

Transform fields that describe domain content:

| Signal | Action |
|--------|--------|
| Practitioners have a natural term for this concept | Use their term |
| The universal term requires mental translation | Transform |
| The field appears in user-facing output (queries, reports) | Transform |
| The field is never shown to users (internal routing) | Keep universal |

### Naming Rules

1. **Use snake_case** for multi-word field names: `coping_strategy`, not `copingStrategy` or `Coping Strategy`
2. **Use singular nouns** for single-value fields: `mood`, not `moods`
3. **Use plural for arrays**: `triggers: ["rejection", "conflict"]`
4. **Prefer short names**: `mood` over `emotional_state_rating`
5. **Match the domain's vocabulary exactly**: if therapists say "triggers," use `triggers`, not `activating_events`
6. **Avoid abbreviations** unless the domain uses them: `adr` is fine for engineering (Architecture Decision Record), `sess_dt` is not fine for therapy

### Enum Values Follow the Same Principle

Field names and their valid values should both speak domain language:

```yaml
# Research
methodology: ["Zettelkasten", "Cognitive Science", "PKM Research"]
classification: open | closed

# Therapy
mood: [1-10]
pattern_type: ["trigger-response", "cognitive distortion", "attachment pattern"]

# Trading
market_regime: ["trending", "ranging", "volatile", "transitioning"]
conviction_level: ["high", "moderate", "speculative"]
```

## Vocabulary Discovery Protocol

During /setup, the plugin discovers domain vocabulary through conversation:

### Step 1: Domain Identification
Ask what the user does. Listen for domain-specific terms they naturally use. A therapist says "session notes" not "source capture." A trader says "thesis" not "hypothesis."

### Step 2: Vocabulary Mapping
Map the user's natural terms to universal operations:
- "I want to track my trades and see what I'm doing wrong" -> capture = trade journal, process = trade review, verify = strategy compliance
- "I need to keep my worldbuilding consistent" -> capture = canon entry, process = consistency check, verify = continuity validation

### Step 3: Template Generation
Generate note templates using the user's vocabulary:
```yaml
# For a therapy user:
---
description: [what this reflection is about]
mood: [1-10 scale]
triggers: ["trigger1", "trigger2"]
coping_used: ["strategy1"]
---

# NOT this (abstract vocabulary):
---
description: [what this claim is about]
classification: [category]
variables: ["var1", "var2"]
methods_applied: ["method1"]
---
```

### Step 4: Skill Language Adaptation
Pipeline skills should speak the domain's language in their output:
- Research /reduce: "Extracted 5 claims and 2 enrichments from this paper"
- Therapy /reduce: "Identified 3 patterns and 1 coping strategy update from this journal entry"
- PM /reduce: "Documented 2 decisions and 4 action items from this meeting"
- Creative /reduce: "Found 2 canon facts and 1 continuity issue from this chapter draft"
- Trading /reduce: "Captured 1 new thesis and 2 observation updates from today's review"

This applies to error messages, maintenance reports, and suggestions too. A therapy vault's staleness warning should say "Pattern overview not reviewed against recent journal entries" not "MOC has stale notes."

## The Translation Boundary

Some concepts translate; some don't. The plugin must recognize both:

### Concepts That Translate Directly
- Capture (exists in every domain)
- Connection finding (universal)
- Schema validation (universal)
- MOC navigation (universal, though MOC section names vary)
- Maintenance checks (universal)

### Concepts That Need Adaptation
- Processing intensity (varies by domain)
- Review cadence (varies by consequence speed)
- Link semantics (research uses "extends/contradicts", therapy uses "triggers/alleviates")
- MOC section headings (research: "Tensions" vs therapy: "Active Patterns" vs PM: "Open Risks")

### Concepts That Don't Transfer
- Specific processing logic (research claim extraction is not the same as therapy pattern detection)
- Domain-specific validation rules (legal citation format is not the same as academic citation format)
- Agent tone (therapy requires warmth; engineering requires precision)
- Domain-specific maintenance checks (plot thread tracking vs citation integrity vs trade thesis validity)

## Relationship Type Vocabulary

Wiki links carry relationship semantics. Different domains express relationships differently:

| Universal | Research | Therapy | PM | Creative | Legal |
|-----------|----------|---------|------|----------|-------|
| extends | extends | deepens insight | builds on | develops further | follows from |
| contradicts | contradicts | conflicts with | overrides | breaks continuity | distinguishes |
| enables | foundation for | prerequisite for | unblocks | enables scene | establishes precedent |
| causes | evidence for | triggers | leads to | causes plot event | gives rise to |
| part of | component of | aspect of | deliverable in | element of | falls under |

**Implementation:** The plugin generates relationship type enums during /setup based on the domain's natural language for these connections. The context phrases in MOC links and relevant_notes fields use these domain-specific relationship terms.

## Cross-Domain Translation

When users have multiple domains, vocabulary creates a cross-domain challenge. Each domain uses different terms for structurally equivalent operations. The resolution is layered vocabulary:

- **Surface layer (user-facing):** Domain-native vocabulary in templates, skill output, maintenance reports
- **Meta layer (system-facing):** Universal vocabulary for cross-domain analysis, reconciliation, and multi-domain queries

This means the plugin maintains the translation table in both directions. It can convert "pattern detection" back to "process" when needed for cross-domain comparison, while always presenting "pattern detection" to the therapy user.

Since [[multi-domain systems compose through separate templates and shared graph]], the graph layer operates on universal components (wiki links, MOC hierarchy, topics) while templates isolate the domain-specific vocabulary. Cross-domain links work because the graph never sees field names — it traverses through titles, links, and topics, all of which are domain-invariant.

## Anti-Patterns

| Anti-Pattern | Why It Fails | Better Approach |
|-------------|-------------|-----------------|
| Using universal vocabulary for everything | System feels foreign, user disengages | Translate to domain language |
| Inventing new vocabulary | User doesn't recognize their own workflow | Use the user's existing terms |
| Inconsistent translation | Same concept called different things in different places | Establish translation table at /setup, use consistently |
| Translating structure along with vocabulary | Universal structure (capture/process/connect/verify) is invariant | Translate names only, keep structural patterns |
| Over-translating | Some terms (description, topics) work universally | Only translate where domain language genuinely differs |
| Vocabulary without operational adaptation | Cosmetic derivation — wrong operations with right names | Translate operations alongside vocabulary |

## Domain Examples

These domain compositions demonstrate vocabulary transformation in practice:

- [[therapy journal uses warm personality with pattern detection for emotional processing]] — Capture becomes "journal entry," process becomes "pattern detection," and the schema uses `mood`, `triggers`, `coping_used` instead of abstract `classification`, `variables`, `methods_applied`
- [[trading uses conviction tracking with thesis-outcome correlation]] — Claims become "trade theses," connections become "correlation analysis," and `conviction_level`, `thesis_status`, `market_regime` replace generic metadata fields
- [[legal case management uses precedent chains with regulatory change propagation]] — MOCs become "matter dashboards," maintenance becomes "precedent chain monitoring," and `jurisdiction`, `precedent_strength`, `opposing_arguments` reflect legal practitioner vocabulary
- [[creative writing uses worldbuilding consistency with character tracking]] — Notes become "canon facts," verification becomes "continuity checking," and `canon_status`, `characters_involved`, `timeline_position` speak the fiction writer's language
- [[student learning uses prerequisite graphs with spaced retrieval]] — Processing becomes "concept mapping," MOCs become "course maps," and `mastery_level`, `prerequisites`, `retrieval_strength` reflect learning science vocabulary
- [[health wellness uses symptom-trigger correlation with multi-dimensional tracking]] — Captures become "tracking entries," processing becomes "pattern analysis," and `symptom_type`, `severity`, `correlated_symptoms` match how health-conscious practitioners think about their data

## Grounding

This guidance is grounded in:
- [[schema fields should use domain-native vocabulary not abstract terminology]] — the foundational vocabulary principle
- [[schema field names are the only domain specific element in the universal note pattern]] — where domain specificity lives
- [[every knowledge domain shares a four-phase processing skeleton that diverges only in the process step]] — universal structure with domain-variable naming
- [[methodology traditions are named points in a shared configuration space not competing paradigms]] — traditions as vocabulary for shared operations
- [[false universalism applies same processing logic regardless of domain]] — the trap of not translating deeply enough
- [[multi-domain systems compose through separate templates and shared graph]] — cross-domain vocabulary challenges

---

Topics:
- [[index]]
- [[index]]
---

Topics:
- [[vocabulary-transformation]]
