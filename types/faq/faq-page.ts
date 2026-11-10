import type { LandingFaqItem } from "@/types/landing/faq"

export type FaqPageContent = {
  hero: {
    badgeLabel: string
    title: string
    titleHighlight: string
    description: string
  }
  searchPlaceholder: string
  categories: Array<{ id: string; label: string }>
  faq: {
    leftColumn: LandingFaqItem[]
    rightColumn: LandingFaqItem[]
  }
  assets: {
    heroBackgroundSrc: string
    searchIconSrc: string
    chevronSrc: string
  }
}
