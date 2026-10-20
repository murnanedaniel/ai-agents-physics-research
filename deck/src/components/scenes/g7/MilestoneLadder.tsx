"use client";

import { C, Canvas, MONO, SANS, Show } from "./kit";

// basic-model-ladder: six milestones drawn as a ladder, M1 at the bottom.
// Step 1 reveals what each rung is checked against.
export const MILESTONES = [
  { id: "M1", name: "particles and masses", check: "track curvature, timing, dE/dx" },
  { id: "M2", name: "conservation laws", check: "reactions that never happen" },
  { id: "M3", name: "decay tables", check: "decay peaks" },
  { id: "M4", name: "spins and charges", check: "angular distributions" },
  { id: "M5", name: "vertices and couplings", check: "energy dependence" },
  { id: "M6", name: "a Lagrangian", check: "held-out experiments" },
];

export function MilestoneLadder({ step }: { step: number }) {
  const row = 78, base = 470;
  const y = (i: number) => base - i * row;
  return (
    <Canvas label="A ladder of six milestones from particles and masses up to a Lagrangian, each with the evidence it is checked against">
      <line x1={150} x2={150} y1={y(5) - 30} y2={base + 30} stroke={C.rule} strokeWidth={6} />
      <line x1={540} x2={540} y1={y(5) - 30} y2={base + 30} stroke={C.rule} strokeWidth={6} />
      {MILESTONES.map((m, i) => (
        <g key={m.id}>
          <line x1={150} x2={540} y1={y(i)} y2={y(i)} stroke={C.rule} strokeWidth={4} />
          <rect x={120} y={y(i) - 26} width={60} height={52} rx={10} fill={C.tint} stroke={i === 5 ? C.ink : C.accent} strokeWidth={i === 5 ? 3 : 2} />
          <text className="t-label" x={150} y={y(i) + 8} textAnchor="middle" fontFamily={MONO} fontSize={21} fill={i === 5 ? C.ink : C.accent}>{m.id}</text>
          <rect x={196} y={y(i) - 22} width={330} height={44} fill={C.paper} />
          <text x={210} y={y(i) + 9} fontFamily={SANS} fontSize={25} fill={C.ink}>{m.name}</text>
          <Show at={1} step={step}>
            <path d={`M 556 ${y(i)} H 620`} stroke={C.muted} strokeWidth={1.5} strokeDasharray="4 4" />
            <text className="t-label" x={636} y={y(i) + 8} fontFamily={MONO} fontSize={21} fill={i === 5 ? C.good : C.accent}>{m.check}</text>
            <circle cx={1150} cy={y(i)} r={14} fill={C.paper} stroke={C.muted} strokeWidth={2} />
          </Show>
        </g>
      ))}
      <Show at={1} step={step}>
        <text x={636} y={y(5) - 52} fontFamily={SANS} fontSize={22} fill={C.muted}>checked against</text>
        <text x={1150} y={y(5) - 52} textAnchor="middle" fontFamily={SANS} fontSize={22} fill={C.muted}>pass?</text>
      </Show>
      <text x={20} y={base + 8} fontFamily={SANS} fontSize={20} fill={C.muted}>start</text>
    </Canvas>
  );
}
