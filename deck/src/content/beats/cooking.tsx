"use client";

import { type Beat } from "./_types";
import { LiveLink } from "@/components/DocsLink";

const ovens = ["1 · RANGE: molecular energies and forces", "2 · galactic clustering", "3 · fine-tuning from first principles", "4 · global track fitting", "5 · The Basic Model (a new universe)"];
export function Ovens() { return <div className="card-grid three">{ovens.map(name => <div className="course-card" key={name}><h2>{name}</h2><span className="status-chip">not started</span><LiveLink title="ovens status" target="ovensStatus" /></div>)}</div>; }

const beat: Beat = {title: "Five projects start cooking today.", lines: ["Five projects start now: RANGE is cooked completely from scratch, the rest partly pre-cooked, with material to switch to.", "Each has stretch goals. We check all five at every break."], links: [], Visual: Ovens};

export default beat;
