"use client";
import { C, Canvas, MONO, SANS, SERIF, Tag } from "./common";

// Section scene. Study setup: notes/w11/AGENT-QUALITY-TRENDS-v2-perlmutter.md §1–2,
// notes/w12/PREREGISTRATION.md, notes/w12/RESULTS-perlmutter.md §1.
const LINES = [
  "One researcher on one cluster: my own data, not a published study.",
  "First: how often I push back on the agent.",
  "Then: what else changed between spring and autumn.",
];
const STAGES = [
  { big: "27", small: ["Claude Code threads,", "Perlmutter, May–Oct 2026"] },
  { big: "2,015", small: ["messages I sent", "to the agent"] },
  { big: "5 labels", small: ["each message labelled by", "Claude Haiku: correction,", "challenge, praise,", "instruction or other"] },
  { big: "κ 0.65", small: ["agreement with Sonnet", "on 150 messages", "(1 = same, 0 = chance);", "Sonnet is not ground truth"] },
];
const BX = 20, BW = 250, GAP = 48, BY = 250, BH = 190;

export function SecPractice() {
  return (
    <Canvas label="Section: how my own work with agents changed. Setup: 27 threads, 2,015 messages, each labelled by a small model and checked against a second model">
      {LINES.map((t, i) => (
        <text key={t} x={BX} y={40 + i * 46} fontSize={26} fontFamily={i ? SANS : SERIF} fontStyle={i ? "normal" : "italic"} fill={C.ink}>{t}</text>
      ))}
      <Tag x={BX + 800} y={36} kind="mine" />
      <text className="t-label" x={BX} y={BY - 22} fontSize={14} fontFamily={MONO} fill={C.muted}>how the data was made</text>
      {STAGES.map((s, i) => {
        const x0 = BX + i * (BW + GAP);
        return (
          <g key={s.big}>
            <rect x={x0} y={BY} width={BW} height={BH} rx={12} fill="#fffaf0" stroke={C.rule} />
            <text x={x0 + 22} y={BY + 60} fontSize={38} fontFamily={SERIF} fontStyle="italic" fill={C.accent}>{s.big}</text>
            {s.small.map((t, j) => (
              <text key={t} className="t-label" x={x0 + 22} y={BY + 100 + j * 24} fontSize={14} fontFamily={MONO} fill={j ? C.muted : C.ink}>{t}</text>
            ))}
            {i < STAGES.length - 1 && (
              <path d={`M${x0 + BW + 10},${BY + BH / 2} h${GAP - 22} m-8,-7 l8,7 l-8,7`} fill="none" stroke={C.faint} strokeWidth={2} />
            )}
          </g>
        );
      })}
      <text className="t-label" x={BX} y={BY + BH + 40} fontSize={14} fontFamily={MONO} fill={C.muted}>excluded: one-shot batch calls, the course's orchestration threads, threads under 2 messages, other machines, Codex</text>
    </Canvas>
  );
}
