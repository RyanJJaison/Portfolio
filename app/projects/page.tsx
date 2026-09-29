import type { Metadata } from "next";
import { PageShell } from "@/components/ui/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <PageShell title="Projects" lead="Each project carries a status tag. Details and demos live on its page.">
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p) => <ProjectCard key={p.slug} p={p} />)}
      </div>
    </PageShell>
  );
}
