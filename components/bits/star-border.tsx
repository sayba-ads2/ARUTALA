"use client";

import { useEffect, useRef } from "react";

/**
 * StarBorder ala React Bits: bintang cahaya mengelilingi tepi tombol,
 * meninggalkan jejak. Implementasi: perimeter dengan dashoffset animasi
 * + fallback glow.
 */
export default function StarBorder({
  children,
  className = "",
  speed = 4,
}: {
  children: React.ReactNode;
  className?: string;
  /** detik per putaran */
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const len = el.getBoundingClientRect().width * 2 + el.getBoundingClientRect().height * 2;
    el.style.setProperty("--rb-sb-len", `${len}px`);
  }, []);

  return (
    <span ref={ref} className={`rb-starborder ${className}`} style={{ ["--rb-sb-speed" as string]: `${speed}s` }}>
      {children}
    </span>
  );
}
