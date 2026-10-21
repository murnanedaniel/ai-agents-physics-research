"use client";

import { C, Canvas, T, mono } from "./kit";

// Demo holding scene: the three moves we make live, one per surface from
// the previous scene. Nothing here is a result.
const MOVES = [
  { where: "Chat", what: "Describe the project; agree the hypothesis and the check" },
  { where: "Cluster session", what: "Start it with Remote Control; hand it the chat" },
  { where: "Repo, ScienceDash", what: "Commit the plan; register the project" },
];

export function GalacticLaunch() {
  return (
    <Canvas className="flex flex-col justify-center gap-[6vh] px-[4vw]">
      {MOVES.map((m, i) => (
        <div key={m.where} className="flex items-center gap-[2vw]">
          <div className="grid place-items-center rounded-full shrink-0" style={{ width: 52, height: 52, background: C.accent, color: "#fff", ...mono, fontSize: 24 }}>
            <span className="t-label">{i + 1}</span>
          </div>
          <div className="w-[24vw] shrink-0" style={{ fontSize: T.body, color: C.accent, fontWeight: 600 }}>{m.where}</div>
          <div style={{ fontSize: T.body, lineHeight: 1.3 }}>{m.what}</div>
        </div>
      ))}
    </Canvas>
  );
}
