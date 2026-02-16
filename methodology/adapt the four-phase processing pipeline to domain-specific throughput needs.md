---
description: Pipeline philosophy for the derivation engine — when heavy, medium, or light processing is appropriate, how the four-phase skeleton adapts per domain, why throughput beats accumulation, and why fresh
kind: guidance
status: active
topics: ["[[processing-workflows]]"]
---

# adapt the four-phase processing pipeline to domain-specific throughput needs

The processing pipeline is where raw content becomes structured knowledge. Without processing, a vault is a folder of files — organized debris. Since [[structure without processing provides no value]], the Lazy Cornell anti-pattern proves this experimentally: students who draw the structural lines but skip the cognitive work show no improvement over linear notes. Structure without processing is decoration, not knowledge work.

Since [[every knowledge domain shares a four-phase processing skeleton that diverges only in the process step]], every derived vault shares the same pipeline shape: capture, process, connect, verify. What varies is the depth and nature of the process step. This doc tells the plugin HOW to calibrate pipeline depth for each domain and user.

## The Four-Phase Skeleton

| Phase | Operation | Domain-Invariant? | Plugin Role |
|-------|----------|-------------------|-------------|
| **Capture** | Content enters the system | Yes — always an inbox or equivalent | Generate capture templates and quick-entry hooks |
| **Process** | Transform into domain-appropriate form | No — entirely domain-specific | Derive the process step from domain composition |
| **Connect** | Link to existing knowledge | Yes — graph traversal and connection finding | Generate reflect/reweave skills |
| **Verify** | Check quality and consistency | Yes — schema compliance, link integrity | Generate validation and health check hooks |

Since [[methodology traditions are named points in a shared configuration space not competing paradigms]], different domains implement different process steps but the surrounding phases are structural constants. Zettelkasten formulates permanent notes. PARA summarizes and classifies. Cornell structures cue-summary pairs. GTD routes and classifies. Each occupies a different position in the process step while sharing the same skeleton. The plugin generates the full skeleton, customizing only the process step.

### Why the Skeleton Holds

The skeleton holds because capture, connection, and verification are structural operations while processing is semantic. Capture answers "what entered the system?" regardless of domain. Connection answers "what relates to what?" regardless of content type. Verification answers "is this well-formed?" regardless of subject matter. But processing answers "what does this content mean in domain terms?" — and meaning is inherently domain-specific.

A therapy pattern recognition algorithm and a research claim extraction workflow share no logic even though they occupy the same structural position in their respective pipelines. A legal precedent analysis and a creative writing consistency check are both "processing" but they do entirely different things. The skeleton predicts where the bottleneck always forms: at the process step, because that is where domain complexity concentrates.

## Why Throughput Beats Accumulation

Since [[throughput matters more than accumulation]], success in knowledge systems is measured by processing velocity — how quickly raw captures become synthesized understanding — not by the size of the archive. The fundamental mistake in knowledge management is measuring success by what you have instead of what flows through. A vault with 10,000 unprocessed notes is not ten times more valuable than one with 1,000. It is potentially worse, because accumulation without synthesis creates a graveyard of good intentions.

The implication for pipeline design is concrete: the pipeline must keep content flowing. A 1:1 ratio of capture to synthesis means everything that enters gets processed. A growing gap between capture and synthesis means the system is failing regardless of how impressive the archive looks. Since [[PKM failure follows a predictable cycle]], this velocity gap is Stage 1 (Collector's Fallacy) — the first stage in a cascade that leads through under-processing to eventual system abandonment.

The plugin should track this ratio. When the inbox grows beyond a threshold without processing, the system should warn. When processing stalls, the system should surface the bottleneck. The metric that matters is throughput, not volume.

## The Generation Effect Gate

Since [[generation effect gate blocks processing without transformation]], before any content moves from inbox to the knowledge space, at least one agent-generated artifact must exist. No artifact, no exit.

The artifacts that satisfy the gate are specific: a description that condenses the content, a synthesis comment that relates it to existing notes, or a connection proposal that articulates why it should link to something else. What does not satisfy the gate is equally specific: folder assignment, tag application, filename changes, or any rearrangement that leaves the content unchanged. These are housekeeping operations that create the appearance of progress while producing no cognitive value.

This gate operationalizes the distinction between processing and organizing. Moving a file from `inbox/` to `notes/` is organizing. Writing a description that captures the note's claim is processing. The gate ensures the pipeline produces genuine transformation, not formatted rearrangement. Since [[the generation effect requires active transformation not just storage]], the cognitive science is clear: passive storage creates no encoding benefits. The gate makes generation a hard prerequisite rather than a best practice.

## Continuous Small-Batch Processing

Since [[continuous small-batch processing eliminates review dread]], the pipeline design favors continuous small batches over periodic bulk review. The psychology is direct: accumulated backlogs trigger avoidance that causes system abandonment. If you process one item at a time, regularly, no backlog exists. There is nothing to dread because there is nothing overwhelming.

For agents, continuous small-batch processing provides a different but equally important benefit: session isolation preserves output quality. Since [[LLM attention degrades as context fills]], processing multiple items in a single session means later items receive degraded attention. Small batches give each task fresh context.

The parallel constraints favor the same solution for different reasons:
- **Human constraint:** Accumulated backlogs trigger avoidance psychology leading to abandonment
- **Agent constraint:** Accumulated context triggers attention degradation leading to quality loss

The plugin generates pipeline configurations that process in small batches by default. For automated pipelines, this means spawning fresh execution units per task. For manual workflows, this means explicit guidance: "Process 3-5 items per session, not 30."

## Processing Intensity Calibration

Not every domain needs the same processing depth. Since [[processing effort should follow retrieval demand]], the plugin calibrates intensity based on how the domain uses its knowledge — heavy processing where content requires transformation to be useful, light processing where value comes from accumulation.

### Heavy Processing

**When:** Domain value comes from synthesis, pattern detection, cross-referencing. Content requires transformation to be useful. The processing itself generates insights the user could not produce manually.

**Examples:**
- **Research:** Extract atomic claims from sources, assess evidence quality, classify by methodology, detect contradictions against existing claims, maintain provenance chains. A 20-page paper yields 3-8 claim notes. Every claim is cross-referenced against the entire existing vault. See [[academic research uses structured extraction with cross-source synthesis]] for the full composition.
- **Therapy:** Detect mood-trigger patterns across entries, surface recurring thought patterns, track strategy effectiveness over time. The agent reads 200 entries and surfaces that "Wednesday anxiety spikes correlate with Monday evening conflicts." See [[therapy journal uses warm personality with pattern detection for emotional processing]] for the full composition.
- **Legal:** Analyze precedent chains, assess jurisdictional applicability, map argument structures, verify that the evidence base for each claim is complete and current. See [[legal case management uses precedent chains with regulatory change propagation]] for the full composition.

**Pipeline characteristics:**
- Dedicated process phase with domain-specific extraction logic
- Multi-pass processing (reduce then enrich then synthesize)
- Fresh context per phase is critical — since [[fresh context per task preserves quality better than chaining phases]], heavy processing phases should never share context
- The pipeline IS the value proposition: the processing generates insights the user cannot produce manually

### Medium Processing

**When:** Domain benefits from structured capture and connection, but content is largely self-contained. Light transformation sufficient — primarily extraction, classification, and linking.

**Examples:**
- **Project Management:** Extract decisions and action items from meeting notes, track milestones, link decisions to affected workstreams. A meeting note yields 2-4 decision records. See [[project management uses decision tracking with stakeholder context]] for the full composition.
- **Engineering:** Document decisions in ADR format, link to affected systems, track the rationale chain so future engineers understand why choices were made. See [[engineering uses technical decision tracking with architectural memory]] for the full composition.
- **Product Management:** Categorize user feedback by theme, link to feature requests, surface patterns across customer segments. See [[product management uses feedback pipelines with experiment tracking]] for the full composition.

**Pipeline characteristics:**
- Process step is primarily extraction and classification, not synthesis
- Single-pass processing usually sufficient
- Connection-finding (reflect) adds most value — linking decisions to affected areas
- Since [[schema templates reduce cognitive overhead at capture time]], template-guided capture reduces the processing burden by front-loading structure

### Light Processing

**When:** Domain value comes from accumulation and pattern detection over time, not from transforming individual entries. Each entry is small and self-contained.

**Examples:**
- **Personal Life:** Route items to areas of responsibility, track habits, log brief reflections. Individual entries need minimal transformation — a daily log is already self-contained. See [[personal assistant uses life area management with review automation]] for the full composition.
- **Health and Wellness:** Log workouts, meals, symptoms. Value comes from aggregate patterns (sleep quality correlates with inflammation markers), not from transforming individual entries. See [[health wellness uses symptom-trigger correlation with multi-dimensional tracking]] for the full composition.
- **People and Relationships:** Capture interaction details, update contact profiles, track conversation threads. See [[people relationships uses Dunbar-layered graphs with interaction tracking]] for the full composition.

**Pipeline characteristics:**
- Minimal process step (validate fields, maybe classify)
- Connection-finding is lightweight (link to person, area, or project)
- Pattern detection happens in periodic review, not per-entry processing
- Maintenance passes (weekly or monthly reviews) are where synthesis happens

## How the Plugin Selects Intensity

During /setup, the plugin determines processing intensity from:

1. **Domain composition** — each example domain specifies its typical intensity
2. **User's stated goals** — "I want to detect patterns across my journal entries" signals heavy processing; "I just want to track things" signals light
3. **Platform capabilities** — since [[platform capability tiers determine which knowledge system features can be implemented]], tier-2 and tier-3 platforms may not support automated pipelines, requiring manual processing
4. **Volume expectation** — high-volume capture (daily journaling, trade logging) combined with heavy processing creates a pipeline bottleneck; the plugin warns about this and suggests batch scheduling

The default is medium processing. The plugin escalates to heavy when the domain composition describes pattern detection, contradiction detection, or cross-source synthesis. It de-escalates to light when the composition describes accumulation-based value patterns.

## Fresh Context Architecture

Since [[LLM attention degrades as context fills]], pipeline design must respect the smart zone principle: the first ~40% of context is where sharp reasoning lives. Beyond that, attention diffuses and quality drops. The degradation is not uniform across task types — complex synthesis tasks degrade at shorter context lengths than simple verification tasks.

The plugin's pipeline implementation:

**Separates phases into distinct execution units.** Each phase (capture, process, connect, verify) should run with fresh context where possible. The process step requires the most semantic understanding and should get the freshest context. Verification tolerates degraded attention and can batch.

**Passes state through files, not context.** Per-claim task files, queue entries, and wiki links carry information between phases. Since [[intermediate packets enable assembly over creation]], each phase produces a composable packet that the next phase reads. No phase depends on another phase's context — only on its output files.

**Runs the most judgment-intensive phase first.** When phases must share context (on platforms without orchestration), the process step runs first while attention is sharpest. Verification runs last because it is more mechanical.

For platforms that support orchestration (tier 1), the plugin generates a pipeline skill that spawns separate sessions per phase. For platforms that do not (tier 2-3), the plugin provides instructions for manual phase separation: "Process this source, then start a new conversation to find connections."

## Domain-Specific Process Step Patterns

The plugin generates the process step based on domain knowledge type classification. Since [[novel domains derive by mapping knowledge type to closest reference domain then adapting]], unfamiliar domains are processed by identifying their knowledge type and adapting the closest reference domain's process step:

| Knowledge Type | Process Step Pattern | Example Domains |
|---------------|---------------------|-----------------|
| **Factual** | Extract claims, assess evidence, classify by methodology | Research, Legal |
| **Experiential** | Detect patterns across entries, correlate variables, track temporal trends | Therapy, Health, Trading |
| **Competency** | Map prerequisites, track mastery progression, generate practice opportunities | Learning, Creative (craft development) |
| **Outcome** | Document decisions with rationale, track status, assess risk, link to stakeholders | PM, Engineering, Product |
| **Social** | Capture interaction context, track relationship dynamics, surface engagement patterns | People, Personal Life |
| **Creative** | Develop ideas through iteration, check consistency against canon, track narrative threads | Creative Writing |

Since [[schema fields should use domain-native vocabulary not abstract terminology]], the process step should use the domain's own language. A therapy system calls its process step "pattern recognition." A research system calls it "claim extraction." A project management system calls it "decision documentation." These are the same structural position in the skeleton, described in the language of the practitioner.

## The Backward Pass

The forward pipeline (capture, process, connect, verify) handles new content. But since [[backward maintenance asks what would be different if written today]], old notes need reprocessing as understanding evolves.

The plugin generates two maintenance operations:

1. **Reflect (forward connection)** — "What existing notes should connect to this new note?" Runs after every new note creation. Connection-finding is never optional — since [[each new note compounds value by creating traversal paths]], connections are where compound value comes from.

2. **Reweave (backward update)** — "Given what I know now, what would be different about this old note?" Runs periodically or when triggered by new content that changes understanding. Reweave can add connections, rewrite content, sharpen claims, split bundled notes, or challenge assertions.

Reweave is the pipeline's feedback loop. Without it, the vault becomes a temporal layer cake where old notes never benefit from new understanding. With it, every note stays current — reflecting today's understanding, not historical understanding.

The complete cycle: CREATE then CONNECT FORWARD (reflect) then REVISIT then REWRITE/SPLIT/CHALLENGE (reweave) then EVOLVE. Without the backward pass, knowledge systems accumulate a graveyard of outdated thinking that happens to be organized.

## Pipeline Anti-Patterns

| Anti-Pattern | Symptom | Fix |
|-------------|---------|-----|
| Processing everything heavily | Bottleneck at process step, inbox backlog grows exponentially | Calibrate intensity by domain — not every entry needs deep extraction |
| Skipping the connect phase | Notes exist but are not linked, orphans accumulate, no compound value | Connection-finding is never optional, even for light processing domains |
| No backward pass | Old notes become stale, temporal layers do not interact, synthesis notes contradict current evidence | Schedule reweave passes after every batch and periodically for older notes |
| Chaining phases in one context | Quality degrades in later phases, agent produces shallow connections | Fresh context per phase, or at minimum process-first ordering |
| Applying research processing to all domains | Since [[false universalism applies same processing logic regardless of domain]], this produces technically executable but semantically empty systems | Each domain gets its own process step derived from its knowledge type |
| Processing without throughput tracking | Inbox grows silently, capture outpaces synthesis 10:1 | Track capture-to-synthesis ratio, warn when gap widens |
| Moving files without transformation | Appearance of progress, no actual knowledge creation | The generation effect gate blocks promotion without genuine artifacts |

## Grounding

This guidance is grounded in:
- [[every knowledge domain shares a four-phase processing skeleton that diverges only in the process step]] — the foundational skeleton
- [[throughput matters more than accumulation]] — velocity through the pipeline, not volume at any phase
- [[continuous small-batch processing eliminates review dread]] — why small batches prevent abandonment
- [[generation effect gate blocks processing without transformation]] — the quality gate at the inbox boundary
- [[fresh context per task preserves quality better than chaining phases]] — why phase isolation matters
- [[LLM attention degrades as context fills]] — the attention science behind phase isolation
- [[processing effort should follow retrieval demand]] — demand-driven processing intensity
- [[structure without processing provides no value]] — the anti-pattern that justifies mandatory processing
- [[false universalism applies same processing logic regardless of domain]] — the trap of exporting one domain's process step to another
- [[novel domains derive by mapping knowledge type to closest reference domain then adapting]] — how unfamiliar domains map to reference implementations
- [[temporal separation of capture and processing preserves context freshness]] — why capture and processing must be temporally separated

---

Topics:
- [[index]]
- [[index]]
---

Topics:
- [[processing-workflows]]
