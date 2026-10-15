import type { ReactElement } from "react";
import type { SceneId } from "./timeline";
import { CourseScene } from "@/components/scenes/CourseScenes";
import { ClaudeFinalSlide } from "@/components/scenes/ClaudeFinalSlide";
export type SceneComponent = (props: { step: number; onAdvance?: () => void }) => ReactElement;
// Explicit registration keeps adding a scene a three-edit operation.
const beat = (id: Exclude<SceneId, "thanks">): SceneComponent => function RegisteredBeat({step}) { return <CourseScene id={id} step={step} />; };
export const SCENE_COMPONENTS: Record<SceneId, SceneComponent> = {
 title: beat("title"), cooking: beat("cooking"), "q1-possible": beat("q1-possible"),
 "q2-machinery": beat("q2-machinery"), "q2-limits": beat("q2-limits"),
 "q3-professional": beat("q3-professional"), "two-axes": beat("two-axes"),
 "inner-intro": beat("inner-intro"), "inner-fiddler": beat("inner-fiddler"), "inner-theory": beat("inner-theory"),
 "middle-intro": beat("middle-intro"), "middle-range": beat("middle-range"),
 "outer-intro": beat("outer-intro"), "outer-volunteer": beat("outer-volunteer"),
 landscape: beat("landscape"), serving: beat("serving"), thanks: ClaudeFinalSlide,
};
