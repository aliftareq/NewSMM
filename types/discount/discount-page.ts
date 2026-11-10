export type DiscountCouponItem = {
  id: string
  offerTitle: string
  offerSubtitle: string
  code: string
  backgroundVariant: "default" | "alt"
}

export type DiscountPageContent = {
  hero: {
    breadcrumb: {
      homeLabel: string
      homeHref: string
      currentLabel: string
    }
    title: string
    titleHighlight: string
    description: string
  }
  couponSection: {
    spineLabel: string
    revealLabel: string
    coupons: DiscountCouponItem[]
    signupCta: {
      label: string
      href: string
    }
  }
  getStartedSection: {
    title: string
    titleHighlight: string
    platforms: Array<{
      id: string
      label: string
      iconSrc: string
      href: string
      themeColor: string
    }>
  }
  discountSection: {
    badgeLabel: string
    title: string
    titleHighlight: string
    description: string
    steps: Array<{
      id: string
      title: string
      iconSrc: string
      items: Array<{
        text: string
        emailHref?: string
        emailLabel?: string
      }>
    }>
    giftCta: {
      title: string
      description: string
      buttonLabel: string
      href: string
      giftBoxSrc: string
    }
  }
  assets: {
    heroBackgroundSrc: string
    breadcrumbChevronSrc: string
    couponBgSrc: string
    couponBgAltSrc: string
    couponPercentIconSrc: string
    signupCtaArrowSrc: string
  }
}
