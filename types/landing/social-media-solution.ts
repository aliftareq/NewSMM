export type SocialMediaSolutionCard = {
  id: string
  title: string
  description: string
}

export type SocialMediaSolutionContent = {
  badgeLabel: string
  headingLineOne: string
  headingLineTwoAccent: string
  description: string
  cta: {
    label: string
    href: string
  }
  cards: SocialMediaSolutionCard[]
  arrowUpSrc: string
  arrowDownSrc: string
}
