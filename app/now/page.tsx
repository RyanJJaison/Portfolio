import type { Metadata } from "next";
import { PageShell } from "@/components/ui/Section";
import { nowEntries } from "@/content/now";

export const metadata: Metadata = { title: "Now" };

export default function NowPage() {
  return (
    <PageShell title="Now" kicker="Learning log" aside="what I'm working on, honestly labelled.">
      <ol>
        {nowEntries.map((e) => (
          <li key={e.title} className="grid gap-x-8 gap-y-1 border-b border-line py-7 md:grid-cols-[7rem_1fr]">
            <span className={`caps pt-2 ${e.when === "Now" ? "text-accent" : "text-muted"}`}>{e.when}</span>
            <div>
              <h2 className="font-display text-3xl leading-tight">{e.title}</h2>
              <p className="mt-2 max-w-2xl text-lg leading-relaxed text-muted">{e.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
