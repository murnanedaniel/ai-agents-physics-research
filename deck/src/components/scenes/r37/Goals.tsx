"use client";

import type { ReactNode } from "react";
import { Area, C, G, Show, T } from "../r11/kit";

// goals: the built-in goal loop in Claude Code, before the workflows scenes.
// Source: Claude Code docs, "Keep Claude working toward a goal" (code.claude.com/docs/en/goal),
// read 22 Oct 2026:
// - "/goal sets a completion condition and Claude keeps working toward it
//   without you prompting each step. After each turn, a model checks whether
//   the condition holds." Verdicts: not yet met (keeps working, reason used as
//   guidance), met (goal cleared), impossible (cleared, failed entry).
// - Evaluator = the configured small fast model; "It doesn't run commands or
//   read files independently", judges what Claude surfaced in the conversation.
// - Good condition: one measurable end state, a stated check, constraints;
//   bound it with "or stop after 20 turns". Up to 4,000 characters.
// - "auto mode removes per-tool prompts, and /goal removes per-turn prompts."
// - Compare table: /goal (next turn when previous finishes), /loop (a time
//   interval elapses), Stop hook; scheduled tasks for work independent of any
//   open session. One goal per session.
// The physics condition is my example, not from the docs.
const MONO = "var(--font-geist-mono), monospace";

const Lbl = ({ x, y, children, fill = C.muted, anchor = "middle", size = 17 }: { x: number; y: number; children: ReactNode; fill?: string; anchor?: "start" | "middle" | "end"; size?: number }) => (
  <text className="t-label" x={x} y={y} textAnchor={anchor} fontSize={size} fill={fill} fontFamily={MONO}>{children}</text>
);

function Loop({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 620 330" style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="The goal loop: Claude works a turn, a small model checks the condition against the conversation; not yet met sends Claude back for another turn; met or impossible ends the loop">
      <defs>
        <marker id="r37-goal-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.muted} />
        </marker>
      </defs>
      {/* the condition */}
      <rect x={10} y={10} width={600} height={46} rx="8" fill="#fff" stroke={C.accent} strokeWidth="2" />
      <Lbl x={26} y={40} anchor="start" fill={C.accent} size={18}>/goal &lt;a condition you can check&gt;</Lbl>
      {/* turn */}
      <rect x={30} y={120} width={170} height={90} rx="12" fill={C.card} stroke={C.ink} strokeWidth="2" />
      <text x={115} y={160} textAnchor="middle" fontSize="24" fill={C.ink}>Claude</text>
      <Lbl x={115} y={188}>works one turn</Lbl>
      <line x1={115} y1={58} x2={115} y2={114} stroke={C.muted} strokeWidth="1.5" markerEnd="url(#r37-goal-arrow)" />
      {/* evaluator */}
      <line x1={202} y1={165} x2={318} y2={165} stroke={C.muted} strokeWidth="1.5" markerEnd="url(#r37-goal-arrow)" />
      <Lbl x={260} y={155}>transcript</Lbl>
      <rect x={322} y={120} width={240} height={90} rx="12" fill="#fff" stroke={C.warm} strokeWidth="2" />
      <text x={442} y={160} textAnchor="middle" fontSize="22" fill={C.warm}>a small model</text>
      <Lbl x={442} y={188}>checks the condition</Lbl>
      {/* not yet met: go round */}
      <path d="M 380 212 C 380 290, 140 290, 120 216" fill="none" stroke={C.accent} strokeWidth="2.5" markerEnd="url(#r37-goal-arrow)" />
      <Lbl x={24} y={300} anchor="start" fill={C.accent}>not yet met: another turn, with the reason</Lbl>
      {/* met / impossible */}
      <line x1={540} y1={212} x2={540} y2={262} stroke={C.muted} strokeWidth="1.5" markerEnd="url(#r37-goal-arrow)" />
      <Lbl x={612} y={284} anchor="end" fill={C.ink}>met: stop</Lbl>
      <Lbl x={612} y={306} anchor="end" fill={C.ink}>impossible: stop</Lbl>
      <G when={step >= 1}>
        <Lbl x={442} y={108} fill={C.warm} size={15}>reads, never runs</Lbl>
      </G>
    </svg>
  );
}

export function Goals({ step }: { step: number }) {
  return (
    <Area style={{ justifyContent: "center" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", columnGap: "3vw", alignItems: "center" }}>
        <Loop step={step} />
        <div className="relative" style={{ minHeight: "21em" }}>
          <Show when={step === 0} className="absolute inset-0" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "2vh" }}>
            <div style={{ ...T.big, color: C.ink }}>A goal is a finish line. Claude keeps taking turns until a separate model agrees the condition holds.</div>
            <div style={{ ...T.body, color: C.muted }}>Auto mode removes the prompts within a turn. A goal removes the prompts between turns.</div>
          </Show>
          <Show when={step === 1} className="absolute inset-0" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.6vh" }}>
            <div style={{ ...T.body, color: C.ink }}>The checker only reads the conversation, so the condition has to be something Claude can show:</div>
            <pre className="t-label" style={{ ...T.label, ...T.mono, color: C.accent, background: "#fff", border: `1px solid ${C.rule}`, borderRadius: 10, padding: "1.2vh 1vw", whiteSpace: "pre-wrap", margin: 0 }}>
{`/goal the fit converges on all 10 toy
datasets, every pull has width 1 ± 0.1,
no file outside fit/ changes,
or stop after 20 turns`}
            </pre>
            <div style={{ ...T.body, color: C.muted }}>One end state, how to prove it, what must not change, and a budget.</div>
          </Show>
          <Show when={step >= 2} className="absolute inset-0" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.6vh" }}>
            <div style={{ ...T.label, ...T.mono, color: C.muted }} className="t-label">what starts the next turn?</div>
            <div style={{ ...T.body, color: C.ink }}><code style={{ ...T.mono, color: C.accent }}>/goal</code> the last turn ended and the check failed</div>
            <div style={{ ...T.body, color: C.ink }}><code style={{ ...T.mono, color: C.accent }}>/loop</code> a time interval passed</div>
            <div style={{ ...T.body, color: C.ink }}>scheduled task: a clock, with no session open</div>
            <div style={{ ...T.body, color: C.ink, borderLeft: `4px solid ${C.warm}`, paddingLeft: "1vw" }}>
              One goal is one agent with one finish line. Many agents need the plan written down: a workflow.
            </div>
          </Show>
        </div>
      </div>
    </Area>
  );
}
