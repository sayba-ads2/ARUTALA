import type { MetadataRoute } from "next";
import { listBerita } from "@/lib/repo";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arutala.web.id";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/program", "/sponsor", "/berita", "/dokumentasi", "/sosial", "/links", "/tentang", "/merch"];
  const now = new Date();
  const statis = routes.map((r) => ({
    url: base + r,
    lastModified: now,
    changeFrequency: r === "" || r === "/sponsor" || r === "/berita" ? ("weekly" as const) : ("monthly" as const),
    priority: r === "" ? 1 : 0.7,
  }));
  const berita = await listBerita();
  return [
    ...statis,
    ...berita.map((b) => ({
      url: `${base}/berita/${b.slug}`,
      lastModified: new Date(b.tanggal + "T00:00:00"),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
