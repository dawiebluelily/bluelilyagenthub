const CACHE_NAME = 'blue-lily-agent-hub-v4-rental-docs';
const APP_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './assets/images/blue-lily-logo.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/docs/01-otp.pdf',
  './assets/docs/02-ppra-mandatory-disclosure.pdf',
  './assets/docs/03-purchaser-particulars.pdf',
  './assets/docs/04-sellers-particulars.pdf',
  './assets/docs/05-commission-agreement.pdf',
  './assets/docs/06-additional-conditions.pdf',
  './assets/docs/07-open-mandate.docx',
  './assets/docs/08-exclusive-mandate.docx',
  './assets/docs/09-rental-mandate.pdf',
  './assets/docs/10-rental-application.pdf',
  './assets/docs/11-rental-mandatory-disclosure.pdf'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
