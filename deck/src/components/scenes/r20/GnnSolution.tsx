"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";
import { Area, D, Label, Show, T, fitCanvas } from "./kit";

// eth-gnn: ported from the ETH deck's GnnSolution (three.js, 4 steps) to a 2D
// canvas with 3 steps. The ETH version drew an internal detector event; this
// one draws an OPEN event instead:
//   ColliderML Release 1 (CC BY 4.0), huggingface.co/datasets/CERN/ColliderML-Release-1,
//   ttbar_pu200_tracker_hits, shard train-00000-of-01000, event_id 0 (Open Data Detector,
//   ttbar + 200 pile-up, Geant4). Built by scripts/r20/make_odd_event.py into
//   public/r20/odd_event.bin: barrel hits with |z| < 1 m in x-y, geometric candidate edges
//   between neighbouring layers, truth flags from particle_id.
//   step 0: the hits
//   step 1: every nearby pair joined (candidate edges, random order)
//   step 2: ten message-passing "beats"; false edges fade, true ones take their particle's colour
// The final picture uses simulation truth: it shows what a good edge classifier
// would keep, not the output of a trained network.

const MAGIC = 0x46415247; // "GRAF"
const EXTENT_MM = 1060; // half-width of the square view
const APPEAR_MS = 2200;
const CONVERGE_MS = 5000;
const ITERATIONS = 10;

type EventData = {
  nHits: number;
  nEdges: number;
  nFocus: number;
  hits: Float32Array; // mm, x y interleaved
  trackId: Int16Array;
  edges: Uint32Array;
  flag: Uint8Array;
};

function parse(buf: ArrayBuffer): EventData {
  const dv = new DataView(buf);
  if (dv.getUint32(0, true) !== MAGIC) throw new Error("odd_event.bin: bad magic");
  const nHits = dv.getUint32(4, true);
  const nEdges = dv.getUint32(8, true);
  const nFocus = dv.getUint32(12, true);
  const scale = dv.getFloat32(16, true);
  let off = 24;
  const raw = new Int16Array(buf, off, nHits * 2);
  off += nHits * 4;
  const trackId = new Int16Array(buf, off, nHits);
  off += nHits * 2;
  off = (off + 3) & ~3;
  const edges = new Uint32Array(buf, off, nEdges * 2);
  off += nEdges * 8;
  const flag = new Uint8Array(buf, off, nEdges);
  const hits = new Float32Array(nHits * 2);
  for (let i = 0; i < nHits * 2; i++) hits[i] = raw[i] / scale;
  return { nHits, nEdges, nFocus, hits, trackId, edges, flag };
}

// Golden-angle hues so neighbouring particles get distinct colours (as in ETH).
const focusColor = (i: number) => `hsl(${(i * 137.508) % 360}, 72%, 60%)`;
const CHAOS_HUES = 12;
const chaosColor = (b: number) => `hsl(${(b * 360) / CHAOS_HUES}, 82%, 62%)`;

function makeLayer(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

export function GnnSolution({ step }: { step: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stepRef = useRef(step);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let disposed = false;
    let raf = 0;
    let onResize: (() => void) | null = null;

    (async () => {
      const res = await fetch(asset("/r20/odd_event.bin"));
      if (!res.ok || disposed) return;
      const data = parse(await res.arrayBuffer());
      if (disposed) return;
      const { nHits, nEdges, hits, trackId, edges, flag } = data;

      let W = 1, H = 1, px = 1, ox = 0, oy = 0, dpr = 1;
      let hitsBase = makeLayer(1, 1), hitsTrack = makeLayer(1, 1), chaos = makeLayer(1, 1), truth = makeLayer(1, 1);
      let drawn = 0; // candidate edges drawn so far onto `chaos`

      const X = (i: number) => ox + hits[i * 2] * px;
      const Y = (i: number) => oy - hits[i * 2 + 1] * px;

      const drawChaos = (from: number, to: number) => {
        const c = chaos.getContext("2d")!;
        c.lineWidth = 0.6 * dpr;
        c.globalAlpha = 0.26;
        const paths: Path2D[] = Array.from({ length: CHAOS_HUES }, () => new Path2D());
        for (let e = from; e < to; e++) {
          const a = edges[e * 2], b = edges[e * 2 + 1];
          const p = paths[(e * 7919) % CHAOS_HUES];
          p.moveTo(X(a), Y(a));
          p.lineTo(X(b), Y(b));
        }
        paths.forEach((p, i) => { c.strokeStyle = chaosColor(i); c.stroke(p); });
      };

      const build = () => {
        const size = fitCanvas(canvas);
        dpr = size.dpr;
        W = canvas.width; H = canvas.height;
        const side = Math.min(W, H);
        px = side / (2 * EXTENT_MM);
        ox = W / 2; oy = H / 2;
        hitsBase = makeLayer(W, H); hitsTrack = makeLayer(W, H); chaos = makeLayer(W, H); truth = makeLayer(W, H);
        const r = Math.max(1, 1.1 * dpr);

        // hits: sky blue, then coloured by particle (others grey)
        const hb = hitsBase.getContext("2d")!;
        hb.fillStyle = "rgb(125,212,252)";
        hb.globalAlpha = 0.9;
        const ht = hitsTrack.getContext("2d")!;
        ht.globalAlpha = 0.9;
        ht.fillStyle = "rgb(102,112,128)";
        for (let i = 0; i < nHits; i++) {
          hb.fillRect(X(i) - r / 2, Y(i) - r / 2, r, r);
          if (trackId[i] < 0) ht.fillRect(X(i) - r / 2, Y(i) - r / 2, r, r);
        }
        for (let i = 0; i < nHits; i++) {
          if (trackId[i] < 0) continue;
          ht.fillStyle = focusColor(trackId[i]);
          ht.fillRect(X(i) - r, Y(i) - r, 2 * r, 2 * r);
        }

        // truth: true edges faint, edges of particles above 1 GeV bright in their colour
        const tc = truth.getContext("2d")!;
        for (let e = 0; e < nEdges; e++) {
          if (flag[e] === 0) continue;
          const a = edges[e * 2], b = edges[e * 2 + 1];
          const focus = flag[e] === 2;
          const id = trackId[a] >= 0 ? trackId[a] : trackId[b];
          tc.globalAlpha = focus ? 0.95 : 0.3;
          tc.lineWidth = (focus ? 1.6 : 0.8) * dpr;
          tc.strokeStyle = id >= 0 ? focusColor(id) : "rgb(115,120,133)";
          tc.beginPath();
          tc.moveTo(X(a), Y(a));
          tc.lineTo(X(b), Y(b));
          tc.stroke();
        }
        if (drawn > 0) drawChaos(0, drawn);
      };
      build();
      let resizeTimer = 0;
      onResize = () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(build, 150);
      };
      window.addEventListener("resize", onResize);

      let last = performance.now();
      let appear = 0; // 0..1 how many candidate edges are on screen
      let fade = 0; // 0..1 chaos layer opacity
      let t = 0; // 0..1 message passing progress
      const loop = () => {
        if (disposed) return;
        const now = performance.now();
        const dt = Math.min(64, now - last);
        last = now;
        const s = stepRef.current;

        if (s >= 1) {
          appear = Math.min(1, appear + dt / APPEAR_MS);
          fade = 1;
          const target = Math.round(appear * nEdges);
          if (target > drawn) { drawChaos(drawn, target); drawn = target; }
        } else if (drawn > 0) {
          fade = Math.max(0, fade - dt / 600);
          if (fade === 0) {
            chaos.getContext("2d")!.clearRect(0, 0, W, H);
            drawn = 0;
            appear = 0;
          }
        }
        t = s >= 2 ? Math.min(1, t + dt / CONVERGE_MS) : Math.max(0, t - dt / (CONVERGE_MS / 2));
        const ts = t * t * (3 - 2 * t);
        const iter = t * ITERATIONS;
        const beat = t > 0.001 && t < 0.999 ? Math.exp(-(iter - Math.floor(iter)) * 7) : 0;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;
        ctx.clearRect(0, 0, W, H);
        if (drawn > 0 && fade > 0) {
          ctx.globalAlpha = fade * (1 - ts);
          ctx.drawImage(chaos, 0, 0);
          if (beat > 0) {
            ctx.globalCompositeOperation = "lighter";
            ctx.globalAlpha = 0.35 * beat * (1 - ts);
            ctx.drawImage(chaos, 0, 0);
            ctx.globalCompositeOperation = "source-over";
          }
        }
        if (ts > 0) {
          ctx.globalAlpha = ts;
          ctx.drawImage(truth, 0, 0);
        }
        ctx.globalAlpha = 1 - ts;
        ctx.drawImage(hitsBase, 0, 0);
        if (ts > 0) {
          ctx.globalAlpha = ts;
          ctx.drawImage(hitsTrack, 0, 0);
        }
        ctx.globalAlpha = 1;
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      if (onResize) window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <Area style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.25fr) minmax(0, 1fr)", columnGap: "3vw" }}>
      <div style={{ position: "relative", minHeight: 0, minWidth: 0 }}>
        <canvas ref={canvasRef} role="img" aria-label="Hits from one simulated collision seen end-on; candidate edges join neighbouring hits, then the false edges fade and the tracks remain in colour" style={{ position: "absolute", inset: 0 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "3vh", minHeight: 0 }}>
        <div style={{ ...T.big, ...T.serif, color: D.ink }}>Treat the hits as a graph.</div>
        <Show when={step >= 0}>
          <div style={{ ...T.body, color: D.soft }}>One simulated collision with 200 pile-up: 214,203 hits.</div>
          <Label>shown: the barrel, |z| &lt; 1 m, 102,748 hits, end-on</Label>
        </Show>
        <Show when={step >= 1}>
          <div style={{ ...T.body, color: D.soft }}>Connect every nearby pair: 615,870 candidate edges. Each one is a hypothesis.</div>
        </Show>
        <Show when={step >= 2}>
          <div style={{ ...T.body, color: D.soft }}>
            A graph neural network passes messages along the edges, ten rounds, and scores each one. We keep the high scores, and the tracks are what&rsquo;s left.
          </div>
          <Label style={{ display: "block", marginTop: "1vh" }}>illustration: edges kept from simulation truth; in colour, the 194 particles above 1 GeV</Label>
        </Show>
      </div>
    </Area>
  );
}
