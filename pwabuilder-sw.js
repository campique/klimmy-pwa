const CACHE = "pwabuilder-offline";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);

self.addEventListener('push', function(event) {
  const data = event.data.json();
  const options = {
    body: data.message,
    icon: 'https://fcdn.answerly.io/477718fd-e50b-4758-8fcb-7709dedf75ec/29cfa402-2d4f-4a02-85f2-3e02f9242326.png'
  };
  event.waitUntil(
    self.registration.showNotification('Nieuwe melding', options)
  );
});
