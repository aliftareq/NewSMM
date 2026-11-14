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

export type DashboardSettingsBillingField = {
  id: string
  label: string
  placeholder: string
  labelTone?: "dark" | "muted"
  optional?: boolean
  colSpan?: "half" | "full"
}

export type DashboardSettingsBillingContent = {
  personalInfo: {
    sectionTitle: string
    fields: DashboardSettingsBillingField[]
    countryField: {
      id: string
      label: string
      placeholder: string
    }
    saveChangesLabel: string
    defaultCountryId: string
    countries: { id: string; label: string }[]
  }
  savedCards: {
    sectionTitle: string
    addNewCardLabel: string
  }
  transactionsEmptyMessage: string
}

export type DashboardSettingsSecurityContent = {
  changePassword: {
    title: string
    description: string
    newPasswordLabel: string
    repeatPasswordLabel: string
    passwordPlaceholder: string
    saveChangesLabel: string
  }
  accountProtection: {
    sectionTitle: string
    twoFactorTitle: string
    twoFactorDescription: string
    defaultTwoFactorEnabled: boolean
  }
  deleteAccount: {
    title: string
    description: string[]
    warningPrefix: string
    warningMiddle: string
    warningSuffix: string
    requestDeletionLabel: string
  }
}

export type DashboardSettingsContent = {
  assets: {
    sectionDivider: string
    securityBlockDivider: string
    deleteAccountSectionDivider: string
    panelDividerVertical: string
    socialUsernamesPanel: string
    addUsernamePlus: string
    toggleOn: string
    passwordVisibility: string
    navGeneralActive: string
    navGeneralInactive: string
    navSecurity: string
    navBilling: string
    countrySelectChevron: string
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
  security: DashboardSettingsSecurityContent
  billing: DashboardSettingsBillingContent
}