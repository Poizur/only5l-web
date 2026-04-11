import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
};

export default function DisclaimerPage() {
  const isCZ = site.locale === "cs";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight text-surface-900 mb-4">
        Disclaimer
      </h1>
      <p className="text-sm text-surface-400 mb-10">
        {isCZ ? "Poslední aktualizace: leden 2025" : "Last updated: January 2025"}
      </p>

      <div className="prose-article space-y-6 text-surface-700 leading-relaxed">
        {isCZ ? (
          <>
            <p>
              Web <strong>only5l.cz</strong> obsahuje affiliate linky. Pokud si zakoupíš
              produkt přes náš odkaz, můžeme obdržet provizi bez jakéhokoli příplatku
              pro tebe.
            </p>
            <p>
              Provize neovlivňuje naše hodnocení ani výběr doporučených nástrojů.
              Recenzujeme nástroje na základě vlastního testování a zkušeností.
            </p>
            <p>
              Informace na webu jsou poskytovány „jak jsou" bez jakýchkoli záruk přesnosti.
              Ceny a funkce nástrojů se mohou měnit — doporučujeme ověřit aktuální
              informace přímo u poskytovatele.
            </p>
          </>
        ) : (
          <>
            <p>
              <strong>only5l.com</strong> contains affiliate links. If you purchase a
              product through our link, we may earn a commission at no additional cost
              to you.
            </p>
            <p>
              Commissions do not influence our ratings or recommendations. We review
              tools based on our own hands-on testing.
            </p>
            <p>
              Information on this site is provided "as is" without warranty. Pricing
              and features may change — always verify current details with the provider.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
