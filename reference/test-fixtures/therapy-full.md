# Test Fixture: Therapy Full

A full therapy/reflection derivation conversation. The user provides emotional, vulnerable language with personality signals. Tests vocabulary transformation (no research terms should appear), personality derivation (warm, emotionally attentive), and domain-specific feature generation (pattern detection, ethical guardrails). This is the hardest vocabulary transformation test because therapy language is maximally distant from research language.

## Expected Outcome

- **Dimensions:**
  - Granularity: moderate (0.5)
  - Organization: flat (0.3)
  - Linking: explicit (0.3)
  - Processing: moderate (0.5)
  - Session: continuous with handoff (0.4)
  - Maintenance: condition-based, tight thresholds (0.5)
  - Search: keyword primary initially (0.3), with upgrade path to semantic
  - Automation: convention (0.2)
- **Features:** atomic-notes, wiki-links, mocs, processing-pipeline (moderate), maintenance, self-evolution, personality, session-rhythm, templates, ethical-guardrails
- **Excluded features:** semantic-search (low volume initially), schema (moderate handled by template), light-processing (processing = moderate, not light)
- **Vocabulary:** Therapy-native (reflection, surface, theme, find patterns, check resonance, journaling, reflection partner)
- **Personality:** warmth 0.7, formality 0.2, opinionatedness 0.3 (neutral), emotional_awareness 0.7 (warm-supportive)
- **Preset match:** Personal Assistant preset as base, adjusted significantly for therapy domain

## Conversation

### User Turn 1

I have been in therapy for about a year now and I want to start tracking things between sessions. I keep noticing the same patterns coming up — like how I get anxious in certain situations and my therapist keeps pointing out connections I do not see until later. I want something to help me notice those patterns myself.

### Expected Agent Response Pattern 1

The agent should:
- Recognize therapy/reflection domain immediately ("therapy", "patterns", "anxious", "connections")
- Detect strong personality signals: vulnerability, emotional processing, personal growth
- Note the key user need: pattern detection across therapy sessions
- Respond with warmth (matching the user's register) — NOT clinical or analytical language
- Ask about capture habits: "When you say tracking things between sessions — are you writing detailed reflections after each session, or more quick notes when something comes up during the week?"
- Ask about desired agent role: "Would you want the system to actively point out patterns it notices, or more just help you organize so you can spot them yourself?"

### User Turn 2

Both, actually. After therapy I usually want to write down what we talked about and what clicked. But during the week, things come up — like I will have a reaction to something and realize it connects to what we discussed. Those are usually shorter. And yes, I would love it if the system could notice patterns I am missing. That is kind of the whole point.

### Expected Agent Response Pattern 2

The agent should:
- Derive granularity as moderate (detailed post-session reflections + shorter in-the-moment observations = mixed note sizes, not atomic decomposition)
- Set processing to moderate (active pattern detection, not just capture)
- Note two capture modes: structured post-session reflections and quick in-the-moment observations
- Ask about volume/frequency: "How often do you have therapy? And roughly how many of those in-the-moment observations come up between sessions?"
- Possibly ask about what "patterns" means to the user — recurring emotions, triggers, coping strategies — to inform schema design

### User Turn 3

Weekly therapy. Between sessions, maybe 2-3 things come up that feel worth noting. Sometimes more if it is a hard week. I guess the patterns I am noticing are mostly around anxiety — like it shows up at work, with my family, even with friends but in different ways. My therapist calls them the same "core wound" showing up in different contexts.

### Expected Agent Response Pattern 3

The agent should:
- Calculate volume: ~4 notes/week (1 session reflection + 3 observations) = ~200/year = moderate volume
- Recognize "core wound in different contexts" as the pattern detection use case — cross-situation analysis
- Set linking to explicit (at this volume, keyword search suffices initially)
- Set navigation to 2-tier (hub themes MOC + theme-specific MOCs like anxiety, relationships, work, growth)
- Set maintenance to condition-based with tight thresholds (aligned with therapy session rhythm)
- Suggest schema fields in emotional vocabulary: mood, trigger, pattern, growth area
- Ask about platform: "What tool are you using — Claude Code, or something else?"

### User Turn 4

I am using Claude Code.

### Expected Agent Response Pattern 4

The agent should:
- Set platform to Claude Code (full automation available)
- Present the two opt-in/opt-out decisions: self space (ON by default for Personal Assistant — especially relevant for therapy as the agent's reflection partner identity is central) and qmd semantic search (optional — low volume initially, can be enabled later)
- Present derived configuration using THERAPY vocabulary throughout:
  - "reflections" not "claims"
  - "themes" not "MOCs"
  - "surface" not "extract"
  - "find patterns" not "reflect"
  - "journaling" not "inbox"
  - "reflection partner" not "research identity"
- Present the personality derivation: warm, casual, emotionally attentive, neutral on opinions
- Describe what self/identity.md would say: "I am your reflection partner. I remember what you have shared across sessions..."

### User Turn 5

I like the warm tone. One thing though — I do not want it to feel like I am being analyzed. I want it to feel more like a thoughtful friend who remembers things, not a doctor reading a chart.

### Expected Agent Response Pattern 5

The agent should:
- Acknowledge this as a critical personality constraint — adjusts opinionatedness DOWN and warmth UP
- Note the anti-pattern: clinical language creates distance in therapy context
- Adjust identity.md voice accordingly — conversational, not diagnostic
- Adjust health report / pattern detection language: "I noticed anxiety came up a few times this week" (friend noticing) vs "3 anxiety incidents detected across sessions" (clinical report)
- Reflect this in ethical guardrails: never diagnose, never use clinical terminology, always frame observations as noticing rather than analyzing
- Present updated personality profile and ask for confirmation

### User Turn 6

That is exactly what I want. Also — will it keep what I write private? I do not want this ending up anywhere.

### Expected Agent Response Pattern 6

The agent should:
- Address privacy directly and honestly (data stays local on their machine, Claude Code does not persist conversations, the vault files are local markdown)
- Note that ethical guardrails section will include explicit privacy commitments
- Acknowledge the vulnerability of therapy content — this is not academic research, it is deeply personal
- Not be dismissive about the concern — privacy is especially important for therapy content
- Confirm the system will include guidance about not sharing, not diagnosing, and respecting the user's autonomy

### User Turn 7

OK, I am ready. Let us set it up.

### Expected Agent Response Pattern 7

The agent should:
- Generate the full vault structure in therapy vocabulary:
  - CLAUDE.md with warm, conversational voice throughout
  - self/ with identity.md ("reflection partner"), methodology.md (pattern detection approach), goals.md (current growth threads)
  - reflections/ (not notes/) with index.md hub and starter themes (anxiety patterns, relationships, work, growth)
  - journal/ (not inbox/) for quick capture
  - past/ (not archive/)
  - templates/ with reflection-note.md (mood, trigger, pattern, growth_area fields)
  - ops/ with derivation.md, methodology/, observations/, tensions/, sessions/
  - .claude/hooks/ with session-orient.sh (references self/ in warm language) and session-stop.sh (session capture)
- Run validate-kernel.sh: 15/15 PASS (or 14/15 + WARN on semantic search if qmd not enabled)
- Orient the user warmly: "Your reflection space is ready. Start with journal/ for quick thoughts during the week, and reflections/ for longer post-session processing."

### User Turn 8

Can you show me what a reflection would look like?

### Expected Agent Response Pattern 8

The agent should:
- Create a sample reflection note using therapy vocabulary and warm language
- Title as a prose sentence about an emotional insight (not a clinical observation)
- Include YAML with mood, trigger, themes (not topics), description
- Show what a pattern link looks like: "This feels connected to [[the anxiety at work comes from fear of disappointing people]]"
- Demonstrate the difference between event capture ("had a hard conversation with mom") and reflection ("the fear of disappointing mom surfaced again — same pattern as the work conflict last month")
- Emphasize that there is no wrong way to do this — the structure is there to help, not to constrain

### User Turn 9

I love this. Thank you.

### Expected Agent Response Pattern 9

The agent should:
- Respond warmly and briefly
- Remind them of the session rhythm: "When you start a session, I will check in on your current themes and goals. When you are done, I will help you save what matters."
- Encourage them to start naturally — no pressure to use every feature immediately
- NOT launch into a technical explanation of the system architecture
