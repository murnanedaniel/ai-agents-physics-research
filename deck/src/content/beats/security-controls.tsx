"use client";

import type { Beat } from "./_types";
import { SecurityControlsScene } from "@/components/scenes/g10/SecurityControls";

const beat: Beat = {
  title: "Permissions and sandboxes set different boundaries.",
  source: "code.claude.com/docs: permission-modes, sandboxing (read 20 Oct 2026)",
  Scene: SecurityControlsScene,
};

export default beat;
