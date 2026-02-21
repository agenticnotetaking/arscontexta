#!/bin/bash
# Ars Contexta — Session Orientation Hook
# Injects workspace structure, identity, methodology, and maintenance signals at session start.
# Also handles session tracking (capture moved here from Stop hook — fires once per session).

# Only run in Ars Contexta vaults
GUARD_DIR="$(cd "$(dirname "$0")" && pwd)"
"$GUARD_DIR/vaultguard.sh" || exit 0

# ── Session tracking (silent — no stdout) ──────────────────────
# SessionStart provides session info as JSON on stdin.
# Read it before any echo statements.

INPUT=$(cat)
SESSION_ID=""
if command -v jq &>/dev/null; then
  SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // empty')
else
  SESSION_ID=$(echo "$INPUT" | grep -o '"session_id":"[^"]*"' | head -1 | sed 's/"session_id":"//;s/"//')
fi

READ_CONFIG="$GUARD_DIR/read_config.sh"

if [ -n "$SESSION_ID" ] && [ "$(bash "$READ_CONFIG" "session_capture" "true")" = "true" ]; then
  TIMESTAMP=$(date -u +"%Y%m%d-%H%M%S")
  mkdir -p ops/sessions

  # Promote previous session if it's a different ID
  if [ -f ops/sessions/current.json ]; then
    if command -v jq &>/dev/null; then
      PREV_ID=$(jq -r '.id // empty' ops/sessions/current.json)
      PREV_STARTED=$(jq -r '.started // empty' ops/sessions/current.json)
    else
      PREV_ID=$(grep -o '"id":"[^"]*"' ops/sessions/current.json | head -1 | sed 's/"id":"//;s/"//')
      PREV_STARTED=$(grep -o '"started":"[^"]*"' ops/sessions/current.json | head -1 | sed 's/"started":"//;s/"//')
    fi

    if [ -n "$PREV_ID" ] && [ "$PREV_ID" != "$SESSION_ID" ]; then
      # Different session — promote previous to timestamped archive
      ARCHIVE_TS="${PREV_STARTED:-$TIMESTAMP}"
      mv ops/sessions/current.json "ops/sessions/${ARCHIVE_TS}.json"
    fi
  fi

  # Write current session
  cat > ops/sessions/current.json << EOF
{
  "id": "$SESSION_ID",
  "started": "$TIMESTAMP",
  "status": "active"
}
EOF

  # Git commit if enabled
  if [ "$(bash "$READ_CONFIG" "git" "true")" = "true" ] && git rev-parse --is-inside-work-tree &>/dev/null; then
    git add ops/sessions/ 2>/dev/null
    [ -f self/goals.md ] && git add self/goals.md 2>/dev/null
    [ -f ops/goals.md ] && git add ops/goals.md 2>/dev/null
    git commit -m "Session start: ${TIMESTAMP}" --quiet --no-verify 2>/dev/null || true
  fi
fi

# Export session ID for later hooks
if [ -n "$CLAUDE_ENV_FILE" ] && [ -n "$SESSION_ID" ]; then
  echo "export CLAUDE_SESSION_ID='$SESSION_ID'" >> "$CLAUDE_ENV_FILE"
fi

# ── Context injection (stdout → conversation) ──────────────────

echo "## Workspace Structure"
echo ""

# Show directory tree (3 levels deep, markdown files only)
if command -v tree &> /dev/null; then
    tree -L 3 --charset ascii -I '.git|node_modules' -P '*.md' .
else
    find . -name "*.md" -not -path "./.git/*" -not -path "*/node_modules/*" -maxdepth 3 | sort | while read -r file; do
        depth=$(echo "$file" | tr -cd '/' | wc -c)
        indent=$(printf '%*s' "$((depth * 2))" '')
        basename=$(basename "$file")
        echo "${indent}${basename}"
    done
fi

echo ""
echo "---"
echo ""

# Previous session state (continuity)
if [ -f ops/sessions/current.json ]; then
  echo "--- Previous session context ---"
  cat ops/sessions/current.json
  echo ""
fi

# Persistent working memory (goals)
if [ -f self/goals.md ]; then
  cat self/goals.md
  echo ""
elif [ -f ops/goals.md ]; then
  cat ops/goals.md
  echo ""
fi

# Identity (if self space enabled)
if [ -f self/identity.md ]; then
  cat self/identity.md self/methodology.md 2>/dev/null
  echo ""
fi

# Learned behavioral patterns (recent methodology notes)
for f in $(ls -t ops/methodology/*.md 2>/dev/null | head -5); do
  head -3 "$f"
done

# Condition-based maintenance signals
OBS_COUNT=$(ls -1 ops/observations/*.md 2>/dev/null | wc -l | tr -d ' ')
TENS_COUNT=$(ls -1 ops/tensions/*.md 2>/dev/null | wc -l | tr -d ' ')
SESS_COUNT=$(ls -1 ops/sessions/*.json 2>/dev/null | grep -cv current 2>/dev/null || echo 0)
INBOX_COUNT=$(ls -1 inbox/*.md 2>/dev/null | wc -l | tr -d ' ')

if [ "$OBS_COUNT" -ge 10 ]; then
  echo "CONDITION: $OBS_COUNT pending observations. Consider /rethink."
fi
if [ "$TENS_COUNT" -ge 5 ]; then
  echo "CONDITION: $TENS_COUNT unresolved tensions. Consider /rethink."
fi
if [ "$SESS_COUNT" -ge 5 ]; then
  echo "CONDITION: $SESS_COUNT unprocessed sessions. Consider /remember --mine-sessions."
fi
if [ "$INBOX_COUNT" -ge 3 ]; then
  echo "CONDITION: $INBOX_COUNT items in inbox. Consider /reduce or /pipeline."
fi

# Workboard reconciliation
if [ -f ops/scripts/reconcile.sh ]; then
  bash ops/scripts/reconcile.sh --compact 2>/dev/null
fi

# Methodology staleness check (Rule Zero)
if [ -d ops/methodology ] && [ -f ops/config.yaml ]; then
  # Detect platform for stat syntax: Linux uses -c %Y, macOS uses -f %m.
  # Must try Linux first — on Linux, stat -f means "filesystem stats" and
  # succeeds with wrong output instead of failing, breaking the || fallback.
  if stat -c %Y ops/config.yaml &>/dev/null 2>&1; then
    _STAT_FMT() { stat -c %Y "$1" 2>/dev/null || echo 0; }
  elif stat -f %m ops/config.yaml &>/dev/null 2>&1; then
    _STAT_FMT() { stat -f %m "$1" 2>/dev/null || echo 0; }
  else
    _STAT_FMT() { echo 0; }
  fi

  CONFIG_MTIME=$(_STAT_FMT ops/config.yaml)
  NEWEST_METH=$(ls -t ops/methodology/*.md 2>/dev/null | head -1)
  if [ -n "$NEWEST_METH" ]; then
    METH_MTIME=$(_STAT_FMT "$NEWEST_METH")
    DAYS_STALE=$(( (CONFIG_MTIME - METH_MTIME) / 86400 ))
    if [ "$DAYS_STALE" -ge 30 ]; then
      echo "CONDITION: Methodology notes are ${DAYS_STALE}+ days behind config changes. Consider /rethink drift."
    fi
  fi
  unset -f _STAT_FMT
fi
