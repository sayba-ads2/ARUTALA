import Link from "next/link";

type Item = { label: string; href?: string; strong?: string };

/** Pita kabar berjalan: konten diulang dua kali agar animasi -50% mulus. */
export default function Ticker({ items }: { items: Item[] }) {
  const run = (
    <>
      {items.map((it, i) =>
        it.href ? (
          <Link key={i} href={it.href} className="ticker__item">
            {it.strong && <b>{it.strong}</b>}
            {it.label}
          </Link>
        ) : (
          <span key={i} className="ticker__item">
            {it.strong && <b>{it.strong}</b>}
            {it.label}
          </span>
        ),
      )}
    </>
  );
  return (
    <div className="ticker" aria-label="Kabar singkat ARUTALA">
      <div className="ticker__track">
        <div style={{ display: "flex", gap: "2.5rem" }}>{run}</div>
        <div style={{ display: "flex", gap: "2.5rem" }} aria-hidden="true">
          {run}
        </div>
      </div>
    </div>
  );
}
