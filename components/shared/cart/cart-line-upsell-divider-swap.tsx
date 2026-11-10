"use client"

import { LayoutGroup, motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

const SWAP_SPRING = {
  type: "spring" as const,
  stiffness: 420,
  damping: 36,
}

type CartLineUpsellDividerSwapProps = {
  lineId: string
  expanded: boolean
  upsell: ReactNode
  divider: ReactNode
}

export function CartLineUpsellDividerSwap({
  lineId,
  expanded,
  upsell,
  divider,
}: CartLineUpsellDividerSwapProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return expanded ? (
      <>
        {upsell}
        {divider}
      </>
    ) : (
      <>
        {divider}
        {upsell}
      </>
    )
  }

  const upsellSlot = (
    <motion.div
      layout="position"
      layoutId={`cart-line-${lineId}-upsell`}
      transition={SWAP_SPRING}
      className={cn("relative z-10 w-full")}
    >
      {upsell}
    </motion.div>
  )

  const dividerSlot = (
    <motion.div
      layout="position"
      layoutId={`cart-line-${lineId}-divider`}
      transition={SWAP_SPRING}
      className="relative z-0 w-full"
    >
      {divider}
    </motion.div>
  )

  return (
    <LayoutGroup id={`cart-line-swap-${lineId}`}>
      <div className="relative isolate flex w-full flex-col gap-5">
        {expanded ? (
          <>
            {upsellSlot}
            {dividerSlot}
          </>
        ) : (
          <>
            {dividerSlot}
            {upsellSlot}
          </>
        )}
      </div>
    </LayoutGroup>
  )
}
