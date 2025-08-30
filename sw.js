// /sw.js
const VERSION = 'mkdc-v1';
const IMG_CACHE = `images-${VERSION}`;

self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(k => ![IMG_CACHE].includes(k)).map(k => caches.delete(k)))).then(()=>self.clients.claim())
));

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Same-origin images only
  if (req.destination === 'image' && url.origin === location.origin) {
    event.respondWith((async () => {
      const cache = await caches.open(IMG_CACHE);
      const cached = await cache.match(req);
      const network = fetch(req).then(res => {
        if (res.ok) cache.put(req, res.clone());
        return res;
      }).catch(() => cached);
      return cached || network;
    })());
  }
});
