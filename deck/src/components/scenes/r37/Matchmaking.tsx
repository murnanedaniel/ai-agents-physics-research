"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Area, C, T } from "../r11/kit";
import { RESEARCHERS, sectionColor } from "./nbi";

// collab-match: the pair from the collab roulette, and the joint-grant text
// Claude drafted for them. Ported from NBI-AI-future (scenes/Matchmaking.tsx,
// lib/winningPair.ts). Anonymised: Researcher A and B, fields only; the
// abstract is an excerpt of Claude's text with the two surnames replaced and
// em dashes turned into commas; the repo path is dropped.
// How the text was made (NBI-AI-future docs/matchmaking-pairs-spec.md): one
// pair per section pair, picked for close recent work and distant background;
// Claude (Sonnet 4.6) wrote a 150-word abstract, title, three methods and a
// budget line, told to use only facts in the two profiles, to add no numbers
// that were not in them, and to refuse if no honest bridge existed.
// Steps: 0 the two people and the shared question · 1 the draft streams in.

const ABSTRACT =
  "We propose a three-year NBI cross-section collaboration to establish a non-destructive magnetic readout of volcanic-tephra Fe-redox state in polar ice cores, as a quantitative tracer of magmatic fO₂ at eruption, and therefore of stratospheric sulphate yield and radiative forcing. … B's cryptotephra framework supplies geochemically calibrated, eruption-tagged ice sections. A's DFT + Hubbard/Anderson spin-Hamiltonian toolkit supplies the first-principles inversion from bulk magnetic susceptibility to Fe³⁺/Fe²⁺ ratios and end-member mineralogy.";
const WORDS = ABSTRACT.split(/\s+/);
const TITLE = "Non-Destructive Magnetic Redox Proxy for Volcanic Tephra in Polar Ice, with First-Principles Calibration";
const METHODS = [
  "Pilot on a visible eruption layer in the ice (Eldgjá, 939 CE)",
  "Spin-Hamiltonian database: titanomagnetite, hematite, pyrrhotite",
  "Bulk magnetics → Fe³⁺/Fe²⁺ inversion, cross-checked with μ-XANES",
];
const BUDGET = ["~1.6M DKK", "3 years", "1 PhD, co-supervised"];

function Person({ k }: { k: "a" | "b" }) {
  const r = RESEARCHERS[k];
  const [typed, setTyped] = useState("");
  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => { i++; setTyped(r.label.slice(0, i)); if (i >= r.label.length) window.clearInterval(id); }, 60);
    return () => window.clearInterval(id);
  }, [r.label]);
  const right = k === "b";
  return (
    <div className="rounded-md px-4 py-4" style={{ background: C.card, border: `2px solid ${sectionColor(r.s)}`, textAlign: right ? "right" : "left", alignSelf: "center" }}>
      <div className="flex items-center gap-3" style={{ flexDirection: right ? "row-reverse" : "row" }}>
        <div className="flex items-center justify-center rounded-full" style={{ width: 52, height: 52, border: `2px solid ${sectionColor(r.s)}`, color: sectionColor(r.s), ...T.big, ...T.serif }}>{k.toUpperCase()}</div>
        <div style={{ ...T.big, ...T.serif, color: C.ink, minHeight: "1.2em" }}>{typed}</div>
      </div>
      <div style={{ ...T.body, color: sectionColor(r.s), marginTop: "1vh" }}>{r.field}</div>
      <div className="t-label" style={{ ...T.label, color: C.muted }}>{r.detail}</div>
    </div>
  );
}

function Draft() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setN((w) => { if (w >= WORDS.length) { window.clearInterval(id); return w; } return w + 1; }), 90);
    return () => window.clearInterval(id);
  }, []);
  const done = n >= WORDS.length;
  return (
    <div className="flex h-full flex-col rounded-md px-5 py-4" style={{ background: "#fff", border: `1px solid ${C.rule}`, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
      <div className="t-label flex justify-between" style={{ ...T.label, ...T.mono, color: C.muted, borderBottom: `1px solid ${C.rule}`, paddingBottom: 6 }}>
        <span>proposed joint project · excerpt</span>
        <span style={{ color: done ? "#059669" : C.accent }}>{done ? "done" : "writing…"}</span>
      </div>
      <div style={{ ...T.body, ...T.serif, fontStyle: "normal", color: C.ink, marginTop: 10 }}>{TITLE}</div>
      <div className="t-label" style={{ ...T.label, color: C.ink, marginTop: 8, lineHeight: 1.45 }}>{WORDS.slice(0, n).join(" ")}</div>
      <AnimatePresence>
        {done && (
          <motion.div className="t-label mt-auto grid gap-4 pt-3" style={{ ...T.label, gridTemplateColumns: "1fr auto", borderTop: `1px solid ${C.rule}` }}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <ul style={{ color: C.ink }}>{METHODS.map((m) => <li key={m}>· {m}</li>)}</ul>
            <div style={{ ...T.mono, color: C.muted, textAlign: "right" }}>{BUDGET.map((b) => <div key={b}>{b}</div>)}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Matchmaking({ step }: { step: number }) {
  return (
    <Area style={{ gap: "2vh" }}>
      <div className="grid min-h-0 flex-1 gap-6" style={{ gridTemplateColumns: "20vw 1fr 20vw" }}>
        <Person k="a" />
        <div className="relative">
          <AnimatePresence mode="wait">
            {step < 1 ? (
              <motion.div key="prose" className="absolute inset-0 flex items-center justify-center text-center"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                <div style={{ ...T.big, ...T.serif, color: C.ink, maxWidth: "40vw" }}>
                  Both have come at the same question from opposite sides: how to read the iron redox state of volcanic ash in ice.
                  For B, it sets how much sulphate an eruption pushed into the stratosphere. With A&apos;s spin models, a magnetic measurement
                  could give that ratio without destroying the sample.
                </div>
              </motion.div>
            ) : (
              <motion.div key="draft" className="absolute inset-0" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <Draft />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Person k="b" />
      </div>
      <div className="text-center" style={{ ...T.body, color: C.ink, minHeight: "2.7em" }}>
        {step < 1
          ? "They work in different sections and have different backgrounds."
          : "Claude drafted this from their papers. It was told to use only facts in the two profiles, and to refuse if it found no honest bridge."}
      </div>
    </Area>
  );
}
