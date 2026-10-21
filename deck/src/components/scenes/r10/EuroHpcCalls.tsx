"use client";

import { useState } from "react";
import { C, Canvas, MONO, SANS, stop } from "./kit";

// demo-eurohpc: what EuroHPC access is, then the two open calls on a time axis
// with today marked. The AI for Science call is the one drafted live.
// Cut-offs and terms: eurohpc-ju.europa.eu call pages, read 20 Oct 2026
// (notes/w19/WEB-RESEARCH.md §7a). Days counted from 15 Oct 2026.
const D1 = 66;
const x = (d: number) => 400 + (d / D1) * 780;
const TODAY = 7; // Thursday 22 Oct

const CALLS = [
  { name: "AI for Science", what: ["6 months of node hours,", "expert peer review"], y: 250, live: true,
    cuts: [{ d: 15, label: "30 Oct" }, { d: 57, label: "11 Dec" }] },
  { name: "Development Access", what: ["small allocation, one year,", "first come, first served"], y: 390, live: false,
    cuts: [{ d: 17, label: "1 Nov" }, { d: 47, label: "1 Dec" }] },
];

export function EuroHpcCalls() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <Canvas label="EuroHPC runs Europe's shared supercomputers and gives researchers free compute through calls. Two calls have cut-offs soon: AI for Science on 30 October, which we draft live, and Development Access on 1 November">
      <text x={0} y={56} fontFamily={SANS} fontSize={27} fill={C.ink}>EuroHPC: Europe&apos;s shared supercomputers, free to researchers via calls.</text>
      <text className="t-label" x={0} y={90} fontFamily={MONO} fontSize={15} fill={C.muted}>LUMI, Leonardo, MareNostrum 5, MeluXina</text>

      {[{ d: 0, t: "15 Oct" }, { d: 17, t: "Nov" }, { d: 47, t: "Dec" }].map((m) => (
        <g key={m.t}>
          <line x1={x(m.d)} x2={x(m.d)} y1={170} y2={440} stroke={C.rule} strokeDasharray="3 5" />
          <text className="t-label" x={x(m.d) + 6} y={466} fontSize={16} fill={C.muted} fontFamily={MONO}>{m.t}</text>
        </g>
      ))}
      <line x1={x(TODAY)} x2={x(TODAY)} y1={170} y2={440} stroke={C.warm} strokeWidth={2} />
      <text className="t-label" x={x(TODAY)} y={160} fontSize={16} fill={C.warm} textAnchor="middle" fontFamily={MONO}>TODAY</text>

      {CALLS.map((c) => (
        <g key={c.name}>
          <text x={0} y={c.y - 6} fontFamily={SANS} fontSize={27} fill={c.live ? C.accent : C.muted}>{c.name}</text>
          {c.what.map((w, k) => (
            <text key={w} className="t-label" x={0} y={c.y + 24 + k * 21} fontSize={15} fill={C.muted} fontFamily={MONO}>{w}</text>
          ))}
          <line x1={x(0)} x2={x(D1)} y1={c.y} y2={c.y} stroke={C.ink} strokeWidth={1.5} />
          {c.cuts.map((k, j) => {
            const id = c.name + k.label;
            const filled = c.live && j === 0;
            return (
              <g key={id} {...stop} onMouseEnter={() => setHover(id)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
                <circle cx={x(k.d)} cy={c.y} r={hover === id ? 13 : 10} fill={filled ? C.accent : C.paper} stroke={C.accent} strokeWidth={2.5} />
                <text className="t-label" x={x(k.d)} y={c.y - 22} fontFamily={SANS} fontSize={22} textAnchor="middle" fill={C.ink}>{k.label}</text>
                {hover === id && (
                  <text className="t-label" x={x(k.d)} y={c.y + 36} fontSize={15} textAnchor="middle" fill={C.accent} fontFamily={MONO}>
                    {`in ${k.d - TODAY} days, 10:00 CET`}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      ))}

      <rect x={0} y={498} width={6} height={40} rx={3} fill={C.accent} />
      <text x={24} y={528} fontFamily={SANS} fontSize={26} fill={C.ink}>Live: draft the Basic Model&apos;s plan, then score it.</text>
    </Canvas>
  );
}
