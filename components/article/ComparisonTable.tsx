import { ui } from "@/lib/site";

interface Tool {
  name: string;
  rating: number;
  price: string;
  bestFor: string;
  affiliateUrl: string;
}

interface ComparisonTableProps {
  tools: Tool[];
}

export default function ComparisonTable({ tools }: ComparisonTableProps) {
  const sorted = [...tools].sort((a, b) => b.rating - a.rating);

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
              const scoreColor =
                tool.rating >= 8
                  ? "bg-emerald-100 text-emerald-700"
                  : tool.rating >= 6
                  ? "bg-brand-100 text-brand-700"
                  : "bg-amber-100 text-amber-700";
              return (
                <tr key={tool.name} className="border-t border-surface-100 hover:bg-surface-50 transition-colors">
                  <td className="px-5 py-4 text-surface-400 font-medium">{i + 1}</td>
                  <td className="px-5 py-4 font-semibold text-surface-900">{tool.name}</td>
                  <td className="px-5 py-4">
                    <span className={`chip font-bold ${scoreColor}`}>★ {tool.rating.toFixed(1)}</span>
                  </td>
                  <td className="px-5 py-4 text-surface-700">{tool.price}</td>
                  <td className="px-5 py-4 text-surface-600">{tool.bestFor}</td>
                  <td className="px-5 py-4 text-right">
                    <a
                      href={tool.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="affiliate-btn text-xs"
                    >
                      {ui.visitSite}
                    </a>
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
