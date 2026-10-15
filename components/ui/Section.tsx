import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/** Section head: hard rule, mono index on the left, heavy title with an optional italic serif word. */
export function SectionHead({ index, title, note, children }: { index: string; title: ReactNode; note?: string; children?: ReactNode }) {
  return (
    <Reveal className="grid grid-cols-12 gap-x-6 gap-y-3 border-t border-foreground pt-4">
      <p className="caps col-span-12 text-accent md:col-span-2">({index})</p>
      <h2 className="display col-span-12 text-5xl sm:text-7xl md:col-span-7">{title}</h2>
      <div className="caps col-span-12 self-end text-muted md:col-span-3 md:text-right">
        {note}
        {children}
      </div>
    </Reveal>
  );
}

/** Page header for inner pages: huge title on a 12-column grid. */
export function PageShell({ title, kicker, aside, lead, children }: { title: ReactNode; kicker?: string; aside?: string; lead?: string; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-10">
      <Reveal as="header" className="grid grid-cols-12 gap-x-6 gap-y-4">
        {kicker && <p className="caps col-span-12 text-accent">{kicker}</p>}
        <h1 className="display col-span-12 text-[clamp(3.5rem,11vw,10rem)]">{title}<span className="mark" aria-hidden /></h1>
        {lead && <p className="col-span-12 max-w-2xl text-xl leading-relaxed md:col-span-7">{lead}</p>}
        {aside && <p className="caps col-span-12 text-muted md:col-span-4 md:col-start-9 md:self-end md:text-right">{aside}</p>}
      </Reveal>
      <div className="mt-12 border-t border-foreground">{children}</div>
    </main>
  );
}
