"use client";

import { motion } from "motion/react";
import { C, Canvas, Reveal, T, mono, serif } from "./kit";

// Phone, relay, cluster: the session runs on the login node; the phone and
// the browser only see it through claude.ai. Step 1: the keeper test.
// Facts: code.claude.com/docs/en/remote-control; DECISIONS.md 2026-10-07.

function Phone() {
  return (
    <div className="relative rounded-[28px] border-[7px] bg-white" style={{ borderColor: "#292524", height: "38vh", aspectRatio: "9 / 17" }}>
      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 h-2.5 w-14 rounded-full bg-[#292524]" />
      <div className="absolute inset-x-3 top-7 space-y-2">
        <div className="t-label" style={{ ...mono, fontSize: T.label, color: C.muted }}>galactic-fof</div>
        <div className="rounded-xl px-2.5 py-1.5" style={{ background: "#ece6da", fontSize: T.label }}><span className="t-label">benchmark finished</span></div>
        <div className="ml-auto w-fit rounded-xl px-2.5 py-1.5 text-white" style={{ background: C.accent, fontSize: T.label }}><span className="t-label">plot it</span></div>
      </div>
    </div>
  );
}

function Box({ title, sub, children }: { title: string; sub: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="h-[40vh] flex items-center">{children}</div>
      <div style={{ fontSize: T.body }}>{title}</div>
      <div className="t-label" style={{ ...mono, fontSize: T.label, color: C.muted }}>{sub}</div>
    </div>
  );
}

function Wire({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 160 30" className="flex-1 min-w-[60px] max-w-[200px] h-auto self-start mt-[19vh]" aria-hidden>
      <line x1={4} y1={15} x2={156} y2={15} stroke={C.ink} strokeWidth={2} strokeDasharray="5 6" />
      <motion.circle r={6} cy={15} fill={C.accent} initial={{ cx: 10 }} animate={{ cx: [10, 150, 10] }} transition={{ duration: 3.2, repeat: 2, delay, ease: "easeInOut" }} />
    </svg>
  );
}

export function RcMagic({ step }: { step: number }) {
  return (
    <Canvas className="flex flex-col justify-center gap-[6vh]">
      <div className="flex items-start justify-center gap-[2vw]">
        <Box title="phone or browser" sub="anywhere"><Phone /></Box>
        <Wire delay={0.4} />
        <Box title="claude.ai" sub="relays messages">
          <div className="rounded-full border-2 grid place-items-center" style={{ borderColor: C.ink, width: "clamp(90px, 8vw, 150px)", aspectRatio: "1" }}>
            <span style={{ ...serif, fontSize: T.big }}>C</span>
          </div>
        </Box>
        <Wire delay={1.2} />
        <Box title="Perlmutter login node" sub="claude rc: the session lives here">
          <div className="rounded-lg px-4 py-3 text-left" style={{ background: "#1c1917", color: "#e7e5e4", ...mono, fontSize: T.label, width: "clamp(200px, 19vw, 360px)" }}>
            <div className="t-label">$ claude rc</div>
            <div className="t-label" style={{ color: "#86efac" }}>connected</div>
            <div className="t-label" style={{ color: "#a8a29e" }}>files, Slurm, GPUs: local</div>
          </div>
        </Box>
      </div>
      <Reveal at={1} step={step} className="mx-auto max-w-[62vw] rounded-xl border-l-4 pl-5 py-2" style={{ borderColor: C.warm }}>
        <div style={{ fontSize: T.body, lineHeight: 1.35 }}>
          Killed with <span style={mono}>kill -9</span>, it came back about 7 minutes later on another login node, as the same environment.
        </div>
      </Reveal>
    </Canvas>
  );
}
