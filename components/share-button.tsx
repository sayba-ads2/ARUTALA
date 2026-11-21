"use client";

import { useState } from "react";

type Props = {
  title?: string;
  text?: string;
  /** path relatif; default memakai URL halaman saat ini */
  url?: string;
  className?: string;
};

export default function ShareButton({ title, text, url, className = "btn btn--ghost btn--sm" }: Props) {
  const [label, setLabel] = useState("Bagikan halaman ini");

  const share = async () => {
    const href = url ? new URL(url, window.location.origin).href : window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: title ?? "ARUTALA 2027", text, url: href });
        return;
      }
      await navigator.clipboard.writeText(href);
      setLabel("Tautan disalin");
      window.setTimeout(() => setLabel("Bagikan halaman ini"), 2000);
    } catch {
      setLabel("Salin manual dari bilah alamat");
    }
  };

  return (
    <button type="button" className={className} onClick={share}>
      {label}
    </button>
  );
}
