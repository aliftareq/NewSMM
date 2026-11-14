export type DashboardAddFundsPresetOption = {
  id: string
  amount: number
  label: string
  bonusLabel?: string
}

/** Figma 25704:15896 */
export type DashboardAddFundsModalContent = {
  assets: {
    divider: string
    closeIcon: string
  }
  title: string
  bonusBannerLabel: string
  customAmountTitle: string
  customAmountHint: string
  submitLabel: string
  presets: DashboardAddFundsPresetOption[]
  minAmount: number
  maxAmount: number
  defaultAmount: number
  checkoutHref: string
}