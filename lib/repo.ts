import { getSupabaseAdmin } from "./supabase-admin";
import { programs as seedPrograms, beritaSeed, type Program, type BeritaSeed } from "./content";
import { tierOf } from "./format";

export type Sponsor = {
  id: string;
  nama_sponsor: string;
  jenis_dukungan: "Dana" | "Barang" | "Jasa" | "Konsumsi";
  nominal_akumulasi: number;
  logo_url: string | null;
  tautan_mitra: string | null;
  tampilkan_nama: boolean;
  tanggal_masuk: string | null;
  tier?: string;
  created_at?: string;
};

export type Dokumentasi = {
  id: string;
  tanggal: string;
  judul: string;
  keterangan: string | null;
  fase: "Pra" | "Lapangan" | "Pasca";
  program_slug: string | null;
  gambar_url: string | null;
  tampil: boolean;
};

const safe = async <T,>(fn: () => Promise<T>, fallback: T): Promise<T> => {
  try {
    return await fn();
  } catch {
    return fallback;
  }
};

export const listSponsors = () =>
  safe<Sponsor[]>(async () => {
    const db = getSupabaseAdmin();
    if (!db) return [];
    const { data, error } = await db
      .from("sponsors")
      .select("id,nama_sponsor,jenis_dukungan,nominal_akumulasi,logo_url,tautan_mitra,tampilkan_nama,tanggal_masuk,created_at")
      .order("nominal_akumulasi", { ascending: false });
    if (error) return [];
    return (data ?? []).map((row) => ({ ...row, tier: tierOf(row.nominal_akumulasi) })) as Sponsor[];
  }, []);

export const listPrograms = () =>
  safe<Program[]>(async () => {
    const db = getSupabaseAdmin();
    if (!db) return seedPrograms;
    const { data, error } = await db
      .from("programs")
      .select("slug,no,title,faction,lead,body,items,output")
      .eq("publikasi", true)
      .order("no", { ascending: true });
    if (error || !data || data.length === 0) return seedPrograms;
    return data as Program[];
  }, seedPrograms);

export const listDokumentasi = (publikSaja = true) =>
  safe<Dokumentasi[]>(async () => {
    const db = getSupabaseAdmin();
    if (!db) return [];
    let q = db.from("dokumentasi").select("*").order("tanggal", { ascending: true });
    if (publikSaja) q = q.eq("tampil", true);
    const { data, error } = await q;
    if (error) return [];
    return (data ?? []) as Dokumentasi[];
  }, []);

export type Berita = {
  id: string;
  slug: string;
  judul: string;
  ringkasan: string;
  konten: string;
  kategori: string;
  gambar_url: string | null;
  penulis: string | null;
  tanggal: string;
  unggulan: boolean;
  tampil: boolean;
  created_at?: string;
};

const normalizeKonten = (t: string) => {
  type Blok = { kind: "p" | "h" | "q"; lines: string[] } | null;
  const blocks: { kind: "p" | "h" | "q"; lines: string[] }[] = [];
  let cur: Blok = null;
  for (const raw of t.split("\n")) {
    const line = raw.trim();
    if (!line) {
      cur = null;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push({ kind: "h", lines: [line.slice(3)] });
      cur = null;
      continue;
    }
    if (line.startsWith("> ")) {
      if (cur && cur.kind === "q") cur.lines.push(line.slice(2));
      else {
        cur = { kind: "q", lines: [line.slice(2)] };
        blocks.push(cur);
      }
      continue;
    }
    if (cur && cur.kind === "p") cur.lines.push(line);
    else {
      cur = { kind: "p", lines: [line] };
      blocks.push(cur);
    }
  }
  return blocks
    .map((b) => (b.kind === "h" ? "## " : b.kind === "q" ? "> " : "") + b.lines.join(" "))
    .join("\n\n")
    .trim();
};

const seedToBerita = (b: BeritaSeed): Berita => ({
  id: "seed-" + b.slug,
  slug: b.slug,
  judul: b.judul,
  ringkasan: b.ringkasan,
  konten: normalizeKonten(b.konten),
  kategori: b.kategori,
  gambar_url: b.gambar_url,
  penulis: b.penulis,
  tanggal: b.tanggal,
  unggulan: b.unggulan,
  tampil: b.tampil,
});

export const listBerita = (opts: { kategori?: string; publikSaja?: boolean } = {}) =>
  safe<Berita[]>(async () => {
    const db = getSupabaseAdmin();
    if (!db) {
      const rows = beritaSeed.map((b) => seedToBerita(b));
      return opts.kategori && opts.kategori !== "Semua" ? rows.filter((r) => r.kategori === opts.kategori) : rows;
    }
    let q = db.from("berita").select("*").order("tanggal", { ascending: false });
    if (opts.publikSaja !== false) q = q.eq("tampil", true);
    if (opts.kategori && opts.kategori !== "Semua") q = q.eq("kategori", opts.kategori);
    const { data, error } = await q;
    if (error) return beritaSeed.map((b) => seedToBerita(b));
    if (!data || data.length === 0) return beritaSeed.map((b) => seedToBerita(b));
    return data as Berita[];
  }, beritaSeed.map((b) => seedToBerita(b)));

export const getBeritaBySlug = (slug: string) =>
  safe<Berita | null>(async () => {
    const db = getSupabaseAdmin();
    if (!db) return beritaSeed.map((b) => seedToBerita(b)).find((b) => b.slug === slug) ?? null;
    const { data, error } = await db
      .from("berita")
      .select("*")
      .eq("slug", slug)
      .eq("tampil", true)
      .maybeSingle();
    if (error) return null;
    const seed = beritaSeed.map((b) => seedToBerita(b)).find((b) => b.slug === slug);
    return (data as Berita) ?? seed ?? null;
  }, null);

export const listKategoriBerita = () =>
  safe<string[]>(async () => {
    const rows = await listBerita();
    return Array.from(new Set(rows.map((b) => b.kategori)));
  }, []);

export { tierOf };
