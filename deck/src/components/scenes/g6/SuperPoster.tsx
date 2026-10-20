"use client";

import { asset } from "@/lib/asset";
import { Arrow, C, MONO, SANS, Show, Stage } from "./kit";

// Real screenshots of the RANGE super-poster (v1, 17 Oct 2026), rendered at
// 1280px wide in Poster mode (#poster) and Full mode (full page).
const FULL_H = 520, FULL_W = Math.round((480 / 1570) * FULL_H); // keep aspect
const FX = 760, FY = 10;
// Section bands on the full page, as fractions of its height.
const BANDS = [
  { label: "mechanism stepper", from: 0.07, to: 0.17 },
  { label: "charts you can query", from: 0.19, to: 0.52 },
  { label: "evidence rows", from: 0.70, to: 0.86 },
];

export function SuperPoster({ step }: { step: number }) {
  return (
    <Stage label="The RANGE super-poster: a one-minute poster view, a three-minute full view, and an evidence row that quotes the paper">
      <svg viewBox="0 0 1200 540" width="100%" style={{ width: "100%", height: "100%" }}>
        <Arrow id="sp-arrow" />
        {/* Poster mode */}
        <text className="t-label" x={0} y={24} fontFamily={MONO} fontSize={18} fill={C.ink}>Poster · 1 minute</text>
        <rect x={0} y={38} width={640} height={384} rx={8} fill="#fff" stroke={C.faint} />
        <circle cx={14} cy={50} r={4} fill={C.faint} /><circle cx={28} cy={50} r={4} fill={C.faint} /><circle cx={42} cy={50} r={4} fill={C.faint} />
        <image href={asset("/g6/superposter-poster.jpg")} x={0} y={62} width={640} height={360} preserveAspectRatio="xMidYMin slice" />

        {/* Full mode */}
        <Show at={1} step={step} ghost>
          <path d={`M 656 230 H ${FX - 18}`} stroke={C.muted} strokeWidth={2} markerEnd="url(#sp-arrow)" />
          <text className="t-label" x={FX} y={FY + 14} fontFamily={MONO} fontSize={18} fill={C.ink}>Full · 3 minutes</text>
          <image href={asset("/g6/superposter-full.jpg")} x={FX} y={FY + 26} width={FULL_W} height={FULL_H - 26} preserveAspectRatio="xMidYMin meet" />
          <rect x={FX} y={FY + 26} width={FULL_W} height={FULL_H - 26} fill="none" stroke={C.faint} />
          {BANDS.map((b, i) => {
            const y0 = FY + 26 + b.from * (FULL_H - 26), y1 = FY + 26 + b.to * (FULL_H - 26);
            const ym = (y0 + y1) / 2;
            const hot = i === 2 && step >= 2;
            return (
              <g key={b.label}>
                <path d={`M ${FX + FULL_W + 8} ${y0} h 8 V ${y1} h -8`} fill="none" stroke={hot ? C.accent : C.muted} strokeWidth={2} />
                <line x1={FX + FULL_W + 16} x2={FX + FULL_W + 34} y1={ym} y2={ym} stroke={hot ? C.accent : C.muted} strokeWidth={2} />
                <text x={FX + FULL_W + 42} y={ym + 7} fontFamily={SANS} fontSize={21} fill={hot ? C.accent : C.ink}>{b.label}</text>
                {i === 2 && <Show at={2} step={step}><text x={FX + FULL_W + 42} y={ym + 34} fontFamily={SANS} fontSize={21} fill={C.accent}>that quote the paper</text></Show>}
              </g>
            );
          })}
        </Show>

        {/* One evidence row, opened */}
        <Show at={2} step={step}>
          <image href={asset("/g6/superposter-evidence.jpg")} x={0} y={438} width={640} height={90} preserveAspectRatio="xMinYMin meet" />
          <rect x={0} y={438} width={640} height={90} fill="none" stroke={C.accent} strokeWidth={2} rx={4} />
          <path d={`M 646 470 C 700 470, 700 ${FY + 26 + 0.78 * (FULL_H - 26)}, ${FX - 6} ${FY + 26 + 0.78 * (FULL_H - 26)}`} fill="none" stroke={C.accent} strokeWidth={1.5} strokeDasharray="4 4" />
        </Show>
      </svg>
    </Stage>
  );
}
