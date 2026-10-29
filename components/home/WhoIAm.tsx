import { about } from "@/content/about";
import { SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/** Verified facts in a narrow column that stays in view, beside Ryan's own words. */
export function WhoIAm() {
  return (
    <section id="who" className="mx-auto mt-24 max-w-7xl scroll-mt-16 px-6">
      <SectionHead title="Who I am" />
      <div className="mt-12 grid grid-cols-12 items-start gap-x-6 gap-y-12">
        <dl className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-6 md:sticky md:top-24 md:col-span-3 md:grid-cols-1">
          {about.facts.map((f) => (
            <div key={f.label}>
              <dt className="caps text-muted">{f.label}</dt>
              <dd className="mt-1 text-lg leading-snug">{f.value}</dd>
            </div>
          ))}
        </dl>

        <Reveal className="col-span-12 grid gap-16 md:col-span-8 md:col-start-5">
          {about.sections.map((s) => (
            <article key={s.heading}>
              <h3 className="display text-3xl sm:text-4xl">{s.heading}</h3>
              <div className="mt-5 max-w-[62ch] space-y-4 text-lg leading-relaxed">
                {(s.paragraphs ?? []).map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
