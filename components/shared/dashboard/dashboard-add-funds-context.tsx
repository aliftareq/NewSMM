"use client"

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react"

import { DashboardAddFundsModal } from "@/components/shared/dashboard/dashboard-add-funds-modal"
import { DashboardPayNowModal } from "@/components/shared/dashboard/dashboard-pay-now-modal"
import { dashboardAddFundsModalContent } from "@/data/dashboard/add-funds-modal"
import { dashboardHomeContent } from "@/data/dashboard/home"

const DashboardAddFundsContext = createContext<(() => void) | null>(null)

export function DashboardAddFundsProvider({ children }: { children: ReactNode }) {
  const [addFundsOpen, setAddFundsOpen] = useState(false)
  const [payNowOpen, setPayNowOpen] = useState(false)
  const [topUpAmount, setTopUpAmount] = useState(
    dashboardAddFundsModalContent.defaultAmount,
  )
  const openModal = useCallback(() => setAddFundsOpen(true), [])

  const handleAddFunds = useCallback((amount: number) => {
    setTopUpAmount(amount)
    setPayNowOpen(true)
  }, [])

  return (
    <DashboardAddFundsContext.Provider value={openModal}>
      {children}
      <DashboardAddFundsModal
        open={addFundsOpen}
        onOpenChange={setAddFundsOpen}
        onAddFunds={handleAddFunds}
      />
      <DashboardPayNowModal
        open={payNowOpen}
        onOpenChange={setPayNowOpen}
        topUpAmount={topUpAmount}
        email={dashboardHomeContent.welcome.email}
      />
    </DashboardAddFundsContext.Provider>
  )
}

export function useDashboardAddFunds(): () => void {
  const open = useContext(DashboardAddFundsContext)
  if (!open) {
    throw new Error(
      "useDashboardAddFunds must be used within DashboardAddFundsProvider",
    )
  }
  return open
}