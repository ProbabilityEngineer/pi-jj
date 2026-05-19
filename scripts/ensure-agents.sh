#!/usr/bin/env bash
set -euo pipefail

repo="${1:-.}"
repo="$(cd "$repo" && pwd)"

if [[ -f "$repo/AGENTS.md" ]]; then
  echo "AGENTS.md already exists at $repo/AGENTS.md"
  exit 0
fi

/Users/sam/git/agents/pi-agent-guidance/build-agents.sh "$repo"
