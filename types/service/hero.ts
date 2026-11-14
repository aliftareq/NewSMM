import type { ServicesModalPlatformIcon } from "@/types/landing/services-modal"

export type ServiceQualityOption = {
  id: string
  label: string
  recommendedBadge?: string
}

export type ServiceOrderPlatform = {
  id: string
  label: string
  icon: ServicesModalPlatformIcon
  usernamePlaceholder: string
}

export type ServiceOrderProductOption = {
  id: string
  label: string
}

export type ServicePackageBadge = "popular" | "max-value"

export type ServicePackageOption = {
  id: string
  quantity: number
  /** Shown on package cards when set (e.g. `1k`, `2.5k`). */
  quantityLabel?: string
  unitLabel: string
  saveLabel?: string
  badge?: ServicePackageBadge
  price: string
  compareAtPrice: string
}

export type ServicePaymentLogo =
  | { type: "brand"; src: string; className: string }
  | { type: "wallet"; iconSrc: string; label: string; iconClassName?: string }

export type ServiceHeroContent = {
  assets: {
    backgroundHero: string
    orderDividerLine: string
    secureLockIcon: string
    socialIconsSprite: string
  }
  intro: {
    title: string
    description: string
    /** Solid headline color (Figma). Omit when `titleGradient` is set. */
    titleColor?: string
    /** Figma gradient headline (e.g. TikTok 25845:28963). */
    titleGradient?: string
    trustCard: {
      paymentTitle: string
      paymentLogos: ServicePaymentLogo[]
      backupTitle: string
      backupDescription: string
      backupIconSrc: string
      dividerSrc: string
    }
  }
  orderWidget: {
    defaultQualityId: string
    qualityOptions: ServiceQualityOption[]
    defaultPlatformId: string
    platforms: ServiceOrderPlatform[]
    defaultPackageId: string
    packages: ServicePackageOption[]
    secureCheckoutLabel: string
    serviceSelectLabel: string
    serviceSelectChevronSrc: string
    defaultServiceProductId: string
    serviceProductsByPlatform: Record<string, ServiceOrderProductOption[]>
  }
}
