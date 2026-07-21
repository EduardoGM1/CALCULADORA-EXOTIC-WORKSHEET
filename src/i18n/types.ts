export const LOCALES = ["es", "en"] as const

export type Locale = (typeof LOCALES)[number]

export type Dictionary = {
  meta: {
    title: string
    description: string
  }
  language: {
    label: string
    es: string
    en: string
  }
  sections: {
    membership: { title: string }
    pricing: { title: string }
    downPayment: { title: string }
    financing: { title: string }
    advanced: { title: string }
  }
  fields: {
    affiliateType: string
    term: string
    golf: string
    golfNone: string
    golf5Years: string
    golf10Years: string
    membershipTradeIn: string
    value: string
    basePrice: string
    packAmount: string
    packPercent: string
    salePrice: string
    grossPrice: string
    tax: string
    downPayment: string
    downPaymentPercentSymbol: string
    downPaymentAmountSymbol: string
    downPaymentPercentHint: string
    downPaymentAmountHint: string
    administrationFeeToday: string
    downPaymentTodayAdminFee: string
    downPaymentTodayAdminFeeHint: string
    additionalDownPayment: string
    additionalDownPayment2: string
    additionalDownPayment3: string
    exchangeRate: string
    showMxn: string
    payments: string
    paymentsHint: string
    collectionFee: string
    syncDownPaymentToday: string
  }
  termOption: string
  downPayment: {
    downPaymentOnMembership: string
    totalDownPaymentAdminFee: string
    totalPaymentToday: string
  }
  advanced: {
    estimatedPayments: string
    paymentNumber: string
  }
  summary: {
    title: string
    paymentsTerm: string
    grossPrice: string
    tax: string
    membershipPriceIncludingTax: string
    downPaymentTotal: string
    administrationFeeToday: string
    balance: string
    totalPaymentToday: string
    includesGolf: string
    collectionFee: string
    monthlyEstimate: string
    monthlyBreakdown: string
  }
}
