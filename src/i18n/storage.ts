import type { Locale } from "./types"
import { LOCALES } from "./types"

export const LOCALE_STORAGE_KEY = "calculadora-exotic-locale"

export const DEFAULT_LOCALE: Locale = "es"

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

export function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null

  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
  return stored && isLocale(stored) ? stored : null
}

export function writeStoredLocale(locale: Locale) {
  window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
}
