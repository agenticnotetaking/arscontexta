---
description: product-management knowledge system — inspirational composition showing derived architecture for feedback-to-feature pipelines, experiment tracking, and customer voice intelligence
kind: example
domain: pm
topics: ["[[domain-compositions]]"]
---

# product management uses feedback pipelines with experiment tracking

A derived architecture for a product manager who needs to turn the noise of customer feedback, competitive signals, and experiment results into coherent product strategy. Not a feature tracking tool — a strategic intelligence system that connects what customers say to what experiments prove to what the roadmap should prioritize.

The agent translation here cuts to the core of the PM discipline. Humans are good at empathy, judgment, and stakeholder negotiation. They are terrible at remembering what 847 customers said across 12 channels over 6 months and detecting that 23% of them mentioned the same pain point using different words. An agent cannot feel what a frustrated user feels, but it can hold every customer voice simultaneously and surface the patterns that should drive decisions. The system gives the PM evidence-backed conviction instead of gut-feel confidence.

---

## Persona

**Nadia Reeves** is the Senior PM for the growth team at a mid-stage B2B SaaS company (Series B, 180 employees, $28M ARR) that sells a workflow automation platform. She owns the self-serve onboarding experience, the expansion motion for existing accounts, and the experiment program that tests growth hypotheses. On any given day she is balancing: user research interviews, experiment results, competitive moves, feature requests from customer success, OKR tracking, and roadmap negotiations with engineering.

Nadia's problem is not a lack of data — it is too much data with too little synthesis. She has Gong recordings from customer calls, Intercom transcripts from support, NPS survey responses, experiment results in Amplitude, feature requests in a Productboard backlog, competitive updates in a Google Doc that was last touched in October, and her own research notes in scattered Notion pages. Each channel captures genuine signal. Nothing connects them. When she argues for a roadmap item in the quarterly planning meeting, she pulls evidence from memory and whichever tool she happened to open that morning. She knows there is more evidence — she just cannot find it in time.

Nadia's agent operates as a strategic intelligence layer. It ingests feedback from every channel, clusters it into themes, connects themes to experiments and features, and surfaces evidence when Nadia needs to make a case. When she writes a PRD, the agent pulls: every piece of customer feedback related to this problem, every experiment that tested adjacent hypotheses, the competitive landscape for this feature area, and the OKR this feature would advance. The agent does not decide what to build — it ensures Nadia decides with complete evidence rather than partial recall.

---

## Configuration

| Dimension | Position | Rationale |
|-----------|----------|-----------|
| **Granularity** | Atomic for feedback and experiment results, compound for PRDs and personas | Each piece of customer feedback is a distinct signal that might connect to different themes. Atomizing feedback enables clustering. But PRDs and personas are inherently compound — splitting a PRD into atomic claims would destroy the narrative structure that stakeholders need. |
| **Organization** | Flat with type-based subdirectories | Feedback, experiments, PRDs, and competitive intelligence each have their own directory. Within directories, files are flat. The graph connects across: a feedback theme links to the PRD it informed, which links to the experiment that validated the hypothesis, which links to the OKR it advances. |
| **Linking** | Explicit with agent-suggested connections from feedback clustering | PRD-to-OKR links must be explicit and intentional — Nadia argues for this alignment in planning meetings. Feedback-to-theme connections are agent-suggested: the agent detects that seven support tickets use different words for the same pain point and suggests a theme. |
| **Metadata** | Dense for feedback (segment, channel, sentiment), medium for everything else | Feedback metadata enables the queries that matter most: "Show me all negative feedback from enterprise customers about onboarding in the last quarter." Dense metadata on feedback is the price of admission for pattern detection. PRDs and experiments need fewer structured fields because they are read holistically. |
| **Processing** | Heavy for feedback (clustering pipeline), light for decisions and PRDs | Raw feedback is high-volume, low-signal-per-item content. Without processing, 200 support tickets are just 200 tickets. The agent's clustering pipeline transforms them into five actionable themes with quantified demand signals. PRDs and decisions arrive near-final — processing is mostly connection-finding, not transformation. |
| **Formalization** | Medium — templates for feedback and experiments, flexible for strategy docs | Feedback entries must be consistently structured for clustering to work. Experiment results must follow a hypothesis-result-learning format for cross-experiment pattern detection. But strategy documents, roadmap rationales, and competitive analyses benefit from narrative flexibility. |
| **Review** | Continuous for feedback clustering, quarterly for strategy alignment | Feedback arrives continuously and should be clustered in near-real-time. But strategic coherence — are our experiments aligned with our OKRs? is our roadmap connected to customer evidence? — is a quarterly-cadence concern that matches planning cycles. |
| **Scope** | Team-shared — product, engineering, design, customer success all contribute | Customer feedback comes from CS. Experiment results come from engineering. Competitive intelligence comes from marketing. The knowledge system must be team-accessible because the value comes from cross-functional evidence synthesis. |

---

## Vault Structure

```
vault/
├── self/
│   ├── identity.md              # Agent identity, product philosophy
│   └── memory/
│       └── [operational learnings]
├── notes/
│   ├── index.md                 # Hub: entry point
│   ├── customer-voice.md        # MOC: feedback themes and demand signals
│   ├── experiments.md           # MOC: experiment program, patterns, learnings
│   ├── strategy.md              # MOC: OKRs, roadmap rationale, bets
│   ├── competitive.md           # MOC: competitive landscape, positioning
│   ├── personas.md              # MOC: user segments and JTBD
│   ├── features.md              # MOC: feature areas with evidence connections
│   │
│   ├── feedback/
│   │   ├── fb-2026-02-14-onboarding-confusion-enterprise.md
│   │   ├── fb-2026-02-13-api-documentation-gaps.md
│   │   └── ...
│   ├── themes/
│   │   ├── theme-onboarding-time-to-value.md
│   │   ├── theme-api-developer-experience.md
│   │   └── ...
│   ├── experiments/
│   │   ├── exp-001-simplified-onboarding-wizard.md
│   │   ├── exp-002-interactive-api-playground.md
│   │   └── ...
│   ├── prds/
│   │   ├── prd-guided-onboarding-v2.md
│   │   ├── prd-api-playground.md
│   │   └── ...
│   ├── decisions/
│   │   ├── dec-001-prioritize-onboarding-over-expansion-q1.md
│   │   └── ...
│   ├── competitive/
│   │   ├── competitor-acme-workflows.md
│   │   ├── competitor-flowmatic.md
│   │   └── ...
│   ├── personas/
│   │   ├── persona-technical-evaluator.md
│   │   ├── persona-business-champion.md
│   │   └── ...
│   └── okrs/
│       ├── okr-q1-2026-reduce-onboarding-drop-off.md
│       └── ...
├── ops/
│   ├── templates/
│   │   ├── feedback.md
│   │   ├── theme.md
│   │   ├── experiment.md
│   │   ├── prd.md
│   │   ├── decision.md
│   │   ├── competitor.md
│   │   ├── persona.md
│   │   └── okr.md
│   ├── logs/
│   │   ├── feedback-digest.md       # Weekly feedback clustering summary
│   │   ├── experiment-patterns.md   # Cross-experiment learning log
│   │   └── evidence-gaps.md         # Where decisions lack supporting evidence
│   └── derivation.md
└── inbox/
    └── [raw feedback imports, interview transcripts, competitive screenshots]
```

---

## Note Schemas

### Customer Feedback

```yaml
---
description: [one sentence capturing the customer's core message]
feedback_id: FB-YYYY-MM-DD-NNN
date: YYYY-MM-DD
source: support-ticket | nps-survey | interview | sales-call | social-media | in-app
customer_segment: enterprise | mid-market | smb | free-tier
customer_name: [name or anonymous]
account_arr: NNNk | null
sentiment: positive | neutral | negative | frustrated
feature_area: onboarding | api | integrations | reporting | billing | general
verbatim: "[exact customer quote]"
themes: ["[[theme-name]]"]
topics: ["[[customer-voice]]"]
---
```

### Feedback Theme

```yaml
---
description: [one sentence describing the pattern across multiple feedback items]
theme_id: THEME-NNN
feedback_count: NN
first_seen: YYYY-MM-DD
last_seen: YYYY-MM-DD
segments_affected: ["enterprise", "mid-market"]
sentiment_distribution:
  negative: NN%
  neutral: NN%
  positive: NN%
demand_signal: critical | strong | moderate | weak
related_experiments: ["[[exp-nnn-title]]"]
related_prds: ["[[prd-title]]"]
related_okrs: ["[[okr-title]]"]
topics: ["[[customer-voice]]"]
---
```

### Experiment Result

```yaml
---
description: [one sentence stating the hypothesis and outcome]
exp_id: EXP-NNN
status: proposed | running | completed | abandoned
hypothesis: [if we do X, then Y will happen, measured by Z]
start_date: YYYY-MM-DD
end_date: YYYY-MM-DD | null
primary_metric: [metric name]
control_result: [value]
variant_result: [value]
lift: [+/-NN%]
statistical_significance: [p-value or confidence interval]
decision: ship | iterate | kill | inconclusive
learnings: ["key insight from this experiment"]
related_themes: ["[[theme-name]]"]
related_prds: ["[[prd-title]]"]
topics: ["[[experiments]]"]
---
```

### PRD (Product Requirements Document)

```yaml
---
description: [one sentence describing the feature and its primary user benefit]
prd_id: PRD-NNN
status: draft | in-review | approved | in-development | shipped | deprecated
problem_statement: [what problem this solves]
target_persona: "[[persona-name]]"
success_metrics: ["metric: target"]
related_themes: ["[[theme-name]] -- evidence connection"]
related_experiments: ["[[exp-nnn-title]] -- validation status"]
related_okrs: ["[[okr-title]] -- strategic alignment"]
evidence_strength: strong | moderate | weak | speculative
topics: ["[[features]]"]
---
```

### Product Decision

```yaml
---
description: [one sentence stating the decision and primary rationale]
dec_id: DEC-NNN
date: YYYY-MM-DD
deciders: ["name (role)"]
decision: [what was decided]
alternatives_considered: ["alternative -- why rejected"]
evidence_used: ["[[note]] -- what it showed"]
reversibility: one-way | two-way
review_date: YYYY-MM-DD | null
topics: ["[[strategy]]"]
---
```

### Competitor Profile

```yaml
---
description: [one sentence positioning this competitor relative to us]
competitor_name: [company name]
product: [product name]
market_position: leader | challenger | niche | emerging
last_updated: YYYY-MM-DD
strengths: ["strength"]
weaknesses: ["weakness"]
differentiators: ["what they do that we don't"]
our_advantages: ["what we do that they don't"]
recent_moves: ["YYYY-MM: what they did"]
threat_level: high | medium | low
topics: ["[[competitive]]"]
---
```

### OKR

```yaml
---
description: [the objective in one sentence]
okr_id: OKR-YYYY-QN-NNN
quarter: YYYY-QN
objective: [qualitative goal]
key_results:
  - metric: [what to measure]
    target: [number]
    current: [number]
    status: on-track | at-risk | off-track
owner: [name]
related_features: ["[[prd-title]]"]
related_themes: ["[[theme-name]] -- customer evidence supporting this objective"]
topics: ["[[strategy]]"]
---
```

### User Persona

```yaml
---
description: [one sentence describing who this persona is and what they need]
persona_name: [archetype name]
segment: enterprise | mid-market | smb
role: [job title or function]
goals: ["what they want to achieve"]
pain_points: ["what frustrates them"]
jtbd: ["job to be done statement"]
behaviors: ["observable behavior pattern"]
preferred_channels: ["how they interact with the product"]
topics: ["[[personas]]"]
---
```

---

## Example Notes

### Customer Feedback: Onboarding Confusion

```markdown
---
description: Enterprise customer VP of Engineering frustrated by onboarding wizard that assumes technical users but their first users are business analysts
feedback_id: FB-2026-02-14-001
date: 2026-02-14
source: interview
customer_segment: enterprise
customer_name: Marcus Webb
account_arr: 180k
sentiment: frustrated
feature_area: onboarding
verbatim: "We bought this for our business analysts, but the setup wizard asks about API keys and webhook configurations in the first three steps. My analysts don't know what a webhook is. They closed the tab and went back to spreadsheets. We almost churned before we started."
themes: ["[[theme-onboarding-time-to-value]]"]
topics: ["[[customer-voice]]"]
---

# Onboarding confusion — enterprise business analyst path missing

Marcus Webb (VP Engineering, Trellis Corp, $180K ARR) described a critical onboarding failure during a customer research interview. His company purchased the platform for business analysts, but the onboarding wizard assumes a technical user persona from step one.

The core issue is persona mismatch in the onboarding flow. The wizard was designed around [[persona-technical-evaluator]] but Trellis's actual first users are closer to [[persona-business-champion]] — business-side users who want outcomes, not infrastructure.

This is not an isolated complaint. It connects to [[theme-onboarding-time-to-value]], where 12 other feedback items describe variations of "the first experience assumes too much technical knowledge." Marcus's feedback is the strongest signal because it comes from a $180K ARR account that nearly churned — the stakes are concrete and quantified.

His specific suggestion was a role selector at the start of onboarding: "Are you a developer, a business analyst, or an admin? Just that one question would change everything that comes next." This aligns with [[exp-001-simplified-onboarding-wizard]], which tested a reduced-step wizard but did not test persona branching.

---

Topics:
- [[customer-voice]]
```

### Feedback Theme: Onboarding Time to Value

```markdown
---
description: Persistent feedback cluster showing that new users take too long to reach their first meaningful outcome — 13 feedback items across enterprise and mid-market segments, mostly negative sentiment
theme_id: THEME-001
feedback_count: 13
first_seen: 2025-09-22
last_seen: 2026-02-14
segments_affected: ["enterprise", "mid-market"]
sentiment_distribution:
  negative: 77%
  neutral: 15%
  positive: 8%
demand_signal: critical
related_experiments: ["[[exp-001-simplified-onboarding-wizard]]"]
related_prds: ["[[prd-guided-onboarding-v2]]"]
related_okrs: ["[[okr-q1-2026-reduce-onboarding-drop-off]]"]
topics: ["[[customer-voice]]"]
---

# Onboarding time-to-value

The most persistent negative feedback theme across the past six months. Thirteen distinct feedback items from ten different accounts describe the same core problem: new users cannot reach their first valuable outcome quickly enough.

## The pattern

The feedback clusters into three sub-patterns:

1. **Technical assumption mismatch** (5 items) — The onboarding wizard assumes technical users. Business analysts and non-technical champions encounter API keys, webhooks, and configuration steps they do not understand. Strongest signal: [[fb-2026-02-14-onboarding-confusion-enterprise]] from a $180K ARR account.

2. **Too many steps before value** (4 items) — Even technical users report that the wizard requires 14 steps before they can run their first automation. Competitors (specifically [[competitor-flowmatic]]) achieve "first automation" in 5 steps. The gap is quantifiable and competitive.

3. **No guided path to outcomes** (4 items) — Users complete onboarding but do not know what to do next. They have configured the tool but have not experienced its value. The drop-off between "onboarding complete" and "first automation run" is 38% (from Amplitude data).

## Evidence strength

This theme has the strongest evidence base of any active theme:
- 13 feedback items across two segments
- Quantified churn risk (Marcus Webb at Trellis, $180K ARR)
- Competitive benchmark ([[competitor-flowmatic]]: 5 steps vs our 14)
- Funnel data showing 38% post-onboarding drop-off
- One completed experiment ([[exp-001-simplified-onboarding-wizard]]) showing 22% lift from step reduction alone

## Strategic connection

This theme directly supports [[okr-q1-2026-reduce-onboarding-drop-off]] and has informed [[prd-guided-onboarding-v2]], which proposes persona-branched onboarding paths. The decision to prioritize onboarding over expansion this quarter ([[dec-001-prioritize-onboarding-over-expansion-q1]]) was partially driven by this theme's demand signal strength.

---

Relevant Notes:
- [[exp-001-simplified-onboarding-wizard]] -- tested step reduction, showed 22% lift, but did not test persona branching
- [[prd-guided-onboarding-v2]] -- the feature proposal this theme informs
- [[competitor-flowmatic]] -- competitive benchmark for onboarding speed
- [[persona-business-champion]] -- the persona most affected by this theme

Topics:
- [[customer-voice]]
```

### Experiment Result: Simplified Onboarding Wizard

```markdown
---
description: Reducing onboarding wizard from 14 steps to 7 improved completion rate by 22% but did not significantly improve time-to-first-automation, suggesting step count is necessary but not sufficient
exp_id: EXP-001
status: completed
hypothesis: If we reduce onboarding wizard steps from 14 to 7 by deferring non-essential configuration, then wizard completion rate will increase by 15%+
start_date: 2025-11-01
end_date: 2025-12-15
primary_metric: wizard completion rate
control_result: 61%
variant_result: 74.5%
lift: +22%
statistical_significance: "p < 0.01, n = 2,847"
decision: ship
learnings: ["Step reduction improves completion but the post-wizard experience still loses users", "Deferred configuration items (API keys, webhooks) caused confusion later when users needed them for advanced features", "The lift was strongest for mid-market segment (+28%) and weakest for enterprise (+14%), suggesting enterprise users face additional barriers beyond step count"]
related_themes: ["[[theme-onboarding-time-to-value]]"]
related_prds: ["[[prd-guided-onboarding-v2]]"]
topics: ["[[experiments]]"]
---

# EXP-001: Simplified onboarding wizard

## Background

Testing the most straightforward onboarding improvement: fewer steps. The existing 14-step wizard included API key setup, webhook configuration, team invitations, notification preferences, and integration setup — all before the user could create their first automation. The hypothesis was that deferring non-essential steps would reduce abandonment.

## Results

The primary metric (wizard completion rate) improved significantly: 61% to 74.5%, a 22% lift with high statistical confidence. This validated the core hypothesis that step count was a barrier.

However, the secondary metric (time-to-first-automation, measured as time from account creation to first automation run) improved only marginally: median 4.2 days to 3.8 days. This means we moved the bottleneck but did not remove it. Users now complete the wizard but still take nearly four days to actually do something useful.

## Segment breakdown

| Segment | Control | Variant | Lift |
|---------|---------|---------|------|
| SMB | 72% | 89% | +24% |
| Mid-market | 58% | 74% | +28% |
| Enterprise | 49% | 56% | +14% |

The enterprise segment showed the smallest lift, which aligns with [[fb-2026-02-14-onboarding-confusion-enterprise]] — enterprise users face persona-mismatch barriers that step reduction alone does not address. This is evidence for the persona-branching approach in [[prd-guided-onboarding-v2]].

## What this means for next experiments

Step reduction was necessary but not sufficient. The next experiment should test the post-wizard experience: guided paths to first automation, persona-specific templates, or an interactive walkthrough. The gap between "completed wizard" (74.5%) and "ran first automation within 7 days" (42%) is the new frontier.

---

Relevant Notes:
- [[theme-onboarding-time-to-value]] -- the feedback theme that motivated this experiment
- [[prd-guided-onboarding-v2]] -- the feature proposal incorporating these learnings
- [[okr-q1-2026-reduce-onboarding-drop-off]] -- the strategic objective this advances

Topics:
- [[experiments]]
```

### Product Decision: Prioritize Onboarding Over Expansion Q1

```markdown
---
description: Chose to invest Q1 engineering capacity in self-serve onboarding improvements rather than expansion and upsell features because onboarding churn evidence was quantified while expansion opportunity remained speculative
dec_id: DEC-001
date: 2025-12-18
deciders: ["Nadia Reeves (Senior PM)", "Jake Morrison (VP Product)", "Chen Wei (Engineering Director)"]
decision: Allocate 70% of growth team Q1 capacity to onboarding improvements (guided wizard v2, persona branching, template library), 30% to expansion experiments
alternatives_considered: ["50/50 split between onboarding and expansion -- rejected because neither track would get sufficient investment to move metrics meaningfully", "Expansion-first with onboarding as fast-follow -- rejected because onboarding churn data showed immediate revenue risk while expansion opportunity was unquantified", "Full expansion focus -- rejected because losing $180K+ ARR accounts to onboarding friction has higher expected value destruction than missing expansion opportunity"]
evidence_used: ["[[theme-onboarding-time-to-value]] -- 13 feedback items showing persistent, cross-segment onboarding friction", "[[exp-001-simplified-onboarding-wizard]] -- 22% completion lift proves onboarding is improvable, not a fundamental product-market fit issue", "[[fb-2026-02-14-onboarding-confusion-enterprise]] -- $180K ARR account nearly churned, quantifying revenue risk", "[[competitor-flowmatic]] -- competitive benchmark showing 5-step vs our 14-step onboarding, creating switching risk"]
reversibility: two-way
review_date: 2026-03-15
topics: ["[[strategy]]"]
---

# DEC-001: Prioritize onboarding over expansion for Q1 2026

## The argument

The growth team has finite capacity. The question for Q1 was: invest in converting more of the people who show up (onboarding), or invest in getting more from the people who already converted (expansion)?

The evidence asymmetry made the decision. Onboarding friction is documented with 13 feedback items, a quantified churn risk ($180K ARR account), a competitive benchmark (Flowmatic's 5-step wizard), and a successful experiment showing the problem is tractable (EXP-001: 22% completion lift from step reduction). Expansion opportunity is real but speculative — we believe mid-market accounts have room to grow, but we have not quantified the opportunity or tested whether specific interventions move it.

When one option has evidence and the other has intuition, invest where you have evidence. The expansion case can be built during Q1 with research and small experiments using the 30% allocation.

## What we are watching

This decision reverses if:
- Onboarding improvements fail to move time-to-first-automation below 48 hours (currently 3.8 days median)
- Expansion signals become urgent (a competitor launches a feature that enables easy expansion, creating switching risk)
- Q1 mid-quarter review (Feb 15) shows no meaningful improvement in activation metrics

---

Relevant Notes:
- [[theme-onboarding-time-to-value]] -- the evidence base driving this decision
- [[okr-q1-2026-reduce-onboarding-drop-off]] -- the OKR this decision serves
- [[prd-guided-onboarding-v2]] -- the primary deliverable this decision enables

Topics:
- [[strategy]]
```

### Competitor Profile: Flowmatic

```markdown
---
description: Primary competitor in the SMB and mid-market workflow automation space — stronger onboarding, weaker enterprise features, aggressive pricing
competitor_name: Flowmatic
product: Flowmatic Platform
market_position: challenger
last_updated: 2026-02-01
strengths: ["5-step onboarding that gets users to first automation in under 10 minutes", "Template marketplace with 500+ pre-built automations", "Freemium model with generous free tier driving adoption", "Strong developer community and documentation"]
weaknesses: ["Limited enterprise features: no SSO, no audit logging, no SOC 2 compliance", "No role-based access control — single permission level per workspace", "API rate limits make high-volume use cases impractical", "Customer support is community-only for free and mid tiers"]
differentiators: ["Template-first approach vs our configuration-first approach", "Visual flow builder is more intuitive for non-technical users", "Public API is better documented with interactive playground"]
our_advantages: ["Enterprise security and compliance (SSO, RBAC, SOC 2, HIPAA)", "API throughput handles 10x their rate limits", "Custom integration framework for proprietary systems", "Dedicated customer success for enterprise accounts"]
recent_moves: ["2026-01: Launched 'Flowmatic for Teams' with basic collaboration features", "2025-11: Raised Series C at $450M valuation, aggressive hiring in enterprise sales", "2025-09: Released interactive API playground — directly addresses our documentation gap"]
threat_level: high
topics: ["[[competitive]]"]
---

# Flowmatic

Flowmatic is the most dangerous competitor in SMB and mid-market because they have solved the problem we are currently failing at: getting users to value quickly. Their 5-step onboarding is the benchmark [[theme-onboarding-time-to-value]] is measured against. Their template marketplace means users do not need to build automations from scratch — they start with something that works and customize it.

## Strategic implications

The competitive threat is migration-oriented, not head-to-head. We do not lose deals to Flowmatic at the enterprise level — our security, compliance, and throughput advantages are decisive there. We lose users who start with Flowmatic's free tier, build their workflows on Flowmatic's templates, and never evaluate us because they solved their problem without us. When those users' companies grow to enterprise scale, switching costs make migration prohibitive.

This means the onboarding investment ([[dec-001-prioritize-onboarding-over-expansion-q1]]) is also a competitive response: if we cannot match their time-to-value for non-technical users, we cede the bottom-up adoption motion that eventually becomes enterprise revenue.

## What to watch

Flowmatic's Series C and "Teams" launch signal an enterprise push. If they add SSO and audit logging within the next 6 months, our differentiation narrows significantly. The interactive API playground they launched in September 2025 is already better than our API documentation — this directly feeds [[theme-api-developer-experience]].

---

Relevant Notes:
- [[theme-onboarding-time-to-value]] -- Flowmatic's 5-step wizard is the benchmark
- [[dec-001-prioritize-onboarding-over-expansion-q1]] -- our strategic response
- [[theme-api-developer-experience]] -- their playground addresses a gap we haven't closed

Topics:
- [[competitive]]
```

---

## Processing Workflow

### Capture

Feedback enters from multiple channels with different capture patterns:

| Channel | Capture Method | Agent Role |
|---------|---------------|------------|
| Support tickets (Intercom) | Weekly batch import | Agent creates feedback notes, extracts verbatim quotes, classifies segment and sentiment |
| Customer interviews (Gong) | Post-interview processing | Agent extracts key insights, verbatim quotes, and follow-up items from transcript |
| NPS surveys | Monthly batch import | Agent creates feedback notes, clusters by score tier, extracts open-ended responses |
| Sales call notes | Ad-hoc capture | Agent processes CRM notes into structured feedback entries |
| Social media mentions | Weekly scan | Agent captures relevant mentions, classifies sentiment |
| In-app feedback | Real-time processing | Agent creates feedback notes as they arrive |

Nadia's primary capture moment is after customer interviews. She voice-dumps key insights immediately after hanging up, while emotional context is fresh. The agent processes the dump into a structured feedback note with verbatim quotes, segment classification, and initial theme connections.

### Process

The agent's core processing work is the feedback-to-theme pipeline:

1. **Classify incoming feedback** — assign segment, sentiment, feature area. These are structured fields that enable downstream queries.

2. **Cluster into themes** — when a new feedback item arrives, the agent searches existing themes semantically. If it matches an existing theme, the agent links it and updates the theme's feedback count, date range, and sentiment distribution. If it does not match any theme, the agent holds it until three or more similar items accumulate, then proposes a new theme.

3. **Quantify demand signals** — themes gain strength through feedback count, ARR concentration (are the accounts complaining large?), cross-segment presence (does this affect multiple segments?), and sentiment intensity. The agent maintains a `demand_signal` rating of critical, strong, moderate, or weak based on these factors.

4. **Connect themes to strategy** — when a theme reaches "strong" or "critical," the agent checks: does an experiment exist that tests this? Does a PRD exist that addresses this? Does an OKR exist that this would advance? Missing connections become evidence gaps logged for Nadia's attention.

5. **Process experiment results** — when an experiment completes, the agent connects results back to the themes and PRDs that motivated it, updates theme status based on whether the experiment validated or invalidated the hypothesis, and identifies what the next experiment should test.

### Connect

Cross-cutting intelligence connections:

- **Feedback-to-feature pipeline** — themes aggregate demand signals, PRDs cite themes as evidence, experiments test PRD hypotheses, decisions cite experiments. The chain from "a customer said X" to "we decided to build Y because of Z evidence" is fully traversable.
- **Competitive-to-strategy connections** — when a competitor makes a move relevant to an active theme, the agent links them. "Flowmatic launched an API playground" connects to [[theme-api-developer-experience]] and strengthens the demand signal.
- **OKR-to-evidence alignment** — each OKR links to the themes, experiments, and PRDs that advance it. The agent can answer: "What evidence do we have that this OKR is achievable?" and "What customer feedback says this OKR matters?"
- **Persona-to-feedback connections** — feedback items are linked to the personas they affect. The agent can answer: "What are the top pain points for the Technical Evaluator persona?" by traversing feedback items linked to that persona.

### Verify

Periodic and triggered checks:

1. **Weekly feedback digest** — agent summarizes new feedback, theme changes, and demand signal shifts. Nadia reviews this instead of individual feedback items.
2. **Evidence gap detection** — monthly scan for PRDs without supporting customer evidence, OKRs without related experiments, and experiments without clear theme connections. These gaps represent decisions based on intuition rather than evidence.
3. **Competitive freshness check** — monthly scan for competitor profiles not updated in 60+ days. The competitive landscape changes faster than any other knowledge type.
4. **Experiment follow-through** — are experiment learnings incorporated into PRDs? Are "iterate" decisions followed by new experiments? The agent flags experiments that completed but led to no downstream action.
5. **Strategic coherence check** — quarterly: does the roadmap trace back to OKRs? Do OKRs trace back to customer evidence? The agent generates a coherence report showing which roadmap items have evidence chains and which are speculative.

---

## MOC Structure

### Hub (index.md)

```markdown
---
description: Entry point for the product knowledge system — navigate by customer voice, experiments, strategy, or competitive landscape
type: moc
---

# index

## Core Intelligence
- [[customer-voice]] -- what customers are saying, clustered into actionable themes
- [[experiments]] -- what we have tested and what we have learned
- [[strategy]] -- OKRs, roadmap rationale, major decisions
- [[competitive]] -- who else is in the market and what they are doing

## Building Blocks
- [[features]] -- feature areas with evidence connections
- [[personas]] -- user segments and jobs to be done

## Maintenance
- [[feedback-digest]] -- weekly summary of incoming signal
- [[experiment-patterns]] -- cross-experiment learning log
- [[evidence-gaps]] -- where decisions lack supporting evidence
```

### Customer Voice MOC (customer-voice.md)

```markdown
---
description: Feedback themes clustered from all channels — the quantified voice of the customer organized by demand signal strength
type: moc
topics: ["[[index]]"]
---

# customer-voice

Every customer interaction produces signal. Most organizations capture that signal but never synthesize it — feedback lives in support tools, interview transcripts, and survey reports that are read once and forgotten. This MOC organizes feedback into themes with quantified demand signals, connecting the raw voice of the customer to the strategic decisions that should respond to it.

## Critical Demand Signals
- [[theme-onboarding-time-to-value]] -- 13 items, cross-segment, $180K ARR at risk, competitive benchmark disadvantage
- [[theme-api-developer-experience]] -- 8 items, concentrated in technical evaluator persona, competitor has already addressed this

## Strong Demand Signals
- [[theme-reporting-customization]] -- 7 items, enterprise-concentrated, tied to expansion motion
- [[theme-integration-marketplace]] -- 6 items, mid-market concentrated, competitive parity feature

## Moderate Demand Signals
- [[theme-team-collaboration]] -- 4 items, emerging pattern, may strengthen as Teams plans mature
- [[theme-mobile-access]] -- 3 items, SMB concentrated, low ARR impact

## Feedback sources

| Channel | Items last 30 days | Dominant sentiment |
|---------|-------------------|-------------------|
| Support tickets | 24 | Negative (62%) |
| Customer interviews | 8 | Mixed (neutral 50%) |
| NPS surveys | 12 | Mixed |
| Sales calls | 5 | Neutral |
| In-app | 15 | Negative (58%) |

---

Agent Notes:
- Demand signal strength is not just feedback count. A single feedback item from a $180K ARR account that nearly churned is stronger signal than ten items from free-tier users with no revenue stake. Weight by ARR concentration and churn proximity.
- When new feedback arrives, check existing themes before creating a new one. The same pain point often uses different vocabulary across segments: enterprise users say "workflow configuration" while SMB users say "setup."
- The weekly feedback digest should highlight new themes, signal strength changes, and newly surfaced verbatim quotes that are particularly vivid or specific.

Topics:
- [[index]]
```

### Experiments MOC (experiments.md)

```markdown
---
description: Experiment program tracking — active tests, completed results, cross-experiment patterns, and the learning velocity of the growth team
type: moc
topics: ["[[index]]"]
---

# experiments

Experiments are the bridge between customer signal and product conviction. A feedback theme tells you what customers want. An experiment tells you whether your solution actually works. This MOC tracks the experiment program's health: what we are testing, what we have learned, and what patterns emerge across experiments.

## Active Experiments
- [[exp-003-persona-branched-onboarding]] -- testing role selector as first onboarding step (started 2026-02-01)
- [[exp-004-template-recommendations]] -- testing ML-driven template suggestions post-onboarding (started 2026-02-10)

## Completed — Key Results
- [[exp-001-simplified-onboarding-wizard]] -- 22% completion lift from step reduction, shipped, but insufficient for time-to-first-automation
- [[exp-002-interactive-api-playground]] -- 35% increase in API adoption among developer persona, shipped

## Abandoned
- [[exp-005-gamified-onboarding]] -- abandoned after qualitative research showed enterprise users find gamification patronizing

## Cross-Experiment Patterns

Three patterns emerge from the completed experiment portfolio:

1. **Segment-specific effects matter more than average effects.** EXP-001 showed +28% for mid-market but only +14% for enterprise. Reporting average lift masks segment differences that should drive persona-specific solutions.

2. **Completion metrics mislead without outcome metrics.** EXP-001 improved wizard completion but barely moved time-to-first-automation. The metric that matters is the downstream outcome, not the intermediate funnel step.

3. **Developer-focused improvements have clearest ROI.** EXP-002's API playground showed 35% API adoption lift with minimal engineering investment. Technical users respond to self-serve tooling more reliably than non-technical users respond to UX simplification.

---

Agent Notes:
- When proposing new experiments, check whether the hypothesis conflicts with learnings from completed experiments. If EXP-001 showed that step reduction alone is insufficient, a new experiment proposing further step reduction without addressing post-wizard experience is likely to waste capacity.
- Connect every experiment to at least one feedback theme and one OKR. Experiments without customer evidence are fishing expeditions. Experiments without strategic alignment are curiosity projects.

Topics:
- [[index]]
```

---

## Graph Query Examples

```bash
# Find all feedback from enterprise customers with negative sentiment
rg '^customer_segment: enterprise' notes/feedback/ -l | xargs rg '^sentiment: negative' -l

# Find all themes with critical demand signal
rg '^demand_signal: critical' notes/themes/

# Find all experiments that resulted in a "ship" decision
rg '^decision: ship' notes/experiments/

# Find all PRDs without related experiment validation
for prd in notes/prds/*.md; do
  rg -q '^related_experiments:.*\[\[' "$prd" || echo "NO EXPERIMENT: $prd"
done

# Find evidence chains: which themes connect to OKRs?
rg '^related_okrs:' notes/themes/ | rg -v 'null'

# Find all feedback mentioning onboarding from accounts over $100K ARR
rg '^feature_area: onboarding' notes/feedback/ -l | xargs rg '^account_arr:' | \
  grep -E '[0-9]{3,}k'

# Find competitor moves in the last 3 months
rg '^recent_moves:' notes/competitive/ -A 5 | rg '2026-0[1-2]'

# Find decisions where evidence strength is weak or speculative
rg '^evidence_strength: weak\|^evidence_strength: speculative' notes/prds/

# Count feedback by feature area
rg '^feature_area:' notes/feedback/ | awk -F': ' '{print $2}' | sort | uniq -c | sort -rn
```

---

## What Makes This Domain Unique

### The feedback-to-feature pipeline is the primary value chain

In a research vault, value lives in synthesis — connecting claims to build higher-order understanding. In a product management system, value lives in the pipeline from raw customer signal to strategic action. Every feedback item should eventually contribute to a theme. Every theme with sufficient demand signal should inform a PRD or an experiment. Every experiment result should update the themes it tested and the PRDs it informs. Every decision should cite the evidence chain that justifies it. The pipeline is not metadata — it is the product manager's primary weapon against opinion-driven decision-making.

### Evidence strength is a first-class property

Research claims are evaluated by reasoning quality and connection density. Product decisions are evaluated by evidence strength — and evidence strength varies enormously. A PRD backed by 13 feedback items, a competitive benchmark, and a successful experiment has different credibility than a PRD backed by a hunch and a Slack thread. Making `evidence_strength` an explicit schema field forces Nadia (and her agent) to be honest about the foundation underneath each decision. The agent can generate an "evidence audit" of the roadmap: how many features have strong evidence, how many are speculative, and where the gaps are.

### Multi-channel synthesis is the core processing challenge

Research sources are typically documents — papers, articles, transcripts. Product feedback arrives through support tickets, surveys, interviews, sales calls, social media, and in-app mechanisms. Each channel has different signal-to-noise ratios, different vocabularies, and different biases (support tickets over-represent frustrated users; sales calls over-represent prospective rather than existing customers). The agent's clustering pipeline must normalize across these channels: recognizing that a support ticket saying "the setup is confusing" and an interview transcript saying "our analysts couldn't figure out where to start" are expressing the same pain point. This cross-channel normalization is where human synthesis breaks down and agent processing excels.

---

## Agent-Native Advantages

### Exhaustive feedback clustering across all channels

Nadia reads customer feedback selectively — the support tickets that get escalated, the interviews she personally conducts, the NPS comments with extreme scores. She misses the 80% of signal that does not cross her attention threshold. The agent reads everything. Every support ticket, every survey response, every sales call note. It clusters not by keyword matching but by semantic similarity: "the onboarding is confusing" and "I couldn't figure out how to get started" and "we almost gave up during setup" are the same pain point expressed by three different people in three different contexts.

At scale, this transforms the PM's relationship with customer evidence. Instead of arguing from "I have heard this from a few customers," Nadia argues from "13 customers across two segments have expressed this pain point, with combined ARR of $940K at risk and the strongest signal coming from accounts in the 90-day post-onboarding churn window." The quantification is not more rigorous because Nadia has better spreadsheets — it is more rigorous because the agent holds every data point simultaneously and the human never could.

### Cross-experiment pattern detection across the full portfolio

Individual experiments produce individual learnings. The pattern across experiments produces strategic insight. After ten completed experiments, the agent detects:

- **Segment response patterns** — "Enterprise users consistently show smaller lifts from UX changes than mid-market users. The bottleneck for enterprise is not UX simplicity but persona-mismatch in the initial experience."
- **Metric relationship patterns** — "Intermediate funnel metrics (wizard completion, page views) improve more easily than outcome metrics (time-to-first-automation, 30-day retention). The team should focus experiment design on outcome metrics even though they require larger samples."
- **Investment efficiency patterns** — "Developer-focused improvements (API playground, documentation, SDK) show 2-3x the effect size per engineering day invested compared to non-technical UX improvements. The developer persona is more responsive to self-serve tooling."

These patterns are invisible within any single experiment. They emerge only when someone holds the full experiment portfolio in mind and looks for structural regularities. No PM does this. The agent does it automatically after every experiment completion.

### Evidence chain traceability from decision back to customer voice

When Nadia defends a roadmap decision in a planning meeting, she needs to trace the chain: "We are building this because customers said X, we validated it with experiment Y, and it advances OKR Z." Today this chain lives partly in her memory, partly in scattered tools, and partly in slides she created last quarter. The agent maintains the chain explicitly and bidirectionally.

Forward traversal: customer feedback -> theme -> experiment -> PRD -> OKR. "This customer pain point clusters with these twelve other reports, was partially validated by this experiment, is addressed by this PRD, and advances this strategic objective."

Backward traversal: OKR -> PRD -> experiment -> theme -> customer feedback. "This OKR is advanced by these PRDs, which are informed by these experiments, which tested hypotheses from these themes, which are grounded in these specific customer voices."

The chain is valuable not just for defense but for gap detection. When a PRD has no theme connection, the agent flags it: "This feature request has no customer evidence. Is it based on competitive pressure, internal intuition, or stakeholder request?" When an OKR has no experiment validation, the agent flags it: "This objective has not been experimentally tested. What experiments would increase confidence?"

### Competitive intelligence with automatic strategic connection

Nadia tracks competitors episodically — she reads a competitor's blog post, skims a feature announcement, notices a pricing change mentioned on Twitter. Each observation is captured but not connected to her strategic decisions. The agent connects every competitive signal to the themes and decisions it affects.

When Flowmatic launches an interactive API playground, the agent does not just log the competitive move. It connects it to [[theme-api-developer-experience]] (our customers have been asking for this), to [[exp-002-interactive-api-playground]] (we tested our version and it showed strong results), and to the competitive positioning (Flowmatic now has feature parity on API tooling). The competitive move is instantly contextualized within Nadia's strategic framework.

Over time, the agent builds a competitive trajectory model: "Flowmatic has made three enterprise-oriented moves in the last six months (Teams launch, SSO roadmap mention, enterprise sales hiring). Their historical pace suggests enterprise feature parity within 12-18 months. Our current advantages in security and compliance are durable for now but narrowing."

No PM maintains this longitudinal competitive model. They react to individual moves. The agent accumulates every move into a trajectory that informs strategic timing: "If we are going to build our developer experience advantage, we need to move before Flowmatic's enterprise push closes our differentiation gap."

### Real-time evidence auditing for roadmap integrity

At any moment, the agent can generate a roadmap evidence audit:

| Roadmap Item | Theme Connection | Experiment Validation | OKR Alignment | Evidence Strength |
|-------------|-----------------|---------------------|---------------|-------------------|
| Guided onboarding v2 | [[theme-onboarding-time-to-value]] (critical, 13 items) | [[exp-001-simplified-onboarding-wizard]] (positive, partial) | [[okr-q1-2026-reduce-onboarding-drop-off]] | Strong |
| API playground | [[theme-api-developer-experience]] (strong, 8 items) | [[exp-002-interactive-api-playground]] (positive, shipped) | [[okr-q1-2026-reduce-onboarding-drop-off]] | Strong |
| Reporting customization | [[theme-reporting-customization]] (strong, 7 items) | None | None | Moderate — evidence exists but no validation |
| Mobile companion app | [[theme-mobile-access]] (moderate, 3 items) | None | None | Weak — limited evidence, no validation, no strategic alignment |

This audit is not a one-time exercise — it updates continuously as new feedback arrives, experiments complete, and themes shift. It is the difference between "we think our roadmap is evidence-based" and "we can prove which parts are evidence-based and which are not."
---

Topics:
- [[domain-compositions]]
