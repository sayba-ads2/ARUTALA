"use client";

import { useEffect, useRef } from "react";

/**
 * SplitText ala React Bits: teks dipecah per kata, tiap kata naik
 * bergantian (stagger). SSR-safe: teks utuh ikut ter-render di HTML,
 * animasi hanya menghias setelah mount (CLS kecil ~1-2px, tak buta JS).
 */
type Props = {
  text: string;
  as?: React.ElementType;
  className?: string;
  delay?: number; // ms antar kata
  duration?: number; // ms per kata
};

export default function SplitText({
  text,
  as = "span",
  className = "",
  delay = 55,
  duration = 720,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    words.forEach((wd, i) => {
      wd.style.setProperty("--sb-d", `${i * delay}ms`);
      wd.style.setProperty("--sb-t", `${duration}ms`);
    });
    // trigger: hapus state awal lalu tambah .is-on
    requestAnimationFrame(() => el.classList.add("is-on"));
  }, [delay, duration]);

  const Tag = as as any;
  return (
    <Tag ref={ref as never} className={`rb-split ${className}`}>
      {text.split(" ").map((wd, i) => (
        <span key={i} data-word className="rb-split__w">
          {wd}
          {" "}
        </span>
      ))}
    </Tag>
  );
}
