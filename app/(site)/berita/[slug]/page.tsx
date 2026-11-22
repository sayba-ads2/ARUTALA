import Link from "next/link";
import { notFound } from "next/navigation";
import TenunBand from "@/components/tenun-band";
import ShareButton from "@/components/share-button";
import { ReadingProgress, NewsBody, NewsCard } from "@/components/news";
import { estimateMinutes } from "@/lib/format";
import { listBerita, getBeritaBySlug } from "@/lib/repo";
import { formatDate } from "@/lib/format";
import { site } from "@/lib/content";

export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const rows = await listBerita();
  return rows.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const berita = await getBeritaBySlug(slug);
  if (!berita) return {};
  return {
    title: berita.judul,
    description: berita.ringkasan,
    alternates: { canonical: `/berita/${berita.slug}` },
    openGraph: {
      type: "article",
      title: berita.judul,
      description: berita.ringkasan,
      publishedTime: berita.tanggal,
      images: berita.gambar_url ? [{ url: berita.gambar_url }] : undefined,
    },
  };
}

export default async function BeritaDetail({ params }: Params) {
  const { slug } = await params;
  const berita = await getBeritaBySlug(slug);
  if (!berita) notFound();

  const all = await listBerita();
  const related = all
    .filter((b) => b.slug !== berita.slug)
    .slice(0, 3);
  const minutes = estimateMinutes(berita.konten);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: berita.judul,
    description: berita.ringkasan,
    datePublished: berita.tanggal,
    author: { "@type": "Organization", name: berita.penulis ?? site.organizer },
    publisher: { "@type": "Organization", name: site.organizer },
    mainEntityOfPage: `/berita/${berita.slug}`,
    articleSection: berita.kategori,
    inLanguage: "id",
  };

  return (
    <>
      <ReadingProgress />
      <article className="section section--tight article">
        <div className="wrap">
          <header className="article__head">
            <p className="eyebrow">
              <Link href="/berita" className="textlink">
                Berita
              </Link>{" "}
              / {berita.kategori}
            </p>
            <h1 className="section-title" style={{ marginTop: "0.5rem" }}>
              {berita.judul}
            </h1>
            <p className="lede" style={{ marginTop: "0.9rem" }}>
              {berita.ringkasan}
            </p>
            <div
              className="mono small muted"
              style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem 1.4rem", marginTop: "1.2rem" }}
            >
              <span>{berita.penulis ?? site.organizer}</span>
              <span>{formatDate(berita.tanggal)}</span>
              <span>{minutes} menit baca</span>
              <ShareButton
                title={berita.judul}
                text={berita.ringkasan}
                url={`/berita/${berita.slug}`}
              />
            </div>
          </header>

          {berita.gambar_url && (
            <figure className="article__cover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={berita.gambar_url} alt={berita.judul} loading="eager" />
            </figure>
          )}

          <div className="article__body">
            <NewsBody teks={berita.konten} />
          </div>

          <div className="article__rule" aria-hidden="true" />

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", justifyContent: "center" }}>
            <Link href="/berita" className="btn btn--ghost btn--sm">
              Semua berita
            </Link>
            <Link href="/sponsor" className="btn btn--primary btn--sm">
              Jadi bagian kabar berikutnya
            </Link>
          </div>

          {related.length > 0 && (
            <section style={{ marginTop: "clamp(2.6rem, 6vw, 4rem)" }} aria-label="Berita terkait">
              <p className="eyebrow" style={{ marginBottom: "1rem" }}>Kabar lain</p>
              <div className="related-strip">
                {related.map((b) => (
                  <NewsCard key={b.slug} item={{ ...b, tanggal: formatDate(b.tanggal) }} />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
      <TenunBand variant="dark" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
