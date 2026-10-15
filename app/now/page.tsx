import type { Metadata } from "next";
import { PageShell } from "@/components/ui/Section";
import { nowEntries } from "@/content/now";

export const metadata: Metadata = { title: "Now" };

export default function NowPage() {
  return (
    <PageShell title="Now" kicker="(N) Learning log" aside="What I'm working on, honestly labelled">
      <ol>
        {nowEntries.map((e) => (
          <li key={e.title} className="grid grid-cols-12 gap-x-6 gap-y-1 border-b border-line py-7">
            <span className="caps col-span-12 flex items-center gap-2 pt-2 md:col-span-2">
              <span className={`inline-block h-1.5 w-1.5 ${e.when === "Now" ? "bg-accent" : e.when === "Done" ? "bg-foreground" : "border border-foreground"}`} aria-hidden />
              {e.when}
            </span>
            <div className="col-span-12 md:col-span-9">
              <h2 className="display text-3xl sm:text-4xl">{e.title}</h2>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{e.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
