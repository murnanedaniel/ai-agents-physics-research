"use client";

import { C, Canvas, MONO, SANS, Show } from "../r9/kit";

// p-tracking (round 3). Goal first: Renusch et al. (arXiv:2609.32479, with
// Daniel) report parity with a truth-seeded Kalman filter (Table 1: minGRU/KF
// resolution ratios 0.977 to 1.013, clipped, |eta| <= 2) on single muons with
// perfect hit-to-track matching, trained on 381 M tracks. The project asks
// whether that parity holds on our setup before we build on it.
// Step 0: the goal and how our setup differs from the paper's. Step 1: the
// pre-cook, one short minGRU run, as the ratio of its resolution to the
// truth-seeded KF's per truth-pT bin (notes/w20/P4-trackfit-PRECOOK-2026-10-20.md).
// Step 2: what runs today, and the paper half of the middle loop (the runs feed
// the draft reviewed in the next scene).
const ROWS = [
  ["events", "single muons", "tt̄, drifting beam spot, no pile-up"],
  ["hits", "truth, perfect matching", "truth first, then CKF-found tracks"],
  ["training", "381 M tracks", "1.67 M tracks"],
];
const PT = [1.41, 2.45, 3.87, 7.07, 14.1, 31.6, 74.2]; // geometric bin centres, edges 1-2-3-5-10-20-50-110 GeV
const SERIES = [
  { k: "q/p", v: [2.96, 2.36, 2.38, 3.59, 7.13, 14.5, 22.7], c: C.warm, w: 3.5 },
  { k: "d0", v: [1.11, 1.08, 1.11, 1.22, 1.46, 1.73, 1.91], c: C.accent, w: 3.5 },
  { k: "φ", v: [1.18, 1.16, 1.14, 1.24, 1.44, 2.0, 2.64], c: C.faint, w: 2 },
  { k: "z0", v: [1.35, 1.27, 1.19, 1.12, 1.07, 1.17, 1.28], c: C.faint, w: 2 },
  { k: "θ", v: [1.33, 1.29, 1.2, 1.15, 1.1, 1.05, 0.98], c: C.faint, w: 2 },
];
const X0 = 530, X1 = 1080, Y0 = 370, Y1 = 40;
const sx = (pt: number) => X0 + ((Math.log10(pt) - 0) / (Math.log10(110) - 0)) * (X1 - X0);
const sy = (r: number) => Y0 - ((Math.log10(r) - Math.log10(0.8)) / (Math.log10(30) - Math.log10(0.8))) * (Y0 - Y1);

export function TrackPlan({ step }: { step: number }) {
  return (
    <Canvas label="Goal: does the paper's parity with the Kalman filter hold on our setup before we build on it? The paper used single muons, truth hits and 381 million tracks; we use tt-bar with a drifting beam spot, truth then CKF-found hits, and 1.67 million tracks. Pre-cook: one short minGRU run is 8 to 35 percent behind the filter below 10 GeV on d0, z0, phi and theta, and its q/p stops improving above 5 GeV. Today: all four models, longer, then found tracks.">
      <text x={0} y={20} fontFamily={SANS} fontSize={23} fill={C.ink}>Goal: does the paper&apos;s parity with</text>
      <text x={0} y={50} fontFamily={SANS} fontSize={23} fill={C.ink}>the Kalman filter hold on our setup,</text>
      <text x={0} y={80} fontFamily={SANS} fontSize={23} fill={C.ink}>before we build on it?</text>
      <text className="t-label" x={110} y={124} fontFamily={MONO} fontSize={14} fill={C.muted}>paper</text>
      <text className="t-label" x={290} y={124} fontFamily={MONO} fontSize={14} fill={C.warm}>ours</text>
      {ROWS.map(([k, p, o], i) => (
        <g key={k} transform={`translate(0 ${160 + i * 74})`}>
          <line x1={0} x2={480} y1={-24} y2={-24} stroke={C.rule} />
          <text className="t-label" x={0} y={0} fontFamily={MONO} fontSize={14} fill={C.muted}>{k}</text>
          <WrapT x={110} y={0} w={20} text={p} fill={C.muted} />
          <WrapT x={290} y={0} w={20} text={o} fill={C.ink} />
        </g>
      ))}
      <text className="t-label" x={0} y={382} fontFamily={MONO} fontSize={14} fill={C.muted}>same baseline: truth-seeded KF, identical tracks</text>

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
        <text x={X0} y={Y0 + 88} fontFamily={SANS} fontSize={21} fill={C.ink}>Our short pre-cook: 8 to 35% behind at</text>
        <text x={X0} y={Y0 + 116} fontFamily={SANS} fontSize={21} fill={C.ink}>low pT, far behind on q/p.</text>
        <text className="t-label" x={X0} y={Y0 + 140} fontFamily={MONO} fontSize={14} fill={C.muted}>expected from a short run on little data; it says little about the models yet</text>
        <text className="t-label" x={X0} y={Y0 + 160} fontFamily={MONO} fontSize={14} fill={C.muted}>one minGRU run: 8 epochs, one seed, 87,287 test tracks, few above 50 GeV</text>
      </Show>

      <Show at={2} step={step}>
        <g transform="translate(0 420)">
          <rect x={-6} y={-10} width={490} height={130} rx={10} fill={C.warmTint} stroke={C.warm} strokeWidth={1.5} />
          <text x={14} y={22} fontFamily={SANS} fontSize={21} fill={C.ink}>Today: all four models, longer runs,</text>
          <text x={14} y={50} fontFamily={SANS} fontSize={21} fill={C.ink}>then CKF-found tracks, into the draft.</text>
          <text className="t-label" x={14} y={104} fontFamily={MONO} fontSize={14} fill={C.muted}>one A100 each, 5 to 15 min per run</text>
        </g>
      </Show>
    </Canvas>
  );
}

// Word wrap for short SVG table cells.
function WrapT({ x, y, w, text, fill }: { x: number; y: number; w: number; text: string; fill: string }) {
  const lines: string[] = [""];
  text.split(" ").forEach((word) => {
    const cur = lines[lines.length - 1];
    if ((cur + " " + word).trim().length > w) lines.push(word);
    else lines[lines.length - 1] = (cur + " " + word).trim();
  });
  return <>{lines.map((l, i) => <text key={i} x={x} y={y + i * 22} fontFamily={SANS} fontSize={18} fill={fill}>{l}</text>)}</>;
}
