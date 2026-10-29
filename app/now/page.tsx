import type { Metadata } from "next";
import { nowEntries } from "@/content/now";
import type { PictureId } from "@/content/media";
import { SplitPage, StageSection, type StageItem } from "@/components/split/SplitPage";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Now" };

const ENTRY_PICTURES: PictureId[] = ["dataCentre", "neurons", "punchCard", "slideRule"];

export default function NowPage() {
  const stage: StageItem[] = nowEntries.map((e, i) => ({ id: `now-${i}`, picture: ENTRY_PICTURES[i] }));
  return (
    <main>
      <SplitPage items={stage} aside="What I'm learning">
        <section data-stage="now-0" className="flex flex-col justify-center pb-16 pt-10 lg:min-h-[50svh] lg:py-16">
          <div className="rise">
            <h1 className="display">Now</h1>
            <p className="lead measure mt-10">What I&apos;m learning at the moment, what comes next, and what I&apos;ve finished. Updated as it changes.</p>
          </div>
        </section>
        <ol className="max-w-[40rem] pb-40">
          {nowEntries.map((e, i) => (
            <li key={e.title} className="mt-24 first:mt-6">
              <StageSection id={`now-${i}`} picture={i === 0 ? undefined : ENTRY_PICTURES[i]}>
                <Reveal>
                  <h2 className="head">{e.title}</h2>
                  <p className="mt-5"><span className={`mr-2 px-2 py-0.5 font-semibold ${e.when === "Now" ? "bg-accent text-white" : "bg-surface"}`}>{e.when}</span>{e.body}</p>
                </Reveal>
              </StageSection>
            </li>
          ))}
        </ol>
      </SplitPage>
    </main>
  );
}
