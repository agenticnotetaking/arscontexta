# Feature: Maintenance

## Context File Block

```markdown
## Maintenance — Keeping the Graph Healthy

A knowledge graph degrades without maintenance. Notes written last month don't know about notes written today. Links break when titles change. {DOMAIN:topic maps} grow stale as topics evolve. Maintenance is not optional — it's what keeps the system useful.

### Health Check Categories

Run these checks when conditions warrant — orphans detected, links broken, schema violations accumulated:

**1. Orphan Detection**
{DOMAIN:Notes} with no incoming links are invisible to traversal. Find them:
```bash
# Find notes not linked from anywhere
rg -l '.' {DOMAIN:notes/}*.md | while read f; do
  title=$(basename "$f" .md)
  rg -q "\[\[$title\]\]" {DOMAIN:notes/} || echo "Orphan: $f"
done
```
Every orphan is either a gap (needs connections) or stale (needs archiving).

**2. Dangling Links**
Wiki links pointing to non-existent {DOMAIN:notes} create confusion:
```bash
# Find [[links]] to files that don't exist
rg -o '\[\[([^\]]+)\]\]' {DOMAIN:notes/} -r '$1' --no-filename | sort -u | while read title; do
  find . -name "$title.md" -not -path "./.git/*" | grep -q . || echo "Dangling: [[$title]]"
done
```
Either create the missing {DOMAIN:note} or fix the link.

**3. Schema Validation**
Check that {DOMAIN:notes} have required YAML fields:
```bash
rg -L '^description:' {DOMAIN:notes/}*.md    # missing descriptions
```
Missing descriptions mean the {DOMAIN:note} can't be filtered during search.

**4. {DOMAIN:Topic Map} Coherence**
{DOMAIN:Topic maps} should accurately reflect the notes they organize:
- Do all listed {DOMAIN:notes} still exist?
- Are there {DOMAIN:notes} on this topic NOT listed in the {DOMAIN:topic map}?
- Has the topic grown large enough to warrant splitting?

**5. Stale Content**
{DOMAIN:Notes} that haven't been touched in a long time may contain outdated claims. Check modification dates and review oldest notes first.

### Reweaving — The Backward Pass

New {DOMAIN:notes} create connections going forward. But older {DOMAIN:notes} don't automatically know about newer ones. Reweaving is the practice of revisiting old {DOMAIN:notes} and asking: "If I wrote this today, what would be different?"

**Reweaving can:**
- Add connections to newer {DOMAIN:notes} that didn't exist when the original was written
- Sharpen a claim that's become clearer with more context
- Split a {DOMAIN:note} that actually contains multiple ideas
- Challenge a claim that new evidence contradicts
- Rewrite prose to incorporate new links inline

**When to reweave:**
- After creating a batch of new {DOMAIN:notes} — check what older {DOMAIN:notes} should link to them
- When a health check flags sparse {DOMAIN:notes} with few connections
- When {DOMAIN:notes} have not been touched since N new notes were added to the graph
- When a {DOMAIN:note} feels disconnected from the rest of the graph

### Condition-Based Maintenance

Maintenance triggers are condition-based, not time-based. Time-based triggers (weekly, monthly, quarterly) assume uniform activity — a vault that scales fast would overwhelm a monthly check, while a vault used rarely would run empty checks on schedule. Condition-based triggers respond to actual state, firing exactly when the system needs attention.

| Condition | Threshold | Action When True |
|-----------|-----------|-----------------|
| Orphan {DOMAIN:notes} | Any detected | Surface for connection-finding |
| Dangling links | Any detected | Surface for resolution |
| {DOMAIN:Topic map} size | >40 {DOMAIN:notes} | Suggest sub-{DOMAIN:topic map} split |
| Pending observations | >=10 | Suggest /{DOMAIN:rethink} |
| Pending tensions | >=5 | Suggest /{DOMAIN:rethink} |
| Inbox pressure | Items older than 3 days | Suggest processing |
| Stale pipeline batch | >2 sessions without progress | Surface as blocked |
| Schema violations | Any detected | Surface for correction |

These conditions are evaluated by /next via queue reconciliation. When a condition fires, it materializes as a `type: "maintenance"` entry in the queue — not a calendar reminder.

### Session Maintenance Checklist

Before ending a work session:
- [ ] New {DOMAIN:notes} are linked from at least one {DOMAIN:topic map}
- [ ] Wiki links in new {DOMAIN:notes} point to real files
- [ ] Descriptions add information beyond the title
- [ ] Changes are committed

### The Maintenance Mindset

Maintenance is not cleanup — it's cultivation. Each pass through old {DOMAIN:notes} is an opportunity to deepen the graph. Reweaving discovers connections that weren't visible when the {DOMAIN:notes} were first written. Health checks reveal structural gaps that point toward missing insights.

The graph doesn't just get maintained. It gets better.

### Unified Queue Reconciliation

Maintenance work lives alongside pipeline work in the same queue. Instead of a separate tracking file, /next evaluates conditions and materializes maintenance tasks directly in the queue.

The reconciliation pattern:
1. **Declare conditions** — the system defines what "healthy" looks like (desired state) via `maintenance_conditions` in the queue
2. **Measure actual state** — /next compares reality against each condition on every invocation
3. **Auto-create tasks** — when a condition is violated, a `type: "maintenance"` entry appears in the queue
4. **Auto-close tasks** — when the condition is satisfied again, the entry is marked done

This is idempotent: running /next any number of times produces the same queue state (no duplicates). Each `condition_key` has at most one pending maintenance task.

The key insight: you don't manage task status manually. Fix the underlying problem and the task goes away on its own.

### Invariant-Based Task Creation

The reconciliation checks 12 invariants that together define a healthy system:

| Invariant | What It Checks |
|-----------|---------------|
| Inbox pressure (per subdir) | Are {DOMAIN:inbox/} subdirectories accumulating unprocessed material? |
| Orphan {DOMAIN:notes} | Are there {DOMAIN:notes} with no incoming links? |
| Dangling links | Do wiki links point to non-existent {DOMAIN:notes}? |
| Observation accumulation | Have pending observations exceeded the threshold (10+)? |
| Tension accumulation | Have pending tensions exceeded the threshold (5+)? |
| {DOMAIN:Topic map} size | Has any {DOMAIN:topic map} grown beyond its healthy range? |
| Stale batches | Are there processing batches that have been sitting unfinished? |
| Infrastructure ideas | Are there improvement ideas waiting for review? |
| Pipeline pressure | Is the processing queue backing up? |
| Schema compliance | Do all {DOMAIN:notes} pass schema validation? |
| Experiment staleness | Are there experiments or trials that need evaluation? |

Each invariant is self-healing: fix the underlying issue (process the inbox, connect the orphan, resolve the tension) and the task disappears at next reconciliation. No manual status updates needed.

### Consequence-Speed Priority

Maintenance tasks are prioritized by how fast their consequences compound, not by manual importance labels:

| Consequence Speed | Priority | Examples | Why This Priority |
|-------------------|----------|----------|-------------------|
| `session` | Highest | Orphan {DOMAIN:notes}, dangling links, inbox pressure | These degrade your work quality right now — orphans are invisible, dangling links confuse traversal, inbox pressure means lost ideas |
| `multi_session` | Medium | Pipeline batch completion, stale batches | These compound over days — unfinished batches block downstream work |
| `slow` | Lower | {DOMAIN:Topic map} oversizing, rethink thresholds, infrastructure ideas | These compound over weeks — annoying but not blocking |

The principle: a task that causes problems THIS session matters more than one that compounds slowly. Priority is derived from the invariant's consequence speed, not assigned by you. This means you don't waste time triaging priority — the system knows.

### Integration with /{DOMAIN:next} and /{DOMAIN:rethink}

The unified queue connects to two key workflows:

**/{DOMAIN:next}** reconciles maintenance conditions and recommends the highest-priority action from the unified queue. It considers:
- Consequence speed (session-priority maintenance tasks first)
- Current pipeline state (are there claims waiting to be processed?)
- Accumulated signals (are observations or tensions piling up?)

This means you can start any session by asking "what should I work on?" and get a prioritized answer based on actual system state, not a stale to-do list.

**/{DOMAIN:rethink}** is surfaced automatically when /next detects signal accumulation:
- 10+ pending observations → /next creates a maintenance task suggesting /{DOMAIN:rethink}
- 5+ pending tensions → /next creates a maintenance task suggesting /{DOMAIN:rethink}

This closes the loop: maintenance detects that your system has accumulated enough operational evidence to warrant a meta-cognitive pass. You review the evidence, promote insights, implement changes, and the system evolves. Maintenance feeds evolution, evolution improves maintenance.
```

## Dependencies
Requires: wiki-links (link health checks depend on wiki link infrastructure), mocs (MOC coherence checks require MOC awareness)
