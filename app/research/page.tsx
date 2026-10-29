import type { Metadata } from "next";
import { researchPreface, researchThreads } from "@/content/research";
import type { PictureId } from "@/content/media";
import { SplitPage, StageSection, type StageItem } from "@/components/split/SplitPage";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Research" };

const THREAD_PICTURES: PictureId[] = ["paddy", "limescale", "hollerith"];

export default function ResearchPage() {
  const stage: StageItem[] = [
    { id: "hero", picture: "notes" },
    ...researchThreads.map((t, i) => ({ id: `thread-${i}`, picture: THREAD_PICTURES[i] })),
  ];
  return (
    <main>
      <SplitPage items={stage} aside="Open questions">
        <section data-stage="hero" className="py-16 md:pt-24">
          <div className="rise">
            <h1 className="display">Research</h1>
            {researchPreface.map((para, i) => (
              <p key={para.slice(0, 24)} className={`measure ${i === 0 ? "lead mt-10" : "mt-6"}`}>{para}</p>
            ))}
          </div>
        </section>
        <div className="max-w-[40rem] pb-40">
          {researchThreads.map((t, i) => (
            <StageSection key={t.title} id={`thread-${i}`} picture={THREAD_PICTURES[i]} className="mt-28">
              <Reveal>
                <h2 className="head">{t.title}</h2>
                <p className="mt-4 font-semibold">{t.status}</p>
                <blockquote className="lead mt-6 border-l-4 border-accent pl-5 italic">{t.question}</blockquote>
                <p className="mt-6">{t.summary}</p>
                <p className="small mt-5 text-muted">{t.tags.join(", ")}</p>
              </Reveal>
            </StageSection>
          ))}
        </div>
      </SplitPage>
    </main>
  );
}
