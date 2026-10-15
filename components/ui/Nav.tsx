"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/content/profile";

const idx = (i: number) => String(i + 1).padStart(2, "0");

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-foreground bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="font-display text-lg font-extrabold tracking-tight" aria-label="Ryan Joseph Jaison, home">
          Ryan Joseph Jaison<span className="text-accent">.</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {nav.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className={`caps flex items-center gap-1.5 ${isActive(n.href) ? "text-foreground" : "text-muted hover:text-foreground"}`}
            >
              <span className={`inline-block h-1.5 w-1.5 ${isActive(n.href) ? "bg-accent" : "bg-transparent"}`} aria-hidden />
              <span className="text-muted/70">{idx(i)}</span> {n.label}
            </Link>
          ))}
        </nav>
        <button type="button" className="caps md:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)}>
          {open ? "Close ×" : "Menu +"}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-foreground px-6 py-4 md:hidden">
          <ul>
            {nav.map((n, i) => (
              <li key={n.href} className="border-b border-line last:border-0">
                <Link href={n.href} onClick={() => setOpen(false)} aria-current={isActive(n.href) ? "page" : undefined}
                  className={`flex items-baseline gap-3 py-2 ${isActive(n.href) ? "text-accent" : ""}`}>
                  <span className="caps text-muted">{idx(i)}</span>
                  <span className="display text-4xl">{n.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
