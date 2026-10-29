import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { pictures, projectPictures } from "@/content/media";
import { PageRankScene } from "@/components/projects/sentrix/PageRankScene";
import { SplitPage, StageSection, type StageItem } from "@/components/split/SplitPage";
import { Reveal } from "@/components/ui/Reveal";

// Interactive scenes for projects that have one.
const demos: Record<string, () => React.ReactNode> = {
  sentrix: () => <PageRankScene />,
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return { title: p?.title ?? "Project", description: p?.tagline };
}

function Part({ id, title, children, picture }: { id: string; title: string; children: React.ReactNode; picture?: Parameters<typeof StageSection>[0]["picture"] }) {
  return (
    <StageSection id={id} picture={picture} className="mt-28">
      <Reveal>
        <h2 className="head">{title}</h2>
        <div className="mt-6">{children}</div>
      </Reveal>
    </StageSection>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  const p = projects[index];
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  const demo = demos[p.slug];
  const next = projects[(index + 1) % projects.length];
  const [a, b] = projectPictures[p.slug];
  const links = [
    p.repo && { href: p.repo, label: "Code on GitHub" },
    p.model && { href: p.model, label: "Model on Hugging Face" },
    p.live && { href: p.live, label: "Open the live app" },
  ].filter(Boolean) as { href: string; label: string }[];

  const stage: StageItem[] = [
    { id: "hero", picture: a },
    { id: "what", picture: a, detail: { position: pictures[a].position ?? "50% 50%", zoom: 1.8 }, caption: `${pictures[a].caption}, in detail` },
    { id: "why", picture: b },
    { id: "role", picture: b, detail: { position: pictures[b].position ?? "50% 50%", zoom: 1.7 }, caption: `${pictures[b].caption}, in detail` },
  ];

  return (
    <main>
      <SplitPage items={stage} aside={p.status}>
        <section data-stage="hero" className="flex flex-col justify-center pb-16 pt-10 lg:min-h-[78svh] lg:py-16">
          <div className="rise">
            <h1 className="display">{p.title}</h1>
            <p className="lead measure mt-10">{p.tagline}</p>
            <p className="measure mt-6 text-muted">{p.status}{p.context ? `. ${p.context}` : ""}</p>
            {links.length > 0 && (
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                {links.map((l, i) => (
                  <a key={l.href} href={l.href} {...ext} className={i === 0 ? "btn" : "link"}>{l.label} ↗</a>
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="max-w-[40rem] pb-40">
          <Part id="what" title="What it is"><p>{p.what}</p></Part>
          <Part id="why" title="Why it exists" picture={b}><p>{p.mission}</p></Part>
          <Part id="role" title="My part"><p className="lead">{p.role}</p></Part>
          <Part id="built" title="How it's built">
            <dl className="grid gap-7">
              {p.architecture.map((x) => (
                <div key={x.layer}>
                  <dt className="font-semibold">{x.layer} <span className="small font-normal text-muted">· {x.tech}</span></dt>
                  <dd className="mt-1">{x.detail}</dd>
                </div>
              ))}
            </dl>
          </Part>
          {p.results && (
            <Part id="results" title="Results">
              <ul className="grid gap-4">{p.results.map((r) => <li key={r}>{r}</li>)}</ul>
            </Part>
          )}
        </div>
      </SplitPage>

      {demo && demo()}

      <Link href={`/projects/${next.slug}`} className="group block bg-field px-[var(--m)] py-24 text-white md:py-32">
        <span className="display flex flex-wrap items-baseline gap-x-6">
          Next: {next.title}
          <span className="transition-transform duration-300 group-hover:translate-x-3" aria-hidden>→</span>
        </span>
      </Link>
    </main>
  );
}
