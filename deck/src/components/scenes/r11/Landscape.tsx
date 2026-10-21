"use client";

import { Area, C, G, Show, T } from "./kit";

// landscape: which ecosystem to build on. Neutral: what each offers, from my
// own threads (cluster, Apr to Oct 2026: Claude Code led, Codex checked; see
// course evidence notes, "Codex vs Claude"), and a question to the room.
// Step 0: the two I used, what each offers, and one bug each caught that the
// other missed (course evidence notes; 4,091 of 4,941: Codex thread,
// 5 Sep 2026), overlapping where each checks the other. Step 1: in
// those threads the setup (what each tool could read, the order of the
// instructions) mattered as much as the tool. Step 2: open models, which my
// threads did not test, and the closing question.
const serif = "var(--font-serif), Georgia, serif";
const mono = "var(--font-geist-mono), monospace";

function Offer({ x, lines, y = 160, colour = C.ink, size = 23 }: { x: number; lines: string[]; y?: number; colour?: string; size?: number }) {
  return (
    <text fontSize={size} fill={colour} textAnchor="middle">
      {lines.map((l, i) => <tspan key={l} x={x} y={y + i * (size + 6)}>{l}</tspan>)}
    </text>
  );
}

export function Landscape({ step }: { step: number }) {
  return (
    <Area style={{ gap: "1.2vh" }}>
      <div className="t-label" style={{ ...T.label, fontFamily: mono, color: C.muted }}>My cluster threads, Apr to Oct 2026: Claude Code led, Codex checked</div>
      <svg viewBox="0 0 1200 400" className="min-h-0 w-full flex-1" role="img" aria-label="Two overlapping circles, Claude Code and Codex, with what each offers, a bug each caught that the other missed, and the overlap where each checks the other; then a third circle for open models">
        <circle cx={330} cy={200} r={185} fill="rgba(3,105,161,0.07)" stroke={C.accent} strokeWidth="2" />
        <circle cx={600} cy={200} r={185} fill="rgba(180,83,9,0.07)" stroke={C.warm} strokeWidth="2" />
        <text className="t-label" x={270} y={110} textAnchor="middle" fontSize="30" fill={C.accent} fontFamily={serif} fontStyle="italic">Claude Code</text>
        <text className="t-label" x={670} y={110} textAnchor="middle" fontSize="30" fill={C.warm} fontFamily={serif} fontStyle="italic">Codex</text>
        <Offer x={250} lines={["skills, hooks,", "subagents"]} />
        <Offer x={685} lines={["terminal, IDE,", "cloud tasks"]} />
        <Offer x={265} y={240} size={21} colour={C.muted} lines={["found the worst bug,", "which a Codex", "audit missed"]} />
        <Offer x={650} y={240} size={21} colour={C.muted} lines={["found 4,091 of 4,941", "validation patches", "shared events", "with training"]} />
        <text fontSize="20" fill={C.ink} textAnchor="middle">
          <tspan x={465} y={186}>each</tspan>
          <tspan x={465} y={214}>checks</tspan>
          <tspan x={465} y={242}>the other</tspan>
        </text>
        <G when={step >= 2}>
          <circle cx={1010} cy={200} r={150} fill="rgba(20,20,20,0.03)" stroke={C.muted} strokeWidth="2" strokeDasharray="8 8" />
          <text className="t-label" x={1010} y={150} textAnchor="middle" fontSize="30" fill={C.ink} fontFamily={serif} fontStyle="italic">Open models</text>
          <Offer x={1010} y={190} lines={["weights you run", "yourself"]} />
        </G>
      </svg>
      <div className="relative" style={{ minHeight: "3.9em", ...T.body }}>
        <Show when={step === 0} className="absolute inset-x-0" style={{ color: C.ink }}>
          In my threads, each caught a bug the other missed.
        </Show>
        <Show when={step === 1} className="absolute inset-x-0" style={{ color: C.ink }}>
          Setup mattered as much as the tool. One Codex audit added nothing at first, because Claude had given it a read-only sandbox.
          And when I reran a head-to-head with the instructions in the same order for both, most of the first win went away.
        </Show>
        <Show when={step >= 2} className="absolute inset-x-0" style={{ ...T.serif, ...T.big, color: C.accent }}>
          Which would you build on, and why?
        </Show>
      </div>
    </Area>
  );
}
