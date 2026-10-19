"use client";

import { type Beat, d } from "./_types";
import { motion } from "motion/react";

function ToolLoop({step}: {step: number}) { return <div><div className="tool-loop" aria-label="Model to tool call to result and back to model">{["model", "tool call", "result", "model ↺"].map((text,i) => <motion.div className="course-card" key={i} animate={{borderColor: i === step || (step === 2 && i === 3) ? "#38bdf8" : "#64748b"}}>{text}{i < 3 && <span aria-hidden> →</span>}</motion.div>)}</div><div className="context-label">Context window · instructions + calls + results</div><div className="context-track" role="progressbar" aria-label="Illustrative context usage" aria-valuenow={(step+1)*30} aria-valuemin={0} aria-valuemax={100}><motion.div animate={{width: `${(step+1)*30}%`}} /></div></div>; }

const beat: Beat = {kicker: "Q2 · the machinery", title: "What is it?", lines: ["The model proposes an action.", "The harness executes a tool and records its result.", "The model continues with the updated context."], links: [d("machinery/llm-basics/", "LLM basics"), d("machinery/tool-loop/", "tool loop")], Visual: ToolLoop};

export default beat;
