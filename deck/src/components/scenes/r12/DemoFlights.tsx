"use client";

import { C, Canvas, Label, T, serif } from "./ui";

// demo-flights: holding scene for the live booking. The trip (details stay in the
// demo), what to watch for, and the three boundaries set on the previous scene.
const RULES = ["Separate profile, no email or bank logins", "Single-use card, low limit", "I check the details and click pay"];

export function DemoFlightsScene() {
  return (
    <Canvas style={{ gap: "5vh" }}>
      <div style={{ display: "flex", width: "min(82vw, 1000px)", border: `1.5px solid ${C.ink}`, borderRadius: 18, background: C.card, overflow: "hidden" }}>
        <div style={{ flex: 3, padding: "4vh 3vw", display: "flex", flexDirection: "column", gap: "2.4vh" }}>
          <Label>Flights and trains, a November event</Label>
          <div style={{ display: "flex", alignItems: "center", gap: "2vw" }}>
            <span style={{ ...serif, fontSize: T.big }}>Karlsruhe</span>
            <svg viewBox="0 0 120 24" width="9vw" aria-hidden><path d="M2 12 H110" stroke={C.ink} strokeWidth="2" strokeDasharray="6 6" /><path d="M104 4 L116 12 L104 20" fill="none" stroke={C.ink} strokeWidth="2" /></svg>
            <span style={{ ...serif, fontSize: T.big, whiteSpace: "nowrap" }}>the UK</span>
          </div>
          <span style={{ fontSize: T.body, color: C.ink, lineHeight: 1.3 }}>These are real tickets, booked live. I ask the agent to find options and fill in the forms.</span>
          <span style={{ fontSize: T.body, color: C.muted, lineHeight: 1.3 }}>Watch for the moment it stops at payment and hands back to me.</span>
        </div>
        <div style={{ flex: 2, borderLeft: `2px dashed ${C.line}`, padding: "4vh 2.4vw", display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.8vh" }}>
          {RULES.map((r) => (
            <div key={r} style={{ display: "flex", alignItems: "center", gap: "0.9vw", fontSize: T.body, lineHeight: 1.25 }}>
              <svg viewBox="0 0 24 24" width="1.3em" height="1.3em" aria-hidden style={{ flexShrink: 0 }}><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke={C.warm} strokeWidth="2" /><path d="M6 12.5 L10.5 17 L18 7.5" fill="none" stroke={C.warm} strokeWidth="2.6" /></svg>
              {r}
            </div>
          ))}
        </div>
      </div>
    </Canvas>
  );
}
