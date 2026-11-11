export type UserAccountNavItem = {
  id: string
  label: string
  href: string
  iconSrc: string
  variant?: "primary" | "default"
}

export type UserAccountNavContent = {
  assets: {
    avatarHeader: string
    divider: string
    addFundsPlus: string
    logout: string
  }
  balanceLabel: string
  defaultBalance: string
  addFundsLabel: string
  addFundsHref: string
  items: UserAccountNavItem[]
  logOutLabel: string
}
