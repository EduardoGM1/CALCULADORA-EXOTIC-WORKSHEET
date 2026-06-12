import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  readStoredLocale,
  writeStoredLocale,
} from "./storage"
import type { Locale } from "./types"

const listeners = new Set<() => void>()

export function subscribeLocale(onStoreChange: () => void) {
  listeners.add(onStoreChange)

  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === LOCALE_STORAGE_KEY) {
      onStoreChange()
    }
  }

  window.addEventListener("storage", onStorage)

  return () => {
    listeners.delete(onStoreChange)
    window.removeEventListener("storage", onStorage)
  }
}

export function notifyLocaleChange() {
  listeners.forEach((listener) => listener())
}

export function getLocaleClientSnapshot(): Locale {
  return readStoredLocale() ?? DEFAULT_LOCALE
}

export function getLocaleServerSnapshot(): Locale {
  return DEFAULT_LOCALE
}

export function persistLocale(locale: Locale) {
  writeStoredLocale(locale)
  notifyLocaleChange()
}
