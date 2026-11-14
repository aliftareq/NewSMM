export type DashboardNavItemVariant = "primary" | "default"

export type DashboardNavItem = {
  id: string
  label: string
  href: string
  iconSrc: string
  variant?: DashboardNavItemVariant
}

export type DashboardShellContent = {
  assets: {
    logomark: string
    divider: string
    addFundsPlus: string
    supportSparkle: string
    supportGlow: string
    pageIconNewOrder: string
    cartIcon: string
    notificationBell: string
    chevronDown: string
    metaDivider: string
    defaultUserAvatar: string
  }
  brand: {
    href: string
    nameMain: string
    nameAccent: string
  }
  balance: {
    label: string
    defaultAmount: string
    addFundsLabel: string
  }
  supportCard: {
    title: string
    description: string
    ctaLabel: string
  }
  navItems: DashboardNavItem[]
  cart: {
    href: string
    label: string
  }
  pageMetaByPath: Record<
    string,
    { title: string; iconSrc: string }
  >
}