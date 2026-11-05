export type WhyChooseOurServiceCard = {
  id: string
  title: string
  description: string
  iconSrc: string
  iconClassName?: string
}

export type WhyChooseOurServiceContent = {
  badgeLabel: string
  headingBefore: string
  headingAccent: string
  description: string
  topRow: WhyChooseOurServiceCard[]
  bottomRow: WhyChooseOurServiceCard[]
}
