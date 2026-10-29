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
    period: "Preschool to Class 10",
    title: "Chavara CMI Public School",
    place: "Pala, Kottayam, Kerala",
    kind: "education",
    body: "Preschool through Class 10.",
  },
  {
    period: "Classes 11 to 12, finished Apr 2025",
    title: "Rajagiri Christu Jayanthi Public School",
    place: "Kochi, Kerala",
    kind: "education",
    body: "Senior secondary in Physics, Chemistry, Maths and Biology (PCMB).",
  },
  {
    period: "Jun 2025 to May 2029",
    title: "B.Tech, Artificial Intelligence",
    place: "Christ (Deemed to be University), Bangalore",
    kind: "education",
    body: "Currently in second year, with a CGPA of 3.95 / 4.00.",
  },
  {
    period: "Apr 2026 to May 2026",
    title: "Software development intern, iLeaf Solutions",
    place: "Kochi, Kerala",
    kind: "work",
    body: "Worked in a sprint-driven commercial team with Flask, PyTorch and AWS AI across backend systems and databases, debugged core architecture setups, and followed structured version control from development to production.",
  },
  {
    period: "Aug 2026",
    title: "AWS Certified AI Practitioner",
    kind: "cert",
    body: "Certified. Working toward AWS Certified ML Engineer, Associate (MLA-C01).",
  },
];

// Stops on the journey map, in travel order. Coordinates are real (lat, lon).
export const journeyStops = [
  { city: "Pala", lat: 9.7086, lon: 76.683, title: "Chavara CMI Public School", period: "Preschool to Class 10" },
  { city: "Kochi", lat: 9.9312, lon: 76.2673, title: "Rajagiri Christu Jayanthi Public School", period: "Classes 11 to 12" },
  { city: "Bangalore", lat: 12.9716, lon: 77.5946, title: "Christ University · B.Tech AI", period: "2025 to 2029 · 2nd year" },
];
