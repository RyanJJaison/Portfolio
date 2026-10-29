import Image from "next/image";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { about } from "@/content/about";
import { pictures } from "@/content/media";
import { portrait } from "@/content/portrait";
import { SplitPage, StageSection, type StageItem } from "@/components/split/SplitPage";
import { BinaryPortrait } from "@/components/home/BinaryPortrait";
import { SeamWork } from "@/components/home/SeamWork";
import { Figures } from "@/components/home/Figures";
import { OrbitGraph } from "@/components/home/OrbitGraph";
import { JourneySheet } from "@/components/home/JourneySheet";
import { ContactBand } from "@/components/home/ContactBand";
import { Reveal } from "@/components/ui/Reveal";

const BITS = Array.from(atob(portrait.data)).filter((c) => c.charCodeAt(0) > 0).length.toLocaleString("en");

export default function Home() {
  const stage: StageItem[] = [
    {
      id: "hero",
      node: <div className="w-[min(100%,68svh)]"><BinaryPortrait label={`Portrait of ${profile.name} drawn in ${BITS} binary digits`} /></div>,
      caption: `Self-portrait in ${BITS} bits`,
    },
    ...about.letter.map((l, i) => ({ id: `letter-${i}`, picture: l.stage })),
  ];

  return (
    <main>
      <SplitPage items={stage} aside={profile.location}>
        <section data-stage="hero" className="flex flex-col justify-center pb-24 pt-10 lg:min-h-[calc(100svh-4.5rem)] lg:py-16 lg:pb-32">
          <div className="rise">
            <h1 className="display !text-[clamp(3rem,6.6vw,6.25rem)]"><span className="whitespace-nowrap">Ryan Joseph</span> Jaison</h1>
            <p className="lead measure mt-10">
              I&apos;m a second-year AI student at Christ University, Bangalore. I build graph models, speech recognition and study tools, and I&apos;m looking for an internship.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href="#work" className="btn">See the work</a>
              {profile.links.cv && <a href={profile.links.cv} target="_blank" rel="noopener noreferrer" className="link">Download my résumé (PDF)</a>}
            </div>
          </div>
        </section>

        <div className="measure py-32 md:py-40">
          <Reveal>
            <h2 className="head">{about.title}</h2>
            <Image src={pictures.ryan.src} alt={pictures.ryan.alt} width={88} height={88} className="mt-10 h-11 w-11 rounded-full object-cover" />
          </Reveal>
          {about.letter.map((l, i) => (
            <StageSection key={i} id={`letter-${i}`} picture={i === about.letter.length - 1 ? undefined : l.stage} className="mt-7">
              <Reveal><p>{l.text}</p></Reveal>
            </StageSection>
          ))}
          <Reveal>
            <p className="mt-10 text-[1.375rem] italic">{about.signoff.name}</p>
            <p className="small text-muted">{about.signoff.role}</p>
          </Reveal>
        </div>
      </SplitPage>

      <SeamWork items={projects.filter((p) => p.featured)} />
      <Figures />
      <OrbitGraph />
      <JourneySheet />
      <ContactBand />
    </main>
  );
}
