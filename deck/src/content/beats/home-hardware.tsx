"use client";

import { type Beat } from "./_types";
import { HomeHardware } from "@/components/scenes/r19/HomeHardware";

const beat: Beat = {
  title: "What do you need at home?",
  source: "First image: generated, not real · second: my home server, Oct 2026 · step 3: my memory notes (Perlmutter keeper via scrontab every 5 min, back by itself after the 21 Oct maintenance; Polaris as course backup; home server 4 cores/7 GB, no heavy compute, ScienceDash, Tailscale to phone) and my Claude Code instructions (Codex via ChatGPT subscription, used for second opinions and review)",
  Scene: HomeHardware,
};

export default beat;
