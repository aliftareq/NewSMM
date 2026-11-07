import type { CartLineItem, CartState } from "@/types/cart/cart"

const CART_STORAGE_KEY = "smm-cart-v1"

export function readCart(): CartState {
  if (typeof window === "undefined") {
    return { items: [] }
  }
  try {
    const raw = window.sessionStorage.getItem(CART_STORAGE_KEY)
    if (!raw) {
      return { items: [] }
    }
    const parsed = JSON.parse(raw) as CartState
    if (!Array.isArray(parsed.items)) {
      return { items: [] }
    }
    return parsed
  } catch {
    return { items: [] }
  }
}

export function writeCart(items: CartLineItem[]) {
  if (typeof window === "undefined") {
    return
  }
  window.sessionStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify({ items } satisfies CartState),
  )
  window.dispatchEvent(new CustomEvent("smm-cart-updated"))
}

function groupIdFromFollowersLineId(lineId: string): string | null {
  if (lineId === "followers") {
    return "legacy"
  }
  if (lineId.endsWith("-followers")) {
    return lineId.slice(0, -"-followers".length)
  }
  return null
}

export function removeCartItem(itemId: string) {
  const groupId = groupIdFromFollowersLineId(itemId)
  const next = readCart().items.filter((item) => {
    if (item.id === itemId || item.parentId === itemId) {
      return false
    }
    if (groupId && cartLineBelongsToGroup(item, groupId)) {
      return false
    }
    return true
  })
  writeCart(next)
  return next
}

export function isPrimaryServiceLine(item: CartLineItem): boolean {
  if (item.parentId) {
    return false
  }
  if (item.id === "followers" || item.id.endsWith("-followers")) {
    return true
  }
  return false
}

export function addCartItem(item: CartLineItem) {
  const current = readCart().items
  if (current.some((line) => line.id === item.id)) {
    return current
  }
  const next = [...current, item]
  writeCart(next)
  return next
}

export function getUpsellId(parentLineId: string, suffix = "followers-200") {
  return `upsell-${suffix}-${parentLineId}`
}

function cartLineBelongsToGroup(item: CartLineItem, groupId: string): boolean {
  if (groupId === "legacy") {
    return (
      item.id === "followers" ||
      item.id === "story-views" ||
      item.parentId === "followers"
    )
  }
  if (item.id.startsWith(`${groupId}-`)) {
    return true
  }
  if (item.parentId?.startsWith(`${groupId}-`)) {
    return true
  }
  return false
}

/** Replace only lines for this draft group; keep other services in the cart. */
export function mergeCartGroupItems(
  groupId: string,
  groupItems: CartLineItem[],
) {
  const current = readCart().items
  const kept = current.filter((item) => !cartLineBelongsToGroup(item, groupId))
  writeCart([...kept, ...groupItems])
}

export function cartItemCount(items: CartLineItem[]): number {
  return items.length
}

export function cartSubtotal(items: CartLineItem[]): number {
  return items.reduce((sum, item) => {
    const value = Number.parseFloat(item.price.replace(/[^0-9.]/g, ""))
    return sum + (Number.isFinite(value) ? value : 0)
  }, 0)
}
