"use client";

import { Area, C, G, Show, T } from "../r11/kit";

// demo-next-projects: live demo after ideation. Claude reads my whole
// ScienceDash (projects, programmes, recent threads, grant work) through the
// sciencedash skill, read-only, and proposes my next ten projects. The slide
// shows the setup and the shape of the prompt only; the output stays in the
// terminal. Counts from `sd.py projects` and `query_entity programme`, read
// 22 Oct 2026. Full prompt: notes/round3/demo-next-projects-prompt.md (private).
const MONO = "var(--font-geist-mono), monospace";
const SOURCES = [
  { h: "41 projects", t: "hypothesis, next steps, blockers" },
  { h: "7 programmes", t: "one thesis each" },
  { h: "my threads", t: "what I actually worked on" },
  { h: "grant work", t: "themes I have committed to" },
];

export function DemoNextProjects({ step }: { step: number }) {
  return (
    <Area style={{ gap: "2.5vh" }}>
      <svg viewBox="0 0 1200 300" className="w-full" style={{ flex: "0 0 auto" }} role="img" aria-label="ScienceDash holds projects, programmes, threads and grant work; Claude reads it through a read-only skill and returns ten proposed projects">
        <defs>
          <marker id="r37-np-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={C.muted} />
          </marker>
        </defs>
        <rect x={10} y={10} width={430} height={280} rx="14" fill={C.card} stroke={C.ink} strokeWidth="2" />
        <text className="t-label" x={30} y={44} fontSize="18" fill={C.muted} fontFamily={MONO}>ScienceDash</text>
        {SOURCES.map((s, i) => (
          <g key={s.h}>
            <text x={30} y={96 + i * 54} fontSize="26" fill={C.ink}>{s.h}</text>
            <text className="t-label" x={220} y={96 + i * 54} fontSize="17" fill={C.muted} fontFamily={MONO}>{s.t}</text>
          </g>
        ))}
        <line x1={445} y1={150} x2={585} y2={150} stroke={C.muted} strokeWidth="2" markerEnd="url(#r37-np-arrow)" />
        <text className="t-label" x={515} y={136} textAnchor="middle" fontSize="17" fill={C.accent} fontFamily={MONO}>read-only skill</text>
        <circle cx={650} cy={150} r={56} fill={C.ink} />
        <text x={650} y={158} textAnchor="middle" fontSize="24" fill="#fff">Claude</text>
        <line x1={710} y1={150} x2={830} y2={150} stroke={C.muted} strokeWidth="2" markerEnd="url(#r37-np-arrow)" />
        <G when={step >= 0}>
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x={850 + (i % 2) * 165} y={30 + Math.floor(i / 2) * 50} width={150} height={38} rx="8" fill="#fff" stroke={C.accent} strokeWidth="1.5" />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <text key={i} className="t-label" x={866 + (i % 2) * 165} y={55 + Math.floor(i / 2) * 50} fontSize="17" fill={C.accent} fontFamily={MONO}>project {i + 1}</text>
          ))}
        </G>
      </svg>
      <div className="relative min-h-0 flex-1">
        <Show when={step < 1} className="absolute inset-0" style={{ ...T.big, color: C.ink, display: "flex", alignItems: "center" }}>
          <span>Everything I track is in one place. Can Claude read all of it and tell me what to start next?</span>
        </Show>
        <Show when={step >= 1} className="absolute inset-0" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", columnGap: "3vw", alignItems: "start" }}>
          <pre className="t-label" style={{ ...T.label, ...T.mono, color: C.ink, background: "#fff", border: `1px solid ${C.rule}`, borderRadius: 10, padding: "1.4vh 1.2vw", whiteSpace: "pre-wrap", margin: 0 }}>
{`Use the sciencedash skill, read-only.
Read every programme and active project,
and search my threads from the last six weeks.

Propose my next 10 projects. For each:
the question, which programme it serves,
what it reuses, why now, a first
two-week milestone and its check.

At least 3 must combine two programmes.
Finish with the 3 you would cut first.`}
          </pre>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.6vh" }}>
            <div style={{ ...T.body, color: C.ink }}>I ask it to stay read-only, and I watch the commands it runs.</div>
            <div style={{ ...T.body, color: C.ink, borderLeft: `4px solid ${C.warm}`, paddingLeft: "1vw" }}>
              Judge the list like the study did: which of these would you spend 100 hours on?
            </div>
          </div>
        </Show>
      </div>
    </Area>
  );
}
