import type React from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import SiteAmbience from "@/components/site-ambience";
import ScrollManager from "@/components/scroll-manager";
import RevealDriver from "@/components/reveal-driver";
import Gestures from "@/components/gestures";
import ClickSpark from "@/components/bits/click-spark";

/**
 * Kerangka halaman publik: navbar kapsul, footer, dan seluruh lapisan
 * suasana/pengelola scroll. Dipakai oleh layout grup (site) dan juga oleh
 * halaman 404 tingkat akar supaya navigasi tetap konsisten.
 * Panel admin TIDAK memakai komponen ini -- panel punya kerangka sendiri.
 */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#isi" className="sr-only">
        Lompat ke konten utama
      </a>
      <SiteAmbience />
      <ScrollManager />
      <RevealDriver />
      <Gestures />
      <ClickSpark />
      <SiteHeader />
      <main id="isi">{children}</main>
      <SiteFooter />
    </>
  );
}
