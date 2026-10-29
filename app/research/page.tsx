import type { Metadata } from "next";
import { PageShell } from "@/components/ui/Section";
import { researchPreface, researchThreads } from "@/content/research";

export const metadata: Metadata = { title: "Research" };

export default function ResearchPage() {
  return (
    <PageShell title="Research" aside="Questions before they become projects">
      <section className="grid grid-cols-12 gap-x-6 gap-y-4 py-8">
        <h2 className="caps col-span-12 md:col-span-3">Preface</h2>
        <div className="col-span-12 space-y-5 text-xl leading-relaxed md:col-span-8">
          {researchPreface.map((para) => <p key={para.slice(0, 24)}>{para}</p>)}
        </div>
      </section>

      <ol className="grid gap-20 pt-10">
        {researchThreads.map((t) => (
          <li key={t.title} className="grid grid-cols-12 gap-x-6 gap-y-3">
            <div className="col-span-12 md:col-span-3">
              <p className="caps text-accent md:pt-3">{t.status}</p>
            </div>
            <div className="col-span-12 md:col-span-8">
              <h2 className="display text-4xl sm:text-5xl">{t.title}</h2>
              <p className="mt-5 max-w-2xl border-l-4 border-accent pl-4 serif !text-2xl text-xl leading-relaxed">{t.question}</p>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed">{t.summary}</p>
              <p className="caps mt-5 text-muted">{t.tags.join(", ")}</p>
            </div>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
