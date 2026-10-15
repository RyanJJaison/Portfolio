import type { Metadata } from "next";
import { PageShell } from "@/components/ui/Section";
import { profile } from "@/content/profile";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  const items = [
    { label: "GitHub", href: profile.links.github, note: "Code behind every project" },
    { label: "LinkedIn", href: profile.links.linkedin, note: "The professional version" },
    { label: "ORCID", href: profile.links.orcid, note: "Research identity" },
  ];
  return (
    <PageShell title="Say hello" kicker="(C) Contact" aside="Open to internships and collaborations in AI/ML">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12 py-10">
        <div className="col-span-12 md:col-span-5">
          <p className="caps text-muted">Email</p>
          <p className="display mt-3 text-[clamp(1.5rem,2.4vw,2.25rem)] [overflow-wrap:anywhere]">{profile.links.email}</p>
          {profile.links.cv && (
            <a href={profile.links.cv} {...ext} className="caps mt-8 inline-block border border-foreground bg-foreground px-4 py-2.5 text-background hover:border-accent hover:bg-accent">
              Download résumé (PDF) ↗
            </a>
          )}
        </div>
        <ul className="col-span-12 border-t border-foreground md:col-span-6 md:col-start-7">
          {items.map((i, n) => (
            <li key={i.label} className="border-b border-line">
              <a href={i.href} {...ext} className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 py-5">
                <span className="caps text-accent">{String(n + 1).padStart(2, "0")}</span>
                <span className="display text-4xl group-hover:text-accent">{i.label}</span>
                <span className="caps text-right text-muted">{i.note} ↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
