# Feature: Session Rhythm

## Context File Block

```markdown
## Session Rhythm — Orient, Work, Persist

Every session follows three phases. This rhythm prevents context loss across sessions and keeps the system's memory current.

### Phase 1: Orient

Before doing anything, understand where you are:

1. **Read identity and goals** — If self space is enabled, check self/identity.md and self/goals.md. If self space is off, check ops/ for current threads and the context file for identity. What was the last session working on?
2. **Check condition-based triggers** — Workboard reconciliation runs at session start. It checks maintenance conditions (orphans, dangling links, inbox pressure, observation thresholds) and surfaces any that need attention.
3. **Check reminders** — Read ops/reminders.md if it exists. Past sessions may have left explicit notes for future sessions.
4. **Understand current state** — What {DOMAIN:notes} exist? What's in {DOMAIN:inbox/}? What does the graph look like?

**Orientation shortcuts:**
- The workspace tree (injected at session start or loaded manually) tells you what files exist
- {DOMAIN:Topic map} descriptions tell you what topics contain without reading them
- ops/changelog.md shows what changed recently
- {DOMAIN:Inbox/} count tells you if there's capture pressure
- Condition-based triggers surface the highest-priority maintenance items automatically

Orientation should take 1-2 minutes, not 10. Read what's needed, skip what isn't. If the previous session left a clear handoff note, orientation can be as simple as reading that note.

### Phase 2: Work

Focus on one task per session. This is the discipline that makes the system work.

**One task, full attention:**
- Pick the most important task based on current priorities
- Work it through to completion (or to a clear stopping point)
- Resist the urge to context-switch when new ideas emerge

**Discovery → Future task:**
When working on one thing, you'll inevitably notice others that need doing. Don't switch context:
- Quick insight? → Drop a note in {DOMAIN:inbox/}
- Maintenance need? → Log it in ops/observations/
- New topic to explore? → Add to the relevant {DOMAIN:topic map}'s open questions
- Bug or broken link? → Note it, fix later unless it blocks current work

The discipline is: capture the discovery so it's not lost, then return to the current task. Context-switching mid-task degrades quality on both tasks.

**Context budget guidance:**
Your context window is finite. Budget it:
- Reserve ~20% for orientation (self/, recent ops, task context)
- Use ~60% for the actual work (reading sources, writing {DOMAIN:notes}, finding connections)
- Reserve ~20% for persistence (updating self/, logging, committing)

If a task requires reading more source material than fits in 60% of context, break it into smaller sub-tasks across sessions.

### Phase 3: Persist

Before ending a session, externalize what happened:

1. **Update goals** — If self space is enabled, update self/goals.md with current state. If self space is off, update ops/ with current threads. Did you learn something about your methodology? Capture it.
2. **Commit changes** — Every change must be committed. Nothing persists without this. Use clear commit messages that describe what changed and why.
3. **Log what happened** — If the session produced observations or tensions, capture them as atomic notes in ops/observations/ or ops/tensions/. This is future-you's memory of what current-you learned.
4. **Leave a handoff** — If work continues in the next session, leave a clear note about where you stopped and what's next. This can be in ops/reminders.md or a comment in the relevant task file.
5. **Session capture** — Stop hooks automatically save the session transcript to ops/sessions/. The system runs lightweight friction detection on the transcript and creates mining tasks for any detected friction or insights. This ensures no work is lost, even when you forget to explicitly capture something during the session.

### Handoff Protocol

A good handoff answers three questions:
1. **What did this session accomplish?** (Summary of work done)
2. **What's unfinished?** (Where did you stop, what remains)
3. **What should the next session do first?** (Priority recommendation)

Write handoffs assuming the next session has zero memory of this one. Be specific enough that the next session can orient in under a minute.

### Session Anti-Patterns

**Skipping orientation** — Starting work without reading self/ means repeating past mistakes or duplicating work. The 2-minute investment prevents 20-minute dead ends.

**Multi-tasking** — Working on three things poorly is worse than one thing well. The graph compounds quality, not quantity.

**Skipping persistence** — "I'll remember" is a lie. If it's not written down and committed, it doesn't exist for future sessions.

**Over-long sessions** — Context degrades as sessions run long. If quality is dropping, end the session with a clean handoff rather than pushing through with degraded attention.
```

## Dependencies
None — session rhythm is a standalone primitive that structures all other work.
