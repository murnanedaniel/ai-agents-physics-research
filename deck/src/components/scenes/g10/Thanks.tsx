"use client";

import { C, Canvas, Label, T, serif, mono, stop } from "./ui";

// The day's three questions; each card deep-links back to the scene that asked it.
const QUESTIONS: [string, string][] = [
  ["q1-possible", "What can agentic science do today?"],
  ["q2-limits", "What can it not do?"],
  ["q3-professional", "What does professional agentic science need?"],
];

const REPO = "github.com/murnanedaniel/ai-agents-physics-research";

export function ThanksScene() {
  return (
    <Canvas style={{ gap: "6vh" }}>
      <div style={{ display: "flex", gap: "2vw", width: "100%" }}>
        {QUESTIONS.map(([id, q], i) => (
          <a
            key={id}
            href={`?scene=${id}&step=0`}
            {...stop}
            style={{ flex: 1, minWidth: 0, border: `1px solid ${C.line}`, borderRadius: 14, padding: "3vh 1.6vw", background: C.card, color: C.ink, textDecoration: "none", display: "flex", flexDirection: "column", gap: "2vh" }}
          >
            <Label>Question {i + 1}</Label>
            <span style={{ ...serif, fontSize: "clamp(24px, 2.2vw, 42px)", lineHeight: 1.2 }}>{q}</span>
          </a>
        ))}
      </div>
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "1.4vh" }}>
        <span style={{ ...serif, fontSize: T.big }}>Thank you.</span>
        <span style={{ fontSize: T.body, color: C.muted }}>Daniel Murnane · KIT</span>
        <a href={`https://${REPO}`} target="_blank" rel="noopener noreferrer" {...stop} className="t-label" style={{ ...mono, fontSize: T.label, color: C.accent }}>{REPO}</a>
      </div>
    </Canvas>
  );
}
