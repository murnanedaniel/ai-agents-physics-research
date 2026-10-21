"use client";

import { Arrow, Ask, C, MONO, SANS, Stage } from "./kit";

// demo-hillclimbing: the three morning projects as climbs, each with the frozen
// score, what the agent may edit, and the held-out check. RANGE: figure of
// merit from notes/w15/RANGE-PREP.md (force MAE at matched parameter count and
// inference time). Galactic: the FoF benchmark spec (end-to-end time once the
// halo catalogue is correct); the metric is not fixed yet. Fine-tuning theory:
// open, Daniel to decide.
const LOOPS = [
  { title: "Galactic clustering", score: ["halo-finder time,", "halos must be right"], edit: "linking code", check: "halos vs exact finder", ask: "[Daniel: confirm score]", open: false },
  { title: "RANGE", score: ["force error at matched", "size and speed"], edit: "long-range module", check: "MD22 test split", ask: null, open: false },
  { title: "Fine-tuning theory", score: ["none yet", ""], edit: "derivations", check: "?", ask: "[Daniel: climb or discuss?]", open: true },
];

export function HillclimbPlan() {
  return (
    <Stage label="Three climbs started live: galactic clustering and RANGE with a frozen score, an editable part and a held-out check; fine-tuning theory with no score yet">
      <svg viewBox="0 0 1200 460" width="100%" style={{ width: "100%", height: "100%" }}>
        <Arrow id="hp-a" color={C.accent} />
        <Arrow id="hp-w" color={C.warm} />
        {LOOPS.map((l, i) => {
          const cx = 200 + i * 400, cy = 90, r = 62;
          const col = l.open ? C.warm : C.accent;
          return (
            <g key={l.title}>
              <path d={`M ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx + r * Math.cos(-0.5)} ${cy + r * Math.sin(-0.5)}`} fill="none" stroke={col} strokeWidth={3} strokeDasharray={l.open ? "8 7" : undefined} markerEnd={`url(#${l.open ? "hp-w" : "hp-a"})`} />
              <text className="t-label" x={cx} y={cy + 8} textAnchor="middle" fontFamily={SANS} fontSize={20} fill={C.muted}>{l.open ? "climb?" : "climb"}</text>
              <text x={cx} y={cy + 110} textAnchor="middle" fontFamily={SANS} fontSize={25} fontWeight={600} fill={C.ink}>{l.title}</text>
              {[
                ["score", l.score[0], l.score[1]],
                ["edits", l.edit, ""],
                ["held out", l.check, ""],
              ].map(([k, a, b], j) => (
                <g key={k}>
                  <text className="t-label" x={cx - 170} y={cy + 160 + j * 62} fontFamily={MONO} fontSize={16} fill={C.muted}>{k}</text>
                  <text x={cx - 70} y={cy + 160 + j * 62} fontFamily={SANS} fontSize={20} fill={l.open && j === 0 ? C.warm : C.ink}>{a}</text>
                  {b && <text x={cx - 70} y={cy + 186 + j * 62} fontFamily={SANS} fontSize={20} fill={l.open && j === 0 ? C.warm : C.ink}>{b}</text>}
                </g>
              ))}
              {l.ask && <Ask x={cx} y={cy + 350} anchor="middle">{l.ask}</Ask>}
            </g>
          );
        })}
      </svg>
    </Stage>
  );
}
