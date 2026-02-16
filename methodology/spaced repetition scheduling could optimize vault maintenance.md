---
description: Maintenance intervals adapted to note age and maturity could catch early issues while avoiding overhead on stable evergreen notes
kind: research
topics: ["[[maintenance-patterns]]"]
source: TFT research corpus (00_inbox/heinrich/)
---

# spaced repetition scheduling could optimize vault maintenance

Vault maintenance would be more effective if review intervals adapted to note age and maturity. Newly created notes need frequent verification (daily-weekly), while mature notes need occasional review (monthly-quarterly). A scheduling algorithm assigning intervals based on note characteristics would allocate maintenance bandwidth more efficiently than uniform thresholds (all notes get 30-day checks) or random selection (all notes have equal probability regardless of need).

The Ebbinghaus forgetting curve provides the scientific basis: retention drops exponentially without reinforcement, with steeper curves for new memories. For vault maintenance, this translates to: new notes are more likely to have issues (weak descriptions, missing connections, unclear claims) than notes that survived multiple reviews. Since [[temporal separation of capture and processing preserves context freshness]], processing should happen soon after capture. But post-capture verification needs its own rhythm — and since [[LLM attention degrades as context fills]], scheduling frequent short reviews while attention is fresh beats infrequent comprehensive reviews that strain later sessions.

Current approaches have blind spots:
- Staleness detection uses uniform thresholds (30+ days not modified) — treats fresh seedlings and battle-tested evergreens identically
- Health checks run on demand without scheduling — issues accumulate until someone triggers a check
- Since [[random note resurfacing prevents write-only memory]] tests uniform probability selection — every note equally likely regardless of need

Spaced repetition scheduling would assign intervals dynamically:
- Newly created notes: 7 days after creation (catch early issues)
- Notes that passed first review: 21 days
- Notes that passed multiple reviews: 60 days
- Mature evergreen notes: 180 days
- Notes flagged with issues: return to short intervals until fixed

This mirrors how since [[maturity field enables agent context prioritization]] proposes seedling/developing/evergreen status, but applies it to scheduling rather than filtering. There is a second scheduling dimension beyond maturity: since [[MOC maintenance investment compounds because orientation savings multiply across every future session]], hub MOCs that load every session have the highest temporal multiplier on any maintenance investment — a context phrase improved on a hub MOC saves orientation time across far more sessions than the same improvement on a peripheral topic note. Scheduling should therefore weight not just note maturity but session-load frequency, front-loading maintenance attention on high-traffic navigation nodes. The implementation mechanism is [[programmable notes could enable property-triggered workflows]] — the note's `last-reviewed` property determines its next review date; a scheduler queries notes meeting conditions and surfaces them for attention.
---

Relevant Notes:
- [[random note resurfacing prevents write-only memory]] — tests uniform probability selection; interval-based scheduling is an alternative allocation strategy
- [[maturity field enables agent context prioritization]] — maturity status (seedling/evergreen) relates to scheduling intervals; mature notes need less frequent review
- [[temporal separation of capture and processing preserves context freshness]] — the Ebbinghaus forgetting curve that motivates spaced repetition also motivates quick-after-capture processing
- [[processing effort should follow retrieval demand]] — scheduling adds a proactive dimension to the demand-following principle; some effort should anticipate need rather than respond to it
- [[gardening cycle implements tend prune fertilize operations]] — scheduling operationalizes the temporal aspect of gardening; tend cycles need rhythm
- [[backward maintenance asks what would be different if written today]] — defines WHAT maintenance should accomplish (holistic reconsideration); scheduling addresses WHEN that reconsideration happens
- [[LLM attention degrades as context fills]] — cognitive grounding for front-loaded scheduling: frequent early reviews while attention is fresh beat comprehensive later reviews that strain degraded context
- [[PKM failure follows a predictable cycle]] — if the cascade is predictable, scheduling can front-load attention on early-stage indicators (inbox overflow, velocity gaps) before they trigger downstream failures
- [[continuous small-batch processing eliminates review dread]] — alternative maintenance timing approach: interval scheduling vs continuous flow (small-batch); both address WHEN processing happens but use different mechanisms
- [[temporal processing priority creates age-based inbox urgency]] — sibling application of Ebbinghaus decay: this note applies age-based scheduling to maintenance intervals, that note applies it to inbox processing priority; same cognitive science foundation targeting different domains
- [[maintenance scheduling frequency should match consequence speed not detection capability]] — complementary scheduling dimension: spaced repetition schedules note-level review based on maturity, consequence speed schedules problem-class detection based on propagation rate; both address WHEN but along orthogonal axes
- [[MOC maintenance investment compounds because orientation savings multiply across every future session]] — adds target-selection to the scheduling question: hub MOCs that load every session have the highest temporal multiplier on maintenance investment, so scheduling should weight review frequency not just by note maturity but by session-load frequency

Topics:
- [[maintenance-patterns]]
