"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { C, Canvas, MONO, SANS, SERIF, Step, Tag, stop } from "./common";

// Kobak et al., arXiv:2406.07016v5 (Science Advances 2025), checked 2026-10-21:
// 15,103,888 PubMed abstracts 2010–2024. Expected 2024 frequency = linear extrapolation of 2021 and 2022.
// r = observed / expected: delves 28.0, underscores 13.8, showcasing 10.7 (2024); ebola 9.9 (2015), zika 40.4 (2017).
// Lower bound of LLM-processed 2024 abstracts: 13.5%; over 40% in some subcorpora.
const WORDS = [
  { w: "delves", r: 28.0, yr: "2024", style: true },
  { w: "underscores", r: 13.8, yr: "2024", style: true },
  { w: "showcasing", r: 10.7, yr: "2024", style: true },
  { w: "ebola", r: 9.9, yr: "2015", style: false },
  { w: "zika", r: 40.4, yr: "2017", style: false },
];
const X0 = 170, X1 = 580;
const x = (v: number) => X0 + (v / 40) * (X1 - X0);

export function Style({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Canvas label="Bar chart: in 2024 the word delves appeared 28 times more often in PubMed abstracts than expected, a jump of the size seen for ebola and zika in their outbreak years; at least 13.5% of 2024 abstracts were processed with LLMs">
      <Tag x={0} y={10} kind="published" />
      <text className="t-label" x={106} y={10} fontSize={14} fontFamily={MONO} fill={C.muted}>Kobak et al. counted words in 15.1M PubMed abstracts, 2010–2024</text>
      <text x={0} y={50} fontSize={21} fontFamily={SANS} fill={C.ink}>Outbreaks make words jump far above their trend: ebola, zika.</text>
      <text x={0} y={80} fontSize={21} fontFamily={SANS} fill={C.ink}>In 2024, style words jumped as much, with no outbreak behind them.</text>
      {[0, 10, 20, 30, 40].map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1={104} y2={440} stroke={C.rule} />
          <text className="t-label" x={x(t)} y={462} textAnchor="middle" fontSize={14} fontFamily={MONO} fill={C.muted}>{t}×</text>
        </g>
      ))}
      <text className="t-label" x={X0} y={488} fontSize={13} fontFamily={MONO} fill={C.muted}>frequency that year ÷ frequency expected from the two years before</text>
      {WORDS.map((d, i) => {
        const yy = 112 + i * 62 + (d.style ? 0 : 14);
        return (
          <g key={d.w} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onClick={stop}>
            <rect x={0} y={yy - 6} width={800} height={56} fill="transparent" />
            <text x={X0 - 18} y={yy + 30} textAnchor="end" fontSize={23} fontFamily={d.style ? SERIF : SANS} fontStyle={d.style ? "italic" : "normal"} fill={C.ink}>{d.w}</text>
            <motion.rect x={X0} y={yy + 8} height={32} rx={3} fill={d.style ? C.accent : "#bdb5a6"}
              initial={{ width: 0 }} animate={{ width: x(d.r) - X0 }} transition={{ duration: 0.7, delay: 0.1 * i }} />
            <text className="t-label" x={x(d.r) + 10} y={yy + 30} fontSize={15} fontFamily={MONO} fill={C.ink}>
              {hover === i ? `r = ${d.r} in ${d.yr}` : `${d.r}× · ${d.style ? "2024, style word" : `${d.yr}, outbreak word`}`}
            </text>
          </g>
        );
      })}
      <Step at={1} step={step}>
        <line x1={880} x2={880} y1={104} y2={440} stroke={C.rule} />
        <text x={910} y={140} fontSize={20} fontFamily={SANS} fill={C.ink}>at least</text>
        <text x={902} y={236} fontSize={84} fontFamily={SERIF} fontStyle="italic" fill={C.accent}>13.5%</text>
        <text x={910} y={284} fontSize={20} fontFamily={SANS} fill={C.ink}>of 2024 abstracts were</text>
        <text x={910} y={312} fontSize={20} fontFamily={SANS} fill={C.ink}>processed with an LLM</text>
        <text className="t-label" x={910} y={346} fontSize={13} fontFamily={MONO} fill={C.muted}><tspan x={910}>a lower bound;</tspan><tspan x={910} dy={18}>over 40% in some subgroups</tspan></text>
        <text x={910} y={392} fontSize={19} fontFamily={SANS} fill={C.ink}><tspan x={910}>Kobak et al. link the</tspan><tspan x={910} dy={24}>jump to LLM-assisted</tspan><tspan x={910} dy={24}>writing. A tell this</tspan><tspan x={910} dy={24}>regular can be checked</tspan><tspan x={910} dy={24}>for, in our drafts too.</tspan></text>
      </Step>
    </Canvas>
  );
}
