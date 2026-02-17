---
name: remember
description: Capture friction as methodology notes. Three modes — explicit description, contextual (review recent corrections), session mining (scan transcripts for patterns). Triggers on "/remember", "/remember [description]".
version: "1.0"
generated_from: "arscontexta-v1.6"
user-invocable: true
context: fork
model: sonnet
allowed-tools: Read, Write, Edit, Grep, Glob, Bash
---

## Runtime Configuration (Step 0 — before any processing)

Read these files to configure domain-specific behavior:

1. **`ops/derivation-manifest.md`** — vocabulary mapping, domain context
   - Use `vocabulary.notes` for the notes folder name
   - Use `vocabulary.note` for the note type name in output
   - Use `vocabulary.rethink` for rethink command name in threshold alerts
   - Use `vocabulary.topic_map` for MOC references

2. **`ops/config.yaml`** — thresholds
   - `self_evolution.observation_threshold` (default: 10) — for threshold alerts
   - `self_evolution.tension_threshold` (default: 5) — for threshold alerts

3. **`ops/methodology/`** — read existing methodology notes before creating new ones (prevents duplicates)

If these files don't exist (pre-init invocation or standalone use), use universal defaults.

## EXECUTE NOW

**Target: $ARGUMENTS**

Parse immediately:
- If target contains a quoted description or unquoted text: **explicit mode** — user describes friction directly
- If target is empty: **contextual mode** — review recent conversation for corrections
- If target contains `--mine-sessions` or `--mine`: **session mining mode** — scan ops/sessions/ for patterns

**START NOW.** Reference below defines the three modes.

---

## Explicit Mode

User provides a description: `/remember "don't process personal notes like research"` or `/remember always check for duplicates before creating`

### Step 1: Parse the Friction

Analyze the user's description to extract:
- **What the agent did wrong** (or what the user wants to prevent)
- **What the user wants instead** (the correct behavior)
- **The scope** — when does this apply? Always? Only for specific content types? Only in certain phases?
- **The category** — which area of agent behavior does this affect?

| Category | Applies When |
|----------|-------------|
| processing | How to extract, reduce, or handle content |
| capture | How to record, file, or organize incoming material |
| connection | How to find, evaluate, or add links between notes |
| maintenance | How to handle health checks, reweaving, cleanup |
| voice | How to write, what tone or style to use |
| behavior | General agent conduct, interaction patterns |
| quality | Standards for notes, descriptions, titles |

### Step 2: Check for Existing Methodology Notes

Before creating a new note, read all files in `ops/methodology/`:

```bash
ls -1 ops/methodology/*.md 2>/dev/null
```

For each existing note, check if it covers the same behavioral area. Specifically:
- Does an existing note address the same friction?
- Would the new learning extend an existing note rather than warrant a new one?

| Check Result | Action |
|-------------|--------|
| No existing notes in this area | Create new methodology note |
| Existing note covers different aspect of same area | Create new note, link to existing |
| Existing note covers same friction | Extend existing note with new evidence instead of creating duplicate |
| Existing note contradicts new friction | Create both a new methodology note AND an observation about the contradiction |

### Step 3: Create Methodology Note

Write to `ops/methodology/`:

**Rule Zero:** This methodology note becomes part of the system's canonical specification. ops/methodology/ is not a log of what happened — it is the authoritative declaration of how the system should behave. Write this note as a directive: what the agent SHOULD do, not what went wrong. Future sessions, /rethink drift checks, and meta-skills will consult this note as ground truth for system behavior.

**Filename:** Convert the prose title to kebab-case. Example: "don't process personal notes like research" becomes `dont-process-personal-notes-like-research.md`.

```markdown
---
description: [what this methodology note teaches — specific enough to be actionable]
type: methodology
category: [processing | capture | connection | maintenance | voice | behavior | quality]
source: explicit
created: YYYY-MM-DD
status: active
---

# [prose-as-title describing the learned behavior]

## What to Do

[Clear, specific guidance. Not "be careful" but "when encountering X, do Y instead of Z."]

## What to Avoid

[The specific anti-pattern this note prevents. What was the agent doing wrong?]

## Why This Matters

[What goes wrong without this guidance. Connect to the user's actual friction — what broke, what was confusing, what wasted time.]

## Scope

[When does this apply? Always? Only for certain content types? Only during specific phases? Be explicit about boundaries.]

---

Related: [[methodology]]
```

**Writing quality for methodology notes:**
- Be specific enough that a fresh agent session could follow this guidance without additional context
- Use concrete examples where possible — "when processing therapy notes" not "when processing certain types of content"
- State both the DO and the DON'T — methodology notes that only say what to do miss the anti-pattern that triggered them
- Keep scope explicit — unbounded methodology notes get applied where they should not be

### Step 4: Update Methodology MOC

Edit `ops/methodology.md` (create if missing):

1. Find the section for the note's category
2. Add the note with a context phrase: `- [[note title]] — [what this teaches]`
3. If no section exists for this category, create one

```markdown
## [Category]

- [[existing note]] — what it teaches
- [[new note]] — what this teaches
```

### Step 5: Check Pattern Threshold

Count methodology notes in the same category:

```bash
grep -rl "^category: [CATEGORY]" ops/methodology/ 2>/dev/null | wc -l | tr -d ' '
```

If 3+ notes exist in the same category, this is a signal for /{DOMAIN:rethink}:

```
This is friction capture #[N] in the "[category]" area.
3+ captures in the same area suggest a systemic pattern.
Consider running /{DOMAIN:rethink} to review [category] methodology patterns
and potentially elevate them to context file changes.
```

### Step 6: Output

```
--=={ remember }==--

  Captured: [brief description of the learning]
  Filed to: ops/methodology/[filename].md
  Updated: ops/methodology.md MOC
  Category: [category]

  [If pattern threshold reached:]
  This is friction capture #[N] in the "[category]" area.
  Consider running /{DOMAIN:rethink} to review [category] methodology patterns.
```

---

## Contextual Mode

No argument provided: `/remember`

The agent reviews the current conversation to find corrections the user made that should become methodology notes.

### Step 1: Review Recent Context

Scan the current conversation for correction signals. Look for:

| Signal Type | Detection Patterns | Example |
|------------|-------------------|---------|
| Direct correction | "no", "that's wrong", "not like that", "incorrect" | "No, don't split that into separate notes" |
| Redirection | "actually", "instead", "let's do X not Y", "stop" | "Actually, keep the original phrasing" |
| Preference statement | "I prefer", "always do X", "never do Y", "from now on" | "Always check for duplicates first" |
| Frustration signal | "again?", "I already said", "why did you", "that's the third time" | "Why did you create a duplicate again?" |
| Quality correction | "too vague", "not specific enough", "that's not what I meant" | "That description is too vague — add the mechanism" |

### Step 2: Identify the Most Recent Correction

From the detected corrections, identify the most recent one. Present it to the user for confirmation:

```
--=={ remember — contextual }==--

  Detected correction:
    "[quoted user text]"

  Interpreted as:
    [What the agent should learn from this — specific behavioral change]

  Category: [category]

  Capture this as a methodology note? (yes / no / modify)
```

**Wait for user confirmation.** Do not create notes from inferred corrections without approval — the agent might misinterpret what the user meant.

### Step 3: Handle Response

| Response | Action |
|----------|--------|
| "yes" | Create methodology note (same process as explicit mode, `source: contextual`) |
| "no" | Do not create. Optionally ask what the user actually meant. |
| "modify" or different description | Use the modified description instead |
| User provides additional context | Incorporate into the methodology note |

### Step 4: If Multiple Corrections Detected

If the conversation contains more than one correction:

```
  Detected [N] corrections in this conversation:

  1. "[quoted text]" → [interpretation]
  2. "[quoted text]" → [interpretation]
  3. "[quoted text]" → [interpretation]

  Capture all as methodology notes? (all / select numbers / none)
```

### Step 5: If No Corrections Found

```
--=={ remember — contextual }==--

  No recent corrections detected in this conversation.

  Options:
  - /remember "description" — capture specific friction with explicit text
  - /remember --mine-sessions — scan session transcripts for uncaptured patterns
```

---

## Session Mining Mode

Flag provided: `/remember --mine-sessions` or `/remember --mine`

This mode scans stored session transcripts for friction patterns the user addressed during work but did not explicitly `/remember`.

### Step 1: Find Unmined Sessions

```bash
# Find session files without mined: true marker
UNMINED=$(grep -rL '^mined: true' ops/sessions/*.md 2>/dev/null)
UNMINED_COUNT=$(echo "$UNMINED" | grep -c . 2>/dev/null || echo 0)
```

If no unmined sessions found:
```
--=={ remember — mine }==--

  No unprocessed sessions found in ops/sessions/.
  All sessions have been mined for friction patterns.
```

### Step 2: Mine Each Session

For each unmined session, read the full content and search for:

| Pattern | What to Look For | Significance |
|---------|-----------------|-------------|
| User corrections | "no", "that's wrong", "not like that" followed by correct approach | Direct methodology learning |
| Repeated redirections | Same type of correction appearing multiple times | Strong behavioral signal |
| Workflow breakdowns | Steps that failed, had to be retried, or produced wrong output | Process gap |
| Agent confusion | Questions the agent asked that it should have known the answer to | Missing context or methodology |
| Undocumented decisions | User made a choice without explaining reasoning — but the choice reveals a preference | Implicit methodology |
| Escalation patterns | User moving from gentle correction to firm direction | Methodology note urgency signal |

### Step 3: Classify Findings

For each detected pattern, classify into one of two output types:

| Finding Type | Output | When |
|-------------|--------|------|
| Actionable methodology learning | Methodology note in `ops/methodology/` | Clear behavioral change needed. Agent can act on this. |
| Novel observation requiring more context | Observation note in `ops/observations/` | Pattern detected but not yet clear enough for methodology guidance. Needs accumulation. |

### Step 4: Deduplicate Against Existing Notes

Before creating any notes:

1. Read all existing methodology notes in `ops/methodology/`
2. Read all existing observations in `ops/observations/`
3. For each finding:
   - If an existing methodology note covers this → skip or add as evidence to existing
   - If an existing observation covers this → skip or add as evidence to existing
   - If novel → create new note

### Step 5: Create Notes

**For methodology findings:** Follow the same creation process as explicit mode (Step 3 in Explicit Mode section), with `source: session-mining` and add `session_source: [session filename]`.

**For observation findings:**

```markdown
---
description: [what was observed and what it suggests]
category: [friction | surprise | process-gap | methodology]
status: pending
observed: YYYY-MM-DD
source: session-mining
session_source: [session filename]
---

# [the observation as a sentence]

[What happened, which session, why it matters, and what pattern it might be part of.]

---

Related: [[observations]]
```

### Step 6: Mark Sessions as Mined

After processing each session, add `mined: true` to its frontmatter:

```bash
# Add mined marker to session file frontmatter
```

Use Edit tool to add `mined: true` after the existing frontmatter fields. Do not modify other frontmatter content.

### Step 7: Report

```
--=={ remember — mine }==--

  Sessions scanned: [N]

  Methodology notes created: [count]
    - [filename] — [brief description]

  Observations created: [count]
    - [filename] — [brief description]

  Duplicates skipped: [count]
    - [existing note] — already covers [pattern]

  Sessions marked as mined: [list]

  [If pattern thresholds reached:]
  Category "[category]" now has [N] methodology notes.
  Consider running /{DOMAIN:rethink} to review [category] patterns.
```

---

## The Methodology Learning Loop

This is the complete cycle that /remember participates in:

```
Work happens
  → user corrects agent behavior (explicit or implicit)
  → /remember captures correction as methodology note
  → methodology note filed to ops/methodology/
  → agent reads methodology notes at session start (via context file reference)
  → agent behavior improves
  → fewer corrections needed
  → when methodology notes accumulate (3+ in same category)
  → /rethink triages and detects patterns
  → patterns elevated to context file changes
  → system methodology evolves at the architectural level
  → the cycle continues with new friction at the edges
```

Each layer of this loop serves a different purpose:
- **/remember** captures individual friction points — fast, low ceremony
- **ops/methodology/** stores accumulated behavioral guidance — persists across sessions
- **/rethink** detects patterns and proposes structural changes — periodic, deliberate
- **ops/context.md** (or equivalent) embodies the system's stable methodology — changes rarely, by human approval

The loop is healthy when methodology notes accumulate slowly (friction is being addressed) and /rethink elevates patterns to context-level changes when thresholds are exceeded.

The loop is unhealthy when the same category keeps getting methodology notes without elevation (the system is capturing friction but not learning from it).

### Rule Zero: Methodology as Canonical Specification

The methodology folder is more than a friction capture log. It is the system's authoritative self-model — the canonical specification from which drift is measured.

**What this means for /remember:**
- Every methodology note you create becomes part of the spec. Write directives, not incident reports.
- The title should be an actionable behavior ("check for semantic duplicates before creating any note") not a problem description ("duplicate creation issue").
- Future /rethink sessions will compare system behavior against what methodology notes declare. Vague notes create unmeasurable specs.

**What this means for the system:**
- ops/methodology/ is consulted by meta-skills (/ask, /architect, /rethink) as the source of truth for how the system works.
- Drift detection compares methodology note assertions against actual config.yaml and context file state.
- When methodology notes are stale (older than config changes), the system surfaces this as a maintenance condition.

The methodology folder is the spec. /remember writes the spec. /rethink enforces the spec. The loop is closed.

---

## Methodology Note Design

### Title Pattern

Methodology note titles should describe what the agent should DO, not what went wrong:

| Bad (describes problem) | Good (describes behavior) |
|------------------------|--------------------------|
| "duplicate creation issue" | "check for semantic duplicates before creating any note" |
| "wrong tone problem" | "match the user's formality level in all output" |
| "processing too aggressive" | "differentiate personal notes from research in processing depth" |

The title is what the agent reads at session start. It should be immediately actionable as a behavioral directive.

### Body Quality

Methodology notes are operational guidance, not essays. They should be:

1. **Specific enough for a fresh agent session** — no assumed context from the session that created them
2. **Scoped explicitly** — when does this apply and when does it not?
3. **Dual-sided** — both what to do AND what to avoid
4. **Evidence-grounded** — reference the specific friction that triggered this learning

### Category Selection

Choose the most specific applicable category:

| Category | Use When |
|----------|---------|
| processing | Friction during /reduce, extraction, claim creation |
| capture | Friction during inbox filing, raw material handling |
| connection | Friction during /reflect, link evaluation, MOC updates |
| maintenance | Friction during /reweave, health checks, cleanup |
| voice | Friction about writing style, tone, output formatting |
| behavior | Friction about general agent conduct, interaction patterns, tool usage |
| quality | Friction about note quality, description writing, title crafting |

If a friction point spans categories (e.g., "processing voice" or "capture quality"), choose the primary category and mention the secondary in the body.

---

## Edge Cases

### No ops/methodology/ Directory

Create it and the `ops/methodology.md` MOC:

```markdown
---
description: Methodology notes capturing how this system has learned to operate
type: moc
---

# methodology

Methodology notes organized by category. Each note captures a specific behavioral learning.

## Processing

## Capture

## Connection

## Maintenance

## Voice

## Behavior

## Quality
```

### Duplicate Friction

If a methodology note with very similar content already exists:
1. Do NOT create a duplicate
2. Link to the existing note
3. Add the new instance as evidence: update the existing note's body with the new context
4. Report: "Extended existing methodology note [[title]] with additional evidence"

### Contradicting Existing Methodology

If the new friction CONTRADICTS an existing methodology note (user now wants the opposite of what was previously captured):
1. Create an observation in `ops/observations/` documenting the contradiction
2. Update the existing methodology note's status to `superseded` and add `superseded_by: [new note]`
3. Create the new methodology note with the updated guidance
4. Report the contradiction and suggest /rethink if this is part of a broader pattern

### No Sessions to Mine

Report clearly: "No unprocessed sessions found in ops/sessions/." Do not treat this as an error.

### Very Long Sessions

For sessions longer than 2000 lines:
1. Process in chunks of ~500 lines
2. Track findings across chunks to detect patterns that span the session
3. Report chunk-level progress for transparency

### Implicit vs Explicit Corrections

Some corrections are implicit — the user does it themselves rather than telling the agent to change:
- User manually edits a note the agent created (the edit reveals what was wrong)
- User chooses a different approach without explaining why
- User skips a step the agent suggested

In contextual mode, flag these as lower-confidence findings and always confirm before creating methodology notes from implicit signals.

### Empty Conversation Context

In contextual mode with no conversation history (e.g., first message of a session):

```
--=={ remember — contextual }==--

  No conversation context available to analyze.
  Use /remember "description" to capture specific friction directly.
```
