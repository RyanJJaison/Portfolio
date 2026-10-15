import { fields } from "@/content/skills";

/** A slow strip of field names between sections. Purely decorative; pauses on hover. */
export function Marquee() {
  const words = fields.map((f) => f.name);
  const run = [...words, ...words];
  return (
    <div className="marquee-wrap mt-24 overflow-hidden border-y border-foreground py-4" aria-hidden>
      <div className="marquee">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {run.map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center whitespace-nowrap">
                <span className={`px-6 text-4xl sm:text-6xl ${i % 2 ? "serif text-accent" : "display"}`}>{w}</span>
                <span className="live-dot !h-2.5 !w-2.5 after:hidden" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
