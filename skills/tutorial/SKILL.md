---
name: tutorial
description: Interactive walkthrough for new users. Learn by doing — each step creates real content in your vault. Three tracks (researcher, manager, personal) with a universal learning arc. Triggers on "/tutorial", "walk me through", "how do I use this".
user-invocable: true
allowed-tools: Read, Write, Edit, Grep, Glob, AskUserQuestion, Bash
context: fork
model: opus
version: "1.0"
generated_from: "arscontexta-v1.6"
---

## Runtime Configuration (Step 0 — before any processing)

Read these files to configure domain-specific behavior:

1. **`ops/derivation-manifest.md`** — vocabulary mapping, platform hints
   - Use `vocabulary.notes` for the notes folder name
   - Use `vocabulary.note` / `vocabulary.note_plural` for note type references
   - Use `vocabulary.reduce` for the extraction verb
   - Use `vocabulary.reflect` for the connection-finding verb
   - Use `vocabulary.topic_map` for MOC references
   - Use `vocabulary.inbox` for the inbox folder name

2. **`ops/config.yaml`** — processing depth, domain context

If these files don't exist, use universal defaults.

## EXECUTE NOW

**Target: $ARGUMENTS**

- If `ops/tutorial-state.yaml` exists and `current_step` <= 5: resume from saved step
- If target is "reset": delete `ops/tutorial-state.yaml` and start fresh
- If no state file exists: begin new tutorial with track selection

**START NOW.** Reference below defines the flow.

---

## Resume Detection

Read `ops/tutorial-state.yaml`. If it exists and tutorial is incomplete, display:
```
--=={ ars contexta : tutorial }==--

  Welcome back.
  Track: [track]     [step-progress] Step [N] of 5
  Resuming where you left off...
```

Skip to the saved `current_step`. Do NOT re-ask for track. If `current_step` > 5, tutorial is complete — offer to reset.

**Progress indicator format:**
- Step 1 of 5: `[=>    ]`
- Step 2 of 5: `[==>   ]`
- Step 3 of 5: `[===>  ]`
- Step 4 of 5: `[====> ]`
- Step 5 of 5: `[=====>]`

## Track Selection (new tutorial only)

Display header, then use AskUserQuestion:

```
--=={ ars contexta : tutorial }==--

Which track fits your work best?

  (a) Researcher -- academic papers, domain
      research, literature processing

  (b) Manager -- meeting notes, strategy docs,
      decision tracking

  (c) Personal -- daily observations, goal
      setting, reflective journaling
```

Wait for response. Map a/b/c to researcher/manager/personal.

Write initial state to `ops/tutorial-state.yaml`:
```yaml
track: [researcher|manager|personal]
current_step: 1
completed_steps: []
started: [ISO 8601 UTC]
last_activity: [ISO 8601 UTC]
```

---

## Step Execution Pattern

Every step follows WHY / DO / SEE. Before each step show progress bar. After each step, update `ops/tutorial-state.yaml` (append to `completed_steps`, increment `current_step`, update `last_activity`).

### Track Adaptation Reference

Each step adapts its language and examples to the track. The structure is identical; the content varies.

| Step | Researcher | Manager | Personal |
|------|-----------|---------|----------|
| Capture | Claim from a paper | Decision from a meeting | Realization from a day |
| Discover | Cross-paper connections | Decision-stakeholder links | Observation-goal patterns |
| Process | Paper extraction | Meeting note mining | Journal crystallization |
| Maintain | Stale claims, broken citations | Orphaned decisions | Disconnected reflections |
| Reflect | Research graph growth | Institutional memory | Self-knowledge patterns |

---

### Step 1: Capture — Create your first {vocabulary.note}

**WHY:**

```
--=={ ars contexta : tutorial }==--
  [=>    ] Step 1 of 5 -- Capture

  Everything starts with a thought worth keeping.
```

Adapt the philosophy to the track:

| Track | WHY Framing |
|-------|-------------|
| researcher | "Research begins when you notice something worth remembering. A claim from a paper, a pattern across studies, a question that has not been asked. The system captures these as prose-sentence titles — each title is a proposition that reads naturally when linked to other notes." |
| manager | "Good decisions start with captured observations. A pattern from a meeting, a stakeholder concern, a strategic insight. The system turns these into connected notes where each title is a complete thought — not a label like 'Q3 planning' but a claim like 'Q3 velocity depends on reducing context switching'." |
| personal | "Growth starts with noticing. A realization during a walk, a pattern in your week, a question about what matters. The system captures these as prose-sentence notes — each title is something you genuinely believe, like 'morning routines work because they reduce decision fatigue'." |

**DO:**

Use AskUserQuestion with track-adapted prompt:

| Track | Prompt |
|-------|--------|
| researcher | "Share a claim, observation, or question from your research. One sentence — something you genuinely want to remember and build on." |
| manager | "Share a decision, pattern, or insight from your work. One sentence — something worth tracking across meetings and projects." |
| personal | "Share a thought, observation, or realization. One sentence — something you genuinely want to remember." |

Transform input into a real {vocabulary.note}:
1. Convert input to prose-as-title filename (lowercase, safe characters, full sentence)
2. Create YAML frontmatter:
   ```yaml
   ---
   description: [adds context beyond the title — scope, mechanism, or implication]
   topics: ["[[index]]"]
   created: [today's date]
   ---
   ```
3. Write 2-3 sentences developing the thought
4. Add Topics footer linking to the hub {vocabulary.topic_map}
5. Write the file to `{vocabulary.notes}/`

**SEE:**

```
  Note created:
    {vocabulary.notes}/[filename].md

  Title: [the prose title]
  Description: [the description]
  Topics: [[index]]

  Notice how the title works as prose:
    "Since [[your note title]], the question
     becomes..."

  That is what makes notes linkable. The title
  IS the thought, expressed as a sentence.
```

Update state, then continue to Step 2.

---

### Step 2: Discover — Find connections

**WHY:**

```
--=={ ars contexta : tutorial }==--
  [==>   ] Step 2 of 5 -- Discover

  A note alone is a file. Notes that connect
  become a knowledge graph.
```

Adapt to track:

| Track | WHY Framing |
|-------|-------------|
| researcher | "Research compounds when claims connect. A finding about methodology might extend a finding about tools. A pattern in one study might contradict a pattern in another. These connections are where insight lives — not in individual papers but in the relationships between ideas." |
| manager | "Organizational knowledge compounds when decisions connect. A hiring decision relates to a capacity concern. A strategy shift affects multiple projects. The connections reveal the system behind individual choices." |
| personal | "Self-knowledge compounds when observations connect. A morning routine insight might connect to an energy pattern. A relationship observation might extend a communication realization. The connections reveal what you actually believe." |

**DO:**

Use AskUserQuestion with track-adapted prompt:

| Track | Prompt |
|-------|--------|
| researcher | "Share a second research insight — ideally one that connects to your first note, but any genuine claim works." |
| manager | "Share another work observation — ideally one that relates to the first, but any genuine insight works." |
| personal | "Share another thought — ideally one that connects to the first, but any genuine observation works." |

Create a second {vocabulary.note}. Then search for connections to the first {vocabulary.note}:
1. Read both {vocabulary.note_plural}
2. Apply the articulation test: can you complete "[[note A]] connects to [[note B]] because [specific reason]"?
3. If genuine connection exists:
   - Add inline wiki link in one or both {vocabulary.note_plural}
   - Add relevant_notes entry with context phrase
4. If no genuine connection exists:
   - Explain that forced connections are worse than none
   - "These notes do not connect yet, and that is fine. The graph grows over time."

**SEE:**

If connected:
```
  Note created and connected:
    {vocabulary.notes}/[filename].md

  Connection:
    [[note A]] connects to [[note B]]
    because [your articulated reason]

  This is what /reflect does at scale --
  finding genuine connections across your
  entire graph.
```

If not connected:
```
  Note created:
    {vocabulary.notes}/[filename].md

  No genuine connection to your first note.
  That is fine -- forced connections pollute
  the graph. Real connections emerge as your
  graph grows.
```

Update state, then continue to Step 3.

---

### Step 3: Process — Extract structured knowledge

**WHY:**

```
--=={ ars contexta : tutorial }==--
  [===>  ] Step 3 of 5 -- Process

  Raw material becomes structured knowledge
  through extraction. You mine for atomic
  insights, not summaries.
```

Adapt to track:

| Track | WHY Framing |
|-------|-------------|
| researcher | "A paper contains dozens of claims, but only some matter for your research. Extraction means identifying the propositions worth keeping — the specific claims, the methodological choices, the surprising findings — and turning each into its own note. This is /{reduce} in action." |
| manager | "Meeting notes and strategy docs contain buried insights. Extraction means finding the decisions, the assumptions, the risk factors — and giving each its own note that can be tracked and connected. This is /{reduce} in action." |
| personal | "Journal entries and daily notes contain unprocessed observations. Extraction means finding the insights, the patterns, the genuine realizations — and crystallizing each into a note that compounds with everything else. This is /{reduce} in action." |

**DO:**

Use AskUserQuestion with track-adapted prompt:

| Track | Prompt |
|-------|--------|
| researcher | "Paste a short paragraph of raw material — notes from a paper, an article snippet, or research observations. Two to five sentences is enough." |
| manager | "Paste a short paragraph of raw material — meeting notes, a strategy snippet, or project observations. Two to five sentences is enough." |
| personal | "Paste a short paragraph of raw material — journal entry, conversation notes, or daily observations. Two to five sentences is enough." |

Extract 1-2 atomic insights:
1. Identify propositions worth keeping (not summaries, not logistics)
2. Apply selectivity: skip purely conversational content, temporary logistics, vague observations
3. Check for connections to existing tutorial {vocabulary.note_plural}
4. Create {vocabulary.note}(s) with proper schema
5. Link where genuine connections exist

**SEE:**

```
  Extracted [N] insight(s) from your material:

  1. [title of extracted note]
     [connection status: linked to [[note]] | standalone]

  Raw material -> atomic {vocabulary.note_plural} -> connected graph.
  This is what /{reduce} does. It finds the
  propositions worth keeping and turns each into
  a composable {vocabulary.note}.
```

If nothing worth extracting:
```
  No atomic insights found in this material.
  That happens — not everything contains
  extractable propositions. The selectivity
  gate is working: better to skip than to
  create low-value {vocabulary.note_plural}.
```

Update state, then continue to Step 4.

---

### Step 4: Maintain — Check vault health

**WHY:**

```
--=={ ars contexta : tutorial }==--
  [====> ] Step 4 of 5 -- Maintain

  A knowledge system that is not maintained
  decays. Health checks catch problems before
  they compound.
```

Adapt to track:

| Track | WHY Framing |
|-------|-------------|
| researcher | "Research graphs decay when citations break, claims go stale, and notes lose their connections. Health checks catch orphaned claims, missing descriptions, and broken links before they undermine your research integrity." |
| manager | "Organizational knowledge decays when decisions are orphaned, links break, and notes lose context. Health checks catch these before they undermine institutional memory." |
| personal | "Personal knowledge decays when reflections are disconnected, descriptions are vague, and patterns are missed. Health checks catch these before insights are lost." |

**DO:**

No AskUserQuestion. Run automated mini health check on tutorial {vocabulary.note_plural}:

1. **Description check:** Does every {vocabulary.note} have a description field? Does the description add info beyond the title?
2. **Link check:** Do all wiki links resolve to existing files?
3. **{vocabulary.topic_map} check:** Does every {vocabulary.note} appear in at least one {vocabulary.topic_map}'s Topics footer?
4. **Orphan check:** Does any {vocabulary.note} have zero incoming links?
5. **Connection density:** How many wiki links per {vocabulary.note}?

For each check, report PASS or WARN with specifics.

**SEE:**

```
  Health check on your [N] tutorial {vocabulary.note_plural}:

  | Check              | Status | Detail              |
  |--------------------|--------|---------------------|
  | Descriptions       | PASS   | All notes described |
  | Links              | PASS   | No broken links     |
  | {vocabulary.topic_map} membership | WARN   | [note] not in MOC   |
  | Orphan risk        | PASS   | All notes connected |
  | Connection density | PASS   | Avg [N] links/note  |

  This is what /health does at scale. It catches
  problems automatically so the graph stays
  healthy as it grows.
```

If warnings found, fix them automatically (add missing {vocabulary.topic_map} links, improve descriptions) and explain what was fixed.

Update state, then continue to Step 5.

---

### Step 5: Reflect — Review what you built

**WHY:**

```
--=={ ars contexta : tutorial }==--
  [=====>] Step 5 of 5 -- Reflect

  Step back and see the system you started
  building. A few notes are a beginning.
  The question is what comes next.
```

Adapt to track:

| Track | WHY Framing |
|-------|-------------|
| researcher | "You have the beginning of a research graph. Every paper you process, every claim you extract, every connection you find makes the graph more valuable. The compound effect means note 100 is worth more than note 1 because it has 99 potential connections." |
| manager | "You have the beginning of organizational memory. Every meeting processed, every decision tracked, every connection found makes the system more valuable. Institutional knowledge stops living in people's heads and starts living in the graph." |
| personal | "You have the beginning of a self-knowledge system. Every observation captured, every pattern named, every connection found makes the system more valuable. You start seeing yourself through accumulated evidence, not just today's feeling." |

**DO:**

Display vault state summary:

```
  What you built:

  {vocabulary.note_plural}: [N]
  Connections: [M] wiki links
  {vocabulary.topic_map_plural}: linked to [[index]]

  Your graph so far:
    [[note 1]] ----> [[note 2]]
         \               |
          '-> [[note 3]] -'
```

(Simple ASCII graph showing actual connections between the tutorial {vocabulary.note_plural}.)

Then show methodology awareness:

```
Your system also knows about itself:
  ops/methodology/   Your system's self-knowledge
  /ask [question]    Ask the research behind your
                     system's design

Try: /ask "why does my system use [relevant feature]?"
```

Then use AskUserQuestion:

"What would you like to work on next? You can:\n\n  (a) Capture more thoughts (just tell me)\n  (b) Process raw material (/{reduce} [paste or file])\n  (c) Explore your system (/next)\n  (d) Learn more about a specific command (/help [command])"

This is the handoff to productive use. Do not process the response — just acknowledge their choice and point them in the right direction.

**SEE:**

```
--=={ ars contexta : tutorial }==--

  [======] Complete

  You built a working knowledge graph in five
  steps. Every {vocabulary.note} you add from here
  compounds the value of what already exists.

  Quick reference:
    /ask [question]     Query your graph
    /learn [topic]      Research and grow
    /{reduce} [source]  Extract insights
    /{reflect}          Find connections
    /health             Check system health
    /next               What to do next
    /help               Full command guide
```

---

## Completion

After step 5, write final state:
```yaml
track: [track]
current_step: 6
completed_steps: [1, 2, 3, 4, 5]
started: [original timestamp]
last_activity: [now]
completed: [now]
```

## State Persistence

After EVERY step, write to `ops/tutorial-state.yaml`. Non-negotiable — the tutorial must resume across sessions.

**Format:**
```yaml
track: [researcher|manager|personal]
current_step: [1-6, where 6 = complete]
completed_steps: [array of completed step numbers]
started: [ISO 8601 UTC]
last_activity: [ISO 8601 UTC]
completed: [ISO 8601 UTC, only when done]
```

**Session-start integration:** If state exists and incomplete, the session-start hook should surface: "You have an unfinished tutorial (step N of 5). Resume with /tutorial."

## Quality Principles

**Learn by doing.** Every step creates real content in the vault. No hypothetical examples. The {vocabulary.note_plural} created during the tutorial are real {vocabulary.note_plural} that persist and compound with future content.

**WHY before HOW.** Every step explains why this matters before asking the user to do anything. Understanding motivation prevents the tutorial from feeling like a checklist.

**Genuine, not forced.** If the user's input does not produce a meaningful connection, say so. Do not fake connections to make the tutorial feel successful. Honesty about when connections exist (and when they do not) teaches the right mental model.

**Track-adapted, not track-locked.** The track changes the examples and language, not the structure. A researcher and a personal user go through the same five steps with different framing.

**Progressive complexity.** Step 1 is trivially easy (share a thought). Step 5 requires understanding the system. Each step builds on the previous one. No step requires knowledge the tutorial has not yet provided.

## Edge Cases

**User pastes nothing in Step 3:** Offer a pre-written example paragraph appropriate to their track. "Here is a sample you can use to see how extraction works:"

**User wants to skip a step:** Allow it. Update state to mark the step as skipped (not completed). The tutorial should not feel like a gate.

**User re-runs /tutorial after completion:** Show completion status and offer reset. "Your tutorial is complete. Run /tutorial reset to start fresh."

**User input is too short (single word):** Gently expand. "Can you develop that into a full sentence? The system works best with complete thoughts — for example, instead of 'meetings' try 'weekly meetings lose value when action items are not tracked'."
