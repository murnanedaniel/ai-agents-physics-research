"use client";

import { C, Canvas, MONO, SANS, Show } from "./kit";

// p-newuniverse: hidden theory -> collider -> detector -> swarm (steps 0-1),
// then the two cooks (step 2) and how it is scored (step 3).
const ROLES = ["coordinator", "spectroscopist", "bookkeeper", "amplitudes", "theorist", "referee"];

function Detector({ cx, cy }: { cx: number; cy: number }) {
  const hits: [number, number][] = [];
  [0.4, 1.9, 3.6, 5.1].forEach((a, t) => {
    for (let r = 22; r <= 92; r += 14) {
      const bend = (t % 2 ? 1 : -1) * r * r * 0.00008;
      hits.push([cx + r * Math.cos(a + bend), cy + r * Math.sin(a + bend)]);
    }
  });
  return (
    <g>
      {[22, 36, 50, 64, 78, 92].map((r) => <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke={C.rule} strokeWidth={1.2} />)}
      <circle cx={cx} cy={cy} r={104} fill="none" stroke={C.warm} strokeWidth={6} opacity={0.35} />
      {hits.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3.4} fill={C.accent} />)}
    </g>
  );
}

export function NewUniverse({ step }: { step: number }) {
  return (
    <Canvas label="A hidden theory feeds a collider and detector; a swarm of roles reads the hits; cooked twice; scored on held-out predictions">
      {/* step 0: the hidden universe and the instruments */}
      <g>
        <rect x={20} y={40} width={190} height={170} rx={14} fill={C.warmTint} stroke={C.ink} strokeWidth={3} />
        <text x={115} y={118} textAnchor="middle" fontFamily={MONO} fontSize={30} fill={C.ink}>a b c …</text>
        <text x={115} y={160} textAnchor="middle" fontFamily={MONO} fontSize={18} fill={C.muted}>sealed</text>
        <text className="t-label" x={115} y={245} textAnchor="middle" fontFamily={SANS} fontSize={20} fill={C.ink}>hidden theory</text>
        <path d="M 220 125 H 268" stroke={C.muted} strokeWidth={2} markerEnd="url(#g7-arr2)" />
        <g>
          <line x1={285} x2={455} y1={125} y2={125} stroke={C.accent} strokeWidth={4} />
          <path d="M 285 112 l 22 13 l -22 13 z M 455 112 l -22 13 l 22 13 z" fill={C.accent} />
          <text className="t-label" x={370} y={100} textAnchor="middle" fontFamily={SANS} fontSize={20} fill={C.ink}>oracle: collider</text>
          <rect x={285} y={160} width={170} height={14} rx={7} fill="none" stroke={C.muted} strokeWidth={1.5} />
          <rect x={285} y={160} width={120} height={14} rx={7} fill={C.warm} opacity={0.7} />
          <text className="t-label" x={370} y={204} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.muted}>beam-time budget</text>
        </g>
        <path d="M 465 125 H 505" stroke={C.muted} strokeWidth={2} markerEnd="url(#g7-arr2)" />
        <Detector cx={625} cy={125} />
        <text className="t-label" x={625} y={262} textAnchor="middle" fontFamily={SANS} fontSize={20} fill={C.ink}>detector hits</text>
      </g>

      {/* step 1: the swarm */}
      <Show at={1} step={step}>
        <path d="M 740 125 H 790" stroke={C.muted} strokeWidth={2} markerEnd="url(#g7-arr2)" />
        {ROLES.map((r, i) => {
          const a = -Math.PI / 2 + (i * 2 * Math.PI) / ROLES.length;
          const x = 985 + 135 * Math.cos(a), y = 130 + 100 * Math.sin(a);
          return (
            <g key={r}>
              <line x1={985} y1={130} x2={x} y2={y} stroke={C.rule} strokeWidth={1.5} />
              <circle cx={x} cy={y} r={9} fill={C.accent} />
              <text className="t-label" x={x} y={y + (Math.sin(a) > 0.2 ? 30 : Math.sin(a) < -0.9 ? -16 : -14)} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.ink}>{r}</text>
            </g>
          );
        })}
        <rect x={938} y={112} width={94} height={36} rx={6} fill={C.tint} stroke={C.accent} />
        <text className="t-label" x={985} y={136} textAnchor="middle" fontFamily={MONO} fontSize={15} fill={C.ink}>ledger</text>
      </Show>

      {/* step 2: cooked twice */}
      <Show at={2} step={step}>
        <g transform="translate(20 330)">
          {[["pre-cook", 0], ["today, from scratch", 90]].map(([t, y]) => (
            <g key={t as string}>
              <rect x={0} y={y as number} width={380} height={56} rx={28} fill={C.tint} />
              <text className="t-label" x={28} y={(y as number) + 37} fontFamily={SANS} fontSize={24} fill={C.ink}>{t}</text>
              <path d={`M 390 ${(y as number) + 28} H 450`} stroke={C.muted} strokeWidth={2} markerEnd="url(#g7-arr2)" />
            </g>
          ))}
          <rect x={462} y={18} width={96} height={110} rx={10} fill={C.warmTint} stroke={C.ink} strokeWidth={3} />
          <text className="t-label" x={510} y={82} textAnchor="middle" fontFamily={MONO} fontSize={20} fill={C.ink}>same</text>
          <line x1={0} x2={380} y1={73} y2={73} stroke={C.warm} strokeWidth={2} strokeDasharray="6 5" />
          <text x={190} y={194} textAnchor="middle" fontFamily={SANS} fontSize={22} fill={C.warm}>no shared notes</text>
        </g>
      </Show>

      {/* step 3: the score */}
      <Show at={3} step={step}>
        <g transform="translate(680 335)">
          <rect x={0} y={0} width={500} height={78} rx={12} fill="none" stroke={C.good} strokeWidth={2} />
          <text x={26} y={50} fontFamily={SANS} fontSize={25} fill={C.ink}>✓ scored on held-out predictions</text>
          <text x={26} y={140} fontFamily={SANS} fontSize={22} fill={C.muted}>✗ not the Lagrangian's form</text>
        </g>
      </Show>
      <defs>
        <marker id="g7-arr2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill={C.muted} />
        </marker>
      </defs>
    </Canvas>
  );
}
