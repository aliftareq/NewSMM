import type { PaymentMethodsSectionContent } from "@/types/landing/payment-methods"

const IMG = "/images/landing/payment-methods"

export const paymentMethodsSectionAssets = {
  mapVisual: `${IMG}/payment-method-map.png`,
  arcRings: `${IMG}/payment-method-arc-rings.svg`,
} as const

export const landingPaymentMethodsData: PaymentMethodsSectionContent = {
  badgeLabel: "Payment Methods",
  headlineBefore: "Multiple Payment ",
  headlineHighlight: "Methods",
  description:
    "Choose from our available payment options to complete your order quickly and conveniently with a smooth checkout experience.",
}

export const paymentMethodsImageAlts = {
  mapVisual:
    "Multiple Payment Methods — world map with supported payment coverage",
} as const
