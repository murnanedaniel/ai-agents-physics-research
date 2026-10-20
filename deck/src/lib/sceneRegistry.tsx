import type { ReactElement } from "react";
import { SCENES, type SceneId } from "./timeline";
import { CourseScene } from "@/components/scenes/CourseScenes";
import { ClaudeFinalSlide } from "@/components/scenes/ClaudeFinalSlide";

export type SceneComponent = (props: { step: number; onAdvance?: () => void }) => ReactElement;
type BeatId = Exclude<SceneId, "thanks">;
const beatComponents = Object.fromEntries(
  SCENES.map(({ id }) => id).filter((id): id is BeatId => id !== "thanks").map(id => [
    id,
    function RegisteredBeat({ step }: { step: number }) { return <CourseScene id={id} step={step} />; },
  ]),
) as Record<BeatId, SceneComponent>;

export const SCENE_COMPONENTS: Record<SceneId, SceneComponent> = {
  ...beatComponents,
  thanks: ClaudeFinalSlide,
};
