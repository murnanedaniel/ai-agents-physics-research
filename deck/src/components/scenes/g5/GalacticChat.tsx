"use client";

import { C, Canvas, FileCard, T, mono } from "./kit";

// Demo holding scene: a plain chat on the left, the two files it should leave
// behind on the right. The chat lines are illustrative, not a transcript.
const CHAT = [
  { who: "me", text: "Here is the spec. What do we test first?" },
  { who: "claude", text: "Correctness first, then speed." },
  { who: "me", text: "Write it down for the next session." },
];

export function GalacticChat() {
  return (
    <Canvas className="flex items-center gap-[4vw]">
      <div className="flex-[1.15] min-w-0 rounded-2xl border p-5 space-y-3" style={{ borderColor: C.rule, background: C.card }}>
        <div className="t-label" style={{ ...mono, fontSize: T.label, color: C.muted }}>claude.ai chat · illustrative</div>
        {CHAT.map((m) => (
          <div key={m.text} className={`flex ${m.who === "me" ? "justify-end" : "justify-start"}`}>
            <div className="max-w-[85%] rounded-2xl px-4 py-2" style={{
              fontSize: T.body, lineHeight: 1.3,
              background: m.who === "me" ? C.accent : "#ece6da", color: m.who === "me" ? "#fff" : C.ink,
            }}>{m.text}</div>
          </div>
        ))}
      </div>
      <svg width="60" height="40" viewBox="0 0 60 40" aria-hidden className="shrink-0">
        <path d="M2 20 H50 M40 8 L54 20 L40 32" fill="none" stroke={C.ink} strokeWidth={3} />
      </svg>
      <div className="flex-1 min-w-0 flex flex-col gap-[3vh]">
        <FileCard name="CLAUDE.md" rows={["Hypothesis", "Figure of merit", "Budget"]} />
        <FileCard name="ROADMAP.md" rows={["Next steps"]} accent={C.warm} />
      </div>
    </Canvas>
  );
}
