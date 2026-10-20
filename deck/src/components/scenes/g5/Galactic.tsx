"use client";

import { useState } from "react";
import { Ask, C, Canvas, Reveal, RevealG, T, mono, stop } from "./kit";

// Left: friends-of-friends in one picture (link pairs closer than b, each
// connected group is a halo). Right: the saved Round 1 timings, log axis.
// Values: bench/ROUND1_REPORT.md (2026-05-20), as summarised in
// notes/w17/PROJECTS-2-4.md. Not rerun.
const ROUND1 = [
  { n: "10⁶ particles", ours: 0.075, jfof: 2.1195, ratio: "28×", halos: 1996 },
  { n: "10⁷ particles", ours: 0.4891, jfof: 30.0662, ratio: "62×", halos: 2000 },
];

function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
}

type P = { x: number; y: number; h: number };
const POINTS: P[] = (() => {
  const r = rng(7);
  const pts: P[] = [];
  const halos = [
    { x: 150, y: 150, s: 34, n: 22 },
    { x: 360, y: 120, s: 26, n: 15 },
    { x: 290, y: 330, s: 40, n: 26 },
    { x: 110, y: 380, s: 20, n: 9 },
  ];
  halos.forEach((h, k) => {
    for (let i = 0; i < h.n; i++) {
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * h.s * 1.6;
      pts.push({ x: h.x + d * Math.cos(a), y: h.y + d * Math.sin(a), h: k });
    }
  });
  for (let i = 0; i < 34; i++) pts.push({ x: 20 + r() * 440, y: 20 + r() * 420, h: -1 });
  return pts;
})();
const B = 30; // linking length in picture units
const LINKS = (() => {
  const out: [P, P][] = [];
  for (let i = 0; i < POINTS.length; i++) for (let j = i + 1; j < POINTS.length; j++) {
    const a = POINTS[i], b = POINTS[j];
    if (a.h >= 0 && a.h === b.h && Math.hypot(a.x - b.x, a.y - b.y) < B) out.push([a, b]);
  }
  return out;
})();

// Log axis 0.01 s to 100 s.
const X0 = 150, X1 = 560;
const lx = (t: number) => X0 + ((Math.log10(t) + 2) / 4) * (X1 - X0);

export function Galactic({ step }: { step: number }) {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <Canvas className="flex items-center gap-[3vw]">
      <div className="h-full flex-[0.85] min-w-0 flex flex-col items-center justify-center">
        <svg viewBox="0 0 480 460" className="w-full max-h-[78%] h-auto" role="img" aria-label="Friends-of-friends: particles closer than the linking length are joined; each connected group is a halo">
          {LINKS.map(([a, b], i) => <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={C.accent} strokeWidth={1.4} opacity={0.75} />)}
          {POINTS.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={4} fill={p.h >= 0 ? C.accent : "#a8a29e"} />)}
          <g transform="translate(400 420)">
            <line x1={0} y1={0} x2={B} y2={0} stroke={C.ink} strokeWidth={2} />
            <line x1={0} y1={-6} x2={0} y2={6} stroke={C.ink} strokeWidth={2} />
            <line x1={B} y1={-6} x2={B} y2={6} stroke={C.ink} strokeWidth={2} />
            <text x={B / 2} y={-12} textAnchor="middle" fontSize={20} style={mono} fill={C.ink} className="t-label">b</text>
          </g>
        </svg>
        <div className="text-center" style={{ fontSize: T.body, lineHeight: 1.3 }}>Link pairs closer than <i>b</i>.<br />Each linked group is a halo.</div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-[4vh]">
        <Reveal at={1} step={step}>
          <svg viewBox="0 0 600 250" className="w-full h-auto" role="img" aria-label="Round 1 timings: GPU friends-of-friends against jFoF">
            {[0.01, 0.1, 1, 10, 100].map((t) => (
              <g key={t}>
                <line x1={lx(t)} y1={20} x2={lx(t)} y2={190} stroke={C.rule} strokeWidth={1} />
                <text x={lx(t)} y={214} textAnchor="middle" fontSize={17} style={mono} fill={C.muted} className="t-label">{t < 1 ? t : t.toFixed(0)}</text>
              </g>
            ))}
            <text x={X1} y={242} textAnchor="end" fontSize={17} style={mono} fill={C.muted} className="t-label">seconds, end to end (log)</text>
            {ROUND1.map((r, i) => {
              const y = 65 + i * 95;
              return (
                <g key={r.n} {...stop} onMouseEnter={() => setHover(r.n)} onMouseLeave={() => setHover(null)}>
                  <title>{`${r.n}: GPU FoF ${r.ours} s, jFoF ${r.jfof} s, ${r.halos} halos in both`}</title>
                  <text x={0} y={y + 6} fontSize={19} style={mono} fill={C.ink} className="t-label">{r.n}</text>
                  <line x1={lx(r.ours)} y1={y} x2={lx(r.jfof)} y2={y} stroke={C.ink} strokeWidth={1.5} />
                  <circle cx={lx(r.ours)} cy={y} r={9} fill={C.accent} />
                  <circle cx={lx(r.jfof)} cy={y} r={9} fill="#f6f1e7" stroke={C.ink} strokeWidth={2} />
                  <text x={(lx(r.ours) + lx(r.jfof)) / 2} y={y - 16} textAnchor="middle" fontSize={26} fill={C.ink}>{r.ratio}</text>
                  {i === 0 && <>
                    <text x={lx(r.ours)} y={y + 32} textAnchor="middle" fontSize={17} style={mono} fill={C.accent} className="t-label">GPU FoF</text>
                    <text x={lx(r.jfof)} y={y + 32} textAnchor="middle" fontSize={17} style={mono} fill={C.ink} className="t-label">jFoF</text>
                  </>}
                </g>
              );
            })}
          </svg>
          <div className="min-h-[1.4em] t-label" style={{ ...mono, fontSize: T.label, color: C.muted }}>
            {hover ? (() => { const r = ROUND1.find((x) => x.n === hover)!; return `${r.ours} s vs ${r.jfof} s · ${r.halos} halos in both`; })() : "same A100, synthetic data"}
          </div>
        </Reveal>
        <Reveal at={2} step={step}>
          <div className="rounded-xl border-l-4 pl-4 py-1" style={{ borderColor: C.warm }}>
            <div style={{ fontSize: T.body, lineHeight: 1.3 }}>Same halo counts, memberships never compared. No real simulation yet.</div>
            <div className="mt-2"><Ask>goal for the day: membership check, then Quijote?</Ask></div>
          </div>
        </Reveal>
      </div>
    </Canvas>
  );
}
