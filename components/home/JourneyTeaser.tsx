import Link from "next/link";
import { journeyStops } from "@/content/journey";
import { DrawOnView } from "@/components/ui/DrawOnView";
import { SectionHead } from "@/components/ui/Section";

/** Three stops on one horizontal rule. */
export function JourneyTeaser() {
  return (
    <section className="mx-auto mt-28 max-w-7xl px-6">
      <SectionHead index="04" title="The route">
        <Link href="/journey" className="hl">Full route</Link>
      </SectionHead>
      <DrawOnView className="mt-12">
        <div className="relative">
          <svg viewBox="0 0 1000 12" preserveAspectRatio="none" className="absolute left-0 top-[5px] h-3 w-full" aria-hidden>
            <path d="M0 6 H1000" pathLength={1} className="draw-line" stroke="var(--accent)" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
          </svg>
          <ol className="relative grid grid-cols-3 gap-6">
            {journeyStops.map((s, i) => (
              <li key={s.city} className={i === 2 ? "text-right" : i === 1 ? "text-center" : ""}>
                <span className={`inline-block h-[22px] w-[22px] rounded-full border-2 border-accent ${i === journeyStops.length - 1 ? "bg-accent ring-4 ring-accent-soft" : "bg-background"}`} aria-hidden />
                <p className="caps mt-4 text-muted">{s.period}</p>
                <p className="display mt-2 text-[clamp(1.4rem,5.5vw,3.75rem)]">{s.city}</p>
                <p className="mt-2 text-sm text-muted">{s.title}</p>
              </li>
            ))}
          </ol>
        </div>
      </DrawOnView>
    </section>
  );
}
