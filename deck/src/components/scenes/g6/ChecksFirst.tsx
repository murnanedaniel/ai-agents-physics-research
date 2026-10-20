"use client";

import { Arrow, C, MONO, SANS, Show, Stage } from "./kit";

// Tests first, a baseline gate, and the happy path, shown as one pipeline.
// Reveal order follows the speech (checks, gate, tiny slice), not the
// left-to-right order. Target: Caruso et al., Nat. Commun. 17 (2026), Table 1.
const CHECKS = ["loss falls on a tiny slice", "PaiNN baseline ≈ 0.199", "variant beats it beyond seed spread"];

export function ChecksFirst({ step }: { step: number }) {
  return (
    <Stage label="Pipeline: checks written first, a tiny end-to-end run, a baseline gate, then variants">
      <svg viewBox="0 0 1200 430" width="100%" style={{ width: "100%", height: "100%" }}>
        <Arrow id="tdd-arrow" />
        {/* 1. checks, written before anything runs */}
        <rect x={0} y={70} width={330} height={250} rx={12} fill={C.card} stroke={step === 0 ? C.accent : C.faint} strokeWidth={step === 0 ? 2.5 : 1.5} />
        <text x={22} y={112} fontFamily={SANS} fontSize={26} fontWeight={600} fill={C.ink}>Checks, written first</text>
        {CHECKS.map((c, i) => {
          const hot = (i === 0 && step === 2) || (i > 0 && step === 1);
          return (
            <g key={c}>
              <rect x={24} y={146 + i * 56} width={22} height={22} rx={4} fill="#fff" stroke={hot ? C.accent : C.muted} strokeWidth={hot ? 2.5 : 1} />
              <text className="t-label" x={58} y={163 + i * 56} fontFamily={MONO} fontSize={16} fill={hot ? C.accent : C.ink}>{c.length > 26 ? c.slice(0, c.lastIndexOf(" ", 26)) : c}</text>
              {c.length > 26 && <text className="t-label" x={58} y={183 + i * 56} fontFamily={MONO} fontSize={16} fill={hot ? C.accent : C.ink}>{c.slice(c.lastIndexOf(" ", 26) + 1)}</text>}
            </g>
          );
        })}

        {/* 3. tiny slice, end to end (revealed last) */}
        <Show at={2} step={step} ghost>
          <path d="M 336 195 H 372" stroke={C.muted} strokeWidth={2.5} markerEnd="url(#tdd-arrow)" />
          <rect x={380} y={120} width={230} height={150} rx={12} fill={step === 2 ? C.accentSoft : C.card} stroke={step === 2 ? C.accent : C.faint} strokeWidth={step === 2 ? 2.5 : 1.5} />
          <text x={495} y={180} textAnchor="middle" fontFamily={SANS} fontSize={24} fill={C.ink}>tiny slice,</text>
          <text x={495} y={212} textAnchor="middle" fontFamily={SANS} fontSize={24} fill={C.ink}>end to end</text>
          <path d="M 616 195 H 660" stroke={C.muted} strokeWidth={2.5} markerEnd="url(#tdd-arrow)" />
        </Show>

        {/* 2. the baseline gate and what sits behind it */}
        <Show at={1} step={step} ghost>
          <path d="M 770 95 L 845 195 L 770 295 L 695 195 Z" fill={step === 1 ? C.accentSoft : C.card} stroke={step === 1 ? C.accent : C.faint} strokeWidth={step === 1 ? 2.5 : 1.5} />
          <text x={770} y={188} textAnchor="middle" fontFamily={SANS} fontSize={21} fill={C.ink}>baseline</text>
          <text x={770} y={214} textAnchor="middle" fontFamily={SANS} fontSize={21} fill={C.ink}>matches?</text>
          <text className="t-label" x={770} y={80} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.muted}>0.199 ± 0.004 kcal/mol</text>
          <path d="M 850 195 H 900" stroke={C.muted} strokeWidth={2.5} markerEnd="url(#tdd-arrow)" />
          <text className="t-label" x={872} y={180} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.accent}>yes</text>
          <rect x={910} y={130} width={280} height={130} rx={12} fill={C.card} stroke={C.faint} strokeWidth={1.5} />
          <text x={1050} y={186} textAnchor="middle" fontFamily={SANS} fontSize={24} fill={C.ink}>variants</text>
          <text x={1050} y={218} textAnchor="middle" fontFamily={SANS} fontSize={24} fill={C.ink}>start to count</text>
          <path d="M 770 300 V 380 H 165 V 326" fill="none" stroke={C.warm} strokeWidth={2} strokeDasharray="6 5" markerEnd="url(#tdd-arrow)" />
          <text className="t-label" x={470} y={406} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.warm}>no: fix the setup, not the target</text>
        </Show>
      </svg>
    </Stage>
  );
}
