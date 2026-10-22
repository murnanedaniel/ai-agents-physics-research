"use client";

import { Hep4mScene } from "@/components/scenes/r1/Hep4mScene";
import type { Beat } from "./_types";

const beat: Beat = {
  title: "Can one model do many reconstruction tasks?",
  Scene: Hep4mScene,
  source: "Kakati, Murnane et al., arXiv:2609.31862 · tasks: sec. 3.3 and appendix A (particle flow {TK,CL}→{TP}; detector sim {TP}→{TK,CL,CE}; flash sim {TP}→{RP}; refinement {RP}→{TP}; jet sim {TJ}→{TP}; charged-energy subtraction {CE}→{CF}) · modalities: github.com/FM-for-HEP/hep-any2any · paper-writing role: Daniel, round 3 feedback · audits: paper repo, Aug to Sep 2026 · GPU-hours: Perlmutter accounting, jobs matched by name (about 24k, Jun to Sep 2026)",
};

export default beat;
