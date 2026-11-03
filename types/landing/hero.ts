export type HeroReviewRating = {
  value: string
  valueClassName: string
  suffix: string
}

export type HeroReviewSource = {
  id: "google" | "trustpilot"
  iconSrc: string
  starIcons: string[]
  rating: HeroReviewRating
}

export type HeroHeadlineLine = {
  segments: HeroHeadlineSegment[]
}

export type HeroHeadlineSegment =
  | {
      type: "text"
      content: string
    }
  | {
      type: "image"
      src: string
      alt: string
      width: number
      height: number
      imageClassName: string
    }
  | {
      type: "gradient-text"
      content: string
      gradient: string
    }

export type HeroSpriteCrop = {
  left: string
  top: string
  width: string
  height: string
}

export type HeroSelectField = {
  id: string
  label: string
  value: string
  icon?: {
    src: string
    width: number
    height: number
    className?: string
  }
  spriteIcon?: HeroSpriteCrop
}

export type HeroSocialBarIcon = {
  id: string
  sprite: HeroSpriteCrop
}

export type LandingHeroContent = {
  reviews: HeroReviewSource[]
  headline: {
    lineOne: HeroHeadlineLine
    lineTwo: HeroHeadlineLine
  }
  description: string
  orderCard: {
    platformField: HeroSelectField
    serviceField: HeroSelectField
    submitLabel: string
  }
  visual: {
    professionalImage: {
      src: string
      alt: string
      className: string
    }
    verticalTitle: {
      social: string
      growth: string
    }
    socialBarIcons: HeroSocialBarIcon[]
  }
  assets: {
    /** Figma 27512:5881 — grid, highlight squares, bottom arc glow */
    backgroundHero: string
    socialIconsSprite: string
    chevronDown: string
  }
}
