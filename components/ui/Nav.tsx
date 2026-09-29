"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, profile } from "@/content/profile";

export function Nav() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="font-mono text-sm text-accent">
          rj<span className="text-muted">/</span>graph
        </Link>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
          {nav.map((n) => {
            const active = n.href === "/" ? path === "/" : path.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={active ? "text-accent" : "text-muted hover:text-foreground"}
              >
                {n.label}
              </Link>
            );
          })}
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="text-muted hover:text-foreground">GitHub</a>
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="text-muted hover:text-foreground">LinkedIn</a>
        </nav>
      </div>
    </header>
  );
}
