"use client";

import { motion } from "motion/react";
import { C, Canvas, Reveal, T, mono, serif } from "../g1/kit";

// ERC Starting Grant 2027, Oct 2026: the middle loop on a proposal.
// Step 0: the four jobs an agent took part in (write, budget, review, submit).
// Step 1: how the mock review panel works, and what it got wrong.
const STAGES = [
  { head: "Write", body: "Overleaf, shared with the agent", note: "it pulls my edits before every push and stops on a conflict" },
  { head: "Budget", body: "The host's finance export", note: "Claude drafted the resources text from it; I entered the figures" },
  { head: "Review", body: "Mock panel of AI judges", note: "personas: experimentalist, sceptic, hostile referee" },
  { head: "Submit", body: "The funder's web portal", note: "Claude in Chrome filled in the Part A forms" },
];

function Arrow() {
  return (
    <svg width="28" height="20" viewBox="0 0 40 20" aria-hidden style={{ flex: "0 0 auto", alignSelf: "center" }}>
      <line x1="2" y1="10" x2="32" y2="10" stroke={C.muted} strokeWidth="2" />
      <path d="M28,4 L36,10 L28,16" fill="none" stroke={C.muted} strokeWidth="2" />
    </svg>
  );
}

// Panel: 3 anchors with known outcomes -> 3 judges -> rank 11 held-out proposals.
function Panel() {
  const W = 620, H = 230;
  const anchors = [0, 1, 2], judges = [0, 1, 2];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxHeight: "26vh" }} role="img" aria-label="Three past proposals with known outcomes are shown to three AI judges, who then rank eleven held-out proposals">
      {anchors.map((i) => (
        <g key={i} transform={`translate(${10 + i * 34}, ${50 + i * 10})`}>
          <rect width={58} height={74} rx={4} fill="#fffdf8" stroke={C.faint} strokeWidth={1.5} />
          {[16, 28, 40, 52].map((y) => <line key={y} x1={10} x2={48} y1={y} y2={y} stroke={C.rule} strokeWidth={2} />)}
        </g>
      ))}
      <text className="t-label" x={10} y={180} fontFamily={mono} fontSize="16" fill={C.muted}>3 past proposals,</text>
      <text className="t-label" x={10} y={200} fontFamily={mono} fontSize="16" fill={C.muted}>outcome known</text>
      <line x1={190} x2={250} y1={100} y2={100} stroke={C.muted} strokeWidth={2} />
      <path d="M246,94 L254,100 L246,106" fill="none" stroke={C.muted} strokeWidth={2} />
      {judges.map((i) => (
        <g key={i}>
          <circle cx={300} cy={44 + i * 56} r={22} fill={C.accentSoft} stroke={C.accent} strokeWidth={2} />
          <path d={`M${290},${50 + i * 56} q10,-14 20,0`} fill="none" stroke={C.accent} strokeWidth={2} />
          <circle cx={300} cy={38 + i * 56} r={5} fill={C.accent} />
        </g>
      ))}
      <line x1={340} x2={400} y1={100} y2={100} stroke={C.muted} strokeWidth={2} />
      <path d="M396,94 L404,100 L396,106" fill="none" stroke={C.muted} strokeWidth={2} />
      <text x={420} y={92} fontFamily={serif} fontSize="54" fill={C.ink}>0.93</text>
      <text className="t-label" x={420} y={120} fontFamily={mono} fontSize="16" fill={C.muted}>AUC: funded ranked</text>
      <text className="t-label" x={420} y={140} fontFamily={mono} fontSize="16" fill={C.muted}>above unfunded</text>
      <text className="t-label" x={420} y={160} fontFamily={mono} fontSize="16" fill={C.muted}>(0.5 = chance)</text>
      <text className="t-label" x={420} y={200} fontFamily={mono} fontSize="16" fill={C.muted}>11 held-out proposals,</text>
      <text className="t-label" x={420} y={220} fontFamily={mono} fontSize="16" fill={C.muted}>95% CI 0.71 to 1.00</text>
    </svg>
  );
}

export function ErcR2({ step }: { step: number }) {
  return (
    <Canvas style={{ justifyContent: "center", gap: "3vh" }}>
      <span style={{ fontSize: T.body, lineHeight: 1.3 }}>ERC Starting Grant, October 2026: one week to get it into shape.</span>
      <div style={{ display: "flex", gap: 6, alignItems: "stretch" }}>
        {STAGES.map((s, i) => (
          <div key={s.head} style={{ display: "flex", gap: 6, flex: "1 1 0", minWidth: 0 }}>
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.15, duration: 0.55 }}
              style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 8, padding: "12px 14px", borderRadius: 10, background: C.card,
                border: `${i === 2 && step >= 1 ? 2.5 : 1.5}px solid ${i === 2 && step >= 1 ? C.accent : C.rule}` }}
            >
              <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: T.body }}>{s.head}</span>
              <span style={{ fontSize: T.body, lineHeight: 1.3 }}>{s.body}</span>
              <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>{s.note}</span>
            </motion.div>
            {i < STAGES.length - 1 && <Arrow />}
          </div>
        ))}
      </div>
      <Reveal at={1} step={step} style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "3vw", alignItems: "center" }}>
        <Panel />
        <div style={{ display: "flex", flexDirection: "column", gap: "1.6vh", fontSize: T.body, lineHeight: 1.3 }}>
          <span>Three AI judges read three past proposals with known outcomes, then ranked 11 others.</span>
          <span style={{ borderLeft: `3px solid ${C.warm}`, paddingLeft: 14 }}>Problem is, the judges rewarded density, so drafts got denser. The real panel is mostly physicists outside particle physics.</span>
        </div>
      </Reveal>
    </Canvas>
  );
}
