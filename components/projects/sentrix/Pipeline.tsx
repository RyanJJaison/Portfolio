import { sentrixPipeline } from "@/content/sentrix";

export function SentrixPipeline() {
  return (
    <section className="mt-16">
      <h2 className="text-xl font-semibold">Pipeline</h2>
      <ol className="mt-6 grid gap-3 md:grid-cols-5">
        {sentrixPipeline.map((s, i) => (
          <li key={s.step} className="relative rounded-xl border border-line p-4">
            <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-1 font-medium">{s.step}</h3>
            <p className="mt-1 text-sm text-muted">{s.detail}</p>
            {i < sentrixPipeline.length - 1 && (
              <span aria-hidden className="absolute -right-2.5 top-1/2 hidden -translate-y-1/2 text-accent md:block">→</span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
