"use client";
import { BeatScene } from "./BeatScene";
import * as beats from "@/content/beats";
import type { Beat } from "@/content/beats/_types";
import type { SceneId } from "@/lib/timeline";

export const BEATS = beats satisfies Record<Exclude<SceneId, "thanks">, Beat>;

export function CourseScene({ id, step }: { id: Exclude<SceneId, "thanks">; step: number }) {
  const { Visual, ...beat } = BEATS[id];
  return <BeatScene {...beat} step={step}>{Visual && <Visual step={step} />}</BeatScene>;
}
