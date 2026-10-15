import Link from "next/link";
import { profile } from "@/content/profile";

/** Poster-style sign-off: one big line and the ways to reach Ryan. */
export function Closing() {
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  const links = [
    { label: "Email", href: `mailto:${profile.links.email}`, text: profile.links.email },
    { label: "GitHub", href: profile.links.github, text: "RyanJJaison" },
    { label: "LinkedIn", href: profile.links.linkedin, text: "Ryan Joseph Jaison" },
  ];
  return (
    <section className="mt-28 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <p className="caps text-accent">(05) Next</p>
        <h2 className="display mt-6 text-[clamp(3.5rem,12vw,11rem)]">
          Let&apos;s build<br />something<span className="text-accent">.</span>
        </h2>
        <div className="mt-14 grid grid-cols-12 gap-6 border-t border-background/40 pt-6">
          {links.map((l) => (
            <a key={l.label} href={l.href} {...ext} className="group col-span-12 sm:col-span-4">
              <span className="caps text-background/60">{l.label}</span>
              <span className="mt-1 block break-all text-xl font-medium group-hover:text-accent">{l.text} ↗</span>
            </a>
          ))}
        </div>
        <div className="caps mt-10 flex flex-wrap gap-6 text-background/60">
          {profile.links.cv && <a href={profile.links.cv} {...ext} className="hover:text-accent">Download résumé ↗</a>}
          <Link href="/contact" className="hover:text-accent">Contact page →</Link>
        </div>
      </div>
    </section>
  );
}
