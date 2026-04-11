import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for only5l.com.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight text-surface-900 mb-4">
        Privacy Policy
      </h1>
      <p className="text-sm text-surface-400 mb-10">Last updated: January 2025</p>

      <div className="prose-article space-y-6 text-surface-700 leading-relaxed">
        <p>
          <strong>only5l.com</strong> is a static content site. We do not require
          registration and do not directly collect personal data.
        </p>

        <h2 className="text-xl font-bold text-surface-900 mt-10 mb-3">Analytics</h2>
        <p>
          We use Google Analytics to measure traffic with anonymized data. No personally
          identifiable information is stored by us directly.
        </p>

        <h2 className="text-xl font-bold text-surface-900 mt-10 mb-3">Cookies</h2>
        <p>
          Basic analytics cookies may be set by Google Analytics. We do not use
          advertising or tracking cookies.
        </p>

        <h2 className="text-xl font-bold text-surface-900 mt-10 mb-3">Affiliate links</h2>
        <p>
          Some links on this site are affiliate links. Third-party sites have their own
          privacy policies which we are not responsible for.
        </p>

        <h2 className="text-xl font-bold text-surface-900 mt-10 mb-3">Contact</h2>
        <p>
          Privacy questions:{" "}
          <a href="mailto:hello@only5l.com" className="text-brand-600 hover:underline">
            hello@only5l.com
          </a>
        </p>
      </div>
    </div>
  );
}
