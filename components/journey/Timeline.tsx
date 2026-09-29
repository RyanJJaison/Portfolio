import type { JourneyEntry } from "@/content/journey";

export function Timeline({ entries }: { entries: JourneyEntry[] }) {
  return (
    <ol className="relative space-y-10 border-l border-line pl-8">
      {entries.map((e) => (
        <li key={e.title} className="relative">
          <span className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
          <p className="font-mono text-xs text-muted">{e.period}</p>
          <h3 className="mt-1 text-lg font-medium">{e.title}</h3>
          {e.place && <p className="text-sm text-muted">{e.place}</p>}
          <p className={`mt-2 text-sm ${e.placeholder ? "italic text-muted" : ""}`}>{e.body}</p>
        </li>
      ))}
    </ol>
  );
}
