---
description: Trading and finance knowledge system — inspirational composition showing derived architecture for thesis tracking, trade journaling, and strategy drift detection
kind: example
domain: trading
topics: ["[[domain-compositions]]"]
---

# trading uses conviction tracking with thesis-outcome correlation

A derived cognitive architecture for a discretionary trader who wants to stop losing edge to undocumented drift. Built kernel-up from the 14 universal primitives, adapted through the natural vocabulary of markets, and optimized for the one thing agents do that traders cannot: hold every trade, every thesis, every rule violation in working memory simultaneously.

---

## Persona

**Marcus**, 34, trades US equities and options from a home office. Four years of experience, consistently profitable but plateauing. He keeps a spreadsheet-based trade journal that he reviews monthly (when he remembers). He suspects his biggest edge leak is strategy drift — gradually abandoning position sizing rules under stress — but has no way to prove it or catch it in real time. He has three active strategies: momentum breakouts, earnings plays, and mean reversion setups. Each has documented rules he wrote sober on a weekend, and each has accumulated undocumented exceptions he made under pressure on a Tuesday.

Marcus does not need a dashboard. He needs something that reads his trade journal the way a trading coach would: noticing patterns he cannot see because he is inside them, holding him accountable to rules he set for himself, and surfacing the statistical evidence that separates his winning patterns from his losing ones.

---

## Configuration

The 8 dimensions derived for discretionary trading:

| Dimension | Position | Rationale |
|-----------|----------|-----------|
| Granularity | Atomic | Each trade is a discrete event. Each thesis is a discrete claim. Mixing trades into compound notes would prevent the per-trade statistical analysis that reveals patterns. One trade per note, one thesis per note, one strategy per note. |
| Organization | Flat with wiki links | Trades link to theses, theses link to strategies, strategies link to sectors. The relationships are cross-cutting — one thesis supports multiple trades, one sector contains multiple theses. Folders would force artificial grouping. |
| Linking | Explicit + typed | Every link carries a relationship: trade → thesis (tested), thesis → evidence (supports/contradicts), strategy → rule (defines), trade → strategy (followed/violated). Typed links enable the agent to query "show me all trades that violated strategy X." |
| Metadata | Dense | Trading is inherently quantitative. Every trade needs ticker, direction, entry, exit, size, P&L, conviction, strategy, outcome. Dense YAML makes trades queryable like a database. This is the most schema-heavy domain outside legal. |
| Processing | Heavy | The trade journal pipeline (pre-trade thesis → entry → management → exit → review → pattern extraction) has six distinct phases. Each phase captures different information. Skipping phases means losing the data that makes pattern detection possible. |
| Formalization | High from day one | Strategy rules must be formalized to be checkable. "Buy breakouts" is uncheckable. "Enter long when price closes above 20-day high on 1.5x average volume with position size capped at 2% of equity" is checkable. The agent needs formal rules to detect drift. |
| Review | Daily for trades, weekly for strategy, monthly for thesis calibration | Markets move fast. A trade entered Monday may need exit documentation Tuesday. Strategy drift compounds daily. Thesis accuracy can only be measured over weeks. Different temporal horizons require different review cadences. |
| Scope | Individual practitioner | Trading is personal. Risk tolerance, strategy fit, emotional patterns — none of these generalize. Multi-user trading vaults would compromise the intimacy that makes the system useful. |

---

## Vault Structure

```
vault/
├── 00_inbox/                    # raw capture
│   ├── watchlist-ideas/         # quick ticker + thesis dumps
│   ├── market-notes/            # real-time market observations
│   └── earnings-data/           # earnings releases, data dumps
├── 01_thinking/                 # active knowledge (flat)
│   ├── index.md                 # hub MOC
│   ├── strategies.md            # domain MOC: all strategy docs
│   ├── theses.md                # domain MOC: active market theses
│   ├── sectors.md               # topic MOC: sector analysis
│   ├── risk-management.md       # topic MOC: position sizing, correlation
│   ├── trade-psychology.md      # topic MOC: emotional patterns, discipline
│   ├── earnings.md              # topic MOC: earnings analysis patterns
│   │
│   ├── momentum-breakout-strategy.md
│   ├── earnings-surprise-strategy.md
│   ├── mean-reversion-strategy.md
│   │
│   ├── AI-sector-rotation-thesis-2026-Q1.md
│   ├── rate-cut-beneficiaries-thesis.md
│   ├── semiconductor-cycle-thesis.md
│   │
│   ├── conviction-levels-predict-outcome-quality.md
│   ├── position-sizing-violations-cluster-after-losses.md
│   ├── tuesday-afternoon-entries-underperform.md
│   └── ...
├── 02_archive/                  # closed trades, expired theses
│   ├── trades/                  # completed trade reviews
│   │   ├── 2026-01/
│   │   └── 2026-02/
│   └── theses/                  # invalidated or expired theses
├── 03_trades/                   # active trade journal (the engine)
│   ├── open/                    # currently open positions
│   │   ├── NVDA-2026-02-10-long.md
│   │   ├── AAPL-2026-02-12-short-puts.md
│   │   └── XLE-2026-02-14-long.md
│   ├── reviews/                 # periodic trade reviews
│   │   ├── 2026-W07-weekly-review.md
│   │   └── 2026-01-monthly-review.md
│   └── watchlist.md             # active watchlist with entry triggers
├── 04_meta/                     # infrastructure
│   ├── templates/
│   │   ├── trade.md
│   │   ├── thesis.md
│   │   ├── strategy.md
│   │   ├── trade-review.md
│   │   ├── watchlist-entry.md
│   │   ├── earnings-analysis.md
│   │   └── sector-analysis.md
│   ├── logs/
│   │   ├── observations.md      # trading pattern observations
│   │   ├── observations/
│   │   ├── tensions.md          # strategy contradictions
│   │   └── tensions/
│   ├── scripts/
│   │   ├── trade-stats.sh       # P&L, win rate, expectancy
│   │   ├── drift-check.sh       # strategy rule compliance
│   │   └── thesis-calibration.sh # thesis accuracy tracking
│   └── tasks/
│       └── queue.json
├── self/
│   ├── identity.md              # agent's trading coach persona
│   ├── methodology.md           # how it analyzes trades
│   ├── goals.md                 # current improvement targets
│   └── marcus-profile.md        # trader's patterns, tendencies, edges
└── ops/
    └── methodology/             # system self-knowledge
        ├── how-trades-process.md
        ├── how-drift-detection-works.md
        └── how-thesis-tracking-works.md
```

---

## Note Schemas

### Trade Note

```yaml
---
description: [one sentence — what the trade thesis was and how it played out]
ticker: NVDA
direction: long
strategy: "[[momentum-breakout-strategy]]"
thesis: "[[AI-sector-rotation-thesis-2026-Q1]]"
entry_date: 2026-02-10
entry_price: 142.50
position_size: 850
portfolio_pct: 1.8
stop_loss: 136.00
target: 160.00
risk_reward: 2.9
conviction: 4
exit_date: null
exit_price: null
pnl: null
pnl_pct: null
outcome: open
rules_followed: true
rule_violations: []
emotions: ["focused", "confident"]
topics: ["[[strategies]]", "[[theses]]"]
relevant_notes: []
---
```

### Thesis Note

```yaml
---
description: [one sentence — the thesis claim and current conviction]
thesis_type: sector-rotation | earnings | macro | technical | catalyst
sector: "[[sectors]]"
conviction: 4
supporting_evidence: ["earnings acceleration in NVDA, AMD, AVGO", "capex guidance increases"]
contradicting_evidence: ["inventory builds at TSMC", "valuation multiples extended"]
time_horizon: 3-6 months
status: active | monitoring | invalidated | confirmed
invalidation_trigger: "semiconductor capex guidance cuts in Q1 earnings"
originated: 2026-01-15
last_reviewed: 2026-02-14
calibration_outcome: null
topics: ["[[theses]]", "[[sectors]]"]
relevant_notes: []
---
```

### Strategy Note

```yaml
---
description: [one sentence — what the strategy captures and when it works]
strategy_type: momentum | mean-reversion | event-driven | statistical
market_conditions: ["trending", "high-volume"]
entry_criteria:
  - "Price closes above 20-day high"
  - "Volume >= 1.5x 20-day average"
  - "RSI between 55-75"
exit_criteria:
  - "Target hit (2x ATR from entry)"
  - "Stop loss (1x ATR from entry)"
  - "Time stop: 10 trading days"
position_sizing: "Max 2% portfolio risk per trade"
max_concurrent: 3
win_rate_historical: 0.58
avg_rr_historical: 1.85
expectancy: 0.34
edge_status: active | decaying | retired
last_backtested: 2025-11-01
topics: ["[[strategies]]"]
relevant_notes: []
---
```

### Trade Review Note

```yaml
---
description: [one sentence — the review period and key finding]
review_type: weekly | monthly | quarterly
period: "2026-W07"
trades_taken: 8
wins: 5
losses: 3
win_rate: 0.625
gross_pnl: 4250
avg_winner: 1340
avg_loser: -780
avg_rr: 1.72
largest_winner: "[[NVDA-2026-02-10-long]]"
largest_loser: "[[MSFT-2026-02-03-short]]"
rule_violations: 2
strategies_used: ["[[momentum-breakout-strategy]]", "[[earnings-surprise-strategy]]"]
patterns_identified: ["position sizing drift on 3rd consecutive winner", "late-day entries underperforming"]
topics: ["[[strategies]]", "[[trade-psychology]]"]
relevant_notes: []
---
```

### Watchlist Entry

```yaml
---
description: [one sentence — why this ticker is being watched and what would trigger entry]
ticker: AMZN
thesis: "[[rate-cut-beneficiaries-thesis]]"
strategy: "[[mean-reversion-strategy]]"
entry_trigger: "Pull back to 200-day MA (~$185) with bullish divergence on RSI"
target: 210
stop: 178
risk_reward: 3.6
conviction: 3
added: 2026-02-12
last_reviewed: 2026-02-14
status: watching | triggered | expired
topics: ["[[theses]]"]
relevant_notes: []
---
```

---

## Example Notes

### Trade Note: NVDA Long

```markdown
---
description: Momentum breakout long on NVDA driven by AI sector rotation — entered on volume breakout above consolidation, testing conviction 4 thesis
ticker: NVDA
direction: long
strategy: "[[momentum-breakout-strategy]]"
thesis: "[[AI-sector-rotation-thesis-2026-Q1]]"
entry_date: 2026-02-10
entry_price: 142.50
position_size: 850
portfolio_pct: 1.8
stop_loss: 136.00
target: 160.00
risk_reward: 2.9
conviction: 4
exit_date: null
exit_price: null
pnl: null
pnl_pct: null
outcome: open
rules_followed: true
rule_violations: []
emotions: ["focused", "confident"]
topics: ["[[strategies]]", "[[theses]]"]
relevant_notes: ["[[AI-sector-rotation-thesis-2026-Q1]] — thesis this trade tests", "[[momentum-breakout-strategy]] — strategy rules governing this entry", "[[conviction-levels-predict-outcome-quality]] — conviction 4 trades have historically outperformed"]
---

# NVDA-2026-02-10-long

## Pre-Trade Thesis

NVDA broke above 6-week consolidation at $140 on 2.1x average volume. This aligns with [[AI-sector-rotation-thesis-2026-Q1]] — the thesis that institutional capital is rotating into AI infrastructure plays ahead of Q1 earnings. The breakout was clean: no false starts in the consolidation, volume confirmed, and the sector (SMH) also breaking higher. Conviction 4 because the setup aligns with both the technical entry criteria from [[momentum-breakout-strategy]] and the fundamental thesis.

## Entry Documentation

Entered at $142.50, slightly above the breakout level to avoid the gap fill risk. Position size 850 shares = $121,125 = 1.8% portfolio risk to stop, within the 2% max from the strategy rules. Stop at $136.00 (below consolidation low). Target $160.00 based on measured move from consolidation range.

All entry criteria from [[momentum-breakout-strategy]] satisfied:
- Price closed above 20-day high: yes ($140.20 was the 20-day high)
- Volume >= 1.5x average: yes (2.1x)
- RSI between 55-75: yes (62.4)

## Position Management Notes

**Feb 11:** Gap up to $145.80 on AMD sympathy move. Holding full position, not adding — strategy rules cap at initial size on breakouts. Moved mental stop to $140 (breakeven minus slippage).

**Feb 13:** Pulled back to $143.20 on broad market weakness. Thesis intact — semiconductor names held relative strength. No rules triggered for exit or adjustment.

**Feb 14:** Closing at $147.30. Trailing stop now at $142.00 (1 ATR below). 5 trading days in, halfway to time stop. Thesis strengthening — AVGO guidance raised after-hours, confirming sector rotation.

## Exit Documentation
(pending)

## Post-Trade Review
(pending)

---
```

### Strategy Note: Momentum Breakout

```markdown
---
description: Captures institutional breakout momentum — works in trending markets with confirmed volume, historically 58% win rate with 1.85 R/R
strategy_type: momentum
market_conditions: ["trending", "high-volume"]
entry_criteria:
  - "Price closes above 20-day high"
  - "Volume >= 1.5x 20-day average"
  - "RSI between 55-75 (momentum without exhaustion)"
exit_criteria:
  - "Target hit: 2x ATR from entry"
  - "Stop loss: 1x ATR from entry"
  - "Time stop: 10 trading days max hold"
  - "Thesis invalidation: exit regardless of P&L"
position_sizing: "Max 2% portfolio risk per trade"
max_concurrent: 3
win_rate_historical: 0.58
avg_rr_historical: 1.85
expectancy: 0.34
edge_status: active
last_backtested: 2025-11-01
topics: ["[[strategies]]"]
relevant_notes: ["[[position-sizing-violations-cluster-after-losses]] — risk management discipline breaks down after drawdowns, requiring extra vigilance on sizing rules", "[[tuesday-afternoon-entries-underperform]] — agent-detected pattern suggesting time-of-day affects breakout quality", "[[conviction-levels-predict-outcome-quality]] — higher conviction entries produce better risk-adjusted returns for this strategy"]
---

# momentum-breakout-strategy

## Strategy Thesis

Institutional breakouts in liquid equities tend to follow through for 5-10 trading days because the volume signal represents real capital commitment. The edge comes from entering on confirmed volume (1.5x threshold filters out noise breakouts) and holding long enough for the momentum to play out (10-day time stop prevents overholding). Since [[conviction-levels-predict-outcome-quality]], position conviction at entry predicts follow-through quality — trades where multiple signals align (technical breakout + fundamental thesis + sector strength) outperform purely technical setups.

## Rule Set

The rules exist to prevent emotional decision-making during the trade. Every rule was defined when thinking clearly, outside of market hours. Deviations from these rules must be documented with reasoning — silent deviation is the definition of strategy drift.

**Entry rules:**
1. Price closes above 20-day high (not intraday piercing)
2. Volume on breakout day >= 1.5x 20-day average volume
3. RSI between 55-75 at close (confirms momentum without exhaustion)
4. Max 3 concurrent momentum positions (correlation risk)
5. Position size capped at 2% portfolio risk to stop

**Exit rules:**
1. Target: 2x ATR from entry (take profits, do not move targets)
2. Stop: 1x ATR from entry (honor stops, no mental stops)
3. Time stop: exit by day 10 if neither target nor stop hit
4. Thesis invalidation: exit immediately, no averaging down

## Edge Decay Monitoring

The edge in momentum breakouts is not permanent. Market structure changes, algorithmic participation increases, and crowd adoption erodes profitability. Because [[position-sizing-violations-cluster-after-losses]], the first signal of edge decay is usually behavioral, not statistical — the trader starts violating rules because the strategy "feels wrong" before the numbers confirm it. The agent monitors both the statistical edge (rolling 20-trade win rate and expectancy) and the behavioral signal (rule violation frequency).

## Strategy Drift Log

This section is maintained by the agent. Every rule violation is logged automatically.

| Date | Trade | Violation | Impact |
|------|-------|-----------|--------|
| 2026-01-28 | TSLA short | Position size 2.4% (exceeded 2% max) | Loss was $340 larger than it should have been |
| 2026-02-05 | META long | Entered at RSI 78 (above 75 max) | Won, but entry was outside rule set |

**Agent note:** Two violations in 10 days. The TSLA violation followed a 3-trade losing streak — consistent with [[position-sizing-violations-cluster-after-losses]]. The META violation was "FOMO" — fear of missing the move. Neither violation improved outcomes. Bringing this to Marcus's attention in next weekly review.

---
```

### Thesis Note: AI Sector Rotation

```markdown
---
description: Institutional capital rotating into AI infrastructure ahead of Q1 2026 earnings — thesis tracks capex guidance as confirmation signal
thesis_type: sector-rotation
sector: "[[sectors]]"
conviction: 4
supporting_evidence: ["NVDA breakout on 2.1x volume", "AMD guidance raise Jan 28", "AVGO capex acceleration commentary", "SMH relative strength vs SPY for 6 weeks"]
contradicting_evidence: ["TSMC inventory builds above seasonal norms", "AI infrastructure P/E multiples 40% above 5-year average"]
time_horizon: 3-6 months
status: active
invalidation_trigger: "Two or more AI infrastructure names guide capex DOWN in Q1 earnings"
originated: 2026-01-15
last_reviewed: 2026-02-14
calibration_outcome: null
topics: ["[[theses]]", "[[sectors]]", "[[earnings]]"]
relevant_notes: ["[[semiconductor-cycle-thesis]] — related macro thesis on semiconductor inventory cycle timing", "[[NVDA-2026-02-10-long]] — trade testing this thesis", "[[conviction-levels-predict-outcome-quality]] — conviction level 4 suggests high-quality setup alignment"]
---

# AI-sector-rotation-thesis-2026-Q1

## Thesis Statement

Institutional capital is rotating into AI infrastructure plays (NVDA, AMD, AVGO, MRVL) ahead of Q1 2026 earnings because capex guidance from hyperscalers (MSFT, GOOG, AMZN, META) has been accelerating and the consensus has not yet fully priced in the magnitude of the buildout. The rotation shows up as persistent relative strength in SMH vs SPY and confirmed volume breakouts in individual names.

## Evidence Tracking

The thesis lives or dies by evidence. Each new data point either supports or contradicts, and the conviction level should adjust accordingly.

**Supporting:**
- NVDA broke above 6-week consolidation on 2.1x volume (Feb 10) — institutional buying confirmed
- AMD guided Q1 revenue above consensus by 8% (Jan 28) — demand signal
- AVGO management commentary on "unprecedented AI infrastructure demand" in investor day (Feb 5)
- SMH/SPY ratio at 6-month high, trending — sector leadership confirmed
- MSFT capex guidance for FY2026 raised 15% above street (Jan earnings)

**Contradicting:**
- TSMC inventory builds 12% above seasonal norms — could signal demand pull-forward rather than sustainable growth
- AI infrastructure P/E multiples 40% above 5-year average — valuation argument for exhaustion
- Energy cost concerns for data center buildout emerging in regulatory filings

## Conviction Trajectory

| Date | Conviction | Trigger |
|------|-----------|---------|
| Jan 15 | 3 | Initial formation — SMH relative strength emerging |
| Jan 28 | 4 | AMD guidance raise + MSFT capex raise |
| Feb 5 | 4 | AVGO commentary confirms, but TSMC inventory concern prevents 5 |
| Feb 14 | 4 | Thesis holding — monitoring TSMC closely |

## Calibration Notes

(To be completed when thesis resolves — did the rotation play out as expected? Where was conviction calibration accurate vs miscalibrated?)

---
```

### Pattern Discovery Note (Agent-Generated)

```markdown
---
description: Win rate drops 23% on trades entered after 2pm ET — the agent detected this pattern across 47 trades spanning three strategies
type: learning
topics: ["[[trade-psychology]]", "[[strategies]]"]
relevant_notes: ["[[momentum-breakout-strategy]] — affected: breakout entries after 2pm underperform vs morning entries", "[[position-sizing-violations-cluster-after-losses]] — related behavioral pattern: afternoon entries correlate with impulsive decisions", "[[earnings-surprise-strategy]] — not affected: earnings reactions are time-agnostic"]
---

# tuesday-afternoon-entries-underperform

Analyzing 47 trades across momentum breakouts and mean reversion setups over the last 90 days, entries made after 2:00 PM ET show a 23% lower win rate than entries made before noon (44% vs 67%). The effect is strongest on Tuesdays and Wednesdays and disappears for earnings-related trades where timing is dictated by the event, not by discretion.

The likely mechanism is decision fatigue combined with FOMO. By afternoon, Marcus has been watching screens for hours, and late-day entries tend to be reactive rather than planned. The watchlist entries that trigger in the morning get executed with discipline because the plan was set overnight. Afternoon entries are more often "I just noticed this" decisions that bypass the pre-trade thesis documentation step.

This does not mean afternoon entries should be banned — that would lose the 44% that do win, which includes legitimate breakouts that only confirm on closing volume. But the data suggests a higher conviction threshold for afternoon entries might filter out the impulsive ones. If conviction 3 entries after 2pm have a 31% win rate while conviction 4+ entries after 2pm have a 52% win rate, the rule becomes: no afternoon entries below conviction 4.

The agent will track this pattern going forward and update the win rate differential monthly. If the pattern dissolves (afternoon entries improve), it was likely a temporary behavioral artifact. If it persists, it should become a formal rule addition to [[momentum-breakout-strategy]] and [[mean-reversion-strategy]].

---
```

### Weekly Review Note

```markdown
---
description: Week 7 2026 — five wins, three losses, two rule violations detected, position sizing drift after TSLA loss identified
review_type: weekly
period: "2026-W07"
trades_taken: 8
wins: 5
losses: 3
win_rate: 0.625
gross_pnl: 4250
avg_winner: 1340
avg_loser: -780
avg_rr: 1.72
largest_winner: "[[NVDA-2026-02-10-long]]"
largest_loser: "[[MSFT-2026-02-03-short]]"
rule_violations: 2
strategies_used: ["[[momentum-breakout-strategy]]", "[[earnings-surprise-strategy]]"]
patterns_identified: ["position sizing drift on 3rd consecutive winner", "late-day entries underperforming"]
topics: ["[[strategies]]", "[[trade-psychology]]"]
relevant_notes: ["[[position-sizing-violations-cluster-after-losses]] — confirmed again this week: TSLA oversizing followed a 3-trade losing streak", "[[tuesday-afternoon-entries-underperform]] — two of three losses were afternoon entries", "[[momentum-breakout-strategy]] — drift log updated with this week's violations"]
---

# 2026-W07 Weekly Review

## Performance Summary

Profitable week but the quality of execution was mixed. Five winners and three losers produce a 62.5% win rate against a target of 58% from [[momentum-breakout-strategy]], so the strategy is performing within expectations. The concern is not the P&L — it is the two rule violations that happened to work out this week but represent process failures.

## Rule Compliance

Two violations detected this week:

1. **TSLA short (Jan 28):** Position size was 2.4% portfolio risk, exceeding the 2% maximum from [[momentum-breakout-strategy]]. This followed a 3-trade losing streak, consistent with the pattern documented in [[position-sizing-violations-cluster-after-losses]]. The extra sizing cost $340 on the loss. More importantly, the behavioral pattern is repeating — Marcus increases size after losses, which is the exact opposite of what risk management principles dictate.

2. **META long (Feb 5):** Entry at RSI 78, above the 75 maximum for momentum breakouts. The trade won, which is the dangerous outcome — it reinforces the rule violation. Since [[conviction-levels-predict-outcome-quality]], the conviction was 3 on this trade, below what the agent now recommends for entries that deviate from standard criteria.

## Thesis Performance

- [[AI-sector-rotation-thesis-2026-Q1]]: 2 trades taken, both profitable. Thesis holding.
- [[rate-cut-beneficiaries-thesis]]: 1 trade taken, small loss. Thesis not invalidated but conviction dropping.

## Questions for Next Week

- Should the afternoon entry filter be formalized into strategy rules? Data from [[tuesday-afternoon-entries-underperform]] suggests yes, but sample size is still building.
- TSMC earnings next week will be a major test for [[AI-sector-rotation-thesis-2026-Q1]]. Inventory commentary will either support or invalidate the thesis.
- The position sizing drift pattern has now occurred 4 times in 8 weeks. Is this a coaching issue (awareness) or a structural issue (rules need enforcement mechanism)?

---
```

---

## Processing Workflow

### Capture

Trades enter the system at multiple moments:

1. **Pre-trade:** When a watchlist entry triggers, the agent creates a trade note from the watchlist entry template, pre-populating thesis, strategy, and entry criteria. Marcus confirms entry details after execution.
2. **During trade:** Position management notes are appended to the trade note. Market observations go to `00_inbox/market-notes/`.
3. **Post-trade:** Exit details are added. The agent calculates P&L, checks rule compliance, and flags violations.
4. **Market research:** Earnings data, sector analysis, and thesis evidence go to inbox for processing.

### Process (the domain-specific step)

The agent runs three processing workflows:

**Trade review pipeline:**
1. Trade closed → agent calculates all metrics (P&L, R-multiple, hold time, rule compliance)
2. Agent compares trade to strategy rules → flags every deviation
3. Agent links trade to thesis → updates thesis evidence (supporting or contradicting)
4. Agent checks for behavioral patterns → correlates with time-of-day, day-of-week, consecutive win/loss streaks, conviction level
5. Agent updates strategy drift log if violations occurred

**Thesis calibration pipeline:**
1. Thesis originated → agent records conviction and evidence at inception
2. Evidence arrives → agent adds to supporting or contradicting evidence, adjusts conviction recommendation
3. Thesis resolves → agent compares predicted outcome to actual, calculates calibration accuracy
4. Agent aggregates calibration data across thesis types → "Your sector rotation theses are accurate 72% of the time; your earnings predictions are at 45%"

**Strategy drift detection:**
1. Each trade is checked against its strategy's formal rules
2. Deviations are logged with the specific rule violated
3. Agent calculates rolling compliance rate per strategy
4. When compliance drops below 85% over 20 trades, agent escalates

### Connect

Every trade links to its strategy and thesis. Every thesis links to its evidence. Every strategy links to its performance data. The agent maintains these connections bidirectionally — when a new trade is logged against a thesis, the thesis note's evidence section updates. When a pattern note is created, affected strategies get backlinks.

### Verify

Weekly: automated review of all trades for rule compliance, thesis conviction accuracy, and pattern detection.
Monthly: strategy-level metrics (win rate, expectancy, edge decay signals).
Quarterly: thesis calibration audit — how often is Marcus right about sector calls vs earnings calls?

---

## MOC Structure

### Hub MOC: index.md

```markdown
---
description: Entry point for Marcus's trading knowledge system — navigate to strategies, theses, or trading psychology
type: moc
---

# Trading System

## Active Focus
- [[strategies]] — documented strategy rules, drift monitoring, performance tracking
- [[theses]] — market theses with evidence tracking and conviction calibration
- [[trade-psychology]] — behavioral patterns, emotional triggers, discipline metrics

## Supporting Analysis
- [[sectors]] — sector-level research and rotation tracking
- [[earnings]] — earnings analysis patterns and prediction calibration
- [[risk-management]] — position sizing, correlation, portfolio-level risk

---

Agent Notes:
Start with [[strategies]] for rule compliance review. Start with [[theses]] for market thesis calibration. Start with [[trade-psychology]] when reviewing behavioral patterns.
```

### Domain MOC: strategies.md

```markdown
---
description: All documented trading strategies with formal rules, performance metrics, and drift monitoring — the accountability layer
type: moc
topics: ["[[index]]"]
---

# strategies

Every strategy has formal rules defined outside of market hours. The agent monitors compliance continuously. Strategy drift — the gradual, undocumented deviation from rules under pressure — is the primary edge leak this system is designed to detect.

## Active Strategies
- [[momentum-breakout-strategy]] — 58% win rate, 1.85 R/R, active edge. Two drift violations flagged this month.
- [[earnings-surprise-strategy]] — 52% win rate, 2.3 R/R, event-driven. No drift issues.
- [[mean-reversion-strategy]] — 61% win rate, 1.4 R/R, range-bound markets. Underperforming in current trending regime.

## Strategy Insights
- [[conviction-levels-predict-outcome-quality]] — higher conviction at entry correlates with better outcomes across all three strategies
- [[position-sizing-violations-cluster-after-losses]] — sizing discipline breaks down after losing streaks, a recurring behavioral pattern
- [[tuesday-afternoon-entries-underperform]] — agent-detected pattern showing time-of-day effect on entry quality

## Edge Monitoring
- [[mean-reversion-strategy]] showing signs of edge decay in current market regime (trending > ranging). Watch for 3 more months before considering retirement.
- Momentum breakout compliance at 80% over last 20 trades — below 85% threshold. Escalating.

## Drift Alerts
2 active drift alerts. See individual strategy drift logs for details.

---

Agent Notes:
Drift detection is the core value of this MOC. When reviewing, always check the drift log section of each strategy before reviewing individual trades. The pattern [[position-sizing-violations-cluster-after-losses]] has been confirmed 4 times — it is the single most important behavioral pattern to monitor.
```

---

## Graph Query Examples

```bash
# Find all trades that violated strategy rules
rg '^rules_followed: false' vault/03_trades/ vault/02_archive/trades/

# Find all trades with a specific strategy
rg '^strategy:.*momentum-breakout' vault/03_trades/ vault/02_archive/trades/

# Track conviction-to-outcome correlation
rg '^conviction: [45]' vault/03_trades/ vault/02_archive/trades/ -l | \
  xargs rg '^outcome:' | sort

# Find all active theses approaching invalidation
rg '^status: active' vault/01_thinking/ --glob '*thesis*' -l | \
  xargs rg '^invalidation_trigger:'

# Strategy drift: all rule violations in the last month
rg '^rule_violations: \[' vault/03_trades/open/ vault/02_archive/trades/2026-02/ | \
  grep -v '\[\]'

# Thesis calibration: compare conviction to outcome for closed theses
rg '^calibration_outcome:' vault/02_archive/theses/ -B 5 | rg 'conviction|calibration'

# Find trades linked to a specific thesis
rg '\[\[AI-sector-rotation-thesis-2026-Q1\]\]' vault/03_trades/ vault/02_archive/trades/

# Emotional state tracking: find trades entered with specific emotions
rg '^emotions:.*anxious\|frustrated\|revenge' vault/03_trades/ vault/02_archive/trades/
```

---

## What Makes This Domain Unique

### Strategy drift detection is the killer feature

Most trading knowledge systems are passive — they record what happened. This system is active — it detects when behavior deviates from documented rules. The agent holds the strategy rules in memory and checks every trade against them. Silent drift becomes visible drift. This is the single feature that justifies the entire system.

No human trader can hold 47 trades in working memory while simultaneously checking each against 5 entry rules, 4 exit rules, and 3 position sizing constraints across 3 different strategies. The agent can. And because [[position-sizing-violations-cluster-after-losses]], the moments when the trader most needs rule enforcement are precisely the moments when emotional state makes self-enforcement least reliable.

### Thesis calibration creates metacognitive feedback

Traders form theses constantly but rarely track their accuracy systematically. Was the sector rotation call right? Were earnings predictions calibrated? By linking every trade to a thesis and every thesis to its outcome, the agent builds a calibration record that answers questions humans avoid: "Am I actually good at this type of analysis, or do I just think I am?"

### Temporal dynamics are extreme

Markets move on daily timescales. A thesis valid Monday can be invalidated by Tuesday's earnings report. This makes the maintenance cadence faster than any other domain in the example catalog. The review cycle (daily for trades, weekly for strategy, monthly for thesis calibration) reflects the domain's temporal urgency, and the agent's continuous monitoring catches what periodic human review would miss.

---

## Agent-Native Advantages

### Exhaustive rule compliance checking

The agent checks every trade against every rule in the relevant strategy, every time. A human trader reviews their journal weekly if disciplined, monthly if not, and never with the statistical rigor the agent brings. The agent does not get tired at 3pm. It does not get overconfident after a winning streak. It does not skip the review when the P&L is good. Its compliance checking is exhaustive because that is what exhaustive means — no trade escapes review, no rule violation goes unlogged.

**What this looks like in practice:** Marcus closes a trade on TSLA. Before he moves on, the agent has already calculated the P&L, checked the position size against the strategy's 2% maximum, verified the entry criteria were met, logged the hold time against the time stop, compared the exit to the documented exit criteria, and flagged that the position size was 2.4% — a violation. It links this violation to [[position-sizing-violations-cluster-after-losses]] because it knows Marcus had three consecutive losses before this trade. It updates the strategy's drift log. Marcus sees all of this in the trade note before his next trade.

### Multi-dimensional pattern detection across time

The agent holds all 47 trades from the last quarter in its analytical frame simultaneously. It can correlate entry time with outcome, emotional state with rule compliance, conviction level with P&L, day-of-week with win rate, and any other combination of the dense metadata in trade notes. It detected [[tuesday-afternoon-entries-underperform]] not because it was looking for that specific pattern, but because it was looking at all patterns simultaneously.

**What this looks like in practice:** During a weekly review, the agent presents: "Three of your four losses this month were entered after 2pm. Your afternoon win rate is 44% versus 67% in the morning. This pattern has been stable for 90 days across 47 trades. Your two afternoon entries with conviction 4+ both won. Recommendation: consider a minimum conviction 4 threshold for entries after 2pm." Marcus did not know to look for this. The agent found it because it can examine every dimension of every trade simultaneously.

### Thesis-to-outcome tracking with calibration feedback

Human traders form opinions about their forecasting ability that bear no relationship to reality. Cognitive biases (survivorship bias, hindsight bias, confirmation bias) corrupt self-assessment. The agent maintains an objective calibration record by comparing every thesis to its outcome and aggregating by thesis type.

**What this looks like in practice:** After six months, the agent reports: "You have originated 23 market theses. 14 were sector rotation, 6 were earnings-based, 3 were macro. Your sector rotation theses resolved correctly 71% of the time with an average conviction of 3.8 at origination. Your earnings theses resolved correctly 44% of the time despite an average conviction of 3.6 at origination. You are overconfident in your earnings analysis and well-calibrated on sector rotation. Recommendation: reduce position sizes on earnings-based trades to reflect the lower actual accuracy, or investigate what distinguishes your correct earnings predictions from your incorrect ones."

No human trader maintains this level of systematic self-knowledge. The agent does it automatically because it has every thesis, every conviction rating, and every outcome in its graph, and because it never forgets to check.

---
---

Topics:
- [[domain-compositions]]
