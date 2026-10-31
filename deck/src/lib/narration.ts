"use client";

import { useEffect, useState } from "react";

export type NarrationFile = { kind: "face" | "demo"; src: string; captions?: string; poster?: string };
export type NarrationCue = { file: string; t0: number; t1: number; scene: string; step: number; kind: "slide" | "demo" };
export type Manifest = {
  version: 1;
  mediaBase: string;
  files: Record<string, NarrationFile>;
  cues: NarrationCue[];
  notes?: Record<string, string>;
};

// Keep the first occurrence even when the presenter revisited a step.
export function cueIndexFor(sceneId: string, step: number, manifest: Manifest): number {
  const exact = manifest.cues.findIndex((cue) => cue.scene === sceneId && cue.step === step);
  if (exact !== -1) return exact;
  let result = -1;
  manifest.cues.forEach((cue, index) => {
    if (cue.scene === sceneId && cue.step <= step &&
      (result === -1 || cue.step > manifest.cues[result].step)) result = index;
  });
  return result;
}

const requests = new Map<string, Promise<Manifest | null>>();

function validManifest(value: Manifest): boolean {
  return value?.version === 1 && typeof value.mediaBase === "string" && !!value.files &&
    Object.values(value.files).every((file) => file && ["face", "demo"].includes(file.kind) && typeof file.src === "string") &&
    Array.isArray(value.cues) && value.cues.every((cue) => {
      const file = value.files[cue.file];
      return file && file.kind === (cue.kind === "slide" ? "face" : "demo") &&
        ["slide", "demo"].includes(cue.kind) && typeof cue.scene === "string" &&
        Number.isInteger(cue.step) && cue.step >= 0 && Number.isFinite(cue.t0) &&
        Number.isFinite(cue.t1) && cue.t0 >= 0 && cue.t1 > cue.t0;
    }) && (value.notes === undefined || (value.notes !== null &&
      typeof value.notes === "object" && Object.values(value.notes).every((note) => typeof note === "string")));
}

export function useManifest(): Manifest | null {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("record") === "1") return;
    const example = params.get("narration") === "example";
    const url = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/narration/manifest${example ? ".example" : ""}.json`;
    if (!requests.has(url)) {
      requests.set(url, fetch(url).then(async (response) => {
        if (!response.ok) return null;
        const data = await response.json();
        if (!validManifest(data)) return null;
        // Media paths are relative to the manifest, not to the page.
        return { ...data, mediaBase: new URL(data.mediaBase, new URL(url, window.location.href)).href } as Manifest;
      }).catch(() => null));
    }
    let mounted = true;
    void requests.get(url)!.then((data) => { if (mounted) setManifest(data); });
    return () => { mounted = false; };
  }, []);
  return manifest;
}
