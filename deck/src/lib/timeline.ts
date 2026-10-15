export type Part = "setup" | "inner" | "middle" | "outer" | "close";
export type Theme = "dark" | "light";
export type SceneId = "title" | "cooking" | "q1-possible" | "q2-machinery" | "q2-limits" | "quality" | "q3-professional" | "two-axes" | "inner-intro" | "inner-fiddler" | "inner-theory" | "middle-intro" | "middle-range" | "outer-intro" | "outer-volunteer" | "landscape" | "serving" | "thanks";
export type Scene = { id: SceneId; label: string; part: Part; theme: Theme; steps: number; startSec: number; endSec: number };
// Seconds from 09:00. Gaps are the morning break, lunch and afternoon break.
export const SCENES: Scene[] = [
  {
    "id": "title",
    "part": "setup",
    "theme": "dark",
    "steps": 1,
    "startSec": 0,
    "endSec": 300,
    "label": "AI Agents in Practice for Physics Research"
  },
  {
    "id": "cooking",
    "part": "setup",
    "theme": "dark",
    "steps": 3,
    "startSec": 300,
    "endSec": 900,
    "label": "Today we\u2019re going to cook"
  },
  {
    "id": "q1-possible",
    "part": "setup",
    "theme": "dark",
    "steps": 4,
    "startSec": 900,
    "endSec": 1500,
    "label": "What can agentic science do in Oct 2026?"
  },
  {
    "id": "q2-machinery",
    "part": "setup",
    "theme": "dark",
    "steps": 3,
    "startSec": 1500,
    "endSec": 2700,
    "label": "What is it?"
  },
  {
    "id": "q2-limits",
    "part": "setup",
    "theme": "dark",
    "steps": 4,
    "startSec": 2700,
    "endSec": 3900,
    "label": "What can\u2019t it do (yet)?"
  },
  {
    "id": "quality",
    "part": "setup",
    "theme": "light",
    "steps": 3,
    "startSec": 3900,
    "endSec": 4200,
    "label": "Six months of working with agents"
  },
  {
    "id": "q3-professional",
    "part": "setup",
    "theme": "light",
    "steps": 3,
    "startSec": 4200,
    "endSec": 5400,
    "label": "Professional agentic science"
  },
  {
    "id": "two-axes",
    "part": "setup",
    "theme": "light",
    "steps": 2,
    "startSec": 5400,
    "endSec": 6000,
    "label": "Two axes, one scientific method"
  },
  {
    "id": "inner-intro",
    "part": "inner",
    "theme": "light",
    "steps": 3,
    "startSec": 6900,
    "endSec": 9600,
    "label": "Inner loop: one experiment"
  },
  {
    "id": "inner-fiddler",
    "part": "inner",
    "theme": "light",
    "steps": 2,
    "startSec": 9600,
    "endSec": 11700,
    "label": "Is Claude a superior fiddler?"
  },
  {
    "id": "inner-theory",
    "part": "inner",
    "theme": "light",
    "steps": 2,
    "startSec": 15300,
    "endSec": 18000,
    "label": "Theory sprint"
  },
  {
    "id": "middle-intro",
    "part": "middle",
    "theme": "light",
    "steps": 3,
    "startSec": 18000,
    "endSec": 19800,
    "label": "Middle loop: project and paper"
  },
  {
    "id": "middle-range",
    "part": "middle",
    "theme": "light",
    "steps": 2,
    "startSec": 19800,
    "endSec": 21600,
    "label": "Understand a paper in one minute"
  },
  {
    "id": "outer-intro",
    "part": "outer",
    "theme": "light",
    "steps": 3,
    "startSec": 22500,
    "endSec": 24300,
    "label": "Outer loop: programme and career"
  },
  {
    "id": "outer-volunteer",
    "part": "outer",
    "theme": "light",
    "steps": 1,
    "startSec": 24300,
    "endSec": 25200,
    "label": "Your setup, live"
  },
  {
    "id": "landscape",
    "part": "close",
    "theme": "dark",
    "steps": 3,
    "startSec": 25200,
    "endSec": 27000,
    "label": "The landscape, October 2026"
  },
  {
    "id": "serving",
    "part": "close",
    "theme": "dark",
    "steps": 2,
    "startSec": 27000,
    "endSec": 28500,
    "label": "Serving"
  },
  {
    "id": "thanks",
    "part": "close",
    "theme": "dark",
    "steps": 1,
    "startSec": 28500,
    "endSec": 28800,
    "label": "Which question do you want back first?"
  }
];
export const TOTAL_SEC = 28800;
export function formatMMSS(sec: number) {
 const s = Math.max(0, Math.floor(sec));
 return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
