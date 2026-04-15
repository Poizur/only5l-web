import type { Metadata } from "next";
import { AI_TOOLS, CATEGORY_LABELS } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Affiliate Dashboard — AI Kompass Admin",
  robots: { index: false, follow: false },
};

// Revalidate every 15 minutes
export const revalidate = 900;

const RAILWAY_URL =
  process.env.NEXT_PUBLIC_RAILWAY_URL ??
  "https://web-production-fc03c.up.railway.app";

interface ClickStats {
  tool: string;
  clicks_total: number;
  clicks_7d: number;
  clicks_30d: number;
  last_click: string | null;
}

interface StatsResponse {
  stats: ClickStats[];
  total_clicks: number;
  generated_at: string;
}

async function fetchStats(): Promise<StatsResponse | null> {
  try {
    const res = await fetch(`${RAILWAY_URL}/admin/affiliate/stats`, {
      next: { revalidate: 900 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("cs-CZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default async function AffiliateDashboardPage() {
  const data = await fetchStats();

  // Merge click stats with tool data
  const statsMap = new Map<string, ClickStats>(
    (data?.stats ?? []).map((s) => [s.tool, s])
  );

  const rows = AI_TOOLS.map((tool) => ({
    tool,
    stats: statsMap.get(tool.id) ?? {
      tool: tool.id,
      clicks_total: 0,
      clicks_7d: 0,
      clicks_30d: 0,
      last_click: null,
    },
  })).sort((a, b) => b.stats.clicks_7d - a.stats.clicks_7d);

  const totalClicks = data?.total_clicks ?? 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
            Admin
          </span>
        </div>
        <h1 className="text-2xl font-extrabold text-surface-900">💰 Affiliate Dashboard</h1>
        <p className="text-surface-500 text-sm mt-1">
          Kliknutí na affiliate odkazy · aktualizováno každých 15 min
          {data?.generated_at && (
            <span className="ml-2 text-surface-400">
              (poslední data: {formatDate(data.generated_at)})
            </span>
          )}
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Kliknutí celkem",   value: totalClicks,              icon: "🖱️" },
          { label: "Kliknutí tento týden", value: rows.reduce((s, r) => s + r.stats.clicks_7d, 0),  icon: "📅" },
          { label: "Nástrojů sledováno", value: AI_TOOLS.length,        icon: "🛠️" },
          { label: "S kliknutím (7d)",  value: rows.filter((r) => r.stats.clicks_7d > 0).length, icon: "✅" },
        ].map(({ label, value, icon }) => (
          <div key={label} className="bg-white border border-surface-200 rounded-xl p-4">
            <div className="text-2xl mb-1">{icon}</div>
            <div className="text-2xl font-bold text-surface-900">{value}</div>
            <div className="text-xs text-surface-400 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* No data warning */}
      {!data && (
        <div className="mb-6 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-700">
          ⚠️ Nepodařilo se načíst data z Railway. Endpoint{" "}
          <code className="font-mono">/admin/affiliate/stats</code> neodpovídá.
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-surface-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-50 border-b border-surface-200">
              <th className="text-left px-4 py-3 text-xs font-semibold text-surface-400 uppercase tracking-wide">Nástroj</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-surface-400 uppercase tracking-wide">Kategorie</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-surface-400 uppercase tracking-wide">Celkem</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-surface-400 uppercase tracking-wide">7 dní</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-surface-400 uppercase tracking-wide">30 dní</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-surface-400 uppercase tracking-wide">Poslední klik</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-surface-400 uppercase tracking-wide">Tracking URL</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ tool, stats }, i) => {
              const cat = CATEGORY_LABELS[tool.category];
              const hasClicks = stats.clicks_7d > 0;
              return (
                <tr
                  key={tool.id}
                  className={`border-b border-surface-100 ${i % 2 === 0 ? "bg-white" : "bg-surface-50/40"}`}
                >
                  <td className="px-4 py-3">
                    <div className="font-semibold text-surface-900">{tool.name}</div>
                    <div className="text-xs text-surface-400">{tool.vendor}</div>
                  </td>
                  <td className="px-4 py-3 text-surface-500 text-xs">
                    {cat.icon} {cat.label}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-semibold text-surface-800">
                    {stats.clicks_total}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-mono font-bold ${hasClicks ? "text-green-600" : "text-surface-400"}`}>
                      {stats.clicks_7d}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-surface-600">
                    {stats.clicks_30d}
                  </td>
                  <td className="px-4 py-3 text-xs text-surface-400">
                    {formatDate(stats.last_click)}
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded text-surface-600">
                      /track/affiliate/{tool.id}
                    </code>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-surface-400">
        Kliknutí jsou zaznamenávána přes{" "}
        <code className="font-mono">/track/affiliate/[tool]</code> → Railway{" "}
        <code className="font-mono">POST /affiliate/track</code> → Supabase{" "}
        <code className="font-mono">affiliate_clicks</code>.
      </p>
    </div>
  );
}
