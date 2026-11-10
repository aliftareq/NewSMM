import { cartPageContent } from "@/data/cart/cart"
import { newOrderContent } from "@/data/service/new-order"
import type { CheckoutPageContent } from "@/types/checkout/checkout"

const IMG = "/images/checkout"
const SERVICE_INTRO = "/images/service/intro"

export const checkoutPageContent: CheckoutPageContent = {
  assets: {
    backArrow: `${IMG}/back-arrow.svg`,
    applePayMark: `${IMG}/apple-pay-mark.svg`,
    googlePayMark: `${SERVICE_INTRO}/pay-google.png`,
    googlePayMarkCropClassName:
      "absolute h-[178.29%] left-[-69.82%] max-w-none top-[-39.02%] w-[241.47%]",
    cardBrandVisa: `${IMG}/card-brand-visa.png`,
    cardBrandMastercard: `${IMG}/card-brand-mc.png`,
    cardBrandAmex: `${IMG}/card-brand-amex.png`,
    cardBrandMaestro: `${SERVICE_INTRO}/pay-maestro.png`,
    cardInputIcon: `${IMG}/card-input-icon.svg`,
    cvvLockIcon: `${IMG}/cvv-lock.svg`,
    saveCardIcon: `${IMG}/save-card-icon.svg`,
    orderSummaryIcon: newOrderContent.assets.orderSummaryIcon,
    secureCheckoutIcon: newOrderContent.assets.secureCheckoutGreenIcon,
  },
  title: "Checkout",
  backLabel: "Back to cart",
  backHref: "/cart",
  contactTitle: "Contact e-mail",
  contactSubtitle:
    "We'll send your order confirmation and updates here.",
  emailLabel: "Your email address",
  emailPlaceholder: "Enter your email address",
  loginPromptPrefix: "Already have an account?",
  loginLabel: "Login",
  loginHref: "/login",
  paymentMethodLabel: "Select payment method",
  walletPayLabel: "Pay",
  orPayAnotherWayLabel: "Or pay another way",
  payWithCardTemplate: "Pay {amount} with card",
  paymentDetailsHeading: "Payment details",
  cardNameLabel: "Name of the card*",
  cardNamePlaceholder: "Enter name",
  cardNumberLabel: "Card number*",
  cardNumberPlaceholder: "Enter card number",
  expirationLabel: "Expiration date*",
  expirationPlaceholder: "MM/YY",
  cvvLabel: "CVV*",
  saveCardLabel: "Save this card",
  confirmPayTemplate: "Confirm & Pay {amount}",
  couponPlaceholder: cartPageContent.couponPlaceholder,
  couponApplyLabel: cartPageContent.couponApplyLabel,
  summaryHeading: cartPageContent.summaryHeading,
  subtotalLabel: cartPageContent.subtotalLabel,
  bundleSavingLabel: "Bundle saving",
  totalLabel: cartPageContent.totalLabel,
  checkoutCtaLabel: cartPageContent.checkoutCtaLabel,
  sslLabel: cartPageContent.sslLabel,
  bundleSavingFallback: 0.99,
}
