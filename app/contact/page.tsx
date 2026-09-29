import type { Metadata } from "next";
import { PageShell } from "@/components/ui/Section";
import { profile } from "@/content/profile";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  const items = [
    { label: "GitHub", href: profile.links.github },
    { label: "LinkedIn", href: profile.links.linkedin },
    { label: "ORCID", href: profile.links.orcid },
  ];
  return (
    <PageShell title="Contact" lead="Best way to reach me is email or LinkedIn.">
      <p className="font-mono text-sm">{profile.links.email}</p>
      <ul className="mt-8 flex flex-wrap gap-4">
        {items.map((i) => (
          <li key={i.label}>
            <a href={i.href} {...ext} aria-label={`${i.label} profile`} className="block rounded-xl border border-line px-6 py-4 hover:border-accent">{i.label} →</a>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
