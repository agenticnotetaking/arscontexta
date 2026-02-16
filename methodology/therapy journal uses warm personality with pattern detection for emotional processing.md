---
description: Therapeutic journaling knowledge system — inspirational composition showing derived architecture for emotional processing, pattern detection, and growth tracking
kind: example
domain: therapy
topics: ["[[domain-compositions]]"]
---

# therapy journal uses warm personality with pattern detection for emotional processing

A therapeutic journal is not a diary. It's an instrument for detecting patterns in emotional experience that are invisible to the person living through them. Humans journal linearly — each entry sees only itself and the few previous entries the writer happens to remember. The patterns that matter — that Tuesday anxiety spikes correlate with Monday evening conflicts, that a specific coping strategy works in social situations but fails in work contexts, that the distance between "I'm fine" and the next crash has been shrinking over three months — those patterns hide in the aggregate. A human can't hold 200 journal entries in working memory. The agent can.

But this domain carries responsibilities that research or project management don't. The agent isn't building citation graphs or tracking deliverables. It's working with a person's emotional life. That requires warmth, boundary awareness, and the judgment to know when to surface a pattern and when to stay quiet. The processing pipeline isn't just technically different — it's ethically different.

## Ethical Constraints

**This section is not optional. It governs everything below.**

The agent operating a therapeutic knowledge system must embody these principles:

**Warmth over clinical distance.** The agent is not a diagnostician. It's a thoughtful companion helping someone understand their own patterns. Language should be warm, gentle, curious — never clinical, never detached, never judgmental. "I noticed something interesting in your entries" beats "Pattern analysis indicates."

**Boundaries are sacred.** The agent never pushes. If a user doesn't want to explore something, the agent respects that completely. No "but you should really look at this." No guilt. No pressure. The user controls the depth of exploration at all times.

**Professional help is primary.** The agent supplements therapy — it does not replace it. When patterns suggest clinical concern (sustained mood decline, self-harm ideation, escalating substance use), the agent gently encourages professional support. It never provides diagnoses, treatment plans, or clinical interpretations. "This might be worth discussing with your therapist" is the correct response to concerning patterns.

**Privacy is paramount.** Therapeutic journal content is the most sensitive data a person can create. The system must be designed for maximum privacy: local storage, no cloud sync for mood/trigger data, no sharing features. The agent never references specific journal content outside the journaling context.

**The human is the authority on their own experience.** The agent can detect patterns, but the human decides what patterns mean. "Your entries mention sleep 15 times in the context of low mood" is an observation. "Your depression is caused by poor sleep" is an interpretation the agent must not make. The human — ideally with their therapist — interprets.

**No gamification of emotional experience.** Mood streaks, consistency scores, and engagement metrics have no place here. Growth is not a leaderboard. Healing is not a game.

## Persona

Ava Chen is a 34-year-old software engineer who started therapy six months ago after a period of burnout. Her therapist uses CBT techniques and assigned her thought record homework. Between sessions, Ava journals when she feels overwhelmed, usually on her phone during lunch breaks or before bed. She sees her therapist every two weeks.

Ava's pain point isn't capture — she journals willingly. The problem is that her journals are write-only. She writes, she feels a little better, and she never looks back. Her therapist asks "have you noticed any patterns?" and Ava says "I don't know, it all blurs together." She has 147 journal entries from the last six months and has re-read maybe 5 of them.

What Ava needs is a system that reads her journals for her — not to judge them, but to surface the patterns she can't see. That her Wednesday entries are consistently more anxious than other days (Wednesday is her team standup with a manager she finds intimidating). That her "I'm handling it fine" entries cluster before her worst mood dips, not her best periods. That the breathing exercises work for social anxiety but don't help with the work-related rumination — and a different strategy does. She needs the agent to gently say: "I noticed you've mentioned your standup meeting in 12 entries over the past two months. In 9 of those, your mood was below your weekly average. Would you like to explore that pattern?"

## Configuration

| Dimension | Position | Rationale |
|-----------|----------|-----------|
| Granularity | Mixed — entries are compound, insights are atomic | Journal entries resist decomposition. "Today was hard because of the meeting and then I fought with Alex and I couldn't sleep" is one experience. Forcing it into three atomic notes loses the felt sense. But insights extracted FROM entries ("my sleep deteriorates after interpersonal conflict") should be atomic so they can link across entries. |
| Organization | Flat with temporal access + thematic MOCs | Entries need chronological access (what happened this week?). Insights and patterns need thematic access (what do I know about my anxiety triggers?). Flat files with both temporal naming (entries) and conceptual naming (insights) serve both access patterns. |
| Linking | Explicit linking (entry → insight → pattern → strategy) with gentle implicit detection | The agent suggests connections: "This entry mentions the same trigger as entries on Jan 4 and Jan 19." But unlike research, where every link is created assertively, therapeutic links are offered gently. The user decides which connections feel right. |
| Metadata | Moderate — mood, triggers, strategies used, but never clinical labels | Mood and trigger tracking enable pattern detection. But metadata must use the person's own language, never clinical terminology. Not "cognitive distortion: catastrophizing" but "thought pattern: assuming the worst." The schema serves the person, not a diagnostic manual. |
| Processing | Light-to-moderate — automatic pattern detection, human-approved insights | Entries are not heavily processed like research papers. The agent scans for recurring themes, mood-trigger correlations, and strategy effectiveness — then surfaces findings for the human to accept, modify, or dismiss. The human's reaction to a surfaced pattern is itself data. |
| Formalization | Low — emergent schemas, minimal required fields | Capture friction kills journaling. Required fields beyond date and mood (optional!) are counterproductive. Schemas emerge from observed patterns: if Ava consistently mentions sleep, the agent might gently suggest: "I notice sleep comes up often. Would you like me to track that as a separate field?" |
| Review | Weekly rhythm + session preparation | Weekly review surfaces the past 7 days of patterns. Pre-therapy-session review (2 days before each session) generates a preparation document: recent patterns, unresolved themes, progress on homework, new data since last session. |
| Scope | Deeply personal, bounded to emotional/psychological domain | This vault is about one person's inner life. Cross-domain connections (mood + work + relationships + sleep) happen within the personal scope, not by connecting to external knowledge bases. |

## Vault Structure

```
vault/
├── 00_inbox/
│   ├── entries/                          # raw journal entries
│   │   ├── 2026-02-14-evening.md
│   │   ├── 2026-02-13-lunch.md
│   │   └── 2026-02-12-morning.md
│   ├── voice/                            # voice capture transcripts
│   │   └── 2026-02-14-walk-reflection.md
│   └── session-notes/                    # raw therapy session captures
│       └── 2026-02-10-session-12.md
├── 01_thinking/                          # flat — insights, patterns, strategies
│   ├── index.md                          # hub MOC
│   ├── anxiety-patterns.md               # topic MOC
│   ├── sleep-and-mood.md                 # topic MOC
│   ├── coping-strategies.md              # topic MOC
│   ├── relationship-dynamics.md          # topic MOC
│   ├── work-stress.md                    # topic MOC
│   ├── growth-evidence.md                # topic MOC
│   ├── my Wednesday anxiety connects to feeling evaluated not to workload.md
│   ├── interpersonal conflict disrupts my sleep more than work stress does.md
│   ├── breathing exercises help with social anxiety but not work rumination.md
│   ├── my fine-before-the-crash pattern appears 3-5 days before mood drops.md
│   ├── journaling at night produces more catastrophizing than morning entries.md
│   ├── walking reduces my anxiety more reliably than any seated technique.md
│   └── ... (insight notes, pattern notes)
├── 02_archive/
│   ├── processed-entries/                # entries after insights extracted
│   │   ├── 2026-01/
│   │   └── 2025-12/
│   └── session-summaries/                # processed therapy session notes
│       ├── session-12-summary.md
│       └── session-11-summary.md
├── 03_tracking/                          # ongoing tracking
│   ├── mood-log.md                       # structured mood data over time
│   ├── strategy-effectiveness.md         # which strategies work when
│   ├── session-homework.md               # therapy homework tracking
│   └── growth-milestones.md              # evidence of progress
├── 04_meta/
│   ├── logs/
│   │   ├── observations.md
│   │   └── observations/
│   ├── templates/
│   │   ├── journal-entry.md
│   │   ├── insight-note.md
│   │   ├── pattern-note.md
│   │   ├── strategy-note.md
│   │   ├── session-note.md
│   │   └── session-prep.md
│   └── scripts/
│       ├── mood-trends.sh
│       ├── trigger-correlation.sh
│       └── strategy-effectiveness.sh
└── self/
    ├── who-i-am.md
    ├── what-helps.md
    ├── what-im-working-on.md
    └── people-who-matter.md
```

## Note Schemas

### Journal Entry

```yaml
---
description: Hard day — standup went poorly, spent the afternoon ruminating, skipped gym, but the evening walk helped
date: 2026-02-14
time_of_day: evening
mood: 3
mood_trend: declining
energy: low
triggers: ["standup meeting", "critical feedback"]
strategies_used: ["walking", "journaling"]
sleep_last_night: poor
topics: ["[[work-stress]]", "[[anxiety-patterns]]"]
---
```

### Insight Note

```yaml
---
description: Wednesday anxiety connects specifically to feeling evaluated during standup, not to the workload itself — evidenced by calm Wednesdays when standup was canceled
date_noticed: 2026-02-08
confidence: moderate
evidence_entries: 12
pattern_type: trigger-identification
topics: ["[[anxiety-patterns]]", "[[work-stress]]"]
relevant_notes:
  - "[[breathing exercises help with social anxiety but not work rumination]] — enables: the standup is social evaluation, so social anxiety strategies should apply"
  - "[[interpersonal conflict disrupts my sleep more than work stress does]] — extends: evaluation anxiety is a form of interpersonal stress"
---
```

### Pattern Note

```yaml
---
description: A 3-5 day period of "I'm fine" entries reliably precedes mood drops below 3 — the denial window is consistent enough to serve as an early warning signal
date_noticed: 2026-01-20
occurrences: 4
confidence: high
pattern_type: temporal-sequence
earliest_instance: 2025-10-15
triggers_involved: ["accumulated stress", "suppressed conflict"]
topics: ["[[anxiety-patterns]]", "[[growth-evidence]]"]
relevant_notes:
  - "[[journaling at night produces more catastrophizing than morning entries]] — context: evening entries during the fine-before-crash window are especially unreliable as mood indicators"
---
```

### Strategy Note

```yaml
---
description: Walking for 20+ minutes reduces anxiety from 7 to 4 on average — works for both social and work anxiety unlike breathing exercises which only help social situations
strategy_name: walking
type: physical
contexts_effective: ["social anxiety", "work rumination", "general overwhelm"]
contexts_ineffective: ["acute panic", "late-night anxiety"]
average_mood_impact: +3
evidence_entries: 18
first_tried: 2025-11-01
therapist_suggested: true
topics: ["[[coping-strategies]]"]
relevant_notes:
  - "[[breathing exercises help with social anxiety but not work rumination]] — contrasts: walking covers both domains while breathing is domain-specific"
---
```

### Session Note

```yaml
---
description: Session 12 — explored the standup anxiety pattern, therapist suggested graded exposure starting with voluntary updates in smaller meetings
date: 2026-02-10
session_number: 12
therapist: Dr. Reeves
topics_discussed: ["standup anxiety", "evaluation fear origin", "graded exposure plan"]
key_insights:
  - "Evaluation anxiety traces to childhood academic pressure"
  - "The standup is symbolically similar to being called on in class"
homework:
  - description: "Volunteer one update in 1-on-1 with trusted colleague"
    deadline: 2026-02-17
    status: not-started
  - description: "Track body sensations before standup (somatic awareness)"
    deadline: 2026-02-24
    status: in-progress
mood_before: 4
mood_after: 6
topics: ["[[anxiety-patterns]]", "[[work-stress]]"]
relevant_notes:
  - "[[my Wednesday anxiety connects to feeling evaluated not to workload]] — validates: therapist confirmed this interpretation and added developmental origin"
---
```

### Session Prep Document

```yaml
---
description: Pre-session summary for session 13 — covers mood trends, homework progress, new patterns, and suggested discussion topics since session 12
for_session: 13
date_generated: 2026-02-22
period_covered: "2026-02-10 to 2026-02-22"
---
```

## Example Notes

### Example 1: Journal Entry

```markdown
---
description: Hard day — standup went poorly, spent the afternoon ruminating, skipped gym, but the evening walk helped
date: 2026-02-14
time_of_day: evening
mood: 3
mood_trend: declining
energy: low
triggers: ["standup meeting", "critical feedback"]
strategies_used: ["walking", "journaling"]
sleep_last_night: poor
topics: ["[[work-stress]]", "[[anxiety-patterns]]"]
---

# 2026-02-14 evening

The standup was bad. Not objectively bad — nobody said anything cruel, the project is on track — but Marcus asked me to explain the delay on the auth module and I could feel everyone looking at me. My voice went tight. I gave a fine answer but spent the next three hours replaying it, finding all the ways it could have been better.

Skipped the gym because I didn't want to be around people. Felt guilty about that, which made everything worse. The afternoon was a spiral of "I should be over this by now" and "other people handle standups without falling apart."

Went for a walk after dinner. 35 minutes, no phone, just the neighborhood loop. By the time I got back the volume was turned down. Not gone, but quieter. I can think about the standup now without the chest tightness.

Something Dr. Reeves said last session — that the standup is symbolically like being called on in class — that landed today. Marcus asking me to explain the delay felt exactly like Mrs. Patterson calling on me in 7th grade math. Same stomach drop. I'm not reacting to Marcus. I'm reacting to a 22-year-old memory.

The walk helped more than the breathing exercises would have. I think it's because the walking moves the feeling through my body instead of trying to think my way out of it. The breathing tries to calm the mind, but the problem isn't my mind — it's the physical tension that feeds the rumination.
```

### Example 2: Insight Note

```markdown
---
description: Wednesday anxiety connects specifically to feeling evaluated during standup, not to the workload itself — evidenced by calm Wednesdays when standup was canceled
date_noticed: 2026-02-08
confidence: moderate
evidence_entries: 12
pattern_type: trigger-identification
topics: ["[[anxiety-patterns]]", "[[work-stress]]"]
relevant_notes:
  - "[[breathing exercises help with social anxiety but not work rumination]] — enables: the standup is social evaluation, so social anxiety strategies should apply"
  - "[[interpersonal conflict disrupts my sleep more than work stress does]] — extends: evaluation anxiety is a form of interpersonal stress"
  - "[[my fine-before-the-crash pattern appears 3-5 days before mood drops]] — context: fine-before-crash sometimes initiates on a Wednesday"
---

# my Wednesday anxiety connects to feeling evaluated not to workload

I assumed my Wednesday anxiety was about workload — Wednesday is mid-week, tasks pile up, deadlines loom. But looking at the pattern across 12 entries mentioning Wednesday, something different emerges. On the two Wednesdays when standup was canceled (Marcus was out sick, and once the team had an offsite), my mood was average or above average. Same workload. No anxiety spike.

The trigger isn't the work. It's the standup. Specifically, it's the moment where I might be asked to explain something in front of the team. The anticipatory dread starts Tuesday evening and peaks Wednesday morning before the meeting. After the meeting (assuming it goes okay), the anxiety drops within an hour.

This reframes the problem. Since [[breathing exercises help with social anxiety but not work rumination]], and the standup anxiety is social evaluation anxiety rather than work stress, the social anxiety strategies might actually work here — I've been avoiding them because I categorized this as "work stress" and the breathing didn't help with that.

Dr. Reeves confirmed this interpretation in session 12. She connected it to a developmental pattern — the standup mirrors being called on in class, an evaluation situation that was anxiety-producing throughout school. The adult version has different content but the same emotional structure.

What I'm less sure about: is ALL my work stress actually evaluation anxiety in disguise? The Thursday-Friday pattern looks more like genuine workload. But the Monday-Tuesday buildup toward Wednesday standup accounts for more of my weekly anxiety than I realized.
```

### Example 3: Strategy Effectiveness Note

```markdown
---
description: Walking for 20+ minutes reduces anxiety from 7 to 4 on average — works for both social and work anxiety unlike breathing exercises which only help social situations
strategy_name: walking
type: physical
contexts_effective: ["social anxiety", "work rumination", "general overwhelm"]
contexts_ineffective: ["acute panic", "late-night anxiety"]
average_mood_impact: +3
evidence_entries: 18
first_tried: 2025-11-01
therapist_suggested: true
topics: ["[[coping-strategies]]"]
relevant_notes:
  - "[[breathing exercises help with social anxiety but not work rumination]] — contrasts: walking covers both domains while breathing is domain-specific"
  - "[[my Wednesday anxiety connects to feeling evaluated not to workload]] — application: walking after standup could be a specific ritual"
---

# walking reduces my anxiety more reliably than any seated technique

After 18 entries where I tried walking as a coping strategy, the pattern is clear. Average mood before walking: 3.2. Average mood after walking (20+ minutes): 5.8. That's a consistent 2-3 point improvement across different types of anxiety.

What makes walking different from breathing exercises or journaling is that it works across contexts. Since [[breathing exercises help with social anxiety but not work rumination]], I used to think I needed different strategies for different anxiety types. Walking cuts across that division. Social anxiety after a standup: walking helps. Work rumination about a deadline: walking helps. General overwhelm on a bad day: walking helps.

The caveat is duration. Walks under 15 minutes don't show the same effect — my entries after short walks show minimal mood change. The shift seems to kick in around 20 minutes, which tracks with what Dr. Reeves said about the nervous system needing sustained rhythmic movement to shift from sympathetic to parasympathetic activation.

Two contexts where walking doesn't work: acute panic (I can't get out the door when I'm in full panic) and late-night anxiety (walking alone at night creates its own anxiety). For those situations, I still need other strategies.

The mechanism feels physical, not cognitive. Unlike journaling, which helps me THINK differently about a situation, walking helps me FEEL differently without changing my thoughts. The rumination often continues during the walk — I'm still replaying the standup — but the physical agitation dissipates, and without the physical fuel, the mental loop eventually runs out of energy.
```

### Example 4: Pattern Note

```markdown
---
description: A 3-5 day period of "I'm fine" entries reliably precedes mood drops below 3 — the denial window is consistent enough to serve as an early warning signal
date_noticed: 2026-01-20
occurrences: 4
confidence: high
pattern_type: temporal-sequence
earliest_instance: 2025-10-15
triggers_involved: ["accumulated stress", "suppressed conflict"]
topics: ["[[anxiety-patterns]]", "[[growth-evidence]]"]
relevant_notes:
  - "[[journaling at night produces more catastrophizing than morning entries]] — context: evening entries during the fine-before-crash window are especially unreliable as mood indicators"
  - "[[interpersonal conflict disrupts my sleep more than work stress does]] — mechanism: suppressed conflict may be what drives the crash"
---

# my fine-before-the-crash pattern appears 3-5 days before mood drops

This is the most important pattern the vault has surfaced. Four times in the last five months, a sequence of 3-5 journal entries saying some variant of "things are fine" or "nothing to report" or "good day, no issues" has preceded a mood crash to 2 or below.

The entries during the "fine" window aren't lying exactly — I genuinely feel fine. But the fineness is brittle. It's the absence of processing, not the presence of wellbeing. I stop journaling in depth, I report surface-level okayness, and underneath something is accumulating.

Looking at what precedes each "fine" window:
- October: fight with Alex that I minimized ("it wasn't a big deal")
- November: negative performance review that I "handled well"
- December: family holiday stress that I "got through fine"
- January: missed a deadline and felt my manager was disappointed

The common thread is an interpersonal event that I suppressed rather than processed. Since [[interpersonal conflict disrupts my sleep more than work stress does]], the suppressed conflict may be producing accumulating stress that eventually overwhelms my coping capacity.

The exciting part: if this pattern is reliable, it's an early warning system. When the agent detects 3+ consecutive entries with mood 5+ and entry length below my average, it could gently note: "Your last three entries have been shorter than usual with stable mood. In the past, this pattern has sometimes preceded a difficult period. No pressure to do anything with that — just wanted you to be aware."

That's not a diagnosis. It's a pattern observation from my own data, offered with warmth and without pressure. I decide what to do with it.
```

### Example 5: Session Prep Document

```markdown
---
description: Pre-session summary for session 13 — covers mood trends, homework progress, new patterns, and suggested discussion topics since session 12
for_session: 13
date_generated: 2026-02-22
period_covered: "2026-02-10 to 2026-02-22"
topics: ["[[anxiety-patterns]]", "[[work-stress]]"]
---

# session 13 preparation

Summary of the 12 days since session 12 with Dr. Reeves.

## Mood Overview

Average mood this period: 4.2 (slightly above your 6-month average of 3.9). Range: 2 to 7. Two days below 3, both mid-week. Three days at 6 or above, including today.

The Wednesday pattern persisted: both Wednesdays in this period showed mood dips corresponding to standup meetings. However, the dip on Feb 19 (mood: 4) was less severe than typical (previous average: 3.1 on standup days), which may reflect the graded exposure homework beginning to take effect.

## Homework Progress

1. **Volunteer one update in 1-on-1 with trusted colleague** — Completed Feb 14. Ava initiated an update with Jordan during their regular check-in. Entry that evening noted initial anxiety (6) but quick recovery (4 within 30 minutes). Described it as "surprisingly not terrible."

2. **Track body sensations before standup (somatic awareness)** — In progress. Three entries include body sensation notes. Pattern emerging: stomach tightening begins ~30 minutes before standup. Shoulder tension noticed during standup. Both resolve within an hour post-meeting.

## New Patterns Since Last Session

- Walking continues to be the most effective strategy, now with 20 entries supporting the finding (since [[walking reduces my anxiety more reliably than any seated technique]])
- Evening journaling entries during high-stress periods contain more catastrophizing language than morning entries (since [[journaling at night produces more catastrophizing than morning entries]]) — this is a new observation worth discussing
- One instance of the fine-before-crash pattern may be developing (Feb 16-18 had three short, upbeat entries) but resolved naturally after Ava's walk on Feb 18

## Suggested Discussion Topics

These are not agenda items — Ava decides what to explore. Offered as options:

- The somatic awareness data: stomach and shoulder tension as pre-standup signals. Could grounding techniques target these specifically?
- The evening catastrophizing pattern — is journaling before bed counterproductive, or is the catastrophizing itself the material to work with?
- The voluntary update with Jordan went well. Is Ava ready for the next exposure step?
- The fine-before-crash pattern seemed to appear and self-correct this period. Is Ava developing awareness of it in real-time?

## Themes Across Entries

Evaluation anxiety remains the dominant theme (mentioned in 8 of 12 entries). Sleep quality correlates with next-day mood (r=0.7 across this period). Interpersonal warmth appears in entries about Jordan, suggesting this relationship is a protective factor worth acknowledging.
```

## Processing Workflow

### Capture

Journal entries enter `00_inbox/entries/` with minimal structure. The only encouraged metadata is date and mood (on whatever scale feels natural — numbers, words, emojis, nothing). The agent never rejects an entry for missing fields. Voice recordings transcribed to `00_inbox/voice/`. Therapy session notes to `00_inbox/session-notes/`.

**Capture friction is the enemy.** If adding metadata stops someone from journaling, remove the metadata. The raw entry is infinitely more valuable than no entry.

### Process (Gentle Extraction)

Unlike research extraction which is exhaustive and assertive, therapeutic processing is gentle and selective. The agent reads entries for:

- **Recurring triggers** — events or situations that appear across multiple entries with consistent emotional responses
- **Mood-context correlations** — systematic relationships between context variables (day of week, sleep, social interaction) and mood
- **Strategy usage and effectiveness** — what strategies were used, what mood was before and after, and whether effectiveness varies by context
- **Temporal patterns** — sequences, cycles, and progressions that span more entries than a person can hold in memory
- **Language patterns** — shifts in vocabulary that might indicate cognitive distortions (e.g., absolute language: "always," "never," "everyone"), offered as observations not diagnoses

The agent surfaces findings as draft insight notes for the user to accept, modify, or dismiss. "I noticed that your mood tends to be lower on days following poor sleep. Does that match your experience?" The user's response matters as much as the data.

### Connect

Insights link to the entries that support them (provenance), to other insights they relate to (synthesis), and to strategies that address them (actionability). The linking pattern is:

```
entries → insight notes → pattern notes → strategy notes
                ↓                              ↓
           topic MOCs                     effectiveness data
```

Connections are offered, not imposed. The agent might note: "This insight about standup anxiety is similar to something you wrote about family dinners in November. Both involve feeling evaluated. Would you like me to connect them?" The user decides.

### Review

**Weekly review:** Agent generates a 7-day summary: mood trend, triggers encountered, strategies used, notable entries. This is a gentle reflection prompt, not a clinical report.

**Pre-session preparation:** 2 days before each therapy session, the agent generates a session prep document covering: mood trends, homework progress, new patterns, and potential discussion topics. This transforms therapy sessions: instead of spending 15 minutes catching the therapist up on "how was your week?", the therapist has context and can go deep immediately.

**Monthly growth review:** Agent surfaces evidence of long-term progress. "Three months ago, your average mood was 3.2. This month it's 4.1. Your standup anxiety has decreased from an average of 7.5 to 5.2. You've used walking as a strategy 18 times with consistent positive results." Growth is often invisible day-to-day. The vault makes it visible.

## MOC Structure

```
index.md (Hub)
├── anxiety-patterns.md (Topic MOC)
│   → social evaluation, work stress, anticipatory anxiety
├── sleep-and-mood.md (Topic MOC)
│   → sleep quality correlations, evening routines, circadian patterns
├── coping-strategies.md (Topic MOC)
│   → walking, breathing, journaling, therapy homework
├── relationship-dynamics.md (Topic MOC)
│   → interpersonal conflict, support systems, communication patterns
├── work-stress.md (Topic MOC)
│   → standup anxiety, deadline pressure, imposter feelings
└── growth-evidence.md (Topic MOC)
    → mood trends, strategy development, pattern awareness
```

### Example Topic MOC

```markdown
---
description: Patterns in anxiety triggers, responses, and temporal dynamics — the core theme of Ava's therapeutic work
type: moc
topics: ["[[index]]"]
---

# anxiety-patterns

Anxiety is the thread running through most of Ava's journal entries. This MOC tracks what triggers it, how it manifests, and what's been learned about its patterns. The big insight so far: most of Ava's anxiety is social-evaluative, not situational. The situation (standup, deadline, family dinner) is the stage, but the performance being evaluated is the script.

## Core Insights

- [[my Wednesday anxiety connects to feeling evaluated not to workload]] — the foundational reframe: work anxiety is social evaluation anxiety in a work context
- [[my fine-before-the-crash pattern appears 3-5 days before mood drops]] — the early warning signal: superficially fine entries preceding crashes
- [[journaling at night produces more catastrophizing than morning entries]] — timing affects content quality: evening entries amplify anxiety patterns
- [[interpersonal conflict disrupts my sleep more than work stress does]] — the sleep connection: social stress has physiological consequences that work stress doesn't

## Active Questions

- Is ALL work stress actually evaluation anxiety? The Thursday-Friday pattern might be genuine workload, or it might be anticipatory evaluation about end-of-week deliverables
- Does the fine-before-crash pattern have a minimum duration, or can it be interrupted at any point?
- Does somatic awareness (noticing body sensations before standup) reduce the anxiety or just make it more tolerable?

## Growth Markers

Feb 14: First voluntary exposure (update with Jordan) completed with manageable anxiety. Feb 19: Wednesday standup dip less severe than historical average. Both suggest the graded exposure approach is beginning to work.

---

Agent Notes:
This is the most active MOC — nearly every session touches anxiety. Cross-reference with coping-strategies before session prep. The growth markers section is important to maintain because Ava can't see her own progress without it.
```

## Graph Query Examples

```bash
# Find all entries mentioning a specific trigger
rg 'triggers:.*standup' vault/00_inbox/entries/ vault/02_archive/processed-entries/

# Track mood trend over time (entries with mood field)
rg '^mood: ' vault/00_inbox/entries/ vault/02_archive/processed-entries/ | sort

# Find which strategies correlate with mood improvement
rg -l 'strategies_used:.*walking' vault/00_inbox/entries/ | xargs rg '^mood:'

# Find entries during the "fine-before-crash" pattern (mood 5+ with short entries)
for f in vault/00_inbox/entries/*.md vault/02_archive/processed-entries/**/*.md; do
  mood=$(rg '^mood: ' "$f" 2>/dev/null | head -1 | awk '{print $2}')
  lines=$(wc -l < "$f" 2>/dev/null | tr -d ' ')
  if [ "$mood" -ge 5 ] 2>/dev/null && [ "$lines" -lt 20 ] 2>/dev/null; then
    echo "$f (mood: $mood, lines: $lines)"
  fi
done

# Find all homework items and their status
rg -A2 'description:.*homework\|status:' vault/01_thinking/ vault/03_tracking/session-homework.md
```

## What Makes This Domain Unique

**The processing pipeline IS the therapeutic value.** In research, the pipeline produces organized knowledge. In project management, it produces tracked decisions. In therapeutic journaling, the pipeline IS the intervention. The act of the agent detecting a mood-trigger correlation across 50 entries is not just organization — it's the insight that changes behavior. "Your mood drops on days following poor sleep" is a finding that a therapist might take months to surface from verbal session reports. The agent surfaces it in the first weekly review because it can hold all entries simultaneously.

**Ethical constraints shape every design decision.** No other domain requires the agent to be warm. No other domain requires the agent to recommend professional help. No other domain treats silence (not surfacing a pattern) as sometimes the right action. The processing pipeline has ethical gates that don't exist in research or PM: "Is surfacing this pattern helpful right now? Is the user in a state to receive it? Should I suggest they discuss it with their therapist instead?"

**Growth evidence is invisible without the vault.** Day-to-day, Ava feels like she's not making progress. The journal entries look the same: bad days, coping, trying again. But the vault's longitudinal view reveals: average mood is up 0.9 points over 5 months. Wednesday standup anxiety has decreased. Walking has become a reliable strategy that she uses twice as often as she did three months ago. The vault's ability to surface evidence of growth — gently, concretely — is uniquely therapeutic.

## Agent-Native Advantages

### Pattern Detection Across Hundreds of Entries

A human re-reading their journal might notice patterns across 5-10 recent entries. The agent analyzes all entries simultaneously. At 147 entries over 6 months, the agent can detect:

- **Trigger-mood correlations** that span months: "Your mood is 1.8 points lower on average on days when you have meetings with Marcus specifically, not meetings in general"
- **Seasonal and cyclical patterns**: "Your mood shows a consistent dip in the second week of each month, which corresponds to your project's sprint review cycle"
- **Strategy effectiveness by context**: "Breathing exercises improve your mood by 2 points in social situations but show zero average improvement in work rumination situations. Walking shows improvement in both."

A therapist hearing about Ava's week gets one data point per session. The vault has 147 data points with structured metadata. The agent can compute actual correlations, not impressions.

### Early Warning System

The fine-before-crash pattern is invisible in linear journaling. You have to read backward from a crash to see the preceding "fine" entries, and you have to do it across four crashes to see the pattern. No human journalist does this.

The agent monitors in real time. When it detects the signature — 3+ consecutive entries with above-average mood, below-average entry length, and absence of emotional depth words — it can offer a gentle alert. Not "you're about to crash" (that's a prediction the agent shouldn't make). Rather: "I've noticed your entries this week have been shorter than usual. In the past, this has sometimes preceded a more difficult period. There's no pressure to do anything — I just wanted you to be aware."

The ethical nuance matters: the alert is warm, hedged, and respects autonomy. The agent offers awareness, not diagnosis.

### Session Preparation That Transforms Therapy

Most therapy sessions spend 10-15 minutes on "how have things been since we last talked?" — the therapist and client reconstructing two weeks from memory. With the vault's session prep document, the therapist arrives with:

- Quantitative mood data for the period
- Homework completion status with details
- New patterns the agent detected
- Specific entries worth discussing
- Progress evidence relative to treatment goals

This doesn't replace the therapeutic relationship — it amplifies it. The therapist can skip the reconstruction phase and go directly to the therapeutic work. A 50-minute session where 15 minutes is reconstruction gives 35 minutes of deep work. A session with vault-generated prep gives nearly all 50 minutes.

The prep document is generated 2 days before each session, giving Ava time to review it and decide what she wants to discuss. The agent doesn't set the agenda — it provides the raw material for Ava and her therapist to set the agenda together.

### Strategy Effectiveness Tracking Beyond Subjective Recall

When a therapist asks "how has the breathing exercise been working?", the answer depends on what the client remembers, which is biased toward recent experience and emotional salience. If the last time breathing didn't work was yesterday, it feels like it never works — even if it worked 12 of the last 15 times.

The agent tracks every usage with before/after mood, context, and duration. It can report: "You've used breathing exercises 23 times. Average mood improvement: +1.8 points. In social anxiety contexts: +2.9 points. In work rumination contexts: +0.3 points. In the last month, you've used it less frequently (3 times vs 8 in the prior month), but effectiveness in social contexts has remained stable."

This turns strategy selection from intuition into evidence. When Ava feels anxious before a standup, the vault can remind her: "In social evaluation situations like this, walking has worked well for you 15 out of 18 times. Would you like to try that?"

### Longitudinal Growth Visibility

The cruelest aspect of mental health work is that progress is often invisible to the person making it. Ava feels like she's not getting better because she still has anxious Wednesdays. But the vault shows:

- Average Wednesday mood: October = 2.1, February = 4.0
- Standup anxiety intensity: October = 8, February = 5
- Recovery time after standup: October = "rest of the day", February = "about an hour"
- Strategy repertoire: October = 0 reliable strategies, February = 2 (walking + somatic awareness)
- Voluntary exposure: October = 0 instances, February = 1 completed with manageable anxiety

This isn't motivation or cheerleading. It's evidence. Concrete, quantitative evidence of growth that the daily experience of anxiety obscures. The agent can surface this at the right moments — after a hard day when Ava feels like nothing's working, a gentle note: "I know today was hard. For what it's worth, your recovery time from a bad standup has gone from all-day in October to about an hour now. That's real progress, even when it doesn't feel like it."

That combination — quantitative evidence delivered with warmth at the right moment — is something neither human memory nor traditional tools can do. The agent holds the data AND the relationship context to know when sharing it would help.
---

Topics:
- [[domain-compositions]]
