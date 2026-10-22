// Agentic-AI papers across physics-adjacent fields, Jan 2024 to Oct 2026.
// Copied from the ETH deck (src/components/scenes/StatsFeint.tsx). Curated by
// Daniel: particle physics from his own reading list; other fields from
// agent-run literature searches with each arXiv ID checked.
// month 0 = Jan 2024, 33 = Oct 2026. The first search ran to Jun 2026. On
// 2026-10-22 an arXiv API search (agent/agentic + LLM, by category) added 15
// particle-physics papers (any date) and a Jul to Oct 2026 sample for the six
// other fields, each id, title and date checked against arXiv. Particle physics
// is close to complete; the other fields are a sample (materials, chemistry and
// biology have several times more agentic papers per month on arXiv).
// "Agentic" here = an LLM agent that acts (runs code, tools or experiments).
// Totals: 153 papers, 37 in particle physics. One duplicate (2406.13163, listed under
// both materials and chemistry in ETH) is kept once, under materials.

export type Field = "particle" | "theory" | "astro" | "climate" | "materials" | "chemistry" | "biology";

export type Paper = {
  field: Field;
  month: number;
  id: string;          // arxiv id or "doi:..."
  title: string;       // short, slide-friendly
};

export const PAPERS: Paper[] = [
  // ── Particle physics (Daniel's curated) ───────────────────────────
  { field: "particle",  month: 8,  id: "2409.06336", title: "Towards Agentic AI on Particle Accelerators" },
  { field: "particle",  month: 20, id: "2509.17255", title: "Multi-Stage Physics at a Particle Accelerator" },
  { field: "particle",  month: 21, id: "2510.02426", title: "ArgoLOOM" },
  { field: "particle",  month: 22, id: "2511.02824", title: "Kosmos: AI Scientist for Autonomous Discovery" },
  { field: "particle",  month: 23, id: "2512.07785", title: "Automating HEP Data Analysis with LLM Agents" },
  { field: "particle",  month: 23, id: "2512.15867", title: "HEPTAPOD" },
  { field: "particle",  month: 25, id: "2602.06496", title: "CoLLM · end-to-end deep learning toolbox" },
  { field: "particle",  month: 25, id: "2602.15039", title: "GRACE · experiment design + simulation" },
  { field: "particle",  month: 25, id: "2602.17536", title: "Toward a Fully Autonomous AI-Native Particle Accelerator" },
  { field: "particle",  month: 25, id: "2602.17582", title: "AI-native Research Ecosystem · Community Vision" },
  { field: "particle",  month: 26, id: "2603.05735", title: "LEP Open Data · agentic measurement" },
  { field: "particle",  month: 26, id: "2603.14553", title: "End-to-end Architecture for Collider Physics" },
  { field: "particle",  month: 26, id: "2603.20179", title: "AI Agents Already Autonomously Perform HEP" },
  { field: "particle",  month: 27, id: "2604.14696", title: "LLM Code Gen from HEP Publications" },
  { field: "particle",  month: 27, id: "2604.14718", title: "The Agentification of Scientific Research" },
  { field: "particle",  month: 27, id: "2604.18752", title: "Scientific Human-Agent Reproduction Pipeline" },
  { field: "particle",  month: 27, id: "2604.21804", title: "Phenomenological Detector Design with Agents" },
  { field: "particle",  month: 28, id: "2605.13950", title: "Collider-Bench · benchmarking agents on analysis reproduction" },
  { field: "particle",  month: 28, id: "2605.17318", title: "RooAgent · LLM agent for ROOT-based HEP analysis" },
  { field: "particle",  month: 29, id: "2606.10381", title: "Agentic Hybrid RAG · evidence-grounded muon-collider analysis" },
  { field: "particle",  month: 29, id: "2606.13535", title: "AgentRivet · Rivet routines from publications" },
  { field: "particle",  month: 9,  id: "2410.15222", title: "AutoFLUKA · LLM-run FLUKA Monte Carlo" },
  { field: "particle",  month: 20, id: "2509.08535", title: "Agents of Discovery" },
  { field: "particle",  month: 24, id: "2601.21015", title: "MadAgents" },
  { field: "particle",  month: 27, id: "2604.22541", title: "Dr.Sai · agentic physics analysis at BESIII" },
  { field: "particle",  month: 29, id: "2606.31214", title: "EasyScan_HEP 2 · agent parameter scans" },
  { field: "particle",  month: 29, id: "2606.18294", title: "Vision AI agent · LEGEND-1000 material monitoring" },
  { field: "particle",  month: 30, id: "2607.22331", title: "SMEFT-Pheno-Agent" },
  { field: "particle",  month: 30, id: "2607.22813", title: "Agentic re-casting with agentic re-simulations" },
  { field: "particle",  month: 31, id: "2608.07138", title: "Autonomous discovery of accelerator commissioning" },
  { field: "particle",  month: 31, id: "2608.28244", title: "HEPLocalAgent · collider simulations from plain language" },
  { field: "particle",  month: 31, id: "2609.00107", title: "Reining in an agentic harness for HEP" },
  { field: "particle",  month: 33, id: "2610.12862", title: "HepUKE · knowledge evolution for HEP analysis agents" },
  { field: "particle",  month: 33, id: "2610.15615", title: "Brilliance · autonomous accelerator physics research" },
  { field: "particle",  month: 33, id: "2610.16607", title: "CorsikaAgent · cosmic-ray air-shower simulation" },
  { field: "particle",  month: 33, id: "2610.18454", title: "HEPTABench · agentic evaluations in HEP" },
  { field: "particle",  month: 33, id: "",           title: "chATLAS (arXiv, Oct 2026)" },

  // ── Theoretical physics ────────────────────────────────────────────
  { field: "theory",    month: 2,  id: "2403.03154", title: "Quantum Many-Body with LLMs" },
  { field: "theory",    month: 13, id: "2502.15815", title: "TPBench · theoretical physics benchmark" },
  { field: "theory",    month: 17, id: "2506.06214", title: "Theoretical Physics + Language Agents" },
  { field: "theory",    month: 21, id: "2510.05228", title: "CMT-Benchmark · condensed matter theory" },
  { field: "theory",    month: 23, id: "2512.19799", title: "PhysMaster · autonomous AI physicist" },
  { field: "theory",    month: 24, id: "2601.02484", title: "Schwartz × Claude · C-parameter Sudakov" },
  { field: "theory",    month: 26, id: "2603.04735", title: "Open Problem in Theoretical Physics via AI" },
  { field: "theory",    month: 26, id: "2603.22538", title: "FERMIACC · agents for particle theory" },
  { field: "theory",    month: 26, id: "2603.26990", title: "Agentic Diagrammatica · symbolic HEP" },
  { field: "theory",    month: 26, id: "2603.28935", title: "ALBERT · autonomous theory discovery" },
  { field: "theory",    month: 27, id: "2604.15411", title: "PRL-Bench · frontier physics LLM benchmark" },
  { field: "theory",    month: 29, id: "2606.18648", title: "Deep Research in Physical Sciences · multi-agent benchmark" },
  { field: "theory",    month: 29, id: "2606.13380", title: "Autonomous Variational Quantum Circuit Design" },
  { field: "theory",    month: 29, id: "2606.19425", title: "LeWRON · agentic analysis of electroweak phase transitions" },
  { field: "theory",    month: 30, id: "2607.13930", title: "NNStar · agent for neutron-star physics" },
  { field: "theory",    month: 30, id: "2607.15001", title: "LQCDMaster · agentic lattice QCD computing" },
  { field: "theory",    month: 30, id: "2607.27822", title: "CLVisc Agent · heavy-ion hydrodynamics" },
  { field: "theory",    month: 32, id: "2609.32225", title: "LaMET-Agent · large-momentum EFT analysis" },
  { field: "theory",    month: 32, id: "2610.00435", title: "How AI agents discover scientific equations" },
  { field: "theory",    month: 33, id: "2610.21118", title: "PTagent · phase-transition model construction" },
  { field: "theory",    month: 33, id: "2610.21942", title: "Jianmu-Q · QFT to quantum simulation with agents" },

  // ── Astrophysics ───────────────────────────────────────────────────
  { field: "astro",     month: 8,  id: "2409.14807", title: "mephisto v1 · multi-band galaxy LLM" },
  { field: "astro",     month: 10, id: "2412.00431", title: "cmbagent v1 · cosmological parameter analysis" },
  { field: "astro",     month: 11, id: "2412.06412", title: "StarWhisper Telescope · end-to-end automation" },
  { field: "astro",     month: 14, id: "2503.23170", title: "AstroAgents · hypothesis from mass spectrometry" },
  { field: "astro",     month: 15, id: "2504.03424", title: "The AI Cosmologist I" },
  { field: "astro",     month: 18, id: "2507.07155", title: "RAG agents · autonomous astro discovery" },
  { field: "astro",     month: 18, id: "2507.07257", title: "cmbagent · open-source planning + control" },
  { field: "astro",     month: 21, id: "2510.08354", title: "Mephisto · self-improving multi-band LLM" },
  { field: "astro",     month: 23, id: "2512.01270", title: "Egent · equivalent-width measurement" },
  { field: "astro",     month: 23, id: "2512.24754", title: "AstroReview · telescope proposal review" },
  { field: "astro",     month: 26, id: "2603.26953", title: "ASTER · agentic exoplanet research" },
  { field: "astro",     month: 27, id: "2604.09621", title: "Competing with AI Scientists · Astrophysics" },
  { field: "astro",     month: 28, id: "2605.14791", title: "Beyond AI as Assistants · autonomous discovery in cosmology" },
  { field: "astro",     month: 29, id: "2606.11157", title: "DarkAgents · multi-agent theoretical astroparticle physics" },
  { field: "astro",     month: 30, id: "2607.13549", title: "JW-ASTClaw · LLM-driven solar telescope control" },
  { field: "astro",     month: 32, id: "2609.35900", title: "Agents reproducing astronomy papers end to end" },
  { field: "astro",     month: 33, id: "2610.14185", title: "AI agents for IXPE X-ray polarimetry analysis" },
  { field: "astro",     month: 33, id: "2610.16536", title: "CosmoAgent · theoretical cosmology" },

  // ── Climate / earth science ───────────────────────────────────────
  { field: "climate",   month: 0,  id: "2401.09646", title: "ClimateGPT · interdisciplinary synthesis" },
  { field: "climate",   month: 10, id: "2411.13724", title: "LLMs for Climate Forecasting" },
  { field: "climate",   month: 14, id: "2503.05854", title: "Multi-Agent LLM Earth Science Discovery" },
  { field: "climate",   month: 15, id: "2504.04319", title: "Geo-OLM · sustainable earth observation" },
  { field: "climate",   month: 15, id: "2504.12110", title: "LLM Agents for Earth Observation" },
  { field: "climate",   month: 19, id: "2508.04719", title: "GeoFlow · agentic geospatial workflow" },
  { field: "climate",   month: 20, id: "2509.23141", title: "Earth-Agent · earth observation agents" },
  { field: "climate",   month: 21, id: "2510.18318", title: "Earth AI · geospatial foundation models" },
  { field: "climate",   month: 22, id: "2511.20109", title: "ClimateAgent · multi-agent climate workflows" },
  { field: "climate",   month: 24, id: "2601.01891", title: "Agentic AI in Remote Sensing · taxonomy" },
  { field: "climate",   month: 25, id: "2602.09723", title: "AI-Assisted Scientific Assessment · climate" },
  { field: "climate",   month: 26, id: "2603.13840", title: "ClimateAgents · social-climate dynamics" },
  { field: "climate",   month: 26, id: "2603.22148", title: "OpenEarth-Agent · tool calling → tool creation" },
  { field: "climate",   month: 27, id: "2604.01647", title: "Multi-Agent Environmental Data Workflows" },
  { field: "climate",   month: 27, id: "2604.16922", title: "ClimAgent · open-ended climate science" },
  { field: "climate",   month: 30, id: "2607.23983", title: "HydroAgent · skill-orchestrated flood forecasting" },
  { field: "climate",   month: 31, id: "2608.18272", title: "SeisEvo · agents evolve seismic reconstruction" },
  { field: "climate",   month: 32, id: "2610.03780", title: "OceanMind · multi-agent ocean diagnosis" },

  // ── Condensed matter / materials ──────────────────────────────────
  { field: "materials", month: 5,  id: "2406.13163", title: "LLMatDesign · autonomous materials discovery" },
  { field: "materials", month: 12, id: "2501.10385", title: "AILA · autonomous microscopy LLM agents" },
  { field: "materials", month: 15, id: "2504.00741", title: "MatAgent · accelerated inorganic design" },
  { field: "materials", month: 17, id: "2506.05616", title: "MAPPS · planning + physics + scientists" },
  { field: "materials", month: 21, id: "2510.09901", title: "Autonomous Agents for Discovery (orchestration)" },
  { field: "materials", month: 23, id: "2512.19458", title: "Agentic Framework · autonomous materials computation" },
  { field: "materials", month: 24, id: "2602.00169", title: "Agentic Intelligence for Materials Science" },
  { field: "materials", month: 25, id: "2602.07491", title: "GraphAgents · cross-domain materials design" },
  { field: "materials", month: 27, id: "2604.02688", title: "MatClaw · code-first materials exploration" },
  { field: "materials", month: 27, id: "2604.11957", title: "A-Lab GPSS · self-driving lithium halide lab" },
  { field: "materials", month: 27, id: "2604.19789", title: "From Data to Theory · autonomous materials" },
  { field: "materials", month: 27, id: "2604.23758", title: "ElementsClaw · agentic atomic+language fusion" },
  { field: "materials", month: 31, id: "2608.20434", title: "LLM agent for end-to-end materials discovery" },
  { field: "materials", month: 31, id: "2609.00070", title: "AutoXRD · agents for powder diffraction" },
  { field: "materials", month: 32, id: "2609.27302", title: "Agentic scanning tunnelling microscopy" },
  { field: "materials", month: 33, id: "2610.20779", title: "LLM agents for many-body perturbation theory" },
  { field: "materials", month: 33, id: "2610.25619", title: "LLM agent for adaptive spectral analysis" },
  { field: "materials", month: 33, id: "2610.28629", title: "GBClaw · agentic grain-boundary research" },

  // ── Chemistry ──────────────────────────────────────────────────────
  { field: "chemistry", month: 6,  id: "2407.01603", title: "Review · LLMs + autonomous agents in chemistry" },
  { field: "chemistry", month: 10, id: "2411.15692", title: "DrugAgent · multi-agent drug discovery" },
  { field: "chemistry", month: 13, id: "2502.17506", title: "CLADD · RAG-enhanced drug discovery agents" },
  { field: "chemistry", month: 16, id: "2505.07027", title: "LLM-Augmented Synthesis Decision Programs" },
  { field: "chemistry", month: 18, id: "2507.17448", title: "Reasoning-driven retrosynthesis · LLM + RL" },
  { field: "chemistry", month: 19, id: "2508.14111", title: "From AI for Science to Agentic Science · survey" },
  { field: "chemistry", month: 20, id: "2509.20988", title: "AOT* · synthesis planning via LLM tree search" },
  { field: "chemistry", month: 20, id: "2509.25651", title: "AutoLabs · autonomous chemical experimentation" },
  { field: "chemistry", month: 21, id: "2510.16590", title: "Atom-anchored LLMs · retrosynthesis demo" },
  { field: "chemistry", month: 24, id: "2601.17687", title: "ChemCRAFT · agentic RL chemical models" },
  { field: "chemistry", month: 26, id: "2603.01311", title: "Catalyst-Agent · autonomous catalyst screening" },
  { field: "chemistry", month: 26, id: "2603.03655", title: "Mozi · governed autonomy for drug discovery" },
  { field: "chemistry", month: 30, id: "2607.14512", title: "RetroAgent · agentic retrosynthesis planning" },
  { field: "chemistry", month: 30, id: "2607.19406", title: "NMR elucidation as agentic search" },
  { field: "chemistry", month: 32, id: "2609.13357", title: "Agents running multireference quantum chemistry" },
  { field: "chemistry", month: 32, id: "2609.14840", title: "El Agente Potente · high-throughput atomistic simulations" },
  { field: "chemistry", month: 32, id: "2609.19419", title: "Agentic density-functional development" },
  { field: "chemistry", month: 32, id: "2609.39302", title: "SQD-Agent · quantum chemistry workflows" },
  { field: "chemistry", month: 33, id: "2610.27230", title: "Magnolia · persistent-memory computational chemistry agent" },

  // ── Biology / drug discovery ──────────────────────────────────────
  { field: "biology",   month: 3,  id: "2404.18021", title: "CRISPR-GPT · LLM agent for gene editing" },
  { field: "biology",   month: 4,  id: "2405.17631", title: "BioDiscoveryAgent · genetic perturbation design" },
  { field: "biology",   month: 10, id: "doi:10.1101/2024.11.11.623004", title: "Virtual Lab · SARS-CoV-2 nanobody design" },
  { field: "biology",   month: 12, id: "2501.04227", title: "Agent Laboratory · LLM research assistants" },
  { field: "biology",   month: 13, id: "2502.18864", title: "AI Co-Scientist · Google DeepMind" },
  { field: "biology",   month: 16, id: "2505.13400", title: "Robin · multi-agent scientific discovery" },
  { field: "biology",   month: 17, id: "doi:10.1101/2025.05.30.656746", title: "Biomni · biomedical AI agent" },
  { field: "biology",   month: 17, id: "doi:10.1101/2025.06.03.657658", title: "OriGene · self-evolving virtual biologist" },
  { field: "biology",   month: 18, id: "2507.02004", title: "STELLA · self-evolving biomed agent" },
  { field: "biology",   month: 18, id: "2507.09023", title: "Tippy · DMTA cycle drug discovery" },
  { field: "biology",   month: 20, id: "doi:10.1101/2025.09.01.673319", title: "BioML-bench · agent eval for biomed ML" },
  { field: "biology",   month: 21, id: "2510.27130", title: "AI Agents in Drug Discovery" },
  { field: "biology",   month: 25, id: "2602.10163", title: "Beyond SMILES · agentic drug discovery eval" },
  { field: "biology",   month: 26, id: "doi:10.1038/s41551-026-01634-6", title: "BioMedAgent · multi-agent biomed analysis" },
  { field: "biology",   month: 30, id: "2607.25045", title: "CogEEGAgent · autonomous EEG analysis" },
  { field: "biology",   month: 30, id: "2607.29007", title: "EasyBCI Agent · neural data preprocessing" },
  { field: "biology",   month: 31, id: "2608.16951", title: "The Little Scientist · agent-driven discovery" },
  { field: "biology",   month: 31, id: "2608.25286", title: "BixBench3 · agents on study-scale computational biology" },
  { field: "biology",   month: 31, id: "2608.28990", title: "Agentic AI finds cross-tissue protein co-abundance" },
  { field: "biology",   month: 32, id: "2609.28557", title: "BaseCamp · agentic DNA sequencing pipelines" },
  { field: "biology",   month: 33, id: "2610.22617", title: "Agentic optical pooled screen analysis" },
  { field: "biology",   month: 33, id: "2610.24806", title: "Aptamers · lab-in-the-loop agentic discovery" },
];

export const FIELD_ORDER: Field[] = ["particle", "theory", "astro", "climate", "materials", "chemistry", "biology"];
export const FIELD_LABEL: Record<Field, string> = {
  particle:  "particle physics",
  theory:    "theoretical physics",
  astro:     "astrophysics",
  climate:   "climate",
  materials: "condensed matter",
  chemistry: "chemistry",
  biology:   "biology",
};

export const MONTHS = 34;
