import { serviceHeroContent } from "@/data/service/hero"
import type { DashboardHomeContent } from "@/types/dashboard/home"

const HOME_IMG = "/images/dashboard/home"
const SIDEBAR_IMG = "/images/dashboard/sidebar"
const sprite = serviceHeroContent.assets.socialIconsSprite

export const dashboardHomeContent: DashboardHomeContent = {
  assets: {
    notificationCheck: `${HOME_IMG}/notification-check.svg`,
    linkArrow: `${HOME_IMG}/link-arrow.svg`,
    settingsArrow: `${HOME_IMG}/settings-arrow.svg`,
    cardDivider: `${HOME_IMG}/card-divider.svg`,
    addFundsPlus: `${SIDEBAR_IMG}/add-funds-plus.svg`,
    freeTrialPanel: `${HOME_IMG}/free-trial-panel.svg`,
    giftBox: `${HOME_IMG}/gift-box.png`,
    emailNotifyIcon: `${HOME_IMG}/checkbox-unchecked.svg`,
    orderNowIcon: `${HOME_IMG}/order-now.svg`,
    socialIconsSprite: sprite,
  },
  welcome: {
    title: "Welcome Back, Seam RaHman!",
    email: "example@gmail.com",
  },
  updates: {
    title: "Updates and notifications",
    description: "Get important updates and alerts about your account.",
    items: [
      {
        id: "gift-1",
        message: 'A "common" reward received from a giftbox',
        date: "10 March, 2026",
      },
      {
        id: "gift-2",
        message: 'A "common" reward received from a giftbox',
        date: "10 March, 2026",
      },
    ],
    olderUpdatesLabel: "See older updates",
    olderUpdatesHref: "/discount",
  },
  balance: {
    title: "My balance",
    description:
      "Add funds to your account's balance for easy checkout process. You get 5% bonus funds for top ups of $100 and more.",
    balanceHistoryLabel: "Balance history",
    balanceHistoryHref: "/checkout",
    amount: "$0.00",
    addFundsLabel: "Add funds",
  },
  freeTrial: {
    title: "Free trial",
    introBefore: "You've got ",
    introHighlight: "1 free",
    introAfter: " trial credit. Use it now to try our services for free!",
    selectLabel: "Select free trial service",
    options: [
      "Free 10 Followers",
      "Free 10 Likes",
      "Free 10 Comments",
      "Free 10 Views",
    ],
    platforms: [
      "instagram",
      "tiktok",
      "twitter",
      "threads",
      "soundcloud",
      "youtube",
      "facebook",
    ],
  },
  weeklyGift: {
    title: "Weekly discount gift",
    openedMessage: "You already opened your weekly giftbox.",
    nextMessage: "The next one will be available on the next week.",
    emailNotifyLabel: "E-mail me when the box is ready",
    countdownTitle: "Untill the Next Giftbox",
    countdown: {
      days: "05",
      hours: "23",
      minutes: "26",
      seconds: "27",
    },
  },
  affiliate: {
    title: "Affiliate program",
    introBefore: "Earn money with ",
    brandHighlight: "BuySocialMediaMarketing!",
    introAfter:
      " Join our industry leading affiliate program and begin earning a passive income from your referrals today.",
    ctaLabel: "Get started",
    href: "/contact",
  },
  settings: {
    title: "Account settings",
    description: "Manage your account's settings here",
    items: [
      { id: "general", label: "General", href: "/faq" },
      { id: "security", label: "Security", href: "/faq" },
      { id: "billing", label: "Billing", href: "/checkout" },
    ],
  },
  quickOrder: {
    title: "Quick order",
    description: "Here are our recommended packages for you",
    items: Array.from({ length: 5 }, (_, index) => ({
      id: `spotify-${index + 1}`,
      title: "Spotify 500 Plays",
      price: "$2.99",
      href: "/dashboard/neworder",
    })),
    newOrderLabel: "New order",
    newOrderHref: "/dashboard/neworder",
  },
  suggestions: {
    title: "Suggestions for you",
    description: "Here are our recommendations for you",
    items: [
      {
        id: "order-history",
        title: "Get your discount reward!",
        description:
          "Rate your recent order #CSE9CF and get a discount reward for your next order!",
        actionLabel: "Order history",
        href: "/cart",
      },
      {
        id: "my-discount",
        title: "Get your discount reward!",
        description:
          "Rate your recent order #CSE9CF and get a discount reward for your next order!",
        actionLabel: "My discount",
        href: "/discount",
      },
      {
        id: "add-balance",
        title: "Get your discount reward!",
        description:
          "Rate your recent order #CSE9CF and get a discount reward for your next order!",
        actionLabel: "Add balance",
        href: "/checkout",
      },
      {
        id: "new-order",
        title: "Get your discount reward!",
        description:
          "Rate your recent order #CSE9CF and get a discount reward for your next order!",
        actionLabel: "New order",
        href: "/dashboard/neworder",
      },
    ],
  },
  help: {
    title: "Help",
    description:
      "Have any questions or issues with your order? Our customer support is available 7 days a week, with 24-hour response time.",
    faqLabel: "FAQ",
    faqHref: "/faq",
    contactLabel: "Contact us",
    contactHref: "/contact",
  },
  featureRequest: {
    title: "Request a feature",
    description:
      "Share your ideas and help us improve. If you would like us to add a new feature or release a new service or you have any tips or recommendations how can we make your experience better, please let us know!!",
    placeholder: "Tell us what you'd like to see…",
    submitLabel: "Submit feedback",
  },
}