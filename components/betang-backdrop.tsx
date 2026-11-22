"use client";

import { useEffect, useRef, useState } from "react";

// Latar hero: rumah betang garis penuh (panoramik), mengacu denah &
// foto lampiran proposal. viewBox tetap + slice => tidak gepeng saat
// viewport berubah. Digambar sekali saat mount (stroke draw-in),
// paralaks pointer sangat halus, mati saat prefers-reduced-motion.

export default function BetangBackdrop() {
  const [drawn, setDrawn] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const t = setTimeout(() => setDrawn(true), 260);
    // OPTIMASI: tilt pointer ditulis langsung ke CSS variable (bukan setState),
    // jadi tidak ada re-render React per frame; transform GPU tetap halus.
    let raf = 0;
    let last = -1;
    const onMove = (e: PointerEvent) => {
      if (raf) return; // batasi 1 update/frame
      raf = requestAnimationFrame(() => {
        raf = 0;
        const vw = window.innerWidth || 1;
        const v = Math.round((e.clientX / vw - 0.5) * 100) / 50; // -1..1, kuantisasi
        if (v === last) return;
        last = v;
        svgRef.current?.style.setProperty("--bt", v.toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const poles = [258, 378, 498, 618, 738, 858, 978, 1098, 1188];
  const rooms = [380, 480, 580, 680, 780, 880, 980, 1080];
  const doors = [430, 530, 630, 730, 830, 930, 1030, 1130];

  return (
    <div className={`hero__betang ${drawn ? "is-drawn" : ""}`} aria-hidden="true">
      <svg
        ref={svgRef}
        viewBox="0 0 1440 620"
        preserveAspectRatio="xMidYMax slice"
        style={{ ["--bt" as string]: "0" }}
      >
        {/* bukit jauh */}
        <g className="hbg hbg--far">
          <path d="M-40 205C160 148 330 190 530 158s360-42 560-12 380 30 430 10" />
          <path d="M-40 238C190 188 350 220 550 196s340-26 540-6 360 22 430 8" />
        </g>

        {/* rumah + tiang, bergeser halus mengikuti pointer */}
        <g className="hbg hbg--house">
          <g className="hbg__roof">
            {/* pelana tunggal: kiri (230,320) -> puncak (720,210) -> kanan (1210,320) */}
            <path d="M230 320 720 210 1210 320" />
            {/* bubungan */}
            <path d="M612 246 828 246 840 214 600 214Z" />
            {/* tanduk kiri & kanan */}
            <path d="M230 320C212 310 205 292 211 270" />
            <path d="M1210 320c18-10 25-28 19-50" />
            {/* deret reng dekat tepi atap (sejajar bidang atap) */}
            {[20, 38, 56, 74].map((t) => (
              <line
                key={`r${t}`}
                x1={230 + t * 4.4}
                y1={318 - t}
                x2={1210 - t * 4.4}
                y2={318 - t}
              />
            ))}
          </g>

          {/* badan rumah */}
          <g className="hbg__body">
            <rect x="240" y="320" width="960" height="94" />
            {rooms.map((x) => (
              <line key={`s${x}`} x1={x} y1="320" x2={x} y2="414" />
            ))}
            {doors.map((x) => (
              <rect key={`d${x}`} x={x - 9} y="352" width="18" height="62" />
            ))}
            {/* pagar beranda kiri */}
            <line x1="240" y1="344" x2="380" y2="344" />
            {[252, 266, 280, 294, 308, 322, 336, 350, 364].map((x) => (
              <line key={`b${x}`} x1={x} y1="344" x2={x} y2="414" />
            ))}
          </g>

          {/* tangga zig-zag dari beranda ke tanah */}
          <path
            className="hbg__stair"
            d="M240 414H228v18h-12v18H204v18h-12v18h-12v18h-12v18"
          />

          {/* tiang panggung sampai air */}
          <g className="hbg__poles">
            {poles.map((x) => (
              <line key={x} x1={x} y1="414" x2={x} y2="522" />
            ))}
            <line x1="258" y1="468" x2="1188" y2="468" />
          </g>
        </g>

        {/* Kapuas: dua garis gelombang */}
        <g className="hbg hbg--water">
          <path d="M-40 524C210 512 430 538 670 524s430-18 660-4 160 10 190 6" />
          <path d="M-40 552C240 542 470 566 710 552s440-14 630-2 130 8 170 4" />
        </g>
      </svg>
    </div>
  );
}
