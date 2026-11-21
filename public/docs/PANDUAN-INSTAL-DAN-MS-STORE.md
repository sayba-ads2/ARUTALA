# Panduan Instalasi & Upload ke Microsoft Store — ARUTALA 2027

> Website **ARUTALA 2027** (`https://arutala.web.id`) adalah **Next.js + PWA**.
> Tidak ada file `.exe` "installer" biasa — cara kerjanya:
> 1. **Deploy** ke Vercel → web live di `arutala.web.id` (ini "installer"-nya: pengguna tinggal buka URL).
> 2. **Install sebagai aplikasi** (tombol "Install app" di Chrome/Edge/Android/iOS) → muncul ikon di layar/home screen, jalan layar penuh tanpa bar browser.
> 3. **Opsional: upload ke Microsoft Store** → dibungkus jadi paket MSIX lewat PWABuilder, lalu submit di Partner Center.
>
> Semua langkah di bawah sudah disesuaikan dengan kondisi repo ini (manifest, ikon, dan service worker sudah terpasang).

---

## 0. Prasyarat

| Kebutuhan | Versi | Catatan |
|---|---|---|
| Node.js | ≥ 20 (disarankan 22 LTS) | cek: `node -v` |
| npm | ≥ 10 | ikut terpasang dengan Node |
| Git | terbaru | repo: `https://github.com/sayba-ads2/ARUTALA` |
| Akun Vercel | gratis (Hobby) | untuk hosting |
| Akun Supabase | proyek ARUTALA sudah ada | kredensial di `VERCEL-ENV-ARUTALA.txt` (JANGAN di-commit) |
| Domain | `arutala.web.id` | di registrar, bisa dilepas/diarahkan |
| (Store saja) Microsoft Partner Account | USD 19 sekali bayar | `partner.microsoft.com` |

---

## 1. Menjalankan / memasang lokal (development)

```bash
git clone https://github.com/sayba-ads2/ARUTALA.git arutala-web
cd arutala-web
npm install

# buat env lokal (nilai ada di file VERCEL-ENV-ARUTALA.txt, jangan dibagikan)
copy .env.local.example .env.local
# edit .env.local: NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_SUPABASE_URL,
# NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, ADMIN_EMAILS, (opsional) SERVICE_ROLE

npm run build
npm start          # default port 3000; port lain: npx next start -p 3112
```

Buka `http://localhost:3112` → uji:
- F12 → tab **Application → Manifest**: ikon 192/512 + "maskable" terbaca.
- F12 → **Application → Service Workers**: `sw.js` registered.
- Di address bar Chrome/Edge muncul ikon **Install** (monitor+panah bawah) → klik → "ARUTALA" terpasang sebagai aplikasi desktop dengan ikon sendiri.

> Untuk PWA penuh di lokal, `http://localhost` sudah dianggap aman oleh browser.

---

## 2. Deploy ke Vercel (cara "menginstal" situs secara resmi)

### 2.1 lewat GitHub (disarankan)
1. Masuk `https://vercel.com` → **Add New… → Project** → import repo **`sayba-ads2/ARUTALA`** (branch `main`).
2. Framework terdeteksi **Next.js** — biarkan build command default (`npm run build`).
3. Isi **Environment Variables** (sama seperti isi `VERCEL-ENV-ARUTALA.txt`):
   - `NEXT_PUBLIC_SITE_URL` = `https://arutala.web.id`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (Sensitive/Production only)
   - `ADMIN_EMAILS`
4. **Deploy** → dapat domain sementara `*.vercel.app`.

### 2.2 lewat Vercel CLI (tanpa buka web)
```bash
npm i -g vercel
vercel login
vercel            # preview
vercel --prod     # produksi
```

### 2.3 Sambungkan domain `arutala.web.id`
1. Vercel dashboard → **Project → Settings → Domains → Add** → `arutala.web.id`.
2. Di panel domain/registrar (tempat domain dibeli), arahkan:
   - `A` record `@` → `76.76.21.21`, **atau**
   - `CNAME` `www`/`@` sesuai instruksi Vercel (umumnya `cname-china...` cukup `76.76.21.21`).
3. Tunggu propagasi (± 5–30 menit); Vercel mengurus **HTTPS otomatis** (Let's Encrypt).
4. Cek: `https://arutala.web.id` hijau + `https://arutala.web.id/manifest.webmanifest` ber-JSON.

> **HTTPS wajib** untuk install PWA dan untuk paket Microsoft Store. Jangan pakai mode "Enforce" yang memblokir `/admin` — itu normal.

### 2.4 Update konten setelah deploy
- Berita/sponsor/dokumentasi: lewat **/admin** (login email `ADMIN_EMAILS`).
- Ubah kode: commit → push ke `main` → Vercel rebuild otomatis.

---

## 3. Install sebagai aplikasi di tiap perangkat (tanpa Store)

| Perangkat | Cara |
|---|---|
| Windows 10/11 (Edge) | buka `arutala.web.id` → menu `...` → **Apps → Install this site as an app** (muncul di Start Menu & bisa pin taskbar; dapat badge Store "installed via Edge") |
| Windows (Chrome) | buka situs → ikon **Install** di kanan address bar → Install |
| Android (Chrome) | buka situs → menu ⋮ → **Add to Home screen / Install app** |
| iPhone/iPad (Safari, iOS ≥ 16.4) | tombol Share → **Add to Home Screen** (PWA resmi jadi ikon app; ada Web Push sejak iOS 16.4) |

Ikon aplikasi = `public/img/icon-512.png` (latar navy solid, aman untuk *maskable*). Nama pendek di launcher: **ARUTALA**.

---

## 4. Upload ke Microsoft Store (paket PWA → MSIX)

Microsoft Store menerima aplikasi PWA yang **di-packaging jadi MSIX** dengan PWABuilder. Situs harus **sudah live di `https://arutala.web.id`** sebelum mulai.

### 4.1 Validasi PWA dulu
1. Buka **`https://www.pwabuilder.com`** → masukkan `https://arutala.web.id` → **Start**.
2. Target skor: *Manifest* hijau, *Service Worker* hijau, *HTTPS* hijau.
   - Komposisi repo ini seharusnya lolos; bila ada kuning, perbaiki sesuai pesan (mis. butuh ikon 512 maskable — sudah ada).

### 4.2 Generate paket Windows (MSIX)
1. Di hasil evaluasi → tombol **Packaging** → pilih **Windows (MSIX / .exe installer)**.
2. Isi data paket (sekali saja, catat!):
   - **Package Name**: `id.arutala.ARUTALA2027` (lowercase, titik sebagai pemisah)
   - **Package Version**: `1.0.0`
   - **Publisher**: sama persis dengan nama penerbit di Partner Center, mis. `CN=Sayba Ads` — kalau belum punya sertifikat, PWABuilder bisa **Generate New Certificate**: simpan file `.pfx` + passwordnya baik-baik (wajib sama untuk update berikutnya).
   - Opsional centang **"Generate Package Installer"** → dapat `.exe` installer untuk dibagikan langsung (alternatif selain Store).
3. **Download** ZIP → isinya `.msixbundle` (+ `.exe` installer bila dicentang).

### 4.3 Submit ke Partner Center
1. `https://partner.microsoft.com` → daftar (USD 19 sekali, verifikasi identitas).
2. **App management → New product → (App) → Reserve a name** (mis. `ARUTALA 2027`).
3. Tab **Packages** → upload `.msixbundle` dari PWABuilder.
4. Tab **Store listings** (Bahasa Indonesia):
   - Judul, deskripsi singkat & panjang, keterangan fitur.
   - **Screenshot wajib** ≥1, disarankan beberapa, ukuran 1366×768 / 1080×1920 (bisa hasil screenshot `arutala.web.id` desktop & HP).
   - Ikon logo: 50×50 & 270×270 (crop dari `public/img/icon-512.png` / logo kotak).
5. Tab **Age rating** (kuis isi cepat) → **Pricing: Free** → **Review**: kontak tester = URL live + catatan "PWA untuk PMKM Teknik Lingkungan Untan".
6. **Publish**. Review Microsoft biasanya 1–3 hari; status dilihat di Partner Center.

### 4.4 Update berikutnya
- Ubah konten/berita → tidak perlu kirim ulang (data dari Supabase, real-time).
- Ubah tampilan → deploy Vercel biasa; paket MSIX hanya perlu dikirim ulang ke Store **kalau** ada perubahan manifest ikon/name/theme. Naikkan `Package Version` (mis. 1.0.1) dan gunakan **sertifikat .pfx yang sama**, kalau berbeda签名 toko menolak update.

> Catatan penting: aplikasi Store ini tetap membuka `arutala.web.id` (WebView). Situs **harus terus online**; kalau Vercel berhenti/domain mati, aplikasi Store ikut kosong.

---

## 5. FAQ cepat

**Q: Mana file installer-nya?**
A: Untuk situs web tidak ada `.exe` wajib — "installer" resminya adalah **deploy Vercel** (Bab 2) lalu tombol **Install app** di browser (Bab 3). Installer `.exe` opsional hanya bila mau dibagikan offline (Bab 4.2, Package Installer).

**Q: Kenapa tombol "Install" tidak muncul di browserku?**
A: Butuh HTTPS + manifest valid + service worker terdaftar. Cek `https://arutala.web.id/manifest.webmanifest` & F12→Application→Service Workers. Di Firefox desktop tombol install manual: ⋮ → *Install*.

**Q: Konten dummy/admin?**
A: `/admin` dengan email yang terdaftar di `ADMIN_EMAILS`; magic link dari Supabase. Data tersimpan di Supabase, jadi update konten tidak butuh deploy ulang.

**Q: Domain lain (mis. `arutala.sayba.id`)?**
A: Tambahkan sebagai domain alternatif di Vercel, dan set `NEXT_PUBLIC_SITE_URL` ke domain utama agar metadata/OG canonical tetap `arutala.web.id`.

---

## 6. Ringkas "definition of ready" proyek ini

- [x] Manifest PWA (`app/manifest.ts`) — nama, ikon 192/512 + maskable, theme `#0b2342`, shortcuts Kabar/Arsip/Sponsor.
- [x] Service worker offline-first sederhana (`public/sw.js`, cache shell + aset; API tidak disentuh).
- [x] Registrasi SW otomatis di layout.
- [x] OG image, favicon, apple-icon.
- [x] QA multi-device: 0 overflow horizontal, 0 console error, 0 gap kosong, Google Maps embed, carousel aset proposal.
- [ ] Deploy Vercel + domain `arutala.web.id` (Bab 2) ← langkah Bapak selanjutnya.
- [ ] (Opsional) Paket MSIX + submit Store (Bab 4).

Dibuat oleh Sayba Arc — Powered By Sayba Arc (`sayba.id`).
