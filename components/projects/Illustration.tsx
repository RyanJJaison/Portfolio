import { DrawOnView } from "@/components/ui/DrawOnView";

// Small ink line drawings, one per project. Strokes draw themselves when scrolled into view.
const ink = { fill: "none", stroke: "var(--foreground)", strokeWidth: 1.3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const L = (d: string, extra: Record<string, unknown> = {}) => <path d={d} pathLength={1} className="draw-line" {...ink} {...extra} />;

const drawings: Record<string, React.ReactNode> = {
  sentrix: (
    <>
      {L("M30 100 L70 60 L120 80 L160 40 M70 60 L80 115 L120 80 M120 80 L170 105 M80 115 L130 125")}
      {[[30, 100], [70, 60], [120, 80], [160, 40], [80, 115], [170, 105], [130, 125]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 2 ? 7 : 4.5} fill={i === 2 ? "var(--risk)" : "var(--background)"} stroke="var(--foreground)" strokeWidth={1.2} />
      ))}
    </>
  ),
  lahja: (
    <>
      {L("M15 70 q8 -30 16 0 t16 0 t16 0 q6 -45 12 0 t12 0 q5 -20 10 0 t10 0")}
      {L("M120 70 h10 m-4 -5 l5 5 -5 5")}
      {L("M145 52 h40 M145 64 h32 M145 76 h44 M145 88 h24")}
    </>
  ),
  clarity: (
    <>
      {L("M100 40 C80 30 45 30 30 38 V112 C45 104 80 104 100 114 C120 104 155 104 170 112 V38 C155 30 120 30 100 40 Z")}
      {L("M100 40 V114 M45 55 h35 M45 68 h30 M45 81 h35 M120 55 h35 M120 68 h28")}
      {L("M150 18 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z")}
    </>
  ),
  "fall-detection": (
    <>
      {L("M45 35 h110 v75 h-110 Z")}
      {L("M80 55 h40 v35 h-40 Z M88 63 h24 v19 h-24 Z")}
      {L("M45 45 h-10 M45 60 h-10 M45 75 h-10 M45 90 h-10 M155 45 h10 M155 60 h10 M155 75 h10 M155 90 h10")}
      {L("M60 50 a6 6 0 1 0 0.1 0 M140 95 a7 7 0 1 0 0.1 0")}
      {L("M20 125 c20 -10 40 10 60 0 s40 -10 60 0 s30 5 45 0", { stroke: "var(--accent)", strokeWidth: 2 })}
    </>
  ),
  "task-manager": (
    <>
      {L("M40 30 h90 v95 h-90 Z")}
      {L("M52 50 l5 5 9 -10 M75 50 h40 M52 75 l5 5 9 -10 M75 75 h35 M52 100 h12 v-0 M75 100 h30")}
      {L("M160 90 a24 24 0 1 0 0.1 0 M160 75 v15 l10 6")}
    </>
  ),
  "password-manager": (
    <>
      {L("M60 70 a22 22 0 1 0 0.1 0 M82 70 h80 v14 M140 70 v10")}
      {L("M50 70 a6 6 0 1 0 0.1 0")}
    </>
  ),
  dsa: (
    <>
      {L("M100 30 L60 70 M100 30 L140 70 M60 70 L40 110 M60 70 L80 110 M140 70 L160 110")}
      {[[100, 30], [60, 70], [140, 70], [40, 110], [80, 110], [160, 110]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={7} fill="var(--background)" stroke="var(--foreground)" strokeWidth={1.2} />
      ))}
    </>
  ),
};

export function Illustration({ slug, className = "" }: { slug: string; className?: string }) {
  const d = drawings[slug];
  if (!d) return null;
  return (
    <DrawOnView className={className}>
      <svg viewBox="0 0 200 140" className="w-full" aria-hidden>{d}</svg>
    </DrawOnView>
  );
}
