# Agent Instructions

<!-- pi-jj-vcs:jjtips:start -->
## Jujutsu Version Control
- Use JJ for local work: `jj status`, `jj diff`, `jj log`, `jj describe -m "message"`, `jj new --no-edit`, `jj op log`, and `jj undo`.
- Do not use Git staged-index workflows: no `git add`, `git commit`, `git diff --cached`, or `git pull --rebase`.
- After completing coherent agent-owned work, run `jj describe -m "message"` and `jj new --no-edit`; `@` should be empty and `@-` should be the completed change.
- Before pushing, ensure the target bookmark/branch points to the completed change (`@-`), not the empty `@`; after push, `@-` should show `<branch> <branch>@origin`.
- If `jj status` is dirty before you start, treat it as pre-existing user work unless explicitly told to continue it.
- For off-machine backup, prefer `/jj-backup [branch]`; use `/jj-bookmark <branch> [rev]` only for intentional bookmark alignment.
<!-- pi-jj-vcs:jjtips:end -->
