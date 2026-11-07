import { Suspense } from "react"

import { OrderExtrasPageContent } from "@/components/shared/service/order-extras/order-extras-page-content"

export function OrderExtrasSection() {
  return (
    <Suspense fallback={null}>
      <OrderExtrasPageContent />
    </Suspense>
  )
}
