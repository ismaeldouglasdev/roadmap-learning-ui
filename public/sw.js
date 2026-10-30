// O app é servido em subpath (/roadmap-learning-ui/), então a raiz do app é
// derivada da própria localização do SW em vez de fixada em '/'.
const BASE = new URL('./', self.location).pathname;
const CACHE_PREFIX = 'roadmap-shell-';
const CACHE_VERSION = 'v2';
const CACHE_NAME = `${CACHE_PREFIX}${CACHE_VERSION}`;

// Só o shell é precacheado; assets com hash no nome entram via cache em runtime.
const PRECACHE_URLS = [BASE, `${BASE}index.html`];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Requisições de outra origem ficam com o navegador (ex.: Google Fonts).
  if (url.origin !== self.location.origin) return;

  // Navegação: rede primeiro, para pegar deploys novos; cache como fallback offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches
            .match(`${BASE}index.html`)
            .then((cached) => cached || Response.error())
        )
    );
    return;
  }

  // Assets estáticos: cache primeiro, porque o nome tem hash e o conteúdo muda pouco.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
