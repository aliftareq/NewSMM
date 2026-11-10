export type PrivacyPolicySection = {
  id: string
  title: string
  body: string
}

export type PrivacyPolicyPageContent = {
  hero: {
    breadcrumb: {
      homeLabel: string
      homeHref: string
      currentLabel: string
    }
    title: string
    titleHighlight: string
    description: string
    lastUpdated: string
    descriptionMaxWidth?: number
  }
  searchPlaceholder: string
  tabs: {
    privacy: { label: string; href: string }
    terms: { label: string; href: string }
  }
  sections: PrivacyPolicySection[]
  assets: {
    heroBackgroundSrc: string
    breadcrumbChevronSrc: string
    searchIcon24Src: string
    searchButtonHighlightSrc: string
  }
}
