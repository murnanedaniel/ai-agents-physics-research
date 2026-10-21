"use client";

import { docs, openExternal } from "@/lib/links";
import { Arrow, C, Canvas, MONO, Show, T, TINT, stop } from "./kit";

// The research-setup skill, as revised for a 5 to 10 minute slot:
// four agent messages, three short files (or one paste-in block).
const msgs = [
  { n: 1, text: "three questions", sub: "your work, where it runs, what it must never do" },
  { n: 2, text: "one follow-up, if any", sub: "e.g. confirm a limit on job size" },
  { n: 3, text: "drafts, shown once", sub: "what it heard, plus the three files" },
  { n: 4, text: "you approve, it writes", sub: "only inside your project folder" },
];
const files = [
  { name: "CLAUDE.md", note: "rules the agent reads every session, under 40 lines" },
  { name: "SKILL.md", note: "one starter skill, e.g. submit-job, under 30 lines" },
  { name: "DECISIONS.md", note: "why you set it up this way, in your words" },
];
const CARD = "exercises/setup-interview/";

export function HandsOnSetup({ step }: { step: number }) {
  const fx = 680;
  return (
    <Canvas>
      <defs><Arrow id="hs-a" color={C.ink} /></defs>

      <Show when={step >= 0}>
        {msgs.map((m, i) => {
          const y = 30 + i * 82;
          return (
            <g key={m.n}>
              <rect x={20} y={y} width={500} height={60} rx={20} fill={TINT.accent} stroke={C.accent} strokeWidth={1.3} />
              <circle cx={56} cy={y + 30} r={18} fill={TINT.paper} stroke={C.accent} strokeWidth={2} />
              <text x={56} y={y + 37} textAnchor="middle" fontSize={T.body} fill={C.ink}>{m.n}</text>
              <text x={92} y={y + 27} fontSize={T.body} fill={C.ink}>{m.text}</text>
              <text x={92} y={y + 50} fontSize={T.label} fill={C.muted} className="t-label">{m.sub}</text>
            </g>
          );
        })}
        <line x1={540} y1={192} x2={fx - 24} y2={192} stroke={C.ink} strokeWidth={2} markerEnd="url(#hs-a)" />
        {files.map((f, i) => {
          const y = 30 + i * 110;
          return (
            <g key={f.name}>
              <path d={`M ${fx} ${y} h 400 l 20 20 v 64 h -420 z`} fill={TINT.paper} stroke={C.ink} strokeWidth={1.3} />
              <text x={fx + 22} y={y + 38} fontFamily={MONO} fontSize={T.body} fill={C.ink}>{f.name}</text>
              <text x={fx + 22} y={y + 68} fontSize={T.label} fill={C.muted} className="t-label">{f.note}</text>
            </g>
          );
        })}
        <text x={fx} y={378} fontSize={T.small + 1} fill={C.ink}>No terminal? You get a block to paste</text>
        <text x={fx} y={402} fontSize={T.small + 1} fill={C.ink}>into your chat or Project settings.</text>
      </Show>

      <Show when={step >= 1}>
        <circle cx={66} cy={460} r={44} fill="none" stroke={C.warm} strokeWidth={3} />
        <text x={66} y={469} textAnchor="middle" fontSize={T.lead} fill={C.ink}>5–10</text>
        <text x={130} y={436} fontSize={T.body} fill={C.ink}>minutes with the research-setup skill. Start it with</text>
        <text x={130} y={472} fontFamily={MONO} fontSize={T.body} fill={C.ink}>“interview me about my setup”</text>
        <text x={130} y={504} fontSize={T.label} fill={C.muted} className="t-label">two test personas took 7.2 and 7.3 min</text>
        <a href={docs(CARD)} target="_blank" rel="noopener noreferrer" onClick={(e) => { stop(e); e.preventDefault(); openExternal(docs(CARD)); }} style={{ cursor: "pointer" }}>
          <text x={fx} y={530} fontSize={T.small} fill={C.accent} className="t-label" textDecoration="underline">→ card: exercises/setup-interview</text>
        </a>
      </Show>
    </Canvas>
  );
}
