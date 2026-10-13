import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { PageShell } from "@/components/ui/Section";
import { StatusTag } from "@/components/ui/StatusTag";
import { PageRankScene } from "@/components/projects/sentrix/PageRankScene";
import { SentrixPipeline } from "@/components/projects/sentrix/Pipeline";

// Interactive scenes per project; others get one in later phases.
const demos: Record<string, () => React.ReactNode> = {
  sentrix: () => (
    <>
      <div className="mt-12"><PageRankScene /></div>
      <SentrixPipeline />
    </>
  ),
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return { title: p?.title ?? "Project" };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  return (
    <PageShell title={p.title} lead={p.summary}>
      <div className="flex flex-wrap items-center gap-4">
        <StatusTag status={p.status} />
        <span className="font-mono text-xs text-muted">{p.stack.join(" · ")}</span>
        {p.repo && <a href={p.repo} {...ext} className="text-sm text-accent hover:underline">Repository →</a>}
        {p.live && <a href={p.live} {...ext} className="text-sm text-accent hover:underline">Live →</a>}
      </div>
      {demos[p.slug]?.()}
      <h2 className="mt-12 text-xl font-semibold">My role</h2>
      <p className="mt-3 max-w-2xl text-muted">{p.role}</p>
      <h2 className="mt-12 text-xl font-semibold">Facts</h2>
      <ul className="mt-3 max-w-2xl list-disc space-y-2 pl-5 text-muted">
        {p.facts.map((f) => <li key={f}>{f}</li>)}
      </ul>
    </PageShell>
  );
}
