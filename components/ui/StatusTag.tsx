import type { Status } from "@/content/projects";

export function StatusTag({ status }: { status: Status }) {
  const live = status === "Ongoing";
  return (
    <span className={`caps pill pill-sm ${live ? "bg-accent-soft text-accent" : "bg-surface text-muted"}`}>
      {live ? <span className="live-dot" aria-hidden /> : <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted" aria-hidden />}
      {status}
    </span>
  );
}
