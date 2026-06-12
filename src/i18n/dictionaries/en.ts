import type { Dictionary } from "../types"

/** Labels aligned with worksheet "WS NUEVA VENTA ENG - SPA" (English side). */
export const en: Dictionary = {
  meta: {
    title: "Membership Calculator | Exotic Travelers",
    description: "Product quote aligned with the WS NUEVA VENTA sales worksheet.",
  },
  language: {
    label: "Language",
    es: "Español",
    en: "English",
  },
  header: {
    title: "WORKSHEET",
    subtitle: "Product quote calculator aligned with WS NUEVA VENTA ENG - SPA.",
    priceListNote:
      "Regular Price List (3.1): all prices are in USD and include taxes.",
  },
  sections: {
    membership: { title: "Membership" },
    pricing: { title: "Pricing" },
    downPayment: { title: "Down Payment" },
    financing: { title: "Financing" },
    advanced: { title: "Additional options" },
  },
  fields: {
    affiliateType: "Affiliate type:",
    term: "Term:",
    golf: "Golf:",
    golfNone: "-",
    golf5Years: "5 YEARS",
    golf10Years: "10 YEARS",
    membershipTradeIn: "Membership trade in:",
    value: "Value:",
    basePrice: "Base Price (USD)",
    packAmount: "Available Pack Amount",
    packPercent: "Available Pack %",
    salePrice: "Sale Price (USD)",
    grossPrice: "Gross Price:",
    tax: "TAX",
    downPayment: "Down Payment:",
    downPaymentPercentSymbol: "%",
    downPaymentAmountSymbol: "$",
    downPaymentPercentHint:
      "Percentage of the membership price paid as down payment. Sets the balance to finance.",
    downPaymentAmountHint:
      "Extra amount in dollars, in addition to the down payment percentage.",
    administrationFeeToday: "Administration Fee Today:",
    downPaymentTodayAdminFee: "Down Payment Today + Admin Fee:",
    downPaymentTodayAdminFeeHint:
      "Percentage of the membership paid in cash today. May differ from the down payment used for the balance.",
    additionalDownPayment: "Additional Down Payment:",
    additionalDownPayment2: "2d additional down payment:",
    additionalDownPayment3: "3d additional down payment:",
    exchangeRate: "EXCHANGE RATE APROX.",
    showMxn: "Show MXN equivalent",
    payments: "PAYMENTS",
    collectionFee: "Monthly payments include a collection fee of:",
    syncPayments: "Sync with Term",
    syncDownPaymentToday: "Sync with Down Payment %",
    paymentsHintAuto: "Calculated automatically from the term (years × 12).",
    paymentsHintCustom:
      "Custom number of payments. Sync with Term to restore the automatic calculation.",
  },
  termOption: "{{years}} YEARS",
  downPayment: {
    downPaymentOnMembership: "Down Payment",
    totalDownPaymentAdminFee: "Total Down Payment + Admin Fee:",
    totalPaymentToday: "Total Payment today (Down Payment + Admin Fee)",
  },
  advanced: {
    estimatedPayments: "Estimated additional payments",
    paymentNumber: "#{{index}}",
  },
  summary: {
    title: "Quote summary",
    paymentsTerm: "{{payments}} PAYMENTS · Term {{years}} YEARS",
    grossPrice: "Gross Price:",
    tax: "TAX",
    membershipPriceIncludingTax: "Membership price including tax:",
    downPaymentTotal: "Down Payment:",
    administrationFeeToday: "Administration Fee Today:",
    balance: "BALANCE",
    totalPaymentToday: "Total Payment today (Down Payment + Admin Fee)",
    includesGolf: "Golf",
    collectionFee: "Monthly payments include a collection fee of:",
    monthlyEstimate: "Mtly:",
    monthlyBreakdown: "Principal {{capital}} + collection {{collection}}",
  },
}
