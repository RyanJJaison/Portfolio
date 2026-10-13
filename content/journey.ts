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
    place: "Kottayam, Kerala",
    kind: "education",
    body: "Preschool through Class 10.",
  },
  {
    period: "Classes 11 to 12",
    title: "Rajagiri Christu Jayanthi Public School",
    place: "Kochi, Kerala",
    kind: "education",
    body: "Higher secondary, Classes 11 and 12.",
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

// Stops on the journey map, in travel order. Coordinates are real (lat, lon).
export const journeyStops = [
  { city: "Kottayam", lat: 9.5916, lon: 76.5222, title: "Chavara CMI Public School", period: "Preschool to Class 10" },
  { city: "Kochi", lat: 9.9312, lon: 76.2673, title: "Rajagiri Christu Jayanthi Public School", period: "Classes 11 to 12" },
  { city: "Bangalore", lat: 12.9716, lon: 77.5946, title: "Christ University · B.Tech AI", period: "2025 to 2029 · 2nd year" },
];
