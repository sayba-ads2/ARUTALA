import { listBerita } from "@/lib/repo";

export const revalidate = 3600;

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arutala.web.id";

export async function GET() {
  const rows = await listBerita();
  const items = rows
    .slice(0, 30)
    .map(
      (b) => `
    <item>
      <title><![CDATA[${b.judul}]]></title>
      <link>${base}/berita/${b.slug}</link>
      <guid isPermaLink="true">${base}/berita/${b.slug}</guid>
      <description><![CDATA[${b.ringkasan}]]></description>
      <category>${b.kategori}</category>
      ${b.penulis ? `<dc:creator><![CDATA[${b.penulis}]]></dc:creator>` : ""}
      <pubDate>${new Date(b.tanggal + "T00:00:00").toUTCString()}</pubDate>
    </item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ARUTALA 2027 — Kabar</title>
    <link>${base}</link>
    <description>Kabar resmi PMKM ARUTALA 2027, Teknik Lingkungan Universitas Tanjungpura.</description>
    <language>id</language>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
