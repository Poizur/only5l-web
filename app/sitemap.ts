import { MetadataRoute } from "next";
import { getAllArticles, getAllCategories } from "@/lib/articles";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${base}/${site.locale === "cs" ? "o-nas" : "about"}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${base}/${site.locale === "cs" ? "gdpr" : "privacy"}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // Category pages
  const categoryBase = site.locale === "cs" ? "kategorie" : "category";
  const categoryPages: MetadataRoute.Sitemap = getAllCategories().map((cat) => ({
    url: `${base}/${categoryBase}/${cat.toLowerCase()}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Article pages
  const articlePages: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${base}/${article.slug}`,
    lastModified: article.frontmatter.updatedAt ?? article.frontmatter.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
