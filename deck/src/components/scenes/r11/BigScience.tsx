"use client";

import { motion } from "motion/react";
import { Area, C, Show, T } from "./kit";

// The analysis chain of a large collaboration. Step 0: each stage is handed
// to agents (Collider 2031's 2028 "AutoAna"). Step 1: three choices that stay
// with a person, from the same design fiction.
const STAGES = ["Write the analysis code", "Iterate the systematics", "Make the plots", "Draft the notes"];
const CHOICES = ["Is the question precise?", "Is the agent wrong?", "What does it mean?"];

export function BigScience({ step }: { step: number }) {
  return (
    <Area style={{ justifyContent: "center", gap: "5vh" }}>
      <div>
      <div className="t-label mb-[1.4vh]" style={{ ...T.label, ...T.mono, color: C.muted }}>Collider 2031, a design fiction · 2028: a large collaboration hands each stage to agents</div>
      <div className="grid grid-cols-4 gap-[1.4vw]">
        {STAGES.map((s, i) => (
          <motion.div key={s} className="relative rounded-xl px-[1.2vw] py-[2.4vh]" initial={false}
            animate={{ backgroundColor: step >= 1 ? "rgba(20,20,20,0.04)" : C.card }}
            style={{ border: `1.5px solid ${C.rule}` }}>
            <div style={{ ...T.body, color: step >= 1 ? C.muted : C.ink }}>{s}</div>
            <div className="t-label mt-[1.4vh] inline-block rounded-full px-3 py-[2px]" style={{ ...T.label, ...T.mono, color: C.accent, border: `1px solid ${C.accent}` }}>agents</div>
            {i < STAGES.length - 1 && <span className="absolute top-1/2 -right-[1.25vw] -translate-y-1/2" style={{ ...T.body, color: C.faint }} aria-hidden>→</span>}
          </motion.div>
        ))}
      </div>
      </div>
      <Show when={step >= 1}>
        <div className="mb-[2vh]" style={{ ...T.serif, ...T.big, color: C.warm }}>Still a person&apos;s choice</div>
        <div className="grid grid-cols-3 gap-[1.4vw]">
          {CHOICES.map((c, i) => (
            <Show key={c} when={step >= 1} delay={0.2 + i * 0.25} className="rounded-xl px-[1.2vw] py-[2.4vh]" style={{ border: `2px solid ${C.warm}`, background: C.card }}>
              <div style={{ ...T.body, color: C.ink }}>{c}</div>
            </Show>
          ))}
        </div>
      </Show>
    </Area>
  );
}
