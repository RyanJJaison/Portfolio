// Built incrementally. Add entries as Ryan supplies them.
export type JourneyEntry = {
  period: string;
  title: string;
  place?: string;
  body: string;
  kind: "education" | "work" | "cert" | "milestone";
  placeholder?: boolean;
};

export const journey: JourneyEntry[] = [
  {
    period: "TODO",
    title: "Schooling",
    kind: "education",
    body: "Earlier education to be added.",
    placeholder: true,
  },
  {
    period: "Jun 2025 to May 2029",
    title: "B.Tech, Artificial Intelligence",
    place: "Christ (Deemed to be University), Bangalore",
    kind: "education",
    body: "Currently in second year.",
  },
  {
    period: "Apr 2026 to May 2026",
    title: "Intern, iLeaf Solutions",
    place: "Kochi, Kerala",
    kind: "work",
    body: "Helped the team build scalable systems and worked as part of the team.",
  },
  {
    period: "Aug 2026",
    title: "AWS Certified AI Practitioner",
    kind: "cert",
    body: "Certified. Working toward AWS Certified ML Engineer, Associate (MLA-C01).",
  },
];
