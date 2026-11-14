import type { DashboardPayNowModalContent } from "@/types/dashboard/pay-now-modal"

const AUTH_PAY_NOW = "/images/auth/pay-now-modal"
const DASHBOARD_PAY_NOW = "/images/dashboard/pay-now-modal"
const LOGIN_CLOSE = "/images/auth/login-modal/close.svg"

/** Figma 25704:15744 */
export const dashboardPayNowModalContent: DashboardPayNowModalContent = {
  assets: {
    divider: `${AUTH_PAY_NOW}/divider.svg`,
    closeIcon: LOGIN_CLOSE,
    applePayMark: `${AUTH_PAY_NOW}/apple-pay-mark.svg`,
    googlePayMark: `${AUTH_PAY_NOW}/google-pay.png`,
    cardBrandVisa: `${AUTH_PAY_NOW}/brand-visa.png`,
    cardBrandMastercard: `${AUTH_PAY_NOW}/brand-mastercard.png`,
    cardBrandMaestro: `${AUTH_PAY_NOW}/brand-maestro.png`,
    cardBrandVisaElectron: `${AUTH_PAY_NOW}/brand-maestro.png`,
    cardNumberIcon: `${AUTH_PAY_NOW}/card-number-icon.svg`,
    cvvLockIcon: `${AUTH_PAY_NOW}/cvv-lock-icon.svg`,
    saveCardIcon: `${AUTH_PAY_NOW}/save-card-icon.svg`,
    countryChevronIcon: `${DASHBOARD_PAY_NOW}/country-chevron.svg`,
  },
  title: "Pay now",
  topUpSummaryPrefix: "Funds top up ",
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
  monthPlaceholder: "Month",
  yearPlaceholder: "Year",
  cvvLabel: "CVV*",
  countryLabel: "Country*",
  defaultCountry: "Bangladesh",
  cvvHelpText:
    "* CVV or CVC is the card security code, unique three digits number on the back of your card separate from its number.",
  saveCardLabel: "Save this card",
  confirmPayLabel: "Confirm & Pay",
}