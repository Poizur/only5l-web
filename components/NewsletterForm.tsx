"use client";

import { useState } from "react";

const RAILWAY_URL =
  process.env.NEXT_PUBLIC_RAILWAY_URL ?? "https://web-production-fc03c.up.railway.app";

type State = "idle" | "loading" | "success" | "error";

export default function NewsletterForm({ variant = "default" }: { variant?: "default" | "compact" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const res = await fetch(`${RAILWAY_URL}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.detail ?? "Něco se pokazilo.");
        setState("error");
        return;
      }
      if (data.status === "already_subscribed") {
        setMsg("Tento e-mail je již přihlášen. 👍");
        setState("success");
        return;
      }
      setMsg("Přihlášení proběhlo úspěšně! První newsletter přijde v pátek.");
      setState("success");
      setEmail("");
    } catch {
      setMsg("Nepodařilo se připojit. Zkus to znovu.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className={`flex items-center gap-3 ${variant === "compact" ? "text-sm" : ""}`}>
        <span className="text-2xl">✅</span>
        <p className="text-surface-700 font-medium">{msg}</p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tvuj@email.cz"
          required
          className="flex-1 min-w-0 px-3 py-2 text-sm rounded-lg border border-surface-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="shrink-0 px-4 py-2 text-sm font-semibold rounded-lg bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50 transition-colors"
        >
          {state === "loading" ? "..." : "Přihlásit →"}
        </button>
        {state === "error" && (
          <p className="absolute mt-10 text-xs text-red-600">{msg}</p>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tvuj@email.cz"
          required
          className="flex-1 px-4 py-3 rounded-xl border border-surface-300 bg-white text-base focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="shrink-0 px-6 py-3 font-semibold rounded-xl bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50 transition-colors"
        >
          {state === "loading" ? "Přihlašuji..." : "Přihlásit se →"}
        </button>
      </div>
      {state === "error" && (
        <p className="text-sm text-red-600">{msg}</p>
      )}
      <p className="text-xs text-surface-400">
        Zdarma · Každý pátek · Kdykoli se můžeš odhlásit
      </p>
    </form>
  );
}
