import { Suspense } from "react"

import { NewOrderPageContent } from "@/components/shared/service/new-order/new-order-page-content"

function NewOrderPageFallback() {
  return (
    <div className="info-container flex min-h-[400px] items-center justify-center">
      <p className="text-base font-medium text-[#798090]">Loading your order…</p>
    </div>
  )
}

export function NewOrderSection() {
  return (
    <Suspense fallback={<NewOrderPageFallback />}>
      <NewOrderPageContent />
    </Suspense>
  )
}
