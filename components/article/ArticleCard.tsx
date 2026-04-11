import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { cs, enUS } from "date-fns/locale";
import type { Article } from "@/lib/articles";
import { site, ui } from "@/lib/site";
import { cn } from "@/lib/utils";

interface Props {
  article: Article;
  featured?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  recenze: "bg-brand-100 text-brand-700",
  reviews: "bg-brand-100 text-brand-700",
  srovnani: "bg-purple-100 text-purple-700",
  comparisons: "bg-purple-100 text-purple-700",
  navody: "bg-emerald-100 text-emerald-700",
  guides: "bg-emerald-100 text-emerald-700",
};

export default function ArticleCard({ article, featured = false }: Props) {
  const { frontmatter: fm, slug, readingTimeText, excerpt } = article;
  const locale = site.locale === "cs" ? cs : enUS;
  const dateStr = format(new Date(fm.publishedAt), "d. MMM yyyy", { locale });
  const catColor = CATEGORY_COLORS[fm.category.toLowerCase()] ?? "bg-surface-100 text-surface-600";

  return (
    <article
      className={cn(
        "card-hover group bg-surface-0 rounded-2xl overflow-hidden border border-surface-200 flex flex-col",
        featured && "md:flex-row"
      )}
    >
      {/* Cover image */}
      {fm.coverImage && (
        <Link
          href={`/${slug}`}
          className={cn(
            "block relative overflow-hidden bg-surface-100 shrink-0",
            featured ? "md:w-80 h-52 md:h-auto" : "h-44 sm:h-52"
          )}
        >
          <Image
            src={fm.coverImage}
            alt={fm.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes={featured ? "320px" : "(max-width: 640px) 100vw, 400px"}
          />
        </Link>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Category + reading time */}
        <div className="flex items-center gap-2 mb-3">
          <span className={cn("chip", catColor)}>{fm.category}</span>
          <span className="text-xs text-surface-400">{readingTimeText}</span>
          {fm.rating !== undefined && (
            <span className="ml-auto chip bg-amber-50 text-amber-700 font-bold">
              ★ {fm.rating.toFixed(1)}
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/${slug}`}>
          <h2
            className={cn(
              "font-bold text-surface-900 leading-snug group-hover:text-brand-600 transition-colors mb-2",
              featured ? "text-xl sm:text-2xl" : "text-lg"
            )}
          >
            {fm.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-surface-500 text-sm leading-relaxed line-clamp-3 flex-1">{excerpt}</p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-100">
          <time dateTime={fm.publishedAt} className="text-xs text-surface-400">
            {dateStr}
          </time>
          <Link
            href={`/${slug}`}
            className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            {ui.readMore} →
          </Link>
        </div>
      </div>
    </article>
  );
}
