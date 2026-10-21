"use client";

import type { ReactNode } from "react";
import { Area, C, Show, T } from "../r11/kit";

// workflows-what: a dynamic workflow moves the plan out of Claude's context
// and into a script. Follows topologies (flat, hierarchy, specialists).
// Sources (Claude Code docs, read 21 Oct 2026):
// - "Orchestrate subagents at scale with dynamic workflows": "a JavaScript
//   script that orchestrates many subagents at once. Claude writes the script
//   ... and a runtime executes it in the background"; "A workflow moves the
//   plan into code"; agent() / pipeline() / parallel(); intermediate results
//   "stay in script variables"; comparison table (who decides what runs next,
//   where intermediate results live, scale, interruption); "Reach for a
//   workflow when a task needs more agents than one conversation can
//   coordinate ... a codebase-wide bug sweep, a 500-file migration, a research
//   question that needs sources cross-checked".
// - "Run agents in parallel": "A script holds the plan instead of Claude's
//   turn-by-turn judgment".
// Subagents and skills share one column. The docs table gives subagents
// "Claude, turn by turn" and skills "Claude, following the prompt", so the
// merged cell says just "Claude"; results (Claude's context), scale and
// interruption match. Workflows: "Resumable in the same session" (a fresh
// session starts the run over), hence "resumable in-session".
// Daniel's loop: this deck's round 2 build (12 cloud sessions, 3 audits, a fix
// round, 3 re-audits), hand-orchestrated; see r16/Topologies.

const MONO = "var(--font-geist-mono), monospace";

const Lbl = ({ x, y, children, anchor = "middle", fill = C.muted }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end"; fill?: string }) => (
  <text className="t-label" x={x} y={y} textAnchor={anchor} fill={fill} fontSize="16" fontFamily={MONO}>{children}</text>
);

function ScriptPicture() {
  const dots = Array.from({ length: 24 }, (_, i) => [312 + (i % 6) * 30, 62 + Math.floor(i / 6) * 30]);
  return (
    <svg viewBox="0 0 540 230" style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="Claude writes a script; a runtime runs many agents in the background and hands back only the final answer">
      <defs>
        <marker id="r18-wf-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.muted} />
        </marker>
      </defs>
      {/* Claude and its context */}
      <rect x={10} y={40} width={120} height={130} rx="10" fill={C.card} stroke={C.rule} strokeWidth="1.5" />
      <circle cx={70} cy={88} r={20} fill={C.ink} />
      <Lbl x={70} y={135}>Claude</Lbl>
      <Lbl x={70} y={156} fill={C.faint}>context</Lbl>
      {/* the script */}
      <rect x={165} y={60} width={100} height={92} rx="6" fill="#fff" stroke={C.accent} strokeWidth="2" />
      <Lbl x={175} y={86} anchor="start" fill={C.accent}>agent()</Lbl>
      <Lbl x={175} y={110} anchor="start" fill={C.accent}>pipeline()</Lbl>
      <Lbl x={175} y={134} anchor="start" fill={C.accent}>parallel()</Lbl>
      <Lbl x={215} y={48} fill={C.accent}>script</Lbl>
      <line x1={130} y1={92} x2={160} y2={92} stroke={C.muted} strokeWidth="1.5" markerEnd="url(#r18-wf-arrow)" />
      {/* the runtime and its agents */}
      <rect x={290} y={36} width={240} height={150} rx="10" fill="none" stroke={C.rule} strokeWidth="1.5" strokeDasharray="5 4" />
      <line x1={265} y1={106} x2={286} y2={106} stroke={C.muted} strokeWidth="1.5" markerEnd="url(#r18-wf-arrow)" />
      {dots.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={9} fill={C.accent} />)}
      <Lbl x={410} y={26}>runtime, in the background</Lbl>
      <Lbl x={410} y={176} fill={C.warm}>results in script variables</Lbl>
      {/* only the answer comes back */}
      <path d="M 410 190 L 410 212 L 70 212 L 70 174" fill="none" stroke={C.muted} strokeWidth="1.5" markerEnd="url(#r18-wf-arrow)" />
      <Lbl x={240} y={206}>final answer only</Lbl>
    </svg>
  );
}

// Columns follow the docs' table; subagents and skills merged (see note above).
const COLS = ["subagents, skills", "agent teams", "workflows"];
const ROWS: { h: string; c: [string, string, string] }[] = [
  { h: "who decides what runs next", c: ["Claude", "lead agent, turn by turn", "the script"] },
  { h: "where results live", c: ["Claude’s context", "a shared task list", "script variables"] },
  { h: "scale (tasks, peers, agents)", c: ["a few per turn", "a handful", "dozens to hundreds"] },
  { h: "if interrupted", c: ["restarts the turn", "teammates keep running", "resumable in-session"] },
];

function Compare() {
  const cell = { padding: "0.5vh 0.8vw", borderTop: `1px solid ${C.rule}` } as const;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr 1fr", alignItems: "baseline" }}>
      <div className="t-label" style={{ ...T.label, ...T.mono, color: C.muted }}>who holds the plan?</div>
      {COLS.map((c, i) => (
        <div key={c} className="t-label" style={{ ...T.label, ...T.mono, color: i === 2 ? C.accent : C.muted, padding: "0 0.8vw 0.6vh" }}>{c}</div>
      ))}
      {ROWS.map((r) => (
        <div key={r.h} style={{ display: "contents" }}>
          <div className="t-label" style={{ ...T.label, ...T.mono, color: C.muted, ...cell, paddingLeft: 0 }}>{r.h}</div>
          {r.c.map((v, i) => (
            <div key={v} style={{ ...T.body, ...cell, color: i === 2 ? C.accent : C.ink, fontWeight: i === 2 ? 600 : 400, background: i === 2 ? "rgba(3,105,161,0.06)" : undefined }}>{v}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function WorkflowsWhat({ step }: { step: number }) {
  return (
    <Area style={{ justifyContent: "center", gap: "3.5vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", columnGap: "3vw", alignItems: "center" }}>
        <ScriptPicture />
        <div className="relative" style={{ minHeight: "8.5em" }}>
          <Show when={step < 2} className="absolute inset-0" style={{ ...T.big, color: C.ink, display: "flex", alignItems: "center" }}>
            <span>Claude writes a script and a runtime runs it. The plan lives in code, not in Claude’s context.</span>
          </Show>
          <Show when={step >= 2} className="absolute inset-0" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.6vh" }}>
            <div style={{ ...T.body, color: C.ink }}>
              Reach for one when a job outgrows one conversation: a repo-wide audit, a 500-file migration, cross-checked research.
            </div>
            <div style={{ ...T.body, color: C.ink, borderLeft: `4px solid ${C.warm}`, paddingLeft: "1vw" }}>
              I ran this deck’s build loop by hand: fan out, audit, fix, re-audit. A workflow makes it rerunnable.
            </div>
          </Show>
        </div>
      </div>
      <Show when={step >= 1}>
        <Compare />
      </Show>
    </Area>
  );
}
