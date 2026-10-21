"use client";

import { C, Canvas, Reveal, RevealG, T, mono, serif, stop } from "./kit";

// Step 0: where the idea came from (a talk at HAMLET 2026) and the problem:
// molecular dynamics needs forces, quantum chemistry is slow, ML force fields
// learn from it. Step 1: the catch (a few-ångström cutoff against
// electrostatics over tens of ångström, Caruso et al. 2026, Introduction),
// the hunch, and the two axes we compete on as a schematic (no numbers: the
// published values are on the next scene). Step 2: why it suits an agent.
const FIT = ["Clear metrics", "ML training", "Public data", "Baselines with code"];
const TALK = "https://indico.nbi.ku.dk/event/2253/contributions/17127/";

function Axes({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 520 440" className="h-full max-h-full w-auto max-w-full" role="img" aria-label="Schematic: error against inference time; RANGE is one point; the target is the corner that is both more accurate and faster">
      <defs>
        <marker id="r7-rw-ax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill={C.ink} /></marker>
      </defs>
      <line x1={70} y1={380} x2={490} y2={380} stroke={C.ink} strokeWidth={2} markerEnd="url(#r7-rw-ax)" />
      <line x1={70} y1={380} x2={70} y2={30} stroke={C.ink} strokeWidth={2} markerEnd="url(#r7-rw-ax)" />
      <text x={490} y={414} textAnchor="end" fontSize={20} style={mono} fill={C.ink} className="t-label">time per prediction</text>
      <text x={84} y={44} fontSize={20} style={mono} fill={C.ink} className="t-label">error</text>
      <RevealG at={1} step={step}>
        <rect x={80} y={250} width={150} height={120} rx={14} fill={C.warmSoft} stroke={C.warm} strokeDasharray="6 6" strokeWidth={2} />
        <text x={155} y={318} textAnchor="middle" fontSize={44} style={serif} fill={C.warm}>?</text>
        <text x={155} y={240} textAnchor="middle" fontSize={18} style={mono} fill="#9a3412" className="t-label">a transformer</text>
        <circle cx={330} cy={190} r={12} fill={C.accent} />
        <text x={350} y={196} fontSize={22} style={mono} fill={C.accent} className="t-label">RANGE</text>
        <text x={330} y={160} textAnchor="middle" fontSize={16} style={mono} fill={C.muted} className="t-label">published</text>
      </RevealG>
    </svg>
  );
}

export function RangeWhy({ step }: { step: number }) {
  return (
    <Canvas className="flex items-center gap-[4vw]">
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-[3vh]">
        <Reveal at={0} step={step}>
          <a href={TALK} target="_blank" rel="noreferrer" {...stop} className="t-label underline decoration-dotted underline-offset-4" style={{ ...mono, fontSize: T.label, color: C.accent }}>
            HAMLET 2026 keynote · Cecilia Clementi · protein dynamics with ML ↗
          </a>
          <div className="mt-2" style={{ fontSize: T.body, lineHeight: 1.3 }}>Molecular dynamics needs the forces on every atom, at every step. Quantum chemistry is accurate but slow, so we train ML force fields on it.</div>
        </Reveal>
        <Reveal at={1} step={step}>
          <div style={{ fontSize: T.body, lineHeight: 1.3 }}>Most use a cutoff of a few ångström; electrostatics reaches tens. RANGE adds long range at a small extra cost.</div>
          <div className="mt-2" style={{ ...serif, fontSize: "clamp(26px, 2.4vw, 46px)", lineHeight: 1.15 }}>My hunch: a transformer could match it on accuracy and on speed.</div>
        </Reveal>
        <Reveal at={2} step={step}>
          <div className="t-label mb-1" style={{ ...mono, fontSize: T.label, color: C.muted }}>why it suits an agent · MD22: public benchmark of simulated molecules</div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
            {FIT.map((f) => (
              <div key={f} className="flex items-start gap-2" style={{ fontSize: T.body, lineHeight: 1.3 }}>
                <span aria-hidden style={{ color: C.accent }}>✓</span><span>{f}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <div className="h-full flex-[0.75] min-w-0 flex items-center justify-center"><Axes step={step} /></div>
    </Canvas>
  );
}
