/* Kill switch for the v1 service worker.

   v1 (live until 24 Sep 2026) registered /sw.js on every visitor's device and cached
   pages, CSS, JS and images. v3 ships no service worker. A browser re-checks /sw.js on
   navigation; finding this file, it installs it, and this version:
     1. deletes every cache the old worker made,
     2. unregisters itself,
     3. reloads open tabs so they fetch the new site from the network.
   Order matters (Blue Spice lesson, rule 2026-07-24): clear caches FIRST, unregister
   LAST, all inside event.waitUntil, or the cleanup can be cut off. */

self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(keys.map(function (k) { return caches.delete(k); }));
      })
      .then(function () {
        return self.clients.matchAll({ type: 'window' });
      })
      .then(function (clients) {
        return self.registration.unregister().then(function () {
          clients.forEach(function (c) {
            if ('navigate' in c) c.navigate(c.url);
          });
        });
      }),
  );
});

// No fetch handler: every request goes straight to the network.
