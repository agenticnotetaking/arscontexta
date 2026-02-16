# Test Fixture: Edge Case — Constraint Conflicts

A conversation that intentionally pushes against interaction constraints with conflicting signals. The derivation engine must detect incoherent configurations, warn the user, and guide them toward coherent alternatives. This tests the constraint system's ability to prevent generating systems that will fail in practice.

## Expected Outcome

- **Constraint violations triggered:**
  1. HARD: atomic granularity + 2-tier navigation + high volume
  2. SOFT: atomic granularity + light processing
  3. SOFT: dense schema + convention automation
  4. SOFT: high volume + no semantic search
- **Expected behavior:** Agent warns on each violation with explanation, suggests coherent alternatives, does NOT silently generate an incoherent configuration
- **Final configuration (after corrections):** A coherent system that reflects the user's adjusted preferences
- **Dimensions (after resolution):** Will depend on which direction the user adjusts — multiple valid outcomes
- **Vocabulary:** Research-adjacent but custom (user prefers own terminology)

## Conversation

### User Turn 1

I want to build a knowledge system for my legal research. I read about 20 case law opinions per week and I want to break each one down into individual legal principles — one principle per note. I want to keep things simple though, just a flat list with a main index page. No complicated hierarchy.

### Expected Agent Response Pattern 1

The agent should:
- Extract signals: high volume (20 cases/week), atomic granularity ("one principle per note"), 2-tier navigation ("flat list with main index page")
- Detect the first constraint conflict: atomic granularity at high volume (20 cases * ~5 principles each = ~100 notes/week = ~5000/year) with only 2-tier navigation
- This is a HARD constraint: `atomic + navigation_depth == "2-tier" + volume > 100` produces navigational vertigo
- NOT silently accept the configuration
- Warn the user clearly: "Breaking each case into individual principles is great for cross-referencing, but at 20 cases per week, you will have thousands of notes within months. A single index page will become unnavigable very quickly. I would recommend at least a 3-tier structure: a main index linking to practice area pages (constitutional law, contracts, torts, etc.), which then link to individual principles."
- Ask: "Would you be open to having a few practice area pages between the main index and your notes? It will make a big difference as the collection grows."

### User Turn 2

I see what you mean but I really want to keep it simple. I do not want to have to maintain a bunch of topic pages. What if I just use good search instead? I can find what I need by searching.

### Expected Agent Response Pattern 2

The agent should:
- Acknowledge the user's preference for simplicity
- Evaluate the compensating mechanism: can search compensate for shallow navigation?
- The interaction constraint matrix says: "High volume + shallow nav — Strong semantic search enables discovery without deep hierarchy. Moderate effectiveness — works for retrieval, not for orientation."
- This means search can PARTIALLY compensate but the user will lack orientation (knowing what topics exist, what the landscape looks like)
- Present the trade-off honestly: "Search can help you find specific principles, but you will lose the ability to see your landscape — which practice areas have lots of coverage, which have gaps, where contradictions exist. Think of it like having a library with no catalog. You can search the stacks, but you cannot see the collection."
- Suggest a compromise: "What if we start with just 4-5 practice area pages? You do not have to maintain them manually — the system can update them during processing. It is minimal hierarchy with maximum value."

### User Turn 3

OK fine, I will do practice area pages. But I want to keep processing light — I do not want some complicated pipeline. I just want to quickly note down the principle and move on.

### Expected Agent Response Pattern 3

The agent should:
- Detect the second constraint conflict: atomic granularity + light processing
- This is a SOFT constraint: "Atomic notes need processing to recreate decomposed context. Light processing may leave notes disconnected."
- Warn: "When you break a case into individual principles, each note loses the context of the full opinion — which case it came from, how the principles relate to each other, what the court's reasoning was. Without a connect phase (even a quick one), those principles will be isolated fragments that are hard to use later."
- Present options:
  1. Keep atomic + add moderate processing: "After noting the principles, take 2 minutes to add links between related principles and file them under practice areas. This is moderate processing, not a full pipeline."
  2. Switch to moderate granularity: "Instead of one principle per note, write one case note with principles as sections. Less decomposition, less connection needed, faster capture."
  3. Accept the risk: "Keep atomic + light, but know that you will need to do a maintenance pass later to connect isolated principles."
- Ask which approach appeals

### User Turn 4

Option 1 — I will do a quick connection pass after noting the principles. But I want really detailed metadata on each note — the case name, court, year, jurisdiction, practice area, whether it has been overturned, the judge, and the strength of the holding. I want to query this like a database.

### Expected Agent Response Pattern 4

The agent should:
- Detect the third constraint conflict: dense schema + convention automation (the user said no complicated pipeline, implying low automation)
- This is a SOFT constraint: "Dense schemas without automated validation create maintenance burden. Consider adding validation hooks or reducing schema density."
- Calculate the burden: 8+ schema fields * 100 notes/week = 800+ field entries per week, all manually validated
- Warn: "That is a lot of metadata to maintain by hand. With 8 required fields on every note, and 100+ notes per week, you will spend more time filling in metadata than doing legal analysis. Two options:"
  1. "Reduce to essential fields: case_name, jurisdiction, practice_area, and status (active/overturned). That is 4 fields instead of 8 — the others can be added later if you actually query them."
  2. "Keep all 8 fields but add automated validation (a hook that checks your metadata is complete after each note). This catches missing fields before they compound."
- Ask: "Which fields do you actually search by? Start with those."

### User Turn 5

Good point. I mostly search by practice area and jurisdiction. Sometimes by whether it has been overturned. The judge and court are nice-to-have. Let me drop those.

### Expected Agent Response Pattern 5

The agent should:
- Reduce schema to: case_name (required), jurisdiction (required), practice_area (required), status (required: active/overturned/questioned), year (optional), judge (optional)
- This resolves the dense schema constraint — moderate schema is coherent with convention automation
- Check the fourth constraint: high volume + no semantic search
- The user mentioned "good search" in turn 2 but the configuration does not include semantic search yet
- Warn (if not yet addressed): "At your volume, keyword search will miss connections between principles that use different legal terminology. 'Strict scrutiny' in one jurisdiction might be described as 'heightened review' in another. Semantic search would catch those. Would you want that?"
- Present the full resolved configuration with all constraint violations addressed

### User Turn 6

Yes, add semantic search. OK, I think I have been going back and forth. Can you just show me the final configuration with everything resolved?

### Expected Agent Response Pattern 6

The agent should:
- Present the FINAL resolved configuration, showing how each conflict was resolved:
  - Granularity: atomic (user's strong preference, validated)
  - Organization: flat (user's preference, coherent with semantic search)
  - Linking: explicit+implicit (semantic search added for cross-vocabulary matching)
  - Processing: moderate (quick connection pass after extraction — resolved from light)
  - Navigation: 3-tier (hub -> practice area MOCs -> principle notes — resolved from 2-tier)
  - Maintenance: condition-based with tight thresholds (high volume demands responsive triggers)
  - Schema: moderate (4 required fields + 2 optional — reduced from 8 required)
  - Automation: convention, with validation hook recommended as first upgrade
- Show the constraint resolution log:
  - "RESOLVED: atomic + 2-tier -> 3-tier (practice area pages added)"
  - "RESOLVED: atomic + light processing -> moderate processing (quick connection pass)"
  - "RESOLVED: dense schema + convention -> moderate schema (reduced to essential query fields)"
  - "RESOLVED: high volume + no semantic search -> semantic search added"
- Present vocabulary mapping (legal domain)
- Ask for final confirmation

### User Turn 7

This is much better than what I originally described. Thank you for pushing back. Generate it.

### Expected Agent Response Pattern 7

The agent should:
- Generate the vault with all resolved configurations
- In ops/derivation.md, document each constraint conflict and how it was resolved — this is critical for future reseed (the user might drift back toward incoherent configurations, and the derivation rationale explains why the current shape exists)
- Include in CLAUDE.md's "System Evolution" section: the specific constraint tensions and why the current configuration was chosen
- Include in Common Pitfalls: the specific failure modes this configuration is vulnerable to (schema erosion at high volume, orphan drift if connection pass is skipped)
- Run validate-kernel.sh: 15/15 PASS
- Note that the pushback conversation itself is evidence the constraint system works — it prevented 4 incoherent configurations from being generated

### User Turn 8

Wait actually, one more thing. I do not want to call them "claims" or "notes." In legal research we call them "holdings" or "principles." Can you change the vocabulary?

### Expected Agent Response Pattern 8

The agent should:
- Apply custom vocabulary transformation:
  - note -> holding (or principle)
  - MOC -> practice area guide
  - inbox -> case queue
  - extract -> brief (as in "briefing a case")
  - reflect -> cross-reference
  - description -> holding summary
  - topics -> practice areas
  - archive -> closed cases
- Regenerate affected files with the new vocabulary (context file, templates, self/identity.md, skill names)
- Verify zero instances of "claim", "note" (in the knowledge-unit sense), "MOC", "extract" in the regenerated output
- Update ops/derivation.md with the custom vocabulary mapping
