"use client"

import { useEffect, useRef, useState, type RefObject } from "react"

/** Replay border/check animations whenever the illustration enters the viewport. */
export function useHowItWorksIllustrationInView(
  svgRef: RefObject<SVGSVGElement | null>,
) {
  const hasLeftViewRef = useRef(false)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (reduceMotion) {
      setInView(true)
      return undefined
    }

    const node = svgRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (hasLeftViewRef.current) {
            setInView(false)
            requestAnimationFrame(() => {
              setInView(true)
            })
            hasLeftViewRef.current = false
          } else {
            setInView(true)
          }
          return
        }

        setInView(false)
        hasLeftViewRef.current = true
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return inView
}
