# Knowledge System Failure Modes

How knowledge systems die. The init wizard uses this to include domain-specific warnings in generated context files, preventing the most common decay patterns before they start.

---

## The 10 Failure Modes

### 1. Collector's Fallacy

**What:** Accumulating without processing. Inbox grows indefinitely, nothing gets synthesized.

**Why it happens:** Capture is easy and feels productive. Processing is hard and feels slow. The gap widens until the inbox becomes psychologically overwhelming.

**Vulnerable domains:** All (universal). Especially dangerous for Research and Learning where source material is abundant.

**Prevention:**
- Processing pipeline with explicit reduce phase
- WIP limits on inbox (process before adding more)
- Condition-based inbox review (trigger when inbox exceeds threshold)
- Visible inbox count as friction signal

**Warning signs:** Inbox > 20 items. New captures outnumber processed items 3:1.

---

### 2. Orphan Drift

**What:** Notes created but never connected to the graph. The system fragments into disconnected islands.

**Why it happens:** Creation feels complete without connection. The reflect phase gets skipped "just this once" which becomes always.

**Vulnerable domains:** Research, Learning — high creation volume without mandatory connection.

**Prevention:**
- Mandatory reflect phase after every note creation
- MOC maintenance as part of the creation workflow
- Periodic orphan detection (health check)
- Topics footer as minimum connection requirement

**Warning signs:** >10% of notes have no incoming wiki-links. MOCs not updated in 30+ days.

---

### 3. Link Rot

**What:** Wiki-links pointing to notes that were renamed or deleted. The graph develops dead ends.

**Why it happens:** Manual renames don't update references. Archiving notes breaks incoming links.

**Vulnerable domains:** All systems with heavy linking. Worse at scale.

**Prevention:**
- Rename scripts that update all references
- Periodic link health checks
- Never delete — archive instead (preserves link targets)
- Dangling link detection in health checks

**Warning signs:** >5% of wiki-links resolve to nothing. Rename operations done without reference updates.

---

### 4. Schema Erosion

**What:** YAML fields inconsistently used, enum values drift from template, validation ignored.

**Why it happens:** Schemas add friction at capture time. Without enforcement, the path of least resistance is skipping fields.

**Vulnerable domains:** Systems with moderate+ schema density. Research and Learning systems with many required fields.

**Prevention:**
- Templates as single source of truth (never define schema in two places)
- Validation automation (hooks or batch scripts)
- Minimal viable schema — only require fields that are actively queried
- Schema evolution: add fields when querying need emerges, remove fields nobody uses

**Warning signs:** >20% of notes missing required fields. Enum values appearing that aren't in the template.

---

### 5. MOC Sprawl

**What:** Too many MOCs created, none properly maintained. Navigation overhead exceeds navigation value.

**Why it happens:** Creating a MOC feels like organizing. But an unmaintained MOC is worse than no MOC — it provides false confidence about topic coverage.

**Vulnerable domains:** Research, Creative — domains where topics proliferate.

**Prevention:**
- Create MOCs only at 20+ related notes (not speculatively)
- Merge small MOCs back when they have <10 notes
- MOC health checks (size, freshness, coverage)
- Max 4 tiers of hierarchy

**Warning signs:** MOCs with <5 links. MOCs not updated in 60+ days. >50% of MOCs with no recent additions.

---

### 6. Verbatim Risk

**What:** Copying content instead of transforming it. Storage without the generation effect.

**Why it happens:** Copy-paste is faster than reformulation. The agent (or human) takes the shortcut, producing notes that are summaries rather than claims.

**Vulnerable domains:** Research, Learning — where source material is dense and tempting to reproduce.

**Prevention:**
- Generation effect gate: every note must transform, not just store
- The composability test: "This note argues that [title]" — if it doesn't work, it's not a claim
- Source attribution separates the original from the transformation
- Review for paraphrase vs genuine reformulation

**Warning signs:** Notes that read like summaries. Titles that are topic labels, not claims. Notes with no original reasoning.

---

### 7. Cognitive Outsourcing

**What:** Delegating judgment entirely to the system until the human can no longer evaluate quality.

**Why it happens:** The system gets good enough that the human stops checking. Quality drifts without the human noticing.

**Vulnerable domains:** Research (unchecked claims compound), Therapy (pattern detection without human validation).

**Prevention:**
- Periodic human review of recent notes
- Never auto-implement system changes (propose, don't execute)
- Maintain human judgment checkpoints in the pipeline
- Flag confidence levels: the system should express uncertainty

**Warning signs:** Human hasn't reviewed notes in 30+ days. System changes implemented without review. No recent human corrections.

---

### 8. Over-Automation

**What:** Hooks encoding judgment rather than verification, corrupting quality silently.

**Why it happens:** Automation feels like progress. The boundary between "check if description exists" (verification) and "write a good description" (judgment) blurs.

**Vulnerable domains:** Any system at automation level. Especially dangerous when moving from convention to full automation.

**Prevention:**
- Determinism boundary: hooks for verification (does X exist?), skills for judgment (is X good?)
- Automation should fail loudly, not fix silently
- Review hook behavior when false positives or silent failures are suspected — are they catching errors or hiding them?
- Graduated enforcement: warn before block

**Warning signs:** Hooks auto-fixing content. Quality metrics look perfect but notes feel shallow. No validation failures (suspicious — real systems produce errors).

---

### 9. Productivity Porn

**What:** Building the system instead of using it. Meta-work displaces the actual knowledge work.

**Why it happens:** System design is interesting and feels productive. The actual work (processing, connecting, synthesizing) is harder and less visible.

**Vulnerable domains:** All (universal). Especially dangerous for system builders and meta-researchers.

**Prevention:**
- Gall's Law: complex systems evolve from simple ones that work. Ship the minimum viable system.
- Time-box system improvement to <20% of total work time
- Track content creation vs system modification ratio
- "Would I rather be right about methodology or have a working knowledge base?"

**Warning signs:** More time on CLAUDE.md than on notes. System redesigns before 100 notes. Template modifications outnumber note creations.

---

### 10. Temporal Staleness

**What:** Content becomes outdated but isn't flagged. Old notes presented as current.

**Why it happens:** Knowledge systems don't inherently track temporal validity. A note written 6 months ago appears identical to one written yesterday.

**Vulnerable domains:** Gaming strategy (meta shifts), PM (project status changes), any time-sensitive domain.

**Prevention:**
- `meta_state` or staleness fields in schema (current/outdated/speculative)
- Maintenance condition thresholds matched to domain's rate of change
- Periodic staleness sweeps (flag notes older than N days for review)
- Date-aware health checks

**Warning signs:** Notes referencing outdated information. No maintenance activity in domains with high change rates.

---

## Domain Vulnerability Matrix

Which failure modes are highest risk per use case. Select the top 3-4 for inclusion in the generated context file's "Common Pitfalls" section.

| Failure Mode | Research | Learning | Therapy | Relationships | Creative | PM | Companion |
|-------------|----------|----------|---------|---------------|----------|-----|-----------|
| Collector's Fallacy | HIGH | HIGH | medium | low | medium | medium | low |
| Orphan Drift | HIGH | HIGH | medium | low | medium | low | low |
| Link Rot | medium | medium | low | low | medium | low | low |
| Schema Erosion | medium | medium | medium | medium | low | medium | low |
| MOC Sprawl | HIGH | medium | low | low | medium | low | low |
| Verbatim Risk | HIGH | HIGH | low | low | low | low | low |
| Cognitive Outsourcing | HIGH | medium | HIGH | low | medium | low | medium |
| Over-Automation | medium | medium | medium | low | low | medium | low |
| Productivity Porn | HIGH | medium | low | low | medium | HIGH | low |
| Temporal Staleness | low | medium | low | low | low | HIGH | low |

**Reading the matrix:** Include all HIGH-risk modes in the generated context file. Mention medium-risk modes briefly. Omit low-risk modes.

---

## Integration with Init

When generating a context file in Step 5b, include a "Common Pitfalls" section:

1. Look up the user's use case in the domain vulnerability matrix
2. Select all HIGH-risk failure modes (typically 3-4)
3. Write each warning in domain-native vocabulary
4. Include the prevention pattern, not just the warning
5. Place after Self-Extension Blueprints, before System Evolution

Example for Research:
```markdown
## Common Pitfalls

### The Collector's Fallacy
Saving sources feels productive but isn't. If your inbox grows faster than you process it, stop capturing and start extracting. WIP limit: process what you have before adding more.

### Orphan Notes
A note without connections is a note that will never be found again. Every note needs at least one MOC link (Topics footer) and ideally inline connections to related notes. Run health checks to catch orphans.

### Verbatim Copying
Summarizing a source is not the same as extracting a claim. Each note must transform the material — your words, your framing, your argument. If the title doesn't pass "This note argues that [title]", it's not a claim yet.

### Productivity Porn
It's tempting to keep perfecting the system instead of using it. The vault serves the research, not the other way around. If you're spending more time on methodology than on claims, recalibrate.
```
