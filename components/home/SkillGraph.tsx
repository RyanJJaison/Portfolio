"use client";

import { memo, useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { skillGroups } from "@/content/skills";
import { projects } from "@/content/projects";
import { credentials } from "@/content/experience";
import { PinnedScene } from "@/components/scroll/PinnedScene";

type Kind = "hub" | "skill" | "project" | "cert";
type GNode = {
  id: string;
  label: string;
  kind: Kind;
  order: number;
  href?: string;
  x: number;
  y: number;
  anchor?: "start" | "end"; // skill label side
  inX?: number; // where hub edges attach (skills)
  outX?: number; // where project edges attach (skills)
};
type GEdge = { a: string; b: string; kind: "hub" | "use" };

const AWS_GROUP = "Cloud (AWS)";
const ROW = 26; // vertical spacing between skills
const GROUP_GAP = 18;
const SKILL_FONT = 14;
const labelWidth = (s: string, size: number) => s.length * size * 0.58;
const TALL_SKILL_FONT = 17;

/** Split a long label over two lines at the space nearest its middle. */
function wrap(label: string, max: number) {
  if (label.length <= max) return [label];
  const mid = label.length / 2;
  let cut = -1;
  for (let i = 0; i < label.length; i++) if (label[i] === " " && (cut < 0 || Math.abs(i - mid) < Math.abs(cut - mid))) cut = i;
  return cut < 0 ? [label] : [label.slice(0, cut), label.slice(cut + 1)];
}

function graphData() {
  const edges: GEdge[] = [];
  skillGroups.forEach((g) => g.skills.forEach((s) => edges.push({ a: `hub:${g.name}`, b: `skill:${s}`, kind: "hub" })));
  const skillSet = new Set(skillGroups.flatMap((g) => g.skills));
  const targets: { id: string; label: string; kind: Kind; href?: string; skills: string[] }[] = projects.filter((p) => p.skills.length && p.status !== "Learning project").map((p) => ({
    id: `project:${p.slug}`, label: p.title, kind: "project", href: `/projects/${p.slug}`, skills: p.skills.filter((s) => skillSet.has(s)),
  }));
  const cert = credentials.find((c) => c.status === "Certified");
  if (cert) targets.push({ id: "cert:aws", label: "AWS AI Practitioner", kind: "cert", skills: skillGroups.find((g) => g.name === AWS_GROUP)?.skills ?? [] });
  targets.forEach((t) => t.skills.forEach((s) => edges.push({ a: `skill:${s}`, b: t.id, kind: "use" })));
  return { edges, targets };
}

/** Spread nodes along y so neighbours keep at least `gap`, staying inside [lo, hi]. */
function spread(items: { y: number }[], gap: number, lo: number, hi: number) {
  items.sort((a, b) => a.y - b.y);
  for (let i = 1; i < items.length; i++) items[i].y = Math.max(items[i].y, items[i - 1].y + gap);
  const over = items.length ? items[items.length - 1].y - hi : 0;
  if (over > 0) items.forEach((it) => (it.y -= over));
  for (let i = items.length - 2; i >= 0; i--) items[i].y = Math.min(items[i].y, items[i + 1].y - gap);
  if (items.length && items[0].y < lo) {
    const d = lo - items[0].y;
    items.forEach((it) => (it.y += d));
  }
}

/**
 * Wide: hubs on the outer edges, skills inside them, projects in the centre column.
 * Tall: hubs on the left, skills next to them, projects on the right.
 */
function layout(mode: "wide" | "tall") {
  const { edges, targets } = graphData();
  const nodes: GNode[] = [];
  let order = 0;
  const groupHeight = (n: number) => n * ROW;

  if (mode === "wide") {
    const W = 1100;
    const sides = [skillGroups.filter((_, i) => i % 2 === 0), skillGroups.filter((_, i) => i % 2 === 1)];
    const colHeight = Math.max(...sides.map((s) => s.reduce((h, g) => h + groupHeight(g.skills.length), 0) + GROUP_GAP * (s.length - 1)));
    const H = colHeight + 80;
    sides.forEach((groups, side) => {
      const left = side === 0;
      const hubX = left ? 100 : W - 100;
      const skillX = left ? 380 : W - 380;
      let y = (H - colHeight) / 2;
      groups.forEach((g) => {
        const h = groupHeight(g.skills.length);
        nodes.push({ id: `hub:${g.name}`, label: g.name, kind: "hub", order: order++, x: hubX, y: y + h / 2 - ROW / 2 });
        g.skills.forEach((s, i) => {
          const w = labelWidth(s, SKILL_FONT);
          nodes.push({
            id: `skill:${s}`, label: s, kind: "skill", order: order++, x: skillX, y: y + i * ROW,
            anchor: left ? "end" : "start",
            inX: left ? skillX - 12 - w - 6 : skillX + 12 + w + 6,
            outX: skillX,
          });
        });
        y += h + GROUP_GAP;
      });
    });
    placeTargets(nodes, targets, W / 2, 70, H, order);
    return { nodes, edges, w: W, h: H };
  }

  const W = 600;
  const total = skillGroups.reduce((h, g) => h + groupHeight(g.skills.length), 0) + GROUP_GAP * (skillGroups.length - 1);
  const H = total + 60;
  let y = 30;
  skillGroups.forEach((g) => {
    const h = groupHeight(g.skills.length);
    nodes.push({ id: `hub:${g.name}`, label: g.name, kind: "hub", order: order++, x: 88, y: y + h / 2 - ROW / 2 });
    g.skills.forEach((s, i) => {
      const w = labelWidth(s, TALL_SKILL_FONT);
      nodes.push({ id: `skill:${s}`, label: s, kind: "skill", order: order++, x: 185, y: y + i * ROW, anchor: "start", inX: 185, outX: 185 + 12 + w + 6 });
    });
    y += h + GROUP_GAP;
  });
  placeTargets(nodes, targets, 515, 95, H, order);
  return { nodes, edges, w: W, h: H };
}

function placeTargets(nodes: GNode[], targets: ReturnType<typeof graphData>["targets"], x: number, gap: number, H: number, order: number) {
  const ys = new Map(nodes.map((n) => [n.id, n.y]));
  const placed = targets.map((t) => {
    const linked = t.skills.map((s) => ys.get(`skill:${s}`) ?? H / 2);
    return { t, y: linked.reduce((a, b) => a + b, 0) / Math.max(1, linked.length) };
  });
  spread(placed, gap, 40, H - 50);
  placed.forEach(({ t, y }) => nodes.push({ id: t.id, label: t.label, kind: t.kind, href: t.href, order: order++, x, y }));
}

const WIDE = layout("wide");
const TALL = layout("tall");

const NARROW = "(max-width: 767px)";
const subscribeNarrow = (cb: () => void) => {
  const m = window.matchMedia(NARROW);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

const clamp = (v: number) => Math.min(1, Math.max(0, v));
/** Quantize animation values so memoized nodes and edges only re-render when they visibly change. */
const q = (v: number) => Math.round(v * 40) / 40;

type EdgeProps = { a: GNode; b: GNode; kind: GEdge["kind"]; draw: number; on: boolean; anyLit: boolean; pulse: number };

const EdgeView = memo(function EdgeView({ a, b, kind, draw, on, anyLit, pulse }: EdgeProps) {
  // Hub edges end at the far side of the skill label; project edges start at the skill dot (or label end).
  const x1 = kind === "hub" ? a.x : a.outX ?? a.x;
  const x2 = kind === "hub" ? b.inX ?? b.x : b.x;
  const mx = (x1 + x2) / 2;
  return (
    <path
      d={`M${x1},${a.y} C${mx},${a.y} ${mx},${b.y} ${x2},${b.y}`}
      fill="none"
      pathLength={1}
      strokeDasharray="1"
      strokeDashoffset={1 - draw}
      stroke={on || (kind === "use" && !anyLit) ? "var(--accent)" : "var(--muted)"}
      strokeOpacity={anyLit ? (on ? 0.9 : 0.05) : kind === "hub" ? 0.3 : 0.15 + 0.3 * pulse}
      strokeWidth={on ? 2 : 1.2}
    />
  );
});

type NodeProps = {
  n: GNode;
  r: number;
  dim: boolean;
  on: boolean;
  isFocus: boolean;
  narrow: boolean;
  pulse: number;
  setFocus: (id: string | null) => void;
  go: (href: string) => void;
};

const NodeView = memo(function NodeView({ n, r, dim, on, isFocus, narrow, pulse, setFocus, go }: NodeProps) {
  const ready = r >= 1;
  const open = () => n.href && go(n.href);
  const handlers = ready
    ? {
        tabIndex: 0,
        onPointerEnter: () => setFocus(n.id),
        onPointerLeave: () => setFocus(null),
        onFocus: () => setFocus(n.id),
        onBlur: () => setFocus(null),
        onClick: () => (n.href && (!narrow || isFocus) ? open() : setFocus(n.id)),
        onKeyDown: (ev: React.KeyboardEvent) => ev.key === "Enter" && open(),
      }
    : {};
  const common = {
    opacity: (dim ? 0.15 : 1) * r,
    className: ready ? "cursor-pointer outline-none" : undefined,
    role: n.href ? "link" : undefined,
    "aria-label": n.href ? `${n.label} project` : n.label,
    ...handlers,
  };

  if (n.kind === "hub") {
    const hubFont = narrow ? 16 : 15;
    const w = labelWidth(n.label, hubFont) + 26;
    return (
      <g transform={`translate(${n.x},${n.y})`} {...common}>
        <rect x={-w / 2} y={-15} width={w} height={30} rx={15} fill="var(--background)" stroke="var(--accent)" strokeWidth={1.5} />
        <text y={5} textAnchor="middle" fontSize={hubFont} className="fill-accent font-mono">{n.label}</text>
      </g>
    );
  }
  if (n.kind === "skill") {
    return (
      <g transform={`translate(${n.x},${n.y})`} {...common}>
        <circle r={on ? 5 : 4} fill={on ? "var(--accent)" : "var(--foreground)"} fillOpacity={0.85} />
        <text x={n.anchor === "end" ? -12 : 12} y={5} textAnchor={n.anchor} fontSize={narrow ? TALL_SKILL_FONT : SKILL_FONT} className={on ? "fill-foreground" : "fill-muted"}>
          {n.label}
        </text>
      </g>
    );
  }
  return (
    <g transform={`translate(${n.x},${n.y}) scale(${0.6 + 0.4 * r})`} {...common}>
      <circle r={30} fill="url(#sg-halo)" opacity={0.35 + 0.45 * pulse} />
      <rect x={-10} y={-10} width={20} height={20} rx={3} transform="rotate(45)" fill="var(--background)" stroke="var(--accent)" strokeWidth={2.5} />
      <text y={34} textAnchor="middle" fontSize={narrow ? 18 : 16} className="fill-foreground font-medium" style={{ paintOrder: "stroke", stroke: "var(--background)", strokeWidth: 5 }}>
        {(narrow ? wrap(n.label, 12) : [n.label]).map((line, i) => (
          <tspan key={line} x={0} dy={i ? 20 : 0}>{line}</tspan>
        ))}
      </text>
    </g>
  );
});
// Reveal windows over scene progress.
const PHASE: Record<Kind, [number, number]> = { hub: [0, 0.18], skill: [0.15, 0.5], project: [0.5, 0.8], cert: [0.5, 0.8] };

function Graph({ p }: { p: number }) {
  const narrow = useSyncExternalStore(subscribeNarrow, () => window.matchMedia(NARROW).matches, () => false);
  const g = narrow ? TALL : WIDE;
  const router = useRouter();
  const [focus, setFocus] = useState<string | null>(null);

  const byId = useMemo(() => new Map(g.nodes.map((n) => [n.id, n])), [g]);
  const neighbors = useMemo(() => {
    const m = new Map<string, Set<string>>();
    const link = (a: string, b: string) => (m.get(a) ?? m.set(a, new Set()).get(a)!).add(b);
    g.edges.forEach((e) => { link(e.a, e.b); link(e.b, e.a); });
    return m;
  }, [g]);

  // Each node fades in during its kind's window, staggered by order within the kind.
  const reveal = useMemo(() => {
    const r = new Map<string, number>();
    (Object.keys(PHASE) as Kind[]).forEach((kind) => {
      const list = g.nodes.filter((n) => n.kind === kind);
      const [a, b] = PHASE[kind];
      list.forEach((n, i) => {
        const t0 = a + ((b - a) * 0.6 * i) / Math.max(1, list.length - 1);
        r.set(n.id, clamp((p - t0) / ((b - a) * 0.4)));
      });
    });
    return r;
  }, [g, p]);

  // Hovering a skill lights its group and projects; hovering a project lights its skills and their groups.
  const lit = useMemo(() => {
    if (!focus) return null;
    const s = new Set([focus]);
    neighbors.get(focus)?.forEach((n) => {
      s.add(n);
      if (byId.get(focus)?.kind !== "skill" && byId.get(n)?.kind === "skill") neighbors.get(n)?.forEach((h) => byId.get(h)?.kind === "hub" && s.add(h));
    });
    return s;
  }, [focus, neighbors, byId]);

  const focused = focus ? byId.get(focus) : null;
  const qPulse = q(clamp((p - 0.82) / 0.15));

  return (
    <div className="mx-auto flex h-full max-w-6xl flex-col pt-20 pb-16">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">Skill graph</h2>
        <p className="font-mono text-xs text-muted">
          {focused ? `${focused.label} · ${neighbors.get(focused.id)?.size ?? 0} links` : narrow ? "tap a node" : "hover a node · click a project"}
        </p>
      </div>
      <svg viewBox={`0 0 ${g.w} ${g.h}`} preserveAspectRatio="xMidYMid meet" className="mt-4 min-h-0 w-full flex-1" role="img" aria-label="Graph linking skill groups, skills, projects and certification">
        <defs>
          {/* Gradient halo instead of a blur filter: filters re-rasterize on every scroll frame. */}
          <radialGradient id="sg-halo">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        {g.edges.map((e) => {
          const draw = q(Math.min(reveal.get(e.a)!, reveal.get(e.b)!));
          if (draw <= 0) return null;
          return (
            <EdgeView
              key={`${e.a}-${e.b}`}
              a={byId.get(e.a)!}
              b={byId.get(e.b)!}
              kind={e.kind}
              draw={draw}
              on={lit ? lit.has(e.a) && lit.has(e.b) : false}
              anyLit={!!lit}
              pulse={e.kind === "use" ? qPulse : 0}
            />
          );
        })}
        {g.nodes.map((n) => {
          const r = q(reveal.get(n.id)!);
          if (r <= 0) return null;
          return (
            <NodeView
              key={n.id}
              n={n}
              r={r}
              dim={!!lit && !lit.has(n.id)}
              on={!!lit?.has(n.id)}
              isFocus={focus === n.id}
              narrow={narrow}
              pulse={n.kind === "project" || n.kind === "cert" ? qPulse : 0}
              setFocus={setFocus}
              go={router.push}
            />
          );
        })}
      </svg>
      <div className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] text-muted">
        <span><span className="text-accent">▭</span> skill group</span>
        <span>● skill</span>
        <span><span className="text-accent">◆</span> project / certification</span>
      </div>
    </div>
  );
}

export function SkillGraph() {
  return (
    <PinnedScene label="Skill graph" length={2.2}>
      {(p) => <Graph p={p} />}
    </PinnedScene>
  );
}
