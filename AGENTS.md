<!-- BEGIN GENERATED AGENT GUIDANCE -->
# Agent Instructions

Prefer `lsp_navigation` for definitions, references, renames, code actions, hover, and call hierarchy; use `lsp_diagnostics` before builds.

Prefer `ast_grep_replace` for single-token/line structural replacements; use `edit` for complex multi-line changes.

Swift: empty/failed LSP results are inconclusive. Fall back to readmap, `ast-grep`, `ffgrep`/exact search, and Semble. When removing/renaming parameters, search tests and other targets before building. For Xcode projects, prefer `xcodebuild -quiet` with focused `-only-testing` selectors, do not chain `xcodebuild` with other commands, and summarize only the relevant failure lines instead of dumping full logs.

## Code Search

Use Semble for behavior/intent discovery: `semble search "<query>" .`. Use `fffind`/`ffgrep` for fast fuzzy/exact search. Prefer LSP or `ast_grep_search` for exact callsites, renames, references, and structural edits.

## Non-Interactive Shell Commands

Avoid hangs from aliased prompts. Use force/non-interactive flags for file and remote operations: `cp -f`, `mv -f`, `rm -f`, `rm -rf`, `cp -rf`, `scp -o BatchMode=yes`, `ssh -o BatchMode=yes`, `apt-get -y`; set `HOMEBREW_NO_AUTO_UPDATE=1` for `brew`.

<!-- END GENERATED AGENT GUIDANCE -->

<!-- BEGIN REPO SPECIFIC -->
<!--
Add project-specific notes here. This section is preserved by agent-guidance/build-agents.sh.

## Build & Test

## Architecture Overview

## Conventions & Patterns
-->
<!-- END REPO SPECIFIC -->
