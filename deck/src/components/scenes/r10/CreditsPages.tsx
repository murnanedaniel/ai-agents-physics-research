"use client";

import { useState } from "react";
import { C, Canvas, MONO, SANS, SERIF, stop } from "./kit";

// demo-science-credits: what the programme is, then the two Anthropic pages
// on it, which disagree; the newer one counts (notes/w19/WEB-RESEARCH.md §7b,
// both read 20 Oct 2026). Form text: "across the natural sciences and math".
const START = Date.UTC(2026, 2, 1), END = Date.UTC(2026, 10, 1);
const X0 = 40, X1 = 1160;
const px = (m: number, d: number) => X0 + ((Date.UTC(2026, m - 1, d) - START) / (END - START)) * (X1 - X0);
const AXIS = 470;

const PAGES = [
  { m: 3, d: 16, date: "16 Mar 2026", kind: "support page", amount: "$20,000", scope: "biology focus, 6 months", url: "support.claude.com, article 11199177", newest: false },
  { m: 8, d: 27, date: "27 Aug 2026", kind: "announcement", amount: "$50,000", scope: "per project, beyond biology", url: "anthropic.com/news/expanding-support-for-scientists", newest: true },
];

export function CreditsPages() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Canvas label="Anthropic's AI for Science programme gives API credits to academic research. A March support page says up to 20,000 dollars with a biology focus; the newer August announcement says up to 50,000 dollars per project beyond biology. Live, we fill in the form for one of today's projects">
      <text x={0} y={40} fontFamily={SANS} fontSize={27} fill={C.ink}>AI for Science: free API credits for academics.</text>
      <text x={0} y={78} fontFamily={SANS} fontSize={27} fill={C.muted}>Two official pages disagree.</text>

      <line x1={X0} x2={X1} y1={AXIS} y2={AXIS} stroke={C.ink} strokeWidth={1.5} />
      {["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((m, i) => (
        <g key={m}>
          <line x1={px(i + 3, 1)} x2={px(i + 3, 1)} y1={AXIS} y2={AXIS + 8} stroke={C.muted} />
          <text className="t-label" x={px(i + 3, 1) + 4} y={AXIS + 28} fontFamily={MONO} fontSize={15} fill={C.muted}>{m}</text>
        </g>
      ))}
      <line x1={px(10, 22)} x2={px(10, 22)} y1={130} y2={AXIS} stroke={C.warm} strokeWidth={2} />
      <text className="t-label" x={px(10, 22)} y={120} textAnchor="middle" fontFamily={MONO} fontSize={15} fill={C.warm}>TODAY</text>

      {PAGES.map((p, i) => {
        const x = px(p.m, p.d);
        const top = p.newest ? 150 : 290;
        const bw = p.newest ? 380 : 330;
        const bx = p.newest ? x - bw : x - 20;
        const hot = hover === i;
        return (
          <g key={p.date} {...stop} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }} {...(!p.newest ? { "data-dim": true } : {})}>
            <line x1={x} x2={x} y1={top + (p.newest ? 190 : 140)} y2={AXIS} stroke={p.newest ? C.accent : C.muted} strokeWidth={2} />
            <circle cx={x} cy={AXIS} r={7} fill={p.newest ? C.accent : C.paper} stroke={p.newest ? C.accent : C.muted} strokeWidth={2} />
            <rect x={bx} y={top} width={bw} height={p.newest ? 190 : 140} rx={14} fill={C.card} stroke={p.newest ? C.accent : C.rule} strokeWidth={p.newest ? 2.5 : 1.5} />
            <text className="t-label" x={bx + 22} y={top + 32} fontFamily={MONO} fontSize={15} fill={p.newest ? C.accent : C.muted}>{hot ? p.url : `${p.date} · ${p.kind}`}</text>
            <text x={bx + 22} y={top + (p.newest ? 112 : 82)} fontFamily={SERIF} fontStyle="italic" fontSize={p.newest ? 76 : 44} fill={p.newest ? C.ink : C.muted}>{p.amount}</text>
            <text x={bx + 22} y={top + (p.newest ? 160 : 120)} fontFamily={SANS} fontSize={23} fill={p.newest ? C.ink : C.muted}>{p.scope}</text>
          </g>
        );
      })}
      <text x={0} y={548} fontFamily={SANS} fontSize={25} fill={C.ink}>Live: the form, for one of today&apos;s projects.</text>
    </Canvas>
  );
}
