"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface-0/80 backdrop-blur-md border-b border-surface-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="hover:opacity-75 transition-opacity">
          <Logo size="md" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {nav.links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    active
                      ? "bg-brand-50 text-brand-700"
                      : "text-surface-600 hover:text-surface-900 hover:bg-surface-100"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA: Search + Test úrovně + Mobile burger */}
        <div className="flex items-center gap-2">
          {/* Search icon */}
          <Link
            href="/hledat"
            className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-lg text-surface-500 hover:text-surface-900 hover:bg-surface-100 transition-colors"
            aria-label="Hledat"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>

          <Link
            href="/test-urovne"
            className={cn(
              "hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors",
              pathname === "/test-urovne"
                ? "bg-brand-600 text-white"
                : "bg-brand-600 text-white hover:bg-brand-700"
            )}
          >
            <span>🎯</span>
            <span>Test úrovně</span>
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-surface-600 hover:bg-surface-100 transition-colors"
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-surface-200 bg-surface-0 px-4 py-3 space-y-1 animate-fade-in">
          <Link
            href="/hledat"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-surface-700 hover:bg-surface-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Hledat</span>
          </Link>
          <Link
            href="/test-urovne"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors mb-2",
              pathname === "/test-urovne"
                ? "bg-brand-600 text-white"
                : "bg-brand-600 text-white hover:bg-brand-700"
            )}
          >
            <span>🎯</span>
            <span>Test úrovně</span>
          </Link>
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                pathname.startsWith(link.href)
                  ? "bg-brand-50 text-brand-700"
                  : "text-surface-700 hover:bg-surface-100"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
