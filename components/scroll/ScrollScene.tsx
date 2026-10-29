"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

const RM = "(prefers-reduced-motion: reduce)";
const subscribeRM = (cb: () => void) => {
  const m = window.matchMedia(RM);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

type Props = {
  label: string;
  /** Extra scroll distance the scene stays on screen for, in viewport heights. */
  length?: number;
  children: (progress: number) => ReactNode;
};

/**
 * Holds a scene on screen with CSS `position: sticky` while the visitor scrolls through it, and maps
 * that scroll distance straight to progress 0..1, so the scene moves exactly in step with the scroll
 * and reverses when scrolling back. Uses native scrolling; no scroll library.
 * With reduced motion the scene is shown finished and does not stick.
 */
export function ScrollScene({ label, length = 1.5, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useSyncExternalStore(subscribeRM, () => window.matchMedia(RM).matches, () => false);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current!;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const top = parseFloat(getComputedStyle(stage.current!).top) || 0;
      // The stage sticks from when the section's top reaches `top` until the section's bottom meets the stage's bottom.
      const travel = r.height - stage.current!.offsetHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, (top - r.top) / travel)) : 1;
      // Quantized so React skips re-rendering the scene for imperceptible changes.
      setProgress(Math.round(p * 400) / 400);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    // Only listen to scroll while the scene is near the viewport.
    let listening = false;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !listening) {
        listening = true;
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
      } else if (!e.isIntersecting && listening) {
        listening = false;
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
      onScroll();
    }, { rootMargin: "10% 0px" });
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  if (reduced) {
    return <section aria-label={label} className="relative h-[calc(100svh-3.375rem)] min-h-[560px]">{children(1)}</section>;
  }

  return (
    <section ref={ref} aria-label={label} className="relative" style={{ height: `${(1 + length) * 100}svh` }}>
      {/* The nav is 3.375rem (54px) tall and sticky too, so the stage sits just under it. */}
      <div ref={stage} className="sticky top-[3.375rem] h-[calc(100svh-3.375rem)] overflow-hidden">
        {children(progress)}
        <div className="pointer-events-none absolute inset-x-0 bottom-4 mx-auto flex max-w-7xl px-6" aria-hidden>
          <div className="h-1 w-28 overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-accent" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
