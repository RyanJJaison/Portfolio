// "Who I am" on the home page.
// PLACEHOLDER: facts only, taken from the CV and the other content files. Ryan will rewrite these in his own words.
export type AboutSection = { heading: string; paragraphs: string[] | null; prompt: string };

export const about = {
  title: "Who I am",
  sections: [
    { heading: "Where it started", paragraphs: ["I grew up in Kottayam and went to school there until Class 10, then moved to Kochi for Classes 11 and 12. In 2025 I started a B.Tech in Artificial Intelligence at Christ University, Bangalore."], prompt: "How you got into computing and AI." },
    { heading: "What I build", paragraphs: ["Applied AI with a real job to do: graph models that flag risky Bitcoin transactions, speech recognition for Kokborok, a study tool that answers from your own notes, and a wearable that calls for help after a fall."], prompt: "The kind of problems you like solving, and why." },
    { heading: "Where I'm going", paragraphs: ["Next is the AWS Machine Learning Engineer, Associate exam, and an AI/ML internship where I can keep building systems like these."], prompt: "What you want to be doing in a few years." },
  ] as AboutSection[],
  // Verified facts shown beside the essay.
  facts: [
    { label: "Based in", value: "Bangalore, India" },
    { label: "Studying", value: "B.Tech, Artificial Intelligence · Christ University · 2nd year" },
    { label: "Certified", value: "AWS Certified AI Practitioner" },
    { label: "Route", value: "Kottayam → Kochi → Bangalore" },
  ],
};
