// Minimal service worker for the /admin PWA scope. Deliberately does NOT
// cache anything — this is a live-editing admin tool, and a stale cache of
// fuel prices or a stale admin session would be actively dangerous. It only
// exists so the browser considers /admin installable.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
