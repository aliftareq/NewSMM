import { Suspense, type ComponentProps } from "react"

import { ServiceOrderWidget } from "@/components/shared/service/service-order-widget"

function ServiceOrderWidgetFallback() {
  return (
    <div
      className="box-border mx-auto flex w-full min-w-0 max-w-[661px] min-h-[420px] animate-pulse rounded-[20px] border border-[#f5f6f7] bg-[#f9f9f9] sm:min-h-[480px] sm:rounded-[24px]"
      aria-hidden
    />
  )
}

export function ServiceOrderWidgetSuspense(
  props: ComponentProps<typeof ServiceOrderWidget>,
) {
  return (
    <Suspense fallback={<ServiceOrderWidgetFallback />}>
      <ServiceOrderWidget {...props} />
    </Suspense>
  )
}