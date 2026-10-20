"use client";

import { C, MONO, SANS, Stage } from "./kit";

// Holding scene for the live log inspection. The curves are a sketch of what
// to look for, not data; the only number is the paper's PaiNN baseline
// (Caruso et al., Nat. Commun. 17 (2026), Table 1).
const L = 120, R = 760, TOP = 40, BOT = 380;
const curve = (f: (t: number) => number) =>
  Array.from({ length: 41 }, (_, i) => { const t = i / 40; return `${i ? "L" : "M"} ${L + t * (R - L)} ${f(t)}`; }).join(" ");
const train = curve((t) => BOT - (55 + 260 * Math.exp(-5 * t)));
const val = curve((t) => BOT - (80 + 250 * Math.exp(-4.4 * t) + 8 * t));
const TARGET = 290;
const CHECKS = [
  { x: 216, y: 168, text: ["Does the loss", "fall at all?"] },
  { x: 472, y: 236, text: ["Does validation", "follow training?"] },
  { x: R, y: TARGET, text: ["Where does it end", "against the target?"] },
];

export function TrainingLogsDemo() {
  return (
    <Stage label="Sketch of a training and validation curve with three numbered checks">
      <svg viewBox="0 0 1200 440" width="100%" style={{ width: "100%", height: "100%" }}>
        <line x1={L} x2={L} y1={TOP} y2={BOT} stroke={C.muted} strokeWidth={1.5} />
        <line x1={L} x2={R} y1={BOT} y2={BOT} stroke={C.muted} strokeWidth={1.5} />
        <text className="t-label" x={L - 12} y={TOP + 10} textAnchor="end" fontFamily={MONO} fontSize={16} fill={C.muted}>error</text>
        <text className="t-label" x={R} y={BOT + 28} textAnchor="end" fontFamily={MONO} fontSize={16} fill={C.muted}>epochs</text>
        <text className="t-label" x={L + 10} y={BOT + 28} fontFamily={MONO} fontSize={16} fill={C.warm}>sketch, not data</text>
        <line x1={L} x2={R} y1={TARGET} y2={TARGET} stroke={C.ink} strokeDasharray="6 6" />
        <text className="t-label" x={L + 10} y={TARGET + 24} fontFamily={MONO} fontSize={16} fill={C.ink}>baseline 0.199 kcal/mol</text>
        <path d={train} fill="none" stroke={C.accent} strokeWidth={3} />
        <path d={val} fill="none" stroke={C.grey} strokeWidth={3} strokeDasharray="10 6" />
        <text className="t-label" x={330} y={222} fontFamily={MONO} fontSize={16} fill={C.muted}>val</text>
        <text className="t-label" x={430} y={334} fontFamily={MONO} fontSize={16} fill={C.accent}>train</text>
        {CHECKS.map((c, i) => (
          <g key={c.text[0]}>
            <circle cx={c.x} cy={c.y} r={16} fill={C.warmSoft} stroke={C.warm} strokeWidth={2} />
            <text x={c.x} y={c.y + 6} textAnchor="middle" fontFamily={SANS} fontSize={18} fontWeight={700} fill={C.warm}>{i + 1}</text>
            <circle cx={850} cy={120 + i * 100} r={16} fill={C.warmSoft} stroke={C.warm} strokeWidth={2} />
            <text x={850} y={126 + i * 100} textAnchor="middle" fontFamily={SANS} fontSize={18} fontWeight={700} fill={C.warm}>{i + 1}</text>
            <text x={880} y={126 + i * 100} fontFamily={SANS} fontSize={22} fill={C.ink}>{c.text.map((t, k) => <tspan key={t} x={880} dy={k ? 28 : 0}>{t}</tspan>)}</text>
          </g>
        ))}
      </svg>
    </Stage>
  );
}
