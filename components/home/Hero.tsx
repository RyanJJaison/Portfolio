"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BinaryPortrait } from "@/components/home/BinaryPortrait";
import { fields as interests } from "@/content/skills";
import { profile } from "@/content/profile";
import { portrait } from "@/content/portrait";
import { NARROW, useMedia } from "@/components/ui/useMedia";

// Wide layout: heading | portrait | fields, all positioned in one 1000 x 520 stage.
const W = 1000;
const H = 520;
const PORTRAIT = { x: 395, y: 18, size: 385 };
const ORIGIN = { x: 712, y: 300 }; // right shoulder, where the lines leave the portrait
const LABEL_X = 800;
const labelY = (i: number) => 92 + i * 64;

const BITS = Array.from(atob(portrait.data)).filter((c) => c.charCodeAt(0) > 0).length.toLocaleString("en");

const fan = (i: number) => {
  const y = labelY(i);
  return `M${ORIGIN.x},${ORIGIN.y} C${ORIGIN.x + 45},${ORIGIN.y} ${LABEL_X - 50},${y} ${LABEL_X - 10},${y}`;
};
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

function Heading({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="caps text-accent">B.Tech AI · Christ University, Bangalore</p>
      <h1 className="display mt-4 text-[clamp(3.5rem,7.6vw,7.5rem)]">
        Hi, I&apos;m<br /><em>Ryan</em><span className="mark" aria-hidden />
      </h1>
      <p className="mt-6 max-w-sm text-lg leading-snug">
        Computer science student building practical AI and ML systems, from graph models to speech to hardware.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link href="/projects" className="caps pill bg-foreground text-background hover:bg-accent">See my work →</Link>
        {profile.links.cv && (
          <a href={profile.links.cv} target="_blank" rel="noopener noreferrer" className="caps pill bg-surface hover:bg-foreground hover:text-background">Résumé ↗</a>
        )}
      </div>
    </div>
  );
}

export function Hero() {
  const [drawn, setDrawn] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const narrow = useMedia(NARROW);

  // Let the portrait assemble first, then draw the lines out of it.
  useEffect(() => {
    const t = window.setTimeout(() => setDrawn(true), 1400);
    return () => window.clearTimeout(t);
  }, []);

  const caption = <p className="caps text-muted">Self-portrait, {BITS} bits</p>;

  if (narrow) {
    return (
      <section className="grain px-6 pt-8">
        <Heading />
        <div className="mx-auto mt-10 max-w-xs">
          <BinaryPortrait label={`Portrait of ${profile.name} drawn in binary digits`} />
          {caption}
        </div>
        <ol className="mt-8">
          {interests.map((it) => (
            <li key={it.name} className="flex items-baseline justify-between gap-4 py-2.5">
              <span className="caps">{it.name}</span>
              <span className="text-right text-sm text-muted">{it.seen}</span>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section className="grain">
      <div className="mx-auto max-w-7xl px-6 pt-6">
        <div className={`relative ${drawn ? "is-drawn" : ""}`} style={{ aspectRatio: `${W} / ${H}` }}>
          <Heading className="absolute left-0 top-[8%] w-[39%]" />

          <div className="absolute" style={{ left: pct(PORTRAIT.x, W), top: pct(PORTRAIT.y, H), width: pct(PORTRAIT.size, W) }}>
            <BinaryPortrait label={`Portrait of ${profile.name} drawn in binary digits`} />
            <div className="-mt-6">{caption}</div>
          </div>

          <svg viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
            {interests.map((it, i) => (
              <g key={it.name}>
                <path d={fan(i)} pathLength={1} className="draw-line" fill="none" stroke={hover === i ? "var(--accent)" : "var(--foreground)"}
                  strokeWidth={hover === i ? 2 : 0.8} style={{ transitionDelay: `${i * 70}ms` }} />
                {hover === i && (
                  <path d={fan(i)} pathLength={1} fill="none" stroke="var(--accent)" strokeWidth={5} strokeLinecap="round" strokeDasharray="0.04 1">
                    <animate attributeName="stroke-dashoffset" from="0.07" to="-1" dur="0.9s" repeatCount="indefinite" />
                  </path>
                )}
              </g>
            ))}
            <circle cx={ORIGIN.x} cy={ORIGIN.y} r={5.5} fill="var(--accent)" stroke="var(--background)" strokeWidth={2} opacity={drawn ? 1 : 0} />
          </svg>

          <ol className="absolute right-0" style={{ left: pct(LABEL_X, W), top: 0, height: "100%" }}>
            {interests.map((it, i) => (
              <li key={it.name} className="absolute w-full -translate-y-1/2" style={{ top: pct(labelY(i), H) }}>
                <a
                  href="#graph"
                  onPointerEnter={() => setHover(i)}
                  onPointerLeave={() => setHover(null)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  className={`block transition-opacity duration-500 ${drawn ? "opacity-100" : "opacity-0"}`}
                  style={{ transitionDelay: `${600 + i * 70}ms` }}
                >
                  <span className={`caps -mx-2 inline-block rounded-full px-2 py-0.5 transition-colors ${hover === i ? "bg-accent-soft" : ""}`}>
                    {it.name}
                  </span>
                  <span className={`block text-xs leading-tight text-muted transition-opacity ${hover === i ? "opacity-100" : "opacity-0"}`}>{it.seen}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
