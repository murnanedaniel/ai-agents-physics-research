"use client";

import { C, Canvas, MONO, SANS, Show } from "./kit";

// p-tracking. Step 0: the study setup. Step 1: the pre-cook, one short minGRU
// run, as the ratio of its resolution to the truth-seeded Kalman filter's per
// truth-pT bin (data: notes/w20/P4-trackfit-PRECOOK-2026-10-20.md). Step 2:
// what runs today.
const SETUP = [
  ["data", "ColliderML tt̄, no pile-up", "drifting beam spot · 1.67 M training tracks"],
  ["models", "four sequence models", "minGRU, Mamba-2, Transformer, diagonal SSM"],
  ["baseline", "truth-seeded Kalman filter", "on identical tracks"],
  ["measure", "resolution ratio, model / filter", "IQR/1.349 of the residual; 1 = parity"],
];
const PT = [1.41, 2.45, 3.87, 7.07, 14.1, 31.6, 74.2]; // geometric bin centres, edges 1-2-3-5-10-20-50-110 GeV
const SERIES = [
  { k: "q/p", v: [2.96, 2.36, 2.38, 3.59, 7.13, 14.5, 22.7], c: C.warm, w: 3.5 },
  { k: "d0", v: [1.11, 1.08, 1.11, 1.22, 1.46, 1.73, 1.91], c: C.accent, w: 3.5 },
  { k: "φ", v: [1.18, 1.16, 1.14, 1.24, 1.44, 2.0, 2.64], c: C.faint, w: 2 },
  { k: "z0", v: [1.35, 1.27, 1.19, 1.12, 1.07, 1.17, 1.28], c: C.faint, w: 2 },
  { k: "θ", v: [1.33, 1.29, 1.2, 1.15, 1.1, 1.05, 0.98], c: C.faint, w: 2 },
];
const X0 = 530, X1 = 1080, Y0 = 400, Y1 = 40;
const sx = (pt: number) => X0 + ((Math.log10(pt) - 0) / (Math.log10(110) - 0)) * (X1 - X0);
const sy = (r: number) => Y0 - ((Math.log10(r) - Math.log10(0.8)) / (Math.log10(30) - Math.log10(0.8))) * (Y0 - Y1);

export function TrackPlan({ step }: { step: number }) {
  return (
    <Canvas label="Setup: tt-bar tracks, four sequence models, a truth-seeded Kalman filter baseline. Pre-cook: a short minGRU run is 1.1 to 1.9 times the filter's resolution on d0 and 3 to 23 times on q/p. Today: all four models, then found tracks.">
      {SETUP.map(([k, a, b], i) => (
        <g key={k} transform={`translate(0 ${30 + i * 100})`}>
          <text className="t-label" x={0} y={0} fontFamily={MONO} fontSize={16} fill={C.muted}>{k}</text>
          <text x={0} y={32} fontFamily={SANS} fontSize={23} fill={C.ink}>{a}</text>
          <text className="t-label" x={0} y={58} fontFamily={MONO} fontSize={14} fill={C.muted}>{b}</text>
        </g>
      ))}

      <Show at={1} step={step}>
        {[1, 2, 5, 10, 20].map((t) => (
          <g key={t}>
            <line x1={X0} x2={X1} y1={sy(t)} y2={sy(t)} stroke={t === 1 ? C.ink : C.rule} strokeWidth={t === 1 ? 1.5 : 1} strokeDasharray={t === 1 ? "6 4" : undefined} />
            <text className="t-label" x={X0 - 10} y={sy(t) + 5} textAnchor="end" fontFamily={MONO} fontSize={14} fill={C.muted}>{t}×</text>
          </g>
        ))}
        {[1, 2, 5, 10, 20, 50, 100].map((t) => (
          <text key={t} className="t-label" x={sx(t)} y={Y0 + 24} textAnchor="middle" fontFamily={MONO} fontSize={14} fill={C.muted}>{t}</text>
        ))}
        <text className="t-label" x={(X0 + X1) / 2} y={Y0 + 48} textAnchor="middle" fontFamily={MONO} fontSize={14} fill={C.muted}>truth pT [GeV]</text>
        <text className="t-label" x={X0} y={Y1 - 14} fontFamily={MONO} fontSize={14} fill={C.muted}>minGRU / Kalman filter resolution (log)</text>
        <text className="t-label" x={X0 + 8} y={sy(1) + 22} fontFamily={MONO} fontSize={14} fill={C.ink}>parity, as the paper reports with its full recipe</text>
        {SERIES.map((s) => (
          <g key={s.k}>
            <polyline points={s.v.map((v, i) => `${sx(PT[i])},${sy(v)}`).join(" ")} fill="none" stroke={s.c} strokeWidth={s.w} />
            {s.v.map((v, i) => <circle key={i} cx={sx(PT[i])} cy={sy(v)} r={s.w + 0.5} fill={s.c} />)}
            <text className="t-label" x={sx(PT[6]) + 12} y={sy(s.v[6]) + 5 + (s.k === "z0" ? -6 : s.k === "θ" ? 8 : 0)} fontFamily={MONO} fontSize={16} fill={s.c === C.faint ? C.muted : s.c}>{s.k}</text>
          </g>
        ))}
        <text className="t-label" x={X0} y={Y0 + 80} fontFamily={MONO} fontSize={14} fill={C.muted}>pre-cook: 8 epochs, one seed, 87,287 test tracks; the paper trains far longer</text>
      </Show>

      <Show at={2} step={step}>
        <g transform="translate(0 440)">
          <rect x={-6} y={-10} width={470} height={100} rx={10} fill={C.warmTint} stroke={C.warm} strokeWidth={1.5} />
          <text x={14} y={24} fontFamily={SANS} fontSize={23} fill={C.ink}>Today: all four models, longer,</text>
          <text x={14} y={56} fontFamily={SANS} fontSize={23} fill={C.ink}>then on CKF-found tracks.</text>
          <text className="t-label" x={14} y={80} fontFamily={MONO} fontSize={14} fill={C.muted}>one A100 each, 5 to 15 min per run</text>
        </g>
      </Show>
    </Canvas>
  );
}
