import { dashboardShellContent } from "@/data/dashboard/shell"
import type { DashboardBalanceHistoryContent } from "@/types/dashboard/balance-history"

export const dashboardBalanceHistoryContent: DashboardBalanceHistoryContent = {
  balance: {
    label: dashboardShellContent.balance.label,
    amount: dashboardShellContent.balance.defaultAmount,
    addFundsLabel: "Add Funds",
  },
  empty: {
    title: "No Balance History Yet",
    description:
      "Your balance transactions will appear here once you add funds or make a transaction.",
  },
  assets: {
    addFundsPlus: dashboardShellContent.assets.addFundsPlus,
  },
}