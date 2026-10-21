"use client";

import { useState } from "react";
import { C, Canvas, MONO, SANS, stop } from "./kit";

// demo-eurohpc: what EuroHPC access is, then the two open calls on a time axis
// with today marked, each with what it gives, how it is judged and how fast
// time arrives. The AI for Science call is the one drafted live.
// Cut-offs and terms: eurohpc-ju.europa.eu call pages, read 20 Oct 2026
// (notes/w19/WEB-RESEARCH.md §7a). Days counted from 15 Oct 2026.
const D1 = 66;
const x = (d: number) => 400 + (d / D1) * 780;
const TODAY = 7; // Thursday 22 Oct

const CALLS = [
  { name: "AI for Science", what: ["6 months of node hours", "technical and expert peer review", "time within a month of cut-off"], y: 236, live: true,
    cuts: [{ d: 15, label: "30 Oct" }, { d: 57, label: "11 Dec" }] },
  { name: "Development Access", what: ["small allocation for one year", "first come, first served, monthly", "time in 2 to 3 weeks"], y: 384, live: false,
    cuts: [{ d: 17, label: "1 Nov" }, { d: 47, label: "1 Dec" }] },
];

export function EuroHpcCalls() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <Canvas label="EuroHPC runs Europe's shared supercomputers, and researchers apply for free time on them through calls. Two calls have cut-offs soon: AI for Science on 30 October, six months of node hours after peer review, which we draft live for the Basic Model; and Development Access on 1 November, a small allocation for a year, first come, first served">
      <text x={0} y={46} fontFamily={SANS} fontSize={25} fill={C.ink}>EuroHPC runs Europe&apos;s shared supercomputers; researchers apply for free time in calls.</text>
      <text className="t-label" x={0} y={80} fontFamily={MONO} fontSize={15} fill={C.muted}>LUMI, LEONARDO, MARENOSTRUM 5, MELUXINA · OPEN TO RESEARCHERS IN THE EU AND ASSOCIATED COUNTRIES</text>

      {[{ d: 0, t: "15 Oct" }, { d: 17, t: "Nov" }, { d: 47, t: "Dec" }].map((m) => (
        <g key={m.t}>
          <line x1={x(m.d)} x2={x(m.d)} y1={160} y2={440} stroke={C.rule} strokeDasharray="3 5" />
          <text className="t-label" x={x(m.d) + 6} y={466} fontSize={16} fill={C.muted} fontFamily={MONO}>{m.t}</text>
        </g>
      ))}
      <line x1={x(TODAY)} x2={x(TODAY)} y1={160} y2={440} stroke={C.warm} strokeWidth={2} />
      <text className="t-label" x={x(TODAY)} y={150} fontSize={16} fill={C.warm} textAnchor="middle" fontFamily={MONO}>TODAY</text>

      {CALLS.map((c) => (
        <g key={c.name}>
          <text x={0} y={c.y - 6} fontFamily={SANS} fontSize={27} fill={c.live ? C.accent : C.muted}>{c.name}</text>
          {c.what.map((w, k) => (
            <text key={w} className="t-label" x={0} y={c.y + 22 + k * 21} fontSize={15} fill={C.muted} fontFamily={MONO}>{w}</text>
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

      <rect x={0} y={498} width={6} height={52} rx={3} fill={C.accent} />
      <text x={24} y={520} fontFamily={SANS} fontSize={25} fill={C.ink}>Live: we draft the Basic Model&apos;s application with the agent.</text>
      <text className="t-label" x={24} y={546} fontFamily={MONO} fontSize={15} fill={C.muted}>THE CALL&apos;S TEMPLATE IS A PROJECT SCOPE AND PLAN · THEN WE SCORE THE DRAFT WITH A MODEL PANEL</text>
    </Canvas>
  );
}
