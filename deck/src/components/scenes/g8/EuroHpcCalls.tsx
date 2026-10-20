"use client";

import { useState } from "react";
import { C, T, Stage, stop } from "./kit";

// Days counted from 15 Oct 2026. Cut-offs as listed on the EuroHPC JU call pages, read 20 Oct 2026.
const D0 = 0, D1 = 66;
const x = (d: number) => 330 + ((d - D0) / (D1 - D0)) * 830;
const TODAY = 7; // Thursday 22 Oct

const CALLS = [
  { name: ["AI for Science and", "Collaborative EU Projects"], what: ["6 months of node hours,", "peer reviewed"], y: 120,
    cuts: [{ d: 15, label: "30 Oct" }, { d: 57, label: "11 Dec" }] },
  { name: ["Development Access"], what: ["small allocation for a year,", "resources in 2 to 3 weeks"], y: 270,
    cuts: [{ d: 17, label: "1 Nov" }, { d: 47, label: "1 Dec" }] },
];

export function EuroHpcCalls() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <Stage>
      <svg viewBox="0 0 1200 400" className="w-full max-w-[90vw]" role="img" aria-label="Cut-off dates of two EuroHPC access calls, October to December 2026">
        {/* month ticks */}
        {[{ d: 0, t: "15 Oct" }, { d: 17, t: "Nov" }, { d: 47, t: "Dec" }].map((m) => (
          <g key={m.t}>
            <line x1={x(m.d)} x2={x(m.d)} y1={40} y2={340} stroke={C.line} strokeDasharray="3 5" />
            <text className="t-label" x={x(m.d) + 6} y={372} fontSize="16" fill={C.muted} fontFamily="var(--font-geist-mono)">{m.t}</text>
          </g>
        ))}
        {/* today */}
        <line x1={x(TODAY)} x2={x(TODAY)} y1={30} y2={340} stroke={C.warm} strokeWidth="2" />
        <text className="t-label" x={x(TODAY)} y={22} fontSize="16" fill={C.warm} textAnchor="middle" fontFamily="var(--font-geist-mono)">TODAY</text>
        {CALLS.map((c) => (
          <g key={c.name[0]}>
            <text x={0} y={c.y - (c.name.length - 1) * 14} fontSize="24" fill={C.ink}>
              {c.name.map((n, i) => <tspan key={n} x={0} dy={i ? 28 : 0}>{n}</tspan>)}
            </text>
            <text className="t-label" x={0} y={c.y + (c.name.length - 1) * 14 + 34} fontSize="15" fill={C.muted} fontFamily="var(--font-geist-mono)">
              {c.what.map((w, i) => <tspan key={w} x={0} dy={i ? 21 : 0}>{w}</tspan>)}
            </text>
            <line x1={x(D0)} x2={x(D1)} y1={c.y} y2={c.y} stroke={C.ink} strokeWidth="1.5" />
            {c.cuts.map((k) => {
              const id = c.name[0] + k.label;
              const soon = k.d - TODAY <= 10;
              return (
                <g key={id} onMouseEnter={() => setHover(id)} onMouseLeave={() => setHover(null)} onClick={stop} style={{ cursor: "default" }}>
                  <circle cx={x(k.d)} cy={c.y} r={hover === id ? 13 : 10} fill={soon ? C.accent : C.paper} stroke={C.accent} strokeWidth="2.5" />
                  <text x={x(k.d)} y={c.y - 24} fontSize="22" textAnchor="middle" fill={C.ink}>{k.label}</text>
                  {hover === id && (
                    <text className="t-label" x={x(k.d)} y={c.y + 38} fontSize="15" textAnchor="middle" fill={C.accent} fontFamily="var(--font-geist-mono)">
                      {`${k.d - TODAY} days, 10:00 CET`}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        ))}
      </svg>
      <p className="mt-[2vh] text-center" style={{ fontSize: T.small, color: C.muted }}>
        Live: the basic model project, scored by a panel.
      </p>
    </Stage>
  );
}
