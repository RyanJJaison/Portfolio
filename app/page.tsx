import Link from "next/link";
import { projects } from "@/content/projects";
import { Hero } from "@/components/home/Hero";
import { WhoIAm } from "@/components/home/WhoIAm";
import { SkillGraph } from "@/components/home/SkillGraph";
import { JourneyTeaser } from "@/components/home/JourneyTeaser";
import { Closing } from "@/components/home/Closing";
import { Ledger } from "@/components/projects/Ledger";
import { SectionHead } from "@/components/ui/Section";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhoIAm />
      <div className="mt-24">
        <SkillGraph />
      </div>

      <section className="mx-auto mt-24 max-w-7xl px-6">
        <SectionHead index="03" title="Selected work">
          <Link href="/projects" className="hover:text-accent">All projects →</Link>
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
