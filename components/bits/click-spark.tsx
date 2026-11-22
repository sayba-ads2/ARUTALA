"use client";

import { useEffect, useRef } from "react";

/**
 * ClickSpark ala React Bits: percikan kecil tiap klik di seluruh situs.
 * Canvas fixed penuh, tidak menangkap event. Off utk reduced motion.
 */
type Spark = { x: number; y: number; life: number; hue: number };

export default function ClickSpark() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let w = (cv.width = window.innerWidth);
    let h = (cv.height = window.innerHeight);
    const onResize = () => {
      w = cv.width = window.innerWidth;
      h = cv.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const sparks: Spark[] = [];
    const COUNT = 8;
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest("input,textarea,select")) return; // biarkan form tenang
      for (let i = 0; i < COUNT; i++) {
        sparks.push({ x: e.clientX, y: e.clientY, life: 1, hue: 42 + Math.random() * 12 });
      }
    };

    let raf = 0;
    let running = false;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life -= 0.028;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        const a = (Math.PI * 2 * (i % COUNT)) / COUNT + s.x * 0.001;
        const d = (1 - s.life) * 34;
        const x = s.x + Math.cos(a) * d;
        const y = s.y + Math.sin(a) * d;
        ctx.globalAlpha = Math.max(0, s.life);
        ctx.strokeStyle = `hsl(${s.hue} 85% 62%)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(a) * 6, y + Math.sin(a) * 6);
        ctx.stroke();
      }
      // HEMAT CPU: loop berhenti sendiri saat tak ada spark tersisa,
      // lalu dinyalakan lagi hanya ketika ada klik.
      if (sparks.length > 0) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
        raf = 0;
      }
    };
    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    window.addEventListener("click", onClick, { passive: true });
    window.addEventListener("pointerdown", kick, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 90,
      }}
    />
  );
}
