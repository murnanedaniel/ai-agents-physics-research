"use client";

import type { ReactNode } from "react";
import { SCENES } from "@/lib/timeline";
import { docs, openExternal } from "@/lib/links";
import { C, Canvas, Label, T, mono, serif, stop } from "./ui";

// buffer: the last fifty minutes are questions and catch-up. The four hands-ons now sit at
// the end of each loop, so this only points to their cards and the exercises index.
// Times are read from the timeline so they cannot drift.
const CARDS: { name: string; what: string; card: string }[] = [
  { name: "Hands-on 0", what: "set up", card: "exercises/hands-on-0-setup/" },
  { name: "Hands-on 1", what: "a metric to hill-climb", card: "exercises/hands-on-1-hill-climb/" },
  { name: "Hands-on 2", what: "the thing you put off", card: "exercises/hands-on-2-putting-off/" },
  { name: "Hands-on 3", what: "your dashboard", card: "exercises/hands-on-3-dashboard/" },
];
const DAY_START_H = 9; // startSec 0 is 09:00
const clock = (sec: number) => {
  const m = Math.round(sec / 60) + DAY_START_H * 60;
  return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;
};
const buffer = SCENES.find((s) => s.id === "buffer")!;

function Pill({ path, children }: { path: string; children: ReactNode }) {
  return (
    <a href={docs(path)} target="_blank" rel="noopener noreferrer" {...stop}
      onClick={(e) => { e.stopPropagation(); e.preventDefault(); openExternal(docs(path)); }}
      className="t-label" style={{ ...mono, fontSize: T.label, color: C.accent, textDecoration: "none" }}>
      {children}
    </a>
  );
}

export function BufferScene() {
  return (
    <Canvas style={{ gap: "4vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2vw", width: "100%" }}>
        <div style={{ background: "#dbe8f0", borderRadius: 14, padding: "4vh 2vw", display: "flex", flexDirection: "column", gap: "1vh" }}>
          <div style={{ ...serif, fontSize: "clamp(28px, 2.6vw, 50px)", lineHeight: 1.1 }}>Questions</div>
          <div style={{ fontSize: T.body, color: C.muted }}>anything from today</div>
        </div>
        <div style={{ background: "#ebe5d9", borderRadius: 14, padding: "4vh 2vw", display: "flex", flexDirection: "column", gap: "1vh" }}>
          <div style={{ ...serif, fontSize: "clamp(28px, 2.6vw, 50px)", lineHeight: 1.1 }}>Catch up</div>
          <div style={{ fontSize: T.body, color: C.muted }}>finish a hands-on, or share it</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.6vw", width: "100%" }}>
        {CARDS.map((c) => (
          <div key={c.card} style={{ borderTop: `2px solid ${C.accent}`, paddingTop: "1.2vh", display: "flex", flexDirection: "column", gap: "0.6vh" }}>
            <Label style={{ color: C.accent }}>{c.name}</Label>
            <span style={{ fontSize: T.body, lineHeight: 1.25 }}>{c.what}</span>
            <Pill path={c.card}>card →</Pill>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <a href={docs("exercises/")} target="_blank" rel="noopener noreferrer" {...stop}
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); openExternal(docs("exercises/")); }}
          className="t-label" style={{ ...mono, fontSize: T.label, color: C.accent, border: `1.5px solid ${C.accent}`, borderRadius: 100, padding: "0.4em 1em", textDecoration: "none" }}>
          all exercises ↗
        </a>
        <Label>{clock(buffer.startSec)} to {clock(buffer.endSec)}</Label>
      </div>
    </Canvas>
  );
}
