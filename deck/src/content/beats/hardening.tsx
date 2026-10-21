"use client";

import type { Beat } from "./_types";
import { Hardening } from "@/components/scenes/r16/Hardening";

const beat: Beat = {
  title: "What keeps an agent alive when the machine restarts?",
  source: "My setups and session logs, Oct 2026 · NERSC keeper: Slurm scrontab, every 5 min · load 15 on 4 cores: 20 Oct 2026 · maintenance: 21 Oct 2026",
  Scene: Hardening,
};

export default beat;
