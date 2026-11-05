"use client"

import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export type BrandLogomarkSplitProps = {
  viewBox: string
  topPath: string
  bottomPath: string
  className?: string
  holdStacked?: boolean
  splitReveal?: boolean
  stackTopY?: number
  stackBottomY?: number
}

/** Dual-path brand mark — layers stack, then split apart (hero nav + Who it’s for center). */
export function BrandLogomarkSplit({
  viewBox,
  topPath,
  bottomPath,
  className,
  holdStacked = false,
  splitReveal = false,
  stackTopY = 7,
  stackBottomY = -7,
}: BrandLogomarkSplitProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const topRef = useRef<SVGPathElement>(null)
  const bottomRef = useRef<SVGPathElement>(null)
  const reduceMotion = useReducedMotion()
  const splitPlayedRef = useRef(false)

  useLayoutEffect(() => {
    if (reduceMotion) return undefined

    const top = topRef.current
    const bottom = bottomRef.current
    const svg = svgRef.current
    if (!top || !bottom || !svg) return undefined

    const applyStacked = () => {
      gsap.set([top, bottom], {
        transformOrigin: "50% 50%",
        transformBox: "fill-box",
        force3D: true,
      })
      gsap.set(top, { y: stackTopY })
      gsap.set(bottom, { y: stackBottomY })
    }

    const ctx = gsap.context(() => {
      if (splitReveal && !splitPlayedRef.current) {
        splitPlayedRef.current = true
        applyStacked()
        gsap.to(top, {
          y: 0,
          duration: 0.62,
          ease: "power3.out",
        })
        gsap.to(bottom, {
          y: 0,
          duration: 0.62,
          ease: "power3.out",
          delay: 0.04,
          clearProps: "transform,transformOrigin,transformBox",
          onComplete: () => {
            gsap.set(top, { clearProps: "transform,transformOrigin,transformBox" })
          },
        })
        return
      }

      if (holdStacked) {
        applyStacked()
        return
      }

      gsap.set([top, bottom], { y: 0, clearProps: "transform" })
    }, svg)

    return () => ctx.revert()
  }, [
    holdStacked,
    splitReveal,
    reduceMotion,
    stackTopY,
    stackBottomY,
  ])

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block overflow-visible", className)}
      aria-hidden
    >
      <path ref={topRef} d={topPath} fill="#21AEFF" />
      <path ref={bottomRef} d={bottomPath} fill="#004C71" />
    </svg>
  )
}

export const NAVBAR_BRAND_LOGOMARK = {
  viewBox: "0 0 47.9988 34.0002",
  topPath: "M15.4992 0H36.5808L21.0816 22.9729H0L15.4992 0Z",
  bottomPath:
    "M16.4212 25.1022L10.418 34.0002H32.4996L47.9988 11.0273H31.7012L22.2052 25.1022H16.4212Z",
  stackTopY: 7,
  stackBottomY: -7,
} as const

export const WHO_ITS_FOR_CENTER_LOGOMARK = {
  viewBox: "0 0 44.3081 31.3845",
  topPath: "M14.307 0H33.7669L19.4599 21.2058H0L14.307 0Z",
  bottomPath:
    "M15.1596 23.1709L9.61816 31.3845H30.0012L44.3081 10.1787H29.2642L20.4987 23.1709H15.1596Z",
  stackTopY: 6,
  stackBottomY: -6,
} as const
