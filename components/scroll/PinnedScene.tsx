"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RM = "(prefers-reduced-motion: reduce)";
const subscribeRM = (cb: () => void) => {
  const m = window.matchMedia(RM);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

/** Jump just past a scene's end. Native smooth scroll: no scroll-smoothing library, so wheel input stays 1:1. */
function scrollPast(end: number) {
  const smooth = !window.matchMedia(RM).matches;
  window.scrollTo({ top: end + 2, behavior: smooth ? "smooth" : "auto" });
}

const FAST_SCROLL = 2500; // px/s; flinging faster than this fast-forwards the scene

type Props = {
  /** Scroll distance the scene stays pinned for, in viewport heights. */
  length?: number;
  label: string;
  children: (progress: number) => ReactNode;
};

/**
 * Pins its content while the user scrolls through it and reports progress 0..1.
 * Visitors can leave early with the Skip button or by scrolling fast.
 * With reduced motion the scene is shown finished and does not pin.
 */
export function PinnedScene({ length = 2.5, label, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);
  const reduced = useSyncExternalStore(subscribeRM, () => window.matchMedia(RM).matches, () => false);

  useEffect(() => {
    if (reduced) return;
    let forwarding = false;
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top top",
      end: () => `+=${window.innerHeight * length}`,
      pin: true,
      scrub: true,
      onToggle: (self) => setActive(self.isActive),
      onUpdate: (self) => {
        // Quantized so React skips re-rendering the scene for sub-pixel scroll changes.
        setProgress(Math.round(self.progress * 400) / 400);
        if (!forwarding && self.direction === 1 && self.getVelocity() > FAST_SCROLL && self.progress < 0.95) {
          forwarding = true;
          scrollPast(self.end);
          setTimeout(() => (forwarding = false), 700);
        }
      },
    });
    trigger.current = st;
    return () => st.kill();
  }, [length, reduced]);

  const skip = () => {
    if (trigger.current) scrollPast(trigger.current.end);
  };

  return (
    <section ref={ref} aria-label={label} className="relative h-screen w-full overflow-hidden">
      {children(reduced ? 1 : progress)}
      {!reduced && (
        <div className={`pointer-events-none absolute inset-x-0 bottom-6 flex items-center justify-between px-6 transition-opacity ${active ? "opacity-100" : "opacity-0"}`}>
          <div className="h-0.5 w-32 overflow-hidden rounded bg-line" aria-hidden>
            <div className="h-full bg-accent" style={{ width: `${progress * 100}%` }} />
          </div>
          <button
            type="button"
            onClick={skip}
            className="pointer-events-auto rounded-full border border-line bg-background/70 px-4 py-1.5 font-mono text-xs text-muted hover:border-accent hover:text-foreground"
          >
            Skip ↓
          </button>
        </div>
      )}
    </section>
  );
}
