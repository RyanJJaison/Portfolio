import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { StatusTag } from "@/components/ui/StatusTag";
import { PageRankScene } from "@/components/projects/sentrix/PageRankScene";

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
    <section className="mt-14">
      <h2 className="font-mono text-xs uppercase tracking-widest text-accent">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  const demo = demos[p.slug];

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <StatusTag status={p.status} />
          {p.context && <span className="font-mono text-xs text-muted">{p.context}</span>}
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{p.title}</h1>
        <p className="mt-4 text-xl text-muted">{p.tagline}</p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          {p.repo && <a href={p.repo} {...ext} className="rounded-full border border-line px-4 py-1.5 hover:border-accent">GitHub repository →</a>}
          {p.live && <a href={p.live} {...ext} className="rounded-full bg-accent px-4 py-1.5 font-medium text-black">Open live app →</a>}
        </div>
      </header>

      <div className="grid gap-x-16 md:grid-cols-2">
        <Section title="What it is"><p className="leading-relaxed">{p.what}</p></Section>
        <Section title="The mission"><p className="leading-relaxed">{p.mission}</p></Section>
      </div>

      <Section title="My role"><p className="max-w-3xl leading-relaxed text-muted">{p.role}</p></Section>

      {demo && <div className="mt-14">{demo()}</div>}

      <Section title="How it's built">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {p.architecture.map((a) => (
            <li key={a.layer} className="rounded-xl border border-line p-5">
              <p className="font-medium">{a.layer}</p>
              <p className="mt-1 font-mono text-xs text-accent">{a.tech}</p>
              <p className="mt-3 text-sm text-muted">{a.detail}</p>
            </li>
          ))}
        </ul>
      </Section>

      {p.results && (
        <Section title="Results">
          <ul className="max-w-3xl space-y-2 text-muted">
            {p.results.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </Section>
      )}
    </main>
  );
}
