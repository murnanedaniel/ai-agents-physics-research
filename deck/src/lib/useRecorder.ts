"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export type RecEvent =
  | { t: number; type: "clap"; which: "start" | "end" }
  | { t: number; type: "slide"; sceneIdx: number; sceneId: string; step: number }
  | { t: number; type: "leave" | "return" }
  | { t: number; type: "nav"; open: boolean }
  | { t: number; type: "flag" }
  | { t: number; type: "fullscreen"; on: boolean };
export type RecLog = {
  version: 1;
  startedAt: string;
  userAgent: string;
  viewport: { w: number; h: number; dpr: number };
  events: RecEvent[];
};
type EventInput = RecEvent extends infer E ? E extends RecEvent ? Omit<E, "t"> : never : never;
type Position = { sceneIdx: number; sceneId: string; stepIdx: number; navOpen: boolean };
const CURRENT = "deck-recording-current";
const PREVIOUS = "deck-recording-previous";

export function recordingTime(ms: number) {
  const seconds = Math.floor(ms / 1000);
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function download(log: RecLog) {
  const stamp = log.startedAt.replace(/[-:]/g, "").replace("T", "-").slice(0, 15);
  const url = URL.createObjectURL(new Blob([JSON.stringify(log, null, 2)], { type: "application/json" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `deck-recording-${stamp}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function useRecorder({ sceneIdx, sceneId, stepIdx, navOpen }: Position) {
  const [state, setState] = useState<"disabled" | "armed" | "recording" | "finished">("disabled");
  const [clap, setClap] = useState<"start" | "end" | null>(null);
  const [unfinished, setUnfinished] = useState<RecLog | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const enabled = state !== "disabled";
  const [flagged, setFlagged] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const log = useRef<RecLog | null>(null);
  const origin = useRef(0);
  const active = useRef(false);
  const busy = useRef(false);
  const audio = useRef<AudioContext | null>(null);
  const flagTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const position = useRef({ sceneIdx, sceneId, stepIdx, navOpen });

  const persist = useCallback(() => {
    try {
      localStorage.setItem(CURRENT, JSON.stringify(log.current));
      setStorageError(false);
    } catch { setStorageError(true); }
  }, []);

  const append = useCallback((event: EventInput, now = performance.now()) => {
    if (!active.current || !log.current) return;
    log.current.events.push({ ...event, t: Math.round((now - origin.current) * 10) / 10 } as RecEvent);
    persist();
  }, [persist]);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("record") !== "1") return;
    const frame = requestAnimationFrame(() => {
      setState("armed");
      try {
        const saved = localStorage.getItem(CURRENT);
        if (saved) {
          const parsed: RecLog = JSON.parse(saved);
          if (parsed.version === 1 && typeof parsed.startedAt === "string" && Array.isArray(parsed.events) &&
            !parsed.events.some((event) => event.type === "clap" && event.which === "end")) setUnfinished(parsed);
        }
      } catch { setStorageError(true); }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useLayoutEffect(() => {
    position.current = { sceneIdx, sceneId, stepIdx, navOpen };
  }, [sceneIdx, sceneId, stepIdx, navOpen]);

  // Observe position, rather than individual navigation handlers, to cover every path.
  useEffect(() => {
    append({ type: "slide", sceneIdx, sceneId, step: stepIdx });
  }, [sceneIdx, stepIdx, sceneId, append]);

  useEffect(() => { append({ type: "nav", open: navOpen }); }, [navOpen, append]);

  useLayoutEffect(() => {
    if (!clap) return;
    let timer: ReturnType<typeof setTimeout>;
    // The clap DOM has committed before this frame callback timestamps it.
    const frame = requestAnimationFrame(() => {
      const now = performance.now();
      const wallclock = Date.now();
      if (clap === "start") {
        origin.current = now;
        log.current = {
          version: 1, startedAt: new Date(wallclock).toISOString(), userAgent: navigator.userAgent,
          viewport: { w: window.innerWidth, h: window.innerHeight, dpr: window.devicePixelRatio }, events: [],
        };
        active.current = true;
        append({ type: "clap", which: "start" }, now);
        const current = position.current;
        append({ type: "slide", sceneIdx: current.sceneIdx, sceneId: current.sceneId, step: current.stepIdx }, now);
      } else {
        append({ type: "clap", which: "end" }, now);
        active.current = false;
        setElapsed(now - origin.current);
      }
      const context = audio.current;
      if (context && context.state !== "closed") {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = 1000;
        gain.gain.value = 0.5;
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.3);
        oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
      }
      timer = setTimeout(() => {
        setClap(null);
        busy.current = false;
        setState(clap === "start" ? "recording" : "finished");
        if (clap === "end" && log.current) {
          setEventCount(log.current.events.length);
          download(log.current);
        }
      }, 600);
    });
    return () => { cancelAnimationFrame(frame); clearTimeout(timer); };
  }, [clap, append]);

  useEffect(() => {
    if (state === "disabled") return;
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (!["b", "q", "x"].includes(key)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (event.repeat || busy.current) return;
      if ((key === "b" && state === "armed") || (key === "q" && state === "recording")) {
        if (key === "b") {
          try {
            const previous = localStorage.getItem(CURRENT);
            if (previous) localStorage.setItem(PREVIOUS, previous);
          } catch { setStorageError(true); }
        }
        // AudioContext must be created/resumed in the user gesture.
        try {
          audio.current ??= new AudioContext();
          void audio.current.resume().catch(() => {});
        } catch { /* Visual sync remains available if audio is unavailable. */ }
        busy.current = true;
        setClap(key === "b" ? "start" : "end");
      } else if (key === "x" && state === "recording") {
        append({ type: "flag" });
        setFlagged(true);
        if (flagTimer.current) clearTimeout(flagTimer.current);
        flagTimer.current = setTimeout(() => setFlagged(false), 400);
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [state, append]);

  useEffect(() => {
    if (!enabled) return;
    let lastPresence: "leave" | "return" | null = null;
    const presence = () => {
      if (!active.current) { lastPresence = null; return; }
      const type = document.hidden || !document.hasFocus() ? "leave" : "return";
      if (type !== lastPresence) { append({ type }); lastPresence = type; }
    };
    const fullscreen = () => append({ type: "fullscreen", on: !!document.fullscreenElement });
    document.addEventListener("visibilitychange", presence);
    window.addEventListener("blur", presence);
    window.addEventListener("focus", presence);
    document.addEventListener("fullscreenchange", fullscreen);
    const timer = setInterval(() => {
      if (active.current) setElapsed(performance.now() - origin.current);
    }, 200);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", presence);
      window.removeEventListener("blur", presence);
      window.removeEventListener("focus", presence);
      document.removeEventListener("fullscreenchange", fullscreen);
    };
  }, [enabled, append]);

  useEffect(() => () => {
    if (flagTimer.current) clearTimeout(flagTimer.current);
    if (audio.current) void audio.current.close().catch(() => {});
  }, []);

  return {
    state, clap, elapsed, flagged, unfinished, storageError,
    eventCount,
    downloadAgain: () => { if (log.current) download(log.current); },
    downloadUnfinished: () => { if (unfinished) download(unfinished); },
  };
}
