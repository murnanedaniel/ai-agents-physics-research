"use client";

import { C, Canvas, MONO, SANS, SERIF, Show } from "./kit";

// p-tracking: a transverse event view with the beam spot off the axis.
// Step 0: one track fitted on its own. Step 1: every track also sees an event
// token, which carries the beam spot. Step 2: today's run.
const CX = 260, CY = 250, R = 220;
const BS = { x: CX + 26, y: CY - 18 }; // displaced beam spot (exaggerated)
const TRACKS = [[0.25, 0.0016], [1.05, -0.0042], [1.75, 0.0009], [2.6, -0.0024], [3.3, 0.0035], [4.15, -0.0012], [4.9, 0.0027], [5.6, -0.0006]].map(([a, k]) => ({ a, k }));

function trackPath(a: number, k: number) {
  const pts: string[] = [];
  for (let s = 0; s <= 190; s += 10) {
    const th = a + k * s;
    pts.push(`${(BS.x + s * Math.cos(th)).toFixed(1)},${(BS.y + s * Math.sin(th)).toFixed(1)}`);
  }
  return "M " + pts.join(" L ");
}

export function TrackTogether({ step }: { step: number }) {
  const together = step >= 1;
  return (
    <Canvas label="An event seen along the beam: tracks from a displaced beam spot, first fitted one at a time, then together through an event token">
      {[60, 100, 140, 180, 220].map((r) => <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke={C.rule} strokeWidth={1.2} />)}
      <line x1={CX - 8} x2={CX + 8} y1={CY} y2={CY} stroke={C.muted} strokeWidth={1.5} />
      <line x1={CX} x2={CX} y1={CY - 8} y2={CY + 8} stroke={C.muted} strokeWidth={1.5} />
      {TRACKS.map((t, i) => {
        const lit = together || i === 1;
        return <path key={i} d={trackPath(t.a, t.k)} fill="none" stroke={lit ? C.accent : C.faint} strokeWidth={lit ? 3 : 2} opacity={lit ? 1 : 0.7} />;
      })}
      <Show at={1} step={step}>
        <circle cx={BS.x} cy={BS.y} r={9} fill={C.warm} />
        <line x1={BS.x} y1={BS.y} x2={BS.x + 250} y2={BS.y + 225} stroke={C.warm} strokeWidth={1} />
        <text className="t-label" x={BS.x + 256} y={BS.y + 246} fontFamily={MONO} fontSize={16} fill={C.warm}>beam spot, offset exaggerated</text>
        {TRACKS.map((t, i) => {
          const ex = BS.x + 190 * Math.cos(t.a + t.k * 190), ey = BS.y + 190 * Math.sin(t.a + t.k * 190);
          return <line key={i} x1={ex} y1={ey} x2={560} y2={250} stroke={C.warm} strokeWidth={1} opacity={0.35} />;
        })}
        <rect x={560} y={226} width={90} height={48} rx={8} fill={C.warmTint} stroke={C.warm} />
        <text className="t-label" x={605} y={257} textAnchor="middle" fontFamily={MONO} fontSize={18} fill={C.ink}>[EVT]</text>
      </Show>

      <g transform="translate(700 70)">
        <text x={0} y={0} fontFamily={SANS} fontSize={26} fill={together ? C.muted : C.ink}>one track at a time</text>
        <Show at={1} step={step}>
          <text x={0} y={60} fontFamily={SANS} fontSize={26} fill={C.ink}>all tracks at once</text>
          <text x={0} y={160} fontFamily={SERIF} fontStyle="italic" fontSize={84} fill={C.accent}>1.85×</text>
          <text x={0} y={200} fontFamily={SANS} fontSize={22} fill={C.ink}>better d0 than a matched</text>
          <text x={0} y={228} fontFamily={SANS} fontSize={22} fill={C.ink}>per-track control</text>
          <text className="t-label" x={0} y={260} fontFamily={MONO} fontSize={15} fill={C.muted}>one run, no seed spread; tt̄ without pile-up</text>
        </Show>
      </g>
      <Show at={2} step={step}>
        <g transform="translate(700 380)">
          <text x={0} y={0} fontFamily={SANS} fontSize={24} fill={C.ink}>Today: four sequence models</text>
          {["minGRU", "Mamba-2", "Transformer", "diagonal SSM"].map((m, i) => {
            const x = ["minGRU", "Mamba-2", "Transformer", "diagonal SSM"].slice(0, i).reduce((acc, n) => acc + n.length * 10.6 + 34, 0);
            return (
              <g key={m}>
                <rect x={x} y={22} width={m.length * 10.6 + 20} height={36} rx={18} fill={C.tint} />
                <text className="t-label" x={x + 10} y={46} fontFamily={MONO} fontSize={17} fill={C.ink}>{m}</text>
              </g>
            );
          })}
        </g>
      </Show>
    </Canvas>
  );
}
