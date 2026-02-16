# Feature: Helper Functions

## Context File Block

```markdown
## Helper Functions — Essential Graph Infrastructure

Your vault ships with utility scripts for safe graph maintenance. These are not afterthoughts — they are essential infrastructure that prevents common failure modes when working with a wiki-linked knowledge graph.

### Safe Rename

Never rename a {DOMAIN:note} manually. Manual renames break every wiki link that references the old title, silently degrading the graph. Use the rename script:

```bash
./ops/scripts/rename-note.sh "old title" "new title"
```

The script:
1. Finds the file by name (searches the entire vault)
2. Renames with `git mv` (preserves history)
3. Updates ALL wiki links across every file in the vault
4. Verifies no broken links remain after the rename

This is the only safe way to rename. Wiki links resolve by filename — when a filename changes, every `[[old title]]` in the vault becomes a dangling link unless updated. The script handles this atomically.

### Graph Maintenance Utilities

Scripts for detecting and resolving common graph health issues:

**Orphan detection** — Find {DOMAIN:notes} with no incoming links. Orphaned {DOMAIN:notes} are invisible to traversal — they exist but nobody can reach them:
```bash
./ops/scripts/orphan-notes.sh
```
Every orphan is either a gap (needs connections) or stale (needs archiving). Neither is acceptable as a permanent state.

**Dangling link detection** — Find wiki links that point to non-existent {DOMAIN:notes}:
```bash
./ops/scripts/dangling-links.sh
```
Dangling links are demand signals — they tell you what {DOMAIN:notes} should exist but do not. Either create the missing {DOMAIN:note} or fix the link.

**Backlink count** — Count incoming links to a specific {DOMAIN:note}:
```bash
./ops/scripts/backlinks.sh "note title"
```
High backlink counts identify hub {DOMAIN:notes} — central concepts that many other {DOMAIN:notes} reference. Low counts on important {DOMAIN:notes} suggest connection-finding opportunities.

**Link density** — Measure the average number of links per {DOMAIN:note}:
```bash
./ops/scripts/link-density.sh
```
Healthy graphs maintain an average of 3+ outgoing links per {DOMAIN:note}. Below that threshold, the graph is sparse and traversal becomes unreliable.

**Schema validation** — Validate all {DOMAIN:notes} against their template schemas:
```bash
./ops/scripts/validate-schema.sh
```
Checks required fields, enum values, and constraints. Reports violations by severity (PASS, WARN, FAIL).

### Batch Operations

When processing multiple {DOMAIN:notes}, batch utilities streamline common operations:

- **Queue status** — View pending tasks, phase distribution, archivable batches, and stalled batches:
  ```bash
  ./ops/scripts/queue-status.sh
  ```

- **Workboard reconciliation** — Run condition-based invariant checks, surface violated conditions as tasks, and auto-close satisfied conditions:
  ```bash
  ./ops/scripts/reconcile.sh
  ```
  This is idempotent — safe to run any number of times. It only reads state, never modifies your {DOMAIN:notes} or graph.

### Domain-Specific Helpers

As your vault grows, you may create additional utility scripts for domain-specific operations. Place them in `ops/scripts/` and document their usage here. Common extensions include:

- Export scripts for sharing subsets of the graph
- Import scripts for bulk ingestion from external sources
- Report generators for domain-specific analytics
- Migration scripts for schema evolution across existing {DOMAIN:notes}

The pattern: if you find yourself running the same sequence of commands repeatedly, extract it into a script. Scripts encode methodology the same way skills do — they make repeatable operations reliable and consistent.

### When to Use Helpers vs Skills

Helpers are lightweight, stateless utilities — they inspect or modify the graph without pipeline state. Skills are pipeline-aware workflows with quality gates, handoff protocols, and queue integration. Use helpers for quick checks and mechanical operations. Use skills for knowledge work that requires judgment and quality verification.
```

## Dependencies
None — helper functions are standalone utilities.
