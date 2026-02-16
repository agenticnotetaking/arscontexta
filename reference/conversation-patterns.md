# Conversation Pattern Examples

Worked examples validating the derivation heuristics end-to-end. Each pattern shows the full path from user description through signal extraction to derived configuration to vocabulary mapping. If a pattern produces clearly wrong dimensions, the heuristic needs adjustment. If patterns consistently produce coherent systems, the heuristics are earning their keep.

These patterns are living documents that evolve with the heuristics. Run the init wizard with each conversation pattern to validate — compare derived dimensions against the expected output, flag discrepancies as heuristic bugs or pattern inaccuracies.

---

## Pattern 1: Book Notes and Reading Habits

**User statement:** "I read 2-3 books a month and want to remember my reactions — what struck me, what I disagreed with, and how books connect to each other."

### Signal Extraction

| Signal | Dimension | Position | Confidence |
|--------|-----------|----------|------------|
| "2-3 books a month" | Volume projection | Low (~25-35 notes/year) | High |
| "remember my reactions" | Processing | Light — capture reaction, not full extraction | High |
| "what struck me, what I disagreed with" | Granularity | Moderate — per-book entries with multiple reactions, not atomic claims | High |
| "how books connect to each other" | Linking | Explicit — thematic connections between books | Medium |
| No mention of rigorous analysis | Processing | Light (confirms) | Medium |
| No mention of academic use | Navigation | 2-tier — small collection permits simple browsing | High |

### Follow-Up Questions

- "When you say 'remember my reactions' — is this mostly for personal enjoyment, or do you reference these notes for writing, discussions, or recommendations?"
- "How many books do you typically connect? Is it a handful of favorites, or are you looking to track themes across everything you read?"

The follow-ups clarify processing intensity (personal capture vs analytical extraction) and linking density (casual connections vs systematic thematic tracking). In this case, both answers confirm light processing and explicit linking.

### Derived Configuration

| Dimension | Position | Rationale |
|-----------|----------|-----------|
| Granularity | Moderate | Per-book notes capturing multiple reactions. Atomic would over-decompose — "Chapter 3's argument about X" is naturally part of the book note, not a separate file. |
| Organization | Flat | Even at low volume, flat with MOCs is simpler than folders. No reason to create genre folders for 30 notes. |
| Linking | Explicit | Direct wiki links between books that share themes. No semantic search needed — vocabulary is consistent at this scale. |
| Processing | Light | Capture reactions, connect to similar books. No extraction pipeline — the value is personal response, not claim decomposition. |
| Navigation | 2-tier | Hub MOC -> book notes. One hub with "Currently Reading," "Favorites," "By Theme" sections suffices. At 30 notes/year, deeper hierarchy is overhead. |
| Maintenance | Condition-based | Low volume means lax thresholds are appropriate — review when 5+ unconnected notes accumulate or inbox grows past 3 items |
| Schema | Minimal | `description`, `author`, `topics`. Rating optional. Dense schema adds capture friction that kills the habit at this volume. |
| Automation | Convention | Context file instructions only. No hooks, no pipelines. The user's engagement is personal, not systematic. |

### Vocabulary Mapping

| Universal Term | Domain Term |
|---------------|-------------|
| note | book note |
| reduce / extract | capture |
| reflect / connect | find connections |
| MOC | reading list |
| description | reaction summary |
| topics footer | themes |
| inbox | to-read |
| wiki link | connection |
| thinking notes | book notes |
| archive | finished reads |
| self/ space | reading companion |
| orient | review reading list |

### Active Feature Blocks

- `atomic-notes.md` — included (moderate granularity still benefits from composability principles)
- `wiki-links.md` — included (always)
- `mocs.md` — included (2-tier navigation)
- `light-processing.md` — included (processing = light)
- `maintenance.md` — included (always)
- `self-evolution.md` — included (always)
- `session-rhythm.md` — included (always)
- `templates.md` — included (book note template)
- `ethical-guardrails.md` — included (always)

### Excluded Feature Blocks

- `processing-pipeline.md` — excluded (processing = light)
- `semantic-search.md` — excluded (linking = explicit only)
- `schema.md` — excluded (schema = minimal)
- `personality.md` — excluded (no personality signals detected)
- `multi-domain.md` — excluded (single domain)

### Key Insights

1. **Lax maintenance thresholds are correct because tighter ones produce more overhead than value at 25-35 notes/year.** Reviewing when a handful of unconnected notes accumulate surfaces connections and triggers new reactions without feeling like chores.

2. **Light processing does NOT mean no processing.** Capture-and-connect still requires the user to articulate reactions ("what struck me") and find thematic links. It is lighter than extraction but heavier than raw filing.

3. **The derivation correctly avoids atomic granularity.** A book note with 3-4 reactions per book is the natural unit. Forcing "one reaction per file" would feel artificial and create tiny orphaned fragments that the user wouldn't revisit.

---

## Pattern 2: Family and Friends Memory

**User statement:** "I want to remember things about the people I care about — their preferences, what's going on in their lives, birthdays, the little things that make someone feel seen."

### Signal Extraction

| Signal | Dimension | Position | Confidence |
|--------|-----------|----------|------------|
| "people I care about" | Organization | Entity-centric (per-person MOCs) | High |
| "preferences" | Schema | Moderate — structured fields for preferences | High |
| "what's going on in their lives" | Processing | Light — capture encounters, not deep analysis | High |
| "birthdays" | Schema | Date fields, reminder potential | High |
| "the little things" | Granularity | Moderate — small observations, not full analyses | Medium |
| "make someone feel seen" | Personality | Warm, emotionally attentive | Medium |
| No mention of analysis or research | Processing | Light (confirms) | High |

### Follow-Up Questions

- "How many people are in your close circle? Roughly how often would you be adding something new?"
- "Would you want reminders — like a nudge before someone's birthday or when it's been a while since you checked in?"

The first question calibrates volume and maintenance trigger thresholds. The second probes automation potential (reminders.md in ops/ is a lightweight automation that doesn't require hooks). Both answers shape the system without requiring the user to understand configuration dimensions.

### Derived Configuration

| Dimension | Position | Rationale |
|-----------|----------|-----------|
| Granularity | Moderate | Per-observation notes — "Sarah mentioned she's nervous about the new job" is one note. Not atomic (no decomposition needed) but not coarse (separate observations are independently useful). |
| Organization | Flat | Flat with entity MOCs. Each person gets their own MOC file as the primary lookup. No folder-per-person — wiki links handle grouping. |
| Linking | Explicit | Direct links between people (shared events, mutual friends). No semantic search at expected volume. |
| Processing | Light | Capture encounters, file under person. No extraction pipeline — the value is in recording, not analyzing. |
| Navigation | 2-tier | Hub MOC ("relationships") -> per-person MOCs. Simple, person-centric browsing. |
| Maintenance | Condition-based | Review when contact recency flags trigger or follow-ups accumulate: who needs attention? Which follow-ups are pending? |
| Schema | Moderate | `person`, `category` (preference/pattern/important-date/interaction/care-task), `last_confirmed`, `follow_up`. Emotional context as schema field because "nervous about new job" is the information that makes the user thoughtful. |
| Automation | Convention | Context file instructions. Potential for reminder hooks later if the user wants birthday notifications. |

### Vocabulary Mapping

| Universal Term | Domain Term |
|---------------|-------------|
| note | memory |
| reduce / extract | notice |
| reflect / connect | trace connections |
| MOC | person page |
| description | memory context |
| topics footer | people |
| inbox | encounters |
| wiki link | connection |
| thinking notes | memories |
| archive | past encounters |
| self/ space | relationship tracker |
| orient | check in |

### Personality Derivation

| Dimension | Position | Signal |
|-----------|----------|--------|
| Warmth | Warm | "make someone feel seen" — emotional attentiveness in the user's framing |
| Opinionatedness | Neutral | No signal for proactive opinions |
| Formality | Casual | "the little things" — conversational register |
| Emotional Awareness | Emotionally attentive | Core purpose is emotional — remembering what matters to people |

### Active Feature Blocks

- `atomic-notes.md` — included (moderate granularity)
- `wiki-links.md` — included (always)
- `mocs.md` — included (entity MOCs are the core navigation)
- `light-processing.md` — included (processing = light)
- `maintenance.md` — included (always)
- `self-evolution.md` — included (always)
- `session-rhythm.md` — included (always)
- `templates.md` — included (relationship note template)
- `ethical-guardrails.md` — included (always)
- `personality.md` — included (warm, emotionally attentive signals detected)

### Excluded Feature Blocks

- `processing-pipeline.md` — excluded (processing = light)
- `semantic-search.md` — excluded (linking = explicit)
- `schema.md` — excluded (moderate schema is handled by template, not a dedicated feature block)
- `multi-domain.md` — excluded (single domain)

### Key Insights

1. **Entity MOCs are the primary navigation pattern.** The user's mental model is "tell me about Sarah," not "show me notes about preferences." Per-person MOCs with sections (Preferences, Life Updates, Important Dates, Care Tasks) directly match the retrieval pattern.

2. **Emotional context in schema is not optional.** "Sarah got the promotion" is a fact. "Sarah got the promotion — she was so relieved after months of anxiety" is a memory that enables genuine connection. The `emotional_context` field captures what makes this a relationship tool, not a contact database.

3. **Follow-up field creates actionable memory.** `follow_up: true` flags observations that need action — "ask Sarah how the new job is going next time we talk." Without it, observations accumulate without prompting action.

---

## Pattern 3: Climate Adaptation Research

**User statement:** "I'm reading 5-10 papers a week on climate adaptation and need to track claims across disciplines — the policy papers cite different evidence than the engineering ones, and I need to see where they agree and disagree."

### Signal Extraction

| Signal | Dimension | Position | Confidence |
|--------|-----------|----------|------------|
| "5-10 papers a week" | Volume projection | High (~250-500 claims/year) | High |
| "track claims" | Granularity | Atomic — one claim per note | High |
| "across disciplines" | Linking | Explicit+implicit — semantic search essential for cross-vocabulary matching | High |
| "policy papers cite different evidence than engineering ones" | Processing | Heavy — extraction, comparison, contradiction tracking | High |
| "where they agree and disagree" | Schema | Moderate — classification fields, source tracking | High |
| Academic/research register | Navigation | 3-tier — high volume needs deep hierarchy | High |

### Follow-Up Questions

- "Are you working toward a specific output — a literature review, thesis, or policy document? Or is this ongoing sense-making for your own understanding?"
- "When you find conflicting claims, do you want to track the conflict as its own entity, or just note that papers disagree?"

The first question affects processing intensity (output-directed processing is heavier) and self/ identity (research identity vs general learner). The second probes schema design for tension tracking — if conflicts are entities, they get their own note type with a `contradicts` relationship field. Both the user's high volume and cross-disciplinary focus make the signals unusually clear: this is a heavy-processing research system.

### Derived Configuration

| Dimension | Position | Rationale |
|-----------|----------|-----------|
| Granularity | Atomic | "Track claims" is the direct signal. Each claim from each paper gets its own note. Cross-disciplinary comparison requires decomposition — you can't compare paper-level summaries across disciplines effectively. |
| Organization | Flat | Flat with MOC overlay. Folder-per-discipline would create silos that prevent the cross-disciplinary connections the user explicitly needs. |
| Linking | Explicit+implicit | Explicit wiki links for known connections. Semantic search essential because policy and engineering papers use different vocabulary for the same phenomena ("resilience" vs "structural adaptation"). |
| Processing | Heavy | Full extraction pipeline: reduce papers to claims, reflect to find connections, reweave to update older claims when new evidence arrives. The user's goal requires systematic processing, not casual capture. |
| Navigation | 3-tier | Hub -> discipline MOCs (policy, engineering, ecology, economics) -> topic MOCs (flood adaptation, heat resilience, migration patterns) -> atomic claims. High volume demands deep navigation. |
| Maintenance | Condition-based (tight thresholds) | Reweave pass after each processing batch completes. At 5-10 papers/week, lax thresholds would leave too many unconnected claims accumulating. |
| Schema | Moderate | `description`, `methodology` (which discipline), `source`, `classification` (claim/methodology/tension), `topics`. Dense enough for cross-discipline queries, not so dense as to slow capture. |
| Automation | Convention | Start with context file instructions. Add processing pipeline hooks when volume creates friction. The user is a researcher — they'll want automation once they see the pattern. |

### Vocabulary Mapping

| Universal Term | Domain Term |
|---------------|-------------|
| note | claim |
| reduce / extract | extract |
| reflect / connect | map connections |
| MOC | topic map |
| description | claim context |
| topics footer | research areas |
| inbox | reading queue |
| wiki link | connection |
| thinking notes | claims |
| archive | processed papers |
| self/ space | research identity |
| orient | survey landscape |

### Active Feature Blocks

- `atomic-notes.md` — included (granularity = atomic)
- `wiki-links.md` — included (always)
- `mocs.md` — included (3-tier navigation)
- `processing-pipeline.md` — included (processing = heavy)
- `semantic-search.md` — included (linking = explicit+implicit)
- `schema.md` — included (schema = moderate)
- `maintenance.md` — included (always)
- `self-evolution.md` — included (always)
- `session-rhythm.md` — included (always)
- `templates.md` — included (research note template)
- `ethical-guardrails.md` — included (always)

### Excluded Feature Blocks

- `light-processing.md` — excluded (processing = heavy)
- `personality.md` — excluded (no personality signals — academic register suggests neutral default)
- `multi-domain.md` — excluded (single domain, though sub-disciplines exist)

### Key Insights

1. **This pattern converges with the Research preset because the signals are unambiguous.** "Claims from papers" + "across disciplines" + high volume = atomic + heavy processing + semantic search. The derivation engine should recognize this convergence and produce configuration nearly identical to the preset.

2. **Semantic search is essential, not optional.** The user explicitly states that different disciplines use different terminology. Without semantic search, a search for "flood resilience" would miss papers about "structural flood adaptation" — and cross-disciplinary synthesis is the user's core need.

3. **The tension-tracking capability is a natural extension.** "Where they agree and disagree" maps directly to the `classification: tension` type. The derivation engine should include contradiction tracking in the processing pipeline instructions.

---

## Pattern 4: Therapy Journal

**User statement:** "I want to track my therapy journey and notice patterns between sessions — like when the same feeling keeps coming up in different situations, or when something my therapist says clicks weeks later."

### Signal Extraction

| Signal | Dimension | Position | Confidence |
|--------|-----------|----------|------------|
| "therapy journey" | Domain | Therapy/Reflection | High |
| "notice patterns between sessions" | Processing | Moderate — pattern detection, not full extraction | High |
| "the same feeling keeps coming up" | Linking | Explicit — direct connections between sessions mentioning same patterns | High |
| "in different situations" | Processing | Moderate — cross-situation analysis | Medium |
| "clicks weeks later" | Maintenance | Tight thresholds — frequent revisiting to catch delayed insights | High |
| Personal, vulnerable tone | Personality | Warm, emotionally attentive | High |

### Follow-Up Questions

- "When you say 'track my therapy journey' — are you writing detailed session reflections, or quick notes about what came up?"
- "Would you want the system to actively surface patterns, or more just help you organize so you can spot them yourself?"

The first question resolves granularity (detailed reflections suggest moderate, quick notes suggest coarse). The second resolves processing intensity (active pattern surfacing = moderate processing with agent-detected themes, self-organized = light processing with user-driven review). In this case, the user's "notice patterns" language suggests they want active surfacing.

### Derived Configuration

| Dimension | Position | Rationale |
|-----------|----------|-----------|
| Granularity | Moderate | Per-session reflections with multiple observations. Atomic decomposition of therapy sessions feels clinical and fragmenting — "the anxiety I felt during the argument" is naturally part of the session reflection, not a standalone claim. |
| Organization | Flat | Flat with theme MOCs. Themes (anxiety, relationships, work stress, growth) emerge organically and cross-cut chronology. |
| Linking | Explicit | Direct connections between reflections that share patterns. At moderate volume, explicit links suffice. Semantic search adds value later if collection grows past 100. |
| Processing | Moderate | Pattern detection across reflections. Not full extraction (would feel invasive) but more than just capture (patterns need active surfacing). The maintenance output IS the therapy value. |
| Navigation | 2-tier | Hub ("my themes") -> theme MOCs (anxiety patterns, relationship insights, growth milestones). Volume stays moderate — regular journaling produces ~50 reflections/year. |
| Maintenance | Condition-based (tight thresholds) | Aligned with session rhythm. Health check after each session capture surfaces "you mentioned anxiety three times recently" — which is precisely the kind of insight the user seeks. |
| Schema | Moderate | `category` (pattern/trigger/coping-strategy/insight/growth-goal), `confidence` (observed/hypothesized/verified), `frequency` (once/occasional/regular/constant). Rich enough for pattern queries without imposing clinical structure. |
| Automation | Convention | Context file instructions. Hooks could automate pattern detection later, but starting automated feels presumptuous for intimate content. |

### Vocabulary Mapping

| Universal Term | Domain Term |
|---------------|-------------|
| note | reflection |
| reduce / extract | surface |
| reflect / connect | find patterns |
| verify | check resonance |
| MOC | theme |
| description | reflection summary |
| topics footer | themes |
| inbox | journaling |
| wiki link | pattern link |
| thinking notes | reflections |
| archive | past reflections |
| self/ space | reflection partner |
| orient | center |
| persist | journal |

### Personality Derivation

| Dimension | Position | Signal |
|-----------|----------|--------|
| Warmth | Warm | Vulnerable content requires warmth — clinical language about therapy sessions creates distance |
| Opinionatedness | Neutral | The agent surfaces patterns, it doesn't judge them |
| Formality | Casual | The user's own language is conversational ("clicks weeks later") |
| Emotional Awareness | Emotionally attentive | Core purpose — "the same feeling keeps coming up" is an emotional pattern the agent should notice and name |

### Personality x Generated Files

The personality profile (warm, neutral, casual, emotionally attentive) produces noticeably different generated content:

**Context file voice:** "I pay attention to what you write about your sessions — when the same feeling keeps showing up in different situations, I'll connect the dots so you can see the thread."

**Skill instruction language:** "Before marking a reflection complete, check: does the description capture the emotional core, not just the event? 'Had a hard conversation with mom' is the event. 'The fear of disappointing mom surfaced again — same pattern as the work conflict last month' is the reflection."

**self/identity.md:** "I'm your reflection partner. I remember what you've shared across sessions, I notice when patterns recur, and I surface connections you might not see in the moment. I won't push — I'll observe, connect, and let you draw your own conclusions."

**Health report rendering:** "This week's patterns: anxiety appeared in 3 reflections (Monday's work situation, Wednesday's family call, Friday's session). The connection to 'fear of judgment' theme is strengthening — last month it appeared once, this month three times."

### Active Feature Blocks

- `atomic-notes.md` — included (moderate granularity)
- `wiki-links.md` — included (always)
- `mocs.md` — included (2-tier navigation)
- `processing-pipeline.md` — included (processing = moderate)
- `maintenance.md` — included (always)
- `self-evolution.md` — included (always)
- `personality.md` — included (warm+emotionally attentive derived)
- `session-rhythm.md` — included (always)
- `templates.md` — included (reflection note template)
- `ethical-guardrails.md` — included (always, critical for therapy domain)

### Excluded Feature Blocks

- `light-processing.md` — excluded (processing = moderate)
- `semantic-search.md` — excluded (linking = explicit at low-moderate volume)
- `schema.md` — excluded (moderate schema handled by template)
- `multi-domain.md` — excluded (single domain)

### Key Insights

1. **The maintenance output IS the therapy value.** "You mentioned anxiety three times this week" is not a health check — it is the insight the user came for. This reframes maintenance from overhead to core product.

2. **Personality is non-negotiable for therapy.** A clinical agent saying "3 new patterns identified in your reflections" would feel like a diagnostic report, not a therapy companion. Warmth and emotional awareness are functional requirements, not nice-to-haves.

3. **Moderate processing is specifically "pattern detection."** Not full extraction (too clinical), not just capture (misses the patterns). The unique process step for therapy is: scan for recurring themes, emotional patterns, and trigger-response chains.

4. **Ethical guardrails are especially critical.** The agent must never diagnose, must encourage professional support, must respect the user's autonomy in interpreting patterns. The guardrails block includes therapy-specific constraints.

---

## Pattern 5: Multi-Project PM

**User statement:** "I manage three products and need to track decisions and their rationale — why we chose X over Y, what we considered, and how those decisions connect across products."

### Signal Extraction

| Signal | Dimension | Position | Confidence |
|--------|-----------|----------|------------|
| "manage three products" | Organization | Multi-domain — but flat, not folder silos | High |
| "track decisions" | Granularity | Moderate — per-decision notes with rationale | High |
| "and their rationale" | Processing | Moderate — capture decision context, not just outcome | High |
| "why we chose X over Y" | Schema | Dense — alternatives, rationale, stakeholders | High |
| "what we considered" | Schema | Dense — alternatives field | Medium |
| "how those decisions connect across products" | Linking | Explicit — cross-product links are the core value | High |
| Professional register | Personality | Neutral-helpful default | Medium |

### Follow-Up Questions

- "How often do decisions get revisited or reversed? Is this more of a living document or a historical record?"
- "Do other people need to read these, or is this primarily for your own reference?"

The first question calibrates maintenance trigger sensitivity and schema temporal fields. If decisions get reversed, the `superseded_by` field becomes essential and maintenance thresholds need to be tighter. The second affects formality (team-readable implies formal) and schema density (shared context requires more structure for others to parse). In this case, decisions do get revisited (condition-triggered maintenance, `status` field), and it's primarily for personal reference (casual formality acceptable).

### Derived Configuration

| Dimension | Position | Rationale |
|-----------|----------|-----------|
| Granularity | Moderate | Per-decision notes — "We chose Redis over Memcached for session caching" is one decision with supporting rationale. Not atomic (the rationale IS part of the decision), not coarse (each decision stands alone). |
| Organization | Flat | Flat with product MOCs. Folder-per-product would prevent cross-product decision tracking — exactly the capability the user needs. |
| Linking | Explicit | Direct wiki links between related decisions. "The session caching decision constrains our CDN choice" is an explicit dependency the user wants tracked. |
| Processing | Moderate | Capture decision context at decision time (4-phase: capture, document alternatives, connect to related decisions, verify completeness). Not heavy extraction — decisions are generated, not mined. |
| Navigation | 2-tier | Hub ("decision landscape") -> product MOCs (Product A, Product B, Product C). Cross-product decisions appear in multiple MOCs via Topics footer. |
| Maintenance | Condition-based | Review when decisions accumulate without cross-referencing or staleness flags trigger: which decisions are stale? Which need revisiting because context changed? Which cross-product implications haven't been traced? |
| Schema | Dense | `description`, `alternatives` (what was considered), `rationale` (why this choice), `stakeholders`, `status` (active/superseded/reversed), `superseded_by` (link to newer decision), `implications` (what this constrains). Dense because decisions are structured by nature — they have inputs, outputs, and dependencies. |
| Automation | Convention | Context file instructions. Potential for decision-tracking hooks later (auto-detect when a new decision references an old one). |

### Vocabulary Mapping

| Universal Term | Domain Term |
|---------------|-------------|
| note | decision record |
| reduce / extract | document |
| reflect / connect | link decisions |
| verify | review quality |
| MOC | decision register |
| description | decision rationale |
| topics footer | project areas |
| inbox | action items |
| wiki link | decision trail |
| thinking notes | decisions |
| archive | closed decisions |
| self/ space | project mind |
| orient | status check |
| persist | update status |

### Active Feature Blocks

- `atomic-notes.md` — included (moderate granularity)
- `wiki-links.md` — included (always)
- `mocs.md` — included (2-tier navigation)
- `processing-pipeline.md` — included (processing = moderate)
- `schema.md` — included (schema = dense)
- `maintenance.md` — included (always)
- `self-evolution.md` — included (always)
- `session-rhythm.md` — included (always)
- `templates.md` — included (decision record template)
- `ethical-guardrails.md` — included (always)
- `multi-domain.md` — included (three products detected)

### Excluded Feature Blocks

- `light-processing.md` — excluded (processing = moderate)
- `semantic-search.md` — excluded (linking = explicit)
- `personality.md` — excluded (neutral-helpful default, no personality signals)

### Key Insights

1. **The `superseded_by` schema field is domain-essential.** Decisions evolve — today's architecture choice may be reversed next quarter. Without `superseded_by`, old decisions look current. The temporal dynamics of PM produce this field naturally, unlike research where claims don't typically get superseded (they get refined or challenged).

2. **Cross-product linking is the primary value.** The user could track per-product decisions in a spreadsheet. What the knowledge graph adds is cross-product dependency tracking — "the API versioning decision in Product A constrains authentication in Product B." This is precisely what wiki links excel at.

3. **Dense schema is appropriate here because decisions ARE structured.** Unlike therapy (where dense schema feels clinical) or books (where it feels bureaucratic), decisions have natural structure: what, why, what else was considered, who decided, what it constrains. The schema maps to the domain's inherent structure.

4. **Flat organization prevents product silos.** Folder-per-product would make cross-product decisions awkward — which folder does a shared infrastructure decision go in? Flat with product MOCs lets the same decision appear in multiple product contexts naturally.

---

## Cross-Pattern Analysis

### Dimension Distribution Across Patterns

| Dimension | Books | Family | Research | Therapy | PM |
|-----------|-------|--------|----------|---------|-----|
| Granularity | moderate | moderate | atomic | moderate | moderate |
| Organization | flat | flat | flat | flat | flat |
| Linking | explicit | explicit | explicit+implicit | explicit | explicit |
| Processing | light | light | heavy | moderate | moderate |
| Navigation | 2-tier | 2-tier | 3-tier | 2-tier | 2-tier |
| Maintenance | condition-based (lax) | condition-based (lax) | condition-based (tight) | condition-based (tight) | condition-based (moderate) |
| Schema | minimal | moderate | moderate | moderate | dense |
| Automation | convention | convention | convention | convention | convention |

**Observations:**

1. **Organization is flat across all patterns.** The research strongly favors flat-associative for agent-operated systems. No conversation pattern produced a hierarchical result.

2. **Automation is convention for all patterns.** Following Gall's Law, all systems start at convention. This is the correct conservative default — automation should grow from friction, not from anticipation.

3. **Granularity is atomic only for research.** Most domains naturally produce moderate-granularity notes. Atomic granularity is a specific research/academic choice driven by cross-disciplinary claim comparison needs.

4. **Processing intensity correlates with retrieval complexity.** Heavy processing is needed when the user explicitly needs cross-referencing (research claims across disciplines). Light processing suffices when capture IS the value (books, relationships).

5. **Schema density follows domain structure.** PM decisions have inherent structure -> dense. Therapy reflections have some structure -> moderate. Book reactions are free-form -> minimal.

### Signal Reliability

| Signal Type | Reliability | Example |
|-------------|-------------|---------|
| Volume indicators ("5-10 papers/week") | High | Directly maps to volume cascade |
| Processing words ("track claims," "remember reactions") | High | Verb choice reveals processing intensity |
| Connection words ("across disciplines," "connect across products") | High | Explicitly reveals linking needs |
| Emotional register ("the little things," "clicks weeks later") | Medium | Personality signal, but can be ambiguous |
| Absence of signals | Medium | No mention of analysis -> light processing (but could be implicit) |

### When Presets Match vs When They Don't

| Pattern | Closest Preset | Match Quality | Key Deviation |
|---------|---------------|---------------|---------------|
| Books | Personal Assistant | Moderate | Books are more topical; Personal Assistant preset adapted for light processing |
| Family | Personal Assistant | High | Personal Assistant preset with relationship-focused vocabulary |
| Research | Research | High | Near-exact match — signals are unambiguous |
| Therapy | Personal Assistant | Moderate | Personal Assistant base, significantly adapted for therapy domain and personality |
| PM | Experimental | Moderate | Novel enough to warrant full dimension exploration; PM decision tracking has unique temporal dynamics |

### Opt-In/Opt-Out Decisions

After establishing the domain and preset direction, the wizard presents two opt-in/opt-out decisions with full explanations. These apply to ALL conversation patterns:

**1. Self Space:**

The self/ directory provides agent persistent memory (identity, methodology, goals) that persists across sessions.

| Preset | Default | Rationale |
|--------|---------|-----------|
| Research | OFF | Focus is the knowledge graph, not agent identity |
| Personal Assistant | ON | Agent identity and persistent memory are central |
| Experimental | Configurable | Depends on domain signals |

Example phrasing: "Your research vault focuses on the knowledge graph — the notes and connections are the value. Some users also want a self/ space where the agent develops persistent identity and remembers its own methodology across sessions. For research, this is usually not needed. Would you like it enabled?"

**2. qmd Semantic Search:**

Whether to enable qmd for meaning-based discovery across vocabularies.

Example phrasing: "Semantic search lets the system find connections even when different terms describe the same concept — like matching 'strict scrutiny' with 'heightened review.' It is especially valuable for cross-disciplinary work. Would you like to enable it?"

For Pattern 3 (Climate Research), qmd should be strongly recommended due to cross-disciplinary vocabulary. For Pattern 1 (Books) and Pattern 2 (Family), qmd is unnecessary at expected volume. For Pattern 4 (Therapy), qmd is optional — low volume initially but could help with pattern matching across vocabulary.

These decisions appear in the conversation AFTER dimension derivation but BEFORE generation. The user always makes the final call.

### The Follow-Up Pattern

Across all five examples, effective follow-up questions share characteristics:

1. **They resolve ambiguous signals, not obvious ones.** "Are you doing research?" is unnecessary when the user says "track claims across disciplines." But "are you writing toward a specific output?" clarifies processing intensity that the initial statement leaves ambiguous.

2. **They use the user's vocabulary, not system vocabulary.** "How do you want your books organized?" is system-centric. "When you want to find what you thought about a book, how do you usually look?" is user-centric and reveals retrieval patterns.

3. **They're concrete, not abstract.** "What granularity do you prefer?" means nothing to users. "Would you rather have one big note per book, or separate notes for different reactions?" makes the tradeoff tangible.

4. **They limit to 2-3 per conversation.** More than 3 follow-ups feels like an interrogation. The derivation engine should extract maximum signal from each answer and fill remaining gaps with domain-appropriate defaults.
