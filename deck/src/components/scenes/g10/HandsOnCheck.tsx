"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { C, Canvas, Label, Reveal, T, mono, stop } from "./ui";

// Hands-on 3. Step 0: a rule written in CLAUDE.md, which an agent can forget.
// Step 1: the same rule as a test that fails when the rule is broken.
// The toggle flips the run between a reproduced and a drifted baseline.
export function HandsOnCheckScene({ step }: { step: number }) {
  const [drift, setDrift] = useState(true);
  const checked = step >= 1;
  const pass = !drift;

  const card = { background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: "3vh 1.8vw", display: "flex", flexDirection: "column", gap: "1.6vh" } as const;
  return (
    <Canvas style={{ gap: "3vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 8vw 1.2fr", alignItems: "center", width: "100%" }}>
        <div style={card}>
          <Label>CLAUDE.md</Label>
          <span style={{ fontSize: T.body, lineHeight: 1.3 }}>Reproduce the published baseline before any variant counts.</span>
          <Label style={{ color: C.warm, textTransform: "none", letterSpacing: 0 }}>a rule an agent can forget</Label>
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1vw" }}>
              <motion.span key={String(pass)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
                style={{ ...mono, fontSize: T.body, color: pass ? C.green : C.red, fontWeight: 600 }}>
                {pass ? "PASSED" : "FAILED"} test_baseline
              </motion.span>
              <button type="button" {...stop} tabIndex={checked ? 0 : -1}
                onClick={(e) => { e.stopPropagation(); setDrift((d) => !d); e.currentTarget.blur(); }}
                className="t-label"
                style={{ ...mono, fontSize: T.label, padding: "0.4em 0.9em", borderRadius: 100, border: `1.5px solid ${C.line}`, background: "transparent", color: C.muted, cursor: "pointer", whiteSpace: "nowrap" }}>
                {drift ? "fix the run" : "break the run"}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
      <Label style={{ alignSelf: "flex-start" }}>Web chat · terminal agent · your own pipeline</Label>
    </Canvas>
  );
}
