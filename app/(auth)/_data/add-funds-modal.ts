import type { AddFundsModalContent } from "@/app/(auth)/_types/add-funds-modal"

const IMG = "/images/auth/add-funds-modal"
const LOGIN_CLOSE = "/images/auth/login-modal/close.svg"

export const addFundsModalContent: AddFundsModalContent = {
  assets: {
    divider: `${IMG}/divider.svg`,
    closeIcon: LOGIN_CLOSE,
  },
  title: "Add funds to your balance",
  promoHighlight: "Top up $100",
  promoBody:
    " or more and we'll add free bonus credit automatically — the bigger the top-up, the bigger the bonus.",
  customAmountTitle: "Or enter a custom amount",
  customAmountHint: "Minimum $20, maximum $1500",
  customAmountMinLabel: "min $20",
  continueLabel: "Continue to payment",
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
