/** Judul yang tersusun per huruf lalu naik bergelombang. Murni CSS — jalan bahkan sebelum hydrate. */
export default function SplitTitle({ text, className = "" }: { text: string; className?: string }) {
  return (
    <h1 className={`hero__title split ${className}`.trim()}>
      <span aria-hidden="true" style={{ display: "inline" }}>
        {text.split("").map((ch, i) => (
          <span key={i} className="ch" style={{ animationDelay: `${120 + i * 55}ms` }}>
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
      <span className="sr-only">{text}</span>
    </h1>
  );
}
