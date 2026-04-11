import Link from "next/link";
import { site, nav } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-200 bg-surface-50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-surface-900 w-fit">
              <span className="text-brand-600">only</span>
              <span className="bg-brand-600 text-white px-1.5 py-0.5 rounded-lg text-sm font-bold leading-none">5l</span>
            </Link>
            <p className="mt-3 text-sm text-surface-500 leading-relaxed max-w-xs">
              {site.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-surface-400 mb-3">
              {site.locale === "cs" ? "Navigace" : "Navigation"}
            </h3>
            <ul className="space-y-2">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-surface-600 hover:text-brand-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-surface-400 mb-3">
              {site.locale === "cs" ? "Právní info" : "Legal"}
            </h3>
            <ul className="space-y-2">
              {site.locale === "cs" ? (
                <>
                  <li><Link href="/gdpr" className="text-sm text-surface-600 hover:text-brand-600 transition-colors">GDPR & Soukromí</Link></li>
                  <li><Link href="/disclaimer" className="text-sm text-surface-600 hover:text-brand-600 transition-colors">Disclaimer</Link></li>
                  <li><Link href="/o-nas" className="text-sm text-surface-600 hover:text-brand-600 transition-colors">O nás</Link></li>
                </>
              ) : (
                <>
                  <li><Link href="/privacy" className="text-sm text-surface-600 hover:text-brand-600 transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/disclaimer" className="text-sm text-surface-600 hover:text-brand-600 transition-colors">Disclaimer</Link></li>
                  <li><Link href="/about" className="text-sm text-surface-600 hover:text-brand-600 transition-colors">About</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-surface-200 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-surface-400">
            © {year} {site.name}. {site.locale === "cs" ? "Všechna práva vyhrazena." : "All rights reserved."}
          </p>
          <p className="text-xs text-surface-400">
            {site.locale === "cs"
              ? "Obsahuje affiliate linky. Přečti si náš disclaimer."
              : "Contains affiliate links. Read our disclaimer."}
          </p>
        </div>
      </div>
    </footer>
  );
}
