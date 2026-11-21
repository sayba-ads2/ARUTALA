"""Isi dokumentasi dengan 5 foto acuan proposal agar carousel langsung berisi (bisa dihapus admin)."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _libsupa import supa_rest

PHOTOS = [
    ("2026-10-02", "Aliran Sungai Utik dari arah hilir", "Jalur transportasi utama menuju dusun; bagian dari catatan survei awal.", "Pra", "/img/foto/sungai-utik.webp"),
    ("2026-11-08", "Survei titik TPS dan jalur plang", "Peninjauan bersama perangkat desa untuk titik pekerjaan konstruksi.", "Pra", "/img/foto/survei-lapangan.webp"),
    ("2026-11-08", "Hutan adat yang dijaga turun temurun", "Latar program penghijauan dan edukasi lingkungan.", "Pra", "/img/foto/kegiatan-hutan.webp"),
    ("2026-11-08", "Musyawarah warga Desa Batu Lintang", "Titik berangkat perumusan empat program kerja.", "Pra", "/img/foto/kegiatan-warga.webp"),
    ("2026-11-08", "Rumah betang Sungai Utik", "Ruang komunal tempat semua kabar program akan bermuara.", "Pra", "/img/foto/betang-eksterior.webp"),
]

for tanggal, judul, ket, fase, url in PHOTOS:
    st, _ = supa_rest("dokumentasi?judul=eq." + judul.replace(" ", "%20"), "GET")
    if isinstance(_, list) and _:
        print("SKIP(ada)", judul)
        continue
    st, body = supa_rest(
        "dokumentasi",
        "POST",
        {
            "tanggal": tanggal,
            "judul": judul,
            "keterangan": ket,
            "fase": fase,
            "program_slug": None,
            "gambar_url": url,
            "tampil": True,
        },
        prefer="return=minimal",
    )
    print(st, judul)
print("selesai")

# NOTE: aset /img/foto/* terbukti bukan foto (grafik proposal) - baris foto dinetalkan 2026-11-22;
# carousel memakai /img/arsip/* (lampiran proposal asli). Jangan jalankan lagi tanpa foto asli.
