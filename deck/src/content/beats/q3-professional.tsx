"use client";

import { type Beat, d } from "./_types";
import { motion } from "motion/react";

function Professional({step}: {step: number}) { return <div className="card-grid three">{[["Casual", "Ask a question; accept a plausible answer."], ["Professional", "State a hypothesis; allocate resources; validate."], ["Professional-agentic", "Delegate bounded work; automate checks; keep durable evidence."]].map(([title, text],i) => <motion.div className="course-card" key={title} initial={false} animate={{opacity: step >= i ? 1 : .15}}><h2>{title}</h2><p style={{visibility: step >= i ? "visible" : "hidden"}}>{text}</p></motion.div>)}</div>; }

const beat: Beat = {title: "Professional science needs more than a model.", lines: [], links: [d("professional/", "professional practice")], Visual: Professional};

export default beat;
