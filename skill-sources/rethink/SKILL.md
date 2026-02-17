---
name: rethink
description: Challenge system assumptions against accumulated evidence. Triages observations and tensions, detects patterns, generates proposals. The scientific method applied to knowledge systems. Triggers on "/rethink", "review observations", "challenge assumptions", "what have I learned".
user-invocable: true
allowed-tools: Read, Write, Edit, Grep, Glob, Bash, AskUserQuestion
context: fork
---

## Runtime Configuration (Step 0 — before any processing)

Read these files to configure domain-specific behavior:

1. **`ops/derivation-manifest.md`** — vocabulary mapping, domain context
   - Use `vocabulary.notes` for the notes folder name
   - Use `vocabulary.note` for the note type name in output
   - Use `vocabulary.rethink` for the command name in output
   - Use `vocabulary.topic_map` for MOC references
   - Use `vocabulary.cmd_reflect` for connection-finding references

2. **`ops/config.yaml`** — thresholds, processing preferences
   - `self_evolution.observation_threshold`: number of pending observations before suggesting rethink (default: 10)
   - `self_evolution.tension_threshold`: number of pending tensions before suggesting rethink (default: 5)

3. **`ops/methodology/`** — existing methodology notes (read all to understand current system self-knowledge)

If these files don't exist (pre-init invocation or standalone use), use universal defaults.

The command name itself transforms per domain. The derivation manifest maps the universal name to domain-native language. If no manifest exists, use "rethink" as the command name.

## EXECUTE NOW

**Target: $ARGUMENTS**

Parse immediately:
- If target is empty: run full six-phase rethink (Phase 0 drift check + five evidence phases) on all pending observations and tensions
- If target is "triage": run Phase 1 only (triage and methodology updates, no pattern detection)
- If target is "patterns": skip triage, run Phases 3-5 only (analyze existing evidence for patterns)
- If target is "drift": run Phase 0 only (drift check without triage or pattern detection)
- If target is a specific observation or tension filename: triage that single item interactively

**START NOW.** Reference below defines the six-phase workflow.

---

## Philosophy

**The system is not sacred. Evidence beats intuition.**

Every rule in the context file, every workflow in a skill, every assumption baked into the architecture was a hypothesis at some point. Hypotheses need testing against reality. Observation notes in `ops/observations/` capture friction from actual use. Tension notes in `ops/tensions/` capture unresolved conflicts. Rethink first triages these individually (some become {DOMAIN:notes}, some become methodology updates, some get archived), then compares remaining evidence against what the system assumes and proposes changes when patterns emerge.

This is the scientific method applied to knowledge systems: hypothesize, implement, observe, revise.

Without this loop, generated systems ossify — they accumulate friction that never gets addressed, contradictions that never get resolved, and methodology learnings that never get elevated to system-level changes. /rethink is the immune system that prevents calcification.

---

## Phase 0: Drift Check

Rule Zero: ops/methodology/ is the canonical specification of how this system operates. Before triaging observations, check whether the system has drifted from what the methodology says it should do.

### 0a. Load Methodology State

```bash
# Get all methodology notes with their metadata
for f in ops/methodology/*.md; do
  echo "=== $f ==="
  head -20 "$f"  # frontmatter with category, created, updated, status
  echo ""
done
```

Read all methodology notes fully. Extract:
- Each note's category, created date, updated date, status
- The behavioral assertions each note makes (the "What to Do" sections)

### 0b. Load System Configuration

Read:
- `ops/config.yaml` — current configuration state
- The context file (CLAUDE.md) — current behavioral instructions
- `ops/derivation-manifest.md` — vocabulary and feature state

### 0c. Compare Across Three Drift Types

**Type 1: Staleness**

```bash
# Compare config.yaml modification time vs newest methodology note
CONFIG_MTIME=$(stat -f %m ops/config.yaml 2>/dev/null || stat -c %Y ops/config.yaml 2>/dev/null || echo 0)
NEWEST_METH=$(ls -t ops/methodology/*.md 2>/dev/null | head -1)
METH_MTIME=$(stat -f %m "$NEWEST_METH" 2>/dev/null || stat -c %Y "$NEWEST_METH" 2>/dev/null || echo 0)
```

If `CONFIG_MTIME > METH_MTIME`: config has changed since methodology was last updated. Flag as staleness drift.

**Type 2: Coverage Gap**

For each active feature in config.yaml (features with `enabled: true` or features present in the active configuration), check whether a corresponding methodology note exists. Features without methodology coverage represent gaps — the system does things it cannot explain to itself.

Check these feature areas:
- Processing pipeline (is there a methodology note about processing behavior?)
- Maintenance conditions (methodology notes about when maintenance triggers?)
- Session rhythm (methodology notes about session workflow?)
- Domain-specific behaviors (methodology notes about domain vocabulary and patterns?)

**Type 3: Assertion Mismatch**

For each methodology note that makes a behavioral assertion ("What to Do" section), check:
- Does the context file contain instructions that align with or contradict this directive?
- Does config.yaml contain settings that align with or contradict this directive?
- Are there other methodology notes that contradict this one?

Report: which assertions align, which contradict, which have no corresponding system element.

### 0d. Create Drift Observations

For each drift finding, create an observation note in `ops/observations/`:

```markdown
---
description: [specific drift finding]
category: drift
status: pending
observed: {today's date}
related_notes: ["[[methodology note]]", "[[config element]]"]
---
# [drift finding as prose sentence]

**Drift type:** staleness | coverage-gap | assertion-mismatch
**Methodology note:** [[affected note]]
**System element:** [config.yaml field, context file section, or missing coverage]
**Discrepancy:** [what the methodology says vs what the system does]

Resolution: update methodology note | update system config | flag for human review
```

### 0e. Report and Proceed

Output drift status summary:

```
Drift Check:
  Staleness: [N findings — config changed, methodology not updated]
  Coverage gaps: [N features without methodology notes]
  Assertion mismatches: [N contradictions between methodology and system]
  Total drift observations created: [N]
```

If drift observations were created, they join the pool of pending observations for Phase 1 triage. Proceed to Phase 1.

---

## Phase 1: Triage

### 1a. Gather Pending Evidence

```bash
OBS_PENDING=$(grep -rl '^status: pending' ops/observations/ 2>/dev/null)
OBS_COUNT=$(echo "$OBS_PENDING" | grep -c . 2>/dev/null || echo 0)
TENSION_PENDING=$(grep -rl '^status: pending\|^status: open' ops/tensions/ 2>/dev/null)
TENSION_COUNT=$(echo "$TENSION_PENDING" | grep -c . 2>/dev/null || echo 0)
```

Read each pending item fully. These are small atomic notes — load all of them. Understanding the full content is required for accurate triage. If zero pending items, report clean state and exit early.

Also read `ops/methodology/` to understand existing methodology notes — this prevents creating duplicates and informs whether new observations should extend existing methodology rather than create new notes.

### 1b. Classify Each Item

Assign exactly one disposition per observation or tension:

| Disposition | Meaning | When to Apply | Action |
|-------------|---------|---------------|--------|
| PROMOTE | Reusable insight worth keeping as a permanent {DOMAIN:note} | General principle across sessions. Would work as a claim note. Crystallized insight, not operational guidance. | Create {DOMAIN:note} in {vocabulary.notes}/, set observation `status: promoted`, add `promoted_to: [[title]]` |
| IMPLEMENT | Operational guidance that should change the system | "System should do X differently." Points to a concrete improvement in context file, template, or skill. | Update the specific file, set `status: implemented`, add `implemented_in: [filepath]` |
| METHODOLOGY | Friction pattern that should inform agent behavior | Behavioral learning. Not a domain insight (PROMOTE) or a system change (IMPLEMENT) — a methodology learning about HOW to operate. | Create or update methodology note in `ops/methodology/`, set `status: implemented`, add `implemented_in: ops/methodology/[file]` |
| ARCHIVE | Session-specific, no longer relevant | One-session-specific with no lasting value. Already addressed by later work. Superseded by newer evidence. | Set `status: archived` |
| KEEP PENDING | Not enough evidence yet | Might matter but need more data. Part of a pattern that has not fully emerged. Single data point that could go either way. | No change — leave `status: pending` |

**Triage heuristics for observations:**

- Observation describes a general principle that works across sessions → PROMOTE
- Observation says "the system should do X differently" with a specific file/section → IMPLEMENT
- Observation describes agent behavior that should change (how to process, when to check, what to avoid) → METHODOLOGY
- Observation was about one specific session with no lasting value → ARCHIVE
- Observation might matter but only appeared once → KEEP PENDING

**Triage heuristics for tensions:**

- Tension was resolved by subsequent changes → ARCHIVE (set `status: dissolved`, add `dissolved_reason`)
- Tension reveals a genuine conflict between two {DOMAIN:notes} → PROMOTE (create a tension {DOMAIN:note} or resolution {DOMAIN:note})
- Tension points to a system workflow that needs redesigning → IMPLEMENT
- Tension is about agent methodology → METHODOLOGY
- Tension is real but resolution is unclear → KEEP PENDING

### 1c. Present Triage Table

Present the full triage to the user before executing any changes:

```
--=={ {DOMAIN:rethink} — Triage }==--

  Evidence: [N] observations, [M] tensions

  PROMOTE ([count])
    [filename] — [title] → proposed {DOMAIN:note} title
    [filename] — [title] → proposed {DOMAIN:note} title

  IMPLEMENT ([count])
    [filename] — [title] → change [specific file/section]
    [filename] — [title] → change [specific file/section]

  METHODOLOGY ([count])
    [filename] — [title] → create/update ops/methodology/[name].md
    [filename] — [title] → extends existing ops/methodology/[name].md

  ARCHIVE ([count])
    [filename] — [title] — [reason for archiving]

  KEEP PENDING ([count])
    [filename] — [title] — [why more evidence needed]
```

Use AskUserQuestion: "Review the triage above. Approve all, or list items to reclassify (e.g., 'keep obs-003 pending, promote obs-007 instead')."

**Wait for user confirmation before proceeding to 1d.** Do not execute triage without approval.

### 1d. Execute Triage

After user confirmation, apply all dispositions in order:

**For PROMOTE items:**
1. Create {DOMAIN:note} with prose-as-title in {vocabulary.notes}/
2. Follow standard note schema: YAML frontmatter (description, type, created), body developing the insight, Topics footer linking to relevant {vocabulary.topic_map}(s)
3. The observation content becomes the seed for the note body — but develop it fully, do not just copy the observation
4. Update the observation: set `status: promoted`, add `promoted_to: [[note title]]`

**For IMPLEMENT items:**
1. Make the specific change to the identified file/section
2. Show the change to the user (before/after) and get confirmation if the change is non-trivial
3. Update the observation/tension: set `status: implemented`, add `implemented_in: [filepath]`

**For METHODOLOGY items:** (see Phase 2 below)

**For ARCHIVE items:**
1. Update observation status: `status: archived`
2. For tensions being dissolved: `status: dissolved`, add `dissolved_reason: [why]`

**For KEEP PENDING items:**
1. No changes — leave in place

**Update MOCs:** After triage execution, update `ops/observations.md` and `ops/tensions.md` to reflect status changes. Move entries between Pending/Promoted/Archived/Resolved/Dissolved sections as appropriate.

---

## Phase 2: Methodology Folder Updates

For items triaged as METHODOLOGY, create or update notes in `ops/methodology/`.

### Creating New Methodology Notes

```markdown
---
description: [what this methodology note teaches — specific enough to be actionable]
type: methodology
category: [processing | capture | connection | maintenance | voice | behavior | quality]
source: rethink
created: YYYY-MM-DD
status: active
evidence: ["obs-filename-1", "obs-filename-2"]
---

# [prose-as-title describing the learned behavior]

[Body developing the methodology learning:
- What the agent should do
- What the agent should avoid
- Why this matters (what went wrong without this)
- When this applies (scope/context)]

---

Related: [[methodology]]
```

### Extending Existing Methodology Notes

If a methodology note with similar content already exists:
1. Do NOT create a duplicate
2. Instead, add the new evidence to the existing note
3. Update the evidence array in frontmatter
4. Strengthen or nuance the existing guidance based on the new observation
5. Update the observation: set `status: implemented`, add `implemented_in: ops/methodology/[existing-file]`

### Checking for Methodology Duplicates

Before creating a new methodology note:
1. Read all files in `ops/methodology/` (these are small)
2. Check if any existing note covers the same behavioral area
3. If overlap > 80%, extend rather than duplicate

### Update Methodology MOC

After creating or updating methodology notes, update `ops/methodology.md`:
- Add new notes to the appropriate category section
- Update context phrases for modified notes

---

## Phase 3: Pattern Detection

Analyze remaining pending evidence (post-triage) plus promoted/implemented history for systemic patterns. This is where individual data points become actionable signals.

### Evidence Sources

1. **Still-pending observations** — items with `status: pending` after triage
2. **Still-pending tensions** — items with `status: open` or `status: pending` after triage
3. **Recently promoted/implemented items** — may share themes with pending items
4. **Methodology notes** — patterns in `ops/methodology/` by category

### Pattern Types

| Pattern Type | Signal | Threshold | What It Means |
|-------------|--------|-----------|---------------|
| Recurring themes | 3+ observations about the same area or concept | Systemic issue requiring structural response | Something is fundamentally misaligned in that area |
| Contradiction clusters | Multiple tensions pointing at the same architectural assumption | Assumption may be wrong | The system has a flawed foundation in that area |
| Friction accumulation | Multiple observations about the same workflow step | Workflow needs redesign | A specific process is consistently painful |
| Drift signals | Observations suggesting vocabulary, structure, or threshold sensitivity no longer fits | /architect or /reseed territory | The system's configuration may have outgrown the user's actual needs |
| Methodology convergence | Multiple /remember captures in ops/methodology/ pointing at the same behavioral pattern | Methodology note needs elevation to context file | A methodology learning has been validated enough to become a system-level rule |

### Detection Method

1. **Group by category field:** Sort observations by their `category` (methodology, process-gap, friction, surprise, quality). 3+ items in the same category = potential pattern.

2. **Group by referenced {DOMAIN:topic maps} or system areas:** Extract wiki links and file references from observation bodies. 3+ observations referencing the same area = recurring theme.

3. **Cross-reference tensions:** Check if multiple tensions share the same assumption. Multiple tensions pointing at the same thing = assumption may be wrong.

4. **Check friction frequency for acceleration:** Are friction observations about the same step appearing more frequently? An accelerating pattern is a stronger signal than steady-state friction.

5. **Compare methodology notes against context file:** If `ops/methodology/` has 3+ notes in the same category that are not reflected in the context file, the methodology has converged enough for elevation.

6. **Check for vocabulary drift:** If observations use different terms than the derivation manifest or context file, the system's language may have drifted from the user's actual vocabulary.

### Pattern Quality Check

**Do not fabricate patterns from insufficient evidence.** A single observation is a data point, not a pattern. Two observations are a coincidence. Three observations are a pattern worth investigating.

For each candidate pattern, assess:
- **Evidence count:** How many observations/tensions support this?
- **Time span:** Over how many sessions did these accumulate?
- **Specificity:** Can you point to a specific system area or assumption?
- **Impact:** What breaks or degrades because of this?

Only report patterns that pass all four checks.

### Pattern Report

```
--=={ {DOMAIN:rethink} — Patterns }==--

  Patterns detected: [N]

  1. [Pattern type]: [description]
     Evidence: [filenames, one per line]
     Area: [system area affected]
     Impact: [what breaks or degrades]
     Confidence: [high | medium — never low, since low means not enough evidence]

  2. [Pattern type]: [description]
     ...

  No patterns found in: [areas with < 3 data points]
```

If no patterns are detected, report this clearly. Pattern detection requires sufficient evidence — an empty result after triage is a sign the system is healthy, not that rethink failed.

---

## Phase 4: Proposal Generation

For each detected pattern, generate one specific, actionable proposal.

### Proposal Structure

```
  Proposal [N]: [title — what would change]

  Evidence:
    - [filename] — [one-line summary of this observation's contribution]
    - [filename] — [one-line summary]
    - [filename] — [one-line summary]

  Pattern: [which pattern type from Phase 3]

  Current assumption:
    [Quote the specific section of context file, skill, or template
     that embodies the assumption being challenged.
     Include the file path and section heading.]

  Proposed change:
    [Specific file and section. What changes, what stays.
     Before/after if possible. Concrete enough that someone
     could implement this without additional context.]

  What would improve:
    [Concrete expected benefit — not "things would be better"
     but "reduces processing time for inbox items because..."
     or "prevents the duplicate creation issue observed in obs-003, obs-007"]

  What could go wrong:
    [Risk assessment — what might break? What second-order effects?
     What assumptions does this proposal itself make?]

  Reversible: [yes | no | partially — explain if partially]

  Scope: [context-file | skill | template | architecture | methodology]
```

### Proposal Quality Gates

Every proposal MUST have:

1. **Specific file references** — not "update the context file" but "update ops/context.md, section 'Processing Pipeline', paragraph 3"
2. **Evidence backing** — at least 2 observations/tensions supporting the change. No intuition-only proposals.
3. **Risk awareness** — what could go wrong. Proposals without risk assessment are overconfident.
4. **Proportionality** — the scope of the proposed change should match the weight of evidence. A single observation does not justify rewriting the context file.
5. **Reversibility assessment** — can this be undone if it makes things worse?

### Proposal Scope Rules

| Evidence Strength | Maximum Proposal Scope |
|-------------------|----------------------|
| 2 observations, same area | Methodology note update |
| 3+ observations, clear pattern | Skill or template change |
| 5+ observations + tensions | Context file section change |
| Pervasive pattern across areas | Architectural change (recommend /architect consultation) |

Do not propose architectural changes based on thin evidence. The threshold scales with the blast radius.

### /next Integration

If 10+ pending observations or 5+ pending tensions remain after triage AND pattern detection did not consume them into proposals:

```
  Threshold signal for /next:
    [N] pending observations, [N] pending tensions remain
    /next should prioritize {DOMAIN:rethink} at session priority
```

---

## Phase 5: Present for Approval

**NEVER auto-implement proposals.** Changes to system assumptions require human judgment. This is the invariant that makes rethink safe — it can analyze aggressively because it cannot act unilaterally.

### Summary Output

```
--=={ {DOMAIN:rethink} — Complete }==--

  Triaged: [N] observations, [M] tensions

    Promoted to {DOMAIN:notes}:  [count]
    Methodology updates:         [count]
    Implemented:                 [count]
    Archived:                    [count]
    Kept pending:                [count]

  Patterns detected: [count]

    1. [Pattern type]: [brief description]
       Evidence: [count] items
       Proposal: [one-line summary]

    2. [Pattern type]: [brief description]
       Evidence: [count] items
       Proposal: [one-line summary]

  Awaiting approval for [count] proposals.
```

### User Approval Interaction

Use AskUserQuestion: "Which proposals should I implement? (all / none / list numbers, e.g. '1, 3'). You can also ask me to modify a proposal before deciding."

**Handle each response:**

| Response | Action |
|----------|--------|
| "all" | Implement all proposals |
| "none" | Skip all. Optionally ask why to capture reasoning as a new observation. |
| "1, 3" | Implement listed proposals only |
| "modify 2" | Ask what should change, revise proposal, re-present for approval |
| Question about a proposal | Answer, then re-ask for approval |

### On Approval: Implementation

For each approved proposal:

1. **Draft the actual changes** — write the literal new content, not descriptions of what to change
2. **Show before/after** for non-trivial changes
3. **Apply the changes** to the target files
4. **Log to ops/changelog.md** (create if missing):

```markdown
## YYYY-MM-DD: [change title]

**Source:** /{DOMAIN:rethink} — [pattern type]
**Evidence:** [observation/tension filenames]
**Change:** [what was modified, which files]
**Risk:** [risk assessment from proposal]
```

5. **Update feeding observations/tensions:** Add `resolved_by: [changelog reference]` to each observation/tension that contributed to the approved proposal.

### On Rejection

- Do not re-propose the same change without new evidence
- Optionally ask why the proposal was rejected — capture the reasoning as a new observation if the user's rationale reveals something about the system's design philosophy
- Mark the proposal as "considered and deferred" — do not keep re-surfacing it

---

## Post-Rethink Actions

### Promoted Notes Need Connections

If any observations were promoted to {DOMAIN:notes}:

```
  [count] {DOMAIN:notes} were promoted from observations.
  Run /{DOMAIN:connect} on promoted notes to find connections.
  Promoted: [list of note titles]
```

### Pipeline Queue Integration

If promoted items should enter the processing pipeline (queue-based systems):
- Add each promoted {DOMAIN:note} to the queue with `current_phase: "reflect"` (the note already exists, so skip create)
- Report queue additions

### Session Log

After rethink completes, capture the session itself. Create or append to `ops/rethink-log.md`:

```markdown
## YYYY-MM-DD HH:MM

**Evidence reviewed:** [N] observations, [M] tensions
**Triage:** [count] promoted, [count] methodology, [count] implemented, [count] archived, [count] pending
**Patterns:** [count] detected
**Proposals:** [count] generated, [count] approved, [count] rejected, [count] deferred
**Changes applied:** [list of files modified]
```

This creates an evolution history. When /architect or /reseed runs, it can review the rethink log to understand how the system has evolved and what patterns have driven changes.

---

## Edge Cases

### No ops/observations/ or ops/tensions/

These directories are part of the operational learning loop kernel primitive. If they do not exist:
1. Report the structural gap
2. Recommend creating them: "The operational learning loop requires `ops/observations/` and `ops/tensions/`. Create these directories and their MOC files to begin capturing system friction."
3. Do not attempt to run rethink without evidence sources

### Nothing Pending

Report clean state:
```
--=={ {DOMAIN:rethink} — Clean State }==--

  No pending observations or tensions.
  The system has no accumulated friction to process.

  Continue capturing observations during normal work.
  Run /{DOMAIN:rethink} again when signals accumulate.
```

### Evidence Suggests /reseed

If 3+ drift signals are detected (vocabulary mismatch, structural misalignment, threshold disconnect between what the system expects and what the user actually does):
- Report the drift pattern
- Recommend /reseed over patching: "Drift signals suggest the system's fundamental configuration may need re-derivation, not incremental patching. Consider running /architect for a configuration review."
- Do not attempt to patch drift signals — they indicate the system's premises need re-evaluation, not its implementation

### < 5 Total Items

Run triage normally but note that pattern detection requires more data:
```
  Note: [N] items is below the threshold for reliable pattern detection.
  Triage completed. Pattern analysis will be more reliable after more
  observations accumulate. This is expected early in the system lifecycle.
```

### Single Item Triage

When target is a specific filename:
1. Read only that item
2. Present single-item triage recommendation
3. Execute on approval
4. Skip pattern detection (single items do not make patterns)

### Conflicting Proposals

If two proposals would contradict each other (e.g., one suggests adding complexity, another suggests simplifying the same area):
1. Present both with explicit conflict flagging
2. Ask the user to choose one or synthesize
3. Do not implement both — conflicting changes compound confusion

### Large Evidence Backlog (20+ items)

If the evidence pool is very large:
1. Triage in batches of 10
2. Present each batch for approval before continuing
3. This prevents overwhelming the user with a 30-item triage table
4. Run pattern detection after all batches are triaged

---

## Critical Constraints

**Never:**
- Auto-implement system changes — proposals require human approval, always
- Dismiss evidence because it is inconvenient
- Preserve assumptions out of tradition — evidence beats habit
- Add complexity to handle edge cases when simplification would work better
- Create {DOMAIN:notes} directly from observations without going through standard pipeline (PROMOTE adds to queue)
- Re-propose rejected changes without new evidence

**Always:**
- Trace proposals to specific evidence with file references
- Acknowledge uncertainty — "I think" vs "it is" based on evidence strength
- Propose tests for new approaches — how will you know if the change worked?
- Respect that the human makes final decisions on system changes
- Log changes to ops/changelog.md for evolution tracking
- Update MOCs after triage changes status of observations/tensions

## The Meta-Layer

Rethink is the system's immune system. It detects when assumptions have become infections — beliefs that made sense once but now cause harm. Healthy systems challenge themselves. Unhealthy systems calcify around untested assumptions.

The methodology learning loop closes here:
```
Work happens → friction captured as observations/tensions
  → /remember captures immediate corrections
  → observations accumulate
  → /rethink triages + detects patterns + proposes changes
  → human approves changes
  → system evolves
  → less friction → fewer observations → healthy system
```

Run {DOMAIN:rethink}. Let evidence win.
