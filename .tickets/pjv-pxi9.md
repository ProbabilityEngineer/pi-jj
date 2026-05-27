---
id: pjv-pxi9
status: closed
deps: []
links: []
created: 2026-05-27T22:16:41Z
type: feature
priority: 1
assignee: ProbabilityEngineer
---
# Simplify jj slash command surface

Keep only /jj-init, /jj-status, and renamed /jj-align-push; remove thin wrapper commands that overlap with shell jj usage.

## Acceptance Criteria

Commands exposed are /jj-init, /jj-status, /jj-align-push; /jj-backup is renamed or removed; README reflects reduced command surface; TypeScript check passes.

