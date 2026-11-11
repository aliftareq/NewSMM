/** Matches preset bonus copy in add-funds (5% from $100 up). */
export function getTopUpBonus(amount: number): number {
  if (amount < 100) return 0
  return Math.round(amount * 0.05 * 100) / 100
}

export function getTopUpReceiveTotal(amount: number): number {
  return Math.round((amount + getTopUpBonus(amount)) * 100) / 100
}
