import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";
import { projectPictures } from "@/content/media";
import { SplitPage, StageSection, type StageItem } from "@/components/split/SplitPage";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  const stage: StageItem[] = [
    { id: "hero", picture: "punchCard" },
    ...projects.map((p) => ({ id: p.slug, picture: projectPictures[p.slug][0] })),
  ];
  return (
    <main>
      <SplitPage items={stage} aside={`${projects.length} projects`}>
        <section data-stage="hero" className="flex flex-col justify-center pb-16 pt-10 lg:min-h-[60svh] lg:py-16">
          <div className="rise">
            <h1 className="display">Projects</h1>
            <p className="lead measure mt-10">Everything I&apos;ve built, the most involved first. Each one says plainly what my part was and where it stands.</p>
          </div>
        </section>
        <ol className="max-w-[40rem] pb-40">
          {projects.map((p) => (
            <li key={p.slug} className="mt-24 first:mt-8">
              <StageSection id={p.slug} picture={projectPictures[p.slug][0]}>
                <Reveal>
                  <h2 className="head">
                    <Link href={`/projects/${p.slug}`} className="transition-colors hover:text-accent">{p.title}</Link>
                  </h2>
                  <p className="mt-4">{p.tagline}</p>
                  <p className="mt-3"><span className="font-semibold">{p.status}</span> · {p.stack.join(", ")}</p>
                  <Link href={`/projects/${p.slug}`} className="link mt-4 inline-flex min-h-11 items-center">Read about {p.title} →</Link>
                </Reveal>
              </StageSection>
            </li>
          ))}
        </ol>
      </SplitPage>
    </main>
  );
}
