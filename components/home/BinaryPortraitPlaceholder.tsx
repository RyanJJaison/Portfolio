// Phase 2 replaces this with the real binary-digit portrait rendered from Ryan's photo.
export function BinaryPortraitPlaceholder() {
  const rows = Array.from({ length: 22 }, (_, r) =>
    Array.from({ length: 34 }, (_, c) => {
      const dx = (c - 17) / 13;
      const dy = (r - 11) / 10;
      const inside = dx * dx + dy * dy < 1;
      return inside ? ((r * 7 + c * 13) % 3 === 0 ? "1" : "0") : " ";
    }).join(""),
  );
  return (
    <div
      role="img"
      aria-label="Placeholder for a portrait rendered in binary digits"
      className="rounded-xl border border-line bg-black/30 p-4"
    >
      <pre aria-hidden className="select-none overflow-hidden font-mono text-[10px] leading-[11px] text-accent/70 sm:text-xs sm:leading-3">
        {rows.join("\n")}
      </pre>
    </div>
  );
}
