#!/usr/bin/env bash
# Explicit manual GitHub Pages publication. Never changes the working branch.
set -euo pipefail
cd "$(dirname "$0")"
trap 'echo "Deployment stopped. The working tree and previous deployment were not reset." >&2' ERR
command -v pnpm >/dev/null
command -v git >/dev/null
git rev-parse --is-inside-work-tree >/dev/null
if [[ -n "$(git status --porcelain)" ]]; then
  echo "Commit or preserve local changes before deploying a reviewed revision." >&2
  exit 1
fi
pnpm install --frozen-lockfile
pnpm lint
pnpm check
pnpm test
pnpm audit --audit-level=moderate
pnpm test:e2e
[[ -f dist/index.html ]]
# The publisher uses its own temporary clone and a normal push.
node scripts/publish.mjs
echo "GitHub Pages publication completed."
