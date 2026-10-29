import Link from "next/link";
import type { Project } from "@/content/projects";
import { StatusTag } from "@/components/ui/StatusTag";

/** Projects as an index table on a 12-column grid. */
export function Ledger({ items }: { items: Project[] }) {
  return (
    <div>
      <div className="caps hidden grid-cols-12 gap-6 pb-2 text-muted md:grid">
        <span className="col-span-7">Project</span>
        <span className="col-span-2">Status</span>
        <span className="col-span-3">Built with</span>
      </div>
      <ol>
        {items.map((p) => (
          <li key={p.slug}>
            <Link href={`/projects/${p.slug}`} className="group -mx-4 grid grid-cols-12 gap-x-6 gap-y-2 px-4 py-6 transition-colors hover:bg-surface">
              <span className="col-span-12 md:col-span-7">
                <span className="display flex items-baseline gap-3 text-4xl transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl">
                  <span className="hl">{p.title}</span>
                  <span className="text-2xl text-accent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>→</span>
                </span>
                <span className="mt-2 block max-w-xl text-lg leading-snug text-muted">{p.tagline}</span>
              </span>
              <span className="col-span-12 md:col-span-2 md:pt-3"><StatusTag status={p.status} /></span>
              <span className="col-span-12 text-sm text-muted md:col-span-3 md:pt-2.5">{p.stack.join(" / ")}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
