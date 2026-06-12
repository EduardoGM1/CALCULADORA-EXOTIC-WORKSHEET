"use client"

import { ChevronDown, Gem, Percent } from "lucide-react"
import { useTranslate } from "@/hooks/use-translate"
import { useMembershipCalculator } from "@/hooks/useMembershipCalculator"
import { MEMBERSHIP_CATALOG } from "@/lib/calculator/constants"
import { formatPercent, formatUsd } from "@/lib/calculator/format"
import {
  Field,
  NumberControl,
  ReadonlyValue,
  SelectControl,
} from "./form-controls"
import { LanguageSwitcher } from "./language-switcher"
import { QuoteSummary } from "./quote-summary"

export function CalculatorPage() {
  const { dictionary: dict, t } = useTranslate()
  const calculator = useMembershipCalculator()
  const {
    membershipName,
    selectedMembership,
    selectedPlan,
    availableYears,
    grossPrice,
    tradeInValue,
    taxRatePercent,
    downPaymentPercent,
    downPaymentAmount,
    downPaymentTodayPercent,
    adminFee,
    additionalDownPercents,
    golf,
    termYears,
    payments,
    paymentsTouched,
    exchangeRate,
    collectionFee,
    showMxn,
    showAdvanced,
    quote,
    selectMembership,
    setGrossPrice,
    setTradeInValue,
    setTaxRatePercent,
    setDownPaymentPercent,
    setDownPaymentAmount,
    downPaymentTodayTouched,
    setDownPaymentTodayPercent,
    syncDownPaymentTodayWithDown,
    setAdminFee,
    updateAdditionalDownPercent,
    setGolf,
    setTermYears,
    setPayments,
    syncPaymentsWithTerm,
    setExchangeRate,
    setCollectionFee,
    setShowMxn,
    setShowAdvanced,
  } = calculator

  return (
    <div className="mx-auto max-w-7xl px-4">
      <header className="mb-10 flex flex-col gap-4 border-l-4 border-[#143F46] pl-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="mb-1 text-3xl font-bold text-[#143F46]">{dict.header.title}</h1>
          <p className="max-w-2xl text-[#5B7776]">{dict.header.subtitle}</p>
          <p className="mt-2 max-w-2xl text-xs text-[#5B7776]">{dict.header.priceListNote}</p>
        </div>
        <LanguageSwitcher />
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <section className="rounded-xl border border-[#D7E7E2] bg-white p-6 shadow-sm">
            <SectionHeader title={dict.sections.membership.title} />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={dict.fields.affiliateType}>
                <SelectControl
                  value={membershipName}
                  onChange={(event) => selectMembership(event.target.value)}
                >
                  {MEMBERSHIP_CATALOG.map((tier) => (
                    <option key={tier.name} value={tier.name}>
                      {tier.name}
                    </option>
                  ))}
                </SelectControl>
              </Field>

              <Field label={dict.fields.term}>
                <SelectControl
                  value={termYears}
                  onChange={(event) => setTermYears(Number(event.target.value))}
                >
                  {availableYears.map((years) => (
                    <option key={years} value={years}>
                      {t(dict.termOption, { years })}
                    </option>
                  ))}
                </SelectControl>
              </Field>

              <Field label={dict.fields.golf}>
                <SelectControl
                  value={golf}
                  onChange={(event) =>
                    setGolf(event.target.value as "none" | "5" | "10")
                  }
                >
                  <option value="none">{dict.fields.golfNone}</option>
                  <option value="5">{dict.fields.golf5Years}</option>
                  <option value="10">{dict.fields.golf10Years}</option>
                </SelectControl>
              </Field>

              <Field label={dict.fields.value}>
                <NumberControl
                  prefix="$"
                  min={0}
                  max={grossPrice}
                  step={100}
                  value={tradeInValue}
                  onChange={(event) =>
                    setTradeInValue(
                      Math.min(Math.max(Number(event.target.value), 0), grossPrice)
                    )
                  }
                />
              </Field>
            </div>
          </section>

          <section className="rounded-xl border border-[#D7E7E2] bg-white p-6 shadow-sm">
            <SectionHeader title={dict.sections.pricing.title} />

            <div className="grid gap-5 sm:grid-cols-2">
              <ReadonlyValue label={dict.fields.basePrice} value={selectedPlan.basePrice} />
              <ReadonlyValue label={dict.fields.packAmount} value={selectedPlan.packAmount} />
              <ReadonlyValue
                label={dict.fields.packPercent}
                value={`${selectedPlan.packPercent}%`}
              />
              <ReadonlyValue label={dict.fields.salePrice} value={selectedPlan.salePrice} />

              <Field label={dict.fields.grossPrice}>
                <NumberControl
                  prefix="$"
                  min={0}
                  step={0.01}
                  value={grossPrice}
                  onChange={(event) => setGrossPrice(Number(event.target.value))}
                />
              </Field>

              <Field label={dict.fields.tax}>
                <NumberControl
                  min={0}
                  max={100}
                  step={0.1}
                  value={taxRatePercent}
                  onChange={(event) => setTaxRatePercent(Number(event.target.value))}
                />
              </Field>
            </div>
          </section>

          <section className="rounded-xl border border-[#D7E7E2] bg-white p-6 shadow-sm">
            <SectionHeader title={dict.sections.downPayment.title} />

            {/* Excel filas 23-24: un solo Down Payment con % y $ */}
            <div className="mb-5 rounded-xl border border-[#D7E7E2] bg-[#F7FBF9] p-4">
              <p className="mb-3 text-sm font-semibold text-[#143F46]">{dict.fields.downPayment}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label={dict.fields.downPaymentPercentSymbol}
                  hint={dict.fields.downPaymentPercentHint}
                >
                  <NumberControl
                    min={0}
                    max={100}
                    step={1}
                    value={downPaymentPercent}
                    onChange={(event) => setDownPaymentPercent(Number(event.target.value))}
                  />
                </Field>
                <Field
                  label={dict.fields.downPaymentAmountSymbol}
                  hint={dict.fields.downPaymentAmountHint}
                >
                  <NumberControl
                    prefix="$"
                    min={0}
                    step={100}
                    value={downPaymentAmount}
                    onChange={(event) => setDownPaymentAmount(Number(event.target.value))}
                  />
                </Field>
              </div>
            </div>

            {/* Excel fila 25 */}
            <div className="mb-5">
              <Field label={dict.fields.administrationFeeToday}>
                <NumberControl
                  prefix="$"
                  min={0}
                  step={50}
                  value={adminFee}
                  onChange={(event) => setAdminFee(Number(event.target.value))}
                />
              </Field>
            </div>

            {/* Excel fila 26 (calculado) */}
            <ReadonlyValue
              label={dict.downPayment.totalDownPaymentAdminFee}
              value={quote.totalDownPlusAdmin}
            />

            {/* Excel fila 27: distinto del Down Payment % — pago de hoy */}
            <div className="mt-5">
              <Field
                label={`${dict.fields.downPaymentTodayAdminFee} (%)`}
                hint={dict.fields.downPaymentTodayAdminFeeHint}
              >
                <div className="flex gap-2">
                  <NumberControl
                    min={0}
                    max={100}
                    step={1}
                    value={downPaymentTodayPercent}
                    onChange={(event) =>
                      setDownPaymentTodayPercent(Number(event.target.value))
                    }
                  />
                  {downPaymentTodayTouched ? (
                    <button
                      type="button"
                      onClick={syncDownPaymentTodayWithDown}
                      className="shrink-0 rounded-lg border border-[#D7E7E2] px-3 text-xs font-semibold text-[#143F46] transition hover:bg-[#EAF4F1]"
                    >
                      {dict.fields.syncDownPaymentToday}
                    </button>
                  ) : null}
                </div>
              </Field>
            </div>

            <div className="mt-6 rounded-xl border border-[#D7E7E2] bg-[#F7FBF9] p-5">
              <div className="mb-3 flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-sm font-semibold text-[#143F46]">
                  <Percent size={16} />
                  {dict.downPayment.downPaymentOnMembership}
                </span>
                <span className="text-sm font-semibold text-[#143F46]">
                  {formatPercent(
                    quote.membershipWithTax > 0
                      ? (quote.totalDownPayment / quote.membershipWithTax) * 100
                      : 0
                  )}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-[#143F46] transition-all"
                  style={{
                    width: `${
                      quote.membershipWithTax > 0
                        ? Math.min(
                            (quote.totalDownPayment / quote.membershipWithTax) * 100,
                            100
                          )
                        : 0
                    }%`,
                  }}
                />
              </div>
              <p className="mt-3 text-xs text-[#5B7776]">
                {dict.downPayment.totalDownPaymentAdminFee}{" "}
                {formatUsd(quote.totalDownPlusAdmin)} · {dict.downPayment.totalPaymentToday}{" "}
                {formatUsd(quote.totalPaymentToday)}
              </p>
            </div>
          </section>

          <section className="rounded-xl border border-[#D7E7E2] bg-white p-6 shadow-sm">
            <SectionHeader title={dict.sections.financing.title} />

            <div className="grid gap-5 sm:grid-cols-2">
              <ReadonlyValue label={dict.summary.balance} value={quote.balance} />

              <Field
                label={dict.fields.payments}
                hint={
                  paymentsTouched
                    ? dict.fields.paymentsHintCustom
                    : dict.fields.paymentsHintAuto
                }
              >
                <div className="flex gap-2">
                  <NumberControl
                    min={1}
                    max={360}
                    value={payments}
                    onChange={(event) => setPayments(Number(event.target.value))}
                  />
                  {paymentsTouched ? (
                    <button
                      type="button"
                      onClick={syncPaymentsWithTerm}
                      className="shrink-0 rounded-lg border border-[#D7E7E2] px-3 text-xs font-semibold text-[#143F46] transition hover:bg-[#EAF4F1]"
                    >
                      {dict.fields.syncPayments}
                    </button>
                  ) : null}
                </div>
              </Field>

              <Field label={dict.fields.exchangeRate}>
                <NumberControl
                  min={0}
                  step={0.01}
                  value={exchangeRate}
                  onChange={(event) => setExchangeRate(Number(event.target.value))}
                />
              </Field>
            </div>

            <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-[#5B7776]">
              <input
                type="checkbox"
                checked={showMxn}
                onChange={(event) => setShowMxn(event.target.checked)}
                className="size-4 rounded border-[#D7E7E2] text-[#143F46] focus:ring-[#EAF4F1]"
              />
              {dict.fields.showMxn}
            </label>
          </section>

          <section className="rounded-xl border border-[#D7E7E2] bg-white shadow-sm">
            <button
              type="button"
              onClick={() => setShowAdvanced((value) => !value)}
              className="flex w-full items-center justify-between gap-3 p-6 text-left"
            >
              <h2 className="text-lg font-semibold text-[#143F46]">
                {dict.sections.advanced.title}
              </h2>
              <ChevronDown
                size={20}
                className={`shrink-0 text-[#143F46] transition ${showAdvanced ? "rotate-180" : ""}`}
              />
            </button>

            {showAdvanced ? (
              <div className="grid gap-5 border-t border-[#D7E7E2] p-6 sm:grid-cols-2">
                <Field label={dict.fields.additionalDownPayment}>
                  <NumberControl
                    min={0}
                    max={100}
                    value={additionalDownPercents[0]}
                    onChange={(event) =>
                      updateAdditionalDownPercent(0, Number(event.target.value))
                    }
                  />
                </Field>
                <Field label={dict.fields.additionalDownPayment2}>
                  <NumberControl
                    min={0}
                    max={100}
                    value={additionalDownPercents[1]}
                    onChange={(event) =>
                      updateAdditionalDownPercent(1, Number(event.target.value))
                    }
                  />
                </Field>
                <Field label={dict.fields.additionalDownPayment3}>
                  <NumberControl
                    min={0}
                    max={100}
                    value={additionalDownPercents[2]}
                    onChange={(event) =>
                      updateAdditionalDownPercent(2, Number(event.target.value))
                    }
                  />
                </Field>
                <Field label={dict.fields.collectionFee}>
                  <NumberControl
                    prefix="$"
                    min={0}
                    step={0.25}
                    value={collectionFee}
                    onChange={(event) => setCollectionFee(Number(event.target.value))}
                  />
                </Field>

                {additionalDownPercents.some((value) => value > 0) ? (
                  <div className="sm:col-span-2 rounded-lg bg-[#F7FBF9] p-4 text-sm text-[#5B7776]">
                    {dict.advanced.estimatedPayments}:{" "}
                    {quote.additionalDownPayments.map((amount, index) => (
                      <span key={index} className="mr-3 font-medium text-[#143F46]">
                        {t(dict.advanced.paymentNumber, { index: index + 1 })}:{" "}
                        {formatUsd(amount)}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </section>
        </div>

        <QuoteSummary
          membershipName={selectedMembership.name}
          badgeClass={selectedMembership.badgeClass}
          termYears={termYears}
          quote={quote}
          exchangeRate={exchangeRate}
          showMxn={showMxn}
        />
      </div>
    </div>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="rounded-2xl bg-[#EAF4F1] p-3 text-[#143F46]">
        <Gem size={24} />
      </div>
      <h2 className="text-xl font-semibold text-[#143F46]">{title}</h2>
    </div>
  )
}
