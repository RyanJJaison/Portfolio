"use client";

import { memo, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { skillGroups } from "@/content/skills";
import { projects } from "@/content/projects";
import { credentials } from "@/content/experience";
import { PinnedScene } from "@/components/scroll/PinnedScene";
import { NARROW, useMedia } from "@/components/ui/useMedia";

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


const clamp = (v: number) => Math.min(1, Math.max(0, v));
/** Quantize settled values so memoized nodes and edges only re-render when they visibly change. */
const q = (v: number) => Math.round(v * 40) / 40;

// Scene timeline over scroll progress (0..1).
const SKETCH = [0, 0.12] as const; // the network draws itself, quiet
const ROUND1 = 0.16; // groups -> skills
const ROUND2 = 0.52; // skills -> projects
const PULSE = 0.13; // one message's travel time
const STAGGER = 0.035;

/** Endpoints and control points of an edge's cubic curve. */
function curve(a: GNode, b: GNode, kind: GEdge["kind"]) {
  const x1 = kind === "hub" ? a.x : a.outX ?? a.x;
  const x2 = kind === "hub" ? b.inX ?? b.x : b.x;
  const mx = (x1 + x2) / 2;
  return { x1, y1: a.y, x2, y2: b.y, mx };
}

function pointOn(c: ReturnType<typeof curve>, t: number) {
  const u = 1 - t;
  const x = u * u * u * c.x1 + 3 * u * u * t * c.mx + 3 * u * t * t * c.mx + t * t * t * c.x2;
  const y = u * u * u * c.y1 + 3 * u * u * t * c.y1 + 3 * u * t * t * c.y2 + t * t * t * c.y2;
  return { x, y };
}

type EdgeProps = { a: GNode; b: GNode; kind: GEdge["kind"]; sketch: number; t: number; on: boolean; anyLit: boolean };

/** One edge: a faint ink sketch, a cobalt message travelling along it, then a settled trace. */
const EdgeView = memo(function EdgeView({ a, b, kind, sketch, t, on, anyLit }: EdgeProps) {
  const c = curve(a, b, kind);
  const d = `M${c.x1},${c.y1} C${c.mx},${c.y1} ${c.mx},${c.y2} ${c.x2},${c.y2}`;
  const passed = t >= 1;
  const traceOpacity = anyLit ? (on ? 0.95 : 0.05) : passed ? (kind === "use" ? 0.45 : 0.4) : 0.16;
  const head = t > 0 && t < 1 ? pointOn(c, t) : null;
  return (
    <g>
      <path d={d} fill="none" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - sketch}
        stroke={(passed && kind === "use") || on ? "var(--accent)" : "var(--foreground)"} strokeOpacity={traceOpacity} strokeWidth={on ? 1.8 : 1.1} />
      {/* second, slightly offset stroke gives a hand-inked look */}
      <path d={d} transform="translate(0.8 1.1)" fill="none" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - sketch}
        stroke="var(--foreground)" strokeOpacity={anyLit ? 0.02 : 0.07} strokeWidth={0.8} />
      {head && (
        <>
          <path d={d} fill="none" pathLength={1} strokeDasharray="0.18 1" strokeDashoffset={0.18 - t} stroke="var(--accent)" strokeWidth={2.2} strokeLinecap="round" />
          <circle cx={head.x} cy={head.y} r={4.5} fill="var(--accent)" />
        </>
      )}
    </g>
  );
});

type NodeProps = {
  n: GNode;
  sketch: number;
  active: number; // 0..1, how far the incoming message has arrived
  dim: boolean;
  on: boolean;
  isFocus: boolean;
  narrow: boolean;
  setFocus: (id: string | null) => void;
  go: (href: string) => void;
};

const NodeView = memo(function NodeView({ n, sketch, active, dim, on, isFocus, narrow, setFocus, go }: NodeProps) {
  const ready = sketch >= 1;
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
    opacity: (dim ? 0.18 : 1) * sketch,
    className: ready ? "cursor-pointer outline-none" : undefined,
    role: n.href ? "link" : undefined,
    "aria-label": n.href ? `${n.label} project` : n.label,
    ...handlers,
  };
  const halo = { paintOrder: "stroke" as const, stroke: "var(--background)", strokeWidth: 5 };

  if (n.kind === "hub") {
    return (
      <g transform={`translate(${n.x},${n.y})`} {...common}>
        <circle r={7} fill="var(--background)" stroke="var(--foreground)" strokeWidth={1.3} />
        <circle r={3} fill={on ? "var(--accent)" : "var(--foreground)"} />
        <text y={-16} textAnchor="middle" fontSize={narrow ? 22 : 21} className="font-display italic" fill="var(--foreground)" style={halo}>{n.label}</text>
      </g>
    );
  }
  if (n.kind === "skill") {
    const lit = on || (active > 0 && active < 1);
    return (
      <g transform={`translate(${n.x},${n.y})`} {...common}>
        <circle r={lit ? 4.5 : 3.5} fill={lit ? "var(--accent)" : "var(--foreground)"} fillOpacity={0.35 + 0.6 * active} />
        <text x={n.anchor === "end" ? -11 : 11} y={5} textAnchor={n.anchor} fontSize={narrow ? TALL_SKILL_FONT : SKILL_FONT + 1} className="font-serif"
          fill="var(--foreground)" fillOpacity={on ? 1 : 0.45 + 0.5 * active}>
          {n.label}
        </text>
      </g>
    );
  }
  const fill = active >= 1 || on;
  return (
    <g transform={`translate(${n.x},${n.y})`} {...common}>
      {fill && <circle r={28} fill="url(#sg-halo)" />}
      <rect x={-9} y={-9} width={18} height={18} rx={2} transform="rotate(45)" fill={fill ? "var(--accent)" : "var(--background)"}
        stroke={fill ? "var(--accent)" : "var(--foreground)"} strokeWidth={1.5} />
      <text y={32} textAnchor="middle" fontSize={narrow ? 21 : 20} className="font-display" fill="var(--foreground)" fillOpacity={0.5 + 0.5 * active} style={halo}>
        {(narrow ? wrap(n.label, 12) : [n.label]).map((line, i) => (
          <tspan key={line} x={0} dy={i ? 22 : 0}>{line}</tspan>
        ))}
      </text>
    </g>
  );
});

/** Per-edge message timing: round 1 fires group by group, round 2 project by project. */
function schedule(g: typeof WIDE) {
  const hubs = g.nodes.filter((n) => n.kind === "hub").map((n) => n.id);
  const targets = g.nodes.filter((n) => n.kind === "project" || n.kind === "cert").map((n) => n.id);
  return g.edges.map((e) => (e.kind === "hub" ? ROUND1 + hubs.indexOf(e.a) * STAGGER : ROUND2 + targets.indexOf(e.b) * STAGGER));
}
const SCHED = { wide: schedule(WIDE), tall: schedule(TALL) };

function caption(p: number) {
  if (p < ROUND1) return "the network, before any messages";
  if (p < ROUND2) return "round 1 · each field sends a message to its skills";
  if (p < 0.9) return "round 2 · skills pass their signal to the projects built on them";
  return "every project is the sum of its messages";
}

function Graph({ p }: { p: number }) {
  const narrow = useMedia(NARROW);
  const g = narrow ? TALL : WIDE;
  const starts = narrow ? SCHED.tall : SCHED.wide;
  const router = useRouter();
  const [focus, setFocus] = useState<string | null>(null);

  const byId = useMemo(() => new Map(g.nodes.map((n) => [n.id, n])), [g]);
  const neighbors = useMemo(() => {
    const m = new Map<string, Set<string>>();
    const link = (a: string, b: string) => (m.get(a) ?? m.set(a, new Set()).get(a)!).add(b);
    g.edges.forEach((e) => { link(e.a, e.b); link(e.b, e.a); });
    return m;
  }, [g]);

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

  const sketch = q(clamp((p - SKETCH[0]) / (SKETCH[1] - SKETCH[0])));
  // Message progress per edge, and how far each node's incoming messages have arrived.
  const travel = g.edges.map((_, i) => clamp((p - starts[i]) / PULSE));
  // A hub is active once round 1 starts; any other node is as active as its slowest incoming message.
  const arrived = new Map<string, number>();
  g.nodes.forEach((n) => n.kind === "hub" && arrived.set(n.id, clamp((p - ROUND1 + 0.02) / 0.02)));
  g.edges.forEach((e, i) => arrived.set(e.b, Math.min(arrived.get(e.b) ?? 1, travel[i])));

  const focused = focus ? byId.get(focus) : null;

  return (
    <div className="mx-auto flex h-full max-w-6xl flex-col px-6 pb-16 pt-20">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
        <div>
          <p className="caps text-muted">Message passing · scroll to propagate</p>
          <h2 className="font-display mt-2 text-5xl leading-none">The graph</h2>
        </div>
        <p className="font-hand max-w-sm -rotate-1 text-2xl text-muted">
          {focused ? `${focused.label}: ${neighbors.get(focused.id)?.size ?? 0} neighbours` : "every node learns from its neighbours."}
        </p>
      </div>
      <p className="caps mt-3 text-accent" aria-live="polite">{caption(p)}</p>
      <svg viewBox={`0 0 ${g.w} ${g.h}`} preserveAspectRatio="xMidYMid meet" className="mt-2 min-h-0 w-full flex-1" role="img" aria-label="Graph linking fields, skills, projects and certification; messages travel from fields to skills to projects as you scroll">
        <defs>
          <radialGradient id="sg-halo">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        {g.edges.map((e, i) => (
          <EdgeView
            key={`${e.a}-${e.b}`}
            a={byId.get(e.a)!}
            b={byId.get(e.b)!}
            kind={e.kind}
            sketch={sketch}
            t={travel[i]}
            on={lit ? lit.has(e.a) && lit.has(e.b) : false}
            anyLit={!!lit}
          />
        ))}
        {g.nodes.map((n) => (
          <NodeView
            key={n.id}
            n={n}
            sketch={sketch}
            active={q(arrived.get(n.id) ?? 0)}
            dim={!!lit && !lit.has(n.id)}
            on={!!lit?.has(n.id)}
            isFocus={focus === n.id}
            narrow={narrow}
            setFocus={setFocus}
            go={router.push}
          />
        ))}
      </svg>
      <div className="caps flex flex-wrap gap-x-6 gap-y-1 text-muted">
        <span>○ field</span>
        <span>· skill</span>
        <span><span className="text-accent">◆</span> project / certification · click to open</span>
      </div>
    </div>
  );
}

export function SkillGraph() {
  return (
    <div id="graph">
      <PinnedScene label="Skill graph" length={2.6}>
        {(p) => <Graph p={p} />}
      </PinnedScene>
    </div>
  );
}
