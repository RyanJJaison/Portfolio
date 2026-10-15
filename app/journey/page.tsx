import type { Metadata } from "next";
import { Timeline } from "@/components/journey/Timeline";
import { JourneyMap } from "@/components/journey/JourneyMap";
import { journey } from "@/content/journey";

export const metadata: Metadata = { title: "Journey" };

export default function JourneyPage() {
  return (
    <main>
      <header className="relative mx-auto max-w-6xl px-6 pt-14">
        <h1 className="font-display text-6xl leading-none sm:text-7xl">Journey</h1>
        <p className="caps mt-4 text-muted">Kottayam · Kochi · Bangalore</p>
        <p className="font-hand mt-6 max-w-md -rotate-1 text-2xl text-muted md:absolute md:right-6 md:top-16 md:mt-0">
          scroll to travel the route, or skip ahead.
        </p>
      </header>
      <JourneyMap />
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-10 border-t border-foreground/70 pt-10 md:grid-cols-[1fr_1.6fr]">
          <h2 className="font-display text-5xl leading-none">The full timeline</h2>
          <Timeline entries={journey} />
        </div>
      </section>
    </main>
  );
}
