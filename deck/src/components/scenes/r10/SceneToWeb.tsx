"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Arrow, C, Canvas, MONO, SANS, Show, stop } from "./kit";

// add-a-slide: the live demo path of a new scene. Step 0: file, push, build,
// serve (a dot runs the chain once). Step 1: why the URL is on my own domain:
// a CNAME file in the user-site repo plus DNS records (a CNAME for www, A
// records for the apex). Workflow: .github/workflows/pages.yml in the course repo.
const STAGES = [
  { name: "Scene file", sub: "beats/<id>.tsx", more: ["written in conversation", "with the agent"] },
  { name: "git push", sub: "to main", more: ["pushing to main", "starts the publish"] },
  { name: "Actions", sub: "runs build.sh", more: ["exports deck and docs;", "base path = repo name"] },
  { name: "Pages", sub: "serves the files", more: ["static files, free", "for public repos"] },
];
const W = 240, G = 66, Y = 30, H = 104;
const DOT = Y + H + 84;

export function SceneToWeb({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const xs = STAGES.map((_, i) => i * (W + G) + W / 2);
  return (
    <Canvas label="A new scene file, written in conversation with the agent, is pushed to GitHub; GitHub Actions builds the deck and GitHub Pages serves it. A CNAME file in my user-site repo and DNS records put it at www.danielmurnane.com, and every other repo's Pages site appears under that domain at its repo name">
      <Arrow id="r10-sw" />
      {STAGES.map((s, i) => {
        const x = i * (W + G);
        const hot = hover === i;
        return (
          <g key={s.name} {...stop} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
            <rect x={x} y={Y} width={W} height={H} rx={12} fill={C.card} stroke={hot ? C.accent : C.rule} strokeWidth={hot ? 2.5 : 1.5} />
            <text x={x + 20} y={Y + 46} fontFamily={SANS} fontSize={27} fill={C.ink}>{s.name}</text>
            <text className="t-label" x={x + 20} y={Y + 80} fontFamily={MONO} fontSize={16} fill={C.muted}>{s.sub}</text>
            {i < STAGES.length - 1 && <path d={`M ${x + W + 8} ${Y + H / 2} H ${x + W + G - 8}`} stroke={C.muted} strokeWidth={2} markerEnd="url(#r10-sw)" />}
          </g>
        );
      })}
      {STAGES.map((st, i) => st.more.map((m, k) => (
        <text key={m} className="t-label" x={i * (W + G) + 20} y={Y + H + 28 + k * 21} fontFamily={MONO} fontSize={15} fill={hover === i ? C.accent : C.muted}>{m}</text>
      )))}
      <line x1={xs[0]} x2={xs[xs.length - 1]} y1={DOT} y2={DOT} stroke={C.rule} strokeWidth={2} />
      <motion.circle r={9} cy={DOT} fill={C.accent} initial={{ cx: xs[0] }} animate={{ cx: xs[xs.length - 1] }} transition={{ duration: 2.4, ease: "easeInOut", delay: 0.4 }} />

      <Show at={1} step={step} dim>
        <rect x={150} y={262} width={900} height={60} rx={30} fill={C.card} stroke={C.accent} strokeWidth={2} />
        <text x={600} y={302} textAnchor="middle" fontFamily={MONO} fontSize={26} fill={C.ink}>www.danielmurnane.com/ai-agents-physics-research/</text>
        <text x={600} y={372} textAnchor="middle" fontFamily={SANS} fontSize={25} fill={C.ink}>My own domain, set up once:</text>
        <text x={300} y={420} textAnchor="middle" fontFamily={SANS} fontSize={24} fill={C.ink}>a CNAME file in my user-site repo</text>
        <text className="t-label" x={300} y={450} textAnchor="middle" fontFamily={MONO} fontSize={15} fill={C.muted}>murnanedaniel.github.io</text>
        <text x={900} y={420} textAnchor="middle" fontFamily={SANS} fontSize={24} fill={C.ink}>DNS records at the registrar</text>
        <text className="t-label" x={900} y={450} textAnchor="middle" fontFamily={MONO} fontSize={15} fill={C.muted}>a CNAME for www, A records for the apex</text>
        <text x={600} y={516} textAnchor="middle" fontFamily={SANS} fontSize={24} fill={C.ink}>After that, each of my repos with Pages appears under it, at /repo-name/.</text>
      </Show>
    </Canvas>
  );
}
