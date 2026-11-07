import type { NewOrderAssets, NewOrderContent } from "@/types/service/new-order"

export type OrderExtrasAssets = {
  profileThumb: string
  growthRunner: string
  sliderHintArrow: string
}

export type OrderExtrasGrowthLevel = {
  level: number
  shortLabel: string
  title: string
  extraPrice: number
  storyViewsLabel: string
}

export type OrderExtrasContent = {
  assets: OrderExtrasAssets
  profile: {
    sectionTitle: string
    profileTypeLabel: string
    packageLabelTemplate: string
  }
  growth: {
    sectionTitle: string
    sectionSubtitle: string
    growthLevelLabel: string
    totalExtrasLabel: string
    sliderHint: string
    storyViewsLabel: string
    levels: OrderExtrasGrowthLevel[]
    defaultLevel: number
  }
  summary: Pick<
    NewOrderContent["summary"],
    | "heading"
    | "totalLabel"
    | "secureCheckoutLabel"
    | "clientsCount"
    | "clientsLabel"
    | "ratingValue"
    | "reviewsLabel"
    | "starCount"
    | "paymentLogos"
    | "trustBadges"
  > & {
    ctaLabel: string
    unitLabel: string
    platformLabel: string
  }
}

export type OrderExtrasSelection = {
  handle: string
  quantity: number
  basePrice: string
  compareAtPrice: string
  platformId: string
  qualityId: string
  unitLabel: string
}

export type OrderExtrasSectionProps = {
  content: OrderExtrasContent
  newOrderAssets: NewOrderAssets
}
