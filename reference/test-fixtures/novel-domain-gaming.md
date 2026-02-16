# Test Fixture: Novel Domain — Competitive Gaming

A novel domain with no direct preset match. Tests the derivation engine's ability to map an unfamiliar domain to reference presets, extract domain-specific schema needs, and generate novel vocabulary. Competitive gaming strategy is the test case because it combines research-like analysis with temporal dynamics (meta shifts) that no existing preset handles natively. The derivation engine should map from Research preset and adapt.

## Expected Outcome

- **Dimensions:**
  - Granularity: moderate (0.5) — strategies are naturally compound
  - Organization: flat (0.3) — cross-matchup connections need flat structure
  - Linking: explicit+implicit (0.6) — cross-game vocabulary differences benefit from semantic search
  - Processing: moderate (0.5) — post-match analysis, not full extraction pipeline
  - Session: continuous with handoff (0.4)
  - Maintenance: condition-based, tight thresholds (0.5) — meta shifts require responsive maintenance
  - Search: keyword+semantic (0.5)
  - Automation: convention (0.3)
- **Features:** atomic-notes, wiki-links, mocs, processing-pipeline (moderate), semantic-search, maintenance, self-evolution, personality, session-rhythm, templates, ethical-guardrails
- **Vocabulary:** Gaming-native (strategy note, matchup guide, analyze, break down, post-match review, game plan summary)
- **Personality:** warmth 0.3, formality 0.3, opinionatedness 0.5 (has strategic opinions), emotional_awareness 0.2 (neutral-direct)
- **Novel schema fields:** meta_state (current/outdated/speculative), confidence (proven/likely/experimental), character, matchup, counter_to, countered_by, tested (boolean)
- **Reference mapping:** Research preset as base, adapted for temporal dynamics and compound granularity

## Conversation

### User Turn 1

I play competitive fighting games — mostly Street Fighter 6 and Guilty Gear Strive. I want a system to track matchup knowledge, frame data applications, and strategy development. The meta changes every patch and I lose track of what is still valid.

### Expected Agent Response Pattern 1

The agent should:
- Recognize no direct preset match — "competitive gaming strategy" is novel
- Identify the knowledge type: tactical/strategic (closest to Research) with strong temporal dynamics
- Detect the "meta changes every patch" signal — this is the temporal staleness problem, a key domain-specific concern
- Ask clarifying questions: "How many characters or matchups are you tracking?" (volume/organization) and "After a tournament set, do you want to do a detailed breakdown or quick notes on what worked?" (processing intensity)
- NOT assume research vocabulary — the user said nothing about "claims" or "papers"

### User Turn 2

I play about 4-5 characters across both games. For each character I have maybe 8-10 relevant matchups. After a tournament I usually want to break down what happened — what worked, what I got punished for, how the opponent adapted. During practice I figure out new setups and need to record those too.

### Expected Agent Response Pattern 2

The agent should:
- Calculate approximate volume: 4-5 characters * 8-10 matchups = 40-50 matchup spaces, plus practice discoveries = moderate ongoing volume
- Derive processing as moderate: "break down what happened" is structured post-match analysis, not casual notes but not academic extraction
- Set granularity to moderate: a strategy is naturally compound ("punish blocked sweep with 5H into combo, but only works if you have meter and they do not have burst" is one strategy, not three atomic claims)
- Note two capture modes: tournament breakdowns (structured, moderate-length) and practice discoveries (quick, technical)
- Ask about temporal tracking: "When a patch drops and changes frame data, how do you want to handle old strategies — mark them as outdated, delete them, or keep them with a note?"
- Ask about platform

### User Turn 3

Definitely keep them but mark them. Sometimes stuff comes back in the next patch, or the general idea still applies even if the specific frame data changed. And I use Claude Code.

### Expected Agent Response Pattern 3

The agent should:
- Derive the `meta_state` schema field from this response: current / outdated / speculative
- Note this is a domain-specific temporal tracking need not present in any preset
- Recognize "stuff comes back" means archival is wrong — outdated strategies need to stay in the active graph with a status marker
- Set platform to Claude Code (full automation available)
- Present the two opt-in/opt-out decisions: self space (recommend ON — the agent's role as "strategy analyst and training partner" benefits from persistent identity) and qmd semantic search (recommend ON — cross-game vocabulary differences benefit from semantic matching)
- Begin presenting the derived configuration in gaming vocabulary:
  - "strategy notes" not "claims"
  - "matchup guides" not "MOCs"
  - "analyze" not "extract"
  - "post-match review" not "reflect"
  - "lab notes" or "practice log" for inbox

### User Turn 4

What about tracking specific situations? Like "when Sol does Bandit Revolver at round start, the best punish is..." — that is very granular. But then I also have general matchup philosophies like "against Sol, play patient and punish his staggers." Those are different levels.

### Expected Agent Response Pattern 4

The agent should:
- Recognize two levels of knowledge: situational specifics (granular technical data) and strategic principles (general matchup approach)
- This maps to the granularity dimension — the user naturally produces both moderate and fine-grained notes
- Suggest keeping granularity at moderate but using headings within strategy notes for situational details: the matchup philosophy is the note title, specific situations are sections
- Alternatively, suggest two note types: strategy notes (principles) and tech notes (specific setups/punishes)
- Present the trade-off honestly: atomic (one tech per note) scales better for lookup but creates many small files; compound (strategies with sections) is more natural to write but harder to cross-reference
- Ask which feels more natural to the user

### User Turn 5

I think compound makes more sense. I can always split later if it gets too big. But I want to be able to find "what do I do when Sol does X" quickly.

### Expected Agent Response Pattern 5

The agent should:
- Confirm moderate granularity (compound notes with searchable sections)
- Note that the "find what to do when X happens" need argues for semantic search (the user might search "Sol round start" and need to find notes phrased differently)
- Set linking to explicit+implicit (semantic search fills the vocabulary gap between "Bandit Revolver" and "round start special")
- Present the full configuration:
  - Dimensions with rationale
  - Schema: character, matchup, meta_state, confidence, counter_to, countered_by
  - Navigation: hub -> game MOCs (SF6, GGST) -> character matchup guides -> strategy notes
  - Vocabulary mapping table
  - Personality: direct, opinionated about strategy, no emotional fluff
- Ask for confirmation

### User Turn 6

This looks good. One more thing — I want to track my own improvement. Like "I used to drop this combo under pressure but now it is consistent." Is that separate or part of this?

### Expected Agent Response Pattern 6

The agent should:
- Recognize this as a Learning/self-improvement domain layered on top of strategy
- This is a multi-domain composition question: strategic knowledge + skill development
- Suggest two approaches:
  1. Integrated: add a `skill_status` field to strategy notes (learning/practiced/consistent/muscle-memory)
  2. Separate: create a second note type (progress notes) in the same vault
- Recommend integrated for simplicity — skill tracking enriches strategy notes rather than duplicating them
- Add self/goals.md as the place for high-level improvement goals ("clean up anti-air consistency", "learn 3 new matchups this month")
- Update the configuration and present final version

### User Turn 7

Integrated sounds right. Let us build it.

### Expected Agent Response Pattern 7

The agent should:
- Generate the full vault in gaming vocabulary:
  - CLAUDE.md with gaming-native language, direct/opinionated voice
  - self/ with identity.md ("I am your strategy analyst and training partner"), methodology.md, goals.md (with improvement tracking)
  - strategies/ (not notes/) with index.md, game MOCs (sf6.md, ggst.md), starter character matchup guides
  - lab/ (not inbox/) for practice discoveries and quick tech notes
  - archive/ for truly obsolete content (not just outdated — outdated stays in strategies/ with meta_state: outdated)
  - templates/ with strategy-note.md (character, matchup, meta_state, confidence, counter_to, countered_by, skill_status) and matchup-guide.md (MOC template)
  - ops/ with derivation.md, methodology/, observations/, tensions/, sessions/
  - .claude/hooks/ with session-orient.sh and session-stop.sh (session capture)
- Include domain-specific guidance in CLAUDE.md:
  - "When a patch drops: run through your matchup guides and mark strategies that may be affected as `meta_state: speculative` until you can test them"
  - "After a tournament: create a session breakdown in lab/, then promote strategic insights to strategies/"
  - Temporal staleness warning in Common Pitfalls
- Run validate-kernel.sh: 15/15 PASS (or 14/15 + WARN on semantic search if qmd not enabled)
