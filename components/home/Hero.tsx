"use client";

import { useEffect, useState } from "react";
import { BinaryPortrait } from "@/components/home/BinaryPortrait";
import { interests } from "@/content/about";
import { profile } from "@/content/profile";
import { NARROW, useMedia } from "@/components/ui/useMedia";

// Hero stage coordinates (md and up). Everything is positioned in this 1000 x 620 box.
const W = 1000;
const H = 620;
const PORTRAIT = { x: 20, y: 20, size: 420 };
const ORIGIN = { x: 365, y: 330 }; // where the signal leaves the portrait, near the shoulder
const LABEL_X = 690;
const labelY = (i: number) => 170 + i * 56;

const fan = (i: number) => {
  const y = labelY(i);
  return `M${ORIGIN.x},${ORIGIN.y} C${ORIGIN.x + 140},${ORIGIN.y} ${LABEL_X - 170},${y} ${LABEL_X - 14},${y}`;
};

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

export function Hero() {
  const [drawn, setDrawn] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const narrow = useMedia(NARROW);

  // Let the portrait assemble first, then draw the lines out of it.
  useEffect(() => {
    const t = window.setTimeout(() => setDrawn(true), 1500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 pt-6">
      {/* One portrait only: the composed stage on wide screens, a stacked layout on phones. */}
      {!narrow ? (
        <div
          className={`relative ${drawn ? "is-drawn" : ""}`}
          style={{ aspectRatio: `${W} / ${H}` }}
        >
          <div
            className="absolute"
            style={{
              left: pct(PORTRAIT.x, W),
              top: pct(PORTRAIT.y, H),
              width: pct(PORTRAIT.size, W),
            }}
          >
            <BinaryPortrait
              label={`Portrait of ${profile.name} drawn in binary digits`}
            />
          </div>

          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden
          >
            <defs>
              <linearGradient id="beam" x1="0" x2="1">
                <stop
                  offset="0%"
                  stopColor="var(--foreground)"
                  stopOpacity="0.05"
                />
                <stop
                  offset="100%"
                  stopColor="var(--foreground)"
                  stopOpacity="0.55"
                />
              </linearGradient>
            </defs>
            {interests.map((it, i) => (
              <g key={it.name}>
                <path
                  d={fan(i)}
                  pathLength={1}
                  className="draw-line"
                  fill="none"
                  strokeWidth={hover === i ? 2 : 1.1}
                  stroke={hover === i ? "var(--accent)" : "url(#beam)"}
                  style={{ transitionDelay: `${i * 90}ms` }}
                />
                {hover === i && (
                  <path
                    d={fan(i)}
                    pathLength={1}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeDasharray="0.08 1"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0.08"
                      to="-1"
                      dur="1.1s"
                      repeatCount="indefinite"
                    />
                  </path>
                )}
              </g>
            ))}
            <circle
              cx={ORIGIN.x}
              cy={ORIGIN.y}
              r={3}
              fill="var(--foreground)"
              opacity={drawn ? 0.7 : 0}
            />
          </svg>

          <ul
            className="absolute"
            style={{ left: pct(LABEL_X, W), top: 0, right: 0, height: "100%" }}
          >
            {interests.map((it, i) => (
              <li
                key={it.name}
                className="absolute -translate-y-1/2"
                style={{ top: pct(labelY(i), H) }}
              >
                <a
                  href="#graph"
                  onPointerEnter={() => setHover(i)}
                  onPointerLeave={() => setHover(null)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  className={`group block transition-opacity duration-700 ${drawn ? "opacity-100" : "opacity-0"}`}
                  style={{ transitionDelay: `${700 + i * 90}ms` }}
                >
                  <span
                    className={`caps ${hover === i ? "text-accent" : "text-foreground"}`}
                  >
                    {it.name}
                  </span>
                  <span
                    className={`font-hand block text-lg leading-tight text-muted transition-opacity ${hover === i ? "opacity-100" : "opacity-0"}`}
                  >
                    {it.seen}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p
            className="font-hand absolute -rotate-2 text-3xl text-muted"
            style={{ left: pct(650, W), top: pct(28, H) }}
          >
            signal, not noise.
          </p>
          <p
            className="font-hand absolute rotate-[-4deg] text-2xl text-muted"
            style={{ left: pct(420, W), top: pct(470, H) }}
          >
            noise in, me out.
          </p>
        </div>
      ) : (
        <div>
          <div className="relative mx-auto max-w-xs">
            <BinaryPortrait
              label={`Portrait of ${profile.name} drawn in binary digits`}
            />
          </div>
          <p className="font-hand -mt-2 -rotate-2 text-center text-2xl text-muted">
            signal, not noise.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-5">
            {interests.map((it) => (
              <li key={it.name}>
                <span className="caps">{it.name}</span>
                <span className="font-hand block text-base leading-tight text-muted">
                  {it.seen}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10 text-center md:mt-2">
        <h1 className="font-display text-6xl leading-none sm:text-8xl">
          Hi, I&apos;m Ryan.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
          Computer science student building practical AI and ML systems, from
          graph models to speech to hardware.
        </p>
        <a
          href="#who"
          className="caps mt-10 inline-flex flex-col items-center gap-2 text-muted hover:text-foreground"
        >
          Scroll to begin
          <svg width="12" height="34" viewBox="0 0 12 34" aria-hidden>
            <path
              d="M6 0v32M1 27l5 5 5-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
