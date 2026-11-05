"use client"

import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

type NavbarLogomarkProps = {
  className?: string
  /** Keep chevrons overlapped before split (hero nav still revealing). */
  holdStacked?: boolean
  /** After nav reveal: split stacked layers into final logomark. */
  splitReveal?: boolean
}

const STACK_TOP_Y = 7
const STACK_BOTTOM_Y = -7

/** Inline brand logomark — dual-layer split reveal on the two paths. */
export function NavbarLogomark({
  className,
  holdStacked = false,
  splitReveal = false,
}: NavbarLogomarkProps) {
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
      gsap.set(top, { y: STACK_TOP_Y })
      gsap.set(bottom, { y: STACK_BOTTOM_Y })
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
  }, [holdStacked, splitReveal, reduceMotion])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 47.9988 34.0002"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block overflow-visible", className)}
      aria-hidden
    >
      <path
        ref={topRef}
        d="M15.4992 0H36.5808L21.0816 22.9729H0L15.4992 0Z"
        fill="#21AEFF"
      />
      <path
        ref={bottomRef}
        d="M16.4212 25.1022L10.418 34.0002H32.4996L47.9988 11.0273H31.7012L22.2052 25.1022H16.4212Z"
        fill="#004C71"
      />
    </svg>
  )
}
