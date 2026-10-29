import Image from "next/image";
import Link from "next/link";
import { profile } from "@/content/profile";
import { pictures, type PictureId } from "@/content/media";

const STRIP: PictureId[] = ["letterBox", "vembanad", "esp32", "christ", "tripura", "telephone", "library", "kochiWater", "ledger", "paddy", "konigsberg", "neurons"];
const RATIOS = ["aspect-[3/4]", "aspect-square", "aspect-[3/2]"];

/** A deep green field: a drifting strip of pictures, then three ways to reach Ryan in one bar. */
export function ContactBand() {
  const tel = profile.links.phone.replace(/\s/g, "");
  const cell = "flex min-h-[60px] items-center justify-center px-4 text-center text-lg transition-colors md:min-h-24";
  return (
    <section aria-labelledby="reach-title" className="bg-field pb-24 pt-12 text-white md:min-h-[80svh]">
      <div className="strip-wrap overflow-hidden" aria-hidden>
        <div className="strip">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 gap-2 pr-2">
              {STRIP.map((id, i) => {
                const p = pictures[id];
                return (
                  <div key={`${k}-${id}`} className={`relative h-[110px] md:h-[150px] ${RATIOS[i % 3]}`}>
                    <Image src={p.src} alt="" fill sizes="240px" className="object-cover" />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="px-[var(--m)]">
        <h2 id="reach-title" className="head mt-16 md:mt-[72px]">Write to me</h2>
        <div className="mt-10 grid gap-2 md:grid-cols-3">
          <a href={`mailto:${profile.links.email}`} className={`${cell} bg-[#4d6a37] hover:bg-[#5b7a43]`}>Email me</a>
          <a href={`tel:${tel}`} className={`${cell} bg-[#4d6a37] hover:bg-[#5b7a43]`}>Call {profile.links.phone}</a>
          <Link href="/contact" className={`${cell} bg-paper text-foreground hover:bg-white`}>Send a message →</Link>
        </div>
        <div className="small mt-3 grid gap-2 md:grid-cols-3">
          <p>{profile.links.email}</p>
          <p className="max-md:hidden" />
          <p>Goes straight to my inbox</p>
        </div>
      </div>
    </section>
  );
}
