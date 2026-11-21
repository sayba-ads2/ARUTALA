"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Pengelola scroll antar halaman.
 *
 * Default Next.js App Router mengembalikan posisi scroll halaman yang pernah
 * dibuka -- saat berpindah tab nav, pengguna tiba di TENGAH halaman. Aturan
 * di sini: pindah halaman selalu mulai dari atas, kecuali URL membawa anchor
 * (#paket, #anggaran) -- itu digulir halus ke targetnya.
 */
export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        // beri waktu render halaman tujuan selesai
        const t = window.setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 90);
        return () => window.clearTimeout(t);
      }
    }
    // dua frame: pastikan menang atas pemulihan scroll internal Next.
    // 'instant' wajib: html{scroll-behavior:smooth} akan mengubah scrollTo
    // biasa menjadi tarikan scroll panjang dari tengah halaman ke atas.
    let inner = 0;
    const raf = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() =>
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior })
      );
    });
    return () => {
      cancelAnimationFrame(raf);
      if (inner) cancelAnimationFrame(inner);
    };
  }, [pathname]);

  return null;
}
