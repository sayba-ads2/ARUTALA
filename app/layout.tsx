import type React from "react";
import type { Metadata, Viewport } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import SiteAmbience from "@/components/site-ambience";
import Gestures from "@/components/gestures";
import ClickSpark from "@/components/bits/click-spark";
import { site } from "@/lib/content";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0b2342",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arutala.web.id";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ARUTALA 2027 · PMKM Teknik Lingkungan Untan",
    template: "%s · ARUTALA 2027",
  },
  description:
    "Situs publikasi dan dokumentasi PMKM ARUTALA 2027, Menjejak Bakti Menjaga Lestari. Empat program kerja Teknik Lingkungan Universitas Tanjungpura bersama 38 mahasiswa di Desa Batu Lintang, Kapuas Hulu, 7 sampai 21 Januari 2027.",
  keywords: [
    "ARUTALA 2027",
    "PMKM Teknik Lingkungan",
    "Universitas Tanjungpura",
    "Desa Batu Lintang",
    "Sungai Utik",
    "Kapuas Hulu",
    "pengabdian masyarakat",
  ],
  authors: [{ name: site.organizer }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "ARUTALA 2027",
    title: "ARUTALA 2027 · Menjejak Bakti, Menjaga Lestari",
    description:
      "Publikasi dan dokumentasi PMKM ARUTALA 2027: empat program kerja, 38 mahasiswa, 15 hari di Desa Batu Lintang, Kapuas Hulu. Rubrik kabar, arsip lapangan, dan kemitraan sponsor.",
    images: [
      {
        url: "/img/og-arutala.jpg",
        width: 1200,
        height: 630,
        alt: "Lambang ARUTALA 2027 di atas latar biru dongkel dengan aksen emas: Menjejak Bakti, Menjaga Lestari.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARUTALA 2027 · Menjejak Bakti, Menjaga Lestari",
    description:
      "Publikasi dan dokumentasi PMKM Teknik Lingkungan Universitas Tanjungpura di Desa Batu Lintang, Kapuas Hulu, 7 sampai 21 Januari 2027.",
    images: ["/img/og-arutala.jpg"],
  },
  icons: { icon: ["/favicon.ico"], apple: "/apple-icon.png" },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/",
    types: { rss: "/rss.xml" },
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.organizer,
  alternateName: `ARUTALA ${site.year}`,
  url: siteUrl,
  logo: `${siteUrl}/img/logo-arutala-kotak.png`,
  description:
    "Program Pengabdian Mahasiswa Kepada Masyarakat Jurusan Teknik Lingkungan, Fakultas Teknik, Universitas Tanjungpura.",
};

const webSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `ARUTALA ${site.year}`,
  url: siteUrl,
  description:
    "Situs publikasi dan dokumentasi PMKM ARUTALA 2027: program kerja, rubrik kabar, arsip lapangan, dan kemitraan sponsor.",
  inLanguage: "id-ID",
  publisher: { "@id": `${siteUrl}/#organization` },
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "PMKM ARUTALA 2027",
  startDate: site.dates.start,
  endDate: site.dates.end,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  description:
    "Pengabdian Mahasiswa Kepada Masyarakat Jurusan Teknik Lingkungan Universitas Tanjungpura di Desa Batu Lintang, Kapuas Hulu.",
  location: {
    "@type": "Place",
    name: `${site.hamlet}, ${site.village}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.district,
      addressRegion: site.province,
      addressCountry: "ID",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.coords.lat, longitude: site.coords.lng },
  },
  organizer: {
    "@type": "Organization",
    name: site.organizer,
    url: siteUrl,
    logo: `${siteUrl}/img/logo-arutala-kotak.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.regency,
      addressRegion: site.province,
      addressCountry: "ID",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preload" href="/fonts/fraunces-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/jakarta-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('has-js');`,
          }}
        />
      </head>
      <body>
        <a href="#isi" className="sr-only">
          Lompat ke konten utama
        </a>
        <SiteAmbience />
        <Gestures />
        <ClickSpark />
        <SiteHeader />
        <main id="isi">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              { ...orgSchema, "@id": `${siteUrl}/#organization` },
              webSchema,
              { ...eventSchema, organizer: { "@id": `${siteUrl}/#organization` } },
            ]),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(!('IntersectionObserver' in window))return;var els=document.querySelectorAll('[data-reveal]');if(!els.length)return;var io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('is-in');io.unobserve(en.target);}});},{rootMargin:'0px 0px -8% 0px'});els.forEach(function(el){io.observe(el);});})();`,
          }}
        />
      </body>
    </html>
  );
}
