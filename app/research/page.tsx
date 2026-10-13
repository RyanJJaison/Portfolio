import type { Metadata } from "next";
import { researchPreface, researchThreads } from "@/content/research";

export const metadata: Metadata = { title: "Research" };

export default function ResearchPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Research</h1>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-mono text-xs uppercase tracking-widest text-accent">Preface</h2>
        <div className="mt-4 space-y-4 text-lg leading-relaxed">
          {researchPreface.map((para) => <p key={para.slice(0, 24)}>{para}</p>)}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-widest text-accent">Open threads</h2>
        <ol className="mt-6 space-y-4">
          {researchThreads.map((t, i) => (
            <li key={t.title} className="grid gap-4 rounded-xl border border-line p-6 md:grid-cols-[3rem_1fr]">
              <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-medium">{t.title}</h3>
                  <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-accent">{t.status}</span>
                </div>
                <p className="mt-3 italic text-foreground/90">{t.question}</p>
                <p className="mt-3 max-w-3xl text-muted">{t.summary}</p>
                <p className="mt-4 font-mono text-xs text-muted">{t.tags.join(" · ")}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
