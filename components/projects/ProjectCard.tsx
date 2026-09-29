import Link from "next/link";
import type { Project } from "@/content/projects";
import { StatusTag } from "@/components/ui/StatusTag";

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Link href={`/projects/${p.slug}`} className="group block rounded-xl border border-line p-6 transition hover:border-accent">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-medium group-hover:text-accent">{p.title}</h3>
        <StatusTag status={p.status} />
      </div>
      <p className="mt-3 text-sm text-muted">{p.summary}</p>
      <p className="mt-4 font-mono text-xs text-muted">{p.stack.join(" · ")}</p>
    </Link>
  );
}
