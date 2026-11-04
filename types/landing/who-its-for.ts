export type WhoItsForServiceTag = {
  id: string
  label: string
  iconSrc: string
  iconWidth: number
  iconHeight: number
  imageClassName?: string
}

export type WhoItsForAudience = {
  id: string
  title: string
  titleClassName?: string
  description: string
  heroIconSrc: string
  heroIconWidth: number
  heroIconHeight: number
  heroImageClassName: string
  tags: WhoItsForServiceTag[]
}

export type WhoItsForSectionContent = {
  badgeLabel: string
  headlineBefore: string
  headlineHighlight: string
  description: string
  audiencesLeft: WhoItsForAudience[]
  audiencesRight: WhoItsForAudience[]
  assets: {
    cardDividerSrc: string
    centerStepperSrc: string
    centerLogomarkSrc: string
  }
}
