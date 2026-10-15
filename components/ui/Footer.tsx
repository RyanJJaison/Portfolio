import Link from "next/link";
import { profile } from "@/content/profile";

export function Footer() {
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-muted">
        <div className="caps flex gap-3">
          <Link href="/contact" className="hover:text-foreground">Contact</Link>
          <span aria-hidden>·</span>
          {profile.links.cv && <a href={profile.links.cv} {...ext} className="hover:text-foreground">Résumé</a>}
        </div>
        <div className="caps flex gap-5">
          <a href={profile.links.github} {...ext} className="hover:text-foreground">GitHub</a>
          <a href={profile.links.linkedin} {...ext} className="hover:text-foreground">LinkedIn</a>
          <a href={profile.links.orcid} {...ext} className="hover:text-foreground">ORCID</a>
        </div>
      </div>
    </footer>
  );
}
