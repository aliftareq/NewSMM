export type AddFundsPresetOption = {
  id: string
  amount: number
  label: string
  bonusLabel?: string
}

export type AddFundsModalContent = {
  assets: {
    divider: string
    closeIcon: string
  }
  title: string
  promoHighlight: string
  promoBody: string
  customAmountTitle: string
  customAmountHint: string
  customAmountMinLabel: string
  continueLabel: string
  presets: AddFundsPresetOption[]
  minAmount: number
  maxAmount: number
  defaultAmount: number
  checkoutHref: string
}
