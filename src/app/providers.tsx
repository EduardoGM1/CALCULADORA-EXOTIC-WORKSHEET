"use client"

import type { ReactNode } from "react"
import { LocaleProvider } from "@/providers/locale-provider"

export function AppProviders({ children }: { children: ReactNode }) {
  return <LocaleProvider>{children}</LocaleProvider>
}
