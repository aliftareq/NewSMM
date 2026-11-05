"use client"

import { useEffect, useState, type ReactNode } from "react"
import { ReactLenis, useLenis } from "lenis/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import "lenis/dist/lenis.css"

gsap.registerPlugin(ScrollTrigger)

function LenisScrollTriggerSync() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return undefined

    const onScroll = () => {
      ScrollTrigger.update()
    }

    lenis.on("scroll", onScroll)
    ScrollTrigger.refresh()

    return () => {
      lenis.off("scroll", onScroll)
    }
  }, [lenis])

  return null
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  return reduced
}

type SmoothScrollProviderProps = {
  children: ReactNode
}

/** Site-wide Lenis smooth scroll; defers to native scroll when reduced motion is on. */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const reducedMotion = usePrefersReducedMotion()

  if (reducedMotion) {
    return children
  }

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.2,
        /** Let overflow regions scroll natively; pass wheel to Lenis at scroll edges. */
        allowNestedScroll: true,
      }}
    >
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  )
}
