"use client";

import { type Beat } from "./_types";
import { LiveLink } from "@/components/DocsLink";

const ovens = ["1 · RANGE vs transformers (from scratch)", "2 · galactic neighbours", "3 · shown live", "4 · global track fitting", "5 · fine-tuning from first principles", "6 · hypothetical detector"];
export function Ovens() { return <div className="card-grid three">{ovens.map(name => <div className="course-card" key={name}><h2>{name}</h2><span className="status-chip">not started</span><LiveLink title="ovens status" target="ovensStatus" /></div>)}</div>; }

const beat: Beat = {kicker: "Setup · ovens on", title: "Six projects, cooked today", lines: ["Six projects start now: RANGE is cooked completely from scratch, the rest partly pre-cooked, with material to switch to.", "Each has stretch goals. We check all six at every break."], links: [], Visual: Ovens};

export default beat;
