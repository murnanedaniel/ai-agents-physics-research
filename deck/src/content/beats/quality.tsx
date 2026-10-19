"use client";

import { type Beat, d } from "./_types";
import { asset } from "@/lib/asset";

function Quality() { return <img className="quality-chart" src={asset("/quality/pushback.png")} alt="Line chart: share of the researcher\u2019s messages that push back on the agent, falling from 46% in May to 29% in October 2026; outright corrections stay near 15%." />; }

const beat: Beat = {kicker: "Q2 · measured, not remembered", title: "Six months of working with agents", lines: ["About 2,000 of my messages to Claude (Apr–Oct 2026), each labelled by a small model: correction, challenge, praise or instruction.", "Pushback fell from 46% to 29%, almost all of it fewer \u201care you sure?\u201d challenges. Outright corrections stayed around 15%.", "Model, month, project and my own skill move together: this is a trend in working practice, not a model ranking."], links: [d("evidence/quality-over-time/", "quality over time"), d("methodology/", "methodology")], Visual: Quality};

export default beat;
