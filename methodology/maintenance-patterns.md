---
description: Condition-based maintenance, health checks, reweaving, and the backward pass -- keeping vaults alive
type: moc
---

# maintenance-patterns

How knowledge vaults stay healthy over time. Condition-based maintenance, reweaving, orphan detection, staleness management. Why temporal schedules fail for agent-operated systems.

## Core Ideas

### Research
- [[MOC construction forces synthesis that automated generation from metadata cannot replicate]] -- The Dump-Lump-Jump pattern reveals that writing context phrases and identifying tensions IS the thinking — automated top
- [[MOC maintenance investment compounds because orientation savings multiply across every future session]] -- The compounding mechanism is temporal repetition across sessions rather than graph connectivity — one context phrase edi
- [[agent session boundaries create natural automation checkpoints that human-operated systems lack]] -- Discrete session architecture turns "no persistent memory" into a maintenance advantage because health checks fire at ev
- [[automated detection is always safe because it only reads state while automated remediation risks content corruption]] -- The read/write asymmetry in automation safety means detection at any confidence level produces at worst a false alert, w
- [[automation should be retired when its false positive rate exceeds its true positive rate or it catches zero issues]] -- Without retirement criteria the automation layer grows monotonically — checks added when problems appear but never remov
- [[backward maintenance asks what would be different if written today]] -- This mental model distinguishes reweave from reflect — maintenance becomes genuine reconsideration rather than mechanica
- [[behavioral anti-patterns matter more than tool selection]] -- PKM failure research shows systems break through habits not software — the Collector's Fallacy, productivity porn, and u
- [[coherence maintains consistency despite inconsistent inputs]] -- memory systems must actively maintain coherent beliefs despite accumulating contradictory inputs — through detection, re
- [[community detection algorithms can inform when MOCs should split or merge]] -- Louvain and similar algorithms detect dense note clusters and track how cluster boundaries shift over time, providing ac
- [[confidence thresholds gate automated action between the mechanical and judgment zones]] -- A three-tier response pattern (auto-apply, suggest, log-only) based on confidence scoring fills the gap between determin
- [[derived systems follow a seed-evolve-reseed lifecycle]] -- Minimum viable seeding, friction-driven evolution, principled restructuring when incoherence accumulates — reseeding re-
- [[digital mutability enables note evolution that physical permanence forbids]] -- Physical index cards cannot be edited without destruction, so Luhmann designed for permanence — digital files have no su
- [[evolution observations provide actionable signals for system adaptation]] -- Six diagnostic patterns map operational symptoms to structural causes and prescribed responses, converting accumulated o
- [[friction reveals architecture]] -- agents cannot push through friction with intuition, so discomfort that humans ignore becomes blocking — and the forced a
- [[gardening cycle implements tend prune fertilize operations]] -- Separating vault maintenance into tend (update), prune (remove/split), and fertilize (connect) operations may produce be
- [[hooks cannot replace genuine cognitive engagement yet more automation is always tempting]] -- The same mechanism that frees agents for substantive work -- delegating procedural checks to hooks -- could progressivel
- [[idempotent maintenance operations are safe to automate because running them twice produces the same result as running them once]] -- Four patterns from distributed systems — compare-before-acting, upsert semantics, unique identifiers, state declarations
- [[implicit dependencies create distributed monoliths that fail silently across configurations]] -- When modules share undeclared coupling through conventions, environment, or co-activation assumptions, the system looks 
- [[incremental formalization happens through repeated touching of old notes]] -- Vague inklings crystallize into rigorous concepts over months through maintenance passes — each traversal is an opportun
- [[maintenance operations are more universal than creative pipelines because structural health is domain-invariant]] -- Structural health checks (validation, orphans, links, MOC coherence) transfer across domains and platforms while creativ
- [[maintenance scheduling frequency should match consequence speed not detection capability]] -- Problems that develop instantly need per-event checks while problems that develop over weeks need monthly checks — match
- [[maintenance targeting should prioritize mechanism and theory notes]] -- When reweaving experiments, find notes that discuss the MECHANISM being tested rather than just topic-related notes — fo
- [[mnemonic medium embeds verification into navigation]] -- Notes could include self-test prompts encountered during traversal so verification becomes ambient rather than a schedul
- [[module deactivation must account for structural artifacts that survive the toggle]] -- Enabling a module creates YAML fields, MOC links, and validation rules that persist after deactivation — ghost infrastru
- [[navigation infrastructure passes through distinct scaling regimes that require qualitative strategy shifts]] -- At 50 notes keyword search suffices, at 500 curated MOCs become essential, at 5000 automated maintenance replaces manual
- [[observation and tension logs function as dead-letter queues for failed automation]] -- Automation failures captured as observation or tension notes rather than dropped silently, with /rethink triaging the ac
- [[operational wisdom requires contextual observation]] -- tacit knowledge doesn't fit in claim notes — it's learned through exposure, logged as observations, and pattern-matched 
- [[organic emergence versus active curation creates a fundamental vault governance tension]] -- Curation prunes possible futures while emergence accumulates structural debt — the question is not which pole to choose 
- [[orphan notes are seeds not failures]] -- Digital gardening reframes unlinked notes as work-in-progress — health checks flag connection opportunities rather than 
- [[over-automation corrupts quality when hooks encode judgment rather than verification]] -- Hooks that approximate semantic judgment through keyword matching produce the appearance of methodology compliance -- va
- [[productivity porn risk in meta-system building]] -- Building sophisticated agent workflows becomes procrastination when output stays flat while complexity grows—building su
- [[programmable notes could enable property-triggered workflows]] -- When notes have queryable metadata, the vault can shift from passive storage to active participant — notes surfacing the
- [[random note resurfacing prevents write-only memory]] -- Without random selection, vault maintenance exhibits selection bias toward recently active notes, leaving older content 
- [[reconciliation loops that compare desired state to actual state enable drift correction without continuous monitoring]] -- The GitOps pattern of declaring desired state and periodically converging toward it replaces imperative maintenance comm
- [[session transcript mining enables experiential validation that structural tests cannot provide]] -- Traditional tests check if output is correct but session mining checks if the experience achieved its purpose — friction
- [[spaced repetition scheduling could optimize vault maintenance]] -- Maintenance intervals adapted to note age and maturity could catch early issues while avoiding overhead on stable evergr
- [[stale navigation actively misleads because agents trust curated maps completely]] -- A stale MOC is worse than no MOC because agents fall back to search (current content) without one, but trust an outdated
- [[tag rot applies to wiki links because titles serve as both identifier and display text]] -- Unlike opaque identifiers that persist through vocabulary drift, wiki link titles carry semantic content that must stay 
- [[the derivation engine improves recursively as deployed systems generate observations]] -- Each deployed knowledge system is an experiment whose operational observations enrich the claim graph, making every subs
- [[the fix-versus-report decision depends on determinism reversibility and accumulated trust]] -- Four conditions gate self-healing — deterministic outcome, reversible via git, low cost if wrong, and proven accuracy at
- [[three concurrent maintenance loops operate at different timescales to catch different classes of problems]] -- Fast loops (per-event hooks) catch instant violations, medium loops (per-session checks) catch accumulated drift, and sl
- [[wiki links as social contract transforms agents into stewards of incomplete references]] -- Cunningham's norm that creating a link means accepting elaboration responsibility translates from human peer accountabil

### Guidance
- [[design MOCs as attention management devices with lifecycle governance]] -- MOC best practices for derived knowledge systems — hierarchy patterns, lifecycle management, and health metrics adapted 
- [[implement condition-based maintenance triggers for derived systems]] -- Condition-based maintenance triggers for derived knowledge systems — what to check, when to check it, and how to fix it 

## Tensions

(Capture conflicts as they emerge)

## Open Questions

- What maintenance conditions have the highest impact-to-effort ratio?
- How frequently should reweaving be triggered?

---

Topics:
- [[index]]
