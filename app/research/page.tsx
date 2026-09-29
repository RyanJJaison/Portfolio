import type { Metadata } from "next";
import { PageShell } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Research" };

export default function ResearchPage() {
  return (
    <PageShell title="Research" lead="Proposals and plans. Nothing here is a published result.">
      <section>
        <h2 className="text-xl font-semibold">Water hardness: electrochemical precipitation</h2>
        <p className="mt-2 font-mono text-xs text-accent">Research proposal</p>
        <p className="mt-3 max-w-2xl text-muted">TODO: add summary from Ryan&apos;s proposal. An ion-migration simulation, labelled as a simulation, will go here.</p>
      </section>
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Next: predictive analytics</h2>
        <p className="mt-2 font-mono text-xs text-accent">Planned</p>
        <p className="mt-3 max-w-2xl text-muted">Building predictive models from scratch and researching them. This is a plan, not a result.</p>
      </section>
    </PageShell>
  );
}
