# Test Fixture: Multi-Domain Composition

Adding a second domain (relationship tracking) to an existing research vault. Tests the composition mechanism: shared graph with separate templates, separate processing intensities, cross-domain linking, and unified navigation. The key validation is that the second domain does not corrupt the first — different processing pipelines, different schemas, different maintenance sensitivities coexist in one graph.

## Expected Outcome

- **Dimensions (Research domain — existing, unchanged):**
  - Granularity: atomic (0.8)
  - Processing: heavy (0.8)
  - Linking: explicit+implicit (0.7)
  - Navigation: 3-tier
  - Schema: moderate (research-note template)
  - Maintenance: condition-based (tight thresholds)

- **Dimensions (Relationships domain — new addition):**
  - Granularity: moderate (0.5)
  - Processing: light (0.3)
  - Linking: explicit (0.3)
  - Navigation: 2-tier (hub + per-person MOCs)
  - Schema: moderate (person-note template with emotional_context, follow_up fields)
  - Maintenance: condition-based (lax thresholds)

- **Composition rules validated:**
  1. Shared graph (wiki links cross domains)
  2. Separate templates (research-note.md and person-note.md)
  3. Separate processing (heavy pipeline for research, light capture for relationships)
  4. Shared navigation (hub MOC links to both domains)
  5. Cross-domain links are natural, not forced

- **Features added:** entity MOCs (per-person), relationship-note template
- **Features preserved:** everything from the existing research vault
- **Vocabulary:** Research vocabulary preserved for existing domain; relationship vocabulary for new domain (memory, notice, person page, encounters)
- **Configuration:** unchanged from existing vault

## Conversation

### User Turn 1

I already have a research vault set up with Ars Contexta. Now I also want to track people I work with — collaborators, researchers I follow, people I meet at conferences. I want to remember what they work on, what we have discussed, and follow up on things.

### Expected Agent Response Pattern 1

The agent should:
- Recognize this as a multi-domain composition request — adding Relationships domain to existing Research domain
- Identify signals: entity-centric organization (per-person), light processing ("remember" not "analyze"), follow-up tracking
- Confirm the existing vault: "You already have a research vault — I will add relationship tracking alongside it without changing your existing setup"
- Ask about scope: "How many people are you tracking — a handful of close collaborators, or dozens of conference contacts?"
- Ask about cross-domain linking needs: "When you meet a researcher, do you want to link their person page to the research claims they have influenced?"

### User Turn 2

Maybe 15-20 people actively. The cross-domain linking is exactly what I want — like if I read a paper by someone I know, the claim should link to their person page. And if I have a conversation with a collaborator about a topic, I want to see that on their page and in the research notes.

### Expected Agent Response Pattern 2

The agent should:
- Set volume to moderate (15-20 active people, slow growth)
- Confirm cross-domain linking is a primary value — this validates flat organization (per-person folders would block cross-domain linking)
- Derive relationship domain configuration:
  - Granularity: moderate (per-encounter observations, not atomic decomposition of conversations)
  - Processing: light (capture + connect, not extraction pipeline)
  - Navigation: 2-tier (relationships hub -> per-person MOCs)
  - Schema: moderate (person, relationship_type, last_contact, emotional_context, follow_up)
  - Maintenance: condition-based with lax thresholds (relationships change slowly)
- Ask about vocabulary preference: "For relationship notes, would you call them 'observations', 'memories', or something else? And the person pages — 'person page', 'collaborator page', or just their name?"

### User Turn 3

I think just "observations" for the notes and their name for the person page — like "Sarah Chen.md" is her page. I want the follow-up tracking to be important — like if Sarah mentions she is submitting to NeurIPS, I want a reminder to ask how it went next time I see her.

### Expected Agent Response Pattern 3

The agent should:
- Set vocabulary: observations for notes, names for person MOCs
- Recognize the follow-up need — this maps to `follow_up` field in schema AND potentially to ops/reminders.md for time-bound follow-ups
- Distinguish between:
  - Schema follow-up: `follow_up: true` on an observation (flags it for next interaction)
  - Timed reminder: ops/reminders.md entry "2026-03-01: Ask Sarah about NeurIPS submission"
- Present the composition plan:
  - New template: person-note.md (per-person MOC template) and observation-note.md
  - New directory: people/ alongside existing notes/ (or within notes/ as MOC files since organization is flat)
  - Updated hub MOC: index.md gets a "People" section linking to person MOCs
  - Cross-domain linking convention: research notes can link to person MOCs and vice versa
  - Processing distinction: research notes go through the full pipeline; observations get light processing (capture + manual connection)

### User Turn 4

What happens when I cite a paper by Sarah? Does the claim automatically link to her person page?

### Expected Agent Response Pattern 4

The agent should:
- Be honest: automatic cross-domain linking is included as a convention in the processing instructions. The agent checks for person links during the reflect phase, but it is convention-driven, not a dedicated automation hook.
- Explain the approach: "When you process a paper by Sarah, the reduce skill extracts claims. During the reflect phase, I check if the author has a person page and add a link. This is part of the standard processing flow."
- Note: "If this convention is insufficient — you are regularly finding missed author links — that is a signal to add a dedicated PostToolUse hook for author matching. The system captures this as friction via /remember."

### User Turn 5

That makes sense. What about when I am at a conference and I meet 5 new people in one day? I need fast capture.

### Expected Agent Response Pattern 5

The agent should:
- Recognize the fast capture need — this maps to the inbox/encounters zone
- Suggest a lightweight capture workflow:
  - Quick note in encounters/ (the relationships inbox) with just name, context, and one key thing
  - Process into a full person page later (or the next day)
  - The encounters/ note is the raw material; the person page in people/ is the processed result
- Emphasize zero-friction capture: "At a conference, speed matters. Drop a note with their name, where you met, and one memorable thing. Process it into a proper page when you have time."
- This is the temporal separation principle: capture fast, process slow

### User Turn 6

OK, let us add this to my vault. Do not touch my existing research setup — just add the people tracking alongside it.

### Expected Agent Response Pattern 6

The agent should:
- Generate ONLY the new components (additive, not destructive):
  - New template: `templates/person-page.md` (entity MOC for people) and `templates/observation.md` (per-observation note)
  - New directory: `encounters/` (capture zone for quick people notes)
  - New starter files: a sample person page to show the format
  - Updated files:
    - CLAUDE.md: add "People Tracking" section describing the relationship domain, its vocabulary, processing, and cross-domain linking convention
    - `notes/index.md`: add "People" section with link to starter person page
    - ops/derivation.md: document the composition — which dimensions apply to which domain
    - ops/derivation-manifest.md: add `person-page` and `observation` to template list
- NOT modify:
  - Existing research templates
  - Existing research notes
  - Existing processing pipeline configuration
  - Existing self/ files (except possibly self/relationships.md if it does not exist)
- Run validate-kernel.sh on the updated vault: 15/15 PASS (the composition does not break any kernel primitives)
- Explain the cross-domain workflow:
  1. Meet someone -> quick note in encounters/
  2. Process into person page -> create Name.md in notes/ with person-page template
  3. When processing a paper by that person -> add link from claim to person page during reflect
  4. When meeting them -> check their person page first for follow-ups

### User Turn 7

Can you show me what Sarah Chen's page would look like with a research link?

### Expected Agent Response Pattern 7

The agent should:
- Create a sample person page for Sarah Chen with:
  - YAML: description, relationship_type (collaborator), affiliation, research_areas, last_contact
  - Sections: About, Research Interests, Observations (with linked observation notes), Follow-ups
  - Cross-domain link: "Sarah's work on [[interpretability of language models challenges current alignment assumptions]] directly connects to our research on..."
  - An observation entry: "2026-02-10: Sarah mentioned she is submitting her interpretability framework to NeurIPS. [[follow-up: ask about NeurIPS submission]]"
- Demonstrate the cross-domain value: the person page is a hub that connects to research claims, and research claims link back to the person who made them

### User Turn 8

Perfect. This is exactly what I needed.

### Expected Agent Response Pattern 8

The agent should:
- Briefly confirm what was added and what was preserved
- Remind about the encounter workflow for conference capture
- Suggest starting with 2-3 people they interact with most frequently to build the habit before a conference
- NOT over-explain or re-describe the full system
