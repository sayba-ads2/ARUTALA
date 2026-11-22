import type { Metadata } from "next";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Kebijakan Privasi · ARUTALA 2027",
  description:
    "Kebijakan privasi situs resmi ARUTALA 2027 — PMKM Teknik Lingkungan Untan di Desa Batu Lintang, Kapuas Hulu.",
};

export default function PrivacyPage() {
  return (
    <div className="prose-page">
      <section className="section section--tight">
        <div className="wrap" style={{ maxWidth: "720px" }}>
          <span
            className="mono small"
            style={{ letterSpacing: "0.06em", color: "var(--ochre-bright)" }}
          >
            KEBIJAKAN PRIVASI
          </span>
          <h1
            className="display"
            style={{ fontSize: "2.2rem", letterSpacing: "-.02em", margin: ".6rem 0 .3rem" }}
          >
            Kebijakan Privasi
          </h1>
          <p className="mono small muted">
            Berlaku sejak {site.dates.label} · Website resmi {site.name}
          </p>

          <p style={{ marginTop: "1.25rem" }}>
            {site.shortOrganizer} menghargai privasi pengunjung situs ini. Kebijakan berikut
            menjelaskan data apa yang kami kumpulkan dan bagaimana data itu diperlakukan.
          </p>

          <h2 className="display" style={{ fontSize: "1.35rem", marginTop: "2rem" }}>
            1. Data yang kami kumpulkan
          </h2>
          <ol>
            <li>
              Informasi yang Anda kirim secara sukarela lewat formulir pendaftaran mitra/sponsor:
              nama, instansi, surel, dan nomor telepon.
            </li>
            <li>
              Data teknis minimal untuk keamanan situs: alamat IP, jenis peramban, halaman yang
              diakses, dan waktu akses.
            </li>
          </ol>

          <h2 className="display" style={{ fontSize: "1.35rem", marginTop: "2rem" }}>
            2. Penggunaan data
          </h2>
          <ol>
            <li>Menindaklanjuti kerja sama, konfirmasi dukungan, dan komunikasi resmi panitia.</li>
            <li>Menjaga keamanan, stabilitas, dan kinerja situs.</li>
            <li>Membuat rekap anonim jumlah kunjungan untuk pelaporan program.</li>
          </ol>

          <h2 className="display" style={{ fontSize: "1.35rem", marginTop: "2rem" }}>
            3. Penyimpanan dan pembagian data
          </h2>
          <ol>
            <li>Data disimpan di basis data terkelola (Supabase) dengan kontrol akses.</li>
            <li>Kami tidak menjual data kepada pihak mana pun.</li>
            <li>
              Data dapat dibagikan kepada panitia inti dan pendamping program sebatas untuk
              keperluan administrasi kegiatan.
            </li>
          </ol>

          <h2 className="display" style={{ fontSize: "1.35rem", marginTop: "2rem" }}>
            4. Cookie dan penyimpanan lokal
          </h2>
          <ol>
            <li>
              Situs hanya menyimpan preferensi tampilan secukupnya (misalnya status animasi) di
              peramban Anda.
            </li>
            <li>
              Peta lokasi desa dimuat dari layanan pihak ketiga (Google Maps) hanya setelah Anda
              mengklik tombol muat peta.
            </li>
          </ol>

          <h2 className="display" style={{ fontSize: "1.35rem", marginTop: "2rem" }}>
            5. Hak Anda
          </h2>
          <ol>
            <li>Meminta akses, koreksi, atau penghapusan data pribadi yang Anda kirim.</li>
            <li>Menarik kesediaan berlangganan/berkontak kapan saja.</li>
          </ol>

          <h2 className="display" style={{ fontSize: "1.35rem", marginTop: "2rem" }}>
            6. Keamanan
          </h2>
          <ol>
            <li>
              Kami memakai HTTPS, autentikasi panel admin, dan pembatasan akses basis data. Tidak
              ada sistem yang bebas risiko sepenuhnya.
            </li>
            <li>Laporkan celah keamanan ke {site.email}.</li>
          </ol>

          <h2 className="display" style={{ fontSize: "1.35rem", marginTop: "2rem" }}>
            7. Perubahan kebijakan
          </h2>
          <ol>
            <li>
              Kami dapat memperbarui kebijakan ini dari waktu ke waktu. Versi terbaru selalu
              tersedia di halaman ini.
            </li>
          </ol>

          <h2 className="display" style={{ fontSize: "1.35rem", marginTop: "2rem" }}>8. Kontak</h2>
          <ol>
            <li>
              Pertanyaan seputar privasi: {site.email} · WhatsApp panitia {site.whatsappLabel}.
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
