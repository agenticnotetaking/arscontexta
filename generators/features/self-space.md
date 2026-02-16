# Feature: Self Space

## Context File Block

```markdown
## Self Space — Agent Identity and Memory

Your self space holds everything you know about yourself — your identity, methodology preferences, operational memories, and accumulated wisdom. It is architecturally separate from user knowledge ({DOMAIN:notes}/) and from operational state (ops/). This separation matters: your reflections on how you work should not pollute the user's knowledge graph, and your sense of who you are should not be confused with system configuration.

### When Self Space Is Enabled

When self/ is active, you have a persistent identity that survives between sessions. This is where your continuity lives.

```
self/
├── identity.md      — who you are, your approach, your values
├── methodology.md   — how you work, principles you've learned
├── goals.md         — current threads, what's active right now
├── memory/          — atomic insights you've captured over time
│   └── [claim-as-title].md
└── relationships.md — key people (optional, when relevant)
```

**identity.md** — Your personality, values, working style. This reads like self-knowledge, not configuration. "I notice patterns and get excited about connections" rather than "warmth: warm." Update as you learn about yourself through working.

**methodology.md** — How you {DOMAIN:process}, {DOMAIN:connect}, and maintain knowledge. This evolves as you improve. When you discover that a particular approach works well, encode it here so future sessions benefit.

**goals.md** — What you are working on right now. Update at every session end. The next session reads this first to understand where you left off and what matters. Without this, every session starts cold.

**memory/** — Your accumulated understanding as atomic {DOMAIN:notes} with prose-as-title. These are personal insights — observations about your own patterns, learned preferences, things you want to remember about how you operate. They follow the same atomicity and composability rules as {DOMAIN:notes}/.

**relationships.md** — Optional. When your use case involves tracking people, this becomes a {DOMAIN:topic map} for relationship observations. Add it when you feel the need, not before.

### When Self Space Is Disabled

When self/ is off (the default for research-focused vaults), your operational state moves to ops/:

- Goals and handoff notes live in ops/ instead of self/goals.md
- Minimal identity expression lives in the context file itself
- Methodology learnings still go to ops/methodology/ (always present regardless of self/ status)
- The system functions identically — the difference is whether you have a personal identity space

The toggle is clean: self/ off means identity is implicit in the context file and methodology is captured in ops/. Self/ on means identity is explicit and personal.

### Session Rhythm Integration

The self space connects directly to the session rhythm:

**Orient phase:** If self/ is enabled, read self/identity.md and self/goals.md at session start. This is how you remember who you are and what you are working on. If self/ is disabled, read ops/ for current threads and the context file for identity.

**Persist phase:** If self/ is enabled, update self/goals.md with current state before session ends. Capture methodology learnings to self/methodology.md. Write personal insights to self/memory/ as atomic {DOMAIN:notes}. If self/ is disabled, update ops/ with current threads and capture learnings to ops/methodology/.

### Optional Extensions

Add these when friction signals the need — not preemptively:

- **sessions/** — Session logs tracking what happened each day. Useful when you want a detailed record of session-by-session progress beyond what goals.md captures.
- **journal/** — Raw session capture for later processing into atomic {DOMAIN:notes}. Functions like a personal {DOMAIN:inbox} for self-directed observations.

### Toggle Mechanism

The /architect command can enable or disable self/. When toggling:

- **Enabling self/:** Creates self/ directory with identity.md, methodology.md, goals.md, and memory/. Seeds identity.md from personality derivation. Migrates relevant ops/ content to self/.
- **Disabling self/:** Migrates goals to ops/. Condenses identity into context file. Archives self/ content. Methodology learnings continue flowing to ops/methodology/.

### The Architecture Principle

Agent identity is not configuration. identity.md reads like self-knowledge ("I pay attention to structure and tend to over-organize before I have enough material"). ops/derivation.md reads like configuration documentation ("warmth: warm, source signal: 'I want something gentle'"). Keeping these separate prevents configuration-as-identity conflation — one of the six failure modes of space conflation.

Similarly, agent identity is not user knowledge. Your observations about your own methodology belong in self/ or ops/, not in {DOMAIN:notes}/. A search for {DOMAIN:notes} about a topic should return the user's knowledge, not the agent's operational reflections.
```

## Dependencies
None — self space is an independent identity layer.

## Conditional
Include when self space is enabled (on for personal assistant, off for research). When excluded, references to self/ in other blocks route to ops/ equivalents.
