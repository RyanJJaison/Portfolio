"use client";

import { useEffect, useRef } from "react";
import { portrait } from "@/content/portrait";

const LEVELS = 12; // ink buckets, each baked into its own glyph sprite
const REPEL_RADIUS = 60; // CSS px
const FLIP_MS = 140; // how often a few bits flip once settled
const SETTLED = 0.02; // grid units; closer than this to home (and slow) snaps into place
const INTRO_MS = 1100; // each digit's flight time on load; time-based so slow devices finish on schedule

type Cell = {
  tx: number; ty: number; // home, in grid units
  sx: number; sy: number; // intro start
  intro: boolean; // still on its first flight home
  x: number; y: number;
  vx: number; vy: number;
  level: number;
  bit: 0 | 1;
  delay: number; // ms before this cell starts flying home
  active: boolean; // moving, so drawn every frame instead of living in the static layer
};

function decode() {
  const bin = atob(portrait.data);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function readInk(el: HTMLElement) {
  return getComputedStyle(el).getPropertyValue("--foreground").trim() || "#141414";
}

/** Grid cells store brightness (18%..100% inside the person). Ink is the inverse: dark hair and suit get dense digits. */
function inkLevel(v: number) {
  const brightness = Math.min(1, Math.max(0, (v / 255 - 0.18) / 0.82));
  return Math.min(LEVELS - 1, Math.floor((1 - brightness) * LEVELS));
}

/**
 * Settled digits live in an offscreen static layer that is only touched where something changes,
 * so an idle portrait costs almost nothing. Only moving digits are simulated and drawn per frame.
 */
export function BinaryPortrait({ label }: { label: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const layer = document.createElement("canvas");
    const lctx = layer.getContext("2d")!;
    const { cols, rows } = portrait;
    const grid = decode();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cells: Cell[] = [];
    const at = new Map<number, Cell>(); // r * cols + c -> cell, for pointer lookups
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const v = grid[r * cols + c];
        if (!v) continue;
        const angle = Math.random() * Math.PI * 2;
        const dist = cols * (0.6 + Math.random() * 0.6);
        const sx = reduced ? c : cols / 2 + Math.cos(angle) * dist;
        const sy = reduced ? r : rows / 2 + Math.sin(angle) * dist;
        const k: Cell = {
          tx: c, ty: r,
          sx, sy, intro: !reduced,
          x: sx,
          y: sy,
          vx: 0, vy: 0,
          level: inkLevel(v),
          bit: Math.random() < 0.5 ? 0 : 1,
          delay: reduced ? 0 : (r / rows) * 600 + Math.random() * 500,
          active: !reduced,
        };
        cells.push(k);
        at.set(r * cols + c, k);
      }
    }
    const active = new Set<Cell>(cells.filter((k) => k.active));

    let cell = 1; // CSS px per grid unit
    let dpr = 1;
    let px = 1; // device px per grid unit
    let sprites: HTMLCanvasElement[][] = []; // [bit][level]

    function buildSprites() {
      const color = readInk(wrap);
      const size = Math.max(1, Math.ceil(px));
      sprites = [0, 1].map((bit) =>
        Array.from({ length: LEVELS }, (_, lvl) => {
          const s = document.createElement("canvas");
          s.width = s.height = size;
          const sc = s.getContext("2d")!;
          const t = (lvl + 1) / LEVELS;
          sc.globalAlpha = 0.14 + 0.86 * Math.pow(t, 1.1);
          sc.fillStyle = color;
          sc.font = `${t > 0.6 ? 700 : 500} ${size * (0.85 + 0.3 * t)}px ui-monospace, monospace`;
          sc.textAlign = "center";
          sc.textBaseline = "middle";
          sc.fillText(String(bit), size / 2, size / 2 + size * 0.05);
          return s;
        }),
      );
    }

    const stamp = (k: Cell) => lctx.drawImage(sprites[k.bit][k.level], k.tx * px, k.ty * px);
    const erase = (k: Cell) => lctx.clearRect(Math.floor(k.tx * px), Math.floor(k.ty * px), Math.ceil(px) + 1, Math.ceil(px) + 1);

    function rebuildLayer() {
      lctx.clearRect(0, 0, layer.width, layer.height);
      for (const k of cells) if (!k.active) stamp(k);
    }

    function composite() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(layer, 0, 0);
      for (const k of active) {
        if (k.x < -1 || k.y < -1 || k.x > cols || k.y > rows) continue; // off-canvas during the fly-in
        ctx.drawImage(sprites[k.bit][k.level], k.x * px, k.y * px);
      }
    }

    function resize() {
      const w = wrap.clientWidth;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cell = w / cols;
      px = cell * dpr;
      canvas.width = layer.width = Math.round(w * dpr);
      canvas.height = layer.height = Math.round(cell * rows * dpr);
      canvas.style.height = `${cell * rows}px`;
      buildSprites();
      rebuildLayer();
      composite();
    }

    const pointer = { x: -1e4, y: -1e4 };
    let raf = 0;
    let visible = true;
    let start = performance.now();
    let last = start;

    function wake() {
      if (raf || !visible || !active.size) return;
      last = performance.now();
      raf = requestAnimationFrame(step);
    }

    function activate(k: Cell) {
      if (k.active) return; // includes digits still flying in
      k.active = true;
      active.add(k);
      erase(k);
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / cell;
      pointer.y = (e.clientY - rect.top) / cell;
      // Only the digits under the cursor wake up.
      const rad = Math.ceil(REPEL_RADIUS / cell);
      const cx = Math.round(pointer.x);
      const cy = Math.round(pointer.y);
      for (let r = cy - rad; r <= cy + rad; r++) {
        for (let c = cx - rad; c <= cx + rad; c++) {
          const k = at.get(r * cols + c);
          if (k && (c - pointer.x) ** 2 + (r - pointer.y) ** 2 < rad * rad) activate(k);
        }
      }
      wake();
    };
    const onLeave = () => {
      pointer.x = pointer.y = -1e4;
    };

    function settle(k: Cell) {
      k.x = k.tx;
      k.y = k.ty;
      k.vx = k.vy = 0;
      k.intro = false;
      k.active = false;
      active.delete(k);
      stamp(k);
    }

    function step(now: number) {
      raf = 0;
      const t = now - start;
      // Physics is tuned per 60 Hz frame; run extra substeps when frames are slow.
      const substeps = Math.min(4, Math.max(1, Math.round((now - last) / 16.7)));
      last = now;
      const radius = REPEL_RADIUS / cell;
      for (const k of active) {
        if (k.intro) {
          const f = (t - k.delay) / INTRO_MS;
          if (f <= 0) continue;
          if (f >= 1) {
            settle(k);
            continue;
          }
          const e = 1 - Math.pow(1 - f, 3);
          k.x = k.sx + (k.tx - k.sx) * e;
          k.y = k.sy + (k.ty - k.sy) * e;
          continue;
        }
        let d2 = 0;
        for (let s = 0; s < substeps; s++) {
          k.vx += (k.tx - k.x) * 0.06;
          k.vy += (k.ty - k.y) * 0.06;
          const dx = k.x - pointer.x;
          const dy = k.y - pointer.y;
          d2 = dx * dx + dy * dy;
          if (d2 < radius * radius && d2 > 0.0001) {
            const d = Math.sqrt(d2);
            const f = ((radius - d) / radius) * 1.6;
            k.vx += (dx / d) * f;
            k.vy += (dy / d) * f;
          }
          k.vx *= 0.78;
          k.vy *= 0.78;
          k.x += k.vx;
          k.y += k.vy;
        }
        const home = Math.abs(k.x - k.tx) < SETTLED && Math.abs(k.y - k.ty) < SETTLED;
        if (home && Math.abs(k.vx) + Math.abs(k.vy) < SETTLED && d2 >= radius * radius) settle(k);
      }
      composite();
      wake();
    }

    // Once settled, flip a few bits on a slow timer and redraw just those cells.
    const flipTimer = window.setInterval(() => {
      if (!visible || reduced) return;
      const n = Math.ceil(cells.length * 0.008);
      for (let i = 0; i < n; i++) {
        const k = cells[(Math.random() * cells.length) | 0];
        k.bit = k.bit ? 0 : 1;
        if (!k.active) {
          erase(k);
          stamp(k);
        }
      }
      if (!raf) composite();
    }, FLIP_MS);

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden;
      wake();
    });
    io.observe(canvas);
    const onVis = () => {
      visible = !document.hidden;
      wake();
    };
    document.addEventListener("visibilitychange", onVis);
    if (!reduced) {
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
    }
    start = performance.now();
    wake();

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(flipTimer);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full"
      // Fade the bottom edge into the page with a mask, instead of painting a gradient over it.
      style={{ aspectRatio: `${portrait.cols} / ${portrait.rows}`, maskImage: "linear-gradient(to bottom, #000 70%, transparent)" }}
    >
      <canvas ref={canvasRef} role="img" aria-label={label} className="block w-full" />
    </div>
  );
}
