# Session Lifecycle Reference

## Purpose

Specify how generated systems structure agent sessions for optimal knowledge work. Every session has a beginning (orient), a middle (work), and an end (persist). This three-phase pattern is a kernel primitive (session-rhythm in kernel.yaml), but the specific behaviors in each phase vary by session type, platform capabilities, and domain. The derivation engine uses this document to generate session instructions that are concrete enough to follow and flexible enough to adapt.

This document answers: what should the agent read at session start, how should it manage focus during work, and what must it persist before session end — and how do these answers change across session types and platforms?

---

## Derivation Questions

Questions the engine must answer when generating session configuration:

1. **What platform capabilities exist for session automation?** Hooks (Claude Code) can automate orientation and persistence. Convention-only systems rely on context file instructions.
2. **What is the self/ space structure?** Session orientation reads self/ — the derivation must know which files exist to generate the orientation sequence.
3. **What session types will this system support?** Processing sessions (pipeline work), maintenance sessions (health checks), exploration sessions (research and connection finding), capture sessions (rapid note creation). Different types orient and persist differently.
4. **What is the expected session frequency?** Frequent sessions need different handoff than infrequent sessions. Systems used rarely need heavier orientation because more has been forgotten.
5. **How large is the context window budget?** Orientation competes with work for context space. Generated systems should specify how much context to allocate to orientation vs task execution.
6. **Does the system have a processing pipeline?** Pipeline sessions have different rhythm than ad-hoc sessions — they read queue state at orient, process tasks during work, and update queue state at persist.

---

## Curated Claims

### Three-Phase Pattern

#### Orient-work-persist is the universal session rhythm because agents lose everything between sessions

**Summary:** LLM agents have no persistent memory. Every session begins from zero knowledge of identity, goals, recent work, and system state. Without an explicit orientation phase, the agent must rediscover who it is, what it is working on, and what exists in the vault — consuming context window and making mistakes along the way. The orient-work-persist pattern solves this by externalizing session state: orient reads the previous session's output, work produces value, persist writes the next session's input. This cycle creates continuity without requiring persistent memory.

**Derivation Implication:** Every generated context file must include an explicit session rhythm section documenting what to read at start, how to work, and what to save at end. This is not optional guidance — it is the mechanism by which the system maintains coherence across sessions.

**Source:** Kernel primitive `session-rhythm`. Research claim: "session handoff creates continuity without persistent memory." Operationally validated across hundreds of vault sessions.

---

#### Orientation loads identity before task context because identity constrains behavior

**Summary:** The agent must know who it is before it knows what to do. Identity (self/identity.md) establishes voice, values, and approach. Methodology (self/methodology.md) establishes quality standards and operational patterns. Goals (self/goals.md) establishes current work threads and priorities. Loading task context before identity produces an agent that knows what to work on but not how to work on it — and "how" includes quality standards, voice consistency, and behavioral constraints that shape every action. The loading order matters: identity -> methodology -> goals -> task context.

**Derivation Implication:** The generated context file's session start section must specify loading order, not just loading list. For systems with hooks: the session-start hook loads self/ files in identity-first order. For convention systems: the context file instructs the agent to read self/ files in the correct sequence before proceeding to any task.

**Source:** Vault operational experience. Voice drift and quality inconsistency were traced to sessions where task context was loaded before identity context.

---

#### The smart zone is the first 40% of context where attention quality is highest

**Summary:** LLM attention quality degrades as the context window fills. Empirically, the first ~40% of context capacity produces the sharpest reasoning, the most careful instruction-following, and the best quality output. Beyond this threshold, attention degradation manifests as missed instructions, shallower reasoning, and reduced connection-finding ability. This is not a hard cliff but a gradient — quality degrades progressively, with noticeable impact after 40% and severe impact after 70%.

**Derivation Implication:** The derivation engine should calculate approximate context budgets for orient vs work phases. If orientation consumes 25% of context, the work phase has ~15% of smart-zone capacity remaining. Systems with large self/ spaces or heavy orientation requirements should either (a) limit orientation to essential files or (b) use progressive disclosure (read descriptions before full files) to stay within budget. The context file should explicitly warn agents about context budget management.

**Source:** Research claim: "LLM attention degrades as context fills." Operationally validated: late-context processing phases produce measurably lower quality output in the vault's pipeline.

---

### Session Types

#### Processing sessions orient from queue state and persist phase completion

**Summary:** Processing sessions follow the pipeline: read queue.json to find the next unblocked task, execute one or more phases (reduce, reflect, reweave, verify), and update queue state with completion. Orientation is minimal and targeted — the agent needs queue state, the specific task file, and the relevant skill instructions. It does NOT need full self/ orientation because processing is methodological, not identity-dependent. The persist phase must advance the queue entry (mark phases complete, update status) — without this, the pipeline stalls.

**Derivation Implication:** Generated systems with processing pipelines should include a processing session template in the context file. This template specifies: (1) read queue state, (2) identify next task, (3) load task-specific context, (4) execute phase, (5) update task file, (6) advance queue. Skip heavy orientation — processing sessions are mechanical, not exploratory.

**Source:** Vault /ralph orchestration pattern. Each subagent spawned by /ralph follows this minimal-orientation processing session pattern.

---

#### Maintenance sessions orient from health metrics and persist improvement actions

**Summary:** Maintenance sessions focus on system health: schema validation, orphan detection, link health, MOC coverage, stale note identification. Orientation loads the latest health report (if one exists) and the maintenance checklist from the context file. Work runs health checks systematically — not ad-hoc inspection but scripted validation. Persistence captures findings as observation notes, updates health reports, and creates tasks for issues that require separate sessions to fix.

**Derivation Implication:** Generated systems should include a maintenance session section in the context file with: which health checks to run, expected thresholds (orphan percentage, schema compliance), and where to log findings. The maintenance session type should be distinct from processing and exploration — mixing maintenance with content work produces incomplete maintenance because content work is more engaging.

**Source:** Vault /review skill and reconciliation pattern. Maintenance is most effective when it is the sole focus of a session, not a side activity.

---

#### Exploration sessions orient from MOCs and persist connection discoveries

**Summary:** Exploration sessions are open-ended: the agent is looking for connections, investigating a concept, or building understanding of a new topic area. Orientation reads the relevant MOC(s) to understand current thinking, tensions, and gaps. Work follows connections through the graph — reading notes, following wiki links, using semantic search for cross-vocabulary discovery. Persistence captures new connections as inline links in existing notes, updates MOCs with new entries, and logs any observations or tensions discovered. Exploration sessions are the highest-value session type for knowledge compounding but also the most context-hungry.

**Derivation Implication:** Generated systems should include exploration session guidance that teaches: (1) start from a MOC, not from a random note, (2) follow links deliberately — checkpoint after each note to reassess direction, (3) persist discoveries immediately rather than batching them, (4) time-box exploration to prevent context exhaustion without persisting findings.

**Source:** Vault working technique: "checkpoint during traversal." Exploration without checkpointing follows the original query even when the agent has learned something that reframes the question.

---

#### Capture sessions orient minimally and persist raw material for future processing

**Summary:** Capture sessions prioritize speed over structure. The agent receives raw material (voice transcript, article, URL, idea) and files it with minimal ceremony. Orientation is minimal — just enough to know where to put things (inbox structure, naming conventions). Work is filing, tagging, and basic triage (is this relevant? which topic area?). Persistence is the filed material itself, possibly with a queue entry if the material should be processed in a future session. Capture sessions should never attempt processing — that is a different session type.

**Derivation Implication:** Generated systems should explicitly separate capture from processing in their session guidance. The context file should include a "Quick Capture" section that teaches zero-friction filing: drop it in inbox with a descriptive filename and minimal metadata. Processing happens later in a dedicated processing session with fresh context.

**Source:** Research claim: "temporal separation of capture and processing preserves context freshness." Vault pattern: 00_inbox/ as zero-friction capture zone.

---

### Context Budget

#### Context budget allocation should match session type

**Summary:** Different session types have different context budgets. Processing sessions need minimal orientation context (~10%) and maximum work context (~90%). Exploration sessions need moderate orientation context (~25% for MOC loading) and moderate work context (~75% for traversal). Maintenance sessions need moderate orientation context (~20% for health baselines) and moderate work context (~80% for running checks). Capture sessions need minimal context overall — they are short-lived. Misallocating context budget (heavy orientation in a capture session, minimal orientation in an exploration session) degrades session quality.

**Derivation Implication:** Generated context files should include session-type-specific context loading guidance. Rather than a single "orient" section, provide type-specific orientation checklists with approximate context costs. This helps agents make informed decisions about how much to load.

**Source:** Vault operational experience. Pipeline phases running inside /ralph subagents use minimal orientation (task file + skill instructions) to maximize smart-zone availability for the actual work.

---

#### Progressive disclosure during orientation prevents context waste

**Summary:** Not every self/ file needs to be loaded fully at session start. Progressive disclosure applies to orientation: load identity.md fully (it is small and essential), load goals.md fully (it is the active orientation file), but load methodology.md only when the session involves quality decisions. For large self/ spaces with memory/ directories, load the memory directory listing first, then read specific memories only when relevant to the current task. This preserves context budget for work without sacrificing orientation quality.

**Derivation Implication:** Generated systems with self/ spaces larger than ~2000 tokens total should include progressive disclosure guidance for orientation. The context file should distinguish between "always load" files (identity.md, goals.md) and "load when relevant" files (memory/, relationships.md). Hooks can automate the "always load" files while leaving "load when relevant" files to agent judgment.

**Source:** Vault discovery layer pattern. The vault applies progressive disclosure to note discovery (description before content); the same principle applies to self/ orientation.

---

### Session Boundaries as Automation Checkpoints

#### Session boundaries create natural points for automated behavior

**Summary:** The beginning and end of a session are the two moments where automated behavior adds the most value. At session start: load orientation files, inject file tree, evaluate condition-based triggers against vault state, display health warnings. At session end: save session transcript to ops/sessions/ (Primitive 15 — session capture), auto-create mining tasks for future processing, validate that notes were saved, check for broken links introduced during the session, auto-commit changes, push to remote. These are deterministic operations (verification, not judgment) that hooks can handle without corrupting quality.

**Derivation Implication:** For hook-capable platforms (Claude Code), generate session-start and stop hooks that automate the deterministic parts of orient and persist. The stop hook MUST save session transcripts (session capture is INVARIANT). For convention-only systems, generate checklist instructions that the agent follows manually. The checklist should cover the same behaviors as the hooks, just without automation. The context file should explain what the hooks do so the agent understands the automated behavior.

**Source:** Vault hook infrastructure. The session-start hook (tree injection + condition evaluation) and stop hook (session capture + auto-commit) are proven patterns that eliminate routine tasks without requiring judgment.

---

#### Attention residue from incomplete sessions degrades future work

**Summary:** When a session ends without proper persistence, the agent in the next session lacks information about what was in progress, what was discovered, and what decisions were made. This is the agent equivalent of attention residue — incomplete tasks from a previous context contaminating the current context. The persist phase eliminates attention residue by explicitly capturing session state: what was done, what was discovered, what remains to do. Cal Newport's research on attention residue for humans translates directly: incomplete work contaminates future attention, and explicit closure rituals are the remedy.

**Derivation Implication:** Generated context files must include an explicit session-end checklist. Minimum: update self/goals.md with current state, capture any observations, push changes to remote. For pipeline sessions: update queue state. For exploration sessions: update MOCs with discoveries. The checklist should be positioned prominently (not buried in appendix) because skipping it is the most common session failure mode.

**Source:** Newport, "Deep Work" (2016) — attention residue concept. Research claim: "closure rituals create clean breaks that prevent attention residue bleed." Vault operational experience with goals.md as the primary session-handoff mechanism.

---

#### The Zeigarnik effect means open tasks persist in working memory until closed

**Summary:** Bluma Zeigarnik demonstrated that uncompleted tasks are remembered better than completed ones — the mind maintains a "rehearsal loop" for unfinished work. For agents, this translates to the self/goals.md pattern: open threads listed in goals.md are the agent's externalized Zeigarnik effect. They persist across sessions because they are written down, and they create a pull toward completion that prevents aimless sessions. Without goals.md, each session starts without momentum — the agent has no open threads pulling it toward specific work.

**Derivation Implication:** Every generated system must include a goals.md (or domain-equivalent) file in self/ that tracks open threads. The context file should instruct the agent to read goals.md at session start and update it at session end. The format should be simple: a list of active threads with current status, not a complex project management system. The Zeigarnik effect works best with concise, emotionally engaging descriptions of unfinished work.

**Source:** Zeigarnik, "On Finished and Unfinished Tasks" (1927). Vault self/goals.md as operational implementation.

---

### Platform Adaptation

#### Claude Code automates session rhythm through hooks

**Summary:** Claude Code's hook system (PreToolUse, PostToolUse, Stop events) enables automatic session rhythm. A SessionStart hook injects the file tree and loads orientation files. A PostToolUse hook on Write operations validates note quality. A Stop hook (or pre-push hook) can remind the agent to update goals.md. This automation makes the session rhythm invisible — the agent follows it without conscious effort because the infrastructure enforces it. The hooks encode deterministic verification (does the file exist? is the schema valid?) while leaving judgment operations (is the description good? are the connections meaningful?) to skills.

**Derivation Implication:** For Claude Code systems, generate hook configurations in `.claude/hooks/` that automate: (1) tree injection at session start, (2) self/ file loading at session start, (3) note validation on Write, (4) session-end reminders. The context file should document what hooks exist and what they do, so the agent understands the automated behavior and doesn't duplicate it.

**Source:** Vault `.claude/hooks/` implementation. Proven hook patterns: session-start tree injection, PostToolUse validation, auto-commit.

---

#### Convention-only systems encode session rhythm in the context file itself

**Summary:** Systems without hooks or skill infrastructure rely entirely on the context file to teach session rhythm. The context file must include explicit session sections: "When you start a session, read these files in this order. When you finish, update these files." This is the lowest-automation approach but it works — context file instructions are loaded at every session start (by definition), so the session rhythm instructions are always present. The risk is instruction-following degradation as context fills, which means session-end instructions (the persist phase) are the most likely to be skipped.

**Derivation Implication:** For convention-only systems, place session rhythm instructions at the top of the context file (where they benefit from smart-zone attention quality). Use bold formatting and clear headers to make the instructions visually prominent. Include a session-end checklist near the end of the context file with "CRITICAL: Do not end the session without completing these steps" framing to counteract attention degradation.

**Source:** Vault CLAUDE.md session patterns section. Convention-based instruction-following is the foundation layer that all platforms share.

---

### Session Anti-Patterns

#### Context contamination occurs when one task's context degrades another task's quality

**Summary:** When an agent chains multiple tasks in a single session, the context from task A contaminates the reasoning for task B. Processing a dense research paper fills context with source-specific vocabulary and concepts. If the agent then immediately switches to writing a new note about a different topic, the source vocabulary bleeds into the new note's phrasing. Fresh context per task — the principle behind /ralph's subagent isolation — prevents this contamination by giving each task a clean context window.

**Derivation Implication:** Generated context files should include a "one task per session" discipline section for systems with processing = heavy. For lighter systems where context contamination is less severe, the guidance can be softer: "If you are switching between very different tasks, consider whether the previous task's context might influence your current work." The pipeline architecture (fresh context per phase) is the structural solution; session discipline is the behavioral solution.

**Source:** Research claim: "fresh context per task preserves quality better than chaining phases." Vault operational experience: quality differences between early-session and late-session processing are measurable.

---

#### Session capture saves transcripts automatically for future mining

**Summary:** Session capture (Primitive 15, INVARIANT) ensures that every session's transcript is saved to ops/sessions/ via the stop hook. This is not optional — session transcripts contain friction patterns, methodology learnings, and connection discoveries that the user may not have explicitly captured via /remember. Auto-created mining tasks queue these transcripts for future processing, where the system extracts friction signals and operational insights. This means the improvement loop works even when the user forgets to call /remember — the system detects friction on its own from recorded sessions.

**Derivation Implication:** Every generated system MUST include session capture in the stop hook. The stop hook saves the session transcript with a timestamp filename to ops/sessions/ and creates a mining task. For convention-only systems, the context file must include an explicit instruction to save session notes before ending. Session capture feeds the operational learning loop (Primitive 12) and condition-based maintenance — without it, the system loses its ability to learn from its own operation.

**Source:** v1.6 Primitive 15 specification. The vault's recursive improvement loop depends on session capture as an automatic input mechanism.

---

#### Skipping the persist phase is the most common and most damaging session failure

**Summary:** The orient and work phases are naturally motivated — the agent needs orientation to function, and work is the session's purpose. The persist phase has no natural motivation: the agent's session is ending, the user may have moved on, and the "save your progress" step feels like overhead. But skipping persist means the next session starts without handoff, goals.md is outdated, observations are lost, and newly created notes may not be committed. Session capture (Primitive 15) mitigates the worst consequence — transcript loss — by automating it via the stop hook. But goals.md updates and observation capture still require explicit action.

**Derivation Implication:** Generated systems should make the persist phase as prominent and explicit as possible. Session capture (stop hook) automates transcript persistence. For remaining persist actions (goals.md update, observation capture, git commit): hook-based systems should generate reminders or automation. Convention systems should place the session-end checklist prominently with "CRITICAL" framing. The vault's auto-commit hook is an example of automating the most commonly skipped persist action (committing changes to git).

**Source:** Vault operational observation. Multiple sessions ended without goals.md updates, producing orientation gaps in subsequent sessions.

---

#### Discovery during work must be captured without derailing the current task

**Summary:** During focused work, agents frequently discover things worth investigating: a related note that needs updating, a potential connection to explore, a maintenance issue to address. Following these discoveries immediately creates context contamination and loses focus on the primary task. Ignoring them entirely loses the discovery. The correct pattern is: capture the discovery as a minimal note (inbox item, queue entry, agent note in a MOC) and return to the current task. The discovery becomes a future session's work, not a tangent in the current session.

**Derivation Implication:** Generated context files should include explicit discovery-during-work guidance: "When you find something interesting while working on a different task, capture it quickly (drop a note in inbox/ or add to the relevant MOC's open questions) and return to your task. Do not follow the discovery now — give it its own session where it can get full attention." This prevents the session from becoming an unstructured exploration that produces many partial results and no complete ones.

**Source:** Vault working technique: "handling discoveries during work." Research claim: "WIP limits force processing over accumulation" — the same principle applies to in-session discovery management.

---

### Session Handoff Mechanisms

#### Goals.md is the primary handoff vehicle between sessions

**Summary:** self/goals.md serves as the session-to-session handoff document. At session end, the agent updates goals.md with: what was accomplished, what is in progress, what should be done next, and any discoveries that affect priorities. At the next session start, reading goals.md gives the agent immediate orientation on current work state. This is more effective than session logs (which are append-only and grow indefinitely) because goals.md is a living document that reflects current state, not historical state. It is the shortest path from "I know nothing" to "I know what to do next."

**Derivation Implication:** Every generated system must include goals.md in self/ with a template that encourages structured handoff: active threads, next actions, recent discoveries, and deferred items. The context file should emphasize that goals.md is the most important file to update at session end — skipping this update is the single most damaging persist-phase failure.

**Source:** Vault self/goals.md implementation. Confirmed as the most valuable self/ file for session continuity.

---

#### Reminders bridge time-bound commitments across sessions

**Summary:** Goals.md tracks work threads; reminders.md tracks time-bound actions. "Follow up with Sarah by Friday" is not a goal — it is a deadline-bound action that should surface at the right time and disappear when completed. The reminders mechanism (ops/reminders.md as a simple checkbox list with dates) provides a lightweight way for the user to delegate time-sensitive actions to the agent without polluting goals.md with one-off items. At session start, the agent checks reminders.md for due items and surfaces them. This is not a calendar — it is a delegation mechanism for actions the user wants the agent to remind them about.

**Derivation Implication:** Generated systems should include ops/reminders.md with a simple format: `- [ ] YYYY-MM-DD: action description`. The orient phase should include "check reminders.md for due items" as a standard step. This is lightweight enough for all configurations — even convention-only systems can include reminder checking as a context file instruction.

**Source:** `three-spaces.md` — reminders specification. Time-bound actions and knowledge work goals serve different purposes and require different tracking mechanisms.

---

#### Condition-based trigger evaluation replaces time-based scheduling in the orient phase

**Summary:** At session start, the system evaluates a set of declared conditions against the current vault state. When a condition fires, it surfaces as a task on the task stack via /next. This replaces all time-based scheduling (weekly health checks, monthly reviews, quarterly rethink). Conditions respond to actual state: "topic MOC exceeds 50 notes" fires when it is true, not on a Tuesday. "Stale nodes exceed 20%" fires when graph metrics warrant it, not monthly. "Unprocessed sessions exceed N" fires when transcripts accumulate. Conditions do not stack during periods of inactivity — if the vault has not changed since the last session, no conditions fire.

**Derivation Implication:** Every generated system should include condition-based triggers evaluated at session start. For hook-capable systems, the session-start hook runs condition evaluation and surfaces fired conditions. For convention-only systems, the context file instructs the agent to check vault state conditions manually. The condition declarations should be domain-appropriate: research vaults check orphan notes and MOC sizes; personal assistant vaults check follow-up due dates and memory staleness.

**Source:** v1.6 condition-based maintenance specification. Cognitive science mapping: human prospective memory works through environmental cues, not calendar schedules.

---

#### The morning briefing pattern gives each session a purpose statement

**Summary:** Systems with processing pipelines or maintenance schedules benefit from a "morning briefing" at session start: a summary of what happened since the last session, what conditions have fired, and what the system's health looks like. This is richer than just reading goals.md — it synthesizes queue state, fired conditions, health metrics, and recent observations into a single orientation snapshot. The briefing gives the session a purpose statement: "Today: 3 queue items ready for reflect, 2 conditions fired (orphan notes detected, pending observations threshold exceeded), inbox has 5 new items."

**Derivation Implication:** Generated systems with processing = moderate or heavy should include a morning briefing mechanism. The session-start hook can aggregate condition evaluation results with queue status and inbox count. For convention-only systems, the context file can instruct the agent to manually evaluate conditions and summarize. The briefing pattern transforms "what should I do?" into "here is what needs doing" — reducing the orientation cost.

**Source:** Vault queue reconciliation pattern. The session-start hook shows queue status and /next runs condition reconciliation, functioning as the morning briefing.

---

#### Session logs provide historical context that goals.md cannot

**Summary:** While goals.md captures current state, session logs (ops/sessions/) capture history — what was tried, what failed, what was learned, and how understanding evolved. Session logs are append-only and temporal. They serve a different purpose than goals.md: goals.md answers "what should I do next?" while session logs answer "what has been tried before?" For systems with complex multi-session projects, session logs prevent the agent from re-attempting failed approaches or re-discovering insights already captured.

**Derivation Implication:** Generated systems with processing = moderate or heavy should include session logging in ops/sessions/. Systems with processing = light may skip session logs — goals.md provides sufficient handoff for simple systems. The context file should distinguish between the two: goals.md is mandatory, session logs are optional based on complexity.

**Source:** Vault ops/sessions/ pattern (mapped to 04_meta/logs/ in the vault's structure). Session logs proved valuable during multi-week research sprints where approaches were tried and abandoned.

---

## Exclusion Notes

**Excluded from this reference:**

- Multi-agent session coordination (multiple agents working simultaneously) — this is a composition concern, not a session lifecycle concern. See future multi-agent reference if created.
- Session scheduling (when sessions should run, cron patterns for automated sessions) — operational concern for deployment, not derivation.
- Specific hook implementation code (bash scripts, TypeScript handlers) — implementation detail that belongs in platform-specific templates, not derivation reference.
- Token counting and context window measurement — model-specific technical detail that changes with each model release. The "40% smart zone" heuristic is sufficient for derivation.
- Conversation history management (how many turns to keep, summarization strategies) — platform-specific concern outside derivation scope.

---

## Version

- Last curated: 2026-02-12
- Sources reviewed: 20
- Claims included: 22
- Claims excluded: 5
- Cross-references: `kernel.yaml` (session-rhythm and self-space primitives), `three-spaces.md` (self/ space specification, session rhythm integration), `personality-layer.md` (personality affects session communication style), `components.md` (hooks component blueprint), `methodology.md` (session rhythm section), `failure-modes.md` (temporal staleness)
