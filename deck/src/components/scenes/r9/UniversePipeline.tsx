"use client";

import { Arrow, C, Canvas, MONO, SANS, Show } from "./kit";

// newuniverse-pipeline: how the hidden universe reaches the lab.
// Step 0: the sealed side (Lagrangian -> UFO -> MadGraph + MadSpin).
// Step 1: the fast detector, with an animated event: hits appear layer by layer.
// Step 2: the oracle, the lab's only door, and its budget.
const NODES = [
  { name: "Lagrangian", sub: "ours, frozen" },
  { name: "UFO", sub: "model in Python" },
  { name: "MadGraph", sub: "+ MadSpin" },
  { name: "detector", sub: "fast sim" },
  { name: "oracle", sub: "the only door" },
  { name: "agent lab", sub: "sees hits only" },
];
const NW = 172, NX = (i: number) => 14 + i * 197, NY = 40, NH = 92;
const AT = [0, 0, 0, 1, 2, 2];

// Event display, schematic: radii are the real layer radii (cm) x 1.25.
const LAYERS = [3, 6, 10, 16, 25, 35, 50, 65, 80, 100];
const EX = 210, EY = 400, K = 1.25;
const TRACKS = [
  { a: 0.5, c: 0.0035 }, { a: 1.6, c: -0.006 }, { a: 2.5, c: 0.0012 },
  { a: 3.5, c: -0.0025 }, { a: 4.4, c: 0.008 }, { a: 5.5, c: -0.0015 },
];
function hit(a: number, c: number, r: number) {
  // circle through the origin with curvature c, evaluated at radius r
  const s = Math.abs(c) < 1e-9 ? r : (2 / c) * Math.asin(Math.min(1, (r * c) / 2));
  const th = a + (c * s) / 2;
  return [EX + K * r * Math.cos(th), EY + K * r * Math.sin(th)];
}

export function UniversePipeline({ step }: { step: number }) {
  return (
    <Canvas label="Pipeline: a sealed Lagrangian, written as a UFO, generated with MadGraph and MadSpin, passed through a fast detector; the oracle is the agent lab's only door">
      <rect x={4} y={22} width={4 * 197 - 14} height={128} rx={18} fill={C.warmTint} opacity={0.55} />
      <text className="t-label" x={20} y={176} fontFamily={MONO} fontSize={16} fill={C.warm}>sealed: the lab never reads this side</text>
      {NODES.map((n, i) => (
        <Show key={n.name} at={AT[i]} step={step}>
          <rect x={NX(i)} y={NY} width={NW} height={NH} rx={12} fill={i === 5 ? C.tint : "#fffdf8"} stroke={i === 0 ? C.ink : i >= 4 ? C.accent : C.muted} strokeWidth={i === 0 || i === 4 ? 3 : 1.6} />
          <text x={NX(i) + NW / 2} y={NY + 40} textAnchor="middle" fontFamily={SANS} fontSize={25} fill={C.ink}>{n.name}</text>
          <text className="t-label" x={NX(i) + NW / 2} y={NY + 70} textAnchor="middle" fontFamily={MONO} fontSize={15} fill={C.muted}>{n.sub}</text>
          {i > 0 && (
            <g>
              <path d={`M ${NX(i) - 22} ${NY + NH / 2} H ${NX(i) - 4}`} stroke={C.muted} strokeWidth={2} markerEnd="url(#r9-up)" />
              <circle r={5} fill={i >= 4 ? C.accent : C.warm}>
                <animateMotion dur="1.6s" repeatCount="indefinite" begin={`${i * 0.25}s`} path={`M ${NX(i - 1) + NW / 2} ${NY + NH + 10} H ${NX(i) + NW / 2}`} />
              </circle>
            </g>
          )}
        </Show>
      ))}
      <Show at={0} step={step}>
        <text className="t-label" x={20} y={202} fontFamily={MONO} fontSize={16} fill={C.muted}>UFO: Python files of particles, parameters, vertices and couplings that MadGraph reads</text>
        <text className="t-label" x={20} y={228} fontFamily={MONO} fontSize={16} fill={C.muted}>checked: MadGraph gauge and Lorentz tests pass; widths match hand calculations</text>
      </Show>

      {/* step 1: the detector */}
      <Show at={1} step={step}>
        {LAYERS.map((r) => <circle key={r} cx={EX} cy={EY} r={r * K} fill="none" stroke={C.rule} strokeWidth={1.2} />)}
        <circle cx={EX} cy={EY} r={140} fill="none" stroke={C.warm} strokeWidth={14} opacity={0.25} />
        {TRACKS.map((t, k) =>
          LAYERS.map((r, j) => {
            const [x, y] = hit(t.a, t.c, r);
            return (
              <circle key={`${k}-${j}`} cx={x} cy={y} r={3.6} fill={C.accent} opacity={0}>
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.85;1" dur="5s" begin={`${0.6 + j * 0.12}s`} repeatCount="indefinite" />
              </circle>
            );
          }),
        )}
        <circle cx={EX} cy={EY} r={4} fill={C.ink} />
        <text x={400} y={300} fontFamily={SANS} fontSize={26} fill={C.ink}>Raw hits: where, when, how much energy.</text>
        <text className="t-label" x={400} y={334} fontFamily={MONO} fontSize={16} fill={C.muted}>10 tracker layers in a 2 T field, then a calorimeter</text>
        <text className="t-label" x={400} y={358} fontFamily={MONO} fontSize={16} fill={C.muted}>no particle names, no truth</text>
      </Show>

      {/* step 2: the oracle */}
      <Show at={2} step={step}>
        <g transform="translate(400 400)">
          <rect x={0} y={0} width={770} height={56} rx={8} fill={C.tint} stroke={C.accent} strokeWidth={1.5} />
          <text className="t-label" x={20} y={36} fontFamily={MONO} fontSize={19} fill={C.ink}>$ oracle request --beam1 X --beam2 Y --sqrts S --n N</text>
          <text x={0} y={104} fontFamily={SANS} fontSize={26} fill={C.ink}>Every event costs budget; every request lands in a ledger.</text>
          <text className="t-label" x={0} y={138} fontFamily={MONO} fontSize={16} fill={C.muted}>stable beams only · √s up to 500 GeV · 5 × 10⁶ events in total</text>
        </g>
      </Show>
      <Arrow id="r9-up" />
    </Canvas>
  );
}
