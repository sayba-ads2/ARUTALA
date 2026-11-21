"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { rupiah } from "@/lib/format";

export type NewsCardData = {
  slug: string;
  judul: string;
  ringkasan: string;
  kategori: string;
  tanggal: string;
  gambar_url: string | null;
  penulis: string | null;
};

export function NewsCard({ item, big = false }: { item: NewsCardData; big?: boolean }) {
  return (
    <Link href={`/berita/${item.slug}`} className={`news-card${big ? " news-card--big" : ""}`}>
      <div className="news-card__media">
        {item.gambar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.gambar_url} alt={item.judul} loading="lazy" />
        ) : (
          <div aria-hidden="true" className="news-card__ph">
            <span>foto menyusul</span>
          </div>
        )}
      </div>
      <div className="news-card__body">
        <p className="news-card__meta">
          <span className="news-card__kicker">{item.kategori}</span>
          <time>{item.tanggal}</time>
        </p>
        <h3 className="news-card__title">{item.judul}</h3>
        <p className="news-card__lead">{item.ringkasan}</p>
        <span className="news-card__more">
          Baca kabar
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 12h15m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

/** Pencahan ringan: baris kosong = paragraf, "## " = subjudul, "> " = kutipan. */
export function NewsBody({ teks }: { teks: string }) {
  const blocks = teks.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return (
    <>
      {blocks.map((b, i) => {
        // heading: baris pertama saja yang jadi judul, sisanya paragraf terpisah
        if (b.startsWith("## ")) {
          const nl = b.indexOf("\n");
          if (nl === -1) return <h2 key={i}>{b.slice(3)}</h2>;
          return (
            <div key={i}>
              <h2>{b.slice(3, nl)}</h2>
              <p>{b.slice(nl + 1).replace(/\n/g, " ")}</p>
            </div>
          );
        }
        if (b.startsWith("> ")) {
          const body = b.split("\n").map((l) => l.replace(/^>\s?/, "")).join(" ");
          return <blockquote key={i}>{body}</blockquote>;
        }
        return <p key={i}>{b.replace(/\n/g, " ")}</p>;
      })}
    </>
  );
}

export function CategoryFilter({ items }: { items: NewsCardData[] }) {
  const [cat, setCat] = useState("Semua");
  const cats = ["Semua", ...Array.from(new Set(items.map((i) => i.kategori)))];
  const [shown, setShown] = useState(items.slice(0, 9));
  const [cursor, setCursor] = useState(9);

  useEffect(() => {
    setShown(items.filter((i) => cat === "Semua" || i.kategori === cat).slice(0, 9));
    setCursor(9);
  }, [cat, items]);

  const sisa = items.filter((i) => cat === "Semua" || i.kategori === cat).length - shown.length;

  return (
    <>
      <div className="chips" role="group" aria-label="Saring kategori berita">
        {cats.map((c) => (
          <button key={c} type="button" className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>
      {shown.length === 0 ? (
        <div className="empty">
          <h3>Belum ada berita di kategori ini</h3>
          <p>Kabar baru ditulis langsung oleh Divisi Humas dan muncul otomatis di sini.</p>
        </div>
      ) : (
        <>
          <div className="news-grid">
            {shown.map((n) => (
              <NewsCard key={n.slug} item={n} />
            ))}
          </div>
          {sisa > 0 && (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => {
                  const next = items.filter((i) => cat === "Semua" || i.kategori === cat).slice(0, cursor + 6);
                  setShown(next);
                  setCursor(cursor + 6);
                }}
              >
                Muat kabar berikutnya ({sisa} lagi)
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export function ReadingProgress() {
  useEffect(() => {
    const bar = document.getElementById("read-progress");
    if (!bar) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        bar.style.setProperty("--rp", (max > 0 ? h.scrollTop / max : 0).toFixed(4));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return <div id="read-progress" className="read-progress" aria-hidden="true" />;
}

export { rupiah };
export { estimateMinutes } from "@/lib/format";
