# Feature: Self-Evolution

## Context File Block

```markdown
## Self-Evolution — How This System Grows

This system is not static. It evolves based on your actual experience using it. The principle: complexity arrives at pain points, not before. You don't add features because they seem useful — you add them because you've hit friction that proves they're needed.

### /{DOMAIN:remember}-Driven Module Adoption

Every feature in this system is a module you can toggle. The question is never "should I use this?" but "am I feeling enough friction to justify this?"

**The pattern:**
1. Work with your current setup
2. Notice friction — something repeatedly takes too long, breaks, or gets forgotten
3. Use /{DOMAIN:remember} to capture the friction signal (or let session capture detect it automatically from the transcript)
4. Identify which module addresses that friction
5. Activate it and adapt it to your domain
6. Monitor — did the friction decrease?

**Examples of friction that triggers adoption:**
- Can't find related {DOMAIN:notes} → activate semantic search
- Keep creating duplicate {DOMAIN:notes} → activate duplicate checking in processing
- {DOMAIN:Topic maps} are too large to navigate → split into sub-{DOMAIN:topic maps}
- Important {DOMAIN:notes} have no connections → activate reweaving maintenance
- Same mistakes keep happening → activate validation hooks

**What NOT to do:** Activate everything at once. Each module adds cognitive overhead. A system with 15 active features that you only need 5 of is worse than one with 5 features you actually use.

### Methodology Folder

Your system maintains its own self-knowledge as linked notes in `ops/methodology/`. This is where the system records what it has learned about its own operation:

- **Derivation rationale** — Why each configuration choice was made (generated at init)
- **Friction captures** — Observations from /{DOMAIN:remember} and automatic session mining
- **Configuration state** — Active features, thresholds, processing preferences

The methodology folder is referenced by meta-skills (/{DOMAIN:rethink}, /architect) when reasoning about system evolution. It is the substrate for self-awareness — without it, the system cannot explain why it works the way it does.

### Rule Zero: Methodology as Canonical Specification

Your methodology folder is more than a log — it is the canonical specification of how your system operates. This is Rule Zero: the meta-principle that governs all other rules.

**What this means in practice:**
- ops/methodology/ is the source of truth for system behavior. When methodology notes say "check for duplicates before creating," the system should check for duplicates before creating.
- Changes to system behavior update methodology FIRST. /{DOMAIN:remember} writes to ops/methodology/ as its primary action. /{DOMAIN:rethink} reads methodology as the spec to compare against.
- Drift between methodology and actual behavior is automatically detected:
  - **Session start:** Lightweight staleness check — are methodology notes older than config changes?
  - **/{DOMAIN:next}:** Coverage check — do active features have corresponding methodology notes?
  - **/{DOMAIN:rethink}:** Full assertion comparison — do methodology directives match actual system behavior?
- Drift observations feed back into the standard learning loop for triage and resolution.

Think of ops/methodology/ as your system's constitution. Individual session decisions are statutes — they can change frequently. But the methodology specification is the foundational document that all decisions should align with. When they don't, that's drift, and drift is the signal for improvement.

### The Seed-Evolve-Reseed Lifecycle

Your knowledge system follows a natural lifecycle:

**1. Seed** — Start with a minimal system
The initial setup gives you: atomic {DOMAIN:notes}, {DOMAIN:topic maps}, wiki links, {DOMAIN:inbox/}, basic schema. This is enough to begin capturing and connecting.

**2. Evolve** — Adapt based on experience
As you use the system, friction reveals where it falls short. You add modules, adjust schemas, split {DOMAIN:topic maps}, create new templates. The system becomes more yours.

**3. Reseed** — Reassess when accumulated drift warrants it
After significant evolution, the system may have accumulated complexity that no longer serves you. Reseed by asking: "If I started fresh today, knowing what I know, what would I keep?" This doesn't mean deleting everything — it means reconsidering which modules are earning their place.

The lifecycle is not linear. You might seed, evolve for months, reseed with lessons learned, and evolve again. Each cycle produces a system better adapted to your actual needs.

### Observation Capture Protocol

Observations are the raw material for evolution. When you notice something about how the system is working (or not working), capture it immediately.

**Where:** `ops/observations/`

**What to capture:**
- Friction you experienced (what was hard, slow, or confusing)
- Surprises (what worked better or worse than expected)
- Process gaps (steps that should exist but don't)
- Methodology insights (why something works the way it does)

**Format:** Each observation is an atomic note with a prose-sentence title:
```markdown
---
description: What happened and what it suggests
category: friction | surprise | process-gap | methodology
status: pending
observed: YYYY-MM-DD
---
# the observation as a sentence

What happened, why it matters, and what might change.
```

**Processing observations:**
When observations accumulate (roughly 5-10 pending), review them as a batch:
- Do patterns emerge? Multiple friction notes about the same area suggest a structural problem.
- Should any become {DOMAIN:notes}? Some observations crystallize into genuine insights.
- Should any trigger system changes? Update ops/context.md, adjust templates, add or remove modules.
- Archive observations that have been processed or are no longer relevant.

### Architect Advice Patterns

When the system reaches a complexity threshold, use the architect conversation to get guidance:

**When to ask the architect:**
- You're unsure which module addresses your friction
- Two modules seem to conflict
- You want to simplify but aren't sure what to remove
- A new domain requires adapting the system significantly

**How to ask:**
Describe the friction or question, then ask for a recommendation. Include:
- What you've tried
- What worked and what didn't
- What constraints matter (speed, simplicity, thoroughness)

The architect draws on the full knowledge system specification to suggest modules, configurations, or structural changes. It's not prescriptive — it surfaces options and trade-offs so you can decide.

### Complexity Curve Monitoring

Track your system's complexity over time to prevent bloat:

**Signs of healthy complexity:**
- Every active module addresses a real friction point
- You can explain why each feature exists in one sentence
- New users of your system can understand the basics in under 10 minutes
- Maintenance doesn't take more than 10% of your work time

**Signs of unhealthy complexity:**
- Modules you activated but never use
- Templates with fields you never fill in
- Maintenance tasks that feel like busywork
- You spend more time organizing than thinking
- Fear of breaking something when you change anything

**The intervention:** When complexity feels unhealthy, run a module audit:
1. List every active feature
2. For each: when did you last use it? What friction does it address?
3. Deactivate anything that hasn't earned its place in the last month
4. Simplify schemas by removing fields you never query

Deactivating a module is not failure. It's the system correctly adapting to your actual needs versus your imagined needs.

### Configuration Changelog

Track what changed and why in `ops/changelog.md`:
```markdown
## YYYY-MM-DD: Brief description

**Changed:** What was modified
**Reason:** What friction or observation triggered this
**Outcome:** What improved (fill in after living with the change)
```

This creates an evolution history. When you reseed, you can review the changelog to understand which changes stuck and which were reversed — valuable signal for what your system actually needs.

### Operational Learning Loop

Your system generates two types of signals during normal operation:

**Observations** — friction, surprises, process gaps, methodology insights. These go to `ops/observations/` as atomic notes. They tell you what's working and what isn't.

**Tensions** — contradictions between {DOMAIN:notes}, conflicting methodology claims, implementation vs theory mismatches. These go to `ops/tensions/` as atomic notes. They tell you where your understanding is inconsistent.

Both signal types accumulate over time. The system monitors their count and suggests action when thresholds are crossed:
- **10+ pending observations** → suggest running /{DOMAIN:rethink}
- **5+ pending tensions** → suggest running /{DOMAIN:rethink}

The /{DOMAIN:rethink} command triages accumulated signals. For each pending note, it decides one of four actions:
- **PROMOTE** to {DOMAIN:notes}/ — the observation crystallized into a genuine insight worth keeping as a permanent {DOMAIN:note}
- **IMPLEMENT** as system change — the observation points to a concrete improvement in ops/context.md, templates, or workflows
- **ARCHIVE** — the observation was session-specific or no longer relevant
- **KEEP PENDING** — not enough evidence yet to decide; let it accumulate with others

This is the scientific method applied to your knowledge system: observe, accumulate evidence, evaluate when patterns emerge, and revise the system based on what you find.

### Tension Capture Protocol

Tensions are contradictions your system has not yet resolved. They're distinct from observations because they involve a conflict between two or more things you believe simultaneously.

**Where:** `ops/tensions/`

**What to capture:**
- Contradictions between {DOMAIN:notes} (note A claims X, note B claims not-X)
- Conflicting methodology claims (two approaches that can't both be right)
- Implementation vs theory mismatches (what you do doesn't match what you say you do)
- Trade-offs that feel unresolved (you keep going back and forth)

**Format:** Each tension is an atomic note with a prose-sentence title:
```markdown
---
description: What conflicts and why it matters
status: pending | resolved | dissolved
observed: YYYY-MM-DD
involves: ["[[note A]]", "[[note B]]"]
---
# the tension as a sentence

What conflicts, why both sides seem valid, and what resolution might look like.
```

**Status lifecycle:**
- `pending` — the conflict is real and unresolved
- `resolved` — you resolved it by creating a new {DOMAIN:note}, updating existing ones, or choosing a side with reasons
- `dissolved` — the conflict turned out to be apparent rather than real (e.g., the two claims operate in different contexts)

**When to capture:** Immediately, during any work. Don't stop to resolve the tension — just capture it and continue. Resolution happens later via /{DOMAIN:rethink} or human judgment. Unflagged tensions silently corrupt your knowledge graph because you keep building on contradictory foundations.

### The Self-Building Loop

Your knowledge system doesn't just maintain itself — it actively grows. This is the explicit growth cycle:

1. **/{DOMAIN:learn} [topic]** — Research a topic using available sources. Results are filed to {DOMAIN:inbox/} with provenance metadata so you can trace where every claim came from.

2. **/{DOMAIN:process}** — Extract atomic {DOMAIN:notes} from inbox material. Each source gets scanned through your domain lens: "Does this help me work better in my domain?" Extracted claims become {DOMAIN:notes} with proper schema.

3. **/{DOMAIN:connect}** — Find connections between new {DOMAIN:notes} and existing ones. Update {DOMAIN:topic maps} to include the new material. Add bidirectional links where relationships are genuine.

4. **Compound** — The graph grows. New connections make existing {DOMAIN:notes} more valuable by creating new traversal paths. {DOMAIN:topic maps} become richer. Semantic search becomes more useful as the graph gets denser.

5. **Repeat** — Each cycle makes the system more capable. More {DOMAIN:notes} means more connections. More connections means better retrieval. Better retrieval means better synthesis. Better synthesis means better {DOMAIN:notes}.

This is not maintenance — maintenance keeps what you have working. This is active expansion of your system's knowledge and capability. The system gets smarter about your domain with every cycle, because the graph compounds: each new node increases the value of every connected node.
```

## Dependencies
Requires: maintenance (self-evolution builds on the awareness that maintenance health checks provide)
