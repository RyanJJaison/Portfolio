import type { PictureId } from "@/content/media";

// "Who I am" on the home page, written as a short letter.
// PLACEHOLDER: facts only, assembled from the CV and the other content files. Ryan will rewrite this in his own words.
export type LetterParagraph = { stage: PictureId; text: string };

export const about = {
  title: "Who I am",
  letter: [
    {
      stage: "vembanad",
      text: "I grew up in Kottayam, Kerala, and went to Chavara CMI Public School there from preschool to Class 10.",
    },
    {
      stage: "kochiWater",
      text: "For Classes 11 and 12 I moved to Kochi, to Rajagiri Christu Jayanthi Public School. I went back to Kochi in April 2026 for a one-month software internship at iLeaf Solutions.",
    },
    {
      stage: "christ",
      text: "Since June 2025 I have studied for a B.Tech in Artificial Intelligence at Christ University in Bangalore. I am in my second year, and in August 2026 I became an AWS Certified AI Practitioner.",
    },
    {
      stage: "ryan",
      text: "What I build is applied AI: graph models that flag risky Bitcoin transactions, speech recognition for Kokborok, a study tool that answers from your own notes, and a wearable that calls for help after a fall. I am looking for an AI/ML internship.",
    },
  ] as LetterParagraph[],
  signoff: { name: "Ryan Joseph Jaison", role: "B.Tech AI, Christ University, Bangalore" },
};
