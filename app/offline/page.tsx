export default function OfflinePage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <p className="text-6xl mb-6">📡</p>
      <h1 className="text-2xl font-bold text-surface-900 mb-3">Jsi offline</h1>
      <p className="text-surface-500 mb-6">
        Nemůžeme se připojit k internetu. Stránky, které jsi navštívil/a dříve, jsou
        dostupné v cache — zkus navigovat na jinou stránku.
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors"
      >
        ← Zpět na hlavní stránku
      </a>
    </div>
  );
}
