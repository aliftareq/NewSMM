export type DashboardOrderHistoryContent = {
  balance: {
    label: string
    amount: string
    newOrderLabel: string
    newOrderHref: string
    addFundsLabel: string
  }
  empty: {
    title: string
    description: string
  }
  assets: {
    addFundsPlus: string
  }
}