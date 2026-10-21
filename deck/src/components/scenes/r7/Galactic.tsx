"use client";

import { motion } from "motion/react";
import { C, Canvas, Reveal, T, mono, serif } from "./kit";

// Left: a toy particle box (clumps on filaments plus a uniform background).
// Step 1 runs a real friends-of-friends on these points: link every pair
// closer than B, groups of at least NMIN are halos. Step 2: why it matters.
// FoF: Davis, Efstathiou, Frenk and White, ApJ 292 (1985) 371.
// Quijote: Villaescusa-Navarro et al., ApJS 250 (2020) 2.
function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
}
function gauss(r: () => number) {
  return Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(2 * Math.PI * r());
}

const W = 560, H = 470, B = 17, NMIN = 8;
const NODES = [
  { x: 110, y: 110, n: 34, s: 13 }, { x: 300, y: 80, n: 18, s: 10 }, { x: 460, y: 150, n: 40, s: 15 },
  { x: 220, y: 260, n: 46, s: 16 }, { x: 420, y: 330, n: 26, s: 12 }, { x: 110, y: 380, n: 20, s: 11 },
  { x: 300, y: 410, n: 12, s: 8 },
];
const EDGES = [[0, 1], [1, 2], [0, 3], [3, 4], [2, 4], [3, 5], [5, 6], [6, 4], [1, 3]];

type P = { x: number; y: number };
const POINTS: P[] = (() => {
  const r = rng(11);
  const pts: P[] = [];
  NODES.forEach((h) => { for (let i = 0; i < h.n; i++) pts.push({ x: h.x + gauss(r) * h.s, y: h.y + gauss(r) * h.s }); });
  EDGES.forEach(([a, b]) => {
    const A = NODES[a], Bn = NODES[b];
    for (let i = 0; i < 9; i++) { const t = r(); pts.push({ x: A.x + (Bn.x - A.x) * t + gauss(r) * 9, y: A.y + (Bn.y - A.y) * t + gauss(r) * 9 }); }
  });
  for (let i = 0; i < 45; i++) pts.push({ x: 12 + r() * (W - 24), y: 12 + r() * (H - 24) });
  return pts.filter((p) => p.x > 6 && p.x < W - 6 && p.y > 6 && p.y < H - 6);
})();

// Friends-of-friends with union-find.
const { LINKS, GROUP } = (() => {
  const parent = POINTS.map((_, i) => i);
  const find = (i: number): number => (parent[i] === i ? i : (parent[i] = find(parent[i])));
  const links: [number, number][] = [];
  for (let i = 0; i < POINTS.length; i++) for (let j = i + 1; j < POINTS.length; j++) {
    if (Math.hypot(POINTS[i].x - POINTS[j].x, POINTS[i].y - POINTS[j].y) < B) { links.push([i, j]); parent[find(i)] = find(j); }
  }
  const size = new Map<number, number>();
  POINTS.forEach((_, i) => size.set(find(i), (size.get(find(i)) ?? 0) + 1));
  const group = POINTS.map((_, i) => ((size.get(find(i)) ?? 0) >= NMIN ? find(i) : -1));
  return { LINKS: links, GROUP: group };
})();

export function Galactic({ step }: { step: number }) {
  const linked = step >= 1;
  return (
    <Canvas className="flex items-center gap-[4vw]">
      <div className="h-full flex-[1.05] min-w-0 flex items-center justify-center">
        <svg viewBox={`0 0 ${W} ${H + 30}`} className="h-full max-h-full w-auto max-w-full" role="img" aria-label="A toy box of dark-matter particles; friends-of-friends links close pairs and the linked groups are halos">
          <rect x={0} y={0} width={W} height={H} rx={10} fill="#fbf8f1" stroke={C.rule} />
          {LINKS.map(([a, b], i) => {
            const halo = GROUP[a] >= 0;
            return (
              <motion.line key={i} x1={POINTS[a].x} y1={POINTS[a].y} x2={POINTS[b].x} y2={POINTS[b].y}
                stroke={halo ? C.accent : "#a8a29e"} strokeWidth={halo ? 1.4 : 1} initial={false}
                animate={{ opacity: linked ? (halo ? 0.8 : 0.5) : 0 }} transition={{ duration: 0.8, delay: linked ? (i % 40) * 0.02 : 0 }} />
            );
          })}
          {POINTS.map((p, i) => (
            <motion.circle key={i} cx={p.x} cy={p.y} r={3.6} initial={false}
              animate={{ fill: linked && GROUP[i] >= 0 ? C.accent : "#57534e" }} transition={{ duration: 0.6, delay: linked ? 0.6 : 0 }} />
          ))}
          <motion.g initial={false} animate={{ opacity: linked ? 1 : 0 }} transition={{ duration: 0.6 }} data-reveal={1}>
            <line x1={W - 60} y1={H + 16} x2={W - 60 + B} y2={H + 16} stroke={C.ink} strokeWidth={2.5} />
            <text x={W - 70} y={H + 22} textAnchor="end" fontSize={18} style={mono} fill={C.ink} className="t-label">linking length b</text>
          </motion.g>
        </svg>
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-[4vh]">
        <Reveal at={0} step={step}>
          <div style={{ ...serif, fontSize: T.big, lineHeight: 1.1 }}>Dark-matter particles in a box.</div>
          <div className="mt-2 t-label" style={{ ...mono, fontSize: T.label, color: C.muted }}>a simulated universe, one snapshot</div>
          <div className="mt-3" style={{ fontSize: T.body, lineHeight: 1.3 }}>Gravity pulls the matter into clumps, called halos, joined by filaments.</div>
        </Reveal>
        <Reveal at={1} step={step}>
          <div style={{ fontSize: T.body, lineHeight: 1.3 }}>Link every pair closer than <i>b</i>. Each linked group with enough members is a <span style={{ color: C.accent }}>halo</span>.</div>
          <div className="mt-2 t-label" style={{ ...mono, fontSize: T.label, color: C.muted }}>friends-of-friends (Davis et al. 1985), usually b = 0.2 × mean spacing</div>
        </Reveal>
        <Reveal at={2} step={step}>
          <div style={{ fontSize: T.body, lineHeight: 1.3 }}>Galaxies form inside halos, so counting halos by mass is a test of cosmology.</div>
          <div className="mt-3" style={{ fontSize: T.body, lineHeight: 1.3 }}>Quijote alone has <b style={{ fontWeight: 600 }}>44,100</b> simulations. Each snapshot needs its halos found, so speed matters.</div>
        </Reveal>
      </div>
    </Canvas>
  );
}
