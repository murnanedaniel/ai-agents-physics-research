"use client";

import { C, Canvas, Loops, MONO, SANS } from "./kit";

// sec-automate (section): the three loops with the middle (paper) loop lit,
// and the three kinds of admin around a paper that this section hands to
// agents, each tied to the demo that follows. One line in warm sets the rule
// that holds for all of them.
const LINES = [
  { head: "Forms and submissions", tail: ["EuroHPC for the Basic Model,", "arXiv for tracking, AI-for-Science credits"] },
  { head: "First reviews", tail: ["model judges for the grant,", "a held-out reviewer for the paper"] },
  { head: "Slides and teaching", tail: ["the skill behind this deck,", "teaching when students have agents"] },
];

export function SecAutomate() {
  return (
    <Canvas label="The three loops with the paper loop highlighted; beside it, the admin this section automates, much of it in a browser: forms and submissions (EuroHPC, arXiv, credits), first reviews (model judges, a held-out reviewer), slides and teaching; the last click stays with me">
      <Loops cx={240} cy={300} />
      <text x={540} y={44} fontFamily={SANS} fontSize={24} fill={C.ink}>Mostly admin, and much of it in a browser.</text>
      {LINES.map((ln, i) => (
        <g key={ln.head} transform={`translate(540 ${130 + i * 118})`}>
          <rect x={0} y={-28} width={6} height={98} rx={3} fill={C.accent} />
          <text x={28} y={0} fontFamily={SANS} fontSize={29} fill={C.ink}>{ln.head}</text>
          {ln.tail.map((t, k) => (
            <text key={t} x={28} y={34 + k * 28} fontFamily={SANS} fontSize={22} fill={C.muted}>{t}</text>
          ))}
        </g>
      ))}
      <g transform="translate(540 500)">
        <rect x={0} y={-30} width={6} height={44} rx={3} fill={C.warm} />
        <text x={28} y={0} fontFamily={SANS} fontSize={28} fill={C.warm}>The last click stays with me.</text>
        <text className="t-label" x={28} y={34} fontFamily={MONO} fontSize={15} fill={C.muted}>submit, pay, sign</text>
      </g>
    </Canvas>
  );
}
