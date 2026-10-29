import type { Metadata } from "next";
import { Timeline } from "@/components/journey/Timeline";
import { JourneyMap } from "@/components/journey/JourneyMap";
import { journey } from "@/content/journey";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Journey" };

export default function JourneyPage() {
  return (
    <main>
      <Reveal as="header" className="mx-auto grid max-w-7xl grid-cols-12 gap-x-6 gap-y-4 px-6 pt-10">
        <p className="caps col-span-12 text-accent">Kottayam, Kochi, Bangalore</p>
        <h1 className="display col-span-12 text-[clamp(3.5rem,11vw,10rem)]">Journey<span className="mark" aria-hidden /></h1>
        <p className="caps col-span-12 text-muted md:col-span-4 md:col-start-9 md:text-right">Scroll to travel the route</p>
      </Reveal>
      <JourneyMap />
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8 pt-4">
          <h2 className="caps col-span-12 md:col-span-3">Full timeline</h2>
          <div className="col-span-12 md:col-span-9"><Timeline entries={journey} /></div>
        </div>
      </section>
    </main>
  );
}
