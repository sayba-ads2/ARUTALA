import type { Metadata } from "next";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Syarat dan Ketentuan · ARUTALA 2027",
  description:
    "Aturan penggunaan situs resmi ARUTALA 2027 — PMKM Teknik Lingkungan Untan di Desa Batu Lintang, Kapuas Hulu.",
};

function Kicker() {
  return (
    <span className="mono small" style={{ letterSpacing: "0.06em", color: "var(--ochre-bright)" }}>
      SYARAT &amp; KETENTUAN
    </span>
  );
}

export default function TermsPage() {
  return (
    <div className="prose-page">
      <section className="section section--tight">
        <div className="wrap" style={{ maxWidth: "720px" }}>
          <Kicker />
          <h1 className="display" style={{ fontSize: "2.2rem", letterSpacing: "-.02em", margin: ".6rem 0 .3rem" }}>
            Syarat dan Ketentuan
          </h1>
          <p className="mono small muted">Berlaku sejak {site.dates.label} · Website resmi {site.name}</p>

          <p style={{ marginTop: "1.25rem" }}>
            Dengan mengakses dan menggunakan situs ini, Anda menyetujui syarat dan ketentuan berikut. Situs{" "}
            {site.name} adalah media publikasi dan dokumentasi program, bukan platform penjualan atau penggalangan
            dana.
          </p>

          <h2 className="display" style={{ fontSize: "1.35rem", marginTop: "2rem" }}>1. Penggunaan situs</h2>
          <ol>
            <li>Seluruh konten (teks, foto, grafik, desain) disajikan untuk informasi publik tentang program.</li>
            <li>Anda boleh membagikan tautan dan mengutip sebagian konten dengan menyebut sumber: ARUTALA 2027 — PMKM Teknik Lingkungan Universitas Tanjungpura.</li>
            <li>Dilarang mengubah, menjual kembali, atau mengaku konten situs ini sebagai milik sendiri tanpa izin tertulis panitia.</li>
          </ol>

          <h2 className="display" style={{ fontSize: "1.35rem", marginTop: "2rem" }}>2. Akurasi informasi</h2>
          <ol>
            <li>Angka anggaran, jadwal, dan data kegiatan dikutip dari proposal resmi program dan dapat berubah mengikuti keputusan pendanaan serta kondisi lapangan.</li>
            <li>Perubahan penting diumumkan melalui halaman Berita situs ini dan kanal resmi panitia.</li>
          </ol>

          <h2 className="display" style={{ fontSize: "1.35rem", marginTop: "2rem" }}>3. Pendaftaran mitra dan sponsor</h2>
          <ol>
            <li>Slot rompi dukungan terbatas 38 keping; kemitraan di luar slot diatur lewat kerja sama tertulis dengan panitia.</li>
            <li>Data yang dikirim lewat formulir situs hanya dipakai untuk keperluan tindak lanjut resmi panitia.</li>
            <li>Penawaran mengatasnamakan ARUTALA yang datang dari luar kanal resmi situs ini bukan tanggung jawab panitia.</li>
          </ol>

          <h2 className="display" style={{ fontSize: "1.35rem", marginTop: "2rem" }}>4. Tautan pihak ketiga</h2>
          <ol>
            <li>Situs memuat tautan keluar (Instagram, WhatsApp, Google Maps). Kami tidak mengendalikan dan tidak bertanggung jawab atas isi layanan pihak ketiga tersebut.</li>
          </ol>

          <h2 className="display" style={{ fontSize: "1.35rem", marginTop: "2rem" }}>5. Batas tanggung jawab</h2>
          <ol>
            <li>Situs disediakan apa adanya. Kami berupaya menjaga ketersediaan dan ketepatan isi, tetapi tidak menjamin situs bebas gangguan setiap saat.</li>
            <li>Kerugian akibat penggunaan atau ketidakmampuan menggunakan situs ini berada di luar tanggung jawab panitia.</li>
          </ol>

          <h2 className="display" style={{ fontSize: "1.35rem", marginTop: "2rem" }}>6. Ketentuan penutup</h2>
          <ol>
            <li>Syarat ini dapat diperbarui sewaktu-waktu; versi terbaru selalu berlaku di halaman ini.</li>
            <li>Hubungi {site.shortOrganizer} lewat WhatsApp resmi {site.whatsappLabel} bila ada pertanyaan.</li>
          </ol>
        </div>
      </section>
    </div>
  );
}
