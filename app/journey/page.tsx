import type { Metadata } from "next";
import { Timeline } from "@/components/journey/Timeline";
import { JourneyMap } from "@/components/journey/JourneyMap";
import { journey } from "@/content/journey";

export const metadata: Metadata = { title: "Journey" };

export default function JourneyPage() {
  return (
    <main>
      <header className="mx-auto max-w-6xl px-6 pt-16">
        <h1 className="text-4xl font-semibold tracking-tight">Journey</h1>
        <p className="mt-4 max-w-2xl text-muted">From Kottayam to Kochi to Bangalore. Scroll to travel the route, or skip ahead.</p>
      </header>
      <JourneyMap />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">Full timeline</h2>
        <div className="mt-10">
          <Timeline entries={journey} />
        </div>
      </section>
    </main>
  );
}
