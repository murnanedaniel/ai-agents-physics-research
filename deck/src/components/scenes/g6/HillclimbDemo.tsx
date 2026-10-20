"use client";

import { Arrow, Ask, C, MONO, SANS, Stage } from "./kit";

// Holding scene for starting the hill-climbing loops on the three morning
// projects. Galactic metric from the FoF benchmark spec (end-to-end time after
// catalogue correctness); RANGE metric from the project plan (force MAE on
// MD22 DHA at matched size). Theory: hill-climbing is an open question.
const LOOPS = [
  { title: "Galactic clustering", metric: ["metric: FoF time,", "after correctness"], log: "logs to W&B", ask: "[Daniel: confirm metric]", open: false },
  { title: "RANGE", metric: ["metric: force MAE,", "MD22 DHA, matched size"], log: "logs to W&B, ScienceDash", ask: null, open: false },
  { title: "Fine-tuning (theory)", metric: ["metric: open", "question"], log: "let's discuss", ask: null, open: true },
];

export function HillclimbDemo() {
  return (
    <Stage label="Three hill-climbing loops: galactic clustering and RANGE with metrics and logging, fine-tuning theory with an open metric">
      <svg viewBox="0 0 1200 430" width="100%" style={{ width: "100%", height: "100%" }}>
        <Arrow id="hd-arrow" color={C.accent} />
        <Arrow id="hd-arrow-w" color={C.warm} />
        {LOOPS.map((l, i) => {
          const cx = 200 + i * 400, cy = 150, r = 95;
          const col = l.open ? C.warm : C.accent;
          return (
            <g key={l.title}>
              <path d={`M ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx + r * Math.cos(-0.5)} ${cy + r * Math.sin(-0.5)}`} fill="none" stroke={col} strokeWidth={3} strokeDasharray={l.open ? "8 7" : undefined} markerEnd={`url(#${l.open ? "hd-arrow-w" : "hd-arrow"})`} />
              <text x={cx} y={cy - 8} textAnchor="middle" fontFamily={SANS} fontSize={20} fill={C.muted}>change,</text>
              <text x={cx} y={cy + 20} textAnchor="middle" fontFamily={SANS} fontSize={20} fill={C.muted}>{l.open ? "check?" : "keep or reset"}</text>
              <text x={cx} y={cy + 140} textAnchor="middle" fontFamily={SANS} fontSize={26} fontWeight={600} fill={C.ink}>{l.title}</text>
              {l.metric.map((m, k) => (
                <text key={m} className="t-label" x={cx} y={cy + 176 + k * 24} textAnchor="middle" fontFamily={MONO} fontSize={17} fill={l.open ? C.warm : C.ink}>{m}</text>
              ))}
              <text className="t-label" x={cx} y={cy + 238} textAnchor="middle" fontFamily={MONO} fontSize={17} fill={C.muted}>{l.log}</text>
              {l.ask && <Ask x={cx} y={cy + 264} anchor="middle">{l.ask}</Ask>}
            </g>
          );
        })}
      </svg>
    </Stage>
  );
}
