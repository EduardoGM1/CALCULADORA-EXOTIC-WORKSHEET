export type GolfOption = "none" | "5" | "10"

export type MembershipPlan = {
  years: number
  basePrice: number
  packAmount: number
  packPercent: number
  salePrice: number
}

export type MembershipCatalogItem = {
  name: string
  badgeClass: string
  plans: MembershipPlan[]
}

export type QuoteInput = {
  grossPrice: number
  tradeInValue: number
  taxRatePercent: number
  downPaymentPercent: number
  downPaymentAmount: number
  downPaymentTodayPercent: number
  adminFee: number
  additionalDownPercents: [number, number, number]
  golf: GolfOption
  termYears: number
  payments: number
  exchangeRate: number
  collectionFee: number
}

export type QuoteResult = {
  effectiveGross: number
  taxAmount: number
  membershipWithTax: number
  downFromPercent: number
  downFromAmount: number
  totalDownPayment: number
  adminFee: number
  totalDownPlusAdmin: number
  downTodayPlusAdmin: number
  additionalDownPayments: [number, number, number]
  golfFee: number
  totalPaymentToday: number
  balance: number
  monthlyBase: number
  monthlyWithFee: number
  collectionFee: number
  payments: number
}
