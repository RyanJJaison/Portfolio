export type Status =
  | "Completed"
  | "Ongoing"
  | "Research proposal"
  | "Collaboration"
  | "Learning project"
  | "Planned";

export type ArchPart = { layer: string; tech: string; detail: string };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  status: Status;
  featured: boolean;
  /** What it is, in plain words. */
  what: string;
  /** Why it exists: the problem and the goal. */
  mission: string;
  role: string;
  /** Short, plain-language tour of how it is built. */
  architecture: ArchPart[];
  stack: string[];
  skills: string[]; // names from content/skills.ts, drawn as edges in the skill graph
  repo?: string;
  live?: string;
  model?: string; // Hugging Face model page
  context?: string;
  results?: string[];
};

export const projects: Project[] = [
  {
    slug: "sentrix",
    title: "SentriX",
    tagline: "Spotting illicit Bitcoin activity from the shape of the transaction graph.",
    status: "Collaboration",
    featured: true,
    what:
      "A monitoring platform that gives every Bitcoin transaction a risk score and explains why. It combines patterns in the transaction graph with signals from live network traffic, and shows investigators alerts, risk tables and the neighbourhood around any suspicious transaction.",
    mission:
      "Criminal money on Bitcoin rarely sits alone; it moves through chains of related transactions. We wanted a tool that uses those relationships, not just per-transaction features, to flag risk early, and that stays explainable and auditable enough for an investigating agency to trust it.",
    role:
      "Led Team Zenith for the Smart India Hackathon and was the primary contributor to the repository (24 of 26 commits).",
    context: "Smart India Hackathon problem SIH26146: AI-Powered Monitoring & Analysis of Bitcoin Transaction Traffic.",
    architecture: [
      { layer: "Graph ML", tech: "PyTorch, PyG, NetworkX", detail: "Personalized PageRank measures how close each transaction sits to known illicit ones; a GraphSAGE network uses that plus 165 raw features to classify risk." },
      { layer: "Data", tech: "Elliptic dataset, Neo4j", detail: "203,769 real Bitcoin transactions; the transaction graph is stored in Neo4j for fast neighbourhood lookups." },
      { layer: "Network traffic", tech: "tshark, pcap replay", detail: "Watches how transactions spread across peers and flags unusual broadcast patterns." },
      { layer: "Backend", tech: "FastAPI, JWT, APScheduler", detail: "Role-based access, an audit log of every query, and a background job that re-scores addresses as new data arrives." },
      { layer: "AI assistant", tech: "Gemini / OpenAI-compatible LLMs", detail: "A tool-using chat assistant that answers investigators' questions from the live data." },
      { layer: "Dashboard", tech: "React, Vite, Recharts", detail: "Alerts feed, risk tables, charts and graph drill-downs." },
    ],
    stack: ["PyTorch", "PyG", "GraphSAGE", "FastAPI", "Neo4j", "React"],
    skills: ["Machine Learning", "Neural Networks", "PyTorch", "Graph Neural Networks", "PageRank", "Python", "FastAPI"],
    repo: "https://github.com/RyanJJaison/SentriX",
    results: [
      "Adding four PageRank proximity features to Elliptic's 165 raw features raised held-out illicit-class F1 from 0.5340 ± 0.0186 to 0.6943 ± 0.0204, and AUC from 0.8966 to 0.9570 (3 seeds).",
    ],
  },
  {
    slug: "lahja",
    title: "Lahja",
    tagline: "Giving Kokborok a voice in modern AI.",
    status: "Collaboration",
    featured: true,
    what:
      "A language platform for Kokborok with four features: it reads Kokborok text aloud, translates between Kokborok and English, answers questions in Kokborok, and turns spoken Kokborok into text.",
    mission:
      "Kokborok is spoken by over a million people in Tripura and Bangladesh, yet no major speech or language model supports it: no voice, no speech recognition, no translation code. Lahja set out to close that gap honestly, telling the user which model produced each answer and how confident it is, instead of pretending to native support.",
    role:
      "Built the speech side: speech-to-text, voice-to-voice, transcription and translation, including fine-tuning and publishing a Kokborok speech-recognition model.",
    architecture: [
      { layer: "Speech to text", tech: "Whisper-small + LoRA, PyTorch, PEFT", detail: "Whisper has no Kokborok mode, so a small LoRA adapter (3.5M trainable parameters on the 244M-parameter model) was trained on Kokborok audio, using Bengali script as the bridge." },
      { layer: "Translation", tech: "Fine-tuned NLLB-200", detail: "Kokborok to English and back." },
      { layer: "Text to speech", tech: "Coqui XTTS v2", detail: "Clones a real Kokborok speaker's voice from a short reference clip." },
      { layer: "Chat", tech: "LLM via translation bridge", detail: "Questions are translated to English, answered, and translated back." },
      { layer: "App", tech: "FastAPI, Next.js", detail: "One backend runs every model; a web app sits on top." },
    ],
    stack: ["Whisper", "LoRA", "NLLB-200", "XTTS", "FastAPI", "Next.js"],
    skills: ["Deep Learning", "PyTorch", "Generative AI", "NLP", "Whisper", "FastAPI", "Python"],
    repo: "https://github.com/RyanJJaison/Lahja",
    model: "https://huggingface.co/RyanJJaison/kokborok-whisper-lora",
    results: [
      "Kokborok speech model: trained on 235 clips (about 33 minutes) of single-speaker narration. Compared with untuned Whisper, which got no words right on the test set, it roughly halves the character error rate (1.37 to 0.72). Published as a research/demo checkpoint, not yet reliable enough for unsupervised use.",
    ],
  },
  {
    slug: "clarity",
    title: "Clarity",
    tagline: "Turn anything you're studying into a personal course.",
    status: "Collaboration",
    featured: true,
    what:
      "An AI learning companion. Upload a PDF, notes or a lecture transcript and Clarity builds a course outline, tutors you through it in chat, writes quizzes that adapt to how you're doing, and schedules spaced-repetition review.",
    mission:
      "Students juggle separate apps for notes, flashcards, quizzes and tutoring, and none of them know what the student is actually studying. Clarity puts all of it on one engine, grounded in the student's own material so the tutor answers from their content rather than guessing.",
    role:
      "Built the backend: the vector database, ingestion of uploaded material, and pulling in relevant web material to produce tailored study content.",
    architecture: [
      { layer: "Ingestion", tech: "Chunking + Voyage AI embeddings", detail: "Uploaded material is split into passages and turned into vectors." },
      { layer: "Vector search", tech: "Supabase Postgres + pgvector", detail: "Finds the passages most relevant to each question, so answers stay grounded (RAG)." },
      { layer: "Generation", tech: "Anthropic Claude", detail: "Writes outlines, tutor replies and quizzes, and grades answers." },
      { layer: "Learning logic", tech: "TypeScript, Vitest", detail: "Spaced repetition and adaptive difficulty, as tested pure functions." },
      { layer: "App", tech: "Next.js, Supabase Auth", detail: "Web app with accounts and per-user data." },
    ],
    stack: ["Next.js", "Supabase", "pgvector", "Claude", "Voyage AI"],
    skills: ["Generative AI", "Foundational Models", "NLP", "RAG & vector search"],
    repo: "https://github.com/RyanJJaison/Clarity",
  },
  {
    slug: "fall-detection",
    title: "Fall Detection Wearable",
    tagline: "A wearable that notices a fall and calls for help.",
    status: "Completed",
    featured: true,
    what:
      "A wearable built around an ESP32 that detects falls from motion, reads heart rate and blood oxygen, knows its GPS location, and sends an alert to a phone app.",
    mission:
      "Someone who falls, especially while alone, may not be able to call for help. The goal was a small, low-cost device that raises the alarm on its own and tells caregivers where the person is and how they're doing.",
    role: "Designed and built the hardware and firmware.",
    architecture: [
      { layer: "Brain", tech: "ESP32", detail: "Reads every sensor and runs the fall-detection logic on the device." },
      { layer: "Motion", tech: "MPU6050 accelerometer + gyroscope", detail: "Picks up the sudden impact and change in orientation of a fall." },
      { layer: "Vitals", tech: "MAX30102", detail: "Heart rate and blood-oxygen readings." },
      { layer: "Location & display", tech: "GPS module, OLED", detail: "Position for the alert; status on the device itself." },
      { layer: "Alerts", tech: "Blynk IoT", detail: "Pushes alerts and live readings to a phone app." },
    ],
    stack: ["ESP32", "MPU6050", "MAX30102", "GPS", "Blynk"],
    skills: ["ESP32", "Embedded sensors"],
  },
  {
    slug: "task-manager",
    title: "Task-manager",
    tagline: "A to-do list that plans your day for you.",
    status: "Completed",
    featured: false,
    what:
      "A web task manager that estimates how long each task will take, fits pending tasks into your working day, and reminds you when it's time to start, when a task is overrunning, or when something has gone stale.",
    mission:
      "Most to-do apps only store tasks; the hard part is deciding when to do them. This one uses an LLM to estimate effort and build a realistic schedule, and keeps working with sensible defaults when the AI is unavailable.",
    role: "Built solo.",
    architecture: [
      { layer: "Web app", tech: "Flask, Jinja, Flask-WTF", detail: "Accounts, task pages and forms." },
      { layer: "Data", tech: "SQLAlchemy, Alembic migrations, PostgreSQL", detail: "Tasks, subtasks, time sessions and reminders, with versioned schema changes." },
      { layer: "Planning", tech: "Groq API (LLM)", detail: "Estimates effort and schedules the day; falls back to defaults if the API fails." },
      { layer: "Reminders", tech: "Browser notifications", detail: "Start, overrun and stale-task alerts." },
      { layer: "Hosting", tech: "Vercel", detail: "Deployed and live." },
    ],
    stack: ["Flask", "SQLAlchemy", "PostgreSQL", "Groq", "Vercel"],
    skills: ["Python", "Generative AI"],
    repo: "https://github.com/RyanJJaison/Task-manager",
    live: "https://task-manager-ryan-bc75.vercel.app",
  },
  {
    slug: "password-manager",
    title: "Password Manager",
    tagline: "A small desktop vault for saved logins.",
    status: "Learning project",
    featured: false,
    what: "A desktop app for saving, looking up and updating login details, with a simple graphical interface.",
    mission: "A first step into GUI programming and storing data between sessions, built as a practical everyday tool.",
    role: "Built solo.",
    architecture: [
      { layer: "Interface", tech: "Python, Tkinter", detail: "Forms for adding and finding entries." },
      { layer: "Storage", tech: "JSON file", detail: "Entries saved locally between sessions." },
    ],
    stack: ["Python", "Tkinter", "JSON"],
    skills: ["Python"],
  },
  {
    slug: "dsa",
    title: "Data Structures & Algorithms",
    tagline: "The core CS toolkit, implemented by hand.",
    status: "Learning project",
    featured: false,
    what:
      "C and C++ implementations of linked lists, circular lists, binary search trees, expression trees and graph algorithms such as Dijkstra, Prim and Kruskal.",
    mission: "Understanding how these structures work from the inside, which is the foundation for everything built on top of them.",
    role: "Coursework and practice.",
    architecture: [
      { layer: "Lists & trees", tech: "C / C++", detail: "Linked lists, polynomial addition, BSTs with all traversals, stack-based expression trees." },
      { layer: "Graphs", tech: "C / C++", detail: "Shortest paths and minimum spanning trees." },
    ],
    stack: ["C", "C++"],
    skills: [],
  },
];
