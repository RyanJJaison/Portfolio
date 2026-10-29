import type { Metadata } from "next";
import { SplitPage, StageSection, type StageItem } from "@/components/split/SplitPage";
import { MessageForm } from "@/components/contact/MessageForm";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/content/profile";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  const stage: StageItem[] = [
    { id: "hero", picture: "ryan" },
    { id: "direct", picture: "telephone" },
    { id: "online", picture: "bangaloreNight" },
    { id: "post", picture: "letterBox" },
  ];
  const online = [
    { label: "GitHub", href: profile.links.github, note: "The code behind every project" },
    { label: "LinkedIn", href: profile.links.linkedin, note: "The professional version" },
    { label: "ORCID", href: profile.links.orcid, note: "My research identity" },
  ];
  return (
    <main>
      <SplitPage items={stage} aside={profile.location}>
        <section data-stage="hero" className="flex flex-col justify-center pb-16 pt-10 lg:min-h-[56svh] lg:py-16">
          <div className="rise">
            <h1 className="display">Say hello</h1>
            <p className="lead measure mt-10">I&apos;m open to internships and collaborations in AI and ML. Email, call, or write to me from this page.</p>
          </div>
        </section>

        <div className="pb-40">
          <StageSection id="direct" picture="telephone" className="mt-16">
            <Reveal>
              <h2 className="head">Reach me</h2>
              <p className="mt-8">Email</p>
              <a href={`mailto:${profile.links.email}`} className="lead link mt-1 inline-block [overflow-wrap:anywhere]">{profile.links.email}</a>
              <p className="mt-8">Phone</p>
              <a href={`tel:${profile.links.phone.replace(/\s/g, "")}`} className="lead link nums mt-1 inline-block">{profile.links.phone}</a>
              {profile.links.cv && (
                <div className="mt-10">
                  <a href={profile.links.cv} {...ext} className="btn">Download my résumé (PDF)</a>
                </div>
              )}
            </Reveal>
          </StageSection>

          <StageSection id="online" picture="bangaloreNight" className="mt-32">
            <Reveal>
              <h2 className="head">Find me online</h2>
              <ul className="mt-8 grid gap-6">
                {online.map((i) => (
                  <li key={i.label}>
                    <a href={i.href} {...ext} className="group block">
                      <span className="display !text-[2rem] transition-colors group-hover:text-accent">{i.label} ↗</span>
                      <span className="mt-1 block text-muted">{i.note}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </StageSection>

          <StageSection id="post" picture="letterBox" className="mt-32">
            <Reveal>
              <h2 className="head">Post to reach me</h2>
              <p className="measure mt-6">Write here and it lands in my Gmail inbox. I&apos;ll reply to the address you give.</p>
            </Reveal>
            <div className="mt-8"><MessageForm /></div>
          </StageSection>
        </div>
      </SplitPage>
    </main>
  );
}
