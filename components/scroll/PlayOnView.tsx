"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

const RM = "(prefers-reduced-motion: reduce)";
const subscribeRM = (cb: () => void) => {
  const m = window.matchMedia(RM);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type Props = {
  /** How long the scene takes to play, in ms. */
  duration: number;
  label: string;
  className?: string;
  children: (progress: number) => ReactNode;
};

/**
 * Plays a scene once, from progress 0 to 1, when it scrolls into view. No pinning: the page scrolls normally.
 * After it plays, a slider lets the visitor scrub through it and a button replays it.
 * With reduced motion the scene is shown finished.
 */
export function PlayOnView({ duration, label, className = "", children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const raf = useRef(0);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reduced = useSyncExternalStore(subscribeRM, () => window.matchMedia(RM).matches, () => false);

  const play = () => {
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    setPlaying(true);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(Math.round(ease(t) * 400) / 400);
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else setPlaying(false);
    };
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (reduced) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        io.disconnect();
        play();
      }
    }, { threshold: 0.4 });
    io.observe(ref.current!);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
    // play only reads refs and stable setters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, reduced]);

  return (
    <section ref={ref} aria-label={label} className={`relative ${className}`}>
      {children(reduced ? 1 : progress)}
      <div className="mx-auto mb-12 mt-2 flex max-w-7xl items-center gap-4 px-6">
        <button type="button" onClick={play} disabled={playing} className="caps pill pill-sm bg-foreground text-background transition-opacity hover:bg-accent disabled:opacity-40">
          ↻ Replay
        </button>
        <input
          type="range" min={0} max={1} step={0.005} value={progress}
          onChange={(e) => {
            cancelAnimationFrame(raf.current);
            setPlaying(false);
            setProgress(Number(e.target.value));
          }}
          aria-label={`Scrub through the ${label.toLowerCase()}`}
          className="h-1 w-40 cursor-pointer accent-[var(--accent)]"
        />
      </div>
    </section>
  );
}
