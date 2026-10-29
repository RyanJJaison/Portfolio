import type { Metadata } from "next";
import { PageShell } from "@/components/ui/Section";
import { Ledger } from "@/components/projects/Ledger";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <PageShell title={<>Projects</>} kicker="All work" aside="Newest and most involved first">
      <Ledger items={projects} />
    </PageShell>
  );
}
