// Service worker: la app y los datos base funcionan sin conexión.
const VERSION = "remada-v5";
const FOTOS = "valdi-fotos-v1";
const BASE = ["./", "index.html", "styles.css", "app.js", "config.js", "data/lugares.json", "manifest.webmanifest",
  "icons/favicon.svg", "icons/favicon-32.png", "icons/isotipo-180.png", "icons/isotipo-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(BASE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION && k !== FOTOS).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// Archivos propios: red primero y caché de respaldo, para que los cambios se vean apenas se publican.
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  // Fotos de Wikimedia: caché primero, para verlas también sin conexión.
  if (/(^|\.)wikimedia\.org$/.test(u.hostname) && e.request.destination === "image") {
    e.respondWith(caches.open(FOTOS).then((c) => c.match(e.request).then((hit) => hit || fetch(e.request).then((r) => { c.put(e.request, r.clone()); return r; }))));
    return;
  }
  if (u.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then((r) => {
      const copia = r.clone();
      caches.open(VERSION).then((c) => c.put(e.request, copia));
      return r;
    }).catch(() => caches.match(e.request).then((r) => r || caches.match("index.html")))
  );
});
