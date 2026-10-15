import type { Metadata } from "next";
import { PageShell } from "@/components/ui/Section";
import { researchPreface, researchThreads } from "@/content/research";

export const metadata: Metadata = { title: "Research" };

export default function ResearchPage() {
  return (
    <PageShell title="Research" kicker="Notebook" aside="questions before they become projects.">
      <section className="grid gap-10 py-10 md:grid-cols-[1fr_1.6fr]">
        <h2 className="caps text-muted">Preface</h2>
        <div className="space-y-5 text-xl leading-relaxed">
          {researchPreface.map((para) => <p key={para.slice(0, 24)}>{para}</p>)}
        </div>
      </section>

      <ol className="border-t border-foreground/70">
        {researchThreads.map((t, i) => (
          <li key={t.title} className="grid gap-x-10 gap-y-3 border-b border-line py-10 md:grid-cols-[8rem_1fr]">
            <div className="caps text-muted">
              <p>Entry</p>
              <p className="font-display mt-1 text-3xl normal-case tracking-normal text-foreground">No. {String(i + 1).padStart(3, "0")}</p>
            </div>
            <div className="border-line md:border-l md:pl-10">
              <h2 className="font-display text-4xl leading-tight">{t.title}</h2>
              <p className="caps mt-2 text-muted">{t.status}</p>
              <p className="mt-5 max-w-2xl text-xl italic leading-relaxed">Q. {t.question}</p>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{t.summary}</p>
              <p className="caps mt-5 text-muted/80">{t.tags.join(" · ")}</p>
            </div>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
