"use client";

import { useState } from "react";

interface Task {
  id: number;
  name: string;
  category: string;
  description: string;
}

interface ToolResult {
  name: string;
  model: string;
  total: number;
  scores: number[];
}

interface HistoryEntry {
  month: string;
  [key: string]: number | string;
}

interface Props {
  tasks: Task[];
  tools: Record<string, ToolResult>;
  history: HistoryEntry[];
  updatedAt: string;
  month: string;
}

const MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

function scoreColor(s: number): string {
  if (s >= 9) return "bg-green-100 text-green-800 font-semibold";
  if (s >= 7) return "bg-amber-50 text-amber-700";
  return "bg-red-50 text-red-600";
}

function fmtMonth(m: string): string {
  const [y, mo] = m.split("-");
  const names: Record<string, string> = {
    "01": "Led", "02": "Úno", "03": "Bře", "04": "Dub",
    "05": "Kvě", "06": "Čvn", "07": "Čvc", "08": "Srp",
    "09": "Zář", "10": "Říj", "11": "Lis", "12": "Pro",
  };
  return `${names[mo] ?? mo} ${y.slice(2)}`;
}

type SortKey = "total" | number;

export default function BenchmarkClient({ tasks, tools, history, updatedAt, month }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("total");
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");
  const [activeTask, setActiveTask] = useState<number | null>(null);

  const toolEntries = Object.entries(tools).sort(([, a], [, b]) => {
    const va = sortKey === "total" ? a.total : (a.scores[sortKey as number] ?? 0);
    const vb = sortKey === "total" ? b.total : (b.scores[sortKey as number] ?? 0);
    return sortDir === "desc" ? vb - va : va - vb;
  });

  // Rank based on total (for medals)
  const ranked = [...Object.entries(tools)].sort(([, a], [, b]) => b.total - a.total);
  const rankOf = Object.fromEntries(ranked.map(([k], i) => [k, i + 1]));

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const updated = new Date(updatedAt).toLocaleDateString("cs-CZ", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div>
      {/* Stats row */}
      <div className="flex flex-wrap gap-3 mb-8">
        <div className="flex items-center gap-2 text-sm text-surface-500 bg-surface-50 border border-surface-200 rounded-lg px-3 py-2">
          <span>📅</span>
          <span>Aktualizováno {updated}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-surface-500 bg-surface-50 border border-surface-200 rounded-lg px-3 py-2">
          <span>📊</span>
          <span>Měsíc: {fmtMonth(month)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-surface-500 bg-surface-50 border border-surface-200 rounded-lg px-3 py-2">
          <span>⚙️</span>
          <span>{tasks.length} úkolů × {toolEntries.length} nástrojů</span>
        </div>
      </div>

      {/* Winner card */}
      {toolEntries.length > 0 && (() => {
        const [[winKey, winner]] = toolEntries.slice(0, 1);
        void winKey;
        return (
          <div className="mb-8 rounded-2xl border border-brand-200 bg-brand-50 px-6 py-5 flex items-center gap-4">
            <div className="text-4xl">🏆</div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-500 mb-0.5">
                Vítěz {fmtMonth(month)}
              </p>
              <p className="text-xl font-extrabold text-surface-900">
                {winner.name}
                <span className="ml-2 text-base font-normal text-surface-500">{winner.model}</span>
              </p>
              <p className="text-brand-700 font-bold text-2xl">{winner.total} / 100</p>
            </div>
          </div>
        );
      })()}

      {/* Main table */}
      <div className="overflow-x-auto rounded-2xl border border-surface-200">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="bg-surface-50 border-b border-surface-200">
              <th className="text-left px-4 py-3 font-semibold text-surface-700 whitespace-nowrap w-36">
                Nástroj
              </th>
              <th
                className={`text-center px-3 py-3 font-semibold cursor-pointer select-none whitespace-nowrap ${
                  sortKey === "total" ? "text-brand-700 bg-brand-50" : "text-surface-700 hover:bg-surface-100"
                }`}
                onClick={() => toggleSort("total")}
              >
                Celkem {sortKey === "total" ? (sortDir === "desc" ? "↓" : "↑") : ""}
              </th>
              {tasks.map((t, i) => (
                <th
                  key={t.id}
                  className={`text-center px-2 py-3 font-medium cursor-pointer select-none whitespace-nowrap text-xs ${
                    sortKey === i ? "text-brand-700 bg-brand-50" : "text-surface-500 hover:bg-surface-100"
                  }`}
                  onClick={() => toggleSort(i)}
                  onMouseEnter={() => setActiveTask(t.id)}
                  onMouseLeave={() => setActiveTask(null)}
                  title={t.description}
                >
                  T{t.id} {sortKey === i ? (sortDir === "desc" ? "↓" : "↑") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {toolEntries.map(([key, tool]) => (
              <tr key={key} className="border-b border-surface-100 hover:bg-surface-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-surface-900 whitespace-nowrap">
                  <span className="mr-1.5">{MEDALS[rankOf[key]] ?? ""}</span>
                  {tool.name}
                  <span className="block text-xs font-normal text-surface-400">{tool.model}</span>
                </td>
                <td className="text-center px-3 py-3 font-extrabold text-lg text-surface-900">
                  {tool.total}
                </td>
                {tool.scores.map((s, i) => (
                  <td
                    key={i}
                    className={`text-center px-2 py-3 text-xs rounded-sm ${scoreColor(s)} ${
                      activeTask === tasks[i]?.id ? "ring-1 ring-brand-300" : ""
                    }`}
                  >
                    {s}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Task legend */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {tasks.map((t) => (
          <div
            key={t.id}
            className={`flex gap-2 text-xs rounded-lg px-3 py-2 border transition-colors ${
              activeTask === t.id
                ? "border-brand-200 bg-brand-50"
                : "border-surface-100 bg-surface-50"
            }`}
            onMouseEnter={() => setActiveTask(t.id)}
            onMouseLeave={() => setActiveTask(null)}
          >
            <span className="font-bold text-surface-400 shrink-0">T{t.id}</span>
            <div>
              <span className="font-semibold text-surface-700">{t.name}</span>
              <span className="text-surface-400 ml-1">— {t.description}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Historical trend */}
      {history.length > 1 && (
        <div className="mt-10">
          <h2 className="text-lg font-bold text-surface-900 mb-4">Historický vývoj</h2>
          <div className="overflow-x-auto rounded-xl border border-surface-200">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="bg-surface-50 border-b border-surface-200">
                  <th className="text-left px-4 py-2.5 font-semibold text-surface-600">Měsíc</th>
                  {Object.values(tools).map((t) => (
                    <th key={t.name} className="text-center px-4 py-2.5 font-semibold text-surface-600">
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {history.slice().reverse().map((row) => (
                  <tr key={row.month} className="border-b border-surface-100">
                    <td className="px-4 py-2 text-surface-500">{fmtMonth(row.month as string)}</td>
                    {Object.keys(tools).map((k) => (
                      <td key={k} className="text-center px-4 py-2 font-semibold text-surface-700">
                        {row[k] ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
