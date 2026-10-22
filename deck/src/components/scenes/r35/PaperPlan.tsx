"use client";

import { motion } from "motion/react";
import { Arrow, C, Canvas, MONO, SANS, Show } from "../r9/kit";

// basic-model-paper (round 3: say exactly what a claim in the paper carries).
// Each claim carries its ledger run ids, the referee's prediction committed
// before the run, and pass or fail from the scorecard; failed and killed claims
// are kept (lab brief: "Include failures and dead ends"; referee.md: scorecard
// of predictions passed and failed). Method only, no hidden-universe content.
// basic-model-paper: the outline exists before the results. Each section has a
// source file in the lab's workspace (step 0). A section is written only after
// its rung's check passes (step 1, one section fills as an illustration), its
// figures come from the ledger, "good enough" is per milestone, and the limits
// section is drafted in advance.
const SOURCES = [
  { f: "ledger.csv", d: "every run and its cost" },
  { f: "PARTICLES.md", d: "the table" },
  { f: "NOTEBOOK.md", d: "evidence, dead ends" },
  { f: "THEORY.md", d: "the current theory" },
];
const SECTIONS = [
  { t: "Detector, data and budget", src: 0, m: "" },
  { t: "Particle table", src: 1, m: "M1" },
  { t: "Conservation laws", src: 2, m: "M2" },
  { t: "Decays", src: 2, m: "M3" },
  { t: "Spins and interactions", src: 2, m: "M4, M5" },
  { t: "Theory and held-out tests", src: 3, m: "M6" },
  { t: "Limits", src: -1, m: "" },
];
const PX = 380, PW = 400, SH = 62, PY = 20;
const sy = (i: number) => PY + 30 + i * SH;

export function PaperPlan({ step }: { step: number }) {
  const fill = step >= 1;
  return (
    <Canvas label="The lab's files feed a paper outline written before the results; a section is written only once its milestone passes; every claim carries its run ids, the prediction made before the run, and pass or fail; killed claims stay in; the limits section is drafted in advance">
      {SOURCES.map((s, i) => (
        <g key={s.f}>
          <rect x={10} y={60 + i * 110} width={260} height={74} rx={10} fill="#fffdf8" stroke={C.muted} strokeWidth={1.5} />
          <text className="t-label" x={28} y={92 + i * 110} fontFamily={MONO} fontSize={19} fill={C.ink}>{s.f}</text>
          <text className="t-label" x={28} y={118 + i * 110} fontFamily={MONO} fontSize={14} fill={C.muted}>{s.d}</text>
        </g>
      ))}
      <rect x={PX} y={PY} width={PW} height={SECTIONS.length * SH + 40} rx={8} fill="#fffdf8" stroke={C.ink} strokeWidth={1.5} />
      {SECTIONS.map((s, i) => {
        const top = sy(i);
        const isDemo = i === 1; // the section filled in the illustration
        return (
          <g key={s.t}>
            {s.src >= 0 && <path d={`M 272 ${97 + s.src * 110} C 320 ${97 + s.src * 110}, 330 ${top + 20}, ${PX - 6} ${top + 20}`} fill="none" stroke={C.rule} strokeWidth={1.5} markerEnd="url(#r9-pp)" />}
            <text className="t-label" x={PX + 20} y={top + 22} fontFamily={MONO} fontSize={17} fill={C.ink}>{s.t}</text>
            {s.m && <text className="t-label" x={PX + PW - 16} y={top + 22} textAnchor="end" fontFamily={MONO} fontSize={15} fill={C.accent}>{s.m}</text>}
            <rect x={PX + 20} y={top + 32} width={PW - 40} height={20} rx={4} fill="none" stroke={C.faint} strokeDasharray="5 5" />
            {isDemo && (
              <motion.rect x={PX + 22} y={top + 34} height={16} rx={3} fill={C.accent} opacity={0.35} initial={false} animate={{ width: fill ? PW - 44 : 0 }} transition={{ duration: 1.4, ease: "easeOut" }} />
            )}
            {i === SECTIONS.length - 1 && <rect x={PX + 22} y={top + 34} width={PW - 44} height={16} rx={3} fill={C.warm} opacity={fill ? 0.3 : 0} />}
          </g>
        );
      })}

      <g transform="translate(815 50)">
        <text x={0} y={0} fontFamily={SANS} fontSize={26} fill={C.ink}>Outline first,</text>
        <text x={0} y={34} fontFamily={SANS} fontSize={26} fill={C.ink}>results later.</text>
        <text x={0} y={70} fontFamily={SANS} fontSize={21} fill={C.muted}>We decide now what</text>
        <text x={0} y={96} fontFamily={SANS} fontSize={21} fill={C.muted}>each section must show.</text>
        <Show at={1} step={step}>
          <text x={0} y={146} fontFamily={SANS} fontSize={22} fill={C.accent}>A section is written only once</text>
          <text x={0} y={174} fontFamily={SANS} fontSize={22} fill={C.accent}>its milestone passes.</text>
          <text className="t-label" x={0} y={198} fontFamily={MONO} fontSize={14} fill={C.muted}>illustration, not today&apos;s state</text>
          <text x={0} y={236} fontFamily={SANS} fontSize={21} fill={C.ink}>Every claim in it carries:</text>
          {["the run ids behind it", "the prediction made before the run", "pass or fail, from the scorecard"].map((t, i) => (
            <text key={t} x={12} y={266 + i * 28} fontFamily={SANS} fontSize={19} fill={C.ink}>· {t}</text>
          ))}
          <text x={0} y={364} fontFamily={SANS} fontSize={19} fill={C.muted}>Killed claims stay in, as dead ends.</text>
          <text x={0} y={410} fontFamily={SANS} fontSize={21} fill={C.warm}>Limits, drafted now:</text>
          {["states above the beam energy", "theories that predict alike", "detector blind spots"].map((t, i) => (
            <text key={t} className="t-label" x={0} y={438 + i * 26} fontFamily={MONO} fontSize={16} fill={C.ink}>· {t}</text>
          ))}
        </Show>
      </g>
      <Arrow id="r9-pp" color={C.faint} />
    </Canvas>
  );
}
