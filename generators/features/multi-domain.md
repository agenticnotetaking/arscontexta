# Feature: Multi-Domain

## Context File Block

```markdown
## Multi-Domain Architecture

Your system manages multiple knowledge domains within a single graph. This creates power (cross-domain connections) but requires coordination (no namespace collisions, no context contamination).

### Five Composition Rules

1. **Separate templates per domain** — Each domain has its own note template with domain-specific YAML fields. No field conflicts across templates. Base fields (description, type, created) are universal; domain fields diverge.

2. **Shared wiki link namespace** — All notes across all domains share one filename namespace. No duplicate filenames allowed, even across domains. This enables cross-domain linking without path prefixes.

3. **Cross-domain connection finding** — When running reflect/connection-finding, search ALL notes folders, not just the current domain. The most valuable connections often span domains.

4. **Domain-specific processing intensity** — Each domain can have different processing levels. Research might use heavy processing while a companion domain uses light. Processing skills route to the correct intensity based on which domain the note belongs to.

5. **Progressive context loading** — Domain-specific guidance loads only when working in that domain. The context file has a shared section (philosophy, constraints, quality standards) and domain sections that load on demand. This prevents context pollution when switching between domains.

### Domain Structure

Each domain gets its own:
- **Notes folder** — `{domain-name}/` (e.g., `research/`, `reflections/`)
- **Note template** — Domain-specific YAML fields and type enums
- **Vocabulary** — Domain-native terms for processing phases
- **Domain MOC** — Entry point linking to topic MOCs within the domain
- **Processing configuration** — Independent granularity, processing level, schema density

Shared across domains:
- **self/ space** — One agent identity, one methodology, one set of goals
- **ops/ space** — Shared operational state, config, reminders
- **Hub MOC** — Links to all domain MOCs
- **Wiki link namespace** — Global uniqueness constraint
- **Quality standards** — Same six criteria apply everywhere
- **Discovery layers** — Same progressive disclosure pattern

### Cross-Domain Patterns

**When working in a specific domain:** Load that domain's section of the context file. Use domain-native vocabulary. Route processing through domain-appropriate skills.

**When connections span domains:** Link normally with wiki links. The connection-finding phase searches all domains by default. Cross-domain links are especially valuable — they reveal structural parallels and transferable insights.

**When adding a new domain:** Use /add-domain to extend the system. The existing domain(s) remain untouched. The hub MOC gains a new domain entry. New templates, vocabulary, and processing configuration are generated alongside existing ones.

### Namespace Conventions

With multiple domains, avoid title collisions through domain-native vocabulary:
- Research: `claims must be specific enough to be wrong`
- Therapy: `recurring themes surface faster when named explicitly`
- Relationships: `consistent check-ins matter more than grand gestures`

Each domain's vocabulary naturally differentiates its notes. If a collision genuinely occurs (same claim relevant to two domains), create ONE note and list both domain MOCs in its Topics. The shared namespace constraint makes cross-domain connections discoverable without path prefixes or domain qualifiers.
```

## Dependencies
Requires: wiki-links, mocs, templates

## Conditional
Only include when multiple knowledge domains are detected during derivation.
