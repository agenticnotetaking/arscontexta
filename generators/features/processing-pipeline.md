# Feature: Processing Pipeline

## Context File Block

```markdown
## Processing Pipeline

**Depth over breadth. Quality over speed. Tokens are free.**

Every piece of content follows the same path: capture, then {DOMAIN:process}, then {DOMAIN:connect}, then {DOMAIN:verify}. Each phase has a distinct purpose. Mixing them degrades both.

### The Four-Phase Skeleton

#### Phase 1: Capture

Zero friction. Everything enters through {DOMAIN:inbox/}. Speed of capture beats precision of filing. Your role here is passive: accept whatever arrives, no structuring at capture time.

{DOMAIN:Process} happens later, in fresh context with full attention. Capture and {DOMAIN:process} are temporally separated because context is freshest at capture but quality requires focused attention. If you try to capture AND process simultaneously, you will either capture slowly (losing insights to friction) or process poorly (rushing connections).

Capture everything. Process later.

#### Phase 2: {DOMAIN:Process}

This is where value is created. Raw content becomes structured {DOMAIN:notes} through active transformation.

Read the source material through the mission lens: "Does this serve {DOMAIN:the knowledge domain}?" Every extractable insight gets pulled out:

| Category | What to Find | Output |
|----------|--------------|--------|
| Core {DOMAIN:claims} | Direct assertions about the domain | {DOMAIN:note} |
| Patterns | Recurring structures across sources | {DOMAIN:note} |
| Tensions | Contradictions or conflicts | Tension note |
| Enrichments | Content that improves existing {DOMAIN:notes} | Enrichment task |
| Anti-patterns | What breaks, what to avoid | Problem note |

**The selectivity gate:** Not everything extracts. You must judge: does this add genuine insight, or is it noise? When in doubt, extract — it is easier to merge duplicates than recover missed insights.

**Quality bar for extracted {DOMAIN:notes}:**
- Title works as prose when linked: `since [[{DOMAIN:note title}]]` reads naturally
- Description adds information beyond the title
- Claim is specific enough to disagree with
- Reasoning is visible — shows the path to the conclusion

#### Phase 3: {DOMAIN:Connect}

After {DOMAIN:processing} creates new {DOMAIN:notes}, connection finding integrates them into the existing knowledge graph.

**Forward connections:** What existing {DOMAIN:notes} relate to this new one? Search semantically (not just keyword) because connections often exist between {DOMAIN:notes} that use different vocabulary for the same concept.

**Backward connections:** What older {DOMAIN:notes} need updating now that this new one exists? A {DOMAIN:note} written last week was written with last week's understanding. If today's {DOMAIN:note} extends, challenges, or provides evidence for the older one, update the older one.

**{DOMAIN:Topic map} updates:** Every new {DOMAIN:note} belongs in at least one {DOMAIN:topic map}. Add it with a context phrase explaining WHY it belongs — bare links without context are useless for navigation.

**Connection quality standard:** Not just "related to" but "extends X by adding Y" or "contradicts X because Z." Every connection must articulate the relationship.

#### The Reweaving Philosophy

The backward pass is not about adding links. It is about asking: **"If I wrote this {DOMAIN:note} today, what would be different?"**

{DOMAIN:Notes} are living documents, not finished artifacts. A {DOMAIN:note} written last month was written with last month's understanding. Since then: new {DOMAIN:notes} exist, understanding deepened, the claim might need sharpening, what was one idea might now be three. Reweaving is completely reconsidering a {DOMAIN:note} based on current knowledge.

**What reweaving can do:**

| Action | When |
|--------|------|
| Add connections | Newer {DOMAIN:notes} exist that should link here |
| Rewrite content | Understanding evolved, prose should reflect it |
| Sharpen the claim | Title is too vague to be useful |
| Split the {DOMAIN:note} | Multiple claims bundled together |
| Challenge the claim | New evidence contradicts the original |

Without reweaving, the vault becomes a graveyard of outdated thinking that happens to be organized. With reweaving, every {DOMAIN:note} stays current — reflecting today's understanding, not historical understanding.

**The complete maintenance cycle:**
~~~
CREATE -> CONNECT FORWARD (/{DOMAIN:connect}) -> REVISIT -> QUESTION/REWRITE/SPLIT (/{DOMAIN:maintain}) -> EVOLVE
~~~

#### Phase 4: {DOMAIN:Verify}

Three checks in one phase:

1. **Description quality (cold-read test)** — Read ONLY the title and description. Without reading the body, predict what the {DOMAIN:note} contains. Then read the body. If your prediction missed major content, the description needs improvement. This is the testing effect applied to vault quality: self-testing reveals weak descriptions before they cause retrieval failures in practice.

2. **Schema compliance** — All required fields present, enum values valid, {DOMAIN:topic} links exist, no unknown fields. The template `_schema` block defines what is valid.

3. **Health check** — No broken wiki links (every `[[target]]` resolves to an existing file), no orphaned {DOMAIN:notes} (every {DOMAIN:note} appears in at least one {DOMAIN:topic map}), link density within healthy range (2+ outgoing links per {DOMAIN:note}).

**Failure handling:** Description quality failures get fixed immediately (rewrite the description). Schema failures get fixed immediately (add missing fields). Link failures get logged for the {DOMAIN:connect} phase to address in the next pass.

### Inbox Processing

Everything enters through {DOMAIN:inbox/}. Do not think about structure at capture time — just get it in.

**What goes to inbox:**
- URLs with a brief note about why they matter
- Quick ideas and observations
- Sources (PDFs, articles, research results)
- Voice capture transcripts
- Anything where destination is unclear

**Processing inbox items:** Inbox items get processed into atomic {DOMAIN:notes} through the pipeline. Read the inbox item, extract insights worth keeping, create atomic {DOMAIN:notes} in {DOMAIN:notes/}, link new {DOMAIN:notes} to relevant {DOMAIN:topic maps}, then move or delete the inbox item.

**The core principle:** Capture needs to be FAST (zero friction, do not interrupt flow). Processing needs to be SLOW (careful extraction, quality connections). Separating these two activities is what makes both work. If it is in {DOMAIN:inbox/}, it is unprocessed. Once processed, the value moves to {DOMAIN:notes} and the raw material gets archived or discarded.

### Processing Principles

- **Fresh context per phase** — Do not chain all phases in one session. Each phase benefits from focused attention. Your attention degrades as context fills, so critical work should happen when your context is fresh.
- **Quality over speed** — One well-connected {DOMAIN:note} is worth more than ten orphaned ones. The graph compounds quality, not quantity.
- **The generation effect** — Moving information is not processing. You must TRANSFORM it: generate descriptions, find connections, create synthesis. Passive transfer does not create understanding.
- **Skills encode methodology** — If a {DOMAIN:skill} exists for a processing step, use it. Do not manually replicate the workflow. {DOMAIN:Skills} contain quality gates that manual execution bypasses.

### Task Management Architecture

Processing multiple {DOMAIN:notes} through a multi-phase pipeline requires tracking. Without it, {DOMAIN:notes} get stuck mid-pipeline, phases get skipped, and you lose visibility into what has been done and what remains.

#### Task Queue

The task queue tracks every {DOMAIN:note} being processed through the pipeline. It lives at `ops/queue/queue.json` with a simple structure:

~~~json
{
  "tasks": [
    {
      "id": "source-name-001",
      "type": "claim",
      "status": "pending",
      "target": "{DOMAIN:note} title here",
      "batch": "source-name",
      "created": "2026-02-13T10:00:00Z",
      "current_phase": "{DOMAIN:connect}",
      "completed_phases": ["{DOMAIN:process}", "create"]
    }
  ]
}
~~~

**Phase tracking:** Each {DOMAIN:note} has ONE queue entry. Phase progression is tracked via `current_phase` (the next phase to run) and `completed_phases` (what is already done). After each phase completes: append the current phase to `completed_phases`, advance `current_phase` to the next in sequence. When the last phase completes: set `status` to `"done"`.

**Task types:**

| Type | Purpose | Phase Sequence |
|------|---------|---------------|
| extract | Extract {DOMAIN:notes} from source | (single phase) |
| claim | Process a new {DOMAIN:note} through all phases | create -> {DOMAIN:connect} -> {DOMAIN:maintain} -> {DOMAIN:verify} |
| enrichment | Enrich an existing {DOMAIN:note} then process | enrich -> {DOMAIN:connect} -> {DOMAIN:maintain} -> {DOMAIN:verify} |

**Recovery:** If you crash mid-phase, the queue still shows `current_phase` at the failed phase. The task file confirms the corresponding section is empty. Re-running the pipeline picks it up automatically — no manual intervention needed.

#### Per-{DOMAIN:Note} Task Files

Each extracted {DOMAIN:note} gets its own task file that accumulates notes across all phases. The task file is the shared state between phases — it is how one phase communicates what it found to the next phase.

~~~markdown
# {DOMAIN:Note} 001: {title}

## {DOMAIN:Process} Notes
{Extraction rationale, duplicate judgment}

## Create
{Note creation details}

## {DOMAIN:Connect}
{Connections found, {DOMAIN:topic maps} updated}

## {DOMAIN:Maintain}
{Older {DOMAIN:notes} updated with backward connections}

## {DOMAIN:Verify}
{Description quality result, schema result, health result}
~~~

**Why task files matter:** Each phase reads the task file in fresh context. Downstream phases see what upstream phases discovered. Without this, context would be lost between sessions. The task file IS the memory of the pipeline.

**Batch archival:** When all {DOMAIN:notes} from a source reach `"done"`, the batch is archivable. Archival moves task files to `ops/queue/archive/{date}-{source}/`, generates a summary capturing what the batch produced, and cleans the queue.

#### Maintenance Queue (Condition-Based Tasks)

Maintenance work lives alongside pipeline work in the same queue. Instead of a separate tracking file, conditions materialize as `type: "maintenance"` queue entries with priority based on consequence speed. /next evaluates conditions on each invocation: fired conditions create queue entries, satisfied conditions auto-close them.

**Maintenance conditions (evaluated by /next):**

| Signal | Threshold | Action |
|--------|-----------|--------|
| Observations pending | >=10 | Suggest /{DOMAIN:rethink} |
| Tensions pending | >=5 | Suggest /{DOMAIN:rethink} |
| {DOMAIN:Topic map} size | >40 {DOMAIN:notes} | Suggest split |
| Orphan {DOMAIN:notes} | Any | Flag for connection finding |
| Dangling links | Any | Flag for resolution |
| Stale health check | >7 days | Suggest /{DOMAIN:health} |
| Inbox age | >3 days | Suggest processing |
| Pipeline batch stalled | >2 sessions without progress | Surface as blocked |

**Priority derives from consequence speed**, not manual labels:

| Consequence Speed | Priority | Examples |
|-------------------|----------|----------|
| `session` | Highest | Orphan {DOMAIN:notes}, dangling links, inbox pressure |
| `multi_session` | Medium | Pipeline batch completion, stale health checks |
| `slow` | Lower | {DOMAIN:Topic map} oversizing, rethink thresholds |

The session-start orientation checks these thresholds and surfaces the highest-priority items. This is reconciliation-based task management — the system tells you what needs attention based on measured state, not based on tasks someone remembered to create.

### Orchestrated Processing (Fresh Context Per Phase)

The pipeline's quality depends on each phase getting your best attention. Your context degrades as conversation grows. The first ~40% of your context window is the "smart zone" — sharp, capable, good decisions. Beyond that, context rot sets in. Chaining multiple phases in one session means later phases run on degraded attention.

**The orchestration pattern:**

~~~
Orchestrator reads queue -> picks next task -> spawns worker for one phase
  Worker: fresh context, reads task file, executes phase, writes results to task file
  Worker returns -> Orchestrator reads results -> advances queue -> spawns next phase
~~~

**Why fresh context matters:**
- {DOMAIN:Process}/extract needs full attention on the source material
- {DOMAIN:Connect} needs full attention on the existing knowledge graph
- {DOMAIN:Maintain}/reweave needs full attention on older {DOMAIN:notes}
- {DOMAIN:Verify} needs neutral perspective, unbiased by creation

If all four phases run in one session, the verify phase runs on degraded attention — you have already decided this {DOMAIN:note} is good during create, and confirmation bias sets in. Fresh context prevents this.

**Handoff through files, not context:**
- Each phase writes its findings to the task file
- The next phase reads the task file in fresh context
- State transfers through persistent files, not accumulated conversation
- This makes crashes recoverable and processing auditable

**Processing modes:**

| Mode | Behavior | When to Use |
|------|----------|-------------|
| Interactive | You invoke each phase manually, review between | Learning the system, important sources |
| Orchestrated | Automated phase-by-phase with fresh context | Batch processing, high volume |
| Compressed | Phases run sequentially in same session (quality trade-off) | Quick processing, minor sources |

Default: Interactive mode for new users, Orchestrated for experienced users. Configurable via `ops/config.yaml`:
~~~yaml
pipeline:
  processing_mode: interactive  # interactive | orchestrated | compressed
~~~

**Implementation approaches by platform:**

| Platform Capability | Orchestration Mechanism |
|---------------------|----------------------|
| Subagent spawning | Task tool with worker agents (preferred — true context isolation) |
| Background processing | Background agents or scheduled skills |
| No subagent support | Manual invocation with task file handoff between sessions |

The task queue IS the orchestration — {DOMAIN:skills} read from it, write to it, and the queue state drives what happens next. You do not need a separate orchestrator command. When you say "process this source through the full pipeline," follow the pattern: read queue, pick task, execute phase, advance queue, repeat.

### Processing Depth Configuration

Not every source deserves the same attention. A critical research paper warrants fresh context per phase and maximum quality gates. A quick note from a conversation can be processed in a single pass.

**Three depth levels** (configurable via ops/config.yaml):

| Level | Behavior | Context Strategy | Use When |
|-------|----------|-----------------|----------|
| Deep | Full pipeline, fresh context per phase, maximum quality gates | Spawn subagent per phase | Important sources, research, initial vault building |
| Standard | Full pipeline, balanced attention, inline execution | Sequential phases in current session | Regular processing, moderate volume (default) |
| Quick | Compressed pipeline, combine {DOMAIN:connect}+{DOMAIN:verify} phases | Fast single-pass | High volume catch-up, minor sources |

~~~yaml
# ops/config.yaml
processing:
  depth: standard  # deep | standard | quick
~~~

**What changes at each depth:**

- **Deep** runs each phase in isolated context. The {DOMAIN:process} phase gets a fresh context window loaded with only the source material and extraction context. The {DOMAIN:connect} phase gets a fresh window loaded with the existing knowledge graph. No phase is contaminated by the work of another. This is the maximum quality setting and should be used for sources that will produce many {DOMAIN:notes}.

- **Standard** runs all phases sequentially within the current session. Quality is good because each phase gets focused attention, but context does accumulate across phases. This is the right default for most work.

- **Quick** combines {DOMAIN:connect} and {DOMAIN:verify} into a single pass and reduces the depth of backward-connection checking. Use this for processing accumulated minor sources when volume matters more than depth.

### Pipeline Chaining

{DOMAIN:Skills} need to chain their outputs. Without chaining, the pipeline is documentation — you complete one phase but forget to run the next. Three activation modes control how aggressively chaining happens:

| Mode | Behavior | Who Controls |
|------|----------|-------------|
| Manual | {DOMAIN:Skill} outputs "Next: /{DOMAIN:skill} [target]" — you decide whether to run it | You |
| Suggested | {DOMAIN:Skill} outputs next step AND adds to task queue — you can skip | You + system |
| Automatic | {DOMAIN:Skill} completes -> next phase runs immediately via orchestration | System |

Default: Suggested mode. Automatic mode activates when you run batch processing or orchestrated mode. Configurable:

~~~yaml
# ops/config.yaml
pipeline:
  chaining: suggested  # manual | suggested | automatic
~~~

**The chaining model:**

~~~
/{DOMAIN:learn} [topic]
    -> files to inbox with provenance
    -> [CHAIN] queue for {DOMAIN:process}
/{DOMAIN:process} [inbox-file]
    -> extracts {DOMAIN:notes} and enrichments to task queue
    -> [CHAIN] queues all extracted {DOMAIN:notes} for create
create [{DOMAIN:note}]
    -> writes {DOMAIN:note} to {DOMAIN:notes/}
    -> [CHAIN] queues {DOMAIN:note} for {DOMAIN:connect}
/{DOMAIN:connect} [{DOMAIN:note}]
    -> finds connections, updates {DOMAIN:topic maps}
    -> [CHAIN] queues {DOMAIN:note} for {DOMAIN:maintain}
/{DOMAIN:maintain} [{DOMAIN:note}]
    -> updates old {DOMAIN:notes} with new connections
    -> [CHAIN] queues {DOMAIN:note} for {DOMAIN:verify}
/{DOMAIN:verify} [{DOMAIN:note}]
    -> tests description, schema, links
    -> [END] marks task complete
~~~

**Queue-driven chaining:** When /{DOMAIN:process} creates {DOMAIN:notes}, each gets a task queue entry with `current_phase: "create"`. The queue drives the pipeline — chaining happens through queue state management, not through {DOMAIN:skills} directly invoking each other.

### Full Automation From Day One

Every vault ships with the complete pipeline active from the first session. All processing skills, all quality gates, all maintenance mechanisms are available immediately. You do not need to "level up" or wait for your vault to reach a certain size before using orchestrated processing, fresh context isolation, or queue management.

The philosophy: it is easier to disable features you do not need than to discover and enable features you did not know existed. If a feature exists, it works on day one.

**All skills are available from day one.** /{DOMAIN:process}, /{DOMAIN:connect}, /{DOMAIN:maintain}, /{DOMAIN:verify}, /{DOMAIN:health}, and all other skills are ready to invoke on the first source you process. The full pipeline runs on the first {DOMAIN:note} you create.

### Session Capture

Every session's work is captured automatically as part of the session rhythm:

- **Stop hooks save session transcripts** to ops/sessions/ when a session ends
- **Auto-creates mining tasks** for future processing of session content
- **Friction detection runs automatically** on session transcripts — the system detects friction signals without requiring explicit /{DOMAIN:remember} invocation (though /{DOMAIN:remember} remains available for immediate, explicit capture)

Session capture ensures no work is lost between sessions. The transcript becomes a source that can be processed through the standard pipeline, mining insights that were not explicitly flagged during the session.

### Quality Gates Summary

Every phase has specific gates. Failing a gate does not block progress — it triggers correction.

| Phase | Gate | Failure Action |
|-------|------|---------------|
| {DOMAIN:Process} | Selectivity — is this worth extracting? | Skip with logged reason |
| {DOMAIN:Process} | Composability — does the title work as prose? | Rewrite title |
| {DOMAIN:Process} | Description adds new info beyond title? | Rewrite description |
| {DOMAIN:Process} | Duplicate check — semantic search run? | Run search, merge if duplicate |
| {DOMAIN:Connect} | Genuine relationship — can you say WHY? | Do not force the connection |
| {DOMAIN:Connect} | {DOMAIN:Topic map} updated | Add {DOMAIN:note} to relevant {DOMAIN:topic maps} |
| {DOMAIN:Connect} | Backward pass — older {DOMAIN:notes} updated? | Update or log for maintenance |
| {DOMAIN:Verify} | Description predicts content (cold-read test) | Improve description |
| {DOMAIN:Verify} | Schema valid | Fix schema violations |
| {DOMAIN:Verify} | No broken links | Fix or remove broken links |
| {DOMAIN:Verify} | {DOMAIN:Note} in at least one {DOMAIN:topic map} | Add to relevant {DOMAIN:topic map} |

**Automation of quality gates:** When your platform supports hooks, a PostToolUse hook on Write can validate YAML frontmatter, description fields, and topic links on {DOMAIN:note} creation. This makes methodology invisible — instead of remembering to validate, a hook catches drift automatically. Build hooks for any quality check you want to be automatic.

### Skill Invocation Rules

If a {DOMAIN:skill} exists for a task, use the {DOMAIN:skill}. Do not manually replicate the workflow. {DOMAIN:Skills} encode the methodology — manual execution bypasses quality gates.

| Trigger | Required {DOMAIN:Skill} |
|---------|------------------------|
| New content to {DOMAIN:process} | /{DOMAIN:process} |
| New {DOMAIN:notes} need connections | /{DOMAIN:connect} |
| Old {DOMAIN:notes} may need updating | /{DOMAIN:maintain} |
| Quality verification needed | /{DOMAIN:verify} |
| System health check | /{DOMAIN:health} |
| User asks to find connections | /{DOMAIN:connect} (not manual grep) |
| System feels disorganized | /{DOMAIN:health} (systematic checks, not ad-hoc) |

**The enforcement principle:** If a {DOMAIN:skill} exists for a task, use the {DOMAIN:skill}. Do not improvise the workflow manually. {DOMAIN:Skills} encode the methodology. Manual execution loses the quality gates.

### Session Discipline

Each session focuses on ONE task. Discoveries become future tasks, not immediate tangents.

Your attention degrades as context fills. The first ~40% of context is the "smart zone" — sharp, capable, good decisions. Beyond that, context rot sets in. Structure each task so critical information lands early. When processing multiple {DOMAIN:notes}, use fresh context per {DOMAIN:note} — never chain phases in one session.

**The handoff protocol:** Every phase writes its findings to the task file. The next phase reads the task file in fresh context. State transfers through files, not through accumulated conversation. This ensures:
- No context contamination between phases
- Each phase gets your best attention
- Crashes are recoverable (the task file shows where processing stopped)
- Multiple {DOMAIN:notes} can be processed without degradation

### Research Provenance

Every file in {DOMAIN:inbox/} from a research tool (web search, deep research, API import) MUST include provenance metadata in its YAML frontmatter. Claims without provenance are untraceable.

**Standard provenance fields:**

~~~yaml
source_type: [research | web-search | manual | voice | channel | import]
research_prompt: "the query or directive that generated this content"
research_server: "exa | google | brave | manual"
research_model: "exa-research-pro | exa-research-fast | n/a"
generated: "YYYY-MM-DDTHH:MM:SSZ"
~~~

The `research_prompt` field is the most critical — it captures the intellectual context that shaped what was returned. Knowing "I searched for X because I was exploring Y" is part of the knowledge graph.

**Provenance chain:** research query (prompt preserved in YAML) -> inbox file -> {DOMAIN:process} -> {DOMAIN:notes}. Each {DOMAIN:note}'s Source footer links back to the inbox file whose YAML contains the research prompt.

**Depth toggle via config:**
~~~yaml
# ops/config.yaml
provenance: full  # full | minimal | off
~~~

- `full` (default for heavy processing): All fields captured
- `minimal`: source_type and generated timestamp only
- `off`: No provenance metadata (for systems that do not use research tools)
```

## Dependencies
Requires: yaml-schema, wiki-links, atomic-notes, mocs

## Skills Referenced
- {DOMAIN:process} (extract insights from sources)
- {DOMAIN:connect} (find connections, update topic maps)
- {DOMAIN:maintain} (backward pass, update old notes)
- {DOMAIN:verify} (combined quality gate: description, schema, links)
- {DOMAIN:health} (systematic health checks)
- {DOMAIN:learn} (research and file to inbox)
- {DOMAIN:rethink} (review accumulated observations and tensions)
