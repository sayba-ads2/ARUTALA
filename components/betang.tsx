"use client";

import { useEffect, useRef, useState } from "react";

// Ilustrasi rumah betang (rumah panjang Dayak) dalam garis, mengacu
// denah dan foto pada lampiran proposal: panggung tiang, atap pelana
// menjuntai, ruang komunal beranda, dan deret bilik keluarga.
// Garis digambar ulang (draw-in) saat masuk viewport; tiang ikut
// bergeser paralaks halus mengikuti pointer.

type Props = { className?: string };

export default function BetangIllustration({ className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) { setInView(true); io.disconnect(); }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (ev: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width - 0.5;
      const py = (ev.clientY - r.top) / r.height - 0.5;
      setTilt({ x: px, y: py });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const roof = [];
  // atap pelana: garis-garis sejajar membentang rata dalam trapesium atap
  for (let i = 1; i <= 5; i++) {
    const t = i / 6;
    roof.push(
      <line key={`r${i}`} x1={190 - t * 66} y1={92 + t * 58} x2={830 + t * 66} y2={92 + t * 58} />,
    );
  }

  return (
    <div
      ref={ref}
      className={`betang ${className} ${inView ? "is-drawn" : ""}`}
      style={{ ["--bx" as string]: tilt.x, ["--by" as string]: tilt.y }}
    >
      <svg viewBox="0 0 1100 320" role="img" aria-label="Ilustrasi garis rumah betang: rumah panjang panggung dengan atap pelana, beranda komunal, dan deret bilik">
        {/* siluet bukit + jalur sungai di latar */}
        <g className="betang__back">
          {/* bukit jauh: hanya di atas bubungan, tidak menembus rumah */}
          <path d="M-20 66C120 30 230 54 350 36s260-26 380-9 250 26 390 8" />
          <path d="M-20 84C140 48 250 70 390 52s280-20 400-5 250 18 350 6" opacity=".55" />
          <path className="betang__river" d="M-20 292C160 276 280 304 440 292s300-26 420-4 260 18 280 2" />
          <path d="M-20 306C180 292 300 316 470 306s330-22 450-2 240 12 240 12" opacity=".45" />
        </g>

        <g className="betang__house">
          {/* tiang-tiang panggung (sekali pun baruh) */}
          <g className="betang__poles">
            {[150, 250, 350, 450, 550, 650, 750, 850, 950].map((x) => (
              <line key={x} x1={x} y1={212} x2={x} y2={284} />
            ))}
            <line x1={130} y1={212} x2={970} y2={212} />
          </g>

          {/* badan rumah: beranda di kiri (tamu), deret bilik di kanan */}
          <g className="betang__body">
            <rect x={140} y={150} width={830} height={62} />
            {/* sekat bilik */}
            {[300, 400, 500, 600, 700, 800, 900].map((x) => (
              <line key={x} x1={x} y1={150} x2={x} y2={212} />
            ))}
            {/* pintu bilik */}
            {[200, 350, 450, 550, 650, 750, 850].map((x) => (
              <rect key={`d${x}`} x={x - 7} y={178} width={14} height={34} />
            ))}
            {/* tangga naik ke beranda */}
            <path d="M118 272 140 212M104 272h28M112 244h22" />
          </g>

          {/* atap pelana menjuntai, ujung melengkung khas betang */}
          <g className="betang__roof">
            <path d="M120 152 190 92h640l70 60" />
            <path d="M120 152c-16-8-22-22-18-38M900 152c16-8 22-22 18-38" />
            <path d="M206 92 214 66h478l8 26" />
            {roof}
          </g>

          {/* stik motif stilt "tongkat" di bawah beranda */}
          <g className="betang__detail">
            <path d="M150 212v-8m20 8v-8m20 8v-8" />
            <circle cx={232} cy={134} r={5} />
          </g>
        </g>
      </svg>
      <span className="betang__label mono" aria-hidden="true">
        Rumah Betang · Dusun Sungai Utik
      </span>
    </div>
  );
}
