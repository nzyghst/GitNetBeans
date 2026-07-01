/* PitStop Express — Service Worker (PWA offline) */
const VERSION = 'pitstop-v2';
const CORE = [
  'index.html', 'servicios.html', 'reservas.html', 'tienda.html', 'carrito.html',
  'nosotros.html', 'blog.html', 'contacto.html', 'mis-reservas.html', 'ofertas.html', 'offline.html',
  'css/styles.css', 'js/data.js', 'js/main.js', 'js/home.js', 'js/reservas.js', 'js/tienda.js',
  'assets/favicon.svg', 'manifest.webmanifest',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE.map((u) => new Request(u, { cache: 'reload' }))).catch(() => {})).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // no cachear terceros (fuentes, mapa)

  // HTML: network-first con fallback a caché y a offline.html
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    e.respondWith(
      fetch(req).then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then((r) => r || caches.match('offline.html')))
    );
    return;
  }

  // Estáticos: cache-first
  e.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res;
    }).catch(() => cached))
  );
});
