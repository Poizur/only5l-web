import { MetadataRoute } from "next";
import { getAllArticles, getAllCategories } from "@/lib/articles";
import { AI_TOOLS } from "@/lib/tools";
import { PROMPT_CATEGORY_LABELS } from "@/lib/prompts";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date().toISOString();

  // ── Static pages ────────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                       lastModified: now, changeFrequency: "daily",   priority: 1.0 },
    { url: `${base}/nastroje`,         lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/srovnani-nastroju`,lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/prompty`,          lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/hledat`,           lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/pruvodce-ai`,      lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/radar`,            lastModified: now, changeFrequency: "daily",   priority: 0.8 },
    { url: `${base}/slovnik`,          lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/test-urovne`,      lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/newsletter`,       lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/o-nas`,            lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/gdpr`,             lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${base}/disclaimer`,       lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
  ];

  // ── Category pages ────────────────────────────────────────────────────────
  const categoryBase = "kategorie";
  const categoryPages: MetadataRoute.Sitemap = getAllCategories().map((cat) => ({
    url: `${base}/${categoryBase}/${cat.toLowerCase()}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // ── Article pages ─────────────────────────────────────────────────────────
  const articlePages: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${base}/${article.slug}`,
    lastModified: article.frontmatter.updatedAt ?? article.frontmatter.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // ── Tool pages (deep links into /nastroje with filter) ────────────────────
  // Tools don't have individual pages, but we expose the main DB filtered by category
  const toolCategories = [...new Set(AI_TOOLS.map((t) => t.category))];
  const toolCategoryPages: MetadataRoute.Sitemap = toolCategories.map((cat) => ({
    url: `${base}/nastroje?kategorie=${cat}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // ── Prompt category pages (anchor links on /prompty) ─────────────────────
  const promptCategoryPages: MetadataRoute.Sitemap = (
    Object.keys(PROMPT_CATEGORY_LABELS) as Array<keyof typeof PROMPT_CATEGORY_LABELS>
  ).map((cat) => ({
    url: `${base}/prompty#${cat}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // ── Calculator pages ──────────────────────────────────────────────────────
  const calcPages: MetadataRoute.Sitemap = [
    { url: `${base}/kalkulacka/ktery-nastroj`,   lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/kalkulacka/porovnani-cen`,   lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/kalkulacka/uspora-s-ai`,     lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  return [
    ...staticPages,
    ...categoryPages,
    ...articlePages,
    ...toolCategoryPages,
    ...promptCategoryPages,
    ...calcPages,
  ];
}

