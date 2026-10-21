"use client";

import { motion } from "motion/react";
import { Arrow, C, MONO, SANS, SERIF, Show, Stage } from "./kit";

// tdd. Step 0: why, with two catches from Daniel's own threads shown earlier
// in the day (beam-spot paper: a predict-zero baseline at 0.0159 mm against
// the transformer's 0.0147 mm d0 resolution; Pandora log: the agent twice
// reported results before its runs had finished). Step 1: the checks written
// first and the baseline gate. Step 2: the happy path, a tiny slice end to
// end. Baseline: Caruso et al., Nat. Commun. 17 (2026), Table 1 (PaiNN, DHA).
const CATCHES = [
  { where: "Beam-spot paper", big: "0.0159 vs 0.0147 mm", text: ["always predicting zero nearly", "matched the transformer"] },
  { where: "Pandora speed-up", big: "twice", text: ["the agent reported results", "before the runs had finished"] },
];
const CHECKS = ["error falls on a tiny slice", "baseline reproduces 0.199", "variant beats seed spread"];

export function ChecksBeforeRuns({ step }: { step: number }) {
  const why = step === 0;
  return (
    <Stage label="First two catches where an agent's success was not real, then a pipeline: checks written first, a tiny end-to-end run, a baseline gate, then variants">
      <svg viewBox="0 0 1200 460" width="100%" style={{ width: "100%", height: "100%" }}>
        <Arrow id="cb-arrow" />
        {/* step 0: why */}
        <motion.g initial={false} animate={{ opacity: why ? 1 : 0 }} transition={{ duration: 0.6 }} aria-hidden={!why} style={{ pointerEvents: why ? "auto" : "none" }}>
          {CATCHES.map((c, i) => {
            const x = 40 + i * 580;
            return (
              <g key={c.where}>
                <rect x={x} y={30} width={540} height={230} rx={14} fill={C.card} stroke={C.faint} strokeWidth={1.5} />
                <text className="t-label" x={x + 28} y={70} fontFamily={MONO} fontSize={17} fill={C.muted}>{c.where}</text>
                <text x={x + 28} y={130} fontFamily={SANS} fontSize={40} fontWeight={700} fill={C.warm}>{c.big}</text>
                {c.text.map((t, k) => (
                  <text key={t} x={x + 28} y={186 + k * 32} fontFamily={SANS} fontSize={23} fill={C.ink}>{t}</text>
                ))}
              </g>
            );
          })}
          <text x={600} y={334} textAnchor="middle" fontFamily={SERIF} fontStyle="italic" fontSize={32} fill={C.ink}>An agent wants to report success.</text>
          <text x={600} y={384} textAnchor="middle" fontFamily={SANS} fontSize={23} fill={C.muted}>A check written before the run cannot bend to fit it.</text>
        </motion.g>

        {/* steps 1 and 2: the checks, the gate, the happy path */}
        <Show at={1} step={step}>
          <rect x={0} y={70} width={330} height={250} rx={12} fill={C.card} stroke={step === 1 ? C.accent : C.faint} strokeWidth={step === 1 ? 2.5 : 1.5} />
          <text x={22} y={112} fontFamily={SANS} fontSize={25} fontWeight={600} fill={C.ink}>Checks, written first</text>
          {CHECKS.map((c, i) => {
            const hot = (i === 0 && step === 2) || (i > 0 && step === 1);
            return (
              <g key={c}>
                <rect x={24} y={146 + i * 56} width={22} height={22} rx={4} fill="#fff" stroke={hot ? C.accent : C.muted} strokeWidth={hot ? 2.5 : 1} />
                <text className="t-label" x={58} y={163 + i * 56} fontFamily={MONO} fontSize={16} fill={hot ? C.accent : C.ink}>{c}</text>
              </g>
            );
          })}
          <text className="t-label" x={0} y={30} fontFamily={MONO} fontSize={15} fill={C.muted}>test-driven development: the test</text>
          <text className="t-label" x={0} y={50} fontFamily={MONO} fontSize={15} fill={C.muted}>exists before the code it tests</text>

          {/* the baseline gate */}
          <path d="M 770 95 L 845 195 L 770 295 L 695 195 Z" fill={step === 1 ? C.accentSoft : C.card} stroke={step === 1 ? C.accent : C.faint} strokeWidth={step === 1 ? 2.5 : 1.5} />
          <text x={770} y={188} textAnchor="middle" fontFamily={SANS} fontSize={21} fill={C.ink}>baseline</text>
          <text x={770} y={214} textAnchor="middle" fontFamily={SANS} fontSize={21} fill={C.ink}>matches?</text>
          <text className="t-label" x={770} y={80} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.muted}>PaiNN 0.199 ± 0.004 kcal/mol</text>
          <path d="M 850 195 H 900" stroke={C.muted} strokeWidth={2.5} markerEnd="url(#cb-arrow)" />
          <text className="t-label" x={872} y={180} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.accent}>yes</text>
          <rect x={910} y={130} width={280} height={130} rx={12} fill={C.card} stroke={C.faint} strokeWidth={1.5} />
          <text x={1050} y={186} textAnchor="middle" fontFamily={SANS} fontSize={23} fill={C.ink}>variants</text>
          <text x={1050} y={218} textAnchor="middle" fontFamily={SANS} fontSize={23} fill={C.ink}>start to count</text>
          <path d="M 770 300 V 410 H 165 V 326" fill="none" stroke={C.warm} strokeWidth={2} strokeDasharray="6 5" markerEnd="url(#cb-arrow)" />
          <text className="t-label" x={470} y={436} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.warm}>no: fix the setup, not the target</text>
        </Show>

        {/* step 2: the happy path */}
        <Show at={2} step={step} ghost={step >= 1}>
          <path d="M 336 195 H 372" stroke={C.muted} strokeWidth={2.5} markerEnd="url(#cb-arrow)" />
          <rect x={380} y={110} width={230} height={170} rx={12} fill={step === 2 ? C.accentSoft : C.card} stroke={step === 2 ? C.accent : C.faint} strokeWidth={step === 2 ? 2.5 : 1.5} />
          <text x={495} y={172} textAnchor="middle" fontFamily={SANS} fontSize={23} fill={C.ink}>tiny slice,</text>
          <text x={495} y={204} textAnchor="middle" fontFamily={SANS} fontSize={23} fill={C.ink}>end to end</text>
          <text className="t-label" x={495} y={244} textAnchor="middle" fontFamily={MONO} fontSize={15} fill={C.accent}>the happy path</text>
          <path d="M 616 195 H 660" stroke={C.muted} strokeWidth={2.5} markerEnd="url(#cb-arrow)" />
          <text className="t-label" x={495} y={330} textAnchor="middle" fontFamily={MONO} fontSize={15} fill={C.muted}>simplest run that</text>
          <text className="t-label" x={495} y={350} textAnchor="middle" fontFamily={MONO} fontSize={15} fill={C.muted}>should just work</text>
        </Show>
      </svg>
    </Stage>
  );
}
