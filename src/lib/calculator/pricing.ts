import type { MembershipCatalogItem, MembershipPlan } from "./types"

/**
 * Lista de Precios Regular (sección 3.1).
 * Precios en USD e incluyen impuestos.
 */
export const MEMBERSHIP_CATALOG: MembershipCatalogItem[] = [
  {
    name: "Diamond Elite",
    badgeClass: "bg-cyan-50 text-cyan-700 ring-cyan-200",
    plans: [
      { years: 25, basePrice: 69995, packAmount: 20998.5, packPercent: 30, salePrice: 90993.5 },
      { years: 20, basePrice: 64995, packAmount: 19498.5, packPercent: 30, salePrice: 84493.5 },
      { years: 15, basePrice: 59995, packAmount: 17998.5, packPercent: 30, salePrice: 77993.5 },
      { years: 10, basePrice: 54995, packAmount: 16498.5, packPercent: 30, salePrice: 71493.5 },
      { years: 5, basePrice: 49995, packAmount: 14998.5, packPercent: 30, salePrice: 64993.5 },
    ],
  },
  {
    name: "Diamond",
    badgeClass: "bg-blue-50 text-blue-700 ring-blue-200",
    plans: [
      { years: 25, basePrice: 58995, packAmount: 17698.5, packPercent: 30, salePrice: 76693.5 },
      { years: 20, basePrice: 53995, packAmount: 16198.5, packPercent: 30, salePrice: 70193.5 },
      { years: 15, basePrice: 48995, packAmount: 14698.5, packPercent: 30, salePrice: 63693.5 },
      { years: 10, basePrice: 43995, packAmount: 13198.5, packPercent: 30, salePrice: 57193.5 },
      { years: 5, basePrice: 38995, packAmount: 11698.5, packPercent: 30, salePrice: 50693.5 },
    ],
  },
  {
    name: "Emerald",
    badgeClass: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    plans: [
      { years: 25, basePrice: 45995, packAmount: 13798.5, packPercent: 30, salePrice: 59793.5 },
      { years: 20, basePrice: 40995, packAmount: 12298.5, packPercent: 30, salePrice: 53293.5 },
      { years: 15, basePrice: 35995, packAmount: 10798.5, packPercent: 30, salePrice: 46793.5 },
      { years: 10, basePrice: 31995, packAmount: 9598.5, packPercent: 30, salePrice: 41593.5 },
      { years: 5, basePrice: 26995, packAmount: 8098.5, packPercent: 30, salePrice: 35093.5 },
    ],
  },
  {
    name: "Ruby",
    badgeClass: "bg-rose-50 text-rose-700 ring-rose-200",
    plans: [
      { years: 25, basePrice: 28995, packAmount: 8698.5, packPercent: 30, salePrice: 37693.5 },
      { years: 20, basePrice: 24995, packAmount: 7498.5, packPercent: 30, salePrice: 32493.5 },
      { years: 15, basePrice: 21995, packAmount: 6598.5, packPercent: 30, salePrice: 28593.5 },
      { years: 10, basePrice: 19995, packAmount: 5998.5, packPercent: 30, salePrice: 25993.5 },
      { years: 5, basePrice: 15995, packAmount: 4798.5, packPercent: 30, salePrice: 20793.5 },
    ],
  },
  {
    name: "Sapphire Elite",
    badgeClass: "bg-indigo-50 text-indigo-700 ring-indigo-200",
    plans: [
      { years: 25, basePrice: 23495, packAmount: 7048.5, packPercent: 30, salePrice: 30543.5 },
      { years: 20, basePrice: 21495, packAmount: 6448.5, packPercent: 30, salePrice: 27943.5 },
      { years: 15, basePrice: 17495, packAmount: 5248.5, packPercent: 30, salePrice: 22743.5 },
      { years: 10, basePrice: 15495, packAmount: 4648.5, packPercent: 30, salePrice: 20143.5 },
      { years: 5, basePrice: 12495, packAmount: 3748.5, packPercent: 30, salePrice: 16243.5 },
    ],
  },
  {
    name: "Sapphire",
    badgeClass: "bg-sky-50 text-sky-700 ring-sky-200",
    plans: [
      { years: 25, basePrice: 20995, packAmount: 6298.5, packPercent: 30, salePrice: 27293.5 },
      { years: 20, basePrice: 18995, packAmount: 5698.5, packPercent: 30, salePrice: 24693.5 },
      { years: 15, basePrice: 14995, packAmount: 4498.5, packPercent: 30, salePrice: 19493.5 },
    ],
  },
]

export const DEFAULT_MEMBERSHIP_NAME = "Diamond Elite"
export const DEFAULT_TERM_YEARS = 5

export function findMembership(name: string): MembershipCatalogItem {
  return (
    MEMBERSHIP_CATALOG.find((item) => item.name === name) ?? MEMBERSHIP_CATALOG[0]
  )
}

export function findPlan(membershipName: string, years: number): MembershipPlan | undefined {
  return findMembership(membershipName).plans.find((plan) => plan.years === years)
}

export function getYearsForMembership(membershipName: string): number[] {
  return findMembership(membershipName).plans.map((plan) => plan.years)
}

export function getDefaultPlan(membershipName: string): MembershipPlan {
  const membership = findMembership(membershipName)
  return (
    membership.plans.find((plan) => plan.years === DEFAULT_TERM_YEARS) ?? membership.plans.at(-1)!
  )
}

export function resolvePlan(membershipName: string, years: number): MembershipPlan {
  return findPlan(membershipName, years) ?? getDefaultPlan(membershipName)
}
