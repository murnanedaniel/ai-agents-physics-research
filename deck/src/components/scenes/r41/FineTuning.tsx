"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { C, Canvas, Reveal, T, mono, serif } from "../r7/kit";

// Project 2 (fine-tuning), rebuilt around the draft's framing (22 Oct 2026).
// No numerical results from the draft appear here: the project starts from
// scratch on the day. Citations live in the beats' `source` fields.

const BASE = 240, SCALE = 1.9;
const BIGF = "clamp(30px, 3vw, 56px)";

// Schematic cancellation, reused from r7/Finetuning with a generic observable.
function Bars() {
  const big = 95, net = 9;
  return (
    <svg viewBox="0 0 420 470" className="h-full max-h-full w-auto max-w-full" role="img" aria-label="Schematic: a large positive and a large negative input nearly cancel, leaving a small observable">
      <line x1={20} x2={400} y1={BASE} y2={BASE} stroke={C.ink} strokeWidth={1.5} />
      <motion.rect x={50} width={80} rx={4} fill={C.accent} initial={false}
        animate={{ y: BASE - big * SCALE, height: big * SCALE }} transition={{ duration: 0.9 }} />
      <motion.rect x={170} y={BASE} width={80} rx={4} fill={C.warm} initial={false}
        animate={{ height: (big - net) * SCALE }} transition={{ duration: 0.9, delay: 0.3 }} />
      <motion.rect x={290} width={80} rx={4} fill={C.ink} initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: BASE - net * SCALE, height: net * SCALE }} transition={{ duration: 0.6, delay: 1.2 }} />
      <text x={90} y={BASE - big * SCALE - 14} textAnchor="middle" fontSize={34} style={serif} fill={C.ink}>+</text>
      <text x={210} y={BASE - 14} textAnchor="middle" fontSize={34} style={serif} fill={C.ink}>−</text>
      <text x={330} y={BASE - net * SCALE - 14} textAnchor="middle" fontSize={34} style={serif} fill={C.ink}>=</text>
      <text x={150} y={462} textAnchor="middle" fontSize={18} style={mono} fill={C.muted} className="t-label">two large inputs</text>
      <text x={330} y={BASE + 34} textAnchor="middle" fontSize={20} style={mono} fill={C.ink} className="t-label">observable O</text>
      <text x={330} y={BASE + 58} textAnchor="middle" fontSize={16} style={mono} fill={C.muted} className="t-label">small</text>
      <text x={400} y={462} textAnchor="end" fontSize={16} style={mono} fill={C.muted} className="t-label">schematic</text>
    </svg>
  );
}

const HISTORY = [
  { year: "1988", who: "Barbieri and Giudice", what: "the largest log-sensitivity" },
  { year: "2012", who: "Fichet", what: "a Bayesian reading" },
  { year: "2017", who: "Barnard, Murnane, White, Williams", what: "higher-order tuning (HOT)" },
  { year: "2024", who: "Fowlie and Herrera", what: "BG as information" },
  { year: "2026", who: "Halverson, Harvey and Nee", what: "a Fisher metric" },
];

const Label = ({ children, color = C.muted }: { children: ReactNode; color?: string }) => (
  <div className="t-label" style={{ ...mono, fontSize: T.label, color }}>{children}</div>
);

// Scene p-finetuning: 2 steps.
export function FineTuningIntro({ step }: { step: number }) {
  return (
    <Canvas className="flex items-center gap-[4vw]">
      <div className="h-full flex-[0.75] min-w-0 flex items-center justify-center"><Bars /></div>
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-[4vh]">
        <Reveal at={0} step={step}>
          <div style={{ fontSize: T.body, lineHeight: 1.3 }}>Fine-tuning: large inputs cancel to leave a small observable.</div>
          <div className="mt-3" style={{ fontSize: "clamp(22px, 1.9vw, 36px)", lineHeight: 1.4 }}>Δ<sub>BG</sub> = max<sub>i</sub> |∂ log <i>O</i> / ∂ log <i>x<sub>i</sub></i>|</div>
          <Label>Barbieri and Giudice: the largest log-sensitivity, one input at a time</Label>
        </Reveal>
        <Reveal at={1} step={step}>
          <div style={{ fontSize: T.body, lineHeight: 1.3 }}>Naturalness has driven model building, including supersymmetry and the composite Higgs. How to measure it is still open.</div>
          <div className="mt-3 flex flex-col gap-1">
            {HISTORY.map((h) => (
              <div key={h.year + h.who} className="flex gap-4 items-baseline">
                <span style={{ ...mono, fontSize: T.label, color: C.accent }} className="t-label">{h.year}</span>
                <span style={{ fontSize: "clamp(18px, 1.4vw, 26px)" }}>{h.who}</span>
                <span className="t-label" style={{ ...mono, fontSize: T.label, color: C.muted }}>{h.what}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Canvas>
  );
}

// Scene pychm-story: 2 steps.
export function FineTuningClaim({ step }: { step: number }) {
  return (
    <Canvas className="flex flex-col justify-center gap-[4vh]">
      <div className="text-center">
        <div style={{ ...serif, fontSize: "clamp(40px, 4.4vw, 84px)", lineHeight: 1.15, marginBottom: "2.2vh" }}>
          ½ log det(1 + <i>F</i>) = ½ Σ<sub>i</sub> log(1 + λ<sub>i</sub>)
        </div>
        <Label>F = JᵀJ · J = ∂ log O / ∂ log x · λᵢ: the eigenvalues of F</Label>
      </div>
      <div className="grid grid-cols-2 gap-[3vw]">
        <Reveal at={0} step={step}>
          <div className="rounded-xl border px-5 py-4 h-full" style={{ borderColor: C.rule, background: C.card }}>
            <Label color={C.accent}>shown in the draft</Label>
            <div className="mt-2" style={{ fontSize: T.body, lineHeight: 1.3 }}>Expand the determinant and out comes the HOT tower: single, double and triple tunings, as sums of products of eigenvalues.</div>
          </div>
        </Reveal>
        <Reveal at={1} step={step}>
          <div className="rounded-xl border-2 border-dashed px-5 py-4 h-full" style={{ borderColor: C.warm, background: C.warmSoft }}>
            <Label color={C.warm}>proved in a linear-Gaussian model · conjectured beyond</Label>
            <div className="mt-2" style={{ fontSize: T.body, lineHeight: 1.3 }}>There it equals the mutual information between parameters and observations. I conjecture it measures how much must conspire in a real model. Real models aren't linear, so it may only be a shadow.</div>
          </div>
        </Reveal>
      </div>
    </Canvas>
  );
}

// Scene claude-science: 2 steps. Facts kept from r7/ClaudeScience.
const FEATURES = [
  "Figures keep the code that made them",
  "Runs on a laptop, a cluster or cloud GPUs",
  "A reviewer agent for citations and maths",
];

export function ClaudeScienceTest({ step }: { step: number }) {
  return (
    <Canvas className="flex flex-col justify-center gap-[5vh]">
      <div className="text-center">
        <div style={{ ...serif, fontSize: T.big, lineHeight: 1.1 }}>A research workbench.</div>
        <div className="mt-2"><Label>Anthropic · for computational research · beta since June 2026 on paid plans · 60+ built-in skills, mostly biology and chemistry</Label></div>
      </div>
      <div className="grid grid-cols-3 gap-[2vw]">
        {FEATURES.map((f) => (
          <div key={f} className="rounded-xl border px-5 py-4 min-h-[14vh] flex items-center" style={{ borderColor: C.rule, background: C.card }}>
            <div style={{ fontSize: T.body, lineHeight: 1.3 }}>{f}</div>
          </div>
        ))}
      </div>
      <Reveal at={1} step={step}>
        <div className="rounded-xl border-2 border-dashed px-6 py-4 text-center" style={{ borderColor: C.accent, background: C.accentSoft }}>
          <div style={{ ...serif, fontSize: BIGF, lineHeight: 1.15 }}>Can we hill-climb a theory project?</div>
          <div className="mt-2" style={{ fontSize: T.body, lineHeight: 1.3 }}>A theory project in notebooks, scored by checks we fix before we start.</div>
        </div>
      </Reveal>
    </Canvas>
  );
}

// Scene demo-finetuning: 3 steps; one panel per step.
const MOVES = [
  { k: "1 · needle search", t: "Has anyone gone beyond Gaussian? Rank papers against a written test: starts from the evidence, many observables, recovers BG, goes past linear order." },
  { k: "2 · break it", t: "Two toys where quadrature gives the exact information: O = a xⁿ − C, and the double-tuning potential from my thesis." },
  { k: "3 · derive the next term", t: "For example a cumulant expansion beyond Laplace." },
];
const CHECKS = [
  "Recovers BG at leading order",
  "Gives the HOT tower at the next order",
  "Doesn't change under reparametrisation",
  "Matches the exact toy numbers",
];
const TIERS = [
  { k: "A", t: "A ranked literature map, and a plot of where the identity fails." },
  { k: "B", t: "A, plus a correction that passes two checks." },
  { k: "C", t: "All four checks." },
];

function Panel({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <motion.div className="absolute inset-0 flex flex-col justify-center" initial={false} aria-hidden={!show}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 8 }} transition={{ duration: 0.5 }} style={{ pointerEvents: show ? "auto" : "none" }}>
      {children}
    </motion.div>
  );
}

export function FineTuningDemo({ step }: { step: number }) {
  return (
    <Canvas className="flex flex-col gap-[3vh]">
      <div className="text-center">
        <Label color={C.accent}>question of the day</Label>
        <div style={{ ...serif, fontSize: BIGF, lineHeight: 1.15 }}>Is ½ log det(1 + F) the exact information in a tuned model, or only its Gaussian shadow?</div>
      </div>
      <div className="relative flex-1">
        <Panel show={step === 0}>
          <div className="grid grid-cols-3 gap-[2vw]">
            {MOVES.map((m) => (
              <div key={m.k} className="rounded-xl border px-5 py-4" style={{ borderColor: C.rule, background: C.card }}>
                <Label color={C.accent}>{m.k}</Label>
                <div className="mt-2" style={{ fontSize: T.body, lineHeight: 1.3 }}>{m.t}</div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel show={step === 1}>
          <div className="mx-auto w-[60vw]">
            <Label>four checks, fixed before we start</Label>
            <div className="mt-3 grid grid-cols-2 gap-[1.5vw]">
              {CHECKS.map((c) => (
                <div key={c} className="rounded-xl border-2 border-dashed px-5 py-3" style={{ borderColor: C.accent }}>
                  <div style={{ fontSize: T.body, lineHeight: 1.3 }}>{c}</div>
                </div>
              ))}
            </div>
          </div>
        </Panel>
        <Panel show={step >= 2}>
          <div className="mx-auto w-[60vw] flex flex-col gap-[1.5vh]">
            <Label>what counts as done by 15:40</Label>
            {TIERS.map((x) => (
              <div key={x.k} className="flex items-baseline gap-4">
                <span style={{ ...serif, fontSize: BIGF, color: C.accent }}>{x.k}</span>
                <span style={{ fontSize: T.body, lineHeight: 1.3 }}>{x.t}</span>
              </div>
            ))}
            <div className="mt-[2vh]" style={{ ...serif, fontSize: BIGF, lineHeight: 1.15 }}>The agent can find where my conjecture breaks. Can it fix it?</div>
          </div>
        </Panel>
      </div>
    </Canvas>
  );
}
