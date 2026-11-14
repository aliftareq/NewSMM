import type { DashboardAddFundsModalContent } from "@/types/dashboard/add-funds-modal"

const AUTH_ADD_FUNDS_IMG = "/images/auth/add-funds-modal"
const LOGIN_CLOSE = "/images/auth/login-modal/close.svg"

/** Figma 25704:15896 */
export const dashboardAddFundsModalContent: DashboardAddFundsModalContent = {
  assets: {
    divider: `${AUTH_ADD_FUNDS_IMG}/divider.svg`,
    closeIcon: LOGIN_CLOSE,
  },
  title: "Add funds to your balance",
  bonusBannerLabel: "Get 5% bonus on any top up of $100 and more",
  customAmountTitle: "Or enter a custom amount",
  customAmountHint: "Minimum $20, maximum $1500",
  submitLabel: "Add Funds",
  minAmount: 20,
  maxAmount: 1500,
  defaultAmount: 50,
  checkoutHref: "/checkout",
  presets: [
    { id: "50", amount: 50, label: "$50.00" },
    { id: "100", amount: 100, label: "$100", bonusLabel: "+$5" },
    { id: "250", amount: 250, label: "$250", bonusLabel: "+$12.5" },
    { id: "500", amount: 500, label: "$500", bonusLabel: "+$25" },
    { id: "1000", amount: 1000, label: "$1000", bonusLabel: "+$50" },
    { id: "1500", amount: 1500, label: "$1500", bonusLabel: "+$75" },
  ],
}