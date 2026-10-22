"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Area, C, T, stop } from "../r11/kit";
import { EDGES, NODES, PAIR, RESEARCHERS, SECTIONS, sectionColor } from "./nbi";
import { ResearchGraph } from "./ResearchGraph";

// collab: the NBI collaboration graph, ported from NBI-AI-future
// (scenes/NbiGraph.tsx). The original drew it with three.js; this port projects
// the same 3D layout onto a 2D canvas so the deck needs no new dependency.
// Kept from the original: slow auto-rotation, drag to rotate, double-click to
// zoom, hover for detail, faint nearest-neighbour links and amber mutual
// "bridges", and the two-stage roulette (sections, then one person in each)
// that lands on a fixed pair. Names are hidden throughout; hover shows the
// section only. A "flat view" button swaps in the ResearchGraph explorer.
// Steps: 0 graph · 1 section roulette · 2 person roulette, pair revealed.

type Phase = "idle" | "sections" | "sectionsLock" | "people" | "peopleLock";
const SA = NODES[PAIR[0]].s, SB = NODES[PAIR[1]].s;
const PAIR_EDGE = EDGES.find((e) => (e.a === PAIR[0] && e.b === PAIR[1]) || (e.a === PAIR[1] && e.b === PAIR[0]));

function useRoulette(step: number) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [spotS, setSpotS] = useState<[number, number] | null>(null);
  const [spotN, setSpotN] = useState<[number, number] | null>(null);
  useEffect(() => {
    let timer = 0;
    let alive = true;
    const run = (kind: "sections" | "people") => {
      const start = performance.now();
      const poolA = NODES.map((n, i) => (n.s === SA ? i : -1)).filter((i) => i >= 0);
      const poolB = NODES.map((n, i) => (n.s === SB ? i : -1)).filter((i) => i >= 0);
      const tick = () => {
        if (!alive) return;
        const t = Math.min(1, (performance.now() - start) / 3000);
        if (t >= 1) {
          if (kind === "sections") { setSpotS([SA, SB]); timer = window.setTimeout(() => alive && setPhase("sectionsLock"), 600); }
          else { setSpotS([SA, SB]); setSpotN(PAIR); timer = window.setTimeout(() => alive && setPhase("peopleLock"), 700); }
          return;
        }
        if (kind === "sections") {
          const a = Math.floor(Math.random() * SECTIONS.length);
          let b = Math.floor(Math.random() * SECTIONS.length);
          if (b === a) b = (b + 1) % SECTIONS.length;
          setSpotS(t > 0.7 && Math.random() < 0.4 ? [SA, b] : [a, b]);
        } else {
          const a = t > 0.7 && Math.random() < 0.5 ? PAIR[0] : poolA[Math.floor(Math.random() * poolA.length)];
          const b = t > 0.7 && Math.random() < 0.5 ? PAIR[1] : poolB[Math.floor(Math.random() * poolB.length)];
          setSpotN([a, b]);
        }
        timer = window.setTimeout(tick, 75 + 280 * t * t);
      };
      tick();
    };
    // start on the next tick, so no state is set synchronously in the effect
    timer = window.setTimeout(() => {
      if (!alive) return;
      if (step <= 0) { setPhase("idle"); setSpotS(null); setSpotN(null); }
      else if (step === 1) { setPhase("sections"); setSpotN(null); run("sections"); }
      else { setPhase("people"); setSpotS([SA, SB]); run("people"); }
    }, 0);
    return () => { alive = false; window.clearTimeout(timer); };
  }, [step]);
  return { phase, spotS, spotN };
}

export function NbiGraph({ step }: { step: number }) {
  const [flat, setFlat] = useState(false);
  const { phase, spotS, spotN } = useRoulette(step);
  const [hover, setHover] = useState<number | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const state = useRef({ phase, spotS, spotN });
  useEffect(() => { state.current = { phase, spotS, spotN }; }, [phase, spotS, spotN]);

  const degree = useMemo(() => {
    const d = new Array(NODES.length).fill(0) as number[];
    for (const e of EDGES) { d[e.a]++; d[e.b]++; }
    return d;
  }, []);

  useEffect(() => {
    if (flat) return;
    const mount = mountRef.current;
    if (!mount) return;
    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.cursor = "grab";
    mount.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = mount.clientWidth; h = mount.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // camera and interaction, as in the three.js original
    let rotY = 0.4, rotX = -0.15, camZ = 2.6, camZTarget = 2.6;
    let dragging = false, last = { x: 0, y: 0 }, lastInteraction = 0;
    let mouse: { x: number; y: number } | null = null;
    const F = 1 / Math.tan((55 / 2) * Math.PI / 180);
    const size = NODES.map(() => 0.02), alpha = NODES.map(() => 0.95);
    const proj = NODES.map(() => ({ x: 0, y: 0, z: 0, k: 1 }));

    const down = (ev: PointerEvent) => { ev.stopPropagation(); dragging = true; last = { x: ev.clientX, y: ev.clientY }; lastInteraction = performance.now(); canvas.setPointerCapture?.(ev.pointerId); canvas.style.cursor = "grabbing"; };
    const move = (ev: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse = { x: ev.clientX - r.left, y: ev.clientY - r.top };
      if (dragging) {
        rotY += (ev.clientX - last.x) * 0.007;
        rotX = Math.max(-1.2, Math.min(1.2, rotX + (ev.clientY - last.y) * 0.007));
        last = { x: ev.clientX, y: ev.clientY };
        lastInteraction = performance.now();
      }
    };
    const up = () => { dragging = false; canvas.style.cursor = "grab"; lastInteraction = performance.now(); };
    const leave = () => { mouse = null; };
    const dbl = (ev: MouseEvent) => { ev.stopPropagation(); camZTarget = camZTarget > 2 ? 1.6 : 2.6; lastInteraction = performance.now(); };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    window.addEventListener("pointerup", up);
    canvas.addEventListener("dblclick", dbl);
    canvas.addEventListener("click", stop as unknown as EventListener);

    let raf = 0, lastT = performance.now(), hoverIdx: number | null = null;
    const frame = () => {
      const now = performance.now();
      const dt = Math.min(0.05, (now - lastT) / 1000);
      lastT = now;
      if (!dragging && now - lastInteraction > 1500) rotY += 0.08 * dt;
      camZ += (camZTarget - camZ) * Math.min(1, dt * 4);
      const { phase: ph, spotS: sS, spotN: sN } = state.current;
      const cy = Math.cos(rotY), sy = Math.sin(rotY), cx = Math.cos(rotX), sx = Math.sin(rotX);
      const scale = (Math.min(w, h) / 2) * F;
      NODES.forEach((n, i) => {
        const X = (n.x - 0.5) * 1.8, Y = (n.y - 0.5) * 1.8, Z = (n.z - 0.5) * 1.8;
        const x1 = X * cy + Z * sy, z1 = -X * sy + Z * cy;
        const y2 = Y * cx - z1 * sx, z2 = Y * sx + z1 * cx;
        const k = scale / (camZ - z2);
        proj[i] = { x: w / 2 + x1 * k, y: h / 2 - y2 * k, z: z2, k };
        // per-phase targets (sizes in scene units, as in the original)
        let ts = 0.02, ta = 0.95;
        if (ph === "sections" || ph === "sectionsLock") {
          const on = sS && (n.s === sS[0] || n.s === sS[1]);
          ts = on ? 0.028 : 0.016; ta = on ? 1 : 0.12;
        } else if (ph === "people" || ph === "peopleLock") {
          const inSec = n.s === SA || n.s === SB;
          const spot = sN && (i === sN[0] || i === sN[1]);
          ts = !inSec ? 0.012 : spot ? 0.05 : 0.018;
          ta = !inSec ? 0.06 : spot ? 1 : 0.35;
          if (ph === "peopleLock" && (i === PAIR[0] || i === PAIR[1])) ts = 0.05 * (1 + 0.2 * Math.sin(now * 0.006));
        }
        if (ph === "idle" && i === hoverIdx) { ts *= 1.8; ta = 1; }
        size[i] += (ts - size[i]) * Math.min(1, dt * 6);
        alpha[i] += (ta - alpha[i]) * Math.min(1, dt * 6);
      });

      // hover: nearest projected node within 12 px
      let best: number | null = null, bd = 144;
      if (mouse && !dragging) {
        proj.forEach((p, i) => { const d = (p.x - mouse!.x) ** 2 + (p.y - mouse!.y) ** 2; if (d < bd) { bd = d; best = i; } });
      }
      if (best !== hoverIdx) { hoverIdx = best; setHover(best); }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const nnA = ph === "peopleLock" ? 0.05 : ph === "idle" ? 0.22 : 0.1;
      const brA = ph === "peopleLock" ? 0.35 : 0.85;
      ctx.lineWidth = 1;
      for (const e of EDGES) {
        if (e.mutual) continue;
        const a = proj[e.a], b = proj[e.b];
        ctx.strokeStyle = `rgba(74,74,79,${nnA})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      ctx.lineWidth = 2;
      for (const e of EDGES) {
        if (!e.mutual) continue;
        const a = proj[e.a], b = proj[e.b];
        ctx.strokeStyle = `rgba(217,119,6,${brA})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      if (ph === "peopleLock") {
        const a = proj[PAIR[0]], b = proj[PAIR[1]];
        ctx.lineWidth = 4; ctx.strokeStyle = "rgba(154,74,11,0.95)";
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      // nodes, far to near
      const order = proj.map((p, i) => [p.z, i] as const).sort((p, q) => p[0] - q[0]);
      for (const [, i] of order) {
        const p = proj[i];
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha[i]));
        ctx.fillStyle = sectionColor(NODES[i].s);
        ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(1.5, size[i] * p.k), 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerup", up);
      canvas.removeEventListener("dblclick", dbl);
      canvas.removeEventListener("click", stop as unknown as EventListener);
      mount.removeChild(canvas);
    };
  }, [flat]);

  const caption =
    step <= 0 ? "Each dot is a professor, placed by their background. Amber links join pairs whose recent papers are close although their backgrounds are far apart."
      : step === 1 ? "Spin for two sections."
        : phase === "peopleLock" ? "Then one person in each. Different sections and backgrounds, but their recent work points at the same question."
          : "Then one person in each.";

  return (
    <Area>
      <div className="flex items-center justify-between" onClick={stop}>
        <span className="t-label" style={{ ...T.label, ...T.mono, color: C.muted }}>
          124 NBI faculty · names hidden · {flat ? "click a dot to inspect" : "drag to rotate, double-click to zoom"}
        </span>
        <button type="button" onClick={(e) => { stop(e); setFlat((f) => !f); }} className="t-label rounded-full px-3 py-1"
          style={{ ...T.label, border: `1px solid ${C.rule}`, color: C.accent, cursor: "pointer", background: "transparent" }}>
          {flat ? "3D view" : "flat view"}
        </button>
      </div>
      <div className="relative min-h-0 flex-1" onClick={stop}>
        {flat ? <ResearchGraph /> : <div ref={mountRef} className="absolute inset-0" />}
        {!flat && hover !== null && phase === "idle" && (
          <div className="t-label pointer-events-none absolute bottom-2 left-2 rounded-md px-3 py-2" style={{ ...T.label, background: C.card, border: `1px solid ${C.rule}`, color: C.ink }}>
            <span style={{ display: "inline-block", width: 12, height: 12, borderRadius: 6, background: sectionColor(NODES[hover].s), marginRight: 8 }} />
            {SECTIONS[NODES[hover].s]} · {degree[hover]} links
          </div>
        )}
        {!flat && (phase === "sections" || phase === "sectionsLock") && spotS && (
          <div className="pointer-events-none absolute right-2 top-2 text-right" style={{ ...T.body, color: C.ink }}>
            <div style={{ color: sectionColor(spotS[0]) }}>{SECTIONS[spotS[0]]}</div>
            <div className="t-label" style={{ ...T.label, color: C.muted }}>×</div>
            <div style={{ color: sectionColor(spotS[1]) }}>{SECTIONS[spotS[1]]}</div>
          </div>
        )}
        <AnimatePresence>
          {!flat && phase === "peopleLock" && (["a", "b"] as const).map((k) => {
            const r = RESEARCHERS[k];
            return (
              <motion.div key={k} className="pointer-events-none absolute rounded-md px-4 py-3"
                style={{ top: "30%", [k === "a" ? "left" : "right"]: 0, width: "22vw", background: C.card, border: `2px solid ${sectionColor(r.s)}`, textAlign: k === "a" ? "left" : "right" }}
                initial={{ opacity: 0, x: k === "a" ? -24 : 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <div style={{ ...T.big, ...T.serif, color: C.ink }}>{r.label}</div>
                <div style={{ ...T.body, color: sectionColor(r.s) }}>{r.field}</div>
                <div className="t-label" style={{ ...T.label, color: C.muted }}>{r.detail}</div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <div className="text-center" style={{ ...T.body, color: C.ink, minHeight: "2.7em" }}>
        {flat ? "Click a dot: its links are ranked by how close the recent work is minus how close the backgrounds are." : caption}
        {!flat && phase === "peopleLock" && PAIR_EDGE && (
          <div className="t-label" style={{ ...T.label, ...T.mono, color: C.muted }}>
            recent-work similarity {PAIR_EDGE.w.toFixed(2)} · background similarity {PAIR_EDGE.p.toFixed(2)}
          </div>
        )}
      </div>
    </Area>
  );
}
