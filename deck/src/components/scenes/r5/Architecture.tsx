"use client";
import { motion } from "motion/react";
import { C, Canvas, MONO, SANS, SERIF, Step, Tag } from "./common";

// Published: notes/w19/WEB-RESEARCH.md §2: no continual learning in deployed agents (arXiv:2501.07278);
// recall degrades in long contexts (Liu et al. arXiv:2307.03172; Chroma "Context Rot", Jul 2025).
// Mine: notes/w12/RESULTS-perlmutter.md §8.1b: same error category within the next 20 messages of the
// same thread after a memory/CLAUDE.md note 37.4% (55/147) vs matched random control 37.3% (112/300).
const NODES = Array.from({ length: 16 }, (_, k) => ({ cx: 58 + (k % 4) * 46, cy: 210 + Math.floor(k / 4) * 46 }));
const BX = 330, BW = 800;

// Schematic only: recall falls in the middle of a long context and overall as it grows.
const curve = (x0: number, w: number, y0: number, h: number) =>
  Array.from({ length: 41 }, (_, i) => {
    const t = i / 40;
    const u = 1 - 0.55 * Math.sin(Math.PI * t) ** 1.4 - 0.22 * t;
    return `${i ? "L" : "M"}${x0 + t * w},${y0 + h - u * h}`;
  }).join("");

function Bar({ y, fill, label }: { y: number; fill: number; label: string }) {
  return (
    <g>
      <text className="t-label" x={BX} y={y - 10} fontSize={14} fontFamily={MONO} fill={C.muted}>{label}</text>
      <rect x={BX} y={y} width={BW} height={38} rx={8} fill="none" stroke={C.muted} strokeWidth={1.5} />
      <motion.rect x={BX + 3} y={y + 3} height={32} rx={6} fill={C.accent} opacity={0.75}
        initial={{ width: 0 }} animate={{ width: Math.max(0, fill * (BW - 6)) }} transition={{ duration: 1.6, ease: "easeInOut" }} />
    </g>
  );
}

export function Architecture({ step }: { step: number }) {
  const ended = step >= 1;
  return (
    <Canvas label="Diagram: model weights are fixed after training, so there is no continual learning; within a session only the context window fills, and recall degrades as it grows; when the session ends only files on disk carry over to the next session">
      <Tag x={0} y={10} kind="published" />
      <text x={0} y={52} fontSize={22} fontFamily={SANS} fill={C.ink}>
        <tspan fontFamily={SERIF} fontStyle="italic" fontSize={25}>Continual learning</tspan>: updating the weights from new experience.
      </text>
      <text x={0} y={86} fontSize={22} fontFamily={SANS} fill={C.ink}>Deployed models don’t; only the context changes.</text>

      {/* weights: locked */}
      <rect x={20} y={150} width={240} height={250} rx={14} fill="#ece6da" stroke={C.rule} />
      {NODES.map((n, i) => NODES.slice(i + 1).filter((m) => Math.abs(m.cy - n.cy) === 46 && Math.abs(m.cx - n.cx) <= 46).map((m, j) => (
        <line key={`${i}-${j}`} x1={n.cx + 24} y1={n.cy} x2={m.cx + 24} y2={m.cy} stroke="#bdb5a6" strokeWidth={1.2} />
      )))}
      {NODES.map((n, i) => <circle key={i} cx={n.cx + 24} cy={n.cy} r={8} fill="#9d9483" />)}
      <g transform="translate(140,172)" fill="none" stroke={C.ink} strokeWidth={2}>
        <rect x={-13} y={-2} width={26} height={20} rx={3} fill="#ece6da" />
        <path d="M-7,-2 V-8 A7,7 0 0 1 7,-8 V-2" />
      </g>
      <text x={140} y={430} textAnchor="middle" fontSize={20} fontFamily={SANS} fill={C.ink}>weights: frozen</text>

      {/* session 1: the context fills, then is wiped */}
      <Bar y={150} fill={ended ? 0 : 1} label={ended ? "session 1 ended: context gone" : "session 1: the context window fills"} />
      <motion.g initial={false} animate={{ opacity: ended ? 0.2 : 1 }} data-dim={ended ? "" : undefined}>
        <path d={curve(BX, BW, 212, 80)} fill="none" stroke={C.accent} strokeWidth={3} />
        <text x={BX + BW / 2} y={322} textAnchor="middle" fontSize={19} fontFamily={SANS} fill={C.ink}>recall sags as the context grows</text>
        <text className="t-label" x={BX} y={306} fontSize={13} fontFamily={MONO} fill={C.muted}>start</text>
        <text className="t-label" x={BX + BW} y={306} textAnchor="end" fontSize={13} fontFamily={MONO} fill={C.muted}>end of context</text>
        <text className="t-label" x={BX + BW / 2} y={344} textAnchor="middle" fontSize={13} fontFamily={MONO} fill={C.muted}>schematic, after Liu et al. 2023 and Chroma 2025</text>
      </motion.g>

      {/* step 1: only files carry over */}
      <Step at={1} step={step}>
        <g transform={`translate(${BX},372)`}>
          <path d="M0,0 h28 l9,9 v37 h-37 z" fill="#fffaf0" stroke={C.ink} strokeWidth={1.5} />
          {[16, 24, 32].map((yy) => <line key={yy} x1={7} x2={30} y1={yy} y2={yy} stroke={C.faint} strokeWidth={2} />)}
          <text x={56} y={30} fontSize={21} fontFamily={SANS} fill={C.ink}>Only files carry over: CLAUDE.md, memory notes.</text>
        </g>
        <Bar y={444} fill={0.08} label="session 2 starts by reading them" />
        <Tag x={BX + BW} y={510} kind="mine" anchor="end" />
        <text className="t-label" x={BX + BW - 116} y={510} textAnchor="end" fontSize={13} fontFamily={MONO} fill={C.ink}>after a memory note, the same error type returned as often as at random: 37% vs 37%</text>
      </Step>
    </Canvas>
  );
}
