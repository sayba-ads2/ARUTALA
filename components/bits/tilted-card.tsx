"use client";

import { useEffect, useRef } from "react";

/**
 * TiltedCard ala React Bits: kartu 3D miring mengikuti pointer + kilau
 * glare yang bergerak. Nonaktif untuk pointer kasar & reduced motion.
 */
type Props = {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // derajat
  glare?: boolean;
};

export default function TiltedCard({
  children,
  className = "",
  maxTilt = 8,
  glare = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia?.("(pointer: fine)").matches) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const apply = (px: number, py: number) => {
      const rx = (py - 0.5) * -2 * maxTilt;
      const ry = (px - 0.5) * 2 * maxTilt;
      el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale3d(1.01,1.01,1.01)`;
      el.style.setProperty("--rb-glare-x", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--rb-glare-y", `${(py * 100).toFixed(1)}%`);
    };
    const onMove = (ev: PointerEvent) => {
      const r = el.getBoundingClientRect();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        apply((ev.clientX - r.left) / r.width, (ev.clientY - r.top) / r.height),
      );
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
      el.style.setProperty("--rb-glare-o", "0");
    };
    el.style.setProperty("--rb-glare-o", "1");
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [maxTilt]);

  return (
    <div ref={ref} className={`rb-tilt ${className}`}>
      {children}
      {glare && <span className="rb-tilt__glare" aria-hidden="true" />}
    </div>
  );
}
