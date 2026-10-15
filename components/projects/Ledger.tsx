import Link from "next/link";
import type { Project } from "@/content/projects";
import { StatusTag } from "@/components/ui/StatusTag";

/** Projects as a ledger: number, project and one-line description, status, what it was built with. */
export function Ledger({ items }: { items: Project[] }) {
  return (
    <div>
      <div className="caps hidden grid-cols-[3rem_1fr_9rem_14rem] gap-6 border-b border-foreground/70 pb-3 text-muted md:grid">
        <span>No.</span>
        <span>Project</span>
        <span>Status</span>
        <span>Built with</span>
      </div>
      <ol>
        {items.map((p, i) => (
          <li key={p.slug} className="border-b border-line">
            <Link href={`/projects/${p.slug}`} className="group grid gap-x-6 gap-y-2 py-7 md:grid-cols-[3rem_1fr_9rem_14rem]">
              <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="font-display text-3xl leading-tight underline decoration-line decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-accent">
                  {p.title}
                </span>
                <span className="mt-2 block max-w-xl text-lg leading-relaxed text-muted">{p.tagline}</span>
              </span>
              <span className="md:pt-2"><StatusTag status={p.status} /></span>
              <span className="font-sans text-sm text-muted md:pt-2.5">{p.stack.join(", ")}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
