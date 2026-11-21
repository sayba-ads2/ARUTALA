"use client";

import { useEffect, useRef, useState } from "react";

/** Mengungkap elemen saat masuk viewport. Sekali jalan, tidak berulang.
 *  Menghormati prefers-reduced-motion: langsung tampil tanpa animasi. */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "span";
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    io.observe(el);
    const fb = setTimeout(() => setShown(true), 1600);
    return () => {
      clearTimeout(fb);
      io.disconnect();
    };
  }, []);

  const Comp = Tag as React.ElementType;
  return (
    <Comp
      ref={ref as never}
      className={`reveal ${shown ? "reveal--in" : ""} ${className}`.trim()}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Comp>
  );
}
