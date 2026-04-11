import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

/** Custom MDX components — maps HTML elements to styled React components */
export const mdxComponents: MDXComponents = {
  // Headings
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold tracking-tight text-surface-900 mt-10 mb-4 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold tracking-tight text-surface-900 mt-10 mb-3 scroll-mt-20">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-surface-900 mt-8 mb-2 scroll-mt-20">
      {children}
    </h3>
  ),

  // Body text
  p: ({ children }) => (
    <p className="text-surface-800 leading-relaxed mb-5">{children}</p>
  ),

  // Links — internal vs external
  a: ({ href, children }) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-600 font-medium hover:underline"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href ?? "/"} className="text-brand-600 font-medium hover:underline">
        {children}
      </Link>
    );
  },

  // Lists
  ul: ({ children }) => (
    <ul className="list-disc list-outside pl-6 mb-5 space-y-1.5 text-surface-800">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside pl-6 mb-5 space-y-1.5 text-surface-800">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,

  // Code
  code: ({ children }) => (
    <code className="bg-surface-100 text-brand-700 px-1.5 py-0.5 rounded text-[0.875em] font-mono">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-surface-900 text-surface-50 rounded-xl p-5 overflow-x-auto mb-6 text-sm leading-relaxed">
      {children}
    </pre>
  ),

  // Blockquote
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-brand-300 pl-5 py-1 my-6 text-surface-700 italic bg-brand-50 rounded-r-lg">
      {children}
    </blockquote>
  ),

  // Horizontal rule
  hr: () => <hr className="border-surface-200 my-10" />,

  // Tables
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-surface-100">{children}</thead>,
  th: ({ children }) => (
    <th className="text-left font-semibold text-surface-700 px-4 py-3 border-b border-surface-200">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 border-b border-surface-100 text-surface-800">{children}</td>
  ),

  // Images via next/image with automatic dimensions
  img: ({ src, alt }) => (
    <figure className="my-8">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-surface-100">
        <Image
          src={src ?? ""}
          alt={alt ?? ""}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
      {alt && (
        <figcaption className="text-center text-sm text-surface-500 mt-2">{alt}</figcaption>
      )}
    </figure>
  ),

  // Strong / em
  strong: ({ children }) => (
    <strong className="font-semibold text-surface-900">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
};
