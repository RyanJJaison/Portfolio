export const profile = {
  name: "Ryan Joseph Jaison",
  headline:
    "Computer Science Student | Aspiring AI/ML Engineer | Deep Learning & Generative AI | AWS Certified AI Practitioner",
  tagline: "CS student building practical AI/ML systems.",
  location: "Bangalore, India",
  status: "Open to internships", // shown as a pill in the nav
  links: {
    github: "https://github.com/RyanJJaison",
    linkedin: "https://www.linkedin.com/in/ryan-joseph-jaison-960390420/",
    orcid: "https://orcid.org/0009-0004-3794-7334",
    email: "ryan.j@btech.christuniversity.in", // as printed on the CV
    cv: "/Ryan_Joseph_Jaison_CV.pdf" as string | null,
  },
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/journey", label: "Journey" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/now", label: "Now" },
  { href: "/contact", label: "Contact" },
];
