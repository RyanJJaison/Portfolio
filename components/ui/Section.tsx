import type { ReactNode } from "react";

/** Editorial page header: big serif title, tracked-caps kicker, optional handwritten aside. */
export function PageShell({ title, kicker, aside, lead, children }: { title: string; kicker?: string; aside?: string; lead?: string; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-14">
      <header className="relative">
        <h1 className="font-display text-6xl leading-none sm:text-7xl">{title}</h1>
        {kicker && <p className="caps mt-4 text-muted">{kicker}</p>}
        {aside && <p className="font-hand mt-6 max-w-md -rotate-1 text-2xl text-muted md:absolute md:right-0 md:top-2 md:mt-0">{aside}</p>}
        {lead && <p className="mt-8 max-w-2xl text-lg leading-relaxed">{lead}</p>}
      </header>
      <div className="mt-12 border-t border-foreground/70 pt-2">{children}</div>
    </main>
  );
}
