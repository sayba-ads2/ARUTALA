"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Bilah atas khusus panel admin.
 *
 * Panel admin berada di grup rute (panel) yang TIDAK memakai kerangka situs
 * publik -- jadi navbar kapsul dan footer tidak lagi menimpa panel. Sebagai
 * gantinya, bilah ini memberi identitas panel, jalan cepat ke situs, dan
 * tombol keluar yang selalu terlihat.
 */
export default function AdminTopbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logout = async () => {
    setBusy(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.replace("/admin/login");
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <header className={`panel-bar${scrolled ? " is-scrolled" : ""}`}>
      <div className="panel-bar__inner">
        <Link href="/admin" className="panel-bar__brand" aria-current={pathname === "/admin" ? "page" : undefined}>
          <span className="panel-bar__mark" aria-hidden="true" />
          <span>
            <b>ARUTALA</b>
            <small>Panel pengelola konten</small>
          </span>
        </Link>

        <div className="panel-bar__actions">
          <Link href="/" target="_blank" rel="noopener noreferrer" className="panel-bar__link">
            Lihat situs
          </Link>
          <button type="button" className="panel-bar__btn" onClick={logout} disabled={busy}>
            {busy ? "Keluar..." : "Keluar"}
          </button>
        </div>
      </div>
    </header>
  );
}
