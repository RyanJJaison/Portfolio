import type { Metadata } from "next";
import { PageShell } from "@/components/ui/Section";
import { Timeline } from "@/components/journey/Timeline";
import { journey } from "@/content/journey";

export const metadata: Metadata = { title: "Journey" };

export default function JourneyPage() {
  return (
    <PageShell title="Journey" lead="Who I am and how I got here: education, work and milestones.">
      <Timeline entries={journey} />
    </PageShell>
  );
}
