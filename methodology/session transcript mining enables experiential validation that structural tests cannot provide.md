---
description: Traditional tests check if output is correct but session mining checks if the experience achieved its purpose — friction patterns, user abandonment, and methodology drift are invisible to assertions
kind: research
topics: ["[[maintenance-patterns]]", "[[agent-cognition]]"]
methodology: ["Original"]
---

# session transcript mining enables experiential validation that structural tests cannot provide

Agent-operated systems produce a unique testing artifact that traditional software doesn't: the complete session transcript. Every tool call, every error, every user correction, every silence — the full interaction is recorded. But most testing frameworks ignore this data, checking only whether the output is structurally valid.

The insight is that structural validity and experiential validity are different things. A system can pass every assertion — valid YAML, correct links, coherent dimensions — and still fail its purpose. The bot that generates a processing methodology and then immediately bypasses it produces structurally valid output but experientially broken behavior. The user who waits 10 minutes after an empty response encounters no bug, just bad design. The 80-message repair cycle that fixes a vocabulary conflict is technically successful but experientially catastrophic.

Session mining reads transcripts against the system's own goals: did the interaction achieve what we designed it to achieve? This creates a third validation layer:

1. **Structural** — is the output well-formed? (validate-kernel, schema checks)
2. **Functional** — does the system produce correct derivations? (test cases, milestones)
3. **Experiential** — did the product work as intended? (session transcript mining)

Traditional software gets experiential feedback through user bug reports, NPS surveys, and analytics dashboards. Agent-operated systems can do something these can't: the system can read its own transcripts and evaluate them. The mining agent knows the product goals (from the PRD or context file), knows the intended experience (from the vision), and can judge: "this session failed because the user got zero value in 16 minutes."

This is since [[reconciliation loops that compare desired state to actual state enable drift correction without continuous monitoring]] applied at the product experience level. The "desired state" is the intended user experience. The "actual state" is what the transcript reveals. The gap between them is the finding.

The learning loop that emerges is powerful: each mined session generates findings that become gap notes that become PRD changes that become implementation fixes that produce better sessions. This is [[the derivation engine improves recursively as deployed systems generate observations]] made concrete — the sessions ARE the observations, and session mining is the recursive improvement mechanism.

What makes this particularly suited to agent-operated products is that the evaluation agent and the product agent share the same cognitive architecture. The mining agent can recognize friction patterns that a human tester might not articulate: context window pressure, tool call cascade failures, methodology drift, the moment where the agent stopped following its own rules. These are agent-native failure modes that require agent-native evaluation.

The future extension is evolution testing: generating systems with different configurations, running parallel sessions, and mining them comparatively. Which personality produces less friction? Which preset generates more connections? Does the system actually evolve over time, or does methodology drift erode it? This turns session mining from a debugging tool into a research instrument — the system studying its own evolution.

---

Source: v1 testing sessions, 2026-02-11

Relevant Notes:
- [[automatic learning capture loop for friction and methodology improvements]] — same loop, product level
- [[hook-driven learning loops create self-improving methodology through observation accumulation]] — observation accumulation as mechanism
- [[reconciliation loops that compare desired state to actual state enable drift correction without continuous monitoring]] — reconciliation as validation
- [[the derivation engine improves recursively as deployed systems generate observations]] — recursive improvement channel
