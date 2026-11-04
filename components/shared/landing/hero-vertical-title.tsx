"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "motion/react"

import { FoldText } from "@/components/shared/landing/fold-text/fold-text"

const FOLD_PROPS = {
  foldStyle: "paper" as const,
  splitBy: "char" as const,
  hinge: "top" as const,
  trigger: "mount" as const,
  foldAngle: 92,
  duration: 0.65,
  stagger: 0.045,
  staggerFrom: "start" as const,
  ease: "power3.out",
  perspective: 700,
  creaseShading: 0.55,
  fontSize: 80,
  fontWeight: 700,
}

type HeroVerticalTitleProps = {
  social: string
  growth: string
  ready: boolean
}

export function HeroVerticalTitle({
  social,
  growth,
  ready,
}: HeroVerticalTitleProps) {
  const reduceMotion = useReducedMotion()
  const [growthReady, setGrowthReady] = useState(false)

  useEffect(() => {
    if (!ready || reduceMotion) {
      setGrowthReady(!!ready)
      return undefined
    }
    setGrowthReady(false)
    const id = window.setTimeout(() => setGrowthReady(true), 380)
    return () => window.clearTimeout(id)
  }, [ready, reduceMotion])

  const showContent = ready || reduceMotion

  return (
    <p
      className="-rotate-90 text-[80px] font-bold leading-none whitespace-nowrap text-white [transform-style:preserve-3d]"
      aria-hidden={!showContent}
    >
      {!showContent ? (
        <span className="invisible">
          {social}
          {growth}
        </span>
      ) : reduceMotion ? (
        <>
          <span>{social}</span>
          <span className="text-[#202020]">{growth}</span>
        </>
      ) : (
        <>
          <FoldText text={social} color="#ffffff" {...FOLD_PROPS} />
          {growthReady ? (
            <FoldText text={growth} color="#202020" {...FOLD_PROPS} />
          ) : (
            <span className="invisible text-[#202020]">{growth}</span>
          )}
        </>
      )}
    </p>
  )
}
