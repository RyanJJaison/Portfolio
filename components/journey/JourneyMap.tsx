"use client";

import { journeyStops } from "@/content/journey";
import { useStage } from "@/components/split/SplitPage";

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

/**
 * The route from Kottayam to Kochi to Bangalore. The section in view decides how far along the road
 * the map has travelled; each stage id names the stop it belongs to (`stop-<index>`).
 */
export function JourneyMap() {
  const active = useStage();
  const m = /^stop-(\d)/.exec(active);
  const current = m ? Number(m[1]) : 0;

  return (
    <svg viewBox={`-40 -20 ${W + 80} ${H + 40}`} className="h-full max-h-[78svh] w-auto" role="img" aria-label={`Map of the route from Kottayam to Kochi to Bangalore, now at ${pts[current].city}`}>
      <text x={-20} y={H * 0.62} className="fill-muted" fontSize="18" fontStyle="italic">Arabian Sea</text>
      <text x={W * 0.5} y={H * 0.12} className="fill-muted" fontSize="18" fontStyle="italic">Karnataka</text>
      <text x={W * 0.52} y={H * 0.97} className="fill-muted" fontSize="18" fontStyle="italic">Kerala</text>

      {legs.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke="var(--foreground)" strokeOpacity="0.18" strokeWidth="2" />
          <path d={d} fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" pathLength={1} strokeDasharray="1"
            strokeDashoffset={current > i ? 0 : 1} style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.65,0,.35,1)" }} />
        </g>
      ))}

      {pts.map((s, i) => {
        const reached = i <= current;
        return (
          <g key={s.city} transform={`translate(${s.x},${s.y})`} style={{ opacity: reached ? 1 : 0.35, transition: "opacity .6s ease" }}>
            <circle r={i === current ? 20 : 0} fill="var(--accent-soft)" style={{ transition: "r .5s ease" }} />
            <circle r={9} fill={reached ? "var(--accent)" : "var(--surface)"} stroke="var(--foreground)" strokeWidth="2" />
            <text x={i === 0 ? 20 : -18} y={i === 1 ? -12 : 9} textAnchor={i === 0 ? "start" : "end"} fontSize="34" className="fill-foreground font-display">
              {s.city}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
