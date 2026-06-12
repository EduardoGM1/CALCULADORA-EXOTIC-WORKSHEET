"use client"

import { interpolate } from "@/i18n/translate"
import { useLocale } from "@/providers/locale-provider"

export function useTranslate() {
  const { locale, dictionary, setLocale } = useLocale()

  function t(template: string, values?: Record<string, string | number>) {
    return interpolate(template, values)
  }

  return {
    locale,
    dictionary,
    setLocale,
    t,
  }
}
