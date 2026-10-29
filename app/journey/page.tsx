import type { Metadata } from "next";
import Image from "next/image";
import { journey, journeyStops } from "@/content/journey";
import { pictures, type PictureId } from "@/content/media";
import { JourneyMap } from "@/components/journey/JourneyMap";
import { SplitPage, type StageItem } from "@/components/split/SplitPage";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Journey" };

// Which stop on the map each entry belongs to, and the picture of that place.
const PLACE: { stop: number; picture: PictureId }[] = [
  { stop: 0, picture: "vembanad" },
  { stop: 1, picture: "kochiWater" },
  { stop: 2, picture: "christ" },
  { stop: 1, picture: "fishingNet" },
  { stop: 2, picture: "dataCentre" },
];

export default function JourneyPage() {
  const ids = journey.map((_, i) => `stop-${PLACE[i].stop}-${i}`);
  const stage: StageItem[] = [
    { id: "stop-0-hero", caption: "Kottayam, where it starts" },
    ...journey.map((e, i) => ({ id: ids[i], caption: `${journeyStops[PLACE[i].stop].city}: ${e.title}` })),
  ];
  return (
    <main>
      <SplitPage items={stage} fixed={<JourneyMap />} aside="Kottayam · Kochi · Bangalore">
        <section data-stage="stop-0-hero" className="flex flex-col justify-center pb-16 pt-10 lg:min-h-[60svh] lg:py-16">
          <div className="rise">
            <h1 className="display">Journey</h1>
            <p className="lead measure mt-10">From school in Kottayam, to Kochi for Classes 11 and 12, to Bangalore for a degree in Artificial Intelligence.</p>
          </div>
        </section>
        <ol className="max-w-[40rem] pb-40">
          {journey.map((e, i) => {
            const p = pictures[PLACE[i].picture];
            return (
              <li key={e.title} data-stage={ids[i]} className="mt-28 first:mt-10">
                <Reveal>
                  <h2 className="head">{e.title}</h2>
                  <p className="mt-4 font-semibold">{e.period}{e.place ? ` · ${e.place}` : ""}</p>
                  <p className="mt-2">{e.body}</p>
                  <figure className="mt-10">
                    <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[3/2] w-full object-cover" />
                    <figcaption className="small mt-2 text-muted">{p.caption}</figcaption>
                  </figure>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </SplitPage>
    </main>
  );
}
