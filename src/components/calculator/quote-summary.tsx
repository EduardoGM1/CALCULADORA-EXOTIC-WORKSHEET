"use client"

import {
  BadgeDollarSign,
  Calculator,
  CreditCard,
  Landmark,
  Receipt,
  Wallet,
} from "lucide-react"
import { useTranslate } from "@/hooks/use-translate"
import { formatMxn, formatUsd } from "@/lib/calculator/format"
import type { QuoteResult } from "@/lib/calculator/types"

type QuoteSummaryProps = {
  membershipName: string
  badgeClass: string
  termYears: number
  quote: QuoteResult
  exchangeRate: number
  showMxn: boolean
}

type MoneyLine = {
  label: string
  usd: number
  icon: typeof BadgeDollarSign
  iconClass: string
  emphasize?: boolean
}

function MoneyValue({
  usd,
  exchangeRate,
  showMxn,
  emphasize,
}: {
  usd: number
  exchangeRate: number
  showMxn: boolean
  emphasize?: boolean
}) {
  return (
    <div className="text-right">
      <p className={`${emphasize ? "text-lg" : "text-base"} font-bold text-[#143F46]`}>
        {formatUsd(usd)}
      </p>
      {showMxn ? (
        <p className="text-xs font-medium text-[#5B7776]">{formatMxn(usd, exchangeRate)}</p>
      ) : null}
    </div>
  )
}

export function QuoteSummary({
  membershipName,
  badgeClass,
  termYears,
  quote,
  exchangeRate,
  showMxn,
}: QuoteSummaryProps) {
  const { dictionary: dict, t } = useTranslate()

  const lines: MoneyLine[] = [
    {
      label: dict.summary.grossPrice,
      usd: quote.effectiveGross,
      icon: BadgeDollarSign,
      iconClass: "bg-emerald-50 text-emerald-700",
    },
    {
      label: dict.summary.tax,
      usd: quote.taxAmount,
      icon: Receipt,
      iconClass: "bg-violet-50 text-violet-700",
    },
    {
      label: dict.summary.membershipPriceIncludingTax,
      usd: quote.membershipWithTax,
      icon: Landmark,
      iconClass: "bg-teal-50 text-teal-700",
    },
    {
      label: dict.summary.downPaymentTotal,
      usd: quote.totalDownPayment,
      icon: Wallet,
      iconClass: "bg-amber-50 text-amber-700",
    },
    {
      label: dict.summary.administrationFeeToday,
      usd: quote.adminFee,
      icon: Receipt,
      iconClass: "bg-orange-50 text-orange-700",
    },
    {
      label: dict.summary.balance,
      usd: quote.balance,
      icon: CreditCard,
      iconClass: "bg-sky-50 text-sky-700",
      emphasize: true,
    },
  ]

  return (
    <aside className="rounded-xl border border-[#D7E7E2] bg-white p-6 shadow-sm">
      <div className="mb-6">
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${badgeClass}`}>
          {membershipName}
        </span>
        <h2 className="mt-4 text-xl font-semibold text-[#143F46]">{dict.summary.title}</h2>
        <p className="mt-1 text-sm text-[#5B7776]">
          {t(dict.summary.paymentsTerm, { payments: quote.payments, years: termYears })}
        </p>
      </div>

      <div className="space-y-3">
        {lines.map((line) => {
          const Icon = line.icon

          return (
            <div
              key={line.label}
              className="flex items-center justify-between gap-4 rounded-xl border border-[#D7E7E2] bg-[#F7FBF9] p-4"
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-2xl p-3 ${line.iconClass}`}>
                  <Icon size={22} />
                </div>
                <span className="text-sm font-medium text-[#5B7776]">{line.label}</span>
              </div>
              <MoneyValue
                usd={line.usd}
                exchangeRate={exchangeRate}
                showMxn={showMxn}
                emphasize={line.emphasize}
              />
            </div>
          )
        })}
      </div>

      <div className="mt-4 space-y-2 rounded-xl border border-[#D7E7E2] bg-[#F7FBF9] p-4 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-[#5B7776]">{dict.summary.totalPaymentToday}</span>
          <MoneyValue usd={quote.totalPaymentToday} exchangeRate={exchangeRate} showMxn={showMxn} />
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[#5B7776]">{dict.downPayment.totalDownPaymentAdminFee}</span>
          <MoneyValue
            usd={quote.totalDownPlusAdmin}
            exchangeRate={exchangeRate}
            showMxn={showMxn}
          />
        </div>
        {quote.golfFee > 0 ? (
          <div className="flex justify-between gap-4">
            <span className="text-[#5B7776]">{dict.summary.includesGolf}</span>
            <MoneyValue usd={quote.golfFee} exchangeRate={exchangeRate} showMxn={showMxn} />
          </div>
        ) : null}
        {quote.balance > 0 ? (
          <div className="flex justify-between gap-4">
            <span className="text-[#5B7776]">{dict.summary.collectionFee}</span>
            <MoneyValue usd={quote.collectionFee} exchangeRate={exchangeRate} showMxn={showMxn} />
          </div>
        ) : null}
      </div>

      <div className="mt-6 rounded-xl bg-[#143F46] p-5 text-white">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-white/10 p-3">
            <Calculator size={22} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-white/75">{dict.summary.monthlyEstimate}</p>
            {quote.balance > 0 ? (
              <>
                <p className="mt-2 text-4xl font-bold">{formatUsd(quote.monthlyWithFee)}</p>
                {showMxn ? (
                  <p className="mt-1 text-sm text-white/75">
                    {formatMxn(quote.monthlyWithFee, exchangeRate)}
                  </p>
                ) : null}
                <p className="mt-3 text-sm text-white/75">
                  {t(dict.summary.monthlyBreakdown, {
                    capital: formatUsd(quote.monthlyBase),
                    collection: formatUsd(quote.collectionFee),
                  })}
                </p>
              </>
            ) : (
              <p className="mt-2 text-lg font-medium text-white/90">
                {dict.summary.noMonthlyPayment}
              </p>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}
