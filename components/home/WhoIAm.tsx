import { about } from "@/content/about";
import { SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const SPAN = ["md:col-span-8", "md:col-span-4", "md:col-span-4"];

/** Bento grid: verified facts on a dark tile, Ryan's own words on the others. Placeholders until the words arrive. */
export function WhoIAm() {
  return (
    <section id="who" className="mx-auto mt-24 max-w-7xl scroll-mt-16 px-6">
      <SectionHead index="01" title={<>Who <em>I am</em></>} note={about.aside} />
      <Reveal className="mt-10 grid grid-cols-12 gap-4">
        <dl className="card col-span-12 !bg-foreground p-6 text-background md:col-span-4 md:row-span-2">
          <p className="serif text-3xl text-accent-soft">At a glance</p>
          {about.facts.map((f) => (
            <div key={f.label} className="mt-5 border-t border-background/20 pt-3">
              <dt className="caps text-background/55">{f.label}</dt>
              <dd className="mt-1 text-lg font-medium leading-snug">{f.value}</dd>
            </div>
          ))}
        </dl>

        {about.sections.map((s, i) => (
          <article key={s.heading} className={`card lift col-span-12 p-6 ${SPAN[i]}`}>
            <h3 className="caps flex gap-3"><span className="text-accent">1.{i + 1}</span>{s.heading}</h3>
            {s.paragraphs ? (
              <div className="mt-4 space-y-4 text-lg leading-relaxed">
                {s.paragraphs.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-muted/50 p-5" data-placeholder>
                <p className="serif text-2xl">Ryan&apos;s words go here.</p>
                <p className="caps mt-1 text-muted">Prompt: {s.prompt}</p>
                <div aria-hidden className="mt-4 space-y-2">
                  {[92, 100, 70].map((w) => (
                    <div key={w} className="h-1.5 rounded-full bg-line" style={{ width: `${w}%` }} />
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </Reveal>
    </section>
  );
}
