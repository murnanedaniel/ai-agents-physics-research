"use client";

import { useState } from "react";
import { C, Canvas, Reveal, T, mono, stop } from "./kit";

// Left (step 0): what RANGE does, in words and as a drawing. A chain molecule; a message-passing GNN
// only links atoms inside a cutoff; RANGE adds master nodes that gather from
// every atom by attention and broadcast back (Caruso et al. 2026, Sec. 2).
// Right (step 1): DHA errors for three models from one table, each defined,
// plus the best published force errors (other splits, so not plotted):
// Li et al., arXiv:2304.13542, Table 2 (Equiformer 0.0506, MACE 0.0646).
type Metric = "energy" | "force";
// Caruso et al., Nat. Commun. 17 (2026), Table 1: MD22 DHA, PaiNN backbone,
// mean of four seeds; time is inference time relative to PaiNN. Setup line
// (5 Å cutoff, ~70,000 DHA frames) from the same paper's Results section.
const ROWS = [
  { name: "PaiNN", def: "local messages only: the baseline", energy: 0.199, force: 0.238, time: "time ×1" },
  { name: "+ Neural P3M", def: "adds long range through a grid, like an Ewald sum", energy: 0.113, force: 0.126, time: "time ×2.80" },
  { name: "+ RANGE", def: "adds master nodes linked to every atom", energy: 0.110, force: 0.160, time: "time ×1.47", hero: true },
];
const UNIT: Record<Metric, string> = { energy: "energy error, kcal/mol", force: "force error, kcal/mol/Å" };

// Chain atoms on a gentle zigzag.
const ATOMS = Array.from({ length: 13 }, (_, i) => ({ x: 40 + i * 40, y: 330 + (i % 2 ? -22 : 22) }));
const MASTERS = [{ x: 190, y: 110 }, { x: 370, y: 110 }];
const CUT = { i: 4, r: 78 };

function Mechanism() {
  const c = ATOMS[CUT.i];
  return (
    <svg viewBox="0 30 560 445" className="h-full w-auto max-w-full" role="img" aria-label="A chain of atoms; one atom links only to neighbours inside a dashed cutoff circle; two master nodes connect to every atom">
      {MASTERS.map((m, k) => ATOMS.map((a, i) => (
        <line key={`${k}-${i}`} x1={m.x} y1={m.y + 14} x2={a.x} y2={a.y} stroke={C.accent} strokeWidth={1} opacity={0.35} />
      )))}
      {ATOMS.slice(0, -1).map((a, i) => <line key={i} x1={a.x} y1={a.y} x2={ATOMS[i + 1].x} y2={ATOMS[i + 1].y} stroke="#a8a29e" strokeWidth={3} />)}
      <circle cx={c.x} cy={c.y} r={CUT.r} fill="none" stroke={C.ink} strokeDasharray="5 6" strokeWidth={1.5} />
      {ATOMS.filter((a) => Math.hypot(a.x - c.x, a.y - c.y) < CUT.r && a !== c).map((a, i) => (
        <line key={i} x1={c.x} y1={c.y} x2={a.x} y2={a.y} stroke={C.ink} strokeWidth={2.5} />
      ))}
      {ATOMS.map((a, i) => <circle key={i} cx={a.x} cy={a.y} r={10} fill={i === CUT.i ? C.ink : "#d6d3d1"} stroke={C.ink} strokeWidth={1.2} />)}
      {MASTERS.map((m, k) => <rect key={k} x={m.x - 16} y={m.y - 16} width={32} height={32} rx={4} fill={C.accent} />)}
      <text x={280} y={62} textAnchor="middle" fontSize={20} style={mono} fill={C.accent} className="t-label">RANGE master nodes: linked to every atom</text>
      <text x={c.x} y={c.y + CUT.r + 26} textAnchor="middle" fontSize={20} style={mono} fill={C.ink} className="t-label">cutoff: local messages only</text>
    </svg>
  );
}

function Chart({ metric, hover, setHover }: { metric: Metric; hover: number | null; setHover: (i: number | null) => void }) {
  const L = 250, R = 470, MAX = 0.25;
  const x = (v: number) => L + (v / MAX) * (R - L);
  return (
    <svg viewBox="0 0 600 250" className="w-full h-auto" role="img" aria-label={`MD22 DHA ${UNIT[metric]} for PaiNN, PaiNN plus Neural P3M and PaiNN plus RANGE`}>
      {[0, 0.1, 0.2].map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1={10} y2={218} stroke={C.rule} />
          <text x={x(t)} y={240} textAnchor="middle" fontSize={15} style={mono} fill={C.muted} className="t-label">{t === 0 ? "0" : t.toFixed(1)}</text>
        </g>
      ))}
      {ROWS.map((r, i) => {
        const y = 40 + i * 70, v = r[metric];
        return (
          <g key={r.name} {...stop} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <title>{`${r.name}: ${v.toFixed(3)} ${UNIT[metric]}, ${r.time}`}</title>
            <rect x={0} y={y - 26} width={600} height={62} fill={hover === i ? C.accentSoft : "transparent"} />
            <text x={0} y={y + 2} fontSize={21} fill={C.ink} fontWeight={r.hero ? 600 : 400} className="t-label">{r.name}</text>
            <foreignObject x={0} y={y + 8} width={235} height={44}>
              <div className="t-label" style={{ ...mono, fontSize: 13, lineHeight: 1.25, color: C.muted }}>{r.def}</div>
            </foreignObject>
            <circle cx={x(v)} cy={y} r={r.hero ? 9 : 7} fill={r.hero ? C.accent : "#8b9bb0"} />
            <text x={R + 16} y={y + 6} fontSize={17} style={mono} fill={C.ink} className="t-label">{v.toFixed(3)}</text>
            <text x={R + 16} y={y + 28} fontSize={14} style={mono} fill={C.muted} className="t-label">{r.time}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function RangePhysics({ step }: { step: number }) {
  const [metric, setMetric] = useState<Metric>("force");
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Canvas className="flex items-center gap-[3vw]">
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-[1.5vh] h-full">
        <div style={{ fontSize: T.body, lineHeight: 1.3 }}>A message-passing network links each atom only to neighbours inside a cutoff. RANGE adds a few master nodes that gather from every atom, by attention, and send the result back.</div>
        <div className="min-h-0 flex-1 flex items-center justify-center overflow-hidden"><Mechanism /></div>
        <div className="t-label" style={{ ...mono, fontSize: T.label, color: C.muted, lineHeight: 1.4 }}>
          DHA: a 56-atom fatty-acid chain, one of seven molecules in the MD22 benchmark.<br />
          Long range: atoms that pull on each other from beyond the cutoff, through electrostatics and dispersion.
        </div>
      </div>
      <Reveal at={1} step={step} className="flex-1 min-w-0 flex flex-col gap-[1.5vh]">
        <div className="flex items-center gap-2 flex-wrap" {...stop}>
          {(["force", "energy"] as Metric[]).map((m) => (
            <button key={m} type="button" onClick={(e) => { e.stopPropagation(); setMetric(m); }} aria-pressed={metric === m}
              className="rounded-full border px-3 py-0.5 t-label"
              style={{ ...mono, fontSize: T.label, borderColor: metric === m ? C.accent : C.rule, background: metric === m ? C.accent : "transparent", color: metric === m ? "#fff" : C.ink, cursor: "pointer" }}>
              {m === "force" ? "forces" : "energy"}
            </button>
          ))}
          <span className="t-label" style={{ ...mono, fontSize: T.label, color: C.muted }}>DHA · {UNIT[metric]} · lower is better</span>
        </div>
        <div className="t-label" style={{ ...mono, fontSize: T.label, color: C.muted, lineHeight: 1.4 }}>setup: PaiNN, 5 Å cutoff, about 70,000 DHA frames; mean of four seeds</div>
        <Chart metric={metric} hover={hover} setHover={setHover} />
        <div style={{ fontSize: T.body, lineHeight: 1.25 }}>RANGE matches Neural P3M on energy in about half the time. Neural P3M has the lower force error.</div>
        <div className="t-label" style={{ ...mono, fontSize: T.label, color: C.muted, lineHeight: 1.4 }}>best published DHA force errors: about 0.05 to 0.07 kcal/mol/Å, with other training splits</div>
      </Reveal>
    </Canvas>
  );
}
