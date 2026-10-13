"use client";

import { journeyStops } from "@/content/journey";
import { PinnedScene } from "@/components/scroll/PinnedScene";

// Equirectangular projection over a box covering Kerala and Bangalore.
const BOX = { west: 75.4, east: 78.4, south: 8.9, north: 13.7 };
const W = 600;
const KX = Math.cos((11.3 * Math.PI) / 180);
const H = Math.round((W * (BOX.north - BOX.south)) / ((BOX.east - BOX.west) * KX));
const project = (lat: number, lon: number) => ({
  x: ((lon - BOX.west) / (BOX.east - BOX.west)) * W,
  y: ((BOX.north - lat) / (BOX.north - BOX.south)) * H,
});

const pts = journeyStops.map((s) => ({ ...s, ...project(s.lat, s.lon) }));

function curve(a: { x: number; y: number }, b: { x: number; y: number }, bend: number) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return `M${a.x},${a.y} Q${mx - dy * bend},${my + dx * bend} ${b.x},${b.y}`;
}
const legs = [curve(pts[0], pts[1], -0.35), curve(pts[1], pts[2], 0.18)];

// Scene timeline over progress 0..1.
const ARRIVE = [0.05, 0.4, 0.85]; // when each stop lights up
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

function Scene({ p }: { p: number }) {
  const legDraw = [span(p, ARRIVE[0], ARRIVE[1]), span(p, ARRIVE[1], ARRIVE[2])];
  const reached = ARRIVE.map((t) => p >= t);
  const current = reached.lastIndexOf(true);

  return (
    <div className="mx-auto grid h-full max-w-6xl content-center items-center gap-6 px-6 pt-16 md:grid-cols-[1fr_1fr] md:gap-12">
      <svg viewBox={`-40 -20 ${W + 80} ${H + 40}`} className="mx-auto h-[38vh] w-auto md:h-[75vh]" role="img" aria-label="Map of the route from Kottayam to Kochi to Bangalore">
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="var(--line)" />
          </pattern>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <rect x={-40} y={-20} width={W + 80} height={H + 40} fill="url(#dots)" />
        <text x={-20} y={H * 0.62} className="fill-muted font-mono" fontSize="16" opacity="0.5">Arabian Sea</text>
        <text x={W * 0.48} y={H * 0.12} className="fill-muted font-mono" fontSize="16" opacity="0.5">Karnataka</text>
        <text x={W * 0.5} y={H * 0.97} className="fill-muted font-mono" fontSize="16" opacity="0.5">Kerala</text>

        {legs.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="4 8" />
            <path d={d} fill="none" stroke="var(--accent)" strokeWidth="6" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - legDraw[i]} filter="url(#glow)" opacity="0.6" />
            <path d={d} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - legDraw[i]} />
          </g>
        ))}

        {pts.map((s, i) => (
          <g key={s.city} transform={`translate(${s.x},${s.y})`} opacity={reached[i] ? 1 : 0.25}>
            {i === current && <circle r="22" fill="var(--accent)" opacity="0.15" className="animate-ping origin-center" />}
            <circle r="9" fill="var(--background)" stroke="var(--accent)" strokeWidth="2.5" />
            <circle r="4" fill={reached[i] ? "var(--accent)" : "var(--line)"} />
            <text x={i === 0 ? 18 : -16} y={i === 1 ? -10 : 6} textAnchor={i === 0 ? "start" : "end"} fontSize="22" className="fill-foreground font-medium">
              {s.city}
            </text>
          </g>
        ))}
      </svg>

      <ol className="space-y-4 max-md:relative max-md:h-28">
        {pts.map((s, i) => (
          <li
            key={s.city}
            className={`rounded-xl border p-5 transition duration-500 ${i === current ? "border-accent bg-accent/5" : "border-line max-md:hidden"} ${reached[i] ? "opacity-100" : "translate-y-2 opacity-20"}`}
          >
            <p className="font-mono text-xs text-accent">{s.period}</p>
            <h3 className="mt-1 text-lg font-medium">{s.title}</h3>
            <p className="text-sm text-muted">{s.city}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function JourneyMap() {
  return (
    <PinnedScene label="Education journey map" length={2.5}>
      {(p) => <Scene p={p} />}
    </PinnedScene>
  );
}
