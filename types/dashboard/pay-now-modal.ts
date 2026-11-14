export type DashboardPayNowModalContent = {
  assets: {
    divider: string
    closeIcon: string
    applePayMark: string
    googlePayMark: string
    cardBrandVisa: string
    cardBrandMastercard: string
    cardBrandMaestro: string
    cardBrandVisaElectron: string
    cardNumberIcon: string
    cvvLockIcon: string
    saveCardIcon: string
    countryChevronIcon: string
  }
  title: string
  topUpSummaryPrefix: string
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
  monthPlaceholder: string
  yearPlaceholder: string
  cvvLabel: string
  countryLabel: string
  defaultCountry: string
  countries: string[]
  cvvHelpText: string
  saveCardLabel: string
  confirmPayLabel: string
}