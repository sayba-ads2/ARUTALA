"use client";

import { useEffect, useRef } from "react";

/**
 * CountUp versi React Bits: angka bergulir eased saat masuk viewport,
 * support pemisah ribuan, prefix/suffix, dan durasi. SSR-safe: nilai
 * final sudah ada di HTML (fallback non-JS benar).
 */
type Props = {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  pad?: number;
  className?: string;
};

function group(n: number, decimals: number, pad = 0) {
  const s = n.toLocaleString("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return pad > 0 && s.length < pad ? s.padStart(pad, "0") : s;
}

export default function CountUp({
  to,
  from = 0,
  duration = 1600,
  prefix = "",
  suffix = "",
  decimals = 0,
  pad = 0,
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      (es) => {
        if (!es.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 4);
          el.textContent = `${prefix}${group(from + (to - from) * eased, decimals, pad)}${suffix}`;
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, from, duration, prefix, suffix, decimals, pad]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {group(to, decimals, pad)}
      {suffix}
    </span>
  );
}
