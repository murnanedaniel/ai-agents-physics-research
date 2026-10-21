"use client";

import { C, Canvas, Loops, MONO, SANS } from "./kit";

// sec-automate (section): the three loops with the middle (paper) loop lit,
// and the three kinds of work around a paper that this section hands to agents.
// One line in warm sets the rule that holds for all of them.
const LINES = [
  { head: "Forms and submissions", tail: "a grant call, arXiv, credits" },
  { head: "First reviews", tail: "a panel of model judges, a held-out reviewer" },
  { head: "Slides and teaching", tail: "this deck, and a lecture turned round" },
];

export function SecAutomate() {
  return (
    <Canvas label="The three loops with the paper loop highlighted; beside it, three kinds of work this section automates: forms and submissions, first reviews, slides and teaching; the last click stays with me">
      <Loops cx={240} cy={290} />
      {LINES.map((ln, i) => (
        <g key={ln.head} transform={`translate(540 ${120 + i * 120})`}>
          <rect x={0} y={-30} width={6} height={74} rx={3} fill={C.accent} />
          <text x={28} y={0} fontFamily={SANS} fontSize={30} fill={C.ink}>{ln.head}</text>
          <text x={28} y={38} fontFamily={SANS} fontSize={24} fill={C.muted}>{ln.tail}</text>
        </g>
      ))}
      <g transform="translate(540 480)">
        <rect x={0} y={-30} width={6} height={44} rx={3} fill={C.warm} />
        <text x={28} y={0} fontFamily={SANS} fontSize={28} fill={C.warm}>The last click stays with me.</text>
        <text className="t-label" x={28} y={34} fontFamily={MONO} fontSize={15} fill={C.muted}>submit, pay, sign</text>
      </g>
    </Canvas>
  );
}
