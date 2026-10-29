"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { pictures, type PictureId } from "@/content/media";

export type StageItem = {
  id: string;
  picture?: PictureId;
  /** Show only part of the picture, as a detail of the whole: CSS object-position plus a zoom. */
  detail?: { position: string; zoom: number };
  video?: { src: string; poster: PictureId };
  node?: ReactNode;
  caption?: string;
};

const StageContext = createContext("");
/** The id of the section currently beside the stage. */
export const useStage = () => useContext(StageContext);

/**
 * The split stage: a calm reading column on one side, a fixed picture on the other that crossfades to
 * whatever the section in view is about. Sections mark themselves with `data-stage="<id>"`.
 * On a phone the stage is a picture at the top and each section shows its own picture inline.
 */
export function SplitPage({ items, aside, fixed, children }: { items: StageItem[]; aside?: string; fixed?: ReactNode; children: ReactNode }) {
  const column = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const known = new Set(items.map((i) => i.id));
    const els = Array.from(column.current!.querySelectorAll<HTMLElement>("[data-stage]")).filter((el) => known.has(el.dataset.stage!));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.getAttribute("data-stage")!);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const current = items.find((i) => i.id === active) ?? items[0];
  const caption = current?.caption ?? (current?.picture ? pictures[current.picture].caption : current?.video ? pictures[current.video.poster].caption : "");

  return (
    <StageContext.Provider value={active}>
      <div className="lg:grid lg:grid-cols-2">
        <div className="relative lg:order-2">
          <div className="px-[var(--m)] lg:sticky lg:top-0 lg:h-svh lg:py-[var(--m)] lg:pl-0">
            <div className="relative h-[46svh] overflow-hidden bg-surface md:h-[46svh] lg:h-full">
              {fixed && <div className="absolute inset-0 flex items-center justify-center p-8 pb-20">{fixed}</div>}
              {!fixed && items.map((it, i) => (
                <div
                  key={it.id}
                  className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${it.id === active ? "opacity-100" : "opacity-0"} ${i > 0 ? "max-lg:hidden" : "max-lg:!opacity-100"}`}
                  aria-hidden={it.id !== active}
                >
                  <StageContent item={it} active={it.id === active} priority={i === 0} />
                </div>
              ))}
              <div className="absolute inset-x-0 bottom-0 hidden min-h-14 items-center justify-between gap-4 bg-paper px-5 py-2 lg:flex">
                <p className="small" aria-live="polite">{caption}</p>
                {aside && <p className="small hidden text-right lg:block">{aside}</p>}
              </div>
            </div>
          </div>
        </div>
        <div ref={column} className="relative px-[var(--m)] lg:order-1 lg:pr-20">{children}</div>
      </div>
    </StageContext.Provider>
  );
}

function StageContent({ item, active, priority }: { item: StageItem; active: boolean; priority: boolean }) {
  if (item.node) return <div className="flex h-full items-center justify-center p-8 pb-20">{item.node}</div>;
  if (item.video) {
    const poster = pictures[item.video.poster];
    return (
      <video className="h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={poster.src} aria-hidden>
        <source src={item.video.src} type="video/webm" />
      </video>
    );
  }
  if (!item.picture) return null;
  const p = pictures[item.picture];
  return (
    <div className="h-full w-full" style={item.detail ? { transform: `scale(${item.detail.zoom})`, transformOrigin: item.detail.position } : undefined}>
      <div className={`relative h-full w-full ${active ? "drift" : ""}`}>
      <Image
        src={p.src}
        alt={p.alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
        style={{ objectPosition: item.detail?.position ?? p.position ?? "50% 50%" }}
      />
      </div>
    </div>
  );
}

/** A section of the reading column. On a phone it carries its own picture, since the stage stays at the top. */
export function StageSection({ id, picture, className = "", children, label }: { id: string; picture?: PictureId; className?: string; children: ReactNode; label?: string }) {
  const p = picture ? pictures[picture] : null;
  return (
    <section data-stage={id} aria-label={label} className={className}>
      {children}
      {p && (
        <figure className="mt-10 lg:hidden">
          <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="100vw" className="aspect-[4/3] w-full object-cover" style={{ objectPosition: p.position }} />
          <figcaption className="small mt-2 text-muted">{p.caption}</figcaption>
        </figure>
      )}
    </section>
  );
}
