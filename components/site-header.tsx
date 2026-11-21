"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/content";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const lastY = useRef(0);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Kapsul melayang: padat saat scroll, tersembunyi saat scroll turun,
  // muncul lagi saat naik (ala Sayba Arc).
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 240 && y > lastY.current + 4 && !open);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${hidden ? " is-hidden" : ""}`}>
      <div className="wrap">
        <nav className="nav" aria-label="Navigasi utama">
          <Link href="/" className="brand" aria-label={`${site.name} ${site.year}, beranda`}>
            <img className="brand__logo" src="/img/logo-arutala-alpha.png" alt="Logo ARUTALA" width={44} height={44} />
            <span>Arutala</span>
            <span className="brand__year">{site.year}</span>
          </Link>

          <div className="nav-links">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            <Link href="/links" className="btn btn--ghost btn--sm">
              Tautan resmi
            </Link>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav-panel"
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
            {open ? "Tutup" : "Menu"}
          </button>
        </nav>
      </div>

      <div
        className="nav-backdrop"
        style={{ display: open ? "block" : "none" }}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div id="nav-panel" className="nav-panel" data-open={open} ref={panelRef}>
        {nav.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
            <span className="mono">0{nav.indexOf(item) + 1}</span>
          </Link>
        ))}
        <Link href="/links" onClick={() => setOpen(false)}>
          Tautan resmi
          <span className="mono">IG / TikTok</span>
        </Link>
        <Link href="/sponsor" className="btn btn--primary" onClick={() => setOpen(false)}>
          Halaman sponsor
        </Link>
      </div>
    </header>
  );
}
