import Image from "next/image";
import Link from "next/link";
import { pictures } from "@/content/media";
import { Reveal } from "@/components/ui/Reveal";

// Figures from the SentriX README (3-seed ablation) and the Lahja model card.
const FIGURES = [
  {
    value: "0.53 → 0.69",
    caption: "Illicit-class F1 on held-out Bitcoin transactions once SentriX adds PageRank features.",
    href: "/projects/sentrix",
    tone: "bg-field text-white",
  },
  {
    value: "1.37 → 0.72",
    caption: "Character error rate on Kokborok speech, before and after my LoRA adapter for Whisper.",
    href: "/projects/lahja",
    tone: "bg-accent-soft text-foreground",
  },
];

/** A photograph and two figure tiles, touching, across the full width. */
export function Figures() {
  const pic = pictures.bangaloreNight;
  return (
    <section aria-labelledby="figures-title" className="px-[var(--m)] py-32 md:py-40">
      <Reveal>
        <h2 id="figures-title" className="head mb-10">Two results I can show</h2>
      </Reveal>
      <div className="grid lg:grid-cols-3">
        <figure className="relative aspect-[4/3] lg:col-span-2 lg:aspect-auto lg:min-h-[44vw]">
          <Image src={pic.src} alt={pic.alt} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
        </figure>
        <div className="grid md:grid-cols-2 lg:grid-cols-1">
          {FIGURES.map((f) => (
            <Link key={f.value} href={f.href} className={`group flex flex-col p-6 transition-[filter] hover:brightness-110 md:p-7 ${f.tone}`}>
              <span className="display nums whitespace-nowrap !text-[clamp(2.75rem,4.4vw,4.75rem)]">{f.value}</span>
              <span className="mt-3 max-w-[30ch]">{f.caption}</span>
              <span className="mt-auto pt-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
          ))}
        </div>
      </div>
      <p className="small mt-3 text-muted">Photograph: {pic.caption}.</p>
    </section>
  );
}
