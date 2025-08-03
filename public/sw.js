// Service Worker for ATS Application
const CACHE_NAME = "ats-cache-v1";
const STATIC_CACHE = "ats-static-v1";
const DYNAMIC_CACHE = "ats-dynamic-v1";

// Cache'lenecek statik dosyalar
const STATIC_FILES = [
  "/",
  "/index.html",
  "/static/js/bundle.js",
  "/static/css/main.css",
  "/fonts/Roboto/Roboto-Regular.ttf",
  "/fonts/Roboto/Roboto-Bold.ttf",
  "/images/favicon.png",
];

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log("Static cache opened");
      return cache.addAll(STATIC_FILES);
    })
  );
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API istekleri için network-first stratejisi
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // API yanıtını cache'e kaydet
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Network hatası durumunda cache'den getir
          return caches.match(request);
        })
    );
    return;
  }

  // Statik dosyalar için cache-first stratejisi
  if (request.method === "GET") {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(request).then((response) => {
          // Sadece başarılı yanıtları cache'e kaydet
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
      })
    );
  }
});

// Background sync
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Background sync işlemleri
    console.log("Background sync completed");
  } catch (error) {
    console.error("Background sync failed:", error);
  }
}

// Push notification
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "Yeni bildirim",
    icon: "/images/notification-icon.png",
    badge: "/images/badge-icon.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "Görüntüle",
        icon: "/images/checkmark.png",
      },
      {
        action: "close",
        title: "Kapat",
        icon: "/images/xmark.png",
      },
    ],
  };

  event.waitUntil(self.registration.showNotification("ATS Bildirimi", options));
});

// Notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"));
  }
});
