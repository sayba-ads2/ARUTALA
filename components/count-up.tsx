"use client";

import { useEffect, useRef, useState } from "react";

/** Angka yang menghitung naik ketika terlihat. Untuk statistik beranda. */
export default function CountUp({
  to,
  duration = 1400,
  pad = 0,
  suffix = "",
}: {
  to: number;
  duration?: number;
  /** lebar digit nol di depan, mis. 2 -> "04" */
  pad?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(to);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  const shown = pad > 0 ? String(val).padStart(pad, "0") : val.toLocaleString("id-ID");
  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  );
}
