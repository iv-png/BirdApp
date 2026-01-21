const CACHE_NAME = 'bird-tracker-v3';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './bird-images/robin.svg',
  './bird-images/bluejay.svg',
  './bird-images/cardinal.svg',
  './bird-images/sparrow.svg',
  './bird-images/goldfinch.svg',
  './bird-images/pigeon.svg',
  './bird-images/crow.svg',
  './bird-images/woodpecker.svg',
  './bird-images/seagull.svg',
  './bird-images/parrot.svg',
  './bird-images/owl.svg',
  './bird-images/hummingbird.svg',
  './bird-images/kingfisher.svg',
  './bird-images/magpie.svg'
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
