import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { site } from "./site";

const CONTENT_DIR = path.join(process.cwd(), "content", site.contentDir);

export interface ArticleFrontmatter {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags?: string[];
  coverImage?: string;
  author?: string;
  /** Overall tool rating 0-10, used on review articles */
  rating?: number;
  /** Affiliate CTA URL */
  affiliateUrl?: string;
  /** Affiliate button label override */
  affiliateLabel?: string;
  /** Tool price string, e.g. "Zdarma / $20/měsíc" */
  price?: string;
  /** Short "best for" string */
  bestFor?: string;
  /** Tool name for the hero ToolCard (e.g. "Jasper AI") */
  toolName?: string;
  /** Tool tagline for the hero ToolCard */
  tagline?: string;
  /** Pros list — used by the ToolCard component */
  pros?: string[];
  /** Cons list — used by the ToolCard component */
  cons?: string[];
  /** Optional tool logo URL */
  logoUrl?: string;
  featured?: boolean;
  draft?: boolean;
}

export interface Article {
  slug: string;
  frontmatter: ArticleFrontmatter;
  readingTimeText: string;
  excerpt: string;
}

export interface ArticleWithContent extends Article {
  content: string;
}

function getSlugFromFile(filename: string) {
  return filename.replace(/\.mdx?$/, "");
}

function formatExcerpt(content: string, maxLength = 160): string {
  // Strip MDX/markdown syntax for a clean excerpt
  return content
    .replace(/^---[\s\S]*?---/, "")
    .replace(/#{1,6}\s+/g, "")
    .replace(/\*\*|__|\*|_|`{1,3}/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\n+/g, " ")
    .trim()
    .slice(0, maxLength)
    .trimEnd() + "…";
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => /\.mdx?$/.test(f));

  const articles = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      const fm = data as ArticleFrontmatter;
      if (fm.draft) return null;
      return {
        slug: getSlugFromFile(file),
        frontmatter: fm,
        readingTimeText: readingTime(content).text,
        excerpt: fm.description || formatExcerpt(content),
      } satisfies Article;
    })
    .filter((a): a is Article => a !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    );

  return articles;
}

export function getArticleBySlug(slug: string): ArticleWithContent | null {
  const candidates = [
    path.join(CONTENT_DIR, `${slug}.mdx`),
    path.join(CONTENT_DIR, `${slug}.md`),
  ];

  for (const filepath of candidates) {
    if (fs.existsSync(filepath)) {
      const raw = fs.readFileSync(filepath, "utf-8");
      const { data, content } = matter(raw);
      const fm = data as ArticleFrontmatter;
      return {
        slug,
        frontmatter: fm,
        readingTimeText: readingTime(content).text,
        excerpt: fm.description || formatExcerpt(content),
        content,
      };
    }
  }
  return null;
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter(
    (a) => a.frontmatter.category.toLowerCase() === category.toLowerCase()
  );
}

export function getFeaturedArticles(limit = 3): Article[] {
  const all = getAllArticles();
  const featured = all.filter((a) => a.frontmatter.featured);
  return featured.length >= limit ? featured.slice(0, limit) : all.slice(0, limit);
}

export function getAllSlugs(): string[] {
  return getAllArticles().map((a) => a.slug);
}

export function getAllCategories(): string[] {
  const cats = new Set(getAllArticles().map((a) => a.frontmatter.category));
  return Array.from(cats);
}
