"use client";

import { useState } from "react";
import { Arrow, C, Canvas, MONO, SANS, SERIF, Show, stop } from "../r10/kit";

// judges, round 3 (Daniel, 22 Oct 2026: "where did the proposals come from? say this works
// for job applications and interview prep"). Method record: notes/w13/JUDGE-PANEL-METHOD.md
// (correction of 2026-10-16). Anchors: 3 real past ERC proposals with outcomes shown.
// Held-out: 11 other real past ERC proposals with known outcomes, scored blind; one of them
// is my own 2025 StG, never published. AUC on the mean rank, bootstrap 95% CI.
// Row C uses the recorded numbers: panel 76 against the real Step 1 range 78 to 87
// (rank percentile, 1 = best). Daniel recalls "about 83%", inside the real range: if he
// wants a different figure, change OWN_PANEL / REAL_LO / REAL_HI only.
const AUC = "0.93", CI = "95% CI 0.71 TO 1.00", N = "N = 11: 7 FUNDED, 4 NOT";
const OWN_PANEL = 76, REAL_LO = 78, REAL_HI = 87;
const ROW = { a: 66, b: 236, c: 406 };

function Doc({ x, y, filled, mine = false }: { x: number; y: number; filled: boolean; mine?: boolean }) {
  return <path d={`M${x} ${y} h18 l8 8 v26 h-26 z`} fill={filled ? C.accent : C.paper} stroke={mine ? C.warm : C.accent} strokeWidth={mine ? 3 : 2} />;
}

export function JudgePanelR3({ step }: { step: number }) {
  const [hover, setHover] = useState(false);
  const rank = (v: number) => 600 + ((v - 1) / 99) * 560;
  return (
    <Canvas viewBox="0 0 1200 650" label="Three model judges see three real past ERC proposals with their outcomes. On eleven other real past proposals, outcomes hidden, they rank a funded one above an unfunded one in 93 percent of pairs. One of the eleven is my own 2025 proposal, never published: the judges placed it at 76, next to the real panel's 78 to 87. A PhD student can do the same for job applications and interview practice">
      <Arrow id="r36-jp" />
      {/* legend */}
      <g>
        <path d="M0 0 h12 l5 5 v15 h-17 z" fill={C.accent} transform="translate(0,616)" />
        <text className="t-label" x={26} y={632} fontSize={15} fill={C.muted} fontFamily={MONO}>FUNDED</text>
        <path d="M0 0 h12 l5 5 v15 h-17 z" fill={C.paper} stroke={C.accent} strokeWidth={1.5} transform="translate(120,616)" />
        <text className="t-label" x={146} y={632} fontSize={15} fill={C.muted} fontFamily={MONO}>NOT FUNDED</text>
        <path d="M0 0 h12 l5 5 v15 h-17 z" fill={C.paper} stroke={C.warm} strokeWidth={2.5} transform="translate(290,616)" />
        <text className="t-label" x={316} y={632} fontSize={15} fill={C.muted} fontFamily={MONO}>MINE</text>
      </g>

      {/* A: calibration */}
      <Show at={0} step={step}>
        <text x={0} y={ROW.a - 34} fontFamily={SANS} fontSize={25} fill={C.ink}>Three past ERC proposals, outcomes shown</text>
        <text className="t-label" x={0} y={ROW.a - 8} fontFamily={MONO} fontSize={15} fill={C.muted}>REAL PROPOSALS BY OTHER APPLICANTS</text>
        {[true, true, false].map((f, i) => <Doc key={i} x={i * 40} y={ROW.a + 6} filled={f} />)}
        <path d={`M440 ${ROW.a + 20} H540`} stroke={C.muted} strokeWidth={2} markerEnd="url(#r36-jp)" />
        {[0, 1, 2].map((i) => <circle key={i} cx={580 + i * 34} cy={ROW.a + 20} r={13} fill={C.paper} stroke={C.ink} strokeWidth={2} />)}
        <text x={700} y={ROW.a + 26} fontFamily={SANS} fontSize={24} fill={C.ink}>3 model judges</text>
        <text className="t-label" x={700} y={ROW.a + 54} fontFamily={MONO} fontSize={15} fill={C.muted}>EACH RANKS A PROPOSAL 1 (BEST) TO 100,</text>
        <text className="t-label" x={700} y={ROW.a + 74} fontFamily={MONO} fontSize={15} fill={C.muted}>AGAINST THE THREE IT HAS SEEN</text>
      </Show>

      {/* B: held-out test */}
      <Show at={1} step={step} dim>
        <text x={0} y={ROW.b - 50} fontFamily={SANS} fontSize={25} fill={C.ink}>Eleven more, outcomes hidden</text>
        <text className="t-label" x={0} y={ROW.b - 24} fontFamily={MONO} fontSize={15} fill={C.muted}>REAL PAST PROPOSALS · ONE OF THEM IS MINE</text>
        {Array.from({ length: 11 }, (_, i) => <Doc key={i} x={i * 36} y={ROW.b - 6} filled={i < 7} mine={i === 7} />)}
        <path d={`M440 ${ROW.b + 8} H540`} stroke={C.muted} strokeWidth={2} markerEnd="url(#r36-jp)" />
        <g {...stop} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ cursor: "default" }}>
          <text className="t-label" x={562} y={ROW.b - 50} fontSize={15} fill={C.muted} fontFamily={MONO}>AUC</text>
          <text x={558} y={ROW.b + 24} fontFamily={SERIF} fontStyle="italic" fontSize={72} fill={C.ink}>{AUC}</text>
          <text className="t-label" x={562} y={ROW.b + 56} fontSize={15} fill={C.muted} fontFamily={MONO}>{hover ? "28 FUNDED-UNFUNDED PAIRS" : CI}</text>
        </g>
        <text className="t-label" x={760} y={ROW.b - 28} fontSize={15} fill={C.muted} fontFamily={MONO}>TAKE ONE FUNDED, ONE NOT:</text>
        <text x={760} y={ROW.b + 6} fontFamily={SANS} fontSize={24} fill={C.ink}>funded ranked higher</text>
        <text x={760} y={ROW.b + 38} fontFamily={SANS} fontSize={24} fill={C.ink}>in 93% of pairs</text>
        <text className="t-label" x={760} y={ROW.b + 68} fontSize={15} fill={C.muted} fontFamily={MONO}>CHANCE IS 50% · {N}</text>
      </Show>

      {/* C: my own proposal */}
      <Show at={2} step={step} dim>
        <text x={0} y={ROW.c - 30} fontFamily={SANS} fontSize={25} fill={C.ink}>My own 2025 ERC proposal</text>
        <text className="t-label" x={0} y={ROW.c - 2} fontFamily={MONO} fontSize={15} fill={C.muted}>NEVER PUBLISHED, SO NO MODEL</text>
        <text className="t-label" x={0} y={ROW.c + 18} fontFamily={MONO} fontSize={15} fill={C.muted}>CAN HAVE MEMORISED ITS OUTCOME</text>
        <Doc x={380} y={ROW.c - 22} filled={false} mine />
        <path d={`M440 ${ROW.c - 6} H540`} stroke={C.muted} strokeWidth={2} markerEnd="url(#r36-jp)" />
        <line x1={rank(1)} x2={rank(100)} y1={ROW.c - 6} y2={ROW.c - 6} stroke={C.rule} strokeWidth={2} />
        <text className="t-label" x={rank(1)} y={ROW.c - 22} fontSize={15} fill={C.muted} fontFamily={MONO}>1 · BEST</text>
        <text className="t-label" x={rank(100)} y={ROW.c - 22} fontSize={15} textAnchor="end" fill={C.muted} fontFamily={MONO}>100</text>
        <rect x={rank(REAL_LO)} y={ROW.c - 20} width={rank(REAL_HI) - rank(REAL_LO)} height={28} fill={C.warm} opacity={0.3} />
        <text className="t-label" x={rank(REAL_HI)} y={ROW.c + 30} fontSize={15} textAnchor="end" fill={C.warm} fontFamily={MONO}>REAL PANEL {REAL_LO} TO {REAL_HI}</text>
        <circle cx={rank(OWN_PANEL)} cy={ROW.c - 6} r={10} fill={C.accent} />
        <text className="t-label" x={rank(OWN_PANEL) - 18} y={ROW.c - 32} fontSize={15} textAnchor="end" fill={C.accent} fontFamily={MONO}>MODEL PANEL {OWN_PANEL}</text>
        <text x={600} y={ROW.c + 72} fontFamily={SANS} fontSize={24} fill={C.ink}>Close to where the real panel put it.</text>

        <rect x={0} y={ROW.c + 108} width={1200} height={86} rx={14} fill={C.tint} stroke={C.accent} strokeWidth={1.5} />
        <text x={24} y={ROW.c + 144} fontFamily={SANS} fontSize={24} fill={C.ink}>PhD students: the same set-up works for a job or fellowship application,</text>
        <text x={24} y={ROW.c + 176} fontFamily={SANS} fontSize={24} fill={C.ink}>anchored on a few past ones with known outcomes, and as a mock interview panel.</text>
      </Show>
    </Canvas>
  );
}
