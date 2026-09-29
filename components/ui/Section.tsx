import type { ReactNode } from "react";

export function PageShell({ title, lead, children }: { title: string; lead?: string; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
      {lead && <p className="mt-4 max-w-2xl text-muted">{lead}</p>}
      <div className="mt-12">{children}</div>
    </main>
  );
}
