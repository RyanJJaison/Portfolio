// "Who I am" on the home page. Ryan will supply the text; until then each section renders as a marked placeholder.
export type AboutSection = { heading: string; paragraphs: string[] | null; prompt: string };

export const about = {
  title: "Who I am",
  aside: "In my own words, soon",
  sections: [
    { heading: "Where it started", paragraphs: null, prompt: "How you got into computing and AI." },
    { heading: "What I build", paragraphs: null, prompt: "The kind of problems you like solving, and why." },
    { heading: "Where I'm going", paragraphs: null, prompt: "What you want to be doing in a few years." },
  ] as AboutSection[],
  // Verified facts shown beside the essay.
  facts: [
    { label: "Based in", value: "Bangalore, India" },
    { label: "Studying", value: "B.Tech, Artificial Intelligence · Christ University · 2nd year" },
    { label: "Certified", value: "AWS Certified AI Practitioner" },
    { label: "Route", value: "Kottayam → Kochi → Bangalore" },
  ],
};

// The six fields the hero fans out to. `seen` names real work in each.
export const interests = [
  { name: "Deep Learning", seen: "PyTorch · neural networks" },
  { name: "Graph ML", seen: "SentriX · PageRank + GraphSAGE" },
  { name: "Speech & Language", seen: "Lahja · Whisper, NLLB" },
  { name: "Systems & Backends", seen: "FastAPI · Flask · Postgres" },
  { name: "Hardware & IoT", seen: "ESP32 fall-detection wearable" },
  { name: "Cloud AI", seen: "AWS · Bedrock · SageMaker" },
];
