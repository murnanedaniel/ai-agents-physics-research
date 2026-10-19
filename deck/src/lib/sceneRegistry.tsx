import type { ReactElement } from "react";
import type { SceneId } from "./timeline";
import * as beats from "@/content/beats";
import { CourseScene } from "@/components/scenes/CourseScenes";
import { ClaudeFinalSlide } from "@/components/scenes/ClaudeFinalSlide";

export type SceneComponent = (props: { step: number; onAdvance?: () => void }) => ReactElement;
type BeatId = Exclude<SceneId, "thanks">;
const beatComponents = Object.fromEntries(
  (Object.keys(beats) as BeatId[]).map(id => [
    id,
    function RegisteredBeat({ step }: { step: number }) { return <CourseScene id={id} step={step} />; },
  ]),
) as Record<BeatId, SceneComponent>;

export const SCENE_COMPONENTS: Record<SceneId, SceneComponent> = {
  ...beatComponents,
  thanks: ClaudeFinalSlide,
};
