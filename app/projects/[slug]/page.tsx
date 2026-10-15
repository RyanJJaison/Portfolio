import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { PageRankScene } from "@/components/projects/sentrix/PageRankScene";
import { Illustration } from "@/components/projects/Illustration";

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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-16">
      <h2 className="caps text-muted">{title}</h2>
      <div className="mt-4">{children}</div>
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
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-14">
      <Link href="/projects" className="caps text-muted hover:text-foreground">← Projects</Link>
      <header className="mt-8 grid items-end gap-8 md:grid-cols-[1.6fr_1fr]">
        <div>
          <p className="caps text-muted">
            No. {String(index + 1).padStart(2, "0")} · {p.status.toLowerCase()}
          </p>
          <h1 className="font-display mt-3 text-6xl leading-none sm:text-8xl">{p.title}</h1>
          <p className="mt-5 max-w-xl text-2xl italic leading-snug text-muted">{p.tagline}</p>
          {p.context && <p className="font-hand mt-4 max-w-xl text-xl text-muted">{p.context}</p>}
          {links.length > 0 && (
            <div className="caps mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {links.map((l) => (
                <a key={l.href} href={l.href} {...ext} className="border-b border-foreground pb-0.5 hover:border-accent hover:text-accent">
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
        <Illustration slug={p.slug} className="mx-auto w-full max-w-xs" />
      </header>

      <div className="mt-14 grid gap-x-16 border-t border-foreground/70 md:grid-cols-2">
        <Section title="What it is"><p className="text-xl leading-relaxed">{p.what}</p></Section>
        <Section title="The mission"><p className="text-xl leading-relaxed">{p.mission}</p></Section>
      </div>

      <Section title="My role"><p className="font-hand max-w-3xl text-3xl leading-snug">{p.role}</p></Section>

      {demo && <div className="mt-16">{demo()}</div>}

      <Section title="How it's built">
        <ol className="border-t border-foreground/70">
          {p.architecture.map((a) => (
            <li key={a.layer} className="grid gap-x-8 gap-y-1 border-b border-line py-5 md:grid-cols-[12rem_14rem_1fr]">
              <span className="font-display text-2xl leading-tight">{a.layer}</span>
              <span className="font-sans text-sm text-muted md:pt-1.5">{a.tech}</span>
              <span className="text-lg leading-relaxed">{a.detail}</span>
            </li>
          ))}
        </ol>
      </Section>

      {p.results && (
        <Section title="Results">
          <ul className="max-w-3xl space-y-3 text-lg leading-relaxed">
            {p.results.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </Section>
      )}

      <Link href={`/projects/${next.slug}`} className="group mt-24 block border-t border-foreground/70 pt-8">
        <span className="caps text-muted">Next project</span>
        <span className="font-display mt-2 block text-5xl group-hover:text-accent">{next.title} →</span>
      </Link>
    </main>
  );
}
