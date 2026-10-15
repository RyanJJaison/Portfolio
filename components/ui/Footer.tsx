import Link from "next/link";
import { profile } from "@/content/profile";

export function Footer() {
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  return (
    <footer className="border-t border-foreground">
      <div className="caps mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 text-muted">
        <span>© {new Date().getFullYear()} {profile.name} · Bangalore</span>
        <div className="flex flex-wrap gap-5">
          <Link href="/contact" className="hover:text-accent">Contact</Link>
          {profile.links.cv && <a href={profile.links.cv} {...ext} className="hover:text-accent">Résumé ↗</a>}
          <a href={profile.links.github} {...ext} className="hover:text-accent">GitHub ↗</a>
          <a href={profile.links.linkedin} {...ext} className="hover:text-accent">LinkedIn ↗</a>
          <a href={profile.links.orcid} {...ext} className="hover:text-accent">ORCID ↗</a>
        </div>
      </div>
    </footer>
  );
}
