"use client";

import { useEffect, useMemo, useRef } from "react";

/**
 * GoogleMapsEmbed — iframe Google Maps yang langsung tampil, mode satelit.
 *
 * Sebelumnya peta disembunyikan di balik tombol "Muat Google Maps" sehingga
 * pengguna hanya melihat gambar denah proposal. Sekarang iframe resmi Google
 * Maps dipasang segera dengan basemap satelit (t=k). Pemuatan ditunda sampai
 * elemen mendekati layar supaya tidak memperlambat halaman, tetapi tidak ada
 * lagi klik yang dibutuhkan untuk melihat lokasi.
 */
type Props = {
  lat: number;
  lng: number;
  zoom?: number;
  title: string;
  className?: string;
  caption?: string;
};

export default function GoogleMapsEmbed({
  lat,
  lng,
  zoom = 14,
  title,
  className = "",
  caption,
}: Props) {
  const boxRef = useRef<HTMLDivElement>(null);

  // t=k -> citra satelit, z -> zoom, hl=id -> label bahasa Indonesia
  const src = useMemo(
    () => `https://maps.google.com/maps?q=${lat},${lng}&t=k&z=${zoom}&hl=id&output=embed`,
    [lat, lng, zoom],
  );
  const link = useMemo(
    () => `https://www.google.com/maps/@${lat},${lng},${zoom}z/data=!3m1!1e3`,
    [lat, lng, zoom],
  );

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const iframe = el.querySelector("iframe");
    if (!iframe || iframe.getAttribute("src")) return;
    const load = () => iframe.setAttribute("src", src);
    if (!("IntersectionObserver" in window)) {
      load();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          load();
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  return (
    <div className={`gme gme--live ${className}`} ref={boxRef}>
      <iframe title={title} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      <div className="gme__foot">
        <span className="small muted">
          {caption ?? `Citra satelit \u00b7 ${lat.toFixed(5)}, ${lng.toFixed(5)}`}
        </span>
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm">
          Buka Google Maps
        </a>
      </div>
    </div>
  );
}
