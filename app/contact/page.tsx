import type { Metadata } from "next";
import { PageShell } from "@/components/ui/Section";
import { profile } from "@/content/profile";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  const items = [
    { label: "GitHub", href: profile.links.github, note: "code, and the repos behind every project" },
    { label: "LinkedIn", href: profile.links.linkedin, note: "the professional version of all this" },
    { label: "ORCID", href: profile.links.orcid, note: "for research" },
  ];
  return (
    <PageShell title="Say hello" kicker="Contact" aside="if any of this overlaps with what you're working on.">
      <div className="grid gap-12 py-10 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="caps text-muted">Email</p>
          <p className="font-display mt-2 break-all text-3xl">{profile.links.email}</p>
          {profile.links.cv && (
            <a href={profile.links.cv} {...ext} className="caps mt-8 inline-block border-b border-foreground pb-0.5 hover:border-accent hover:text-accent">
              Download résumé (PDF) ↗
            </a>
          )}
        </div>
        <ul className="border-t border-foreground/70">
          {items.map((i) => (
            <li key={i.label} className="border-b border-line">
              <a href={i.href} {...ext} className="group flex flex-wrap items-baseline justify-between gap-2 py-6">
                <span className="font-display text-4xl group-hover:text-accent">{i.label} ↗</span>
                <span className="font-hand text-xl text-muted">{i.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
