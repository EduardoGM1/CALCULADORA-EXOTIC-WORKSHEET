export {
  DEFAULT_MEMBERSHIP_NAME,
  DEFAULT_TERM_YEARS,
  MEMBERSHIP_CATALOG,
  findMembership,
  findPlan,
  getYearsForMembership,
  getDefaultPlan,
  resolvePlan,
} from "./pricing"

export const DEFAULT_EXCHANGE_RATE = 17.69
export const DEFAULT_ADMIN_FEE = 1050
export const DEFAULT_COLLECTION_FEE = 6.75

export const GOLF_FEES_USD: Record<"5" | "10", number> = {
  "5": 530,
  "10": 950,
}
