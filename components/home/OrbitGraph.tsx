"use client";

import { memo, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fields, type FieldId } from "@/content/skills";
import { projects } from "@/content/projects";
import { credentials } from "@/content/experience";
import { PinnedScene } from "@/components/scroll/PinnedScene";
import { NARROW, useMedia } from "@/components/ui/useMedia";

// ---------- graph data: Ryan -> six fields -> the work built on them ----------

type Outer = { id: string; label: string; tagline: string; href?: string; fields: FieldId[] };

const cert = credentials.find((c) => c.status === "Certified");
const OUTER: Outer[] = [
  ...projects
    .filter((p) => p.fields.length && p.status !== "Learning project")
    .map((p) => ({ id: p.slug, label: p.title, tagline: p.tagline, href: `/projects/${p.slug}`, fields: p.fields })),
  ...(cert ? [{ id: "aws-cert", label: "AWS AI Practitioner", tagline: "Certified Aug 2026, valid to Aug 2029.", fields: ["cloud" as FieldId] }] : []),
];

// Fields in ring order, chosen so related fields sit next to each other.
const RING: FieldId[] = ["graph", "dl", "speech", "systems", "hardware", "cloud"];
const FIELD = new Map(fields.map((f) => [f.id, f]));

type Pt = { x: number; y: number; a: number };
type Layout = { w: number; h: number; c: { x: number; y: number }; inner: { rx: number; ry: number }; outer: { rx: number; ry: number }; field: Map<FieldId, Pt>; work: Map<string, Pt> };

function layout(w: number, h: number, inner: { rx: number; ry: number }, outer: { rx: number; ry: number }, cy: number): Layout {
  const c = { x: w / 2, y: cy };
  const at = (a: number, r: { rx: number; ry: number }) => ({ x: c.x + Math.cos(a) * r.rx, y: c.y + Math.sin(a) * r.ry, a });
  const step = (Math.PI * 2) / RING.length;
  const field = new Map(RING.map((id, i) => [id, at(-Math.PI / 2 + i * step, inner)]));

  // Each piece of work sits near the circular mean of its fields; then they are spaced evenly in that order.
  const mean = OUTER.map((o) => {
    const v = o.fields.reduce((acc, f) => ({ x: acc.x + Math.cos(field.get(f)!.a), y: acc.y + Math.sin(field.get(f)!.a) }), { x: 0, y: 0 });
    return { o, a: Math.atan2(v.y, v.x) };
  }).sort((p, q) => p.a - q.a);
  const gap = (Math.PI * 2) / mean.length;
  const off = Math.atan2(
    mean.reduce((s, m, i) => s + Math.sin(m.a - i * gap), 0),
    mean.reduce((s, m, i) => s + Math.cos(m.a - i * gap), 0),
  );
  const work = new Map(mean.map((m, i) => [m.o.id, at(off + i * gap, outer)]));
  return { w, h, c, inner, outer, field, work };
}

const WIDE = layout(1000, 660, { rx: 210, ry: 150 }, { rx: 370, ry: 255 }, 330);
const TALL = layout(600, 720, { rx: 150, ry: 150 }, { rx: 225, ry: 290 }, 350);

// ---------- scroll timeline ----------

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const q = (v: number) => Math.round(v * 40) / 40;
const RINGS = [0.02, 0.14] as const;
const OUT1 = 0.17; // centre -> fields
const OUT2 = 0.5; // fields -> work
const PULSE = 0.14;
const STAGGER = 0.04;

type Edge = { from: string; to: string; a: { x: number; y: number }; b: { x: number; y: number }; start: number };

function edges(g: Layout): Edge[] {
  const out: Edge[] = RING.map((f, i) => ({ from: "me", to: f, a: g.c, b: g.field.get(f)!, start: OUT1 + i * STAGGER }));
  OUTER.forEach((o, i) =>
    o.fields.forEach((f) => out.push({ from: f, to: o.id, a: g.field.get(f)!, b: g.work.get(o.id)!, start: OUT2 + i * STAGGER })),
  );
  return out;
}
const EDGES = { wide: edges(WIDE), tall: edges(TALL) };

function caption(p: number) {
  if (p < OUT1) return "Six fields, six pieces of work";
  if (p < OUT2) return "Signal leaves the centre for each field";
  if (p < 0.88) return "Each field feeds the work built on it";
  return "Most of the work draws on more than one field";
}

// ---------- drawing ----------

/** Gentle curve that bows away from the centre, so links read as orbits rather than spokes. */
function path(e: Edge, c: { x: number; y: number }) {
  if (e.from === "me") return `M${e.a.x},${e.a.y} L${e.b.x},${e.b.y}`;
  const mx = (e.a.x + e.b.x) / 2;
  const my = (e.a.y + e.b.y) / 2;
  const k = 0.18;
  return `M${e.a.x},${e.a.y} Q${mx + (mx - c.x) * k},${my + (my - c.y) * k} ${e.b.x},${e.b.y}`;
}

const EdgeView = memo(function EdgeView({ d, t, state }: { d: string; t: number; state: "idle" | "on" | "dim" }) {
  const passed = t >= 1;
  const opacity = state === "on" ? 1 : state === "dim" ? 0.06 : passed ? 0.55 : 0.14;
  return (
    <g>
      <path d={d} fill="none" stroke="var(--foreground)" strokeOpacity={opacity} strokeWidth={state === "on" ? 1.8 : 1} />
      {t > 0 && t < 1 && (
        <path d={d} fill="none" pathLength={1} stroke="var(--foreground)" strokeWidth={2.4} strokeDasharray={`${t} 1`} />
      )}
    </g>
  );
});

/** The travelling signal: a chartreuse dot with an ink outline, at parameter t along the edge. */
function headAt(e: Edge, c: { x: number; y: number }, t: number) {
  if (e.from === "me") return { x: e.a.x + (e.b.x - e.a.x) * t, y: e.a.y + (e.b.y - e.a.y) * t };
  const mx = (e.a.x + e.b.x) / 2;
  const my = (e.a.y + e.b.y) / 2;
  const cx = mx + (mx - c.x) * 0.18;
  const cy = my + (my - c.y) * 0.18;
  const u = 1 - t;
  return { x: u * u * e.a.x + 2 * u * t * cx + t * t * e.b.x, y: u * u * e.a.y + 2 * u * t * cy + t * t * e.b.y };
}

const labelWidth = (s: string, size: number) => s.length * size * 0.62 + 22;

/** On phones, split a long label over two lines at the space nearest its middle. */
function lines(label: string, max: number) {
  if (label.length <= max) return [label];
  let cut = -1;
  for (let i = 0; i < label.length; i++) if (label[i] === " " && (cut < 0 || Math.abs(i - label.length / 2) < Math.abs(cut - label.length / 2))) cut = i;
  return cut < 0 ? [label] : [label.slice(0, cut), label.slice(cut + 1)];
}

function Scene({ p }: { p: number }) {
  const narrow = useMedia(NARROW);
  const g = narrow ? TALL : WIDE;
  const es = narrow ? EDGES.tall : EDGES.wide;
  const router = useRouter();
  const [focus, setFocus] = useState<string | null>(null);

  const neighbours = useMemo(() => {
    const m = new Map<string, Set<string>>();
    const link = (a: string, b: string) => (m.get(a) ?? m.set(a, new Set()).get(a)!).add(b);
    es.forEach((e) => { link(e.from, e.to); link(e.to, e.from); });
    return m;
  }, [es]);

  const rings = q(clamp((p - RINGS[0]) / (RINGS[1] - RINGS[0])));
  const travel = es.map((e) => clamp((p - e.start) / PULSE));
  const arrived = new Map<string, number>([["me", rings]]);
  es.forEach((e, i) => arrived.set(e.to, Math.min(arrived.get(e.to) ?? 1, travel[i])));
  const lit = focus ? new Set([focus, ...(neighbours.get(focus) ?? [])]) : null;
  const ready = rings >= 1;

  const hover = (id: string) =>
    ready
      ? {
          tabIndex: 0,
          className: "cursor-pointer outline-none",
          onPointerEnter: () => setFocus(id),
          onFocus: () => setFocus(id),
          onClick: () => setFocus(id),
        }
      : {};

  const workFont = narrow ? 17 : 19;
  const fieldFont = narrow ? 12 : 12.5;

  return (
    <div className="mx-auto flex h-full max-w-7xl flex-col px-6 pb-14 pt-16">
      <div className="grid grid-cols-12 gap-x-6 gap-y-2 border-t border-foreground pt-4">
        <p className="caps col-span-12 md:col-span-2">(02)</p>
        <h2 className="display col-span-12 text-5xl sm:text-7xl md:col-span-6">The orbit</h2>
        <p className="caps col-span-12 flex items-center gap-2 self-end md:col-span-4 md:justify-end" aria-live="polite">
          <span className="inline-block h-2 w-2 border border-foreground bg-accent" aria-hidden />
          {caption(p)}
        </p>
      </div>

      <div className="mt-2 grid min-h-0 flex-1 grid-cols-12 gap-x-6">
        <svg
          viewBox={`0 0 ${g.w} ${g.h}`}
          className="col-span-12 h-full min-h-0 w-full md:col-span-8"
          role="img"
          aria-label="Ryan at the centre, six fields on an inner ring, and the projects built on them on an outer ring"
          onPointerLeave={() => setFocus(null)}
        >
          {/* orbits */}
          {[g.inner, g.outer].map((r, i) => (
            <ellipse key={i} cx={g.c.x} cy={g.c.y} rx={r.rx} ry={r.ry} fill="none" stroke="var(--foreground)" strokeOpacity={0.25 * rings} strokeDasharray="2 7" />
          ))}

          {es.map((e, i) => {
            const on = lit ? lit.has(e.from) && lit.has(e.to) : false;
            return <EdgeView key={`${e.from}-${e.to}`} d={path(e, g.c)} t={travel[i]} state={lit ? (on ? "on" : "dim") : "idle"} />;
          })}
          {es.map((e, i) => {
            const t = travel[i];
            if (t <= 0 || t >= 1) return null;
            const h = headAt(e, g.c, t);
            return <circle key={`h-${e.from}-${e.to}`} cx={h.x} cy={h.y} r={6} fill="var(--accent)" stroke="var(--foreground)" strokeWidth={1.5} />;
          })}

          {/* centre */}
          <g opacity={rings} {...hover("me")} aria-label="Ryan">
            <circle cx={g.c.x} cy={g.c.y} r={narrow ? 38 : 44} fill="var(--foreground)" />
            <circle cx={g.c.x} cy={g.c.y} r={(narrow ? 38 : 44) + 6} fill="none" stroke="var(--foreground)" strokeOpacity={0.25} />
            <text x={g.c.x} y={g.c.y + 5} textAnchor="middle" fontSize={14} letterSpacing="0.12em" fontWeight={600} className="font-mono" fill="var(--accent)">RYAN</text>
          </g>

          {/* fields */}
          {RING.map((id) => {
            const f = FIELD.get(id)!;
            const pt = g.field.get(id)!;
            const a = q(arrived.get(id) ?? 0);
            const label = (narrow ? f.short : f.name).toUpperCase();
            const w = labelWidth(label, fieldFont);
            const dim = lit && !lit.has(id);
            return (
              <g key={id} transform={`translate(${pt.x},${pt.y})`} opacity={(dim ? 0.2 : 1) * Math.max(0.25, rings)} {...hover(id)} aria-label={f.name}>
                <rect x={-w / 2} y={-15} width={w} height={30} rx={15} fill={a >= 1 || focus === id ? "var(--accent)" : "var(--background)"} stroke="var(--foreground)" strokeWidth={1.3} />
                <text y={4.5} textAnchor="middle" fontSize={fieldFont} letterSpacing="0.06em" fontWeight={600} className="font-mono" fill="var(--foreground)">{label}</text>
              </g>
            );
          })}

          {/* work */}
          {OUTER.map((o) => {
            const pt = g.work.get(o.id)!;
            const a = q(arrived.get(o.id) ?? 0);
            const dim = lit && !lit.has(o.id);
            // Labels sit above nodes in the top half and below them in the bottom half, so none run off the side.
            const below = Math.sin(pt.a) > 0.05;
            const ls = narrow ? lines(o.label, 12) : [o.label];
            const ty = below ? 36 : -22 - (ls.length - 1) * (workFont + 2);
            const go = () => (o.href && focus === o.id ? router.push(o.href) : setFocus(o.id));
            return (
              <g key={o.id} transform={`translate(${pt.x},${pt.y})`} opacity={(dim ? 0.2 : 1) * Math.max(0.25, rings)}
                {...hover(o.id)} onClick={ready ? go : undefined} role={o.href ? "link" : undefined} aria-label={o.label}
                onKeyDown={(ev) => ev.key === "Enter" && o.href && router.push(o.href)}>
                <rect x={-10} y={-10} width={20} height={20} fill={a >= 1 || focus === o.id ? "var(--accent)" : "var(--background)"} stroke="var(--foreground)" strokeWidth={1.6} />
                <text y={ty} textAnchor="middle" fontSize={workFont} fontWeight={800} letterSpacing="-0.02em" wordSpacing="0.1em" className="font-display"
                  fill="var(--foreground)" fillOpacity={0.4 + 0.6 * a} style={{ paintOrder: "stroke", stroke: "var(--background)", strokeWidth: 6 }}>
                  {ls.map((l, i) => (
                    <tspan key={l} x={0} dy={i ? workFont + 2 : 0}>{l}</tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </svg>

        <Panel focus={focus} />
      </div>
    </div>
  );
}

/** Side panel: what the focused node contains. */
function Panel({ focus }: { focus: string | null }) {
  const field = focus ? FIELD.get(focus as FieldId) : undefined;
  const work = focus ? OUTER.find((o) => o.id === focus) : undefined;
  return (
    <aside className="col-span-12 self-center border-t border-foreground pt-4 max-md:mt-2 md:col-span-4" aria-live="polite">
      {field ? (
        <>
          <p className="caps text-muted">Field</p>
          <h3 className="display mt-2 text-4xl">{field.name}</h3>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {field.skills.map((s) => (
              <li key={s} className="caps border border-foreground px-2 py-1">{s}</li>
            ))}
          </ul>
          <p className="caps mt-5 text-muted">Used in</p>
          <p className="mt-1">{OUTER.filter((o) => o.fields.includes(field.id)).map((o) => o.label).join(", ")}</p>
        </>
      ) : work ? (
        <>
          <p className="caps text-muted">{work.href ? "Project" : "Certification"}</p>
          <h3 className="display mt-2 text-4xl">{work.label}</h3>
          <p className="mt-3 text-lg leading-snug">{work.tagline}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {work.fields.map((f) => (
              <li key={f} className="caps bg-accent px-2 py-1">{FIELD.get(f)!.name}</li>
            ))}
          </ul>
          {work.href && (
            <Link href={work.href} className="caps mt-5 inline-block bg-foreground px-4 py-2.5 text-background hover:bg-accent hover:text-foreground">
              Open project →
            </Link>
          )}
        </>
      ) : focus === "me" ? (
        <>
          <p className="caps text-muted">Centre</p>
          <h3 className="display mt-2 text-4xl">Ryan</h3>
          <p className="mt-3 text-lg leading-snug">B.Tech AI student at Christ University, Bangalore. Everything on the rings started here.</p>
        </>
      ) : (
        <>
          <p className="caps text-muted">How to read it</p>
          <p className="mt-3 text-lg leading-snug">
            Me at the centre, the six fields I work in on the inner ring, and what I&apos;ve built with them on the outer ring. Scroll to send the signal outward; hover or tap any node to see what&apos;s inside.
          </p>
        </>
      )}
    </aside>
  );
}

export function OrbitGraph() {
  return (
    <div id="graph">
      <PinnedScene label="Skill orbit graph" length={4}>
        {(p) => <Scene p={p} />}
      </PinnedScene>
    </div>
  );
}
