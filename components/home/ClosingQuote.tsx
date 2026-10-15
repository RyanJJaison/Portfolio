"use client";

import { useEffect, useRef, useState } from "react";
import { closingQuote } from "@/content/about";

const DURATION = 2600; // ms for the whole quote to write itself
const FLIGHT = 900; // ms each dot spends gliding into place

type Dot = { sx: number; sy: number; tx: number; ty: number; delay: number };

/**
 * The quote is sampled from rendered handwriting into dots, which drift in from scattered noise and settle
 * left to right, so it reads as being written. Runs once per view; Replay restarts it.
 */
export function ClosingQuote() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handRef = useRef<HTMLSpanElement>(null);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let cancelled = false;
    let started = false;
    let dots: Dot[] = [];
    let start = 0;
    let dpr = 1;
    let ink = "#2a201a";

    function sample() {
      const w = wrap.clientWidth;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const family = getComputedStyle(handRef.current!).fontFamily;
      const size = Math.max(30, Math.min(68, w / 13));
      const off = document.createElement("canvas").getContext("2d")!;
      off.font = `${size}px ${family}`;
      // Word-wrap every source line to the available width.
      const lines: string[] = [];
      for (const src of closingQuote.lines) {
        let line = "";
        for (const word of src.split(" ")) {
          const next = line ? `${line} ${word}` : word;
          if (off.measureText(next).width > w * 0.94 && line) {
            lines.push(line);
            line = word;
          } else line = next;
        }
        lines.push(line);
      }
      const lh = size * 1.25;
      const h = Math.ceil(lines.length * lh + size * 0.6);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.height = `${h}px`;

      const tc = document.createElement("canvas");
      tc.width = w;
      tc.height = h;
      const t = tc.getContext("2d")!;
      t.font = off.font;
      t.textAlign = "center";
      t.textBaseline = "alphabetic";
      lines.forEach((l, i) => t.fillText(l, w / 2, size + i * lh));
      const data = t.getImageData(0, 0, w, h).data;
      const step = w < 600 ? 2.5 : 3;
      const out: Dot[] = [];
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          if (data[(Math.floor(y) * w + Math.floor(x)) * 4 + 3] > 140) {
            out.push({
              tx: x, ty: y,
              sx: Math.random() * w, sy: Math.random() * h,
              // left to right, line by line, like handwriting
              delay: ((y / h) * 0.35 + (x / w) * 0.65) * (DURATION - FLIGHT) + Math.random() * 120,
            });
          }
        }
      }
      dots = out;
      ink = getComputedStyle(wrap).getPropertyValue("--foreground").trim() || ink;
    }

    function draw(now: number) {
      raf = 0;
      const t = reduced ? Infinity : now - start;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = ink;
      let done = true;
      for (const d of dots) {
        const f = Math.min(1, Math.max(0, (t - d.delay) / FLIGHT));
        if (f < 1) done = false;
        const e = 1 - Math.pow(1 - f, 3);
        ctx.globalAlpha = 0.15 + 0.75 * e;
        ctx.fillRect(d.sx + (d.tx - d.sx) * e, d.sy + (d.ty - d.sy) * e, 1.7, 1.7);
      }
      if (!done && !cancelled) raf = requestAnimationFrame(draw);
    }

    function begin() {
      if (started) return;
      started = true;
      start = performance.now();
      raf = requestAnimationFrame(draw);
    }

    const io = new IntersectionObserver(([e]) => e.isIntersecting && begin(), { threshold: 0.4 });
    document.fonts.ready.then(() => {
      if (cancelled) return;
      sample();
      draw(performance.now()); // scattered noise until it comes into view
      io.observe(wrap);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [run]);

  return (
    <section className="mx-auto mt-32 max-w-6xl px-6 pb-10">
      <div className="border-t border-foreground/70 pt-16">
        <div ref={wrapRef} className="relative">
          <span ref={handRef} className="font-hand pointer-events-none absolute opacity-0" aria-hidden>.</span>
          <canvas ref={canvasRef} className="block w-full" aria-hidden />
          <blockquote className="sr-only">
            {closingQuote.lines.join(" ")}
            <footer>{closingQuote.source}</footer>
          </blockquote>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="caps text-muted">{closingQuote.source}</p>
          <button type="button" onClick={() => setRun((r) => r + 1)} className="caps text-muted hover:text-foreground">
            Replay
          </button>
        </div>
      </div>
    </section>
  );
}
