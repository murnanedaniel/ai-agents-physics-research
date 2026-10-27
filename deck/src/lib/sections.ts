import { SCENES } from "@/lib/timeline";

export type Section = { name: string; start: string; first: number; last: number };

const RAW = [
  { name: "Where we're coming from", start: "title" },
  { name: "Agentic science today: physics results", start: "q1-possible" },
  { name: "Agentic science today: tools and infrastructure", start: "ex-chatlas" },
  { name: "How an agent and its model work", start: "sec-agent" },
  { name: "Why models got better, and how good they are", start: "llm-scaling" },
  { name: "How my work changed, and where agents fail", start: "sec-practice" },
  { name: "Professional agentic science", start: "q3-professional" },
  { name: "The one lesson, and today's projects", start: "three-loops" },
  { name: "Inner loop: halos and fine-tuning", start: "inner-intro" },
  { name: "Inner loop: RANGE, logs and check-ins", start: "p-range" },
  { name: "Inner loop: hill-climbing", start: "tdd" },
  { name: "Middle loop: from experiments to a paper", start: "middle-intro" },
  { name: "Middle loop: what I automate", start: "sec-automate" },
  { name: "Middle loop: slides and teaching", start: "two-slide-skills" },
  { name: "Outer loop: memory, ideas, collaborators", start: "outer-intro" },
  { name: "Outer loop: many agents at once", start: "sessions-talk" },
  { name: "Outer loop: where this is heading", start: "always-on" },
  { name: "Before you go", start: "sec-reminders" },
  { name: "Miscellany", start: "sec-misc" },
];

const starts = RAW.map(({ start }) => {
  const index = SCENES.findIndex((scene) => scene.id === start);
  if (index < 0) throw new Error(`Unknown section start scene: ${start}`);
  return index;
});

export const SECTIONS: Section[] = RAW.map((section, index) => ({
  ...section,
  first: starts[index],
  last: (starts[index + 1] ?? SCENES.length) - 1,
}));

export function sectionIndexOf(sceneIdx: number): number {
  return SECTIONS.findIndex(({ first, last }) => sceneIdx >= first && sceneIdx <= last);
}
