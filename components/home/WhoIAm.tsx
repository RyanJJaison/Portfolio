import { about } from "@/content/about";
import { SectionHead } from "@/components/ui/Section";

/** Facts table on the left, essay on the right. Placeholders until Ryan's own words arrive. */
export function WhoIAm() {
  return (
    <section id="who" className="mx-auto mt-24 max-w-7xl scroll-mt-16 px-6">
      <SectionHead index="01" title={about.title} note={about.aside} />
      <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-12">
        <dl className="col-span-12 self-start border-t border-foreground md:sticky md:top-20 md:col-span-4">
          {about.facts.map((f) => (
            <div key={f.label} className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-line py-3">
              <dt className="caps pt-0.5 text-muted">{f.label}</dt>
              <dd className="font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className="col-span-12 space-y-12 md:col-span-7 md:col-start-6">
          {about.sections.map((s, i) => (
            <article key={s.heading}>
              <h3 className="caps flex gap-3"><span className="text-accent-ink">1.{i + 1}</span>{s.heading}</h3>
              {s.paragraphs ? (
                <div className="mt-4 space-y-5 text-xl leading-relaxed">
                  {s.paragraphs.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
                </div>
              ) : (
                <div className="mt-4 border border-dashed border-muted/60 p-6" data-placeholder>
                  <p className="text-xl font-medium">Ryan&apos;s words go here.</p>
                  <p className="caps mt-1 text-muted">Prompt: {s.prompt}</p>
                  <div aria-hidden className="mt-5 space-y-2.5">
                    {[92, 100, 84, 64].map((w) => (
                      <div key={w} className="h-1.5 bg-line" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
