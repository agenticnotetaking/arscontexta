#!/bin/bash
# Ars Contexta — Config Reader
# Reads values from .arscontexta vault marker (which doubles as config).
# Usage: read_config.sh <key> [default]
# Returns: value for key, or default if key/file missing.
# Default default: "true" (preserves existing behaviour when no config exists).
#
# Supported keys: git, session_capture, disable_plugin_hooks
#
# Migration: old marker files (cat face text) have no YAML keys,
# so grep returns nothing → defaults apply → behaviour unchanged.

KEY="$1"
DEFAULT="${2:-true}"

if [ -z "$KEY" ]; then
  echo "$DEFAULT"
  exit 0
fi

# Find project root — use CLAUDE_PROJECT_DIR if set, otherwise walk up
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
CONFIG_FILE="$PROJECT_DIR/.arscontexta"

if [ ! -f "$CONFIG_FILE" ]; then
  echo "$DEFAULT"
  exit 0
fi

# Simple YAML key-value reader (top-level scalar keys only)
# Handles: key: value, key: "value", key: 'value'
VALUE=$(grep -E "^${KEY}:" "$CONFIG_FILE" 2>/dev/null | head -1 | sed 's/^[^:]*:[[:space:]]*//' | sed 's/^["'"'"']//;s/["'"'"']$//' | sed 's/[[:space:]]*$//')

if [ -z "$VALUE" ]; then
  echo "$DEFAULT"
else
  echo "$VALUE"
fi
