"use client";

import { docs, openExternal } from "@/lib/links";
import { Arrow, C, Canvas, MONO, SERIF, Show, T, stop } from "./kit";

const files = [
  { name: "CLAUDE.md", note: "your rules, under 80 lines" },
  { name: "Starter skills", note: "one or two, under 60 lines" },
  { name: "DECISIONS.md", note: "why you chose them" },
];
const tiers = ["Web chat", "Terminal agent", "Your own project"];
const CARD = "exercises/setup-interview/";

function Bubble({ x, y, w, text, agent }: { x: number; y: number; w: number; text: string; agent: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={50} rx={18} fill={agent ? "#e3eef5" : "#fbf8f2"} stroke={agent ? C.accent : C.faint} strokeWidth={1.2} />
      <text x={x + 18} y={y + 32} fontSize={T.small + 1} fill={C.ink}>{text}</text>
    </g>
  );
}

// An interview turns your habits into three short files.
export function HandsOnInterview({ step }: { step: number }) {
  const fx = 720;
  return (
    <Canvas>
      <defs><Arrow id="ho-a" color={C.ink} /></defs>

      <Show when={step >= 0}>
        {/* The interview: the agent asks, you answer */}
        <text x={20} y={185} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 4} fill={C.ink}>The interview</text>
        <Bubble x={20} y={210} w={430} text="What counts as a result for you?" agent />
        <Bubble x={140} y={275} w={310} text="Your answer…" agent={false} />
        <Bubble x={20} y={340} w={430} text="Which jobs need your approval?" agent />
        <text x={20} y={427} fontSize={T.label} fill={C.muted} className="t-label">example questions from the research-setup skill</text>
        <line x1={480} y1={315} x2={fx - 30} y2={315} stroke={C.ink} strokeWidth={2} markerEnd="url(#ho-a)" />
        {files.map((f, i) => {
          const y = 175 + i * 100;
          return (
            <g key={f.name}>
              <path d={`M ${fx} ${y} h 330 l 20 20 v 54 h -350 z`} fill="#fbf8f2" stroke={C.ink} strokeWidth={1.3} />
              <text x={fx + 22} y={y + 34} fontFamily={MONO} fontSize={T.body} fill={C.ink}>{f.name}</text>
              <text x={fx + 22} y={y + 60} fontSize={T.label} fill={C.muted} className="t-label">{f.note}</text>
            </g>
          );
        })}
      </Show>

      <Show when={step >= 1}>
        {/* Three ways in, and the time box */}
        <text x={20} y={46} fontSize={T.label} fill={C.muted} className="t-label">start from</text>
        {tiers.map((t, i) => (
          <g key={t}>
            <rect x={20 + i * 230} y={62} width={214} height={46} rx={23} fill="#fbf8f2" stroke={C.accent} strokeWidth={1.4} />
            <text x={20 + i * 230 + 107} y={92} textAnchor="middle" fontSize={T.small + 2} fill={C.ink} className="t-label">{t}</text>
          </g>
        ))}
        <circle cx={fx + 185} cy={85} r={34} fill="none" stroke={C.warm} strokeWidth={3} />
        <text x={fx + 185} y={93} textAnchor="middle" fontSize={T.lead} fill={C.ink}>20</text>
        <text x={fx + 232} y={93} fontSize={T.body} fill={C.ink}>minutes</text>
        <a href={docs(CARD)} target="_blank" rel="noopener noreferrer" onClick={(e) => { stop(e); e.preventDefault(); openExternal(docs(CARD)); }} style={{ cursor: "pointer" }}>
          <text x={fx} y={510} fontSize={T.small} fill={C.accent} className="t-label" textDecoration="underline">→ card: exercises/setup-interview</text>
        </a>
      </Show>
    </Canvas>
  );
}
