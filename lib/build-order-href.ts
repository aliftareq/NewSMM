export type OrderLinkParams = {
  quantity: number
  price: string
  compareAtPrice: string
  platformId: string
  qualityId: string
  unitLabel: string
  username?: string
}

export function buildOrderHref({
  quantity,
  price,
  compareAtPrice,
  platformId,
  qualityId,
  unitLabel,
  username,
}: OrderLinkParams): string {
  const params = new URLSearchParams({
    quantity: String(quantity),
    price: price.replace(/^\$/, ""),
    compareAt: compareAtPrice.replace(/^\$/, ""),
    platform: platformId,
    quality: qualityId,
    unit: unitLabel,
  })
  const trimmedUsername = username?.trim()
  if (trimmedUsername) {
    params.set("username", trimmedUsername)
  }
  return `/order?${params.toString()}`
}

export type OrderExtrasLinkParams = OrderLinkParams & {
  handle: string
}

export function buildOrderExtrasHref({
  handle,
  quantity,
  price,
  compareAtPrice,
  platformId,
  qualityId,
  unitLabel,
}: OrderExtrasLinkParams): string {
  const params = new URLSearchParams({
    quantity: String(quantity),
    price: price.replace(/^\$/, ""),
    compareAt: compareAtPrice.replace(/^\$/, ""),
    platform: platformId,
    quality: qualityId,
    unit: unitLabel,
    handle,
  })
  return `/order/extras?${params.toString()}`
}

export function formatUsd(amount: string | number): string {
  const numeric =
    typeof amount === "number"
      ? amount
      : Number.parseFloat(String(amount).replace(/[^0-9.]/g, ""))
  if (!Number.isFinite(numeric)) {
    return "$0.00"
  }
  return `$${numeric.toFixed(2)}`
}
