import type { Metadata } from "next";
import { PageShell } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Lab" };

const steps = ["NumPy", "PyTorch", "AWS ML Engineer Associate (MLA-C01) prep", "Predictive models from scratch"];

export default function LabPage() {
  return (
    <PageShell title="The Lab" lead="What I am working on now.">
      <ol className="max-w-xl space-y-3">
        {steps.map((s, i) => (
          <li key={s} className="flex gap-4 rounded-xl border border-line p-4">
            <span className="font-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
      <p className="mt-8 font-mono text-xs text-muted">An illustrative loss-curve animation arrives in a later phase.</p>
    </PageShell>
  );
}
