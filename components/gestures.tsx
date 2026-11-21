"use client";

import { useEffect } from "react";

// GESTUR v2. Efek pointer satu file, tanpa library:
// 1. data-tilt      -> kartu miring 3D mengikuti pointer (perspektif)
// 2. data-parallax   -> elemen bergeser vertikal halus saat scroll
// 3. hero pointer    -> garis sungai hero ikut melambai ke arah pointer
// Semua dinonaktifkan saat prefers-reduced-motion.

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function Gestures() {
  useEffect(() => {
    if (reduced()) return;

    /* ---- tilt 3D ---- */
    const MAX = 6; // derajat
    const cleanups: (() => void)[] = [];

    document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
      let raf = 0;
      const onMove = (e: PointerEvent) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          el.style.setProperty("--tilt-x", (-py * MAX).toFixed(2) + "deg");
          el.style.setProperty("--tilt-y", (px * MAX).toFixed(2) + "deg");
          el.style.setProperty("--tilt-gx", ((px + 0.5) * 100).toFixed(1) + "%");
          el.style.setProperty("--tilt-gy", ((py + 0.5) * 100).toFixed(1) + "%");
        });
      };
      const onLeave = () => {
        cancelAnimationFrame(raf);
        el.style.setProperty("--tilt-x", "0deg");
        el.style.setProperty("--tilt-y", "0deg");
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      });
    });

    /* ---- parallax scroll ---- */
    const px = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (px.length) {
      let raf = 0;
      const tick = () => {
        for (const el of px) {
          const speed = Number(el.dataset.parallax || 0.12);
          const r = el.getBoundingClientRect();
          const mid = r.top + r.height / 2 - window.innerHeight / 2;
          el.style.setProperty("--px-y", (-mid * speed).toFixed(1) + "px");
        }
        raf = 0;
      };
      const onScroll = () => {
        if (!raf) raf = requestAnimationFrame(tick);
      };
      tick();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      });
    }

    /* hero river effect diganti BetangBackdrop (lihat components/betang-backdrop.tsx) */

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
