import type { ReactNode } from "react";

/** Swiss section head: hard rule, mono index on the left, heavy title. */
export function SectionHead({ index, title, note, children }: { index: string; title: string; note?: string; children?: ReactNode }) {
  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-3 border-t border-foreground pt-4">
      <p className="caps col-span-12 text-accent-ink md:col-span-2">({index})</p>
      <div className="col-span-12 md:col-span-7">
        <h2 className="display text-5xl sm:text-7xl">{title}</h2>
      </div>
      <div className="caps col-span-12 self-end text-muted md:col-span-3 md:text-right">
        {note}
        {children}
      </div>
    </div>
  );
}

/** Page header for inner pages: huge title on a 12-column grid. */
export function PageShell({ title, kicker, aside, lead, children }: { title: string; kicker?: string; aside?: string; lead?: string; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-10">
      <header className="grid grid-cols-12 gap-x-6 gap-y-4">
        {kicker && <p className="caps col-span-12 text-accent-ink">{kicker}</p>}
        <h1 className="display col-span-12 text-[clamp(3.5rem,11vw,10rem)]">{title}<span className="mark" aria-hidden /></h1>
        {lead && <p className="col-span-12 max-w-2xl text-xl leading-relaxed md:col-span-7">{lead}</p>}
        {aside && <p className="caps col-span-12 text-muted md:col-span-4 md:col-start-9 md:self-end md:text-right">{aside}</p>}
      </header>
      <div className="mt-12 border-t border-foreground">{children}</div>
    </main>
  );
}
