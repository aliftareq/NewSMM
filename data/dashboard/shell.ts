import type { DashboardShellContent } from "@/types/dashboard/shell"

const SIDEBAR_IMG = "/images/dashboard/sidebar"
const NAVBAR_IMG = "/images/dashboard/navbar"
const USER_NAV_IMG = "/images/auth/user-nav-menu"
const LANDING_LOGO = "/images/landing/navbar/logomark.svg"

export const dashboardShellContent: DashboardShellContent = {
  assets: {
    logomark: LANDING_LOGO,
    divider: `${SIDEBAR_IMG}/divider.svg`,
    addFundsPlus: `${SIDEBAR_IMG}/add-funds-plus.svg`,
    supportSparkle: `${SIDEBAR_IMG}/support-sparkle.svg`,
    supportGlow: `${SIDEBAR_IMG}/support-glow.svg`,
    pageIconNewOrder: `${NAVBAR_IMG}/page-icon-new-order.svg`,
    cartIcon: `${NAVBAR_IMG}/cart-icon.svg`,
    notificationBell: `${NAVBAR_IMG}/notification-bell.svg`,
    chevronDown: `${NAVBAR_IMG}/chevron-down.svg`,
    metaDivider: `${NAVBAR_IMG}/meta-divider.svg`,
    defaultUserAvatar: `${NAVBAR_IMG}/user-avatar.png`,
  },
  brand: {
    href: "/",
    nameMain: "SOCIAL ",
    nameAccent: "PANEL",
  },
  balance: {
    label: "My Balance",
    defaultAmount: "$0.00",
    addFundsLabel: "Add funds",
  },
  supportCard: {
    title: "24/7 Support",
    description:
      "AI-powered replies, tag insight, and tools that save your time",
    ctaLabel: "Chat Now",
  },
  navItems: [
    {
      id: "new-order",
      label: "New Order",
      href: "/dashboard/neworder",
      iconSrc: `${USER_NAV_IMG}/new-order.svg`,
      variant: "primary",
    },
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/dashboard",
      iconSrc: `${USER_NAV_IMG}/dashboard.svg`,
    },
    {
      id: "order-history",
      label: "Order history",
      href: "/dashboard/order-history",
      iconSrc: `${USER_NAV_IMG}/order-history.svg`,
    },
    {
      id: "balance-history",
      label: "Balance history",
      href: "/checkout",
      iconSrc: `${USER_NAV_IMG}/balance-history.svg`,
    },
    {
      id: "my-discounts",
      label: "My discounts",
      href: "/discount",
      iconSrc: `${USER_NAV_IMG}/my-discounts.svg`,
    },
    {
      id: "support",
      label: "Support",
      href: "/contact",
      iconSrc: `${USER_NAV_IMG}/support.svg`,
    },
    {
      id: "affiliate",
      label: "Affiliate",
      href: "/contact",
      iconSrc: `${SIDEBAR_IMG}/affiliate.svg`,
    },
    {
      id: "settings",
      label: "Setting",
      href: "/faq",
      iconSrc: `${USER_NAV_IMG}/settings.svg`,
    },
  ],
  cart: {
    href: "/cart",
    label: "Cart",
  },
  pageMetaByPath: {
    "/dashboard": {
      title: "Dashboard",
      iconSrc: `${USER_NAV_IMG}/dashboard.svg`,
    },
    "/dashboard/neworder": {
      title: "New Order",
      iconSrc: `${NAVBAR_IMG}/page-icon-new-order.svg`,
    },
    "/dashboard/order-history": {
      title: "Order history",
      iconSrc: `${USER_NAV_IMG}/order-history.svg`,
    },
  },
}

export function resolveDashboardPageMeta(pathname: string) {
  if (dashboardShellContent.pageMetaByPath[pathname]) {
    return dashboardShellContent.pageMetaByPath[pathname]
  }
  const match = dashboardShellContent.navItems.find(
    (item) =>
      pathname === item.href || pathname.startsWith(`${item.href}/`),
  )
  if (match) {
    return {
      title: match.label,
      iconSrc: match.iconSrc,
    }
  }
  return {
    title: "New Order",
    iconSrc: dashboardShellContent.assets.pageIconNewOrder,
  }
}

export function isDashboardNavActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === "/dashboard"
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}