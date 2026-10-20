"use client";

import { type Beat, d } from "./_types";
import { motion } from "motion/react";

const evidence = [
 ["16×", "reported speedup after diagnosing a data-loader stall", "…but diagnosis followed a wrong initial guess."],
 ["187k", "tokens/s/GPU after an audit correction (was 32.5k)", "…but an audit’s arithmetic also needs checking."],
 ["188.8M", "simulated events on 59 nodes in under 18 minutes", "…but exit status alone cannot verify the dataset."],
 ["28", "unmerged or unpushed software pieces found by fan-out", "…but inventory is not integration or validation."],
];
function Numbers({step}: {step: number}) { return <div className="card-grid four">{evidence.map(([n, claim, caveat],i) => <div className="course-card" key={n}><strong className="big-number">{n}</strong><p>{claim}</p><motion.p className="caveat" initial={false} animate={{opacity: step >= Math.min(i + 1, 3) ? 1 : 0}} aria-hidden={step < Math.min(i + 1, 3)}>{caveat}</motion.p></div>)}</div>; }

const beat: Beat = {title: "Agentic science already takes many forms.", lines: [], links: [d("evidence/possible/", "what is possible")], Visual: Numbers};

export default beat;
