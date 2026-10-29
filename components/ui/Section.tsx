import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/** Section head: heavy title with an optional italic serif word, and a note on the right. */
export function SectionHead({ title, note, children }: { index?: string; title: ReactNode; note?: string; children?: ReactNode }) {
  return (
    <Reveal className="grid grid-cols-12 gap-x-6 gap-y-3 pt-4">
      <h2 className="display col-span-12 text-5xl sm:text-7xl md:col-span-9"><span className="line-mask"><span>{title}</span></span></h2>
      <div className="caps col-span-12 self-end text-muted md:col-span-3 md:text-right">
        {note}
        {children}
      </div>
    </Reveal>
  );
}

/** Page header for inner pages: huge title on a 12-column grid. */
export function PageShell({ title, aside, lead, children }: { title: ReactNode; kicker?: string; aside?: string; lead?: string; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-10">
      <Reveal as="header" className="grid grid-cols-12 gap-x-6 gap-y-4">
        <h1 className="display col-span-12 text-[clamp(3.5rem,11vw,10rem)]"><span className="line-mask"><span>{title}</span></span></h1>
        {lead && <p className="col-span-12 max-w-2xl text-xl leading-relaxed md:col-span-7">{lead}</p>}
        {aside && <p className="caps col-span-12 text-muted md:col-span-4 md:col-start-9 md:self-end md:text-right">{aside}</p>}
      </Reveal>
      <div className="mt-12">{children}</div>
    </main>
  );
}
