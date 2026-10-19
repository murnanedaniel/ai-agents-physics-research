"use client";

import { Fragment, useState } from "react";
import { SCENES, type Part } from "@/lib/timeline";
import { type Beat, d } from "./_types";

const PARTS: { part: Part; name: string }[] = [
  { part: "setup", name: "Setup" },
  { part: "inner", name: "Inner loop" },
  { part: "middle", name: "Middle loop" },
  { part: "outer", name: "Outer loop" },
  { part: "close", name: "Close" },
];
const sections = PARTS.map(({ part, name }) => ({
  part, name, scenes: SCENES.filter((scene) => scene.part === part),
})).filter(({ scenes }) => scenes.length > 0);

function clock(seconds: number) {
  const minutes = 9 * 60 + Math.floor(seconds / 60);
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

function BreakRow({ start, end }: { start: number; end: number }) {
  return <div className="agenda-break">
    <span>{end - start >= 45 * 60 ? "Lunch" : "Break"}</span>
    <span className="agenda-clock">{clock(start)}–{clock(end)}</span>
  </div>;
}

export function DayStructure() {
  const [open, setOpen] = useState<Set<Part>>(() => new Set());
  const allOpen = sections.every(({ part }) => open.has(part));

  return <div
    className="course-card agenda"
    onClick={(event) => event.stopPropagation()}
    onKeyDown={(event) => event.stopPropagation()}
    onKeyUp={(event) => event.stopPropagation()}
  >
    <div className="agenda-toolbar">
      <button type="button" onClick={() => setOpen(allOpen ? new Set() : new Set(sections.map(({ part }) => part)))}>
        {allOpen ? "Collapse all" : "Expand all"}
      </button>
    </div>
    {sections.map(({ part, name, scenes }, index) => {
      const first = scenes[0];
      const last = scenes[scenes.length - 1];
      const previous = sections[index - 1]?.scenes.at(-1);
      const expanded = open.has(part);
      const projects = scenes.filter(({ id }) => id.startsWith("p-")).length;
      const handsOn = scenes.filter(({ id }) => id.startsWith("hands-on-")).length;
      return <Fragment key={part}>
        {previous && first.startSec > previous.endSec && <BreakRow start={previous.endSec} end={first.startSec} />}
        <button
          type="button"
          className="agenda-section"
          aria-expanded={expanded}
          aria-controls={`agenda-${part}`}
          onClick={() => setOpen((current) => {
            const next = new Set(current);
            if (next.has(part)) next.delete(part);
            else next.add(part);
            return next;
          })}
        >
          <strong><span aria-hidden="true">{expanded ? "−" : "+"} </span>{name}</strong>
          <span className="agenda-clock">{clock(first.startSec)}–{clock(last.endSec)}</span>
          <span className="agenda-summary">{scenes.length} scenes · {projects} {projects === 1 ? "project" : "projects"} · {handsOn} hands-on</span>
        </button>
        <div id={`agenda-${part}`} hidden={!expanded}>
          {expanded && scenes.map((scene, sceneIndex) => {
            const prior = scenes[sceneIndex - 1];
            const marker = scene.id.startsWith("p-") ? "project" : scene.id.startsWith("hands-on-") ? "hands-on" : null;
            return <Fragment key={scene.id}>
              {prior && scene.startSec - prior.endSec >= 10 * 60 && <BreakRow start={prior.endSec} end={scene.startSec} />}
              <a className="agenda-scene" href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/?scene=${scene.id}`}>
                <span className="agenda-clock">{clock(scene.startSec)}</span>
                <span>{scene.label}</span>
                {marker && <span className="status-chip">{marker}</span>}
              </a>
            </Fragment>;
          })}
        </div>
      </Fragment>;
    })}
  </div>;
}

const beat: Beat = {
  kicker: "KIT · 22 October 2026",
  title: "Structure of the day",
  lines: [],
  links: [d("", "course home")],
  Visual: DayStructure,
};

export default beat;
