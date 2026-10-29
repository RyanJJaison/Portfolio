import Link from "next/link";
import { profile } from "@/content/profile";

export function Footer() {
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  return (
    <footer className="">
      <div className="caps mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 text-muted">
        <span>© {new Date().getFullYear()} {profile.name} · Bangalore</span>
        <div className="flex flex-wrap gap-5">
          <Link href="/contact" className="hl">Contact</Link>
          {profile.links.cv && <a href={profile.links.cv} {...ext} className="hl">Résumé ↗</a>}
          <a href={profile.links.github} {...ext} className="hl">GitHub ↗</a>
          <a href={profile.links.linkedin} {...ext} className="hl">LinkedIn ↗</a>
          <a href={profile.links.orcid} {...ext} className="hl">ORCID ↗</a>
        </div>
      </div>
    </footer>
  );
}
