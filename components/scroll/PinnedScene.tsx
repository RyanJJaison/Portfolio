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

const FAST_SCROLL = 7000; // px/s; only a hard fling fast-forwards the scene
const EASE = 0.09; // share of the remaining distance the scene catches up per 60 Hz frame

type Props = {
  /** Scroll distance the scene stays pinned for, in viewport heights. */
  length?: number;
  label: string;
  children: (progress: number) => ReactNode;
};

/**
 * Pins its content while the user scrolls through it and reports progress 0..1.
 * The reported progress eases toward the scroll position, so the scene plays at a calm pace
 * even when the wheel or trackpad moves in big jumps.
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
    let last = 0; // raw progress at the previous update
    let target = 0;
    let shown = 0;
    let raf = 0;
    let prev = 0;
    const tick = (now: number) => {
      const dt = Math.min(4, (now - prev) / 16.7);
      prev = now;
      shown += (target - shown) * (1 - Math.pow(1 - EASE, dt));
      if (Math.abs(target - shown) < 0.0015) shown = target;
      // Quantized so React skips re-rendering the scene for imperceptible changes.
      setProgress(Math.round(shown * 400) / 400);
      raf = shown === target ? 0 : requestAnimationFrame(tick);
    };
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top top",
      end: () => `+=${window.innerHeight * length}`,
      pin: true,
      scrub: true,
      onToggle: (self) => setActive(self.isActive),
      onUpdate: (self) => {
        target = self.progress;
        if (!raf) {
          prev = performance.now();
          raf = requestAnimationFrame(tick);
        }
        // Only a fling that starts inside the scene skips it; a jump from elsewhere (a link, a refresh) does not.
        const inside = last > 0 && last < 1;
        last = self.progress;
        if (inside && !forwarding && self.direction === 1 && self.getVelocity() > FAST_SCROLL && self.progress < 0.95) {
          forwarding = true;
          scrollPast(self.end);
          setTimeout(() => (forwarding = false), 700);
        }
      },
    });
    trigger.current = st;
    return () => {
      cancelAnimationFrame(raf);
      st.kill();
    };
  }, [length, reduced]);

  const skip = () => {
    if (trigger.current) scrollPast(trigger.current.end);
  };

  return (
    <section ref={ref} aria-label={label} className="relative h-screen w-full overflow-hidden">
      {children(reduced ? 1 : progress)}
      {!reduced && (
        <div className={`pointer-events-none absolute inset-x-0 bottom-6 flex items-center justify-between px-6 transition-opacity ${active ? "opacity-100" : "opacity-0"}`}>
          <div className="h-1 w-32 overflow-hidden bg-line" aria-hidden>
            <div className="h-full bg-foreground" style={{ width: `${progress * 100}%` }} />
          </div>
          <button
            type="button"
            onClick={skip}
            className="caps pointer-events-auto border-b border-muted bg-background/80 px-1 pb-0.5 text-muted hl"
          >
            Skip ↓
          </button>
        </div>
      )}
    </section>
  );
}
