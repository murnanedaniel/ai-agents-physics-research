"use client";

import { C, Canvas, Label, Reveal, T, mono } from "./ui";

// Hands-on 2. Step 0: three reviewer personas read one draft.
// Step 1: the same draft, audited claim by claim.
const PERSONAS = [
  { who: "Specialist", asks: "Is the method sound?", line: 1 },
  { who: "Outsider", asks: "Can I follow it?", line: 4 },
  { who: "Sceptic", asks: "What would break it?", line: 7 },
];
const CLAIMS = [
  { line: 2, verdict: "OK", colour: C.green },
  { line: 5, verdict: "OVERCLAIM", colour: C.warm },
  { line: 8, verdict: "UNSUPPORTED", colour: C.red },
];
const LINES = [0.9, 1, 0.95, 0.7, 1, 0.85, 0.92, 1, 0.6];

export function HandsOnReviewScene({ step }: { step: number }) {
  const audit = step >= 1;
  return (
    <Canvas style={{ gap: "3vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: "4vw", width: "100%", alignItems: "center" }}>
        {/* the draft, with persona notes in the margin */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "1.4vw", alignItems: "start" }}>
          <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 10, padding: "3.5vh 1.6vw", display: "flex", flexDirection: "column", gap: "2.4vh" }}>
            <Label>Draft abstract</Label>
            {LINES.map((w, i) => {
              const claim = CLAIMS.findIndex((c) => c.line === i);
              const lit = audit && claim >= 0;
              return <div key={i} style={{ height: "1.5vh", width: `${w * 100}%`, borderRadius: 4, background: lit ? CLAIMS[claim].colour : "#cfc8bb", transition: "background .6s" }} />;
            })}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2.2vh" }}>
            {PERSONAS.map((p) => (
              <div key={p.who} style={{ borderLeft: `3px solid ${C.accent}`, paddingLeft: "0.8vw" }}>
                <Label style={{ color: C.accent }}>{p.who}</Label>
                <div style={{ fontSize: T.body, lineHeight: 1.2, marginTop: "0.3vh" }}>{p.asks}</div>
              </div>
            ))}
          </div>
        </div>

        {/* the audit */}
        <Reveal at={1} step={step}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", columnGap: "1.6vw", rowGap: "2vh", alignItems: "center" }}>
            <Label>Claim</Label><Label>Source checked</Label><Label>Verdict</Label>
            {CLAIMS.map((c, i) => (
              <div key={c.verdict} style={{ display: "contents" }}>
                <span style={{ width: "2.2vw", height: "1.1vh", borderRadius: 4, background: c.colour }} aria-label={`claim ${i + 1}`} />
                <span style={{ fontSize: T.body }}>{["the cited paper", "the paper's own table", "nothing found"][i]}</span>
                <span className="t-label" style={{ ...mono, fontSize: T.label, color: c.colour, border: `1.5px solid ${c.colour}`, borderRadius: 100, padding: "0.3em 0.9em", textAlign: "center" }}>{c.verdict}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "3vh" }}>
            <Label>Verdicts: OK · WRONG · OVERCLAIM · UNSUPPORTED</Label>
          </div>
        </Reveal>
      </div>
      <Label style={{ alignSelf: "flex-start" }}>Web chat · terminal agent · your own draft</Label>
    </Canvas>
  );
}
