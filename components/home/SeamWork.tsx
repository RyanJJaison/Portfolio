"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { pictures, projectPictures } from "@/content/media";
import { fields } from "@/content/skills";

const RM = "(prefers-reduced-motion: reduce)";
const subscribeRM = (cb: () => void) => {
  const m = window.matchMedia(RM);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

const FIELD = new Map(fields.map((f) => [f.id, f.name]));
const discipline = (p: Project) => [p.fields[0] && FIELD.get(p.fields[0]), p.status].filter(Boolean).join(" · ");

/** Each project as two pictures meeting at the middle of the screen, its name set across the seam. */
function Pane({ p, side, priority }: { p: Project; side: 0 | 1; priority?: boolean }) {
  const pic = pictures[projectPictures[p.slug][side]];
  return (
    <div className="relative h-full w-1/2 overflow-hidden">
      <div className="absolute inset-x-0 -inset-y-[22svh]" data-pane={side}>
        <Image src={pic.src} alt={pic.alt} fill priority={priority} sizes="50vw" className="object-cover brightness-[0.62]" style={{ objectPosition: pic.position }} />
      </div>
    </div>
  );
}

function Title({ p }: { p: Project }) {
  return (
    <div data-title className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-[var(--m)] text-center text-paper">
      <h3 className="pointer-events-auto relative z-10 w-full">
        <span data-half={0} className="display block !text-[clamp(3.25rem,11vw,10rem)] !leading-[0.85] lg:[clip-path:inset(0_50%_0_0)]">{p.title}</span>
        <span data-half={1} aria-hidden className="display pointer-events-none absolute inset-0 hidden !text-[clamp(3.25rem,11vw,10rem)] !leading-[0.85] [clip-path:inset(0_0_0_50%)] lg:block">{p.title}</span>
      </h3>
      <p className="mt-6">{discipline(p)}</p>
      <Link href={`/projects/${p.slug}`} className="link pointer-events-auto mt-2 inline-flex min-h-11 items-center">Read about {p.title} →</Link>
    </div>
  );
}

/**
 * Pinned: one stage holds while the projects pass through it. Before a project is centred its left half
 * sits low and its right half high; they meet as it reaches the middle and part again as it leaves.
 * Without script, or with reduced motion, each project is simply its own screen.
 */
export function SeamWork({ items }: { items: Project[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const pinned = useSyncExternalStore(subscribeRM, () => !window.matchMedia(RM).matches, () => false);

  useEffect(() => {
    if (!pinned) return;
    const el = wrap.current!;
    const slides = Array.from(el.querySelectorAll<HTMLElement>("[data-slide]"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const travel = r.height - vh;
      const tear = window.innerWidth >= 1024;
      const x = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) * (slides.length - 1) : 0;
      slides.forEach((s, i) => {
        const d = Math.max(-1, Math.min(1, x - i)); // -1 arriving, 0 centred, 1 leaving
        s.style.opacity = String(Math.max(0, 1 - Math.abs(d) * 1.6));
        s.style.visibility = Math.abs(d) >= 0.99 ? "hidden" : "visible";
        s.style.zIndex = String(100 - Math.round(Math.abs(d) * 100)); // the nearer project sits on top
        const title = s.querySelector<HTMLElement>("[data-title]");
        if (title) title.style.visibility = Math.abs(d) > 0.5 ? "hidden" : "visible"; // titles never overlap
        s.querySelectorAll<HTMLElement>("[data-pane]").forEach((pane) => {
          const dir = pane.dataset.pane === "0" ? -1 : 1;
          pane.style.transform = `translate3d(0, ${dir * d * 20}svh, 0)`;
        });
        // The name only tears where both halves are wide enough to read; on narrow screens it stays whole.
        if (tear) s.querySelectorAll<HTMLElement>("[data-half]").forEach((half) => {
          const dir = half.dataset.half === "0" ? -1 : 1;
          half.style.transform = `translate3d(0, ${dir * d * 30}svh, 0)`;
        });
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinned]);

  const heading = <h2 className="head !text-[clamp(1.75rem,2.4vw,2.25rem)] text-paper">Selected work</h2>;

  if (!pinned) {
    return (
      <section id="work" aria-label="Selected work">
        {items.map((p, i) => (
          <div key={p.slug} className="relative flex h-svh overflow-hidden">
            <Pane p={p} side={0} /><Pane p={p} side={1} />
            {i === 0 && <div className="absolute left-[var(--m)] top-8 z-10">{heading}</div>}
            <Title p={p} />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section id="work" aria-label="Selected work" ref={wrap} style={{ height: `${items.length * 95 + 5}svh` }} className="relative">
      <div className="sticky top-0 h-svh overflow-hidden bg-foreground">
        {items.map((p, i) => (
          <div key={p.slug} data-slide className="absolute inset-0 flex" style={{ opacity: i === 0 ? 1 : 0 }}>
            <Pane p={p} side={0} priority={i === 0} /><Pane p={p} side={1} />
            <Title p={p} />
          </div>
        ))}
        <div className="absolute left-[var(--m)] top-8 z-[200]">{heading}</div>
      </div>
    </section>
  );
}
