"use client";

import { useState } from "react";
import { Arrow, C, Canvas, MONO, SANS, SERIF, Show, stop } from "./kit";

// judges: how a panel of model judges was checked before its scores were used.
// Mock ERC Step 1 panel, Oct 2026 (notes/w13/JUDGE-PANEL-METHOD.md): 3 judges
// anchored on 3 past proposals with known outcomes; 11 other past proposals
// scored blind; AUC on the mean rank, bootstrap 95% CI. Row 3 is schematic:
// the ERC percentiles stay demo-only (STORYBOARD 3.13).
const AUC = "0.93", CI = "95% CI 0.71 TO 1.00", N = "N = 11: 7 FUNDED, 4 NOT";
const UNSEEN_PANEL = 62, REAL_LO = 66, REAL_HI = 80;
const ROW = { a: 70, b: 255, c: 430 };

function Doc({ x, y, filled }: { x: number; y: number; filled: boolean }) {
  return <path d={`M${x} ${y} h18 l8 8 v26 h-26 z`} fill={filled ? C.accent : C.paper} stroke={C.accent} strokeWidth={2} />;
}

export function JudgePanel({ step }: { step: number }) {
  const [hover, setHover] = useState(false);
  const rank = (v: number) => 600 + ((v - 1) / 99) * 560;
  return (
    <Canvas viewBox="0 0 1200 580" label="Three model judges calibrated on three past proposals; on eleven unseen past proposals they rank a funded one above an unfunded one 93 percent of the time; on my own unpublished proposal they ranked it a little better than the real ERC panel did">
      <Arrow id="r10-jp" />
      {/* legend */}
      <g>
        <path d="M0 0 h12 l5 5 v15 h-17 z" fill={C.accent} transform="translate(0,556)" />
        <text className="t-label" x={26} y={572} fontSize={15} fill={C.muted} fontFamily={MONO}>FUNDED</text>
        <path d="M0 0 h12 l5 5 v15 h-17 z" fill={C.paper} stroke={C.accent} strokeWidth={1.5} transform="translate(120,556)" />
        <text className="t-label" x={146} y={572} fontSize={15} fill={C.muted} fontFamily={MONO}>NOT FUNDED</text>
      </g>

      {/* A: calibration */}
      <Show at={0} step={step}>
        <text x={0} y={ROW.a - 30} fontFamily={SANS} fontSize={25} fill={C.ink}>Three past proposals, outcomes shown</text>
        {[true, true, false].map((f, i) => <Doc key={i} x={i * 40} y={ROW.a - 8} filled={f} />)}
        <path d={`M440 ${ROW.a + 8} H540`} stroke={C.muted} strokeWidth={2} markerEnd="url(#r10-jp)" />
        {[0, 1, 2].map((i) => <circle key={i} cx={580 + i * 34} cy={ROW.a + 8} r={13} fill={C.paper} stroke={C.ink} strokeWidth={2} />)}
        <text x={700} y={ROW.a + 14} fontFamily={SANS} fontSize={24} fill={C.ink}>3 model judges</text>
        <text className="t-label" x={700} y={ROW.a + 42} fontFamily={MONO} fontSize={15} fill={C.muted}>RANK EACH PROPOSAL 1 TO 100</text>
      </Show>

      {/* B: held-out test */}
      <Show at={1} step={step} dim>
        <text x={0} y={ROW.b - 50} fontFamily={SANS} fontSize={25} fill={C.ink}>Eleven more, hidden</text>
        {Array.from({ length: 11 }, (_, i) => <Doc key={i} x={i * 36} y={ROW.b - 28} filled={i < 7} />)}
        <path d={`M440 ${ROW.b - 10} H540`} stroke={C.muted} strokeWidth={2} markerEnd="url(#r10-jp)" />
        <g {...stop} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ cursor: "default" }}>
          <text className="t-label" x={562} y={ROW.b - 62} fontSize={15} fill={C.muted} fontFamily={MONO}>AUC</text>
          <text x={558} y={ROW.b + 12} fontFamily={SERIF} fontStyle="italic" fontSize={72} fill={C.ink}>{AUC}</text>
          <text className="t-label" x={562} y={ROW.b + 44} fontSize={15} fill={C.muted} fontFamily={MONO}>{hover ? "28 FUNDED-UNFUNDED PAIRS" : CI}</text>
        </g>
        <text className="t-label" x={760} y={ROW.b - 40} fontSize={15} fill={C.muted} fontFamily={MONO}>TAKE ONE FUNDED, ONE NOT:</text>
        <text x={760} y={ROW.b - 6} fontFamily={SANS} fontSize={24} fill={C.ink}>funded ranked higher</text>
        <text x={760} y={ROW.b + 26} fontFamily={SANS} fontSize={24} fill={C.ink}>in 93% of pairs</text>
        <text className="t-label" x={760} y={ROW.b + 56} fontSize={15} fill={C.muted} fontFamily={MONO}>CHANCE IS 50% · {N}</text>
      </Show>

      {/* C: unpublished proposal */}
      <Show at={2} step={step} dim>
        <text x={0} y={ROW.c - 30} fontFamily={SANS} fontSize={25} fill={C.ink}>Mine, unpublished:</text>
        <text className="t-label" x={0} y={ROW.c + 2} fontFamily={MONO} fontSize={15} fill={C.muted}>SO IT CANNOT BE MEMORISED</text>
        <Doc x={380} y={ROW.c - 22} filled={false} />
        <path d={`M440 ${ROW.c - 6} H540`} stroke={C.muted} strokeWidth={2} markerEnd="url(#r10-jp)" />
        <line x1={rank(1)} x2={rank(100)} y1={ROW.c - 6} y2={ROW.c - 6} stroke={C.rule} strokeWidth={2} />
        <text className="t-label" x={rank(1)} y={ROW.c - 22} fontSize={15} fill={C.muted} fontFamily={MONO}>BEST</text>
        <text className="t-label" x={rank(100)} y={ROW.c - 22} fontSize={15} textAnchor="end" fill={C.muted} fontFamily={MONO}>WORST</text>
        <text className="t-label" x={rank(30)} y={ROW.c + 30} fontSize={15} textAnchor="middle" fill={C.muted} fontFamily={MONO}>SCHEMATIC</text>
        <rect x={rank(REAL_LO)} y={ROW.c - 20} width={rank(REAL_HI) - rank(REAL_LO)} height={28} fill={C.warm} opacity={0.3} />
        <text className="t-label" x={rank(REAL_LO)} y={ROW.c + 30} fontSize={15} fill={C.warm} fontFamily={MONO}>REAL ERC PANEL</text>
        <circle cx={rank(UNSEEN_PANEL)} cy={ROW.c - 6} r={10} fill={C.accent} />
        <text className="t-label" x={rank(UNSEEN_PANEL) - 18} y={ROW.c - 32} fontSize={15} textAnchor="end" fill={C.accent} fontFamily={MONO}>MODEL PANEL</text>
        <text x={600} y={ROW.c + 76} fontFamily={SANS} fontSize={24} fill={C.ink}>Close to the real panel, a little kinder.</text>
        <text className="t-label" x={1160} y={ROW.c + 108} textAnchor="end" fontFamily={MONO} fontSize={15} fill={C.muted}>LIVE, THIS PANEL SCORES THE EUROHPC DRAFT</text>
      </Show>
    </Canvas>
  );
}
