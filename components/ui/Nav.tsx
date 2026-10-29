"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, profile } from "@/content/profile";


export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-display text-lg font-extrabold tracking-tight" aria-label="Ryan Joseph Jaison, home">
            Ryan Joseph <span className="serif text-xl font-normal text-accent">Jaison</span>
          </Link>
          <span className="caps pill pill-sm hidden bg-accent-soft text-accent lg:inline-flex">
            <span className="live-dot" aria-hidden /> {profile.status}
          </span>
        </div>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className={`caps pill pill-sm ${isActive(n.href) ? "bg-foreground text-background" : "text-muted hover:bg-surface hover:text-foreground"}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button type="button" className="caps pill pill-sm bg-surface md:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)}>
          {open ? "Close ×" : "Menu +"}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Main" className="px-6 py-4 md:hidden">
          <ul>
            {nav.map((n) => (
              <li key={n.href} className="">
                <Link href={n.href} onClick={() => setOpen(false)} aria-current={isActive(n.href) ? "page" : undefined}
                  className={`flex items-baseline gap-3 py-2 ${isActive(n.href) ? "text-accent" : ""}`}>
                  <span className="display text-4xl">{n.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="caps pill pill-sm mt-3 bg-accent-soft text-accent"><span className="live-dot" aria-hidden /> {profile.status}</p>
        </nav>
      )}
    </header>
  );
}
