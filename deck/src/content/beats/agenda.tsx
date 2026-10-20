"use client";

import { SCENES, formatClock } from "@/lib/timeline";
import type { Beat } from "./_types";

// Derive session extents and breaks from the timeline, including the final buffer.
const bufferStart = SCENES.find((scene) => scene.id === "buffer")!.startSec;
const groups = [
  { name: "Intro", scenes: SCENES.filter((s) => s.part === "setup") },
  { name: "Inner loop", scenes: SCENES.filter((s) => s.part === "inner") },
  { name: "Middle loop", scenes: SCENES.filter((s) => s.part === "middle") },
  { name: "Outer loop + Outro", scenes: SCENES.filter((s) => (s.part === "outer" || s.part === "close") && s.startSec < bufferStart) },
  { name: "Buffer / Q&A / hands-on", scenes: SCENES.filter((s) => s.startSec >= bufferStart) },
];
const sessions = groups.map(({ name, scenes }) => ({ name, start: scenes[0].startSec, end: scenes.at(-1)!.endSec, kind: name.startsWith("Buffer") ? "buffer" : "session" }));
const blocks = sessions.flatMap((session, i) => {
  const previous = sessions[i - 1];
  return previous && previous.end < session.start
    ? [{ name: session.start - previous.end >= 45 * 60 ? "Lunch" : "Coffee", start: previous.end, end: session.start, kind: "break" }, session]
    : [session];
});

export function DayStructure() {
  return <div className="day-grid" aria-label="Course schedule">
    {blocks.map(({ name, start, end, kind }) => <div key={start} className={`day-block ${kind}`} style={{ flex: end - start }}>
      <strong>{name}</strong>
      <time>{formatClock(start)}–{formatClock(end)}</time>
    </div>)}
  </div>;
}

const beat: Beat = {
  title: "A day from experiments to programmes.",
  Visual: DayStructure,
};
export default beat;
