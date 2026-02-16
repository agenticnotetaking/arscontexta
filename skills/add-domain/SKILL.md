---
name: add-domain
description: Add a new knowledge domain to your existing system. Derives domain-specific configuration through conversation, generates domain folders, templates, and vocabulary while preserving and connecting to your existing architecture.
context: fork
model: opus
allowed-tools: Read, Write, Edit, Grep, Glob, Bash, AskUserQuestion
argument-hint: "[domain name or description, e.g. 'therapy sessions' or 'creative writing']"
---

You are extending an existing knowledge system with a new domain. This is composition, not replacement. The new domain must coexist with existing domains while maintaining its own vocabulary, schema, and processing patterns. The shared graph (wiki links, hub MOC, description fields) connects everything.

## Your Task

Add a new knowledge domain: **$ARGUMENTS**

## Reference Files

Read these during derivation phases:

**Composition rules:**
- `${CLAUDE_PLUGIN_ROOT}/reference/derivation-validation.md` -- Test 4 (Multi-Domain Composition) validates the pattern
- `${CLAUDE_PLUGIN_ROOT}/reference/three-spaces.md` -- three-space architecture (shared across domains)
- `${CLAUDE_PLUGIN_ROOT}/reference/interaction-constraints.md` -- coherence validation for domain config

**Domain configuration:**
- `${CLAUDE_PLUGIN_ROOT}/reference/vocabulary-transforms.md` -- domain-native term mapping
- `${CLAUDE_PLUGIN_ROOT}/reference/tradition-presets.md` -- pre-validated domain configurations
- `${CLAUDE_PLUGIN_ROOT}/reference/use-case-presets.md` -- 3 presets with configurations
- `${CLAUDE_PLUGIN_ROOT}/reference/dimension-claim-map.md` -- research backing for dimension positions
- `${CLAUDE_PLUGIN_ROOT}/reference/failure-modes.md` -- domain vulnerability matrix

**Validation:**
- `${CLAUDE_PLUGIN_ROOT}/reference/kernel.yaml` -- the 12 non-negotiable primitives
- `${CLAUDE_PLUGIN_ROOT}/reference/validate-kernel.sh` -- kernel validation script

---

## PHASE 1: Scan Existing System

Automated. Understand what exists before adding to it.

### 1a. Read system configuration

Read `ops/derivation.md` for:
- Current dimension positions
- Vocabulary mapping
- Platform and automation level
- Active feature blocks

Read `ops/config.yaml` for live configuration values.

### 1b. Inventory existing domains

Identify all current knowledge domains:
- Primary notes folder and its domain vocabulary
- Any existing secondary domains (folders, templates, MOCs)
- Schema fields in use per domain

### 1c. Identify dimension types

Classify each of the 8 dimensions as system-level or domain-adjustable:

| Dimension | Type | Rationale |
|-----------|------|-----------|
| Organization | system-level | Flat/hierarchical applies to the whole workspace |
| Automation | system-level | Hooks and skills are workspace-wide infrastructure |
| Navigation depth | system-level | Hub MOC structure is shared |
| Granularity | domain-adjustable | Different domains may need different granularity |
| Processing | domain-adjustable | Research needs heavy, relationships need light |
| Maintenance | domain-adjustable | Different condition thresholds per domain growth rate |
| Schema | domain-adjustable | Domain-specific fields vary |
| Linking | domain-adjustable | Some domains need semantic search, others don't |

System-level dimensions are fixed by the existing system. Domain-adjustable dimensions can vary for the new domain.

---

## PHASE 2: Conversation

1-3 conversation turns to understand the new domain. Use AskUserQuestion for each turn.

### Opening question

Ask ONE focused question about the new domain:

**"Tell me about [domain hint from $ARGUMENTS] -- what kinds of things will you track, and how does this relate to your existing [current domain vocabulary] work?"**

The second half is critical: understanding the relationship between domains drives composition decisions.

### Signal extraction

As the user responds, extract signals for domain-adjustable dimensions:

| Signal | Dimension | Position |
|--------|-----------|----------|
| "Quick notes about people" | Granularity | moderate |
| "Deep analysis of sessions" | Processing | heavy |
| "Just remember key moments" | Processing | light |
| "I revisit and update often" | Maintenance | tight thresholds |
| "Mostly static once captured" | Maintenance | lax thresholds |
| "Need to find patterns across entries" | Linking | explicit+implicit |

Also extract:
- **Volume estimate** -- how many notes per processing batch
- **Temporal dynamics** -- how fast does content change
- **Vocabulary** -- the user's own words for notes, processes, organization
- **Cross-domain relationship** -- how this connects to existing domain(s)

### Follow-up strategy

After the opening response, ask 1-2 follow-ups targeting:
1. Vocabulary confirmation -- "When you say [user's word], do you mean individual insights or longer entries?"
2. Cross-domain connection patterns -- "Will [new domain] notes connect to your [existing domain] notes? How?"

Do NOT ask about dimensions directly. Listen for them in natural conversation.

---

## PHASE 3: Derive Domain Configuration

### 3a. Map signals to domain-adjustable dimensions

For each adjustable dimension, determine the position for the new domain:
- User signals (highest priority)
- Closest use-case preset from `${CLAUDE_PLUGIN_ROOT}/reference/use-case-presets.md`
- Cascade from system-level dimensions

### 3b. Build vocabulary mapping

Read `${CLAUDE_PLUGIN_ROOT}/reference/vocabulary-transforms.md` for the transformation table.

Priority order:
1. User's own words from conversation
2. Use-case preset vocabulary
3. Closest reference domain blend

Build the complete mapping for the new domain:

| Universal Term | New Domain Term | Source |
|---------------|-----------------|--------|
| note | [term] | [user / preset / blend] |
| extract / reduce | [term] | [user / preset / blend] |
| connect / reflect | [term] | [user / preset / blend] |
| MOC | [term] | [user / preset / blend] |
| description | [term] | [user / preset / blend] |
| topics | [term] | [user / preset / blend] |
| inbox | [term] | [user / preset / blend] |

### 3c. Design domain-specific schema

Start from the base note schema (description, topics) and add domain-specific fields:

```yaml
_schema:
  entity_type: "[domain]-note"
  applies_to: "[domain-folder]/*.md"
  required:
    - description
    - topics
  optional:
    - [domain-specific fields based on conversation signals]
  enums:
    [field]:
      - [domain-relevant values]
```

### 3d. Collision check

**This is critical for multi-domain composition.** Verify:

1. **Filename uniqueness** -- the new domain's note titles won't collide with existing notes. Wiki links resolve by filename across the entire workspace, so every filename must be unique.

2. **Schema field names** -- new domain fields don't conflict with existing domain fields. If both domains use a field name (e.g., `type`), the enum values must be mutually exclusive or the field must have compatible semantics.

3. **Template names** -- new domain templates have distinct names from existing templates.

4. **Folder names** -- new domain folders don't collide with existing folders.

If any collisions are detected, resolve them before proceeding.

---

## PHASE 4: Check Composition Rules

Read `${CLAUDE_PLUGIN_ROOT}/reference/derivation-validation.md` (Test 4: Multi-Domain Composition) for the validated composition pattern.

Verify each composition rule:

### Rule 1: Wiki links resolve unambiguously in shared namespace

All note filenames must be unique across all domains. The new domain's naming conventions must be compatible with existing ones.

### Rule 2: Hub MOC links to all domain MOCs

The existing hub MOC (index.md or equivalent) must be updated to include the new domain's entry point MOC. The hierarchy becomes:
```
hub -> existing domain MOCs
    -> new domain MOC
```

### Rule 3: Cross-domain reflect searches all notes folders

If connection finding (reflect) is active, it must search across all domains -- a note in the new domain might connect to a note in the existing domain. Semantic search collections must include the new domain folder.

### Rule 4: Domain-specific processing can coexist

If the new domain needs different processing intensity than the existing domain, the pipeline must route by note type. Heavy processing for research notes, light processing for relationship notes, etc.

### Rule 5: Context file loading is progressive

The new domain's methodology guide should load only when working in that domain, not at every session start. This prevents context bloat as domains accumulate.

### Coherence check

Run the new domain's configuration through `${CLAUDE_PLUGIN_ROOT}/reference/interaction-constraints.md`:
- Hard constraint violations between new domain config and system-level dimensions
- Soft constraint warnings specific to the new domain
- Cascade effects on existing domain(s)

---

## PHASE 5: Present Proposal

Show the user exactly what will be created and how it connects to what exists.

**Output format:**

```
=== ADD DOMAIN PROPOSAL ===
New domain: [domain name]
Vocabulary: [key term mappings]

--- What will be created ---

Folder structure:
  [domain-folder]/           <- [description]
    index.md                 <- domain hub MOC
  [domain-inbox]/            <- capture zone (if processing >= moderate)
  templates/[domain]-note.md <- note template with domain schema

--- Connections to existing system ---

- Hub MOC (index.md): add [new domain] section with link to [[domain-index]]
- Cross-domain links: [new domain] notes can link to [existing domain] notes and vice versa
- Shared infrastructure: self/, ops/, templates/ remain shared
- Semantic search: [new collection added / not needed at current volume]

--- What does NOT change ---

- Existing [domain] folder: untouched
- Existing templates: untouched
- Existing MOC hierarchy: untouched (hub gains one new link)
- self/ space: shared (methodology.md updated with multi-domain patterns)
- ops/ space: shared (derivation.md updated with domain addition)

--- Domain Configuration ---

| Dimension | Position | Rationale |
|-----------|----------|-----------|
| Granularity | [val] | [reason] |
| Processing | [val] | [reason] |
| Maintenance | [val] | [reason] |
| Schema | [val] | [reason] |
| Linking | [val] | [reason] |
| (system-level dimensions inherited from existing system) |

--- Schema Preview ---

[Show the _schema block for the new domain template]

--- Vocabulary Mapping ---

| Universal | New Domain | Existing Domain |
|-----------|-----------|-----------------|
| note | [term] | [existing term] |
| ... | ... | ... |

Would you like me to create this? I can adjust anything before generating.
=== END PROPOSAL ===
```

Wait for user approval before proceeding.

---

## PHASE 6: Generate

Create the new domain's infrastructure. Order matters -- later artifacts reference earlier ones.

### Step 1: Domain folder structure

Create the domain's notes folder and optional inbox folder:
```bash
mkdir -p [domain-folder]
mkdir -p [domain-inbox]  # if processing >= moderate
```

### Step 2: Domain note template

Create `templates/[domain]-note.md` with the derived `_schema` block, required and optional fields, and domain vocabulary in comments and examples.

### Step 3: Domain hub MOC

Create `[domain-folder]/index.md`:
```markdown
---
description: [entry point description in domain vocabulary]
type: moc
---

# index

[Orientation paragraph in domain vocabulary]

## [domain:Topics]
(topics will emerge as notes accumulate)

## Getting Started
1. Capture your first [domain:note]
2. Connect it to this hub
```

### Step 4: Domain guide

Create a domain-specific methodology document that loads when working in this domain. For Claude Code: `.claude/skills/[domain]-guide/SKILL.md` or a section in the context file. For other platforms: a standalone guide file.

The guide covers:
- How to capture in this domain
- How to process (at the derived intensity)
- When to connect cross-domain
- Domain-specific quality standards
- Domain vocabulary reference

### Step 5: Update hub MOC

Add the new domain to the existing hub MOC (index.md):
```markdown
## [New Domain Name]
- [[domain-index]] -- [description of what this domain tracks]
```

### Step 6: Update context file

Add to the context file:
- Domain routing: when working in [domain], load [domain guide]
- Vocabulary: new domain terms added to the vocabulary reference
- Processing: if different processing intensity, document the routing
- Cross-domain linking: when and how to connect across domains

### Step 7: Update self/methodology.md

Add multi-domain working patterns:
- How to switch between domains
- When to create cross-domain connections
- Processing triggers per domain

### Step 8: Update ops/derivation.md

Document the domain addition:
- New domain name and vocabulary
- Domain-adjustable dimension positions with rationale
- Composition rules verified
- Cross-domain connection patterns
- Date and context of addition

### Step 9: Update semantic search (if configured)

If qmd or equivalent is configured:
```bash
# Add new collection for domain folder
qmd update
qmd embed
```

Update `.mcp.json` or equivalent configuration to include the new collection.

### Step 10: Domain processing skills (if processing >= moderate)

If the new domain needs its own processing skills (because processing intensity or vocabulary differs from existing domain), generate domain-adapted versions of reduce/reflect/verify skills.

If the existing skills can handle multi-domain routing by note type, update them instead of creating duplicates.

---

## PHASE 7: Validate

### Kernel checks for new domain files

Run kernel validation against the new domain's files:
1. YAML frontmatter valid on all new files
2. Wiki links from new files resolve (including cross-domain links)
3. New domain MOC is reachable from hub
4. Description fields present
5. Topics footers reference the domain MOC

### Composition validation

1. **No field conflicts** -- grep all templates for field names, verify no semantic conflicts
2. **Hub reachability** -- hub MOC links to all domain MOCs, all domain MOCs link to their notes
3. **Cross-domain link test** -- create a test link from new domain to existing domain, verify it resolves
4. **Filename uniqueness** -- verify no duplicate filenames across domains:
   ```bash
   find . -name "*.md" -not -path "./.git/*" -not -name "README.md" -not -name "SKILL.md" \
     -exec basename {} \; | sort | uniq -d
   ```
5. **Vocabulary isolation** -- grep the new domain's files for existing domain vocabulary terms (should not appear)

### Report results

```
=== DOMAIN ADDITION VALIDATED ===
Domain: [name]
Files created: [N]
Hub updated: yes
Cross-domain links: functional
Filename uniqueness: verified
Schema conflicts: none

Your system now has [N] domains:
- [existing domain] ([N] notes)
- [new domain] (0 notes -- ready to start)

Next steps:
1. Capture your first [domain:note] in [domain-folder]/
2. Cross-domain connections will emerge naturally as you work
3. Run /health when /next flags maintenance issues in either domain
=== END VALIDATION ===
```

---

## Quality Standards

- **Existing content is never modified unless explicitly stated** (hub MOC update, context file update, derivation update are the only modifications to existing files)
- Each domain maintains its own vocabulary -- a therapy user never sees "claim" in their reflections folder
- Cross-domain connections are encouraged but never forced
- The hub MOC is the single unified entry point -- it must link to ALL domains
- Templates are the source of truth for each domain's schema -- never define schema in two places
- If the new domain's processing needs differ significantly, prefer separate processing paths over one-size-fits-all
- Validate that the system still passes kernel checks after the addition
- Document everything in ops/derivation.md -- future reseeds need to understand the multi-domain composition
