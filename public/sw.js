/* ARUTALA 2027 — service worker sederhana & aman.
   - Aset build & gambar: cache-first (versi baru otomatis menggantikannya).
   - Halaman HTML: network-first, fallback cache (offline masih bisa baca).
   - API/Supabase/auth: selalu lewat jaringan (tidak pernah di-cache).
*/
const VERSION = "arutala-v1";
const SHELL = ["/", "/berita", "/program", "/sponsor", "/dokumentasi", "/tentang", "/manifest.webmanifest", "/img/logo-arutala-kotak.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(VERSION).then((c) => c.addAll(SHELL)).catch(() => undefined).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // jangan sentuh Supabase/API pihak ketiga
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/admin")) return;

  // aset statis build & gambar: cache-first
  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/img/") || url.pathname.startsWith("/fonts/") || url.pathname === "/favicon.ico") {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            const copy = res.clone();
            caches.open(VERSION).then((c) => c.put(req, copy));
            return res;
          })
      )
    );
    return;
  }

  // halaman HTML: network-first dengan fallback cache
  if (req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html")) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match("/")))
    );
  }
});
