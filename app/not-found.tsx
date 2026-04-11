import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  const isCZ = site.locale === "cs";
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="text-8xl font-extrabold text-brand-100 select-none">404</p>
      <h1 className="text-2xl font-bold text-surface-900 mt-4 mb-2">
        {isCZ ? "Stránka nenalezena" : "Page not found"}
      </h1>
      <p className="text-surface-500 mb-8 max-w-sm">
        {isCZ
          ? "Tato stránka neexistuje nebo byla přesunuta."
          : "This page doesn't exist or has been moved."}
      </p>
      <Link href="/" className="btn-primary">
        {isCZ ? "← Zpět na hlavní stránku" : "← Back to home"}
      </Link>
    </div>
  );
}
