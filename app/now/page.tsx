import type { Metadata } from "next";
import { PageShell } from "@/components/ui/Section";
import { nowEntries } from "@/content/now";

export const metadata: Metadata = { title: "Now" };

export default function NowPage() {
  return (
    <PageShell title={<><em>Now</em></>} kicker="(N) Learning log" aside="What I'm working on, honestly labelled">
      <ol className="grid gap-3 pt-4">
        {nowEntries.map((e) => (
          <li key={e.title} className={`card grid grid-cols-12 gap-x-6 gap-y-2 p-6 ${e.when === "Now" ? "!bg-accent-soft" : ""}`}>
            <span className="col-span-12 md:col-span-2 md:pt-1">
              <span className={`caps pill pill-sm ${e.when === "Now" ? "bg-accent text-background" : "bg-background text-muted"}`}>
                {e.when === "Now" && <span className="live-dot !bg-background after:!bg-background" aria-hidden />}
                {e.when}
              </span>
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
