"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { C, CardLink, Canvas, Label, Reveal, T, mono, stop } from "./ui";

// hands-on-3 (card: docs/exercises/gates-and-checks). Step 0: a rule written in CLAUDE.md, which an agent can forget.
// Step 1: the same rule as a test that fails when the rule is broken, plus the card's three tiers
// (restored from the round 1 scene, which listed them before the 40-word trim).
// The toggle flips the run between a reproduced and a drifted baseline.
const tiers: [string, string][] = [
  ["web chat", "Ask for the smallest check that fails when the rule breaks."],
  ["terminal agent", "Have the agent write and run it, then break the rule on purpose."],
  ["your own pipeline", "Run it with your normal tests or CI."],
];

export function HandsOnCheckScene({ step }: { step: number }) {
  const [drift, setDrift] = useState(true);
  const checked = step >= 1;
  const pass = !drift;

  const card = { background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: "2.4vh 1.8vw", display: "flex", flexDirection: "column", gap: "1.4vh" } as const;
  const small = "clamp(18px, 1.4vw, 26px)";
  return (
    <Canvas style={{ gap: "2.6vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 8vw 1.2fr", alignItems: "center", width: "100%" }}>
        <div style={card}>
          <Label>CLAUDE.md</Label>
          <span style={{ fontSize: T.body, lineHeight: 1.3 }}>Reproduce the published baseline before any variant counts.</span>
          <Label style={{ color: C.warm, textTransform: "none", letterSpacing: 0 }}>an agent can forget it late in a long session</Label>
        </div>

        <Reveal at={1} step={step} style={{ display: "flex", justifyContent: "center" }}>
          <svg viewBox="0 0 100 30" width="80%" aria-hidden>
            <path d="M 4 15 H 86" stroke={C.accent} strokeWidth="3" fill="none" />
            <path d="M 80 6 L 94 15 L 80 24" stroke={C.accent} strokeWidth="3" fill="none" />
          </svg>
        </Reveal>

        <Reveal at={1} step={step}>
          <div style={card}>
            <Label>tests/test_baseline.py</Label>
            <pre style={{ ...mono, fontSize: "clamp(18px, 1.5vw, 28px)", lineHeight: 1.45, margin: 0, color: C.ink, whiteSpace: "pre-wrap" }}>
{`def test_baseline():
    assert abs(ours - published) < tol`}
            </pre>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1vh 1vw" }}>
              <motion.span key={String(pass)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
                style={{ ...mono, fontSize: T.body, color: pass ? C.green : C.red, fontWeight: 600 }}>
                {pass ? "PASSED: baseline reproduced" : "FAILED: baseline not reproduced"}
              </motion.span>
              <button type="button" {...stop} tabIndex={checked ? 0 : -1}
                onClick={(e) => { e.stopPropagation(); setDrift((d) => !d); e.currentTarget.blur(); }}
                className="t-label"
                style={{ ...mono, fontSize: T.label, padding: "0.4em 0.9em", borderRadius: 100, border: `1.5px solid ${C.line}`, background: "transparent", color: C.muted, cursor: "pointer", whiteSpace: "nowrap" }}>
                {drift ? "fix the run" : "break the run"}
              </button>
            </div>
            <Label style={{ textTransform: "none", letterSpacing: 0 }}>or a hook: a script Claude Code runs before each tool call; exit code 2 blocks the call</Label>
          </div>
        </Reveal>
      </div>
      <Reveal at={1} step={step} style={{ width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.6vw" }}>
          {tiers.map(([name, text]) => (
            <div key={name} style={{ borderTop: `2px solid ${C.accent}`, paddingTop: "1.2vh", display: "flex", flexDirection: "column", gap: "0.8vh" }}>
              <Label style={{ color: C.accent }}>{name}</Label>
              <span style={{ fontSize: small, lineHeight: 1.3 }}>{text}</span>
            </div>
          ))}
        </div>
      </Reveal>
      <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: "1.6vw" }}>
        <CardLink path="exercises/gates-and-checks/">exercise card ↗</CardLink>
        <Label>5 to 10 minutes · done when you've seen it fail, then pass after the fix</Label>
      </div>
    </Canvas>
  );
}
