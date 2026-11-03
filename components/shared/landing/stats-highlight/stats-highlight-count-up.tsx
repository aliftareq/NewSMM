"use client"

import { animate, useInView, useReducedMotion } from "motion/react"
import { useEffect, useMemo, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type ParsedStatValue = {
  target: number
  format: (current: number) => string
}

function parseStatValue(value: string): ParsedStatValue {
  const match = value.trim().match(/^([\d,]+)(K\+|\+)$/)

  if (!match) {
    return {
      target: 0,
      format: () => value,
    }
  }

  const rawNumberPart = match[1]
  const suffix = match[2]
  const target = Number(rawNumberPart.replace(/,/g, ""))

  return {
    target,
    format: (current: number) => {
      const rounded = Math.round(current)

      if (rawNumberPart.includes(",") || rounded >= 1000) {
        return `${rounded.toLocaleString("en-US")}${suffix}`
      }

      return `${rounded}${suffix}`
    },
  }
}

type StatsHighlightCountUpProps = {
  value: string
  className?: string
}

export function StatsHighlightCountUp({
  value,
  className,
}: StatsHighlightCountUpProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.45 })
  const reduceMotion = useReducedMotion()
  const parsed = useMemo(() => parseStatValue(value), [value])
  const [display, setDisplay] = useState(() =>
    parsed.format(reduceMotion ? parsed.target : 0),
  )

  useEffect(() => {
    if (!isInView) return

    if (reduceMotion) {
      setDisplay(parsed.format(parsed.target))
      return
    }

    setDisplay(parsed.format(0))

    const controls = animate(0, parsed.target, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(parsed.format(latest)),
    })

    return () => controls.stop()
  }, [isInView, parsed, reduceMotion])

  return (
    <p
      ref={ref}
      aria-label={value}
      className={cn("tabular-nums", className)}
    >
      {display}
    </p>
  )
}
