const CACHE_NAME = "anre-quiz-v8";
const CORE = ["./","./index.html","./questions.js","./manifest.webmanifest","./icon.svg","./icon-180.png","./assets/electrotehnica-169.jpg","./assets/electrotehnica-170.jpg","./assets/electrotehnica-174.jpg","./assets/electrotehnica-175.jpg","./assets/electrotehnica-25-option-1.jpg","./assets/electrotehnica-25-option-2.jpg","./assets/electrotehnica-25-option-3.jpg","./assets/electrotehnica-26-option-1.jpg","./assets/electrotehnica-26-option-2.jpg","./assets/electrotehnica-26-option-3.jpg","./assets/electrotehnica-27-option-1.jpg","./assets/electrotehnica-27-option-2.jpg","./assets/electrotehnica-27-option-3.jpg","./assets/electrotehnica-31.jpg","./assets/electrotehnica-31.png","./assets/electrotehnica-34.jpg","./assets/electrotehnica-34.png","./assets/electrotehnica-40.jpg","./assets/electrotehnica-40.png","./assets/electrotehnica-41.png","./assets/electrotehnica-8.jpg","./assets/electrotehnica-8.png"]
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response && response.ok && new URL(event.request.url).origin === self.location.origin) {
      const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
    }
    return response;
  }).catch(() => caches.match("./index.html"))));
});