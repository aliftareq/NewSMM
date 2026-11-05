export type FollowerComparisonTierId = "high-quality" | "real-followers"

export type FollowerComparisonTierCard = {
  id: FollowerComparisonTierId
  title: string
  description: string
  features: string[]
  ctaLabel: string
  ctaVariant: "outline" | "gradient"
  recommendedBadge?: boolean
  href: string
}

export type FollowerComparisonGlanceCell =
  | { kind: "check" }
  | { kind: "cross" }
  | { kind: "text"; value: string; emphasis?: "default" | "brand" }

export type FollowerComparisonGlanceRow = {
  id: string
  label: string
  highQuality: FollowerComparisonGlanceCell
  realFollowers: FollowerComparisonGlanceCell
}

export type FollowerComparisonData = {
  intro: {
    badgeLabel: string
    headingPrefix: string
    headingHighlight: string
    headingSuffix: string
    description: string
  }
  tierCards: FollowerComparisonTierCard[]
  glance: {
    title: string
    highQualityColumn: string
    realFollowersColumn: string
    rows: FollowerComparisonGlanceRow[]
  }
  assets: {
    instagramIconSprite: string
    instagramIconCropClassName: string
    checkBlueIcon: string
    checkGreenIcon: string
    crossRedIcon: string
  }
}
