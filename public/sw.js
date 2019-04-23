const CACHE_NAME = `CACHE`;

self.addEventListener(`install`, (evt) => {
  evt.waitUntil(
      caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll([
          `./`,
          `./index.html`,
          `./bundle.js`,
          `./bundle.js.map`,
          `./css/normalize.css`,
          `./css/main.css`,
          `./images`
        ]);
      })
  );
});

self.addEventListener(`fetch`, (evt) => {
  evt.respondWith(
      caches.match(evt.request)
      .then((response) => {
        return response ? response : fetch(evt.request);
      })
      .catch((err) => {
        throw err;
      })
  );
});
