import { dashboardShellContent } from "@/data/dashboard/shell"
import type { DashboardOrderHistoryContent } from "@/types/dashboard/order-history"

export const dashboardOrderHistoryContent: DashboardOrderHistoryContent = {
  balance: {
    label: dashboardShellContent.balance.label,
    amount: dashboardShellContent.balance.defaultAmount,
    newOrderLabel: "New Order",
    newOrderHref: "/dashboard/neworder",
    addFundsLabel: "Add Fund",
  },
  empty: {
    title: "No Order History Yet",
    description:
      "Your order history will appear here once you place your first order.",
  },
  assets: {
    addFundsPlus: dashboardShellContent.assets.addFundsPlus,
  },
}