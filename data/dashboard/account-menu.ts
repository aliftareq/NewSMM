import type { DashboardAccountMenuContent } from "@/types/dashboard/account-menu"

const AUTH_MENU_IMG = "/images/auth/user-nav-menu"

/** Figma 25749:13366 */
export const dashboardAccountMenuContent: DashboardAccountMenuContent = {
  settings: {
    label: "Setting",
    href: "/dashboard/settings",
    iconSrc: `${AUTH_MENU_IMG}/settings.svg`,
  },
  logout: {
    label: "Log out",
    href: "/",
    iconSrc: `${AUTH_MENU_IMG}/logout.svg`,
  },
}