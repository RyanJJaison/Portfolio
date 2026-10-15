import type { Status } from "@/content/projects";

export function StatusTag({ status }: { status: Status }) {
  return <span className="font-sans text-sm lowercase text-muted">{status}</span>;
}
