import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticleBySlug } from "@/lib/articles";
import { mdxComponents } from "@/lib/mdx";
import { site } from "@/lib/site";

// Dynamic routes OK — agent commits new report → Vercel rebuilds
export const dynamicParams = true;

interface Props {
  params: Promise<{ year: string }>;
}

export async function generateStaticParams() {
  // Pre-build known annual reports.  Add each year once the report MDX exists.
  const knownYears = ["2025"];
  return knownYears
    .filter((year) => getArticleBySlug(`zprava-ai-${year}`) !== null)
    .map((year) => ({ year }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  const article = getArticleBySlug(`zprava-ai-${year}`);
  if (!article) {
    return {
      title: `Roční zpráva AI ${year} | ${site.name}`,
      description: `Roční zpráva „Jak Češi používají AI" za rok ${year}. K dispozici 1. ledna ${Number(year) + 1}.`,
    };
  }
  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      type: "article",
      publishedTime: article.frontmatter.publishedAt,
    },
    alternates: { canonical: `${site.url}/zprava/${year}` },
  };
}

export default async function AnnualReportPage({ params }: Props) {
  const { year } = await params;

  // Validate year is a reasonable 4-digit number
  if (!/^\d{4}$/.test(year)) notFound();

  const article = getArticleBySlug(`zprava-ai-${year}`);

  // Coming-soon state when the report hasn't been generated yet
  if (!article) {
    const nextJan1 = `1. ledna ${Number(year) + 1}`;
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-surface-400 mb-8">
          <Link href="/" className="hover:text-brand-600 transition-colors">Domů</Link>
          <span>/</span>
          <span className="text-surface-600">Roční zpráva {year}</span>
        </nav>
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📋</div>
          <h1 className="text-2xl font-extrabold text-surface-900 mb-3">
            Roční zpráva AI {year}
          </h1>
          <p className="text-surface-500 max-w-md mx-auto mb-6">
            Zpráva „Jak Češi používají AI v roce {year}" bude zveřejněna {nextJan1}.
            Obsahuje nejpopulárnější nástroje, trendy a výsledky průzkumů za celý rok.
          </p>
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
          >
            📬 Notifikuj mě při zveřejnění
          </Link>
        </div>
      </div>
    );
  }

  const { frontmatter: fm, content } = article;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-surface-400 mb-8">
        <Link href="/" className="hover:text-brand-600 transition-colors">Domů</Link>
        <span>/</span>
        <span className="text-surface-600">Roční zpráva {year}</span>
      </nav>

      {/* Report header */}
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
          📋 Roční zpráva {year}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900 mb-3">
          {fm.title}
        </h1>
        <p className="text-surface-500 text-lg">{fm.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-surface-400">
          <span>
            Publikováno{" "}
            {new Date(fm.publishedAt).toLocaleDateString("cs-CZ", {
              day: "numeric", month: "long", year: "numeric",
            })}
          </span>
          <span>·</span>
          <span>{article.readingTimeText}</span>
        </div>
      </header>

      {/* PDF print button */}
      <div className="mb-8 p-4 rounded-xl bg-surface-50 border border-surface-200 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-surface-600">
          Chceš zprávu uložit nebo sdílet? Použij tisk PDF.
        </p>
        <button
          onClick={() => typeof window !== "undefined" && window.print()}
          className="inline-flex items-center gap-2 rounded-lg border border-surface-300 bg-white px-4 py-2 text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors"
          suppressHydrationWarning
        >
          🖨️ Uložit jako PDF
        </button>
      </div>

      {/* MDX body */}
      <article className="prose prose-slate max-w-none">
        <MDXRemote source={content} components={mdxComponents} />
      </article>

      {/* Footer CTA */}
      <div className="mt-16 rounded-2xl bg-surface-900 px-8 py-10 text-center">
        <p className="text-2xl font-extrabold text-white mb-2">Nechceš zprávu příští rok vynechat?</p>
        <p className="text-surface-400 mb-6 max-w-md mx-auto">
          Každý pátek posíláme 5 nejdůležitějších AI novinek. Zpráva za rok {Number(year) + 1} přijde automaticky.
        </p>
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
        >
          📬 Přihlásit se k newsletteru
        </Link>
      </div>
    </div>
  );
}
