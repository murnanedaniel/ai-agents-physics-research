"use client";

import { useState } from "react";
import { C, Canvas, MONO, SANS, Show, stop } from "./kit";

// paper-reviewer slot (comes after the review): arXiv's new-submission tabs
// (info.arxiv.org/help/submit) and who does each live. Step 0: the five tabs,
// each with what happens in it. Step 1: the edge, and the one click that
// stays human. The source tarball is built in the shell because browser
// uploads have open bug reports in 2026 (notes/w19/WEB-RESEARCH.md §6).
const TABS = [
  { name: "Start", how: "browser", detail: ["category,", "licence, policy", "boxes"] },
  { name: "Add files", how: "shell + me", detail: ["shell builds the", "tarball; I", "attach it"] },
  { name: "Process", how: "browser", detail: ["arXiv compiles;", "the agent reads", "the log, fixes", "warnings"] },
  { name: "Metadata", how: "browser", detail: ["title, authors,", "abstract and", "comments, from", "the source"] },
  { name: "Preview", how: "browser", detail: ["the compiled PDF,", "checked against", "the local build"] },
];
const TIP = "Add files: browser uploads have open bug reports in 2026, so the shell builds the file and I attach it";
const W = 170, G = 14, Y = 150, H = 196;

export function ArxivEdge({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const ex = TABS.length * (W + G) + 20;
  return (
    <Canvas label="arXiv's submission form has five tabs before the Submit button: start, add files, process, metadata and preview. The agent fills them in the browser; the shell builds the source file and I attach it. The Submit click stays with me, because an announced paper can be withdrawn but not deleted">
      <text x={0} y={70} fontFamily={SANS} fontSize={26} fill={C.ink}>Live: the reviewed tracking paper, through arXiv&apos;s five tabs.</text>
      {TABS.map((t, i) => {
        const x = i * (W + G);
        const hot = hover === i;
        return (
          <g key={t.name} {...stop} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
            <rect x={x} y={Y} width={W} height={H} rx={12} fill={C.card} stroke={hot ? C.accent : C.rule} strokeWidth={hot ? 2.5 : 1.5} />
            <text className="t-label" x={x + 14} y={Y + 30} fontFamily={MONO} fontSize={14} fill={C.accent}>{`tab ${i + 1} · ${t.how}`}</text>
            <text x={x + 14} y={Y + 70} fontFamily={SANS} fontSize={25} fill={C.ink}>{t.name}</text>
            {t.detail.map((d, k) => (
              <text key={d} className="t-label" x={x + 14} y={Y + 108 + k * 22} fontFamily={MONO} fontSize={14} fill={C.muted}>{d}</text>
            ))}
          </g>
        );
      })}
      <path d={`M 0 ${Y + H + 20} H ${ex - 34}`} stroke={C.accent} strokeWidth={2} />
      <text x={(ex - 20) / 2} y={Y + H + 52} textAnchor="middle" fontFamily={SANS} fontSize={25} fill={C.accent}>the agent</text>
      <text className="t-label" x={(ex - 20) / 2} y={Y + H + 84} textAnchor="middle" fontFamily={MONO} fontSize={15} fill={C.muted}>{hover === 1 ? TIP : " "}</text>

      <Show at={1} step={step} dim>
        <line x1={ex - 10} x2={ex - 10} y1={Y - 40} y2={Y + H + 60} stroke={C.warm} strokeWidth={3} />
        <text className="t-label" x={ex - 10} y={Y - 52} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.warm}>the edge</text>
        <rect x={ex + 12} y={Y} width={210} height={H} rx={12} fill={C.warmTint} stroke={C.warm} strokeWidth={2.5} strokeDasharray="9 6" />
        <text x={ex + 34} y={Y + 70} fontFamily={SANS} fontSize={27} fill={C.warm}>Submit</text>
        <text className="t-label" x={ex + 34} y={Y + 108} fontFamily={MONO} fontSize={14} fill={C.muted}>one click; once</text>
        <text className="t-label" x={ex + 34} y={Y + 130} fontFamily={MONO} fontSize={14} fill={C.muted}>announced, it can</text>
        <text className="t-label" x={ex + 34} y={Y + 152} fontFamily={MONO} fontSize={14} fill={C.muted}>be withdrawn, not</text>
        <text className="t-label" x={ex + 34} y={Y + 174} fontFamily={MONO} fontSize={14} fill={C.muted}>deleted</text>
        <text x={ex + 117} y={Y + H + 52} textAnchor="middle" fontFamily={SANS} fontSize={25} fill={C.warm}>me</text>
        <text x={600} y={500} textAnchor="middle" fontFamily={SANS} fontSize={26} fill={C.ink}>Today we stop here: Submit is not pressed.</text>
      </Show>
    </Canvas>
  );
}
