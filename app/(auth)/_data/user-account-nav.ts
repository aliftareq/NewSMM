import type { UserAccountNavContent } from "@/app/(auth)/_types/user-account-nav"

const IMG = "/images/auth/user-nav-menu"

export const userAccountNavContent: UserAccountNavContent = {
  assets: {
    avatarHeader: `${IMG}/avatar-header.svg`,
    divider: `${IMG}/divider.svg`,
    addFundsPlus: `${IMG}/add-funds-plus.svg`,
    logout: `${IMG}/logout.svg`,
  },
  balanceLabel: "My Balance",
  defaultBalance: "$0.00",
  addFundsLabel: "Add funds",
  items: [
    {
      id: "new-order",
      label: "New Order",
      href: "/order",
      iconSrc: `${IMG}/new-order.svg`,
      variant: "primary",
    },
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/",
      iconSrc: `${IMG}/dashboard.svg`,
    },
    {
      id: "order-history",
      label: "Order history",
      href: "/cart",
      iconSrc: `${IMG}/order-history.svg`,
    },
    {
      id: "balance-history",
      label: "Balance history",
      href: "/checkout",
      iconSrc: `${IMG}/balance-history.svg`,
    },
    {
      id: "my-discounts",
      label: "My discounts",
      href: "/discount",
      iconSrc: `${IMG}/my-discounts.svg`,
    },
    {
      id: "support",
      label: "Support",
      href: "/contact",
      iconSrc: `${IMG}/support.svg`,
    },
    {
      id: "settings",
      label: "Setting",
      href: "/faq",
      iconSrc: `${IMG}/settings.svg`,
    },
  ],
  logOutLabel: "Log out",
}

export function formatUserAccountTeamLabel(displayName: string): string {
  const first = displayName.trim().split(/\s+/)[0]
  return first ? `${first} team` : "My team"
}
