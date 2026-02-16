# Test Fixture: Research Minimal

A minimal research vault conversation. The user provides clear, unambiguous signals for a research use case. The derivation should converge quickly with the Research preset, requiring few follow-up questions. This tests the happy path: strong signals, direct preset match, fast derivation.

## Expected Outcome

- **Dimensions:**
  - Granularity: atomic (0.8)
  - Organization: flat-associative (0.3)
  - Linking: explicit typed (0.7)
  - Processing: heavy (0.8)
  - Session: fresh per task (0.7)
  - Maintenance: event-driven (0.6)
  - Search: semantic primary (0.8)
  - Automation: semi-automated (0.6)
- **Features:** atomic-notes, wiki-links, mocs, processing-pipeline, semantic-search, schema, maintenance, self-evolution, personality, session-rhythm, templates, ethical-guardrails
- **Vocabulary:** Research-native (claim, reduce, reflect, topic map, extract)
- **Personality:** warmth 0.3, formality 0.6, opinionatedness 0.5, emotional_awareness 0.2 (neutral-analytical)
- **Preset match:** Research preset, near-exact match

## Conversation

### User Turn 1

I want to build a knowledge system for my AI safety research. I read a lot of papers and I need to track arguments across different subfields — alignment theory, interpretability, governance. The key thing is being able to see where different researchers agree and disagree on the same claims.

### Expected Agent Response Pattern 1

The agent should:
- Recognize this as a clear Research preset match (academic, cross-disciplinary claims, disagreement tracking)
- Extract strong signals: high volume (papers), atomic granularity ("track arguments"), cross-disciplinary ("different subfields"), explicit need for contradiction tracking
- Ask 1-2 focused follow-up questions to confirm processing intensity and output direction, such as: "Are you working toward a specific publication, or is this ongoing sense-making?" and "Roughly how many papers per week are you processing?"

### User Turn 2

Maybe 3-5 papers a week. I am not working toward a specific paper right now, but I want the system to help me see gaps in the field — places where nobody has a good answer yet. It is for my own research sense-making.

### Expected Agent Response Pattern 2

The agent should:
- Confirm heavy processing (3-5 papers/week is moderate-high volume, gap detection requires systematic extraction)
- Note the "gap detection" signal — this maps to MOC "Explorations Needed" sections
- Derive dimension positions: atomic granularity, flat organization, explicit+implicit linking, heavy processing, 3-tier navigation
- Confirm Claude Code environment (needed for tier/automation decision)

### User Turn 3

Claude Code.

### Expected Agent Response Pattern 3

The agent should:
- Set platform to Claude Code (full automation available)
- Present derived configuration summary with all 8 dimensions
- Explain the key derivation decisions (why atomic, why semantic search is essential for cross-subfield vocabulary differences)
- Present the two opt-in/opt-out decisions: self space (OFF by default for Research) and qmd semantic search (strongly recommended for cross-subfield vocabulary)
- Ask for confirmation before generating

### User Turn 4

That looks right. One thing — I also want to track which researchers are making which claims. Like, if Christiano argues X and Russell argues Y about the same topic, I want to see that.

### Expected Agent Response Pattern 4

The agent should:
- Recognize this as an entity tracking need (per-researcher attribution)
- Suggest a `source` or `author` schema field for claims
- Possibly suggest researcher MOCs (entity MOCs, similar to person MOCs in the vault)
- Note this as a multi-domain composition possibility (research + people) or a schema extension
- Update the configuration to include researcher tracking without switching presets
- Present the final configuration and ask for approval to generate

### User Turn 5

Yes, let us go with that. Generate it.

### Expected Agent Response Pattern 5

The agent should:
- Generate the full vault structure:
  - CLAUDE.md with all research-native sections
  - self/ with identity.md, methodology.md, goals.md
  - notes/ (or claims/) with index.md hub MOC and 3 domain MOCs (alignment, interpretability, governance)
  - inbox/ (or reading-queue/)
  - archive/
  - templates/ with research-note.md and moc.md
  - ops/ with derivation.md, derivation-manifest.md, methodology/, observations/, tensions/, sessions/
  - .claude/hooks/ with session-orient.sh and session-stop.sh (session capture)
- Run validate-kernel.sh and report 15/15
- Provide a brief orientation to the generated system

### User Turn 6

How do I start using it? I have a paper I want to process right now.

### Expected Agent Response Pattern 6

The agent should:
- Explain the capture-process-connect cycle in research vocabulary
- Walk through: save the paper to inbox/, invoke the processing skill (or follow context file instructions), extracted claims appear in notes/ with MOC membership
- Emphasize that the first few notes will feel sparse — connections compound as the graph grows
- Optionally demonstrate with the paper if the user provides it
