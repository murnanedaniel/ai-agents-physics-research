"use client";

import type { CSSProperties, ReactNode } from "react";
import { Area, C, Show, T, stop } from "./kit";

// Erik's thesis defence, 2030, from the Collider 2031 design fiction
// ("The Last Analysis", §6.1). Step 0: the question, his answer and the
// follow-up. Step 1: the question he cannot answer, and how it ends.
const BUBBLE: CSSProperties = { fontSize: "clamp(20px, 1.8vw, 34px)", lineHeight: 1.25 };

function Line({ who, children, side, tone = C.ink }: { who: string; children: ReactNode; side: "left" | "right"; tone?: string }) {
  return (
    <div className={`flex items-baseline gap-[1vw] ${side === "right" ? "flex-row-reverse" : ""}`}>
      <div className="t-label shrink-0" style={{ ...T.label, ...T.mono, color: C.muted, minWidth: "7vw", textAlign: side === "right" ? "left" : "right" }}>{who}</div>
      <div className="max-w-[70%] rounded-2xl px-[1.4vw] py-[1.2vh]" style={{ ...T.serif, ...BUBBLE, color: tone, background: C.card, border: `1.5px solid ${side === "left" ? C.rule : C.accent}` }}>
        {children}
      </div>
    </div>
  );
}

export function Collider2031({ step }: { step: number }) {
  return (
    <Area style={{ justifyContent: "center", gap: "1.6vh" }}>
      <div className="flex items-center justify-between">
        <div className="t-label" style={{ ...T.label, ...T.mono, color: C.muted }}>Collider 2031, my design fiction from 2025 · Erik&apos;s thesis defence, 2030</div>
        <a href="https://collider-2031.com" target="_blank" rel="noopener noreferrer" onClick={stop}
          className="t-label rounded-full px-4 py-1" style={{ ...T.label, color: C.accent, border: `1px solid ${C.accent}`, textDecoration: "none" }}>
          collider-2031.com ↗
        </a>
      </div>
      <Line who="committee" side="left">Walk us through the choice of jet energy scale uncertainty.</Line>
      <Line who="Erik" side="right">The Skeptic agent flagged three options. I approved the conservative one.</Line>
      <Line who="committee" side="left">Why that one?</Line>
      <Line who="Erik" side="right">It... seemed reasonable? The agent&apos;s explanation was convincing.</Line>
      <Show when={step >= 1}>
        <Line who="committee" side="left" tone={C.warm}>But what&apos;s your physical intuition? If the agent were wrong, how would you know?</Line>
      </Show>
      <Show when={step >= 1} delay={0.9} className="text-right" style={{ ...T.serif, ...T.body, color: C.muted }}>(Silence.)</Show>
      <Show when={step >= 1} delay={1.6} style={{ ...T.body, color: C.ink }}>
        Erik passes, but barely. He understood the result but didn&apos;t generate the understanding.
      </Show>
    </Area>
  );
}
