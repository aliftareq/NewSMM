import type { PayNowModalContent } from "@/app/(auth)/_types/pay-now-modal"

const IMG = "/images/auth/pay-now-modal"
const LOGIN_CLOSE = "/images/auth/login-modal/close.svg"

export const payNowModalContent: PayNowModalContent = {
  assets: {
    divider: `${IMG}/divider.svg`,
    closeIcon: LOGIN_CLOSE,
    receiveIcon: `${IMG}/receive-icon.svg`,
    applePayMark: `${IMG}/apple-pay-mark.svg`,
    googlePayMark: `${IMG}/google-pay.png`,
    cardBrandVisa: `${IMG}/brand-visa.png`,
    cardBrandMastercard: `${IMG}/brand-mastercard.png`,
    cardBrandMaestro: `${IMG}/brand-maestro.png`,
    cardBrandsComposite: `${IMG}/card-brands-row.png`,
    cardNumberIcon: `${IMG}/card-number-icon.svg`,
    cvvLockIcon: `${IMG}/cvv-lock-icon.svg`,
    saveCardIcon: `${IMG}/save-card-icon.svg`,
  },
  title: "Pay now",
  topUpSummaryPrefix: "Funds top up ",
  youWillReceiveLabel: "You will receive",
  selectPaymentMethodLabel: "Select payment method",
  applePayLabel: "Pay",
  googlePayLabel: "Pay",
  orPayAnotherWayLabel: "Or pay another way",
  payWithCardTemplate: "Pay {amount} with card",
  paymentDetailsLabel: "Payment details",
  nameOnCardLabel: "Name of the card*",
  nameOnCardPlaceholder: "Enter name",
  cardNumberLabel: "Card number*",
  cardNumberPlaceholder: "Enter card number",
  expirationLabel: "Expiration date*",
  expirationPlaceholder: "MM/YY",
  cvvLabel: "CVV*",
  saveCardLabel: "Save this card",
  confirmPayTemplate: "Confirm & Pay {amount}",
}
