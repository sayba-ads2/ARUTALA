"use client";

import { useEffect, useRef } from "react";

/**
 * SpotlightCard ala React Bits: sorotan lembut mengikuti pointer di atas
 * kartu; tetangga satu group ikut tersorot ringan via CSS var di parent.
 * Hanya aktif pada (pointer: fine); di sentuh cukup hover-state biasa.
 */
type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
  radius?: number;
};

export default function SpotlightCard({
  children,
  className = "",
  as = "div",
  radius = 340,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia?.("(pointer: fine)").matches) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (ev: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--rb-spot-x", `${ev.clientX - r.left}px`);
      el.style.setProperty("--rb-spot-y", `${ev.clientY - r.top}px`);
      // sorotan tetangga: tulis koordinat global sederhana di parent grid
      const p = el.parentElement as HTMLElement | null;
      if (p) {
        p.style.setProperty("--rb-group-x", `${ev.clientX}px`);
        p.style.setProperty("--rb-group-y", `${ev.clientY}px`);
      }
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  const Tag = as as any;
  return (
    <Tag
      ref={ref as never}
      className={`rb-spot ${className}`}
      style={{ ["--rb-spot-r" as string]: `${radius}px` }}
    >
      <span className="rb-spot__glow" aria-hidden="true" />
      {children}
    </Tag>
  );
}
