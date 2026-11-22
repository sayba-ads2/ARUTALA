"use client";

import { useCallback, useEffect, useState } from "react";
import { rupiah } from "@/lib/format";

type Tab = "ringkasan" | "sponsors" | "programs" | "dokumentasi" | "berita";
type Row = Record<string, unknown>;

type Field = {
  key: string;
  label: string;
  type: "text" | "number" | "textarea" | "select" | "checkbox" | "date";
  options?: string[];
  required?: boolean;
  half?: boolean;
  placeholder?: string;
};

const TABS: { id: Tab; label: string }[] = [
  { id: "ringkasan", label: "Ringkasan" },
  { id: "sponsors", label: "Sponsor" },
  { id: "programs", label: "Program" },
  { id: "dokumentasi", label: "Dokumentasi" },
  { id: "berita", label: "Berita" },
];

const FIELDS: Record<Exclude<Tab, "ringkasan">, Field[]> = {
  sponsors: [
    { key: "nama_sponsor", label: "Nama sponsor", type: "text", required: true },
    { key: "jenis_dukungan", label: "Jenis dukungan", type: "select", options: ["Dana", "Barang", "Jasa", "Konsumsi"], half: true },
    { key: "nominal_akumulasi", label: "Nominal (Rp)", type: "number", required: true, half: true },
    { key: "tanggal_masuk", label: "Tanggal masuk", type: "date", half: true },
    { key: "logo_url", label: "URL logo", type: "text", half: true, placeholder: "/img/sponsor/nama.svg" },
    { key: "tautan_mitra", label: "Tautan mitra", type: "text", placeholder: "https://instagram.com/..." },
    { key: "tampilkan_nama", label: "Tampilkan nama (matikan untuk anonim)", type: "checkbox" },
  ],
  programs: [
    { key: "no", label: "Nomor urut", type: "text", required: true, half: true },
    { key: "slug", label: "Slug", type: "text", required: true, half: true },
    { key: "title", label: "Judul program", type: "text", required: true },
    { key: "faction", label: "Divisi", type: "text", half: true },
    { key: "lead", label: "Ringkasan satu baris", type: "text", required: true },
    { key: "body", label: "Uraian", type: "textarea" },
    { key: "output", label: "Indikator keberhasilan", type: "text" },
    { key: "publikasi", label: "Tampilkan di situs", type: "checkbox" },
  ],
  dokumentasi: [
    { key: "tanggal", label: "Tanggal", type: "date", required: true, half: true },
    { key: "fase", label: "Fase", type: "select", options: ["Pra", "Lapangan", "Pasca"], half: true },
    { key: "judul", label: "Judul catatan", type: "text", required: true },
    { key: "keterangan", label: "Keterangan", type: "textarea" },
    { key: "program_slug", label: "Terkait program", type: "text", half: true, placeholder: "geo-digital" },
    { key: "gambar_url", label: "URL gambar", type: "text", half: true },
    { key: "tampil", label: "Tampilkan di halaman dokumentasi", type: "checkbox" },
  ],
  berita: [
    { key: "judul", label: "Judul berita", type: "text", required: true },
    { key: "kategori", label: "Kategori", type: "select", options: ["Kabar", "Lapangan", "Pasca", "Kemitraan"], half: true },
    { key: "tanggal", label: "Tanggal terbit", type: "date", required: true, half: true },
    { key: "ringkasan", label: "Ringkasan (tampil di kartu)", type: "textarea", required: true },
    { key: "konten", label: "Isi berita (baris kosong = paragraf baru; awali baris dengan ## untuk subjudul, > untuk kutipan)", type: "textarea" },
    { key: "penulis", label: "Penulis / divisi", type: "text", half: true, placeholder: "Humas ARUTALA" },
    { key: "gambar_url", label: "URL gambar utama", type: "text", half: true, placeholder: "/img/berita/nama.jpg" },
    { key: "unggulan", label: "Jadwalkan sebagai berita utama", type: "checkbox" },
    { key: "tampil", label: "Tampilkan di halaman berita", type: "checkbox" },
  ],
};

const DEFAULTS: Record<string, Row> = {
  sponsors: { nama_sponsor: "", jenis_dukungan: "Dana", nominal_akumulasi: 0, tanggal_masuk: "", logo_url: "", tautan_mitra: "", tampilkan_nama: true },
  programs: { no: "05", slug: "", title: "", faction: "", lead: "", body: "", output: "", publikasi: true },
  dokumentasi: { tanggal: "", fase: "Lapangan", judul: "", keterangan: "", program_slug: "", gambar_url: "", tampil: true },
  berita: { judul: "", kategori: "Kabar", tanggal: "", ringkasan: "", konten: "", penulis: "Humas ARUTALA", gambar_url: "", unggulan: false, tampil: true },
};

export default function AdminDashboard({ email }: { email: string }) {
  const [tab, setTab] = useState<Tab>("ringkasan");
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [form, setForm] = useState<Row>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [counts, setCounts] = useState({ sponsors: 0, dokumentasi: 0, berita: 0 });

  const load = useCallback(
    async (which: Tab) => {
      if (which === "ringkasan") {
        setLoading(true);
        try {
          const [sp, dk, br] = await Promise.all([
            fetch("/api/admin/sponsors").then((r) => r.json()),
            fetch("/api/admin/dokumentasi").then((r) => r.json()),
            fetch("/api/admin/berita").then((r) => r.json()),
          ]);
          setCounts({
            sponsors: (sp.data ?? []).length,
            dokumentasi: (dk.data ?? []).length,
            berita: (br.data ?? []).length,
          });
        } finally {
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/admin/${which}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Gagal memuat data.");
          setRows([]);
        } else {
          setRows(data.data ?? []);
        }
      } catch {
        setError("Tidak dapat menghubungi server.");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    void load(tab);
  }, [tab, load]);

  // Isi form dengan nilai awal tiap kali tab berganti, supaya pilihan
  // (jenis dukungan, fase, kategori) dan checkbox tidak kosong saat pertama dibuka.
  const reset = useCallback(() => {
    setEditingId(null);
    setForm(tab in DEFAULTS ? { ...DEFAULTS[tab] } : {});
  }, [tab]);

  useEffect(() => {
    reset();
  }, [reset]);

  const startEdit = (row: Row) => {
    setEditingId(String(row.id));
    const next: Row = {};
    for (const f of FIELDS[tab as keyof typeof FIELDS]) next[f.key] = row[f.key] ?? "";
    setForm(next);
    setError(null);
    setNotice(null);
    document.querySelector(".admin-section")?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  // Pesan sukses hilang sendiri agar tidak menumpuk saat menginput banyak data.
  useEffect(() => {
    if (!notice) return;
    const id = window.setTimeout(() => setNotice(null), 4000);
    return () => window.clearTimeout(id);
  }, [notice]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    const endpoint = `/api/admin/${tab}`;
    const payload = editingId ? { id: editingId, ...form } : form;
    const res = await fetch(endpoint, {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Gagal menyimpan.");
      return;
    }
    setNotice(editingId ? "Perubahan disimpan." : "Data baru ditambahkan.");
    reset();
    void load(tab);
  };

  const remove = async (id: string) => {
    if (!window.confirm("Hapus data ini? Tindakan tidak bisa dibatalkan.")) return;
    const res = await fetch(`/api/admin/${tab}?id=${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Gagal menghapus.");
      return;
    }
    setNotice("Data dihapus.");
    void load(tab);
  };

  const fields = tab === "ringkasan" ? [] : FIELDS[tab];

  return (
    <div className="admin-shell">
      <aside className="admin-side" aria-label="Navigasi panel">
        <p className="admin-side__title">Bagian</p>
        <div className="admin-side__nav" role="tablist" aria-label="Bagian panel admin">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              aria-current={tab === t.id ? "page" : undefined}
              className="admin-side__item"
              onClick={() => {
                setTab(t.id);
                reset();
                setError(null);
                setNotice(null);
                window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-top">
          <h1>{TABS.find((t) => t.id === tab)?.label}</h1>
          <span className="mono small muted">{email}</span>
        </div>

        {error && (
          <p className="notice" role="alert" style={{ marginBottom: "1rem" }}>
            {error}
          </p>
        )}
        {notice && (
          <p className="notice notice--plain" role="status" style={{ marginBottom: "1rem" }}>
            {notice}
          </p>
        )}

        {tab === "ringkasan" && (
          <>
            <div className="admin-kpi">
              <div className="card">
                <b>{counts.sponsors}</b>
                <span>Mitra</span>
              </div>
              <div className="card">
                <b>{counts.berita}</b>
                <span>Kabar berita</span>
              </div>
              <div className="card">
                <b>{counts.dokumentasi}</b>
                <span>Catatan dokumentasi</span>
              </div>
            </div>
            {loading && <p className="small muted">Memuat ringkasan...</p>}
            <div className="notice">
              <b>Alur kerja.</b> Tambahkan sponsor di tab Sponsor agar papan peringkat dan simulasi rompi ikut
              berubah. Berita dan dokumentasi yang ditambahkan muncul otomatis di halaman rubrik serta sitemap.
            </div>
          </>
        )}

        {fields.length > 0 && (
          <section className="admin-section">
            <h2 className="display" style={{ fontSize: "1.3rem", margin: "0 0 .75rem" }}>
              {editingId ? "Ubah data" : "Tambah data"}
            </h2>
            <form className="card" onSubmit={save}>
              <div className="form-grid">
                {fields.map((f) => (
                  <label className="field" key={f.key} style={f.half ? undefined : { gridColumn: "1 / -1" }}>
                    <span className="label">{f.label}</span>
                    {f.type === "textarea" ? (
                      <textarea
                        className="textarea"
                        value={String(form[f.key] ?? "")}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      />
                    ) : f.type === "select" ? (
                      <select
                        className="select"
                        value={String(form[f.key] ?? "")}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      >
                        {f.options?.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    ) : f.type === "checkbox" ? (
                      <input
                        type="checkbox"
                        checked={Boolean(form[f.key])}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.checked })}
                        style={{ width: 20, height: 20 }}
                      />
                    ) : (
                      <input
                        className="input"
                        type={f.type}
                        required={f.required}
                        placeholder={f.placeholder}
                        value={String(form[f.key] ?? "")}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value,
                          })
                        }
                      />
                    )}
                  </label>
                ))}
              </div>
              <div style={{ display: "flex", gap: ".6rem", marginTop: ".5rem" }}>
                <button className="btn btn--primary" type="submit">
                  {editingId ? "Simpan perubahan" : "Tambah"}
                </button>
                {editingId && (
                  <button className="btn btn--ghost" type="button" onClick={reset}>
                    Batal
                  </button>
                )}
              </div>
            </form>
          </section>
        )}

        {tab !== "ringkasan" && (
          <section className="admin-section">
            <h2 className="display" style={{ fontSize: "1.3rem", margin: "0 0 .75rem" }}>
              Daftar {TABS.find((t) => t.id === tab)?.label}
            </h2>
            {loading ? (
              <p className="small muted">Memuat data...</p>
            ) : rows.length === 0 ? (
              <p className="notice notice--plain">Belum ada data. Tambahkan lewat formulir di atas.</p>
            ) : (
              <div className="admin-rows">
                {rows.map((r) => (
                  <div className="admin-row" key={String(r.id)}>
                    <div className="admin-row__main">
                      <b>
                        {String(
                          r.nama_sponsor ??
                            r.nama ??
                            r.title ??
                            r.judul ??
                            r.kode ??
                            r.slug ??
                            "Tanpa nama",
                        )}
                      </b>
                      <small>
                        {tab === "sponsors" &&
                          `${String(r.jenis_dukungan)} · ${rupiah(Number(r.nominal_akumulasi))} · ${
                            r.tampilkan_nama ? "nama tampil" : "anonim"
                          }`}
                        {tab === "programs" && `${String(r.slug)} · ${r.publikasi ? "publik" : "draf"}`}
                        {tab === "dokumentasi" && `${String(r.tanggal)} · ${String(r.fase)} · ${r.tampil ? "tampil" : "disembunyikan"}`}
                        {tab === "berita" && `${String(r.tanggal)} · ${String(r.kategori)}${r.unggulan ? " · unggulan" : ""} · ${r.tampil ? "tampil" : "disembunyikan"}`}
                      </small>
                    </div>
                    <div className="admin-actions">
                      <button className="btn btn--ghost btn--sm" type="button" onClick={() => startEdit(r)}>
                        Ubah
                      </button>
                      <button className="btn btn--ghost btn--sm" type="button" onClick={() => remove(String(r.id))}>
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
