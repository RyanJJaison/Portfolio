import type { Status } from "@/content/projects";

export function StatusTag({ status }: { status: Status }) {
  return (
    <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-accent">
      {status}
    </span>
  );
}
