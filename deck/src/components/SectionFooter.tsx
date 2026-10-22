"use client";

import { SCENES } from "@/lib/timeline";

// Bottom-of-slide signpost: the section we're in, and how far through it we are.
// A section starts at each section scene below and runs until the next one.
const SECTION_STARTS: Record<string, string> = {
  "eth-rate": "Where we're coming from",
  "q1-possible": "What agentic science looks like today",
  "sec-agent": "How an agent works",
  "sec-model": "Inside the model",
  "sec-bench": "How good agents are now",
  "sec-practice": "How my own work changed",
  "q2-limits": "Where agents fail",
  "q3-professional": "Professional agentic science",
  "one-lesson": "The one lesson",
  "cooking": "Today's projects",
  "hands-on-0": "Hands-on 0",
  "inner-intro": "Inner loop: one experiment",
  "hands-on-1": "Hands-on 1",
  "middle-intro": "Middle loop: from experiments to a paper",
  "sec-tracking": "Middle loop: the tracking study",
  "sec-automate": "Middle loop: what I automate",
  "hands-on-2": "Hands-on 2",
  "outer-intro": "Outer loop: running a programme",
  "hands-on-3": "Hands-on 3",
  "sec-misc": "Miscellany",
  "sec-reminders": "Before you go",
};

const NO_FOOTER = new Set(["title", "agenda", "thanks", "buffer"]);

export function SectionFooter({ sceneIdx, stepIdx }: { sceneIdx: number; stepIdx: number }) {
  const scene = SCENES[sceneIdx];
  if (NO_FOOTER.has(scene.id)) return null;
  let start = -1;
  for (let i = sceneIdx; i >= 0; i--) if (SECTION_STARTS[SCENES[i].id]) { start = i; break; }
  if (start < 0) return null;
  let end: number = SCENES.length;
  for (let i = start + 1; i < SCENES.length; i++) if (SECTION_STARTS[SCENES[i].id] || NO_FOOTER.has(SCENES[i].id)) { end = i; break; }
  const n = end - start;
  const pos = sceneIdx - start + (stepIdx + 1) / scene.steps;
  return (
    <div className="section-footer" aria-hidden>
      <span className="section-footer-name">{SECTION_STARTS[SCENES[start].id]}</span>
      <span className="section-footer-bar">
        <span style={{ width: `${Math.min(100, (100 * pos) / n)}%` }} />
      </span>
    </div>
  );
}
