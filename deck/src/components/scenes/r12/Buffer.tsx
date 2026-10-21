"use client";

import { SCENES } from "@/lib/timeline";
import { docs, openExternal } from "@/lib/links";
import { C, Canvas, Label, T, mono, serif, stop } from "./ui";

// buffer: the last fifty minutes. The blocks are read from the timeline so it cannot drift.
const BLOCKS: { id: string; name: string; what: string; card?: string }[] = [
  { id: "buffer", name: "Questions", what: "anything from today" },
  { id: "hands-on-2", name: "Hands-on 2", what: "review a draft", card: "exercises/review-a-draft/" },
  { id: "hands-on-3", name: "Hands-on 3", what: "turn a rule into a check", card: "exercises/gates-and-checks/" },
];
const DAY_START_H = 9; // startSec 0 is 09:00
const clock = (sec: number) => {
  const m = Math.round(sec / 60) + DAY_START_H * 60;
  return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;
};
const rows = BLOCKS.map((b) => ({ ...b, scene: SCENES.find((s) => s.id === b.id)! }));
const t0 = rows[0].scene.startSec, t1 = rows[rows.length - 1].scene.endSec;

export function BufferScene() {
  return (
    <Canvas style={{ gap: "3vh" }}>
      <div style={{ position: "relative", width: "100%", display: "flex", height: "30vh" }}>
        {rows.map((r, i) => {
          const w = ((r.scene.endSec - r.scene.startSec) / (t1 - t0)) * 100;
          return (
            <div key={r.id} style={{ width: `${w}%`, padding: "3vh 1.4vw", display: "flex", flexDirection: "column", justifyContent: "space-between", borderLeft: i ? `2px solid ${C.paper}` : "none", background: i === 0 ? "#dbe8f0" : "#ebe5d9", borderRadius: i === 0 ? "14px 0 0 14px" : i === rows.length - 1 ? "0 14px 14px 0" : 0 }}>
              <div>
                <div style={{ ...serif, fontSize: "clamp(28px, 2.6vw, 50px)", lineHeight: 1.1 }}>{r.name}</div>
                <div style={{ fontSize: T.body, color: C.muted, marginTop: "0.8vh" }}>{r.what}</div>
              </div>
              <span style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1vw" }}>
                <Label style={{ color: C.ink }}>{clock(r.scene.startSec)}</Label>
                {r.card && (
                  <a href={docs(r.card)} target="_blank" rel="noopener noreferrer" {...stop}
                    onClick={(e) => { e.stopPropagation(); e.preventDefault(); openExternal(docs(r.card!)); }}
                    className="t-label" style={{ ...mono, fontSize: T.label, color: C.accent }}>card →</a>
                )}
              </span>
            </div>
          );
        })}
        {/* now */}
        <div style={{ position: "absolute", left: 0, top: "-3vh", bottom: "-3vh", borderLeft: `4px solid ${C.accent}` }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <span className="t-label" style={{ ...mono, fontSize: T.label, color: C.accent }}>NOW</span>
        <span className="t-label" style={{ ...mono, fontSize: T.label, color: C.muted }}>{clock(t1)} END</span>
      </div>
    </Canvas>
  );
}
