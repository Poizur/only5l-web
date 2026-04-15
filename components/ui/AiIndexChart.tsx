/**
 * AiIndexChart — server-rendered SVG line chart.
 * No client JS needed: the chart is a static SVG path computed at build time.
 */

interface HistoryEntry {
  month: string;  // "YYYY-MM"
  score: number;
}

interface Props {
  history: HistoryEntry[];
  currentScore: number;
}

const CZ_MONTHS: Record<string, string> = {
  "01": "Led", "02": "Úno", "03": "Bře", "04": "Dub",
  "05": "Kvě", "06": "Čvn", "07": "Čvc", "08": "Srp",
  "09": "Zář", "10": "Říj", "11": "Lis", "12": "Pro",
};

function fmtMonth(m: string): string {
  const [y, mo] = m.split("-");
  return `${CZ_MONTHS[mo] ?? mo} ${y.slice(2)}`;
}

export default function AiIndexChart({ history, currentScore }: Props) {
  const W = 660, H = 200;
  const ML = 42, MR = 16, MT = 14, MB = 36;
  const CW = W - ML - MR;
  const CH = H - MT - MB;
  const n = history.length;

  // Y scale: 0–100
  const toY = (score: number) => MT + CH - (score / 100) * CH;
  const toX = (i: number) => ML + (n <= 1 ? CW / 2 : (i / (n - 1)) * CW);

  const points = history.map((e, i) => ({ x: toX(i), y: toY(e.score), ...e }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");

  const fillPath =
    linePath +
    ` L${points[n - 1].x.toFixed(1)},${(MT + CH).toFixed(1)}` +
    ` L${points[0].x.toFixed(1)},${(MT + CH).toFixed(1)} Z`;

  // Y axis gridlines: 0, 25, 50, 75, 100
  const yTicks = [0, 25, 50, 75, 100];

  // X axis: show every 3rd label (quarterly)
  const xLabels = points.filter((_, i) => i % 3 === 0 || i === n - 1);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      aria-label="Vývoj AI Adoption Index v čase"
      role="img"
    >
      <defs>
        <linearGradient id="aix-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Y gridlines */}
      {yTicks.map((tick) => {
        const y = toY(tick);
        return (
          <g key={tick}>
            <line
              x1={ML} y1={y} x2={ML + CW} y2={y}
              stroke="#e2e8f0" strokeWidth="1"
            />
            <text
              x={ML - 6} y={y + 4}
              textAnchor="end"
              fontSize="10"
              fill="#94a3b8"
            >
              {tick}
            </text>
          </g>
        );
      })}

      {/* Fill area */}
      <path d={fillPath} fill="url(#aix-fill)" />

      {/* Line */}
      <path d={linePath} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round" />

      {/* Dots */}
      {points.map((p) => (
        <circle
          key={p.month}
          cx={p.x} cy={p.y} r={p.score === currentScore ? 5 : 3}
          fill={p.score === currentScore ? "#1d4ed8" : "#3b82f6"}
          stroke="white" strokeWidth="1.5"
        />
      ))}

      {/* Current score label */}
      {points.length > 0 && (
        <text
          x={points[n - 1].x}
          y={points[n - 1].y - 10}
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#1d4ed8"
        >
          {currentScore}
        </text>
      )}

      {/* X axis labels */}
      {xLabels.map((p) => (
        <text
          key={p.month}
          x={p.x} y={H - 6}
          textAnchor="middle"
          fontSize="10"
          fill="#94a3b8"
        >
          {fmtMonth(p.month)}
        </text>
      ))}
    </svg>
  );
}
