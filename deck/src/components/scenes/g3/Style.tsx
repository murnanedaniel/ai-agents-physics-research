"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { C, Canvas, MONO, SANS, SERIF, Step, stop } from "./common";

// Kobak et al., arXiv:2406.07016v5 (Sci. Adv. 2025), §2.1: frequency ratio r = observed / expected
// for the year shown, from 15.1M PubMed abstracts, 2010–2024.
const WORDS = [
  { w: "zika", r: 40.4, yr: "2017", style: false },
  { w: "delves", r: 28.0, yr: "2024", style: true },
  { w: "underscores", r: 13.8, yr: "2024", style: true },
  { w: "showcasing", r: 10.7, yr: "2024", style: true },
  { w: "ebola", r: 9.9, yr: "2015", style: false },
];
const X0 = 190, X1 = 590;
const x = (v: number) => X0 + (v / 40) * (X1 - X0);

export function Style({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Canvas label="Bar chart: in 2024 the word delves appeared 28 times more often than expected, comparable to zika and ebola in their outbreak years; at least 13.5% of 2024 PubMed abstracts were processed with LLMs">
      {[0, 10, 20, 30, 40].map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1={30} y2={400} stroke={C.rule} />
          <text className="t-label" x={x(t)} y={424} textAnchor="middle" fontSize={14} fontFamily={MONO} fill={C.muted}>{t}×</text>
        </g>
      ))}
      <text className="t-label" x={X0} y={452} fontSize={14} fontFamily={MONO} fill={C.muted}>frequency in PubMed abstracts ÷ expected from earlier years</text>
      {WORDS.map((d, i) => {
        const yy = 50 + i * 72;
        return (
          <g key={d.w} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onClick={stop}>
            <rect x={0} y={yy - 6} width={800} height={60} fill="transparent" />
            <text x={X0 - 18} y={yy + 32} textAnchor="end" fontSize={24} fontFamily={d.style ? SERIF : SANS} fontStyle={d.style ? "italic" : "normal"} fill={C.ink}>{d.w}</text>
            <motion.rect x={X0} y={yy + 8} height={36} rx={3} fill={d.style ? C.accent : "#bdb5a6"}
              initial={{ width: 0 }} animate={{ width: x(d.r) - X0 }} transition={{ duration: 0.7, delay: 0.1 * i }} />
            <text className="t-label" x={x(d.r) + 10} y={yy + 32} fontSize={16} fontFamily={MONO} fill={C.ink}>
              {hover === i ? `r = ${d.r} in ${d.yr}` : `${d.r}× · ${d.style ? "style word" : `outbreak, ${d.yr}`}`}
            </text>
          </g>
        );
      })}
      <Step at={1} step={step}>
        <line x1={850} x2={850} y1={40} y2={400} stroke={C.rule} />
        <text x={888} y={110} fontSize={20} fontFamily={SANS} fill={C.ink}>at least</text>
        <text x={880} y={215} fontSize={96} fontFamily={SERIF} fontStyle="italic" fill={C.accent}>13.5%</text>
        <text x={888} y={262} fontSize={20} fontFamily={SANS} fill={C.ink}>of 2024 PubMed abstracts</text>
        <text x={888} y={290} fontSize={20} fontFamily={SANS} fill={C.ink}>were processed with LLMs</text>
        <text className="t-label" x={888} y={324} fontSize={14} fontFamily={MONO} fill={C.muted}>lower bound; up to 40% in some fields</text>
      </Step>
    </Canvas>
  );
}
