export type GrowthPackageQualityId = "high-quality" | "real-followers"

export type GrowthPackageRowVariant = "bordered" | "muted" | "featured"

export type GrowthPackageSelectVariant = "primary" | "instagram-gradient"

export type GrowthPackageRow = {
  id: string
  quantity: string
  quantityGradient?: boolean
  tierLabel: string
  unitValue: string
  price: string
  rowVariant: GrowthPackageRowVariant
  popularBadge?: boolean
  selectVariant?: GrowthPackageSelectVariant
}

export type GrowthPackageTrustItem = {
  id: string
  label: string
}

export type GrowthPackageIntro = {
  badgeLabel: string
  headingPrefix: string
  headingHighlight: string
  description: string
}

export type GrowthPackageQualityTab = {
  id: GrowthPackageQualityId
  label: string
  recommendedBadge?: boolean
}

export type GrowthPackageData = {
  intro: GrowthPackageIntro
  qualityTabs: GrowthPackageQualityTab[]
  tableHeaders: {
    package: string
    value: string
    price: string
  }
  selectButtonLabel: string
  rows: GrowthPackageRow[]
  trustItems: GrowthPackageTrustItem[]
  assets: {
    instagramIconSprite: string
    instagramIconCropClassName: string
    trustCheckIcon: string
  }
}
