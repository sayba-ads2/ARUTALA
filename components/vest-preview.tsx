import { vestCapacity } from "@/lib/content";
import type { Sponsor } from "@/lib/repo";
import { compactRupiah } from "@/lib/format";

type Props = { sponsors: Sponsor[] };

// Simulasi urutan logo pada punggung rompi. Slot 1 adalah area VIP
// (2x2) untuk akumulasi nominal tertinggi, sisanya mengalir kiri atas
// ke kanan bawah sesuai aturan proposal. Kapasitas = 38 slot rompi.
/**
 * Nama instansi sering panjang ("Perusahaan Daerah Air Minum Kapuas"), jauh
 * lebih lebar dari slot 3:2. Untuk di dalam kotak dipakai bentuk pendek:
 * singkatan huruf kapital bila ada, kalau tidak potongan kata pertama.
 * Nama lengkap tetap muncul di daftar urutan dan atribut title.
 */
function shortName(nama: string): string {
  const acronym = nama
    .split(/[\s/]+/)
    .filter((w) => w.length > 2 && /^[A-Z]/.test(w))
    .map((w) => w[0])
    .join("");
  if (acronym.length >= 2 && acronym.length <= 4) return acronym;
  const words = nama.split(/\s+/);
  return words.length > 1 ? words.slice(0, 2).join(" ") : nama;
}

export default function VestPreview({ sponsors }: Props) {
  const ordered = [...sponsors].sort((a, b) => b.nominal_akumulasi - a.nominal_akumulasi);
  const filled = ordered.slice(0, vestCapacity);
  const slots = Array.from({ length: vestCapacity }, (_, i) => filled[i] ?? null);
  // VIP memakai 4 sel (2x2) sehingga 38 slot butuh 41 sel.
  // Kisi 8 kolom x 6 baris = 48 sel; 7 sel sisa ditandai cadangan.
  const ghostCount = 8 * 6 - (slots.length + 3);

  return (
    <div className="vest-grid">
      <div>
        <div
          className="slots"
          role="img"
          aria-label={`Simulasi ${vestCapacity} slot logo pada rompi, ${filled.length} terisi`}
        >
          {slots.map((s, i) => (
            <div
              key={i}
              className={`slot ${i === 0 ? "slot--vip" : ""} ${s ? "slot--filled" : ""}`}
            >
              {s ? (
                <span title={s.tampilkan_nama ? s.nama_sponsor : "Sahabat Lestari"}>
                  {shortName(s.tampilkan_nama ? s.nama_sponsor : "Sahabat Lestari")}
                </span>
              ) : (
                String(i + 1).padStart(2, "0")
              )}
            </div>
          ))}
          {Array.from({ length: ghostCount }, (_, i) => (
            <div key={`c${i}`} className="slot slot--ghost" aria-hidden="true">
              cadangan
            </div>
          ))}
        </div>
        <p className="small muted" style={{ marginTop: ".75rem" }}>
          {filled.length} dari {vestCapacity} slot terisi. Slot 01 ditandai sebagai area VIP, mengikuti kotak logo
          utama pada gambar kerja rompi di samping.
        </p>
      </div>

      <div>
        <figure className="figure">
          <img src="/img/rompi-belakang.jpg" alt="Gambar kerja punggung rompi panitia ARUTALA dengan kotak penempatan logo" width={727} height={520} loading="lazy" />
          <figcaption>
            Gambar kerja punggung rompi dari proposal: area merek, kotak logo utama, grid logo pendukung, dan
            koordinat lokasi di bagian bawah.
          </figcaption>
        </figure>

        <h3 className="display" style={{ fontSize: "1.25rem", margin: "1.5rem 0 .5rem" }}>
          Urutan slot saat ini
        </h3>
        {filled.length === 0 ? (
          <p className="small muted">
            Belum ada mitra terdaftar. Begitu data masuk, nama akan mengisi slot dari kiri atas ke kanan bawah
            otomatis.
          </p>
        ) : (
          <ol className="small" style={{ margin: 0, paddingLeft: "1.1rem", columns: 2, columnGap: "1.5rem" }}>
            {filled.map((s, i) => (
              <li key={s.id} style={{ breakInside: "avoid", marginBottom: ".3rem" }}>
                {s.tampilkan_nama ? s.nama_sponsor : "Sahabat Lestari"}{" "}
                <span className="mono muted">({compactRupiah(s.nominal_akumulasi)})</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
