import type { Status } from "@/content/projects";

export function StatusTag({ status }: { status: Status }) {
  const live = status === "Ongoing";
  return (
    <span className="caps inline-flex items-center gap-1.5 text-muted">
      <span className={`inline-block h-1.5 w-1.5 ${live ? "bg-accent" : "bg-foreground"}`} aria-hidden />
      {status}
    </span>
  );
}
