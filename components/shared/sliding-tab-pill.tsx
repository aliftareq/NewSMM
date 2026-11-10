"use client"

import { motion, useReducedMotion } from "motion/react"
import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

/** Shared spring for sliding tab / segmented-control indicators site-wide. */
export const SLIDING_TAB_PILL_SPRING = {
  type: "spring" as const,
  stiffness: 420,
  damping: 36,
}

export const LAYOUT_IDS = {
  servicesExplorer: "services-explorer-tab-pill",
  servicesModalSidebar: "services-modal-sidebar-tab-pill",
  serviceHeroQuality: "service-hero-quality-pill",
  serviceHeroPlatform: "service-hero-platform-pill",
  growthPackageQuality: "growth-package-quality-pill",
  authModal: "auth-modal-tab-pill",
} as const

type SlidingTabPillProps = {
  layoutId: string
  className?: string
  style?: CSSProperties
}

export function SlidingTabPill({ layoutId, className, style }: SlidingTabPillProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <span aria-hidden className={cn("absolute inset-0", className)} style={style} />
    )
  }

  return (
    <motion.span
      layoutId={layoutId}
      aria-hidden
      className={cn("absolute inset-0", className)}
      style={style}
      transition={SLIDING_TAB_PILL_SPRING}
    />
  )
}
