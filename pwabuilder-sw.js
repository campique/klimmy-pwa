const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/d585feef-ad87-4e8a-b0e4-f0ecea5db2f9',
  'https://fcdn.answerly.io/477718fd-e50b-4758-8fcb-7709dedf75ec/29cfa402-2d4f-4a02-85f2-3e02f9242326.png' // Voeg andere benodigde bestanden toe
];

// Installatie van de service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activeren van de service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetchen van de netwerkverzoeken
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

// OneSignal Service Worker import
importScripts('https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js');
