"use client";

/**
 * PushNotifButton — opt-in tlačítko pro push notifikace (breaking news).
 * Zobrazuje se jen v browserech s podporou Push API.
 *
 * Stav je uložen v localStorage.
 * Aktivace push odesilatele na Railway: POST /push/subscribe s { endpoint, keys }
 */

import { useState, useEffect } from "react";

const RAILWAY_URL =
  process.env.NEXT_PUBLIC_RAILWAY_URL ?? "https://web-production-fc03c.up.railway.app";

type PushState = "unsupported" | "default" | "granted" | "denied" | "loading";

export default function PushNotifButton() {
  const [state, setState] = useState<PushState>("unsupported");

  useEffect(() => {
    // Check support
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setState("unsupported");
      return;
    }
    const perm = Notification.permission as NotificationPermission;
    if (perm === "granted") setState("granted");
    else if (perm === "denied") setState("denied");
    else setState("default");
  }, []);

  async function subscribe() {
    setState("loading");
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        // Public VAPID key — replace with your real key after setting up Railway push endpoint
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ??
            "BBs1ScuntUA9SYXF8m0cfCPaOdlVRbxshuqRtGN1APkaR1BTgosEKYXiPYaOeZP6UocnRUF5aDEFHd9Nu5Jfex0",
      });
      // Send subscription to Railway
      await fetch(`${RAILWAY_URL}/push/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub.toJSON()),
      }).catch(() => {}); // fire-and-forget
      setState("granted");
    } catch {
      setState(Notification.permission === "denied" ? "denied" : "default");
    }
  }

  if (state === "unsupported" || state === "granted" || state === "denied") return null;

  return (
    <button
      onClick={subscribe}
      disabled={state === "loading"}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-brand-50 border border-brand-200 text-brand-700 rounded-lg hover:bg-brand-100 transition-colors disabled:opacity-60"
      title="Dostat notifikaci při každém breaking news"
    >
      {state === "loading" ? (
        <>
          <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Aktivuji…
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          Notifikace
        </>
      )}
    </button>
  );
}

/** Convert base64url to Uint8Array for VAPID key */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from(rawData, (c) => c.charCodeAt(0));
}
