import Link from "next/link";
import { projects } from "@/content/projects";
import { Hero } from "@/components/home/Hero";
import { WhoIAm } from "@/components/home/WhoIAm";
import { SkillGraph } from "@/components/home/SkillGraph";
import { JourneyTeaser } from "@/components/home/JourneyTeaser";
import { ClosingQuote } from "@/components/home/ClosingQuote";
import { Ledger } from "@/components/projects/Ledger";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhoIAm />
      <div className="mt-28">
        <SkillGraph />
      </div>

      <section className="mx-auto mt-24 max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 pb-6">
          <div>
            <p className="caps text-muted">Log of built work</p>
            <h2 className="font-display mt-2 text-5xl leading-none">Selected work</h2>
          </div>
          <Link href="/projects" className="caps text-muted hover:text-foreground">Every project →</Link>
        </div>
        <Ledger items={projects.filter((p) => p.featured)} />
      </section>

      <JourneyTeaser />
      <ClosingQuote />
    </main>
  );
}
