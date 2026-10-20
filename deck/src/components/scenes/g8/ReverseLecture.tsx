"use client";

import { C, T, Stage, Label, Reveal, stop } from "./kit";

// Storyboard 3.19: teaching is pulled from the ETH talk; these open its scenes.
const ETH_URL = "https://www.danielmurnane.com/ETH-Agentic-AI-for-Collider-Physics/";
const ETH = [
  { id: "faculty2031Teaching", label: "Teaching in 2028" },
  { id: "phdPedagogy", label: "PhD pedagogy" },
];

type Block = { place: "Home" | "Room"; what: string; who: string };
const ROWS: { name: string; at: number; blocks: Block[] }[] = [
  { name: "Lecture", at: 0, blocks: [
    { place: "Room", what: "new material", who: "one speaker" },
    { place: "Home", what: "problem sheets", who: "alone" },
  ] },
  { name: "Reversed", at: 1, blocks: [
    { place: "Home", what: "new material", who: "with an agent" },
    { place: "Room", what: "peer teaching, projects", who: "together" },
  ] },
];

function Cell({ b, highlight }: { b: Block; highlight: boolean }) {
  const room = b.place === "Room";
  return (
    <div className="flex flex-1 flex-col gap-1 rounded-xl px-5 py-4"
      style={{ background: room ? "#e4ecee" : C.paper, border: `${highlight ? 2 : 1}px solid ${highlight ? C.accent : C.line}` }}>
      <Label color={room ? C.accent : C.muted}>{room ? "in the room" : "at home"}</Label>
      <span style={{ fontSize: T.body }}>{b.what}</span>
      <Label>{b.who}</Label>
    </div>
  );
}

export function ReverseLecture({ step }: { step: number }) {
  return (
    <Stage>
      <div className="flex w-full max-w-[78vw] flex-col gap-[3.5vh]">
        {ROWS.map((r) => (
          <Reveal key={r.name} at={r.at} step={step} className="grid items-center gap-4" style={{ gridTemplateColumns: "190px 1fr" }}>
            <span data-dim={step < r.at || undefined} style={{ fontSize: T.body, fontFamily: "var(--font-serif), Georgia, serif", fontStyle: "italic" }}>{r.name}</span>
            <div className="flex gap-3" data-dim={step < r.at || undefined}>
              {r.blocks.map((b) => <Cell key={b.place + b.what} b={b} highlight={r.at === 1 && b.place === "Room"} />)}
            </div>
          </Reveal>
        ))}
        <Reveal at={1} step={step} className="flex flex-wrap items-center justify-center gap-4">
          <Label>more in the ETH deck</Label>
          {ETH.map((e) => (
            <a key={e.id} href={`${ETH_URL}?scene=${e.id}`} target="_blank" rel="noreferrer" onClick={stop} data-dim={step < 1 || undefined}
              className="rounded-full px-5 py-2" style={{ border: `1px solid ${C.accent}`, color: C.accent, fontSize: T.small, textDecoration: "none" }}>
              {e.label} ↗
            </a>
          ))}
        </Reveal>
      </div>
    </Stage>
  );
}
