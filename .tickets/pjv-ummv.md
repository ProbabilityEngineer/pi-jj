---
id: pjv-ummv
status: closed
deps: []
links: []
created: 2026-05-27T22:16:48Z
type: feature
priority: 1
assignee: ProbabilityEngineer
---
# Add agent-callable jj_vcs alignment tool

Add one compact tool for agents to check jj/Git publish alignment and optionally perform the safe align/push workflow.

## Acceptance Criteria

Tool exposes action enum with at least status and align_push; status returns model-visible alignment details; align_push performs guarded bookmark/export/attach/push/import workflow; TypeScript check passes.

