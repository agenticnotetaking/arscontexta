---
description: Personal assistant knowledge system — inspirational composition showing derived architecture for life area management, goal tracking, habit formation, and review automation
kind: example
domain: companion
topics: ["[[domain-compositions]]"]
---

# personal assistant uses life area management with review automation

An inspirational composition showing what an agent-operated personal life management system looks like when derived from first principles. This is not a template to copy but a worked example demonstrating how the 8 configuration dimensions, universal kernel, and domain-native vocabulary compose into a coherent system.

## Persona

**Maya, 34, product manager at a mid-size tech company.** She juggles career advancement, a young family (partner Alex, daughter Iris age 3), fitness goals she keeps abandoning, and a vague sense that her finances need more attention than they get. She has tried Notion templates, Todoist, Apple Reminders, and a half-abandoned Bullet Journal. Each system lasted 3-6 months before maintenance overhead killed it.

What Maya actually needs is not another task manager. She needs something that notices when she has not thought about her health in three weeks, that surfaces the connection between her sleep quality and her sprint performance, that prepares her weekly review so she can do it in 15 minutes instead of 45. She needs a system that does the maintenance work she always abandons, so the system survives past the honeymoon phase.

Her agent's name is Vera. Vera remembers everything Maya tells her, tracks commitments across every life area, and gently flags when something important is slipping. Maya talks to Vera daily for 5-10 minutes. Vera does the organizational work between conversations.

## Configuration

The 8 dimensions as derived for personal life management:

| Dimension | Position | Rationale |
|-----------|----------|-----------|
| **Granularity** | Moderate — one note per area, project, goal, habit, or review | Life management deals with ongoing entities (areas) and bounded outcomes (projects), not atomic claims. A single "Health" area note accumulates context over months. Granularity is entity-level, not assertion-level. |
| **Organization** | Flat with type-based sections in MOCs | Areas, projects, goals, and habits all live in one `notes/` directory. MOCs organize by life area (health, career, family, finance). No nested folders because a project can span multiple areas. |
| **Linking** | Explicit with relationship context | Every project links to its parent area. Every goal links to the area it serves. Every habit links to the goal it supports. Relationship phrases explain WHY connections exist: `[[morning-run]] -- supports energy levels for deep work blocks`. |
| **Metadata** | Medium density — domain-native fields per note type | Areas need `status`, `review_frequency`, `health_indicator`. Projects need `area`, `deadline`, `next_action`. Dense enough for programmatic review preparation but not so dense that capture becomes a chore. |
| **Processing** | Light-to-medium — capture, route, review cycle | Content arrives conversationally ("Vera, I signed up for a half-marathon in October"). Vera routes it: create a goal, link to health area, derive milestones, create supporting habits. No heavy extract-reflect-reweave pipeline because the content is already first-person and actionable. |
| **Formalization** | Convention-first, automating toward hooks | Start with written conventions in the context file. As Maya's patterns stabilize (she always reviews on Sunday mornings), introduce hooks that prepare the review agenda automatically. Schema validation arrives after month 2, not day 1. |
| **Review** | Weekly cadence with monthly and quarterly layers | Weekly: scan all areas, check project progress, review habits. Monthly: assess goal progress, adjust timelines. Quarterly: life audit across all areas, set new goals. The agent prepares each review by surfacing what changed since the last one. |
| **Scope** | Single-user, all life domains | One person, one agent, all areas of life. The value comes from cross-area pattern detection that siloed apps cannot provide. |

## Vault Structure

```
vault/
├── self/
│   ├── identity.md              # Vera's personality and relationship with Maya
│   ├── preferences.md           # Maya's communication preferences, energy patterns
│   └── memory/                  # Vera's operational memory
│       ├── patterns-noticed.md  # Cross-area patterns Vera has detected
│       └── review-history.md    # What previous reviews surfaced
├── notes/                       # All knowledge notes (flat)
│   ├── health.md                # Area MOC
│   ├── career.md                # Area MOC
│   ├── family.md                # Area MOC
│   ├── finances.md              # Area MOC
│   ├── creative.md              # Area MOC
│   ├── half-marathon-october.md # Goal
│   ├── morning-run.md           # Habit
│   ├── sleep-tracking.md        # Habit
│   ├── q1-performance-review.md # Project
│   ├── iris-preschool-search.md # Project
│   ├── emergency-fund.md        # Goal
│   ├── weekly-meal-prep.md      # Habit
│   ├── 2026-02-09-review.md     # Weekly review
│   ├── 2026-02-monthly.md       # Monthly review
│   └── ...
├── inbox/                       # Quick captures before routing
│   └── ...
├── archive/                     # Completed projects, achieved goals
│   └── ...
└── ops/
    ├── templates/               # Note type templates with schemas
    │   ├── area.md
    │   ├── project.md
    │   ├── goal.md
    │   ├── habit.md
    │   └── review.md
    ├── derivation.md            # Why this system is configured this way
    └── health/                  # Health check results
        └── ...
```

## Note Schemas

### Area

```yaml
---
description: Ongoing responsibility that requires sustained attention and periodic review
type: area
status: active | neglected | thriving
review_frequency: weekly | biweekly | monthly
health_indicator: green | yellow | red
last_reviewed: 2026-02-09
related_projects: ["[[half-marathon-october]]", "[[morning-run]]"]
topics: ["[[life-areas]]"]
---
```

### Project

```yaml
---
description: Bounded outcome with a clear definition of done
type: project
area: "[[career]]"
status: active | waiting | completed | dropped
deadline: 2026-03-15
next_action: Draft self-assessment document
energy_required: high | medium | low
desired_outcome: Strong Q1 review positioning for senior PM promotion
topics: ["[[career]]"]
relevant_notes: ["[[career]] -- parent area", "[[public-speaking-practice]] -- supports presentation skills for review"]
---
```

### Goal

```yaml
---
description: Measurable objective with a target date and success criteria
type: goal
area: "[[health]]"
target_date: 2026-10-18
metrics: ["Complete half marathon", "Sub-2:15 finish time"]
status: on-track | at-risk | behind | achieved
milestones:
  - "Run 10K without stopping by April"
  - "Complete 15K training run by July"
  - "Race-pace 10K by September"
current_milestone: "Run 10K without stopping by April"
topics: ["[[health]]"]
relevant_notes: ["[[morning-run]] -- daily habit supporting this goal", "[[sleep-tracking]] -- recovery quality affects training"]
---
```

### Habit

```yaml
---
description: Recurring behavior linked to a goal or area, tracked for consistency
type: habit
frequency: daily | weekdays | 3x-week | weekly
area: "[[health]]"
supporting_goal: "[[half-marathon-october]]"
current_streak: 12
longest_streak: 23
trigger_cue: Alarm at 6:15, running shoes by bedroom door
difficulty: moderate
topics: ["[[health]]"]
---
```

### Review

```yaml
---
description: Periodic life assessment covering area health and project progress
type: review
review_type: weekly | monthly | quarterly
date: 2026-02-09
areas_covered: ["[[health]]", "[[career]]", "[[family]]", "[[finances]]", "[[creative]]"]
mood: energized | neutral | stressed | reflective
topics: ["[[reviews]]"]
---
```

## Example Notes

### Area: Health

```markdown
---
description: Physical and mental wellbeing — exercise, nutrition, sleep, stress management
type: area
status: active
review_frequency: weekly
health_indicator: yellow
last_reviewed: 2026-02-09
related_projects: ["[[half-marathon-october]]", "[[morning-run]]", "[[sleep-tracking]]", "[[weekly-meal-prep]]"]
topics: ["[[life-areas]]"]
---

# health

Physical and mental wellbeing. This area covers exercise routines, nutrition habits,
sleep quality, and stress management. Currently yellow because sleep has been
inconsistent since Iris started waking up at 5am, and that is cascading into
skipped morning runs.

## Active Goals
- [[half-marathon-october]] -- target race in October, currently building base mileage
- [[emergency-fund]] -- financial stress reduction supports mental health

## Active Habits
- [[morning-run]] -- 3x/week, current streak: 12 days (streak counts adherence days)
- [[sleep-tracking]] -- daily, identifying patterns between sleep quality and performance
- [[weekly-meal-prep]] -- Sunday batch cooking, reducing weeknight decision fatigue

## Patterns Vera Has Noticed
- Weeks with 3+ runs correlate with higher self-reported energy in career check-ins
- Sleep quality drops on nights after screen time past 9:30pm
- Meal prep compliance drops when Sunday is socially booked

## Current Tensions
The half-marathon goal requires increasing mileage, but Iris's early wake-ups
are cutting into morning run windows. Options: switch to evening runs (conflicts
with family time), run during lunch (requires gym shower access at office), or
adjust wake-up earlier (already sleep-deprived). No clean solution yet.

---

Relevant Notes:
- [[career]] -- energy from health directly affects deep work capacity
- [[family]] -- Iris's sleep schedule is the binding constraint on morning routine
```

### Goal: Half-Marathon October

```markdown
---
description: Complete the Portland half-marathon on October 18th in under 2 hours 15 minutes
type: goal
area: "[[health]]"
target_date: 2026-10-18
metrics: ["Complete half marathon", "Sub-2:15 finish time"]
status: on-track
milestones:
  - "Run 10K without stopping by April"
  - "Complete 15K training run by July"
  - "Race-pace 10K by September"
current_milestone: "Run 10K without stopping by April"
topics: ["[[health]]"]
relevant_notes: ["[[morning-run]] -- daily habit supporting this goal", "[[sleep-tracking]] -- recovery quality affects training capacity"]
---

# half-marathon-october

Complete the Portland half-marathon on October 18th. Target time: sub-2:15.
This is the first distance event since college and represents a commitment to
taking health seriously rather than treating it as the area that absorbs slack
from career and family demands.

## Why This Matters
Every previous fitness goal has been vague ("get in shape," "run more"). This one
has a date, a distance, and a time. It cannot be fudged. Since [[morning-run]]
is the daily habit supporting this, the goal gives the habit stakes it would not
have on its own.

## Current Progress
- Base: can run 5K comfortably at 6:30/km pace
- Next milestone: 10K without stopping by April (8 weeks away)
- Training plan: 3 runs/week (2 easy, 1 tempo), increasing distance 10%/week

## Dependencies
- [[morning-run]] consistency — the training only works if runs happen
- [[sleep-tracking]] data — recovery quality determines whether mileage increases
  are sustainable or injury-producing
- [[weekly-meal-prep]] — nutrition supports training load

## Risk
Biggest risk is not fitness but scheduling. If morning runs keep getting disrupted
by Iris's sleep, the training plan falls apart. Need a backup running window.

---

Relevant Notes:
- [[health]] -- parent area
- [[morning-run]] -- the habit that makes this goal possible
- [[sleep-tracking]] -- recovery data informing training decisions
```

### Habit: Morning Run

```markdown
---
description: Three morning runs per week building toward half-marathon base fitness
type: habit
frequency: 3x-week
area: "[[health]]"
supporting_goal: "[[half-marathon-october]]"
current_streak: 12
longest_streak: 23
trigger_cue: Alarm at 6:15, running shoes by bedroom door
difficulty: moderate
topics: ["[[health]]"]
---

# morning-run

Three runs per week — Monday, Wednesday, Friday mornings before work.
Currently building from 5K base toward 10K milestone for the
[[half-marathon-october]] goal.

## Structure
- Monday: easy 5K at conversational pace
- Wednesday: tempo run, shorter distance but faster
- Friday: long run, extending distance each week

## What Breaks This Habit
Iris waking before 6am is the primary disruptor. When she wakes early, Alex
handles her, but the guilt of leaving a tired partner with a cranky toddler
makes it hard to walk out the door. Secondary disruptor: poor sleep quality
(tracked in [[sleep-tracking]]) makes the alarm feel impossible.

## What Supports This Habit
Running shoes visible by the bedroom door (cue). Coffee maker programmed to
brew at 6:10 (reward anticipation). Tracking streak in this note (accountability).
The [[half-marathon-october]] goal gives the habit weight it would not have
as "just exercise."

## Streak History
- Current: 12 adherence days (started 2026-01-27)
- Longest: 23 adherence days (2025-11-04 to 2025-12-08, broken by flu)
- Pattern: streaks break around illness, travel, or schedule disruption, not motivation

---

Relevant Notes:
- [[half-marathon-october]] -- the goal this habit serves
- [[sleep-tracking]] -- poor sleep quality predicts skipped runs
- [[health]] -- parent area
```

### Weekly Review: February 9

```markdown
---
description: Weekly review covering all five life areas with special attention to health-career tension
type: review
review_type: weekly
date: 2026-02-09
areas_covered: ["[[health]]", "[[career]]", "[[family]]", "[[finances]]", "[[creative]]"]
mood: reflective
topics: ["[[reviews]]"]
---

# 2026-02-09 review

## Area Health Snapshot
| Area | Status | Trend | Key Signal |
|------|--------|-------|------------|
| [[health]] | yellow | stable | Running streak intact but sleep still inconsistent |
| [[career]] | green | improving | Q1 review prep on track, got positive stakeholder feedback |
| [[family]] | green | stable | Iris adjusting to new preschool schedule |
| [[finances]] | yellow | stable | Emergency fund at 60% of target, no unexpected expenses |
| [[creative]] | red | declining | No writing in 3 weeks, pushed out by other priorities |

## Wins This Week
- Hit day 12 of morning run streak despite two early Iris wake-ups
- Career: stakeholder alignment meeting went well, VP noticed
- Family: found a promising preschool for fall enrollment

## Tensions Surfaced
- Creative area has been red for three consecutive weeks. This is the classic
  "absorbs slack" pattern — when other areas get busy, creative is the first to
  lose time. Need to either commit to a minimum creative block or acknowledge
  it is not actually a priority right now.
- Health and career are in mild tension: the Q1 review prep wants evening hours
  that would otherwise be for decompression and better sleep.

## Vera's Observations
- The creative area has been neglected for 3 consecutive weekly reviews.
  Previous pattern: creative neglect lasting 4+ weeks correlates with
  increased stress reporting in reviews. Consider whether a minimal
  creative commitment (even 30 min/week) would serve as stress relief
  rather than competing with other areas.
- Sleep quality on Tuesday and Thursday (non-run days) is consistently
  better. Current training schedule may benefit from a Tuesday/Thursday/
  Saturday rotation instead of MWF.

## Next Week Focus
1. Career: draft self-assessment for Q1 review
2. Health: test Thursday morning run to evaluate alternative schedule
3. Creative: commit to one 30-minute writing block, Wednesday evening

---

Relevant Notes:
- [[2026-02-02-review]] -- previous weekly review for trend comparison
- [[health]] -- yellow for third week, sleep the binding constraint
- [[creative]] -- red for third week, needs decision on commitment level
```

### Project: Q1 Performance Review

```markdown
---
description: Prepare and execute Q1 performance review to position for senior PM promotion
type: project
area: "[[career]]"
status: active
deadline: 2026-03-15
next_action: Draft self-assessment using stakeholder feedback themes
energy_required: high
desired_outcome: Strong review establishing promotion candidacy for H2
topics: ["[[career]]"]
relevant_notes: ["[[career]] -- parent area", "[[half-marathon-october]] -- example of goal-setting discipline transferring across areas"]
---

# q1-performance-review

Prepare for Q1 review cycle closing March 15. The goal is not just a good review
but positioning for senior PM promotion consideration in H2. This means the
self-assessment needs to tell a coherent story about scope expansion and
stakeholder impact.

## Evidence to Compile
- Led cross-functional alignment for Project Meridian (3 teams, shipped on time)
- Stakeholder feedback: VP Chen's comment about "proactive communication"
- Mentoring: onboarded two junior PMs this quarter
- Process improvement: sprint retro format adopted by two other teams

## Preparation Steps
1. Compile impact metrics from Meridian launch
2. Request written feedback from 3 key stakeholders
3. Draft self-assessment organized by promotion criteria
4. Practice 5-minute narrative for review meeting
5. Prepare "growth areas" section (authentic, not performative)

## Connection to Larger Career Arc
This review is one checkpoint on a multi-quarter promotion trajectory.
Since [[career]] tracks the broader arc, this project captures the
specific bounded work of preparing for one review cycle.

## Risk
Over-preparing the career case at the expense of [[health]] and [[family]].
Previous Q4 review prep consumed 3 weekday evenings. Budget 2 this time.

---

Relevant Notes:
- [[career]] -- parent area with long-term promotion trajectory
- [[health]] -- guard against review prep consuming recovery time
```

## Processing Workflow

Content flows through a lightweight capture-route-review cycle adapted for conversational interaction:

### 1. Capture
Maya talks to Vera throughout the day. "Vera, I signed up for a half-marathon in October." "Vera, Iris's preschool interview is March 3." "Vera, I've been sleeping terribly this week." Everything lands in `inbox/` as a raw capture with timestamp and context.

### 2. Route
Vera processes inbox items by:
- Identifying the note type (is this a goal? a project? a data point for an existing habit?)
- Finding the relevant area
- Creating or updating the appropriate note
- Linking to related notes with relationship context

For Maya's half-marathon signup: create a goal note linked to health area, derive milestones from the timeline, identify supporting habits needed (running, nutrition, sleep), create habit notes if they do not exist.

### 3. Connect
After routing, Vera checks for cross-area implications:
- Does this new goal create time pressure on existing commitments?
- Does it relate to goals in other areas? (The half-marathon discipline might model for career goal-setting)
- Are there existing habits that support or conflict with the new commitment?

### 4. Review (Agent-Prepared)
Weekly reviews are the heartbeat. Vera prepares the review agenda by:
1. Scanning all area MOCs for `health_indicator` changes
2. Checking habit streak data for disruption patterns
3. Identifying areas not mentioned in captures since the last review
4. Surfacing cross-area patterns from `self/memory/patterns-noticed.md`
5. Flagging approaching deadlines and stale projects

Maya reviews Vera's prepared agenda and makes decisions. Vera records decisions and updates notes. The review takes 15 minutes instead of 45 because the synthesis work is already done.

### 5. Maintain
Between reviews, Vera runs continuous maintenance:
- Habit streaks update daily based on check-in data
- Project `next_action` fields get stale-checked (no update in 7+ days triggers a nudge)
- Area health indicators auto-adjust: 3+ weeks without captures in an area shifts indicator toward red
- Someday/maybe items get periodic resurfacing when context changes make them relevant

## MOC Structure

### Hub: Life Areas

```markdown
---
description: Navigation hub for all life areas — the top-level view of Maya's world
type: moc
topics: []
---

# life-areas

Five active areas of responsibility, each with its own MOC tracking projects,
goals, habits, and patterns.

## Areas
- [[health]] -- physical and mental wellbeing, currently yellow due to sleep disruption
- [[career]] -- professional growth and daily work, green with Q1 review approaching
- [[family]] -- partnership with Alex, parenting Iris, green and stable
- [[finances]] -- savings, spending, planning, yellow with emergency fund building
- [[creative]] -- writing and personal projects, red for three weeks running

## Cross-Area Patterns
Vera tracks patterns that span areas. Current observations:
- Health energy directly predicts career deep work capacity
- Creative neglect beyond 4 weeks correlates with elevated stress in reviews
- Financial stress and sleep quality show weak negative correlation

## Reviews
- [[reviews]] -- MOC linking all weekly, monthly, and quarterly reviews
```

### Area MOC: Career

```markdown
---
description: Professional growth — role performance, skill development, promotion trajectory, workplace relationships
type: moc
status: active
review_frequency: weekly
health_indicator: green
last_reviewed: 2026-02-09
topics: ["[[life-areas]]"]
---

# career

Professional growth and daily work performance. Currently green: Q1 review prep
is on track and stakeholder relationships are strong.

## Active Projects
- [[q1-performance-review]] -- deadline March 15, next action is self-assessment draft
- [[mentoring-junior-pms]] -- ongoing, two mentees this quarter

## Active Goals
- Senior PM promotion candidacy by H2 2026
- Build public speaking confidence (3 presentations by Q2)

## Habits Supporting Career
- [[deep-work-blocks]] -- 2 hours blocked daily, 9-11am
- [[stakeholder-checkins]] -- bi-weekly informal touchpoints with cross-functional leads

## Patterns Vera Has Noticed
- Deep work compliance drops on days following poor sleep
  (connection to [[health]] via [[sleep-tracking]])
- Weeks with 2+ stakeholder check-ins correlate with higher
  "momentum" self-reports in reviews

## Tensions
- Review prep competes with health recovery time in evenings
- Promotion timeline may conflict with family planning discussions

---

Relevant Notes:
- [[health]] -- energy from health directly affects deep work capacity
- [[family]] -- promotion timeline intersects with family planning
- [[finances]] -- promotion would meaningfully change savings trajectory
```

## Graph Query Examples

```bash
# Find all neglected areas (yellow or red for 2+ weeks)
rg '^health_indicator: (yellow|red)' notes/ -l | while read f; do
  last=$(rg '^last_reviewed:' "$f" | cut -d' ' -f2)
  echo "$f last reviewed: $last"
done

# Find habits with broken streaks (current_streak < 3)
rg '^current_streak: [0-2]$' notes/ -l

# List all projects by area with status
rg -l '^type: project' notes/ | while read f; do
  area=$(rg '^area:' "$f" | head -1)
  status=$(rg '^status:' "$f" | head -1)
  echo "$(basename "$f") | $area | $status"
done

# Find areas not mentioned in any review for 3+ weeks
rg '^areas_covered:' notes/ | sort -t: -k2 | tail -5

# Cross-area dependency check: which goals depend on habits in other areas
rg '^supporting_goal:' notes/ | while read line; do
  habit_file=$(echo "$line" | cut -d: -f1)
  habit_area=$(rg '^area:' "$habit_file" | head -1)
  goal=$(echo "$line" | cut -d'"' -f2)
  goal_file=$(find notes/ -name "$(echo $goal | sed 's/\[\[//;s/\]\]//').md")
  if [ -n "$goal_file" ]; then
    goal_area=$(rg '^area:' "$goal_file" | head -1)
    if [ "$habit_area" != "$goal_area" ]; then
      echo "CROSS-AREA: $(basename $habit_file) ($habit_area) supports $goal ($goal_area)"
    fi
  fi
done
```

## What Makes This Domain Unique

**1. Entity-centric, not assertion-centric.** Research vaults deal in claims — atomic assertions that can be true or false. Personal assistant vaults deal in entities: areas of responsibility, projects with deadlines, habits with streaks. The fundamental unit is not "what do I believe" but "what am I responsible for." This shifts granularity from atomic to entity-level, changes linking from "extends/contradicts" to "belongs-to/supports/conflicts-with," and makes status tracking (active, neglected, completed) a first-class concern that research vaults do not need.

**2. Time is a structural dimension.** Research notes are timeless — a claim is true or not regardless of when it was written. Personal assistant notes exist in time: projects have deadlines, habits have streaks, areas have review cadences. The temporal dimension means the agent must not only store and connect but also schedule and remind. Reviews are not optional maintenance but the core value loop. A research vault that skips reviews for a month is merely behind. A personal assistant vault that skips reviews for a month has lost track of reality.

**3. The review IS the product.** In a research vault, the product is the knowledge graph — dense connections enabling synthesis. In a personal assistant vault, the product is the prepared review. Maya does not browse her knowledge graph. She reads what Vera prepared and makes decisions. The graph is infrastructure that enables the review; the review is what the human actually interacts with. This inverts the relationship between graph and user compared to research systems.

## Agent-Native Advantages

**Neglect detection across all life areas simultaneously.** A human reviews what they remember to review. Vera programmatically scans every area, every project, every habit on a cadence. When Maya has not mentioned her creative area in three weeks, Vera notices — not because Vera cares about creativity specifically, but because the `last_reviewed` timestamp crossed a threshold. No human maintains this level of vigilance across all life domains. The agent turns area neglect from an invisible failure mode into a detectable, surfaceable signal.

**Cross-area pattern detection that humans cannot self-observe.** Vera correlates data across domains that Maya experiences separately. "Your deep work productivity drops 40% in weeks where you skip 2+ morning runs" is a pattern that requires tracking two different areas over multiple weeks and computing the correlation. Maya experiences "I'm tired today" and "I can't focus today" as separate events. Vera sees them as a pattern. This is not generic "AI finds patterns" — it is specifically the exhaustive cross-referencing of structured YAML data across life areas that produces actionable correlations. The structured schema (mood in reviews, streak data in habits, health_indicator in areas) creates the query surface that makes correlation detection possible.

**Review preparation that eliminates the maintenance burden killing every personal system.** The single biggest failure mode in personal productivity systems is review fatigue: the weekly review becomes so tedious that people abandon it, and the system stops reflecting reality. Vera eliminates this by doing the review preparation work: scanning all areas, computing what changed, identifying approaching deadlines, and surfacing patterns. Maya's role shrinks from "conduct the entire review" to "read the prepared agenda and make decisions." The human contribution becomes judgment and decision-making — what humans are good at — while the synthesis and scanning work — what humans find tedious and eventually abandon — is handled by the agent. This directly attacks the failure mode that kills most personal systems.

**Habit-goal dependency tracking with proactive intervention.** When Maya's morning run streak breaks, Vera does not just record the break. Vera traces the dependency graph: morning-run supports half-marathon-october, which has a milestone (10K by April) that depends on consistent training volume. A broken streak of 5+ days puts the April milestone at risk, which shifts the half-marathon goal status from "on-track" to "at-risk." Vera surfaces this cascade before Maya notices, giving her time to adjust (switch run schedule, extend the milestone timeline, or recommit). A human tracking habits in a spreadsheet sees "missed run." An agent traversing a dependency graph sees "April milestone at risk." The difference is actionable foresight versus passive recording.

**Someday/maybe resurfacing based on context changes.** Maya added "learn ceramics" to her someday-maybe list eight months ago. A human would need to manually scan this list during reviews and decide whether context has changed. Vera detects when conditions change that make dormant items relevant: Maya's creative area has been red for a month (suggesting she needs a creative outlet), a ceramics studio opened near her office (if location-aware), or Iris started an art class (family connection). The resurfacing is not random — it is condition-triggered based on structured data about Maya's current state. This transforms the someday-maybe list from a graveyard of abandoned aspirations into a living reservoir that activates when the time is right.
---

Topics:
- [[domain-compositions]]
