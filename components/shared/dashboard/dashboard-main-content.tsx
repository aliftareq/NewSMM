import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type DashboardMainContentProps = {
  children: ReactNode
  className?: string
}

/** ~32px horizontal padding at 1440px desktop → ~4.2vw, floored at 1rem */
export const DASHBOARD_GUTTER_X = "max(1rem,calc(100vw*0.042))"

/**
 * Shared main column for all dashboard routes.
 * Mobile/tablet: full usable width inside shell gutters.
 * Desktop (lg+): sidebar offset; 1100px cap from 1440px.
 */
export function DashboardMainContent({
  children,
  className,
}: DashboardMainContentProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full min-w-0 max-w-full",
        "lg:max-w-[min(1100px,calc(100vw-300px-2*max(1rem,calc(100vw*0.042))))]",
        "min-[1440px]:max-w-[1100px]",
        className,
      )}
    >
      {children}
    </div>
  )
}