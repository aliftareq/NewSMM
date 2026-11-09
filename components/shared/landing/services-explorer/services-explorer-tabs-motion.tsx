"use client"

import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useRef } from "react"

import type {
  ServicesModalPlatform,
  ServicesModalPlatformId,
} from "@/types/landing/services-modal"
import {
  PlatformIcon,
  ServicesPanel,
} from "@/components/shared/landing/services-explorer/services-explorer-ui"
import { cn } from "@/lib/utils"

const TAB_PILL_LAYOUT_ID = "services-explorer-tab-pill"

const panelVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : direction < 0 ? -40 : 0,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : direction < 0 ? 40 : 0,
    opacity: 0,
  }),
}

type AnimatedPlatformTabsProps = {
  platforms: ServicesModalPlatform[]
  activeId: ServicesModalPlatformId
  onSelect: (id: ServicesModalPlatformId, index: number) => void
  tabLabels?: Partial<Record<ServicesModalPlatformId, string>>
}

export function AnimatedPlatformTabs({
  platforms,
  activeId,
  onSelect,
  tabLabels,
}: AnimatedPlatformTabsProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div
      role="tablist"
      aria-label="Social platforms"
      className="-mx-1 grid grid-cols-2 gap-3 px-1 pb-1 xl:grid-cols-8"
    >
      {platforms.map((platform, index) => {
        const active = platform.id === activeId
        const label = tabLabels?.[platform.id] ?? platform.label

        return (
          <button
            key={platform.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(platform.id, index)}
            className={cn(
              "relative flex w-full min-w-0 flex-col items-center justify-center rounded-xl p-3 xl:min-w-0 xl:p-4",
              active
                ? "z-10 text-white"
                : "border border-[#ebecef] bg-white text-n700 hover:border-[#d8dce3]"
            )}
          >
            {active ? (
              reduceMotion ? (
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.08)]"
                  style={{ backgroundColor: platform.theme.tabActiveBg }}
                />
              ) : (
                <motion.span
                  layoutId={TAB_PILL_LAYOUT_ID}
                  aria-hidden
                  className="absolute inset-0 rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.08)]"
                  style={{ backgroundColor: platform.theme.tabActiveBg }}
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )
            ) : null}
            <span className="relative z-10 flex items-center gap-2 whitespace-nowrap text-sm xl:text-base">
              <PlatformIcon icon={platform.icon} />
              <span className="font-medium leading-[1.35]">{label}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

type AnimatedServicesPanelProps = {
  platform: ServicesModalPlatform
  direction: number
  enableScrollReveal?: boolean
  onScrollRevealComplete?: () => void
}

export function AnimatedServicesPanel({
  platform,
  direction,
  enableScrollReveal = true,
  onScrollRevealComplete,
}: AnimatedServicesPanelProps) {
  const reduceMotion = useReducedMotion()

  const panelProps = {
    platform,
    enableScrollReveal,
    onScrollRevealComplete,
  }

  if (reduceMotion) {
    return <ServicesPanel {...panelProps} />
  }

  return (
    <div className="relative min-h-0 overflow-hidden">
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={platform.id}
          role="tabpanel"
          custom={direction}
          variants={panelVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 320, damping: 32 },
            opacity: { duration: 0.2 },
          }}
          className="min-w-0"
        >
          <ServicesPanel {...panelProps} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/** Tracks tab index changes and returns slide direction (-1 | 0 | 1). */
export function useTabSlideDirection(initialIndex = 0) {
  const previousIndexRef = useRef(initialIndex)

  const getDirection = (nextIndex: number) => {
    const prev = previousIndexRef.current
    const direction = nextIndex > prev ? 1 : nextIndex < prev ? -1 : 0
    previousIndexRef.current = nextIndex
    return direction
  }

  return { getDirection }
}
