import { formatUsd } from "@/lib/build-order-href"

const MIN_ORDER_QUANTITY = 50
const ORDER_QUANTITY_STEP = 50

function parseUsdAmount(value: string): number {
  return Number.parseFloat(String(value).replace(/[^0-9.]/g, "")) || 0
}

export function getOrderQuantityStep() {
  return ORDER_QUANTITY_STEP
}

export function getMinOrderQuantity() {
  return MIN_ORDER_QUANTITY
}

export function clampOrderQuantity(quantity: number): number {
  return Math.max(MIN_ORDER_QUANTITY, quantity)
}

export function stepOrderQuantity(
  quantity: number,
  direction: "up" | "down",
): number {
  const current = clampOrderQuantity(quantity)
  if (direction === "down") {
    return Math.max(MIN_ORDER_QUANTITY, current - ORDER_QUANTITY_STEP)
  }
  return current + ORDER_QUANTITY_STEP
}

export function computeScaledOrderPricing(
  unitQuantity: number,
  unitPrice: string,
  unitCompareAtPrice: string,
  quantity: number,
): { price: string; compareAtPrice: string } {
  const safeUnitQty = unitQuantity > 0 ? unitQuantity : 1
  const priceEach = parseUsdAmount(unitPrice) / safeUnitQty
  const compareEach = parseUsdAmount(unitCompareAtPrice) / safeUnitQty
  const safeQty = clampOrderQuantity(quantity)

  return {
    price: formatUsd(priceEach * safeQty),
    compareAtPrice: formatUsd(compareEach * safeQty),
  }
}
