"use client";

import { motion } from "motion/react";
import { Area, D, MONO, SERIF, Show, T } from "./kit";

// eth-speed: ported from the ETH deck's SpeedJourney (4 steps). One stop per
// step, as in ETH. Changes for the public course deck: every time now has a
// FACTS.md source, so the ETH "~60 s" (spoken, unsourced) becomes the
// published 2021 numbers, and "~100 ms" (flagged in FACTS as ahead of public
// numbers) becomes "a few hundred ms". The last step points to the Pandora
// example: no source attributes any of THIS speed-up to LLM-written code.
//   2021: ~200 s/event on one CPU core, ~3.3 s on a V100 (Ju et al. 2021, arXiv:2103.06995)
//   2025: a few hundred ms/event, full pipeline, one modern GPU (Poreba & Fröning, EPJ Web Conf. 337, 01043)
//   target: 10 ms/event (ATLAS TDAQ requirement, Murnane ACAT 2024 slide 15)
//   100 kHz: 10 ms per event on ~1000 GPUs (ETH deck arithmetic, projected)

type Stop = { year: string; time: string; sub: string; projected: boolean };
const STOPS: Stop[] = [
  { year: "2021", time: "~200 s", sub: "Exa.TrkX · one CPU core (3.3 s on a GPU)", projected: false },
  { year: "2025", time: "a few hundred ms", sub: "GNN4ITk · full pipeline · one GPU", projected: false },
  { year: "target", time: "10 ms", sub: "trigger requirement", projected: true },
  { year: "projected", time: "100 kHz", sub: "10 ms × ~1000 GPUs", projected: true },
];

export function SpeedJourney({ step }: { step: number }) {
  const W = 1100;
  const H = 300;
  const left = 110;
  const right = W - 110;
  const axisY = H - 110;
  const xs = [0, 1, 2, 3].map((i) => left + (i * (right - left)) / 3);

  return (
    <Area style={{ justifyContent: "center", gap: "3vh" }}>
      <div className="t-label" style={{ ...T.label, fontFamily: MONO, color: D.faint, textAlign: "right" }}>time per event · ATLAS tracking with graph neural networks</div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", maxHeight: "42vh" }} role="img" aria-label="Timeline of tracking time per event: about 200 seconds on a CPU core in 2021, a few hundred milliseconds on one GPU in 2025, a 10 millisecond target, and 100 kilohertz projected on about a thousand GPUs">
        <motion.line x1={left - 40} y1={axisY} x2={right + 40} y2={axisY} stroke={D.accent} strokeOpacity="0.3" strokeWidth="1.2" initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { duration: 1.2, delay: 0.2 } }} />
        <polyline points={`${right + 32},${axisY - 5} ${right + 40},${axisY} ${right + 32},${axisY + 5}`} fill="none" stroke={D.accent} strokeOpacity="0.5" strokeWidth="1.2" />
        {STOPS.map((s, i) => {
          const x = xs[i];
          const visible = step >= i;
          const r = [28, 16, 8, 5][i];
          const col = s.projected ? D.accent : D.soft;
          return (
            <motion.g key={s.year} data-reveal aria-hidden={!visible} initial={false} animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }} transition={{ duration: 0.55 }}>
              <line x1={x} y1={axisY - 6} x2={x} y2={axisY + 6} stroke={D.muted} strokeOpacity="0.8" />
              <g transform={`translate(${x},${axisY - 60})`}>
                <circle r={r} fill="none" stroke={col} strokeOpacity="0.75" strokeWidth="1.4" strokeDasharray={s.projected ? "3 3" : undefined} />
                <line x1="0" y1="0" x2="0" y2={-r * 0.65} stroke={col} strokeOpacity="0.75" strokeWidth="1.2" />
                <line x1="0" y1="0" x2={r * 0.5} y2="0" stroke={col} strokeOpacity="0.5" strokeWidth="1.2" />
              </g>
              <text className="t-label" x={x} y={axisY + 30} textAnchor="middle" fontSize="16" fill={D.muted} fontFamily={MONO} letterSpacing="0.15em">{s.year.toUpperCase()}</text>
              <text x={x} y={axisY + 66} textAnchor="middle" fontSize="30" fill={D.ink} fontFamily={SERIF} fontStyle="italic">{s.time}</text>
              <text className="t-label" x={x} y={axisY + 94} textAnchor="middle" fontSize="15" fill={D.faint} fontFamily={MONO}>{s.sub}</text>
            </motion.g>
          );
        })}
      </svg>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2vh", textAlign: "center" }}>
        <Show when={step >= 1} delay={0.4}>
          <div style={{ ...T.big, ...T.serif, color: D.soft }}>Four years: from minutes per event to a fraction of a second.</div>
        </Show>
        <Show when={step >= 3} delay={0.3}>
          <div style={{ ...T.body, color: D.body, maxWidth: "52em" }}>
            Each step was careful engineering. Agents now do this kind of optimisation: <span style={{ color: D.warm }}>see Pandora in a few minutes.</span>
          </div>
        </Show>
      </div>
    </Area>
  );
}
