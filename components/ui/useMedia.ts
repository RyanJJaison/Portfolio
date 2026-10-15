"use client";

import { useSyncExternalStore } from "react";

/** Live result of a media query; `false` during server render. */
export function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const NARROW = "(max-width: 767px)";
