"use client"

import dynamic from "next/dynamic"

const CalculatorPage = dynamic(
  () =>
    import("@/components/calculator/calculator-page").then((module) => module.CalculatorPage),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-[#5B7776]">Cargando...</div>
    ),
  }
)

export function CalculatorShell() {
  return <CalculatorPage />
}
