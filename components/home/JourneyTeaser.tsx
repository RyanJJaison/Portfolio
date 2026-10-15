import Link from "next/link";
import { journeyStops } from "@/content/journey";
import { DrawOnView } from "@/components/ui/DrawOnView";

// A hand-drawn route across the page, one stop per place Ryan has studied.
const STOPS = [
  { x: 90, y: 150 },
  { x: 420, y: 70 },
  { x: 860, y: 120 },
];
const ROUTE = "M90,150 C180,150 250,60 420,70 S700,190 860,120";

export function JourneyTeaser() {
  return (
    <section className="mx-auto mt-28 max-w-6xl px-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-t border-foreground/70 pt-10">
        <div>
          <p className="caps text-muted">The route so far</p>
          <h2 className="font-display mt-2 text-5xl leading-none">Journey</h2>
        </div>
        <Link href="/journey" className="caps text-muted hover:text-foreground">Walk the full route →</Link>
      </div>
      <DrawOnView className="mt-6">
        <svg viewBox="0 0 950 230" className="w-full" role="img" aria-label="Route from Kottayam to Kochi to Bangalore">
          <path d={ROUTE} pathLength={1} className="draw-line" fill="none" stroke="var(--foreground)" strokeWidth={1.4} strokeDasharray="1" />
          <path d={ROUTE} transform="translate(1 1.5)" pathLength={1} className="draw-line" fill="none" stroke="var(--foreground)" strokeOpacity={0.15} strokeWidth={1} />
          {journeyStops.map((s, i) => (
            <g key={s.city} transform={`translate(${STOPS[i].x},${STOPS[i].y})`}>
              <circle r={7} fill="var(--background)" stroke="var(--foreground)" strokeWidth={1.3} />
              <circle r={2.8} fill={i === journeyStops.length - 1 ? "var(--accent)" : "var(--foreground)"} />
              <text y={i === 1 ? -22 : 34} textAnchor="middle" className="font-display" fontSize={28} fill="var(--foreground)">{s.city}</text>
              <text y={i === 1 ? -54 : 58} textAnchor="middle" className="font-hand" fontSize={20} fill="var(--muted)">{s.period}</text>
            </g>
          ))}
        </svg>
      </DrawOnView>
    </section>
  );
}
