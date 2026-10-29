import type { JourneyEntry } from "@/content/journey";

export function Timeline({ entries }: { entries: JourneyEntry[] }) {
  return (
    <ol>
      {entries.map((e) => (
        <li key={e.title} className="grid grid-cols-12 gap-x-6 gap-y-1 py-5 first:pt-0">
          <p className="caps col-span-12 pt-1.5 text-muted sm:col-span-3">{e.period}</p>
          <div className="col-span-12 sm:col-span-9">
            <h3 className="display text-3xl">{e.title}</h3>
            {e.place && <p className="caps mt-2 text-muted">{e.place}</p>}
            <p className={`mt-2 text-lg leading-relaxed ${e.placeholder ? "italic text-muted" : ""}`}>{e.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
