# Reference Document Content Audit Report

**Auditor:** Heinrich (Claude Code)
**Date:** 2026-02-13
**PRD Section:** 15 — Reference Document Structural Template

---

## PRD-Specified Structural Template

Every reference document should follow this structure:

1. `## Purpose` — One paragraph: what derivation function this document serves
2. `## Derivation Questions` — Bulleted list of specific questions this document helps the engine answer
3. `## Curated Claims` — Categorized claims with Summary, Derivation Implication, and Source per claim
4. `## Exclusion Notes` — Claims evaluated but NOT included, with reasons
5. `## Version` — Last curated date, source claim count, included count, excluded count, staleness signal

**Exempt from markdown template:** `kernel.yaml` (YAML format), `derivation-validation.md` (test cases format)

---

## Compliance Matrix

| File | Purpose | Derivation Questions | Curated Claims | Exclusion Notes | Version | Compliance |
|------|---------|---------------------|----------------|-----------------|---------|------------|
| kernel.yaml | EXEMPT | EXEMPT | EXEMPT | EXEMPT | EXEMPT | **EXEMPT** |
| dimension-claim-map.md | MISSING | MISSING | PARTIAL | MISSING | MISSING | **Non-compliant** |
| interaction-constraints.md | MISSING | MISSING | MISSING | MISSING | MISSING | **Non-compliant** |
| tradition-presets.md | MISSING | MISSING | MISSING | MISSING | MISSING | **Non-compliant** |
| vocabulary-transforms.md | MISSING | MISSING | MISSING | MISSING | MISSING | **Non-compliant** |
| conversation-patterns.md | MISSING | MISSING | MISSING | MISSING | MISSING | **Non-compliant** |
| personality-layer.md | MISSING | MISSING | MISSING | MISSING | MISSING | **Non-compliant** |
| failure-modes.md | MISSING | MISSING | MISSING | MISSING | MISSING | **Non-compliant** |
| three-spaces.md | MISSING | MISSING | MISSING | MISSING | MISSING | **Non-compliant** |
| derivation-validation.md | EXEMPT | EXEMPT | EXEMPT | EXEMPT | EXEMPT | **EXEMPT** |
| open-questions.md | MISSING | MISSING | MISSING | MISSING | MISSING | **Non-compliant** |
| use-case-presets.md | MISSING | MISSING | MISSING | MISSING | MISSING | **Non-compliant** |
| semantic-vs-keyword.md | PRESENT | PRESENT | PRESENT | PRESENT | PRESENT | **Fully compliant** |
| session-lifecycle.md | PRESENT | PRESENT | PRESENT | PRESENT | PRESENT | **Fully compliant** |
| evolution-lifecycle.md | PRESENT | PRESENT | PRESENT | PRESENT | PRESENT | **Fully compliant** |
| self-space.md | PRESENT | PRESENT | PRESENT | PRESENT | PRESENT | **Fully compliant** |

---

## Summary Counts

| Status | Count | Files |
|--------|-------|-------|
| **Fully compliant** | 4 | semantic-vs-keyword.md, session-lifecycle.md, evolution-lifecycle.md, self-space.md |
| **Partially compliant** | 1 | dimension-claim-map.md (has claim content organized by dimension but not in the Summary/Derivation Implication/Source per-claim format) |
| **Non-compliant** | 9 | interaction-constraints.md, tradition-presets.md, vocabulary-transforms.md, conversation-patterns.md, personality-layer.md, failure-modes.md, three-spaces.md, open-questions.md, use-case-presets.md |
| **Exempt** | 2 | kernel.yaml, derivation-validation.md |

**Compliance rate (non-exempt files):** 4 of 14 fully compliant = **28.6%**

---

## Extra Files (Not in PRD List)

The following files exist in `reference/` but are not among the 16 PRD-specified documents:

| File | Current Content | Recommendation |
|------|----------------|----------------|
| `claim-map.md` | Navigation index mapping topic areas to research claims with wiki links. Organized by the six topic MOCs (graph-structure, agent-cognition, etc.). Functions as a quick-reference lookup from topic to relevant claims. | **Evaluate:** May be useful as a standalone navigation aid, but its function overlaps with what `dimension-claim-map.md` does (mapping claims to dimensions). Consider merging claim-map content into dimension-claim-map during restructure, or keeping as a supplementary navigation tool clearly marked as non-canonical. |
| `components.md` | Blueprint specifications for all system components (Notes, Schema, Links, MOCs, Self-space, Search, Hooks, Skills, etc.). Each blueprint explains What, Why, and How to implement. Referenced by multiple other reference documents. | **Evaluate:** Heavily referenced by evolution-lifecycle.md and other documents. Contains valuable implementation guidance. Determine whether it should be elevated to the PRD list as a 17th reference document, or whether its content should be distributed into the existing 16 documents. |
| `methodology.md` | Domain-agnostic distillation of TFT research: cognitive science foundations, universal note pattern, quality standards, session rhythm, self/ structure, self-extension principle. Referenced by multiple other reference documents. | **Evaluate:** Similar situation to components.md. Contains foundational methodology content referenced by self-space.md, evolution-lifecycle.md, and others. Determine whether to formalize as a PRD-listed document or merge its content into existing reference documents. |

Additionally, the following non-document items exist in `reference/`:
- `templates/` — directory (contains generated system templates)
- `validate-kernel.sh` — script for kernel validation

---

## Detailed Analysis per Non-Compliant File

### dimension-claim-map.md (Partially Compliant)

**What it has:** Content organized by the 8 configuration dimensions, with claims listed in table format (Claim, What It Says, Informs). Has default positions per dimension and a cross-dimension interactions section.

**What it is missing:**
- `## Purpose` section
- `## Derivation Questions` section
- Per-claim structure with `**Summary:**`, `**Derivation Implication:**`, `**Source:**` format (currently uses table format instead)
- `## Exclusion Notes` section
- `## Version` section with metrics

**Gap severity:** MEDIUM — The content is substantive and well-organized, but the format does not match the PRD template. The table format (Claim | What It Says | Informs) captures similar information to Summary/Derivation Implication but in a less detailed format.

---

### interaction-constraints.md

**What it has:** Comprehensive content on dimension interaction cascades, a cross-dimension interaction matrix, coherence rules (hard constraints that BLOCK, soft constraints that WARN), compensating mechanisms, and derivation application guidance.

**What it is missing:** All five required sections (Purpose, Derivation Questions, Curated Claims with per-claim structure, Exclusion Notes, Version).

**Gap severity:** MEDIUM — Content is rich but structured as an engineering reference rather than a curated claims document. The coherence rules and cascade documentation are the core value; restructuring to per-claim format would require deciding which coherence insights are "claims."

---

### tradition-presets.md

**What it has:** Six methodology tradition configurations (Zettelkasten, PARA, Evergreen, Cornell, GTD, Memory Palace) with per-dimension values, process steps, coherence signatures, and best-for guidance. Also includes use-case presets table, mixing rules, and preset selection algorithm.

**What it is missing:** All five required sections.

**Gap severity:** LOW-MEDIUM — This document's primary function is configuration reference rather than curated claims. The "claims" are implicit in the tradition analysis. Restructuring may require significant rethinking since it serves more as a lookup table than a claims document.

---

### vocabulary-transforms.md

**What it has:** Comprehensive mapping tables (Universal to Domain for terms, templates, folders, and skills), plus application instructions and quality checks.

**What it is missing:** All five required sections.

**Gap severity:** LOW — This document functions as a mapping reference. Its value is in the tables, not in individual claims. The PRD template may need adaptation for pure-reference documents like this one.

---

### conversation-patterns.md

**What it has:** Five worked examples (Book Notes, Family Memory, Climate Research, Therapy Journal, Multi-Project PM) showing the full derivation path from user statement through signal extraction, derived configuration, vocabulary mapping, and key insights. Cross-pattern analysis section.

**What it is missing:** All five required sections.

**Gap severity:** LOW — This document functions as a validation corpus and training examples rather than curated claims. Its structure (worked examples) serves its purpose well. Converting to per-claim format might reduce its utility as a training reference.

---

### personality-layer.md

**What it has:** Detailed specification of four personality dimensions (Warmth, Opinionatedness, Formality, Emotional Awareness), signal patterns, conflict resolution rules, personality x artifact transformation matrix, encoding format, evolution guidance.

**What it is missing:** All five required sections.

**Gap severity:** MEDIUM-HIGH — This document contains many discrete claims about personality derivation that would benefit from the per-claim structure (Summary, Derivation Implication, Source). The personality x artifact matrix is particularly valuable and would be well-served by explicit derivation implications.

---

### failure-modes.md

**What it has:** 10 failure modes, each with What/Why/Vulnerable domains/Prevention/Warning signs structure. Domain vulnerability matrix. Integration with init guidance.

**What it is missing:** All five required sections.

**Gap severity:** MEDIUM — Each failure mode is effectively a curated claim. The existing structure (What/Why/Prevention) maps well to the PRD format (Summary/Derivation Implication). Restructuring would be relatively straightforward.

---

### three-spaces.md

**What it has:** Detailed specification of the three-space architecture (Self, Notes, Ops), six failure modes of conflation, filesystem layouts per platform, memory type routing decision tree, cross-references.

**What it is missing:** All five required sections.

**Gap severity:** HIGH — This is one of the most important reference documents. It was cited in the PRD as the "fully-specified" example document, yet the actual file does not follow the template. The content is comprehensive but not structured as curated claims.

---

### open-questions.md

**What it has:** Deferred-to-v1.1 items (8 items), deferred-to-v2 items (2 items), open research questions (14 questions with context and approach), priority assessment matrix, integration with derivation engine.

**What it is missing:** All five required sections.

**Gap severity:** LOW — This document's purpose (tracking unknowns and deferred items) does not naturally fit the curated-claims template. It is closer to a project management artifact than a derivation reference. The PRD template may need an exemption or adaptation for this document type.

---

### use-case-presets.md

**What it has:** Seven use-case presets (Research, Therapy, PM, Creative, Learning, Companion, Relationships) with dimension positions, active feature blocks, vocabulary, failure mode risks, personality defaults, and example user statements. Five methodology tradition points. Preset selection algorithm. Novel domain blending.

**What it is missing:** All five required sections.

**Gap severity:** MEDIUM — Similar to tradition-presets.md, this serves as configuration reference. Each preset's rationale contains implicit claims that could be made explicit.

---

## Top 5 Most Critical Gaps (Prioritized Recommendations)

### 1. three-spaces.md — Highest Priority

**Why critical:** The PRD explicitly used three-spaces.md as the "fully-specified reference document [that] demonstrates the expected content depth and structure." It is referenced by 5+ other reference documents. Yet it does not follow the PRD template at all.

**Recommendation:** Restructure to add Purpose, Derivation Questions, and Version sections. Convert the three-space specification content into curated claims format (the six failure modes of conflation are natural claim candidates). Add Exclusion Notes for three-space patterns that were considered but rejected.

### 2. personality-layer.md — High Priority

**Why critical:** Personality derivation is a differentiating feature of Ars Contexta. The document contains rich, discrete claims (each personality dimension, each signal pattern, each conflict resolution rule) that would directly benefit from the Summary/Derivation Implication/Source format. It is referenced by session-lifecycle.md, self-space.md, and use-case-presets.md.

**Recommendation:** Add all five sections. Each personality dimension section can be restructured as curated claims. The signal patterns table and conflict resolution rules are natural claim candidates with clear derivation implications.

### 3. failure-modes.md — High Priority

**Why critical:** Failure modes directly inform what warnings go into generated context files. Each of the 10 failure modes maps naturally to the curated claim format (What maps to Summary, Prevention maps to Derivation Implication, and source claims exist in the vault). The domain vulnerability matrix is a key derivation artifact.

**Recommendation:** Add all five sections. Each failure mode becomes a claim under a "Failure Taxonomy" category. The domain vulnerability matrix can remain as an additional section after the standard template sections.

### 4. dimension-claim-map.md — High Priority

**Why critical:** This is the core mapping between research claims and configuration dimensions. It is the document that most directly needs the per-claim format because each claim has a clear derivation implication (how it affects a specific dimension choice).

**Recommendation:** Restructure from table format to per-claim format with Summary, Derivation Implication, and Source. The existing "What It Says" column maps to Summary, "Informs" maps to Derivation Implication, and claim wiki links provide Source. Add Purpose, Derivation Questions, Exclusion Notes, and Version sections.

### 5. interaction-constraints.md — Medium-High Priority

**Why critical:** Coherence validation is a core derivation function. The hard/soft constraint classification and cascade documentation are essential derivation artifacts. Multiple constraints are grounded in research claims that should be explicitly cited.

**Recommendation:** Add Purpose and Derivation Questions sections. Convert cascade descriptions and coherence rules into curated claims format. The hard constraints (BLOCK) and soft constraints (WARN) can be claim categories. Add Exclusion Notes for constraint types that were considered but not included. Add Version section.

---

## Observations on Template Fit

Some documents serve purposes that may not naturally fit the curated-claims template:

- **vocabulary-transforms.md** and **conversation-patterns.md** are reference/lookup documents (mapping tables and worked examples respectively). Forcing them into the curated-claims format may reduce their utility. Consider whether these need a variant template or an exemption similar to kernel.yaml and derivation-validation.md.

- **open-questions.md** is a project management artifact tracking unknowns and deferred items. The curated-claims format does not naturally accommodate its purpose. Consider exempting it or creating a "project tracking" variant template.

- **tradition-presets.md** and **use-case-presets.md** contain significant overlap. The PRD lists them as separate documents, but they share content (the tradition configurations appear in both, and use-case-presets.md references tradition-presets.md directly). During restructuring, consider clarifying the boundary: tradition-presets owns tradition definitions; use-case-presets owns use-case derivations and the blending algorithm.

---

## Fully Compliant Documents — Pattern Notes

The four fully compliant documents (semantic-vs-keyword.md, session-lifecycle.md, evolution-lifecycle.md, self-space.md) share these characteristics:

1. **Clear Purpose paragraph** that states what derivation function the document serves
2. **6 Derivation Questions** that are specific and answerable
3. **Curated Claims organized by category**, each with Summary, Derivation Implication, and Source
4. **Exclusion Notes** with specific reasons for each exclusion
5. **Version block** with curated date, source count, included count, excluded count, and cross-references

These documents were likely written after the PRD template was finalized, while the non-compliant documents predate it or were written organically without the template in mind.
