"use client"

import { useMemo, useState } from "react"
import {
  DEFAULT_ADMIN_FEE,
  DEFAULT_COLLECTION_FEE,
  DEFAULT_EXCHANGE_RATE,
  DEFAULT_MEMBERSHIP_NAME,
  DEFAULT_PAYMENTS,
  DEFAULT_TERM_YEARS,
  findMembership,
  getYearsForMembership,
  resolvePlan,
} from "@/lib/calculator/constants"
import {
  calculateQuote,
  downPercentFromAmount,
  membershipWithTaxFrom,
} from "@/lib/calculator/formulas"
import type { GolfOption, MembershipPlan } from "@/lib/calculator/types"

const initialPlan = resolvePlan(DEFAULT_MEMBERSHIP_NAME, DEFAULT_TERM_YEARS)

export function useMembershipCalculator() {
  const [membershipName, setMembershipName] = useState(DEFAULT_MEMBERSHIP_NAME)
  const [termYears, setTermYears] = useState(DEFAULT_TERM_YEARS)
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan>(initialPlan)
  const [grossPrice, setGrossPrice] = useState(initialPlan.salePrice)
  const [tradeInValue, setTradeInValue] = useState(0)
  const [taxRatePercent, setTaxRatePercent] = useState(0)
  const [downPaymentPercent, setDownPaymentPercent] = useState(20)
  const [downPaymentAmount, setDownPaymentAmount] = useState(0)
  const [downPaymentTodayPercent, setDownPaymentTodayPercent] = useState(20)
  const [adminFee, setAdminFee] = useState(DEFAULT_ADMIN_FEE)
  const [additionalDownPercents, setAdditionalDownPercents] = useState<[number, number, number]>([0, 0, 0])
  const [golf, setGolf] = useState<GolfOption>("none")
  const [payments, setPayments] = useState(DEFAULT_PAYMENTS)
  const [exchangeRate, setExchangeRate] = useState(DEFAULT_EXCHANGE_RATE)
  const [collectionFee, setCollectionFee] = useState(DEFAULT_COLLECTION_FEE)
  const [showMxn, setShowMxn] = useState(true)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [downPaymentTodayTouched, setDownPaymentTodayTouched] = useState(false)

  const selectedMembership = findMembership(membershipName)
  const availableYears = useMemo(
    () => getYearsForMembership(membershipName),
    [membershipName]
  )

  const quote = useMemo(
    () =>
      calculateQuote({
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
        exchangeRate,
        collectionFee,
      }),
    [
      adminFee,
      additionalDownPercents,
      collectionFee,
      downPaymentAmount,
      downPaymentPercent,
      downPaymentTodayPercent,
      exchangeRate,
      golf,
      grossPrice,
      payments,
      taxRatePercent,
      termYears,
      tradeInValue,
    ]
  )

  function applyPlanPricing(plan: MembershipPlan, membership: string) {
    setMembershipName(membership)
    setTermYears(plan.years)
    setSelectedPlan(plan)
    setGrossPrice(plan.salePrice)
    setDownPaymentAmount((current) => Math.min(current, plan.salePrice))
  }

  function selectMembership(name: string) {
    const years = getYearsForMembership(name).includes(termYears)
      ? termYears
      : resolvePlan(name, DEFAULT_TERM_YEARS).years

    applyPlanPricing(resolvePlan(name, years), name)
  }

  function updateTermYears(years: number) {
    applyPlanPricing(resolvePlan(membershipName, years), membershipName)
  }

  function updateGrossPrice(value: number) {
    const next = Math.max(value, 0)
    setGrossPrice(next)
    setDownPaymentAmount((current) => Math.min(current, next))
  }

  function updateDownPaymentAmount(amount: number) {
    const safe = Math.max(amount, 0)
    setDownPaymentAmount(safe)

    const membershipWithTax = membershipWithTaxFrom(grossPrice, taxRatePercent)
    if (membershipWithTax > 0) {
      setDownPaymentPercent(downPercentFromAmount(safe, membershipWithTax))
    }
  }

  function updateDownPaymentPercent(percent: number) {
    const safe = Math.min(Math.max(percent, 0), 100)
    setDownPaymentPercent(safe)
    setDownPaymentAmount(0)

    if (!downPaymentTodayTouched) {
      setDownPaymentTodayPercent(safe)
    }
  }

  function updateDownPaymentTodayPercent(percent: number) {
    setDownPaymentTodayTouched(true)
    setDownPaymentTodayPercent(Math.min(Math.max(percent, 0), 100))
  }

  function syncDownPaymentTodayWithDown() {
    setDownPaymentTodayTouched(false)
    setDownPaymentTodayPercent(downPaymentPercent)
  }

  function updateAdditionalDownPercent(index: 0 | 1 | 2, percent: number) {
    setAdditionalDownPercents((current) => {
      const next: [number, number, number] = [...current]
      next[index] = Math.min(Math.max(percent, 0), 100)
      return next
    })
  }

  return {
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
    exchangeRate,
    collectionFee,
    showMxn,
    showAdvanced,
    downPaymentTodayTouched,
    quote,
    selectMembership,
    setGrossPrice: updateGrossPrice,
    setTradeInValue,
    setTaxRatePercent,
    setDownPaymentPercent: updateDownPaymentPercent,
    setDownPaymentAmount: updateDownPaymentAmount,
    setDownPaymentTodayPercent: updateDownPaymentTodayPercent,
    syncDownPaymentTodayWithDown,
    setAdminFee,
    updateAdditionalDownPercent,
    setGolf,
    setTermYears: updateTermYears,
    setPayments: (value: number) => setPayments(Math.max(Math.round(value), 1)),
    setExchangeRate,
    setCollectionFee,
    setShowMxn,
    setShowAdvanced,
  }
}
