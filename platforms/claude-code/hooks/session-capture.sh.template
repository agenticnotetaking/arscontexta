#!/bin/bash
# Ars Contexta — Session Capture Hook (Claude Code)
# Event: Stop
# Purpose: Capture session state on session end so nothing is lost
#          between sessions and the next session can resume context.
#
# This is a TEMPLATE. During /init, {{VARIABLE}} markers are replaced
# with values from the derivation manifest.
#
# Session capture is a kernel INVARIANT — it runs every session.
# This is not optional infrastructure that activates at a threshold.

TIMESTAMP=$(date -u +"%Y%m%d-%H%M%S")

# ─────────────────────────────────────────────
# 1. Ensure session directory exists
# ─────────────────────────────────────────────
mkdir -p ops/sessions

# ─────────────────────────────────────────────
# 2. Save session state
# ─────────────────────────────────────────────
# Capture conversation ID and end timestamp.
# The session file becomes a target for /remember --mine-sessions.

if [ -n "$CLAUDE_CONVERSATION_ID" ]; then
  cat > "ops/sessions/${TIMESTAMP}.json" << EOF
{
  "id": "${CLAUDE_CONVERSATION_ID}",
  "ended": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "status": "completed"
}
EOF
fi

# ─────────────────────────────────────────────
# 3. Persist current session as handoff state
# ─────────────────────────────────────────────
# Copy to current.json so the next session-orient hook
# can load it for continuity.

if [ -f "ops/sessions/${TIMESTAMP}.json" ]; then
  cp "ops/sessions/${TIMESTAMP}.json" ops/sessions/current.json
fi

# ─────────────────────────────────────────────
# 4. Stage and commit session artifacts
# ─────────────────────────────────────────────
# Auto-commit changes to preserve work. This ensures
# nothing is lost even if the user forgets to push.

if git rev-parse --is-inside-work-tree &>/dev/null; then
  # Stage session-relevant directories
  git add ops/sessions/ 2>/dev/null
  git add ops/observations/ 2>/dev/null
  git add ops/tensions/ 2>/dev/null
  git add ops/methodology/ 2>/dev/null

  # Stage goals (check both locations)
  [ -f self/goals.md ] && git add self/goals.md 2>/dev/null
  [ -f ops/goals.md ] && git add ops/goals.md 2>/dev/null

  # Stage notes and inbox changes
  git add {{NOTES_DIR:-notes}}/ 2>/dev/null
  git add {{INBOX_DIR:-inbox}}/ 2>/dev/null

  # Stage any MOC updates
  git add {{NOTES_DIR:-notes}}/index.md 2>/dev/null

  # Commit with auto-generated message
  git commit -m "Session capture: ${TIMESTAMP}" --quiet --no-verify 2>/dev/null
fi
