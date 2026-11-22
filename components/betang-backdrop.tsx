"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Latar hero "Ekspedisi Malam di Hulu Kapuas".
 *
 * Versi ini menggantikan betang raksasa yang dulu memenuhi seluruh hero dan
 * menyatu dengan teks. Adegan kini disusun berlapis:
 *   langit (bintang berkelip) -> bulan -> bukit jauh -> kabut mengalir ->
 *   rumah betang (kecil, kanan-bawah) -> sungai bergerak -> kunang-kunang.
 *
 * Semua gerak memakai keyframe CSS pada transform/opacity saja (GPU, tanpa
 * reflow) dan seluruhnya mati saat prefers-reduced-motion. Parallax pointer
 * ditulis langsung ke CSS variable agar tidak memicu render React.
 */
export default function BetangBackdrop() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    // Parallax pointer hanya untuk perangkat bermouse. Di layar sentuh listener
    // ini tidak berguna (pointermove ikut terpicu saat menggulir) jadi lebih
    // baik tidak dipasang sama sekali.
    const finePointer = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !finePointer) {
      setDrawn(true);
      return;
    }
    const t = setTimeout(() => setDrawn(true), 220);
    let raf = 0;
    let last = -99;
    const onMove = (e: PointerEvent) => {
      if (raf) return; // maksimal satu update per frame
      raf = requestAnimationFrame(() => {
        raf = 0;
        const vw = window.innerWidth || 1;
        const v = Math.round((e.clientX / vw - 0.5) * 100) / 50; // -1..1, terkuantisasi
        if (Math.abs(v - last) < 0.04) return;
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

  // Posisi tetap (deterministik) supaya tidak berubah setiap render.
  const stars = [
    [96, 62, 1.5], [188, 40, 1.1], [264, 96, 1.7], [352, 54, 1.2], [432, 28, 1.4],
    [512, 78, 1.1], [596, 44, 1.6], [678, 100, 1.2], [742, 34, 1.3], [828, 70, 1.5],
    [904, 46, 1.1], [986, 92, 1.4], [1064, 38, 1.2], [1148, 74, 1.6], [1226, 52, 1.1],
    [1302, 88, 1.3], [1372, 42, 1.4], [1428, 82, 1.2], [58, 128, 1.1], [316, 146, 1.2],
    [610, 152, 1.1], [880, 138, 1.3], [1104, 158, 1.1], [1350, 142, 1.2],
  ] as const;

  const fireflies = [
    [214, 402, 0], [402, 456, 1.6], [612, 392, 3.1], [806, 470, 4.4],
    [1012, 414, 2.2], [1188, 486, 5.3], [1322, 440, 3.8],
  ] as const;

  return (
    <div className={`hero__betang ${drawn ? "is-drawn" : ""}`} aria-hidden="true">
      <svg
        ref={svgRef}
        viewBox="0 0 1440 620"
        preserveAspectRatio="xMidYMax meet"
        style={{ ["--bt" as string]: "0" }}
      >
        <defs>
          <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e2c185" stopOpacity="0.4" />
            <stop offset="55%" stopColor="#c8a464" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#c8a464" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* --- langit: bintang berkelip --- */}
        <g className="hbg hbg--stars">
          {stars.map(([cx, cy, r], i) => (
            <circle
              key={`st${i}`}
              className="star"
              cx={cx}
              cy={cy}
              r={r}
              style={{ animationDelay: `${(i % 7) * 0.55}s`, animationDuration: `${5 + (i % 4)}s` }}
            />
          ))}
        </g>

        {/* --- bulan + pendar --- */}
        <g className="hbg hbg--moon">
          <circle className="moon-glow" cx="1180" cy="118" r="150" fill="url(#moonGlow)" />
          <circle className="moon" cx="1180" cy="118" r="26" />
        </g>

        {/* --- bukit jauh --- */}
        <g className="hbg hbg--far">
          <path d="M-40 246C160 196 330 232 530 204s360-40 560-14 380 26 430 8" />
          <path d="M-40 282C190 238 350 264 550 242s340-24 540-6 360 20 430 8" />
        </g>

        {/* --- kabut mengalir (dua pita, arah berlawanan) --- */}
        <g className="hbg hbg--mist">
          <path className="mist mist--a" d="M-200 300C120 276 420 316 700 292s520-24 760 4 260 10 320 2" />
          <path className="mist mist--b" d="M-200 344C140 322 440 358 720 336s500-20 740 8 280 6 340 0" />
        </g>

        {/* --- rumah betang: diperkecil, ditaruh kanan-bawah --- */}
        {/* Grup luar hanya untuk animasi CSS; grup dalam memegang penempatan
            SVG. Kalau keduanya digabung, properti CSS `transform` akan
            menimpa atribut `transform` dan scale(0.4) hilang -> betang jadi
            raksasa lagi. */}
        <g className="hbg hbg--house">
        <g transform="translate(796 232) scale(0.4)">
          <g className="hbg__roof">
            <path d="M230 320 720 210 1210 320" />
            <path d="M612 246 828 246 840 214 600 214Z" />
            <path d="M230 320C212 310 205 292 211 270" />
            <path d="M1210 320c18-10 25-28 19-50" />
            {[20, 38, 56, 74].map((t) => (
              <line key={`r${t}`} x1={230 + t * 4.4} y1={318 - t} x2={1210 - t * 4.4} y2={318 - t} />
            ))}
          </g>

          <g className="hbg__body">
            <rect x="240" y="320" width="960" height="94" />
            {[380, 480, 580, 680, 780, 880, 980, 1080].map((x) => (
              <line key={`s${x}`} x1={x} y1="320" x2={x} y2="414" />
            ))}
            {[430, 530, 630, 730, 830, 930, 1030, 1130].map((x) => (
              <rect key={`d${x}`} x={x - 9} y="352" width="18" height="62" />
            ))}
            <line x1="240" y1="344" x2="380" y2="344" />
            {[252, 266, 280, 294, 308, 322, 336, 350, 364].map((x) => (
              <line key={`b${x}`} x1={x} y1="344" x2={x} y2="414" />
            ))}
          </g>

          <path className="hbg__stair" d="M240 414H228v18h-12v18H204v18h-12v18h-12v18h-12v18" />

          <g className="hbg__poles">
            {[258, 378, 498, 618, 738, 858, 978, 1098, 1188].map((x) => (
              <line key={x} x1={x} y1="414" x2={x} y2="522" />
            ))}
            <line x1="258" y1="468" x2="1188" y2="468" />
          </g>
        </g>
        </g>

        {/* --- sungai Kapuas: tiga garis bergerak --- */}
        <g className="hbg hbg--water">
          {/* path dilebihkan ~130px di kedua sisi: animasi menggeser garis,
              jadi ujungnya tidak boleh masuk ke area terlihat */}
          <path className="wave wave--1" d="M-170 524C140 512 400 538 670 524s430-18 660-4 260 10 330 6 200-8 240-4" />
          <path className="wave wave--2" d="M-170 552C170 542 440 566 710 552s440-14 630-2 230 8 300 4 190-6 220-2" />
          <path className="wave wave--3" d="M-170 582C150 574 430 596 700 584s450-12 620-4 240 6 310 2 180-4 210 0" />
        </g>

        {/* --- kunang-kunang --- */}
        <g className="hbg hbg--flies">
          {fireflies.map(([cx, cy, d], i) => (
            <circle
              key={`fl${i}`}
              className="firefly"
              cx={cx}
              cy={cy}
              r={i % 3 === 0 ? 2.6 : 2}
              style={{ animationDelay: `${d}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
