"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import { getDictionary } from "@/i18n/dictionaries"
import {
  getLocaleClientSnapshot,
  getLocaleServerSnapshot,
  persistLocale,
  subscribeLocale,
} from "@/i18n/locale-store"
import type { Dictionary, Locale } from "@/i18n"

type LocaleContextValue = {
  locale: Locale
  dictionary: Dictionary
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeLocale,
    getLocaleClientSnapshot,
    getLocaleServerSnapshot
  )

  const setLocale = useCallback((next: Locale) => {
    persistLocale(next)
  }, [])

  const dictionary = useMemo(() => getDictionary(locale), [locale])

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = dictionary.meta.title
  }, [dictionary.meta.title, locale])

  const value = useMemo(
    () => ({
      locale,
      dictionary,
      setLocale,
    }),
    [dictionary, locale, setLocale]
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider")
  }

  return context
}
