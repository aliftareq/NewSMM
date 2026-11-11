"use client"

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type GrowthPackageScrollPaneProps = {
  children: ReactNode
  className?: string
  /** Mobile: pan horizontally + scroll rows vertically inside max height. */
  variant: "mobile" | "desktop"
}

const SCROLL_PANE_MAX_HEIGHT = "max-h-[min(664px,70vh)]"

/**
 * Nested scroll for the pricing table. Lenis `allowNestedScroll` scrolls inside
 * the pane and chains to the page at top/bottom (`overscroll-behavior-y: auto`).
 */
export function GrowthPackageScrollPane({
  children,
  className,
  variant,
}: GrowthPackageScrollPaneProps) {
  return (
    <div
      className={cn(
        "service-growth-package-scroll min-h-0",
        SCROLL_PANE_MAX_HEIGHT,
        variant === "mobile"
          ? "overflow-auto touch-pan-x touch-pan-y pb-1"
          : "overflow-x-hidden overflow-y-auto pb-1 pr-0.5 sm:pr-3",
        className,
      )}
    >
      {children}
    </div>
  )
}
