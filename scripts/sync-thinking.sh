#!/usr/bin/env bash
#
# sync-thinking.sh
# Syncs the research graph from the vault into the bundled methodology/ directory.
# Tracks added/removed/changed files and records the vault's git hash.
#
# Usage:
#   ./scripts/sync-thinking.sh                      # uses default vault path
#   VAULT_PATH=/path/to/vault ./scripts/sync-thinking.sh  # custom vault path
#   ./scripts/sync-thinking.sh --dry-run             # preview changes without copying

set -euo pipefail

# --- Configuration ---
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
VAULT_PATH="${VAULT_PATH:?Set VAULT_PATH to the vault root directory}"
SOURCE_DIR="$VAULT_PATH/methodology"
DEST_DIR="$PROJECT_ROOT/methodology"
HASH_FILE="$PROJECT_ROOT/methodology/.vault-sync-hash"
DRY_RUN=false

if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
  echo "=== DRY RUN — no files will be modified ==="
  echo ""
fi

# --- Validate source ---
if [[ ! -d "$SOURCE_DIR" ]]; then
  echo "ERROR: Source directory not found: $SOURCE_DIR"
  echo "Set VAULT_PATH to the vault root directory."
  exit 1
fi

# --- Ensure destination exists ---
if [[ "$DRY_RUN" == false ]]; then
  mkdir -p "$DEST_DIR"
fi

# --- Get vault git hash ---
VAULT_HASH="(not a git repo)"
if git -C "$VAULT_PATH" rev-parse --git-dir &>/dev/null; then
  VAULT_HASH=$(git -C "$VAULT_PATH" rev-parse --short HEAD)
  VAULT_DIRTY=""
  if ! git -C "$VAULT_PATH" diff --quiet 2>/dev/null; then
    VAULT_DIRTY="-dirty"
  fi
  VAULT_HASH="${VAULT_HASH}${VAULT_DIRTY}"
fi

# --- Previous hash ---
PREV_HASH="(none)"
if [[ -f "$HASH_FILE" ]]; then
  PREV_HASH=$(cat "$HASH_FILE")
fi

# --- Diff: find added, removed, changed ---
# Build file lists (basenames only)
SOURCE_FILES=$(ls -1 "$SOURCE_DIR"/*.md 2>/dev/null | xargs -I{} basename {} | sort)
DEST_FILES=$(ls -1 "$DEST_DIR"/*.md 2>/dev/null | xargs -I{} basename {} | sort)

ADDED=$(comm -23 <(echo "$SOURCE_FILES") <(echo "$DEST_FILES"))
REMOVED=$(comm -13 <(echo "$SOURCE_FILES") <(echo "$DEST_FILES"))
COMMON=$(comm -12 <(echo "$SOURCE_FILES") <(echo "$DEST_FILES"))

# Check which common files have changed
CHANGED=""
CHANGED_COUNT=0
while IFS= read -r file; do
  [[ -z "$file" ]] && continue
  if ! diff -q "$SOURCE_DIR/$file" "$DEST_DIR/$file" &>/dev/null; then
    CHANGED="${CHANGED}${file}"$'\n'
    ((CHANGED_COUNT++))
  fi
done <<< "$COMMON"

if [[ -z "$ADDED" ]]; then
  ADDED_COUNT=0
else
  ADDED_COUNT=$(echo "$ADDED" | wc -l | tr -d ' ')
fi

if [[ -z "$REMOVED" ]]; then
  REMOVED_COUNT=0
else
  REMOVED_COUNT=$(echo "$REMOVED" | wc -l | tr -d ' ')
fi

# --- Report ---
echo "Sync: vault/01_thinking/ -> thinking/"
echo "Vault hash: $VAULT_HASH (previous: $PREV_HASH)"
echo ""
SOURCE_COUNT=$(echo "$SOURCE_FILES" | wc -l | tr -d ' ')
DEST_COUNT=$(echo "$DEST_FILES" | wc -l | tr -d ' ')
echo "Source files:  $SOURCE_COUNT"
echo "Dest files:    $DEST_COUNT"
echo ""

if [[ "$ADDED_COUNT" -gt 0 ]]; then
  echo "ADDED ($ADDED_COUNT):"
  echo "$ADDED" | sed 's/^/  + /'
  echo ""
fi

if [[ "$REMOVED_COUNT" -gt 0 ]]; then
  echo "REMOVED ($REMOVED_COUNT):"
  echo "$REMOVED" | sed 's/^/  - /'
  echo ""
fi

if [[ "$CHANGED_COUNT" -gt 0 ]]; then
  echo "CHANGED ($CHANGED_COUNT):"
  echo "$CHANGED" | grep -v '^$' | sed 's/^/  ~ /'
  echo ""
fi

TOTAL_CHANGES=$((ADDED_COUNT + REMOVED_COUNT + CHANGED_COUNT))
if [[ "$TOTAL_CHANGES" -eq 0 ]]; then
  echo "No changes detected. Already in sync."
  exit 0
fi

echo "Total changes: $TOTAL_CHANGES"
echo ""

# --- Apply changes ---
if [[ "$DRY_RUN" == true ]]; then
  echo "Dry run complete. Re-run without --dry-run to apply."
  exit 0
fi

# Copy all source files (overwrites changed, adds new)
cp "$SOURCE_DIR"/*.md "$DEST_DIR/"

# Remove files that no longer exist in source
while IFS= read -r file; do
  [[ -z "$file" ]] && continue
  rm "$DEST_DIR/$file"
  echo "Removed: $file"
done <<< "$REMOVED"

# Record vault hash
echo "$VAULT_HASH" > "$HASH_FILE"

FINAL_COUNT=$(ls -1 "$DEST_DIR"/*.md 2>/dev/null | wc -l | tr -d ' ')
echo "Sync complete. $FINAL_COUNT files in thinking/. Vault hash: $VAULT_HASH"
