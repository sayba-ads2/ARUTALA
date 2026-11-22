import Link from "next/link";
import PageHead from "@/components/page-head";
import DayTimeline from "@/components/day-timeline";
import TenunBand from "@/components/tenun-band";
import Carousel, { type Slide } from "@/components/bits/carousel";
import Reveal from "@/components/reveal";
import { rundown, site } from "@/lib/content";
import { listDokumentasi } from "@/lib/repo";
import { formatDate } from "@/lib/format";

export const revalidate = 60;

export const metadata = {
  title: "Dokumentasi",
  description:
    "Logbook 15 hari dan arsip foto PMKM ARUTALA 2027 di Desa Batu Lintang, termasuk dokumentasi sebelum dan sesudah perbaikan TPS, pemasangan plang, dan penanaman bibit.",
  alternates: { canonical: "/dokumentasi" },
};

const targets = [
  { name: "Perbaikan TPS 2 x 4 meter", note: "Foto kondisi awal, proses pemasangan, dan hasil akhir" },
  { name: "Pemasangan plang dan gapura", note: "Titik pemasangan dan kondisi sebelum perbaikan" },
  { name: "Penanaman bibit varietas lokal", note: "Jenis bibit, lokasi tanam, dan perawatan awal" },
  { name: "Alat pengolahan air Sebindang", note: "Serah terima dan pelatihan pengoperasian" },
];

/** Galeri acuan dari lampiran proposal (pra-kegiatan), dipakai bila
 *  dokumentasi lapangan belum diunggah admin. */
const acuan: Slide[] = [
  {
    src: "/img/arsip/peta-rute.webp",
    srcSm: "/img/arsip/peta-rute-640.webp",
    alt: "Peta rute perjalanan dari Kota Pontianak menuju lokasi kegiatan di Kapuas Hulu",
    caption: "Peta rute: Pontianak - Putussibau, jalur darat lintas Kalimantan Barat.",
    tag: "Lampiran proposal",
  },
  {
    src: "/img/arsip/peta-denah.webp",
    srcSm: "/img/arsip/peta-denah-640.webp",
    alt: "Peta denah lokasi kegiatan PMKM di Desa Batu Lintang berbasis citra satelit",
    caption: "Peta denah lokasi kegiatan, Desa Batu Lintang (skala 1:1.000).",
    tag: "Lampiran proposal",
  },
  {
    src: "/img/arsip/rompi-depan.webp",
    srcSm: "/img/arsip/rompi-depan-640.webp",
    alt: "Desain bagian depan rompi lapangan ARUTALA dengan bordir logo",
    caption: "Rancangan rompi lapangan - bagian depan (bordir logo dan nama).",
    tag: "Lampiran proposal",
  },
  {
    src: "/img/arsip/rompi-belakang.webp",
    srcSm: "/img/arsip/rompi-belakang-640.webp",
    alt: "Desain bagian belakang rompi ARUTALA dengan area logo peserta",
    caption: "Rancangan rompi - bagian belakang, slot logo peserta.",
    tag: "Lampiran proposal",
  },
  {
    src: "/img/arsip/gambar-tps.webp",
    srcSm: "/img/arsip/gambar-tps-640.webp",
    alt: "Gambar teknik tiga tampak desain TPS skala 1:50",
    caption: "Gambar kerja TPS 2 x 4 m, tiga tampak skala 1:50.",
    tag: "Lampiran proposal",
  },
  {
    src: "/img/arsip/plang-sampah.webp",
    srcSm: "/img/arsip/plang-sampah-640.webp",
    alt: "Desain plang imbauan jaga kebersihan dan buang sampah pada tempatnya",
    caption: "Draf plang edukasi: jaga kebersihan, buang sampah pada tempatnya.",
    tag: "Lampiran proposal",
    fit: "contain",
  
  },
];

export default async function DokumentasiPage() {
  const entries = await listDokumentasi(true);
  const photos = entries.filter((e) => e.gambar_url);
  const notes = entries.filter((e) => !e.gambar_url);
  const slides: Slide[] =
    photos.length > 0
      ? photos.map((p) => ({
          src: p.gambar_url as string,
          alt: p.judul,
          caption: `${formatDate(p.tanggal)} - ${p.judul}`,
          tag: p.fase || "Dokumentasi",
        }))
      : acuan;

  return (
    <>
      <PageHead
        eyebrow="Dokumentasi"
        title="Catatan lapangan, bukan album pameran."
        lede="Halaman ini menyimpan jadwal resmi dan akan diisi foto serta catatan harian selama ekspedisi. Unggahan menyesuaikan ketersediaan sinyal di lokasi."
        meta={[`${rundown.length} hari`, site.dates.label, `${photos.length} foto terunggah`]}
      />

      <section className="section" aria-labelledby="arsip">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Arsip</p>
              <h2 className="section-title" id="arsip">
                Foto dan catatan.
              </h2>
            </div>
            <p className="lede">
              Foto dikecilkan ke format WebP agar tetap cepat dibuka di jaringan seluler. Catatan harian ditulis
              oleh Bidang Hubungan Masyarakat.
            </p>
          </div>

          {entries.length === 0 ? (
            <div className="empty">
              <h3>Arsip masih kosong</h3>
              <p>
                Belum ada foto atau catatan yang diunggah. Pengisian dimulai 7 Januari 2027 dari lokasi, lalu
                dilengkapi setelah panitia kembali ke Pontianak.
              </p>
              <p className="small" style={{ marginTop: ".75rem" }}>
                Panitia mengunggah lewat panel admin. Sampai saat itu, halaman ini menampilkan rencana dokumentasi
                di bawah.
              </p>
            </div>
          ) : (
            <>
              {slides.length > 0 && (
                <div style={{ marginBottom: "2.5rem" }}>
                  <Reveal>
                    <Carousel slides={slides} />
                  </Reveal>
                </div>
              )}

              {notes.length > 0 && (
                <div style={{ borderTop: "1px solid var(--line-strong)" }}>
                  {notes.map((n) => (
                    <article key={n.id} style={{ padding: "1.1rem 0", borderBottom: "1px solid var(--line)" }}>
                      <p className="mono small muted" style={{ margin: 0 }}>
                        {formatDate(n.tanggal)} · {n.fase}
                      </p>
                      <h3 className="display" style={{ fontSize: "1.25rem", margin: ".3rem 0" }}>
                        {n.judul}
                      </h3>
                      {n.keterangan && <p className="small" style={{ margin: 0, color: "var(--ink-soft)" }}>{n.keterangan}</p>}
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="section section--paper2" aria-labelledby="rencana">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Rencana dokumentasi</p>
              <h2 className="section-title" id="rencana">
                Empat bukti perubahan yang akan direkam.
              </h2>
            </div>
            <p className="lede">
              Dokumentasi before-after dipilih pada objek yang perubahannya bisa dilihat langsung oleh warga,
              bukan pada acara seremonial.
            </p>
          </div>
          <div className="card-grid">
            {targets.map((t) => (
              <div className="card" key={t.name}>
                <h3 className="display" style={{ fontSize: "1.15rem", margin: "0 0 .4rem" }}>
                  {t.name}
                </h3>
                <p className="small muted" style={{ margin: 0 }}>
                  {t.note}
                </p>
              </div>
            ))}
          </div>
          <div className="notice" style={{ marginTop: "1.5rem" }}>
            <b>Catatan jujur.</b> Tidak ada foto yang ditampilkan sebelum benar-benar diambil. Bingkai kosong di
            beranda menandai slot yang belum terisi, bukan gambar contoh.
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="logbook">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Logbook</p>
              <h2 className="section-title" id="logbook">
                Jadwal harian 15 hari.
              </h2>
            </div>
            <p className="lede">
              Rundown resmi dari proposal. Catatan lapangan akan ditempel pada tanggal yang sesuai setelah
              kegiatan berjalan.
            </p>
          </div>
          <DayTimeline />
          <p className="small muted" style={{ marginTop: "1.5rem" }}>
            Ingin membaca rincian program? <Link className="textlink" href="/program">Buka halaman program</Link>.
          </p>
        </div>
      </section>
      <TenunBand />
    </>
  );
}
