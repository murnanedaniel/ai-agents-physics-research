"use client";

import { Arrow, C, MONO, SANS, Stage } from "./kit";

// demo-hillclimbing: the three morning projects as climbs, each with the frozen
// score, what the agent may edit, and the held-out check. RANGE: figure of
// merit from notes/w15/RANGE-PREP.md (force MAE at matched parameter count and
// inference time). Galactic: the FoF benchmark spec (end-to-end time once the
// halo catalogue is correct). Daniel, 21 Oct: the galactic score is a Pareto
// frontier, keep a change only if it is faster and halo membership against an
// exact oracle does not drop. Fine-tuning: to be decided live.
type Loop = { title: string; score: string[]; edit: string; check: string; open: boolean; pareto?: boolean };
const LOOPS: Loop[] = [
  { title: "Galactic clustering", score: ["faster, with no", "loss of accuracy"], edit: "linking code", check: "halos vs exact finder", pareto: true, open: false },
  { title: "Fine-tuning theory", score: ["to be decided live", ""], edit: "", check: "", open: true },
  { title: "RANGE", score: ["force error at matched", "size and speed"], edit: "long-range module", check: "MD22 test split", open: false },
];

// Speed against accuracy: earlier versions as dots, the current best ringed;
// a change counts only in the shaded corner (faster, accuracy not lower).
function Pareto({ x, y }: { x: number; y: number }) {
  const W = 340, H = 90;
  const best = { px: 150, py: 34 };
  const pts = [[40, 62], [80, 50], [110, 64], [150, 34], [200, 72], [120, 40]];
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={best.px} y={0} width={W - best.px} height={best.py} fill={C.accentSoft} />
      <text className="t-label" x={W - 8} y={22} textAnchor="end" fontFamily={MONO} fontSize={15} fill={C.accent}>keep</text>
      <line x1={0} x2={W} y1={H} y2={H} stroke={C.muted} />
      <line x1={0} x2={0} y1={0} y2={H} stroke={C.muted} />
      <line x1={best.px} x2={best.px} y1={0} y2={H} stroke={C.accent} strokeDasharray="4 4" />
      <line x1={0} x2={W} y1={best.py} y2={best.py} stroke={C.accent} strokeDasharray="4 4" />
      {pts.map(([px, py]) => <circle key={`${px}-${py}`} cx={px} cy={py} r={5} fill={C.grey} />)}
      <circle cx={best.px} cy={best.py} r={9} fill="none" stroke={C.accent} strokeWidth={2.5} />
      <text className="t-label" x={W} y={H + 22} textAnchor="end" fontFamily={MONO} fontSize={15} fill={C.muted}>speed →</text>
      <text className="t-label" x={6} y={-8} fontFamily={MONO} fontSize={15} fill={C.muted}>↑ halo accuracy vs exact</text>
      <text className="t-label" x={6} y={H + 22} fontFamily={MONO} fontSize={15} fill={C.warm}>sketch</text>
    </g>
  );
}

export function HillclimbPlan() {
  return (
    <Stage label="Three climbs started live: galactic clustering and RANGE with a frozen score, an editable part and a held-out check; fine-tuning theory with no score yet">
      <svg viewBox="0 0 1200 520" width="100%" style={{ width: "100%", height: "100%" }}>
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
              ].filter(([, a]) => a).map(([k, a, b], j) => (
                <g key={k}>
                  <text className="t-label" x={cx - 170} y={cy + 160 + j * 62} fontFamily={MONO} fontSize={16} fill={C.muted}>{k}</text>
                  <text x={cx - 70} y={cy + 160 + j * 62} fontFamily={SANS} fontSize={20} fill={l.open && j === 0 ? C.warm : C.ink}>{a}</text>
                  {b && <text x={cx - 70} y={cy + 186 + j * 62} fontFamily={SANS} fontSize={20} fill={l.open && j === 0 ? C.warm : C.ink}>{b}</text>}
                </g>
              ))}
              {l.pareto && <Pareto x={cx - 170} y={cy + 322} />}
            </g>
          );
        })}
      </svg>
    </Stage>
  );
}
