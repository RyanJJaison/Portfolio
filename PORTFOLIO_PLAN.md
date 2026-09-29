# Ryan Joseph Jaison: Immersive Portfolio, Build Plan (v2)

## 0. Verified facts (sources: skill sheet, GitHub, LinkedIn, your notes)

**Headline (LinkedIn):** Computer Science Student | Aspiring AI/ML Engineer | Deep Learning & Generative AI | AWS Certified AI Practitioner

**Education:** B.Tech, Artificial Intelligence, Christ University, Bangalore. Jun 2025 to May 2029, currently 2nd year. (Your sheet says Kengeri Campus; LinkedIn says Bangalore only. I'll use "Christ (Deemed to be University), Bangalore" unless you want Kengeri named.)

**Experience:** Intern, iLeaf Solutions, Kochi, Kerala, on-site. Apr 2026 to May 2026. You told me it was a 1-month internship. LinkedIn computes it as "2 mos" from the dates. Fix whichever is wrong before we publish.

**Certification:** AWS Certified AI Practitioner. Issued Aug 2026, expires Aug 2029, credential ID on LinkedIn. It links to a verifiable badge, so the site can link to it too. Your sheet's "AIFC01" is almost certainly the exam code for this same certification (AIF-C01), so it will appear once, not as a separate credential.

**In progress:** AWS Certified Machine Learning Engineer, Associate (exam code MLA-C01). Shown as "In progress" with no date claimed, and swapped to a verified badge once you pass.

**LinkedIn skills (18):** Foundational Models, Amazon SageMaker AI, Amazon AI Services, AI Security, Responsible AI, Amazon Bedrock, Predictive Analytics, PPR, Graph Neural Networks, FastAPI, NLP, AWS AI, AI, PyTorch, Generative AI, Neural Networks, Python, Machine Learning.

**GitHub (RyanJJaison):** 7 repos, badges Pull Shark, Pair Extraordinaire, YOLO, ORCID 0009-0004-3794-7334.

| Project | Facts | Your role (from you) |
|---|---|---|
| **SentriX** | Graph-based risk scoring for Bitcoin transactions on the Elliptic dataset. Personalized PageRank proximity features plus raw node features feed a GraphSAGE classifier (PyTorch, PyG, NetworkX). Illicit-class F1 0.5340 to **0.6943**, AUC 0.8966 to **0.9570** (3-seed ablation). Temporal split, leave-one-out validation, two-stage training. 32 commits, MIT. | Collaborative. **To confirm:** your specific part, and whether the "ODT risk monitor" dashboard is this same project. |
| **Lahja** | Kokborok language platform: text-to-speech, translation, chatbot, speech-to-text. FastAPI backend, Next.js UI, Whisper fine-tuning pipeline. Fork of SatnamCodes/Lahja. | **You built** speech-to-text, voice-to-voice, transcription and translation, and trained a ~245M-parameter Whisper model on a large body of unlabelled video and audio. |
| **Clarity** | AI learning companion: RAG tutor, adaptive quizzes, spaced repetition, courses generated from uploaded material. Next.js, Supabase and pgvector, Claude, Voyage. Fork of ryansudheer07-hub/Clarity. | **You built the backend:** the vector DB, ingestion of user material, and pulling in relevant web material to produce tailored study content. |
| **Task-manager** | Python app with estimation, reminders and scheduling. Live on Vercel. | Yours. |
| **Fall Detection Wearable** | ESP32 + MPU6050 + MAX30102 + GPS + OLED + Blynk. No public repo. | Yours. No video available. |
| Others | Water-hardness research proposal, Password Manager, DSA labs, posters. | From your sheet only. |

**Numbers to pin down before publishing (I will not guess these):**

1. **Lahja's training data.** "3.45 million parameter of unlabelled data" can't be right as written, because parameters describe a model, not a dataset. Is it 3.45 million samples, 3.45 million seconds or minutes of audio, or 3.45 thousand hours? Also, how was unlabelled data used (pseudo-labelling, self-supervised, or something else)? Whisper Small is about 244M parameters, so if that's your base model, say so.
2. **Clarity's "training model".** The public repo generates content through Claude and retrieves with Voyage embeddings plus pgvector. Which parts did you train or build yourself: an embedding step, a ranking/relevance model, the ingestion pipeline, or the web-retrieval layer? I'll describe exactly what you tell me.
3. **Your part in SentriX**, in one or two sentences.
4. **Internship length**, as above.

## 1. Concept: "Inside the Graph"

The site is a navigable 3D graph world that you scroll through. It fits your identity: SentriX is a graph neural network, so the site itself becomes one. Nodes are ideas, edges are relationships, and signal pulses travel along edges the way PageRank propagates.

**Tone:** dark, minimal, technical, one accent colour. Confident but not inflated. Every number on the site has a source. Simulations are labelled as simulations.

## 2. Experience, chapter by chapter

| # | Chapter | What the visitor sees and does |
|---|---|---|
| 0 | **Boot** | Short loader: a sparse point cloud "trains" into a network. Skip button always visible. |
| 1 | **Hero** | Name in large type over a live particle graph that reacts to the cursor. Line under it: *CS student building practical AI/ML systems.* |
| 2 | **Origin** | The camera flies along a path: core CS, software engineering, AI/ML, applied systems. Uses your bio, tightened. |
| 3 | **Skill Graph** | Constellation clusters: AI/ML (largest), Graph ML, Speech and NLP, Backend and Data, Cloud (AWS), IoT, CS foundation. Hovering a skill lights up the projects that use it. Basic Python, NumPy and Pandas stay small. |
| 4 | **Featured: SentriX** | Interactive PageRank demo on a small transaction graph: click a node and watch proximity scores spread. Real before/after F1 and AUC chart, pipeline diagram, and the design decisions (temporal split, leave-one-out). |
| 5 | **Featured: Lahja** | The language-tech story: Kokborok has no support in major speech models. An animated audio pipeline (waveform, Whisper-based recognition, translation, speech) shown as a diagram, not fake output. Your Whisper fine-tune facts go here once confirmed. |
| 6 | **Featured: Clarity** | Ingestion-to-course flow diagram: document in, chunks and embeddings into the vector DB, web enrichment, tailored study material out. Your backend role stated plainly. |
| 7 | **Featured: Fall Detection** | 3D ESP32 board with labelled sensors. Simulated accelerometer trace, with a slider that "drops" the wearer to trigger detection. Labelled as a simulation. Since there's no video, optional hardware photos would be nice but aren't required. |
| 8 | **Research** | Water-hardness electrochemical precipitation (ion-migration particle sim, labelled proposal) plus a **"Next" panel** for your predictive-analytics direction: building predictive models from scratch and researching them. Framed as a plan, not a result. |
| 9 | **Also built** | Card grid: Task-manager (live link), Password Manager, DSA implementations, posters. Each card has a status tag and a modal. |
| 10 | **Experience and Credentials** | Timeline: iLeaf internship (you helped the team build scalable systems and worked as part of the team), SIH Team Zenith lead, AWS Certified AI Practitioner with a verify link, AWS ML Engineer Associate (MLA-C01) marked in progress, collaboration on GitHub. |
| 11 | **The Lab (Now)** | Roadmap from NumPy to PyTorch to AWS ML Engineer (MLA-C01) prep to predictive models, with an animated loss curve labelled *illustrative*. |
| 12 | **Contact** | Email, GitHub, LinkedIn, ORCID, CV download. The graph settles calm. |

**Profile links (always reachable):**

- **GitHub:** https://github.com/RyanJJaison
- **LinkedIn:** https://www.linkedin.com/in/ryan-joseph-jaison-960390420/

They appear in three places: as icons in the persistent nav (visible in every chapter), as large link nodes in the Contact chapter, and in the footer. Both open in a new tab with `rel="noopener noreferrer"` and have accessible labels. Each project card also links to its own repo (SentriX, Lahja, Clarity, Task-manager), and the AWS badge links to its verification page. Links live in `content/profile.ts`, so changing one is a one-line edit.

A persistent minimal nav (chapter dots) lets visitors jump anywhere without scrolling linearly.

## 3. Tech stack

- **Next.js (App Router) + TypeScript + Tailwind**
- **React Three Fiber + drei + postprocessing**, custom GLSL for the particle graph
- **GSAP ScrollTrigger + Lenis** for scroll choreography; **Framer Motion** for UI transitions
- **d3-force** for graph layout
- **Vercel** deployment, custom domain if you have one
- Content in a typed `content/` folder (`profile.ts`, `projects.ts`, `skills.ts`, `experience.ts`) built from this plan, so the UI never hard-codes copy.

## 4. Non-negotiables

- **Performance:** lazy-load 3D scenes, cap pixel ratio, 60 fps on your RTX 4050 laptop, usable on a mid-range phone, Lighthouse 90+.
- **Fallbacks:** static 2D layout for no-WebGL and low-power devices, `prefers-reduced-motion` support, semantic HTML content layer for accessibility and SEO.
- **Honesty layer:** status tags on every project (Completed, Ongoing, Research proposal, Collaboration, Planned). No metrics that aren't in a repo or a document you've given me.

## 5. Build phases (with Claude Code, in this folder)

1. **Foundation:** scaffold, design tokens, typography, content files, layout shell, and a static version of every section. Content is complete before any 3D work.
2. **Hero and scroll engine:** particle graph, camera path, Lenis and GSAP, chapter nav.
3. **Skill graph:** force layout, hover and focus interactions.
4. **Flagship demos:** SentriX PageRank explorer first, then the Lahja and Clarity pipeline diagrams, then Fall Detection.
5. **Supporting sections:** research, project grid and modals, timeline, Lab, contact.
6. **Polish:** micro-interactions, mobile pass, fallbacks, accessibility, performance budget, SEO and OG image.
7. **Ship:** deploy to Vercel, connect the domain.

## 6. Still needed from you

1. The Lahja data unit and method, and the Clarity "training model" detail (section 0).
2. Your role in SentriX, and whether the ODT dashboard is part of it.
3. Internship duration (1 month vs LinkedIn's Apr to May 2026).
4. Optional: photos of the wearable hardware, and a CV PDF.
5. Confirm AIFC01 is the AI Practitioner exam code (so I merge them), and give the official wording of SIH problem statement 26146, or I'll leave the SIH title off.
6. Accent colour (cool cyan, violet, or warmer), whether you own a domain, and whether to show a headshot (your LinkedIn photo would work).
