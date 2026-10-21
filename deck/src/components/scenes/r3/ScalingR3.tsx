"use client";

import { motion } from "motion/react";
import { C, Canvas, G, MONO, SANS } from "../g2/kit";

// llm-scaling (round 2): three ways compute made models better, one panel per step.
// 1. Kaplan et al. 2020, Eq. 1.3: L(C) = (C / 3.1e8 PF-days)^-0.050, plotted over
//    the 7 decades 1e-7 to 1 PF-day.
// 2. Hoffmann et al. 2022, Eq. 10 (approach 3 fit): L(N, D) = 1.69 + 406.4/N^0.34
//    + 410.7/D^0.28, along the Gopher compute budget C = 6ND = 5.76e23 FLOPs.
// 3. Snell et al. 2024: FLOPs-matched, extra test-time compute beat a 14x larger
//    model on problems where the small model had a non-trivial success rate.
const PW = 300, PH = 300, TOP = 120;
const PX = [80, 475, 870];

const kaplan = (c: number) => (c / 3.1e8) ** -0.05;
const CHIN_C = 5.76e23;
const chin = (n: number) => 1.69 + 406.4 / n ** 0.34 + 410.7 / (CHIN_C / (6 * n)) ** 0.28;

function Panel({ i, on, caption, children }: { i: number; on: boolean; caption: string[]; children: React.ReactNode }) {
  return (
    <G on={on}>
      <g transform={`translate(${PX[i]} 0)`}>
        {children}
        {caption.map((c, j) => (
          <text key={c} x={PW / 2} y={TOP + PH + 78 + j * 30} textAnchor="middle" fill={C.ink} fontSize="22" fontFamily={SANS}>{c}</text>
        ))}
      </g>
    </G>
  );
}

export function ScalingR3({ step }: { step: number }) {
  // panel 1: log-log, x from 1e-7 to 1e0, y from 2 to 7
  const k = {
    x: (c: number) => ((Math.log10(c) + 7) / 7) * PW,
    y: (l: number) => TOP + PH - ((Math.log(l) - Math.log(2)) / (Math.log(7) - Math.log(2))) * PH,
  };
  const kPath = Array.from({ length: 29 }, (_, j) => 10 ** (-7 + j * 0.25)).map((c, j) => `${j ? "L" : "M"} ${k.x(c).toFixed(1)} ${k.y(kaplan(c)).toFixed(1)}`).join(" ");

  // panel 2: x = log10 N from 10 to 12, y = loss from 1.90 to 2.10
  const h = {
    x: (n: number) => ((Math.log10(n) - 10) / 2) * PW,
    y: (l: number) => TOP + PH - ((l - 1.9) / 0.2) * PH,
  };
  const hPath = Array.from({ length: 41 }, (_, j) => 10 ** (10 + j * 0.05)).map((n, j) => `${j ? "L" : "M"} ${h.x(n).toFixed(1)} ${h.y(chin(n)).toFixed(1)}`).join(" ");

  const axes = (xl: string, yl: string) => (
    <>
      <line x1="0" y1={TOP + PH} x2={PW} y2={TOP + PH} stroke={C.ink} strokeWidth="1.5" />
      <line x1="0" y1={TOP} x2="0" y2={TOP + PH} stroke={C.ink} strokeWidth="1.5" />
      <text className="t-label" x={PW / 2} y={TOP + PH + 44} textAnchor="middle" fill={C.ink} fontSize="16" fontFamily={MONO}>{xl}</text>
      <text className="t-label" x="0" y={TOP - 14} fill={C.ink} fontSize="16" fontFamily={MONO}>{yl}</text>
    </>
  );

  return (
    <Canvas>
      <svg viewBox="0 0 1200 560" className="h-full w-full" role="img" aria-label="Three panels: loss falls as a power law in training compute; at fixed compute a 70B model on more data beats a 280B model; thinking longer at inference can beat a 14 times larger model">
        <text x="20" y="34" fill={C.ink} fontSize="22" fontFamily={SANS}>
          <tspan fill={C.muted}>Loss: how surprised the model is by the next token.</tspan>
        </text>

        {/* 1. Kaplan */}
        <Panel i={0} on={step >= 0} caption={["More compute, lower loss."]}>
          {axes("training compute (PF-days)", "loss (log)")}
          {[-7, -5, -3, -1].map((e) => (
            <text key={e} className="t-label" x={k.x(10 ** e)} y={TOP + PH + 20} textAnchor="middle" fill={C.muted} fontSize="14" fontFamily={MONO}>1e{e}</text>
          ))}
          {[3, 4, 6].map((l) => (
            <g key={l}>
              <line x1="0" x2={PW} y1={k.y(l)} y2={k.y(l)} stroke={C.rule} />
              <text className="t-label" x="-8" y={k.y(l) + 5} textAnchor="end" fill={C.muted} fontSize="14" fontFamily={MONO}>{l}</text>
            </g>
          ))}
          <motion.path d={kPath} fill="none" stroke={C.s1} strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }} />
          <text className="t-label" x={PW * 0.55} y={k.y(kaplan(10 ** -3)) - 40} textAnchor="start" fill={C.ink} fontSize="15" fontFamily={MONO}>fit over 7 decades</text>
          <text className="t-label" x={PW * 0.55} y={k.y(kaplan(10 ** -3)) - 22} textAnchor="start" fill={C.muted} fontSize="14" fontFamily={MONO}>Kaplan 2020</text>
        </Panel>

        {/* 2. Chinchilla */}
        <Panel i={1} on={step >= 1} caption={["Same compute: smaller model, more data."]}>
          {axes("model size (data shrinks →)", "loss, fixed compute")}
          {[[1e10, "10B"], [1e11, "100B"], [1e12, "1T"]].map(([n, l]) => (
            <text key={l as string} className="t-label" x={h.x(n as number)} y={TOP + PH + 20} textAnchor="middle" fill={C.muted} fontSize="14" fontFamily={MONO}>{l}</text>
          ))}
          {[1.95, 2.0, 2.05].map((l) => (
            <g key={l}>
              <line x1="0" x2={PW} y1={h.y(l)} y2={h.y(l)} stroke={C.rule} />
              <text className="t-label" x="-8" y={h.y(l) + 5} textAnchor="end" fill={C.muted} fontSize="14" fontFamily={MONO}>{l.toFixed(2)}</text>
            </g>
          ))}
          <motion.path d={hPath} fill="none" stroke={C.s1} strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: step >= 1 ? 1 : 0 }} transition={{ duration: 1.2 }} />
          {[
            { n: 7e10, name: "Chinchilla 70B", sub: "1.4T tokens", c: C.s3, dy: -46 },
            { n: 2.8e11, name: "Gopher 280B", sub: "300B tokens", c: C.s2, dy: -46 },
          ].map((m) => (
            <g key={m.name}>
              <circle cx={h.x(m.n)} cy={h.y(chin(m.n))} r="8" fill={m.c} stroke="#fff" strokeWidth="2" />
              <text className="t-label" x={h.x(m.n)} y={h.y(chin(m.n)) + m.dy} textAnchor="middle" fill={C.ink} fontSize="15" fontFamily={MONO}>{m.name}</text>
              <text className="t-label" x={h.x(m.n)} y={h.y(chin(m.n)) + m.dy + 18} textAnchor="middle" fill={C.muted} fontSize="14" fontFamily={MONO}>{m.sub}</text>
            </g>
          ))}
          <text className="t-label" x={PW - 4} y={TOP + 18} textAnchor="end" fill={C.muted} fontSize="14" fontFamily={MONO}>Hoffmann 2022 fit</text>
        </Panel>

        {/* 3. test-time compute */}
        <Panel i={2} on={step >= 2} caption={["Or think longer per answer."]}>
          <text className="t-label" x="10" y={TOP + 40} fill={C.ink} fontSize="16" fontFamily={MONO}>same FLOPs per answer:</text>
          <rect x="10" y={TOP + 70} width="80" height="48" rx="6" fill={C.s1} fillOpacity="0.35" stroke={C.s1} />
          <text className="t-label" x="50" y={TOP + 101} textAnchor="middle" fill={C.ink} fontSize="17" fontFamily={SANS}>model</text>
          <motion.rect x="94" y={TOP + 70} height="48" rx="6" fill={C.s3} initial={{ width: 0 }} animate={{ width: step >= 2 ? 196 : 0 }} transition={{ duration: 1.1, delay: 0.3 }} />
          <text className="t-label" x="192" y={TOP + 101} textAnchor="middle" fill={C.ink} fontSize="17" fontFamily={SANS}>thinking longer</text>
          <text className="t-label" x="10" y={TOP + 160} fill={C.ink} fontSize="16" fontFamily={MONO}>can beat</text>
          <rect x="10" y={TOP + 180} width="280" height="48" rx="6" fill={C.s2} />
          <text className="t-label" x="150" y={TOP + 211} textAnchor="middle" fill={C.ink} fontSize="17" fontFamily={SANS}>a 14× larger model</text>
          <text className="t-label" x="10" y={TOP + 262} fill={C.muted} fontSize="14" fontFamily={MONO}>on problems the small model</text>
          <text className="t-label" x="10" y={TOP + 280} fill={C.muted} fontSize="14" fontFamily={MONO}>already sometimes solves</text>
          <text className="t-label" x="10" y={TOP + 298} fill={C.muted} fontSize="14" fontFamily={MONO}>Snell 2024</text>
        </Panel>
      </svg>
    </Canvas>
  );
}
