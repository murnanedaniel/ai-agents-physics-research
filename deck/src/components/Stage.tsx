"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SCENES } from "@/lib/timeline";
import { useKeyboard } from "@/lib/useKeyboard";
import { useElapsed } from "@/lib/useElapsed";
import { PresenterClock } from "./PresenterClock";
import { SectionFooter } from "./SectionFooter";
import { SCENE_COMPONENTS } from "@/lib/sceneRegistry";

export function Stage() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  // Presenter clock + reset button hidden by default (press P to reveal).
  const [clockVisible, setClockVisible] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [running, setRunning] = useState(false);
  const [keyDebug, setKeyDebug] = useState(false);
  const [sourcesVisible, setSourcesVisible] = useState(false);
  const [lastKey, setLastKey] = useState<string>("");

  const { elapsed, reset } = useElapsed(running);

  // Deep-link: ?scene=<id> or ?s=<index> jumps straight to a scene on load
  // (handy for rehearsing a single beat). Silently ignored if not found.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const byId = params.get("scene");
    const byIdx = params.get("s");
    let idx = -1;
    if (byId) idx = SCENES.findIndex((s) => s.id === byId);
    else if (byIdx) idx = parseInt(byIdx, 10);
    if (idx >= 0 && idx < SCENES.length) {
      setSceneIdx(idx);
      const requestedStep = Number(params.get("step") ?? 0);
      setStepIdx(Number.isFinite(requestedStep) ? Math.max(0, Math.min(SCENES[idx].steps - 1, Math.floor(requestedStep))) : 0);
    }
  }, []);

  const scene = SCENES[sceneIdx];
  const theme = scene.theme;

  const advance = useCallback(() => {
    setRunning(true);
    const current = SCENES[sceneIdx];
    if (stepIdx < current.steps - 1) {
      setStepIdx(stepIdx + 1);
      return;
    }
    if (sceneIdx < SCENES.length - 1) {
      setSceneIdx(sceneIdx + 1);
      setStepIdx(0);
    }
  }, [sceneIdx, stepIdx]);

  const rewind = useCallback(() => {
    if (stepIdx > 0) {
      setStepIdx(stepIdx - 1);
      return;
    }
    if (sceneIdx > 0) {
      const prev = SCENES[sceneIdx - 1];
      setSceneIdx(sceneIdx - 1);
      setStepIdx(Math.max(0, prev.steps - 1));
    }
  }, [sceneIdx, stepIdx]);

  const restart = useCallback(() => {
    setSceneIdx(0);
    setStepIdx(0);
    setRunning(false);
    reset();
  }, [reset]);

  useKeyboard({
    onAdvance: advance,
    onRewind: rewind,
    onToggleClock: () => setClockVisible((v) => !v),
    onToggleFallback: () => setFallback((v) => !v),
    onRestart: restart,
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      setLastKey(e.key);
      if (e.key === "k" || e.key === "K") setKeyDebug((v) => !v);
      if (e.key === "s" || e.key === "S") setSourcesVisible((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const rendered = useMemo(() => {
    const Comp = SCENE_COMPONENTS[scene.id];
    return <Comp key={scene.id} step={stepIdx} onAdvance={advance} />;
  }, [scene, stepIdx, advance]);

  return (
    <motion.div
      className={`relative w-screen h-screen overflow-hidden cursor-pointer select-none ${theme === "light" ? "theme-light" : "theme-dark"}${sourcesVisible ? " show-sources" : ""}`}
      onClick={advance}
      role="button"
      data-scene={scene.id}
      data-step={stepIdx}
      tabIndex={0}
      animate={{ backgroundColor: theme === "light" ? "#f6f1e7" : "#050607" }}
      transition={{ duration: 1.2, ease: [0.65, 0, 0.3, 1] }}
    >
      <AnimatePresence mode="wait">{rendered}</AnimatePresence>

      <SectionFooter sceneIdx={sceneIdx} stepIdx={stepIdx} />




      {clockVisible && (
        <button
          type="button"
          aria-label="Restart from the beginning"
          onClick={(e) => {
            e.stopPropagation();
            restart();
          }}
          className={`fixed top-4 right-4 z-50 h-9 px-3 flex items-center gap-1.5 rounded-full backdrop-blur border text-[11px] font-mono transition ${
            theme === "light"
              ? "bg-white/60 hover:bg-white/80 border-ink/10 text-ink/70"
              : "bg-black/50 hover:bg-black/70 border-white/10 text-zinc-300"
          }`}
        >
          <span className="text-sm leading-none">↺</span>
          <span>reset</span>
        </button>
      )}

      {keyDebug && (
        <div className="fixed top-4 left-4 z-50 font-mono text-[13px] bg-black/80 text-emerald-400 px-3 py-2 rounded border border-white/10">
          last key: <strong>{lastKey || "—"}</strong>
          <div className="text-[10px] text-zinc-500 mt-0.5">K to hide</div>
        </div>
      )}

      {clockVisible && (
        <PresenterClock
          elapsed={elapsed}
          sceneIdx={sceneIdx}
          stepIdx={stepIdx}
          total={SCENES.length}
          fallback={fallback}
          running={running}
        />
      )}

      {/* Hide the Next.js dev indicator (the N icon bottom-left) when the
          presenter clock is hidden — talk-mode is meant to be a clean canvas. */}
      {!clockVisible && (
        <style>{`nextjs-portal { display: none !important; }`}</style>
      )}
    </motion.div>
  );
}
