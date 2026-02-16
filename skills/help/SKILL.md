---
name: help
description: Contextual guidance and command discovery. Three modes — narrative (first-time), contextual (mid-task), compact (quick reference). Shows available commands, active skills, and intelligent suggestions based on vault state. Triggers on "/help", "what can I do", "show commands", "how does this work".
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash
version: "1.0"
generated_from: "arscontexta-v1.6"
---

## EXECUTE NOW

**Target: $ARGUMENTS**

Parse immediately:
- If target contains `--compact`: force compact mode regardless of vault state
- If target contains a skill name (e.g., "help reduce" or "help reflect"): show detailed help for that specific skill
- If target is empty: determine mode from vault state

**Execute these steps:**

1. Gather vault state (Step 1)
2. Resolve domain vocabulary (Step 2)
3. Determine mode (Step 3)
4. Discover commands dynamically (Step 4)
5. Render the appropriate mode (Step 5)

**START NOW.** Reference below defines each step.

---

## Step 1: Gather Vault State

Determine the **notes folder** by checking which domain-named directory exists (notes/, reflections/, concepts/, ideas/, decisions/, memories/, or any custom name from derivation-manifest.md). Then gather counts:

- **Note count:** `.md` files in the notes folder, excluding MOCs (files with `type: moc` in frontmatter)
- **Inbox count:** `.md` files in the inbox folder (inbox/, journal/, encounters/, etc.)
- **Observation count:** `.md` files in `ops/observations/` or `ops/methodology/`
- **Tension count:** `.md` files in `ops/tensions/`
- **Connection density:** count wiki links (`[[`) across notes folder; sparse if fewer than 2x note count
- **Queue state:** pending tasks in `ops/queue/queue.yaml` or `ops/queue/queue.json`
- **Health warnings:** check latest report in `ops/health/` if it exists
- **Tutorial state:** check `ops/tutorial-state.yaml` for incomplete tutorial
- **Session count:** estimate from `ops/sessions/` file count (indicates usage maturity)

```bash
# Quick state gathering
note_count=$(ls -1 {vocabulary.notes}/*.md 2>/dev/null | wc -l | tr -d ' ')
inbox_count=$(ls -1 {vocabulary.inbox}/*.md 2>/dev/null | wc -l | tr -d ' ')
obs_count=$(ls -1 ops/observations/*.md ops/methodology/*.md 2>/dev/null | wc -l | tr -d ' ')
tension_count=$(ls -1 ops/tensions/*.md 2>/dev/null | wc -l | tr -d ' ')
```

## Step 2: Resolve Domain Vocabulary

Read `ops/derivation-manifest.md` (or fall back to `ops/derivation.md` Vocabulary Mapping section). Extract domain-native names for: reduce, reflect, reweave, verify, rethink, note, MOC, inbox. If neither file exists, use universal names.

For display, show domain name with universal in parentheses when they differ:
```
  /{domain:reduce} (reduce)   Extract patterns from journal entries
```

If domain name equals universal name, show just the name:
```
  /reduce   Extract insights from source material
```

## Step 3: Determine Mode

| Condition | Mode |
|-----------|------|
| `--compact` in arguments | Compact |
| Specific skill name in arguments | Skill detail |
| Note count < 5 | Narrative |
| Note count >= 5 | Contextual |

## Step 4: Discover Commands

Scan `${CLAUDE_PLUGIN_ROOT}/skills/` dynamically:
- Subdirectories containing `SKILL.md` (e.g., `reduce/SKILL.md`)

Extract `name:` and `description:` from each frontmatter. Do NOT hardcode the command list.

**Command categories:**

| Category | Commands | When to Show |
|----------|----------|-------------|
| Core | /ask, /learn, /next, /help | Always |
| Processing | /reduce, /reflect, /reweave, /verify | Always (all skills from day one) |
| Maintenance | /health, /rethink, /remember | Always |
| Evolution | /architect, /reseed, /add-domain, /upgrade | Always |
| Meta | /tutorial, /graph, /stats | Always |

## Step 5: Render

### NARRATIVE MODE (note count < 5)

This is the first impression. The user is new or nearly new. Explain what the system IS before listing what it DOES.

**What narrative mode communicates:**
1. What Ars Contexta is (one sentence)
2. What THEIR system was built to do (read from ops/derivation.md if available)
3. What they can do RIGHT NOW (concrete actions, not abstract possibilities)
4. How the system grows with them

```
--=={ ars contexta : help }==--

Your knowledge system is ready. It turns thoughts
into a connected graph where every note compounds
the value of every other note.

[If ops/derivation.md exists:]
Your system: [domain description from derivation]

Getting started:

  Tell me a thought, observation, or question.
  I will turn it into a note and show you what
  the system does with it.

  Or try one of these:

  /ask [question]    Ask about [domain] -- I will
                     answer from your graph
  /learn [topic]     Research [topic] and grow
                     your graph with findings
  /tutorial          Walk through the system
                     step by step (5 minutes)

As your graph grows, you will use:
  /reduce [source]   Extract insights from articles,
                     notes, or any raw material
  /reflect           Find connections between notes
  /health            Check your system's health

Your system also learns from experience:
  /remember             Capture when something goes wrong
                        (your system remembers corrections)
  /ask [question]       Ask about [domain] -- answers draw
                        from 249 methodology notes AND your
                        system's own methodology notes

Type /help anytime for guidance.
```

**Manual reference (if manual/ exists):**
If the vault contains a `manual/` directory, add to the narrative output:
```
  For a deeper guide, read manual/getting-started.md
  or explore the full manual in manual/manual.md.
```

**Key principles for narrative mode:**
- Conversational, not list-like
- Show the easiest entry point first ("tell me a thought")
- Group commands by when the user would need them, not alphabetically
- Reference the user's actual domain when possible
- If tutorial is incomplete, mention: "You have an unfinished tutorial (step N of 5). Resume with /tutorial"

### CONTEXTUAL MODE (note count >= 5)

The user has been working. Show them what is happening NOW and what would be most valuable NEXT.

**What contextual mode communicates:**
1. Current system state (brief metrics)
2. What needs attention right now (state-aware)
3. Suggested next action (the single most valuable thing)
4. Commands they might not know yet
5. Full command reference

```
--=={ ars contexta : help }==--

Your system: [domain] knowledge graph
  [N] notes, [M] connections, [P] pending tasks

Right now:
  [State-aware observations — pick up to 3 most relevant:]
  Your inbox has [N] items (oldest: [age])
  [N] pending observations -- approaching /rethink threshold
  Pipeline: [N] tasks at [phase] phase
  [N] notes have sparse connections (< 2 links)

Suggested:
  [Single most valuable next action with rationale]

[If user hasn't tried certain commands:]
Commands you might not know:
  /remember    Capture when something goes wrong
               (teaches your system from friction)
  /graph       Explore your knowledge graph visually
  /stats       See vault metrics in shareable format

All commands:
  /ask [question]        Query your knowledge system
  /learn [topic]         Research and grow your graph
  /next                  Next recommended action
  /{reduce} [source]     Extract insights from material
  /{reflect}             Find connections between notes
  /{reweave}             Update older notes
  /verify [note]         Combined quality verification
  /health                Run vault diagnostics
  /{rethink}             Challenge assumptions
  /remember              Capture methodology learning
  /architect             Research-backed evolution advice
  /reseed                Principled restructuring
  /add-domain            Extend with a new domain
  /upgrade               Check for skill improvements
  /tutorial              Interactive walkthrough
  /graph                 Graph exploration
  /stats                 Vault metrics
```

**State-aware suggestion logic:**

Pick the FIRST matching condition:

| Condition | Suggestion |
|-----------|-----------|
| Inbox has items | `Process your inbox: /{reduce} [oldest-inbox-item-filename]` |
| Pipeline has pending tasks | `Resume processing: /next` |
| 10+ observations or 5+ tensions | `Review accumulated evidence: /{rethink}` |
| Health warnings exist | `Check health: /health` |
| Notes exist, sparse connections | `Build connections: /{reflect}` |
| User hasn't tried /learn | `Grow your graph: /learn [topic related to their domain]` |
| Methodology folder has friction notes | `Your system is learning from friction -- review with /{rethink}` |
| Methodology folder has notes beyond derivation-rationale | `Your system has [N] operational learnings -- query them with /ask or browse ops/methodology/` |
| Sessions accumulating without mining | `Mine session learnings: /remember` |
| Healthy vault, no pressure | `What is next: /next` |

Reference a specific file when possible (e.g., the actual oldest inbox filename, the actual pending task description).

**Manual page suggestion (if manual/ exists):**
Based on the first matching state-aware condition, suggest the relevant manual page:

| Condition | Manual Page |
|-----------|------------|
| Inbox has items | [[workflows]] (processing pipeline) |
| Pipeline has pending tasks | [[workflows]] (batch processing) |
| Observations/tensions accumulated | [[meta-skills]] (/rethink guide) |
| Health warnings exist | [[troubleshooting]] |
| Sparse connections | [[workflows]] (connection finding) |
| General orientation needed | [[getting-started]] |

Add: `For details, see manual/{page}.md`

**"Commands you might not know" logic:**

Track which commands the user has likely used by checking for their artifacts:
- /learn used if `ops/sessions/` has learn-related transcripts or inbox has research files
- /remember used if `ops/methodology/` or `ops/observations/` has files
- /graph used if... (no artifact, always suggest if note count > 20)
- /stats used if... (no artifact, always suggest if note count > 10)

Show up to 3 commands the user probably has not tried. Skip commands they clearly have used.

### COMPACT MODE (--compact flag)

Quick reference. No state analysis. No suggestions. Just the commands.

```
--=={ ars contexta : help --compact }==--

  /ask [question]        Query knowledge system
  /learn [topic]         Research and grow graph
  /next                  Next recommended action
  /{reduce} [source]     Extract insights
  /{reflect}             Find connections
  /{reweave}             Update older notes
  /verify [note]         Quality verification
  /health                Vault diagnostics
  /{rethink}             Challenge assumptions
  /remember              Capture methodology learning
  /architect             Evolution advice
  /reseed                Restructure system
  /add-domain            Add new domain
  /upgrade               Check for improvements
  /tutorial              Interactive walkthrough
  /graph                 Graph exploration
  /stats                 Vault metrics
  /help                  This guide
```

### SKILL DETAIL MODE (help [skill-name])

When the user asks for help with a specific skill (e.g., `/help reduce` or `/help reflect`):

1. Find the skill's SKILL.md file
2. Read its frontmatter (name, description) and first section
3. Display a focused guide:

```
--=={ ars contexta : help /{skill-name} }==--

{Description from frontmatter}

Usage:
  /{skill-name} [arguments]

Examples:
  /{skill-name} inbox/article.md
  /{skill-name} --since 7d

What it does:
  {2-3 sentence summary extracted from the skill's
   philosophy or first methodology section}

Related:
  /{related-skill}    {one-line description}
```

**Special case for /help ask:** Expand the "What it does" section to mention both knowledge layers:
```
What it does:
  Queries the bundled methodology knowledge base (249
  research claims) AND your local methodology notes
  in ops/methodology/. Answers are grounded in
  specific claims and applied to your system's
  configuration.
```

Extract the pipeline position (what comes before and after this skill) to show workflow context.

**Manual cross-reference:** If `manual/skills.md` exists, also check it for additional context about the requested skill. The manual may contain domain-specific examples and workflow context that the SKILL.md frontmatter does not include.

---

## Rendering Rules

- Max width: 76 characters
- No ANSI color codes
- No emoji
- Monospaced alignment assumed
- Display short command forms (`/reduce`), not plugin-qualified forms (`/arscontexta:reduce`)
- Domain-native names in curly braces (e.g., `/{reduce}`) are resolved from derivation-manifest.md
- When domain name equals universal name, drop the braces

## Edge Cases

**No ops/derivation-manifest.md:** Use universal vocabulary for all command names.

**Pre-init invocation:** If no vault structure exists at all (no notes folder, no ops/), show a minimal message:
```
Ars Contexta is not initialized in this directory.
Run /setup to create your knowledge system.
```

**Multiple domains:** If `ops/derivation-manifest.md` lists multiple domains, show commands grouped by domain in contextual mode.
