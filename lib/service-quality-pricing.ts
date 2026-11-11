import type { GrowthPackageQualityId, GrowthPackageRow } from "@/types/service/growth-package"
import type { ServicePackageOption } from "@/types/service/hero"

export const SERVICE_QUALITY_TIER_LABEL: Record<GrowthPackageQualityId, string> = {
  "high-quality": "High quality",
  "real-followers": "Real followers",
}

/** Real tier is priced higher than high-quality (marketing demo). */
export const REAL_FOLLOWERS_PRICE_MULTIPLIER = 1.35

function parseUsdAmount(value: string): number {
  const match = value.match(/\$([\d,.]+)/)
  if (!match) return 0
  const n = parseFloat(match[1].replace(/,/g, ""))
  return Number.isFinite(n) ? n : 0
}

function formatUsd(amount: number): string {
  const useCents = amount < 1000
  if (useCents) {
    return `$${amount.toFixed(2)}`
  }
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function scaleUsdInString(value: string, multiplier: number): string {
  return value.replace(/\$[\d,.]+/g, (segment) => {
    const amount = parseUsdAmount(segment)
    if (amount === 0) return segment
    return formatUsd(amount * multiplier)
  })
}

const PLATFORM_UNIT_LABEL: Record<string, string> = {
  instagram: "Followers",
  tiktok: "Followers",
  youtube: "Subscribers",
  facebook: "Followers",
  twitter: "Followers",
  threads: "Followers",
  spotify: "Plays",
  soundcloud: "Plays",
}

const SERVICE_PRODUCT_SUFFIX_UNIT: Record<string, string> = {
  followers: "Followers",
  likes: "Likes",
  views: "Views",
  comments: "Comments",
  subscribers: "Subscribers",
  plays: "Plays",
}

export function resolveUnitLabelForServiceProduct(
  platformId: string,
  serviceProductId?: string,
): string {
  if (serviceProductId) {
    const prefix = `${platformId}-`
    if (serviceProductId.startsWith(prefix)) {
      const suffix = serviceProductId.slice(prefix.length)
      const fromSuffix = SERVICE_PRODUCT_SUFFIX_UNIT[suffix]
      if (fromSuffix) return fromSuffix
    }
  }
  return PLATFORM_UNIT_LABEL[platformId] ?? "Followers"
}

/** Slight per-platform pricing (demo). */
const PLATFORM_PRICE_FACTOR: Record<string, number> = {
  instagram: 1,
  tiktok: 0.96,
  youtube: 1.14,
  facebook: 1.02,
  twitter: 1.08,
  threads: 0.98,
  spotify: 1.22,
  soundcloud: 1.18,
}

export function mapHeroPackagesForQuality(
  packages: ServicePackageOption[],
  qualityId: string,
): ServicePackageOption[] {
  if (qualityId === "high-quality") return packages
  return packages.map((pkg) => ({
    ...pkg,
    price: scaleUsdInString(pkg.price, REAL_FOLLOWERS_PRICE_MULTIPLIER),
    compareAtPrice: scaleUsdInString(
      pkg.compareAtPrice,
      REAL_FOLLOWERS_PRICE_MULTIPLIER * 1.05,
    ),
  }))
}

export function mapHeroPackagesForOrder(
  packages: ServicePackageOption[],
  qualityId: string,
  platformId: string,
  serviceProductId?: string,
): ServicePackageOption[] {
  const unitLabel = resolveUnitLabelForServiceProduct(platformId, serviceProductId)
  const platformFactor = PLATFORM_PRICE_FACTOR[platformId] ?? 1

  return mapHeroPackagesForQuality(packages, qualityId).map((pkg) => {
    if (platformFactor === 1 && pkg.unitLabel === unitLabel) return pkg
    return {
      ...pkg,
      unitLabel,
      price: scaleUsdInString(pkg.price, platformFactor),
      compareAtPrice: scaleUsdInString(pkg.compareAtPrice, platformFactor),
    }
  })
}

export function getOrderPackageQuantities(
  packages: ServicePackageOption[],
  qualityId: string,
  platformId: string,
): number[] {
  const mapped = mapHeroPackagesForOrder(packages, qualityId, platformId)
  return [...new Set(mapped.map((pkg) => pkg.quantity))].sort(
    (left, right) => left - right,
  )
}

export function stepOrderPackageQuantity(
  quantities: number[],
  current: number,
  direction: "up" | "down",
): number {
  if (quantities.length === 0) {
    return current
  }

  const exactIndex = quantities.indexOf(current)
  const baseIndex =
    exactIndex >= 0
      ? exactIndex
      : quantities.reduce((bestIndex, qty, index) => {
          const bestQty = quantities[bestIndex] ?? quantities[0]
          return Math.abs(qty - current) < Math.abs(bestQty - current)
            ? index
            : bestIndex
        }, 0)

  if (direction === "up") {
    return quantities[Math.min(baseIndex + 1, quantities.length - 1)]
  }
  return quantities[Math.max(baseIndex - 1, 0)]
}

export function resolvePackagePricingForQuantity(
  packages: ServicePackageOption[],
  qualityId: string,
  platformId: string,
  quantity: number,
): ServicePackageOption {
  const mapped = mapHeroPackagesForOrder(packages, qualityId, platformId)
  const exact = mapped.find((pkg) => pkg.quantity === quantity)
  if (exact) {
    return exact
  }
  return mapped.reduce((best, pkg) =>
    Math.abs(pkg.quantity - quantity) < Math.abs(best.quantity - quantity)
      ? pkg
      : best,
  )
}

export function mapGrowthRowsForQuality(
  rows: GrowthPackageRow[],
  quality: GrowthPackageQualityId,
): GrowthPackageRow[] {
  const tierLabel = SERVICE_QUALITY_TIER_LABEL[quality]
  if (quality === "high-quality") {
    return rows.map((row) => ({ ...row, tierLabel }))
  }
  return rows.map((row) => ({
    ...row,
    tierLabel,
    price: scaleUsdInString(row.price, REAL_FOLLOWERS_PRICE_MULTIPLIER),
    unitValue: scaleUsdInString(row.unitValue, REAL_FOLLOWERS_PRICE_MULTIPLIER),
  }))
}
