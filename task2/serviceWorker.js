const cacheName = "Vorrat";
const staticAssets = [
  './',
  './index.html',
  './Vorrat.js',
  './styles.css'
];

self.addEventListener('install', async event => {
  console.log('install event');
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets); 
});

self.addEventListener('fetch', event => {
  console.log('fetch event');
  const req = event.request;

  if (/.*(json)$/.test(req.url)) {
    event.respondWith(networkFirst(req));
  } else {
    event.respondWith(cacheFirst(req));
  }
});

async function cacheFirst(req) {
  console.log('cacheFirst');
  const cache = await caches.open(cacheName); 
  const cachedResponse = await cache.match(req); 
  return cachedResponse || networkFirst(req); 
}

async function networkFirst(req) {
  console.log('networkFirst');
  const cache = await caches.open(cacheName);
  try { 
    const fresh = await fetch(req);
    cache.put(req, fresh.clone());
    return fresh;
  } catch (e) { 
    const cachedResponse = await cache.match(req);
    return cachedResponse;
  }
}