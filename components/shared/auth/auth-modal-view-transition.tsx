"use client"

import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"

type AuthModalViewTransitionProps = {
  viewKey: string
  /** When false (modal closing), skip motion so the shell fade can finish without layout flash. */
  active?: boolean
  children: ReactNode
}

const VIEW_CROSSFADE = {
  duration: 0.22,
  ease: [0.4, 0, 0.2, 1] as const,
}

export function AuthModalViewTransition({
  viewKey,
  active = true,
  children,
}: AuthModalViewTransitionProps) {
  const reduceMotion = useReducedMotion()

  if (!active || reduceMotion) {
    return <div className="w-full min-w-0">{children}</div>
  }

  return (
    <div className="w-full min-w-0">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={viewKey}
          className="w-full min-w-0"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{
            opacity: VIEW_CROSSFADE,
            y: VIEW_CROSSFADE,
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
