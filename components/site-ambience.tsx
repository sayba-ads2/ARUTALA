"use client";

import { useEffect } from "react";

/** Lapisan suasana situs: grain film halus + progres scroll di pita atas.
 *  Grain dimatikan bila pengguna meminta motion dikurangi. */
export default function SiteAmbience() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const p = max > 0 ? h.scrollTop / max : 0;
        bar.style.setProperty("--sp", p.toFixed(4));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    // aktifkan View Transitions API antar halaman bila peramban mendukung
    if (typeof document.startViewTransition !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("has-vt");
  }, []);

  return (
    <>
      <div className="grain-layer" aria-hidden="true" />
      <div id="scroll-progress" className="scroll-progress" aria-hidden="true" />
    </>
  );
}
