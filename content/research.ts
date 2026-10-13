export const researchPreface = [
  "Most of what I build starts with a question I can't answer yet. This page is where those questions live before they turn into projects: early ideas, proposals and directions I'm reading into, written down so I can be held to them.",
  "Nothing here is a published result. Each thread is labelled with where it honestly stands, and I'll update it as the work moves from reading, to experiments, to something I can show.",
  "The common thread is applying AI and engineering to problems outside the screen: places with little infrastructure, everyday resources like water, and decisions that benefit from good predictions.",
];

export type ResearchThread = {
  title: string;
  status: "Exploring" | "Research proposal" | "Planned";
  question: string;
  summary: string;
  tags: string[];
};

export const researchThreads: ResearchThread[] = [
  {
    title: "Multi-agent AI where infrastructure is thin",
    status: "Exploring",
    question: "How should a group of LLM agents share context and make decisions when connectivity and compute are limited?",
    summary:
      "Reading into how clusters of AI agents coordinate, and where that could help in settings like precision agriculture and edge healthcare, for example routing a diagnosis or a field alert without a reliable cloud connection.",
    tags: ["LLM agents", "Edge AI", "Agriculture", "Healthcare"],
  },
  {
    title: "Electrochemical precipitation for water hardness",
    status: "Research proposal",
    question: "Can an electric field remove calcium and magnesium from hard water without adding treatment chemicals?",
    summary:
      "A proposal to study electrochemical precipitation, where ions migrate to electrodes and settle out as scale, as a cleaner alternative to conventional chemical softening.",
    tags: ["Environmental engineering", "Electrochemistry", "Water"],
  },
  {
    title: "Predictive models from first principles",
    status: "Planned",
    question: "What do I understand about a predictive model once I've built every part of it myself?",
    summary:
      "Building predictive models from scratch in NumPy and PyTorch, then studying where they fail, as groundwork for applied predictive-analytics research.",
    tags: ["Predictive analytics", "PyTorch", "Deep learning"],
  },
];
