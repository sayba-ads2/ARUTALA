import type { ReactNode } from "react";

/** ShinyText ala React Bits: kilau menyapu teks. CSS-only, SSR-safe. */
export default function ShinyText({
  text,
  className = "",
  children,
}: {
  text?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <span className={`rb-shiny ${className}`} aria-hidden="true">
      {children ?? text}
    </span>
  );
}
