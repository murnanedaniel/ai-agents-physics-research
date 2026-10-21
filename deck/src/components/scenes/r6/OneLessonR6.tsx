"use client";

import { motion } from "motion/react";
import { Arrow, C, Canvas, SERIF, Show, T } from "./kit";

const X0 = 200, N = 6, BW = 140, GAP = 12;
const bx = (k: number) => X0 + k * (BW + GAP);
const YOU = 60, ROW0 = 175, ROWH = 42, PROJECTS = 5;


// The same work, first done by hand, then delegated across many projects
// with the researcher at the checkpoints, then closed into feedback loops.
// The lesson stays on screen from step 2; step 3 names its cost and the
// question it raises, which the next three scenes take up.
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

      {/* Feedback loops: each step's agents report up to your checkpoint,
          which steers the next step. The last checkpoint only receives. */}
      {Array.from({ length: N }, (_, k) => {
        const cx = bx(k) + BW - 11, top = YOU + 24;
        const col = (j: number) => bx(j) + (BW - 30) / 2;
        return (
          <motion.g key={`fb-${k}`} initial={false} animate={{ opacity: step >= 2 ? 1 : 0 }} transition={{ duration: 0.6, delay: 0.08 * k }}>
            <path d={`M ${col(k)} ${ROW0 - 6} Q ${col(k)} ${top + 30}, ${cx - 6} ${top + 4}`} fill="none" stroke={C.warm} strokeWidth={1.6} markerEnd="url(#ol-a)" />
            {k < N - 1 && <path d={`M ${cx + 6} ${top + 4} Q ${col(k + 1)} ${top + 30}, ${col(k + 1)} ${ROW0 - 8}`} fill="none" stroke={C.warm} strokeWidth={1.6} markerEnd="url(#ol-a)" />}
          </motion.g>
        );
      })}

      <motion.text x={X0} y={440} fontSize={T.lead} fill={C.ink} initial={false}
        animate={{ opacity: step === 0 ? 1 : 0 }} transition={{ duration: 0.5 }} aria-hidden={step !== 0}>Today: one project, every step by hand.</motion.text>
      <Show when={step >= 1}>
        <text x={X0} y={428} fontFamily={SERIF} fontStyle="italic" fontSize={T.big + 4} fill={C.warmText}>Be ambitious. Do more.</text>
        <text x={X0} y={466} fontSize={T.body} fill={C.ink}>Pick ambitious projects, run several at once, and automate the routine steps.</text>
      </Show>
      <Show when={step >= 2}>
        <text x={X0} y={508} fontSize={T.body} fill={C.ink}>It comes at a cost to your attention. It also raises a harder question:</text>
        <text x={X0} y={540} fontSize={T.body} fill={C.ink}>if agents do more of the work, what is left for us?</text>
      </Show>
    </Canvas>
  );
}
