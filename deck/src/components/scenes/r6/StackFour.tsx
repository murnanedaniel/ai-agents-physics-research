"use client";

import { C, Canvas, SERIF, Show, T, TINT } from "./kit";

// Bottom-up: the model, the program that runs it, the machine it runs on,
// and the practices on top. Each layer gets its own scene next.
const layers = [
  { name: "Model", def: "predicts the next token", eg: "Claude, GPT, Gemini, open weights", color: C.accent, fill: TINT.accent, step: 0 },
  { name: "Harness", def: "runs the loop: context, tools, permissions", eg: "Claude Code, Codex, Cursor, claude.ai", color: C.accent, fill: TINT.accent, step: 1 },
  { name: "Environment", def: "the machine, files and data it can reach", eg: "laptop, cluster, cloud, browser", color: C.accent, fill: TINT.accent, step: 1 },
  { name: "Practice", def: "your rules, skills and checks", eg: "CLAUDE.md, skills, tests, logs", color: C.warm, fill: TINT.warm, step: 2 },
];

const X = 60, W = 860, H = 100, GAP = 18, BASE = 510;
const ly = (i: number) => BASE - (i + 1) * H - i * GAP;

export function StackFour({ step }: { step: number }) {
  return (
    <Canvas>
      {layers.map((l, i) => {
        const y = ly(i);
        return (
          <Show key={l.name} when={step >= l.step}>
            <rect x={X} y={y} width={W} height={H} rx={14} fill={l.fill} stroke={l.color} strokeWidth={1.5} />
            <text x={X + 30} y={y + 46} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 6} fill={C.ink}>{l.name}</text>
            <text x={X + 280} y={y + 44} fontSize={T.body + 1} fill={C.ink}>{l.def}</text>
            <text x={X + 280} y={y + 74} fontSize={T.label} fill={C.muted} className="t-label">{l.eg}</text>
          </Show>
        );
      })}

      {/* Which layers you pick off the shelf, and which one you write yourself */}
      <Show when={step >= 1}>
        <path d={`M ${X + W + 24} ${ly(2)} h 18 V ${ly(0) + H} h -18`} fill="none" stroke={C.accent} strokeWidth={2} />
        <text x={X + W + 60} y={(ly(2) + ly(0) + H) / 2 + 8} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 2} fill={C.ink}>you choose</text>
      </Show>
      <Show when={step >= 2}>
        <path d={`M ${X + W + 24} ${ly(3)} h 18 V ${ly(3) + H} h -18`} fill="none" stroke={C.warm} strokeWidth={2} />
        <text x={X + W + 60} y={ly(3) + H / 2 + 8} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 2} fill={C.ink}>you build</text>
      </Show>
    </Canvas>
  );
}
