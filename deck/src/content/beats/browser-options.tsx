"use client";

import type { Beat } from "./_types";
import { BrowserOptions } from "@/components/scenes/r17/BrowserOptions";

const beat: Beat = {
  title: "Which browser should the agent use?",
  source: "code.claude.com/docs (read 21 Oct 2026): chrome (your login state; Pro, Max, Team or Enterprise plan) · desktop, “Preview your app”, “Browse external sites” (clean profile; safety classifiers on clicks and typing) and “Let Claude use your computer” (macOS and Windows research preview, Pro or Max) · computer-use (CLI: macOS, Pro or Max; broadest and slowest) · playwright.dev: Installation, Authentication (headless; isolated contexts; saved login state)",
  Scene: BrowserOptions,
};

export default beat;
