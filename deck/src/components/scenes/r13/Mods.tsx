"use client";

import { Area, C, Show, T } from "../r11/kit";

const card = { background: C.card, border: `1px solid ${C.rule}`, borderRadius: 14, padding: "18px 22px" } as const;

const CAN = [
  { h: "Hold a tool call", d: "" },
  { h: "Draw panes and buttons", d: "" },
  { h: "Add instant commands", d: "" },
];

const DRAWS = ["terminal, Desktop, VS Code"];
const BLIND = ["not claude.ai or the phone"];

export function Mods({ step }: { step: number }) {
  return (
    <Area style={{ justifyContent: "center", gap: "4vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.6vw" }}>
        {CAN.map((c) => (
          <div key={c.h} style={card}>
            <div style={{ ...T.big, ...T.serif, color: C.ink }}>{c.h}</div>
          </div>
        ))}
      </div>
      <div style={{ ...T.body, color: C.ink }}>
        Describe it, and Claude writes the mod.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2vw", alignItems: "start" }}>
        <Show when={step >= 1}>
          <div style={{ ...T.body, color: C.ink }}>
            <div><span style={{ color: C.accent }}>●</span> {DRAWS[0]}</div>
            <div style={{ color: C.muted, marginTop: 6 }}>○ {BLIND[0]}</div>
          </div>
        </Show>
        <Show when={step >= 2}>
          <div style={{ ...card, borderColor: C.warm, borderLeft: `4px solid ${C.warm}` }}>
            <div style={{ ...T.body, color: C.ink }}>Not sandboxed: it runs as you.</div>
          </div>
        </Show>
      </div>
    </Area>
  );
}
