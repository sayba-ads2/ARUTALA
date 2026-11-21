import Link from "next/link";
import PageHead from "@/components/page-head";
import TenunBand from "@/components/tenun-band";
import { NewsCard, CategoryFilter } from "@/components/news";
import { listBerita } from "@/lib/repo";
import { formatDate } from "@/lib/format";
import { site } from "@/lib/content";

export const revalidate = 60;

export const metadata = {
  title: "Berita & Kabar Terkini",
  description:
    "Kabar resmi PMKM ARUTALA 2027: persiapan, kegiatan lapangan, pasca-kegiatan, kemitraan. Ditulis oleh Divisi Humas Teknik Lingkungan Untan.",
  alternates: { canonical: "/berita" },
};

export default async function BeritaPage() {
  const all = await listBerita();
  const sorted = [...all].sort((a, b) => (a.tanggal < b.tanggal ? 1 : -1));
  const hero = sorted.find((b) => b.unggulan) ?? sorted[0];
  const rest = sorted.filter((b) => b.slug !== hero?.slug);
  const isSeed = hero?.id.startsWith("seed-");

  return (
    <>
      <PageHead
        eyebrow="Ruang kabar"
        title="Berita dari hulu Kapuas, ditulis langsung panitia."
        lede={`Kabar persiapan, catatan lapangan, dan pengumuman resmi ARUTALA 2027. Sumber tunggal pengumuman: kanal ${site.shortOrganizer} yang tercantum di halaman Tautan.`}
      />

      <section className="section section--tight">
        <div className="wrap">
          {hero ? (
            <div className="news-hero">
              <NewsCard item={{ ...hero, tanggal: formatDate(hero.tanggal) }} big />
              <aside className="card aside-rubrik">
                <p className="eyebrow" style={{ margin: 0 }}>Tentang rubrik ini</p>
                <p style={{ margin: 0, color: "var(--ink-soft)" }}>
                  Berita ditulis oleh Divisi Humas dan dapat langsung ditayangkan lewat panel admin,
                  tanpa perlu menyentuh kode. Kategori: Kabar, Lapangan, Pasca, Kemitraan.
                </p>
                <p className="small muted" style={{ margin: 0 }}>
                  {isSeed
                    ? "Edisi ini memuat berita awal dari dokumen perencanaan. Catatan lapangan harian menyusul setelah tim tiba di Sungai Utik."
                    : `Memuat ${all.length} kabar terbit dari redaksi.`}
                </p>
                {rest.length > 0 && (
                  <>
                    <p className="eyebrow" style={{ margin: "0.3rem 0 0" }}>Kabar lain</p>
                    <ul>
                      {rest.slice(0, 3).map((b) => (
                        <li key={b.slug}>
                          <Link href={`/berita/${b.slug}`} className="textlink">
                            {b.judul}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <Link href="/links" className="textlink" style={{ marginTop: "0.4rem" }}>
                  Cek kanal resmi panitia
                </Link>
              </aside>
            </div>
          ) : null}

          <CategoryFilter
            items={rest.map((b) => ({ ...b, tanggal: formatDate(b.tanggal) }))}
          />

          <div style={{ marginTop: "2.4rem", textAlign: "center" }}>
            <Link href="/dokumentasi" className="textlink">
              Lihat juga logbook 15 hari dan galeri dokumentasi
            </Link>
          </div>
        </div>
      </section>
      <TenunBand />
    </>
  );
}
