"use client";

import { docs, openExternal } from "@/lib/links";
import { Arrow, C, Canvas, MONO, Show, T, TINT, stop } from "./kit";

// The research-setup skill, as revised for a 5 to 10 minute slot:
// four agent messages, three short files (or one paste-in block).
const msgs = [
  { n: 1, text: "three questions" },
  { n: 2, text: "one follow-up, if needed" },
  { n: 3, text: "drafts, shown once" },
  { n: 4, text: "writes on your OK" },
];
const files = [
  { name: "CLAUDE.md", note: "your rules, under 40 lines" },
  { name: "SKILL.md", note: "one starter skill, under 30 lines" },
  { name: "DECISIONS.md", note: "why, in your words" },
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
              <text x={92} y={y + 38} fontSize={T.body} fill={C.ink}>{m.text}</text>
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
              <text x={fx + 22} y={y + 68} fontSize={T.small} fill={C.muted} className="t-label">{f.note}</text>
            </g>
          );
        })}
        <text x={fx} y={390} fontSize={T.small + 1} fill={C.ink}>Chat only: a paste-in block.</text>
      </Show>

      <Show when={step >= 1}>
        <circle cx={66} cy={455} r={44} fill="none" stroke={C.warm} strokeWidth={3} />
        <text x={66} y={464} textAnchor="middle" fontSize={T.lead} fill={C.ink}>5–10</text>
        <text x={126} y={448} fontSize={T.body} fill={C.ink}>minutes</text>
        <text x={126} y={480} fontFamily={MONO} fontSize={T.body} fill={C.ink}>“interview me about my setup”</text>
        <a href={docs(CARD)} target="_blank" rel="noopener noreferrer" onClick={(e) => { stop(e); e.preventDefault(); openExternal(docs(CARD)); }} style={{ cursor: "pointer" }}>
          <text x={fx} y={530} fontSize={T.small} fill={C.accent} className="t-label" textDecoration="underline">→ card: exercises/setup-interview</text>
        </a>
      </Show>
    </Canvas>
  );
}
