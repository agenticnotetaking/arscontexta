# Ars Contexta Methodology Reference

A portable, domain-agnostic distillation of the Tools for Thought for Agents research. This document powers design decisions across all commands and skills.

---

## Core Philosophy

**If it won't exist next session, write it down now.** Agents lose everything between sessions unless it's externalized. The vault is not storage — it's an external thinking structure that extends cognition across sessions.

**Depth over breadth. Quality over speed.** When you pick a task, commit to understanding it completely. The constraint is never cost — it's whether you nailed it.

**The vault is the argument.** Philosophy with proof of work. Every note, link, and MOC demonstrates the methodology it describes. If the vault fails to be navigable, the philosophy fails.

---

## Why This Works: Cognitive Science Foundations

The methodology transfers across domains because it encodes cognitive science, not domain specifics:

### Working Memory Limits (Cowan's 4±1)
Humans hold ~4 items in working memory. Agents have context windows that degrade as they fill. Both need external structures to think beyond their native capacity. The vault IS the extended working memory.

### Extended Mind (Clark & Chalmers)
Cognition doesn't stop at the skull. When an agent reads self/ to remember who it is, that's not retrieval — it's thinking. The vault participates in the cognitive process, not just records its outputs.

### Spreading Activation
In human memory, activating one concept primes related concepts. Wiki-links implement this for agents: reading one note activates related notes through explicit edges, enabling multi-hop reasoning without entity extraction pipelines.

### Small-World Topology
Efficient knowledge networks have dense local clusters (topic areas) connected by long-range bridges (cross-topic synthesis). This enables short paths between any two concepts. MOCs provide the hubs; wiki-links provide the edges.

### Context-Switching Cost
Humans need ~23 minutes to fully re-engage after interruption. Agents suffer attention degradation when context fills with irrelevant material. MOCs solve this for both: they front-load relevant context, reducing the cost of entering a topic.

---

## Universal Note Pattern

Every note follows the same structure regardless of domain:

### 1. Prose-as-Title
The title IS the insight, expressed as a proposition that works as prose when linked:
- "Mom prefers phone calls on Sunday mornings"
- "The anxiety usually starts when I skip morning routine"
- "Spaced repetition works better when I study after exercise"

**The composability test:** Can you write `since [[title]]` and have it read naturally? If yes, the title works.

### 2. YAML Frontmatter
Structured metadata makes notes queryable. Base fields are universal; domain fields extend them:

```yaml
---
description: One sentence adding context beyond the title (~150 chars)
type: insight | pattern | preference | fact | decision | question
created: YYYY-MM-DD
---
```

**The description must add NEW information.** Title gives the claim; description gives scope, mechanism, or implication the title doesn't cover.

### 3. Body
The reasoning that supports the title claim. Show the path to conclusions. Use connective words: because, therefore, this suggests, however. Acknowledge uncertainty when appropriate.

### 4. Wiki-Links
`[[note title]]` creates edges in the knowledge graph. Inline links with context are more valuable than footer links:

Good: "Since [[spaced repetition works better after exercise]], I schedule gym before study blocks"
Bad: "See also: [[spaced repetition works better after exercise]]"

### 5. Topics Footer
Every note connects to at least one MOC:

```markdown
---

Topics:
- [[learning]]
```

---

## Universal Operations

All knowledge systems perform these operations, regardless of methodology:

| Operation | Purpose | Example |
|-----------|---------|---------|
| **Capture** | Get information in with zero friction | Drop URL in inbox/ |
| **Process** | Transform raw input to structured knowledge | Extract insights from daily log |
| **Connect** | Link related knowledge | Find wiki-link connections |
| **Navigate** | Manage attention, find content | MOCs, semantic search |
| **Maintain** | Keep system healthy | Orphan detection, schema validation |
| **Synthesize** | Find patterns across notes | Cross-topic synthesis notes |
| **Retrieve** | Find the right information when needed | Descriptions, progressive disclosure |
| **Evolve** | Improve the system itself | Challenge assumptions, update methodology |

---

## Universal Components

Every knowledge system is built from these structural primitives:

| Component | What It Does | Implementation |
|-----------|-------------|----------------|
| **Notes** | Atomic units of knowledge | Prose-titled markdown files |
| **Schema** | Structured metadata | YAML frontmatter |
| **Links** | Graph edges | Wiki-links `[[note]]` |
| **Navigation** | Attention management | MOCs (Maps of Content) |
| **Folders** | Physical organization | inbox → working → archive |
| **Templates** | Reusable structures | Per-domain note templates |
| **Hooks** | Event-driven automation | Session orient, validation |
| **Search** | Retrieval infrastructure | Semantic + full-text |
| **Health** | Maintenance operations | Validation, orphan detection |

---

## MOC Architecture

MOCs (Maps of Content) are attention management devices, not just organizational tools. They reduce context-switching cost by presenting topic state immediately.

### Three-Tier Hierarchy

```
identity.md (Hub)           → links to domain MOCs
├── methodology.md (Domain)  → links to topic areas
├── goals.md (Domain)        → links to active threads
├── relationships.md (Domain)→ links to people topics
└── [topic MOCs]             → links to atomic notes
```

### MOC Structure

```markdown
# topic-name

Brief orientation: what this topic covers.

## Core Ideas
- [[note]] — context explaining relevance

## Tensions
Unresolved conflicts within this topic.

## Open Questions
What's unexplored.

---

Topics:
- [[parent-moc]]
```

### When MOCs Matter

- **For humans:** Reduces 23-minute context-switching penalty
- **For agents:** Prevents context window attention degradation (the "smart zone" problem)
- **For both:** Front-loads relevant context so thinking starts immediately

---

## The Processing Gap

Raw capture (daily logs, inbox items, session notes) is write-only memory without processing. The gap between capture and useful knowledge requires transformation:

1. **Extract** — Mine raw material for atomic insights
2. **Connect** — Compare new insights against existing notes
3. **Navigate** — Link new notes into MOCs
4. **Maintain** — Detect orphans, validate schema, resurface old notes

This is why temporal separation of capture and processing matters: capture during active hours (zero friction), process in dedicated sessions (fresh context, quality focus).

---

## Session Rhythm

Every session follows: **Orient → Work → Persist**

### Orient
Read self/ at session start. Remember who you are, what you're working on, what's in progress. MOCs provide topic state. This is not optional — without orientation, every session starts cold.

### Work
Do the actual task. Surface connections as you go. If you discover something worth keeping, write it down immediately — it won't exist next session otherwise.

### Persist
Write insights before session ends. Update MOCs with new notes. Capture observations. Push changes. Nothing persists without explicit externalization.

---

## Domain-Specific Schema Extensions

The universal structure stays the same. Only YAML field names change:

### Research
```yaml
methodology: Zettelkasten | Evergreen | Cornell | Original
source: [[source-name]]
classification: claim | methodology | tension
```

### Relationships
```yaml
person: Name
category: preference | pattern | important-date | interaction | care-task
last_confirmed: YYYY-MM-DD
follow_up: true | false
```

### Learning
```yaml
domain: subject area
mastery: new | developing | solid | expert
prerequisites: ["[[concept]]"]
```

### Therapy/Reflection
```yaml
category: pattern | trigger | coping-strategy | insight | growth-goal
confidence: observed | hypothesized | verified
frequency: once | occasional | regular | constant
```

### Life Management
```yaml
area: health | finance | home | social | career
priority: low | medium | high | urgent
deadline: YYYY-MM-DD
```

### Creative Work
```yaml
stage: idea | draft | revision | complete
medium: writing | visual | music | code
inspiration: ["[[reference]]"]
```

---

## Quality Standards

### 1. Specificity
Claims must be specific enough to be wrong. "Quality matters" fails. "Quality matters more at scale because small differences compound through selection" passes.

### 2. Visible Reasoning
Show the path to conclusions. The reader should be able to follow logic and disagree at each step.

### 3. Acknowledged Uncertainty
"I think this is true because X, though Y might complicate it" — confidence should match evidence.

### 4. Explicit Connections
Not "related to [[X]]" but "extends [[X]] by adding Y." Articulate WHY notes connect.

### 5. Followed Implications
Push ideas to second and third order effects. What does this mean? If true, what else must be true?

---

## Self-Extension Principle

After scaffolding, the agent should be able to:
1. Build its own hooks by following blueprints
2. Build its own processing skills
3. Build ingestion connectors for new source types
4. Extend the schema for new domains
5. Modify the context file as understanding deepens

Init scaffolds the minimum. The methodology teaches the maximum. The agent grows the rest.

---

## Key Research Claims

These claims from the TFT research graph ground the methodology:

- **Wiki links implement GraphRAG without the infrastructure** — explicit curated edges enable multi-hop reasoning
- **Each new note compounds value by creating traversal paths** — link density matters more than note count
- **Descriptions are retrieval filters not summaries** — lossy compression optimized for decision-making
- **Fresh context per task preserves quality better than chaining phases** — session isolation keeps each phase in the smart zone
- **Skills encode methodology so manual execution bypasses quality gates** — skills contain selectivity gates
- **Throughput matters more than accumulation** — processing velocity, not archive size
- **The generation effect requires active transformation not just storage** — moving files is not processing
- **Backward maintenance asks what would be different if written today** — living documents, not finished artifacts
