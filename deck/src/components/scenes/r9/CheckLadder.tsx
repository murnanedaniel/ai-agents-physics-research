"use client";

import { Arrow, C, Canvas, MONO, SANS, Show } from "./kit";

// basic-model-ladder: what each milestone is and the evidence it rests on
// (step 0), then how every claim is checked (step 1): the referee writes a
// prediction before the run, and the final score is held-out experiments.
const RUNGS = [
  { id: "M1", name: "particles and masses", ev: "track curvature, timing, energy loss" },
  { id: "M2", name: "conservation laws", ev: "reactions never seen in enough events" },
  { id: "M3", name: "decays", ev: "peaks and branching fractions" },
  { id: "M4", name: "spins and charges", ev: "angular distributions" },
  { id: "M5", name: "interactions", ev: "how rates change with energy and angle" },
  { id: "M6", name: "a Lagrangian", ev: "its own UFO, compared with the data" },
];
const FLOW = [
  ["claim", "written in THEORY.md, with a confidence"],
  ["prediction, committed first", "the referee writes it before the run"],
  ["run", "oracle data; reconstruction checked first"],
  ["kept or killed", "by kill criteria set in advance"],
];
const ROW = 70, BASE = 470;
const y = (i: number) => BASE - i * ROW;

export function CheckLadder({ step }: { step: number }) {
  return (
    <Canvas label="Six milestones from particles and masses to a Lagrangian, each with its evidence; each claim is checked by a prediction written before the run; the final score is predictions for eight held-out experiments, because different-looking Lagrangians can describe the same physics">
      <line x1={70} x2={70} y1={y(5) - 34} y2={BASE + 34} stroke={C.rule} strokeWidth={6} />
      <text className="t-label" x={110} y={y(5) - 46} fontFamily={MONO} fontSize={17} fill={C.muted}>milestone</text>
      <text className="t-label" x={390} y={y(5) - 46} fontFamily={MONO} fontSize={17} fill={C.muted}>evidence</text>
      {RUNGS.map((r, i) => (
        <g key={r.id}>
          <rect x={40} y={y(i) - 24} width={60} height={48} rx={10} fill={C.tint} stroke={i === 5 ? C.ink : C.accent} strokeWidth={i === 5 ? 3 : 2} />
          <text className="t-label" x={70} y={y(i) + 7} textAnchor="middle" fontFamily={MONO} fontSize={20} fill={i === 5 ? C.ink : C.accent}>{r.id}</text>
          <text x={114} y={y(i) + 8} fontFamily={SANS} fontSize={23} fill={C.ink}>{r.name}</text>
          <text className="t-label" x={390} y={y(i) + 7} fontFamily={MONO} fontSize={16} fill={C.muted}>{r.ev}</text>
        </g>
      ))}

      <text x={40} y={BASE + 70} fontFamily={SANS} fontSize={22} fill={C.ink}>Each milestone is a claim, checked against the lab's own data.</text>

      <Show at={1} step={step}>
        <g transform="translate(790 0)">
          <text x={0} y={y(5) - 40} fontFamily={SANS} fontSize={24} fill={C.ink}>Every claim, on every rung:</text>
          {FLOW.map(([h, d], i) => (
            <g key={h} transform={`translate(0 ${y(5) - 14 + i * 84})`}>
              <rect x={0} y={0} width={400} height={64} rx={10} fill={i === 1 ? C.warmTint : "#fffdf8"} stroke={i === 1 ? C.warm : C.muted} strokeWidth={1.5} />
              <text className="t-label" x={16} y={28} fontFamily={SANS} fontSize={20} fill={C.ink}>{h}</text>
              <text className="t-label" x={16} y={52} fontFamily={MONO} fontSize={14} fill={C.muted}>{d}</text>
              {i < 3 && <path d={`M 200 66 V 82`} stroke={C.muted} strokeWidth={2} markerEnd="url(#r9-cl)" />}
            </g>
          ))}
          <rect x={0} y={y(5) + 318} width={400} height={116} rx={10} fill={C.tint} stroke={C.good} strokeWidth={2} />
          <text x={16} y={y(5) + 346} fontFamily={SANS} fontSize={20} fill={C.ink}>Final score: predictions for 8 held-out</text>
          <text x={16} y={y(5) + 372} fontFamily={SANS} fontSize={20} fill={C.ink}>experiments, not the Lagrangian's form.</text>
          <text x={16} y={y(5) + 400} fontFamily={SANS} fontSize={20} fill={C.muted}>Different-looking Lagrangians can</text>
          <text x={16} y={y(5) + 424} fontFamily={SANS} fontSize={20} fill={C.muted}>describe the same physics.</text>
        </g>
      </Show>
      <Arrow id="r9-cl" />
    </Canvas>
  );
}
