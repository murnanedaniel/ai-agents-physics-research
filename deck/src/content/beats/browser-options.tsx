"use client";

import type { Beat } from "./_types";
import { BrowserOptions } from "@/components/scenes/r17/BrowserOptions";

const beat: Beat = {
  title: "Which browser should the agent use?",
  source: "code.claude.com/docs, read 21 Oct 2026: chrome, desktop (Preview your app; Browse external sites; computer use), computer-use · playwright.dev: Installation, Authentication",
  Scene: BrowserOptions,
};

export default beat;
