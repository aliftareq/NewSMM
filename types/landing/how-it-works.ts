export type HowItWorksIllustrationKind =
  | "static"
  | "pick-service-carousel"
  | "enter-username"
  | "watch-grow"
  | "confirm-profile"
  | "complete-checkout"

export type HowItWorksStep = {
  id: string
  stepLabel: string
  title: string
  description: string
  illustrationKind?: HowItWorksIllustrationKind
  illustrationSrc: string
  illustrationWidth: number
  illustrationHeight: number
}

export type HowItWorksIntro = {
  badgeLabel: string
  headingPrefix: string
  headingHighlight: string
  description: string
}

export type HowItWorksData = {
  intro: HowItWorksIntro
  steps: HowItWorksStep[]
}
