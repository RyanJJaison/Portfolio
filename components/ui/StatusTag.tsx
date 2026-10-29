import type { Status } from "@/content/projects";

export function StatusTag({ status }: { status: Status }) {
  const live = status === "Ongoing";
  return (
    <span className={`caps ${live ? "text-accent" : "text-muted"}`}>{status}</span>
  );
}
