import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ARUTALA 2027 — PMKM Teknik Lingkungan Untan",
    short_name: "ARUTALA",
    description:
      "Situs publikasi dan dokumentasi PMKM ARUTALA 2027: program kerja, rubrik kabar, arsip lapangan, dan kemitraan sponsor di Desa Batu Lintang, Kapuas Hulu.",
    id: "/",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#0b2342",
    theme_color: "#0b2342",
    lang: "id",
    categories: ["education", "news", "photo", "government"],
    icons: [
      { src: "/img/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/img/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/img/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      {
        name: "Rubrik Kabar",
        short_name: "Kabar",
        description: "Berita dan pengumuman resmi humas",
        url: "/berita",
        icons: [{ src: "/img/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Arsip Lapangan",
        short_name: "Arsip",
        description: "Dokumentasi kegiatan",
        url: "/dokumentasi",
        icons: [{ src: "/img/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Kemitraan Sponsor",
        short_name: "Sponsor",
        description: "Tingkat dukungan dan papan mitra",
        url: "/sponsor",
        icons: [{ src: "/img/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
