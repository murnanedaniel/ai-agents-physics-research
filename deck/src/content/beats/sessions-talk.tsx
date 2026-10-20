"use client";

import { type Beat, d } from "./_types";
import { motion } from "motion/react";

function Uses({step}: {step: number}) { return <div className="card-grid three">{[["Orchestrator & workers", "One session briefs workers on the cluster, reads their transcripts back."], ["Find and steer", "List sessions, read the right one's last events, answer without terminal-hopping."], ["Negotiate shared queues", "Two sessions on one cluster traded usage plans and agreed a queue split."]].map(([title, text], i) => <motion.div className="course-card" key={title} initial={false} animate={{opacity: step >= i ? 1 : .15}}><h2>{title}</h2><p style={{visibility: step >= i ? "visible" : "hidden"}}>{text}</p></motion.div>)}</div>; }

const beat: Beat = {
  title: "Any session can message any other.",
  lines: [
    "Any agent session can list, read and message another, across machines: workstation, HPC login node, cloud container.",
    "Uses: an orchestrator briefing workers; finding and steering a running session; two sessions negotiating a shared cluster queue.",
    "Relayed messages are information, not authority: a session reported one rather than acting on it, and asked the human first.",
  ],
  links: [d("patterns/sessions-message-sessions/", "sessions message sessions")],
  Visual: Uses,
};

export default beat;
