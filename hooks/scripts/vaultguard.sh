#!/bin/bash
# Ars Contexta — Vault Guard
# Checks if the current directory is an Ars Contexta vault.
# Called by all hooks to skip execution in non-vault repos.
#
# Exit 0 = vault detected (safe to proceed)
# Exit 1 = not a vault (caller should exit)

MARKER=".arscontexta"

# Primary check: marker file
if [ -f "$MARKER" ]; then
  # Migrate old cat-face format to YAML config
  if grep -q '(\^\.\^)' "$MARKER" 2>/dev/null; then
    cat > "$MARKER" << 'EOF'
# Ars Contexta vault marker + config
# This file identifies the directory as an Ars Contexta vault.
# Do not delete — hooks only run when this file exists.

git: true
session_capture: true
EOF
  fi
  # Check if plugin hooks are disabled
  DISABLE_PLUGIN_HOOKS=$("$(dirname "$0")/read_config.sh" disable_plugin_hooks false)
  if [ "$DISABLE_PLUGIN_HOOKS" = "true" ]; then
    exit 1
  fi
  exit 0
fi

# Fallback: legacy vault detection + auto-migrate
if [ -f ops/config.yaml ] || [ -f .claude/hooks/session-orient.sh ]; then
  cat > "$MARKER" << 'EOF'
# Ars Contexta vault marker + config
# This file identifies the directory as an Ars Contexta vault.
# Do not delete — hooks only run when this file exists.

git: true
session_capture: true
EOF
  # Check if plugin hooks are disabled
  DISABLE_PLUGIN_HOOKS=$("$(dirname "$0")/read_config.sh" disable_plugin_hooks false)
  if [ "$DISABLE_PLUGIN_HOOKS" = "true" ]; then
    exit 1
  fi
  exit 0
fi

# Not a vault
exit 1
