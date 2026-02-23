# System Evolution Patterns Reference

## Purpose

Document how generated knowledge systems evolve after initial scaffolding. A generated system is a seed, not a finished product. The derivation engine produces a starting configuration that the user and agent then grow, adapt, and eventually reseed. This document codifies the evolution patterns so the derivation engine can generate systems that are designed to evolve well — with the right seams for growth, observation capture mechanisms for learning, and reseed triggers for when accumulated drift justifies re-derivation.

This document answers: what happens after init? How do systems grow from simple to complex? When should friction trigger module activation vs system redesign? And how does the system feed observations back into its own improvement?

---

## Derivation Questions

Questions the engine must answer when generating evolution-ready systems:

1. **What is the starting configuration?** All presets ship with full automation. The initial configuration determines which optional features are enabled or disabled.
2. **What friction observation mechanism should be included?** All systems need a way to capture operational friction. The mechanism ranges from a simple section in the context file to a full observation capture pipeline.
3. **What self-extension blueprints should be included?** Blueprints teach the agent to build its own hooks, skills, and schema extensions. The included blueprints determine how self-sufficient the system can become.
4. **What is the expected evolution timeline?** Frequently used systems evolve faster than occasionally used systems. The evolution guidance in the generated context file should match expected usage intensity.
5. **What reseed triggers should be documented?** When should the user re-run derivation? After how much accumulated drift? For which kinds of structural changes?
6. **How should user overrides survive reseed?** If the user has customized the generated system, reseed must preserve those customizations. The mechanism for tracking overrides must be generated from the start.

---

## Curated Claims

### Seed-Evolve-Reseed Lifecycle

#### Complex systems that work evolve from simple systems that work

**Summary:** John Gall's Law states that a complex system designed from scratch never works and cannot be patched up to make it work. You have to start over with a working simple system. This is the foundational principle for knowledge system evolution: the derivation engine generates a simple working system (the seed), the user and agent grow it through use (evolve), and when accumulated changes create incoherence, the system is re-derived from updated understanding (reseed). Attempting to generate a complex system from the start — with all hooks, all skills, all schema fields, all automation — produces a system that is overwhelming, fragile, and likely to be abandoned.

**Derivation Implication:** The derivation engine must resist the temptation to generate everything the user might eventually need. Generate the minimum viable system that is functional for the stated use case. Include self-extension blueprints (instructions for adding components) rather than the components themselves. The system should feel "small enough to understand" on day one and grow to match the user's actual needs over weeks and months.

**Source:** Gall, "Systemantics" (1975). Directly referenced in the vault's methodology as the rationale for convention-level automation as the starting point. Research claim: "productivity porn risk in meta-system building" documents the failure mode of premature complexity.

---

#### Initial generation is a hypothesis about what the user needs

**Summary:** No matter how good the derivation conversation is, the generated system is a hypothesis. The user described their needs in the abstract; the system will encounter them in the concrete. A user who says "I want to track my therapy reflections" does not yet know whether they will capture reflections frequently or sporadically, whether they will want pattern detection across sessions or prefer to discover patterns themselves, or whether the schema fields chosen during init will match the actual content they produce. The generated system should treat its own configuration as provisional — designed to be validated and revised through use.

**Derivation Implication:** The generated context file should include a section acknowledging its provisional nature. Something like: "This system was generated based on our conversation. As you use it, you will discover what works and what creates friction. The observations section below is where friction gets captured and processed into improvements." This frames evolution as expected, not as failure.

**Source:** Lean startup methodology: "minimum viable product" is a hypothesis about what customers want, validated through use. Applied to knowledge systems: the generated system is an MVP validated through operational use.

---

#### Reseed replaces drift with principled re-derivation

**Summary:** As a system evolves through accumulated small changes, coherence degrades. Schema fields get added without considering interaction constraints. MOC structures grow organically without checking against the hierarchy rules. The context file accumulates patches and amendments that contradict each other. At some point, the system has drifted far enough from any coherent configuration that patching is less effective than re-deriving. Reseed takes the user's current understanding (informed by months of use) and re-runs derivation to produce a fresh, coherent system that incorporates operational learnings.

**Derivation Implication:** Generated systems must include reseed guidance: what triggers it, how to preserve user customizations, and how the re-derivation conversation differs from initial derivation (the user now has experience with the system and can answer questions concretely rather than abstractly). The ops/derivation.md file preserves the original derivation rationale so reseed can see what was originally intended and how the system diverged.

**Source:** Vault operational experience. The vault itself has undergone multiple evolution cycles where accumulated changes required consolidation. The system-changelog.md pattern tracks drift over time.

---

### Friction-Driven Adoption

#### Modules activate when the user feels pain, not when the system suggests

**Summary:** The strongest adoption signal is felt friction. When a user says "I keep losing track of what I was working on between sessions," that is the signal to activate session handoff mechanisms. When they say "I can never find that note I wrote last month," that is the signal to activate semantic search. Proactively suggesting modules before the user feels the need creates cognitive overhead without solving a felt problem. The user has to understand why they need the module before they will use it — and understanding comes from experiencing the problem, not from reading about it.

**Derivation Implication:** Generated context files should include a "Growth Paths" or "When You Need More" section that maps felt friction to available modules. "If you notice X, consider enabling Y." This positions modules as solutions to problems the user will encounter naturally, not as features to learn upfront. The phrasing should use the user's likely language for describing friction, not system-architecture terms.

**Source:** Technology adoption theory (Rogers, "Diffusion of Innovations"). The "relative advantage" adoption factor is strongest when the user has experienced the problem the innovation solves. Applied to knowledge systems: module adoption follows friction, not feature lists.

---

#### Threshold detection surfaces friction before it becomes abandonment

**Summary:** Users often don't articulate friction until it has accumulated to the point of abandonment. The observation capture mechanism acts as a friction sensor: operational observations about "this felt slow" or "I couldn't find X" accumulate and become visible through periodic review. When 5+ observations cluster around the same friction point, that is a threshold signal that a module or system change is warranted. This detection mechanism bridges the gap between felt friction (user notices something is hard) and articulated friction (user explicitly says "I need a better way to do X").

**Derivation Implication:** Every generated system ships with atomic observation notes in ops/observations/ with a condition-triggered review process. Full automation is the default — PostToolUse hooks log friction automatically, and session-start hooks check pending observation counts against thresholds. The observation mechanism should be positioned as low-ceremony — "notice something? write it down" — because high-ceremony observation capture becomes friction itself. Users who want lighter implementations can opt down via /architect.

**Source:** Vault ops/observations/ pattern and /rethink skill. The vault's reconciliation system uses threshold counts (5+ observations trigger review) to surface systemic friction patterns.

---

#### Premature complexity is the primary anti-pattern of system evolution

**Summary:** The most common evolution failure is adding complexity before it is needed. Adding semantic search to a 15-note vault, creating MOC sub-hierarchies for 20 notes, building automation hooks before the manual process is understood, generating full processing pipelines for a system that processes one item per week. Each premature addition adds maintenance burden (keeping hooks working, maintaining search indices, navigating unnecessary hierarchy) without corresponding value. The system becomes harder to use than it needs to be, and the user spends more time maintaining infrastructure than doing knowledge work.

**Derivation Implication:** The derivation engine should generate systems at the lowest viable complexity tier and include explicit upgrade triggers: "Add semantic search when you have 50+ notes and can't find things by keyword." "Add processing pipeline when inbox items regularly sit for 3+ days." "Create sub-MOCs when a MOC has 35+ entries." These triggers are concrete, measurable, and grounded in the system's actual state rather than speculative future needs.

**Source:** Research claims: "productivity porn risk in meta-system building" and "behavioral anti-patterns matter more than tool selection." Vault operational observation: every premature addition eventually required removal or simplification.

---

### Reseed Triggers

#### Reseed when accumulated drift exceeds coherent patching capacity

**Summary:** There is no universal time-based trigger for reseed. The trigger is coherence degradation: when the system's current state cannot be described by any single consistent set of dimension values. Symptoms include: the context file contradicts itself in different sections, schema fields exist that nobody queries, MOC structures follow different conventions in different areas, hooks enforce rules that the context file no longer documents, and the agent frequently encounters friction that the system was supposed to prevent. When patching one inconsistency creates another, the system has exceeded its coherent patching capacity.

**Derivation Implication:** The generated context file should include a "Reseed Indicators" section listing specific symptoms of coherence degradation. These should be concrete and observable: "If your context file has grown by more than 50% since generation through patches and amendments, consider reseeding." "If you have schema fields that no query uses, the schema has drifted from actual needs."

**Source:** Software engineering concept of technical debt threshold. Applied to knowledge systems: configuration debt accumulates through organic changes and is repaid through reseed.

---

#### Partial reseed targets specific modules without full re-derivation

**Summary:** Not all coherence degradation requires full re-derivation. If the schema has drifted but the folder structure, session rhythm, and processing pipeline are fine, only the schema-related sections need reseed. Partial reseed regenerates specific modules (context file sections, templates, hook configurations) while preserving the rest. This is less disruptive than full reseed and more effective than patching when a specific subsystem has degraded beyond incremental repair.

**Derivation Implication:** Generated systems should be modular enough that individual sections can be regenerated independently. The ops/derivation.md file should track which sections were generated from which derivation decisions, enabling targeted re-derivation. The user-overrides.md file should clearly delineate which customizations apply to which system modules.

**Source:** Microservices architecture principle: replace individual services rather than rewriting the entire system. Applied to knowledge systems: regenerate individual modules rather than reseeding everything.

---

#### User overrides must survive reseed as immutable constraints

**Summary:** When a user customizes their generated system — changing vocabulary, adding schema fields, modifying session workflow, adding custom hooks — those customizations represent learned preferences that the derivation engine could not predict. Reseed must treat these customizations as immutable constraints: the new derivation incorporates them as given inputs rather than re-deriving them from conversation signals. Without override preservation, reseed destroys accumulated learning and forces the user to re-customize, creating a strong disincentive against reseeding.

**Derivation Implication:** Every generated system must include ops/user-overrides.md as a tracking file for user customizations. The context file should instruct the agent to log customizations to this file whenever the user modifies generated content. The reseed process reads user-overrides.md first and treats its contents as hard constraints for the new derivation.

**Source:** Vault operational pattern. The distinction between generated content and user customizations is analogous to the distinction between managed configuration and user configuration in software deployment (e.g., systemd overrides, Kubernetes customizations).

---

### Evolution Observations

#### Observation capture feeds operational learning back into system improvement

**Summary:** The observation capture pipeline is the mechanism by which a system learns from its own use. During any session, the agent (or user) notices friction, surprise, or improvement opportunity and captures it as an observation. Observations accumulate in ops/observations/. Periodic review (the rethink phase) processes observations into system improvements: context file updates, schema changes, new hooks, modified skills. Without this feedback loop, the system is static — it does not improve from experience, and the same friction points recur session after session.

**Derivation Implication:** Every generated system, regardless of complexity tier, must include an observation capture mechanism. For tier 1: a "Friction Notes" section in the context file itself. For tier 2-3: an ops/observations.md file or directory. For tier 4: atomic observation notes with template schema, MOC organization, and threshold-triggered review. The mechanism scales with the system, but the principle is invariant: operational friction must have a place to go.

**Source:** Vault ops/observations/ and /rethink skill. Research claim: "the generation effect requires active transformation not just storage" — observations must be transformed into improvements, not just accumulated.

---

#### The recursive improvement loop is the system's primary long-term value driver

**Summary:** Seed -> use -> observe friction -> improve system -> use improved system -> observe new friction -> improve again. This recursive loop is what makes the system a living tool rather than a static configuration. Each cycle produces a system better adapted to its actual use case. The loop has compounding returns: early improvements address the most obvious friction, which surfaces subtler friction, which produces more nuanced improvements. Over time, the system converges toward an optimal configuration for its specific user and domain — something the derivation engine could never have predicted from an initial conversation alone.

**Derivation Implication:** The generated context file should explicitly describe this loop and the user's role in it. The user is not a passive consumer of a generated system — they are a partner in the system's evolution. Their observations are the input that drives improvement. The context file should frame observation capture as a core responsibility, not an optional activity: "When you notice something that could be better, write it down. Your observations are how the system learns."

**Source:** Deming cycle (Plan-Do-Check-Act) applied to knowledge systems. The vault's infrastructure-ideas.md pattern and /rethink skill implement this loop.

---

### Full Automation from Day One

#### Every vault ships complete — users opt down, not up

**Summary:** v1.6 reverses the progressive complexity approach. Instead of starting simple and adding features when friction demands, every vault ships with full automation: all processing skills, all hooks, all maintenance mechanisms, session capture, methodology folder, task stack. The philosophy is that it is easier to remove features than to discover and add them. The overhead of unused features is near-zero (hooks that never fire, skills that are never invoked, directories that stay empty), while the cost of discovering and adding features when friction emerges was higher than anticipated. Users who want less complexity disable features via /architect.

**Derivation Implication:** The derivation engine generates the maximum viable system for the chosen preset. All 3 presets (Research, Personal Assistant, Experimental) include full automation by default. /architect allows users to toggle optional features (semantic search, self space) without regenerating. INVARIANT primitives cannot be disabled.

**Source:** v1.6 human feedback: the progressive tier system created friction in discovery. Users did not know what features existed until they needed them and could not find them.

---

#### Condition-based maintenance replaces all time-based triggers

**Summary:** Condition-based triggers respond to actual vault state, not calendar schedules. "Topic MOC exceeds 50 notes" fires when true. "Stale nodes exceed 20%" fires when the graph warrants it. "Pending observations exceed 10" fires when evidence accumulates. Time-based triggers (weekly, monthly, quarterly) assumed uniform activity — a vault scaling fast overwhelms a monthly check; a vault used rarely runs empty checks on schedule. Conditions fire exactly when maintenance is needed.

**Derivation Implication:** Generated context files and hooks should use condition-based triggers exclusively for maintenance. Time-based conditions remain valid only when time genuinely is the right trigger (checking for content staleness). The session-start hook evaluates conditions and surfaces fired conditions on the task stack via /next. The context file documents available conditions and their thresholds.

**Source:** v1.6 specification. Cognitive science mapping: human prospective memory works through environmental cues ("when I get home, call dad"), not calendar scheduling.

---

#### Session capture feeds the learning loop automatically

**Summary:** Session capture (Primitive 15, INVARIANT) saves every session's transcript to ops/sessions/ via the stop hook. The system mines transcripts for friction patterns when unprocessed session count exceeds threshold and methodology learnings that the user did not explicitly flag via /remember. This means the recursive improvement loop works even passively — the system detects friction on its own. Auto-created mining tasks queue transcripts for future processing.

**Derivation Implication:** Every generated vault MUST include session capture. The stop hook saves transcripts with timestamp filenames. Mining tasks are auto-created. The methodology folder (Primitive 14, ops/methodology/) receives the distilled learnings from session mining. This is part of the evolution substrate — without session capture, the system loses its primary automatic input for self-improvement.

**Source:** v1.6 Primitive 15 specification. Session capture closes the gap between explicit friction reporting (/remember) and passive friction detection.

---

#### The methodology folder is the vault's self-knowledge substrate

**Summary:** The methodology folder (Primitive 14, INVARIANT, ops/methodology/) stores the vault's operational self-knowledge as linked notes. Derivation rationale, active kernel state, friction observations, and methodology learnings live here. Unlike self/ (which is the agent's personal identity and is CONFIGURABLE), ops/methodology/ is structural infrastructure — it records how the vault works, not who the agent is. When evidence accumulates beyond configured thresholds, condition-based hooks surface a suggestion to run /rethink.

**Derivation Implication:** Every generated vault MUST include ops/methodology/. The methodology folder is part of the evolution substrate alongside session capture. /remember writes to ops/methodology/. /rethink reads from it. The folder uses the same atomic note + linking pattern as the notes/ space.

**Source:** v1.6 specification. ops/methodology/ replaces the former friction file approach with a structured, linkable knowledge space for vault self-knowledge.

---

#### Feature disabling is safe because INVARIANT primitives cannot be removed

**Summary:** Users can disable optional features (semantic search, self space, processing pipeline) via /architect. INVARIANT primitives (wiki links, schema enforcement, methodology folder, session capture) cannot be disabled. This creates a safe disabling guarantee: the structural foundation is always present regardless of which optional features the user removes. Re-enabling any feature restores full functionality. When self space is disabled, its content routes to ops/ (goals to ops/goals.md, methodology to ops/methodology/).

**Derivation Implication:** Generated systems should clearly distinguish INVARIANT from CONFIGURABLE primitives in the context file. /architect should prevent disabling INVARIANT primitives and warn about consequences when disabling optional features. The fallback paths for each optional feature should be documented.

**Source:** v1.6 specification. The INVARIANT/CONFIGURABLE distinction ensures evolution safety — users cannot accidentally break the structural foundation.

---

### Evolution Velocity Indicators

#### The ratio of system modification to content creation reveals evolution health

**Summary:** A healthy system spends most of its effort on content creation (notes, connections, processing) and a minority on system modification (context file updates, schema changes, new hooks). When the ratio inverts — more time on infrastructure than on knowledge work — the system is in productivity porn territory. The ratio is not fixed; early systems spend more on infrastructure (setup), mature systems spend almost entirely on content. But at any maturity level, a sudden spike in system modification relative to content creation signals either a genuine evolution need or a procrastination pattern.

**Derivation Implication:** Generated context files should include a self-monitoring instruction: "Track the balance between system work and knowledge work. If you spend more than 20% of session time on system improvements, pause and ask whether the improvements are solving felt friction or building speculatively." This is a soft guardrail — it surfaces the question rather than blocking the behavior.

**Source:** Research claim: "productivity porn risk in meta-system building." Vault operational observation: the most productive periods had the lowest system-modification rates.

---

#### Feature adoption should be measured by usage, not by installation

**Summary:** Adding a hook, creating a template, or enabling semantic search is installation, not adoption. Adoption means the feature is being used regularly and providing value. An installed-but-unused validation hook is pure maintenance cost. An installed-but-unused semantic search index wastes memory and requires maintenance without contributing to retrieval. The evolution lifecycle should distinguish between features that are actively providing value and features that were installed but never integrated into the agent's actual workflow.

**Derivation Implication:** Generated systems should include periodic feature usage review in their maintenance cycle. "Review which features you actually use: Are validation hooks catching real errors? Is semantic search finding connections that keyword search misses? Are session logs being read in subsequent sessions? Features that provide no measurable value should be removed to reduce maintenance burden."

**Source:** Software engineering principle: dead code is negative value (maintenance cost without benefit). Applied to knowledge systems: unused features are configuration debt.

---

### Evolution Guardrails

#### The kernel is invariant across all evolution

**Summary:** The 16 kernel primitives (markdown-yaml, wiki-links, moc-hierarchy, tree-injection, description-field, topics-footer, schema-enforcement, semantic-search, self-space, session-rhythm, unique-addresses, discovery-first, operational-learning-loop, task-stack, methodology-folder, session-capture) are the structural foundation. INVARIANT primitives (wiki links, schema enforcement, methodology folder, session capture) cannot be disabled. CONFIGURABLE primitives (self space, semantic search) can be toggled via /architect. Evolution adds on top of the kernel; it never removes or contradicts kernel primitives. A system that evolves away from prose-sentence titles, or stops requiring topics footers, or abandons self/ loading at session start has evolved into incoherence. The kernel is the stable core that makes everything above it interoperable.

**Derivation Implication:** The generated context file should mark kernel primitives as invariant (not subject to user override or evolution drift). The reseed process should validate that all 16 kernel primitives remain intact. Evolution guidance should explicitly state: "You can add schema fields, create new MOC types, build new skills, and modify session workflow — but these 16 primitives are foundational and must not be removed."

**Source:** kernel.yaml specification. The kernel was distilled from the vault's operational experience — these are the primitives that remained constant while everything else evolved.

---

#### Self-extension blueprints teach the agent to grow the system

**Summary:** Rather than generating every possible component upfront, the derivation engine generates blueprints — structured instructions that teach the agent how to build components itself. A hook blueprint explains: what events to listen for, what checks to perform, what actions to take, what to avoid (judgment operations). A skill blueprint explains: what the skill does, what inputs it needs, what quality gates it enforces, what output format it produces. Blueprints embody the self-extension principle: init scaffolds the minimum, the methodology teaches the maximum, the agent grows the rest.

**Derivation Implication:** Every generated context file should include 2-4 blueprints for the most likely growth paths based on the system's configuration. A research system should include blueprints for: processing pipeline skill, semantic search integration, and validation hook. A therapy system should include: pattern detection skill and session-review hook. Blueprints are cheaper to generate than full implementations and they preserve optionality — the agent builds them when friction demands, not when the derivation engine guesses.

**Source:** `components.md` — full blueprint specifications for all component types. `methodology.md` — self-extension principle.

---

#### Observation capture is always safe because it only reads state

**Summary:** Capturing observations about system friction is a read-only operation relative to the system itself. Writing "this schema field is never queried" to ops/observations/ does not change the schema. Writing "the session-end checklist is consistently skipped" does not modify the checklist. This is why observation capture can be automated (via reconciliation scripts) without risk — it detects problems but does not fix them. The fix requires human judgment (or rethink-phase evaluation). Separating detection from remediation prevents over-automation (a documented failure mode) while ensuring problems are surfaced.

**Derivation Implication:** Generated systems can safely include automated observation capture at any tier. Even tier 1 systems can include "at session start, check: are descriptions adding information beyond titles? Are there orphan notes? Is the inbox growing?" instructions. Higher tiers add automated detection (reconciliation scripts). No tier should auto-fix detected problems — all remediation goes through human review or an explicit rethink/propose process.

**Source:** Vault reconciliation pattern. Research claim: "automated detection is always safe because it only reads state." The vault's reconcile.sh is idempotent and side-effect-free.

### Drift Detection

#### Three types of drift between methodology specification and system behavior

**Summary:** Rule Zero establishes ops/methodology/ as the canonical specification. Drift is the measurable gap between what methodology notes declare and what the system actually does. Three distinct drift types exist, each detectable at different timing levels with different resolution paths.

**Type 1: Staleness Drift**
Configuration changes (config.yaml, context file) that occurred after the newest methodology note update. The system evolved but the specification did not keep pace. Detection: timestamp comparison between config.yaml modification time and newest methodology note update date. Resolution: run /remember or /rethink to update stale methodology notes.

**Type 2: Coverage Gap Drift**
Active features (processing pipeline, maintenance conditions, domain-specific behaviors) without corresponding methodology notes. The system does things it cannot explain to itself. Detection: enumerate active features from config.yaml, check for corresponding methodology notes by category. Resolution: create methodology notes for uncovered features.

**Type 3: Assertion Mismatch Drift**
Methodology notes that make behavioral assertions contradicted by the context file, config.yaml, or other methodology notes. The specification contradicts itself or the implementation. Detection: compare "What to Do" assertions in methodology notes against context file instructions and config settings. Resolution: update the methodology note, update the system config, or flag for human review — requires judgment to determine which is authoritative.

**Three timing levels:**

| Level | When | What's Checked | Speed |
|-------|------|---------------|-------|
| Session start | Every session | Staleness only (timestamp comparison) | < 1 second |
| /next reconciliation | When user asks "what next" | Staleness + coverage gaps | 5-10 seconds |
| /rethink Phase 0 | When rethink runs | All three types (full assertion comparison) | 30-60 seconds |

**Resolution flow:** All drift findings create observation notes in ops/observations/ with `category: drift`. These observations enter the standard triage pipeline during /rethink Phase 1. Staleness drift typically resolves through /remember. Coverage gaps resolve through methodology note creation. Assertion mismatches require human judgment.

**Derivation Implication:** Generated systems must include drift detection in the session-start hook (staleness check), /next reconciliation (coverage check), and /rethink (Phase 0 full check). The observation template must support `category: drift`. The context file should document drift detection as part of the methodology folder's purpose.

**Source:** Playtesting feedback (v1.6 sessions): methodology folder was treated as passive log rather than authoritative specification. Users expected the system to detect when it drifted from its own methodology.

---

## Exclusion Notes

**Excluded from this reference:**

- Specific reseed conversation scripts (the exact questions to ask during re-derivation) — these belong in the init/architect command documentation, not in the evolution patterns reference.
- Multi-user system evolution (how systems shared between multiple users evolve differently) — composition concern outside single-system scope.
- Version control and rollback mechanisms for system evolution — infrastructure concern that belongs in platform-specific documentation.
- Migration tooling (scripts to transform a system from one tier to another) — implementation detail, not derivation reference.
- Domain-specific evolution patterns (how therapy systems evolve differently from research systems) — belongs in use-case-presets.md as evolution addenda, not here.

---

## Version

- Last curated: 2026-02-12
- Sources reviewed: 20
- Claims included: 21
- Claims excluded: 5
- Cross-references: `kernel.yaml` (15 invariant primitives), `three-spaces.md` (ops/derivation.md and ops/user-overrides.md), `interaction-constraints.md` (coherence rules that reseed must re-validate), `failure-modes.md` (productivity porn, over-automation), `components.md` (self-extension principle and hook/skill blueprints), `methodology.md` (Gall's Law, self-extension principle)
