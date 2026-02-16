---
description: Project management knowledge system — inspirational composition showing derived architecture for decision tracking, stakeholder management, and cross-project learning
kind: example
domain: pm
topics: ["[[domain-compositions]]"]
---

# project management uses decision tracking with stakeholder context

Project management knowledge doesn't work like research or journaling. The core unit isn't a claim or an emotional insight — it's a decision. Decisions accumulate context, get revisited, become stale, get superseded, and sometimes get relitigated by people who weren't in the room when the decision was made. The failure mode isn't "lost information" — it's "lost rationale." The team remembers WHAT was decided but not WHY, so they either re-argue settled questions or blindly follow decisions whose assumptions no longer hold.

Human PMs handle this with meeting notes, decision logs, and risk registers that start well-maintained and gradually decay. The weekly status meeting captures actions that nobody tracks. The decision log captures the first 20 decisions and then gets abandoned because updating it isn't anyone's job. The risk register is assessed at project kickoff and reviewed once during a quarterly panic.

The agent doesn't forget to update. It doesn't lose track of action items. It doesn't fail to notice that the decision from February assumed a headcount that changed in April. It maintains the full decision graph — what was decided, why, what it depends on, what depends on it, and whether the conditions that motivated it still hold.

## Persona

Sam Okafor is a senior engineering manager at a mid-size SaaS company, running three concurrent projects with overlapping stakeholders. She has 14 direct reports across two teams. She spends 60% of her week in meetings. Her current pain: decisions get made in Slack threads, hallway conversations, and meeting sidebars, and she can't remember which decisions were made where, who was consulted, or what alternatives were considered. When a new team member asks "why did we choose Kafka over RabbitMQ?", Sam knows there was a good reason but can't reconstruct the rationale. When a stakeholder asks "what's the impact if we delay the payments API?", Sam mentally traces dependencies but knows she's missing connections.

What Sam needs is a system where every decision lives as a node with full context: what prompted it, what options were considered, who was consulted, what was chosen, and why. Where the agent can tell her: "The Kafka decision was made on Jan 15 because of throughput requirements for the real-time analytics feature. That feature was deprioritized on Feb 3. The throughput requirement that motivated Kafka may no longer apply. Three other decisions depend on Kafka being the message broker." That's not just retrieval — that's impact analysis of context change.

## Configuration

| Dimension | Position | Rationale |
|-----------|----------|-----------|
| Granularity | Atomic for decisions and risks, compound for meeting notes | Decisions must be independently referenceable — you cite "the Kafka decision," not "the January meeting." But meeting notes are naturally compound: multiple topics, multiple decisions, multiple action items. The meeting note is the compound capture; decisions, actions, and risks are extracted as atomic notes. |
| Organization | Flat with project overlays | Notes organized by project would create silos. A decision affecting both the payments API and the analytics pipeline needs to be findable from either context. Flat files with project tags in YAML enable multi-project queries. Wiki links cross project boundaries. |
| Linking | Explicit with typed relationships — depends_on, supersedes, impacts, blocks | PM relationships are directional and typed. "Decision A depends on Decision B" is fundamentally different from "Decision A is related to Decision B." The dependency graph is the backbone of project management. Untyped links lose the relationship that enables impact analysis. |
| Metadata | Dense — project, status, stakeholders, dates, dependencies | PM operates on structured queries: "What decisions are pending for the payments project?" "Which risks haven't been reviewed in 30 days?" "Who was consulted on the Kafka decision?" Dense metadata enables these queries. The cost of capture is justified because PM decisions have organizational consequences. |
| Processing | Moderate — meeting extraction + weekly reconciliation + event-triggered updates | Meeting notes get systematic extraction: decisions, action items, risks, and stakeholder commitments are pulled out as atomic notes. Weekly reconciliation checks action item completion, decision freshness, and risk status. Event-triggered processing fires when context changes (stakeholder update, timeline shift, dependency resolution). |
| Formalization | High — templates for every note type, validation for required fields | PM artifacts have downstream consumers (stakeholders, team members, executives). Inconsistent formats create friction. Templates ensure every decision has rationale, every risk has an owner, every action item has a deadline. This isn't bureaucracy — it's the minimum metadata that makes PM knowledge actionable. |
| Review | Weekly reconciliation + quarterly retrospective synthesis | Weekly: action item status, stale decisions, unreviewed risks. Quarterly: retrospective theme analysis, cross-project pattern detection, estimation accuracy tracking. The weekly cadence matches sprint rhythms; the quarterly cadence catches systemic patterns. |
| Scope | Multi-project, organization-bounded | Sam runs three projects. Decisions in one affect the others. The vault must support cross-project queries, shared stakeholders, and dependency tracking across project boundaries. But scope is bounded to Sam's organizational context — this isn't a company-wide knowledge base. |

## Vault Structure

```
vault/
├── 00_inbox/
│   ├── meetings/                          # raw meeting notes
│   │   ├── 2026-02-14-payments-standup.md
│   │   ├── 2026-02-13-architecture-review.md
│   │   └── 2026-02-12-exec-sync.md
│   ├── slack-captures/                    # important Slack decisions
│   │   └── 2026-02-14-kafka-partition-discussion.md
│   └── ideas/                             # improvement ideas
│       └── shared-cache-layer-proposal.md
├── 01_thinking/                           # flat — decisions, risks, patterns, MOCs
│   ├── index.md                           # hub MOC
│   ├── payments-api.md                    # project MOC
│   ├── analytics-pipeline.md              # project MOC
│   ├── auth-service-migration.md          # project MOC
│   ├── architecture-decisions.md          # cross-cutting topic MOC
│   ├── estimation-patterns.md             # cross-cutting topic MOC
│   ├── stakeholder-management.md          # cross-cutting topic MOC
│   ├── team-health.md                     # cross-cutting topic MOC
│   ├── chose Kafka over RabbitMQ for real-time analytics throughput.md
│   ├── payments API deadline depends on auth migration completing first.md
│   ├── our sprint estimates are 30 percent optimistic on average.md
│   ├── exec stakeholders need impact summaries not technical details.md
│   ├── cross-team dependencies cause more delays than technical complexity.md
│   ├── risk of auth migration blocking payments has increased to high.md
│   └── ... (decision notes, risk notes, pattern notes)
├── 02_archive/
│   ├── completed-projects/
│   │   └── onboarding-redesign/
│   │       ├── project-summary.md
│   │       ├── decision-log.md
│   │       └── retrospective-synthesis.md
│   ├── references/
│   │   └── meeting-notes/                 # processed meeting notes
│   │       ├── 2026-02/
│   │       └── 2026-01/
│   └── superseded-decisions/
│       └── chose RabbitMQ for messaging.md
├── 03_tracking/                           # active operational tracking
│   ├── action-items.md                    # active action item tracker
│   ├── weekly-status/
│   │   ├── 2026-w07-status.md
│   │   └── 2026-w06-status.md
│   └── retrospectives/
│       ├── 2026-02-sprint-14-retro.md
│       └── 2026-01-sprint-13-retro.md
├── 04_meta/
│   ├── logs/
│   │   ├── observations.md
│   │   ├── observations/
│   │   ├── tensions.md
│   │   └── tensions/
│   ├── templates/
│   │   ├── decision-note.md
│   │   ├── risk-note.md
│   │   ├── meeting-note.md
│   │   ├── action-item.md
│   │   ├── stakeholder-note.md
│   │   ├── retrospective.md
│   │   ├── project-moc.md
│   │   └── weekly-status.md
│   ├── tasks/
│   │   ├── queue.json
│   │   └── archive/
│   └── scripts/
│       ├── stale-decisions.sh
│       ├── action-item-status.sh
│       ├── risk-review-due.sh
│       ├── dependency-graph.sh
│       └── estimation-accuracy.sh
├── people/                                # stakeholder notes
│   ├── marcus-chen.md
│   ├── priya-sharma.md
│   ├── david-thompson.md
│   └── elena-vasquez.md
└── self/
    ├── management-philosophy.md
    ├── delegation-patterns.md
    └── active-threads.md
```

## Note Schemas

### Decision Note

```yaml
---
description: Selected Kafka over RabbitMQ for the analytics pipeline message broker based on throughput benchmarks showing 10x advantage at target message volume
project: "[[analytics-pipeline]]"
decision_date: 2026-01-15
status: active
stakeholders_consulted: ["[[marcus-chen]]", "[[priya-sharma]]"]
options_considered:
  - option: Kafka
    pros: ["10x throughput at target volume", "native partitioning", "team has prior experience"]
    cons: ["operational complexity", "higher infrastructure cost"]
  - option: RabbitMQ
    pros: ["simpler operations", "lower cost", "existing company standard"]
    cons: ["throughput ceiling at 50k msg/s", "manual partitioning needed"]
  - option: Pulsar
    pros: ["unified messaging and streaming", "geo-replication"]
    cons: ["no team experience", "smaller ecosystem"]
chosen: Kafka
rationale: "Real-time analytics requires 200k+ msg/s sustained. RabbitMQ benchmarks at 50k. Operational complexity is accepted trade-off for 10x throughput headroom."
assumptions:
  - "Real-time analytics feature will launch as planned"
  - "Target volume is 200k+ messages per second"
  - "Team can handle Kafka operational complexity"
supersedes: "[[chose RabbitMQ for messaging]]"
depends_on: []
depended_on_by:
  - "[[analytics pipeline schema uses Avro for Kafka compatibility]]"
  - "[[consumer group topology follows domain boundaries]]"
  - "[[monitoring stack includes Kafka-specific metrics]]"
review_trigger: "If real-time analytics is deprioritized or target volume changes"
topics: ["[[analytics-pipeline]]", "[[architecture-decisions]]"]
relevant_notes:
  - "[[cross-team dependencies cause more delays than technical complexity]] — context: Kafka operational complexity is manageable; the real risk is the dependency on the data team's Avro schemas"
---
```

### Risk Note

```yaml
---
description: Auth migration timeline slip would block payments API launch because payments depends on the new auth token format — likelihood increased from medium to high after Feb sprint review
project: "[[payments-api]]"
risk_id: RISK-PAY-003
identified_date: 2026-01-20
last_reviewed: 2026-02-14
likelihood: high
impact: high
risk_score: critical
owner: "[[marcus-chen]]"
status: active
mitigation_strategy: "Payments team builds adapter layer for old auth tokens as fallback. Adds 1 sprint of work but decouples the dependency."
mitigation_status: in-progress
triggers:
  - "Auth migration misses Feb 28 milestone"
  - "Auth team loses headcount"
escalation_path: "[[david-thompson]] (VP Eng) if mitigation not feasible"
depends_on: "[[payments API deadline depends on auth migration completing first]]"
topics: ["[[payments-api]]", "[[auth-service-migration]]"]
relevant_notes:
  - "[[cross-team dependencies cause more delays than technical complexity]] — validates: this risk is a cross-team dependency, not a technical challenge"
  - "[[our sprint estimates are 30 percent optimistic on average]] — compounds: if auth is 30% optimistic, the Feb 28 milestone is actually mid-March"
---
```

### Meeting Note (raw capture)

```yaml
---
description: Architecture review — discussed Kafka partition strategy, agreed on domain-bounded consumer groups, action item for Marcus to benchmark partition counts
date: 2026-02-13
meeting_type: architecture-review
project: "[[analytics-pipeline]]"
attendees: ["[[marcus-chen]]", "[[priya-sharma]]", "Sam Okafor"]
duration: 60
---
```

### Stakeholder Note

```yaml
---
description: Marcus Chen — tech lead for analytics pipeline and auth migration, prefers async written updates, high influence on architecture decisions
name: Marcus Chen
role: Tech Lead
projects: ["[[analytics-pipeline]]", "[[auth-service-migration]]"]
communication_preference: async-written
influence_level: high
interest_level: high
reporting_to: Sam Okafor
update_frequency: weekly
key_concerns: ["technical debt", "team capacity", "architecture consistency"]
topics: ["[[stakeholder-management]]"]
relevant_notes:
  - "[[chose Kafka over RabbitMQ for real-time analytics throughput]] — consulted: Marcus led the evaluation and advocated for Kafka"
  - "[[risk of auth migration blocking payments has increased to high]] — owns: Marcus owns the auth timeline and the mitigation"
---
```

### Action Item

```yaml
---
description: Marcus to benchmark Kafka partition counts for analytics pipeline target throughput by Feb 21
assignee: "[[marcus-chen]]"
source_meeting: "[[2026-02-13-architecture-review]]"
project: "[[analytics-pipeline]]"
created: 2026-02-13
deadline: 2026-02-21
status: in-progress
depends_on: []
blocks: "[[analytics pipeline schema uses Avro for Kafka compatibility]]"
follow_up_date: 2026-02-18
topics: ["[[analytics-pipeline]]"]
---
```

### Retrospective

```yaml
---
description: Sprint 14 retro — recurring theme of underestimation, new insight about scope creep through Slack-based feature requests bypassing backlog
date: 2026-02-14
sprint: 14
project: "[[payments-api]]"
what_worked:
  - "Pair programming on the payment reconciliation module"
  - "Daily written standups replaced video standups — better async"
what_didnt:
  - "Sprint velocity 30% below estimate again"
  - "Three unplanned features added mid-sprint from Slack requests"
action_items:
  - description: "All feature requests must go through backlog, no Slack-direct"
    owner: Sam Okafor
    deadline: 2026-02-21
    status: not-started
themes: ["estimation-accuracy", "scope-management", "async-communication"]
topics: ["[[payments-api]]", "[[estimation-patterns]]"]
relevant_notes:
  - "[[our sprint estimates are 30 percent optimistic on average]] — validates: fourth consecutive sprint with 30%+ overrun"
  - "[[cross-team dependencies cause more delays than technical complexity]] — extends: Slack feature requests are a form of untracked cross-team dependency"
---
```

### Weekly Status

```yaml
---
description: Week 7 status — payments API on track pending auth dependency, analytics pipeline partition benchmarks complete, auth migration 1 week behind
week: "2026-W07"
period: "2026-02-10 to 2026-02-14"
projects_covered: ["[[payments-api]]", "[[analytics-pipeline]]", "[[auth-service-migration]]"]
---
```

## Example Notes

### Example 1: Decision Note

```markdown
---
description: Selected Kafka over RabbitMQ for the analytics pipeline message broker based on throughput benchmarks showing 10x advantage at target message volume
project: "[[analytics-pipeline]]"
decision_date: 2026-01-15
status: active
stakeholders_consulted: ["[[marcus-chen]]", "[[priya-sharma]]"]
options_considered:
  - option: Kafka
    pros: ["10x throughput at target volume", "native partitioning", "team has prior experience"]
    cons: ["operational complexity", "higher infrastructure cost"]
  - option: RabbitMQ
    pros: ["simpler operations", "lower cost", "existing company standard"]
    cons: ["throughput ceiling at 50k msg/s", "manual partitioning needed"]
  - option: Pulsar
    pros: ["unified messaging and streaming", "geo-replication"]
    cons: ["no team experience", "smaller ecosystem"]
chosen: Kafka
rationale: "Real-time analytics requires 200k+ msg/s sustained. RabbitMQ benchmarks at 50k. Operational complexity is accepted trade-off for 10x throughput headroom."
assumptions:
  - "Real-time analytics feature will launch as planned"
  - "Target volume is 200k+ messages per second"
  - "Team can handle Kafka operational complexity"
supersedes: "[[chose RabbitMQ for messaging]]"
depends_on: []
depended_on_by:
  - "[[analytics pipeline schema uses Avro for Kafka compatibility]]"
  - "[[consumer group topology follows domain boundaries]]"
  - "[[monitoring stack includes Kafka-specific metrics]]"
review_trigger: "If real-time analytics is deprioritized or target volume changes"
topics: ["[[analytics-pipeline]]", "[[architecture-decisions]]"]
relevant_notes:
  - "[[cross-team dependencies cause more delays than technical complexity]] — context: Kafka operational complexity is manageable; the real risk is the dependency on the data team's Avro schemas"
---

# chose Kafka over RabbitMQ for real-time analytics throughput

The analytics pipeline needs to sustain 200k+ messages per second for real-time dashboard updates. We evaluated three message brokers and chose Kafka based primarily on throughput benchmarks.

The core trade-off is throughput versus operational simplicity. RabbitMQ is the company standard — we know how to run it, the platform team supports it, and it covers 90% of our messaging needs. But its throughput ceiling of roughly 50k messages per second means we'd need to build a custom partitioning layer on top to hit our target. At that point we're building a worse version of what Kafka does natively.

Pulsar was interesting but introduced too much novelty risk. Nobody on the team has operated Pulsar in production, and the ecosystem tooling (monitoring, schema registry integration) is less mature than Kafka's. Since [[cross-team dependencies cause more delays than technical complexity]], adding a technology that requires platform team learning would create an implicit dependency on their capacity.

The decision has a built-in review trigger: if the real-time analytics feature is deprioritized (which is being discussed — [[david-thompson]] raised this at the Feb exec sync), the throughput requirement drops dramatically and the Kafka complexity is no longer justified. Three downstream decisions depend on Kafka being the broker: the Avro schema format, the consumer group topology, and the monitoring stack additions. If we revisit Kafka, those cascade.

Marcus led the evaluation and is confident the team can handle Kafka operations based on his experience at his previous company. Priya raised the operational cost concern but agreed the throughput requirement leaves no alternative with RabbitMQ.

---

Source: [[2026-01-15-architecture-review]]
```

### Example 2: Cross-Project Pattern Note

```markdown
---
description: Analysis of 14 sprints shows estimates consistently overshoot by roughly 30 percent — the pattern holds across projects, suggesting a systemic estimation bias rather than project-specific complexity
confidence: high
evidence_sprints: 14
projects_analyzed: ["[[payments-api]]", "[[analytics-pipeline]]", "[[auth-service-migration]]"]
topics: ["[[estimation-patterns]]"]
relevant_notes:
  - "[[cross-team dependencies cause more delays than technical complexity]] — compounds: untracked cross-team work inflates apparent estimation error"
  - "[[risk of auth migration blocking payments has increased to high]] — implication: if auth is 30% optimistic, the timeline is worse than reported"
  - "[[exec stakeholders need impact summaries not technical details]] — application: status reports should use adjusted timelines, not raw estimates"
---

# our sprint estimates are 30 percent optimistic on average

Looking at velocity data across 14 sprints and three projects, a consistent pattern emerges: we complete roughly 70% of planned story points per sprint. This isn't random variation — it's a systematic bias. The standard deviation is small enough (about 8%) that the 30% overestimation is a reliable predictor, not a noisy average.

What makes this interesting is that it's project-independent. The payments API team, the analytics pipeline team, and the auth migration team all show approximately the same bias. This suggests the cause isn't "these particular stories were harder than expected" but something systemic about how we estimate.

Three hypotheses, not mutually exclusive:

First, since [[cross-team dependencies cause more delays than technical complexity]], some of the "missing" 30% is work that wasn't in the sprint plan — ad-hoc requests, Slack-driven scope additions, dependencies that surfaced mid-sprint. This isn't estimation error; it's untracked work consuming capacity. The sprint 14 retrospective specifically flagged Slack-based feature requests bypassing the backlog.

Second, planning fallacy: humans systematically underestimate task duration, especially for tasks similar to ones they've done before. We think "I did something like this last time in 3 days" but forget the three half-days of debugging and context switching that actually made it five days.

Third, the scope of "done" expands during sprints. A story estimated at 5 points during planning becomes 8 points of actual work because testing, documentation, and deployment considerations weren't fully captured in the estimate.

The practical implication is immediate. Since [[risk of auth migration blocking payments has increased to high]], and the auth team estimates Feb 28 for their milestone, the 30% bias suggests the real date is mid-March. The mitigation strategy (adapter layer for old auth tokens) becomes more urgent.

For stakeholder communication, since [[exec stakeholders need impact summaries not technical details]], status reports should present adjusted timelines: "Engineering estimates Feb 28; our historical accuracy suggests mid-March is more likely. We're building a fallback to decouple the payments launch from this timeline."

---

Source: Sprint velocity data (sprints 1-14), [[2026-02-14-sprint-14-retro]]
```

### Example 3: Project MOC

```markdown
---
description: The payments API project — tracks decisions, risks, dependencies, and cross-project impacts for the Q1 payments platform launch
type: moc
topics: ["[[index]]"]
---

# payments-api

The payments API is the Q1 priority: a complete rebuild of the payment processing pipeline with real-time reconciliation. The project's critical path runs through the auth service migration — payments can't launch until the new auth token format is deployed. This dependency is the primary risk.

## Key Decisions

- [[chose Kafka over RabbitMQ for real-time analytics throughput]] — cross-project: the analytics pipeline's Kafka choice affects payments if they need to share event streams
- [[payments API deadline depends on auth migration completing first]] — the critical dependency: payments launch is blocked until auth migration completes

## Active Risks

- [[risk of auth migration blocking payments has increased to high]] — critical: auth timeline slip cascades directly to payments launch
- Payment reconciliation performance under load — medium: untested at production scale, benchmark planned for sprint 15

## Dependencies

```
auth-service-migration ─── blocks ──→ payments-api
                                          │
analytics-pipeline ──── shares events ──→ payments-api (if real-time reconciliation needs analytics data)
```

## Stakeholder Map

- [[marcus-chen]] — tech lead, owns auth timeline, primary technical decision maker
- [[david-thompson]] — VP Eng, exec sponsor, needs high-level status, escalation path for critical risks
- [[priya-sharma]] — platform team lead, consulted on infrastructure decisions
- [[elena-vasquez]] — product manager, owns scope and timeline, primary customer for status updates

## Estimation Reality

Since [[our sprint estimates are 30 percent optimistic on average]], published timelines should be adjusted. Raw estimate: Feb 28 for auth dependency. Adjusted: mid-March. Implications documented in the risk note.

## Recent Activity

- Sprint 14 retro flagged Slack-based scope creep (3 unplanned features added mid-sprint)
- Auth migration risk escalated from medium to high after Feb sprint review
- Mitigation (adapter layer for old auth tokens) approved and in progress

---

Agent Notes:
This project's critical path is simple: auth migration → payments launch. When checking project health, the first question is always "what's the auth migration status?" Cross-reference with [[auth-service-migration]] MOC for the upstream view. The estimation bias note affects every timeline discussion — always mentally apply the 30% correction.
```

### Example 4: Stakeholder Note

```markdown
---
description: David Thompson — VP Engineering, exec sponsor for payments and analytics, needs concise impact summaries not technical depth, escalation path for critical cross-project risks
name: David Thompson
role: VP Engineering
projects: ["[[payments-api]]", "[[analytics-pipeline]]"]
communication_preference: concise-written
influence_level: very-high
interest_level: medium
update_frequency: biweekly
key_concerns: ["Q1 delivery timeline", "headcount allocation", "technical debt trajectory"]
decision_style: "Wants 3 options with recommendation. Decides quickly when given clear trade-offs. Dislikes surprises — escalate early."
topics: ["[[stakeholder-management]]"]
relevant_notes:
  - "[[exec stakeholders need impact summaries not technical details]] — application: David tunes out after the first technical sentence; lead with business impact"
  - "[[chose Kafka over RabbitMQ for real-time analytics throughput]] — context: David approved the cost increase for Kafka; frame future infra decisions in similar terms (cost vs capability trade-off)"
  - "[[risk of auth migration blocking payments has increased to high]] — escalation: David is the escalation path if mitigation isn't feasible"
---

# David Thompson

David is VP Engineering and exec sponsor for both the payments API and analytics pipeline projects. He manages six engineering managers (including Sam) and reports to the CTO.

## Communication Approach

David processes information in impact terms, not technical terms. Since [[exec stakeholders need impact summaries not technical details]], updates to David should follow the format: "Here's the business impact. Here's what we're doing. Here's what we need from you." Technical details belong in a linked decision note, not the summary.

He prefers written updates over meetings. His calendar is 80% meetings already. A well-structured Slack message or document covers most update needs. Reserve meeting time for decisions that require discussion.

## Decision History

David approved the Kafka infrastructure cost increase on Jan 18 after seeing the throughput comparison. He values clear trade-off framing: "Option A costs X and delivers Y. Option B costs less but limits Z." He decides quickly when the trade-offs are crisp and gets frustrated when presented with ambiguous options.

On Feb 5, he raised the possibility of deprioritizing real-time analytics — this would cascade to the Kafka decision's relevance. Sam flagged the downstream impact. David asked for an impact summary by Feb 20.

## Current Attention

David's current focus is Q1 delivery. The payments API launch is his primary concern because it affects revenue targets. The auth migration blocking risk needs early escalation if mitigation doesn't hold — David specifically said "tell me before it's a fire, not after."

---

Related Notes:
- [[payments-api]] — David is exec sponsor
- [[analytics-pipeline]] — David is exec sponsor
```

### Example 5: Meeting Note (Processed)

```markdown
---
description: Architecture review — discussed Kafka partition strategy, agreed on domain-bounded consumer groups, Marcus to benchmark partition counts by Feb 21
date: 2026-02-13
meeting_type: architecture-review
project: "[[analytics-pipeline]]"
attendees: ["[[marcus-chen]]", "[[priya-sharma]]", "Sam Okafor"]
duration: 60
decisions_made:
  - "Consumer groups will follow domain boundaries (one per bounded context)"
  - "Partition count benchmarking before finalizing topology"
action_items:
  - assignee: "[[marcus-chen]]"
    description: "Benchmark partition counts at target throughput"
    deadline: 2026-02-21
  - assignee: "[[priya-sharma]]"
    description: "Review Kafka monitoring integration with existing stack"
    deadline: 2026-02-19
risks_identified:
  - "Partition rebalancing during deployment could cause message delays"
topics: ["[[analytics-pipeline]]", "[[architecture-decisions]]"]
---

# 2026-02-13 Architecture Review — Kafka Topology

## Decisions

**Consumer group topology follows domain boundaries.** Each bounded context (payments, analytics, notifications) gets its own consumer group rather than sharing groups across domains. This isolates processing failures: if the notifications consumer falls behind, it doesn't affect payments processing.

This decision builds on [[chose Kafka over RabbitMQ for real-time analytics throughput]] — the domain-bounded approach leverages Kafka's native partition assignment, which was one of the reasons we chose Kafka.

Priya raised the question of whether domain-bounded groups waste resources on low-volume domains. Marcus argued that the operational simplicity of isolation outweighs the resource overhead, and the team agreed.

**Partition count to be benchmarked before finalizing.** Marcus will run throughput tests with 12, 24, and 48 partitions at 200k msg/s to find the sweet spot between parallelism and rebalancing overhead. Results by Feb 21.

## Open Questions

- How does partition rebalancing during deployment affect message latency? Need to test blue-green deployment with partition reassignment.
- Should we implement dead letter queues per domain or a shared DLQ? Deferred to next architecture review.

## Action Items

| Who | What | When | Status |
|-----|------|------|--------|
| [[marcus-chen]] | Benchmark partition counts (12/24/48) at target throughput | Feb 21 | Not started |
| [[priya-sharma]] | Review Kafka monitoring integration with Datadog | Feb 19 | Not started |

---

Source: Meeting notes, 2026-02-13
```

## Processing Workflow

### Capture

Meeting notes enter `00_inbox/meetings/` during or immediately after meetings. Slack decisions get captured to `00_inbox/slack-captures/` when they contain decisions or commitments. Speed matters — a decision not captured within 24 hours is a decision lost. The agent accepts rough notes; extraction creates structure.

### Reduce (Meeting Extraction)

The agent processes meeting notes by extracting atomic artifacts:

- **Decisions** become decision notes with full context: options considered, rationale, stakeholders, assumptions, and review triggers
- **Action items** become action item notes with assignee, deadline, and dependency links
- **Risks** become risk notes or enrich existing risk assessments
- **Stakeholder commitments** update stakeholder notes with what was promised and when

A single meeting might produce 0-3 decision notes, 2-5 action items, and 0-2 risk updates. The meeting note itself moves to archive after extraction.

**Domain-specific extraction focus:**
- Decisions must capture alternatives and rationale, not just the outcome
- Action items must have deadlines and assignees (the agent flags items missing either)
- Risk assessments must include review triggers (conditions under which risk changes)
- Dependencies between decisions must be explicitly linked

### Reflect (Connect Forward)

For each new decision, the agent searches the vault for:

- Decisions that depend on this one (downstream impact)
- Decisions this one supersedes (update the old decision's status)
- Risks affected by this decision (does it mitigate or increase existing risks?)
- Stakeholders who should know about this decision (based on project membership and communication preferences)
- Cross-project implications (does this analytics decision affect payments?)

The agent updates project MOCs with new decisions and adjusts the dependency graph. Meeting extraction followed by reflection means a one-hour meeting produces a fully connected set of decision nodes within minutes of the meeting ending.

### Reweave (Connect Backward)

When context changes, older decisions need re-evaluation. The agent checks:

- **Assumption validity**: Does the decision's rationale still hold? The Kafka decision assumed 200k msg/s throughput requirements. If real-time analytics is deprioritized, the assumption is invalid.
- **Dependency currency**: Are upstream decisions still active? If a decision depends on a superseded decision, it may need revisiting.
- **Risk evolution**: Have mitigation strategies been implemented? Has the risk landscape changed?

Reweaving is where the agent provides the most value in PM: it catches stale decisions that humans forget to review. The review trigger field on decision notes makes this systematic — the agent checks trigger conditions during every weekly reconciliation.

### Weekly Reconciliation

Every Monday, the agent generates a reconciliation report:

- **Action items**: What's due this week? What's overdue? What's blocked?
- **Stale decisions**: Which decisions haven't been reviewed in 30+ days? Which have triggered review conditions?
- **Risk currency**: Which risks haven't been reviewed in 14+ days? Which have changed likelihood based on new data?
- **Stakeholder updates**: Who needs an update this week based on their update frequency preference?
- **Estimation check**: How did last sprint's actual velocity compare to estimate?

## MOC Structure

```
index.md (Hub)
├── payments-api.md (Project MOC)
│   → decisions, risks, dependencies, stakeholders
├── analytics-pipeline.md (Project MOC)
│   → architecture decisions, technical choices
├── auth-service-migration.md (Project MOC)
│   → migration timeline, blocking risks
├── architecture-decisions.md (Cross-cutting Topic MOC)
│   → decisions that affect multiple projects
├── estimation-patterns.md (Cross-cutting Topic MOC)
│   → velocity data, estimation bias, planning improvements
├── stakeholder-management.md (Cross-cutting Topic MOC)
│   → communication patterns, preference tracking
└── team-health.md (Cross-cutting Topic MOC)
    → retro themes, workload patterns, satisfaction signals
```

### Example Cross-Cutting MOC

```markdown
---
description: Patterns in sprint estimation across projects — tracking the 30 percent bias, root causes, and interventions attempted
type: moc
topics: ["[[index]]"]
---

# estimation-patterns

Estimation accuracy is a systemic challenge, not a project-specific one. The vault tracks estimation data across all three active projects to detect patterns, test interventions, and build organizational memory about what actually takes how long.

## Core Findings

- [[our sprint estimates are 30 percent optimistic on average]] — the foundational finding: systematic bias holds across projects with small variance
- [[cross-team dependencies cause more delays than technical complexity]] — one root cause: untracked cross-team work consumes the "missing" capacity
- [[exec stakeholders need impact summaries not technical details]] — application: adjusted timelines should be the default in stakeholder communication

## Interventions Attempted

Sprint 12: Added 20% buffer to all estimates. Result: still overran by 15%. The buffer was consumed by scope additions, not estimation error.

Sprint 14: Flagged Slack-based scope additions as the specific mechanism. Action item: all feature requests through backlog. Not yet implemented — check sprint 15 results.

## Open Questions

- Is the 30% bias stable, or does it improve as teams mature? Need 6+ more sprints of data.
- Would story point re-calibration help, or is the problem at the story scoping level?
- How much of the overrun is genuine estimation error vs untracked scope additions?

---

Agent Notes:
This MOC bridges all three project MOCs. When any project discusses timeline, check the estimation bias first. The 30% correction should be applied in every status update to David. Track sprint-by-sprint velocity in the weekly status notes — the trend matters more than any individual sprint.
```

## Graph Query Examples

```bash
# Find all active decisions for a specific project
rg -l '^project:.*payments-api' vault/01_thinking/ | xargs rg -l '^status: active'

# Find decisions with unmet assumptions (review trigger potentially fired)
rg '^review_trigger:' vault/01_thinking/ -A0

# Find overdue action items
rg '^deadline: 2026-02' vault/01_thinking/ vault/03_tracking/ | while read line; do
  file=$(echo "$line" | cut -d: -f1)
  deadline=$(echo "$line" | awk '{print $2}')
  status=$(rg '^status:' "$file" 2>/dev/null | awk '{print $2}')
  if [ "$status" != "done" ] && [ "$deadline" \< "2026-02-15" ]; then
    echo "OVERDUE: $file (deadline: $deadline, status: $status)"
  fi
done

# Find risks not reviewed in 14+ days
rg '^last_reviewed:' vault/01_thinking/ | while read line; do
  file=$(echo "$line" | cut -d: -f1)
  reviewed=$(echo "$line" | awk '{print $2}')
  days_ago=$(( ($(date +%s) - $(date -j -f "%Y-%m-%d" "$reviewed" +%s 2>/dev/null || echo 0)) / 86400 ))
  if [ "$days_ago" -gt 14 ]; then
    echo "STALE RISK: $file (last reviewed: $reviewed, $days_ago days ago)"
  fi
done

# Find all decisions a stakeholder was consulted on
rg 'stakeholders_consulted:.*marcus-chen' vault/01_thinking/

# Trace the decision dependency chain from a specific decision
# (recursive: what depends on this, and what depends on those)
./vault/04_meta/scripts/dependency-graph.sh "chose Kafka over RabbitMQ for real-time analytics throughput"

# Find recurring retrospective themes across sprints
rg '^themes:' vault/03_tracking/retrospectives/ | tr ',' '\n' | sort | uniq -c | sort -rn
```

## What Makes This Domain Unique

**Decisions are the atomic unit, not facts or insights.** In research, you extract claims. In therapy, you extract patterns. In PM, you extract decisions. The decision note schema is the most structured note type across all domains because decisions carry the most context: what options existed, who was consulted, what was chosen, why, and what would trigger reconsideration. A claim can stand alone. A decision without its rationale and alternatives is incomplete.

**Dependency graphs create cascading impact.** No other domain has the same cascading structure. When a research claim is contradicted, the contradiction affects that claim and its synthesis notes. When a PM decision's assumptions change, the impact cascades through every dependent decision, risk assessment, timeline, and stakeholder commitment. The agent must trace these cascades — and it's the only entity that can trace them exhaustively.

**Stakeholder communication is a first-class concern.** Research and therapy are individual activities. PM inherently involves multiple people with different information needs, communication preferences, and update frequencies. The stakeholder graph isn't an add-on — it's a core architectural element. Every decision has a "who needs to know?" dimension that the agent can answer by traversing the stakeholder-project-decision graph.

## Agent-Native Advantages

### Stale Decision Detection

Human PMs make decisions and move on. The decision was correct at the time, but the context that motivated it shifts: the headcount changes, the timeline slips, the feature gets deprioritized, the technology landscape evolves. The decision sits in the log, still marked "active," its assumptions quietly expiring.

The agent checks assumptions continuously. Every decision note has explicit assumptions and a review trigger condition. During weekly reconciliation, the agent evaluates whether trigger conditions have been met:

- "The Kafka decision assumed real-time analytics would launch as planned. David raised deprioritization on Feb 5. Trigger condition met. Three downstream decisions depend on Kafka. Impact analysis: if we revert to RabbitMQ, the Avro schema decision, consumer group topology, and monitoring stack additions all need revisiting."

This isn't just "remind me to review the Kafka decision." It's: detect the trigger, trace the dependency chain, assess the cascade, and present the full impact. A human PM might catch the Kafka trigger. They almost certainly wouldn't trace all three downstream dependencies and assess each one's relevance.

### Cross-Project Dependency Analysis

Sam runs three projects with shared stakeholders, shared infrastructure, and implicit dependencies that nobody tracks explicitly. The auth migration blocking the payments API is documented. But what about:

- The analytics pipeline's Kafka schema decision affecting payments if they need shared event streams?
- The auth team's headcount being shared with the analytics team, creating an implicit resource dependency?
- A decision in the analytics project to use a specific monitoring approach that conflicts with a payments decision about alerting?

The agent maintains the full cross-project graph. When a decision is made in any project, the agent checks for impacts in all other projects. "The analytics team's decision to use domain-bounded consumer groups means the payments team can't share the analytics consumer group for reconciliation events. This creates a new dependency: payments needs its own consumer group configuration, which adds approximately one sprint of work."

No human PM can hold three projects' full decision and dependency graphs in working memory simultaneously. The agent can.

### Retrospective Pattern Analysis

Teams hold retrospectives and capture what worked and what didn't. But retrospective value comes from patterns across retrospectives, not individual sessions. The same issue recurring in three consecutive retros is a systemic problem. A theme appearing in two different projects suggests an organizational pattern.

The agent analyzes themes across all retrospectives:

```
RECURRING THEMES (last 6 retros, 3 projects):
- estimation-accuracy: appeared 5/6 retros, all 3 projects
- scope-creep: appeared 4/6 retros, payments + analytics
- cross-team-communication: appeared 3/6 retros, all 3 projects
- async-vs-sync: appeared 2/6 retros, trending upward

RESOLVED THEMES:
- deployment-process: appeared 3/3 retros before automation, 0/3 after
```

This analysis — which themes persist, which resolve, which span projects — requires holding all retrospective data simultaneously and computing frequencies. A human facilitator might remember "we talked about estimation last time too" but can't produce the systematic cross-project theme analysis that reveals organizational patterns.

### Meeting Preparation via Context Aggregation

Before any meeting, the agent assembles all relevant context:

- Decisions previously made about topics on the agenda
- Action items from previous meetings that are due or overdue
- Risk updates since the last meeting
- Stakeholder positions and communication preferences
- Cross-project implications of agenda items

For Sam's weekly sync with David (VP Eng), the agent generates:

"**Prep for David sync, Feb 17:**
- Payments API: on track IF auth adapter mitigation holds. Auth team reports 1 week behind. Adjusted timeline: mid-March (applying 30% estimation correction). Risk score: critical.
- Analytics pipeline: Kafka topology finalized. Marcus benchmarking partition counts, results by Feb 21. No new risks.
- Auth migration: Marcus reports adapter layer 40% complete. Original timeline at risk — Feb 28 milestone unlikely. Mitigation on track.
- David asked for real-time analytics deprioritization impact summary on Feb 5. Due Feb 20. Drafted.
- Two action items from David are overdue: headcount allocation review (Jan 31) and tech debt prioritization framework (Feb 7)."

This prep takes the agent 30 seconds. It would take Sam 20 minutes of digging through Slack, email, meeting notes, and spreadsheets. And Sam would miss things — the overdue headcount item from three weeks ago, the estimation correction, the cascade from auth to payments.

### Decision Amnesia Prevention

The most expensive failure in PM is relitigating settled decisions. A new team member asks "why Kafka?" and nobody can reconstruct the rationale. Or worse: the original decision-maker left the company, and the decision now appears arbitrary. The team debates Kafka vs RabbitMQ again, spending two meetings on a question that was thoroughly analyzed five weeks ago.

The agent makes decision amnesia impossible. When someone asks "why Kafka?", the agent produces: the original evaluation (three options, detailed pros/cons), the rationale (throughput requirements), the stakeholders consulted (Marcus and Priya), the assumptions that must hold (real-time analytics launching as planned), and the current status of those assumptions (David raised deprioritization — trigger condition potentially met).

This isn't just retrieval. The agent adds current context: "This decision was made on Jan 15. Since then, one assumption may have changed: David raised analytics deprioritization on Feb 5. If that proceeds, the throughput requirement drops and the rationale for Kafka weakens. Three downstream decisions depend on Kafka."

The new team member gets the full picture in seconds. The team avoids a two-hour re-debate. And if the decision should actually be revisited (because assumptions changed), the agent provides the structured basis for that conversation rather than an argument from foggy memory.

### Estimation Accuracy as Organizational Memory

Individual sprints have estimation errors. But the pattern across sprints — the systematic 30% bias — is organizational knowledge that no single sprint reveals. The agent tracks estimation accuracy over time, correlating overruns with root causes:

- Which types of work are most underestimated? (Integration tasks run 45% over; UI work runs 15% over)
- Which team members estimate most accurately? (Not to punish, but to calibrate — whose estimates should be scaled by how much?)
- Does the bias change with sprint planning duration? (Longer planning sessions correlate with 5% better estimates)
- Do specific types of scope additions predict overruns? (Slack-originated additions correlate with 2x more overrun than backlog-originated additions)

This builds organizational learning about estimation that persists beyond any individual's tenure. When a new PM joins, the vault doesn't just say "we estimate badly." It says "we overestimate by 30% on average, driven primarily by untracked scope additions, with integration tasks being the worst category. Here are the 14 sprints of data, the three interventions we've tried, and their results."

That's institutional knowledge that would otherwise evaporate every time someone changes roles.
---

Topics:
- [[domain-compositions]]
