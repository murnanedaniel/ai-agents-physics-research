"use client";

import type { Beat } from "./_types";
import { AutoVsManual } from "@/components/scenes/r16/AutoVsManual";

const beat: Beat = {
  title: "Should you approve every action, or let auto mode decide?",
  source: "Modes: code.claude.com/docs/en/permission-modes · overnight idle 00:30 to 06:55 CEST, 21 Oct 2026: my build session log · blocks: my sessions, Oct 2026",
  Scene: AutoVsManual,
};

export default beat;
