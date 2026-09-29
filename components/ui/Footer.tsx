import { profile } from "@/content/profile";

export function Footer() {
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <div className="flex gap-5">
          <a href={profile.links.github} {...ext} aria-label="GitHub profile">GitHub</a>
          <a href={profile.links.linkedin} {...ext} aria-label="LinkedIn profile">LinkedIn</a>
          <a href={profile.links.orcid} {...ext} aria-label="ORCID profile">ORCID</a>
        </div>
      </div>
    </footer>
  );
}
