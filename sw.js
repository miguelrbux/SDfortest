// Service worker: la app y los datos base funcionan sin conexión.
const VERSION = "valdi-v1";
const BASE = ["./", "index.html", "styles.css", "app.js", "config.js", "data/lugares.json", "manifest.webmanifest",
  "icons/favicon.svg", "icons/favicon-32.png", "icons/isotipo-180.png", "icons/isotipo-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(BASE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// Archivos propios: red primero y caché de respaldo, para que los cambios se vean apenas se publican.
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then((r) => {
      const copia = r.clone();
      caches.open(VERSION).then((c) => c.put(e.request, copia));
      return r;
    }).catch(() => caches.match(e.request).then((r) => r || caches.match("index.html")))
  );
});
