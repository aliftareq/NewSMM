import { serviceHeroContent } from "@/data/service/hero"
import type { DashboardSettingsContent } from "@/types/dashboard/settings"

const IMG = "/images/dashboard/settings"
const AUTH_MENU_IMG = "/images/auth/user-nav-menu"

const serviceSpriteInstagram = {
  kind: "sprite" as const,
  cropClassName:
    "absolute h-[639.76%] left-[-343.53%] max-w-none top-[-48.82%] w-[787.4%]",
}

const serviceSpriteTiktok = {
  kind: "sprite" as const,
  cropClassName:
    "absolute h-[639.76%] left-[-195.87%] max-w-none top-[-196.09%] w-[787.4%]",
}

/** Figma 25704:14540 — dashboard settings (General). */
export const dashboardSettingsContent: DashboardSettingsContent = {
  assets: {
    sectionDivider: `${IMG}/section-divider.svg`,
    securityBlockDivider: `${IMG}/security-section-divider-alt.svg`,
    deleteAccountSectionDivider: `${IMG}/delete-section-divider.svg`,
    passwordVisibility: `${IMG}/password-visibility.svg`,
    panelDividerVertical: `${IMG}/panel-divider-vertical.svg`,
    socialUsernamesPanel: `${IMG}/social-usernames-panel.svg`,
    addUsernamePlus: `${IMG}/add-username-plus.svg`,
    toggleOn: `${IMG}/toggle-on.svg`,
    navGeneralActive: `${IMG}/nav-general-active.svg`,
    navGeneralInactive: `${AUTH_MENU_IMG}/settings.svg`,
    navSecurity: `${IMG}/nav-security.svg`,
    navBilling: `${IMG}/nav-billing.svg`,
    socialIconsSprite: `${IMG}/social-icons-sprite.png`,
  },
  nav: [
    {
      id: "general",
      label: "General",
      iconSrc: `${IMG}/nav-general-active.svg`,
    },
    {
      id: "security",
      label: "Security",
      iconSrc: `${IMG}/nav-security.svg`,
    },
    {
      id: "billing",
      label: "Billing",
      iconSrc: `${IMG}/nav-billing.svg`,
    },
  ],
  defaultTabId: "general",
  contactInfo: {
    sectionTitle: "Contact info",
    firstNameLabel: "First name",
    lastNameLabel: "Last name",
    emailLabel: "Email",
    changeLabel: "Change",
    addUsernameLabel: "Add username",
    defaults: {
      firstName: "Seam",
      lastName: "Rahman",
      email: "example@gamil.com",
    },
  },
  socialIcons: [
    { id: "instagram", kind: "sprite", icon: serviceSpriteInstagram },
    { id: "tiktok", kind: "sprite", icon: serviceSpriteTiktok },
    {
      id: "twitter",
      kind: "image",
      src: `${IMG}/social-twitter.png`,
      className: "absolute h-[115.84%] left-[-8.11%] max-w-none top-[-6.86%] w-[115.16%]",
    },
    {
      id: "spotify",
      kind: "image",
      src: `${IMG}/social-spotify.png`,
      className: "absolute h-[110.43%] left-[-8.2%] max-w-none top-[-2.76%] w-[113.56%]",
    },
  ],
  emailSettings: {
    sectionTitle: "Email settings",
    items: [
      {
        id: "account-billing",
        title: "Account and billing",
        description:
          "These emails are mandatory. These include your account information, email or password change requests and order confirmation/delivery emails.",
        defaultEnabled: true,
        locked: true,
      },
      {
        id: "gift-box",
        title: "Gift box discount",
        description:
          "These emails notifiy you when your Discounts Gift Box is ready to open.",
        defaultEnabled: true,
      },
      {
        id: "special-deals",
        title: "Special deals and discounts",
        description:
          "These emails include special discount offers such as Black Friday, Cyber Monday, Christmas deals & more!",
        defaultEnabled: true,
      },
      {
        id: "coupon-expiration",
        title: "Discount coupon expiration",
        description:
          "We will notify you before any of your discount coupons are due to expire.",
        defaultEnabled: true,
      },
      {
        id: "cashback",
        title: "Cashback Notifications",
        description:
          "We will send you updates whenever cashback is granted for your orders, along with a summary of your total accumulated balance.",
        defaultEnabled: true,
      },
    ],
  },
  security: {
    changePassword: {
      title: "Change your password",
      description: "Fill in the form below if you wish to change your password",
      newPasswordLabel: "New password",
      repeatPasswordLabel: "Repeat password",
      passwordPlaceholder: "****************",
      saveChangesLabel: "Save changes",
    },
    accountProtection: {
      sectionTitle: "Account protection",
      twoFactorTitle: "2FA Authentification",
      twoFactorDescription: "Receive code to your email to confirm login.",
      defaultTwoFactorEnabled: true,
    },
    deleteAccount: {
      title: "Delete your account",
      description: [
        "We respect your data privacy, security, and the right to be forgotten. You can request account",
        "deletion below.",
      ],
      warningPrefix: "Warning: ",
      warningMiddle: "once your account and related data has ",
      warningSuffix: "been deleted it cannot be recovered!",
      requestDeletionLabel: "Request deletion",
    },
  },
  tabPlaceholders: {
    billing: {
      title: "Billing",
      description: "Payment methods, invoices, and billing preferences.",
    },
  },
}