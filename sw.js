/* ============================================================
   KALYAN ELEVATORS — Service Worker
   Strategy:
     - HTML pages:       Network-first  (always fresh content, fallback to cache)
     - CSS / JS:         Stale-while-revalidate (instant load, background refresh)
     - Images / WebP:    Cache-first    (long-lived, re-fetch on cache-bust)
     - Videos (mp4/webm): No caching   (too large; streamed natively)
     - External URLs:    Network-only   (CDN / maps / fonts served fresh)

   Cache Busting:
     Bump CACHE_VERSION whenever static assets change.
     The activate event auto-deletes all old versioned caches.
   ============================================================ */

const CACHE_VERSION = 'v1.0.8';
const STATIC_CACHE = `kalyan-static-${CACHE_VERSION}`;
const PAGES_CACHE = `kalyan-pages-${CACHE_VERSION}`;

/* ---- Assets to pre-cache on install ---- */
const PRECACHE_ASSETS = [
  /* Core UI */
  '/',
  '/index.html',
  '/about.html',
  '/gallery.html',
  '/contact.html',
  '/passenger-elevators.html',
  '/home-elevators.html',
  '/glass-elevators.html',
  '/capsule-elevators.html',
  '/commercial-elevators.html',
  '/hospital-elevators.html',
  '/car-elevators.html',
  '/freight-elevators.html',
  '/goods-elevators.html',
  '/structural-elevators.html',
  '/css/style.css?v=1.0.6',
  '/js/main.js?v=1.0.4',
  '/favicon.png',
  '/logo.png',
  '/core-tech-bg.webp',

  /* Gallery images (small WebP, safe to precache) */
  '/gallery/gallery-1.webp',
  '/gallery/gallery-2.webp',
  '/gallery/gallery-3.webp',
  '/gallery/gallery-4.webp',
  '/gallery/gallery-5.webp',

  /* Product images */
  '/images/about-hero.webp',
  '/images/home-residence-card.webp',
  '/images/home-commercial-card.webp',
  '/images/home-capsule-card.webp',
  '/images/passenger-hero.webp',
  '/images/passenger-cta.webp',
  '/images/passenger-gallery-1.webp',
  '/images/passenger-gallery-2.webp',
  '/images/passenger-gallery-3.webp',
  '/images/home-elevator-hero.webp',
  '/images/home-elevator-cta.webp',
  '/images/home-elevator-gallery-2.webp',
  '/images/glass-hero.webp',
  '/images/glass-cta.webp',
  '/images/glass-gallery-1.webp',
  '/images/glass-gallery-2.webp',
  '/images/glass-gallery-3.webp',
  '/images/capsule-hero.webp',
  '/images/capsule-cta.webp',
  '/images/capsule-gallery-1.webp',
  '/images/capsule-gallery-2.webp',
  '/images/capsule-gallery-3.webp',
  '/images/commercial-hero.webp',
  '/images/commercial-cta.webp',
  '/images/commercial-gallery-1.webp',
  '/images/commercial-gallery-2.webp',
  '/images/commercial-gallery-3.webp',
  '/images/hospital-hero.webp',
  '/images/hospital-cta.webp',
  '/images/hospital-gallery-1.webp',
  '/images/hospital-gallery-2.webp',
  '/images/hospital-gallery-3.png',
  '/images/car-hero.webp',
  '/images/car-cta.webp',
  '/images/car-gallery-1.webp',
  '/images/car-gallery-2.webp',
  '/images/car-gallery-3.webp',
  '/images/freight-hero.webp',
  '/images/freight-cta.webp',
  '/images/freight-gallery-1.webp',
  '/images/freight-gallery-2.webp',
  '/images/freight-gallery-3.webp',
  '/images/goods-hero.webp',
  '/images/goods-cta.webp',
  '/images/goods-gallery-1.webp',
  '/images/goods-gallery-2.webp',
  '/images/goods-gallery-3.webp',
  '/images/structural-hero.webp',
  '/images/structural-cta.webp',
  '/images/structural-gallery-1.webp',
  '/images/structural-gallery-2.webp',
  '/images/structural-gallery-3.webp',
  '/images/contact-hero.webp',
];

/* ------------------------------------------------------------ */
/* INSTALL — Precache static shell                               */
/* ------------------------------------------------------------ */
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(function (cache) {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(function () {
      /* Skip the waiting phase so the new SW activates immediately */
      return self.skipWaiting();
    })
  );
});

/* ------------------------------------------------------------ */
/* ACTIVATE — Delete stale caches from old CACHE_VERSIONs       */
/* ------------------------------------------------------------ */
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (name) {
            /* Delete any Kalyan cache that does NOT match current version */
            return name.startsWith('kalyan-') && !name.endsWith(CACHE_VERSION);
          })
          .map(function (name) {
            console.log('[SW] Deleting stale cache:', name);
            return caches.delete(name);
          })
      );
    }).then(function () {
      /* Immediately take control of all open pages */
      return self.clients.claim();
    })
  );
});

/* ------------------------------------------------------------ */
/* FETCH — Route requests to the correct caching strategy       */
/* ------------------------------------------------------------ */
self.addEventListener('fetch', function (event) {
  var req = event.request;
  var url = new URL(req.url);

  /* Only handle same-origin GETs */
  if (req.method !== 'GET' || url.origin !== self.location.origin) {
    return; /* Let the browser handle everything else normally */
  }

  var path = url.pathname;

  /* ---- Skip videos entirely (range requests, too large) ---- */
  if (/\.(mp4|webm)$/i.test(path)) {
    return;
  }

  /* ---- HTML pages: Network-first ---- */
  if (req.headers.get('accept') && req.headers.get('accept').includes('text/html')) {
    event.respondWith(networkFirstHtml(req));
    return;
  }

  /* ---- CSS / JS: Stale-while-revalidate ---- */
  if (/\.(css|js)$/i.test(path)) {
    event.respondWith(staleWhileRevalidate(req, STATIC_CACHE));
    return;
  }

  /* ---- Images / WebP / PNG / fonts: Cache-first ---- */
  if (/\.(webp|png|jpg|jpeg|gif|svg|woff2?|ttf|otf|ico)$/i.test(path)) {
    event.respondWith(cacheFirst(req, STATIC_CACHE));
    return;
  }

  /* ---- Everything else: Network-first ---- */
  event.respondWith(networkFirstHtml(req));
});

/* ------------------------------------------------------------ */
/* Strategy helpers                                             */
/* ------------------------------------------------------------ */

/** Network-first: try network, store in pages cache, fall back to cache */
function networkFirstHtml(req) {
  return fetch(req).then(function (networkRes) {
    if (networkRes && networkRes.ok) {
      var clone = networkRes.clone();
      caches.open(PAGES_CACHE).then(function (cache) {
        cache.put(req, clone);
      });
    }
    return networkRes;
  }).catch(function () {
    return caches.match(req).then(function (cached) {
      return cached || caches.match('/index.html');
    });
  });
}

/** Cache-first: serve from cache immediately, populate on miss */
function cacheFirst(req, cacheName) {
  return caches.open(cacheName).then(function (cache) {
    return cache.match(req).then(function (cached) {
      if (cached) return cached;

      return fetch(req).then(function (networkRes) {
        if (networkRes && networkRes.ok) {
          cache.put(req, networkRes.clone());
        }
        return networkRes;
      });
    });
  });
}

/** Stale-while-revalidate: respond from cache instantly, refresh in background */
function staleWhileRevalidate(req, cacheName) {
  return caches.open(cacheName).then(function (cache) {
    return cache.match(req).then(function (cached) {
      var networkFetch = fetch(req).then(function (networkRes) {
        if (networkRes && networkRes.ok) {
          cache.put(req, networkRes.clone());
        }
        return networkRes;
      });

      /* Return cached immediately if available, otherwise wait for network */
      return cached || networkFetch;
    });
  });
}
