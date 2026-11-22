"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * RevealDriver — satu-satunya penggerak animasi muncul untuk atribut
 * [data-reveal] DAN kelas .reveal.
 *
 * Kenapa komponen ini ada: sebelumnya skrip reveal ditanam sekali di <body>
 * lewat dangerouslySetInnerHTML. Skrip itu hanya dieksekusi saat dokumen
 * dimuat, jadi ketika pengguna berpindah halaman lewat klien (App Router)
 * lalu kembali ke beranda, elemen baru tidak pernah mendapat .is-in dan
 * tertinggal pada opacity:0 — judul hero serta kartu-kartu tampak hilang.
 *
 * Driver ini men-scan ulang setiap kali pathname berubah, mengamati elemen
 * dengan IntersectionObserver, dan punya jaring aman berbasis waktu +
 * MutationObserver untuk konten yang muncul belakangan (filter berita,
 * daftar program, dsb.).
 */
export default function RevealDriver() {
  const pathname = usePathname();

  useEffect(() => {
    const REVEAL_SEL = "[data-reveal], .reveal";
    const done = new WeakSet<Element>();
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const show = (el: Element) => {
      if (el.classList.contains("is-in") && el.classList.contains("reveal--in")) return;
      el.classList.add("is-in");
      el.classList.add("reveal--in");
    };

    const pending = () => Array.from(document.querySelectorAll(REVEAL_SEL)).filter((el) => !done.has(el));

    if (reduce || !("IntersectionObserver" in window)) {
      document.querySelectorAll(REVEAL_SEL).forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );

    const attach = () => {
      for (const el of pending()) {
        done.add(el);
        // elemen yang sudah lama terlihat (mis. di atas lipatan) langsung tampil
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 1.02 && r.bottom > -40) {
          show(el);
        } else {
          io.observe(el);
        }
      }
    };

    attach();

    // 1) konten dinamis (filter, "muat lagi", dsb.)
    const mo = new MutationObserver(() => attach());
    mo.observe(document.body, { childList: true, subtree: true });

    // 2) Jaring aman: hanya untuk elemen yang SUDAH dekat layar. Elemen jauh
    //    dibiarkan menunggu IntersectionObserver supaya animasi fade-nya tetap
    //    terlihat saat pengguna menggulir (bukan sudah tampil sejak awal).
    const safety = window.setTimeout(() => {
      const limit = window.innerHeight * 1.5;
      document.querySelectorAll(REVEAL_SEL).forEach((el) => {
        if (el.classList.contains("is-in")) return;
        const r = el.getBoundingClientRect();
        if (r.top < limit) show(el);
      });
    }, 1200);

    // 3) kalau pengguna scroll cepat / anchor lompat, pastikan ikut tampil
    const onScroll = () => {
      for (const el of document.querySelectorAll(REVEAL_SEL)) {
        if (el.classList.contains("is-in")) continue;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.98 && r.bottom > 0) show(el);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearTimeout(safety);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
