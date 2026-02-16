---
description: Health and wellness knowledge system — inspirational composition showing derived architecture for symptom-trigger correlation, training optimization, and multi-dimensional wellness tracking
kind: example
domain: companion
topics: ["[[domain-compositions]]"]
---

# health wellness uses symptom-trigger correlation with multi-dimensional tracking

A derived cognitive architecture for someone who tracks workouts, nutrition, sleep, and symptoms — and wants to stop tracking in isolation. Built kernel-up from the 14 universal primitives, adapted through the natural vocabulary of health and training, and optimized for the one thing agents do that humans cannot: hold six months of meals, sleep logs, workout data, and symptom records in analytical memory simultaneously, detecting cross-domain correlations no single-domain tracker could see.

---

## Persona

**Lena**, 29, software engineer and recreational athlete. She trains 5 days a week (3 strength, 2 running), tracks macros intermittently, and has been dealing with persistent afternoon energy crashes and occasional tension headaches for the past year. She has used MyFitnessPal, a sleep tracker, a workout spreadsheet, and a paper symptom diary — each in isolation, none talking to each other. Her doctor says "it could be anything — try an elimination diet" but she has no way to systematically correlate what she eats, how she sleeps, how hard she trains, and when symptoms appear.

Lena does not need another tracking app. She needs a system that holds all four domains in one graph — nutrition, sleep, training, and symptoms — and finds the patterns she cannot see because she is living inside them. The headaches might correlate with poor sleep on heavy training days. The energy crashes might follow specific food combinations. The agent can test these hypotheses across six months of data in ways Lena never could with manual review.

---

## Configuration

The 8 dimensions derived for personal health tracking:

| Dimension | Position | Rationale |
|-----------|----------|-----------|
| Granularity | Mixed — atomic for daily logs, compound for protocols | Each day's nutrition, sleep, and training are individual entries. But a supplement protocol or training program is a compound entity that spans weeks. Forcing atomicity on protocols would scatter program logic across dozens of notes. |
| Organization | Flat with wiki links | Meals link to symptoms. Sleep links to training recovery. Supplements link to protocols. The cross-domain connections are the entire point — folders per domain would recreate the data silos Lena already has. |
| Linking | Explicit + temporal correlation | Links between daily entries capture temporal relationships: "headache appeared 18 hours after high-histamine meal on a night of 5.5 hours sleep." The agent creates correlation links that span time. |
| Metadata | Medium-dense | Health data has natural numeric fields (calories, macros, sleep hours, RPE, pain severity) but does not need the query depth of trading or legal. The schema captures what is measurable without creating friction at capture time. |
| Processing | Medium | Daily logs are lightweight capture. Weekly processing correlates the week's data. Monthly processing runs the full correlation analysis. The agent does the analytical heavy lifting, not the human. |
| Formalization | Progressive — low to start, grows with evidence | Lena does not know her triggers yet. Formalizing "gluten causes headaches" before the data supports it creates confirmation bias. The schema starts with observation fields and adds formal trigger designations only after statistical evidence accumulates. |
| Review | Daily for capture, weekly for patterns, monthly for protocol assessment | Daily capture of meals and symptoms must be frictionless. Weekly review surfaces emerging patterns. Monthly review assesses whether supplement protocols and training programs are producing measurable effects. |
| Scope | Individual | Health data is deeply personal. Multi-user health vaults would compromise privacy and dilute the personalization that makes correlation meaningful. |

---

## Vault Structure

```
vault/
├── 00_inbox/                    # raw capture
│   ├── food-photos/             # meal photos for later logging
│   ├── lab-results/             # PDFs from blood work
│   └── research/                # health articles, protocol ideas
├── 01_thinking/                 # active knowledge (flat)
│   ├── index.md                 # hub MOC
│   ├── nutrition.md             # domain MOC: dietary patterns
│   ├── training.md              # domain MOC: exercise programming
│   ├── sleep.md                 # topic MOC: sleep quality patterns
│   ├── symptoms.md              # topic MOC: symptom tracking and triggers
│   ├── supplements.md           # topic MOC: protocol tracking
│   ├── biomarkers.md            # topic MOC: lab results and trends
│   ├── recovery.md              # topic MOC: recovery patterns
│   │
│   ├── afternoon-energy-crashes-correlate-with-high-glycemic-lunch.md
│   ├── headaches-follow-poor-sleep-plus-heavy-deadlift-days.md
│   ├── magnesium-supplementation-improved-sleep-quality.md
│   ├── protein-timing-affects-next-day-soreness.md
│   ├── running-volume-above-25km-triggers-knee-inflammation.md
│   └── ...
├── 02_archive/                  # completed programs, old protocols
│   ├── programs/                # finished training programs
│   └── protocols/               # retired supplement protocols
├── 03_daily/                    # daily health log (the engine)
│   ├── 2026-02/
│   │   ├── 2026-02-10.md
│   │   ├── 2026-02-11.md
│   │   ├── 2026-02-12.md
│   │   ├── 2026-02-13.md
│   │   └── 2026-02-14.md
│   ├── reviews/
│   │   ├── 2026-W07-weekly.md
│   │   └── 2026-01-monthly.md
│   └── protocols/               # active supplement/training protocols
│       ├── creatine-loading-protocol.md
│       ├── upper-lower-strength-program.md
│       └── histamine-elimination-trial.md
├── 04_meta/                     # infrastructure
│   ├── templates/
│   │   ├── daily-log.md
│   │   ├── workout-entry.md
│   │   ├── symptom-entry.md
│   │   ├── supplement-protocol.md
│   │   ├── training-program.md
│   │   ├── lab-result.md
│   │   ├── weekly-review.md
│   │   └── correlation-finding.md
│   ├── logs/
│   │   ├── observations.md
│   │   ├── observations/
│   │   ├── tensions.md
│   │   └── tensions/
│   ├── scripts/
│   │   ├── symptom-correlation.sh
│   │   ├── training-volume.sh
│   │   ├── sleep-quality-trend.sh
│   │   └── macro-average.sh
│   └── tasks/
│       └── queue.json
├── self/
│   ├── identity.md
│   ├── methodology.md
│   ├── goals.md
│   └── lena-profile.md          # baselines, sensitivities, preferences
└── ops/
    └── methodology/
        ├── how-daily-logs-process.md
        ├── how-correlation-detection-works.md
        └── how-protocol-assessment-works.md
```

---

## Note Schemas

### Daily Log

```yaml
---
description: [one sentence — energy level, training, notable meals or symptoms]
date: 2026-02-14
energy_rating: 7
mood: ["focused", "calm"]
sleep_hours: 7.5
sleep_quality: 8
sleep_notes: "fell asleep quickly, one wake at 3am"
meals:
  - meal: breakfast
    time: "07:30"
    foods: ["oatmeal", "blueberries", "protein powder", "coffee"]
    calories: 480
    protein: 35
    carbs: 62
    fat: 12
  - meal: lunch
    time: "12:30"
    foods: ["chicken breast", "brown rice", "broccoli", "olive oil"]
    calories: 620
    protein: 48
    carbs: 55
    fat: 22
  - meal: dinner
    time: "19:00"
    foods: ["salmon", "sweet potato", "spinach salad"]
    calories: 580
    protein: 42
    carbs: 45
    fat: 20
  - meal: snack
    time: "15:30"
    foods: ["greek yogurt", "almonds"]
    calories: 280
    protein: 22
    carbs: 15
    fat: 16
total_calories: 1960
total_protein: 147
total_carbs: 177
total_fat: 70
hydration_liters: 2.5
supplements_taken: ["creatine 5g", "magnesium glycinate 400mg", "vitamin D 4000IU"]
workout: "[[2026-02-14-upper-body]]"
symptoms: []
notes: "Good energy day. No afternoon crash — lunch was lower glycemic than usual."
topics: ["[[nutrition]]", "[[sleep]]"]
---
```

### Workout Entry

```yaml
---
description: [one sentence — what was trained and how it went]
date: 2026-02-14
type: strength
program: "[[upper-lower-strength-program]]"
session: upper-A
duration_min: 65
rpe_overall: 7
exercises:
  - name: "bench press"
    sets: [{"weight": 60, "reps": 8}, {"weight": 60, "reps": 8}, {"weight": 60, "reps": 7}, {"weight": 57.5, "reps": 8}]
    rpe: 8
    notes: "last rep of set 3 was a grind"
  - name: "barbell row"
    sets: [{"weight": 55, "reps": 10}, {"weight": 55, "reps": 10}, {"weight": 55, "reps": 9}]
    rpe: 7
    notes: null
  - name: "overhead press"
    sets: [{"weight": 35, "reps": 8}, {"weight": 35, "reps": 7}, {"weight": 32.5, "reps": 8}]
    rpe: 8
    notes: "shoulder felt tight, warmed up longer"
  - name: "chin ups"
    sets: [{"weight": "BW", "reps": 8}, {"weight": "BW", "reps": 7}, {"weight": "BW", "reps": 6}]
    rpe: 8
    notes: null
recovery_rating: 7
soreness_areas: ["chest", "shoulders"]
pre_workout_energy: 7
post_workout_energy: 6
topics: ["[[training]]", "[[recovery]]"]
relevant_notes: ["[[upper-lower-strength-program]] — program governing this session"]
---
```

### Symptom Entry

```yaml
---
description: [one sentence — what the symptom was and potential context]
date: 2026-02-12
symptom: tension-headache
severity: 6
onset_time: "14:30"
duration_hours: 3
location: "bilateral temporal"
potential_triggers: ["5.5h sleep", "heavy deadlifts yesterday", "skipped lunch"]
context:
  sleep_prior_night: 5.5
  training_prior_day: "[[2026-02-11-lower-body]]"
  meals_today: ["coffee only until 13:00", "large pasta lunch at 13:15"]
  hydration: "below target — ~1.5L by onset"
  stress_level: 7
treatment: ["ibuprofen 400mg", "water 500ml", "20min nap"]
treatment_effective: true
resolution_time: "17:30"
topics: ["[[symptoms]]"]
relevant_notes: ["[[headaches-follow-poor-sleep-plus-heavy-deadlift-days]] — this is the 4th instance of this pattern"]
---
```

### Supplement Protocol

```yaml
---
description: [one sentence — what the protocol targets and current assessment]
supplement: magnesium-glycinate
dose: 400mg
timing: "before bed"
purpose: "improve sleep quality — reduce nighttime waking"
start_date: 2026-01-10
status: active
effectiveness_assessment: positive
evidence:
  - "sleep quality rating improved from avg 6.2 to avg 7.4 over 4 weeks"
  - "nighttime waking reduced from 2.1 avg to 0.8 avg per night"
interactions: ["may interact with calcium absorption — take separately"]
cost_monthly: 18
next_review: 2026-03-10
topics: ["[[supplements]]", "[[sleep]]"]
relevant_notes: ["[[magnesium-supplementation-improved-sleep-quality]] — the correlation finding that led to this protocol"]
---
```

### Training Program

```yaml
---
description: [one sentence — program goal and current phase]
program_name: "Upper-Lower Strength"
goal: "progressive overload on compound lifts"
duration_weeks: 12
current_week: 6
split: ["upper-A", "lower-A", "rest", "upper-B", "lower-B", "run", "rest"]
progression_scheme: "add 2.5kg when all sets hit target reps"
deload_schedule: "week 4 and week 8"
sessions_completed: 28
sessions_remaining: 28
prs_this_cycle: ["bench 62.5kg x 8", "squat 85kg x 6"]
stall_signals: ["overhead press stalled at 35kg for 3 weeks"]
topics: ["[[training]]"]
relevant_notes: ["[[running-volume-above-25km-triggers-knee-inflammation]] — constrains running days to max 2x per week at 10-12km each"]
---
```

### Lab Result

```yaml
---
description: [one sentence — what was tested and notable findings]
date: 2026-01-20
test_type: comprehensive-metabolic
provider: "Dr. Chen"
results:
  - marker: "vitamin D"
    value: 38
    unit: "ng/mL"
    reference: "30-100"
    status: normal
    trend: improving
  - marker: "ferritin"
    value: 28
    unit: "ng/mL"
    reference: "12-150"
    status: low-normal
    trend: stable
  - marker: "TSH"
    value: 2.1
    unit: "mIU/L"
    reference: "0.4-4.0"
    status: normal
    trend: stable
  - marker: "fasting glucose"
    value: 92
    unit: "mg/dL"
    reference: "70-100"
    status: normal
    trend: stable
provider_notes: "Consider iron supplementation given training volume. Vitamin D improving since summer supplementation."
follow_up: "retest ferritin in 3 months"
topics: ["[[biomarkers]]"]
relevant_notes: ["[[supplements]] — vitamin D protocol showing measurable improvement"]
---
```

### Correlation Finding (Agent-Generated)

```yaml
---
description: [one sentence — the correlation discovered, with strength and conditions]
type: learning
correlation_type: symptom-trigger | performance-factor | recovery-pattern
variables: ["sleep_hours", "training_intensity", "symptom"]
strength: strong | moderate | weak
sample_size: 18
confidence: "18 out of 22 occurrences (82%)"
conditions: "effect observed when both sleep < 6h AND previous day included RPE 8+ lower body"
actionable: true
recommendation: "avoid RPE 8+ lower body training on days following < 6h sleep"
topics: ["[[symptoms]]", "[[training]]", "[[recovery]]"]
relevant_notes: []
---
```

---

## Example Notes

### Daily Log

```markdown
---
description: Average energy day — tension headache appeared at 2:30pm following poor sleep and heavy deadlifts yesterday, ibuprofen resolved by 5:30pm
date: 2026-02-12
energy_rating: 5
mood: ["tired", "irritable"]
sleep_hours: 5.5
sleep_quality: 4
sleep_notes: "restless, woke at 1am and 4am, took 30min to fall back asleep each time"
meals:
  - meal: breakfast
    time: "08:00"
    foods: ["coffee x2"]
    calories: 10
    protein: 0
    carbs: 0
    fat: 0
  - meal: lunch
    time: "13:15"
    foods: ["pasta carbonara", "garlic bread", "sparkling water"]
    calories: 920
    protein: 32
    carbs: 105
    fat: 38
  - meal: dinner
    time: "19:30"
    foods: ["grilled chicken", "mixed vegetables", "quinoa"]
    calories: 550
    protein: 44
    carbs: 48
    fat: 14
  - meal: snack
    time: "16:00"
    foods: ["banana", "peanut butter"]
    calories: 280
    protein: 8
    carbs: 35
    fat: 14
total_calories: 1760
total_protein: 84
total_carbs: 188
total_fat: 66
hydration_liters: 1.8
supplements_taken: ["creatine 5g", "magnesium glycinate 400mg", "vitamin D 4000IU"]
workout: null
symptoms: ["[[2026-02-12-tension-headache]]"]
notes: "Bad sleep → skipped breakfast → huge carb-heavy lunch → energy crash → headache. Classic cascade. The headache pattern is repeating — this is the 4th time since December. Always follows the combination of bad sleep + heavy training the day before."
topics: ["[[nutrition]]", "[[sleep]]", "[[symptoms]]"]
---

# 2026-02-12

Today was a demonstration of how cascading inputs compound into symptoms. Slept 5.5 hours (well below my 7.5h target), which led to skipping breakfast in favor of double coffee, which led to a massive compensatory lunch heavy on refined carbs, which coincided with the afternoon energy crash and headache onset at 2:30pm.

Since [[headaches-follow-poor-sleep-plus-heavy-deadlift-days]], this is the 4th instance of this specific pattern. The combination of sub-6-hour sleep AND heavy lower body training the previous day (yesterday was RPE 8 deadlifts) creates the conditions. The high-glycemic lunch may amplify it but is not the primary trigger — there are days with similar lunches and no headache when sleep was adequate.

Hydration was also below target at ~1.5L by headache onset. Hard to disentangle whether dehydration is an independent trigger or just correlated with the poor-sleep-skip-breakfast cascade.

**Action taken:** 400mg ibuprofen + 500ml water + 20min nap. Resolved by 5:30pm.

**For the agent:** This log contributes to three active correlation investigations: (1) sleep quality vs headache incidence, (2) previous-day training intensity vs headache incidence, (3) meal timing/composition vs energy crashes. Log this data point in all three.

---
```

### Correlation Finding: Headaches Follow Sleep + Deadlift Days

```markdown
---
description: Tension headaches occur in 82% of cases when sleep drops below 6 hours and the previous day included RPE 8+ lower body training — the two triggers compound but neither alone is sufficient
type: learning
correlation_type: symptom-trigger
variables: ["sleep_hours", "previous_day_training_rpe", "previous_day_training_type", "headache_occurrence"]
strength: strong
sample_size: 22
confidence: "18 out of 22 co-occurrences (82%) produced headache within 24h"
conditions: "sleep < 6h AND previous day lower body RPE >= 8"
actionable: true
recommendation: "On nights after heavy lower body sessions, prioritize sleep hygiene — magnesium, no screens after 10pm, bedroom temp below 19C. If sleep is disrupted, reduce next-day intensity."
topics: ["[[symptoms]]", "[[training]]", "[[sleep]]", "[[recovery]]"]
relevant_notes: ["[[magnesium-supplementation-improved-sleep-quality]] — magnesium may help prevent the sleep disruption that enables this cascade", "[[running-volume-above-25km-triggers-knee-inflammation]] — another training-volume threshold finding, demonstrating that the body has specific capacity limits", "[[protein-timing-affects-next-day-soreness]] — related recovery finding: pre-sleep protein may improve recovery quality and sleep on heavy training days"]
---

# headaches-follow-poor-sleep-plus-heavy-deadlift-days

The pattern emerged after tracking symptom logs alongside training and sleep data for four months. Tension headaches are not random for Lena — they follow a specific, reproducible trigger combination.

## The Finding

Out of 22 instances where Lena slept less than 6 hours AND trained lower body at RPE 8 or higher the previous day, 18 resulted in a tension headache within 24 hours (82%). The typical onset is early-to-mid afternoon, 14-20 hours after the training session.

Neither trigger alone is sufficient:
- Sleep under 6 hours WITHOUT heavy prior-day training: 3 out of 14 occasions produced headaches (21%)
- Heavy lower body RPE 8+ WITH adequate sleep (7+ hours): 2 out of 19 occasions produced headaches (11%)
- Both triggers together: 18 out of 22 (82%)

This is a compound trigger — the interaction between poor sleep and high training stress produces the symptom, not either factor in isolation. The mechanism is likely inflammatory: heavy compound lifts create systemic inflammation, and inadequate sleep prevents the recovery processes that resolve it. The headache is the body's signal that recovery debt has exceeded capacity.

## What This Means for Programming

Since [[running-volume-above-25km-triggers-knee-inflammation]], Lena's body has shown clear capacity thresholds in multiple systems. The training program should account for this: heavy lower body days (RPE 8+ deadlifts, squats) need to be followed by nights where sleep quality is protected. If sleep is known to be compromised (travel, social events, stress), the previous day's training should stay below RPE 7 for lower body.

Since [[magnesium-supplementation-improved-sleep-quality]], the magnesium protocol may serve double duty here — improving sleep quality generally, which reduces the frequency of the sleep trigger. But the supplementation does not eliminate the interaction. When sleep is poor despite magnesium, the compound trigger still fires.

## Monitoring

The agent tracks this pattern continuously. Each daily log with sub-6-hour sleep AND previous-day RPE 8+ lower body is flagged. The 82% rate is the current baseline — if the sleep hygiene interventions reduce headache frequency in this trigger combination, the rate should drop. If it drops below 50%, the correlation may be weakening (possibly due to improved baseline fitness or supplement effects). If it stays above 75%, the trigger combination is stable and training programming must accommodate it.

---
```

### Supplement Protocol Note

```markdown
---
description: Magnesium glycinate 400mg before bed — measurably improved sleep quality from 6.2 to 7.4 average rating and reduced nighttime waking by 62% over four weeks
supplement: magnesium-glycinate
dose: 400mg
timing: "30 minutes before bed"
purpose: "improve sleep quality — reduce nighttime waking"
start_date: 2026-01-10
status: active
effectiveness_assessment: positive
evidence:
  - "sleep quality rating improved from avg 6.2 to avg 7.4 over 4 weeks"
  - "nighttime waking reduced from 2.1 avg to 0.8 avg per night"
  - "sleep latency decreased from avg 22min to avg 12min"
  - "no headaches during 3 consecutive adequate sleep nights — supporting cascade hypothesis"
interactions: ["take separately from calcium", "may enhance effect of melatonin if added"]
cost_monthly: 18
next_review: 2026-03-10
topics: ["[[supplements]]", "[[sleep]]"]
relevant_notes: ["[[headaches-follow-poor-sleep-plus-heavy-deadlift-days]] — improved sleep reduces the frequency of the sleep trigger in the headache cascade", "[[protein-timing-affects-next-day-soreness]] — both findings suggest pre-sleep supplementation and nutrition window affects recovery quality"]
---

# magnesium-supplementation-improved-sleep-quality

## Protocol

400mg magnesium glycinate taken 30 minutes before bed, started January 10, 2026. Glycinate form chosen for bioavailability and calming effect vs oxide form. Taken on an empty stomach or with a small amount of protein.

## Baseline (Dec 15 - Jan 9, pre-protocol)

| Metric | Average | Range |
|--------|---------|-------|
| Sleep quality rating | 6.2 | 4-8 |
| Nighttime wakings | 2.1 | 0-4 |
| Sleep latency | 22 min | 10-45 min |
| Total sleep hours | 6.8 | 5.5-8.0 |

## Post-Protocol (Jan 10 - Feb 14, 5 weeks)

| Metric | Average | Change | Range |
|--------|---------|--------|-------|
| Sleep quality rating | 7.4 | +1.2 | 5-9 |
| Nighttime wakings | 0.8 | -1.3 (62% reduction) | 0-2 |
| Sleep latency | 12 min | -10 min (45% reduction) | 5-25 min |
| Total sleep hours | 7.3 | +0.5 | 6.0-8.5 |

## Assessment

The improvement is meaningful and appeared gradually over the first two weeks. The most notable change is the reduction in nighttime waking, which has downstream effects on recovery quality and since [[headaches-follow-poor-sleep-plus-heavy-deadlift-days]], reduces the frequency of the sleep trigger in the headache compound pattern.

Since this protocol began, Lena has had 3 instances of the deadlift-plus-poor-sleep compound trigger versus 5 instances in the 5 weeks prior. The magnesium is not eliminating poor sleep nights entirely, but it is reducing their frequency, which proportionally reduces headache incidence.

**Confounding factors:** Lena also reduced evening screen time starting Jan 15 (5 days after magnesium). The two interventions are partially confounded. The agent is tracking whether nights with screen use after 10pm still show improvement vs pre-protocol, which would isolate the magnesium effect.

## Decision

Continue protocol. Schedule re-assessment at 3-month mark (March 10) to evaluate long-term trajectory. Consider dose adjustment (300mg vs 400mg) if sleep quality remains stable — lower effective dose reduces cost and supplement load.

---
```

### Weekly Review

```markdown
---
description: Week 7 2026 — headache pattern recurred, training volume on track, macro compliance improved except Tuesday
review_type: weekly
period: "2026-W07"
training_sessions: 5
training_volume: "moderate — 2 upper, 2 lower, 1 run (8km)"
avg_sleep_hours: 6.9
avg_sleep_quality: 6.8
avg_energy: 6.4
symptoms_logged: 1
symptom_details: ["tension headache Feb 12 — compound trigger: 5.5h sleep + heavy deadlifts Feb 11"]
nutrition_compliance: "4 of 7 days hit protein target (140g+)"
supplement_compliance: "7 of 7 days — full protocol"
weight_trend: "66.2kg → 66.0kg (stable)"
topics: ["[[training]]", "[[nutrition]]", "[[symptoms]]"]
relevant_notes: ["[[headaches-follow-poor-sleep-plus-heavy-deadlift-days]] — pattern confirmed again this week", "[[upper-lower-strength-program]] — program week 6, on track"]
---

# 2026-W07 Weekly Review

## Overview

A mixed week. Training was consistent and the strength program is progressing well — bench press hit 60kg for 3x8 and squat continues to improve. But the headache pattern recurred on Wednesday, triggered by the familiar compound of poor sleep (5.5h) plus previous-day heavy deadlifts.

## Training

Five sessions completed per the program schedule. Progressive overload on track for bench and squat. Overhead press remains stalled at 35kg for a third consecutive week — this is a genuine plateau, not a recovery issue. Running session was an easy 8km, well within the limits documented in [[running-volume-above-25km-triggers-knee-inflammation]].

**Agent note:** Consider adding a dedicated shoulder accessory day or modifying the overhead press progression scheme. Three weeks of stalling with adequate recovery suggests the current stimulus is insufficient, not excessive.

## Nutrition

Protein target (140g+) hit on 4 out of 7 days. Tuesday was the worst day — only 84g protein, dominated by the high-carb lunch that contributed to the energy crash and headache. The pattern of poor sleep leading to skipped breakfast leading to compensatory carb-heavy meals is well-documented and happened again this week.

Since [[afternoon-energy-crashes-correlate-with-high-glycemic-lunch]], the Tuesday crash was predictable. On the 3 days where lunch included >30g protein and <50g refined carbs, afternoon energy averaged 7.3. On the 2 days with high-glycemic lunches, afternoon energy averaged 4.5.

## Sleep

Average 6.9 hours, pulled down by Tuesday's 5.5h. The five nights with adequate sleep (7+ hours) all had sleep quality ratings of 7 or above. The magnesium protocol continues to show benefit — sleep latency has been consistently under 15 minutes since [[magnesium-supplementation-improved-sleep-quality]].

## Symptoms

One tension headache on Wednesday, following the established compound trigger pattern. No other symptoms. The headache resolved with standard treatment (ibuprofen + water + rest). This is the 4th recurrence since tracking began — the pattern is statistically robust.

## Action Items for Next Week

1. Protect sleep quality on lower body training days — enforce the post-deadlift sleep hygiene protocol
2. Prepare grab-and-go breakfast options for mornings after poor sleep to prevent the skip-breakfast cascade
3. Consider overhead press programming modification after one more test week
4. Continue tracking the afternoon energy vs lunch composition pattern — sample size growing

---
```

### Pattern Discovery: Energy Crashes and Glycemic Load

```markdown
---
description: Afternoon energy crashes (rating <= 4) occur 78% of the time when lunch exceeds 80g refined carbs and follows a fasted morning — neither condition alone produces reliable crashes
type: learning
correlation_type: performance-factor
variables: ["lunch_refined_carbs", "breakfast_skipped", "afternoon_energy_rating"]
strength: strong
sample_size: 32
confidence: "18 out of 23 co-occurrences (78%) produced energy rating <= 4 between 2-4pm"
conditions: "lunch refined carbs > 80g AND no breakfast or breakfast < 200 calories"
actionable: true
recommendation: "On days when breakfast is skipped, lunch should emphasize protein and complex carbs — keep refined carbs below 50g. Alternatively, never skip breakfast on work days."
topics: ["[[nutrition]]", "[[symptoms]]"]
relevant_notes: ["[[headaches-follow-poor-sleep-plus-heavy-deadlift-days]] — the energy crash pattern often precedes headache onset, suggesting cascading physiological stress", "[[protein-timing-affects-next-day-soreness]] — protein distribution throughout the day affects multiple outcomes beyond soreness"]
---

# afternoon-energy-crashes-correlate-with-high-glycemic-lunch

The agent identified this pattern after analyzing 90 daily logs spanning November through February. Lena reports afternoon energy crashes (energy rating 4 or below between 2-4pm) frequently, but they are not random. Two conditions predict crashes with 78% accuracy when they co-occur.

## The Finding

The crash pattern requires two simultaneous conditions:

1. **Fasted morning:** Breakfast skipped entirely or under 200 calories (typically coffee only)
2. **High-glycemic lunch:** Refined carbohydrate content exceeding 80g (pasta, bread, white rice as dominant component)

When both conditions are present: 18 out of 23 occasions produced an energy crash (78%).
When only condition 1 is present (fasted morning, moderate lunch): 4 out of 15 (27%).
When only condition 2 is present (normal breakfast, high-glycemic lunch): 5 out of 18 (28%).
When neither condition is present: 2 out of 34 (6%).

The interaction effect is clear. A fasted morning creates insulin sensitivity, and the subsequent high-glycemic load produces a reactive hypoglycemia pattern that manifests as the afternoon crash. With a normal breakfast, insulin sensitivity is moderated and the same lunch produces a smaller glycemic swing.

## Intervention Design

The simplest intervention targets condition 1: do not skip breakfast. On days when Lena eats 400+ calories at breakfast including 25+ g protein, afternoon crashes drop to 6% regardless of lunch composition. Breakfast normalizes the insulin response and prevents the reactive pattern.

For days when breakfast is unavoidable to skip (travel, early meetings), the fallback targets condition 2: keep lunch refined carbs under 50g, emphasize protein (40g+) and fat. A chicken salad with olive oil dressing instead of pasta carbonara eliminates the glycemic trigger even in a fasted state.

## Monitoring

The agent flags each daily log where breakfast is skipped and lunch exceeds 80g refined carbs. If Lena follows the intervention protocol, these co-occurrences should become rare. The crash rate in non-flagged days (6%) serves as the baseline. If crashes begin occurring outside the identified trigger pattern, a new correlation investigation is warranted.

---
```

---

## Processing Workflow

### Capture

Daily health data enters through multiple channels:

1. **Morning:** Sleep data logged (hours, quality, disruptions). Supplements taken logged. Breakfast logged.
2. **Throughout day:** Meals logged after eating. Energy and mood rated at natural transition points (morning, midday, afternoon, evening).
3. **Training sessions:** Workout logged immediately after training — exercises, weights, reps, RPE, recovery rating.
4. **Symptoms:** Logged when they occur — symptom type, severity, onset time, context, potential triggers.
5. **Lab results, research:** Dropped into inbox for later processing.

The agent compiles the daily log at end of day from these inputs, filling in computed fields (total calories, macros, hydration) and creating cross-references to any symptom entries, workout entries, or protocol notes.

### Process (the domain-specific step)

Three processing workflows run at different cadences:

**Daily compilation:**
1. Aggregate all inputs into the daily log note
2. Flag any data gaps (missing meals, no sleep entry)
3. Link workout entry to training program
4. Link symptom entries to daily log
5. Check supplement compliance

**Weekly correlation scan:**
1. Agent analyzes the week's data for pattern matches against known correlations
2. New symptom-trigger co-occurrences are flagged
3. Training volume is checked against known thresholds (e.g., running volume vs knee inflammation)
4. Nutrition compliance is calculated (protein target hit rate, macro averages)
5. Sleep trends are assessed
6. Findings go into the weekly review note

**Monthly protocol assessment:**
1. Agent evaluates all active supplement protocols against their effectiveness metrics
2. Training program progress is assessed (PRs, stalls, recovery patterns)
3. Lab result trends are reviewed if new results available
4. Correlation findings are re-evaluated with larger sample size
5. Recommendations for protocol adjustments are generated

### Connect

Every daily log links to its workout entry, symptom entries, and active protocols. Correlation findings link back to the daily logs that constitute their evidence base. Protocols link to the biomarker or symptom trends they target. The agent maintains bidirectional links — when a new correlation finding is confirmed, it propagates to all relevant protocols and symptom entries.

### Verify

Weekly: agent checks data completeness (all days have logs, all workouts are logged, all supplements tracked).
Monthly: agent validates correlation findings against growing sample sizes — do the patterns hold?
Quarterly: agent reviews all protocols for measurable effectiveness, flags any without clear evidence.

---

## MOC Structure

### Hub MOC: index.md

```markdown
---
description: Entry point for Lena's health and wellness knowledge system — navigate to nutrition, training, sleep, symptoms, or supplements
type: moc
---

# Wellness System

## Active Tracking
- [[nutrition]] — dietary patterns, meal composition, macro targets
- [[training]] — exercise programming, progressive overload, performance tracking
- [[sleep]] — sleep quality patterns, pre-sleep routines, recovery correlation
- [[symptoms]] — symptom tracking, trigger identification, cascade patterns
- [[supplements]] — active protocols, effectiveness tracking, interaction monitoring

## Supporting Knowledge
- [[biomarkers]] — lab results, trends, clinical context
- [[recovery]] — recovery patterns, overtraining signals, deload timing

---

Agent Notes:
For symptom investigation, start with [[symptoms]] and trace back to [[sleep]] and [[training]] — most triggers are cross-domain. For training programming questions, check [[recovery]] for capacity constraints before adjusting volume.
```

### Topic MOC: symptoms.md

```markdown
---
description: Symptom tracking and trigger identification — where cross-domain correlations surface and lifestyle adjustments become evidence-based
type: moc
topics: ["[[index]]"]
---

# symptoms

Symptoms are the body's output signals. This MOC tracks what symptoms occur, what triggers them, and what interventions resolve them. The value is not in logging symptoms — Lena did that with a paper diary for a year. The value is in systematic correlation with nutrition, sleep, and training data to identify the multi-factor triggers that no single-domain tracker can detect.

## Confirmed Triggers
- [[headaches-follow-poor-sleep-plus-heavy-deadlift-days]] — compound trigger (sleep < 6h + RPE 8+ lower body), 82% hit rate over 22 co-occurrences
- [[afternoon-energy-crashes-correlate-with-high-glycemic-lunch]] — compound trigger (skipped breakfast + high-glycemic lunch), 78% hit rate over 23 co-occurrences

## Under Investigation
- Relationship between training volume and knee inflammation — documented threshold at 25km/week running but strength training contribution unclear
- Whether high-histamine foods correlate with headache frequency independently of sleep quality — elimination trial in progress

## Resolved
- [[magnesium-supplementation-improved-sleep-quality]] — not a symptom finding per se, but resolving sleep quality addressed the upstream trigger for headaches

## Cascade Patterns
The most important finding across all symptom tracking: symptoms rarely have single causes. The headache pattern requires BOTH poor sleep AND heavy training. The energy crash requires BOTH fasted morning AND high-glycemic lunch. Interventions that target single factors miss the interaction effect. The agent's value is holding all factors simultaneously and detecting which combinations produce symptoms.

---

Agent Notes:
When a new symptom is logged, the first analytical pass should check against ALL known compound triggers before investigating novel causes. Most symptoms in Lena's profile are variations on established cascades, not new phenomena.
```

---

## Graph Query Examples

```bash
# Find all days with symptoms and check what training happened the day before
rg '^symptoms: \[' vault/03_daily/2026-02/ | grep -v '\[\]' | \
  while read line; do
    date=$(echo "$line" | grep -o '2026-02-[0-9]*')
    prev=$(date -j -v-1d -f %Y-%m-%d "$date" +%Y-%m-%d 2>/dev/null)
    echo "=== Symptom day: $date === Training day before: $prev ==="
    rg "^rpe_overall:" "vault/03_daily/2026-02/$prev.md" 2>/dev/null
  done

# Track protein compliance across all days
rg '^total_protein:' vault/03_daily/2026-02/ | sort

# Find all days with energy rating below 5
rg '^energy_rating: [1-4]' vault/03_daily/2026-02/

# Sleep quality trend
rg '^sleep_quality:' vault/03_daily/2026-02/ | sort

# Find all symptom entries with specific trigger
rg '^potential_triggers:.*sleep' vault/03_daily/2026-02/ vault/04_meta/

# Training volume per week (by counting sessions)
rg '^type: strength\|^type: running' vault/03_daily/2026-02/ --count

# Supplement compliance — days where protocol was not fully followed
rg '^supplements_taken:' vault/03_daily/2026-02/ | grep -v 'magnesium'

# Find all correlation findings by strength
rg '^strength: strong' vault/01_thinking/
```

---

## What Makes This Domain Unique

### Cross-domain correlation is the entire value proposition

Every health tracking app is siloed. MyFitnessPal tracks food. Garmin tracks workouts. Sleep Cycle tracks sleep. A symptom diary tracks symptoms. None of them talk to each other, and the most important health patterns live in the intersections — where nutrition meets sleep meets training meets symptoms. The knowledge graph IS the integration layer that these apps cannot provide.

The agent discovers that headaches follow the compound trigger of poor sleep AND heavy deadlifts. No single-domain tracker could detect this because the trigger spans two domains. The graph holds all domains in one structure, and the agent holds all the data in analytical memory. This is not an incremental improvement over siloed tracking — it is a categorically different capability.

### Progressive formalization reflects how health knowledge actually grows

Lena does not start by knowing her triggers. She starts by observing. The schema reflects this: early entries have `potential_triggers` as free text, and only after statistical evidence accumulates does a trigger become a formal `correlation finding` note with sample size and confidence. The system moves from observation to hypothesis to evidence, and the schema evolves along with the knowledge. This prevents the premature formalization trap where someone decides "gluten causes my headaches" based on two coincidences and then only notices confirming evidence.

### Temporal relationships require time-shifted analysis

Health correlations are not instantaneous. A heavy workout today affects sleep tonight and recovery tomorrow. A high-glycemic lunch at 1pm produces an energy crash at 3pm. A supplement started this week shows effects over four weeks. The agent must correlate events across different time windows — same-day correlations, next-day correlations, and multi-week trend analysis. This time-shifted analysis is computationally straightforward for an agent but cognitively overwhelming for a human tracking on paper.

---

## Agent-Native Advantages

### Multi-dimensional pattern detection across six months of daily data

The agent holds 180 daily logs in analytical memory, each containing meals, sleep, training, supplements, symptoms, energy, and mood. It can compute every pairwise and three-way correlation between these variables: does food X correlate with symptom Y when sleep is below Z? Does supplement A improve metric B over a rolling 4-week window? Does training volume above threshold C predict recovery quality D? A human reviewing a paper journal might notice one-dimensional patterns ("I get headaches when I don't sleep"). The agent detects multi-dimensional compound triggers that require holding dozens of variables simultaneously.

**What this looks like in practice:** The agent presents in a weekly review: "Your tension headaches have a compound trigger: sleep under 6 hours combined with RPE 8+ lower body training the previous day. This combination has produced headaches in 18 out of 22 occurrences (82%). Neither factor alone is sufficient — poor sleep without heavy training produces headaches only 21% of the time, and heavy training with adequate sleep produces headaches only 11% of the time. The interaction effect is the pattern. Recommendation: on nights following heavy lower body sessions, implement the sleep protection protocol." Lena could not have found this by reviewing her symptom diary because the trigger spans two separate tracking domains and requires computing conditional probabilities across months of data.

### Protocol effectiveness tracking with controlled comparison

When Lena starts a supplement protocol, the agent automatically establishes a baseline period, tracks the intervention period, and computes the difference. It controls for confounding variables where possible — if Lena started magnesium the same week she reduced screen time, the agent tracks both variables to isolate their individual contributions. Human self-experimentation rarely includes baseline measurement, controlled comparison, or confound tracking. The agent does all three automatically because it has the historical data and the computational capacity to analyze it.

**What this looks like in practice:** After four weeks on magnesium glycinate, the agent reports: "Sleep quality rating improved from average 6.2 (baseline) to 7.4 (post-protocol). Nighttime waking reduced from 2.1 to 0.8 per night (62% reduction). Sleep latency decreased from 22 minutes to 12 minutes. Confidence note: you also began reducing evening screen time 5 days after starting magnesium. On nights with screen use after 10pm during the protocol period, sleep quality averaged 7.0 versus 7.6 on nights without late screens. Both interventions likely contribute; the magnesium effect appears larger." This level of analysis transforms personal health experimentation from guesswork into evidence-based decision-making.

### Proactive alert generation from threshold monitoring

The agent does not wait for symptoms to appear and then correlate retroactively. It monitors incoming data in real time against known trigger patterns and alerts proactively. When today's daily log shows 5.5 hours of sleep and yesterday's workout log shows RPE 8 deadlifts, the agent flags the compound trigger before the headache appears: "Today matches the headache trigger pattern (82% probability based on 22 prior occurrences). Consider: extra hydration, avoiding high-glycemic lunch, and having ibuprofen available." This transforms the system from reactive recording to proactive health management.

**What this looks like in practice:** At 8am on a morning after poor sleep, the agent sends an alert as part of the daily orientation: "Last night's sleep was 5.3 hours, and yesterday included RPE 8 squats. This combination has preceded tension headaches 82% of the time in your history. Proactive recommendations: (1) Eat breakfast with 30g+ protein — skipping breakfast amplifies the energy crash risk, (2) Keep lunch under 50g refined carbs, (3) Hydrate to 2L before noon, (4) Consider light activity only today — no RPE 7+ training. These steps have reduced headache incidence in similar conditions in 3 of the 4 cases where you followed them." No human tracker provides this kind of forward-looking, evidence-based, personalized alert because no human tracker holds the complete cross-domain history needed to generate it.

---
---

Topics:
- [[domain-compositions]]
