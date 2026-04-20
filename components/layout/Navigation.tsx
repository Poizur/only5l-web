"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";

// Desktop: 7 primary links shown inline; Slovník + O nás go into "Více" dropdown
const PRIMARY_HREFS = [
  "/kategorie/recenze",
  "/kategorie/srovnani",
  "/kategorie/navody",
  "/kategorie/zacatky",
  "/nastroje",
  "/prompty",
  "/radar",
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const primaryLinks = nav.links.filter((l) => PRIMARY_HREFS.includes(l.href));
  const moreLinks = nav.links.filter((l) => !PRIMARY_HREFS.includes(l.href));

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const moreActive = moreLinks.some((l) => pathname.startsWith(l.href));

  return (
    <header className="sticky top-0 z-50 bg-surface-0/80 backdrop-blur-md border-b border-surface-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="hover:opacity-75 transition-opacity shrink-0">
          <Logo size="md" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {primaryLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
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

          {/* "Více" dropdown */}
          <li ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className={cn(
                "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                moreActive || dropdownOpen
                  ? "bg-brand-50 text-brand-700"
                  : "text-surface-600 hover:text-surface-900 hover:bg-surface-100"
              )}
            >
              Více
              <svg
                className={cn("w-3.5 h-3.5 transition-transform", dropdownOpen && "rotate-180")}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-surface-200 rounded-xl shadow-lg py-1.5 z-50">
                {moreLinks.map((link) => {
                  const active = pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setDropdownOpen(false)}
                      className={cn(
                        "block px-4 py-2 text-sm font-medium transition-colors",
                        active
                          ? "text-brand-700 bg-brand-50"
                          : "text-surface-700 hover:bg-surface-50 hover:text-surface-900"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </li>
        </ul>

        {/* Right side: Search icon + Mobile burger */}
        <div className="flex items-center gap-1">
          {/* Search icon */}
          <Link
            href="/hledat"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-surface-500 hover:text-surface-900 hover:bg-surface-100 transition-colors"
            aria-label="Hledat"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-surface-600 hover:bg-surface-100 transition-colors"
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu — all links */}
      {mobileOpen && (
        <div className="md:hidden border-t border-surface-200 bg-surface-0 px-4 py-3 space-y-1">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
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
          <div className="pt-1 border-t border-surface-100 mt-2 space-y-1">
            <Link
              href="/hledat"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-surface-700 hover:bg-surface-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Hledat
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
