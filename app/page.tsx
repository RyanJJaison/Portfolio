import Link from "next/link";
import { projects } from "@/content/projects";
import { Hero } from "@/components/home/Hero";
import { WhoIAm } from "@/components/home/WhoIAm";
import { OrbitGraph } from "@/components/home/OrbitGraph";
import { JourneyTeaser } from "@/components/home/JourneyTeaser";
import { Closing } from "@/components/home/Closing";
import { Ledger } from "@/components/projects/Ledger";
import { SectionHead } from "@/components/ui/Section";
import { Marquee } from "@/components/ui/Marquee";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhoIAm />
      <Marquee />
      <div className="mt-20">
        <OrbitGraph />
      </div>

      <section className="mx-auto mt-24 max-w-7xl px-6">
        <SectionHead index="03" title={<>Selected <em>work</em></>}>
          <Link href="/projects" className="hl">All projects →</Link>
        </SectionHead>
        <div className="mt-10">
          <Ledger items={projects.filter((p) => p.featured)} />
        </div>
      </section>

      <JourneyTeaser />
      <Closing />
    </main>
  );
}
