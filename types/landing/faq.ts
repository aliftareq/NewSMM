export type LandingFaqItem = {
  id: string
  question: string
  answer: string
}

export type LandingFaqContent = {
  badgeLabel: string
  headingPrimary: string
  headingAccent: string
  description: string
  leftColumn: LandingFaqItem[]
  rightColumn: LandingFaqItem[]
}
