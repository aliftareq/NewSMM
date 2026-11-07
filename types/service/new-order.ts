import type { ServicePaymentLogo } from "@/types/service/hero"
import type { ServicesModalPlatformIcon } from "@/types/landing/services-modal"

export type NewOrderAssets = {
  backArrow: string
  minusIcon: string
  plusVerticalIcon: string
  plusHorizontalIcon: string
  trendingIcon: string
  profileAvatar: string
  orderSummaryIcon: string
  secureCheckoutGreenIcon: string
  starIcon: string
  secureBlueIcon: string
  refundIcon: string
  supportIcon: string
  socialIconsSprite: string
  orderDividerLine: string
}

export type NewOrderPlatformIcon = ServicesModalPlatformIcon

export type NewOrderProfilePreview = {
  displayName: string
  followersCount: number
  followingCount: number
  avatarSrc: string
}

export type NewOrderExtraOffer = {
  title: string
  subtitle: string
  priceDelta: string
  progressFilled: number
  progressTotal: number
}

export type NewOrderTrustBadge = {
  id: string
  label: string
  iconSrc: string
}

export type NewOrderContent = {
  assets: NewOrderAssets
  backLabel: string
  backHref: string
  service: {
    title: string
    platformLabel: string
    platformIcon: NewOrderPlatformIcon
    defaultQuantity: number
    defaultPrice: string
    defaultCompareAtPrice: string
    discountLabel: string
    customersNoteRed: string
    customersNoteRest: string
  }
  extraOffer: NewOrderExtraOffer
  profile: {
    sectionTitle: string
    sectionSubtitle: string
    changeAccountLabel: string
    cancelLabel: string
    saveLabel: string
    usernamePlaceholder: string
    defaultPreview: NewOrderProfilePreview
  }
  summary: {
    heading: string
    unitLabel: string
    platformLabel: string
    totalLabel: string
    ctaLabel: string
    profileRequiredMessage: string
    secureCheckoutLabel: string
    clientsCount: string
    clientsLabel: string
    ratingValue: string
    reviewsLabel: string
    starCount: number
    paymentLogos: ServicePaymentLogo[]
    trustBadges: NewOrderTrustBadge[]
  }
}

export type NewOrderInitialSelection = {
  quantity: number
  price: string
  compareAtPrice: string
  platformId: string
  qualityId: string
  unitLabel: string
  username?: string
}
