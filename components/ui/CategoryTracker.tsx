"use client";

/**
 * CategoryTracker — zapisuje navštívenou kategorii do cookie.
 * Umísťuj na stránky článků aby se zaznamenaly preference.
 *
 * Cookie: ai_cats — max 5 kategorií, comma-separated, expires 30 dní
 */

import { useEffect } from "react";

const COOKIE_NAME = "ai_cats";
const MAX_CATS = 5;
const EXPIRES_DAYS = 30;

function getCats(): string[] {
  if (typeof document === "undefined") return [];
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  if (!match) return [];
  return decodeURIComponent(match[1]).split(",").filter(Boolean);
}

function setCats(cats: string[]) {
  const expires = new Date();
  expires.setDate(expires.getDate() + EXPIRES_DAYS);
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(cats.join(","))}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

export function trackCategory(category: string) {
  if (typeof document === "undefined") return;
  const cats = getCats().filter((c) => c !== category);
  cats.unshift(category);
  setCats(cats.slice(0, MAX_CATS));
}

interface Props {
  category: string;
}

export default function CategoryTracker({ category }: Props) {
  useEffect(() => {
    trackCategory(category);
  }, [category]);

  return null; // renders nothing
}
