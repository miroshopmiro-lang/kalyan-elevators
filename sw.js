/* ============================================================
   KALYAN ELEVATORS — Service Worker
   ------------------------------------------------------------
   Strategy:
     HTML pages      Network-first, cache fallback
     CSS / JS        Network-first, cache fallback
     Images          Cache-first, network fill
     Videos          Not handled (range requests, too large)
     Cross-origin    Not handled

   CSS and JS used to be stale-while-revalidate, which returns the
   cached copy immediately and refreshes in the background — so a
   returning device always rendered the previous visit's scripts.
   Combined with a precache list that still pointed at older asset
   versions and a CACHE_VERSION that was never bumped (so the purge
   on activate never ran), a phone could be served a broken mix of
   new HTML and old JS. These files are ~55 KB together; correctness
   is worth more than the few milliseconds.

   Every strategy now has a rejection path. Previously only the HTML
   one did, so a dropped request for CSS or JS on a weak mobile
   signal produced a hard asset failure instead of a fallback.

   IMPORTANT: bump CACHE_VERSION whenever the asset query strings in
   build/build-pages.js change.
   ============================================================ */

const CACHE_VERSION = 'v1.2.0';
const STATIC_CACHE = `kalyan-static-${CACHE_VERSION}`;
const PAGES_CACHE = `kalyan-pages-${CACHE_VERSION}`;

/* Must match CSS_V / JS_V in build/build-pages.js. */
const ASSET_V = '1.1.0';

const PAGES = [
  './',
  'index.html',
  'about.html',
  'elevators.html',
  'gallery.html',
  'contact.html',
  'passenger-elevators.html',
  'home-elevators.html',
  'glass-elevators.html',
  'capsule-elevators.html',
  'commercial-elevators.html',
  'hospital-elevators.html',
  'car-elevators.html',
  'freight-elevators.html',
  'structural-elevators.html'
];

const CORE = [
  `css/style.css?v=${ASSET_V}`,
  `js/main.js?v=${ASSET_V}`,
  'favicon.png',
  'logo.png',
  'core-tech-bg.webp'
];

/* Product hero images double as the thumbnails in the nav dropdown,
   the mobile menu and the cross-link strips, so they are worth
   having offline. */
const IMAGES = [
  'images/passenger-hero.webp',
  'images/home-elevator-hero.webp',
  'images/glass-hero.webp',
  'images/capsule-hero.webp',
  'images/commercial-hero.webp',
  'images/hospital-hero.webp',
  'images/car-hero.webp',
  'images/freight-hero.webp',
  'images/structural-hero.webp',
  'images/about-hero.webp',
  'images/contact-hero.webp',
  'gallery/gallery-1.webp',
  'gallery/gallery-3.webp',
  'gallery/gallery-4.webp'
];

const PRECACHE = PAGES.concat(CORE, IMAGES);

/* ------------------------------------------------------------ */
/* INSTALL                                                      */
/* ------------------------------------------------------------ */
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(function (cache) {
      /* Add individually so one 404 cannot abort the whole install,
         which is what cache.addAll() does. */
      return Promise.all(PRECACHE.map(function (url) {
        return cache.add(new Request(url, { cache: 'reload' })).catch(function () {
          console.warn('[SW] Skipped precache:', url);
        });
      }));
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

/* ------------------------------------------------------------ */
/* ACTIVATE — drop caches from previous versions                 */
/* ------------------------------------------------------------ */
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names
          .filter(function (name) {
            return name.startsWith('kalyan-') && !name.endsWith(CACHE_VERSION);
          })
          .map(function (name) {
            console.log('[SW] Deleting stale cache:', name);
            return caches.delete(name);
          })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

/* ------------------------------------------------------------ */
/* FETCH                                                        */
/* ------------------------------------------------------------ */
self.addEventListener('fetch', function (event) {
  const req = event.request;

  if (req.method !== 'GET') return;

  let url;
  try {
    url = new URL(req.url);
  } catch (e) {
    return;
  }
  if (url.origin !== self.location.origin) return;

  const path = url.pathname;

  /* Videos stream natively and use range requests. */
  if (/\.(mp4|webm)$/i.test(path)) return;

  const accept = req.headers.get('accept') || '';

  if (accept.includes('text/html')) {
    event.respondWith(networkFirst(req, PAGES_CACHE, true));
    return;
  }

  if (/\.(css|js)$/i.test(path)) {
    event.respondWith(networkFirst(req, STATIC_CACHE, false));
    return;
  }

  if (/\.(webp|png|jpg|jpeg|gif|svg|woff2?|ttf|otf|ico)$/i.test(path)) {
    event.respondWith(cacheFirst(req, STATIC_CACHE));
    return;
  }

  event.respondWith(networkFirst(req, PAGES_CACHE, false));
});

/* ------------------------------------------------------------ */
/* Strategies — each resolves to a Response in every path        */
/* ------------------------------------------------------------ */

/** Network-first. Falls back to cache, then (for navigations) to the
 *  cached home page, then to a plain offline response. */
function networkFirst(req, cacheName, isNavigation) {
  return fetch(req).then(function (res) {
    if (res && res.ok) {
      const clone = res.clone();
      caches.open(cacheName).then(function (cache) {
        cache.put(req, clone);
      }).catch(function () { /* cache full or unavailable — serve anyway */ });
    }
    return res;
  }).catch(function () {
    return caches.match(req).then(function (cached) {
      if (cached) return cached;
      if (isNavigation) {
        return caches.match('index.html').then(function (home) {
          return home || offlineResponse();
        });
      }
      return offlineResponse();
    });
  });
}

/** Cache-first, filling the cache on a miss. */
function cacheFirst(req, cacheName) {
  return caches.match(req).then(function (cached) {
    if (cached) return cached;

    return fetch(req).then(function (res) {
      if (res && res.ok) {
        const clone = res.clone();
        caches.open(cacheName).then(function (cache) {
          cache.put(req, clone);
        }).catch(function () {});
      }
      return res;
    }).catch(function () {
      return offlineResponse();
    });
  });
}

function offlineResponse() {
  return new Response('', {
    status: 503,
    statusText: 'Offline',
    headers: { 'Content-Type': 'text/plain' }
  });
}
