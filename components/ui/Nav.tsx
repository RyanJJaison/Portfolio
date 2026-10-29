"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/content/profile";

/** A plain bar: wordmark, four links, one action. */
export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  const links = nav.filter((n) => n.href !== "/" && n.href !== "/contact");

  return (
    <header className="relative z-50 bg-background">
      <div className="flex items-center justify-between gap-6 px-[var(--m)] py-4">
        <Link href="/" className="display lead !leading-none" aria-label="Ryan Joseph Jaison, home">
          Ryan Joseph Jaison
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {links.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className={`underline-offset-[0.3em] transition-colors hover:text-accent hover:underline ${isActive(n.href) ? "underline decoration-2" : ""}`}
            >
              {n.label}
            </Link>
          ))}
          <Link href="/contact" aria-current={isActive("/contact") ? "page" : undefined} className="btn !min-h-0 !py-2">
            Contact
          </Link>
        </nav>
        <button type="button" className="btn btn-quiet !min-h-11 md:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Main" className="bg-surface px-[var(--m)] pb-6 pt-2 md:hidden">
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setOpen(false)} aria-current={isActive(n.href) ? "page" : undefined}
                  className={`head block py-2 ${isActive(n.href) ? "text-accent" : ""}`}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
