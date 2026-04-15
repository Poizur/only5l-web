/**
 * AI Kompass — Service Worker
 * Strategie:
 *   - Statické assety (JS, CSS, fonty, obrázky): Cache-first s fallbackem na network
 *   - HTML stránky: Network-first s fallbackem na cache (čerstvý obsah vždy preferován)
 *   - API / tracking: Network-only (nikdy necachujeme)
 *
 * Push notifikace: opt-in breaking news z /api/push
 */

const CACHE_VERSION = "aikompass-v1";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const PAGES_CACHE = `${CACHE_VERSION}-pages`;

const STATIC_EXTENSIONS = /\.(js|css|woff2?|ttf|otf|ico|svg|png|jpg|jpeg|webp|avif)(\?.*)?$/i;
const NEVER_CACHE = /\/(track|api|admin)\//;

// ─── Install ──────────────────────────────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      cache.addAll([
        "/",
        "/nastroje",
        "/prompty",
        "/hledat",
        "/offline",
      ]).catch(() => {
        // Ignore if some of these pages don't exist yet
      })
    )
  );
  self.skipWaiting();
});

// ─── Activate ─────────────────────────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k.startsWith("aikompass-") && k !== STATIC_CACHE && k !== PAGES_CACHE)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ─── Fetch ────────────────────────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET, cross-origin, and tracking/API requests
  if (
    request.method !== "GET" ||
    url.origin !== self.location.origin ||
    NEVER_CACHE.test(url.pathname)
  ) {
    return;
  }

  // Static assets: cache-first
  if (STATIC_EXTENSIONS.test(url.pathname)) {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) =>
        cache.match(request).then(
          (cached) =>
            cached ??
            fetch(request).then((res) => {
              if (res.ok) cache.put(request, res.clone());
              return res;
            })
        )
      )
    );
    return;
  }

  // HTML pages: network-first, fall back to cache
  event.respondWith(
    fetch(request)
      .then((res) => {
        if (res.ok) {
          caches.open(PAGES_CACHE).then((cache) => cache.put(request, res.clone()));
        }
        return res;
      })
      .catch(() =>
        caches.match(request).then(
          (cached) =>
            cached ??
            caches.match("/offline").then(
              (offline) =>
                offline ??
                new Response("Jsi offline a tato stránka není v cache.", {
                  status: 503,
                  headers: { "Content-Type": "text/plain; charset=utf-8" },
                })
            )
        )
      )
  );
});

// ─── Push notifications ───────────────────────────────────────────────────────
self.addEventListener("push", (event) => {
  if (!event.data) return;

  let data;
  try {
    data = event.data.json();
  } catch {
    data = { title: "AI Kompass", body: event.data.text() };
  }

  event.waitUntil(
    self.registration.showNotification(data.title ?? "AI Kompass", {
      body: data.body ?? "Nový článek na AI Kompass",
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
      tag: data.tag ?? "ai-kompass-news",
      renotify: true,
      data: { url: data.url ?? "/" },
      actions: [{ action: "open", title: "Číst →" }],
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url ?? "/";
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clients) => {
        const existing = clients.find((c) => c.url === url && "focus" in c);
        if (existing) return existing.focus();
        return self.clients.openWindow(url);
      })
  );
});
