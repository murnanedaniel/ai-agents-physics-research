"use client";

import { useEffect, useRef, useState } from "react";
import { SCENES } from "@/lib/timeline";
import { SECTIONS, sectionIndexOf } from "@/lib/sections";

type Props = {
  sceneIdx: number;
  open: boolean;
  onToggle: () => void;
  onJump: (sceneIdx: number) => void;
};

export function SectionNav({ sceneIdx, open, onToggle, onJump }: Props) {
  const current = sectionIndexOf(sceneIdx);
  const [browse, setBrowse] = useState({ sceneIdx, open, index: current });
  const currentRow = useRef<HTMLButtonElement>(null);

  // Reset browsing on navigation or opening, before rendering the scene list.
  // Dot clicks supply the next open state so their explicit selection wins.
  if (browse.sceneIdx !== sceneIdx || browse.open !== open) {
    setBrowse({ sceneIdx, open, index: open ? current : browse.index });
  }
  const section = SECTIONS[browse.index];

  useEffect(() => {
    if (open) currentRow.current?.scrollIntoView({ block: "nearest" });
  }, [open, sceneIdx]);

  return (
    <nav
      className={`snav-root${open ? " snav-open" : ""}`}
      aria-label="Slide sections"
      onClick={(e) => {
        e.stopPropagation();
        // Hand focus back to the deck so arrow keys keep stepping slides.
        if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
      }}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
    >
      <div className="snav-rail">
        <button
          type="button"
          className="snav-toggle"
          aria-label="Sections (M)"
          aria-expanded={open}
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
        >☰</button>
        <div className="snav-dots">
          {SECTIONS.map((item, index) => (
            <button
              key={item.start}
              type="button"
              className={`snav-dot${index === current ? " snav-dot-current" : ""}`}
              aria-label={`Browse ${item.name}`}
              aria-current={index === current ? "true" : undefined}
              title={item.name}
              onClick={(e) => {
                e.stopPropagation();
                setBrowse({ sceneIdx, open: true, index });
                if (!open) onToggle();
              }}
            />
          ))}
        </div>
      </div>
      {open && (
        <div className="snav-panel">
          <div className="snav-sections">
            <div className="snav-heading">Sections</div>
            {SECTIONS.map((item, index) => {
              const n = item.last - item.first + 1;
              const isCurrent = index === current;
              return (
                <button
                  key={item.start}
                  type="button"
                  className={`snav-card${isCurrent ? " snav-card-current" : ""}${index === browse.index && !isCurrent ? " snav-card-browsed" : ""}`}
                  aria-pressed={index === browse.index}
                  onClick={(e) => { e.stopPropagation(); setBrowse({ sceneIdx, open, index }); }}
                >
                  <span className="snav-meta">{String(index + 1).padStart(2, "0")} · {n} slides</span>
                  <span className="snav-name">{item.name}</span>
                  {isCurrent && (
                    <span className="snav-progress">
                      <span style={{ width: `${100 * (sceneIdx - item.first + 1) / n}%` }} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="snav-scenes">
            <div className="snav-heading">{section.name}</div>
            {SCENES.slice(section.first, section.last + 1).map((scene, index) => {
              const globalIndex = section.first + index;
              const isCurrent = globalIndex === sceneIdx;
              return (
                <button
                  key={scene.id}
                  ref={isCurrent ? currentRow : undefined}
                  type="button"
                  className={`snav-row${isCurrent ? " snav-row-current" : ""}`}
                  aria-current={isCurrent ? "step" : undefined}
                  onClick={(e) => { e.stopPropagation(); onJump(globalIndex); }}
                >
                  <span className="snav-number">{index + 1}</span>
                  <span className={`snav-thumb snav-thumb-${scene.theme}`} aria-hidden="true">{scene.label}</span>
                  <span className="snav-label">{scene.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
