import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { cs, enUS } from "date-fns/locale";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticleBySlug, getAllSlugs } from "@/lib/articles";
import { mdxComponents } from "@/lib/mdx";
import { site, ui } from "@/lib/site";
import ToolCard from "@/components/article/ToolCard";
import ComparisonTable from "@/components/article/ComparisonTable";
import FAQ from "@/components/article/FAQ";
import SurveyInlineCTA from "@/components/ui/SurveyInlineCTA";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const { frontmatter: fm } = article;
  return {
    title: fm.title,
    description: fm.description,
    openGraph: {
      title: fm.title,
      description: fm.description,
      type: "article",
      publishedTime: fm.publishedAt,
      modifiedTime: fm.updatedAt,
      images: fm.coverImage ? [{ url: fm.coverImage }] : [],
    },
    alternates: { canonical: `${site.url}/${slug}` },
  };
}

// JSON-LD structured data for SEO.
// Always emits Article schema.
// For reviews/comparisons with toolName + rating: also emits Product schema
// (enables Google rich snippets with star ratings in search results).
function ArticleJsonLd({ article }: { article: ReturnType<typeof getArticleBySlug> }) {
  if (!article) return null;
  const { frontmatter: fm, slug } = article;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.title,
    description: fm.description,
    datePublished: fm.publishedAt,
    dateModified: fm.updatedAt ?? fm.publishedAt,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    url: `${site.url}/${slug}`,
    image: fm.coverImage,
  };

  // Product schema — shown for reviews and comparisons that have a tool name and numeric rating
  const isReview =
    fm.toolName &&
    typeof fm.rating === "number" &&
    ["recenze", "reviews", "srovnani", "comparisons"].includes(
      (fm.category ?? "").toLowerCase()
    );

  const productLd = isReview
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: fm.toolName,
        description: fm.description,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: fm.rating,
          bestRating: "10",
          worstRating: "1",
          ratingCount: "1",
          reviewCount: "1",
        },
        ...(fm.affiliateUrl && {
          offers: {
            "@type": "Offer",
            url: fm.affiliateUrl,
            availability: "https://schema.org/InStock",
          },
        }),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      {productLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
        />
      )}
    </>
  );
}

// Inject <SurveyInlineCTA /> after the 3rd content paragraph in MDX source.
function injectSurveyCta(content: string): string {
  const lines = content.split("\n");
  let paragraphsFound = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (
      line === "" &&
      i > 0 &&
      lines[i - 1].trim() !== "" &&
      !lines[i - 1].trim().startsWith("#") &&
      !lines[i - 1].trim().startsWith("```") &&
      !lines[i - 1].trim().startsWith("|") &&
      !lines[i - 1].trim().startsWith("-") &&
      !lines[i - 1].trim().startsWith("*")
    ) {
      paragraphsFound++;
      if (paragraphsFound === 3) {
        lines.splice(i + 1, 0, "\n<SurveyInlineCTA />\n");
        break;
      }
    }
  }
  return lines.join("\n");
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const { frontmatter: fm, content, readingTimeText } = article;
  const locale = site.locale === "cs" ? cs : enUS;
  const dateStr = format(new Date(fm.publishedAt), "d. MMMM yyyy", { locale });

  const components = {
    ...mdxComponents,
    ToolCard: () => null,
    ComparisonTable: () => null,
    FAQ: () => null,
    SurveyInlineCTA,
  };

  const hasToolCard =
    (fm.pros && fm.pros.length > 0) || (fm.cons && fm.cons.length > 0);

  return (
    <>
      <ArticleJsonLd article={article} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-surface-400 mb-8">
          <Link href="/" className="hover:text-brand-600 transition-colors">
            {site.locale === "cs" ? "Domů" : "Home"}
          </Link>
          <span>/</span>
          <Link
            href={
              site.locale === "cs"
                ? `/kategorie/${fm.category.toLowerCase()}`
                : `/category/${fm.category.toLowerCase()}`
            }
            className="hover:text-brand-600 transition-colors capitalize"
          >
            {fm.category}
          </Link>
          <span>/</span>
          <span className="text-surface-600 truncate max-w-xs">{fm.title}</span>
        </nav>

        {/* Article header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="chip bg-brand-100 text-brand-700 capitalize">{fm.category}</span>
            {typeof fm.rating === "number" && (
              <span className="chip bg-amber-50 text-amber-700 font-bold">★ {fm.rating.toFixed(1)}</span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-surface-900 leading-tight mb-5">
            {fm.title}
          </h1>
          <p className="text-lg sm:text-xl text-surface-500 leading-relaxed mb-6">
            {fm.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-surface-400 pb-6 border-b border-surface-200">
            <time dateTime={fm.publishedAt}>
              {ui.publishedOn} {dateStr}
            </time>
            {fm.updatedAt && (
              <span>
                {ui.updatedOn} {format(new Date(fm.updatedAt), "d. MMM yyyy", { locale })}
              </span>
            )}
            <span>{readingTimeText}</span>
          </div>
        </header>

        {/* Cover image */}
        {fm.coverImage && (
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10 bg-surface-100">
            <Image
              src={fm.coverImage}
              alt={fm.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        )}

        {/* Hero ToolCard or legacy quick-info bar */}
        {hasToolCard ? (
          <div className="mb-10">
            <ToolCard
              name={fm.toolName ?? fm.title}
              tagline={fm.tagline ?? fm.description}
              rating={fm.rating}
              price={fm.price ?? ""}
              bestFor={fm.bestFor ?? ""}
              pros={fm.pros ?? []}
              cons={fm.cons ?? []}
              affiliateUrl={fm.affiliateUrl ?? ""}
              affiliateLabel={fm.affiliateLabel}
              logoUrl={fm.logoUrl}
            />
          </div>
        ) : (
          (typeof fm.rating === "number" || fm.price || fm.affiliateUrl) && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 p-5 rounded-2xl bg-brand-50 border border-brand-100">
              {typeof fm.rating === "number" && (
                <Stat label={ui.rating} value={`★ ${fm.rating.toFixed(1)} / 10`} />
              )}
              {fm.price && <Stat label={ui.price} value={fm.price} />}
              {fm.bestFor && <Stat label={ui.bestFor} value={fm.bestFor} />}
              {fm.affiliateUrl && (
                <div className="col-span-2 sm:col-span-1 flex items-end">
                  <a
                    href={fm.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="affiliate-btn w-full justify-center"
                  >
                    {ui.tryFree}
                  </a>
                </div>
              )}
            </div>
          )
        )}

        {/* MDX content */}
        <div className="prose-article">
          <MDXRemote source={injectSurveyCta(content)} components={components} />
        </div>

        {/* Affiliate disclaimer */}
        {fm.affiliateUrl && (
          <p className="mt-10 text-xs text-surface-400 border-t border-surface-100 pt-5 italic">
            {ui.disclaimer}
          </p>
        )}

        {/* Tags */}
        {fm.tags && fm.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {fm.tags.map((tag) => (
              <span key={tag} className="chip bg-surface-100 text-surface-600">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-brand-500 font-medium uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-surface-900">{value}</p>
    </div>
  );
}
