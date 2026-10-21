"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { C, Canvas, SERIF, T, stop } from "./kit";

const CX = 290, CY = 280;
const loops = [
  { r: 80, period: 3, color: C.accent, name: "An experiment", verbs: "hypothesis, run, evaluate, iterate", eg: "e.g. the Pandora speed-up, one A/B test at a time", when: "Session 2, this morning", ly: 105 },
  { r: 165, period: 10, color: C.warm, text: C.warmText, name: "A project and a paper", verbs: "experiments, argument, review, revision", eg: "e.g. the paper review loop", when: "Session 3, after lunch", ly: 270 },
  { r: 250, period: 30, color: C.violet, name: "A programme", verbs: "briefs, decision logs, approval gates", eg: "e.g. ScienceDash, the ERC submission", when: "Session 4, this afternoon", ly: 435 },
];
const LX = 660;

// Nested loops: each one closes more slowly than the one inside it.
// The orbiting dot's period stands for the feedback time. The dot is rotated
// with an SVG rotate(angle, CX, CY) about the exact centre of its ring, so
// it sits on the line at every angle.
export function ThreeLoopsExact({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Canvas>
      {loops.map((l, i) => {
        const on = step >= i;
        const faded = hover !== null && hover !== i;
        return (
          <motion.g key={l.name} initial={false} animate={{ opacity: on ? (faded ? 0.25 : 1) : 0 }} transition={{ duration: 0.7 }} aria-hidden={!on}
            onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onClick={stop} style={{ cursor: "default" }}>
            <circle cx={CX} cy={CY} r={l.r} fill="none" stroke={l.color} strokeWidth={3} />
            <g>
              <animateTransform attributeName="transform" type="rotate" from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`} dur={`${l.period}s`} repeatCount="indefinite" />
              <circle cx={CX + l.r} cy={CY} r={9} fill={l.color} />
            </g>
            <circle cx={LX - 22} cy={l.ly - 9} r={8} fill={l.color} />
            <text x={LX} y={l.ly} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 6} fill={C.ink}>{l.name}</text>
            <text x={LX} y={l.ly + 32} fontSize={T.body} fill={C.ink}>{l.verbs}</text>
            <text x={LX} y={l.ly + 58} fontSize={T.label} fill={C.muted} className="t-label">{l.eg}</text>
            <text x={LX} y={l.ly + 80} fontSize={T.label} fill={"text" in l ? l.text : l.color} className="t-label">{l.when}</text>
          </motion.g>
        );
      })}
    </Canvas>
  );
}
