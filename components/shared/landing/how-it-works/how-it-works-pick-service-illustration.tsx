"use client"

import { motion, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

const OPTION_COUNT = 3
const CYCLE_MS = 2600
const ROW_HEIGHT_PX = 44
const ROW_GAP_PX = 12
const ROW_STEP_PX = ROW_HEIGHT_PX + ROW_GAP_PX
/** Exactly three rows visible (44 + 12 + 44 + 12 + 44) */
const VIEWPORT_HEIGHT_PX = ROW_HEIGHT_PX * 3 + ROW_GAP_PX * 2
const LOOP_START_STEP = OPTION_COUNT
const LOOP_RESET_STEP = OPTION_COUNT * 3

function PickServiceRow({
  active,
  variant,
}: {
  active: boolean
  variant: 0 | 1 | 2
}) {
  const primaryWidths = ["w-[60px]", "w-[64px]", "w-[52px]"]
  const secondaryWidths = ["w-[76px]", "w-[66px]", "w-[52px]"]

  return (
    <div
      className={cn(
        "box-border flex h-[44px] w-full shrink-0 items-center justify-between rounded-[10px] border-2 px-4",
        active
          ? "border-[#20a7ee] bg-[#eaf6fd]"
          : "border-[#cfe8fa] bg-white"
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex size-[19px] shrink-0 items-center justify-center rounded-full",
            active ? "bg-[#20a7ee]" : "bg-[#eaf6fd]"
          )}
        >
          {active ? (
            <svg viewBox="0 0 19 19" className="size-full" aria-hidden>
              <path
                d="M5 9.5L8 12.5L14 6.5"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </span>
        <div className="flex flex-col gap-1.5">
          <span
            className={cn(
              "block h-2 rounded-full",
              active ? "w-[71px] bg-[#20a7ee]" : `${primaryWidths[variant]} bg-[#c5d2dd]`
            )}
          />
          <span
            className={cn(
              "block h-2 rounded-full",
              active ? "w-[66px] bg-[#20a7ee]" : `${secondaryWidths[variant]} bg-[#c5d2dd]`
            )}
          />
        </div>
      </div>
      <span
        className={cn(
          "h-3 shrink-0 rounded-full",
          active ? "w-[45px] bg-[#20a7ee]/35" : "w-[46px] bg-[#e7edf2]"
        )}
      />
    </div>
  )
}

/**
 * Figma step 01 — always shows 3 rows; center slot is active while the list scrolls.
 * Visible indices: step, step+1 (active), step+2
 */
export function HowItWorksPickServiceIllustration() {
  const reduceMotion = useReducedMotion()
  const [step, setStep] = useState(LOOP_START_STEP)
  const skipTransitionRef = useRef(false)

  useEffect(() => {
    if (reduceMotion) return
    const timer = window.setInterval(() => {
      setStep((prev) => {
        const next = prev + 1
        if (next >= LOOP_RESET_STEP) {
          skipTransitionRef.current = true
          return LOOP_START_STEP
        }
        return next
      })
    }, CYCLE_MS)
    return () => window.clearInterval(timer)
  }, [reduceMotion])

  const translateY = -step * ROW_STEP_PX

  return (
    <div
      className="relative w-[218px] max-w-full overflow-hidden"
      style={{ height: VIEWPORT_HEIGHT_PX }}
      aria-hidden
    >
      <motion.div
        className="flex flex-col"
        style={{ gap: ROW_GAP_PX }}
        animate={{ y: translateY }}
        transition={
          reduceMotion || skipTransitionRef.current
            ? { duration: 0 }
            : { type: "spring", stiffness: 260, damping: 32 }
        }
        onAnimationComplete={() => {
          skipTransitionRef.current = false
        }}
      >
        {Array.from({ length: LOOP_RESET_STEP + 2 }, (_, index) => (
          <PickServiceRow
            key={index}
            variant={(index % OPTION_COUNT) as 0 | 1 | 2}
            active={index === step + 1}
          />
        ))}
      </motion.div>
    </div>
  )
}
