const CACHE = 'financas-v2'
self.addEventListener('install', (e) => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['./', 'index.html', 'dados.json', 'manifest.webmanifest', 'icone-180.png']))) })
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()))
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return
  e.respondWith(fetch(e.request).then((r) => { const copia = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copia)); return r })
    .catch(() => caches.match(e.request, { ignoreSearch: true })))
})
