"use client";

import { useState } from "react";
import { C, T, Stage, Label, Reveal, stop } from "./kit";

const STAGES = [
  { name: "Scene file", sub: "beats/<id>.tsx", detail: "One React component per scene, written in conversation with Claude." },
  { name: "git push", sub: "to main", detail: "The push is the publish button." },
  { name: "Actions", sub: "build.sh", detail: "Exports the deck and the docs; NEXT_BASE_PATH must equal the repo name or assets 404." },
  { name: "Pages", sub: "static site", detail: "GitHub serves the exported files." },
];

export function SceneToWeb({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Stage>
      <div className="flex w-full max-w-[86vw] items-center">
        {STAGES.map((s, i) => (
          <div key={s.name} className="flex flex-1 items-center">
            <div onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onClick={stop}
              className="flex flex-1 flex-col gap-1 rounded-xl px-4 py-4"
              style={{ border: `${hover === i ? 2 : 1}px solid ${hover === i ? C.accent : C.line}`, background: C.paper }}>
              <span style={{ fontSize: T.body, whiteSpace: "nowrap" }}>{s.name}</span>
              <Label style={{ textTransform: "none" }}>{s.sub}</Label>
            </div>
            {i < STAGES.length - 1 && (
              <svg viewBox="0 0 40 20" className="w-[40px] shrink-0" aria-hidden><path d="M4 10 H30" stroke={C.muted} strokeWidth="2" /><path d="M28 4 L36 10 L28 16 z" fill={C.muted} /></svg>
            )}
          </div>
        ))}
      </div>
      <div className="mt-[2vh] h-[1.6em] text-center">
        {hover !== null && <span className="t-label" style={{ fontSize: T.label, color: C.muted }}>{STAGES[hover].detail}</span>}
      </div>
      <Reveal at={1} step={step} className="mt-[3vh] flex w-full max-w-[86vw] flex-col items-center gap-[2vh]">
        <div data-dim={step < 1 || undefined} className="w-full rounded-full px-6 py-3 text-center" style={{ border: `2px solid ${C.accent}`, background: C.paper, fontFamily: "var(--font-geist-mono), monospace", fontSize: T.small }}>
          www.danielmurnane.com/ai-agents-physics-research/
        </div>
        <div className="grid w-full grid-cols-2 gap-[3vw]" data-dim={step < 1 || undefined}>
          <div className="flex flex-col gap-1 text-center">
            <span style={{ fontSize: T.small }}>One CNAME file in my user-site repo</span>
            <Label style={{ textTransform: "none" }}>murnanedaniel.github.io: CNAME = www.danielmurnane.com</Label>
          </div>
          <div className="flex flex-col gap-1 text-center">
            <span style={{ fontSize: T.small }}>One DNS record</span>
            <Label style={{ textTransform: "none" }}>www CNAME → murnanedaniel.github.io</Label>
          </div>
        </div>
      </Reveal>
    </Stage>
  );
}
