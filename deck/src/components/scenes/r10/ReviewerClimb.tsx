"use client";

import { useState } from "react";
import { Arrow, C, Canvas, MONO, SANS, stop } from "./kit";

// demo-arxiv slot (comes before the arXiv edge): the last step before
// submitting. A revise-and-score loop climbs on structure and clarity against
// reviewer A; reviewer B never sees a draft during the climb and reads only
// the final, so the climb cannot tune the paper to it. Only then does the
// paper go on to arXiv (next scene). Grant lesson: notes/w13/JUDGE-PANEL-METHOD.md §5.
const TIP: Record<string, string> = {
  draft: "the paper source in git; every revision is a commit",
  a: "a model with a referee's rubric: structure, clarity, claims",
  b: "a different model and rubric, used once on the final",
  arxiv: "next slide: the submission form",
};

function Box({ x, y, w, title, sub, col, id, hover, setHover, dashed }: {
  x: number; y: number; w: number; title: string; sub: string; col: string; id: string;
  hover: string | null; setHover: (h: string | null) => void; dashed?: boolean;
}) {
  return (
    <g {...stop} onMouseEnter={() => setHover(id)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
      <rect x={x} y={y} width={w} height={100} rx={14} fill={C.card} stroke={col} strokeWidth={hover === id ? 3.5 : 2} strokeDasharray={dashed ? "9 6" : undefined} />
      <text x={x + w / 2} y={y + 44} textAnchor="middle" fontFamily={SANS} fontSize={27} fill={col === C.rule ? C.ink : col}>{title}</text>
      <text className="t-label" x={x + w / 2} y={y + 76} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.muted}>{sub}</text>
    </g>
  );
}

export function ReviewerClimb() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <Canvas label="A loop: the draft is revised and scored by reviewer A, and a revision is kept if the score rises, so the draft ends up tuned to A. Reviewer B, held out of the loop, reads only the final. Then the paper goes to arXiv. My grant drafts, tuned to model judges, grew too dense">
      <Arrow id="r10-rc" />
      <Arrow id="r10-rcw" color={C.warm} />
      {/* the climb */}
      <Box x={20} y={170} w={220} title="Draft" sub="revision n" col={C.ink} id="draft" hover={hover} setHover={setHover} />
      <Box x={400} y={170} w={260} title="Reviewer A" sub="in the loop" col={C.accent} id="a" hover={hover} setHover={setHover} />
      <path d="M150 162 C 210 70, 440 70, 510 162" fill="none" stroke={C.muted} strokeWidth={2} markerEnd="url(#r10-rc)" />
      <text className="t-label" x={330} y={82} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.muted}>score and comments</text>
      <path d="M510 278 C 440 360, 210 360, 150 278" fill="none" stroke={C.muted} strokeWidth={2} markerEnd="url(#r10-rc)" />
      <text className="t-label" x={330} y={376} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.muted}>revise; keep if the score rises</text>

      {/* the held-out check */}
      <line x1={720} x2={720} y1={70} y2={380} stroke={C.warm} strokeWidth={3} strokeDasharray="10 8" />
      <path d="M660 220 H 752" stroke={C.muted} strokeWidth={2} markerEnd="url(#r10-rc)" />
      <text className="t-label" x={690} y={202} textAnchor="middle" fontFamily={MONO} fontSize={15} fill={C.muted}>final</text>
      <Box x={760} y={170} w={250} title="Reviewer B" sub="held out" col={C.warm} id="b" hover={hover} setHover={setHover} dashed />
      <path d="M1010 220 H 1072" stroke={C.warm} strokeWidth={2} markerEnd="url(#r10-rcw)" />
      <g {...stop} onMouseEnter={() => setHover("arxiv")} onMouseLeave={() => setHover(null)}>
        <text x={1080} y={228} fontFamily={SANS} fontSize={27} fill={C.ink}>arXiv</text>
      </g>

      <text x={600} y={440} textAnchor="middle" fontFamily={SANS} fontSize={25} fill={C.ink}>Every revision is scored by reviewer A, so the draft ends up tuned to A.</text>
      <text x={600} y={478} textAnchor="middle" fontFamily={SANS} fontSize={25} fill={C.ink}>Only the final goes to reviewer B, so the loop can&apos;t have tuned the draft to B.</text>
      <text x={600} y={516} textAnchor="middle" fontFamily={SANS} fontSize={22} fill={C.muted}>From my grants: drafts I tuned to model judges grew too dense.</text>
      <text className="t-label" x={600} y={552} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.accent}>{hover ? TIP[hover] : "published: Style Wins, Substance Loses, on LLM judges (arXiv:2608.01666)"}</text>
    </Canvas>
  );
}
