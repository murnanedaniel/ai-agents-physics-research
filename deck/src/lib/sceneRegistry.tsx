import type { ReactElement } from "react";
import { SCENES, type SceneId } from "./timeline";
import { CourseScene } from "@/components/scenes/CourseScenes";

export type SceneComponent = (props: { step: number; onAdvance?: () => void }) => ReactElement;
type BeatId = SceneId;
const beatComponents = Object.fromEntries(
  SCENES.map(({ id }) => id).map(id => [
    id,
    function RegisteredBeat({ step }: { step: number }) { return <CourseScene id={id} step={step} />; },
  ]),
) as Record<BeatId, SceneComponent>;

export const SCENE_COMPONENTS: Record<SceneId, SceneComponent> = {
  ...beatComponents,
};
