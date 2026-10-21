"use client";

import { motion } from "motion/react";
import { Arrow, C, Canvas, MONO, SANS, Show } from "./kit";

// basic-model-paper: the outline exists before the results. Each section has a
// source file in the lab's workspace (step 0). A section is written only after
// its rung's check passes (step 1, one section fills as an illustration), and
// the limits section is drafted in advance.
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
    <Canvas label="The lab's files feed a paper outline written before the results; a section is written only after its milestone's check passes; the limits section is drafted in advance">
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

      <g transform="translate(830 60)">
        <text x={0} y={0} fontFamily={SANS} fontSize={26} fill={C.ink}>Outline first,</text>
        <text x={0} y={36} fontFamily={SANS} fontSize={26} fill={C.ink}>results later.</text>
        <Show at={1} step={step}>
          <text x={0} y={110} fontFamily={SANS} fontSize={24} fill={C.accent}>A section is written</text>
          <text x={0} y={142} fontFamily={SANS} fontSize={24} fill={C.accent}>once its check passes.</text>
          <text className="t-label" x={0} y={170} fontFamily={MONO} fontSize={14} fill={C.muted}>illustration, not today's state</text>
          <text x={0} y={250} fontFamily={SANS} fontSize={24} fill={C.warm}>Limits, drafted now:</text>
          {["states above the beam energy", "theories that predict alike", "detector blind spots"].map((t, i) => (
            <text key={t} className="t-label" x={0} y={284 + i * 30} fontFamily={MONO} fontSize={16} fill={C.ink}>· {t}</text>
          ))}
        </Show>
      </g>
      <Arrow id="r9-pp" color={C.faint} />
    </Canvas>
  );
}
