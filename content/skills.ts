// The six fields Ryan works across. Used by the hero and the orbit graph.
export type FieldId = "dl" | "graph" | "speech" | "systems" | "hardware" | "cloud";

export type Field = { id: FieldId; name: string; short: string; seen: string; skills: string[] };

export const fields: Field[] = [
  { id: "dl", name: "Deep Learning", short: "Deep Learning", seen: "PyTorch · neural networks", skills: ["PyTorch", "Neural networks", "Machine learning", "Generative AI", "Foundation models", "Predictive analytics", "NumPy", "Pandas"] },
  { id: "graph", name: "Graph ML", short: "Graph ML", seen: "SentriX · PageRank + GraphSAGE", skills: ["Graph neural networks", "GraphSAGE", "Personalized PageRank", "PyTorch Geometric", "NetworkX"] },
  { id: "speech", name: "Speech & Language", short: "Speech", seen: "Lahja · Whisper, NLLB", skills: ["NLP", "Whisper fine-tuning", "LoRA / PEFT", "NLLB-200 translation", "Text-to-speech"] },
  { id: "systems", name: "Systems & Backends", short: "Systems", seen: "FastAPI · Flask · Postgres", skills: ["Python", "FastAPI", "Flask", "PostgreSQL", "RAG & vector search", "SQLAlchemy", "MySQL", "SQLite"] },
  { id: "hardware", name: "Hardware & IoT", short: "Hardware", seen: "ESP32 fall-detection wearable", skills: ["ESP32", "MPU6050 / MAX30102 sensors", "GPS", "Blynk IoT", "Arduino", "C++"] },
  { id: "cloud", name: "Cloud AI", short: "Cloud AI", seen: "AWS · Bedrock · SageMaker", skills: ["Amazon Bedrock", "Amazon SageMaker AI", "AWS AI services", "Responsible AI", "AI security"] },
];
