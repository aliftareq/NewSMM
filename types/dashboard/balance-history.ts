export type DashboardBalanceHistoryContent = {
  balance: {
    label: string
    amount: string
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