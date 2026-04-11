import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "We test AI tools so you don't have to. Honest reviews, real testing, no fluff.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight text-surface-900 mb-4">About</h1>
      <p className="text-xl text-surface-500 mb-10 leading-relaxed">
        We test AI tools so you don't have to. Honest, hands-on, no fluff.
      </p>

      <div className="prose-article space-y-6 text-surface-700 leading-relaxed">
        <p>
          <strong>only5l.com</strong> was born from a simple frustration: the internet is
          full of AI tool "reviews" that are really just paraphrased landing pages. We
          wanted something different — real testing, real prices, real verdicts.
        </p>

        <p>
          Our name says it all: <strong>only 5 links</strong>. For every category, we find
          exactly 5 tools worth your time and money. No endless lists, no padding.
        </p>

        <h2 className="text-xl font-bold text-surface-900 mt-10 mb-3">How we test</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>We actually use every tool — not just read the press release</li>
          <li>Real pricing (not just "from $X/month")</li>
          <li>We test on actual work tasks: writing, coding, analysis</li>
          <li>We check privacy policies and data handling</li>
          <li>We score 0–10 across 5 criteria, every time</li>
        </ul>

        <h2 className="text-xl font-bold text-surface-900 mt-10 mb-3">Affiliate links</h2>
        <p>
          Articles contain affiliate links. If you sign up through our link, we earn a
          small commission at no extra cost to you. This lets us keep the site running and
          test tools properly. We never let commissions influence ratings — we write about
          the bad stuff just as much as the good.
        </p>

        <h2 className="text-xl font-bold text-surface-900 mt-10 mb-3">Contact</h2>
        <p>
          Got a tool tip or spotted an error?{" "}
          <a href="mailto:hello@only5l.com" className="text-brand-600 hover:underline font-medium">
            hello@only5l.com
          </a>
        </p>
      </div>
    </div>
  );
}
