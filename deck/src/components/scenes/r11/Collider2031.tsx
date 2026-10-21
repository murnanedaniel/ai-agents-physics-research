"use client";

import type { ReactNode } from "react";
import { Area, C, Show, T, stop } from "./kit";

// Erik's thesis defence, 2030, from the Collider 2031 design fiction
// ("The Last Analysis", §6.1). Step 0: the question and his answer.
// Step 1: the question he cannot answer.
function Line({ who, children, side, tone = C.ink }: { who: string; children: ReactNode; side: "left" | "right"; tone?: string }) {
  return (
    <div className={`flex flex-col ${side === "right" ? "items-end" : "items-start"}`}>
      <div className="t-label mb-[0.6vh]" style={{ ...T.label, ...T.mono, color: C.muted }}>{who}</div>
      <div className="max-w-[62%] rounded-2xl px-[1.4vw] py-[1.8vh]" style={{ ...T.serif, ...T.big, color: tone, background: C.card, border: `1.5px solid ${side === "left" ? C.rule : C.accent}` }}>
        {children}
      </div>
    </div>
  );
}

export function Collider2031({ step }: { step: number }) {
  return (
    <Area style={{ justifyContent: "center", gap: "2.2vh" }}>
      <div className="flex items-center justify-between">
        <div className="t-label" style={{ ...T.label, ...T.mono, color: C.muted }}>Collider 2031 · Erik&apos;s thesis defence, 2030</div>
        <a href="https://collider-2031.com" target="_blank" rel="noopener noreferrer" onClick={stop}
          className="t-label rounded-full px-4 py-1" style={{ ...T.label, color: C.accent, border: `1px solid ${C.accent}`, textDecoration: "none" }}>
          collider-2031.com ↗
        </a>
      </div>
      <Line who="committee" side="left">Walk us through the choice of jet energy scale uncertainty.</Line>
      <Line who="Erik" side="right">The Skeptic agent flagged three options. I approved the conservative one.</Line>
      <Show when={step >= 1}>
        <Line who="committee" side="left" tone={C.warm}>If the agent were wrong, how would you know?</Line>
      </Show>
      <Show when={step >= 1} delay={0.9} className="text-right" style={{ ...T.serif, ...T.body, color: C.muted }}>(Silence.)</Show>
    </Area>
  );
}
