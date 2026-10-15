import type { JourneyEntry } from "@/content/journey";

export function Timeline({ entries }: { entries: JourneyEntry[] }) {
  return (
    <ol className="border-t border-foreground/70">
      {entries.map((e) => (
        <li key={e.title} className="grid gap-x-8 gap-y-1 border-b border-line py-6 sm:grid-cols-[10rem_1fr]">
          <p className="caps pt-2 text-muted">{e.period}</p>
          <div>
            <h3 className="font-display text-3xl leading-tight">{e.title}</h3>
            {e.place && <p className="font-hand text-xl text-muted">{e.place}</p>}
            <p className={`mt-2 text-lg leading-relaxed ${e.placeholder ? "italic text-muted" : ""}`}>{e.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
