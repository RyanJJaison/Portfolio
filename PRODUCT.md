# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and hiring managers screening candidates for AI/ML internships. They arrive from a CV, LinkedIn, or GitHub link, usually with limited time, and need to judge quickly whether Ryan can build real AI/ML systems and is worth contacting.

## Product Purpose

A personal portfolio for Ryan Joseph Jaison, a second-year B.Tech Artificial Intelligence student at Christ University, Bangalore, who is open to internships. It shows who he is, what he has built, what he is researching, and what he is learning now.

A visit succeeds on all three of these, equally:

1. The visitor makes contact: sends a message through the contact form or downloads the CV.
2. The visitor reads at least one flagship project in depth (SentriX, Lahja, Clarity) and follows it to the repo.
3. The visitor leaves remembering Ryan as distinct from other student portfolios.

## Positioning

Not a template student portfolio. The work leans on applied AI/ML with real, repo-backed results: graph ML for Bitcoin risk scoring (SentriX), speech tech for an under-supported language (Lahja, Kokborok), and a RAG learning backend (Clarity). Each project states Ryan's specific role, including on collaborations.

## Operating Context

- Routes: Home, Journey, Projects (index + `/projects/[slug]`), Research, Now, Contact.
- Contact page has a message form (server action via nodemailer) plus email, GitHub, LinkedIn, ORCID, and CV download.
- Profile links live in `content/profile.ts`; all copy lives in typed files under `content/`.

## Capabilities and Constraints

- Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, d3-force. This Next.js version has breaking changes; read `node_modules/next/dist/docs/` before writing framework code.
- Content-driven: UI must not hard-code copy; edit `content/*.ts`.
- Every project carries a status tag (Completed, Ongoing, Research proposal, Collaboration, Learning project, Planned). This is binding.
- "Who I am" essay sections are placeholders until Ryan supplies the text. Do not write them for him.
- Open: AWS AI Practitioner verification link not yet supplied (`content/experience.ts`).

## Brand Commitments

- Name: Ryan Joseph Jaison. Tagline: "CS student building practical AI/ML systems."
- Voice: confident, plain, not inflated.
- Project pages explain in plain language what the project is, its mission, Ryan's role, and a short stack summary. Avoid deep architecture or pipeline diagrams; the SentriX PageRank demo stays because Ryan asked for it. (From earlier feedback, not re-confirmed in this interview.)

## Evidence on Hand

- CV: `public/Ryan_Joseph_Jaison_CV.pdf`.
- Portrait source: `assets/portrait-source.png` (rendered via `scripts/build-portrait.py`).
- SentriX metrics from the repo: illicit-class F1 0.5340 to 0.6943, AUC 0.8966 to 0.9570 (3-seed ablation).
- Experience: iLeaf Solutions internship, Kochi, Apr to May 2026.
- Credentials: AWS Certified AI Practitioner (Aug 2026 to Aug 2029); AWS ML Engineer Associate (MLA-C01) in progress, no date claimed.
- GitHub RyanJJaison, LinkedIn, ORCID 0009-0004-3794-7334.
- None exist: testimonials, references, hardware photos or video for the fall-detection wearable. Do not fabricate them.

## Product Principles

1. Recruiter time is short: who Ryan is, what he built, and how to reach him must be findable fast.
2. Depth on demand: flagship projects reward a closer read and lead to the real repo.
3. Every project shows its honest status and Ryan's actual role.
4. Be memorable through the work itself, not through claims.
