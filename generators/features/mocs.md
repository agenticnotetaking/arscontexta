# Feature: MOCs (Maps of Content)

## Context File Block

```markdown
## {DOMAIN:Topic Maps} — Attention Management

{DOMAIN:Topic maps} organize {DOMAIN:notes} by topic. They are not folders — they are navigation hubs that reduce context-switching cost. When you switch to a topic, you need to know: what is known, what is in tension, what is unexplored. Without a {DOMAIN:topic map}, you search blindly. With a {DOMAIN:topic map}, you see the landscape immediately.

### Why {DOMAIN:Topic Maps}

A flat collection of {DOMAIN:notes} becomes unnavigable as it grows. At 20 {DOMAIN:notes}, you can load everything into context. At 100, you cannot. {DOMAIN:Topic maps} solve this by providing curated entry points into topic areas. They tell you what exists and WHY each {DOMAIN:note} matters in context — not just a list of titles, but a map with reasoning about relationships.

### {DOMAIN:Topic Map} Taxonomy

The system supports several types of navigation structures, each serving a different purpose:

**Hub {DOMAIN:topic map}** — Entry point for the entire workspace. Pure navigation linking to domain {DOMAIN:topic maps}. One per workspace. Answers: "What topics exist?"

**Domain {DOMAIN:topic map}** — Entry point for a research or knowledge area. Contains synthesis across the domain and links to topic-level {DOMAIN:topic maps}. Answers: "What are the big themes here?"

**Topic {DOMAIN:topic map}** — Active workspace for a specific topic. Core ideas, tensions, gaps. This is where you start when you know which topic you are working in. Answers: "What do we know about this topic?"

**Self {DOMAIN:topic map}** — Agent identity and operational memory (self/identity.md, self/methodology.md, etc.). Flat peer structure — these {DOMAIN:topic maps} are equals, not hierarchically related.

**Operational {DOMAIN:topic map}** — Procedure tracking with atomic entries. Categories of observations, tensions, operational learnings. Answers: "What has the system noticed?"

Not every type applies to every workspace. A simple system may have only topic {DOMAIN:topic maps}. A complex system may use the full taxonomy. Create the types you need, not the ones that theoretically could exist.

### Your Starting {DOMAIN:Topic Maps}

```
self/
├── identity.md      — {DOMAIN:topic map}: who you are
├── methodology.md   — {DOMAIN:topic map}: how you work
├── goals.md         — {DOMAIN:topic map}: current threads
└── relationships.md — {DOMAIN:topic map}: key people (if relevant)
```

These are your foundation. As your {DOMAIN:notes}/ grows, you will create topic {DOMAIN:topic maps} there as well. Start with what you need and let the structure emerge from your content.

### {DOMAIN:Topic Map} Structure

```markdown
# topic-name

Brief orientation — 2-3 sentences explaining what this topic covers and how to use this {DOMAIN:topic map}.

## Core Ideas
- [[{DOMAIN:note}]] — context explaining why this matters here
- [[{DOMAIN:note}]] — what this adds to the topic

## Tensions
Unresolved conflicts — intellectual work, not bugs. What questions remain open? Where do ideas clash?

## Open Questions
What is unexplored. Research directions, gaps in understanding, areas that need attention.
```

**The critical rule:** Core Ideas entries MUST have context phrases. A bare link list (`- [[{DOMAIN:note}]]` without explanation) is an address book, not a map. The context phrase explains WHY this {DOMAIN:note} belongs here and what it contributes to the topic. This is what makes {DOMAIN:topic maps} navigable — you can scan the context phrases to find the entry point you need without reading every linked {DOMAIN:note}.

### Lifecycle

**Create** when:
- 5+ related {DOMAIN:notes} accumulate without navigation structure
- You can not navigate a topic without loading everything into context
- You find yourself repeatedly loading the same set of {DOMAIN:notes} across sessions
- A topic appears in multiple existing {DOMAIN:topic maps}' Open Questions sections

**Do NOT create** when fewer than 5 related {DOMAIN:notes} exist, the topic fits as a section in an existing {DOMAIN:topic map}, or "just in case." Premature creation adds maintenance burden without navigation value.

**Split** when:
- A {DOMAIN:topic map} exceeds 40 {DOMAIN:notes} and distinct sub-communities form
- Sections have different update frequencies (one part is active, another is stable)
- Navigation friction emerges — you can not quickly find what you need

How to split: create sub-{DOMAIN:topic map}(s) named `parent-subtopic.md`. Move Core Ideas for the subtopic. Parent becomes domain-style ({DOMAIN:topic map} of {DOMAIN:topic maps}). Update all affected {DOMAIN:notes}' Topics footers.

**Merge** when: Both {DOMAIN:topic maps} are small (under 30 combined {DOMAIN:notes}), significant content overlap exists, and they update at the same frequency.

**Archive** when: fewer than 5 {DOMAIN:notes} remain and the topic has been stagnant for 6+ months, the {DOMAIN:topic map} has been superseded, or all {DOMAIN:notes} have been absorbed elsewhere. Move to archive, do not delete.

### Maintenance Protocol

**Continuous (every {DOMAIN:note} creation):**
1. Add the new {DOMAIN:note} to relevant {DOMAIN:topic map}(s) Core Ideas with a context phrase
2. If the {DOMAIN:note} spans multiple topics, add to all relevant {DOMAIN:topic maps}
3. Update the {DOMAIN:note}'s Topics footer to list its {DOMAIN:topic maps}

This is handled by /{DOMAIN:connect} in the pipeline. When creating {DOMAIN:notes} manually (not through the pipeline), you must do this yourself.

**Condition-based checks:**

| Condition | Action When True |
|-----------|-----------------|
| {DOMAIN:Topic map} exceeds 40 {DOMAIN:notes} | Consider splitting into sub-{DOMAIN:topic maps} |
| Orphan {DOMAIN:notes} detected | Add to appropriate {DOMAIN:topic map} |
| Dangling links in {DOMAIN:topic map} | Fix or remove broken links |
| {DOMAIN:Topic map} not updated in 90+ days | Review and refresh |

### Health Metrics

| Metric | Healthy | Warning | Action |
|--------|---------|---------|--------|
| {DOMAIN:Notes} per topic {DOMAIN:topic map} | 10-40 | >50 | Split into sub-{DOMAIN:topic maps} |
| Orphan {DOMAIN:notes} | 0 | Any | Add to appropriate {DOMAIN:topic map} |
| Dangling links in {DOMAIN:topic map} | 0 | Any | Fix or remove |
| {DOMAIN:Topic map} last updated | Recent | >90 days | Review and refresh |

### Multi-{DOMAIN:Topic Map} Membership

Some {DOMAIN:notes} genuinely span multiple topics. This is valuable — it reveals synthesis opportunities and cross-cutting insights. List ALL relevant {DOMAIN:topic maps} in the {DOMAIN:note}'s Topics footer:

```markdown
Topics:
- [[methodology]]
- [[relationships]]
```

Cross-{DOMAIN:topic map} membership is a signal, not a problem. When a {DOMAIN:note} appears in multiple {DOMAIN:topic maps}, it often serves as a bridge between topic areas. The /{DOMAIN:connect} phase identifies these naturally.

### Growing {DOMAIN:Topic Maps}

- Start with the self/ {DOMAIN:topic maps} — they are your foundation
- Create new {DOMAIN:topic maps} when a topic accumulates enough {DOMAIN:notes} to warrant navigation
- Split {DOMAIN:topic maps} when they exceed their healthy range and sub-communities form
- Every {DOMAIN:note} links back to its {DOMAIN:topic map}(s) via the Topics footer
- The hierarchy emerges from your content, not from planning — let {DOMAIN:topic maps} form around natural clusters

### Anti-Patterns

**Bare link lists** — `- [[{DOMAIN:note}]]` without context phrases. These are address books, not maps. Always explain WHY each {DOMAIN:note} belongs.

**{DOMAIN:Topic maps} as content** — Developed thinking belongs in {DOMAIN:notes}, not {DOMAIN:topic maps}. Synthesis that makes claims should become a synthesis {DOMAIN:note} linked FROM the {DOMAIN:topic map}, not prose within the {DOMAIN:topic map}.

**Too many {DOMAIN:topic maps}** — If you can not decide which to update, merge small ones. A {DOMAIN:topic map} for 3 {DOMAIN:notes} is overhead without value.

**Stale navigation** — Creating {DOMAIN:notes} without updating {DOMAIN:topic maps}. The pipeline handles this automatically; manual creation requires discipline.

**Deep hierarchy** — Keep the {DOMAIN:topic map} depth manageable. Beyond 3-4 levels, reconsider your decomposition. Navigation should get you to the right {DOMAIN:note} in 2-3 hops, not 6.
```

## Dependencies
Requires: wiki-links (MOCs use wiki-links to reference notes)
