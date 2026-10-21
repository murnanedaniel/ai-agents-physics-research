"use client";

import { Area, C, G, Show, T } from "./kit";

// landscape: which ecosystem to build on, from Daniel's own threads.
// Setup: cluster threads, Apr to Oct 2026, where Claude Code acted as PI and
// Codex as co-investigator on the same projects (notes/w10 LOOP-PATTERNS,
// "Codex vs Claude"). Step 0: each caught what the other missed. Step 1: the
// brief and the sandbox moved the outcome. Step 2: open models are outside
// this evidence.
const serif = "var(--font-serif), Georgia, serif";
const mono = "var(--font-geist-mono), monospace";

export function Landscape({ step }: { step: number }) {
  return (
    <Area style={{ gap: "1.2vh" }}>
      <div className="t-label" style={{ ...T.label, fontFamily: mono, color: C.muted }}>
        My cluster threads, Apr to Oct 2026: Claude Code leads, Codex checks
      </div>
      <svg viewBox="0 0 1200 400" className="min-h-0 w-full flex-1" role="img" aria-label="Two overlapping circles, Claude Code and Codex, each catching errors the other missed; then what changed the outcome; then a dashed third circle for open models">
        <circle cx={330} cy={200} r={185} fill="rgba(3,105,161,0.07)" stroke={C.accent} strokeWidth="2" />
        <circle cx={600} cy={200} r={185} fill="rgba(180,83,9,0.07)" stroke={C.warm} strokeWidth="2" />
        <text className="t-label" x={290} y={92} textAnchor="middle" fontSize="30" fill={C.accent} fontFamily={serif} fontStyle="italic">Claude Code</text>
        <text className="t-label" x={650} y={92} textAnchor="middle" fontSize="30" fill={C.warm} fontFamily={serif} fontStyle="italic">Codex</text>
        <text fontSize="22" fill={C.ink} textAnchor="middle">
          <tspan x={270} y={185}>found the worst bug,</tspan>
          <tspan x={270} y={215}>which a Codex</tspan>
          <tspan x={270} y={245}>audit missed</tspan>
        </text>
        <text fontSize="22" fill={C.ink} textAnchor="middle">
          <tspan x={680} y={155}>found leakage:</tspan>
          <tspan x={680} y={185}>4,091 of 4,941</tspan>
          <tspan x={680} y={215}>validation patches</tspan>
          <tspan x={680} y={245}>shared events</tspan>
          <tspan x={680} y={275}>with training</tspan>
        </text>
        <G when={step >= 2}>
          <circle cx={1010} cy={200} r={140} fill="none" stroke={C.faint} strokeWidth="2" strokeDasharray="8 8" />
          <text className="t-label" x={1010} y={186} textAnchor="middle" fontSize="28" fill={C.muted} fontFamily={serif} fontStyle="italic">Open models</text>
          <text x={1010} y={222} textAnchor="middle" fontSize="22" fill={C.muted}>not in these threads</text>
        </G>
      </svg>
      <div className="relative" style={{ minHeight: "1.4em", ...T.body }}>
        <Show when={step === 0} className="absolute inset-x-0" style={{ color: C.ink }}>
          Each caught what the other missed.
        </Show>
        <Show when={step === 1} className="absolute inset-x-0" style={{ color: C.ink }}>
          Setup mattered too: a read-only sandbox blanked an audit; brief order decided a duel.
        </Show>
        <Show when={step >= 2} className="absolute inset-x-0" style={{ color: C.ink }}>
          <span style={{ ...T.serif }}>So: use both,</span> each checking the other.
        </Show>
      </div>
    </Area>
  );
}
