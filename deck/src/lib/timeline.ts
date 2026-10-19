export type Part = "setup" | "inner" | "middle" | "outer" | "close";
export type Theme = "dark" | "light";
export type SceneId = (typeof SCENES)[number]["id"];
export type Scene = { id: SceneId; label: string; part: Part; theme: Theme; steps: number; startSec: number; endSec: number };
// Seconds from 09:00. Gaps are intentional slack, morning break, lunch and afternoon break.
export const SCENES = [
  {"id": "title", "part": "setup", "theme": "dark", "steps": 1, "startSec": 0, "endSec": 300, "label": "AI Agents in Practice for Physics Research"},
  {"id": "agenda", "part": "setup", "theme": "light", "steps": 1, "startSec": 300, "endSec": 420, "label": "Structure of the day"},
  {"id": "one-lesson", "part": "setup", "theme": "dark", "steps": 3, "startSec": 420, "endSec": 600, "label": "One lesson for today"},
  {"id": "cooking", "part": "setup", "theme": "dark", "steps": 2, "startSec": 600, "endSec": 900, "label": "Six projects, cooked today"},
  {"id": "q1-possible", "part": "setup", "theme": "dark", "steps": 4, "startSec": 900, "endSec": 1350, "label": "What can agentic science do in Oct 2026?"},
  {"id": "q2-machinery", "part": "setup", "theme": "dark", "steps": 3, "startSec": 1350, "endSec": 1950, "label": "What is it?"},
  {"id": "q2-limits", "part": "setup", "theme": "dark", "steps": 4, "startSec": 1950, "endSec": 2550, "label": "What can't it do (yet)?"},
  {"id": "quality", "part": "setup", "theme": "light", "steps": 3, "startSec": 2550, "endSec": 2750, "label": "Six months of working with agents"},
  {"id": "what-changed", "part": "setup", "theme": "light", "steps": 3, "startSec": 2750, "endSec": 2950, "label": "What changed, tested"},
  {"id": "q3-professional", "part": "setup", "theme": "light", "steps": 3, "startSec": 2950, "endSec": 3350, "label": "Professional agentic science"},
  {"id": "two-axes", "part": "setup", "theme": "light", "steps": 2, "startSec": 3350, "endSec": 3600, "label": "Two axes, one scientific method"},
  {"id": "inner-intro", "part": "inner", "theme": "light", "steps": 3, "startSec": 3600, "endSec": 4000, "label": "Inner loop: one experiment"},
  {"id": "tdd", "part": "inner", "theme": "light", "steps": 3, "startSec": 4000, "endSec": 4400, "label": "Borrowed from software: tests first, happy path first"},
  {"id": "p-range", "part": "inner", "theme": "dark", "steps": 3, "startSec": 4400, "endSec": 5000, "label": "Project 1: can a transformer beat RANGE? (from scratch)"},
  {"id": "p-galactic", "part": "inner", "theme": "dark", "steps": 3, "startSec": 5400, "endSec": 6000, "label": "Project 2: galactic nearest-neighbour clustering"},
  {"id": "p-detector", "part": "inner", "theme": "dark", "steps": 3, "startSec": 6900, "endSec": 7600, "label": "Project 6: a hypothetical detector"},
  {"id": "p-finetuning", "part": "inner", "theme": "dark", "steps": 3, "startSec": 7600, "endSec": 8300, "label": "Project 5: fine-tuning from first principles"},
  {"id": "p-tracking", "part": "inner", "theme": "dark", "steps": 3, "startSec": 8300, "endSec": 9000, "label": "Project 4: global track fitting"},
  {"id": "hands-on-1", "part": "inner", "theme": "light", "steps": 2, "startSec": 9000, "endSec": 10500, "label": "Hands-on 1: interview your research setup"},
  {"id": "middle-intro", "part": "middle", "theme": "light", "steps": 3, "startSec": 14400, "endSec": 15000, "label": "Middle loop: project and paper"},
  {"id": "super-poster", "part": "middle", "theme": "light", "steps": 3, "startSec": 15000, "endSec": 15600, "label": "A super-poster: grok a paper in three minutes"},
  {"id": "p-anomaly", "part": "middle", "theme": "dark", "steps": 2, "startSec": 15600, "endSec": 16500, "label": "Project 3 (shown live)"},
  {"id": "judges", "part": "middle", "theme": "light", "steps": 3, "startSec": 16500, "endSec": 17400, "label": "Calibrated judges"},
  {"id": "hands-on-2", "part": "middle", "theme": "light", "steps": 2, "startSec": 17400, "endSec": 18900, "label": "Hands-on 2: review a draft"},
  {"id": "outer-intro", "part": "outer", "theme": "light", "steps": 3, "startSec": 19800, "endSec": 20400, "label": "Outer loop: programme and career"},
  {"id": "sessions-talk", "part": "outer", "theme": "light", "steps": 3, "startSec": 20400, "endSec": 21000, "label": "Any session can message any other"},
  {"id": "research-memory", "part": "outer", "theme": "light", "steps": 3, "startSec": 21000, "endSec": 21500, "label": "Research memory without a dashboard"},
  {"id": "compute-fallback", "part": "outer", "theme": "dark", "steps": 2, "startSec": 21500, "endSec": 21900, "label": "When the cluster is down"},
  {"id": "hands-on-3", "part": "outer", "theme": "light", "steps": 2, "startSec": 21900, "endSec": 23400, "label": "Hands-on 3: gates and checks"},
  {"id": "landscape", "part": "close", "theme": "light", "steps": 3, "startSec": 23400, "endSec": 24600, "label": "The landscape, October 2026"},
  {"id": "serving", "part": "close", "theme": "dark", "steps": 2, "startSec": 24600, "endSec": 27000, "label": "Serving"},
  {"id": "thanks", "part": "close", "theme": "dark", "steps": 1, "startSec": 27000, "endSec": 28800, "label": "Thank you"},
] as const satisfies readonly { id: string; label: string; part: Part; theme: Theme; steps: number; startSec: number; endSec: number }[];
export const TOTAL_SEC = 28800;
export function formatMMSS(sec: number) {
 const s = Math.max(0, Math.floor(sec));
 return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
