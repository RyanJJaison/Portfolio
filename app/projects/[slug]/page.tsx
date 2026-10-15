import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { PageRankScene } from "@/components/projects/sentrix/PageRankScene";
import { Illustration } from "@/components/projects/Illustration";
import { StatusTag } from "@/components/ui/StatusTag";

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

function Section({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-16 grid grid-cols-12 gap-x-6 gap-y-4 border-t border-foreground pt-4">
      <h2 className="caps col-span-12 md:col-span-3">
        <span className="text-accent-ink">{index}</span> {title}
      </h2>
      <div className="col-span-12 md:col-span-9">{children}</div>
    </section>
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
  const links = [
    p.repo && { href: p.repo, label: "GitHub repository" },
    p.model && { href: p.model, label: "Model on Hugging Face" },
    p.live && { href: p.live, label: "Open the live app" },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-10">
      <Link href="/projects" className="caps text-muted hl">← Index</Link>
      <header className="mt-8 grid grid-cols-12 gap-x-6 gap-y-8">
        <div className="col-span-12 md:col-span-8">
          <p className="caps flex flex-wrap gap-x-4 gap-y-1">
            <span className="text-accent-ink">({String(index + 1).padStart(2, "0")})</span>
            <StatusTag status={p.status} />
          </p>
          <h1 className="display mt-4 text-[clamp(3.5rem,11vw,9.5rem)]">{p.title}<span className="mark" aria-hidden /></h1>
          <p className="mt-6 max-w-2xl text-2xl leading-snug">{p.tagline}</p>
          {p.context && <p className="caps mt-4 max-w-2xl text-muted">{p.context}</p>}
          {links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {links.map((l, i) => (
                <a key={l.href} href={l.href} {...ext}
                  className={`caps border border-foreground px-4 py-2.5 transition-colors ${i === 0 ? "bg-foreground text-background hover:bg-accent hover:text-foreground" : "hover:bg-foreground hover:text-background"}`}>
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
        <figure className="col-span-12 self-end md:col-span-4">
          <Illustration slug={p.slug} className="border border-line p-6" />
          <figcaption className="caps mt-2 text-muted">Fig. — {p.title}</figcaption>
        </figure>
      </header>

      <Section index="01" title="What it is"><p className="max-w-3xl text-xl leading-relaxed">{p.what}</p></Section>
      <Section index="02" title="The mission"><p className="max-w-3xl text-xl leading-relaxed">{p.mission}</p></Section>
      <Section index="03" title="My role"><p className="display max-w-4xl text-3xl leading-tight sm:text-4xl">{p.role}</p></Section>

      {demo && <div className="mt-16">{demo()}</div>}

      <Section index="04" title="How it's built">
        <ol className="border-t border-line">
          {p.architecture.map((a) => (
            <li key={a.layer} className="grid grid-cols-12 gap-x-6 gap-y-1 border-b border-line py-4">
              <span className="col-span-12 text-xl font-bold tracking-tight md:col-span-3">{a.layer}</span>
              <span className="caps col-span-12 text-muted md:col-span-3 md:pt-1.5">{a.tech}</span>
              <span className="col-span-12 leading-relaxed md:col-span-6">{a.detail}</span>
            </li>
          ))}
        </ol>
      </Section>

      {p.results && (
        <Section index="05" title="Results">
          <ul className="max-w-3xl space-y-3 text-lg leading-relaxed">
            {p.results.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </Section>
      )}

      <Link href={`/projects/${next.slug}`} className="group mt-24 block bg-foreground px-6 py-10 text-background">
        <span className="caps text-background/60">Next project</span>
        <span className="display mt-3 block text-5xl hl sm:text-7xl">{next.title} →</span>
      </Link>
    </main>
  );
}
