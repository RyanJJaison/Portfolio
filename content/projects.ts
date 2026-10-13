export type Status =
  | "Completed"
  | "Ongoing"
  | "Research proposal"
  | "Collaboration"
  | "Planned";

export type Project = {
  slug: string;
  title: string;
  status: Status;
  featured: boolean;
  summary: string;
  role: string; // TODO markers = unconfirmed, do not publish as-is
  stack: string[];
  skills: string[]; // names from content/skills.ts, drawn as edges in the skill graph
  repo?: string;
  live?: string;
  facts: string[];
};

export const projects: Project[] = [
  {
    slug: "sentrix",
    title: "SentriX",
    status: "Collaboration",
    featured: true,
    summary:
      "Graph-based risk scoring for Bitcoin transactions on the Elliptic dataset.",
    role: "TODO: confirm your specific part, and whether the ODT risk monitor dashboard is this project.",
    stack: ["PyTorch", "PyG", "NetworkX", "GraphSAGE"],
    skills: ["Machine Learning", "Neural Networks", "PyTorch", "Graph Neural Networks", "PageRank", "Python"],
    repo: "https://github.com/RyanJJaison/SentriX",
    facts: [
      "Personalized PageRank proximity features plus raw node features feed a GraphSAGE classifier.",
      "Adding four PPR columns to Elliptic's 165 raw node features raises held-out illicit-class F1 from 0.5340 ± 0.0186 to 0.6943 ± 0.0204, and AUC from 0.8966 to 0.9570 (3 seeds).",
      "PPR is seeded per time step from that step's confirmed-illicit transactions, with leave-one-out so a node is never its own seed.",
      "Temporal split, leave-one-out validation, two-stage training.",
    ],
  },
  {
    slug: "lahja",
    title: "Lahja",
    status: "Collaboration",
    featured: true,
    summary:
      "Kokborok language platform: text-to-speech, translation, chatbot and speech-to-text.",
    role: "Built speech-to-text, voice-to-voice, transcription and translation; trained a ~245M-parameter Whisper model on a large body of unlabelled video and audio.",
    stack: ["FastAPI", "Next.js", "Whisper"],
    skills: ["Deep Learning", "PyTorch", "NLP", "Whisper", "FastAPI", "Python"],
    repo: "https://github.com/RyanJJaison/Lahja",
    facts: [
      "TODO: confirm training data unit (samples, hours, seconds) and how unlabelled data was used.",
    ],
  },
  {
    slug: "clarity",
    title: "Clarity",
    status: "Collaboration",
    featured: true,
    summary:
      "AI learning companion: RAG tutor, adaptive quizzes, spaced repetition, courses generated from uploaded material.",
    role: "Built the backend: the vector DB, ingestion of user material, and pulling in relevant web material to produce tailored study content.",
    stack: ["Next.js", "Supabase", "pgvector", "Claude", "Voyage"],
    skills: ["Generative AI", "Foundational Models", "NLP", "RAG & vector search"],
    repo: "https://github.com/RyanJJaison/Clarity",
    facts: ["TODO: confirm which parts were trained or built by Ryan."],
  },
  {
    slug: "fall-detection",
    title: "Fall Detection Wearable",
    status: "Completed",
    featured: true,
    summary:
      "Wearable with ESP32, MPU6050, MAX30102, GPS and OLED, alerting through Blynk.",
    role: "Built by Ryan.",
    stack: ["ESP32", "MPU6050", "MAX30102", "GPS", "Blynk"],
    skills: ["ESP32", "Embedded sensors"],
    facts: ["No public repo or video available."],
  },
  {
    slug: "task-manager",
    title: "Task-manager",
    status: "Completed",
    featured: false,
    summary: "Python app with estimation, reminders and scheduling.",
    role: "Built by Ryan.",
    stack: ["Python"],
    skills: ["Python"],
    repo: "https://github.com/RyanJJaison/Task-manager",
    facts: ["Live on Vercel. TODO: add live URL."],
  },
];
