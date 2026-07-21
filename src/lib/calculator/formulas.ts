import { GOLF_FEES_USD } from "./constants"
import type { GolfOption, QuoteInput, QuoteResult } from "./types"

function clampNonNegative(value: number) {
  return Number.isFinite(value) ? Math.max(value, 0) : 0
}

function clampPercent(value: number) {
  return Math.min(Math.max(clampNonNegative(value), 0), 100)
}

export function getGolfFee(golf: GolfOption): number {
  if (golf === "none") return 0
  return GOLF_FEES_USD[golf]
}

/**
 * Replica la lógica financiera del worksheet "WS NUEVA VENTA ENG - SPA".
 * Referencias Excel: E20–E31, C32, H23, fila 33 (collection fee).
 */
export function calculateQuote(raw: QuoteInput): QuoteResult {
  const grossPrice = clampNonNegative(raw.grossPrice)
  // tradeInValue se captura en UI pero no entra en fórmulas del WS (como el Excel).

  const taxRate = clampPercent(raw.taxRatePercent) / 100
  const taxAmount = grossPrice * taxRate
  const membershipWithTax = grossPrice + taxAmount

  const downPaymentPercent = clampPercent(raw.downPaymentPercent) / 100
  const downFromPercent = membershipWithTax * downPaymentPercent
  const downFromAmount = clampNonNegative(raw.downPaymentAmount)
  const totalDownPayment = downFromPercent + downFromAmount

  const adminFee = clampNonNegative(raw.adminFee)
  const totalDownPlusAdmin = totalDownPayment + adminFee

  const downPaymentTodayPercent = clampPercent(raw.downPaymentTodayPercent) / 100
  const downTodayPlusAdmin = membershipWithTax * downPaymentTodayPercent + adminFee

  const additionalDownPayments = raw.additionalDownPercents.map((percent) =>
    membershipWithTax * (clampPercent(percent) / 100)
  ) as [number, number, number]

  const golfFee = getGolfFee(raw.golf)
  const totalPaymentToday = downTodayPlusAdmin + golfFee

  // C32 = E20 - (E23 + E24): saldo sobre precio bruto (E20), sin restar trade-in
  const balance = Math.max(grossPrice - totalDownPayment, 0)

  const payments = Math.max(Math.round(raw.payments), 1)
  const collectionFee = clampNonNegative(raw.collectionFee)
  const hasFinancing = balance > 0
  const monthlyBase = hasFinancing ? balance / payments : 0
  const monthlyWithFee = hasFinancing ? monthlyBase + collectionFee : 0

  return {
    effectiveGross: grossPrice,
    taxAmount,
    membershipWithTax,
    downFromPercent,
    downFromAmount,
    totalDownPayment,
    adminFee,
    totalDownPlusAdmin,
    downTodayPlusAdmin,
    additionalDownPayments,
    golfFee,
    totalPaymentToday,
    balance,
    monthlyBase,
    monthlyWithFee,
    collectionFee,
    payments,
  }
}

export function downPercentFromAmount(amount: number, membershipWithTax: number) {
  if (membershipWithTax <= 0) return 0
  return clampPercent((amount / membershipWithTax) * 100)
}

export function membershipWithTaxFrom(grossPrice: number, taxRatePercent: number) {
  const gross = clampNonNegative(grossPrice)
  const taxRate = clampPercent(taxRatePercent) / 100
  return gross * (1 + taxRate)
}
