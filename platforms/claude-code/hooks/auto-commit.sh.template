#!/bin/bash
# Ars Contexta — Auto-Commit Hook (Claude Code)
# Event: PostToolUse (Write)
# Purpose: Commit changes after writes to keep the vault in version control.
#          Ensures no work is lost between sessions or after crashes.
#
# This is a TEMPLATE. During /init, {{VARIABLE}} markers are replaced
# with values from the derivation manifest.
#
# This hook runs AFTER write-validate (both are PostToolUse Write hooks;
# order is determined by position in hooks.json).

# ─────────────────────────────────────────────
# 1. Check if inside a git repository
# ─────────────────────────────────────────────
if ! git rev-parse --is-inside-work-tree &>/dev/null; then
  exit 0
fi

# ─────────────────────────────────────────────
# 2. Stage the written file
# ─────────────────────────────────────────────
WRITTEN_FILE="${TOOL_INPUT_PATH:-$CLAUDE_TOOL_INPUT_PATH}"

if [ -z "$WRITTEN_FILE" ] || [ ! -f "$WRITTEN_FILE" ]; then
  exit 0
fi

git add "$WRITTEN_FILE" 2>/dev/null

# ─────────────────────────────────────────────
# 3. Commit with descriptive message
# ─────────────────────────────────────────────
# Use the filename as the commit message for quick identification.
# --no-verify skips pre-commit hooks to keep auto-commits fast.

BASENAME=$(basename "$WRITTEN_FILE")
git commit -m "Auto: ${BASENAME}" --no-verify --quiet 2>/dev/null
