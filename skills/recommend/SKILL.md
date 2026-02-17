---
name: recommend
description: Get research-backed architecture advice for your knowledge system. Describe your use case, constraints, and goals — get specific recommendations grounded in TFT research with rationale for each decision. Triggers on "/recommend", "what would you recommend", "architecture advice", "knowledge system for".
version: "1.0"
generated_from: "arscontexta-v1.6"
user-invocable: true
context: fork
model: opus
allowed-tools: Read, Grep, Glob, mcp__qmd__search, mcp__qmd__vector_search, mcp__qmd__deep_search, mcp__qmd__get, mcp__qmd__multi_get
argument-hint: "[use case description and constraints] — describe what you want to build"
---

## Runtime Configuration (Step 0 — before any processing)

Read these files to configure recommendation behavior:

1. **`${CLAUDE_PLUGIN_ROOT}/reference/tradition-presets.md`** — tradition and use-case presets
   - Pre-validated coherence points in the 8-dimension space
   - Starting points for customization, not final answers

2. **`${CLAUDE_PLUGIN_ROOT}/reference/methodology.md`** — universal methodology principles

3. **`${CLAUDE_PLUGIN_ROOT}/reference/components.md`** — component blueprints (what can be toggled)

4. **`${CLAUDE_PLUGIN_ROOT}/reference/dimension-claim-map.md`** — maps each dimension position to supporting research claims

5. **`${CLAUDE_PLUGIN_ROOT}/reference/interaction-constraints.md`** — hard blocks, soft warns, cascade effects between dimensions

6. **`${CLAUDE_PLUGIN_ROOT}/reference/claim-map.md`** — topic navigation for the research graph

If any reference file is missing, note the gap but continue with available information. The recommendation degrades gracefully — fewer citations, same structure.

---

## EXECUTE NOW

**Target: $ARGUMENTS**

Parse immediately:
- If target is empty or a question: enter **conversational mode** — ask 1-2 clarifying questions, then recommend
- If target contains a use case description: proceed directly to **recommendation mode**
- If target contains `--compare [A] [B]`: enter **comparison mode** — compare two presets or configurations

**START NOW.** Reference below defines the workflow.

---

## Philosophy

**Advisory, not generative.**

/recommend exists for exploration. The user is considering a knowledge system — maybe they have a use case, maybe they're comparing approaches, maybe they're curious what the research says about a specific pattern. /recommend answers with specific, research-backed reasoning without creating any files.

This is the entry point before commitment. /setup generates a full system. /recommend sketches what that system would look like and WHY, so the user can decide whether to proceed. Every recommendation traces to specific research claims. "I recommend X" is never enough — "I recommend X because [[claim]]" is the minimum.

**The relationship to other skills:**
- **/recommend** → advisory sketch (no files)
- **/setup** → full system generation (creates everything)
- **/architect** → evolution advice for EXISTING systems (reads current state)
- **/refactor** → implements changes to EXISTING systems (modifies files)

/recommend is the only one that works without an existing system. It's pure reasoning from research.

---

## Phase 1: Understand the Constraints

### 1a. Parse User Input

Extract signals from the user's description. Every word is a signal:

| Signal Category | Examples | Maps To |
|-----------------|----------|---------|
| **Domain** | "therapy sessions", "research papers", "trading journal" | Closest preset, schema design |
| **Scale** | "just starting", "hundreds of notes", "massive corpus" | Granularity, navigation tiers |
| **Processing style** | "quick capture", "deep analysis", "both" | Processing depth, automation level |
| **Platform** | "Obsidian", "Claude Code", "plain files" | Platform capabilities, linking type |
| **Existing system** | "I use PARA", "I have a Zettelkasten", "starting fresh" | Tradition preset baseline |
| **Pain points** | "can't find anything", "too much ceremony", "notes go stale" | Dimension adjustments |
| **Goals** | "track claims", "build arguments", "personal reflection" | Note design, schema density |
| **Operator** | "I'll maintain it", "AI agent runs it", "both" | Automation, maintenance frequency |

### 1b. Conversational Mode (when input is sparse)

If the user's description lacks critical signals, ask **at most 2 clarifying questions**. Frame them as choices, not open-ended:

```
To recommend the right architecture, I need two things:

1. **What kind of knowledge?** (pick closest)
   - Research/learning — tracking claims, building arguments
   - Creative — drafts, revisions, inspiration
   - Operational — tasks, decisions, processes
   - Personal — reflections, goals, relationships
   - Mixed — multiple of the above

2. **Who operates it?**
   - Mostly you (human-maintained)
   - Mostly an AI agent
   - Both (shared operation)
```

Do NOT ask more than 2 questions. The recommendation can always be refined. Get enough to start, then recommend.

### 1c. Signal Insufficiency

If after parsing (and optional questions) you still lack critical information, make reasonable defaults and STATE them:

```
Assuming:
- Platform: Obsidian (most common for personal knowledge)
- Scale: moderate (50-200 notes in first year)
- Operator: human-primary with occasional AI assistance

These assumptions affect the recommendation. Correct any that don't match.
```

---

## Phase 2: Match to Preset

### 2a. Read Presets

Read `${CLAUDE_PLUGIN_ROOT}/reference/tradition-presets.md`. This file contains:
- **Tradition presets** — Zettelkasten, PARA, Evergreen, Cornell, etc.
- **Use-case presets** — research, creative writing, engineering, therapy, etc.

### 2b. Find Closest Match

Score each preset against the user's signals:

| Criterion | Weight | How to Score |
|-----------|--------|-------------|
| Domain match | High | Does the preset's intended domain match? |
| Processing style match | High | Does the preset's processing depth match the user's style? |
| Scale match | Medium | Is the preset designed for the user's expected scale? |
| Pain point coverage | Medium | Does the preset address the user's stated friction? |
| Goal alignment | High | Does the preset optimize for what the user wants? |

### 2c. Report the Match

State the closest preset and explain the match:

```
Closest preset: [preset name]
Match quality: [strong/moderate/partial]

Why: [1-2 sentences explaining the match]
Adjustments needed: [what needs to change from the preset baseline]
```

If the user's description blends multiple presets, explain the blend:

```
This blends two presets:
- [Preset A] for [which aspects]
- [Preset B] for [which aspects]

Starting from [Preset A] and adjusting [specific dimensions] toward [Preset B].
```

---

## Phase 3: Search for Relevant Research

### 3a. Topic-Based Search

Use `${CLAUDE_PLUGIN_ROOT}/reference/claim-map.md` to identify which research topics apply to the user's use case. Read the claim map and identify relevant topic clusters.

### 3b. Semantic Search

Use qmd tools to find research claims that apply to the user's specific constraints:

```
mcp__qmd__deep_search  query="[user's domain] knowledge management patterns"
mcp__qmd__vector_search  query="[user's specific concern or goal]"
```

Fallback chain:
- MCP tools (`mcp__qmd__deep_search`, `mcp__qmd__vector_search`, `mcp__qmd__search`)
- qmd CLI (`qmd query`, `qmd vsearch`, `qmd search`)

Run 2-4 targeted searches based on the user's signals. Focus on:
- Domain-specific patterns (if the research covers their domain)
- Processing philosophy (batch vs continuous, deep vs light)
- Scale considerations (what changes as the system grows)
- Pain point research (what causes the friction they described)

### 3c. Read Relevant Claims

For each search result that looks relevant, read the claim via `mcp__qmd__get` (or `mcp__qmd__multi_get` for batch reads) to understand the full argument. You need enough depth to cite with confidence.

Collect 5-15 relevant claims. You won't cite all of them — but you need a pool to draw from.

---

## Phase 4: Map Signals to Dimensions

### 4a. Read Dimension-Claim Map

Read `${CLAUDE_PLUGIN_ROOT}/reference/dimension-claim-map.md`. This maps each dimension position to the research claims that support it.

### 4b. Determine Each Position

For each of the 8 configuration dimensions, determine the recommended position:

**Granularity** — atomic / moderate / compound
- Key signals: domain type, processing style, reuse intent
- Atomic: research, argument-building, cross-domain synthesis
- Moderate: most use cases, balanced effort-to-value
- Compound: creative writing, narrative, sequential content

**Organization** — flat / hierarchical
- Key signals: scale, navigation preference, operator type
- Flat: <200 notes, agent-operated, wiki-link navigation
- Hierarchical: >500 notes, human-operated, folder navigation

**Linking** — explicit / explicit+implicit
- Key signals: platform capabilities, scale, discovery needs
- Explicit only: simple systems, human-maintained, low volume
- Explicit+implicit: semantic search available, agent-operated, discovery-focused

**Processing** — heavy / moderate / light
- Key signals: content type, time budget, value of deep analysis
- Heavy: research, argument-building, agent-operated
- Moderate: mixed content, balanced effort
- Light: quick capture, high volume, low ceremony

**Navigation** — 2-tier / 3-tier / 4-tier
- Key signals: expected scale, domain complexity
- 2-tier: <100 notes, single domain
- 3-tier: 100-500 notes, multiple sub-domains
- 4-tier: 500+ notes, complex multi-domain

**Maintenance** — condition-based (tight) / condition-based (lax) / manual
- Key signals: operator type, automation level, system criticality, rate of change
- Condition-based (tight thresholds): high-volume, agent-operated, fast-changing domains
- Condition-based (lax thresholds): low-volume, stable domains
- Manual: minimal ceremony, on-demand only

**Schema** — minimal / moderate / dense
- Key signals: query needs, processing depth, metadata tolerance
- Minimal: description only, low ceremony
- Moderate: description + type + topics, queryable
- Dense: full provenance, validation, structured queries

**Automation** — full / convention / manual
- Key signals: operator type, platform capabilities, trust level
- Full: agent-operated, platform supports hooks
- Convention: shared human-agent operation
- Manual: human-primary, learning the system

### 4c. Assign Confidence

For each dimension, assign confidence based on signal strength:

| Confidence | Meaning | When |
|------------|---------|------|
| **High** | Strong signals point clearly to this position | Multiple signals converge, research supports, no counter-signals |
| **Medium** | Reasonable recommendation with some uncertainty | Some signals present, research supports, minor alternatives exist |
| **Low** | Best guess given limited information | Few signals, multiple valid positions, user should validate |

---

## Phase 5: Validate Against Interaction Constraints

### 5a. Read Constraints

Read `${CLAUDE_PLUGIN_ROOT}/reference/interaction-constraints.md`.

### 5b. Check for Hard Blocks

Test the proposed 8-dimension configuration against all hard block rules. Hard blocks are combinations that WILL fail:

```
Example hard block:
  granularity: atomic + navigation: 2-tier
  At high volume (200+ notes), atomic granularity with only 2 tiers
  creates navigational vertigo — too many notes per MOC.
```

If a hard block fires:
1. Identify which dimensions conflict
2. Propose adjustment to resolve (change the lower-confidence dimension)
3. Explain why the adjusted configuration avoids the block
4. Present both original and adjusted configurations

### 5c. Check for Soft Warns

Test against soft warn rules. Soft warns are friction points that have compensating mechanisms:

```
Example soft warn:
  schema: dense + automation: manual
  Dense schemas require manual enforcement without automation.
  Compensating: add validation scripts triggered by condition checks.
```

If soft warns fire:
1. Note each warning
2. Identify the compensating mechanism
3. Include in the recommendation output

### 5d. Check for Cascade Effects

Would changing one dimension to match the user's needs create pressure on another dimension that wasn't explicitly discussed?

```
Example cascade:
  User wants: processing: heavy
  Cascade pressure: maintenance should be condition-based (heavy processing
  generates more artifacts that need maintenance)
```

If cascades detected, include the cascaded dimension in the recommendation with explanation.

---

## Phase 6: Present Recommendation

### Output Format

```
--=={ recommend }==--

Use case: [1-sentence summary of what the user described]

Closest Preset: [preset name] ([strong/moderate/partial] match)
  [Why this preset, what adjustments needed]

## Recommended Configuration

| Dimension | Position | Confidence | Rationale |
|-----------|----------|------------|-----------|
| Granularity | [position] | [H/M/L] | [reason + claim reference] |
| Organization | [position] | [H/M/L] | [reason + claim reference] |
| Linking | [position] | [H/M/L] | [reason + claim reference] |
| Processing | [position] | [H/M/L] | [reason + claim reference] |
| Navigation | [position] | [H/M/L] | [reason + claim reference] |
| Maintenance | [position] | [H/M/L] | [reason + claim reference] |
| Schema | [position] | [H/M/L] | [reason + claim reference] |
| Automation | [position] | [H/M/L] | [reason + claim reference] |

{If interaction constraints fired:}
Interaction Constraints:
  [HARD BLOCK | SOFT WARN | CLEAN]: [description]
  [Resolution or compensating mechanism]

## Architecture Sketch

Folder structure:
  [proposed folder layout for their domain]

Components enabled:
  - [component] — [why, one line]
  - [component] — [why, one line]

Components skipped:
  - [component] — [why not needed]

## Schema Design

Base fields (all {vocabulary.note_plural}):
  description: [one-sentence summary]
  [domain-specific field]: [purpose]

Example {vocabulary.note} in your domain:
  ---
  description: [example for their domain]
  [field]: [example value]
  ---
  # [example title in their domain style]
  [2-3 lines showing what a note looks like]

## Processing Pattern

Capture: [how things enter the system]
Process: [how raw input becomes structured knowledge]
Connect: [how notes link to each other]
Maintain: [how the system stays healthy]

## Session Rhythm

Orient: [what to read at session start]
Work: [how to capture during active work]
Persist: [what to save at session end]

## Trade-offs

Optimizes for: [what this configuration prioritizes]
Sacrifices: [what it deprioritizes]
Reconsider when: [signals that the configuration should evolve]

## Research Backing

Key claims supporting this recommendation:
  - [claim title] — [how it applies to this recommendation]
  - [claim title] — [how it applies]
  - [claim title] — [how it applies]

Ready to build this? Run /setup to generate the full system.
```

### Rationale Depth Per Dimension

Each dimension rationale should include:

1. **The signal** — what from the user's input points to this position
2. **The research** — which claim(s) support this position for their context
3. **The alternative** — what the other position would mean and why it's less suitable

Example:
```
Granularity → atomic (high confidence):
  Signal: "track claims across disciplines" requires decomposing sources
  into individual assertions.
  Research: [[three capture schools converge through agent-mediated synthesis]]
  shows that agent processing recovers what atomic capture loses.
  Alternative: Moderate granularity would reduce processing effort but
  sacrifice cross-domain connection density, which is your primary goal.
```

---

## Comparison Mode (--compare)

When invoked with `--compare [A] [B]`:

1. Read both presets from `${CLAUDE_PLUGIN_ROOT}/reference/tradition-presets.md`
2. Present a side-by-side comparison:

```
--=={ recommend: compare }==--

Comparing: [Preset A] vs [Preset B]

| Dimension | [A] | [B] | Key Difference |
|-----------|-----|-----|----------------|
| Granularity | [pos] | [pos] | [what differs and why] |
| Organization | [pos] | [pos] | [what differs and why] |
| ... | ... | ... | ... |

Where [A] wins:
  - [scenario where A is better, with research reason]

Where [B] wins:
  - [scenario where B is better, with research reason]

For your use case: [recommendation of which to start from, if user
provided enough context]
```

---

## Quality Standards

### Every Recommendation Must

1. **Trace to research** — no "I recommend X" without a claim reference. If no research covers a specific aspect, say so: "No specific research covers this; recommending based on general principles."

2. **Be honest about confidence** — low-confidence recommendations are valuable IF flagged. "I'm less certain about navigation tiers because your scale is unclear" is better than a false-confident recommendation.

3. **Respect simplicity** — default to simpler configurations. The user can always add complexity later. Recommend the MINIMUM viable configuration, then note what they'd add as they grow.

4. **Avoid over-engineering** — don't recommend features the user didn't ask about. If they want a simple journal, don't recommend 4-tier navigation and dense schemas. Match the system to their actual needs.

5. **Present trade-offs** — every position has costs. Make them visible so the user can make an informed choice.

### Anti-Patterns

- Recommending maximum everything (all dimensions at highest complexity)
- Recommending without reading the constraint map (producing invalid combinations)
- Asking more than 2 clarifying questions (analysis paralysis)
- Generating files (this is /setup's job, not /recommend's)
- Ignoring the user's stated pain points
- Recommending against the user's explicit preferences without strong research justification

---

## Edge Cases

### User Describes an Existing System

If the user already has a system and wants advice on improving it:

```
You already have a system. /recommend designs new systems from scratch.

For evolution advice on existing systems, run /architect — it reads your
current configuration and recommends evidence-based changes.

If you want to compare your current setup against the research-optimal
configuration, I can do that here. Want me to?
```

If they say yes, proceed with comparison: their current configuration vs what research suggests.

### User Describes Something Outside Knowledge System Scope

If the request is not about a knowledge system (e.g., "recommend a database for my app"):

```
/recommend is designed for knowledge system architecture — personal or
agent-operated systems for capturing, organizing, and retrieving knowledge.

Your request sounds more like [what it sounds like]. I can help with
that directly, but /recommend's research backing is specific to knowledge
management patterns.
```

### No Presets Match

If no preset is a reasonable match:

```
No existing preset closely matches your use case. Building a custom
configuration from first principles.

Starting from: [methodology.md universal principles]
Domain signals: [what was extracted]
```

Proceed with Phase 4 (dimension mapping) without a preset baseline. Note lower confidence on dimensions where a preset would have provided grounding.

### Conflicting User Signals

When signals point in opposite directions (e.g., "I want deep analysis but hate ceremony"):

1. Name the conflict explicitly
2. Explain what research says about the tension
3. Recommend the position that best resolves the conflict
4. Note the trade-off clearly

```
Tension detected: You want deep processing (heavy) but minimal ceremony
(light schema, manual automation). Research shows these create friction
because deep processing generates metadata that light schemas can't capture.

Resolution: Processing → moderate, Schema → moderate
  This gives meaningful analysis without overwhelming ceremony.
  You can increase processing depth later if you want deeper extraction.
```

### User Asks "What's Best?"

There is no universal best. Redirect to constraints:

```
"Best" depends on what you're optimizing for. A research system and
a personal journal need fundamentally different architectures.

Tell me:
- What kind of knowledge are you working with?
- What's your biggest frustration with your current approach?

That gives me enough to recommend something specific.
```
