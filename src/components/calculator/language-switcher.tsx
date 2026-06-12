"use client"

import { LOCALES } from "@/i18n"
import { useTranslate } from "@/hooks/use-translate"

export function LanguageSwitcher() {
  const { locale, dictionary, setLocale } = useTranslate()

  return (
    <div
      className="flex items-center gap-2"
      role="group"
      aria-label={dictionary.language.label}
    >
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
            locale === code
              ? "bg-[#143F46] text-white shadow-sm"
              : "border border-[#D7E7E2] bg-white text-[#143F46] hover:bg-[#EAF4F1]"
          }`}
        >
          {code === "es" ? dictionary.language.es : dictionary.language.en}
        </button>
      ))}
    </div>
  )
}
