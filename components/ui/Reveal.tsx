"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/** Adds `is-in` once the element scrolls into view; `.reveal` children then rise in one after another. */
export function Reveal({ as: Tag = "div", children, className = "" }: { as?: ElementType; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setShown(true);
        io.disconnect();
      }
    }, { rootMargin: "0px 0px -10% 0px" });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${shown ? "is-in" : ""} ${className}`}>{children}</Tag>;
}
