import type { Beat } from "./_types";
import { ScalingR3 } from "@/components/scenes/r3/ScalingR3";

const beat: Beat = {
  title: "Where did better models come from?",
  source: "Kaplan et al. 2020, arXiv:2001.08361, Eq. 1.3 · Hoffmann et al. 2022, arXiv:2203.15556, Eq. 10 fit at 5.76e23 FLOPs · Snell et al. 2024, arXiv:2408.03314",
  Scene: ScalingR3,
};

export default beat;
