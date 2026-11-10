export type CheckoutPageAssets = {
  backArrow: string
  applePayMark: string
  googlePayMark: string
  googlePayMarkCropClassName: string
  cardBrandVisa: string
  cardBrandMastercard: string
  cardBrandAmex: string
  cardBrandMaestro: string
  cardInputIcon: string
  cvvLockIcon: string
  saveCardIcon: string
  orderSummaryIcon: string
  secureCheckoutIcon: string
}

export type CheckoutPageContent = {
  assets: CheckoutPageAssets
  title: string
  backLabel: string
  backHref: string
  contactTitle: string
  contactSubtitle: string
  emailLabel: string
  emailPlaceholder: string
  loginPromptPrefix: string
  loginLabel: string
  loginHref: string
  paymentMethodLabel: string
  walletPayLabel: string
  orPayAnotherWayLabel: string
  payWithCardTemplate: string
  paymentDetailsHeading: string
  cardNameLabel: string
  cardNamePlaceholder: string
  cardNumberLabel: string
  cardNumberPlaceholder: string
  expirationLabel: string
  expirationPlaceholder: string
  cvvLabel: string
  saveCardLabel: string
  confirmPayTemplate: string
  couponPlaceholder: string
  couponApplyLabel: string
  summaryHeading: string
  subtotalLabel: string
  bundleSavingLabel: string
  totalLabel: string
  checkoutCtaLabel: string
  sslLabel: string
  /** Default bundle saving when not computed from cart. */
  bundleSavingFallback: number
}
