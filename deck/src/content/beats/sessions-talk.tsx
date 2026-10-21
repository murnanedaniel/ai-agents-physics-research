"use client";

import { type Beat, d } from "./_types";
import { SessionsTalk } from "@/components/scenes/r11/SessionsTalk";

const beat: Beat = {
  title: "Can agents work with each other?",
  source: "My sessions, Sep to Oct 2026 (workstation, HPC cluster, desktop browser) · docs: patterns/sessions-message-sessions",
  links: [d("patterns/sessions-message-sessions/", "sessions message sessions")],
  Scene: SessionsTalk,
};

export default beat;
