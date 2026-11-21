"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Carousel ala React Bits: geser (touch/pointer), panah, titik,
 * autoplay pause-on-hover, keyboard. Tanpa library.
 */
export type Slide = {
  src: string;
  srcSm?: string;
  alt: string;
  caption?: string;
  tag?: string;
  fit?: "cover" | "contain";
};

type Props = {
  slides: Slide[];
  autoplayMs?: number;
  className?: string;
};

export default function Carousel({ slides, autoplayMs = 5200, className = "" }: Props) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const n = slides.length;
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const go = useCallback(
    (next: number) => setI(((next % n) + n) % n),
    [n],
  );

  useEffect(() => {
    if (paused || reduce || autoplayMs <= 0 || n < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), autoplayMs);
    return () => clearInterval(t);
  }, [paused, reduce, autoplayMs, n]);

  // drag/swipe: scroll-snap native di mobile; desktop pakai pointer drag
  const drag = useRef<{ x0: number; moved: boolean } | null>(null);
  const onDown = (e: React.PointerEvent) => {
    drag.current = { x0: e.clientX, moved: false };
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x0;
    if (Math.abs(dx) > 12) drag.current.moved = true;
  };
  const onUp = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x0;
    if (drag.current.moved && Math.abs(dx) > 60) go(i + (dx < 0 ? 1 : -1));
    drag.current = null;
  };

  return (
    <div
      className={`rb-carousel ${className}`}
      role="group"
      aria-roledescription="carousel"
      aria-label="Galeri dokumentasi"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(i + 1);
        if (e.key === "ArrowLeft") go(i - 1);
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="rb-carousel__viewport"
        ref={trackRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={() => (drag.current = null)}
      >
        {slides.map((s, idx) => (
          <figure
            key={s.src + idx}
            className="rb-carousel__slide"
            aria-hidden={idx !== i}
            data-active={idx === i ? "1" : undefined}
            style={{ ["--rb-ci" as string]: String(idx - i), ["--rb-cia" as string]: String(Math.abs(idx - i)) }}
          >
            <img
              data-fit={s.fit ?? "cover"}
              src={s.srcSm ?? s.src}
              srcSet={s.srcSm ? `${s.srcSm} 640w, ${s.src} 1280w` : undefined}
              sizes="(max-width: 760px) 92vw, 720px"
              alt={s.alt}
              draggable={false}
              loading={idx === 0 ? "eager" : "lazy"}
            />
            {(s.caption || s.tag) && (
              <figcaption className="rb-carousel__cap">
                {s.tag && <span className="rb-carousel__tag mono">{s.tag}</span>}
                {s.caption && <span>{s.caption}</span>}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {n > 1 && (
        <>
          <button
            type="button"
            className="rb-carousel__nav rb-carousel__nav--prev"
            onClick={() => go(i - 1)}
            aria-label="Foto sebelumnya"
          >
            ‹
          </button>
          <button
            type="button"
            className="rb-carousel__nav rb-carousel__nav--next"
            onClick={() => go(i + 1)}
            aria-label="Foto berikutnya"
          >
            ›
          </button>
          <div className="rb-carousel__dots" role="tablist" aria-label="Pilih foto">
            {slides.map((s, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={idx === i}
                aria-label={`Foto ${idx + 1}`}
                className="rb-carousel__dot"
                data-on={idx === i ? "1" : undefined}
                onClick={() => go(idx)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
