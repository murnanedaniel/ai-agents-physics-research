import type { Beat } from "./_types";
import { withSectionTag } from "@/components/scenes/r34/SectionTag";
import { Style } from "@/components/scenes/r5/Style";

const beat: Beat = {
  title: "Does generated prose leave a trace?",
  Scene: withSectionTag("Writing", Style),
  source: "Kobak et al., Science Advances 2025, arXiv:2406.07016v5 §2.1–2.2: 15.1M PubMed abstracts, 2010–2024; expected frequency extrapolated from 2021–22",
};

export default beat;
