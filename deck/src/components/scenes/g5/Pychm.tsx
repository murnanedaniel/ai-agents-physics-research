"use client";

import { useState } from "react";
import { C, Canvas, Reveal, T, mono, stop } from "./kit";

// Step 0: the two codes on one time axis. Step 1: how closely pyCHM's
// Barbieri-Giudice tuning matches an independent engine that shares no code.
// Facts: notes/w19/HOMEBOX-STORIES.md §3 (repo READMEs, validation table,
// fresh-venv test run 2026-10-18).
const VALID = [
  { model: "5-5-5", pct: 0.16, raw: "126.9 vs 126.7" },
  { model: "14-14-10", pct: 0.1, raw: "about 0.1%" },
  { model: "14-1-10", pct: 0.038, raw: "0.038%" },
];
const X0 = 150, X1 = 560;
const lx = (p: number) => X0 + ((Math.log10(p) + 2) / 2) * (X1 - X0); // 0.01% to 1%

function Repo({ year, name, rows, accent }: { year: string; name: string; rows: string[]; accent: string }) {
  return (
    <div className="rounded-xl border px-5 py-3 w-[26vw]" style={{ borderColor: C.rule, background: C.card }}>
      <div style={{ fontSize: T.body, color: accent }}>{name}</div>
      <div className="t-label" style={{ ...mono, fontSize: T.label, color: C.ink }}>{year}</div>
      {rows.map((r) => <div key={r} className="t-label" style={{ ...mono, fontSize: T.label, color: C.muted }}>{r}</div>)}
    </div>
  );
}

export function Pychm({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Canvas className="flex flex-col justify-center gap-[5vh]">
      <div className="flex items-center justify-center gap-[2vw]">
        <Repo year="2019 · 7 commits" name="Fine-Tuning" accent={C.muted} rows={["Cython around C++ integrals", "compiled files in git, private"]} />
        <svg viewBox="0 0 200 40" className="w-[14vw] h-auto" aria-hidden>
          <line x1={4} y1={20} x2={186} y2={20} stroke={C.ink} strokeWidth={2} strokeDasharray="4 6" />
          <path d="M176 10 L192 20 L176 30" fill="none" stroke={C.ink} strokeWidth={2} />
        </svg>
        <Repo year="2026 · mostly built in 2 days" name="pyCHM" accent={C.accent} rows={["numpy and scipy, public", "182 tests pass"]} />
      </div>
      <Reveal at={1} step={step} className="mx-auto w-[min(70vw,1000px)]">
        <div className="mb-1" style={{ fontSize: T.body }}>Tuning Δ<sub>BG</sub> against an independent engine that shares no code:</div>
        <svg viewBox="0 0 600 190" className="w-full h-auto" role="img" aria-label="Relative difference in Barbieri-Giudice tuning for three models, all below 0.2 percent">
          {[0.01, 0.1, 1].map((t) => (
            <g key={t}>
              <line x1={lx(t)} y1={10} x2={lx(t)} y2={140} stroke={C.rule} />
              <text x={lx(t)} y={160} textAnchor="middle" fontSize={15} style={mono} fill={C.muted} className="t-label">{t}%</text>
            </g>
          ))}
          <text x={X1} y={184} textAnchor="end" fontSize={15} style={mono} fill={C.muted} className="t-label">relative difference (log)</text>
          {VALID.map((v, i) => {
            const y = 30 + i * 42;
            return (
              <g key={v.model} {...stop} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
                <title>{`${v.model}: ${v.raw}`}</title>
                <text x={0} y={y + 5} fontSize={16} style={mono} fill={C.ink} className="t-label">{v.model}</text>
                <line x1={X0} y1={y} x2={lx(v.pct)} y2={y} stroke={C.accent} strokeWidth={1.5} opacity={0.5} />
                <circle cx={lx(v.pct)} cy={y} r={hover === i ? 9 : 7} fill={C.accent} />
                <text x={lx(v.pct) + 14} y={y + 5} fontSize={15} style={mono} fill={C.ink} className="t-label">{v.raw}</text>
              </g>
            );
          })}
        </svg>
      </Reveal>
    </Canvas>
  );
}
