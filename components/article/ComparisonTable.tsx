import { ui } from "@/lib/site";

interface Tool {
  name: string;
  rating?: number;
  price: string;
  bestFor: string;
  affiliateUrl: string;
}

interface ComparisonTableProps {
  tools?: Tool[] | string;
}

export default function ComparisonTable({ tools }: ComparisonTableProps) {
  // next-mdx-remote v6 RSC drops array/object props — guard against empty/undefined/string
  if (!tools || !Array.isArray(tools) || tools.length === 0) return null;

  const sorted = [...tools].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

  return (
    <div className="my-8 rounded-2xl border border-surface-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-100 text-left">
              <th className="px-5 py-3.5 font-semibold text-surface-700 w-6">#</th>
              <th className="px-5 py-3.5 font-semibold text-surface-700">Nástroj</th>
              <th className="px-5 py-3.5 font-semibold text-surface-700">{ui.rating}</th>
              <th className="px-5 py-3.5 font-semibold text-surface-700">{ui.price}</th>
              <th className="px-5 py-3.5 font-semibold text-surface-700">{ui.bestFor}</th>
              <th className="px-5 py-3.5 font-semibold text-surface-700 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((tool, i) => {
              const r = typeof tool.rating === "number" ? tool.rating : 0;
              const scoreColor =
                r >= 8 ? "text-emerald-700 font-bold"
                : r >= 6 ? "text-brand-700 font-bold"
                : "text-amber-700 font-bold";
              return (
                <tr key={tool.name} className="border-t border-surface-100 hover:bg-surface-50 transition-colors">
                  <td className="px-5 py-3.5 text-surface-500">{i + 1}</td>
                  <td className="px-5 py-3.5 font-semibold text-surface-900">{tool.name}</td>
                  <td className={`px-5 py-3.5 ${scoreColor}`}>{r.toFixed(1)}</td>
                  <td className="px-5 py-3.5 text-surface-700">{tool.price}</td>
                  <td className="px-5 py-3.5 text-surface-600 text-sm max-w-xs">{tool.bestFor}</td>
                  <td className="px-5 py-3.5 text-right">
                    {tool.affiliateUrl && (
                      <a
                        href={tool.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="text-brand-600 font-medium text-sm hover:underline whitespace-nowrap"
                      >
                        {ui.visitSite} →
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
