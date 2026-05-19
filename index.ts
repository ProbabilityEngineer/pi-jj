import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { execFileSync } from "node:child_process";

function run(cmd: string, args: string[], cwd: string): string | null {
  try {
    return execFileSync(cmd, args, {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      timeout: 1500,
    }).trim();
  } catch {
    return null;
  }
}

function runJj(args: string[], cwd: string): string | null {
  return run("jj", args, cwd);
}

function formatChangeSummary(added: number, modified: number, removed: number): string {
  const parts: string[] = [];
  if (added) parts.push(`+${added}`);
  if (modified) parts.push(`~${modified}`);
  if (removed) parts.push(`-${removed}`);
  return parts.length > 0 ? parts.join("") : "clean";
}

function buildJjStatus(cwd: string): { text: string; dirty: boolean } | undefined {
  const bookmark = runJj(["log", "-r", "@", "--no-graph", "-T", "bookmarks"], cwd) ?? "";
  const rawDescription = runJj(["log", "-r", "@", "--no-graph", "-T", "description"], cwd);
  const description = rawDescription && rawDescription.trim() ? rawDescription.trim().split(/\r?\n/)[0] : "no descrp";
  const status = runJj(["status", "--no-pager"], cwd) ?? "";

  let added = 0;
  let modified = 0;
  let removed = 0;
  for (const line of status.split(/\r?\n/)) {
    if (line.startsWith("A ")) added += 1;
    else if (line.startsWith("M ")) modified += 1;
    else if (line.startsWith("R ")) removed += 1;
  }

  return {
    text: `${bookmark || "no bkmrk"}·${description}·${formatChangeSummary(added, modified, removed)}`,
    dirty: added + modified + removed > 0,
  };
}

export default function repoStatus(pi: ExtensionAPI) {
  let lastRendered: string | undefined;

  const refresh = (ctx: { cwd: string; hasUI: boolean; ui: { setStatus: (key: string, text: string | undefined) => void; theme: { fg: (color: string, text: string) => string } } }) => {
    if (!ctx.hasUI) return;

    const hasJj = runJj(["--version"], ctx.cwd) !== null;
    const next = hasJj ? buildJjStatus(ctx.cwd) : { text: "jj install needed", dirty: false };
    const rendered = next ? (next.dirty ? ctx.ui.theme.fg("warning", next.text) : `\x1b[38;5;71m${next.text}\x1b[39m`) : undefined;

    if (rendered === lastRendered) return;
    lastRendered = rendered;
    ctx.ui.setStatus("jj-status", rendered);
  };

  pi.on("session_start", async (_event, ctx) => refresh(ctx));
  pi.on("turn_end", async (_event, ctx) => refresh(ctx));
  pi.on("tool_result", async (event, ctx) => {
    if (["edit", "write", "bash"].includes(event.toolName)) refresh(ctx);
  });
  pi.on("session_shutdown", async (_event, ctx) => {
    if (!ctx.hasUI) return;
    ctx.ui.setStatus("jj-status", undefined);
  });
}
