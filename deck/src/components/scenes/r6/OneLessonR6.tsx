"use client";

import { motion } from "motion/react";
import { Arrow, C, Canvas, SERIF, T } from "./kit";

const X0 = 200, N = 6, BW = 140, GAP = 12;
const bx = (k: number) => X0 + k * (BW + GAP);
const YOU = 95, ROW0 = 215, ROWH = 50, PROJECTS = 5;

const captions = [
  "Today: one project, every step by hand.",
  "Be ambitious and do more: many projects, you at the checkpoints.",
  "Automate the routine; keep the loops and the judgement.",
];

// The same work, first done by hand, then delegated across many projects
// with the researcher at the checkpoints, then closed into feedback loops.
export function OneLessonR6({ step }: { step: number }) {
  const many = step >= 1;
  return (
    <Canvas>
      <defs><Arrow id="ol-a" color={C.warm} /></defs>
      <text x={X0 - 30} y={YOU + 8} textAnchor="end" fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 4} fill={C.ink}>You</text>
      <motion.text x={X0 - 30} y={ROW0 + 2 * ROWH + 8} textAnchor="end" fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 4} fill={C.ink}
        initial={false} animate={{ opacity: many ? 1 : 0 }} transition={{ duration: 0.6 }}>Agents</motion.text>
      <line x1={X0 - 10} y1={YOU + 45} x2={bx(N)} y2={YOU + 45} stroke={C.rule} />

      {/* Your lane: full blocks by hand, then only checkpoints */}
      {Array.from({ length: N }, (_, k) => (
        <motion.rect key={`you-${k}`} initial={false} y={YOU - 22} height={44} rx={8}
          animate={many ? { x: bx(k) + BW - 22, width: 22, fill: C.warm } : { x: bx(k), width: BW, fill: "#efe2cf" }}
          stroke={C.warm} strokeWidth={1.3} transition={{ duration: 0.8, delay: 0.05 * k }} />
      ))}

      {/* Agent lanes: the same steps, across many projects */}
      {Array.from({ length: PROJECTS }, (_, p) =>
        Array.from({ length: N }, (_, k) => (
          <motion.rect key={`ag-${p}-${k}`} x={bx(k)} y={ROW0 + p * ROWH} width={BW - 30} height={ROWH - 14} rx={6}
            fill="#e3eef5" stroke={C.accent} strokeWidth={1}
            initial={false} animate={{ opacity: many ? 1 : 0 }} transition={{ duration: 0.6, delay: many ? 0.3 + 0.04 * (p + k) : 0 }} />
        )),
      )}

      {/* Feedback loops: agents report up to your check, which steers the next step */}
      {Array.from({ length: N - 1 }, (_, k) => {
        const cx = bx(k) + BW - 11;
        const from = bx(k) + (BW - 30) / 2, to = bx(k + 1) + (BW - 30) / 2;
        return (
          <motion.path key={`fb-${k}`} d={`M ${from} ${ROW0 - 6} Q ${from} ${YOU + 40}, ${cx} ${YOU + 26} Q ${to} ${YOU + 40}, ${to} ${ROW0 - 8}`}
            fill="none" stroke={C.warm} strokeWidth={1.6} markerEnd="url(#ol-a)"
            initial={false} animate={{ opacity: step >= 2 ? 1 : 0 }} transition={{ duration: 0.6, delay: 0.08 * k }} />
        );
      })}

      {captions.map((c, i) => (
        <motion.text key={c} x={X0} y={520} fontSize={T.lead} fill={C.ink} initial={false}
          animate={{ opacity: step === i ? 1 : 0 }} transition={{ duration: 0.5 }} aria-hidden={step !== i}>{c}</motion.text>
      ))}
    </Canvas>
  );
}
