"use client";

import { SCENES } from "@/lib/timeline";

import { SECTIONS, sectionIndexOf } from "@/lib/sections";

const NO_FOOTER = new Set(["title", "agenda", "thanks", "buffer"]);
// Hands-on and show-and-tell scenes sit inside a section without ending it.
const ASIDE: Record<string, string> = {
  "hands-on-0": "Hands-on 0", "hands-on-1": "Hands-on 1", "hands-on-2": "Hands-on 2", "hands-on-3": "Hands-on 3",
  "show-0": "Show and tell 0", "show-1": "Show and tell 1", "show-2": "Show and tell 2", "show-3": "Show and tell 3",
};

export function SectionFooter({ sceneIdx, stepIdx }: { sceneIdx: number; stepIdx: number }) {
  const scene = SCENES[sceneIdx];
  if (NO_FOOTER.has(scene.id)) return null;
  if (ASIDE[scene.id]) {
    return (
      <div className="section-footer" aria-hidden>
        <span className="section-footer-name">{ASIDE[scene.id]}</span>
      </div>
    );
  }
  const section = SECTIONS[sectionIndexOf(sceneIdx)];
  const n = section.last - section.first + 1;
  const pos = sceneIdx - section.first + (stepIdx + 1) / scene.steps;
  return (
    <div className="section-footer" aria-hidden>
      <span className="section-footer-name">{section.name}</span>
      <span className="section-footer-bar">
        <span style={{ width: `${Math.min(100, (100 * pos) / n)}%` }} />
      </span>
    </div>
  );
}
