"use client";
import { motion } from "motion/react";
import { C, Canvas, MONO, SANS, SERIF, Step } from "./common";

// notes/w19/WEB-RESEARCH.md §2: context rot (Chroma 2025), lost in the middle (Liu et al. 2023),
// no continual learning (arXiv:2501.07278). ScienceDash: notes/w19/HOMEBOX-STORIES.md §7.
const NODES = Array.from({ length: 20 }, (_, k) => ({ cx: 70 + (k % 4) * 52, cy: 110 + Math.floor(k / 4) * 52 }));
const BX = 380, BW = 740;

// Schematic only: recall falls in the middle of a long context and overall as it grows.
const curve = (x0: number, w: number, y0: number, h: number) => {
  const pts = Array.from({ length: 41 }, (_, i) => {
    const t = i / 40;
    const u = 1 - 0.55 * Math.sin(Math.PI * t) ** 1.4 - 0.22 * t;
    return `${i ? "L" : "M"}${x0 + t * w},${y0 + h - u * h}`;
  });
  return pts.join("");
};

export function Architecture({ step }: { step: number }) {
  return (
    <Canvas label="Diagram: model weights fixed after training; a session's context fills up and recall degrades in the middle; when the session ends only files written to disk carry over">
      {/* weights: fixed */}
      <rect x={30} y={70} width={268} height={300} rx={14} fill="#ece6da" stroke={C.rule} />
      {NODES.map((n, i) => NODES.slice(i + 1).filter((m) => Math.abs(m.cy - n.cy) === 52 && Math.abs(m.cx - n.cx) <= 52).map((m, j) => (
        <line key={`${i}-${j}`} x1={n.cx + 8} y1={n.cy} x2={m.cx + 8} y2={m.cy} stroke="#bdb5a6" strokeWidth={1.2} />
      )))}
      {NODES.map((n, i) => <circle key={i} cx={n.cx + 8} cy={n.cy} r={9} fill="#9d9483" />)}
      <text x={164} y={50} textAnchor="middle" fontSize={22} fontFamily={SANS} fill={C.ink}>weights</text>
      <text x={164} y={404} textAnchor="middle" fontSize={20} fontFamily={SERIF} fontStyle="italic" fill={C.ink}>fixed after training</text>

      {/* session 1: the context fills */}
      <text x={BX} y={50} fontSize={22} fontFamily={SANS} fill={C.ink}>context of one session</text>
      <rect x={BX} y={70} width={BW} height={44} rx={8} fill="none" stroke={C.muted} strokeWidth={1.5} />
      <motion.rect x={BX + 3} y={73} height={38} rx={6} fill={C.accent} opacity={0.75}
        initial={{ width: 0 }} animate={{ width: step >= 1 ? 0 : BW - 6 }} transition={{ duration: step >= 1 ? 0.6 : 2.2, ease: "easeInOut" }} />
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 0 : 1 }} transition={{ delay: step >= 1 ? 0 : 1.6 }}>
        <rect x={BX + BW * 0.55} y={70} width={BW * 0.45} height={44} rx={8} fill="url(#g3-rot)" />
        <text className="t-label" x={BX + BW - 8} y={136} textAnchor="end" fontSize={14} fontFamily={MONO} fill="#92400e">rot zone</text>
      </motion.g>
      <defs>
        <pattern id="g3-rot" width={10} height={10} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width={10} height={10} fill="rgba(180,83,9,0.18)" />
          <line x1={0} y1={0} x2={0} y2={10} stroke="rgba(180,83,9,0.55)" strokeWidth={3} />
        </pattern>
      </defs>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 0.25 : 1 }} data-dim={step >= 1 ? "" : undefined}>
        <path d={curve(BX, BW, 140, 150)} fill="none" stroke={C.accent} strokeWidth={3} />
        <line x1={BX} x2={BX + BW} y1={312} y2={312} stroke={C.rule} />
        <text className="t-label" x={BX} y={332} fontSize={14} fontFamily={MONO} fill={C.muted}>start</text>
        <text className="t-label" x={BX + BW} y={332} textAnchor="end" fontSize={14} fontFamily={MONO} fill={C.muted}>end of context</text>
        <text x={BX + BW / 2} y={272} textAnchor="middle" fontSize={20} fontFamily={SANS} fill={C.ink}>recall sags in the middle and as it grows</text>
        <text className="t-label" x={BX + BW / 2} y={296} textAnchor="middle" fontSize={14} fontFamily={MONO} fill={C.muted}>schematic, after Liu et al. 2023 and Chroma 2025</text>
      </motion.g>

      {/* step 1: the session ends; weights unchanged, only files carry over */}
      <Step at={1} step={step}>
        <g transform="translate(420,438)">
          <path d="M0,0 h40 l12,12 v52 h-52 z" fill="#fffaf0" stroke={C.ink} strokeWidth={1.5} />
          <path d="M40,0 v12 h12" fill="none" stroke={C.ink} strokeWidth={1.5} />
          {[22, 33, 44].map((yy) => <line key={yy} x1={9} x2={42} y1={yy} y2={yy} stroke={C.faint} strokeWidth={2} />)}
          <text x={76} y={26} fontSize={24} fontFamily={SERIF} fontStyle="italic" fill={C.ink}>Weights frozen; memory is files.</text>
          <text className="t-label" x={76} y={54} fontSize={14} fontFamily={MONO} fill={C.muted}>ScienceDash, my project memory: 18 of 38 projects never touched after creation</text>
        </g>
      </Step>
    </Canvas>
  );
}
