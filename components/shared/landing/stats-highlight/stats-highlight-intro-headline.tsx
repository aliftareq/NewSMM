"use client"

import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react"
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"

import { cn } from "@/lib/utils"

const INTRO_ASH_COLOR = "rgba(0, 0, 0, 0.35)"
const INTRO_BLACK_COLOR = "#202020"

type StatsHighlightIntroHeadlineProps = {
  headingPrimary: string
  headingSecondary: string
  className?: string
}

function wordCountForProgress(progress: number, totalWords: number) {
  return Math.min(totalWords, Math.max(0, Math.ceil(progress * totalWords)))
}

export function StatsHighlightIntroHeadline({
  headingPrimary,
  headingSecondary,
  className,
}: StatsHighlightIntroHeadlineProps) {
  const revealRef = useRef<HTMLSpanElement>(null)
  const words = useMemo(
    () => headingSecondary.trim().split(/\s+/).filter(Boolean),
    [headingSecondary],
  )
  const reduceMotion = useReducedMotion()
  const [activeWordCount, setActiveWordCount] = useState(0)

  const { scrollYProgress } = useScroll({
    target: revealRef,
    offset: ["start 0.92", "end 0.2"],
  })

  const scrollYProgressRef = useRef(scrollYProgress)
  scrollYProgressRef.current = scrollYProgress

  const applyProgress = useCallback(
    (progress: number) => {
      setActiveWordCount(wordCountForProgress(progress, words.length))
    },
    [words.length],
  )

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (reduceMotion) return
    applyProgress(progress)
  })

  useEffect(() => {
    if (reduceMotion) {
      setActiveWordCount(words.length)
      return
    }
    setActiveWordCount(0)
  }, [reduceMotion, words.length])

  useLayoutEffect(() => {
    if (reduceMotion) return
    applyProgress(scrollYProgressRef.current.get())
  }, [applyProgress, reduceMotion, words.length])

  return (
    <p
      className={cn(
        "w-full max-w-[840px] text-[28px] leading-[1.42] font-medium tracking-[-0.56px] text-[#202020] lg:text-left",
        className,
      )}
    >
      <span>{headingPrimary}</span>{" "}
      <span ref={revealRef} className="inline">
        {words.map((word, index) => {
          const isActive = index < activeWordCount
          return (
            <span
              key={`${word}-${index}`}
              className="transition-[color] duration-500 ease-out"
              style={{
                color: isActive ? INTRO_BLACK_COLOR : INTRO_ASH_COLOR,
              }}
            >
              {word}
              {index < words.length - 1 ? " " : ""}
            </span>
          )
        })}
      </span>
    </p>
  )
}
