---
description: people-relationships knowledge system — inspirational composition showing derived architecture for personal CRM with Dunbar-layered relationship graphs
kind: example
domain: relationships
topics: ["[[domain-compositions]]"]
---

# people relationships uses Dunbar-layered graphs with interaction tracking

A derived architecture for someone who wants to maintain genuine relationships at scale. Not a database of contacts — a living social graph that remembers what you forget, notices what you miss, and surfaces connections you would never make on your own.

The agent translation is stark here. Humans maintain relationships through emotional memory, gut feelings, and social intuition. They are terrible at systematic maintenance across more than about fifteen people. Agents have no emotional memory but have perfect recall, exhaustive cross-referencing, and tireless attention across hundreds of contacts. The system leverages what agents do well (track, correlate, remind) to support what humans do well (empathize, connect, care).

---

## Persona

**Maya Chen** is a 34-year-old product designer who moved cities three times in the past decade. She has deep friendships from college, strong professional relationships from three different companies, a growing network from conference speaking, and family spread across two countries. She genuinely cares about people but regularly discovers she hasn't talked to someone important in months. She forgets details — someone's partner's name, that they mentioned a job change, that she promised to send an article. She has tried contact apps but they all feel like CRMs, treating friends like sales leads. What she wants is a system that helps her be the friend she already wants to be, not one that gamifies relationship maintenance.

Maya's agent operates as a social memory — not managing her relationships but remembering the texture of them. After a dinner party, Maya voice-captures a quick debrief. The agent extracts who was there, what they talked about, what follow-ups were mentioned, and how the evening felt. Three weeks later, when Maya is about to meet one of those people again, the agent surfaces the context: what they discussed last time, what was going on in their life, what Maya promised to do.

---

## Configuration

| Dimension | Position | Rationale |
|-----------|----------|-----------|
| **Granularity** | Compound — one note per person, separate interaction logs | People are naturally compound entities. Atomizing a person into separate notes for "career," "family," and "preferences" would fragment what needs to be unified. Interactions are atomic because each event is distinct and timestamped. |
| **Organization** | Flat with Dunbar tiers as metadata | Folders by tier (inner-circle/, close-friends/) would force premature classification and create friction when relationships shift. Flat files with a `tier` field allow reclassification without moving files, and tier-based queries (`rg '^tier: inner-circle'`) replace folder navigation. |
| **Linking** | Explicit with semantic discovery for introductions | Person-to-person links must be intentional — Maya knows why two people are connected. But shared interest detection via semantic search surfaces introduction opportunities Maya would never think to look for. |
| **Metadata** | Medium density — enough for queries, light enough for quick capture | Person notes need structured fields (tier, last_contact, context_met) for automated maintenance queries. Interaction logs need minimal structure (date, people, channel) since the body carries the value. |
| **Processing** | Light — capture-focused with agent-driven enrichment | Maya captures quickly after conversations. The agent enriches: extracting follow-ups, updating last_contact, flagging tier mismatches. Heavy reduce-reflect cycles would add friction to a domain where speed of capture preserves emotional context. |
| **Formalization** | Medium — templates for people and interactions, free-form for everything else | Person notes benefit from consistent schemas (agents can query fields). But forcing schema on every social observation would kill the natural voice that makes relationship notes valuable. |
| **Review** | Weekly neglect scan, monthly tier review | Relationships decay on a weekly timescale for inner circle, monthly for close friends. Review cadence must match decay rate. The agent flags neglect; Maya decides what to do about it. |
| **Scope** | Personal only — no team collaboration | This is Maya's private social memory. Sharing it would change the dynamic from genuine care tracking to performative relationship management. |

---

## Vault Structure

```
vault/
├── self/
│   ├── identity.md
│   ├── relationships.md         # MOC: Dunbar overview, tier thresholds
│   └── memory/
│       └── [personal reflections]
├── notes/
│   ├── index.md                 # Hub: entry point
│   ├── inner-circle.md          # MOC: tier 1 (5 people)
│   ├── close-friends.md         # MOC: tier 2 (15 people)
│   ├── active-network.md        # MOC: tier 3 (50 people)
│   ├── wider-circle.md          # MOC: tier 4 (150 people)
│   ├── contexts.md              # MOC: how/where people connect
│   ├── shared-interests.md      # MOC: topic-based groupings
│   │
│   ├── [person-name].md         # Person notes (flat, one per person)
│   ├── [person-name].md
│   └── ...
├── interactions/
│   ├── 2026-02-14-dinner-at-sarahs.md
│   ├── 2026-02-10-coffee-with-james.md
│   └── ...
├── ops/
│   ├── templates/
│   │   ├── person.md
│   │   ├── interaction.md
│   │   ├── introduction-opportunity.md
│   │   └── gift-idea.md
│   ├── logs/
│   │   ├── neglect-alerts.md    # Agent-generated maintenance log
│   │   └── tier-reviews.md      # Monthly tier reassessment log
│   └── derivation.md            # How this system was derived
└── inbox/
    └── [quick captures, voice dumps]
```

---

## Note Schemas

### Person Note

```yaml
---
description: [one sentence about who this person is to Maya]
tier: inner-circle | close-friends | active-network | wider-circle
relationship: friend | family | colleague | mentor | mentee | acquaintance
context_met: [where/how they met]
location: [where they live]
last_contact: YYYY-MM-DD
contact_preference: text | call | in-person | email
important_dates:
  - label: birthday
    date: MM-DD
  - label: anniversary
    date: MM-DD
topics: ["[[inner-circle]]"]
relevant_people: ["[[person]] -- relationship context"]
---
```

### Interaction Log

```yaml
---
description: [one sentence summary of what happened]
date: YYYY-MM-DD
people: ["[[person-name]]"]
channel: in-person | call | text | email | video | group
mood: warm | neutral | tense | celebratory | vulnerable
follow_ups:
  - task: [what was promised]
    status: open | done
    due: YYYY-MM-DD
topics: ["[[person-name]]"]
---
```

### Introduction Opportunity

```yaml
---
description: [why these two people should meet]
person_a: "[[person-name]]"
person_b: "[[person-name]]"
shared_interest: [what connects them]
context: [how the introduction would work]
status: identified | introduced | connected | declined
topics: ["[[shared-interests]]"]
---
```

### Gift Idea

```yaml
---
description: [what the gift is and why it would work]
person: "[[person-name]]"
category: book | experience | object | food | gesture
source: [how Maya learned about this preference]
occasions: ["birthday", "holiday", "just-because"]
status: idea | purchased | given
topics: ["[[person-name]]"]
---
```

---

## Example Notes

### Person Note: Sarah Okonkwo

```markdown
---
description: Maya's closest friend from college — lives in Portland, works in UX research, going through a career transition
tier: inner-circle
relationship: friend
context_met: Freshman year roommate at UMich, 2010
location: Portland, OR
last_contact: 2026-02-14
contact_preference: call
important_dates:
  - label: birthday
    date: 03-22
  - label: daughter-mia-birthday
    date: 09-15
topics: ["[[inner-circle]]"]
relevant_people: ["[[tom-okonkwo]] -- Sarah's husband, software engineer at Stripe", "[[james-holloway]] -- mutual friend from college, introduced through Maya"]
---

# Sarah Okonkwo

Sarah has been Maya's anchor across three city moves. They talk at least every two weeks, usually long phone calls while one of them is cooking dinner. Sarah is deeply thoughtful about her work and tends to undervalue her own expertise.

## Current context

Sarah is considering leaving her UX research lead role at Nike to start an independent consultancy. She has been thinking about this since November 2025 but hasn't told many people. The main hesitation is health insurance for Mia, who has asthma and needs regular specialist visits. Tom is supportive but cautious — his Stripe equity isn't fully vested until 2027.

Maya has offered to connect Sarah with [[priya-sharma]], who went independent three years ago and navigated the insurance question successfully.

## What matters to her

Sarah values depth over breadth in all things. She would rather have one real conversation than ten catch-ups. She is private about struggles and will only share vulnerabilities after being asked twice — the first ask gets "I'm fine," the second gets the truth. She loves handwritten letters, Japanese ceramics, and extremely specific coffee (currently obsessed with a Kenyan washed process from Heart Roasters).

## Sensitivities

Her mother passed away in 2024. The anniversary is in late June. She doesn't want big gestures around it, but appreciates a quiet check-in.

---

Relevant People:
- [[tom-okonkwo]] -- husband, met at a Portland design meetup in 2016
- [[james-holloway]] -- shared college friend, they reconnected through Maya in 2022

Topics:
- [[inner-circle]]
```

### Interaction Log: Dinner at Sarah's

```markdown
---
description: Dinner party at Sarah and Tom's — first time meeting their new neighbors, good conversation about Portland food scene and Sarah's consultancy plans
date: 2026-02-14
people: ["[[sarah-okonkwo]]", "[[tom-okonkwo]]"]
channel: in-person
mood: warm
follow_ups:
  - task: Send Sarah the link to that independent consulting insurance broker Priya mentioned
    status: open
    due: 2026-02-17
  - task: Text Tom the name of the natural wine shop in SE Portland
    status: open
    due: 2026-02-16
topics: ["[[sarah-okonkwo]]", "[[tom-okonkwo]]"]
---

# Dinner at Sarah's — Feb 14, 2026

Drove up to Portland for Valentine's weekend. Sarah and Tom hosted a small dinner — just us and their neighbors, David and Keiko. Mia was asleep by the time we arrived.

Sarah seemed lighter than the last few calls. She told the table about her consultancy plans, which is a big step — she had been keeping it close. Tom made his pasta alla norma, which was genuinely excellent. He's been watching a lot of Italian cooking YouTube and it's paying off.

The consultancy conversation got specific. Sarah has three potential anchor clients already but hasn't approached any of them formally. She is worried about the "asking" part — she can sell a research program inside a company but feels weird selling herself. I suggested she think of the initial conversations as research interviews, not sales pitches, since that reframes the dynamic into something she is already expert at. She seemed to genuinely light up at that reframing.

David and Keiko were easy company. David teaches environmental science at PSU. Keiko runs a ceramics studio — I should introduce her to [[elena-vasquez]] who has been looking for a ceramicist to collaborate with on that installation project.

Tom pulled me aside before dessert to ask if I thought Sarah was really ready to go independent. He wasn't being negative — he just wanted to know if her friends saw what he sees, which is that she is more capable than she believes. I told him yes, and that [[priya-sharma]] had the same wobble before going independent and is now turning away clients.

---

Relevant People:
- [[sarah-okonkwo]] -- consultancy plans becoming real, emotional shift toward readiness
- [[tom-okonkwo]] -- genuinely supportive, pasta game is strong

Topics:
- [[sarah-okonkwo]]
```

### Tier MOC: Inner Circle

```markdown
---
description: The five people Maya is closest to — requires weekly-to-biweekly contact, maximum relationship investment
type: moc
tier_threshold: contact every 2 weeks minimum
topics: ["[[index]]"]
---

# inner-circle

Dunbar's innermost layer: the five people Maya would call at 3am. These relationships require and deserve the most attention. The agent flags any inner-circle contact that goes beyond two weeks without interaction.

## Current Members

- [[sarah-okonkwo]] -- closest friend since college, currently navigating career transition to independent consultancy
- [[david-chen]] -- older brother, lives in Toronto, primary family anchor since parents moved to Taipei
- [[james-holloway]] -- college friend turned professional collaborator, co-presenting at Config 2026
- [[ana-lucia-reyes]] -- best friend from her Portland years, moved to Mexico City but they talk weekly
- [[mom-mei-lin]] -- Maya's mother, biweekly video calls, adjusting to Taipei life

## Maintenance cadence

Two weeks maximum between meaningful contact. "Meaningful" means a real conversation, not a react emoji on an Instagram story. The agent tracks `last_contact` on each person note and generates a neglect alert when any inner-circle member exceeds 14 days.

## Tier movement signals

Someone enters inner circle when: Maya instinctively wants to tell them news first; conversations regularly go over an hour; there is mutual vulnerability.

Someone leaves inner circle when: contact becomes obligatory rather than desired; conversations stay surface-level for three or more interactions; life circumstances create genuine distance (not just busyness).

---

Agent Notes:
- Inner circle is the only tier where neglect alerts should feel urgent. Close-friends alerts can wait for a weekly review; inner-circle alerts should surface immediately.
- When generating pre-meeting context for inner-circle members, include the last three interactions, not just the most recent. Pattern matters here.

Topics:
- [[index]]
```

### Introduction Opportunity Note

```markdown
---
description: Keiko (ceramicist, Sarah's neighbor) and Elena (looking for ceramics collaborator for gallery installation)
person_a: "[[keiko-tanaka]]"
person_b: "[[elena-vasquez]]"
shared_interest: ceramics — Keiko runs a studio, Elena needs a ceramicist for her gallery installation
context: Maya met Keiko at Sarah's dinner party, has known Elena through the Portland design community since 2023
status: identified
topics: ["[[shared-interests]]"]
---

# Keiko Tanaka and Elena Vasquez — ceramics collaboration

Noticed this connection at [[2026-02-14-dinner-at-sarahs]]. Keiko runs a ceramics studio in NE Portland and showed photos of her work on her phone — geometric forms with matte glazes that feel architectural. Elena has been talking since December about finding a ceramicist who thinks structurally rather than decoratively for her installation at the Newspace Center.

The styles are complementary, not identical. Keiko's work is precise and geometric; Elena's installations are organic and site-specific. That contrast could be genuinely interesting rather than just convenient.

## Before introducing

- Confirm with Elena that she is still looking (last mentioned it in January)
- Look at Keiko's portfolio online to make sure Maya's impression from phone photos holds up
- Think about framing: "someone whose work might complement yours" rather than "I found you a ceramicist"

---

Topics:
- [[shared-interests]]
```

### Person Note: Priya Sharma (Close Friends Tier)

```markdown
---
description: Maya's former manager at Nike turned independent UX research consultant — career mentor, practical advisor, navigated the freelance transition Maya's other friends are considering
tier: close-friends
relationship: mentor
context_met: Nike Design Team, 2019 — Priya was Maya's manager for two years
location: Seattle, WA
last_contact: 2026-01-28
contact_preference: video-call
important_dates:
  - label: birthday
    date: 08-11
topics: ["[[close-friends]]"]
relevant_people: ["[[sarah-okonkwo]] -- Maya wants to connect them re: independent consulting transition", "[[alex-kim]] -- also worked under Priya at Nike, still in touch"]
---

# Priya Sharma

Priya managed Maya during Maya's most formative professional years at Nike (2019-2021). She taught Maya to ground design decisions in research rather than intuition, a principle Maya still follows. Priya left Nike in 2022 to start an independent UX research consultancy and has been thriving — she now turns away clients.

## Current context

Priya's consultancy has grown to the point where she is considering whether to stay solo or bring on a junior researcher. She values autonomy but is hitting capacity limits on the projects she wants to take. Maya has suggested she talk to [[rafael-dominguez]], who went through the same decision with his design studio in Buenos Aires and ultimately hired a small team.

Priya is also a practical resource for [[sarah-okonkwo]]'s consulting transition — specifically on the health insurance question, which Priya navigated when she left Nike. Maya has been meaning to connect them but wants to do it thoughtfully, not transactionally.

## What matters to her

Priya is direct and efficient. She dislikes small talk and prefers conversations with an agenda, even social ones. She respects people who do their homework before asking for advice. She has a dry sense of humor that takes a few interactions to recognize.

She cares deeply about craft — she judges consultants by the quality of their research, not by their client list. She recommended Maya for the Config speaking opportunity because she saw Maya's work as rigorous, not because they are friends.

## Communication pattern

Video calls every 3-4 weeks, usually 45 minutes, usually with a topic. Priya does not do well with open-ended catch-ups — she prefers "I want to talk about X, what do you think?" Maya has learned to frame conversations that way and the relationship is stronger for it.

---

Relevant People:
- [[sarah-okonkwo]] -- potential connection for consulting insurance advice
- [[alex-kim]] -- shared Nike context
- [[rafael-dominguez]] -- potential connection for scaling a solo consultancy

Topics:
- [[close-friends]]
```

### Shared Interest Note

```markdown
---
description: The overlapping interest in independent consulting across Maya's network — Sarah considering it, Priya already doing it, James thinking about it
people: ["[[sarah-okonkwo]]", "[[priya-sharma]]", "[[james-holloway]]"]
topic: independent consulting transition
depth: active-conversation
topics: ["[[shared-interests]]"]
---

# Independent consulting interest cluster

Three people in Maya's network are at different stages of the same journey: leaving a full-time role to consult independently.

- [[sarah-okonkwo]] is in the consideration phase. Has potential anchor clients but hasn't made the leap. Main blocker is health insurance for her family.
- [[priya-sharma]] made the transition three years ago and is now thriving. She navigated the insurance question and could be a practical resource for Sarah.
- [[james-holloway]] has mentioned wanting to go independent "someday" but hasn't gotten concrete. He brings it up after frustrating weeks at work, then drops it when things improve.

There is a natural peer support group here, but Maya should be thoughtful about it. Sarah is private about her plans, and a group conversation would feel premature. The right move is probably a one-on-one between Sarah and Priya first, then bringing James in if Sarah is comfortable.

---

Topics:
- [[shared-interests]]
```

---

## Processing Workflow

### The Dunbar Model as Architecture

The Dunbar number layers are not just metadata — they are the architectural foundation that determines maintenance cadence, context depth, and agent behavior per contact.

| Layer | Size | Contact Cadence | Context Depth | Agent Behavior |
|-------|------|----------------|---------------|----------------|
| Inner circle | ~5 | Biweekly | Last 3 interactions, full context | Urgent neglect alerts, rich pre-meeting briefings |
| Close friends | ~15 | Monthly | Last 2 interactions, key context | Standard neglect alerts, moderate briefings |
| Active network | ~50 | Quarterly | Last interaction, headline context | Low-priority neglect alerts, light briefings |
| Wider circle | ~150 | Semi-annual | Name and relationship context only | Awareness-level tracking, no active alerting |

The agent calibrates its behavior to the tier. It does not alert Maya about a wider-circle contact she has not spoken to in four months — that is expected. It does alert her about an inner-circle member she has not spoken to in sixteen days — that is a problem.

Tier placement is not permanent. The agent tracks signals that suggest someone is operating at a different tier than their classification: frequency of interaction, depth of conversation (measured by interaction log length and mood tags), and reciprocity balance. When the signals diverge from the tier for three or more interactions, the agent suggests reclassification.

### Capture

Maya captures after conversations, usually by voice. She talks through what happened: who was there, what they discussed, what she noticed, what she promised to do. The agent receives the voice dump and extracts structured data.

**Capture triggers:**
- After any meaningful interaction (not transactional exchanges)
- When learning something new about someone (life event, preference, change)
- When noticing a potential introduction opportunity
- When a follow-up is promised
- When mood or energy of a relationship felt different than usual

### Process

The agent processes captures into structured notes:

1. **Create or update interaction log** — date, people, channel, mood, summary
2. **Extract follow-ups** — promised actions become tracked items with due dates
3. **Update person notes** — new information gets added to the relevant person's context section; `last_contact` updates automatically
4. **Detect introduction opportunities** — when two people share interests but do not know each other, the agent creates an introduction-opportunity note
5. **Flag tier mismatches** — if Maya is interacting with someone weekly but they are classified as `active-network`, the agent suggests reclassification

### Connect

The agent connects across the social graph:

- **Person-to-person links** — added via `relevant_people` when relationships are mentioned
- **Shared interest clustering** — when the same topic appears across multiple person notes, the agent creates or updates a shared-interest note
- **Interaction threading** — each interaction links back to person notes, creating a chronological trail per relationship
- **Gift/preference linking** — when someone mentions a preference in conversation, the agent creates a gift-idea note linked to that person

### Verify

Weekly maintenance cycle:

1. **Neglect scan** — check `last_contact` against tier thresholds (inner-circle: 14 days, close-friends: 30 days, active-network: 90 days, wider-circle: 180 days)
2. **Follow-up audit** — surface any open follow-ups past their due date
3. **Tier review** (monthly) — is anyone interacting at a different tier than their classification? Suggest reclassification
4. **Orphan check** — are any person notes disconnected from tier MOCs?

---

## MOC Structure

### Hub (index.md)

```markdown
---
description: Entry point for Maya's relationship knowledge system — navigate by tier, by context, or by shared interest
type: moc
---

# index

## By Tier (Dunbar layers)
- [[inner-circle]] -- 5 people, biweekly contact minimum
- [[close-friends]] -- 15 people, monthly contact minimum
- [[active-network]] -- 50 people, quarterly contact
- [[wider-circle]] -- 150 people, semi-annual awareness

## By Context
- [[contexts]] -- how and where people connect: college, work, conferences, neighborhood

## By Interest
- [[shared-interests]] -- topic-based groupings that cross tiers and contexts

## Maintenance
- [[neglect-alerts]] -- agent-generated flags for overdue contact
- [[tier-reviews]] -- monthly tier reassessment log
```

### Close Friends MOC (close-friends.md)

```markdown
---
description: The fifteen people Maya actively maintains meaningful relationships with — requires monthly contact, represents the sympathy group in Dunbar's model
type: moc
tier_threshold: contact every 30 days minimum
topics: ["[[index]]"]
---

# close-friends

Dunbar's second layer: the fifteen people Maya would invite to a small birthday dinner. These relationships are not as intensive as inner circle but are actively maintained, not passively held. The agent flags any close-friends contact that goes beyond 30 days without interaction.

## Current Members
- [[priya-sharma]] -- former manager at Nike, now independent consultant, practical career mentor
- [[elena-vasquez]] -- Portland design community, gallery installation artist, creative energy
- [[alex-kim]] -- design systems collaborator from Nike, still active professional relationship
- [[marcus-wright]] -- college study group, reconnected at Config 2024, works in accessibility
- [[rafael-dominguez]] -- Config 2025 co-panelist, runs design studio in Buenos Aires
- [[keiko-tanaka]] -- Sarah's neighbor, ceramicist, met at Feb 2026 dinner
- [[ben-nakamura]] -- David's college roommate, became Maya's friend independently, lives in SF
- [[lisa-worthington]] -- conference buddy, always at the same events, UX research lead at Figma
- [[tom-okonkwo]] -- Sarah's husband, but also genuinely Maya's friend in his own right
- [[diana-park]] -- former colleague from first job in Chicago, long-distance but consistent
- [[omar-hassan]] -- neighborhood friend from Portland years, still texts weekly
- [[jenny-liu]] -- cousin, lives in Vancouver, closest extended family relationship
- [[sam-reeves]] -- partner's sister, strong relationship independent of the partner
- [[carla-dubois]] -- met at a design retreat in 2023, deeply thoughtful, infrequent but rich conversations
- [[nate-sullivan]] -- friend from Portland climbing gym, outdoors-focused friendship

## Tier movement patterns

Close-friends is the most dynamic tier. People move in from active-network when relationships deepen, and occasionally move out to active-network when life creates distance. The agent tracks interaction frequency and depth: someone in close-friends who has had only transactional exchanges for three months may be drifting.

Recent movements:
- [[keiko-tanaka]] added February 2026 (previously wider-circle, upgraded after genuine connection at dinner)
- [[omar-hassan]] at risk of moving to active-network (last three interactions were brief texts, no substantive conversation since November)

---

Agent Notes:
- Close-friends is where relationship maintenance becomes non-trivial. Maya can intuitively maintain inner-circle. She needs agent support to maintain fifteen relationships at monthly cadence.
- Pre-meeting context for close-friends should include the last two interactions (not three, as with inner-circle). The interaction depth is lower, so less history is needed for context.
- When close-friends drift toward active-network interaction patterns, flag it gently: "Your last three interactions with Omar were brief texts. Would a longer conversation feel right?"

Topics:
- [[index]]
```

### Context MOC (contexts.md)

```markdown
---
description: Groups people by how Maya knows them — the social contexts that brought people into her life
type: moc
topics: ["[[index]]"]
---

# contexts

People enter Maya's life through contexts. These groupings matter because shared context predicts conversational comfort and suggests introduction opportunities within context clusters.

## College (UMich, 2010-2014)
- [[sarah-okonkwo]] -- freshman roommate, closest ongoing friendship
- [[james-holloway]] -- design program cohort, now professional collaborator
- [[marcus-wright]] -- study group, reconnected at a conference in 2024

## Nike Design Team (2019-2023)
- [[priya-sharma]] -- former manager, now independent consultant
- [[alex-kim]] -- design systems collaborator, still at Nike

## Conference Network
- [[elena-vasquez]] -- met at AIGA Portland 2023, gallery installation artist
- [[rafael-dominguez]] -- Config 2025 co-panelist, runs design studio in Buenos Aires

## Family
- [[david-chen]] -- older brother, Toronto
- [[mom-mei-lin]] -- mother, recently moved to Taipei

---

Agent Notes:
- Context clusters predict introduction success — people from the same context need no social lubrication. Cross-context introductions need more framing.
- When someone appears in multiple contexts (e.g., college friend who became a colleague), note the transition in their person file — it changes the relationship dynamic.

Topics:
- [[index]]
```

---

## Graph Query Examples

```bash
# Find all people Maya hasn't contacted in over 30 days
rg '^last_contact:' notes/*.md | while read line; do
  file=$(echo "$line" | cut -d: -f1)
  date=$(echo "$line" | awk '{print $2}')
  if [[ "$date" < "2026-01-16" ]]; then
    echo "$file — last contact: $date"
  fi
done

# Find all open follow-ups across interactions
rg -U 'status: open' interactions/ -B 1

# Find all people in a specific tier
rg '^tier: close-friends' notes/

# Find all introduction opportunities still in "identified" status
rg '^status: identified' notes/ --glob '*introduction*'

# Find everyone who shares an interest in independent consulting
rg 'independent consult' notes/ -l

# Find all interactions with a specific person
rg '^\s*- "\[\[sarah-okonkwo\]\]"' interactions/ -l

# Surface gift ideas for upcoming birthdays
rg '^important_dates:' notes/ -A 3 | rg 'birthday' -A 1
```

---

## What Makes This Domain Unique

### The relationship graph is the primary artifact, not the individual notes

In a research vault, individual claim notes are the atomic units of value. In a relationship system, no person note is meaningful in isolation — the value lives in the connections between people, the interaction history that threads through them, and the patterns that emerge across the social graph. A person note without interaction logs, without connections to other people, without tier context, is just an address book entry. The graph makes it a social memory.

### Temporal decay is the dominant maintenance pressure

Research notes can sit untouched for months without losing value — a well-written claim about knowledge management is as true in June as in January. Relationships decay actively. Every day without contact moves a relationship closer to dormancy. This means maintenance is not periodic health-checking but continuous decay monitoring. The review dimension is not about note quality but about relationship health, and the cadence is measured in days and weeks, not months and quarters.

### Emotional texture is data the agent cannot generate but must preserve

The most valuable information in a relationship system is qualitative: how someone seemed, what the energy was like, what went unsaid. The agent cannot infer these from structured fields. Its job is to preserve the emotional texture Maya captures in voice dumps and interaction logs, and to surface it at the right moment — before the next interaction, when Maya needs to remember not just what happened but how it felt.

---

## Agent-Native Advantages

### Exhaustive neglect detection across Dunbar tiers

Maya can intuitively track whether she has talked to her five closest people recently. She cannot track fifty people with different contact cadences. The agent maintains a decay clock per person, calibrated to their tier threshold. Inner circle members get flagged at 14 days; active network members at 90 days. The flag is not "you should call this person" but "this relationship is approaching dormancy — is that intentional?" The agent distinguishes between intentional distance (Maya moved someone to a lower tier) and accidental neglect (life got busy and three months evaporated).

A human doing this manually would need to review a spreadsheet weekly and perform date arithmetic for 150+ contacts. The agent does it continuously, invisibly, and only surfaces what needs attention.

### Cross-graph introduction matching

Maya knows what her friends care about individually. She does not hold all 150 people's interests in working memory simultaneously. The agent does. When Maya captures that Keiko is a ceramicist, the agent can instantly cross-reference against every person note in the vault and surface Elena's months-old mention of needing a ceramics collaborator. This is not semantic search in the traditional sense — it is exhaustive pairwise comparison across the social graph, something a human literally cannot do across more than about fifteen contacts.

The introduction opportunities the agent surfaces are genuinely novel — connections Maya would never have thought to make because the relevant information lives in two different conversations months apart with people in different social contexts.

### Interaction pattern analysis that reveals relationship dynamics

Over six months of interaction logs, the agent can detect patterns invisible to Maya:

- **Reciprocity imbalance** — Maya always initiates with one friend; another friend always initiates with her. Neither pattern is inherently bad, but awareness changes behavior.
- **Mood trends** — interactions with a particular person have shifted from "warm" to "neutral" over three months. Something may have changed.
- **Topic evolution** — conversations with a colleague increasingly focus on frustration with their company, suggesting they may be considering a change.
- **Seasonal patterns** — Maya's social energy drops in February every year, leading to a cascade of neglect alerts. The agent can anticipate this and front-load outreach in January.

No human maintains a mental model of interaction patterns across 50+ relationships over months. The agent builds this model automatically from interaction logs Maya is already creating, transforming a byproduct of good capture into genuine social intelligence.

### Pre-meeting context synthesis

Before Maya meets someone, the agent assembles a contextual briefing: the last three interactions, any open follow-ups, recent life events mentioned in previous conversations, any relevant updates from mutual connections. This is not just "when did you last talk" — it is "here is the conversational landscape so you can be fully present instead of spending the first ten minutes catching up on logistics."

The human equivalent of this would be re-reading months of journal entries before every meeting. Nobody does that. The agent does it in seconds, every time, without being asked.

### Gift and gesture memory that never fades

When Sarah mentions in passing during a February dinner that she has been obsessed with Kenyan washed process coffee from Heart Roasters, Maya will forget this by March. The agent will not. When Sarah's birthday arrives in three weeks, the agent surfaces this alongside every other preference and gift idea accumulated over years of interactions. The result is not "I remembered" (which humans do unreliably) but "I always remember" (which only an agent can guarantee).

This extends beyond gifts to all social gestures: remembering to ask about someone's mother's surgery, following up on a job interview they mentioned six weeks ago, noting that they said they were reading a book Maya also loved. Each individual act of remembering is small. The cumulative effect of never forgetting is transformative — it communicates care through consistency that humans cannot sustain across a large network.
---

Topics:
- [[domain-compositions]]
