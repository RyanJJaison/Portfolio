"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Adds `is-drawn` once the element scrolls into view, which starts any `.draw-line` strokes inside it. */
export function DrawOnView({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setDrawn(true);
        io.disconnect();
      }
    }, { threshold: 0.35 });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`${className} ${drawn ? "is-drawn" : ""}`}>{children}</div>;
}
