import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type DashboardMainContentProps = {
  children: ReactNode
  className?: string
}

/**
 * Shared main column for all dashboard routes.
 * Caps at 1100px from 1440px viewport; below that, fills available width (shell padding + sidebar).
 */
export function DashboardMainContent({
  children,
  className,
}: DashboardMainContentProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full min-w-0",
        "max-w-[min(1100px,calc(100vw-300px-2rem))]",
        "min-[480px]:max-w-[min(1100px,calc(100vw-300px-3rem))]",
        "min-[1440px]:max-w-[1100px]",
        className,
      )}
    >
      {children}
    </div>
  )
}