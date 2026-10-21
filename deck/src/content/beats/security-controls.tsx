"use client";

import type { Beat } from "./_types";
import { SecurityControlsScene } from "@/components/scenes/r12/SecurityControls";

const beat: Beat = {
  title: "Which controls can cut a leg?",
  source: "code.claude.com/docs: permission-modes, sandboxing (read 20 Oct 2026)",
  Scene: SecurityControlsScene,
};

export default beat;
