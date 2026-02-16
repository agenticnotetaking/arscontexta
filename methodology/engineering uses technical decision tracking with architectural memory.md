---
description: engineering-team knowledge system — inspirational composition showing derived architecture for technical decision tracking, dependency graphs, and architectural memory
kind: example
domain: engineering
topics: ["[[domain-compositions]]"]
---

# engineering uses technical decision tracking with architectural memory

A derived architecture for a team that needs to remember why things are the way they are, understand what depends on what, and learn from what went wrong. Not documentation in the traditional sense — a living architectural memory that connects decisions to consequences, incidents to root causes, and changes to their ripple effects across the system.

The agent translation here is about temporal scale and cross-referencing scope. Human engineers remember the decisions they were personally involved in, for about a year. After that, institutional knowledge degrades: people leave, context fades, and "why is it like this?" becomes unanswerable. An agent never forgets a decision, never loses the thread between an ADR from 2024 and an incident in 2026, and can trace the dependency graph across hundreds of services without holding any of it in working memory. The system transforms tribal knowledge into traversable architecture.

---

## Persona

**The Meridian Platform Team** is a 28-person engineering organization split into five squads, building a B2B analytics platform. They have been operating for four years, which means they have accumulated roughly 200 architecture decisions, 85 incident postmortems, a dependency graph spanning 40+ microservices, and a tech debt backlog that nobody has a complete picture of. Their documentation lives in Confluence (where it goes to die), Notion (where it gets half-updated), Slack threads (where it is unsearchable), and the heads of senior engineers (where it leaves when they do).

**Ravi Krishnamurthy**, the Staff Engineer, is the primary operator. He is the person people go to when they need to understand why a system was built a certain way, and he is running out of head-space. He has watched two other staff engineers leave in the past year, each taking irreplaceable context about subsystems they designed. Ravi does not want to be a bottleneck. He wants a system where the architecture explains itself — where a new engineer can follow a dependency edge from a service to the decisions that shaped it, to the incidents that tested it, to the trade-offs that constrain it.

Ravi's agent operates as the team's architectural memory. When someone proposes a change to the payment processing service, the agent surfaces: which ADRs constrain this service's design, which other services depend on it, what incidents have involved it, and what tech debt exists in it. The agent does not make the decision — it ensures the decision-maker has the full picture, including the parts nobody currently remembers.

---

## Configuration

| Dimension | Position | Rationale |
|-----------|----------|-----------|
| **Granularity** | Atomic for decisions and incidents, compound for service descriptions | Each ADR is a distinct, referenceable decision. Each postmortem is a distinct event. But a service description is inherently compound — architecture, dependencies, operational characteristics, and known issues all belong together because they are accessed together. |
| **Organization** | Flat within categories, with type-based subdirectories | ADRs, postmortems, services, and runbooks each have their own directory. Within each directory, files are flat. The graph connects across directories: an ADR links to the services it affects, a postmortem links to the ADR that created the vulnerable architecture. |
| **Linking** | Heavily explicit with typed relationships | Engineering decisions have precise relationships: ADR-017 *supersedes* ADR-003. Service A *depends on* Service B. Postmortem PM-042 *was caused by* tech debt TD-019. Vague "related" links are nearly useless here — the type of relationship determines what you do with the information. |
| **Metadata** | Dense — structured fields enable automated impact analysis | Every ADR needs status, affected services, superseded_by. Every postmortem needs severity, affected services, root cause category. Every service needs dependencies, SLA, team owner. The density pays for itself through programmatic queries: "show me every P1 incident that involved the payment service in the last six months." |
| **Processing** | Medium — capture is lightweight, connection is heavy | Writing an ADR or postmortem is already a significant cognitive investment. The agent's processing work is in connections: ensuring every new ADR links to affected services, every postmortem links to relevant ADRs, every service's dependency graph stays current. |
| **Formalization** | High — templates enforce consistency, status lifecycles are explicit | ADRs without status tracking are just documents. Postmortems without action item tracking are just stories. The value comes from lifecycle management: proposed to accepted to deprecated to superseded. Templates enforce the fields that enable this. |
| **Review** | Event-triggered plus monthly staleness sweep | New deployments trigger dependency verification. Incidents trigger postmortem creation within 48 hours. Monthly sweeps check for stale runbooks, outdated ADRs, and unresolved postmortem action items. |
| **Scope** | Team-wide with per-squad ownership | The entire engineering org shares one architectural memory. Individual notes have owners (squads), but the graph is shared. A dependency does not care about team boundaries. |

---

## Vault Structure

```
vault/
├── self/
│   ├── identity.md              # Agent identity, operational principles
│   └── memory/
│       └── [operational learnings]
├── notes/
│   ├── index.md                 # Hub: entry point
│   ├── architecture.md          # MOC: architectural patterns and principles
│   ├── services.md              # MOC: service catalog with dependency overview
│   ├── incidents.md             # MOC: postmortem patterns and trends
│   ├── tech-debt.md             # MOC: debt landscape and prioritization
│   ├── migrations.md            # MOC: active and planned migrations
│   │
│   ├── adrs/
│   │   ├── adr-001-adopt-event-sourcing-for-analytics-pipeline.md
│   │   ├── adr-002-use-grpc-for-inter-service-communication.md
│   │   └── ...
│   ├── services/
│   │   ├── payment-service.md
│   │   ├── analytics-pipeline.md
│   │   ├── user-auth.md
│   │   └── ...
│   ├── postmortems/
│   │   ├── pm-001-2025-03-payment-timeout-cascade.md
│   │   ├── pm-002-2025-06-analytics-data-loss.md
│   │   └── ...
│   ├── runbooks/
│   │   ├── rb-payment-service-restart.md
│   │   ├── rb-analytics-pipeline-backfill.md
│   │   └── ...
│   ├── tech-debt/
│   │   ├── td-001-payment-service-retry-logic.md
│   │   ├── td-002-analytics-schema-migration-debt.md
│   │   └── ...
│   └── rfcs/
│       ├── rfc-001-migrate-to-kafka-streams.md
│       └── ...
├── ops/
│   ├── templates/
│   │   ├── adr.md
│   │   ├── postmortem.md
│   │   ├── service.md
│   │   ├── runbook.md
│   │   ├── tech-debt.md
│   │   └── rfc.md
│   ├── logs/
│   │   ├── staleness-alerts.md      # Agent-detected documentation drift
│   │   ├── dependency-changes.md    # Dependency graph mutations
│   │   └── action-item-tracker.md   # Cross-postmortem action items
│   └── derivation.md
└── inbox/
    └── [quick captures, meeting notes, slack excerpts]
```

---

## Note Schemas

### Architecture Decision Record (ADR)

```yaml
---
description: [one sentence stating the decision and primary motivation]
adr_id: ADR-NNN
status: proposed | accepted | deprecated | superseded
date_decided: YYYY-MM-DD
deciders: ["name (role)"]
affected_services: ["[[service-name]]"]
supersedes: "[[adr-nnn-title]]" | null
superseded_by: "[[adr-nnn-title]]" | null
topics: ["[[architecture]]"]
relevant_notes: ["[[note]] -- relationship context"]
---
```

### Incident Postmortem

```yaml
---
description: [one sentence describing what happened and the impact]
pm_id: PM-NNN
date: YYYY-MM-DD
severity: P1 | P2 | P3
duration_minutes: NNN
affected_services: ["[[service-name]]"]
root_cause_category: configuration | code-bug | dependency-failure | capacity | human-error
contributing_factors: ["description"]
action_items:
  - task: [what needs to happen]
    owner: name
    status: open | in-progress | done
    due: YYYY-MM-DD
related_adrs: ["[[adr-nnn-title]]"]
related_tech_debt: ["[[td-nnn-title]]"]
topics: ["[[incidents]]"]
---
```

### Service Description

```yaml
---
description: [one sentence describing what this service does and why it exists]
service_id: SVC-NNN
team: squad-name
status: active | deprecated | migrating
depends_on: ["[[service-name]] -- interface type"]
depended_by: ["[[service-name]] -- interface type"]
sla: "99.9% availability, p99 < 200ms"
on_call: team-name
runbook: "[[rb-service-name]]"
last_architecture_review: YYYY-MM-DD
topics: ["[[services]]"]
relevant_notes: ["[[adr-nnn-title]] -- architectural decision constraining this service"]
---
```

### Runbook

```yaml
---
description: [one sentence describing when to use this runbook]
rb_id: RB-NNN
service: "[[service-name]]"
trigger: [when to execute this runbook]
last_verified: YYYY-MM-DD
verified_by: name
owner: squad-name
topics: ["[[service-name]]"]
---
```

### Tech Debt Item

```yaml
---
description: [one sentence describing the debt and its risk]
td_id: TD-NNN
service: "[[service-name]]"
severity: critical | high | medium | low
estimated_effort: days | weeks | months
business_impact: [what happens if this is not addressed]
related_incidents: ["[[pm-nnn-title]]"]
created: YYYY-MM-DD
owner: squad-name
status: identified | scheduled | in-progress | resolved
topics: ["[[tech-debt]]"]
---
```

---

## Example Notes

### ADR: Adopt Event Sourcing for Analytics Pipeline

```markdown
---
description: Chose event sourcing over traditional CRUD for the analytics pipeline to enable retroactive reprocessing and audit trail requirements
adr_id: ADR-001
status: accepted
date_decided: 2024-03-15
deciders: ["Ravi Krishnamurthy (Staff Engineer)", "Lisa Park (Analytics Lead)"]
affected_services: ["[[analytics-pipeline]]", "[[event-store]]", "[[reporting-service]]"]
supersedes: null
superseded_by: null
topics: ["[[architecture]]"]
relevant_notes: ["[[adr-017-migrate-event-store-to-kafka-streams]] -- evolves the storage layer underneath this decision without changing the sourcing model", "[[pm-002-2025-06-analytics-data-loss]] -- incident that validated this decision: event sourcing enabled full reprocessing from the event log after corrupted aggregates were detected"]
---

# ADR-001: Adopt event sourcing for analytics pipeline

## Context

The analytics pipeline processes approximately 2 billion events per day from 40+ event sources. The original CRUD-based design made it impossible to reprocess historical data when business logic changed — every schema migration was a one-way door. Compliance requirements (SOC 2, GDPR audit trails) added a second forcing function: we needed an immutable record of every state change, not just current state.

## Decision

Adopt event sourcing as the primary data model for the analytics pipeline. All state changes are stored as immutable events in a time-ordered log. Current state is derived by replaying events through projection functions. The event store is the source of truth; materialized views are disposable.

## Consequences

**Positive:**
- Retroactive reprocessing becomes trivial — change the projection function, replay from any point
- Complete audit trail satisfies SOC 2 and GDPR requirements without additional infrastructure
- Debugging production issues reduces to "find the event sequence that produced this state"

**Negative:**
- Engineering team needs to learn event sourcing patterns (3-month ramp estimated, actual was 5 months)
- Storage costs increase significantly — events are append-only, never deleted
- Eventually consistent reads require careful UX design for the reporting service
- Operational complexity increases: the event store itself becomes a critical dependency

## Alternatives Considered

1. **CRUD with audit log** — Simpler but creates two sources of truth (current state vs audit log). Audit log inevitably drifts from reality.
2. **Change Data Capture (CDC)** — Captures changes at the database level but loses business semantics. "Row updated" is less useful than "user changed subscription tier."
3. **Hybrid: CRUD for hot path, event log for audit** — Considered but rejected because it splits the team's mental model and doubles the write path.

---

Relevant Notes:
- [[analytics-pipeline]] -- the service this decision primarily constrains
- [[adr-017-migrate-event-store-to-kafka-streams]] -- evolution of the storage layer
- [[pm-002-2025-06-analytics-data-loss]] -- incident that validated event sourcing's reprocessing capability

Topics:
- [[architecture]]
```

### Incident Postmortem: Payment Timeout Cascade

```markdown
---
description: Payment service timeout cascade caused 47-minute P1 outage affecting all checkout flows due to missing circuit breaker on inventory service dependency
pm_id: PM-001
date: 2025-03-12
severity: P1
duration_minutes: 47
affected_services: ["[[payment-service]]", "[[inventory-service]]", "[[checkout-gateway]]"]
root_cause_category: dependency-failure
contributing_factors: ["Missing circuit breaker on payment-to-inventory call", "Inventory service deployed new version with 10x slower response under load", "No load shedding in checkout gateway"]
action_items:
  - task: Add circuit breakers to all inter-service calls in payment service
    owner: Carlos Mendez
    status: done
    due: 2025-03-26
  - task: Implement load shedding in checkout gateway
    owner: Aisha Johnson
    status: done
    due: 2025-04-09
  - task: Add latency budget alerts to all critical-path services
    owner: Platform team
    status: in-progress
    due: 2025-04-30
  - task: Create pre-deployment load test gate for inventory service
    owner: Commerce squad
    status: open
    due: 2025-05-15
related_adrs: ["[[adr-002-use-grpc-for-inter-service-communication]]"]
related_tech_debt: ["[[td-001-payment-service-retry-logic]]"]
topics: ["[[incidents]]"]
---

# PM-001: Payment timeout cascade — March 12, 2025

## Timeline

- **14:23 UTC** — Commerce squad deploys inventory-service v2.3.1 with new stock validation logic
- **14:31 UTC** — Inventory service p99 latency increases from 45ms to 480ms under production load
- **14:33 UTC** — Payment service begins timing out on inventory checks. Default timeout is 5s with 3 retries, creating a 15s worst-case per request
- **14:35 UTC** — Payment service thread pool exhausted. All checkout requests begin failing
- **14:37 UTC** — PagerDuty alert fires for payment service error rate > 5%
- **14:38 UTC** — Checkout gateway begins returning 503s to all users. Revenue impact begins
- **14:42 UTC** — On-call engineer (Carlos) acknowledges. Initial hypothesis: payment service itself is down
- **14:51 UTC** — Carlos identifies inventory service as the source. Begins rollback
- **14:58 UTC** — Inventory service v2.3.0 deployed. Latency returns to normal
- **15:03 UTC** — Payment service thread pool recovers. Checkout flow restored
- **15:10 UTC** — All services confirmed healthy. Incident closed

## Root Cause

Inventory service v2.3.1 introduced a new stock validation query that performed a full table scan on a 200M-row table under specific product category combinations. The query worked fine in staging (small dataset) but degraded catastrophically under production load.

The payment service had no circuit breaker on its inventory dependency. When inventory slowed down, payment kept retrying, exhausting its own connection pool and cascading the failure upward to the checkout gateway.

## What went well

- PagerDuty alert fired within 2 minutes of customer impact
- Rollback was clean and fast (7 minutes from decision to deployment)
- No data loss — event sourcing in the analytics pipeline meant we could reprocess the gap

## What went poorly

- 9 minutes from alert to correct diagnosis because the alert pointed at payment, not inventory
- No pre-deployment load test would have caught this with production-scale data
- The missing circuit breaker in payment service had been identified as tech debt ([[td-001-payment-service-retry-logic]]) six months earlier and never prioritized

## Lessons

The gap between "we know this is tech debt" and "we are going to fix it" is where incidents live. [[td-001-payment-service-retry-logic]] was logged, triaged as "medium," and deprioritized three times. This incident cost approximately $180K in lost revenue during the 47-minute outage. The tech debt fix would have taken an estimated two days of engineering time.

---

Relevant Notes:
- [[td-001-payment-service-retry-logic]] -- the tech debt that directly enabled this failure
- [[payment-service]] -- the service that cascaded
- [[inventory-service]] -- the service that originated the failure
- [[adr-002-use-grpc-for-inter-service-communication]] -- the communication pattern that lacked circuit breakers

Topics:
- [[incidents]]
```

### Service Description: Payment Service

```markdown
---
description: Processes all payment transactions for the platform — critical path for checkout, highest SLA requirement, owned by Commerce squad
service_id: SVC-003
team: commerce-squad
status: active
depends_on: ["[[inventory-service]] -- gRPC, stock validation before charge", "[[user-auth]] -- gRPC, token validation", "[[notification-service]] -- async, receipt emails", "[[event-store]] -- async, payment events"]
depended_by: ["[[checkout-gateway]] -- gRPC, payment processing", "[[reporting-service]] -- async, revenue aggregation", "[[refund-service]] -- gRPC, original transaction lookup"]
sla: "99.95% availability, p99 < 500ms"
on_call: commerce-squad
runbook: "[[rb-payment-service-restart]]"
last_architecture_review: 2025-09-15
topics: ["[[services]]"]
relevant_notes: ["[[adr-009-payment-service-idempotency-keys]] -- ensures exactly-once processing for payment requests", "[[adr-002-use-grpc-for-inter-service-communication]] -- communication protocol constraint", "[[pm-001-2025-03-payment-timeout-cascade]] -- incident revealing missing circuit breaker on inventory dependency", "[[td-001-payment-service-retry-logic]] -- known tech debt in retry/circuit breaker implementation"]
---

# Payment Service

The payment service is the most critical component in the checkout path. Every dollar of revenue flows through it. It processes charges, validates inventory availability, and emits payment events to the event store for downstream consumption.

## Architecture

The service is a stateless gRPC server running on Kubernetes (3 replicas minimum, autoscales to 12). State lives in PostgreSQL (primary + 2 read replicas) and the event store. Idempotency keys ensure exactly-once semantics for payment processing, which matters because retry logic in upstream services can produce duplicate requests.

## Known risks

The circuit breaker implementation ([[td-001-payment-service-retry-logic]]) remains incomplete. The basic breaker from the PM-001 remediation covers the inventory dependency but the pattern has not been generalized to all outbound calls. The user-auth dependency currently has no breaker — if auth service degrades, payment service will cascade just as it did with inventory in March 2025.

## Dependency notes

The inventory-service dependency is synchronous and on the critical path — payment will not process without stock validation. This is the dependency that caused [[pm-001-2025-03-payment-timeout-cascade]]. Notification-service and event-store dependencies are asynchronous and can tolerate temporary unavailability.

---

Relevant Notes:
- [[adr-009-payment-service-idempotency-keys]] -- exactly-once guarantee
- [[pm-001-2025-03-payment-timeout-cascade]] -- cascade incident from inventory dependency
- [[td-001-payment-service-retry-logic]] -- incomplete circuit breaker implementation

Topics:
- [[services]]
```

### Tech Debt Item: Payment Service Retry Logic

```markdown
---
description: Payment service lacks generalized circuit breakers on outbound dependencies — partial fix after PM-001 covers only inventory call, leaving auth and other dependencies vulnerable to the same cascade pattern
td_id: TD-001
service: "[[payment-service]]"
severity: high
estimated_effort: weeks
business_impact: Another dependency-failure cascade could cause a P1 outage identical to PM-001, with estimated revenue impact of $180K+ per hour
related_incidents: ["[[pm-001-2025-03-payment-timeout-cascade]]"]
created: 2024-09-20
owner: commerce-squad
status: in-progress
topics: ["[[tech-debt]]"]
---

# TD-001: Payment service retry logic and circuit breakers

## History

Originally logged in September 2024 after a code review identified that the payment service's outbound calls used a naive retry strategy (3 retries, 5s timeout, no backoff, no circuit breaker). Severity was assessed as "medium" at the time.

Deprioritized in Q4 2024 planning in favor of the billing migration project. Deprioritized again in Q1 2025 planning in favor of the analytics pipeline upgrade. Then [[pm-001-2025-03-payment-timeout-cascade]] happened in March 2025, converting this from theoretical risk to demonstrated vulnerability.

## Current state

After PM-001, Carlos Mendez implemented a circuit breaker specifically for the payment-to-inventory call. This addressed the immediate vulnerability but did not generalize the pattern. The payment service currently makes outbound calls to four services:

| Dependency | Circuit breaker | Timeout strategy |
|-----------|----------------|-----------------|
| [[inventory-service]] | Yes (post PM-001) | Exponential backoff, 2s initial, 3 retries |
| [[user-auth]] | **No** | Fixed 5s, 3 retries |
| [[notification-service]] | No (async, less critical) | Fire-and-forget with DLQ |
| [[event-store]] | No (async, less critical) | Async with local buffer |

The user-auth dependency is the remaining critical risk. It is synchronous, on the critical path, and uses the same naive retry strategy that caused the inventory cascade.

## Proposed resolution

1. Implement a shared circuit breaker library for all gRPC outbound calls
2. Configure per-dependency: timeout, retry count, backoff strategy, breaker threshold
3. Add circuit breaker state to service metrics dashboard
4. Add integration test that verifies breaker behavior under simulated dependency failure

---

Relevant Notes:
- [[pm-001-2025-03-payment-timeout-cascade]] -- the incident that proved this debt is real
- [[payment-service]] -- the service carrying this debt
- [[adr-002-use-grpc-for-inter-service-communication]] -- the protocol layer where breakers operate

Topics:
- [[tech-debt]]
```

### Runbook: Payment Service Restart

```markdown
---
description: Step-by-step procedure for restarting the payment service during degraded performance or after a deployment rollback
rb_id: RB-003
service: "[[payment-service]]"
trigger: Payment service p99 > 2s for 5+ minutes, or error rate > 2% after deployment
last_verified: 2026-01-10
verified_by: Carlos Mendez
owner: commerce-squad
topics: ["[[payment-service]]"]
---

# RB-003: Payment service restart procedure

## Pre-restart checks

1. Confirm the issue is the payment service, not a dependency
   - Check [[inventory-service]] latency dashboard
   - Check [[user-auth]] health endpoint
   - If a dependency is degraded, the payment service circuit breaker should handle it — restart will not help

2. Check for in-flight transactions
   ```bash
   kubectl exec -it payment-svc-0 -- curl localhost:8080/admin/inflight
   ```
   - If > 0 in-flight transactions, wait for them to complete (max 30s) or drain gracefully

3. Notify #incidents Slack channel: "Restarting payment service — expect brief degradation"

## Restart procedure

```bash
# Rolling restart (preferred — maintains availability)
kubectl rollout restart deployment/payment-service -n production

# Monitor rollout
kubectl rollout status deployment/payment-service -n production --timeout=120s
```

## Post-restart verification

1. Check health endpoint: `curl https://payment.internal/health`
2. Verify p99 latency < 500ms on dashboard
3. Verify error rate < 0.1% on dashboard
4. Run a test transaction via the staging checkout flow
5. Update #incidents: "Payment service restart complete, metrics nominal"

## Escalation

If restart does not resolve the issue within 5 minutes:
- Page the commerce squad lead (currently: Ravi Krishnamurthy)
- Consider rollback to previous deployment version
- If rollback also fails, engage platform team for infrastructure investigation

---

Topics:
- [[payment-service]]
```

---

## Processing Workflow

### Capture

Engineering knowledge enters the system through four channels:

1. **Decision meetings** — ADR drafted during or immediately after architecture discussions
2. **Incident response** — Postmortem created within 48 hours of incident resolution
3. **Code reviews** — Tech debt items created when reviewers identify structural issues
4. **Deployment events** — Service descriptions updated when dependencies or configurations change

The agent monitors these channels (Slack threads, PR comments, deployment logs) and prompts for capture when it detects events that should produce notes. A deployment to the payment service triggers: "Payment service was updated. Should the service description be reviewed?"

### Process

The agent's primary processing work is connection maintenance:

1. **ADR impact mapping** — When a new ADR is accepted, the agent identifies all services it affects and adds `relevant_notes` links bidirectionally. If the ADR supersedes a previous decision, the agent updates both ADRs' `supersedes`/`superseded_by` fields and checks whether any tech debt or runbook references the superseded ADR.

2. **Postmortem linking** — When a postmortem is created, the agent links it to all affected services, relevant ADRs (decisions that shaped the architecture that failed), and related tech debt items (known issues that contributed). The agent also checks for pattern matches: "This is the third P2 incident involving the inventory service in six months."

3. **Dependency graph maintenance** — When a service description changes its `depends_on` or `depended_by` fields, the agent verifies bidirectional consistency. If Service A says it depends on Service B, Service B's `depended_by` must include Service A.

4. **Tech debt correlation** — When a postmortem identifies tech debt as a contributing factor, the agent links them and updates the tech debt item's severity if the incident demonstrates higher risk than originally assessed.

### Connect

Cross-cutting connections that span note types:

- **Decision chains** — ADR-001 is superseded by ADR-017, which is constrained by ADR-023. The agent maintains these chains and can traverse them: "What is the current active decision about event storage?"
- **Incident patterns** — Postmortems cluster by root cause category, affected service, and time period. The agent detects patterns: "Three of the last five P1 incidents involved the same service boundary."
- **Debt-to-incident correlation** — Tech debt items linked to incidents gain quantified business impact. TD-001's severity changed from "medium" to "high" after PM-001 demonstrated $180K/hour revenue impact.
- **Runbook verification** — When a service description changes, the agent checks whether the runbook still matches. If the deployment procedure changed but the runbook was not updated, the agent flags the drift.

### Verify

Event-triggered and periodic checks:

1. **Post-deployment verification** — After any deployment, check: is the service description current? Is the runbook still accurate? Are dependency declarations still correct?
2. **Postmortem action item tracking** — Weekly sweep of all open action items across postmortems. Flag items past their due date
3. **Staleness detection** — Monthly check for service descriptions not updated in 90+ days, runbooks not verified in 180+ days, ADRs in "proposed" status for 30+ days
4. **Dependency graph integrity** — Monthly bidirectional consistency check across all service `depends_on`/`depended_by` fields
5. **ADR lifecycle review** — Quarterly scan for accepted ADRs whose context may have changed (referenced technologies deprecated, team structure changed, scale assumptions exceeded)

---

## MOC Structure

### Hub (index.md)

```markdown
---
description: Entry point for the Meridian engineering knowledge system — navigate by category, by service, or by pattern
type: moc
---

# index

## By Category
- [[architecture]] -- ADRs, design principles, architectural patterns
- [[services]] -- service catalog, dependency graph overview
- [[incidents]] -- postmortem patterns, incident trends
- [[tech-debt]] -- debt landscape, prioritization, correlation to incidents
- [[migrations]] -- active and planned system migrations

## Quick Access
- [[services]] -- "what services exist and how do they connect?"
- [[incidents]] -- "what has gone wrong and what patterns emerge?"
- [[architecture]] -- "why was it built this way?"

## Maintenance
- [[staleness-alerts]] -- agent-detected documentation drift
- [[action-item-tracker]] -- cross-postmortem action item status
```

### Services MOC (services.md)

```markdown
---
description: Service catalog with dependency overview — the entry point for understanding what exists, what depends on what, and where the risks concentrate
type: moc
topics: ["[[index]]"]
---

# services

The Meridian platform consists of 40+ services owned by five squads. This MOC provides navigational entry and dependency awareness. For architectural decisions constraining specific services, follow the relevant_notes links from service descriptions to their ADRs.

## Critical Path Services
- [[payment-service]] -- highest SLA, revenue-critical, known circuit breaker debt
- [[checkout-gateway]] -- user-facing entry point, aggregates payment + inventory + auth
- [[user-auth]] -- token validation for all authenticated requests

## Data Infrastructure
- [[analytics-pipeline]] -- event sourcing architecture, 2B events/day
- [[event-store]] -- append-only event log, source of truth for analytics
- [[reporting-service]] -- materialized views over event store

## Commerce
- [[inventory-service]] -- stock validation, source of PM-001 cascade
- [[pricing-service]] -- dynamic pricing engine
- [[refund-service]] -- refund processing, depends on payment-service for original transaction lookup

## Dependency Risks

Three dependency patterns require monitoring:

1. **Payment service fan-out** — payment-service depends on 4 services synchronously. Any degradation cascades. Circuit breaker coverage is incomplete (see [[td-001-payment-service-retry-logic]]).

2. **Event store as single source of truth** — analytics-pipeline, reporting-service, and 6 other consumers depend on event-store. It has no hot standby.

3. **Auth as universal dependency** — every authenticated service depends on user-auth. It has no circuit breaker consumers and no fallback mode.

---

Agent Notes:
- When someone asks "what depends on X?", start with the service description's `depended_by` field, then check for implicit dependencies not yet documented. Slack threads mentioning both service names can reveal undocumented dependencies.
- The dependency graph is only as current as the last service description update. Flag services not updated in 90+ days during monthly staleness sweeps.

Topics:
- [[index]]
```

### Architecture MOC (architecture.md)

```markdown
---
description: Architectural decisions and patterns — the "why" behind system design, organized by decision status and domain
type: moc
topics: ["[[index]]"]
---

# architecture

Architecture decisions are documented as ADRs. Each ADR captures the context, the decision, the alternatives considered, and the consequences — both intended and actual. ADRs are living documents: their status changes as systems evolve.

## Active Decisions
- [[adr-001-adopt-event-sourcing-for-analytics-pipeline]] -- event sourcing as primary data model, validated by PM-002 incident recovery
- [[adr-002-use-grpc-for-inter-service-communication]] -- gRPC for synchronous inter-service calls, constrains circuit breaker implementation
- [[adr-009-payment-service-idempotency-keys]] -- exactly-once payment processing via idempotency keys

## Superseded Decisions
- [[adr-003-use-rest-for-internal-apis]] -- superseded by ADR-002 (gRPC migration), completed Q3 2024

## Proposed
- [[rfc-001-migrate-to-kafka-streams]] -- replace custom event store consumer with Kafka Streams, currently in design review

## Cross-Cutting Patterns
- Circuit breakers: partially implemented post-PM-001, see [[td-001-payment-service-retry-logic]]
- Idempotency: established pattern via [[adr-009-payment-service-idempotency-keys]], should extend to all write paths
- Event sourcing: foundational via [[adr-001-adopt-event-sourcing-for-analytics-pipeline]], constrains how all services emit state changes

---

Agent Notes:
- The supersession chain is the most important traversal pattern for ADRs. When someone asks "what is the current decision about X?", follow superseded_by links until you reach an ADR with no superseded_by — that is the active decision.
- When a new ADR is proposed, check whether it implicitly supersedes or conflicts with existing accepted ADRs. The decider may not be aware of all prior decisions.

Topics:
- [[index]]
```

---

## Graph Query Examples

```bash
# Find all ADRs affecting a specific service
rg 'affected_services:.*\[\[payment-service\]\]' notes/adrs/

# Find all P1 incidents in the last 6 months
rg '^severity: P1' notes/postmortems/ -l

# Find all open postmortem action items
rg -U 'status: open' notes/postmortems/ -B 2

# Find all tech debt items correlated with incidents
rg '^related_incidents:' notes/tech-debt/ | rg -v 'null'

# Find services with no runbook
for svc in notes/services/*.md; do
  rg -q '^runbook:' "$svc" || echo "NO RUNBOOK: $svc"
done

# Find all superseded ADRs (decisions that have been replaced)
rg '^superseded_by:' notes/adrs/ | rg -v 'null'

# Find the current active decision for any superseded ADR
rg '^status: accepted' notes/adrs/ -l

# Find stale runbooks (not verified in 180+ days)
rg '^last_verified:' notes/runbooks/ | while read line; do
  file=$(echo "$line" | cut -d: -f1)
  date=$(echo "$line" | awk '{print $2}')
  if [[ "$date" < "2025-08-18" ]]; then
    echo "STALE: $file — last verified: $date"
  fi
done

# Dependency fan-out analysis: which services have the most dependents?
rg '^depended_by:' notes/services/ -A 10 | rg '\[\[' | \
  sed 's/.*\[\[//' | sed 's/\]\].*//' | sort | uniq -c | sort -rn
```

---

## What Makes This Domain Unique

### The dependency graph is the primary structural artifact

In a research vault, the knowledge graph emerges from wiki links between claim notes — each link represents an intellectual relationship. In an engineering team system, the dependency graph is not emergent but declarative: services explicitly state what they depend on and what depends on them. This graph is not just navigation — it is an operational map. When a service changes, the dependency graph determines who needs to know, what might break, and how far a failure can cascade. The graph has engineering consequences that research graphs do not: a missing edge in the dependency graph means an undetected blast radius.

### ADR lifecycle creates a temporal knowledge layer

Research claims do not get "superseded" in the same way ADRs do. A claim about knowledge management might be refined, extended, or contradicted, but it remains relevant as a historical argument. An ADR that has been superseded is not just historically interesting — it is potentially dangerous if someone follows it without realizing it has been replaced. The `supersedes`/`superseded_by` chain creates a temporal layer that the agent must actively maintain: every new ADR must be checked against the chain, every reference to an ADR must verify that the referenced decision is still active, and every deprecated ADR must link forward to its replacement.

### Incident patterns accumulate across postmortems invisibly

No individual postmortem reveals that the same service boundary has caused three P1 incidents. No individual tech debt item reveals that unprioritized debt has cost $540K in incident revenue loss. These patterns exist only in the aggregate, and humans are notoriously bad at maintaining aggregate awareness across months of blameless postmortems. The system's value is in making the invisible visible: correlating debt to incidents, tracking action item completion rates, detecting recurring failure patterns, and quantifying the business cost of architectural decisions.

---

## Agent-Native Advantages

### Exhaustive impact analysis across the dependency graph

When someone proposes changing the payment service's API, a human engineer thinks about the services they personally know depend on it. They might remember checkout-gateway and reporting-service. They will not remember that the refund-service also depends on the original transaction lookup endpoint, or that the analytics pipeline consumes payment events in a specific schema. The agent traces every edge in the dependency graph, every consumer of every endpoint, every downstream system that makes assumptions about the current behavior. The result is a complete blast radius assessment, not an approximate one.

This is not just graph traversal — it is graph traversal plus schema awareness plus temporal context. The agent knows not just that refund-service depends on payment-service, but what interface type they use (gRPC), which ADR defined that interface (ADR-002), and what incidents have involved that dependency (PM-001). The impact analysis is multi-dimensional in a way that no human engineer can sustain across 40+ services.

### Automatic staleness detection through code-documentation divergence

Documentation rots because humans write it once and forget to update it. The agent never forgets that documentation exists. When a deployment changes service behavior, the agent checks: does the service description still match? Does the runbook still work? Are the dependency declarations still accurate? This is not periodic review — it is event-triggered verification. Every deployment, every PR that touches interface definitions, every infrastructure change triggers a staleness check on the relevant documentation.

The staleness detection extends to ADRs: when a technology referenced in an ADR reaches end-of-life, or when a scaling assumption documented in an ADR's context section is exceeded by actual load, the agent flags the ADR for re-evaluation. A human engineer would need to periodically re-read every ADR and compare its assumptions to current reality. The agent does this continuously.

### Postmortem pattern analysis that builds institutional learning

Individual postmortems are valuable. The pattern across postmortems is transformative. The agent maintains a running analysis:

- **Root cause category distribution** — "60% of our P1 incidents are dependency failures, not code bugs. Our investment in code review is high; our investment in circuit breakers is low."
- **Service hotspots** — "The inventory service boundary has been involved in 4 of the last 10 incidents. This is not bad luck — it is architectural."
- **Action item completion rate** — "We complete 73% of postmortem action items. The 27% we do not complete are disproportionately 'systemic' items (circuit breakers, load tests) vs 'targeted' items (specific bug fixes)."
- **Time-to-repeat** — "The mean time between incidents with the same contributing factor is 4.2 months. We are not learning from postmortems at the systemic level."

No human maintains this analysis. Postmortems are written, reviewed in a blameless retro, and filed. The patterns between them remain invisible. The agent makes patterns visible, turning individual failures into institutional learning.

### Tech debt quantification through incident correlation

Tech debt is notoriously hard to prioritize because the cost of not fixing it is speculative — until it causes an incident, at which point it is no longer speculative but also no longer preventable. The agent closes this loop by correlating tech debt items with incidents after the fact:

- TD-001 (payment service retry logic) was logged in September 2024 as "medium" severity. PM-001 occurred in March 2025, costing $180K in lost revenue over 47 minutes. The agent retroactively updates TD-001's business impact with real numbers. The next quarterly prioritization discussion starts from "this tech debt has already cost us $180K" rather than "this tech debt might cause problems."

Across the full tech debt backlog, the agent calculates: total incident cost attributable to known tech debt, percentage of incidents involving previously identified but unfixed debt, and mean time between debt identification and incident occurrence. These numbers transform tech debt prioritization from opinion-driven to evidence-driven.

### ADR chain traversal that maintains decision coherence

When a team operates for four years, the ADR chain becomes a complex graph. ADR-001 establishes event sourcing. ADR-017 migrates the event store to Kafka Streams (evolving the storage layer without changing the sourcing model). ADR-023 introduces a new event schema format (constrained by ADR-001's immutability guarantee). RFC-001 proposes replacing custom consumers with Kafka Streams (potentially conflicting with ADR-023's schema assumptions).

A new engineer reading RFC-001 would need to trace backward through three ADRs to understand the full constraint landscape. A human reviewer might catch the ADR-023 conflict if they remember it exists. The agent traces every chain automatically and surfaces conflicts that span years of decisions. It answers the question no human can: "What is the complete set of constraints that this proposal must satisfy, including constraints established before anyone currently on the team was here?"
---

Topics:
- [[domain-compositions]]
