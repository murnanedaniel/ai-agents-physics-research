"use client";
import { motion } from "motion/react";
import { BeatScene } from "./BeatScene";
import { LiveLink, type BeatLink } from "@/components/DocsLink";
import type { SceneId } from "@/lib/timeline";
const d = (path: string, title: string): BeatLink => ({kind: "docs", path, title});
const l = (target: "rangeDashboard" | "sciencedash", title: string): BeatLink => ({kind: "live", target, title});
type Content = { kicker: string; title: string; lines: string[]; links: BeatLink[] };
export const BEATS: Record<Exclude<SceneId, "thanks">, Content> = {
 title: {kicker: "KIT · 22 October 2026 · 09:00–17:00", title: "AI Agents in Practice for Physics Research", lines: ["Daniel Murnane · Experiments → projects → programmes"], links: [d("", "course home")]},
 cooking: {kicker: "Setup · ovens on", title: "Today we’re going to cook", lines: ["Start the long jobs now.", "Check progress at each break.", "At 16:30, inspect the results together."], links: []},
 "q1-possible": {kicker: "Q1 · possibilities, with receipts", title: "What can agentic science do in Oct 2026?", lines: [], links: [d("evidence/possible/", "what is possible")]},
 "q2-machinery": {kicker: "Q2 · the machinery", title: "What is it?", lines: ["The model proposes an action.", "The harness executes a tool and records its result.", "The model continues with the updated context."], links: [d("machinery/llm-basics/", "LLM basics"), d("machinery/tool-loop/", "tool loop")]},
 "q2-limits": {kicker: "Q2 · evidence, not confidence", title: "What can’t it do (yet)?", lines: ["Confidence is not calibration; audits can miss the worst bug.", "Memory alone does not enforce a critical rule.", "Review findings don’t reliably carry into later drafts.", "Exit 0 is not evidence. Test that the checker can fail."], links: [d("evidence/limits/", "limits")]},
 "q3-professional": {kicker: "Q3 · the centre of the course", title: "Professional agentic science", lines: [], links: [d("professional/", "professional practice")]},
 "two-axes": {kicker: "Method × implementation", title: "Two axes, one scientific method", lines: ["Choose the scientific loop.", "Then choose the model, harness and environment."], links: [d("environments/", "five environments")]},
 "inner-intro": {kicker: "Inner loop · 10:55", title: "Inner loop: one experiment", lines: ["Hypothesis → run → evaluate → iterate", "Reproduce the baseline before changing one thing.", "Two runtimes: agent steps ≠ experiment wall clock."], links: [d("loops/inner/", "inner loop"), d("patterns/reproduce-baseline/", "baseline"), d("patterns/surprising-number/", "surprising number")]},
 "inner-fiddler": {kicker: "Oven C · a claim to test", title: "Is Claude a superior fiddler?", lines: ["Same task, tools, seed policy and experiment budget.", "Hidden test scorer · repeated runs · no results yet."], links: [d("demos/fiddler-benchmark/", "fiddler benchmark")]},
 "inner-theory": {kicker: "Oven B · 13:15", title: "Theory sprint", lines: ["[TODO: choose a physics question and evaluable attempt.]", "[TODO: define a limiting case or independent calculation.]"], links: [d("demos/theory-sprint/", "theory sprint")]},
 "middle-intro": {kicker: "Middle loop · 14:00", title: "Middle loop: project and paper", lines: ["Experiments → argument → review → revision", "Review findings don’t reliably carry into later drafts.", "Give every finding an owner, a fix and a verification record."], links: [d("loops/middle/", "middle loop"), d("patterns/calibrated-judges/", "calibrated judges")]},
 "middle-range": {kicker: "Oven A · RANGE", title: "Understand a paper in one minute", lines: ["Question → method → evidence → limits", "[TODO: build the dashboard and test the transformer hypothesis.]"], links: [l("rangeDashboard", "RANGE dashboard"), d("demos/range/", "RANGE")]},
 "outer-intro": {kicker: "Outer loop · 15:15", title: "Outer loop: programme and career", lines: ["The infrastructure exists, but you have to build it.", "Durable briefs, decision logs, worktrees and approval gates.", "A working fleet is not yet a complete physics-programme playbook."], links: [d("loops/outer/", "outer loop"), d("demos/perlmutter-bridge/", "resilient bridge"), l("sciencedash", "ScienceDash")]},
 "outer-volunteer": {kicker: "Outer loop · from the room", title: "Your setup, live", lines: ["[TODO: build a volunteer’s starter setup around one real task.]"], links: [d("setup/", "quick starts")]},
 landscape: {kicker: "Close · 16:00", title: "The landscape, October 2026", lines: ["Subscriptions: budget for the task. Claude and Codex are complementary.", "Open models: “capitalism is doing its job” — an opinion to test.", "2027: separate forecasts from demonstrated capability."], links: [d("landscape/", "landscape")]},
 serving: {kicker: "Close · 16:30", title: "Serving", lines: ["Open every oven. Inspect the artifacts.", "Trust tally: verified — · unsupported — · failed — · pending —"], links: [d("cheatsheet/", "Monday’s checklist")]},
};
const ovens = ["A · RANGE", "B · theory sprint", "C · fiddler benchmark", "D · galactic neighbours"];
function Ovens() { return <div className="card-grid four">{ovens.map(name => <div className="course-card" key={name}><h2>{name}</h2><span className="status-chip">not started</span><LiveLink title="ovens status" target="ovensStatus" /></div>)}</div>; }
const evidence = [
 ["16×", "reported speedup after diagnosing a data-loader stall", "…but diagnosis followed a wrong initial guess."],
 ["187k", "tokens/s/GPU after an audit correction (was 32.5k)", "…but an audit’s arithmetic also needs checking."],
 ["188.8M", "simulated events on 59 nodes in under 18 minutes", "…but exit status alone cannot verify the dataset."],
 ["28", "unmerged or unpushed software pieces found by fan-out", "…but inventory is not integration or validation."],
];
function Numbers({step}: {step: number}) { return <div className="card-grid four">{evidence.map(([n, claim, caveat],i) => <div className="course-card" key={n}><strong className="big-number">{n}</strong><p>{claim}</p><motion.p className="caveat" initial={false} animate={{opacity: step >= Math.min(i + 1, 3) ? 1 : 0}} aria-hidden={step < Math.min(i + 1, 3)}>{caveat}</motion.p></div>)}</div>; }
function ToolLoop({step}: {step: number}) { return <div><div className="tool-loop" aria-label="Model to tool call to result and back to model">{["model", "tool call", "result", "model ↺"].map((text,i) => <motion.div className="course-card" key={i} animate={{borderColor: i === step || (step === 2 && i === 3) ? "#38bdf8" : "#64748b"}}>{text}{i < 3 && <span aria-hidden> →</span>}</motion.div>)}</div><div className="context-label">Context window · instructions + calls + results</div><div className="context-track" role="progressbar" aria-label="Illustrative context usage" aria-valuenow={(step+1)*30} aria-valuemin={0} aria-valuemax={100}><motion.div animate={{width: `${(step+1)*30}%`}} /></div></div>; }
function Professional({step}: {step: number}) { return <div className="card-grid three">{[["Casual", "Ask a question; accept a plausible answer."], ["Professional", "State a hypothesis; allocate resources; validate."], ["Professional-agentic", "Delegate bounded work; automate checks; keep durable evidence."]].map(([title, text],i) => <motion.div className="course-card" key={title} initial={false} animate={{opacity: step >= i ? 1 : .15}}><h2>{title}</h2><p style={{visibility: step >= i ? "visible" : "hidden"}}>{text}</p></motion.div>)}</div>; }
function Axes() { return <table className="course-table"><caption>Research loops × implementation</caption><thead><tr><th>Loop ↓ / implementation →</th><th>Models</th><th>Harnesses</th><th>Environments</th></tr></thead><tbody>{[["Inner", "Propose a test", "Execute and verify", "Laptop / HPC"], ["Middle", "Critique an argument", "Track findings", "Home box / cloud"], ["Outer", "Scope a programme", "Dispatch and remember", "One fleet"]].map(row => <tr key={row[0]}>{row.map((cell,i) => i === 0 ? <th key={i}>{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody></table>; }
function Scoreboard() { return <table className="course-table"><caption>Draft roster · all measurements pending</caption><thead><tr>{["Model", "Test score", "Gap", "Waste", "Discipline", "Honesty", "Integrity"].map(x => <th key={x}>{x}</th>)}</tr></thead><tbody>{["Opus 5.5", "Opus 4.7", "Fable 5.1", "Sonnet 5", "Codex gpt-6-astra"].map(x => <tr key={x}><th>{x}</th>{Array.from({length:6},(_,i) => <td key={i}>—</td>)}</tr>)}</tbody></table>; }
export function CourseScene({id, step}: {id: Exclude<SceneId,"thanks">; step: number}) {
 return <BeatScene {...BEATS[id]} step={step}>
 {(id === "cooking" || id === "serving") && <Ovens />}
 {id === "q1-possible" && <Numbers step={step} />}
 {id === "q2-machinery" && <ToolLoop step={step} />}
 {id === "q3-professional" && <Professional step={step} />}
 {id === "two-axes" && <Axes />}
 {id === "inner-fiddler" && <Scoreboard />}
 </BeatScene>;
}
