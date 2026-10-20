"use client";
import { BeatScene } from "./BeatScene";
import * as beats from "@/content/beats";
import type { Beat } from "@/content/beats/_types";
import type { SceneId } from "@/lib/timeline";

export const BEATS = beats satisfies Record<SceneId, Beat>;

export function CourseScene({ id, step }: { id: SceneId; step: number }) {
  const { Visual, ...beat }: Beat = BEATS[id];
  return <BeatScene {...beat} step={step}>{!beat.Scene && Visual && <Visual step={step} />}</BeatScene>;
}
