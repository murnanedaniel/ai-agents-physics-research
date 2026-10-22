"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { C, Canvas, MONO, SANS } from "../r9/kit";

// basic-model-ladder (round 3): what a milestone pass means, then two worked
// examples of a claim and the checks it must pass. Method only: the examples
// are generic (a conserved quantity, the symmetry group of a toy sector), not
// anything from the hidden universe.
// Grounding (public design notes, notes/w18, never p6-secret):
// - milestones M1-M6 and "each milestone counts on its own": lab brief (p6-swarm/BRIEF.md)
// - evidence in NOTEBOOK.md with ledger ids, "A claim without evidence in the notebook doesn't count": lab brief
// - the referee writes the prediction with uncertainty and commits it before the run, keeps a scorecard: p6-swarm/agents/referee.md
// - conserved charges as the null space of the reaction matrix, forbidden reactions with upper limits: agents/bookkeeper.md
// - spin from angular distributions, s/t-channel from energy dependence, finite cross sections at high energy: agents/amplitude-analyst.md
// - kill criteria set in advance; final score = held-out predictions, not Lagrangian identity (equivalent theories): P6-NEW-UNIVERSE-CONTEXT.md, proposal section
// - refits under perturbed data and dimensional consistency: Daniel's round-3 examples of checks
// Step 0: the ladder and what "pass" means. Step 1: example on M2. Step 2: example on M5-M6.
const RUNGS = [
  { id: "M1", name: "particles and masses", ev: "track curvature, timing, energy loss" },
  { id: "M2", name: "conservation laws", ev: "which reactions happen, which never do" },
  { id: "M3", name: "decays", ev: "peaks and branching fractions" },
  { id: "M4", name: "spins and charges", ev: "angular distributions" },
  { id: "M5", name: "interactions", ev: "how rates change with energy and angle" },
  { id: "M6", name: "a Lagrangian", ev: "its own UFO, compared with the data" },
];
const PASS = [
  ["its evidence is in the notebook", "with the run ids from the ledger"],
  ["a prediction was written first", "by the referee, committed before the run"],
  ["the data agree with the prediction", "within the uncertainty stated up front"],
  ["no kill criterion fired", "criteria set before the run"],
];
const EXAMPLES = [
  {
    rungs: [1],
    claim: ["Claim: a quantity Q is conserved", "in every reaction."],
    checks: [
      ["bookkeeping", "Q is a null vector of the table of reactions seen"],
      ["forbidden run", "a Q-changing reaction is allowed by energy: run it, see none, quote a limit"],
      ["refit", "drop a fifth of the reactions at random; the same Q comes back"],
      ["kill if", "one clean event changes Q"],
    ],
  },
  {
    rungs: [4, 5],
    claim: ["Claim: one toy sector's force comes", "from a gauge symmetry, group G."],
    checks: [
      ["spin", "angular distributions say the carrier has spin 1"],
      ["couplings", "their ratios are the ones G fixes"],
      ["consistency", "units check; rates stay finite at high energy"],
      ["held-out", "a rate at an energy never run, predicted first"],
      ["kill if", "it misses by more than 2σ (set before the run)"],
    ],
  },
];
const ROW = 70, BASE = 470;
const y = (i: number) => BASE - i * ROW;

function Swap({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <motion.g aria-hidden={!on} initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: 0.5 }} style={{ pointerEvents: on ? "auto" : "none" }}>
      {children}
    </motion.g>
  );
}

export function CheckLadder({ step }: { step: number }) {
  const ex = step >= 1 ? EXAMPLES[Math.min(step, 2) - 1] : null;
  return (
    <Canvas label="Six milestones, from particles and masses to a Lagrangian. A claim passes only if its evidence is in the notebook, a prediction was written before the run, the data agree within the stated uncertainty, and no kill criterion fired. Two worked examples follow: a conserved quantity, and the symmetry group of a toy sector, each with its checks.">
      <line x1={70} x2={70} y1={y(5) - 34} y2={BASE + 34} stroke={C.rule} strokeWidth={6} />
      <text className="t-label" x={110} y={y(5) - 46} fontFamily={MONO} fontSize={17} fill={C.muted}>milestone</text>
      <text className="t-label" x={390} y={y(5) - 46} fontFamily={MONO} fontSize={17} fill={C.muted}>evidence</text>
      {RUNGS.map((r, i) => {
        const lit = !ex || ex.rungs.includes(i);
        return (
          <motion.g key={r.id} initial={false} animate={{ opacity: lit ? 1 : 0.3 }} transition={{ duration: 0.5 }}>
            <rect x={40} y={y(i) - 24} width={60} height={48} rx={10} fill={C.tint} stroke={ex && lit ? C.warm : i === 5 ? C.ink : C.accent} strokeWidth={ex && lit ? 3 : i === 5 ? 3 : 2} />
            <text className="t-label" x={70} y={y(i) + 7} textAnchor="middle" fontFamily={MONO} fontSize={20} fill={i === 5 ? C.ink : C.accent}>{r.id}</text>
            <text x={114} y={y(i) + 8} fontFamily={SANS} fontSize={23} fill={C.ink}>{r.name}</text>
            <text className="t-label" x={390} y={y(i) + 7} fontFamily={MONO} fontSize={16} fill={C.muted}>{r.ev}</text>
          </motion.g>
        );
      })}

      <g transform="translate(770 0)">
        {/* step 0: what a pass means */}
        <Swap on={step === 0}>
          <text x={0} y={y(5) - 40} fontFamily={SANS} fontSize={24} fill={C.ink}>A claim passes a rung only if:</text>
          {PASS.map(([h, d], i) => (
            <g key={h} transform={`translate(0 ${y(5) - 10 + i * 66})`}>
              <circle cx={14} cy={10} r={13} fill={C.tint} stroke={C.accent} strokeWidth={1.5} />
              <text className="t-label" x={14} y={16} textAnchor="middle" fontFamily={MONO} fontSize={15} fill={C.accent}>{i + 1}</text>
              <text x={38} y={17} fontFamily={SANS} fontSize={20} fill={C.ink}>{h}</text>
              <text className="t-label" x={38} y={40} fontFamily={MONO} fontSize={14} fill={C.muted}>{d}</text>
            </g>
          ))}
          <text x={0} y={y(5) + 286} fontFamily={SANS} fontSize={20} fill={C.warm}>Passing means it survived these checks.</text>
          <text x={0} y={y(5) + 312} fontFamily={SANS} fontSize={20} fill={C.warm}>It can still be wrong.</text>
          <text x={0} y={y(5) + 352} fontFamily={SANS} fontSize={20} fill={C.ink}>Final score: held-out experiments,</text>
          <text x={0} y={y(5) + 378} fontFamily={SANS} fontSize={20} fill={C.ink}>scored outside the lab.</text>
          <text className="t-label" x={0} y={y(5) + 402} fontFamily={MONO} fontSize={13} fill={C.muted}>not the Lagrangian&apos;s form: different-looking</text>
          <text className="t-label" x={0} y={y(5) + 420} fontFamily={MONO} fontSize={13} fill={C.muted}>ones can describe the same physics</text>
        </Swap>

        {/* steps 1 and 2: worked examples */}
        {EXAMPLES.map((e, k) => (
          <Swap key={k} on={step === k + 1}>
            <text className="t-label" x={0} y={y(5) - 50} fontFamily={MONO} fontSize={14} fill={C.muted}>worked example, generic, not from the lab</text>
            {e.claim.map((l, j) => (
              <text key={l} x={0} y={y(5) - 22 + j * 28} fontFamily={SANS} fontSize={21} fill={C.ink} fontWeight={j === 0 ? 600 : 400}>{l}</text>
            ))}
            {e.checks.map(([h, d], i) => {
              const kill = h === "kill if";
              const top = y(5) + 50 + i * (e.checks.length > 4 ? 72 : 80);
              return (
                <g key={h} transform={`translate(0 ${top})`}>
                  <rect x={0} y={-22} width={420} height={e.checks.length > 4 ? 66 : 70} rx={8} fill={kill ? C.warmTint : "#fffdf8"} stroke={kill ? C.warm : C.rule} strokeWidth={1.2} />
                  <text className="t-label" x={14} y={-2} fontFamily={MONO} fontSize={14} fill={kill ? C.warm : C.accent}>{h}</text>
                  <Wrap x={14} y={20} text={d} />
                </g>
              );
            })}
          </Swap>
        ))}
      </g>
    </Canvas>
  );
}

// Two-line wrap for the check text (SVG has no wrapping).
function Wrap({ x, y, text }: { x: number; y: number; text: string }) {
  const max = 40;
  const words = text.split(" ");
  const lines: string[] = [""];
  words.forEach((w) => {
    const cur = lines[lines.length - 1];
    if ((cur + " " + w).trim().length > max) lines.push(w);
    else lines[lines.length - 1] = (cur + " " + w).trim();
  });
  return (
    <>
      {lines.map((l, i) => (
        <text key={i} x={x} y={y + i * 22} fontFamily={SANS} fontSize={18} fill={C.ink}>{l}</text>
      ))}
    </>
  );
}
