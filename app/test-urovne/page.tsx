"use client";

import { useState } from "react";
import Link from "next/link";

interface Question {
  id: number;
  text: string;
  options: { label: string; points: number }[];
}

interface Result {
  level: "začátečník" | "pokročilý" | "expert";
  title: string;
  emoji: string;
  description: string;
  articles: { title: string; href: string; description: string }[];
  nextStep: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Jak dlouho používáš AI nástroje (ChatGPT, Claude, Gemini...)?",
    options: [
      { label: "Ještě jsem to nezkoušel/a", points: 0 },
      { label: "Pár týdnů", points: 1 },
      { label: "Několik měsíců", points: 2 },
      { label: "Více než rok", points: 3 },
    ],
  },
  {
    id: 2,
    text: "Co se stane, když AI řekne něco s jistotou, ale je to nepravdivé?",
    options: [
      { label: "Nevím, co myslíš", points: 0 },
      { label: "Je to chyba — AI by měla vždy pravdu", points: 0 },
      { label: "Říká se tomu halucinace — AI si fakta vymýšlí", points: 2 },
      { label: "Záleží na tom, jaký model používám a jak jsem prompt napsal/a", points: 3 },
    ],
  },
  {
    id: 3,
    text: "Jak bys popsal/a, jak obvykle zadáváš AI instrukce?",
    options: [
      { label: "Píšu krátké jednoduché otázky", points: 0 },
      { label: "Snažím se být konkrétní, ale nevím o žádné technice", points: 1 },
      { label: "Používám strukturu: role + kontext + úkol + formát", points: 2 },
      { label: "Mám vlastní prompt šablony a iterativně je upravuji", points: 3 },
    ],
  },
  {
    id: 4,
    text: "Kolik různých AI nástrojů pravidelně používáš?",
    options: [
      { label: "Žádný (zatím)", points: 0 },
      { label: "Jeden nebo dva (např. jen ChatGPT)", points: 1 },
      { label: "3–5 nástrojů pro různé účely", points: 2 },
      { label: "Více než 5, každý pro specifický účel", points: 3 },
    ],
  },
  {
    id: 5,
    text: "Používáš AI pro práci nebo podnikání?",
    options: [
      { label: "Ne, jen experimentuji", points: 0 },
      { label: "Zkouším to, zatím bez pravidelnosti", points: 1 },
      { label: "Ano, pravidelně — šetří mi hodiny týdně", points: 2 },
      { label: "AI je součástí mých pracovních procesů a automatizací", points: 3 },
    ],
  },
];

const RESULTS: Result[] = [
  {
    level: "začátečník",
    title: "Začátečník",
    emoji: "🌱",
    description:
      "Jsi na začátku cesty — a to je skvělé místo pro start! AI nástroje jsou dostupnější než kdykoli před tím a za pár hodin budeš moci ušetřit hodiny práce. Začni základy a brzy uvidíš výsledky.",
    articles: [
      {
        title: "Co je ChatGPT a jak začít zdarma",
        href: "/co-je-chatgpt-a-jak-zacit-zdarma",
        description: "Krok za krokem od registrace po první výsledky",
      },
      {
        title: "Co je umělá inteligence – bez žargonu",
        href: "/co-je-umela-inteligence-vysvetleni-bez-technickeho-zargonu",
        description: "Jasné vysvětlení pro každého",
      },
      {
        title: "Jak napsat dobrý prompt",
        href: "/jak-napsat-dobry-prompt-zaklady-pro-zacatecniky",
        description: "Základní techniky pro lepší výsledky",
      },
    ],
    nextStep:
      "Začni s bezplatným ChatGPT nebo Claude a zkus ho použít na jednu konkrétní práci — napsat email, shrnout dokument nebo odpovědět na otázku.",
  },
  {
    level: "pokročilý",
    title: "Pokročilý",
    emoji: "🚀",
    description:
      "AI už používáš a znáš základy — teď je čas posunout se dál. Zaměř se na specifické nástroje pro svůj obor a naučil se pokročilé promptovací techniky, které dramaticky zlepší výsledky.",
    articles: [
      {
        title: "Nejčastější chyby při používání AI",
        href: "/nejcastejsi-chyby-pri-pouzivani-ai-a-jak-se-jim-vyhnout",
        description: "Vyhni se pastím, do kterých padá většina uživatelů",
      },
      {
        title: "AI pro tvůj obor",
        href: "/kategorie/profese",
        description: "Konkrétní nástroje a postupy podle profese",
      },
      {
        title: "Slovník AI pojmů",
        href: "/slovnik",
        description: "Pochop klíčové koncepty za AI nástroji",
      },
    ],
    nextStep:
      "Vyber jeden pracovní úkol, který tě týdně stojí více než 2 hodiny, a zkus ho celý zautomatizovat pomocí AI. Měř čas před a po.",
  },
  {
    level: "expert",
    title: "Expert",
    emoji: "⚡",
    description:
      "Patříš mezi 5 % uživatelů, kteří AI skutečně ovládají. Tvým dalším krokem jsou pokročilé integrace, API, agentní systémy nebo AI strategie pro celý tým či firmu.",
    articles: [
      {
        title: "Srovnání AI nástrojů 2026",
        href: "/kategorie/srovnani",
        description: "Hloubková srovnání pro náročné uživatele",
      },
      {
        title: "AI pro programátory: Copilot, Cursor a další",
        href: "/ai-pro-programatory-nastroje-a-tipy-2026",
        description: "Pokročilé vývojářské workflow",
      },
      {
        title: "Recenze prémiových nástrojů",
        href: "/kategorie/recenze",
        description: "Poctivé recenze pro profesionální použití",
      },
    ],
    nextStep:
      "Prozkoumej AI API (OpenAI, Anthropic) a zkus postavit jednoduchý agentní workflow nebo automatizaci pro svůj tým.",
  },
];

function getResult(totalPoints: number): Result {
  if (totalPoints <= 4) return RESULTS[0];
  if (totalPoints <= 9) return RESULTS[1];
  return RESULTS[2];
}

export default function TestUrovnePage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[currentQ];
  const totalPoints = answers.reduce((s, p) => s + p, 0);
  const result = finished ? getResult(totalPoints) : null;

  function handleSelect(points: number, idx: number) {
    setSelectedOption(idx);
  }

  function handleNext() {
    if (selectedOption === null) return;
    const points = question.options[selectedOption].points;
    const newAnswers = [...answers, points];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQ + 1 >= QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrentQ((q) => q + 1);
    }
  }

  function handleRestart() {
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
    setFinished(false);
  }

  if (finished && result) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">{result.emoji}</div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-2">
            Tvůj výsledek
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-surface-900 mb-4">
            {result.title}
          </h1>
          <p className="text-lg text-surface-600 leading-relaxed max-w-xl mx-auto">
            {result.description}
          </p>
        </div>

        {/* Score bar */}
        <div className="mb-10 p-5 rounded-2xl bg-surface-50 border border-surface-200">
          <div className="flex justify-between text-sm text-surface-500 mb-2">
            <span>Skóre: {totalPoints} / {QUESTIONS.length * 3} bodů</span>
            <span>{result.level}</span>
          </div>
          <div className="h-3 bg-surface-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-600 rounded-full transition-all"
              style={{ width: `${(totalPoints / (QUESTIONS.length * 3)) * 100}%` }}
            />
          </div>
        </div>

        {/* Recommended articles */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-surface-900 mb-4">Doporučené články pro tebe</h2>
          <div className="space-y-3">
            {result.articles.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="block p-4 rounded-xl border border-surface-200 hover:border-brand-300 hover:bg-brand-50 transition-colors"
              >
                <div className="font-semibold text-surface-900">{a.title}</div>
                <div className="text-sm text-surface-500 mt-1">{a.description}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Next step */}
        <div className="p-6 rounded-2xl bg-brand-50 border border-brand-100 mb-8">
          <p className="text-sm font-semibold text-brand-700 uppercase tracking-widest mb-2">
            Doporučený další krok
          </p>
          <p className="text-surface-700 leading-relaxed">{result.nextStep}</p>
        </div>

        <button
          onClick={handleRestart}
          className="w-full py-3 rounded-xl border border-surface-300 text-surface-600 font-medium hover:bg-surface-50 transition-colors"
        >
          Zkusit znovu
        </button>
      </div>
    );
  }

  const progress = (currentQ / QUESTIONS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-2">
          Test úrovně
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900 mb-3">
          Jaká je tvoje AI úroveň?
        </h1>
        <p className="text-surface-500">
          5 otázek · 2 minuty · Dostaneš doporučené články přesně pro tebe
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-surface-400 mb-2">
          <span>Otázka {currentQ + 1} z {QUESTIONS.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-surface-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-surface-900 mb-6">{question.text}</h2>
        <div className="space-y-3">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(opt.points, idx)}
              className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all font-medium ${
                selectedOption === idx
                  ? "border-brand-600 bg-brand-50 text-brand-900"
                  : "border-surface-200 hover:border-brand-300 hover:bg-surface-50 text-surface-700"
              }`}
            >
              <span className="inline-flex items-center gap-3">
                <span
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                    selectedOption === idx
                      ? "border-brand-600 bg-brand-600"
                      : "border-surface-300"
                  }`}
                >
                  {selectedOption === idx && (
                    <span className="w-2 h-2 rounded-full bg-white" />
                  )}
                </span>
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={selectedOption === null}
        className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all ${
          selectedOption !== null
            ? "bg-brand-600 text-white hover:bg-brand-700"
            : "bg-surface-200 text-surface-400 cursor-not-allowed"
        }`}
      >
        {currentQ + 1 === QUESTIONS.length ? "Zobrazit výsledek →" : "Další otázka →"}
      </button>
    </div>
  );
}
