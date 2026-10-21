"use client";

import { useEffect, useRef, useState } from "react";
import { Area, D, Label, MONO, SERIF, Show, T, fitCanvas } from "./kit";

// eth-rate: ported from the ETH deck's RateRamp (three.js, 6 steps) to a 2D
// canvas with 3 steps.
//   step 0: two protons meet, one burst of tracks (one crossing, every 25 ns)
//   step 1: the rate ramps by itself: 2, 5, 10, 1,000 per second
//   step 2: the grid fills (40 million per second) and the trigger chain appears
// Numbers: FACTS.md in the ETH repo (CERN-2020-010; ATLAS-TDR-029).

type Phase = { count: string; label: string; hz: number | null };
const RAMP: Phase[] = [
  { count: "2", label: "per second: you can follow each one", hz: 2 },
  { count: "5", label: "per second: borderline", hz: 5 },
  { count: "10", label: "per second: losing it", hz: 10 },
  { count: "1,000", label: "per second: just a blur", hz: 1000 },
];
const RAMP_MS = 1900; // time on each ramp phase before the next

const VIEW_H = 18; // world units across the canvas height (as in ETH)
const FOCAL_SCALE = 4.8;
const TRACKS = 32;
const PROTON_MS = 1500;
const PROTON_DELAY_MS = 500;
const TARGET_CELLS = 9000;

type Burst = { lines: Float32Array; cols: string[]; born: number; life: number };

function makeBurst(now: number, life: number): Burst {
  const lines = new Float32Array(TRACKS * 2);
  const cols: string[] = [];
  for (let t = 0; t < TRACKS; t++) {
    const phi = Math.random() * Math.PI * 2;
    const eta = (Math.random() - 0.5) * 2.5;
    const theta = 2 * Math.atan(Math.exp(-eta));
    const len = FOCAL_SCALE * (0.9 + Math.random() * 0.6);
    lines[t * 2] = Math.sin(theta) * Math.cos(phi) * len;
    lines[t * 2 + 1] = Math.cos(theta) * len;
    const b = 0.45 + Math.random() * 0.55;
    cols.push(`rgb(${Math.round(b * 0.55 * 255)},${Math.round(b * 0.92 * 255)},${Math.round(b * 255)})`);
  }
  return { lines, cols, born: now, life };
}

export function RateRamp({ step }: { step: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stepRef = useRef(step);
  const [phase, setPhase] = useState(0);
  const measuredRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let size = fitCanvas(canvas);
    const onResize = () => { size = fitCanvas(canvas); };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const t0 = performance.now();
    let prevStep = -1;
    let stepStart = t0;
    let lastBurst = t0;
    let lastPhase = -1;
    let bursts: Burst[] = [];
    let protonsDone = false;
    // grid state
    let cols = 0, rows = 0, total = 0, active = 0;
    let cellLen = 0;
    let fired = 0, windowStart = t0;

    const loop = () => {
      const now = performance.now();
      const s = Math.min(2, Math.max(0, stepRef.current));
      const { w, h, dpr } = size;
      const k = (h / VIEW_H) * dpr; // world unit -> device px
      const cx = (w / 2) * dpr, cy = (h / 2) * dpr;

      if (s !== prevStep) {
        prevStep = s;
        stepStart = now;
        lastBurst = now;
        bursts = [];
        if (s === 0) protonsDone = false;
        if (s === 2) {
          const aspect = w / h;
          rows = Math.round(Math.sqrt(TARGET_CELLS / aspect));
          cols = Math.round(aspect * rows);
          total = rows * cols;
          active = 0;
          cellLen = Math.min(w / cols, h / rows) * 0.75 * dpr;
          fired = 0;
          windowStart = now;
        }
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      // beam line, fading as the rate climbs
      const beamAlpha = s === 0 ? 0.55 : s === 1 ? 0.25 : 0;
      if (beamAlpha > 0) {
        ctx.globalAlpha = beamAlpha;
        ctx.strokeStyle = D.accent;
        ctx.lineWidth = 1.2 * dpr;
        ctx.beginPath();
        ctx.moveTo(0, cy);
        ctx.lineTo(canvas.width, cy);
        ctx.stroke();
      }

      if (s === 0) {
        const t = now - stepStart - PROTON_DELAY_MS;
        if (!protonsDone) {
          const u = Math.max(0, Math.min(1, t / PROTON_MS));
          const e = 1 - (1 - u) * (1 - u);
          const fade = Math.max(0, Math.min(1, (now - stepStart) / PROTON_DELAY_MS));
          ctx.globalAlpha = fade * (1 - e * 0.4);
          ctx.fillStyle = "#fde68a";
          for (const dir of [-1, 1]) {
            ctx.beginPath();
            ctx.arc(cx + dir * cx * (1 - e), cy, 0.08 * k * 1.6, 0, Math.PI * 2);
            ctx.fill();
          }
          if (u >= 1) {
            protonsDone = true;
            bursts.push(makeBurst(now, Infinity));
          }
        }
      }

      if (s === 1) {
        const p = Math.min(RAMP.length - 1, Math.floor((now - stepStart) / RAMP_MS));
        if (p !== lastPhase) {
          lastPhase = p;
          setPhase(p);
        }
        const hz = RAMP[p].hz ?? 1;
        const interval = 1000 / hz;
        let spawns = 0;
        if (now - lastBurst > 1000) lastBurst = now - interval; // after a pause, do not flood
        while (now - lastBurst >= interval && spawns < 24) {
          lastBurst += interval;
          bursts.push(makeBurst(now, Math.max(133, 800 / hz)));
          spawns++;
        }
      } else if (lastPhase !== -1) {
        lastPhase = -1;
      }

      // draw and cull bursts
      ctx.lineWidth = 1.3 * dpr;
      const keep: Burst[] = [];
      for (const b of bursts) {
        const lt = Math.min(1, (now - b.born) / b.life);
        if (lt >= 1) continue;
        keep.push(b);
        const a = (1 - lt * lt) * (s === 0 ? 0.95 : 0.85);
        ctx.globalAlpha = a;
        for (let t = 0; t < TRACKS; t++) {
          ctx.strokeStyle = b.cols[t];
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + b.lines[t * 2] * k, cy - b.lines[t * 2 + 1] * k);
          ctx.stroke();
        }
      }
      bursts = keep;

      if (s === 2) {
        if (active < total) active = Math.min(total, active + Math.max(64, Math.ceil(total / 90)));
        const cw = (w / cols) * dpr, ch = (h / rows) * dpr;
        const paths = [new Path2D(), new Path2D(), new Path2D(), new Path2D()];
        let n = 0;
        for (let c = 0; c < active; c++) {
          if (Math.random() >= 0.95) continue;
          n++;
          const x = (c % cols + 0.5) * cw;
          const y = (Math.floor(c / cols) + 0.5) * ch;
          const a = Math.random() * Math.PI * 2;
          const len = cellLen * (0.6 + Math.random() * 0.8);
          const path = paths[(Math.random() * 4) | 0];
          path.moveTo(x, y);
          path.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
        }
        ctx.lineWidth = 1 * dpr;
        ctx.globalAlpha = 0.9;
        paths.forEach((path, i) => {
          const b = 0.4 + (i + 0.5) * 0.15;
          ctx.strokeStyle = `rgb(${Math.round(b * 0.55 * 255)},${Math.round(b * 0.92 * 255)},${Math.round(b * 255)})`;
          ctx.stroke(path);
        });
        fired += n;
        if (now - windowStart >= 500) {
          const eps = Math.round((fired * 1000) / (now - windowStart));
          if (measuredRef.current) measuredRef.current.textContent = eps.toLocaleString("en-GB");
          fired = 0;
          windowStart = now;
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const count = step <= 0 ? "1" : step === 1 ? RAMP[phase].count : "40,000,000";
  const label =
    step <= 0 ? "bunch crossing, every 25 nanoseconds" : step === 1 ? RAMP[phase].label : "bunch crossings per second";

  return (
    <Area style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", columnGap: "3vw" }}>
      <div style={{ position: "relative", minHeight: 0, minWidth: 0 }}>
        <canvas ref={canvasRef} role="img" aria-label="Proton bunches cross and tracks burst out; the rate climbs until the screen is a grid of flickering collisions" style={{ position: "absolute", inset: 0 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", minHeight: 0 }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ ...T.huge, fontFamily: SERIF, fontStyle: "italic", color: D.ink, fontVariantNumeric: "tabular-nums" }}>{count}</div>
          <div style={{ ...T.body, fontFamily: MONO, color: D.muted, marginTop: "1vh" }}>{label}</div>
          <Show when={step >= 2} style={{ marginTop: "0.6vh" }}>
            <Label>this screen draws about <span ref={measuredRef}>…</span> per second</Label>
          </Show>
        </div>

        <Show when={step >= 2} delay={0.5} style={{ marginTop: "4vh", display: "flex", flexDirection: "column", gap: "1.8vh" }}>
          {[
            ["40 MHz", "HL-LHC: about 200 collisions in each crossing"],
            ["1 MHz", "kept by the first-level trigger"],
            ["150 kHz", "full-event tracking in the event filter"],
          ].map(([rate, what], i) => (
            <div key={rate} style={{ display: "grid", gridTemplateColumns: "7.5em 1fr", alignItems: "baseline", borderLeft: `3px solid ${i === 2 ? D.warm : D.accentLine}`, paddingLeft: 14 }}>
              <span style={{ ...T.body, fontFamily: MONO, color: i === 2 ? D.warm : D.accent }}>{rate}</span>
              <span style={{ ...T.body, color: D.body }}>{what}</span>
            </div>
          ))}
          <div style={{ ...T.body, ...T.serif, color: D.ink, marginTop: "1.5vh" }}>
            Everything else is gone for good. We decide in real time, and the decision needs tracks.
          </div>
        </Show>
      </div>
    </Area>
  );
}
