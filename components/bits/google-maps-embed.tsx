"use client";

import { useMemo, useState } from "react";

/**
 * GoogleMapsEmbed ala React Bits "image + shimmer": iframe Google Maps
 * baru dimuat setelah pengguna menyentuh/klik zona peta (hemat bytes &
 * consent-friendly). Sebelum aktif: peta stylised dengan koordinat
 * asli (denah proposal) + tombol play. Setelah aktif: iframe resmi
 * Google Maps (q=coordinates, tanpa API key).
 */
type Props = {
  lat: number;
  lng: number;
  zoom?: number;
  title: string;
  className?: string;
  poster?: string;
  posterAlt?: string;
  caption?: string;
};

export default function GoogleMapsEmbed({
  lat,
  lng,
  zoom = 13,
  title,
  className = "",
  poster,
  posterAlt = "",
  caption,
}: Props) {
  const [active, setActive] = useState(false);

  const src = useMemo(
    () =>
      `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed&hl=id`,
    [lat, lng, zoom],
  );
  const link = useMemo(
    () => `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
    [lat, lng],
  );

  return (
    <div
      className={`gme ${active ? "gme--live" : ""} ${className}`}
    >
      {!active ? (
        <button
          type="button"
          className="gme__cover"
          onClick={() => setActive(true)}
          aria-label={`Muat peta Google Maps: ${title}`}
        >
          {poster ? (
            <img src={poster} alt={posterAlt} loading="lazy" />
          ) : (
            <span className="gme__grid" aria-hidden="true" />
          )}
          <span className="gme__badge">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.7" />
            </svg>
            <span>Muat Google Maps</span>
          </span>
          <span className="gme__coords mono">
            {lat.toFixed(5)}, {lng.toFixed(5)}
          </span>
        </button>
      ) : (
        <iframe
          title={title}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      )}
      <div className="gme__foot">
        <span className="small muted">
          {active
            ? `Peta Google Maps aktif — ${title}`
            : caption ?? "Klik untuk memuat peta Google Maps interaktif."}
        </span>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--ghost btn--sm"
        >
          Buka Google Maps
        </a>
      </div>
    </div>
  );
}
