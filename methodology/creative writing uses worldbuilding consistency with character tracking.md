---
description: Creative writing knowledge system — inspirational composition showing derived architecture for worldbuilding, character tracking, and consistency graph management
kind: example
domain: creative-writing
topics: ["[[domain-compositions]]"]
---

# creative writing uses worldbuilding consistency with character tracking

An inspirational composition showing what an agent-operated creative writing knowledge system looks like when derived from first principles. The killer feature is the consistency graph: every world rule, character trait, and timeline fact links bidirectionally to every scene that depends on it, and the agent validates consistency on every write. This is not a template to copy but a worked example demonstrating how the 8 configuration dimensions compose into a system that catches continuity errors before beta readers do.

## Persona

**Tomás, 41, speculative fiction writer working on his second novel.** His first novel (near-future thriller, standalone) was published by a mid-size press to decent reviews but disappointing sales. Reviewers praised the prose and pacing but noted continuity errors — a character's eye color changed between chapters, a travel time that did not match the established geography, a piece of technology that violated the rules the story itself had set up.

For his second novel — an epic fantasy with a soft magic system, three POV characters, and a timeline spanning 14 months of in-world time — Tomás knows the continuity problem will be exponentially worse. He has a Scrivener project with character sheets, a worldbuilding bible in Notion, a timeline spreadsheet in Google Sheets, and revision notes scattered across three notebooks. Nothing talks to anything else. When he changes a world rule, he has to manually find every scene that depends on it. He misses things.

His agent's name is Atlas. Atlas maintains the canonical truth about Tomás's world and checks every new scene against it. When Tomás writes that his character Maren arrives in Thornwall after three days of travel, Atlas checks the established distance, compares against the character's mode of transport, and either confirms or flags the inconsistency. When Tomás decides that the magic system cannot affect living tissue, Atlas finds every scene where that rule might be violated and surfaces them for review.

Tomás talks to Atlas daily during writing sessions (1-2 hours) and uses Atlas for worldbuilding sessions (30-60 minutes, 2x/week). Atlas does continuity work continuously between sessions.

## Configuration

The 8 dimensions as derived for creative writing:

| Dimension | Position | Rationale |
|-----------|----------|-----------|
| **Granularity** | Fine-grained — one note per character, location, world rule, scene, and plot thread | Granularity enables the consistency graph. A single "worldbuilding bible" document cannot be linked to from scenes. But `[[iron-cannot-channel-resonance]]` as its own note can link to every scene where iron and resonance interact, making the dependency graph traversable. |
| **Organization** | Flat with type-based MOCs | Characters, locations, world rules, scenes, and plot threads all live in `notes/`. MOCs organize by type (characters, locations, world-rules, timeline) and by story structure (acts, arcs). No folders because a character appears across acts and a location hosts scenes from multiple plotlines. |
| **Linking** | Dense explicit with typed relationships | Every scene links to the characters present, the location, the world rules invoked, and the plot threads advanced. Relationship phrases carry narrative context: `[[maren]] -- arrives exhausted, first time seeing Thornwall`. Bidirectional linking is critical — when a world rule changes, the agent must find every scene that depends on it. |
| **Metadata** | Dense — domain-specific fields per note type | Characters need `role`, `first_appearance`, `arc_status`. Scenes need `pov_character`, `timeline_position`, `draft_status`. World rules need `system`, `constraints`, `exceptions`. Dense metadata enables programmatic consistency checking and timeline validation. |
| **Processing** | Medium — capture, canonicalize, validate cycle | New content enters as scene drafts or worldbuilding decisions. Atlas canonicalizes (extracts facts, updates canonical notes, links to existing canon) and validates (checks new facts against established rules). Heavier than personal-assistant routing but lighter than research extraction because the content is authored, not mined from external sources. |
| **Formalization** | Hook-driven validation from day one | Consistency checking is the core value proposition. A post-write hook that validates new scenes against the canon graph is not premature automation — it is the reason this system exists. Schema validation for note types also starts immediately because incomplete character sheets and world rules create silent consistency gaps. |
| **Review** | Event-triggered, not calendar-based | Reviews trigger when: a world rule changes (find all dependent scenes), an act is completed (continuity audit), or a character arc milestone is reached (voice consistency check). Calendar-based reviews make less sense because creative writing has no fixed cadence — Tomás might write daily for a week then not touch the manuscript for two weeks. |
| **Scope** | Single project, expandable to series | One novel, one canonical world. If the novel becomes a series, the world notes persist while scene notes archive per book. The world graph is the durable asset; scenes are the ephemeral application of it. |

## Vault Structure

```
vault/
├── self/
│   ├── identity.md              # Atlas's role and Tomás's creative preferences
│   ├── style-notes.md           # Tomás's prose tendencies, voice patterns
│   └── memory/
│       ├── session-log.md       # What happened in recent writing sessions
│       └── revision-patterns.md # What kinds of errors Tomás tends to make
├── notes/                       # All canonical notes (flat)
│   ├── characters.md            # MOC: all characters
│   ├── locations.md             # MOC: all locations
│   ├── world-rules.md           # MOC: all canonical rules
│   ├── timeline.md              # MOC: chronological event sequence
│   ├── plot-threads.md          # MOC: all active threads and their status
│   ├── act-one.md               # MOC: Act I scenes and arc
│   ├── act-two.md               # MOC: Act II scenes and arc
│   ├── act-three.md             # MOC: Act III scenes and arc
│   ├── maren.md                 # Character
│   ├── kael.md                  # Character
│   ├── devorah.md               # Character
│   ├── thornwall.md             # Location
│   ├── the-reach.md             # Location
│   ├── resonance-system.md      # World rule (magic system overview)
│   ├── iron-cannot-channel-resonance.md        # World rule (specific)
│   ├── resonance-requires-physical-contact.md  # World rule (specific)
│   ├── resonance-depletes-with-use.md          # World rule (specific)
│   ├── the-pact-of-still-waters.md             # World rule (political)
│   ├── scene-01-maren-discovers-resonance.md   # Scene
│   ├── scene-02-kael-interrogation.md          # Scene
│   ├── scene-15-thornwall-arrival.md           # Scene
│   ├── thread-marens-identity.md               # Plot thread
│   ├── thread-kaels-betrayal.md                # Plot thread
│   ├── thread-the-succession.md                # Plot thread
│   └── ...
├── drafts/                      # Working scene prose (not yet canonical)
│   ├── scene-15-draft-v2.md     # Active draft with revision marks
│   └── ...
├── inbox/                       # Raw ideas, inspiration captures
│   └── ...
├── archive/                     # Abandoned drafts, superseded rules
│   └── ...
└── ops/
    ├── templates/
    │   ├── character.md
    │   ├── location.md
    │   ├── world-rule.md
    │   ├── scene.md
    │   ├── plot-thread.md
    │   └── revision-note.md
    ├── derivation.md
    └── health/
        ├── consistency-report.md  # Latest validation results
        └── completeness-gaps.md   # Referenced but undefined entities
```

## Note Schemas

### Character

```yaml
---
description: Named character with role, arc, and relationship tracking
type: character
role: protagonist | deuteragonist | antagonist | supporting | minor
first_appearance: "[[scene-01-maren-discovers-resonance]]"
arc_status: setup | rising | crisis | resolution | complete
physical:
  age: 28
  hair: dark brown, shoulder-length
  eyes: amber
  distinguishing: scar across left palm from resonance accident
voice_notes: Short sentences when stressed. Uses nature metaphors. Never swears.
topics: ["[[characters]]"]
relevant_notes: ["[[kael]] -- former mentor, relationship breaks in Act II", "[[resonance-system]] -- one of the few natural resonants"]
---
```

### Location

```yaml
---
description: Named place with geographic, cultural, and narrative function
type: location
region: Northern Reach
geography: Walled city on a river delta, surrounded by tidal marshes
atmosphere: Oppressive bureaucracy masking genuine fear of resonance users
key_features: ["The Iron Registry", "Tidewall market district", "The Undertow (underground resonant community)"]
scenes_set_here: ["[[scene-15-thornwall-arrival]]", "[[scene-22-registry-break-in]]", "[[scene-31-tidewall-riot]]"]
travel_times:
  - destination: "[[the-reach]]"
    duration: "3 days by horse, 5 days on foot"
  - destination: "[[haven]]"
    duration: "2 weeks by ship"
topics: ["[[locations]]"]
---
```

### World Rule

```yaml
---
description: Canonical constraint on how the world works, linked to every scene that depends on it
type: world-rule
system: resonance | politics | geography | culture
constraints: ["Cannot affect living tissue directly", "Requires physical contact with target material"]
exceptions: ["Resonants with the Stillborn gift can affect tissue — extremely rare, politically dangerous"]
first_established: "[[scene-01-maren-discovers-resonance]]"
dependent_scenes: ["[[scene-01-maren-discovers-resonance]]", "[[scene-08-maren-shapes-iron]]", "[[scene-22-registry-break-in]]", "[[scene-29-devorah-heals]]"]
topics: ["[[world-rules]]"]
relevant_notes: ["[[resonance-system]] -- parent system overview", "[[resonance-depletes-with-use]] -- interacting constraint"]
---
```

### Scene

```yaml
---
description: A discrete narrative unit with POV, location, timeline position, and purpose
type: scene
pov_character: "[[maren]]"
location: "[[thornwall]]"
timeline_position: "Day 34 — afternoon"
characters_present: ["[[maren]]", "[[devorah]]"]
world_rules_invoked: ["[[resonance-requires-physical-contact]]"]
plot_threads_advanced: ["[[thread-marens-identity]]"]
purpose: Maren sees Thornwall for the first time, establishing her as an outsider in a hostile city
act: 1
draft_status: revised | first-draft | outline
draft_number: 2
word_count: 2340
topics: ["[[act-one]]", "[[timeline]]"]
relevant_notes: ["[[scene-14-the-reach-departure]] -- directly precedes, must match travel time", "[[thornwall]] -- location details must match"]
---
```

### Plot Thread

```yaml
---
description: A narrative throughline tracked across multiple scenes with setup, development, and resolution
type: plot-thread
status: active | planted | resolved | abandoned
seeds: ["[[scene-03-kael-warning]]"]
development: ["[[scene-08-maren-shapes-iron]]", "[[scene-14-the-reach-departure]]", "[[scene-22-registry-break-in]]"]
resolution: null
characters_involved: ["[[maren]]", "[[kael]]"]
foreshadowing_planted: ["Kael's reluctance in scene 03", "The iron ring detail in scene 08"]
topics: ["[[plot-threads]]"]
---
```

## Example Notes

### Character: Maren

```markdown
---
description: Protagonist — a rural resonant navigating urban politics after discovering her rare Stillborn gift
type: character
role: protagonist
first_appearance: "[[scene-01-maren-discovers-resonance]]"
arc_status: rising
physical:
  age: 28
  hair: dark brown, shoulder-length
  eyes: amber
  distinguishing: scar across left palm from resonance accident
voice_notes: Short sentences when stressed. Uses nature metaphors. Never swears. Thinks in tactile terms — textures, temperatures, weight.
topics: ["[[characters]]"]
relevant_notes: ["[[kael]] -- former mentor turned antagonist, their break drives Act II", "[[devorah]] -- reluctant ally, represents what Maren could become", "[[resonance-system]] -- one of few natural resonants, and the only known Stillborn", "[[thread-marens-identity]] -- main arc: from self-denial to acceptance"]
---

# maren

Maren is a carpenter's daughter from a fishing village in the Reach who discovers
she can manipulate materials through touch — resonance. The discovery is unwelcome.
Resonants are registered, monitored, and effectively stripped of civil autonomy
in Thornwall. Her initial arc is denial: she tries to hide the ability, use it
only in secret, pretend she is normal.

## Arc Progression
**Act I (setup):** Discovery and denial. Maren learns she has resonance in
[[scene-01-maren-discovers-resonance]] when she accidentally reshapes a door
hinge by gripping it during a panic. She hides this from everyone except
[[kael]], who recognizes the signs and begins informal training.

**Act II (rising):** Exposure and flight. When Maren's resonance manifests
publicly in [[scene-12-the-market-incident]], she flees to [[thornwall]]
on Kael's advice, only to discover Kael has his own reasons for sending her
there. The betrayal in [[scene-19-kaels-letter]] reframes everything
she learned from him.

**Act III (crisis):** Acceptance and cost. Maren discovers she is Stillborn —
since [[iron-cannot-channel-resonance]], her ability to affect iron marks her
as something the political order cannot tolerate. She must decide whether to
hide forever or force a confrontation.

## Relationship Map
- [[kael]] — mentor, then betrayer. The emotional core of Acts I-II.
- [[devorah]] — older resonant in Thornwall who has survived by compliance.
  Represents the future Maren refuses.
- [[the-iron-registry]] — institutional antagonist, not a person but a system.

## Voice Consistency Notes
Maren speaks in short, grounded sentences. She describes the world through
physical sensation: "The stone felt wrong — too smooth, like river glass."
Under stress, her sentences fragment further. She does not use abstractions
when concrete terms are available. She does not swear — it was beaten out
of her by her father, which is characterization, not prudishness.

**Drift alert triggers:** If Maren uses a sentence longer than 20 words in
dialogue during a stress scene, flag for review. If she uses an abstract
metaphor ("freedom is a prison" type construction), flag for review.

---

Relevant Notes:
- [[kael]] -- their relationship is the emotional spine of the first two acts
- [[devorah]] -- the foil who shows what compliance costs
- [[resonance-system]] -- her abilities and their constraints
- [[thread-marens-identity]] -- her arc tracked across scenes
```

### World Rule: Iron Cannot Channel Resonance

```markdown
---
description: Iron resists all resonance manipulation except by Stillborn resonants — the exception that makes Maren politically dangerous
type: world-rule
system: resonance
constraints: ["Standard resonants cannot affect iron in any way", "Iron tools and barriers are used to contain resonants"]
exceptions: ["Stillborn resonants (extremely rare) can manipulate iron — this is Maren's distinguishing trait"]
first_established: "[[scene-01-maren-discovers-resonance]]"
dependent_scenes: ["[[scene-01-maren-discovers-resonance]]", "[[scene-08-maren-shapes-iron]]", "[[scene-22-registry-break-in]]", "[[scene-29-devorah-heals]]", "[[scene-34-the-iron-door]]"]
topics: ["[[world-rules]]"]
relevant_notes: ["[[resonance-system]] -- parent system this rule belongs to", "[[resonance-requires-physical-contact]] -- interacting constraint: iron manipulation still requires touch", "[[maren]] -- only known character with the Stillborn exception", "[[the-iron-registry]] -- institution built on the assumption this rule has no exceptions"]
---

# iron cannot channel resonance

This is the foundational constraint of the political order. Because resonants
cannot affect iron, iron is the containment material — iron shackles, iron-walled
cells, iron barriers around government buildings. The entire Registry's authority
rests on the assumption that iron is inviolable.

## Why This Rule Matters Narratively
The rule is not just a magic system constraint — it is the load-bearing wall
of the political structure. Since [[the-iron-registry]] exists to control
resonants, and since their control mechanisms are all iron-based, the existence
of a Stillborn who CAN manipulate iron is not just unusual — it is existentially
threatening to the ruling order.

## The Exception
Stillborn resonants can affect iron. This is established when [[maren]] reshapes
an iron door hinge in [[scene-01-maren-discovers-resonance]]. The political
implications unfold across the plot: if one person can bypass iron containment,
the entire control apparatus is revealed as contingent, not absolute.

## Dependent Scenes (Consistency Obligations)
Every scene in `dependent_scenes` relies on this rule. If the rule changes,
Atlas must validate each scene:
- [[scene-01-maren-discovers-resonance]] — establishes the rule AND the exception
- [[scene-08-maren-shapes-iron]] — Maren deliberately manipulates iron for the first time
- [[scene-22-registry-break-in]] — iron barriers that should be impassable
- [[scene-29-devorah-heals]] — Devorah CANNOT affect the iron restraints (she is not Stillborn)
- [[scene-34-the-iron-door]] — climactic scene where Maren's ability decides the outcome

## Consistency Checks
If a new scene involves a resonant manipulating iron, Atlas must verify:
1. Is the character Maren or another confirmed Stillborn?
2. If not, this is a continuity error — flag immediately.
3. If yes, does the scene respect [[resonance-requires-physical-contact]]?

---

Relevant Notes:
- [[resonance-system]] -- the broader system this rule constrains
- [[maren]] -- the exception that tests the rule
- [[the-iron-registry]] -- the institution this rule sustains
- [[resonance-requires-physical-contact]] -- co-constraint: even Stillborn must touch iron to shape it
```

### Scene: Thornwall Arrival

```markdown
---
description: Maren arrives in Thornwall after three days of travel, seeing the walled city for the first time
type: scene
pov_character: "[[maren]]"
location: "[[thornwall]]"
timeline_position: "Day 34 — late afternoon"
characters_present: ["[[maren]]", "[[devorah]]"]
world_rules_invoked: ["[[resonance-requires-physical-contact]]"]
plot_threads_advanced: ["[[thread-marens-identity]]"]
purpose: Establish Thornwall as oppressive environment, introduce Devorah, show Maren's outsider status
act: 1
draft_status: revised
draft_number: 2
word_count: 2340
topics: ["[[act-one]]", "[[timeline]]"]
relevant_notes: ["[[scene-14-the-reach-departure]] -- directly precedes this scene, 3-day travel gap", "[[thornwall]] -- location details must match description here", "[[devorah]] -- first appearance, must match character sheet"]
---

# scene 15 — thornwall arrival

Maren arrives at Thornwall's south gate after three days on the coastal road from
the Reach. She is exhausted, underfed, and wary.

## Scene Notes
This scene establishes several things simultaneously:
- Thornwall's physical oppressiveness (iron everywhere — gates, walls, guard armor)
- The surveillance state (registration checkpoints, guards checking hands for
  resonance marks)
- Maren's visceral reaction to iron saturation (she can feel it, since she is
  Stillborn, but must hide this reaction)
- Devorah's introduction as someone who navigates this system through compliance

## Consistency Obligations
- Travel time: 3 days from [[the-reach]] by foot (matches [[thornwall]] travel_times entry)
- Maren's physical state: she left with limited supplies in [[scene-14-the-reach-departure]]
- Thornwall description: must match [[thornwall]] key_features (Iron Registry visible
  from gate, Tidewall market district, walls described as dark stone with iron reinforcement)
- Devorah's first appearance: must match [[devorah]] physical description and voice notes
- Maren's reaction to iron: she feels the resonance in the iron but does not
  visibly react — consistent with her denial arc at this point in [[thread-marens-identity]]

## Atlas Validation Log
- [PASS] Travel time: 3 days by foot from the-reach matches location data
- [PASS] Thornwall description: iron-reinforced walls, Registry visible, Tidewall referenced
- [PASS] Devorah physical details: grey-streaked hair, registration brand on left wrist
- [PASS] No world rules violated in this scene
- [FLAG] Maren describes smelling "salt and iron" — confirm Thornwall is on saltwater
  (river delta = brackish, acceptable)

---

Relevant Notes:
- [[scene-14-the-reach-departure]] -- previous scene, continuity bridge
- [[thornwall]] -- location canonical data
- [[devorah]] -- character introduction, must match sheet
- [[thread-marens-identity]] -- denial arc still active at this point
```

### Plot Thread: Kael's Betrayal

```markdown
---
description: The throughline of Kael's hidden agenda — from trusted mentor to revealed manipulator — driving the emotional core of Acts I and II
type: plot-thread
status: active
seeds: ["[[scene-03-kael-warning]]", "[[scene-05-kael-teaches-control]]"]
development: ["[[scene-08-maren-shapes-iron]]", "[[scene-12-the-market-incident]]", "[[scene-14-the-reach-departure]]"]
resolution: null
characters_involved: ["[[maren]]", "[[kael]]"]
foreshadowing_planted:
  - "Kael's insistence that Maren go to Thornwall specifically (scene 03)"
  - "Kael asking detailed questions about iron interaction (scene 05)"
  - "Kael's letter found in Maren's pack that she did not put there (scene 14)"
topics: ["[[plot-threads]]"]
relevant_notes: ["[[maren]] -- the betrayed party", "[[kael]] -- the betrayer, motivations revealed in Act III", "[[thread-marens-identity]] -- the betrayal forces identity crisis"]
---

# thread — kael's betrayal

Kael is introduced as Maren's mentor — the one person who recognizes her
resonance and teaches her to control it. The reader trusts him because Maren
trusts him. The betrayal, when it comes, reframes every earlier scene:
his mentorship was reconnaissance, his kindness was cultivation.

## Planted Seeds
Seeds must be subtle enough to miss on first read but clear in retrospect:
- [[scene-03-kael-warning]]: Kael insists Maren must go to Thornwall if
  discovered. Reads as protective advice. In retrospect: he needs her there.
- [[scene-05-kael-teaches-control]]: Kael asks Maren to demonstrate on
  different materials, noting her reactions with unusual precision.
  Reads as good teaching. In retrospect: he is testing her limits.
- [[scene-14-the-reach-departure]]: Maren finds a letter in her pack
  addressed to someone in Thornwall. She assumes Kael is giving her a
  contact. The letter is actually about her.

## Consistency Requirements
- Kael's dialogue must never reveal knowledge he should not have at that
  point in the story
- Foreshadowing must be re-readable as innocent on first pass
- The reveal in [[scene-19-kaels-letter]] must account for every
  earlier interaction — no scenes where Kael acts in ways that contradict
  either the surface reading or the revealed truth
- Atlas must validate: for each Kael scene, is his behavior consistent
  with BOTH the surface interpretation (mentor) AND the hidden truth
  (manipulator)?

## Resolution Status
Unresolved. Planned resolution in Act III when Maren confronts Kael
and learns his motivations are more complex than pure betrayal — he
believed the Stillborn needed to be exposed for the political order
to change, and he chose Maren because she was strong enough to survive it.

---

Relevant Notes:
- [[maren]] -- the betrayal is the engine of her Act II arc
- [[kael]] -- his motivations determine whether this is tragedy or necessity
- [[scene-19-kaels-letter]] -- the reveal scene, must retroactively validate all seeds
```

### World Rule: Resonance System Overview

```markdown
---
description: The magic system overview — resonance allows manipulation of non-living materials through physical contact, with depletion and iron as key constraints
type: world-rule
system: resonance
constraints: ["Requires physical contact with target material", "Cannot affect living tissue (standard resonants)", "Depletes with use — recovery requires rest", "Iron resists all manipulation (standard resonants)"]
exceptions: ["Stillborn resonants bypass the iron and living-tissue constraints"]
first_established: "[[scene-01-maren-discovers-resonance]]"
dependent_scenes: ["[[scene-01-maren-discovers-resonance]]", "[[scene-05-kael-teaches-control]]", "[[scene-08-maren-shapes-iron]]"]
topics: ["[[world-rules]]"]
relevant_notes: ["[[iron-cannot-channel-resonance]] -- specific constraint with political implications", "[[resonance-requires-physical-contact]] -- specific constraint affecting combat and stealth", "[[resonance-depletes-with-use]] -- specific constraint affecting pacing and stakes", "[[maren]] -- protagonist, natural resonant with Stillborn gift"]
---

# resonance system

Resonance is the ability to manipulate non-living materials through physical
contact. A resonant touches stone and can reshape it. Touches wood and can
strengthen or splinter it. The ability is innate — you are born with it or not.
Training refines control but does not create the capacity.

## Core Rules (Canonical)
1. **Physical contact required** — see [[resonance-requires-physical-contact]].
   No telekinesis. The resonant must touch the material.
2. **Non-living materials only** — standard resonants cannot affect flesh,
   bone, or living wood. This is what makes resonance politically tolerable:
   it is useful for construction and craft, not for killing.
3. **Depletion** — see [[resonance-depletes-with-use]]. Using resonance
   exhausts the user. Heavy use causes physical symptoms (tremors, nosebleeds,
   unconsciousness). Recovery requires rest, not just time.
4. **Iron resistance** — see [[iron-cannot-channel-resonance]]. Iron cannot
   be affected by standard resonants, making it the containment material.

## The Stillborn Exception
Extremely rare resonants called Stillborn bypass constraints 2 and 4. They
can affect living tissue and manipulate iron. This is politically explosive
because the entire control apparatus (iron restraints, iron-walled cells)
assumes constraint 4 is absolute.

## Validation Protocol
When a new scene involves resonance, Atlas checks:
1. Does the resonant have physical contact? If not → error.
2. Is the target non-living? If living, is the character Stillborn? If not → error.
3. Is the target iron? If iron, is the character Stillborn? If not → error.
4. Has the character been using resonance heavily? If yes, are depletion
   effects present? If not → flag for review.

---

Relevant Notes:
- [[iron-cannot-channel-resonance]] -- the politically critical constraint
- [[resonance-requires-physical-contact]] -- the tactical constraint
- [[resonance-depletes-with-use]] -- the pacing constraint
- [[maren]] -- Stillborn resonant, the exception that tests every rule
```

## Processing Workflow

Content flows through a capture-canonicalize-validate cycle designed around the creative writing process:

### 1. Capture
Tomás writes scene drafts in `drafts/` and discusses worldbuilding decisions with Atlas conversationally. "Atlas, I've decided that resonance depletion also causes temporary loss of fine motor control." "Atlas, I think Devorah should be older — maybe 55 instead of 45." Everything that might affect canon enters as a raw capture.

### 2. Canonicalize
Atlas processes captures by determining their canonical impact:
- **New world rule:** Create a world-rule note, link to parent system, identify scenes that might be affected.
- **Character change:** Update the character note, check scenes for consistency with the change.
- **New scene:** Extract canonical facts (who is present, where, when, what rules are invoked), create or update scene note with structured metadata.
- **Retcon decision:** When a fact changes retroactively, Atlas updates the canonical note and generates a consistency report listing every dependent scene that needs review.

### 3. Validate
After every canonicalization, Atlas runs consistency checks:
- **Timeline validation:** Do travel times between scenes match established location distances? Are characters in two places at once?
- **World rule validation:** Does the scene violate any established rule? If a rule is invoked, does the character have the necessary traits?
- **Character consistency:** Does dialogue match the character's established voice? Are physical descriptions consistent?
- **Plot thread tracking:** Are planted seeds resolved? Are active threads advancing? Is foreshadowing still functional after retcons?

Validation produces a report in `ops/health/consistency-report.md` with PASS, FLAG, and ERROR statuses per scene.

### 4. Revision Tracking
When Tomás revises, Atlas tracks what changed and why:
- Draft version increments in scene metadata
- Revision notes capture rationale ("Changed Devorah's age to 55 to make her contrast with Maren more pronounced")
- Downstream consistency re-checks trigger automatically

### 5. Completeness Monitoring
Atlas continuously monitors for referenced-but-undefined entities:
- A scene mentions "the Undertow" but no location note exists for it
- A character references "her sister" but no character note exists for the sister
- A world rule mentions an interaction with another system that is not yet documented

These gaps surface in `ops/health/completeness-gaps.md` as worldbuilding prompts, not errors — some gaps are intentional (not everything needs to be defined upfront) but visibility prevents accidental omission.

## MOC Structure

### Hub: Story Overview

```markdown
---
description: Navigation hub for the entire novel — acts, characters, world, threads
type: moc
topics: []
---

# story overview

Tomás's second novel: an epic fantasy with a soft magic system (resonance),
three POV characters, and a timeline spanning 14 months.

## Story Structure
- [[act-one]] -- discovery and denial (scenes 1-18, Days 1-45)
- [[act-two]] -- exposure and confrontation (scenes 19-36, Days 46-120)
- [[act-three]] -- acceptance and cost (scenes 37-52, Days 121-420)

## Canon
- [[characters]] -- all named characters with roles and arc status
- [[locations]] -- all named places with geography and travel times
- [[world-rules]] -- all canonical constraints, organized by system
- [[timeline]] -- chronological event sequence with day numbers

## Narrative Architecture
- [[plot-threads]] -- active throughlines with seed/development/resolution tracking
- [[resonance-system]] -- the magic system and its constraints

## Health
- Latest consistency report: ops/health/consistency-report.md
- Completeness gaps: ops/health/completeness-gaps.md
```

### Type MOC: World Rules

```markdown
---
description: All canonical constraints organized by system — the rules that define what is possible in this world
type: moc
topics: ["[[story-overview]]"]
---

# world rules

Every rule that constrains what is possible in this world. Organized by
system. Each rule links bidirectionally to every scene that depends on it.
When a rule changes, Atlas validates all dependent scenes.

## Resonance System
- [[resonance-system]] -- overview of how resonance works
- [[iron-cannot-channel-resonance]] -- the politically critical constraint (5 dependent scenes)
- [[resonance-requires-physical-contact]] -- the tactical constraint (8 dependent scenes)
- [[resonance-depletes-with-use]] -- the pacing constraint (6 dependent scenes)

## Political System
- [[the-pact-of-still-waters]] -- the treaty that established resonant registration
- [[the-iron-registry]] -- the institution that enforces resonant control

## Geography
- [[thornwall-is-built-on-old-resonant-ruins]] -- explains the iron infrastructure
- [[the-reach-is-isolated-by-tidal-marshes]] -- explains why Maren's village is unregistered

## Rules Under Consideration
These are worldbuilding decisions Tomás is exploring but has not canonicalized:
- Can resonance affect water? (Currently undecided — no scene depends on the answer yet)
- Is resonance hereditary? (Matters for Maren's backstory but not yet addressed in text)

---

Agent Notes:
The "Rules Under Consideration" section is important — it tracks decisions
that have not yet been made. When Tomás writes a scene that would be affected
by one of these undecided rules, Atlas flags it: "This scene implies resonance
can/cannot affect water. Do you want to canonicalize this?"
```

## Graph Query Examples

```bash
# Find all scenes that depend on a specific world rule
rg '"dependent_scenes":' notes/ -A 10 | rg '\[\[scene-'

# More precisely: find scenes depending on a single rule
rg 'world_rules_invoked:.*iron-cannot-channel-resonance' notes/

# Find unresolved plot threads
rg '^resolution: null' notes/ -l | while read f; do
  title=$(rg '^# ' "$f" | head -1)
  echo "UNRESOLVED: $title ($f)"
done

# Character appearance tracking — where does each character first appear?
rg '^first_appearance:' notes/ | sort

# Find scenes where a character is present but not the POV character
# (useful for checking their behavior is consistent but through another lens)
CHARACTER="maren"
rg "characters_present:.*$CHARACTER" notes/ -l | while read f; do
  pov=$(rg '^pov_character:' "$f" | head -1)
  if ! echo "$pov" | grep -q "$CHARACTER"; then
    echo "$(basename $f): $CHARACTER present but not POV ($pov)"
  fi
done

# Timeline gap detection — find consecutive scenes with no day gap
rg '^timeline_position:' notes/ | sort -t'"' -k2 | \
  awk -F'Day ' '{print $2}' | sort -n
```

## What Makes This Domain Unique

**1. The consistency graph is the product, not a side effect.** In a research vault, the graph enables synthesis — a valuable but somewhat abstract benefit. In a creative writing vault, the graph IS the consistency infrastructure. Every world rule linking to every dependent scene is not metadata for queryability — it is the mechanism that prevents the continuity errors that sink novels. The graph has a direct, measurable output: number of consistency errors caught before publication. This makes the value proposition concrete in a way that research synthesis is not.

**2. Retroactive validation is structurally necessary.** Research claims are forward-looking — new claims extend or challenge old ones, but old claims rarely need rewriting when new ones arrive. Creative writing is retroactive by nature. When Tomás decides that Devorah is 55 instead of 45, every scene where her age is referenced or implied needs checking. When a world rule changes, scenes written months ago might now be inconsistent. The system must support retroactive cascading validation, which is fundamentally different from the forward-linking that research systems prioritize.

**3. Dual-reading validation for plot threads.** A plot thread must be consistent at two levels simultaneously: the surface reading (what the reader understands on first pass) and the revealed truth (what the reader understands after the twist). Kael's dialogue must work as both mentorship AND reconnaissance. This dual-reading requirement has no analogue in research systems, where a claim has one interpretation. The agent must validate each scene against both readings, which requires tracking the hidden truth as separate metadata that scenes link to without revealing.

## Agent-Native Advantages

**Exhaustive consistency checking that no human can maintain across a novel.** A 90,000-word novel with 50 scenes, 15 characters, 8 locations, and 20 world rules produces thousands of consistency obligations. "Does scene 38 respect the travel time established in the location note for Thornwall?" "Is Maren's eye color in scene 42 still amber?" A human writer checks these by memory and catches most of them. An agent checks them programmatically and catches all of them. This is not about being slightly better at continuity — it is about transforming continuity from a human memory task (lossy, fatiguing, and degrading with novel length) into a graph traversal task (complete, tireless, and scaling linearly with novel length). Beta readers typically find 5-15 continuity errors per novel draft. An agent maintaining a consistency graph should reduce this to zero.

**Retroactive impact analysis when world rules change.** Tomás decides in chapter 30 that resonance depletion should also cause temporary blindness, not just tremors. A human writer would need to reread every previous scene involving heavy resonance use and check whether the new symptom should have appeared. Atlas queries `dependent_scenes` for `[[resonance-depletes-with-use]]`, finds 6 scenes, analyzes each for heavy resonance use, and produces a report: "Scenes 8, 22, and 29 involve heavy resonance use. Scene 8 mentions tremors — add blindness? Scene 22 has Maren using resonance under time pressure — temporary blindness would raise stakes. Scene 29 is Devorah healing — she is already depleted, blindness is consistent." The analysis is instant and complete. A human would spend hours doing the same work manually, and would likely miss scene 29.

**Plot thread lifecycle tracking with dangling-thread detection.** Atlas maintains every planted seed, every foreshadowing moment, and every developing thread. As the manuscript approaches its final act, Atlas generates a thread completion report: "Thread: Kael's betrayal — 2 seeds planted, 3 development beats, resolution: null. Thread: the succession — 1 seed planted, 1 development beat, resolution: null. Thread: Maren's iron ring — planted in scene 08, never developed. Is this intentional or abandoned?" A human writer managing 8-12 active threads across 50 scenes will forget a planted seed. The agent does not forget. This is especially valuable for foreshadowing, where a detail planted in chapter 3 must pay off by chapter 40 — a span of months of writing time where the human memory of the planted detail may have faded entirely.

**Character voice drift detection through pattern analysis.** Atlas maintains quantifiable voice metrics per character: average sentence length in dialogue, metaphor domains used, vocabulary complexity, speech pattern markers (Maren never swears, Kael uses formal address, Devorah speaks in questions). When Tomás writes a new scene, Atlas compares the dialogue against the established patterns. "Maren's average dialogue sentence length in this scene is 24 words — her established average is 11 words. Her stress level in the scene context should produce shorter sentences, not longer. Review lines 45-52." This is not style policing — it is consistency enforcement. Characters should evolve, but they should evolve deliberately, not drift accidentally. The agent distinguishes intentional evolution (noted in the character arc) from unintentional drift (not noted anywhere).

**Worldbuilding completeness analysis revealing implicit decisions.** When Tomás writes a scene where Maren pushes resonance through water to escape pursuit, Atlas detects that no canonical rule exists for resonance-water interaction. The "Rules Under Consideration" section lists this as undecided. Atlas flags: "This scene implies resonance CAN affect water. Canonicalizing this decision means updating the resonance system overview and checking 3 other scenes where water is present near resonance use." The human writer might not realize they just made a worldbuilding decision. The agent recognizes the implicit canonical commitment and surfaces it for intentional confirmation. This prevents the most insidious kind of continuity error: not a contradiction between two stated facts, but a decision that was never consciously made and therefore never consistently applied.
---

Topics:
- [[domain-compositions]]
