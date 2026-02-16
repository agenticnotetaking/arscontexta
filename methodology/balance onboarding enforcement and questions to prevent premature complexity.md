---
description: What to enforce, what to explain, and what to ask during /setup — the decision framework for vault generation that prevents premature complexity while ensuring a healthy starting point
kind: guidance
status: active
topics: ["[[derivation-engine]]"]
---

# balance onboarding enforcement and questions to prevent premature complexity

/setup is the most consequential moment in a vault's life. The choices made here determine whether the system compounds value or gets abandoned within a week. Since [[premature complexity is the most common derivation failure mode]], the primary risk is generating too much structure too soon.

This doc tells the plugin WHAT to decide during /setup, and more importantly, what NOT to decide.

## The Three Categories

Every onboarding decision falls into one of three categories:

### 1. Enforce (Non-Negotiable)

These are always present, never optional. The user doesn't choose them because without them the system doesn't function.

| Feature | Why Non-Negotiable | Implementation |
|---------|-------------------|----------------|
| Markdown files with YAML frontmatter | Since [[markdown plus YAML plus ripgrep implements a queryable graph database without infrastructure]], this is the storage layer | Generated automatically |
| `description` field on every note | Since [[descriptions are retrieval filters not summaries]], agents need descriptions for discovery | Required in all templates |
| Wiki links as connection mechanism | Links are the graph edges that make traversal possible | Enabled by default |
| `topics` field linking to at least one MOC | Orphan prevention — notes must be navigable | Required in templates |
| Capture zone (inbox equivalent) | Content needs a place to land without ceremony | Generated folder |
| At least one MOC | Navigation needs a starting point | Hub MOC generated |
| Context file (CLAUDE.md equivalent) | Agent needs orientation per session | Generated with domain config |
| Git commits on significant changes | Version history enables rollback and tracks evolution | Configured per platform |
| Session logging | Operational observability — since [[maintenance operations are more universal than creative pipelines because structural health is domain-invariant]] | Logging structure generated |
| Timestamps on entries | Temporal ordering is required for pattern detection and freshness checks | Required in templates |

These are the kernel primitives. Since [[ten universal primitives form the kernel of every viable agent knowledge system]], they form the invariant base that derivation never varies.

### 2. Explain (Defaults with Rationale)

These have sensible defaults but the user should understand why. The plugin sets the default and explains it, giving the user the option to change.

| Decision | Default | Rationale | When to Change |
|----------|---------|-----------|----------------|
| Processing intensity | Medium | Balances thoroughness with overhead | Heavy for research/therapy; Light for tracking domains |
| MOC hierarchy pattern | Based on domain | Three-tier for research, flat-peer for personal | User preference for flatter/deeper |
| Schema strictness | Soft enforcement | Since [[schema enforcement via validation agents enables soft consistency]], start soft | Hard enforcement only if user requests it |
| Review cadence triggers | Condition-based | Since [[maintenance scheduling frequency should match consequence speed not detection capability]] | Time-based if user prefers regular rhythm |
| Note granularity | Atomic (claim-level) | Since [[note titles should function as APIs enabling sentence transclusion]], atomic enables composability | Compound for domains with narrative content |
| Linking style | Inline preferred | Since [[inline links carry richer relationship data than metadata fields]] | Footer-only for less writing-intensive domains |

The key principle: **explain WHY the default is set, then let the user override.** Don't ask "Do you want atomic or compound notes?" — say "Your notes will be atomic (one idea per note) because this enables remixing ideas across contexts. If you prefer longer, more narrative entries, I can adjust this."

### 3. Ask (Genuinely Variable)

These have no sensible default — the plugin must ask because the answer depends on the user's specific situation.

| Question | Why Ask | What It Determines |
|----------|---------|-------------------|
| What domain(s) do you work in? | Selects domain composition(s) | Entire vault architecture |
| What's your primary goal? | Distinguishes storage from thinking | Processing pipeline depth |
| What do you already have? | Import vs fresh start | Migration strategy |
| What platform are you on? | Since [[platform capability tiers determine which knowledge system features can be implemented]] | Feature ceiling |
| How much time will you spend with this? | Daily vs weekly vs sporadic | Maintenance trigger frequency |

**Ask as few questions as possible.** Since [[configuration paralysis emerges when derivation surfaces too many decisions]], the plugin should derive most configuration from the domain selection + primary goal, asking only what it genuinely cannot infer.

## The Onboarding Flow

### Step 1: Domain Discovery (Ask)
"What kind of knowledge work do you do?" Listen for domain signals. Map to closest domain composition(s). If multi-domain, identify primary.

### Step 2: Goal Clarification (Ask)
"Are you building a system to store and retrieve information, or to develop and connect ideas?" This determines since [[storage versus thinking distinction determines which tool patterns apply]] the fundamental system type.

### Step 3: Configuration Derivation (Explain)
Based on domain + goal, derive the 8 configuration dimensions. Show the user what was chosen and why:

"Based on your research workflow, I'm setting up:
- Atomic notes (one claim per note, so you can remix ideas)
- Three-tier MOC hierarchy (hub → domain → topic, for layered navigation)
- Heavy processing (each source gets claim extraction, connection finding, and verification)
- Condition-based maintenance (health checks run when conditions trigger, not on a schedule)

These are defaults — tell me if any feel wrong for how you work."

### Step 4: Vault Generation (Enforce)
Generate the vault with kernel primitives + domain-specific layers:
- Folder structure
- Note templates with domain-native schemas
- MOC hierarchy (initial MOCs with placeholder structure)
- Context file with orientation protocol
- Processing pipeline configuration
- Maintenance trigger definitions

### Step 5: First Capture (Immediate Use)
Don't end /setup with "your system is ready." End with capturing something:
"Let's add your first note. What are you working on right now?"

Immediate use prevents the "I set it up but never used it" failure mode. Since [[friction-driven module adoption prevents configuration debt by adding complexity only at pain points]], the user should experience the system working before adding more features.

## What NOT to Ask

| Common Question | Why Skip It | What to Do Instead |
|----------------|------------|---------------------|
| "How many MOC levels?" | Users can't predict this | Start with 1-2 levels, grow organically |
| "What schema fields do you want?" | Users don't know yet | Start with domain defaults, evolve per [[schema evolution follows observe-then-formalize not design-then-enforce]] |
| "How should notes connect?" | Abstract question with no good answer | Show connection types through example |
| "What maintenance schedule?" | Since [[maintenance scheduling frequency should match consequence speed not detection capability]] | Set condition-based defaults |
| "What processing model?" | Meaningless to non-technical users | Derive from domain + goal |

## Preset-Based Simplification

Since [[use-case presets dissolve the tension between composability and simplicity]], the plugin offers presets as the primary onboarding path:

| Preset | Optimized For | Configuration |
|--------|--------------|---------------|
| **Research** | Academic research, literature review, thesis work | Heavy processing, three-tier MOCs, atomic notes, citation tracking |
| **Personal Assistant** | Life areas, goals, habits, reviews | Medium processing, flat-peer MOCs, mixed granularity, area health tracking |
| **Experimental** | Novel/specialized domains | Medium processing, configurable MOCs, derive from closest reference |

Users select a preset, optionally customize, and get a working vault. Advanced configuration is available but not required.

## Multi-Domain Onboarding

When users need multiple domains (e.g., "I do research AND track personal goals"), the plugin:

1. Identifies the primary domain (most time investment)
2. Adds secondary domains as layers (see [[multi-domain-composition]])
3. Generates shared infrastructure (inbox, context file, maintenance) once
4. Adds domain-specific note types and MOCs per domain
5. Explains how domains interact: "Your research claims and personal goals share the same graph. A research finding might connect to a personal goal."

Since [[multi-domain systems compose through separate templates and shared graph]], domains add note types and MOCs without conflicting.

## Domain-Specific Onboarding Patterns

Different domains need different onboarding emphasis. The plugin adjusts what it highlights during /setup based on the detected domain:

| Domain | Onboarding Emphasis | What to Frontload | What to Defer |
|--------|--------------------|--------------------|---------------|
| Research | Claim extraction pipeline, source management | MOC hierarchy, citation schema | Review cadence, synthesis scheduling |
| Therapy | Ethical constraints, privacy setup, warmth calibration | Mood tracking schema, pattern detection | Strategy effectiveness tracking |
| PM | Decision tracking, stakeholder mapping | Meeting extraction templates, action items | Estimation analysis, retrospective synthesis |
| Creative Writing | Consistency graph, canon management | Character/location/world-rule templates | Plot thread tracking, voice drift detection |
| Personal Life | Area structure, review rhythm | Life area MOCs, capture workflow | Goal cascading, habit tracking |
| Trading | Risk management, journal discipline | Trade journal template, thesis tracking | Correlation analysis, strategy backtesting |
| Health | Tracking schema, correlation setup | Measurement templates, baseline capture | Protocol effectiveness, trend analysis |
| Learning | Knowledge mapping, prerequisite tracking | Course/concept templates, mastery levels | Spaced repetition, cross-course synthesis |

**The principle:** each domain has a "day one essential" and a "month two extension." /setup delivers the essential. The extension waits for friction to signal need.

### Domain-Specific First Captures

The first capture should demonstrate the domain's core value proposition:

- **Research:** "What paper are you reading right now? Let's extract its claims."
- **Therapy:** "What's on your mind right now? Let's capture a reflection."
- **PM:** "What decision did your team make recently? Let's document it with rationale."
- **Creative:** "Tell me about your main character. Let's build their canonical entry."
- **Personal:** "What are your life areas? Let's set up the structure."

The first capture proves the system works before the user can lose momentum.

## Progressive Disclosure During Onboarding

/setup should reveal the system's capabilities in layers, not all at once. Since [[configuration paralysis emerges when derivation surfaces too many decisions]], the plugin progressively discloses features:

**Layer 1 (During /setup):** Core capture + basic navigation. The user can write notes and find them.

**Layer 2 (First week):** Processing pipeline activation. The user sees the system extract value from their raw captures. "I noticed you've captured 5 entries. Here are 3 patterns I detected."

**Layer 3 (First month):** Maintenance and evolution. The user encounters natural friction points and the plugin suggests solutions. "Your inbox has 12 unprocessed items. Would you like me to activate automatic processing?"

**Layer 4 (Ongoing):** System-level optimization. The plugin recommends structural changes based on accumulated operational evidence. "Your research MOC has 45 notes — splitting into sub-MOCs would improve navigation."

This progressive disclosure maps to the seed-evolve-reseed lifecycle: Layer 1 is the seed, Layers 2-3 are evolution, and Layer 4 enables principled restructuring when needed.

## Post-Init Evolution

/setup is a starting point, not a final configuration. The plugin should:

1. **Track friction** — When the user struggles with a workflow, log an observation
2. **Suggest modules** — When a pain point matches an available module, suggest activation
3. **Evolve schemas** — When users consistently add fields manually, propose schema updates
4. **Grow MOCs** — When topics accumulate notes, suggest MOC creation

Since [[derived systems follow a seed-evolve-reseed lifecycle]], the initial vault is the seed. Evolution happens through use. Reseeding happens when accumulated friction justifies restructuring.

## Anti-Patterns

| Anti-Pattern | Why It Fails | Better Approach |
|-------------|-------------|-----------------|
| Ask everything upfront | Configuration paralysis, decision fatigue | Ask 3-5 questions, derive the rest |
| Generate maximum features | Premature complexity, maintenance burden | Start minimal, grow with pain points |
| No explanation of defaults | User doesn't understand their system | Explain key decisions briefly |
| Skip first capture | Setup without use → abandonment | End /setup with actual content |
| Require platform expertise | Users shouldn't need to understand hooks/skills | Abstract platform details behind presets |
| Same onboarding for all domains | Different domains have different day-one essentials | Domain-specific first captures |
| Showing all capabilities at once | Overwhelm before the system proves value | Progressive disclosure across layers |

## Domain Examples

These domain compositions demonstrate onboarding patterns in practice:

- [[academic research uses structured extraction with cross-source synthesis]] — Research preset with heavy processing, three-tier MOCs, atomic notes; shows the full enforce/explain/ask flow for an academic researcher
- [[personal assistant uses life area management with review automation]] — Personal assistant preset with medium processing, flat-peer MOCs, mixed granularity; demonstrates how "What life areas matter to you?" maps to area MOC generation
- [[therapy journal uses warm personality with pattern detection for emotional processing]] — Shows how the plugin explains processing intensity: "Your journal entries will be analyzed for patterns across mood, triggers, and coping strategies" (explain, not ask)
- [[student learning uses prerequisite graphs with spaced retrieval]] — Experimental preset adapted for learning; demonstrates deriving prerequisite graph structure from the user's course description rather than asking about graph topology
- [[trading uses conviction tracking with thesis-outcome correlation]] — Shows multi-domain onboarding: user describes "I trade and track my health to see correlations" → primary (trading) + secondary (health) composition

## Grounding

This guidance is grounded in:
- [[premature complexity is the most common derivation failure mode]] — start simple
- [[friction-driven module adoption prevents configuration debt by adding complexity only at pain points]] — grow with need
- [[configuration paralysis emerges when derivation surfaces too many decisions]] — minimize questions
- [[use-case presets dissolve the tension between composability and simplicity]] — presets as simplification
- [[derived systems follow a seed-evolve-reseed lifecycle]] — /setup is seed, not final state
- [[schema evolution follows observe-then-formalize not design-then-enforce]] — schemas grow from use
- [[progressive schema validates only what active modules require not the full system schema]] — schema tracks feature activation

---

Topics:
- [[index]]
- [[index]]
---

Topics:
- [[derivation-engine]]
