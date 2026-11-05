"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import "lenis/dist/lenis.css"

gsap.registerPlugin(ScrollTrigger)

type SmoothScrollProviderProps = {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)
  const skipPathScrollResetRef = useRef(true)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      anchors: true,
      respectReducedMotion: true,
    })

    lenisRef.current = lenis

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    })

    lenis.on("scroll", ScrollTrigger.update)

    const onScrollTriggerRefresh = () => {
      lenis.resize()
    }

    ScrollTrigger.addEventListener("refresh", onScrollTriggerRefresh)

    const onTick = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.removeEventListener("refresh", onScrollTriggerRefresh)
      gsap.ticker.remove(onTick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return

    if (skipPathScrollResetRef.current) {
      skipPathScrollResetRef.current = false
      return
    }

    lenis.scrollTo(0, { immediate: true })
    ScrollTrigger.refresh()
  }, [pathname])

  return children
}
