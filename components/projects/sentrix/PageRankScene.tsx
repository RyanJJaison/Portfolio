"use client";

import { useMemo, useState } from "react";
import { forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY, type SimulationNodeDatum } from "d3-force";
import { PlayOnView } from "@/components/scroll/PlayOnView";
import { sentrixMetrics } from "@/content/sentrix";

// ---- Toy transaction graph (illustrative only, not Elliptic data) ----

const N = 26;
const RESTART = 0.15;
const ITERS = 30;

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGraph() {
  const rand = rng(7);
  const clusters = [[0, 1, 2, 3, 4, 5, 6, 7], [8, 9, 10, 11, 12, 13, 14, 15, 16], [17, 18, 19, 20, 21, 22, 23, 24, 25]];
  const set = new Set<string>();
  const add = (a: number, b: number) => a !== b && set.add(a < b ? `${a}-${b}` : `${b}-${a}`);
  for (const c of clusters) {
    for (let i = 1; i < c.length; i++) add(c[i], c[Math.floor(rand() * i)]); // spanning tree
    for (let i = 0; i < c.length; i++) if (rand() < 0.35) add(c[i], c[Math.floor(rand() * c.length)]);
  }
  add(5, 9); add(7, 12); add(14, 18); add(16, 22); // bridges between clusters
  const edges = [...set].map((k) => k.split("-").map(Number) as [number, number]);

  type Node = SimulationNodeDatum & { i: number };
  const nodes: Node[] = Array.from({ length: N }, (_, i) => ({ i, x: Math.cos(i) * 100 + i * 4, y: Math.sin(i) * 100 }));
  const sim = forceSimulation(nodes)
    .force("link", forceLink(edges.map(([s, t]) => ({ source: s, target: t }))).distance(48))
    .force("charge", forceManyBody().strength(-160))
    .force("x", forceX(0).strength(0.05))
    .force("y", forceY(0).strength(0.08))
    .force("collide", forceCollide(18))
    .stop();
  for (let i = 0; i < 300; i++) sim.tick();

  const W = 560, H = 440, pad = 36;
  const xs = nodes.map((n) => n.x!), ys = nodes.map((n) => n.y!);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const k = Math.min((W - 2 * pad) / (x1 - x0), (H - 2 * pad) / (y1 - y0));
  const pts = nodes.map((n) => ({ x: (W - (x1 - x0) * k) / 2 + (n.x! - x0) * k, y: (H - (y1 - y0) * k) / 2 + (n.y! - y0) * k }));
  const adj: number[][] = Array.from({ length: N }, () => []);
  edges.forEach(([a, b]) => { adj[a].push(b); adj[b].push(a); });
  return { W, H, pts, edges, adj };
}

const G = buildGraph();

/** Personalized PageRank by power iteration; returns the score vector after each step. */
function pprIterates(seed: number) {
  let p = new Float64Array(N);
  p[seed] = 1;
  const out = [p];
  for (let t = 0; t < ITERS; t++) {
    const next = new Float64Array(N);
    next[seed] += RESTART;
    for (let u = 0; u < N; u++) {
      const share = ((1 - RESTART) * p[u]) / G.adj[u].length;
      for (const v of G.adj[u]) next[v] += share;
    }
    p = next;
    out.push(p);
  }
  return out;
}

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

const STEPS = [
  { at: 0, title: "A known illicit transaction is the seed", body: "Every node is a transaction, every edge a payment flow. One node is confirmed illicit." },
  { at: 0.14, title: "Random walks restart at the seed", body: `Personalized PageRank: a walker follows edges and jumps back to the seed with probability ${RESTART}. A node's score is how often the walker lands there, so nearness to illicit activity glows.` },
  { at: 0.66, title: "Proximity becomes features", body: "SentriX adds four PPR columns (forward and reverse) to Elliptic's 165 raw node features, then trains GraphSAGE on a temporal split." },
];

function Scene({ p }: { p: number }) {
  const [seed, setSeed] = useState(0);
  const iterates = useMemo(() => pprIterates(seed), [seed]);
  const iter = Math.round(span(p, 0.14, 0.62) * ITERS);
  const score = iterates[iter];
  const appear = span(p, 0, 0.1);
  const bars = span(p, 0.68, 0.92);
  const step = STEPS.reduce((acc, s, i) => (p >= s.at ? i : acc), 0);

  let max = 0;
  score.forEach((s, i) => { if (i !== seed && s > max) max = s; });
  const heat = (i: number) => (i === seed ? 1 : max > 0 ? Math.log1p(1000 * score[i]) / Math.log1p(1000 * max) : 0);

  return (
    <div className="mx-auto grid max-w-6xl content-center gap-6 px-6 py-10 md:grid-cols-[1.2fr_1fr] md:gap-10">
      <div className="min-h-0">
        <svg viewBox={`0 0 ${G.W} ${G.H}`} className="mx-auto max-h-[42vh] w-full md:max-h-[min(64svh,600px)]" role="img" aria-label="Toy transaction graph with Personalized PageRank scores spreading from a seed node">
          <defs>
            <radialGradient id="pr-halo">
              <stop offset="0%" stopColor="var(--risk)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="var(--risk)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g opacity={appear}>
            {G.edges.map(([a, b]) => {
              const h = Math.min(heat(a), heat(b));
              return (
                <line key={`${a}-${b}`} x1={G.pts[a].x} y1={G.pts[a].y} x2={G.pts[b].x} y2={G.pts[b].y}
                  stroke={h > 0.05 ? "var(--risk)" : "var(--line)"} strokeOpacity={0.25 + 0.6 * h} strokeWidth={1 + 2 * h} />
              );
            })}
            {G.pts.map((pt, i) => {
              const h = heat(i);
              const isSeed = i === seed;
              return (
                <g key={i} transform={`translate(${pt.x},${pt.y})`} className="cursor-pointer outline-none [&:focus-visible>circle:last-of-type]:stroke-[var(--foreground)]" onClick={() => setSeed(i)}
                  role="button" tabIndex={0} aria-label={`Use transaction ${i + 1} as the seed`}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSeed(i)}>
                  {h > 0.2 && <circle r={14 + 14 * h} fill="url(#pr-halo)" opacity={0.6 * h} />}
                  <circle r={6 + 6 * h} fill="var(--risk)" fillOpacity={0.08 + 0.92 * h} stroke={isSeed ? "var(--foreground)" : "var(--risk)"} strokeOpacity={isSeed ? 1 : 0.5} strokeWidth={isSeed ? 3 : 1} />
                  {isSeed && <text y={-20} textAnchor="middle" fontSize="13" letterSpacing="0.06em" className="fill-foreground font-mono uppercase">seed</text>}
                </g>
              );
            })}
          </g>
        </svg>
        <div className="mt-2 flex flex-wrap justify-between gap-2 font-mono text-[11px] text-muted">
          <span>iteration {iter} / {ITERS} · restart {RESTART}</span>
          <span>Toy graph, illustrative. Click a node to re-seed, then replay.</span>
        </div>
      </div>

      <div className="flex min-h-0 flex-col justify-center">
        <ol className="space-y-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className={`card p-4 transition duration-500 ${i === step ? "bg-accent-soft" : "opacity-40"} ${i !== step ? "max-md:hidden" : ""}`}>
              <p className="caps text-muted">Step 0{i + 1}</p>
              <h3 className="display mt-2 text-2xl">{s.title}</h3>
              <p className="mt-1 text-sm text-muted">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className={`mt-6 transition-opacity duration-500 ${bars > 0 ? "opacity-100" : "opacity-0"}`} aria-hidden={bars === 0}>
          <p className="caps text-muted">Held-out results, 3 seeds (SentriX README)</p>
          <div className="mt-3 space-y-4">
            {sentrixMetrics.map((m) => (
              <div key={m.metric}>
                <p className="text-sm">{m.metric}</p>
                {([["165 raw", m.raw, m.rawSd, "var(--muted)"], ["165 raw + 4 PPR", m.ppr, m.pprSd, "var(--accent)"]] as const).map(([label, v, sd, color]) => (
                  <div key={label} className="mt-1.5 flex items-center gap-3">
                    <span className="w-28 shrink-0 font-mono text-[11px] text-muted">{label}</span>
                    <div className="relative h-3 flex-1 rounded-full bg-line/60">
                      <div className="h-full rounded-full" style={{ width: `${v * bars * 100}%`, background: color }} />
                    </div>
                    <span className="w-24 shrink-0 text-right font-mono text-xs tabular-nums">
                      {(v * bars).toFixed(4)}{sd ? <span className="text-muted"> ±{sd}</span> : null}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageRankScene() {
  return (
    <PlayOnView label="SentriX Personalized PageRank demo" duration={3200}>
      {(p) => <Scene p={p} />}
    </PlayOnView>
  );
}
