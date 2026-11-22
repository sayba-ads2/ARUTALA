// Sumber data dasar: Proposal PMKM ARUTALA 2027.
// Angka, nama, dan jadwal di bawah dikutip dari proposal. Jangan menambah
// angka baru tanpa sumber tertulis.

export const site = {
  name: "ARUTALA",
  year: "2027",
  tagline: "Menjejak bakti, menjaga lestari",
  organizer: "Jurusan Teknik Lingkungan, Fakultas Teknik, Universitas Tanjungpura",
  shortOrganizer: "Teknik Lingkungan Untan",
  village: "Desa Batu Lintang",
  hamlet: "Dusun Sungai Utik",
  district: "Kecamatan Embaloh Hulu",
  regency: "Kabupaten Kapuas Hulu",
  province: "Kalimantan Barat",
  coords: { lat: 1.121222, lng: 112.563528, dms: "1°07'16.4\"N 112°33'48.7\"E" },
  dates: { start: "2027-01-07", end: "2027-01-21", label: "7 sampai 21 Januari 2027" },
  participants: 38,
  committeeFields: 7,
  programCount: 4,
  proposalPath: "/docs/proposal-arutala-2027.pdf",
  // Kosongkan sampai akun resmi dipublikasikan. Halaman terkait menampilkan
  // status "belum aktif", bukan tautan palsu.
  instagram: "",
  tiktok: "",
  email: "hmtl.ft.untan13@gmail.com",
  whatsapp: "6281218542747",
  whatsappLabel: "0812 1854 2747",
};

export const funding = {
  total: 106352644,
  income: 3040000,
  gap: 103312644,
  incomeNote: "Dana awal panitia, 38 orang x Rp 80.000",
  groups: [
    {
      label: "Transportasi dan mobilitas",
      amount: 42252000,
      note: "Bus perintis, bensin, tim awal, survei lokasi",
      color: "#d8a055",
    },
    {
      label: "Konsumsi lapangan",
      amount: 35436000,
      note: "Bahan makanan, air, gas, 15 hari",
      color: "#8fae8f",
    },
    {
      label: "Cadangan",
      amount: 13872084,
      note: "Dana tak terduga",
      color: "rgba(244,241,231,0.55)",
    },
    {
      label: "Perlengkapan dan aset",
      amount: 10956000,
      note: "38 rompi, material TPS, tugu, plang",
      color: "rgba(244,241,231,0.32)",
    },
    {
      label: "Acara dan administrasi",
      amount: 3836560,
      note: "Malam puncak, hadiah, kesekretariatan, obat",
      color: "rgba(244,241,231,0.18)",
    },
  ],
  rows: [
    { bidang: "Bidang Hubungan Masyarakat", amount: 37340000, note: "Bus perintis, bensin, spanduk, lisensi desain" },
    { bidang: "Bidang Konsumsi", amount: 35436000, note: "Bahan makanan, air, gas, konsumsi lapangan" },
    { bidang: "Dana Tak Terduga", amount: 13872084, note: "Cadangan sesuai proposal" },
    { bidang: "Bidang Usaha Dana", amount: 8000000, note: "38 rompi panitia" },
    { bidang: "Bidang Perlengkapan", amount: 2956000, note: "Material TPS, tugu, plang, alat pengolahan air" },
    { bidang: "Tim Awal", amount: 2700000, note: "Bensin, konsumsi, penginapan tim pembuka" },
    { bidang: "Survey Awal", amount: 2212000, note: "Survei lokasi prakegiatan" },
    { bidang: "Bidang Acara", amount: 1291000, note: "Hadiah SEPEDA dan TL Mengajar, alat tulis" },
    { bidang: "Bidang Kesekretariatan", amount: 1218500, note: "Kertas, tinta, plakat, map" },
    { bidang: "Malam Puncak", amount: 1085000, note: "Konsumsi dan perlengkapan panggung" },
    { bidang: "Bidang Keamanan dan Kesehatan", amount: 242060, note: "Obat, perban, alat kebersihan" },
  ],
};

export type TierName = "Buana" | "Wana" | "Tirta" | "Donatur Reguler";

export const tiers: {
  name: TierName;
  range: string;
  short: string;
  facilities: string[];
}[] = [
  {
    name: "Buana",
    range: "Rp 5.000.000 ke atas",
    short: "≥ Rp 5 jt",
    facilities: [
      "Logo atau nama pada poster publikasi gabungan Instagram",
      "Sertifikat penghargaan resmi pasca kegiatan",
      "Logo sebagai watermark pada seluruh slide materi",
      "Penyebutan nama perusahaan oleh MC di Malam Puncak dan acara edukasi lapangan",
      "Logo pada spanduk",
      "Logo pada tag label bibit tanaman Griya Lestari",
      "Logo di punggung rompi panitia, slot terbesar",
      "Logo di backdrop panggung utama Malam Puncak",
      "Logo pada aset plang desa: area tanam, jalan, TPS",
    ],
  },
  {
    name: "Wana",
    range: "Rp 2.000.000 sampai Rp 4.999.000",
    short: "Rp 2 jt - 4,99 jt",
    facilities: [
      "Logo atau nama pada poster publikasi gabungan Instagram",
      "Sertifikat penghargaan resmi pasca kegiatan",
      "Logo sebagai watermark pada seluruh slide materi",
      "Penyebutan nama perusahaan oleh MC di Malam Puncak dan acara edukasi lapangan",
      "Logo pada spanduk",
      "Logo pada tag label bibit tanaman Griya Lestari",
    ],
  },
  {
    name: "Tirta",
    range: "Rp 750.000 sampai Rp 1.999.000",
    short: "Rp 750 rb - 1,99 jt",
    facilities: [
      "Logo atau nama pada poster publikasi gabungan Instagram",
      "Sertifikat penghargaan resmi pasca kegiatan",
      "Logo sebagai watermark pada seluruh slide materi",
      "Penyebutan nama perusahaan oleh MC di Malam Puncak dan acara edukasi lapangan",
    ],
  },
  {
    name: "Donatur Reguler",
    range: "Di bawah Rp 750.000",
    short: "< Rp 750 rb",
    facilities: [
      "Nama pada poster publikasi gabungan Instagram",
      "Sertifikat penghargaan resmi pasca kegiatan",
    ],
  },
];

// Matriks fasilitas, dibaca dari tabel proposal halaman feedback sponsor.
export const facilityMatrix = [
  { label: "Poster publikasi gabungan Instagram", reguler: true, tirta: true, wana: true, buana: true },
  { label: "Sertifikat penghargaan resmi", reguler: true, tirta: true, wana: true, buana: true },
  { label: "Watermark slide materi", reguler: false, tirta: true, wana: true, buana: true },
  { label: "Penyebutan nama oleh MC", reguler: false, tirta: true, wana: true, buana: true },
  { label: "Logo pada spanduk", reguler: false, tirta: false, wana: true, buana: true },
  { label: "Logo pada tag bibit tanaman", reguler: false, tirta: false, wana: true, buana: true },
  { label: "Logo di punggung rompi panitia", reguler: false, tirta: false, wana: false, buana: true },
  { label: "Logo di backdrop Malam Puncak", reguler: false, tirta: false, wana: false, buana: true },
  { label: "Logo pada plang desa", reguler: false, tirta: false, wana: false, buana: true },
];

export const logoRule =
  "Posisi penempatan logo sponsor pada seluruh media ditentukan berdasarkan akumulasi nominal dana atau barang yang diberikan. Sponsor dengan nilai sumbangan tertinggi mendapat ukuran logo terbesar di posisi paling strategis, yaitu pada rompi. Urutan logo lainnya disusun dari kiri atas menuju kanan bawah.";

export const vestCapacity = 38;

export const adoption = [
  { name: "Bus perintis Pontianak ke Kapuas Hulu", detail: "2 unit, pulang pergi", amount: 34000000 },
  { name: "38 rompi panitia", detail: "Identitas lapangan seluruh peserta", amount: 8000000 },
  { name: "Konsumsi lapangan 15 hari", detail: "Bahan makanan, air, gas untuk 38 peserta", amount: 35436000 },
  { name: "Material TPS 2 x 4 meter", detail: "Bata, besi beton, semen, pasir, alat", amount: 2956000 },
];

export type ProgramItem = { name: string; text: string };
export type Program = {
  slug: string;
  no: string;
  title: string;
  faction: string;
  lead: string;
  body: string;
  items: ProgramItem[];
  output: string;
};

export const programs: Program[] = [
  {
    slug: "geo-digital",
    no: "01",
    title: "Geo-Digital Initiative",
    faction: "Divisi Digital",
    lead: "Memetakan desa, merapikan data ruang, dan memperluas jangkauan publikasi digital.",
    body: "Keterbatasan visualisasi data ruang membuat potensi desa sulit terlihat dalam perencanaan pembangunan. Program ini menyiapkan perangkat desa agar mampu membaca, memperbarui, dan mengelola data geografis wilayahnya sendiri.",
    items: [
      { name: "Pelatihan pemetaan", text: "Pembekalan teknis pengoperasian perangkat lunak pemetaan spasial dan pengolahan data udara, disampaikan lewat simulasi langsung bersama perangkat desa." },
      { name: "Optimalisasi website desa", text: "Pendampingan operator desa untuk mengunggah berita, mengelola data berkala, dan menyajikan potensi lokal pada situs resmi desa." },
      { name: "Peta wisata daerah", text: "Perancangan peta wisata cetak dan digital, mencakup titik koordinat objek wisata serta data homestay, tempat makan, dan akses jalan." },
    ],
    output: "Perangkat desa dapat memetakan batas administrasi dan potensi fisik lingkungan secara mandiri.",
  },
  {
    slug: "eco-action",
    no: "02",
    title: "Eco-Action & Sustainability",
    faction: "Divisi Pendidikan",
    lead: "Edukasi lingkungan yang berjalan bersama pelajaran adat dan budaya setempat.",
    body: "Program ini memadukan edukasi lingkungan hidup dengan pelestarian kearifan lokal, lewat kelas di sekolah dasar dan menengah serta kegiatan budaya yang sudah hidup di Dusun Sungai Utik.",
    items: [
      { name: "TL Mengajar", text: "Pengayaan materi lingkungan, sanitasi, pengelolaan sampah, dan perilaku hidup bersih dan sehat di SDN 04 Sungai Utik serta SMPN 02 Satu Atap." },
      { name: "SEPEDA, Sekolah Pendidikan Budaya", text: "Penguatan program budaya rutin hari Sabtu di Dusun Sungai Utik, memadukan adat dan tradisi lokal dengan edukasi lingkungan untuk anak usia dini." },
      { name: "Malam Puncak", text: "Ajang silaturahmi lewat pertunjukan seni dan budaya yang melibatkan warga dan mahasiswa, mulai dari penentuan pertunjukan sampai tata panggung." },
    ],
    output: "Peserta didik mampu menyebutkan dan mempraktikkan perilaku hidup bersih dan sehat.",
  },
  {
    slug: "griya-lestari",
    no: "03",
    title: "Griya Lestari",
    faction: "Divisi Lingkungan",
    lead: "Menanam varietas lokal dan merapikan pengelolaan limbah rumah tangga.",
    body: "Fokus program ini adalah kualitas ruang hidup warga: pekarangan yang produktif, sanitasi domestik yang lebih baik, dan ruang publik desa yang terawat.",
    items: [
      { name: "Penanaman bibit varietas lokal", text: "Bibit dari kerja sama dengan Dinas Lingkungan Hidup Putussibau, ditanam serentak bersama perangkat desa, warga, dan pemuda Sungai Utik." },
      { name: "Pengelolaan limbah", text: "Pendampingan pengelolaan limbah domestik untuk mendukung sanitasi lingkungan permukiman." },
    ],
    output: "Bibit tertanam sesuai target dan warga terlibat aktif dalam perawatan awal pasca tanam.",
  },
  {
    slug: "bakti-amerta",
    no: "04",
    title: "Bakti Amerta",
    faction: "Divisi Lingkungan",
    lead: "Menyerahkan alat pengolahan air untuk Desa Sebindang.",
    body: "Akses air bersih menjadi persoalan harian di desa binaan. Penyerahan alat pengolahan air disertai pelatihan singkat agar warga dapat mengoperasikan dan merawatnya sendiri.",
    items: [
      { name: "Serah terima alat", text: "Penyerahan simbolis oleh perwakilan kampus dan jurusan kepada perangkat desa, tokoh masyarakat, serta kelompok penerima manfaat." },
      { name: "Pelatihan pengoperasian", text: "Penjelasan fungsi alat, cara pengoperasian, dan perawatan rutin agar alat berfungsi optimal dalam jangka panjang." },
    ],
    output: "Alat diterima resmi oleh desa dan mulai dipakai untuk kebutuhan air bersih sehari hari.",
  },
];

export const construction = {
  title: "Divisi Konstruksi",
  lead: "Pekerjaan fisik yang menyisakan bangunan dan penanda di desa setelah panitia pulang.",
  items: [
    { name: "Perbaikan TPS 2 x 4 meter", text: "Tempat penampungan sementara dengan dinding bata, kolom beton bertulang, dan cor semen pada bagian dasar. Gambar kerja skala 1:50 pada lampiran proposal." },
    { name: "Konstruksi tugu", text: "Penanda kegiatan yang dibangun bertahap bersama tim lingkungan dan digital sejak 12 Januari 2027." },
    { name: "Pemasangan plang dan renovasi gapura", text: "Plang petunjuk arah, plang larangan membuang sampah sembarangan, dan perbaikan gapura desa." },
  ],
};

export type Day = {
  date: string;
  day: string;
  phase: "Pra" | "Lapangan" | "Pasca";
  items: { time: string; agenda: string; note?: string }[];
};

export const rundown: Day[] = [
  { date: "7 Jan", day: "Kamis", phase: "Pra", items: [
    { time: "07.00", agenda: "Keberangkatan tim awal" },
    { time: "19.00", agenda: "Kedatangan tim awal, kontak dengan masyarakat Sungai Utik", note: "Tim awal 10 orang" },
  ]},
  { date: "8 Jan", day: "Jumat", phase: "Pra", items: [
    { time: "09.00", agenda: "Persiapan tim awal" },
    { time: "13.00", agenda: "Persiapan lanjutan sampai malam" },
  ]},
  { date: "9 Jan", day: "Sabtu", phase: "Pra", items: [
    { time: "07.00", agenda: "Keberangkatan peserta" },
    { time: "19.00", agenda: "Kedatangan panitia di lokasi", note: "Peserta 38 orang" },
  ]},
  { date: "10 Jan", day: "Minggu", phase: "Lapangan", items: [
    { time: "09.00", agenda: "Persiapan peserta dan ibadah" },
    { time: "13.00", agenda: "Pelatihan pemetaan dan pembuatan peta desa wisata", note: "Tim digital, perangkat desa" },
  ]},
  { date: "11 Jan", day: "Senin", phase: "Lapangan", items: [
    { time: "09.00", agenda: "TL Mengajar kelas 1 sampai 3 SD, survei TPS", note: "SDN 04 Sungai Utik" },
    { time: "13.00", agenda: "Perbaikan TPS dan fasilitas umum" },
  ]},
  { date: "12 Jan", day: "Selasa", phase: "Lapangan", items: [
    { time: "09.00", agenda: "TL Mengajar kelas 4 sampai 6 SD", note: "SDN 04 Sungai Utik" },
    { time: "13.00", agenda: "Briefing dan konstruksi tugu" },
  ]},
  { date: "13 Jan", day: "Rabu", phase: "Lapangan", items: [
    { time: "09.00", agenda: "TL Mengajar kelas 1 sampai 2 SMP", note: "SMPN 02 Satu Atap" },
    { time: "13.00", agenda: "Konstruksi tugu" },
  ]},
  { date: "14 Jan", day: "Kamis", phase: "Lapangan", items: [
    { time: "09.00", agenda: "TL Mengajar kelas 3 SMP", note: "SMPN 02 Satu Atap" },
    { time: "13.00", agenda: "Konstruksi tugu" },
  ]},
  { date: "15 Jan", day: "Jumat", phase: "Lapangan", items: [
    { time: "09.00", agenda: "Briefing konstruksi tugu" },
    { time: "13.00", agenda: "Konstruksi tugu" },
  ]},
  { date: "16 Jan", day: "Sabtu", phase: "Lapangan", items: [
    { time: "09.00", agenda: "SEPEDA, Sekolah Pendidikan Budaya" },
    { time: "13.00", agenda: "Ikut kegiatan masyarakat" },
  ]},
  { date: "17 Jan", day: "Minggu", phase: "Lapangan", items: [
    { time: "09.00", agenda: "Ibadah dan persiapan pelatihan" },
    { time: "13.00", agenda: "Pelatihan Canva dan CapCut untuk pengelola desa" },
  ]},
  { date: "18 Jan", day: "Senin", phase: "Lapangan", items: [
    { time: "09.00", agenda: "Briefing konstruksi tugu" },
    { time: "13.00", agenda: "Konstruksi tugu" },
  ]},
  { date: "19 Jan", day: "Selasa", phase: "Lapangan", items: [
    { time: "09.00", agenda: "Pemberian alat pengolahan air ke Desa Sebindang" },
    { time: "13.00", agenda: "Penanaman bibit varietas lokal" },
  ]},
  { date: "20 Jan", day: "Rabu", phase: "Lapangan", items: [
    { time: "09.00", agenda: "Pemasangan plang dan renovasi gapura" },
    { time: "17.00", agenda: "Persiapan dan gladi bersih" },
    { time: "19.00", agenda: "Malam Puncak" },
  ]},
  { date: "21 Jan", day: "Kamis", phase: "Pasca", items: [
    { time: "08.00", agenda: "Keberangkatan peserta, kepulangan" },
  ]},
];

export const panitia = {
  inti: [
    { role: "Ketua", name: "Benediktus Maksy Saputra" },
    { role: "Sekretaris", name: "Naura Aulia Nur" },
    { role: "Bendahara 1", name: "Najwa Aulia Fahira Haikal" },
    { role: "Bendahara 2", name: "Revalina Zulfani" },
  ],
  fields: [
    { name: "Kesekretariatan", members: ["Leira Salsabila", "Suci Rachmawati", "Ahmad Farid Mujahid"] },
    { name: "Acara", members: ["Hanssen Christian", "Hadi Nurfadhil", "Faras Dewari Mirinda", "Herdiansyah", "Fransiskus Toni"] },
    { name: "Hubungan Masyarakat", members: ["Muhammad Noor Hasby", "Muhammad Aji Agus Jumantoro", "Asael Januar William Remanda", "Aulia Yumma Seysha Sabilla", "Andika Bahari", "Faihatul Miskiyah", "Muhammad Ghiffary Aksa"] },
    { name: "Konsumsi", members: ["Hana Aliyya Ansori", "Gwen Stephany", "Naraya Rezmi Firyal", "Louisa Agustin"] },
    { name: "Usaha Dana", members: ["Nur Adila Kartika", "Namira Rihhadatul Aisy", "Yanuarius Yanu", "Nadia Ramadhani", "Febrian Sayba Jaya Kasuma"] },
    { name: "Perlengkapan", members: ["Maulana Ardiansyah", "Naufal Aqil", "Syafrizal Hafidz", "Sahrul Ramadhani", "Walburga Berenz Regan Toha"] },
    { name: "Keamanan dan Kesehatan", members: ["Fariez Muhammad Khan", "Ervando Maximilian J. S Sihombing", "Raka Pratama", "Noni Benedikta", "Muhammad Febri Dinova"] },
  ],
  divisions: [
    { name: "Lingkungan", work: "Bakti Amerta dan Griya Lestari", size: 5 },
    { name: "Digital", work: "Geo-Digital Initiative", size: 3 },
    { name: "Pendidikan", work: "TL Mengajar dan SEPEDA", size: 7 },
    { name: "Konstruksi", work: "Tugu, perbaikan TPS, pemasangan plang", size: 23 },
  ],
};

export const nav = [
  { href: "/program", label: "Program" },
  { href: "/sponsor", label: "Sponsor" },
  { href: "/berita", label: "Berita" },
  { href: "/dokumentasi", label: "Dokumentasi" },
    { href: "/tentang", label: "Tentang" },
];

// ---------------------------------------------------------------- berita
// Seed editorial: seluruh fakta berasal dari proposal (rundown, program, panitia).
// Setelah panel admin menayangkan berita pertama, isi Supabase menjadi sumber.
export type BeritaSeed = {
  slug: string;
  judul: string;
  ringkasan: string;
  konten: string;
  kategori: "Kabar" | "Lapangan" | "Pasca" | "Kemitraan";
  gambar_url: string | null;
  penulis: string;
  tanggal: string;
  unggulan: boolean;
  tampil: boolean;
};

export const beritaSeed: BeritaSeed[] = [
  {
    slug: "pmkm-arutala-2027-ditetapkan",
    judul: "PMKM ARUTALA 2027 Resmi Ditetapkan: Bakti Teknik Lingkungan ke Desa Batu Lintang",
    ringkasan:
      "Tiga puluh delapan mahasiswa Teknik Lingkungan Untan akan bekerja 15 hari di Dusun Sungai Utik, Kapuas Hulu, pada 7 sampai 21 Januari 2027.",
    konten: `## Apa yang akan dikerjakan
    ARUTALA 2027 adalah Program Pengabdian Kepada Masyarakat Mahasiswa Teknik Lingkungan Universitas Tanjungpura.
    Tahun ini sasaran kegiatan ada dua desa di Kecamatan Embaloh Hulu, Kabupaten Kapuas Hulu: Desa Batu Lintang
    (khususnya Dusun Sungai Utik) dan Desa Sebindang.

    Empat program kerja menjadi inti kegiatan: pemetaan digital dan desa wisata, edukasi lingkungan di sekolah,
    penghijauan dan perbaikan sanitasi, serta penyediaan alat pengolahan air bersih Sebindang.

    ## Kenapa desa ini
    Sungai Utik dikenal luas karena Rumah Betang dan komitmen masyarakat adat menjaga hutan. Data ruang desa
    itu belum terdigitalisasi, sementara persoalan sampah, sanitasi, dan air bersih menunggu sentuhan teknis.
    Di titik pertemuan itulah mahasiswa Teknik Lingkungan hadir: membawa metode, belajar dari warga.

    ## Jadwal besar
    Tim awal bertolak lebih dulu pada 7 Januari untuk menyiapkan sambutan dan teknis lapangan, disusul
    keberangkatan peserta pada 9 Januari. Rangkaian ditutup malam puncak dan kembali ke Pontianak pada 21 Januari.
    Detail harian dapat dibaca di halaman Program.`,
    kategori: "Kabar",
    gambar_url: "/img/og-arutala.jpg",
    penulis: "Sekretaris ARUTALA 2027",
    tanggal: "2026-11-25",
    unggulan: true,
    tampil: true,
  },
  {
    slug: "survei-awal-jejak-menuju-hulu-kapuas",
    judul: "Tim Survei Menjejak Jalan ke Hulu Kapuas, Denah Lokasi Disiapkan",
    ringkasan:
      "Survei awal memetakan akses, titik kegiatan, dan denah lokasi skala 1:1.000 sebagai dasar kerja lapangan.",
    konten: `## Denah 1:1.000
    Tim survei menyusun peta denah lokasi kegiatan dengan basemap citra satelit: jalan, rumah warga, lahan,
    pekarangan, posyandu, dan rumah ibadah ditandai satu per satu. Denah inilah yang menjadi acuan letak
    tugu, plang, titik perbaikan TPS, dan lokasi penanaman bibit.

    ## Jalur darat lintas provinsi
    Perjalanan dari Pontianak memakai bus perintis melalui jalur darat lintas Kalimantan Barat. Waktu tempuh
    dan biaya transportasi ini menjadi pos anggaran terbesar, sehingga jadwal keberangkatan disusun presisi.

    ## Apa berikutnya
    Hasil survei dibahas dalam persiapan tim awal sebelum peserta berangkat. Catatan lapangan versi foto akan
    ditambahkan ke halaman Dokumentasi setelah tim awal tiba di Sungai Utik.`,
    kategori: "Kabar",
    gambar_url: "/img/peta-lokasi.jpg",
    penulis: "Divisi Survey Awal",
    tanggal: "2026-12-05",
    unggulan: false,
    tampil: true,
  },
  {
    slug: "pamflet-kampanye-dana-dibuka",
    judul: "Pamflet Kemitraan Dibuka untuk Calon Mitra",
    ringkasan:
      "Matriks fasilitas sponsor, simulasi peletakan logo di rompi panitia, dan kanal resmi kemitraan tersedia publik.",
    konten: `## Kemudahan bagi mitra
    Halaman Sponsor kini menampilkan empat tingkatan dukungan, matriks fasilitas yang jelas per tingkatan,
    serta simulasi tata letak logo mitra pada rompi panitia. Kapasitas slot logo dibatasi tiga puluh delapan posisi
    agar setiap mitra mendapat tempat yang terbaca.

    ## Kanal resmi
    Ringkasan proposal dan data kegiatan dibuka di halaman Tautan. Setiap penawaran resmi selalu mencantumkan kontak
    panitia yang tercantum di halaman Tautan; di luar kanal itu bukan wewenang kepanitiaan.`,
    kategori: "Kemitraan",
    gambar_url: null,
    penulis: "Divisi Usaha Dana",
    tanggal: "2026-12-12",
    unggulan: false,
    tampil: true,
  },
  {
    slug: "rumah-betang-temu-akhir",
    judul: "Rumah Betang Jadi Titik Temu Akhir Ekspedisi",
    ringkasan:
      "Pameran hasil dirancang di ruang komunal rumah betang: warga, mahasiswa, dan pemerintah desa duduk bersama membaca data sungai.",
    konten: [
      "Pekan lalu, Divisi Acara menyepakati satu keputusan penting soal panggung: bukan tenda, melainkan rumah betang.",
      "## Kenapa rumah betang",
      "Rumah betang adalah arsitektur bersama. Tiap-tiap tiangnya ditopang lebih dari satu keluarga, dan ruang tengahnya tidak pernah dipakai satu pihak sendirian. Ketika hasil ekspedisi dibentangkan di sana, data sungai berdiri di ruang yang oleh warga memang sudah dipercaya sebagai tempat bermusyawarah.",
      "## Format temu akhir",
      "Pameran hasil akan diisi panel data kualitas air, peta jalur ekspedisi, dan galeri foto lapangan. Warga Batu Lintang mengundang Kecamatan Embaloh Hulu dan Dinas Lingkungan Hidup Kapuas Hulu untuk duduk bersama.",
      "> Sungai yang kita ukur di hulu akan dibaca oleh orang yang sama di hilir. Karena itu temu akhirnya di rumah bersama, bukan di kelas.",
      "Seluruh materi pameran akan didokumentasikan sebagai berita rubrik Pasca pada situs ini.",
    ].join("\n"),
    kategori: "Kabar",
    gambar_url: null,
    penulis: "Divisi Acara",
    tanggal: "2026-12-20",
    unggulan: false,
    tampil: true,
  },
];
