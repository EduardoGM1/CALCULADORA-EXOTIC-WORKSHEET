const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
})

const mxnFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 2,
})

export function formatUsd(value: number) {
  return usdFormatter.format(Number.isFinite(value) ? value : 0)
}

export function formatMxn(value: number, exchangeRate: number) {
  return mxnFormatter.format((Number.isFinite(value) ? value : 0) * exchangeRate)
}

export function formatPercent(value: number, digits = 1) {
  return `${value.toFixed(digits)}%`
}
