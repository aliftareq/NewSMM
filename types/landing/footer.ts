export type FooterNavLink = {
  label: string
  href: string
}

export type FooterSocialLink = {
  id: string
  href: string
  iconSrc: string
  iconSize: number
  buttonSize: number
}

export type FooterContactItem = {
  id: string
  iconSrc: string
  text: string
  multiline?: boolean
}

export type FooterTrustBadge =
  | {
      id: string
      type: "google" | "clutch"
      logo: { src: string; width: number; height: number; className?: string }
      reviewsLabel: string
      rating: string
      ratingStarSrc: string
    }
  | {
      id: string
      type: "trustpilot"
      logo: { src: string; width: number; height: number }
      title: string
      reviewsLabel: string
      rating: string
      ratingStarSrc: string
    }

export type LandingFooterContent = {
  cta: {
    headingLines: [string, string]
    description: string
    button: { label: string; href: string }
  }
  brand: {
    logomarkSrc: string
    name: string
    nameGradient: string
    description: string
    socialLinks: FooterSocialLink[]
  }
  quickLinks: {
    title: string
    links: FooterNavLink[]
  }
  services: {
    title: string
    links: FooterNavLink[]
  }
  contact: {
    title: string
    items: FooterContactItem[]
  }
  trustBadges: FooterTrustBadge[]
  legal: {
    copyrightPrefix: string
    copyrightBrand: string
    copyrightSuffix: string
    links: FooterNavLink[]
  }
  assets: {
    glowEllipse: string
    decorativeDots: string
    glareStarLeft: string
    glareStarRight: string
  }
}
