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
    repo: "https://github.com/RyanJJaison/SentriX",
    facts: [
      "Personalized PageRank proximity features plus raw node features feed a GraphSAGE classifier.",
      "Illicit-class F1 0.5340 to 0.6943; AUC 0.8966 to 0.9570 (3-seed ablation).",
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
    repo: "https://github.com/RyanJJaison/Task-manager",
    facts: ["Live on Vercel. TODO: add live URL."],
  },
];
