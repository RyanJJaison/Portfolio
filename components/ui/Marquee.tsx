"use client";

import { useEffect, useRef } from "react";
import { fields } from "@/content/skills";

/**
 * A strip of field names between sections. It drifts slowly on its own, speeds up while the page is
 * scrolled, and runs the other way when the visitor scrolls back up. Purely decorative.
 */
export function Marquee() {
  const track = useRef<HTMLDivElement>(null);
  const words = fields.map((f) => f.name);
  const run = [...words, ...words];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = track.current!;
    let x = 0;
    let dir = 1;
    let boost = 0;
    let lastY = window.scrollY;
    let last = performance.now();
    let raf = 0;
    let visible = false;

    const onScroll = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      if (dy) dir = dy > 0 ? 1 : -1;
      boost = Math.min(boost + Math.abs(dy) * 0.6, 900);
    };
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      boost *= 0.92; // eases back to the resting drift
      x -= dir * (40 + boost) * dt;
      const half = el.scrollWidth / 2;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      el.style.transform = `translate3d(${x}px,0,0)`;
      raf = visible ? requestAnimationFrame(tick) : 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
    });
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="mt-24 overflow-hidden py-4" aria-hidden>
      <div ref={track} className="marquee">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {run.map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center whitespace-nowrap">
                <span className={`px-6 text-4xl sm:text-6xl ${i % 2 ? "serif text-accent" : "display"}`}>{w}</span>
                <span className="live-dot !h-2.5 !w-2.5" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
