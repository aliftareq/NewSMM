export type PayNowModalContent = {
  assets: {
    divider: string
    closeIcon: string
    receiveIcon: string
    applePayMark: string
    googlePayMark: string
    cardBrandVisa: string
    cardBrandMastercard: string
    cardBrandMaestro: string
    cardBrandsComposite: string
    cardNumberIcon: string
    cvvLockIcon: string
    saveCardIcon: string
  }
  title: string
  topUpSummaryPrefix: string
  youWillReceiveLabel: string
  selectPaymentMethodLabel: string
  applePayLabel: string
  googlePayLabel: string
  orPayAnotherWayLabel: string
  payWithCardTemplate: string
  paymentDetailsLabel: string
  nameOnCardLabel: string
  nameOnCardPlaceholder: string
  cardNumberLabel: string
  cardNumberPlaceholder: string
  expirationLabel: string
  expirationPlaceholder: string
  cvvLabel: string
  saveCardLabel: string
  confirmPayTemplate: string
}
