"use client";

import type { Beat } from "./_types";
import { LiveLink } from "@/components/DocsLink";
import { Cooking } from "@/components/scenes/g4/Cooking";

// Kept for serving.tsx, which imports it. Not used by this scene.
const ovens = ["1 · RANGE: molecular energies and forces", "2 · galactic clustering", "3 · fine-tuning from first principles", "4 · global track fitting", "5 · The Basic Model (a new universe)"];
export function Ovens() { return <div className="card-grid three">{ovens.map(name => <div className="course-card" key={name}><h2>{name}</h2><span className="status-chip">not started</span><LiveLink title="ovens status" target="ovensStatus" /></div>)}</div>; }

const beat: Beat = {
  title: "Five projects start cooking today.",
  source: "Projects and pre-cooking: course plan, 17-20 Oct 2026 · times: today's agenda",
  Scene: Cooking,
};

export default beat;
