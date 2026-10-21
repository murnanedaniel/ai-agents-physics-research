"use client";

import { Arrow, C, MONO, SANS, Stage } from "./kit";

// demo-training-logs: which run (the PaiNN baseline from demo-range-baseline,
// on Perlmutter, logging to W&B) and why we read its log ourselves (top);
// what the run writes to its log (left), a sketch of the curves it produces
// (middle, not data), and the three questions we ask of it live, each with
// what a "no" would point to (right). The only number is the paper's PaiNN baseline on MD22 DHA
// (Caruso et al., Nat. Commun. 17 (2026), Table 1).
const L = 360, R = 720, TOP = 50, BOT = 360;
const curve = (f: (t: number) => number) =>
  Array.from({ length: 41 }, (_, i) => { const t = i / 40; return `${i ? "L" : "M"} ${L + t * (R - L)} ${f(t)}`; }).join(" ");
const train = curve((t) => BOT - (40 + 240 * Math.exp(-5 * t)));
const val = curve((t) => BOT - (64 + 230 * Math.exp(-4.4 * t) + 8 * t));
const TARGET = 280;

const RECORD = [
  ["config", "PaiNN, seed 0"],
  ["commit", "git hash"],
  ["per epoch", "train, val error"],
  ["state", "running / failed"],
];

// Each question, where it sits on the sketch, and what a "no" would point to.
const CHECKS = [
  { x: 425, y: 150, text: ["Does the error", "fall at all?"], no: "flat: a bug or a bad learning rate" },
  { x: 580, y: 254, text: ["Does validation", "follow training?"], no: "a growing gap: overfitting" },
  { x: R, y: TARGET, text: ["Where does it end", "against the paper?"], no: "paper: four seeds, full training" },
];

export function RangeLogChecks() {
  return (
    <Stage label="One baseline run's log record, a sketch of its training and validation curves against the paper value, and three numbered questions with what a no would mean">
      <svg viewBox="0 0 1200 510" width="100%" style={{ width: "100%", height: "100%" }}>
        <Arrow id="rl-arrow" />
        <text x={600} y={26} textAnchor="middle" fontFamily={SANS} fontSize={22} fill={C.ink}>The PaiNN baseline from the last demo trains on Perlmutter and logs to W&amp;B.</text>
        <text x={600} y={56} textAnchor="middle" fontFamily={SANS} fontSize={22} fill={C.ink}>We read the log ourselves before we trust the agent&rsquo;s summary.</text>
        <g transform="translate(0 70)">
          {/* what the run writes */}
          <rect x={0} y={60} width={300} height={270} rx={12} fill="#fff" stroke={C.faint} strokeWidth={1.5} />
          <text x={22} y={102} fontFamily={SANS} fontSize={23} fontWeight={600} fill={C.ink}>One run logs</text>
          {RECORD.map(([k, v], i) => (
            <g key={k}>
              <text className="t-label" x={22} y={150 + i * 44} fontFamily={MONO} fontSize={16} fill={C.muted}>{k}</text>
              <text className="t-label" x={126} y={150 + i * 44} fontFamily={MONO} fontSize={16} fill={C.ink}>{v}</text>
            </g>
          ))}
          <path d={`M 306 195 H ${L - 14}`} stroke={C.muted} strokeWidth={2} markerEnd="url(#rl-arrow)" />

          {/* sketch of the curves */}
          <line x1={L} x2={L} y1={TOP} y2={BOT} stroke={C.muted} strokeWidth={1.5} />
          <line x1={L} x2={R} y1={BOT} y2={BOT} stroke={C.muted} strokeWidth={1.5} />
          <text className="t-label" x={L + 8} y={TOP - 8} fontFamily={MONO} fontSize={16} fill={C.muted}>energy error</text>
          <text className="t-label" x={R} y={BOT + 26} textAnchor="end" fontFamily={MONO} fontSize={16} fill={C.muted}>epochs</text>
          <text className="t-label" x={L + 6} y={BOT + 26} fontFamily={MONO} fontSize={16} fill={C.warm}>sketch, not data</text>
          <line x1={L} x2={R} y1={TARGET} y2={TARGET} stroke={C.ink} strokeDasharray="6 6" />
          <text className="t-label" x={R + 26} y={TARGET - 4} fontFamily={MONO} fontSize={15} fill={C.ink}>paper</text>
          <text className="t-label" x={R + 26} y={TARGET + 16} fontFamily={MONO} fontSize={15} fill={C.ink}>0.199</text>
          <path d={train} fill="none" stroke={C.accent} strokeWidth={3} />
          <path d={val} fill="none" stroke={C.grey} strokeWidth={3} strokeDasharray="10 6" />
          <text className="t-label" x={490} y={208} fontFamily={MONO} fontSize={16} fill={C.muted}>val</text>
          <text className="t-label" x={630} y={344} fontFamily={MONO} fontSize={16} fill={C.accent}>train</text>
          {CHECKS.map((c, i) => (
            <g key={c.text[0]}>
              <circle cx={c.x} cy={c.y} r={16} fill={C.warmSoft} stroke={C.warm} strokeWidth={2} />
              <text className="t-label" x={c.x} y={c.y + 6} textAnchor="middle" fontFamily={SANS} fontSize={19} fontWeight={700} fill={C.warm}>{i + 1}</text>
            </g>
          ))}

          {/* the questions we ask live, and what a "no" points to */}
          {CHECKS.map((c, i) => (
            <g key={`q-${c.text[0]}`}>
              <circle cx={850} cy={80 + i * 104} r={16} fill={C.warmSoft} stroke={C.warm} strokeWidth={2} />
              <text className="t-label" x={850} y={86 + i * 104} textAnchor="middle" fontFamily={SANS} fontSize={18} fontWeight={700} fill={C.warm}>{i + 1}</text>
              <text x={880} y={86 + i * 104} fontFamily={SANS} fontSize={22} fill={C.ink}>{c.text.map((t, k) => <tspan key={t} x={880} dy={k ? 28 : 0}>{t}</tspan>)}</text>
              <text className="t-label" x={880} y={140 + i * 104} fontFamily={MONO} fontSize={15} fill={C.muted}>{c.no}</text>
            </g>
          ))}
          <text className="t-label" x={1196} y={412} textAnchor="end" fontFamily={MONO} fontSize={16} fill={C.muted}>live: ask the agent, then open W&amp;B</text>
        </g>
      </svg>
    </Stage>
  );
}
