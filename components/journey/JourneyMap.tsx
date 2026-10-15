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
            <path d="M0 0.5 H24 M0.5 0 V24" stroke="var(--line)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x={-40} y={-20} width={W + 80} height={H + 40} fill="url(#dots)" />
        <text x={-20} y={H * 0.62} className="fill-muted font-mono uppercase" fontSize="15" letterSpacing="0.08em">Arabian Sea</text>
        <text x={W * 0.48} y={H * 0.12} className="fill-muted font-mono uppercase" fontSize="15" letterSpacing="0.08em">Karnataka</text>
        <text x={W * 0.5} y={H * 0.97} className="fill-muted font-mono uppercase" fontSize="15" letterSpacing="0.08em">Kerala</text>

        {legs.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="var(--foreground)" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="2 6" />
            <path d={d} fill="none" stroke="var(--foreground)" strokeWidth="2" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - legDraw[i]} />
          </g>
        ))}

        {pts.map((s, i) => (
          <g key={s.city} transform={`translate(${s.x},${s.y})`} opacity={reached[i] ? 1 : 0.25}>
            {i === current && <rect x={-16} y={-16} width={32} height={32} fill="none" stroke="var(--accent)" strokeWidth="1.5" />}
            <rect x={-9} y={-9} width={18} height={18} fill="var(--background)" stroke="var(--foreground)" strokeWidth="2" />
            <rect x={-4.5} y={-4.5} width={9} height={9} fill={i === current ? "var(--accent)" : reached[i] ? "var(--foreground)" : "var(--line)"} />
            <text x={i === 0 ? 18 : -16} y={i === 1 ? -10 : 8} textAnchor={i === 0 ? "start" : "end"} fontSize="32" fontWeight={800} letterSpacing="-0.02em" className="fill-foreground font-display">
              {s.city}
            </text>
          </g>
        ))}
      </svg>

      <ol className="space-y-4 max-md:relative max-md:h-28">
        {pts.map((s, i) => (
          <li
            key={s.city}
            className={`border-l-2 py-2 pl-5 transition duration-500 ${i === current ? "border-accent" : "border-line max-md:hidden"} ${reached[i] ? "opacity-100" : "translate-y-2 opacity-20"}`}
          >
            <p className="caps text-muted">{s.period}</p>
            <h3 className="display mt-2 text-3xl">{s.title}</h3>
            <p className="caps mt-2 text-muted">{s.city}</p>
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
