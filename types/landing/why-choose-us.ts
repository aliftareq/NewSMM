export type WhyChooseUsCard = {
  id: string
  step: string
  title: string
  description: string
  variant: "default" | "muted"
  showTextArrow?: boolean
}

export type WhyChooseUsContent = {
  badgeLabel: string
  headingLineOnePrimary: string
  headingLineOneAccent: string
  headingLineTwoAccent: string
  description: string
  decorationSrc: string
  serviceIconSrc: string
  textArrowSrc: string
  chevronNextSrc: string
  chevronPrevSrc: string
  cards: WhyChooseUsCard[]
}

export const WHY_CHOOSE_US_NUMBER_GRADIENT =
  "linear-gradient(272.67deg, #0FAFFF -5.42%, #0084D0 96.51%)"
