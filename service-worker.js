const CACHE_NAME = "anuncios-publicos-monte-sion-v3-layout";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "",
  "./icon/logo.png",
  "./icon/icon-192.png",
  "./icon/icon-512.png",
  "./icon/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then(response => {
    const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)); return response;
  }).catch(() => caches.match(event.request).then(cached => cached || caches.match("./index.html"))));
});

// Preparado para Web Push/FCM futuro. Si el navegador recibe un push real,
// se muestra en la barra de notificaciones aunque la PWA no esté abierta.
self.addEventListener("push", (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (_) { data = { title: "Nuevo anuncio", body: event.data?.text?.() || "Se publicó un nuevo anuncio." }; }
  const title = data.title || data.notification?.title || "Nuevo anuncio";
  const body = data.body || data.notification?.body || `Nuevo anuncio de ${data.department || "la iglesia"}`;
  const announcementId = data.announcementId || data.data?.announcementId;
  event.waitUntil(self.registration.showNotification(title, {
    body,
    icon: "./icon/icon-192.png",
    badge: "./icon/icon-192.png",
    tag: announcementId ? `announcement-${announcementId}` : "church-announcement",
    renotify: true,
    requireInteraction: true,
    vibrate: [200, 100, 200],
    data: { announcementId }
  }));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const announcementId = event.notification.data?.announcementId;
  const targetUrl = announcementId ? `./?announcement=${encodeURIComponent(announcementId)}` : "./";
  event.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
    for (const client of windowClients) {
      if ("focus" in client) { client.navigate(targetUrl); return client.focus(); }
    }
    return clients.openWindow ? clients.openWindow(targetUrl) : undefined;
  }));
});
