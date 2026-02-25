// TechStorm 2026 - Service Worker
// Strategy: Cache-first for static assets, Network-first for pages, Workbox for routing
// OPTIMIZED FOR LOW BANDWIDTH (100 daily visitors)

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.6.0/workbox-sw.js');

const CACHE_VERSION = 'v2';
const STATIC_CACHE = `techstorm-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `techstorm-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `techstorm-images-${CACHE_VERSION}`;
const OFFLINE_PAGE = '/offline.html';

const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/favicon.ico',
  '/techfest_logo.png',
  '/college-logo.png',
  '/IIC_Cell_Logo.png',
];

// ─── MESSAGE (Skip Waiting) ───────────────────────────────────────────────────
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// ─── INSTALL ─────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  console.log('[SW] Installing TechStorm Service Worker...');
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Pre-caching static assets');
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// ─── ACTIVATE ────────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating TechStorm Service Worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== STATIC_CACHE && name !== DYNAMIC_CACHE && name !== IMAGE_CACHE)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      )
    )
  );
  self.clients.claim();
});

// ─── WORKBOX SETUP ───────────────────────────────────────────────────────────
if (workbox) {
  console.log('[SW] Workbox loaded successfully');

  // Enable navigation preload for faster page loads
  if (workbox.navigationPreload.isSupported()) {
    workbox.navigationPreload.enable();
  }

  // AGGRESSIVE Cache-first for images (reduces bandwidth significantly)
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: IMAGE_CACHE,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 90 * 24 * 60 * 60, // 90 days (was 30)
        }),
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  // Cache-first for fonts
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'font',
    new workbox.strategies.CacheFirst({
      cacheName: STATIC_CACHE,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 30,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        }),
      ],
    })
  );

  // Stale-while-revalidate for JS and CSS (serve cached, update in background)
  workbox.routing.registerRoute(
    ({ request }) =>
      request.destination === 'script' ||
      request.destination === 'style',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: DYNAMIC_CACHE,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        }),
      ],
    })
  );

} else {
  console.warn('[SW] Workbox failed to load, falling back to manual caching');
}

// ─── FETCH (Manual fallback + Navigation handling) ────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET, cross-origin, and devtools requests
  if (
    request.method !== 'GET' ||
    !url.origin.includes(self.location.origin) ||
    url.protocol === 'chrome-extension:' ||
    url.protocol === 'devtools:'
  ) {
    return;
  }

  // ── Network-first for HTML navigation ──
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // Try navigation preload first (faster)
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) return preloadResponse;

          // Try network
          const networkResponse = await fetch(request);
          const clone = networkResponse.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone));
          return networkResponse;

        } catch (error) {
          // Offline: try cache, fallback to offline page
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;

          const offlineResponse = await caches.match(OFFLINE_PAGE);
          return offlineResponse;
        }
      })()
    );
    return;
  }

  // ── Cache-first for static file extensions ──
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp|mp4|webm)$/)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (!response || response.status !== 200) return response;
          const clone = response.clone();
          caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }

  // ── Default: Network with dynamic cache fallback ──
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (!response || response.status !== 200) return response;
        const clone = response.clone();
        caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone));
        return response;
      })
      .catch(() => caches.match(request))
  );
});

// ─── PUSH NOTIFICATIONS ───────────────────────────────────────────────────────
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'New update from TechStorm 2026!',
    icon: '/techfest_logo.png',
    badge: '/techfest_logo.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' },
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'TechStorm 2026 🎮', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url || '/'));
});