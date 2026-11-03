export type StatsHighlightStat = {
  label: string
  value: string
}

export type StatsHighlightAvatar = {
  src: string
  alt?: string
}

export type StatsHighlightIntro = {
  subheading: {
    label: string
  }
  headingPrimary: string
  headingSecondary: string
}

export type StatsHighlightData = {
  intro: StatsHighlightIntro
  avatarCard: {
    stat: StatsHighlightStat
    rowOneAvatars: StatsHighlightAvatar[]
    rowTwoAvatars: StatsHighlightAvatar[]
  }
  servicesCard: {
    stat: StatsHighlightStat
    description: string
    decorationSrc: string
  }
  ordersCard: {
    stat: StatsHighlightStat
    description: string
    imageSrc: string
    imageAlt?: string
  }
  worldwideCard: {
    stat: StatsHighlightStat
    description: string
    backgroundSrc: string
    backgroundAlt?: string
  }
}
