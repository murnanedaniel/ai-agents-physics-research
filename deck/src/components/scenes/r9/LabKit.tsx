"use client";

import { useState } from "react";
import { C, Canvas, MONO, SANS, stop } from "./kit";

// demo-newuniverse: what the lab works with. Left: the brief it reads. Middle:
// a lead agent with five roles (hover for each one's job). Right: what it writes. Bottom: the
// plan for the day. Nothing here describes the hidden universe.
const BRIEF = ["given: a relativistic QFT", "data only from the oracle", "a budget of events", "the detector: geometry, field, units", "goal: milestones M1 to M6"];
const ROLES = [
  { k: "spectroscopist", job: "masses from curvature, timing and energy loss" },
  { k: "bookkeeper", job: "what is conserved; which reactions never happen" },
  { k: "amplitude analyst", job: "angles give spins; energy dependence gives couplings" },
  { k: "theorist", job: "writes candidate theories as its own UFO, runs its own MadGraph" },
  { k: "referee", job: "writes predictions down before each run" },
];
const FILES = [["NOTEBOOK.md", "dated: question, run, result"], ["THEORY.md", "claims with confidence"], ["PARTICLES.md", "the current table"], ["ledger.csv", "every request, its cost"]];
const PLAN = [
  ["Wednesday", "a pre-cook lab tests the set-up", ""],
  ["today, running since the morning", "a fresh lab, same universe,", "no pre-cook notes; we watch live"],
  ["end of day", "both labs predict 8 held-out", "experiments, then the reveal"],
];

export function LabKit() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Canvas label="The lab reads a brief, works as five roles, and writes a notebook, a theory, a particle table and a ledger; the day runs a fresh lab, then both labs predict held-out tests before the reveal; a guard hook and an audit keep the sealed side sealed" viewBox="0 0 1200 580">
      {/* brief */}
      <rect x={10} y={10} width={330} height={300} rx={12} fill="#fffdf8" stroke={C.muted} strokeWidth={1.5} />
      <text x={30} y={52} fontFamily={MONO} fontSize={24} fill={C.ink}>BRIEF.md</text>
      {BRIEF.map((b, i) => (
        <text key={b} className="t-label" x={30} y={96 + i * 46} fontFamily={SANS} fontSize={19} fill={C.ink}>· {b}</text>
      ))}
      <path d="M 350 160 H 392" stroke={C.muted} strokeWidth={2} />

      {/* roles */}
      <rect x={400} y={10} width={400} height={300} rx={12} fill={C.tint} stroke={C.accent} strokeWidth={1.5} />
      <text x={420} y={52} fontFamily={SANS} fontSize={24} fill={C.ink}>a lead agent, five roles</text>
      {ROLES.map((r, i) => (
        <g key={r.k} {...stop} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
          <rect x={418} y={74 + i * 46} width={364} height={38} rx={19} fill={hover === i ? C.accent : C.paper} stroke={C.accent} strokeWidth={1.2} />
          <text className="t-label" x={438} y={100 + i * 46} fontFamily={MONO} fontSize={18} fill={hover === i ? C.paper : C.ink}>{r.k}</text>
        </g>
      ))}
      <path d="M 810 160 H 852" stroke={C.muted} strokeWidth={2} />

      {/* outputs */}
      <rect x={860} y={10} width={330} height={300} rx={12} fill="#fffdf8" stroke={C.muted} strokeWidth={1.5} />
      <text x={880} y={52} fontFamily={SANS} fontSize={24} fill={C.ink}>it writes</text>
      {FILES.map(([f, d], i) => (
        <g key={f}>
          <text className="t-label" x={880} y={98 + i * 54} fontFamily={MONO} fontSize={18} fill={C.ink}>{f}</text>
          <text className="t-label" x={880} y={120 + i * 54} fontFamily={MONO} fontSize={14} fill={C.muted}>{d}</text>
        </g>
      ))}

      <text x={600} y={352} textAnchor="middle" fontFamily={SANS} fontSize={23} fill={C.accent}>
        {hover === null ? "Hover a role for its job." : ROLES[hover].job}
      </text>

      {/* the day */}
      <g transform="translate(10 380)">
        {PLAN.map(([when, what, more], i) => (
          <g key={when} transform={`translate(${i * 400} 0)`}>
            <rect x={0} y={0} width={380} height={96} rx={10} fill={i === 1 ? C.warmTint : "none"} stroke={i === 1 ? C.warm : C.rule} strokeWidth={1.5} />
            <text className="t-label" x={18} y={28} fontFamily={MONO} fontSize={16} fill={i === 1 ? C.warm : C.muted}>{when}</text>
            <text className="t-label" x={18} y={56} fontFamily={SANS} fontSize={18} fill={C.ink}>{what}</text>
            {more && <text className="t-label" x={18} y={80} fontFamily={SANS} fontSize={18} fill={C.ink}>{more}</text>}
          </g>
        ))}
        <text x={0} y={134} fontFamily={SANS} fontSize={21} fill={C.ink}>A guard hook blocks the sealed side, and every transcript is audited afterwards.</text>
        <text x={0} y={166} fontFamily={SANS} fontSize={21} fill={C.warm}>From the pre-cook: settle permissions before launch, or the lab waits for a human.</text>
      </g>
    </Canvas>
  );
}
