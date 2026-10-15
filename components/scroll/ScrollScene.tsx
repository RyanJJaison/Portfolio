"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

const RM = "(prefers-reduced-motion: reduce)";
const subscribeRM = (cb: () => void) => {
  const m = window.matchMedia(RM);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

const START = 0.85; // progress 0 when the scene's top is this far down the viewport
const SPAN = 0.75; // ...and 1 after scrolling this many viewport heights further
const EASE = 0.1; // share of the remaining distance the scene catches up per 60 Hz frame

type Props = {
  label: string;
  className?: string;
  children: (progress: number) => ReactNode;
};

/**
 * Drives a scene from the scroll position, 0..1, while it moves up through the viewport. No pinning:
 * the page scrolls normally and scrolling back plays the scene in reverse. The reported progress eases
 * toward the scroll position, so big wheel jumps still animate smoothly.
 * With reduced motion the scene is shown finished.
 */
export function ScrollScene({ label, className = "", children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useSyncExternalStore(subscribeRM, () => window.matchMedia(RM).matches, () => false);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current!;
    let target = 0;
    let shown = 0;
    let raf = 0;
    let prev = 0;

    const tick = (now: number) => {
      const dt = Math.min(4, (now - prev) / 16.7);
      prev = now;
      shown += (target - shown) * (1 - Math.pow(1 - EASE, dt));
      if (Math.abs(target - shown) < 0.002) shown = target;
      // Quantized so React skips re-rendering the scene for imperceptible changes.
      setProgress(Math.round(shown * 400) / 400);
      raf = shown === target ? 0 : requestAnimationFrame(tick);
    };
    const measure = () => {
      const vh = window.innerHeight;
      target = Math.min(1, Math.max(0, (vh * START - el.getBoundingClientRect().top) / (vh * SPAN)));
      if (!raf && target !== shown) {
        prev = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    // Only listen to scroll while the scene is near the viewport.
    let listening = false;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !listening) {
        listening = true;
        window.addEventListener("scroll", measure, { passive: true });
        window.addEventListener("resize", measure);
      } else if (!e.isIntersecting && listening) {
        listening = false;
        window.removeEventListener("scroll", measure);
        window.removeEventListener("resize", measure);
      }
      measure();
    }, { rootMargin: "20% 0px" });
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [reduced]);

  return (
    <section ref={ref} aria-label={label} className={`relative pb-12 ${className}`}>
      {children(reduced ? 1 : progress)}
    </section>
  );
}
