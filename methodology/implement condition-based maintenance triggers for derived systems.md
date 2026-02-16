---
description: Condition-based maintenance triggers for derived knowledge systems — what to check, when to check it, and how to fix it without time-based scheduling
kind: guidance
status: active
topics: ["[[maintenance-patterns]]"]
---

# implement condition-based maintenance triggers for derived systems

Knowledge systems decay. Links go stale, notes become orphaned, schemas drift, MOCs grow unwieldy, synthesis falls behind accumulation. Since [[maintenance operations are more universal than creative pipelines because structural health is domain-invariant]], the maintenance patterns that prevent this decay are largely the same across all domains.

This doc tells the plugin WHAT maintenance to generate, WHEN to trigger it, and HOW to implement it safely.

## Condition-Based, Not Time-Based

Traditional systems schedule maintenance: "Do a weekly review." "Run health checks monthly." This fails because:
1. The need for maintenance depends on activity, not time
2. Scheduled maintenance that finds nothing is wasted effort
3. Scheduled maintenance that misses a critical window causes damage

The plugin generates condition-based triggers instead: maintenance fires when a condition is violated, not when a calendar says so. Since [[maintenance scheduling frequency should match consequence speed not detection capability]], the constraint on check frequency is the propagation rate of problems, not the cost of running the check. A dangling link propagates instantly (agents trust it immediately). A stale description propagates over weeks (understanding evolves gradually). Matching frequency to consequence speed means the urgent checks run often and the slow checks run rarely, regardless of how cheap it would be to run them all constantly.

## The Three-Loop Architecture

Since [[three concurrent maintenance loops operate at different timescales to catch different classes of problems]], the plugin generates three concurrent maintenance loops. Each loop has a distinct character because the problems it targets cannot exist at other frequencies.

### Loop 1: Per-Operation (Immediate)

Runs on every note creation/modification. Lightweight checks that catch problems at the source. These operations are fully mechanical — they require zero judgment and produce deterministic results.

| Check | Trigger | Action |
|-------|---------|--------|
| Required schema fields present | Note created/modified | Warn if missing |
| Wiki link targets exist | Link added | Warn if dangling |
| Description exists and adds value | Note created | Warn if missing/redundant |
| Topics field populated | Note created | Warn if orphaned |

**Implementation:** PostToolUse hooks on Write operations. Zero friction — runs automatically, reports asynchronously.

**Why per-operation:** A malformed note that passes validation will be linked from MOCs, cited in other notes, and indexed for search — each consuming the broken state before any scheduled check could catch it. The fast loop catches problems that cannot wait.

### Loop 2: Post-Batch (After Processing)

Runs after a processing batch completes or at session start. Medium-weight checks that combine mechanical detection with judgment-requiring remediation.

| Check | Trigger | Action |
|-------|---------|--------|
| New notes connected to MOCs | Batch complete | Flag unconnected notes |
| Cross-references between batch siblings | Batch complete | Run cross-connect validation |
| Processing queue advanced | Phase complete | Verify phase transitions |
| Schema compliance across batch | Batch complete | Report compliance rate |
| qmd index matches file count | Session start | Sync if stale |
| Orphan notes exist | Session start | Flag for connection-finding |

**Implementation:** Post-processing skill step plus session-start reconciliation hook.

**Why post-batch:** Orphan accumulation propagates at session scale. An orphan note is equally orphaned whether you detect it after one minute or one hour, so per-event checking would waste the attention budget without catching problems faster.

### Loop 3: Condition-Triggered (Periodic)

Runs when conditions are violated, detected by reconciliation checks. Heavier analysis that looks at system-level health. Even detection at this level requires judgment.

| Condition | Threshold | Action |
|-----------|-----------|--------|
| MOC exceeds healthy size | >50 notes in a topic MOC | Suggest split |
| Notes stale | Not updated in 30+ days while topic is active | Flag for reweaving |
| Observation notes accumulate | >10 pending observations | Trigger meta-review |
| Tension notes accumulate | >5 pending tensions | Trigger meta-review |
| Inbox grows | >N items per subdirectory | Alert for processing |
| Processing queue stalls | Tasks pending >7 days | Alert for pipeline attention |
| Description quality low | Retrieval test failures >20% | Batch description improvement |
| Graph topology imbalanced | Sparse topics, bridge overload | Structural review |

**Implementation:** Reconciliation script runs at session start and on-demand. Since [[automated detection is always safe because it only reads state while automated remediation risks content corruption]], detection never causes harm.

**Why periodic:** Stale descriptions develop over weeks as understanding evolves. No individual write event signals the problem. Only system-level comparison of current state against desired state reveals the accumulated drift.

### How the Loops Compose

The key insight is that each loop has a different relationship between detection and remediation:

| Loop | Detection | Remediation | Automation Level |
|------|-----------|-------------|-----------------|
| Fast (per-op) | Identical to remediation | Blocks write, agent fixes | Fully automatic |
| Medium (per-batch) | Mechanical | Requires judgment | Detect automatically, suggest fixes |
| Slow (periodic) | Requires judgment | Requires deep judgment | Log for review |

Since [[confidence thresholds gate automated action between the mechanical and judgment zones]], the fast loop auto-applies, the medium loop suggests, and the slow loop logs for review. When loops overlap (both fast and medium might check for dangling links), since [[idempotent maintenance operations are safe to automate because running them twice produces the same result as running them once]], redundant detection across loops produces identical results rather than compounding.

## The Reconciliation Pattern

Since [[reconciliation loops that compare desired state to actual state enable drift correction without continuous monitoring]], the plugin's maintenance architecture inverts the traditional imperative model. Instead of reacting to events with "add this link" or "fix this schema," the system declares desired state and periodically measures divergence.

**The reconciliation table:**

| Desired State | Detection Method | Remediation |
|--------------|-----------------|-------------|
| All wiki links resolve | Dangling link check | Fix links or create target notes |
| All notes have descriptions | Schema validation | Add missing descriptions |
| All notes appear in topic MOCs | Coverage check | Add to appropriate MOC |
| Search index matches file count | Index freshness check | Re-index |
| Zero orphan notes | Backlink analysis | Connect or archive |
| MOCs under threshold size | Note count per MOC | Split into sub-MOCs |

**Why reconciliation matters:** Event-driven maintenance has a structural blind spot — it only catches problems that co-occur with events. Schema drift from template evolution, link rot from renames, index staleness from batch processing, MOC drift from organic growth — these accumulate silently between events. No hook fires when a template adds a new required field and a hundred existing notes quietly become non-compliant.

**The critical property:** The comparison itself is idempotent — checking whether all wiki links resolve produces the same answer regardless of how many times you run it, with no side effects. This means reconciliation detection can run at any frequency with zero risk.

## Idempotency: The Safety Requirement

Since [[idempotent maintenance operations are safe to automate because running them twice produces the same result as running them once]], any operation the plugin automates must converge to the same state regardless of how many times it executes. Hooks fire on events, and events can repeat. Scheduled maintenance runs on timers, and timers can overlap. Crash recovery reruns interrupted operations.

### Four Patterns for Idempotent Maintenance

**1. Compare-before-acting:** Check whether the desired state already exists before modifying anything. A hook that adds a note to a MOC first checks whether the note is already listed. If present, it does nothing. If absent, it adds the entry. Running this ten times produces the same result as running it once.

**2. Unique identifiers:** Prevent duplicates through identity. Claim numbers in a queue are globally unique and never reused, so re-running an extraction that already assigned claim-042 cannot create a second claim-042.

**3. Upsert semantics:** Operations that set state rather than modify state. "Ensure description exists" is idempotent because setting a value to what it already is changes nothing. "Append to description" is not idempotent because each execution adds more content.

**4. State-based declarations:** Declare desired end state rather than prescribing transitions. "Note should be in MOC" is idempotent. "Add note to MOC" is not, unless guarded by a presence check.

### The Two-Filter Automation Test

Before automating any maintenance operation, two tests must pass:

1. **Determinism test:** Would two reviewers always agree on the output? If yes, it's mechanical. If no, it requires judgment and belongs in a skill, not a hook.
2. **Idempotency test:** Does running the operation twice produce the same state as running it once? If no, it needs guards (compare-before-acting, unique IDs, upsert semantics) before it can be scheduled.

Both must pass for hook-level automation. Most structural health checks pass both trivially: validating a schema, detecting orphans, checking link integrity, and measuring MOC coherence all read state without modifying it, making them inherently safe to run on any schedule.

## The Detection-vs-Remediation Boundary

Since [[automated detection is always safe because it only reads state while automated remediation risks content corruption]], the plugin generates two classes of maintenance:

### Safe to Automate (Detection)
- Schema compliance checking
- Orphan note detection
- Dangling link detection
- MOC size monitoring
- Staleness detection
- Processing queue status
- Index freshness comparison

### Requires Human Judgment (Remediation)
- Fixing detected schema violations (might need domain understanding)
- Connecting orphan notes (requires semantic judgment)
- Splitting MOCs (requires understanding of conceptual boundaries)
- Resolving tensions (requires intellectual decision)
- Retiring stale notes (requires context about whether staleness matters)
- Choosing between competing fixes (multiple valid responses)

The plugin automates detection and presents remediation as actionable suggestions. Only fully mechanical fixes (like adding a missing date field or re-indexing a stale search index) can be automated; anything requiring semantic judgment is surfaced for human decision.

## Scaling Factors

The plugin adjusts maintenance intensity based on three scaling factors:

### Vault Size

| Size | Fast Loop | Medium Loop | Slow Loop |
|------|-----------|-------------|-----------|
| Small (<50 notes) | Standard schema checks | Session-start overview | Monthly review |
| Medium (50-200 notes) | Full schema + link checks | Session-start reconciliation | Bi-weekly graph analysis |
| Large (200+ notes) | Full checks, parallel where possible | Full reconciliation with coverage metrics | Weekly audits, automated trend detection |

At small scale, most maintenance is unnecessary because the entire vault fits in context. As the vault grows, each loop becomes progressively more important because problems compound across a larger surface area.

### Activity Rate

High-activity vaults (daily captures, frequent processing batches) need more aggressive medium-loop checks because drift accumulates faster. Low-activity vaults can reduce medium-loop frequency because less content changes between sessions.

The plugin scales the medium loop's inbox pressure thresholds and processing queue staleness thresholds based on observed activity patterns — a vault that processes 20 notes per week should flag a 7-day stall, while a vault that processes 2 notes per month should use a 30-day threshold.

### Domain Complexity

Multi-domain vaults need more maintenance than single-domain vaults because cross-domain interactions create additional failure modes. A therapy-plus-research vault needs both therapy-specific pattern staleness checks and research-specific citation checks, plus cross-domain integrity checks (do therapy notes that reference research claims point to current claims?).

## Domain-Specific Maintenance

While structural maintenance is universal, each domain has specific decay patterns:

### Research
- **Citation rot:** Sources become unavailable. Check: can source wiki links resolve?
- **Synthesis staleness:** Claims change but synthesis notes don't update. Check: has any linked claim been modified since synthesis was last touched?
- **Methodology drift:** Classification vocabulary shifts. Check: are methodology enum values consistent?

### Therapy
- **Pattern staleness:** Detected patterns not reviewed against new entries. Check: pattern record date vs newest mood entry
- **Strategy effectiveness drift:** Coping strategies rated effective may no longer work. Check: recent effectiveness ratings vs historical
- **Growth goal stagnation:** Goals set but progress markers not advancing. Check: growth goal progress vs time

### Project Management
- **Stale risks:** Risk register not reviewed. Check: last_reviewed date on risk entries
- **Orphaned decisions:** Decisions made but not linked to stakeholders. Check: decision notes without stakeholder links
- **Action item decay:** Meeting action items not tracked to completion. Check: open action items older than 2 weeks

### Creative Writing
- **Continuity gaps:** Worldbuilding facts referenced but not defined. Check: wiki links to undefined world elements
- **Character arc stalls:** Characters without recent scene appearances. Check: last_appearance field currency
- **Plot thread abandonment:** Foreshadowing without resolution. Check: foreshadowing notes without resolution links

### Health and Wellness
- **Tracking gaps:** Missing data points in consistent series. Check: date continuity in workout/nutrition/sleep logs
- **Protocol staleness:** Supplement or training protocols not reassessed. Check: protocol start_date vs last effectiveness assessment
- **Correlation blindness:** Enough data accumulated for pattern detection but no analysis run. Check: data volume thresholds

### Trading and Finance
- **Strategy drift:** Actual trades deviating from strategy rules. Check: recent trade parameters vs strategy definitions
- **Thesis invalidation:** Market conditions have changed but thesis notes not reviewed. Check: thesis date vs last market analysis
- **Performance tracking gaps:** Missing win/loss data on closed positions. Check: completeness of outcome fields

## Anti-Patterns

| Anti-Pattern | Why It Fails | Better Approach |
|-------------|-------------|-----------------|
| Time-based scheduling only | Wastes effort on empty checks, misses critical windows | Condition-based triggers |
| Automating remediation | Content corruption risk | Automate detection, suggest remediation |
| Same maintenance for all domains | Domain-specific decay patterns missed | Universal structural + domain-specific checks |
| No maintenance at all | Since [[structure without processing provides no value]], unmaintained vaults decay | At minimum: orphan detection + schema compliance |
| Over-maintenance | Spending more time maintaining than creating | Focus on high-consequence checks first |
| Non-idempotent automation | Repeated execution corrupts state | Apply four idempotency patterns before automating |

## Domain Examples

These domain compositions demonstrate maintenance patterns in practice:

- [[therapy journal uses warm personality with pattern detection for emotional processing]] — Pattern staleness detection (patterns not reviewed against new entries), coping strategy effectiveness drift, growth goal stagnation monitoring
- [[project management uses decision tracking with stakeholder context]] — Stale risk registers, orphaned decisions without stakeholder links, action item decay beyond 2-week threshold
- [[creative writing uses worldbuilding consistency with character tracking]] — Continuity gap detection (world rules referenced but undefined), character arc stalls (no recent scene appearances), plot thread abandonment (foreshadowing without resolution)
- [[health wellness uses symptom-trigger correlation with multi-dimensional tracking]] — Tracking gap detection (missing data points in series), protocol staleness (supplements/programs not reassessed), correlation blindness trigger (enough data accumulated for pattern analysis but none run)
- [[engineering uses technical decision tracking with architectural memory]] — ADR assumption monitoring, postmortem action item completion tracking, documentation rot detection via code change correlation
- [[trading uses conviction tracking with thesis-outcome correlation]] — Strategy drift detection (actual trades deviating from strategy rules), thesis invalidation checking against new market data

## Grounding

This guidance is grounded in:
- [[maintenance operations are more universal than creative pipelines because structural health is domain-invariant]] — universal maintenance
- [[three concurrent maintenance loops operate at different timescales to catch different classes of problems]] — loop architecture
- [[automated detection is always safe because it only reads state while automated remediation risks content corruption]] — detection vs remediation
- [[maintenance scheduling frequency should match consequence speed not detection capability]] — frequency calibration
- [[reconciliation loops that compare desired state to actual state enable drift correction without continuous monitoring]] — reconciliation pattern
- [[idempotent maintenance operations are safe to automate because running them twice produces the same result as running them once]] — idempotency requirement
- [[confidence thresholds gate automated action between the mechanical and judgment zones]] — gating automated remediation
- [[structure without processing provides no value]] — why maintenance is non-optional

---

Topics:
- [[index]]
- [[index]]
---

Topics:
- [[maintenance-patterns]]
