export type DashboardHomeLink = {
  label: string
  href: string
}

export type DashboardHomeNotification = {
  id: string
  message: string
  date: string
}

export type DashboardHomeQuickOrderItem = {
  id: string
  title: string
  price: string
  href: string
}

export type DashboardHomeSuggestion = {
  id: string
  title: string
  description: string
  actionLabel: string
  href: string
}

export type DashboardHomeSettingsItem = {
  id: string
  label: string
  href: string
}

export type DashboardHomeCountdown = {
  days: string
  hours: string
  minutes: string
  seconds: string
}

export type DashboardHomeContent = {
  assets: {
    notificationCheck: string
    linkArrow: string
    settingsArrow: string
    cardDivider: string
    addFundsPlus: string
    freeTrialPanel: string
    giftBox: string
    emailNotifyIcon: string
    orderNowIcon: string
    socialIconsSprite: string
  }
  welcome: {
    title: string
    email: string
  }
  updates: {
    title: string
    description: string
    items: DashboardHomeNotification[]
    olderUpdatesLabel: string
    olderUpdatesHref: string
  }
  balance: {
    title: string
    description: string
    balanceHistoryLabel: string
    balanceHistoryHref: string
    amount: string
    addFundsLabel: string
  }
  freeTrial: {
    title: string
    introBefore: string
    introHighlight: string
    introAfter: string
    selectLabel: string
    options: string[]
    /** Platform ids matching `serviceHeroContent.orderWidget.platforms`. */
    platforms: string[]
  }
  weeklyGift: {
    title: string
    openedMessage: string
    nextMessage: string
    emailNotifyLabel: string
    countdownTitle: string
    countdown: DashboardHomeCountdown
  }
  affiliate: {
    title: string
    introBefore: string
    brandHighlight: string
    introAfter: string
    ctaLabel: string
    href: string
  }
  settings: {
    title: string
    description: string
    items: DashboardHomeSettingsItem[]
  }
  quickOrder: {
    title: string
    description: string
    items: DashboardHomeQuickOrderItem[]
    newOrderLabel: string
    newOrderHref: string
  }
  suggestions: {
    title: string
    description: string
    items: DashboardHomeSuggestion[]
  }
  help: {
    title: string
    description: string
    faqLabel: string
    faqHref: string
    contactLabel: string
    contactHref: string
  }
  featureRequest: {
    title: string
    description: string
    placeholder: string
    submitLabel: string
  }
}