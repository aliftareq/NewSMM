import type { ServicesModalPlatformIcon } from "@/types/landing/services-modal"

export type DashboardSettingsTabId = "general" | "security" | "billing"

export type DashboardSettingsNavItem = {
  id: DashboardSettingsTabId
  label: string
  iconSrc: string
  activeIconSrc?: string
}

export type DashboardSettingsSocialIcon =
  | { id: string; kind: "sprite"; icon: ServicesModalPlatformIcon }
  | { id: string; kind: "image"; src: string; className?: string }

export type DashboardSettingsEmailPreference = {
  id: string
  title: string
  description: string
  defaultEnabled: boolean
  locked?: boolean
}

export type DashboardSettingsContent = {
  assets: {
    sectionDivider: string
    panelDividerVertical: string
    socialUsernamesPanel: string
    addUsernamePlus: string
    toggleOn: string
    navGeneralActive: string
    navGeneralInactive: string
    navSecurity: string
    navBilling: string
    socialIconsSprite: string
  }
  nav: DashboardSettingsNavItem[]
  defaultTabId: DashboardSettingsTabId
  contactInfo: {
    sectionTitle: string
    firstNameLabel: string
    lastNameLabel: string
    emailLabel: string
    changeLabel: string
    addUsernameLabel: string
    defaults: {
      firstName: string
      lastName: string
      email: string
    }
  }
  socialIcons: DashboardSettingsSocialIcon[]
  emailSettings: {
    sectionTitle: string
    items: DashboardSettingsEmailPreference[]
  }
  tabPlaceholders: Record<
    Exclude<DashboardSettingsTabId, "general">,
    { title: string; description: string }
  >
}