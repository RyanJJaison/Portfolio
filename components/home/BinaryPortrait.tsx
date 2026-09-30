"use client";

import { useEffect, useRef } from "react";
import { portrait } from "@/content/portrait";

const LEVELS = 12; // brightness buckets, each baked into its own glyph sprite
const REPEL_RADIUS = 60; // CSS px
const SETTLE_MS = 2200;

type Cell = {
  tx: number; ty: number; // target, in grid units
  x: number; y: number;
  vx: number; vy: number;
  level: number;
  bit: 0 | 1;
  delay: number; // ms before this cell starts flying home
};

function decode() {
  const bin = atob(portrait.data);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function readAccent(el: HTMLElement) {
  return getComputedStyle(el).getPropertyValue("--accent").trim() || "#22d3ee";
}

export function BinaryPortrait({ label }: { label: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const { cols, rows } = portrait;
    const grid = decode();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cells: Cell[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const v = grid[r * cols + c];
        if (!v) continue;
        const angle = Math.random() * Math.PI * 2;
        const dist = cols * (0.6 + Math.random() * 0.6);
        cells.push({
          tx: c, ty: r,
          x: reduced ? c : cols / 2 + Math.cos(angle) * dist,
          y: reduced ? r : rows / 2 + Math.sin(angle) * dist,
          vx: 0, vy: 0,
          level: Math.min(LEVELS - 1, Math.floor((v / 256) * LEVELS)),
          bit: Math.random() < 0.5 ? 0 : 1,
          delay: reduced ? 0 : (r / rows) * 600 + Math.random() * 500,
        });
      }
    }

    let cell = 1; // CSS px per grid unit
    let dpr = 1;
    let sprites: HTMLCanvasElement[][] = []; // [bit][level]

    function buildSprites() {
      const color = readAccent(wrap);
      const size = Math.max(1, Math.ceil(cell * dpr));
      sprites = [0, 1].map((bit) =>
        Array.from({ length: LEVELS }, (_, lvl) => {
          const s = document.createElement("canvas");
          s.width = s.height = size;
          const sc = s.getContext("2d")!;
          const t = (lvl + 1) / LEVELS;
          sc.globalAlpha = 0.22 + 0.78 * Math.pow(t, 0.75);
          sc.fillStyle = color;
          sc.font = `${size * (0.8 + 0.35 * t)}px ui-monospace, monospace`;
          sc.textAlign = "center";
          sc.textBaseline = "middle";
          sc.fillText(String(bit), size / 2, size / 2 + size * 0.05);
          return s;
        }),
      );
    }

    function resize() {
      const w = wrap.clientWidth;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cell = w / cols;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(cell * rows * dpr);
      canvas.style.height = `${cell * rows}px`;
      buildSprites();
      draw();
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const px = cell * dpr;
      for (const k of cells) {
        ctx.drawImage(sprites[k.bit][k.level], k.x * px, k.y * px);
      }
    }

    const pointer = { x: -1e4, y: -1e4 };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / cell;
      pointer.y = (e.clientY - rect.top) / cell;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -1e4;
    };

    let raf = 0;
    let visible = true;
    let start = performance.now();
    let lastFlip = 0;

    function step(now: number) {
      raf = 0;
      const t = now - start;
      const radius = REPEL_RADIUS / cell;
      for (const k of cells) {
        if (t < k.delay) continue;
        // Spring toward home.
        k.vx += (k.tx - k.x) * 0.06;
        k.vy += (k.ty - k.y) * 0.06;
        // Push away from the cursor.
        const dx = k.x - pointer.x;
        const dy = k.y - pointer.y;
        const d2 = dx * dx + dy * dy;
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
      // After settling, flip a few bits now and then so the portrait stays alive.
      if (t > SETTLE_MS && now - lastFlip > 60) {
        lastFlip = now;
        for (let i = 0; i < cells.length * 0.01; i++) {
          const k = cells[(Math.random() * cells.length) | 0];
          k.bit = k.bit ? 0 : 1;
        }
      }
      draw();
      if (visible) raf = requestAnimationFrame(step);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    if (reduced) {
      draw();
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden;
      if (visible && !raf) raf = requestAnimationFrame(step);
    });
    io.observe(canvas);
    const onVis = () => {
      visible = !document.hidden;
      if (visible && !raf) raf = requestAnimationFrame(step);
    };
    document.addEventListener("visibilitychange", onVis);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    start = performance.now();
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full" style={{ aspectRatio: `${portrait.cols} / ${portrait.rows}` }}>
      <canvas ref={canvasRef} role="img" aria-label={label} className="block w-full" />
    </div>
  );
}
