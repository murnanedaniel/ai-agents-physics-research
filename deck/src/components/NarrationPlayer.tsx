"use client";

import { useEffect, useRef, useState } from "react";
import { cueIndexFor, useManifest, type Manifest } from "@/lib/narration";
import { SCENES } from "@/lib/timeline";

type Props = { sceneIdx: number; stepIdx: number; goTo: (sceneIdx: number, stepIdx: number) => void };
type Actions = { toggle: () => void; skip: () => void; position: (scene: number, step: number) => void };

export function NarrationPlayer(props: Props) {
  const manifest = useManifest();
  return manifest ? <LoadedPlayer {...props} manifest={manifest} /> : null;
}

function LoadedPlayer({ manifest, sceneIdx, stepIdx, goTo }: Props & { manifest: Manifest }) {
  const face = useRef<HTMLVideoElement>(null);
  const demo = useRef<HTMLVideoElement>(null);
  const actions = useRef<Actions | null>(null);
  const [playing, setPlaying] = useState(false);
  const [currentCue, setCurrentCue] = useState(-1);
  const [started, setStarted] = useState(false);
  const [captions, setCaptions] = useState(true);
  const [caption, setCaption] = useState("");
  const [notesOpen, setNotesOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [files, setFiles] = useState<{ face?: string; demo?: string }>({});

  useEffect(() => {
    const videos = { face: face.current!, demo: demo.current! };
    let index = -1;
    let active = false;
    let needsSeek = true;
    let pending: { video: HTMLVideoElement; time: number } | null = null;
    let lastPosition: string | null = null;
    let generation = 0;
    let frame = 0;
    let timer: ReturnType<typeof setTimeout>;
    const pause = () => {
      active = false;
      generation++;
      cancelAnimationFrame(frame);
      videos.face.pause();
      videos.demo.pause();
      setPlaying(false);
    };
    const message = (text: string) => {
      clearTimeout(timer);
      setToast(text);
      timer = setTimeout(() => setToast(""), 2000);
    };
    const play = (video: HTMLVideoElement) => {
      const token = ++generation;
      void video.play().catch(() => {
        if (token !== generation) return;
        pause();
        message("Narration unavailable. Press play to retry.");
      });
    };
    const select = (next: number, follow: boolean, continuous = false) => {
      index = next;
      setCurrentCue(next);
      setCaption("");
      const cue = manifest.cues[next];
      if (!cue) { pause(); needsSeek = true; return; }
      if (follow) {
        const scene = SCENES.findIndex((item) => item.id === cue.scene);
        if (scene !== -1) {
          lastPosition = `${scene}:${cue.step}`;
          goTo(scene, cue.step);
        }
      }
      if (!active) { needsSeek = true; return; }
      needsSeek = false;
      setStarted(true);
      const file = manifest.files[cue.file];
      const video = videos[file.kind];
      videos[file.kind === "face" ? "demo" : "face"].pause();
      if (continuous) return;
      generation++;
      video.pause();
      pending = { video, time: cue.t0 };
      if (video.dataset.file !== cue.file || video.error) {
        video.dataset.file = cue.file;
        video.src = manifest.mediaBase + file.src;
        video.poster = file.poster ? manifest.mediaBase + file.poster : "";
        setFiles((previous) => ({ ...previous, [file.kind]: cue.file }));
        video.load();
      }
      if (video.readyState >= 1) {
        video.currentTime = cue.t0;
        pending = null;
      }
      play(video); // Called directly from the first click/key gesture, including while loading.
    };
    const next = (skip = false) => {
      const current = manifest.cues[index];
      const following = manifest.cues[index + 1];
      if (!following) { pause(); needsSeek = true; return; }
      select(index + 1, true, !skip && !!current && current.file === following.file &&
        Math.abs(following.t0 - current.t1) < 0.25);
    };
    const tick = () => {
      const cue = manifest.cues[index];
      if (!active || !cue || pending) return;
      const video = videos[manifest.files[cue.file].kind];
      if (!video.seeking && video.currentTime >= cue.t1) next();
    };
    const metadata = (event: Event) => {
      if (pending?.video === event.target) {
        pending.video.currentTime = pending.time;
        pending = null;
      }
    };
    const ended = (event: Event) => {
      const cue = manifest.cues[index];
      if (active && cue && event.target === videos[manifest.files[cue.file].kind]) next();
    };
    const error = (event: Event) => {
      const cue = manifest.cues[index];
      if (active && cue && event.target === videos[manifest.files[cue.file].kind]) {
        pause(); needsSeek = true;
        message("Narration unavailable. Press play to retry.");
      }
    };
    for (const video of Object.values(videos)) {
      video.addEventListener("loadedmetadata", metadata);
      video.addEventListener("timeupdate", tick);
      video.addEventListener("ended", ended);
      video.addEventListener("error", error);
    }
    const loop = () => { tick(); if (active) frame = requestAnimationFrame(loop); };
    actions.current = {
      toggle: () => {
        if (active) { pause(); return; }
        if (index < 0) { message("No narration for this slide"); return; }
        active = true;
        setPlaying(true);
        frame = requestAnimationFrame(loop);
        if (needsSeek) select(index, true);
        else play(videos[manifest.files[manifest.cues[index].file].kind]);
      },
      skip: () => next(true),
      position: (scene, step) => {
        const position = `${scene}:${step}`;
        if (lastPosition === position) { lastPosition = null; return; }
        lastPosition = null;
        pending = null;
        const found = cueIndexFor(SCENES[scene].id, step, manifest);
        if (found < 0) { pause(); message("No narration for this slide"); }
        select(found, false);
      },
    };
    return () => {
      pause();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      actions.current = null;
      for (const video of Object.values(videos)) {
        video.removeEventListener("loadedmetadata", metadata);
        video.removeEventListener("timeupdate", tick);
        video.removeEventListener("ended", ended);
        video.removeEventListener("error", error);
      }
    };
  }, [manifest, goTo]);

  useEffect(() => { actions.current?.position(sceneIdx, stepIdx); }, [sceneIdx, stepIdx, manifest, goTo]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.repeat || event.ctrlKey || event.metaKey || event.altKey ||
        (event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable=true]"))) return;
      const key = event.key.toLowerCase();
      if (key === "v") actions.current?.toggle();
      else if (key === "c") setCaptions((value) => !value);
      else if (key === "n" && manifest.notes) setNotesOpen((value) => !value);
      else return;
      event.preventDefault();
      event.stopPropagation();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [manifest]);

  const cue = manifest.cues[currentCue];
  const kind = cue ? manifest.files[cue.file].kind : null;
  useEffect(() => {
    const video = kind === "face" ? face.current : kind === "demo" ? demo.current : null;
    const track = video?.textTracks[0];
    if (!track) return;
    track.mode = "hidden";
    const update = () => setCaption(Array.from(track.activeCues ?? []).map((item) => (item as VTTCue).text).join("\n"));
    track.addEventListener("cuechange", update);
    update();
    return () => track.removeEventListener("cuechange", update);
  }, [kind, files, currentCue]);

  const track = (fileId?: string) => {
    const src = fileId && manifest.files[fileId].captions;
    return src ? <track key={src} kind="captions" src={manifest.mediaBase + src} label="Narration captions" default
      ref={(element) => { if (element) element.track.mode = "hidden"; }} /> : null;
  };

  return (
    <div className="narration-root" onClick={(event) => event.stopPropagation()}
      onMouseDown={(event) => { event.stopPropagation(); event.preventDefault(); }}
      onPointerDown={(event) => event.stopPropagation()} onPointerUp={(event) => event.stopPropagation()}>
      <button type="button" className="narration-play" aria-label={playing ? "Pause narration (V)" : "Play narration (V)"}
        title={playing ? "Pause narration (V)" : "Play narration (V)"} onClick={() => actions.current?.toggle()}>{playing ? "Ⅱ" : "▶"}</button>
      <video ref={face} className="narration-face" hidden={!started || kind !== "face"} playsInline preload="metadata" crossOrigin="anonymous">
        {track(files.face)}
      </video>
      <div className="narration-demo" hidden={!started || kind !== "demo"}>
        <video ref={demo} playsInline preload="metadata" crossOrigin="anonymous">{track(files.demo)}</video>
        <span className="narration-demo-label">Demo</span>
        <button type="button" className="narration-skip" onClick={() => actions.current?.skip()}>Skip demo →</button>
      </div>
      {started && captions && caption && <div className="narration-captions">{caption}</div>}
      {manifest.notes && <button type="button" className="narration-notes-toggle" aria-expanded={notesOpen}
        onClick={() => setNotesOpen((value) => !value)}>Notes (N)</button>}
      {manifest.notes && notesOpen && <aside className="narration-notes" aria-label="Slide notes">
        <button type="button" aria-label="Close notes" onClick={() => setNotesOpen(false)}>×</button>
        {(manifest.notes[SCENES[sceneIdx].id] ?? "No notes for this slide yet.").split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </aside>}
      {toast && <div className="narration-toast" role="status">{toast}</div>}
    </div>
  );
}
