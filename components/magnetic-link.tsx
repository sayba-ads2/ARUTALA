"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/** Tombol magnet: bergeser sedikit mengikuti kursor, lalu lepas.
 *  Dinonaktifkan otomatis bila pengguna meminta motion dikurangi. */
export default function MagneticLink({
  href,
  className = "btn btn--ghost btn--sm",
  strength = 0.22,
  children,
}: {
  href: string;
  className?: string;
  strength?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * strength;
      const dy = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const leave = () => {
      el.style.transform = "translate(0, 0)";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <Link ref={ref} href={href} className={`magnet ${className}`.trim()}>
      {children}
    </Link>
  );
}
