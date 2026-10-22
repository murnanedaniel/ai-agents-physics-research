"use client";

import type { Beat } from "./_types";
import { AutoVsManualGeneral } from "@/components/scenes/r34/AutoVsManualGeneral";

const beat: Beat = {
  title: "Should you approve every action, or let auto mode decide?",
  source: "Auto mode classifier, blocked and allowed by default: code.claude.com/docs/en/permission-modes (read 22 Oct 2026)",
  Scene: AutoVsManualGeneral,
};

export default beat;
