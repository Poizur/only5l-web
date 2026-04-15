import Link from "next/link";
import { site, ui } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-surface-50 pt-16 pb-20 px-4">
      {/* Background decoration */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6 animate-fade-in">
          <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
          {site.locale === "cs" ? "Pravidelně aktualizováno" : "Regularly updated"}
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-surface-900 leading-tight mb-6 animate-slide-up">
          {site.locale === "cs" ? (
            <>
              Průvodce světem{" "}
              <span className="text-gradient">AI nástrojů</span>
            </>
          ) : (
            <>
              Your guide to the{" "}
              <span className="text-gradient">AI tools world</span>
            </>
          )}
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-surface-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up">
          {site.description}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-slide-up">
          <Link
            href={site.locale === "cs" ? "/kategorie/recenze" : "/category/reviews"}
            className="btn-primary text-base px-7 py-3"
          >
            {site.locale === "cs" ? "Číst recenze →" : "Read reviews →"}
          </Link>
          <Link
            href={site.locale === "cs" ? "/kategorie/srovnani" : "/category/comparisons"}
            className="btn-secondary text-base px-7 py-3"
          >
            {site.locale === "cs" ? "Srovnání nástrojů" : "Compare tools"}
          </Link>
        </div>

        {/* Social proof strip */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-surface-500">
          {[
            site.locale === "cs" ? "✓ Poctivé recenze" : "✓ Honest reviews",
            site.locale === "cs" ? "✓ Reálné testování" : "✓ Real testing",
            site.locale === "cs" ? "✓ Žádný spam" : "✓ No fluff",
            site.locale === "cs" ? "✓ GDPR info" : "✓ Privacy-focused",
          ].map((item) => (
            <span key={item} className="font-medium">{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
