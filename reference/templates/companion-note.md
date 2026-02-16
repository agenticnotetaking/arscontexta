---
description: One sentence adding context beyond the title (~150 chars)
type: memory
status: fresh
people: []
context: ""
created: YYYY-MM-DD
_schema:
  entity_type: "companion-note"
  applies_to: "memories/*.md"
  required:
    - description
    - type
  optional:
    - status
    - created
    - people
    - context
  enums:
    type:
      - memory
      - ritual
      - milestone
      - moment
    status:
      - fresh
      - revisited
      - archived
  constraints:
    description_max_chars: 200
    people_format: "array of names or wiki links"
    context_format: "free text — where, when, what triggered the memory"
  notes: >
    Companion notes capture things worth remembering about life — moments,
    rituals, milestones, preferences, and observations. They follow the
    universal prose-as-title pattern but with minimal schema to keep capture
    friction near zero. The companion domain is the lightest configuration,
    optimized for memory building without processing overhead.

    The type field distinguishes four kinds of companion content:
    - memory: a specific thing worth remembering (default)
    - ritual: recurring events, traditions, practices
    - milestone: significant life events, achievements, transitions
    - moment: small observations, fleeting impressions worth preserving

    The status field tracks revisiting:
    - fresh: just captured, not yet revisited
    - revisited: looked at again during maintenance and still resonant
    - archived: no longer active but preserved for history

    The people field is optional — not every memory involves specific people,
    but when it does, naming them enables person-centric retrieval via
    entity MOCs in the relationships domain.

    The context field captures environmental or situational details that
    make the memory vivid — where you were, what prompted it, what was
    happening around you. This is the companion equivalent of the research
    domain's source field: provenance for memories.
---

# prose-as-title expressing the memory as a complete thought

Body with context — what happened, why it matters, what it connects to. Write naturally, as if telling a friend. The memory should stand on its own: specific enough to be useful when recalled later, personal enough to be worth keeping.

Since this is the lightest domain, body text can be brief. A few sentences capturing the essential detail is often enough. The title carries the memory; the body adds color.

---

Topics:
- [[life-area-moc]]
