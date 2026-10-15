import { about } from "@/content/about";

/** Essay layout: sticky title on the left, text on the right. Placeholders until Ryan's own words arrive. */
export function WhoIAm() {
  return (
    <section id="who" className="mx-auto mt-28 max-w-6xl scroll-mt-20 px-6">
      <div className="grid gap-10 border-t border-foreground/70 pt-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <div className="md:sticky md:top-24 md:self-start">
          <h2 className="font-display text-6xl leading-none sm:text-7xl">{about.title}</h2>
          <p className="font-hand mt-4 -rotate-1 text-2xl text-muted">{about.aside}</p>
          <dl className="mt-10 space-y-4">
            {about.facts.map((f) => (
              <div key={f.label}>
                <dt className="caps text-muted">{f.label}</dt>
                <dd className="mt-1 text-lg">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="space-y-12">
          {about.sections.map((s) => (
            <article key={s.heading}>
              <h3 className="caps text-muted">{s.heading}</h3>
              {s.paragraphs ? (
                <div className="mt-4 space-y-5 text-xl leading-relaxed">
                  {s.paragraphs.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
                </div>
              ) : (
                <div className="mt-4 rounded-sm border border-dashed border-line px-6 py-8" data-placeholder>
                  <p className="font-hand text-2xl text-muted">Ryan&apos;s words go here.</p>
                  <p className="caps mt-2 text-muted/80">{s.prompt}</p>
                  <div aria-hidden className="mt-5 space-y-2.5">
                    {[92, 100, 84, 64].map((w) => (
                      <div key={w} className="h-2 rounded-full bg-line/60" style={{ width: `${w}%` }} />
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
