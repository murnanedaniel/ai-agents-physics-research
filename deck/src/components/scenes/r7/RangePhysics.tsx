"use client";

import { useState } from "react";
import { C, Canvas, Reveal, T, mono, stop } from "./kit";

// Left (step 0): what RANGE does. A chain molecule; a message-passing GNN
// only links atoms inside a cutoff; RANGE adds master nodes that gather from
// every atom by attention and broadcast back (Caruso et al. 2026, Sec. 2).
// Right (step 1): MD22 DHA errors in two separately sourced panels, because
// the two papers use different splits and training sizes.
// A: Caruso et al., Nat. Commun. 17 (2026), Table 1 (PaiNN backbone, mean ± spread).
// B: Li et al., arXiv:2304.13542, Table 2 (ViSNet-LSRM paper).
type Metric = "energy" | "force";
const A = [
  { name: "PaiNN", energy: 0.199, force: 0.238 },
  { name: "+ Ewald MP", energy: 0.191, force: 0.243 },
  { name: "+ Neural P3M", energy: 0.113, force: 0.126 },
  { name: "+ RANGE", energy: 0.110, force: 0.160, hero: true },
];
const B = [
  { name: "PaiNN", energy: 0.1151, force: 0.1355 },
  { name: "MACE", energy: 0.1317, force: 0.0646 },
  { name: "Equiformer", energy: 0.1788, force: 0.0506 },
  { name: "ViSNet-LSRM", energy: 0.0873, force: 0.0598 },
];
const UNIT: Record<Metric, string> = { energy: "energy MAE, kcal/mol", force: "force MAE, kcal/mol/Å" };

// Chain atoms on a gentle zigzag.
const ATOMS = Array.from({ length: 13 }, (_, i) => ({ x: 40 + i * 40, y: 330 + (i % 2 ? -22 : 22) }));
const MASTERS = [{ x: 190, y: 110 }, { x: 370, y: 110 }];
const CUT = { i: 4, r: 78 };

function Mechanism() {
  const c = ATOMS[CUT.i];
  return (
    <svg viewBox="0 0 560 440" className="w-full h-auto max-h-full" role="img" aria-label="A chain of atoms; one atom links only to neighbours inside a dashed cutoff circle; two master nodes connect to every atom">
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
      <text x={280} y={62} textAnchor="middle" fontSize={20} style={mono} fill={C.accent} className="t-label">RANGE master nodes: see every atom</text>
      <text x={c.x} y={c.y + CUT.r + 30} textAnchor="middle" fontSize={20} style={mono} fill={C.ink} className="t-label">cutoff: local messages only</text>
    </svg>
  );
}

function Panel({ title, rows, metric, hover, setHover, tag, exact }: {
  title: string; rows: { name: string; energy: number; force: number; hero?: boolean }[]; metric: Metric;
  hover: string | null; setHover: (s: string | null) => void; tag: string; exact?: boolean;
}) {
  const L = 150, R = 420, MAX = 0.25;
  const x = (v: number) => L + (v / MAX) * (R - L);
  return (
    <svg viewBox="0 0 500 190" className="w-full h-auto" role="img" aria-label={`${title}: ${UNIT[metric]}`}>
      <text x={0} y={18} fontSize={17} style={mono} fill={C.ink} className="t-label">{title}</text>
      {[0, 0.1, 0.2].map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1={30} y2={166} stroke={C.rule} />
          <text x={x(t)} y={184} textAnchor="middle" fontSize={14} style={mono} fill={C.muted} className="t-label">{t === 0 ? "0" : t.toFixed(1)}</text>
        </g>
      ))}
      {rows.map((r, i) => {
        const y = 48 + i * 34, v = r[metric], id = `${tag}-${r.name}`;
        return (
          <g key={r.name} {...stop} onMouseEnter={() => setHover(id)} onMouseLeave={() => setHover(null)}>
            <title>{`${r.name}: ${v} ${UNIT[metric]}`}</title>
            <rect x={0} y={y - 15} width={500} height={30} fill={hover === id ? C.accentSoft : "transparent"} />
            <text x={0} y={y + 6} fontSize={17} fill={C.ink} fontWeight={r.hero ? 600 : 400} className="t-label">{r.name}</text>
            <circle cx={x(v)} cy={y} r={r.hero ? 8 : 6} fill={r.hero ? C.accent : "#8b9bb0"} />
            <text x={R + 14} y={y + 5} fontSize={15} style={mono} fill={C.ink} className="t-label">{exact ? String(v) : v.toFixed(3)}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function RangePhysics({ step }: { step: number }) {
  const [metric, setMetric] = useState<Metric>("force");
  const [hover, setHover] = useState<string | null>(null);
  return (
    <Canvas className="flex items-center gap-[3vw]">
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-[2vh] h-full">
        <div className="min-h-0 flex-1 flex items-center"><Mechanism /></div>
        <div style={{ fontSize: T.body, lineHeight: 1.3 }}>Energies and forces from atom positions. Local messages miss long-range forces.</div>
      </div>
      <Reveal at={1} step={step} className="flex-1 min-w-0 flex flex-col gap-[1.2vh]">
        <div className="flex items-center gap-2" {...stop}>
          {(["force", "energy"] as Metric[]).map((m) => (
            <button key={m} type="button" onClick={(e) => { e.stopPropagation(); setMetric(m); }} aria-pressed={metric === m}
              className="rounded-full border px-3 py-0.5 t-label"
              style={{ ...mono, fontSize: T.label, borderColor: metric === m ? C.accent : C.rule, background: metric === m ? C.accent : "transparent", color: metric === m ? "#fff" : C.ink, cursor: "pointer" }}>
              {m === "force" ? "forces" : "energy"}
            </button>
          ))}
          <span className="t-label" style={{ ...mono, fontSize: T.label, color: C.muted }}>MD22 DHA · {UNIT[metric]} · lower is better</span>
        </div>
        <Panel title="RANGE paper, one protocol" rows={A} metric={metric} hover={hover} setHover={setHover} tag="a" />
        <Panel title="Best published, another protocol" rows={B} metric={metric} hover={hover} setHover={setHover} tag="b" exact />
        <div style={{ fontSize: T.body, lineHeight: 1.25 }}>Same PaiNN, different numbers: compare within a panel only.</div>
      </Reveal>
    </Canvas>
  );
}
