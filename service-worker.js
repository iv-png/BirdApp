const CACHE_NAME = 'bird-tracker-v1';
const urlsToCache = [
  '/BirdApp/',
  '/BirdApp/index.html',
  '/BirdApp/style.css',
  '/BirdApp/app.js',
  '/BirdApp/bird-images/robin.svg',
  '/BirdApp/bird-images/bluejay.svg',
  '/BirdApp/bird-images/cardinal.svg',
  '/BirdApp/bird-images/sparrow.svg',
  '/BirdApp/bird-images/goldfinch.svg',
  '/BirdApp/bird-images/pigeon.svg',
  '/BirdApp/bird-images/crow.svg',
  '/BirdApp/bird-images/woodpecker.svg',
  '/BirdApp/bird-images/seagull.svg',
  '/BirdApp/bird-images/parrot.svg',
  '/BirdApp/bird-images/owl.svg',
  '/BirdApp/bird-images/hummingbird.svg',
  '/BirdApp/bird-images/kingfisher.svg',
  '/BirdApp/bird-images/magpie.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
