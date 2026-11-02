/* Service worker: makes the site work offline after the first visit.
 *
 * This file is a template. At build time the `precache` plugin in
 * vite.config.js replaces the two placeholders below with the list of
 * built files and a hash of their contents, and writes it to dist/sw.js.
 */
const PRECACHE = self.__PRECACHE__;
const VERSION = self.__VERSION__;
const CACHE = `it-honk-${VERSION}`;

// GitHub Pages sends `Vary: Accept-Encoding`, and audio elements request
// `Accept-Encoding: identity`, so a Vary-aware lookup would never match the
// precached copies. Every precached file is static, so ignore Vary.
const MATCH = { ignoreSearch: true, ignoreVary: true };

// Resolve relative paths against the worker's location so the site works at
// any base path (custom domain root or /it-honk/).
const toUrl = (path) => new URL(path, self.registration.scope).href;
const INDEX = toUrl('./');

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE.map(toUrl)))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith('it-honk-') && key !== CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) {
    return;
  }

  if (request.mode === 'navigate') {
    // Network first for the page so updates show up right away online;
    // fall back to the cached page when offline.
    event.respondWith(fetch(request).catch(() => caches.match(INDEX, MATCH)));
    return;
  }

  // Cache first for hashed assets, icons and sounds.
  event.respondWith(
    caches
      .match(request, MATCH)
      .then((cached) => cached || fetch(request)),
  );
});
